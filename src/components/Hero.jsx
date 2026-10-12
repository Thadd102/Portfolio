import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import defaultProfile from '../assets/profile.png';
import DynamicIcon from './DynamicIcon';
import { ArrowRight, CheckCircle2, Sparkles, Send } from 'lucide-react';

export default function Hero() {
  const { portfolio } = usePortfolio();

  const profile = portfolio?.profile || {
    greeting: "Hi! I'm",
    name: "THADD 101",
    title: "Full-Stack Web Developer & UI/UX Specialist",
    badgeText: "Available for work",
    heroBullets: [
      "Crafting high-impact UI/UX designs & visual brand identities.",
      "Building fast, scalable full-stack web applications.",
      "Engineering responsive modern web platforms & SaaS solutions."
    ],
    avatarUrl: "/assets/profile.png",
    tickerKeywords: [
      "WEB DEVELOPMENT", "ATTRACTIVE UI/UX", "SAAS DASHBOARDS", "FULL STACK", "REACT & NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "INTERACTIVE WEB APPS"
    ]
  };

  const socials = (portfolio?.socials || []).filter(s => s.isActive);
  const avatarSrc = profile.avatarUrl || defaultProfile;

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* LEFT COLUMN: Intro Text & Call to Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6 z-10 text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-semibold w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{profile.badgeText || "Available for work"}</span>
            <Sparkles className="w-3.5 h-3.5 ml-1 text-sky-400" />
          </div>

          {/* Main Title */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {profile.greeting} <span className="text-[#38bdf8]">{profile.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-wide pt-1">
              {profile.title}
            </p>
          </div>

          {/* Bullet Points List */}
          <ul className="space-y-3 pt-2 text-slate-700 dark:text-slate-300 font-medium text-base sm:text-lg">
            {(profile.heroBullets || []).map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ff3b30] to-rose-600 hover:from-[#e03126] hover:to-rose-700 text-white font-bold text-base shadow-lg shadow-red-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Let's Talk</span>
            </a>
            
            <a 
              href="#projects" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-900 dark:text-white font-semibold text-base transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 active:scale-95 cursor-pointer"
            >
              <span>View Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social Icons Bar */}
          {socials.length > 0 && (
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Connect:</span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socials.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-[#38bdf8] hover:border-sky-500/50 hover:scale-110 active:scale-95 transition-all shadow-sm"
                    aria-label={soc.platform}
                    title={soc.platform}
                  >
                    <DynamicIcon name={soc.icon || soc.platform} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Portrait & Floating Badges (5 cols) */}
        <div className="lg:col-span-5 relative flex justify-center items-center z-10">
          <div className="relative w-full max-w-[460px] flex justify-center items-center">

            {/* Glowing Backdrop Ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-purple-500/20 blur-xl opacity-70 animate-pulse pointer-events-none" />

            {/* Top Right Decorative Animated Ring */}
            <div className="absolute -top-6 -right-2 sm:-right-6 w-24 h-24 rounded-full border-2 border-[#38bdf8]/30 animate-pulse pointer-events-none" />

            {/* Floating Decorative Colored Dots */}
            <span className="absolute top-12 left-2 w-3 h-3 bg-purple-400 rounded-full animate-bounce shadow-[0_0_8px_#c084fc]" />
            <span className="absolute bottom-28 left-0 w-3.5 h-3.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
            <span className="absolute top-1/2 -right-4 w-3 h-3 bg-blue-500 rounded-full animate-bounce shadow-[0_0_8px_#3b82f6]" />

            {/* Main Portrait Image Container */}
            <div className="relative w-full max-w-[400px] sm:max-w-[440px] overflow-visible bg-transparent">
              <img
                src={avatarSrc}
                alt={profile.name}
                onError={(e) => { e.currentTarget.src = defaultProfile; }}
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
              />
              
              {/* Floating Role Pill Badge */}
              <div className="absolute bottom-14 left-2 sm:left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 dark:bg-[#090e1a]/95 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold shadow-xl backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Designer & Full Stack</span>
              </div>
            </div>

            {/* BOTTOM TICKER BAR */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[95%] py-2.5 px-4 rounded-xl bg-[#0e1626]/90 border border-slate-700/60 backdrop-blur-md overflow-hidden z-20 shadow-xl">
              <div className="animate-ticker flex items-center gap-6 text-xs sm:text-sm font-extrabold tracking-widest text-slate-300 uppercase select-none">
                {(profile.tickerKeywords || []).concat(profile.tickerKeywords || []).map((keyword, i) => (
                  <React.Fragment key={i}>
                    <span>{keyword}</span>
                    <span className="text-sky-500">•</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: marqueeScroll 22s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}