import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio.json');

// Ensure local data directory exists for fallback cache
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  // Read-only filesystem in serverless environments (e.g. Vercel)
}

// PostgreSQL Connection Pool (Neon DB)
const FALLBACK_DATABASE_URL = "postgresql://neondb_owner:npg_xhBUduZ6V7YJ@ep-solitary-credit-beswpfj7-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    FALLBACK_DATABASE_URL
  );
}

const activeDbUrl = getDatabaseUrl();

export let pool = activeDbUrl
  ? new Pool({
      connectionString: activeDbUrl,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000
    })
  : null;

let isPostgresConnected = false;
let cachedDb = null;

// Password hashing helpers
export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, key] = storedHash.split(':');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(derivedKey, 'hex'), Buffer.from(key, 'hex'));
}

// Generate default initial data
export function getDefaultData() {
  const defaultSalt = crypto.randomBytes(16).toString('hex');
  const initialPasswordHash = hashPassword('admin123', defaultSalt);
  const jwtSecret = crypto.randomBytes(32).toString('hex');

  return {
    profile: {
      name: "THADD 101",
      greeting: "Hi! I'm",
      title: "Full-Stack Web Developer & UI/UX Specialist",
      subtitle: "Web, SaaS & Application Engineer | Modern Creative UI/UX Specialist",
      badgeText: "Available for work",
      heroBullets: [
        "Crafting high-impact UI/UX designs & visual brand identities.",
        "Building fast, scalable full-stack web applications.",
        "Engineering responsive modern web platforms & SaaS solutions."
      ],
      bio1: "I am a Full-Stack Web Developer & UI/UX Specialist driven by a passion for building fast, scalable, and intuitive digital experiences. Specializing in end-to-end development, I combine pixel-perfect visual design with robust software architecture to turn complex ideas into seamless web products.",
      bio2: "My stack spans modern web technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, Supabase, and PostgreSQL. Whether engineering custom SaaS dashboards, full-stack web platforms, or interactive web tools, I build digital experiences that deliver real-world performance and aesthetic excellence.",
      stats: [
        { label: "Years Experience", value: "5+" },
        { label: "Web Projects Completed", value: "45+" },
        { label: "Satisfied Clients", value: "30+" },
        { label: "Code & UI/UX Quality", value: "100%" }
      ],
      avatarUrl: "/assets/profile.png",
      email: "thadd101.dev@gmail.com",
      phone: "+1 (234) 567-8900",
      location: "Remote / Worldwide",
      resumeUrl: "/resume",
      tickerKeywords: [
        "WEB DEVELOPMENT",
        "ATTRACTIVE UI/UX",
        "SAAS DASHBOARDS",
        "FULL STACK",
        "REACT & NEXT.JS",
        "TYPESCRIPT",
        "TAILWIND CSS",
        "INTERACTIVE WEB APPS",
        "MODERN WEB DESIGN"
      ]
    },
    socials: [
      { id: "soc-1", platform: "GitHub", url: "https://github.com", icon: "github", isActive: true },
      { id: "soc-2", platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", isActive: true },
      { id: "soc-3", platform: "Twitter/X", url: "https://x.com", icon: "twitter", isActive: true },
      { id: "soc-4", platform: "WhatsApp", url: "https://wa.me/1234567890", icon: "whatsapp", isActive: true },
      { id: "soc-5", platform: "Instagram", url: "https://instagram.com", icon: "instagram", isActive: true },
      { id: "soc-6", platform: "Facebook", url: "https://facebook.com", icon: "facebook", isActive: true }
    ],
    services: [
      {
        id: "srv-1",
        number: "01",
        title: "ATTRACTIVE UI/UX DESIGN & PROTOTYPING",
        description: "Crafting distinctive, modern UI/UX design systems, interactive web mockups, wireframes, and design architectures tailored to captivate audiences and maximize conversion.",
        tags: ["Figma", "UI/UX Design", "Wireframing", "Design Systems", "Prototyping"],
        icon: "Palette",
        color: "pink",
        theme: {
          leftBorder: "border-l-pink-500",
          iconBg: "bg-pink-500",
          text: "text-pink-600 dark:text-pink-400",
          badgeBg: "bg-pink-50 text-pink-600 dark:bg-pink-950/50 dark:text-pink-400"
        }
      },
      {
        id: "srv-2",
        number: "02",
        title: "FULL STACK WEB DEVELOPMENT",
        description: "Building fast, SEO-optimized, and ultra-responsive web applications with cutting-edge architectures, fluid micro-interactions, and pixel-perfect responsiveness across all screen sizes.",
        tags: ["React 19", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript"],
        icon: "Monitor",
        color: "blue",
        theme: {
          leftBorder: "border-l-blue-500",
          iconBg: "bg-blue-500",
          text: "text-blue-600 dark:text-blue-400",
          badgeBg: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        }
      },
      {
        id: "srv-3",
        number: "03",
        title: "SAAS & INTERACTIVE WEB APPS",
        description: "Engineering rich web applications, SaaS analytics dashboards, interactive tools, and data visualizations with live telemetry, state management, and real-time collaboration.",
        tags: ["SaaS Architecture", "Interactive Web", "Dashboards", "State Management", "REST APIs"],
        icon: "Layers",
        color: "emerald",
        theme: {
          leftBorder: "border-l-emerald-500",
          iconBg: "bg-emerald-500",
          text: "text-emerald-600 dark:text-emerald-400",
          badgeBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        }
      },
      {
        id: "srv-4",
        number: "04",
        title: "BACKEND & API ENGINEERING",
        description: "Creating powerful, scalable backends, database architectures, and secure REST/GraphQL APIs with robust authentication, role permissions, and cloud integration.",
        tags: ["Node.js", "Express", "PostgreSQL", "Supabase", "SQL"],
        icon: "Server",
        color: "purple",
        theme: {
          leftBorder: "border-l-purple-500",
          iconBg: "bg-purple-500",
          text: "text-purple-600 dark:text-purple-400",
          badgeBg: "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400"
        }
      }
    ],
    skills: [
      { id: "sk-1", name: "Modern UI/UX & Figma", category: "UI/UX & Design", level: 96, icon: "Palette" },
      { id: "sk-2", name: "Design Systems & Tokens", category: "UI/UX & Design", level: 92, icon: "Sparkles" },
      { id: "sk-3", name: "Responsive Layouts & Motion", category: "UI/UX & Design", level: 95, icon: "Layout" },
      { id: "sk-4", name: "React 19 & Next.js", category: "Web Development", level: 98, icon: "Monitor" },
      { id: "sk-5", name: "Tailwind CSS & Modern CSS", category: "Web Development", level: 98, icon: "Layout" },
      { id: "sk-6", name: "TypeScript & JavaScript", category: "Web Development", level: 94, icon: "Code" },
      { id: "sk-7", name: "State Management & Zustand", category: "Web Development", level: 92, icon: "Layers" },
      { id: "sk-8", name: "Node.js & Express API", category: "Backend & Database", level: 92, icon: "Server" },
      { id: "sk-9", name: "PostgreSQL & Supabase", category: "Backend & Database", level: 90, icon: "Database" },
      { id: "sk-10", name: "REST APIs & WebSockets", category: "Backend & Database", level: 92, icon: "Globe" },
      { id: "sk-11", name: "Git, GitHub & CI/CD", category: "Tools & Architecture", level: 94, icon: "Cpu" },
      { id: "sk-12", name: "Vite, Vercel & Cloud Deploy", category: "Tools & Architecture", level: 92, icon: "Globe" }
    ],
    projects: [
      {
        id: "proj-1",
        title: "Pulse SaaS - Cloud Telemetry & Analytics Dashboard",
        category: "Web Development",
        subCategory: "SaaS & Dashboards",
        description: "Real-time telemetry dashboard featuring interactive metric trends, revenue area charts, live streaming graphs, and dark-mode glassmorphic cards.",
        image: "/assets/demo-dashboard.jpg",
        tags: ["React 19", "Next.js", "Tailwind CSS", "Chart.js", "SaaS"],
        featured: true,
        liveUrl: "https://ui.shadcn.com/examples/dashboard",
        details: "High-impact cloud analytics dashboard rendering real-time streaming time-series data, drag-and-drop metrics widgets, audit telemetry, and dark/light mode tokens."
      },
      {
        id: "proj-2",
        title: "Ray Studio - Gradient Code & Design Visualizer",
        category: "Web Development",
        subCategory: "Creative & Agency",
        description: "Interactive design visualizer with glowing multi-stop gradients, glassmorphism syntax cards, dark-mode canvas presets, and instant export.",
        image: "/assets/demo-ray.jpg",
        tags: ["React", "CSS Gradients", "UI/UX Design", "Glassmorphism", "TypeScript"],
        featured: true,
        liveUrl: "https://ray.so",
        details: "Vibrant visual presentation tool built for modern developers and designers, featuring reactive gradient styling, glassmorphism themes, and live interactive canvas controls."
      },
      {
        id: "proj-3",
        title: "Visual3D - Interactive 3D WebGL & Graphics Studio",
        category: "Web Development",
        subCategory: "Creative & Agency",
        description: "GPU-accelerated browser 3D graphics studio featuring shader simulations, dynamic volumetric lighting, orbit controls, and physics.",
        image: "/assets/demo-threejs.jpg",
        tags: ["Three.js", "WebGL", "3D Graphics", "Shaders", "JavaScript"],
        featured: true,
        liveUrl: "https://threejs.org/examples/",
        details: "Browser-based 3D graphics showcase leveraging WebGL, camera animations, bloom post-processing, and interactive procedural models running at 60 FPS."
      },
      {
        id: "proj-4",
        title: "NodeFlow - Visual Architecture & Node Graph Canvas",
        category: "Web Development",
        subCategory: "Interactive Web Apps",
        description: "Interactive workflow engine with draggable nodes, curved connecting bus wires, reactive data ports, and dynamic minimap telemetry.",
        image: "/assets/demo-reactflow.jpg",
        tags: ["React Flow", "TypeScript", "Canvas API", "State Engine", "Interactive UI"],
        featured: true,
        liveUrl: "https://reactflow.dev",
        details: "Extensible node-graph web application used for designing distributed architectures, automated pipelines, and reactive state systems with live interaction."
      },
      {
        id: "proj-5",
        title: "Supabase Cloud - Modern Full-Stack Platform & Portal",
        category: "Web Development",
        subCategory: "Full-Stack Platforms",
        description: "Cloud backend portal with interactive database explorers, realtime websocket synchronization, neon emerald telemetry, and edge functions.",
        image: "/assets/demo-supabase.jpg",
        tags: ["PostgreSQL", "Next.js", "WebSockets", "Full-Stack", "Tailwind CSS"],
        featured: false,
        liveUrl: "https://supabase.com",
        details: "Developer portal showcasing real-time Postgres management, auth systems, vector queries, and sleek dark-mode glassmorphic aesthetics."
      },
      {
        id: "proj-6",
        title: "ExcaliCanvas - Real-Time Collaborative Whiteboard",
        category: "Web Development",
        subCategory: "Interactive Web Apps",
        description: "Vector design canvas and UI wireframing platform featuring freehand sketching, geometric shape generation, and multi-user live collaboration.",
        image: "/assets/demo-excalidraw.jpg",
        tags: ["React", "Canvas API", "Collaborative UI", "PWA", "Wireframing"],
        featured: false,
        liveUrl: "https://excalidraw.com",
        details: "Interactive illustration and wireframing application supporting infinite pan/zoom canvas, real-time multi-user synchronization, and instant SVG/PNG exports."
      }
    ],
    experience: [
      {
        id: "exp-1",
        title: "Lead Full Stack Web Developer",
        company: "Tech Innovations Global",
        period: "2023 - Present",
        description: "Spearheading modern web application architecture and design systems. Engineered scalable React and Next.js applications serving tens of thousands of active users."
      },
      {
        id: "exp-2",
        title: "Senior Frontend & UI/UX Engineer",
        company: "Digital Core Agency",
        period: "2022 - 2023",
        description: "Engineered scalable client web applications using React, Node.js, and PostgreSQL. Reduced page load times by 45% and established robust UI/UX design standards."
      },
      {
        id: "exp-3",
        title: "Web Developer & UI Designer",
        company: "Pixel Craft Studio",
        period: "2020 - 2022",
        description: "Delivered cohesive brand identities, modern UI/UX design mockups in Figma, and developed dynamic responsive frontend interfaces for over 25 client launches."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Bachelor of Science in Computer Science",
        institution: "State University of Technology",
        period: "2020 - 2024",
        description: "Specialized in Software Engineering, Web Technologies, and Distributed Systems."
      },
      {
        id: "edu-2",
        degree: "Professional Certificate in UI/UX & Modern Web Design",
        institution: "Interaction Design Institute",
        period: "2021",
        description: "User experience research, design systems, modern web accessibility, and interactive prototyping."
      }
    ],
    caseStudy: {
      title: "Real-time Multi-Tenant Web Collaboration Suite",
      description: "Engineered an end-to-end real-time communication web platform supporting live chat, audio/video rooms, role management, and instant notifications. Scaled to handle high-concurrency connections with sub-45ms latency across web clients.",
      tags: ["Node.js", "Socket.io", "React 19", "PostgreSQL", "WebRTC"],
      metrics: [
        { label: "Latency", value: "<45ms" },
        { label: "Active Connections", value: "12,000+" },
        { label: "Platform Uptime", value: "99.99%" }
      ],
      detailsUrl: "#contact"
    },
    messages: [
      {
        id: "msg-seed-1",
        name: "Sarah Jenkins",
        email: "sarah.j@vertexcreative.io",
        subject: "Full-Stack Web App Development Inquiry",
        serviceCategory: "Web Development",
        message: "Hi THADD, we were extremely impressed by your portfolio projects and live demos. We are launching a new startup and need a full-stack Next.js web application with attractive UI/UX. Would love to schedule an introductory call this week!",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        read: false
      }
    ],
    settings: {
      siteTitle: "THADD 101 | Full-Stack Web Developer & UI/UX Specialist",
      metaDescription: "Professional portfolio of THADD 101 - Full-Stack Web Developer crafting modern digital experiences with attractive UI/UX.",
      contactEmail: "thadd101.dev@gmail.com",
      enableContactForm: true,
      accentColor: "#38bdf8",
      footerCopyright: "© 2026 THADD 101. All rights reserved."
    },
    auth: {
      username: "admin",
      passwordHash: initialPasswordHash,
      tokenSecret: jwtSecret,
      lastLogin: null
    }
  };
}

// Read database from local fallback JSON file
function readLocalDbFile() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getDefaultData();
      saveLocalDbFile(initial);
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading local database file, creating fresh seed:", err);
    const initial = getDefaultData();
    saveLocalDbFile(initial);
    return initial;
  }
}

// Save database to local fallback JSON file
function saveLocalDbFile(data) {
  try {
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (err) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      // In serverless environments (like Vercel), the filesystem is read-only.
      // Neon PostgreSQL is the primary database, so file write errors are safely ignored.
      return false;
    }
  }
}

// ----------------------------------------------------
// NEON POSTGRESQL INITIALIZATION & SYNC
// ----------------------------------------------------

export async function initDb() {
  if (!pool) {
    const url = getDatabaseUrl();
    if (url) {
      pool = new Pool({
        connectionString: url,
        ssl: { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000
      });
    }
  }

  if (!pool) {
    console.warn("No DATABASE_URL configured. Using local JSON store.");
    cachedDb = readLocalDbFile();
    return cachedDb;
  }

  try {
    // 1. Create tables in Neon DB if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        token_secret TEXT NOT NULL,
        last_login TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject TEXT,
        service_category VARCHAR(255),
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS portfolio_data (
        section VARCHAR(100) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 2. Fetch admin user
    const adminRes = await pool.query('SELECT * FROM admins ORDER BY id LIMIT 1');
    let auth = null;
    if (adminRes.rows.length > 0) {
      const row = adminRes.rows[0];
      auth = {
        username: row.username,
        passwordHash: row.password_hash,
        tokenSecret: row.token_secret,
        lastLogin: row.last_login ? row.last_login.toISOString() : null
      };
    } else {
      // Seed default or local admin into Neon
      const local = readLocalDbFile();
      const initialAuth = local.auth || getDefaultData().auth;
      await pool.query(`
        INSERT INTO admins (username, password_hash, token_secret, last_login)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
      `, [
        initialAuth.username || 'admin',
        initialAuth.passwordHash,
        initialAuth.tokenSecret,
        initialAuth.lastLogin ? new Date(initialAuth.lastLogin) : null
      ]);
      auth = initialAuth;
    }

    // 3. Fetch portfolio sections
    const secRes = await pool.query('SELECT section, data FROM portfolio_data');
    const sections = {};
    for (const row of secRes.rows) {
      sections[row.section] = row.data;
    }

    // If portfolio sections are empty, seed from local JSON
    const requiredSections = ['profile', 'socials', 'services', 'skills', 'projects', 'experience', 'education', 'caseStudy', 'settings'];
    const missingSections = requiredSections.filter(sec => !sections[sec]);

    if (missingSections.length > 0) {
      const local = readLocalDbFile();
      const def = getDefaultData();
      for (const sec of missingSections) {
        const val = local[sec] !== undefined ? local[sec] : def[sec];
        sections[sec] = val;
        await pool.query(`
          INSERT INTO portfolio_data (section, data, updated_at)
          VALUES ($1, $2, NOW())
          ON CONFLICT (section) DO UPDATE
          SET data = EXCLUDED.data, updated_at = NOW()
        `, [sec, JSON.stringify(val)]);
      }
    }

    // 4. Fetch messages
    const msgRes = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    const messages = msgRes.rows.map(m => ({
      id: m.id,
      name: m.name,
      email: m.email,
      subject: m.subject || '',
      serviceCategory: m.service_category || '',
      message: m.message,
      read: Boolean(m.read),
      createdAt: m.created_at ? new Date(m.created_at).toISOString() : new Date().toISOString()
    }));

    cachedDb = {
      ...sections,
      messages,
      auth
    };

    // Keep local backup in sync
    saveLocalDbFile(cachedDb);
    isPostgresConnected = true;
    console.log("Successfully connected to Neon PostgreSQL and synchronized portfolio data.");
    return cachedDb;
  } catch (err) {
    console.error("Failed to initialize Neon PostgreSQL database:", err.message);
    console.warn("Falling back to local JSON store.");
    cachedDb = readLocalDbFile();
    return cachedDb;
  }
}

// ----------------------------------------------------
// READ AND SAVE EXPORTS
// ----------------------------------------------------

export function isConnected() {
  return isPostgresConnected;
}

// Read database (returns in-memory cache, falls back to local file)
export function readDb() {
  if (!cachedDb) {
    cachedDb = readLocalDbFile();
  }
  return cachedDb;
}

// Save database with atomic update to cache, local file, and Neon PostgreSQL
export function saveDb(data) {
  cachedDb = data;
  saveLocalDbFile(data);

  // Asynchronously sync to Neon DB
  if (pool && isPostgresConnected) {
    syncDbToPostgres(data).catch(err => {
      console.error("Error syncing database changes to Neon PostgreSQL:", err.message);
    });
  }

  return true;
}

// Async save that awaits Neon PostgreSQL sync
export async function saveDbAsync(data) {
  cachedDb = data;
  saveLocalDbFile(data);

  if (pool) {
    try {
      await syncDbToPostgres(data);
    } catch (err) {
      console.error("Error in saveDbAsync syncing to Neon PostgreSQL:", err.message);
    }
  }

  return true;
}

// Synchronize entire DB object to Neon PostgreSQL tables
export async function syncDbToPostgres(data) {
  if (!pool) return;

  // 1. Sync admin credentials
  if (data.auth) {
    await pool.query(`
      INSERT INTO admins (username, password_hash, token_secret, last_login)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (username) DO UPDATE
      SET password_hash = EXCLUDED.password_hash,
          token_secret = EXCLUDED.token_secret,
          last_login = EXCLUDED.last_login,
          updated_at = NOW();
    `, [
      data.auth.username || 'admin',
      data.auth.passwordHash,
      data.auth.tokenSecret,
      data.auth.lastLogin ? new Date(data.auth.lastLogin) : null
    ]);
  }

  // 2. Sync sections
  const sections = ['profile', 'socials', 'services', 'skills', 'projects', 'experience', 'education', 'caseStudy', 'settings'];
  for (const sec of sections) {
    if (data[sec] !== undefined) {
      await pool.query(`
        INSERT INTO portfolio_data (section, data, updated_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (section) DO UPDATE
        SET data = EXCLUDED.data,
            updated_at = NOW();
      `, [sec, JSON.stringify(data[sec])]);
    }
  }

  // 3. Sync messages
  if (Array.isArray(data.messages)) {
    // Delete messages removed locally
    const currentIds = data.messages.map(m => m.id);
    if (currentIds.length > 0) {
      await pool.query(`DELETE FROM messages WHERE NOT (id = ANY($1))`, [currentIds]);
    } else {
      await pool.query(`DELETE FROM messages`);
    }

    for (const msg of data.messages) {
      await pool.query(`
        INSERT INTO messages (id, name, email, subject, service_category, message, read, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE
        SET read = EXCLUDED.read,
            name = EXCLUDED.name,
            email = EXCLUDED.email,
            subject = EXCLUDED.subject,
            service_category = EXCLUDED.service_category,
            message = EXCLUDED.message;
      `, [
        msg.id,
        msg.name,
        msg.email,
        msg.subject || '',
        msg.serviceCategory || '',
        msg.message,
        Boolean(msg.read),
        msg.createdAt ? new Date(msg.createdAt) : new Date()
      ]);
    }
  }
}

// ----------------------------------------------------
// SPECIALIZED DB ACTIONS (FOR DIRECT QUERYING)
// ----------------------------------------------------

export async function getAdminByUsername(username) {
  if (pool && isPostgresConnected) {
    try {
      const res = await pool.query('SELECT * FROM admins WHERE LOWER(username) = LOWER($1) LIMIT 1', [username]);
      if (res.rows.length > 0) {
        const row = res.rows[0];
        return {
          id: row.id,
          username: row.username,
          passwordHash: row.password_hash,
          tokenSecret: row.token_secret,
          lastLogin: row.last_login ? row.last_login.toISOString() : null
        };
      }
    } catch (e) {
      console.error("Error fetching admin from Neon DB:", e.message);
    }
  }
  const db = readDb();
  if (db.auth && db.auth.username.toLowerCase() === username.toLowerCase()) {
    return db.auth;
  }
  return null;
}

export async function updateAdminLogin(username) {
  const now = new Date();
  if (pool && isPostgresConnected) {
    try {
      await pool.query('UPDATE admins SET last_login = $1, updated_at = NOW() WHERE LOWER(username) = LOWER($2)', [now, username]);
    } catch (e) {
      console.error("Error updating admin last login in Neon DB:", e.message);
    }
  }
  const db = readDb();
  if (db.auth) {
    db.auth.lastLogin = now.toISOString();
    saveLocalDbFile(db);
  }
}

export async function updateAdminCredentials(currentUsername, newUsername, newPasswordHash) {
  const targetUsername = newUsername || currentUsername;
  if (pool && isPostgresConnected) {
    try {
      await pool.query(`
        UPDATE admins 
        SET username = $1,
            password_hash = COALESCE($2, password_hash),
            updated_at = NOW()
        WHERE LOWER(username) = LOWER($3)
      `, [targetUsername, newPasswordHash || null, currentUsername]);
    } catch (e) {
      console.error("Error updating credentials in Neon DB:", e.message);
    }
  }
  const db = readDb();
  if (db.auth) {
    if (newUsername) db.auth.username = newUsername;
    if (newPasswordHash) db.auth.passwordHash = newPasswordHash;
    saveLocalDbFile(db);
  }
}

export async function insertMessage(msg) {
  if (pool && isPostgresConnected) {
    try {
      await pool.query(`
        INSERT INTO messages (id, name, email, subject, service_category, message, read, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        msg.id,
        msg.name,
        msg.email,
        msg.subject || '',
        msg.serviceCategory || '',
        msg.message,
        Boolean(msg.read),
        msg.createdAt ? new Date(msg.createdAt) : new Date()
      ]);
    } catch (e) {
      console.error("Error inserting message into Neon DB:", e.message);
    }
  }
  const db = readDb();
  db.messages = [msg, ...(db.messages || [])];
  saveLocalDbFile(db);
}
