import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Sun, Moon, Menu, X, FileText } from 'lucide-react';

export default function Header() {
  const { portfolio, theme, toggleTheme } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Secret phone gestures
  const [tapCount, setTapCount] = useState(0);
  const tapTimerRef = useRef(null);
  const longPressTimerRef = useRef(null);

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

  const handleTouchStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      navigate('/admin');
    }, 1800);
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const profile = portfolio?.profile || { name: 'THADD 101' };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#080d19]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo with Invisible Secret Mobile Gestures (3 taps or 2s press-and-hold) */}
        <div 
          onClick={handleSecretTap}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="flex items-center gap-2 group cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            T
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:opacity-90 transition-opacity">
            {profile.name}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href="#about" className="px-3.5 py-2 rounded-lg hover:text-sky-500 dark:hover:text-[#38bdf8] hover:bg-sky-50 dark:hover:bg-slate-800/60 transition-all">About</a>
          <a href="#services" className="px-3.5 py-2 rounded-lg hover:text-sky-500 dark:hover:text-[#38bdf8] hover:bg-sky-50 dark:hover:bg-slate-800/60 transition-all">Services</a>
          <a href="#skills" className="px-3.5 py-2 rounded-lg hover:text-sky-500 dark:hover:text-[#38bdf8] hover:bg-sky-50 dark:hover:bg-slate-800/60 transition-all">Skills</a>
          <a href="#projects" className="px-3.5 py-2 rounded-lg hover:text-sky-500 dark:hover:text-[#38bdf8] hover:bg-sky-50 dark:hover:bg-slate-800/60 transition-all">Projects</a>
          <a href="#experience" className="px-3.5 py-2 rounded-lg hover:text-sky-500 dark:hover:text-[#38bdf8] hover:bg-sky-50 dark:hover:bg-slate-800/60 transition-all">Experience</a>
          <a href="#contact" className="px-3.5 py-2 rounded-lg hover:text-sky-500 dark:hover:text-[#38bdf8] hover:bg-sky-50 dark:hover:bg-slate-800/60 transition-all">Contact</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all duration-200 cursor-pointer flex items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95" 
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-[#38bdf8]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>

          {/* Desktop Resume Button */}
          <Link 
            to="/resume" 
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-xs sm:text-sm font-bold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden p-2 rounded-xl text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col gap-1 px-6 pt-3 pb-6 bg-white/95 border-b border-slate-200 dark:bg-[#080d19]/95 dark:border-slate-800 backdrop-blur-md animate-in slide-in-from-top-4 duration-200">
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">About</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Services</a>
          <a href="#skills" onClick={() => setIsMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Skills</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Projects</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Experience</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Contact</a>
          <div className="pt-2 flex items-center">
            <Link to="/resume" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-white">
              Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}