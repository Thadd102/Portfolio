import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import DynamicIcon from './DynamicIcon';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Services() {
  const { portfolio } = usePortfolio();

  const services = portfolio?.services || [
    {
      id: 'srv-1',
      number: '01',
      title: 'GRAPHIC & UI/UX DESIGN',
      description: 'Crafting distinctive brand visual identities, modern UI/UX wireframes & interactive prototypes, marketing graphics, and custom design systems.',
      tags: ['Figma', 'Photoshop', 'Illustrator', 'Brand Identity'],
      icon: 'Palette',
      color: 'pink',
      theme: {
        leftBorder: 'border-l-pink-500',
        iconBg: 'bg-pink-500',
        text: 'text-pink-600 dark:text-pink-400',
        badgeBg: 'bg-pink-50 text-pink-600 dark:bg-pink-950/50 dark:text-pink-400',
      }
    },
    {
      id: 'srv-2',
      number: '02',
      title: 'WEB DEVELOPMENT',
      description: 'Building modern, responsive websites with cutting-edge technologies, fluid micro-interactions, and high performance.',
      tags: ['JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
      icon: 'Monitor',
      color: 'blue',
      theme: {
        leftBorder: 'border-l-blue-500',
        iconBg: 'bg-blue-500',
        text: 'text-blue-600 dark:text-blue-400',
        badgeBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400',
      }
    },
    {
      id: 'srv-3',
      number: '03',
      title: 'MOBILE APP DEVELOPMENT',
      description: 'Engineering cross-platform mobile apps for iOS and Android with intuitive interfaces, smooth animations, and robust offline sync.',
      tags: ['React Native', 'Expo', 'Mobile UI', 'REST APIs'],
      icon: 'Smartphone',
      color: 'emerald',
      theme: {
        leftBorder: 'border-l-emerald-500',
        iconBg: 'bg-emerald-500',
        text: 'text-emerald-600 dark:text-emerald-400',
        badgeBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400',
      }
    },
    {
      id: 'srv-4',
      number: '04',
      title: 'BACKEND & API ENGINEERING',
      description: 'Creating powerful, scalable backends, database architectures, and secure REST/GraphQL APIs with robust authentication.',
      tags: ['Node.js', 'PostgreSQL', 'Supabase', 'SQL'],
      icon: 'Server',
      color: 'purple',
      theme: {
        leftBorder: 'border-l-purple-500',
        iconBg: 'bg-purple-500',
        text: 'text-purple-600 dark:text-purple-400',
        badgeBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400',
      }
    }
  ];

  return (
    <section id="services" className="py-20 md:py-28 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Expertise & Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              What I Offer
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-md">
            Comprehensive services covering graphic design, web development, mobile applications, and backend infrastructure.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => {
            const num = item.number || String(index + 1).padStart(2, '0');
            const theme = item.theme || {
              leftBorder: 'border-l-sky-500',
              iconBg: 'bg-sky-500',
              text: 'text-sky-600 dark:text-sky-400',
              badgeBg: 'bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400'
            };

            return (
              <div 
                key={item.id || index} 
                className={`group relative flex flex-col justify-between p-7 rounded-3xl bg-white dark:bg-[#0c1322] border-l-4 ${theme.leftBorder} border-y border-r border-slate-200/80 dark:border-y-slate-800/60 dark:border-r-slate-800/60 shadow-lg shadow-slate-200/40 dark:shadow-none hover:-translate-y-2 hover:shadow-xl transition-all duration-300`}
              >
                <div>
                  {/* Top Row: Icon Box & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl ${theme.iconBg} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <DynamicIcon name={item.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 dark:text-slate-800 select-none">
                      {num}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-wide mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(item.tags || []).map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${theme.badgeBg}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Arrow */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <a href="#contact" className={`text-xs font-bold uppercase tracking-wider ${theme.text} hover:underline`}>
                      Get Started
                    </a>
                    <a href="#contact" className={`p-1.5 transition-transform duration-200 group-hover:translate-x-1 ${theme.text}`}>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}