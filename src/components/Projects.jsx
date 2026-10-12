import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ExternalLink,
  Eye,
  X,
  Sparkles,
  Layers,
  Monitor,
  Tablet,
  Smartphone,
  Lock,
  RotateCw,
  Play
} from 'lucide-react';

const defaultWeb1 = '/assets/web1.jpg';

export default function Projects() {
  const { portfolio } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('All Web Projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [liveDemoProject, setLiveDemoProject] = useState(null);
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [iframeKey, setIframeKey] = useState(0);

  const projects = portfolio?.projects || [];

  const categories = [
    'All Web Projects',
    'SaaS & Dashboards',
    'Creative & Agency',
    'Interactive Web Apps',
    'Full-Stack Platforms'
  ];

  const filteredProjects = (activeCategory === 'All Web Projects' || activeCategory === 'All')
    ? projects
    : projects.filter(p => p.subCategory === activeCategory || p.category === activeCategory);

  const getCategoryCount = (cat) => {
    if (cat === 'All Web Projects') return projects.length;
    return projects.filter(p => p.subCategory === cat).length;
  };

  const handleOpenLiveDemo = (project) => {
    setLiveDemoProject(project);
    setViewportMode('desktop');
    setIframeKey(prev => prev + 1);
  };

  return (
    <section id="projects" className="relative py-20 md:py-28 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack Web Development & UI/UX Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Web Development & UI/UX Showcase
            </h2>
            <p className="text-base font-normal text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Production web applications and responsive UI/UX experiences. Every project is backed by a live deployed website you can test in real-time.
            </p>
          </div>

          {/* Category Tabs with Counts */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = getCategoryCount(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-105'
                      : 'bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-extrabold ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const imgSrc = project.image || defaultWeb1;

            return (
              <div 
                key={project.id || index} 
                className="flex flex-col rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0b101d] overflow-hidden hover:border-sky-500/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 shadow-md shadow-slate-200/30 dark:shadow-none group"
              >
                {/* Image Preview Container */}
                <div 
                  onClick={() => handleOpenLiveDemo(project)}
                  className="relative w-full h-56 overflow-hidden bg-slate-100 dark:bg-slate-900 cursor-pointer"
                  title="Click to launch interactive live demo"
                >
                  <img
                    src={imgSrc}
                    alt={project.title}
                    onError={(e) => { e.currentTarget.src = defaultWeb1; }}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6">
                  {/* SubCategory and Live Status */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                      {project.subCategory || 'Web Development'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Live Site</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-sky-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mt-2 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  {(project.tags || []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.slice(0, 4).map((tag, tIndex) => (
                        <span 
                          key={tIndex} 
                          className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 text-[11px] font-semibold text-slate-400">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="flex items-center justify-between gap-3 mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-sky-500 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <button 
                          onClick={() => handleOpenLiveDemo(project)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all hover:scale-105 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Live Demo</span>
                        </button>
                      )}

                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-sky-500 text-slate-600 dark:text-slate-400 hover:border-slate-300 transition-colors"
                          title="Open Live Website in New Tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ============================================================ */}
      {/* 1. INTERACTIVE LIVE WEBSITE DEMO VIEWER MODAL */}
      {/* ============================================================ */}
      {liveDemoProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Browser Top Navigation Bar */}
            <div className="px-4 py-3 bg-[#0a0f1d] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              
              {/* Left: Window Controls & Title */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
                  <h4 className="text-xs font-bold text-white max-w-[200px] truncate">
                    {liveDemoProject.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-bold">
                    {liveDemoProject.category}
                  </span>
                </div>
              </div>

              {/* Center: Simulated URL Address Bar */}
              <div className="flex-1 max-w-md hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300 truncate font-mono text-[11px]">
                  {liveDemoProject.liveUrl}
                </span>
                <button 
                  onClick={() => setIframeKey(prev => prev + 1)} 
                  className="ml-auto hover:text-white transition-colors cursor-pointer"
                  title="Reload Live Demo"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              </div>

              {/* Right: Viewport Controls & Actions */}
              <div className="flex items-center gap-2">
                
                {/* Viewport Switcher */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewportMode === 'desktop' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Desktop View (100%)"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewportMode('tablet')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewportMode === 'tablet' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Tablet View (768px)"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewportMode === 'mobile' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Mobile View (390px)"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* External link button */}
                <a
                  href={liveDemoProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  title="Open live website in full window"
                >
                  <span>Open Fullsite</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Close Button */}
                <button
                  onClick={() => setLiveDemoProject(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Live Demo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Live Interactive Iframe Display Container */}
            <div className="flex-1 bg-slate-950 overflow-hidden flex items-center justify-center p-0 relative">
              <div 
                className="h-full transition-all duration-300 relative bg-white overflow-hidden shadow-2xl"
                style={{
                  width: viewportMode === 'mobile' ? '390px' : viewportMode === 'tablet' ? '768px' : '100%',
                  borderRadius: viewportMode === 'desktop' ? '0px' : '16px',
                  border: viewportMode === 'desktop' ? 'none' : '8px solid #1e293b'
                }}
              >
                <iframe
                  key={iframeKey}
                  src={liveDemoProject.liveUrl}
                  title={liveDemoProject.title}
                  className="w-full h-full border-none"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                />
              </div>

              {/* Bottom Floating Hint Overlay for direct access */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-semibold text-slate-300 flex items-center gap-2 shadow-xl pointer-events-auto">
                <span>Interacting with live demo.</span>
                <a
                  href={liveDemoProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Open in external tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. CASE STUDY DETAILS MODAL */}
      {/* ============================================================ */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#0c1222] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
              <img
                src={selectedProject.image || defaultWeb1}
                alt={selectedProject.title}
                onError={(e) => { e.currentTarget.src = defaultWeb1; }}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-950 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {selectedProject.title}
              </h3>
              
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedProject.details || selectedProject.description}
              </p>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.tags || []).map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 text-xs font-bold border border-sky-200 dark:border-sky-800/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                {selectedProject.liveUrl && (
                  <button
                    onClick={() => {
                      const proj = selectedProject;
                      setSelectedProject(null);
                      handleOpenLiveDemo(proj);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Launch Live Demo</span>
                  </button>
                )}

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}


                <button
                  onClick={() => setSelectedProject(null)}
                  className="ml-auto px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold text-sm cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
