import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { readDb, saveDb, verifyPassword, hashPassword } from './db.js';
import { createToken, authMiddleware } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage for project/avatar image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `upload-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg|gif|pdf/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext || mime) {
      cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed!'));
    }
  }
});

const router = express.Router();

// ----------------------------------------------------
// PUBLIC ENDPOINTS
// ----------------------------------------------------

// Get all public portfolio content
router.get('/public/data', (req, res) => {
  const db = readDb();
  // Exclude auth credentials and messages from public response
  const { auth, messages, ...publicData } = db;
  res.json({
    success: true,
    data: publicData
  });
});

// Submit contact message from visitor
router.post('/messages', (req, res) => {
  const { name, email, subject, serviceCategory, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const db = readDb();
  const newMessage = {
    id: `msg-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    name: name.trim(),
    email: email.trim(),
    subject: subject ? subject.trim() : 'Portfolio Inquiry',
    serviceCategory: serviceCategory || 'General Inquiry',
    message: message.trim(),
    createdAt: new Date().toISOString(),
    read: false
  };

  db.messages = [newMessage, ...(db.messages || [])];
  saveDb(db);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received.',
    id: newMessage.id
  });
});

// ----------------------------------------------------
// AUTHENTICATION ENDPOINTS
// ----------------------------------------------------

router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  const db = readDb();
  if (username && db.auth.username.toLowerCase() !== username.trim().toLowerCase()) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (!verifyPassword(password, db.auth.passwordHash)) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  db.auth.lastLogin = new Date().toISOString();
  saveDb(db);

  const token = createToken(db.auth.username || 'admin');
  res.json({
    success: true,
    token,
    user: {
      username: db.auth.username || 'admin',
      lastLogin: db.auth.lastLogin
    }
  });
});

router.get('/auth/me', authMiddleware, (req, res) => {
  const db = readDb();
  res.json({
    authenticated: true,
    user: {
      username: db.auth.username,
      lastLogin: db.auth.lastLogin
    }
  });
});

router.post('/auth/change-credentials', authMiddleware, (req, res) => {
  const { currentPassword, newUsername, newPassword } = req.body;
  const db = readDb();

  if (!verifyPassword(currentPassword, db.auth.passwordHash)) {
    return res.status(400).json({ error: 'Current password is incorrect' });
  }

  if (newUsername && newUsername.trim()) {
    db.auth.username = newUsername.trim();
  }

  if (newPassword && newPassword.length >= 6) {
    db.auth.passwordHash = hashPassword(newPassword);
  }

  saveDb(db);
  const newToken = createToken(db.auth.username);

  res.json({
    success: true,
    message: 'Credentials updated successfully',
    token: newToken,
    user: { username: db.auth.username }
  });
});

// ----------------------------------------------------
// ADMIN ENDPOINTS (Protected)
// ----------------------------------------------------

// Get full dashboard data
router.get('/admin/all', authMiddleware, (req, res) => {
  const db = readDb();
  const { auth, ...adminData } = db;
  res.json({
    success: true,
    data: adminData,
    stats: {
      totalProjects: db.projects?.length || 0,
      totalServices: db.services?.length || 0,
      totalSkills: db.skills?.length || 0,
      totalMessages: db.messages?.length || 0,
      unreadMessages: db.messages?.filter(m => !m.read)?.length || 0,
    }
  });
});

// Update Profile
router.put('/admin/profile', authMiddleware, (req, res) => {
  const db = readDb();
  db.profile = { ...db.profile, ...req.body };
  saveDb(db);
  res.json({ success: true, profile: db.profile });
});

// Update Socials
router.put('/admin/socials', authMiddleware, (req, res) => {
  const db = readDb();
  if (Array.isArray(req.body)) {
    db.socials = req.body;
    saveDb(db);
    return res.json({ success: true, socials: db.socials });
  }
  res.status(400).json({ error: 'Socials must be an array' });
});

// Projects CRUD
router.post('/admin/projects', authMiddleware, (req, res) => {
  const db = readDb();
  const newProject = {
    id: `proj-${Date.now()}`,
    title: req.body.title || 'Untitled Project',
    category: req.body.category || 'Web Development',
    description: req.body.description || '',
    image: req.body.image || '/assets/web1.jpg',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    featured: Boolean(req.body.featured),
    liveUrl: req.body.liveUrl || '',
    githubUrl: req.body.githubUrl || '',
    details: req.body.details || ''
  };
  db.projects = [newProject, ...(db.projects || [])];
  saveDb(db);
  res.status(201).json({ success: true, project: newProject });
});

router.put('/admin/projects/:id', authMiddleware, (req, res) => {
  const db = readDb();
  const index = db.projects.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  db.projects[index] = { ...db.projects[index], ...req.body, id: req.params.id };
  saveDb(db);
  res.json({ success: true, project: db.projects[index] });
});

router.delete('/admin/projects/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.projects = db.projects.filter(p => p.id !== req.params.id);
  saveDb(db);
  res.json({ success: true, message: 'Project deleted' });
});

// Services CRUD
router.post('/admin/services', authMiddleware, (req, res) => {
  const db = readDb();
  const nextNum = String((db.services?.length || 0) + 1).padStart(2, '0');
  const newService = {
    id: `srv-${Date.now()}`,
    number: req.body.number || nextNum,
    title: req.body.title || 'New Service',
    description: req.body.description || '',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    icon: req.body.icon || 'Monitor',
    color: req.body.color || 'blue',
    theme: req.body.theme || {
      leftBorder: 'border-l-blue-500',
      iconBg: 'bg-blue-500',
      text: 'text-blue-600 dark:text-blue-400',
      badgeBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
    }
  };
  db.services = [...(db.services || []), newService];
  saveDb(db);
  res.status(201).json({ success: true, service: newService });
});

router.put('/admin/services/:id', authMiddleware, (req, res) => {
  const db = readDb();
  const index = db.services.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }
  db.services[index] = { ...db.services[index], ...req.body, id: req.params.id };
  saveDb(db);
  res.json({ success: true, service: db.services[index] });
});

router.delete('/admin/services/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.services = db.services.filter(s => s.id !== req.params.id);
  saveDb(db);
  res.json({ success: true, message: 'Service deleted' });
});

// Skills CRUD
router.post('/admin/skills', authMiddleware, (req, res) => {
  const db = readDb();
  const newSkill = {
    id: `sk-${Date.now()}`,
    name: req.body.name || 'New Skill',
    category: req.body.category || 'Web Development',
    level: Number(req.body.level) || 85,
    icon: req.body.icon || 'Code'
  };
  db.skills = [...(db.skills || []), newSkill];
  saveDb(db);
  res.status(201).json({ success: true, skill: newSkill });
});

router.put('/admin/skills/:id', authMiddleware, (req, res) => {
  const db = readDb();
  const index = db.skills.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Skill not found' });
  }
  db.skills[index] = { ...db.skills[index], ...req.body, id: req.params.id };
  saveDb(db);
  res.json({ success: true, skill: db.skills[index] });
});

router.delete('/admin/skills/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.skills = db.skills.filter(s => s.id !== req.params.id);
  saveDb(db);
  res.json({ success: true, message: 'Skill deleted' });
});

// Experience CRUD
router.post('/admin/experience', authMiddleware, (req, res) => {
  const db = readDb();
  const newExp = {
    id: `exp-${Date.now()}`,
    title: req.body.title || 'Role Title',
    company: req.body.company || 'Company',
    period: req.body.period || '2023 - Present',
    description: req.body.description || ''
  };
  db.experience = [newExp, ...(db.experience || [])];
  saveDb(db);
  res.status(201).json({ success: true, experience: newExp });
});

router.put('/admin/experience/:id', authMiddleware, (req, res) => {
  const db = readDb();
  const index = db.experience.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Experience not found' });
  }
  db.experience[index] = { ...db.experience[index], ...req.body, id: req.params.id };
  saveDb(db);
  res.json({ success: true, experience: db.experience[index] });
});

router.delete('/admin/experience/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.experience = db.experience.filter(e => e.id !== req.params.id);
  saveDb(db);
  res.json({ success: true, message: 'Experience deleted' });
});

// Education CRUD
router.post('/admin/education', authMiddleware, (req, res) => {
  const db = readDb();
  const newEdu = {
    id: `edu-${Date.now()}`,
    degree: req.body.degree || 'Degree / Certification',
    institution: req.body.institution || 'Institution',
    period: req.body.period || '2020 - 2024',
    description: req.body.description || ''
  };
  db.education = [newEdu, ...(db.education || [])];
  saveDb(db);
  res.status(201).json({ success: true, education: newEdu });
});

router.put('/admin/education/:id', authMiddleware, (req, res) => {
  const db = readDb();
  const index = db.education.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Education not found' });
  }
  db.education[index] = { ...db.education[index], ...req.body, id: req.params.id };
  saveDb(db);
  res.json({ success: true, education: db.education[index] });
});

router.delete('/admin/education/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.education = db.education.filter(e => e.id !== req.params.id);
  saveDb(db);
  res.json({ success: true, message: 'Education deleted' });
});

// Case Study
router.put('/admin/case-study', authMiddleware, (req, res) => {
  const db = readDb();
  db.caseStudy = { ...db.caseStudy, ...req.body };
  saveDb(db);
  res.json({ success: true, caseStudy: db.caseStudy });
});

// Contact Messages
router.get('/admin/messages', authMiddleware, (req, res) => {
  const db = readDb();
  res.json({ success: true, messages: db.messages || [] });
});

router.put('/admin/messages/:id/read', authMiddleware, (req, res) => {
  const db = readDb();
  const msg = (db.messages || []).find(m => m.id === req.params.id);
  if (msg) {
    msg.read = req.body.read !== undefined ? req.body.read : true;
    saveDb(db);
    return res.json({ success: true, message: msg });
  }
  res.status(404).json({ error: 'Message not found' });
});

router.delete('/admin/messages/:id', authMiddleware, (req, res) => {
  const db = readDb();
  db.messages = (db.messages || []).filter(m => m.id !== req.params.id);
  saveDb(db);
  res.json({ success: true, message: 'Message deleted' });
});

// Settings
router.put('/admin/settings', authMiddleware, (req, res) => {
  const db = readDb();
  db.settings = { ...db.settings, ...req.body };
  saveDb(db);
  res.json({ success: true, settings: db.settings });
});

// Image Upload
router.post('/admin/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const publicUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: publicUrl,
    filename: req.file.filename,
    size: req.file.size
  });
});

export default router;
