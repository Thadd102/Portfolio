import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import DynamicIcon from '../../components/DynamicIcon';
import {
  LayoutDashboard,
  User,
  Layers,
  Sparkles,
  Cpu,
  Briefcase,
  Share2,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Check,
  X,
  Upload,
  Eye,
  AlertCircle,
  Shield,
  Loader2,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    isAuthenticated,
    adminUser,
    adminData,
    stats,
    isLoading,
    logout,
    changeCredentials,
    uploadFile,
    updateProfile,
    updateSocials,
    createProject,
    updateProject,
    deleteProject,
    createService,
    updateService,
    deleteService,
    createSkill,
    updateSkill,
    deleteSkill,
    createExperience,
    updateExperience,
    deleteExperience,
    createEducation,
    updateEducation,
    deleteEducation,
    updateCaseStudy,
    markMessageRead,
    deleteMessage,
    updateSettings
  } = useAdmin();

  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Modals & form state
  const [projectModal, setProjectModal] = useState({ open: false, isEdit: false, data: null });
  const [serviceModal, setServiceModal] = useState({ open: false, isEdit: false, data: null });
  const [skillModal, setSkillModal] = useState({ open: false, isEdit: false, data: null });
  const [expModal, setExpModal] = useState({ open: false, isEdit: false, data: null, type: 'experience' });
  const [socialModal, setSocialModal] = useState({ open: false, isEdit: false, data: null });

  // Notifications
  const [notice, setNotice] = useState(null);

  const showNotice = (msg, type = 'success') => {
    setNotice({ msg, type });
    setTimeout(() => setNotice(null), 4000);
  };

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !adminData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
      </div>
    );
  }

  const {
    profile = {},
    socials = [],
    projects = [],
    services = [],
    skills = [],
    experience = [],
    education = [],
    caseStudy = {},
    messages = [],
    settings: siteSettings = {}
  } = adminData;

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      
      {/* Toast Notification */}
      {notice && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 ${
          notice.type === 'error' ? 'bg-rose-900 border border-rose-700 text-rose-100' : 'bg-emerald-900 border border-emerald-700 text-emerald-100'
        }`}>
          {notice.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
          <span className="text-sm font-semibold">{notice.msg}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#0a0f1d] border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          
          {/* Logo & User info */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black">
                A
              </div>
              <div>
                <h2 className="text-sm font-black text-white leading-tight">Admin Console</h2>
                <span className="text-[11px] text-slate-400">@{adminUser?.username || 'admin'}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile & Personal</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'projects' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'services' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                <span>Services</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {services.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'skills' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4" />
                <span>Skills</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {skills.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'experience' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Experience & Case</span>
            </button>

            <button
              onClick={() => setActiveTab('socials')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'socials' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Share2 className="w-4 h-4" />
                <span>Social Links</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {socials.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'messages' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Messages</span>
              </div>
              {unreadCount > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold animate-pulse">
                  {unreadCount} new
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings & Security</span>
            </button>
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>

          <button
            onClick={() => { logout(); navigate('/admin/login'); }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 text-xs font-bold text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-black text-white">Dashboard Overview</h1>
              <p className="text-slate-400 text-sm mt-1">
                Manage all aspects of your portfolio website in real time.
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Projects</span>
                <span className="block text-3xl font-black text-sky-400 mt-2">{projects.length}</span>
                <span className="text-xs text-slate-500 mt-1 block">Live across all categories</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Services Offered</span>
                <span className="block text-3xl font-black text-purple-400 mt-2">{services.length}</span>
                <span className="text-xs text-slate-500 mt-1 block">Design, Web & Mobile</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Skills</span>
                <span className="block text-3xl font-black text-emerald-400 mt-2">{skills.length}</span>
                <span className="text-xs text-slate-500 mt-1 block">Technical competencies</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Inbound Messages</span>
                <span className="block text-3xl font-black text-rose-400 mt-2">{messages.length}</span>
                <span className="text-xs text-rose-300 mt-1 block">{unreadCount} unread inquiry</span>
              </div>
            </div>

            {/* Recent Messages Preview */}
            <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Recent Messages</h3>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="text-xs font-bold text-sky-400 hover:underline cursor-pointer"
                >
                  View All Messages ({messages.length}) →
                </button>
              </div>

              {messages.length === 0 ? (
                <p className="text-sm text-slate-500 py-4 text-center">No messages received yet.</p>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 3).map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`p-4 rounded-xl border transition-colors flex items-start justify-between gap-4 ${
                        msg.read ? 'bg-slate-900/40 border-slate-800' : 'bg-sky-950/30 border-sky-800/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{msg.name}</span>
                          <span className="text-xs text-slate-400">&lt;{msg.email}&gt;</span>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">New</span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-sky-400 mt-0.5">{msg.subject}</p>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">{msg.message}</p>
                      </div>

                      <span className="text-[11px] text-slate-500 whitespace-nowrap">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: PROFILE & PERSONAL INFO */}
        {activeTab === 'profile' && (
          <ProfileTab
            profile={profile}
            onUpdate={async (updated) => {
              const res = await updateProfile(updated);
              if (res.success) showNotice('Profile updated successfully!');
            }}
            onUpload={uploadFile}
          />
        )}

        {/* TAB 3: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <ProjectsTab
            projects={projects}
            onCreate={async (p) => {
              const res = await createProject(p);
              if (res.success) showNotice('Project created successfully!');
            }}
            onUpdate={async (id, p) => {
              const res = await updateProject(id, p);
              if (res.success) showNotice('Project updated successfully!');
            }}
            onDelete={async (id) => {
              const res = await deleteProject(id);
              if (res.success) showNotice('Project deleted!');
            }}
            onUpload={uploadFile}
          />
        )}

        {/* TAB 4: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <ServicesTab
            services={services}
            onCreate={async (s) => {
              const res = await createService(s);
              if (res.success) showNotice('Service created!');
            }}
            onUpdate={async (id, s) => {
              const res = await updateService(id, s);
              if (res.success) showNotice('Service updated!');
            }}
            onDelete={async (id) => {
              const res = await deleteService(id);
              if (res.success) showNotice('Service deleted!');
            }}
          />
        )}

        {/* TAB 5: SKILLS MANAGEMENT */}
        {activeTab === 'skills' && (
          <SkillsTab
            skills={skills}
            onCreate={async (sk) => {
              const res = await createSkill(sk);
              if (res.success) showNotice('Skill added!');
            }}
            onUpdate={async (id, sk) => {
              const res = await updateSkill(id, sk);
              if (res.success) showNotice('Skill updated!');
            }}
            onDelete={async (id) => {
              const res = await deleteSkill(id);
              if (res.success) showNotice('Skill removed!');
            }}
          />
        )}

        {/* TAB 6: EXPERIENCE & CASE STUDY */}
        {activeTab === 'experience' && (
          <ExperienceTab
            experience={experience}
            education={education}
            caseStudy={caseStudy}
            onCreateExp={createExperience}
            onUpdateExp={updateExperience}
            onDeleteExp={deleteExperience}
            onCreateEdu={createEducation}
            onUpdateEdu={updateEducation}
            onDeleteEdu={deleteEducation}
            onUpdateCase={async (cs) => {
              const res = await updateCaseStudy(cs);
              if (res.success) showNotice('Case study updated!');
            }}
          />
        )}

        {/* TAB 7: SOCIAL MEDIA MANAGEMENT */}
        {activeTab === 'socials' && (
          <SocialsTab
            socials={socials}
            onUpdate={async (newList) => {
              const res = await updateSocials(newList);
              if (res.success) showNotice('Social links saved!');
            }}
          />
        )}

        {/* TAB 8: MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <MessagesTab
            messages={messages}
            onMarkRead={async (id, read) => {
              await markMessageRead(id, read);
              showNotice(read ? 'Marked as read' : 'Marked as unread');
            }}
            onDelete={async (id) => {
              await deleteMessage(id);
              showNotice('Message deleted');
            }}
          />
        )}

        {/* TAB 9: SETTINGS & SECURITY */}
        {activeTab === 'settings' && (
          <SettingsTab
            settings={siteSettings}
            onUpdateSettings={async (s) => {
              const res = await updateSettings(s);
              if (res.success) showNotice('Settings saved!');
            }}
            onChangeCredentials={async (payload) => {
              const res = await changeCredentials(payload);
              if (res.success) {
                showNotice('Credentials updated successfully!');
              } else {
                showNotice(res.error, 'error');
              }
            }}
          />
        )}

      </main>

    </div>
  );
}

// ==========================================
// SUB-COMPONENTS FOR ADMIN TABS
// ==========================================

function ProfileTab({ profile, onUpdate, onUpload }) {
  const [form, setForm] = useState({ ...profile });
  const [bulletsText, setBulletsText] = useState((profile.heroBullets || []).join('\n'));
  const [tickerText, setTickerText] = useState((profile.tickerKeywords || []).join(', '));
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const res = await onUpload(file);
    setUploading(false);
    if (res.success) {
      setForm(prev => ({ ...prev, avatarUrl: res.url }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const heroBullets = bulletsText.split('\n').map(b => b.trim()).filter(Boolean);
    const tickerKeywords = tickerText.split(',').map(k => k.trim()).filter(Boolean);
    onUpdate({ ...form, heroBullets, tickerKeywords });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Profile & Personal Information</h1>
          <p className="text-slate-400 text-xs">Update your public identity, roles, and bio.</p>
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          Save Changes
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Avatar & Visual Identity</h3>
        
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
            {form.avatarUrl ? (
              <img src={form.avatarUrl} alt="Avatar Preview" className="w-full h-full object-contain" />
            ) : (
              <User className="w-8 h-8 text-slate-500" />
            )}
          </div>

          <div className="space-y-2 flex-1">
            <label className="block text-xs font-semibold text-slate-400">
              Upload New Photo / Avatar Image:
            </label>
            <div className="flex items-center gap-3">
              <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white cursor-pointer border border-slate-700 inline-flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" />
                <span>Choose Image File</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
              {uploading && <Loader2 className="w-4 h-4 animate-spin text-sky-400" />}
            </div>
            <input
              type="text"
              name="avatarUrl"
              placeholder="Or enter direct image URL (/assets/profile.png)"
              value={form.avatarUrl || ''}
              onChange={handleChange}
              className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name || ''}
            onChange={handleChange}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title / Headline</label>
          <input
            type="text"
            name="title"
            value={form.title || ''}
            onChange={handleChange}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Status Badge Text</label>
          <input
            type="text"
            name="badgeText"
            value={form.badgeText || ''}
            onChange={handleChange}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Contact Email</label>
          <input
            type="email"
            name="email"
            value={form.email || ''}
            onChange={handleChange}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone / WhatsApp</label>
          <input
            type="text"
            name="phone"
            value={form.phone || ''}
            onChange={handleChange}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location || ''}
            onChange={handleChange}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Hero Bullet Points (One per line)</label>
          <textarea
            rows="3"
            value={bulletsText}
            onChange={(e) => setBulletsText(e.target.value)}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Bio Paragraph 1</label>
          <textarea
            rows="3"
            name="bio1"
            value={form.bio1 || ''}
            onChange={handleChange}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Bio Paragraph 2</label>
          <textarea
            rows="3"
            name="bio2"
            value={form.bio2 || ''}
            onChange={handleChange}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Moving Ticker Keywords (Comma separated)</label>
          <input
            type="text"
            value={tickerText}
            onChange={(e) => setTickerText(e.target.value)}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>
    </form>
  );
}

function ProjectsTab({ projects, onCreate, onUpdate, onDelete, onUpload }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    category: 'Web Development',
    description: '',
    details: '',
    image: '/assets/web1.jpg',
    tags: '',
    featured: false,
    liveUrl: '',
    githubUrl: ''
  });
  const [uploading, setUploading] = useState(false);

  const openNew = () => {
    setEditingId(null);
    setForm({
      title: '',
      category: 'Web Development',
      description: '',
      details: '',
      image: '/assets/web1.jpg',
      tags: '',
      featured: false,
      liveUrl: '',
      githubUrl: ''
    });
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title || '',
      category: p.category || 'Web Development',
      description: p.description || '',
      details: p.details || '',
      image: p.image || '/assets/web1.jpg',
      tags: (p.tags || []).join(', '),
      featured: Boolean(p.featured),
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || ''
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const res = await onUpload(file);
    setUploading(false);
    if (res.success) {
      setForm(prev => ({ ...prev, image: res.url }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingId) {
      onUpdate(editingId, payload);
    } else {
      onCreate(payload);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Project Showcase Management</h1>
          <p className="text-slate-400 text-xs">Add, update, or remove projects shown on your portfolio.</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="p-5 rounded-2xl bg-[#0c1222] border border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 text-[10px] font-bold text-white uppercase">
                  {p.category}
                </span>
                {p.featured && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-[10px] font-black text-white">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white line-clamp-1">{p.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete project "${p.title}"?`)) onDelete(p.id);
                  }}
                  className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-sky-400 hover:underline flex items-center gap-1">
                  <span>Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-[#0c1222] border border-slate-800 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingId ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Software">Software</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded text-sky-500 cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-xs font-bold text-slate-300 cursor-pointer">
                    Show as Featured Project
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Short Description (Card summary)</label>
                <textarea
                  rows="2"
                  required
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Full Details (Modal view)</label>
                <textarea
                  rows="3"
                  value={form.details}
                  onChange={(e) => setForm(prev => ({ ...prev, details: e.target.value }))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                />
              </div>

              {/* Image Uploader */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Project Screenshot / Image</label>
                <div className="flex items-center gap-3 mb-2">
                  <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white cursor-pointer border border-slate-700 inline-flex items-center gap-2">
                    <Upload className="w-3 h-3" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  {uploading && <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />}
                  <span className="text-[11px] text-slate-400">or enter path below</span>
                </div>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Tech Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Next.js, Figma, Tailwind"
                  value={form.tags}
                  onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={form.liveUrl}
                    onChange={(e) => setForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">GitHub / Code URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={form.githubUrl}
                    onChange={(e) => setForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs"
                >
                  {editingId ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ServicesTab({ services, onCreate, onUpdate, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    tags: '',
    icon: 'Monitor',
    color: 'blue'
  });

  const openNew = () => {
    setEditingId(null);
    setForm({ title: '', description: '', tags: '', icon: 'Monitor', color: 'blue' });
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditingId(s.id);
    setForm({
      title: s.title || '',
      description: s.description || '',
      tags: (s.tags || []).join(', '),
      icon: s.icon || 'Monitor',
      color: s.color || 'blue'
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    if (editingId) {
      onUpdate(editingId, payload);
    } else {
      onCreate(payload);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Services Management</h1>
          <p className="text-slate-400 text-xs">Manage the services and value propositions you offer.</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.id} className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <DynamicIcon name={s.icon} className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500">{s.number || '01'}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">{s.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {(s.tags || []).map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-800">
              <button
                onClick={() => openEdit(s)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete service "${s.title}"?`)) onDelete(s.id);
                }}
                className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#0c1222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Icon Name (e.g. Palette, Monitor, Smartphone, Server)</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
                <textarea
                  rows="3"
                  required
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Key Tags (Comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillsTab({ skills, onCreate, onUpdate, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: 'Web Development',
    level: 90,
    icon: 'Code'
  });

  const openNew = () => {
    setEditingId(null);
    setForm({ name: '', category: 'Web Development', level: 90, icon: 'Code' });
    setModalOpen(true);
  };

  const openEdit = (sk) => {
    setEditingId(sk.id);
    setForm({
      name: sk.name || '',
      category: sk.category || 'Web Development',
      level: sk.level || 90,
      icon: sk.icon || 'Code'
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, form);
    } else {
      onCreate(form);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Skills & Competencies</h1>
          <p className="text-slate-400 text-xs">Configure technical skills and proficiency percentages.</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((sk) => (
          <div key={sk.id} className="p-4 rounded-xl bg-[#0c1222] border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <DynamicIcon name={sk.icon} className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{sk.name}</h4>
                <span className="text-[10px] text-slate-400">{sk.category} • {sk.level}%</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => openEdit(sk)}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete skill "${sk.name}"?`)) onDelete(sk.id);
                }}
                className="p-1.5 rounded-md hover:bg-rose-950 text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#0c1222] border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                >
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Backend & Database">Backend & Database</option>
                  <option value="Tools & Cloud">Tools & Cloud</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                  Proficiency Level ({form.level}%)
                </label>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={form.level}
                  onChange={(e) => setForm(prev => ({ ...prev, level: Number(e.target.value) }))}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Icon Name</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ExperienceTab({ experience, education, caseStudy, onCreateExp, onUpdateExp, onDeleteExp, onCreateEdu, onUpdateEdu, onDeleteEdu, onUpdateCase }) {
  const [csForm, setCsForm] = useState({ ...caseStudy });
  const [metricsText, setMetricsText] = useState((caseStudy.metrics || []).map(m => `${m.label}:${m.value}`).join('\n'));

  const handleCaseSubmit = (e) => {
    e.preventDefault();
    const metrics = metricsText.split('\n').map(line => {
      const [label, value] = line.split(':');
      return { label: label?.trim() || '', value: value?.trim() || '' };
    }).filter(m => m.label && m.value);
    onUpdateCase({ ...csForm, metrics });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white">Experience, Education & Case Studies</h1>
        <p className="text-slate-400 text-xs">Manage your career timeline and highlighted case study.</p>
      </div>

      {/* Work Experience */}
      <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Career Experience Timeline</h3>
        <div className="space-y-3">
          {experience.map((exp) => (
            <div key={exp.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{exp.title}</h4>
                <span className="text-xs text-sky-400 font-semibold">{exp.company} • {exp.period}</span>
                <p className="text-xs text-slate-400 mt-1">{exp.description}</p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm(`Delete experience record?`)) onDeleteExp(exp.id);
                }}
                className="p-1.5 rounded-md hover:bg-rose-950 text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study */}
      <form onSubmit={handleCaseSubmit} className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Featured Case Study Showcase</h3>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs"
          >
            Update Case Study
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Case Study Title</label>
          <input
            type="text"
            value={csForm.title || ''}
            onChange={(e) => setCsForm(prev => ({ ...prev, title: e.target.value }))}
            className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description & Impact</label>
          <textarea
            rows="3"
            value={csForm.description || ''}
            onChange={(e) => setCsForm(prev => ({ ...prev, description: e.target.value }))}
            className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
            Metrics (Format: Label:Value, one per line e.g. "Latency:&lt;45ms")
          </label>
          <textarea
            rows="3"
            value={metricsText}
            onChange={(e) => setMetricsText(e.target.value)}
            className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white font-mono"
          />
        </div>
      </form>
    </div>
  );
}

function SocialsTab({ socials, onUpdate }) {
  const [list, setList] = useState([...socials]);

  const handleChange = (index, field, value) => {
    const updated = [...list];
    updated[index][field] = value;
    setList(updated);
  };

  const handleToggle = (index) => {
    const updated = [...list];
    updated[index].isActive = !updated[index].isActive;
    setList(updated);
  };

  const addNew = () => {
    setList([
      ...list,
      {
        id: `soc-${Date.now()}`,
        platform: 'New Platform',
        url: 'https://',
        icon: 'Globe',
        isActive: true
      }
    ]);
  };

  const remove = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const save = () => {
    onUpdate(list);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Social Media Links</h1>
          <p className="text-slate-400 text-xs">
            Manage links for GitHub, LinkedIn, WhatsApp, X, Instagram, Facebook, etc.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Social</span>
          </button>
          <button
            onClick={save}
            className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Save All Links
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {list.map((soc, idx) => (
          <div key={soc.id || idx} className="p-4 rounded-xl bg-[#0c1222] border border-slate-800 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                <DynamicIcon name={soc.icon || soc.platform} className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={soc.platform}
                onChange={(e) => handleChange(idx, 'platform', e.target.value)}
                placeholder="Platform"
                className="w-32 py-1.5 px-2.5 rounded-lg border border-slate-800 bg-slate-900 text-xs text-white"
              />
            </div>

            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                value={soc.url}
                onChange={(e) => handleChange(idx, 'url', e.target.value)}
                placeholder="https://..."
                className="w-full py-1.5 px-2.5 rounded-lg border border-slate-800 bg-slate-900 text-xs text-white"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soc.isActive}
                  onChange={() => handleToggle(idx)}
                  className="rounded text-sky-500"
                />
                <span>Active</span>
              </label>

              <button
                onClick={() => remove(idx)}
                className="p-1.5 rounded-lg hover:bg-rose-950 text-rose-400"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesTab({ messages, onMarkRead, onDelete }) {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-white">Contact Messages Inbox</h1>
        <p className="text-slate-400 text-xs">
          View inquiries, feedback, and project requests submitted through your website contact form.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0c1222] border border-slate-800 text-slate-500">
          <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-semibold">No messages received yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`p-6 rounded-2xl border transition-all space-y-3 ${
                msg.read ? 'bg-[#0c1222] border-slate-800' : 'bg-slate-900/90 border-sky-600/60 shadow-lg shadow-sky-500/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-white">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-xs text-sky-400 hover:underline">
                    {msg.email}
                  </a>
                  {!msg.read && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      Unread
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-400">
                <span>Subject: </span>
                <span className="text-slate-200">{msg.subject}</span>
                {msg.serviceCategory && (
                  <span className="ml-3 px-2 py-0.5 rounded bg-slate-800 text-sky-400">
                    {msg.serviceCategory}
                  </span>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onMarkRead(msg.id, !msg.read)}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    {msg.read ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this message?')) onDelete(msg.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-rose-950 text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsTab({ settings, onUpdateSettings, onChangeCredentials }) {
  const [siteForm, setSiteForm] = useState({ ...settings });
  const [credForm, setCredForm] = useState({ currentPassword: '', newUsername: '', newPassword: '' });

  const handleSiteSubmit = (e) => {
    e.preventDefault();
    onUpdateSettings(siteForm);
  };

  const handleCredSubmit = (e) => {
    e.preventDefault();
    onChangeCredentials(credForm);
    setCredForm({ currentPassword: '', newUsername: '', newPassword: '' });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-white">Website Settings & Security</h1>
        <p className="text-slate-400 text-xs">Configure site metadata and admin authentication credentials.</p>
      </div>

      {/* Website Meta Settings */}
      <form onSubmit={handleSiteSubmit} className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">SEO & General Settings</h3>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Website Title (SEO)</label>
          <input
            type="text"
            value={siteForm.siteTitle || ''}
            onChange={(e) => setSiteForm(prev => ({ ...prev, siteTitle: e.target.value }))}
            className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Meta Description</label>
          <textarea
            rows="2"
            value={siteForm.metaDescription || ''}
            onChange={(e) => setSiteForm(prev => ({ ...prev, metaDescription: e.target.value }))}
            className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Footer Copyright Text</label>
          <input
            type="text"
            value={siteForm.footerCopyright || ''}
            onChange={(e) => setSiteForm(prev => ({ ...prev, footerCopyright: e.target.value }))}
            className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs"
        >
          Save Site Settings
        </button>
      </form>

      {/* Change Credentials Form */}
      <form onSubmit={handleCredSubmit} className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Change Admin Login Credentials</h3>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Current Password *</label>
          <input
            type="password"
            required
            value={credForm.currentPassword}
            onChange={(e) => setCredForm(prev => ({ ...prev, currentPassword: e.target.value }))}
            className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">New Username (Optional)</label>
            <input
              type="text"
              placeholder="Keep current if blank"
              value={credForm.newUsername}
              onChange={(e) => setCredForm(prev => ({ ...prev, newUsername: e.target.value }))}
              className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">New Password (Min 6 chars)</label>
            <input
              type="password"
              placeholder="Keep current if blank"
              value={credForm.newPassword}
              onChange={(e) => setCredForm(prev => ({ ...prev, newPassword: e.target.value }))}
              className="w-full py-2 px-3 rounded-xl border border-slate-800 bg-slate-900 text-xs text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
        >
          Update Credentials
        </button>
      </form>
    </div>
  );
}
