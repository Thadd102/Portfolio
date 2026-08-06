import React from 'react';
import profile from '../assets/profile.png';

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* LEFT COLUMN: Intro Text & Call to Actions */}
        <div className={styles.leftCol}>
          
          {/* Main Title */}
          <div className="space-y-1">
            <h1 className={styles.titleGreeting}>
              Hi! <span className={styles.titleHighlight}>I'm</span>
            </h1>
            <h1 className={styles.titleName}>
              THADD 101
            </h1>
          </div>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            Web & Software Developer
          </p>

          {/* Bullet Points List */}
          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <svg className={styles.checkIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Building robust web applications.</span>
            </li>
            <li className={styles.bulletItem}>
              <svg className={styles.checkIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Creating responsive solutions.</span>
            </li>
            <li className={styles.bulletItem}>
              <svg className={styles.checkIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Full-stack development expert.</span>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className={styles.buttonGroup}>
            <a href="#contact" className={styles.primaryBtn}>
              Let's Talk
            </a>
            <a href="#projects" className={styles.secondaryBtn}>
              View Portfolio <span className="ml-1">→</span>
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: Animated Portrait & Floating Bubbles */}
        <div className={styles.rightCol}>
          <div className="relative w-full max-w-[980px] flex justify-center items-center">

            {/* Top Right Decorative Animated Ring */}
            <div className={styles.animatedRing} />

            {/* Floating Decorative Colored Dots (Animated Bubbles) */}
            <span className={styles.bubblePurple} />
            <span className={styles.bubbleCyan} />
            <span className={styles.bubbleBlue} />

            {/* Main Portrait Image */}
            <div className={styles.portraitWrapper}>
              <img
                src={profile}
                alt="THADD101"
                className={styles.portraitImg}
              />
              
              {/* Floating "Available for work" Badge */}
              <div className={styles.statusBadge}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Available for work</span>
              </div>
            </div>

            {/* BOTTOM TICKER BAR (Moving Text under photo) */}
            <div className={styles.tickerContainer}>
              <div className={styles.tickerTrack}>
                <span>FULL STACK</span>
                <span className="text-slate-500">•</span>
                <span>BACKEND</span>
                <span className="text-slate-500">•</span>
                <span>FRONTEND</span>
                <span className="text-slate-500">•</span>
                <span>WEB DEVELOPMENT</span>
                <span className="text-slate-500">•</span>
                <span>SOFTWARE</span>
                <span className="text-slate-500">•</span>
                {/* Repeat for seamless infinite loop */}
                <span>FULL STACK</span>
                <span className="text-slate-500">•</span>
                <span>BACKEND</span>
                <span className="text-slate-500">•</span>
                <span>FRONTEND</span>
                <span className="text-slate-500">•</span>
                <span>WEB DEVELOPMENT</span>
                <span className="text-slate-500">•</span>
                <span>SOFTWARE</span>
                <span className="text-slate-500">•</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Embedded Animation Keyframe Styles */}
      <style>{`
        @keyframes floatBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.08); }
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-float-slow {
          animation: floatBounce 4s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: floatBounce 2.5s ease-in-out infinite 0.5s;
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: marqueeScroll 16s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// ==========================================
// STYLES OBJECT (React Native Style Pattern)
// ==========================================
const styles = {
  section: "relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden",
  container: "max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center",
  
  // Left Column Styles
  leftCol: "flex flex-col space-y-6 z-10 text-left",
  titleGreeting: "text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight",
  titleHighlight: "text-[#38bdf8]",
  titleName: "text-5xl sm:text-6xl lg:text-7xl font-black text-[#38bdf8] tracking-tight",
  subtitle: "text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-200 tracking-wide",
  
  bulletList: "space-y-3 pt-2 text-slate-700 dark:text-slate-300 font-medium text-base sm:text-lg",
  bulletItem: "flex items-center gap-3",
  checkIcon: "w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0",

  buttonGroup: "flex flex-wrap items-center gap-4 pt-4",
  primaryBtn: "px-8 py-3.5 rounded-xl bg-[#ff3b30] hover:bg-[#e03126] text-white font-bold text-base shadow-lg shadow-red-500/20 transition-all duration-200 active:scale-95",
  secondaryBtn: "px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-900 dark:text-white font-semibold text-base transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50",

  // Right Column Styles
  rightCol: "relative flex justify-center items-center z-10",
  
  // Animated Bubbles & Accents
  animatedRing: "absolute -top-6 -right-2 sm:-right-6 w-24 h-24 rounded-full border-2 border-[#38bdf8]/30 animate-pulse pointer-events-none",
  bubblePurple: "absolute top-12 left-2 w-3 h-3 bg-purple-400 rounded-full animate-float-slow shadow-[0_0_8px_#c084fc]",
  bubbleCyan: "absolute bottom-28 left-0 w-3.5 h-3.5 bg-cyan-400 rounded-full animate-float-fast shadow-[0_0_10px_#22d3ee]",
  bubbleBlue: "absolute top-1/2 -right-4 w-3 h-3 bg-blue-500 rounded-full animate-float-slow shadow-[0_0_8px_#3b82f6]",

  // INCREASED PICTURE SIZE HERE:
  portraitWrapper: "relative w-full max-w-[400px] sm:max-w-[460px] overflow-visible bg-transparent",
  portraitImg: "w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl",
  
  statusBadge: "absolute bottom-16 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/95 dark:bg-[#090e1a]/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold shadow-lg backdrop-blur-md",

  // Bottom Moving Text Ticker
  tickerContainer: "absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[95%] py-2.5 px-4 rounded-xl bg-[#0e1626]/90 border border-slate-700/60 backdrop-blur-md overflow-hidden z-20 shadow-xl",
  tickerTrack: "animate-ticker flex items-center gap-6 text-xs sm:text-sm font-extrabold tracking-widest text-slate-300 uppercase select-none",
};