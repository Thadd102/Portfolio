import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import DynamicIcon from './DynamicIcon';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { portfolio } = usePortfolio();
  const navigate = useNavigate();

  // Secret tap gesture for phone
  const [tapCount, setTapCount] = useState(0);
  const tapTimerRef = useRef(null);

  const handleSecretTap = () => {
    const nextCount = tapCount + 1;
    if (nextCount >= 3) {
      setTapCount(0);
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      navigate('/admin');
      return;
    }
    setTapCount(nextCount);
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => {
      setTapCount(0);
    }, 1000);
  };

  const profile = portfolio?.profile || { name: 'THADD 101' };
  const settings = portfolio?.settings || { footerCopyright: `© ${new Date().getFullYear()} THADD 101. All rights reserved.` };
  const socials = (portfolio?.socials || []).filter(s => s.isActive);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white dark:bg-[#060912] border-t border-slate-200/80 dark:border-slate-800/80 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100 dark:border-slate-800/60 items-start">
          
          {/* Col 1: Brand & Bio (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
                T
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {profile.name}
              </span>
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Crafting high-impact UI/UX designs, scalable full-stack web applications, and intuitive interactive digital experiences.
            </p>
          </div>

          {/* Col 2: Navigation (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">Sections</span>
              <ul className="space-y-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <li><a href="#about" className="hover:text-sky-500 transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-sky-500 transition-colors">Services</a></li>
                <li><a href="#skills" className="hover:text-sky-500 transition-colors">Skills</a></li>
                <li><a href="#projects" className="hover:text-sky-500 transition-colors">Projects</a></li>
                <li><a href="#experience" className="hover:text-sky-500 transition-colors">Experience</a></li>
              </ul>
            </div>
            <div>
              <span className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">Links</span>
              <ul className="space-y-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <li><Link to="/resume" className="hover:text-sky-500 transition-colors">My Resume</Link></li>
                <li><a href="#contact" className="hover:text-sky-500 transition-colors">Contact Me</a></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Socials & Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col md:items-end gap-4">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-sky-500 text-slate-600 dark:text-slate-300 hover:text-sky-500 transition-all cursor-pointer self-start md:self-end"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 flex-wrap">
              {socials.map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-sky-500 dark:hover:text-[#38bdf8] text-slate-600 dark:text-slate-400 hover:border-sky-500 transition-colors"
                  aria-label={soc.platform}
                  title={soc.platform}
                >
                  <DynamicIcon name={soc.icon || soc.platform} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p onClick={handleSecretTap} className="cursor-pointer select-none active:opacity-75">{settings.footerCopyright}</p>
          <div className="flex items-center gap-1">
            <span>Built with precision and</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>in React & Vite</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
