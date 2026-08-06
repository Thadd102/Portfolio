import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* Brand Logo */}
        <a href="#" className={styles.logo}>
          it's <span className={styles.logoHighlight}>me</span>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#services" className={styles.navLink}>Services</a>
          <a href="#experience" className={styles.navLink}>Experience</a>
          <a href="#projects" className={styles.navLink}>Projects</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </nav>

        {/* Action Controls */}
        <div className={styles.actions}>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={() => setIsDark(!isDark)} 
            className={styles.themeToggle} 
            aria-label="Toggle Theme"
          >
            {isDark ? (
              /* Moon Icon */
              <svg className="w-5 h-5 text-[#38bdf8] transition-transform duration-300 group-hover:-rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              /* Sun Icon */
              <svg className="w-5 h-5 text-amber-500 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Desktop Resume Button (Navigates to /resume route) */}
          <Link to="/resume" className={styles.desktopResumeBtn}>
            Resume
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={styles.hamburgerBtn}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6 transition-transform duration-200 rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className={styles.mobileMenuDrawer}>
          <a href="#about" onClick={() => setIsMenuOpen(false)} className={styles.mobileNavLink}>About</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)} className={styles.mobileNavLink}>Services</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)} className={styles.mobileNavLink}>Experience</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)} className={styles.mobileNavLink}>Projects</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className={styles.mobileNavLink}>Contact</a>
          <Link to="/resume" onClick={() => setIsMenuOpen(false)} className={styles.mobileResumeBtn}>
            Resume
          </Link>
        </div>
      )}
    </header>
  );
}

// ==========================================
// STYLES OBJECT (React Native Style Pattern)
// ==========================================
const styles = {
  header: "fixed top-0 left-0 w-full z-50 bg-white/90 border-b border-slate-200/80 text-slate-900 dark:bg-[#090e1a]/95 dark:border-slate-800/50 dark:text-white backdrop-blur-md transition-colors duration-300",
  container: "max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-3.5 flex items-center justify-between",
  
  // Logo: Subtle zoom and brightness transition
  logo: "text-2xl font-black tracking-tight text-slate-900 dark:text-white hover:scale-105 active:scale-95 transition-transform duration-200 inline-block",
  logoHighlight: "text-sky-500 dark:text-[#38bdf8]",
  
  // Desktop Nav: Soft background pill highlight + accent text color shift
  desktopNav: "hidden md:flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300",
  navLink: "px-3.5 py-2 rounded-lg hover:text-sky-500 dark:hover:text-[#38bdf8] hover:bg-sky-50 dark:hover:bg-slate-800/60 transition-all duration-200 active:scale-95",
  
  // Actions
  actions: "flex items-center gap-2 sm:gap-4",
  
  // Theme Toggle Button: Rounded highlight box, scale pop, and icon rotation effect
  themeToggle: "group p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer flex items-center justify-center",
  
  // Resume Button: Slight lift (-translate-y-0.5), shadow glow, and crisp fill state
  desktopResumeBtn: "hidden md:inline-flex px-5 py-2 rounded-xl border-2 border-slate-900 dark:border-white/80 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-[#090e1a] hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200",
  
  // Hamburger Toggle Button: Rounded hover container with quick press feedback
  hamburgerBtn: "md:hidden p-2 rounded-xl text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-sky-500 dark:hover:text-[#38bdf8] active:scale-90 transition-all duration-200 focus:outline-none",

  // Mobile Menu Drawer: Large touch targets with smooth background fill
  mobileMenuDrawer: "md:hidden flex flex-col gap-2 px-6 pt-3 pb-6 bg-white/95 border-b border-slate-200 dark:bg-[#090e1a]/95 dark:border-slate-800/80 backdrop-blur-md transition-all",
  mobileNavLink: "px-4 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-[#38bdf8] hover:bg-sky-50 dark:hover:bg-slate-800/60 active:scale-98 transition-all duration-200",
  mobileResumeBtn: "inline-block text-center mt-2 px-5 py-2.5 rounded-xl border-2 border-slate-900 dark:border-white/80 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-[#090e1a] active:scale-95 transition-all duration-200",
};