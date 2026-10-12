import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Palette, Monitor, Layers, Award } from 'lucide-react';

export default function About() {
  const { portfolio } = usePortfolio();

  const profile = portfolio?.profile || {
    bio1: "I am a multi-disciplinary Graphic Designer, Web Developer & App Developer driven by a passion for building fast, scalable, and intuitive digital experiences. Specializing in end-to-end development, I combine pixel-perfect visual design with robust software architecture to turn complex ideas into seamless digital products.",
    bio2: "My stack spans modern graphic design tools (Figma, Adobe Creative Suite) through full-stack web and mobile ecosystems (React, Next.js, Node.js, React Native, Supabase, PostgreSQL). Whether engineering custom web tools, mobile apps, or establishing unforgettable brand identities, I build solutions that deliver real-world value.",
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Projects Completed", value: "45+" },
      { label: "Satisfied Clients", value: "30+" },
      { label: "Code & Design Quality", value: "100%" }
    ]
  };

  const disciplines = [
    {
      title: "Attractive UI/UX Design",
      desc: "Pixel-perfect Figma systems, wireframes, micro-interactions & modern aesthetics",
      icon: Palette,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Full-Stack Web Development",
      desc: "Fast, responsive web applications built with React 19, Next.js, and TypeScript",
      icon: Monitor,
      color: "from-sky-500 to-blue-600"
    },
    {
      title: "SaaS & Web Platforms",
      desc: "Cloud telemetry dashboards, interactive web tools & real-time architectures",
      icon: Layers,
      color: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <section id="about" className="relative py-20 md:py-28 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Who I Am</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-indigo-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Bio Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <p className="text-base sm:text-lg md:text-xl font-normal text-slate-700 dark:text-slate-300 leading-relaxed">
              {profile.bio1}
            </p>
            <p className="text-base sm:text-lg md:text-xl font-normal text-slate-700 dark:text-slate-300 leading-relaxed">
              {profile.bio2}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {disciplines.map((d, idx) => {
                const IconComponent = d.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0c1222] shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${d.color} flex items-center justify-center text-white mb-3 shadow-md`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{d.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{d.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Key Stats Counters Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            {(profile.stats || []).map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b101e] border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-200/40 dark:shadow-none hover:scale-105 transition-transform duration-300 group"
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 text-center mt-2 tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}