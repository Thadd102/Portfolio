import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import DynamicIcon from './DynamicIcon';
import { Cpu, Sparkles } from 'lucide-react';

export default function Skills() {
  const { portfolio } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('All');

  const skills = portfolio?.skills || [
    { id: 'sk-1', name: 'Figma & UI/UX Design', category: 'Graphic Design', level: 95, icon: 'Palette' },
    { id: 'sk-2', name: 'Adobe Photoshop & Illustrator', category: 'Graphic Design', level: 90, icon: 'Image' },
    { id: 'sk-3', name: 'Brand Identity & Systems', category: 'Graphic Design', level: 88, icon: 'Sparkles' },
    { id: 'sk-4', name: 'React & Next.js', category: 'Web Development', level: 96, icon: 'Monitor' },
    { id: 'sk-5', name: 'Tailwind CSS & Modern CSS', category: 'Web Development', level: 98, icon: 'Layout' },
    { id: 'sk-6', name: 'TypeScript & JavaScript', category: 'Web Development', level: 94, icon: 'Code' },
    { id: 'sk-7', name: 'React Native & Expo', category: 'App Development', level: 90, icon: 'Smartphone' },
    { id: 'sk-8', name: 'Mobile UI / UX & Navigation', category: 'App Development', level: 92, icon: 'Layers' },
    { id: 'sk-9', name: 'Cross-Platform State Management', category: 'App Development', level: 88, icon: 'Cpu' },
    { id: 'sk-10', name: 'Node.js & Express', category: 'Backend & Database', level: 92, icon: 'Server' },
    { id: 'sk-11', name: 'PostgreSQL & Supabase', category: 'Backend & Database', level: 88, icon: 'Database' },
    { id: 'sk-12', name: 'REST APIs & WebSockets', category: 'Backend & Database', level: 92, icon: 'Globe' }
  ];

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 transition-colors duration-300 relative bg-slate-50/50 dark:bg-[#070b14]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            Skills & Proficiencies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Tools, languages, and frameworks I use across Graphic Design, Web Development, and App Engineering.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-105'
                  : 'bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div 
              key={skill.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200/80 dark:border-slate-800/80 shadow-md shadow-slate-200/30 dark:shadow-none hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 dark:text-[#38bdf8] flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <DynamicIcon name={skill.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <span className="text-sm font-black text-sky-600 dark:text-[#38bdf8]">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
