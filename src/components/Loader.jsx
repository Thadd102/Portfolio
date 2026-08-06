import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070d] text-white select-none overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-900/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Orbit Graphic Container */}
      <div className="relative flex items-center justify-center w-64 h-64 mb-6">
        
        {/* Star Accents */}
        <span className="absolute top-6 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_#38bdf8]" />
        <span className="absolute top-12 right-12 text-blue-300 text-xs animate-pulse">✦</span>
        <span className="absolute bottom-10 right-8 w-1 h-1 bg-blue-500 rounded-full opacity-60" />

        {/* 3D Tilted Orbit Ring */}
        <div className="absolute w-56 h-56 rounded-full border border-blue-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)] style-orbit-tilt">
          {/* Orbiting Glowing Particle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_12px_#38bdf8]" />
        </div>

        {/* Central 3D Dark Sphere */}
        <div className="relative z-10 flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-b from-[#131927] via-[#090d16] to-[#04060a] border border-slate-800 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
          
          {/* Sphere Inner Radial Shadow/Highlight */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />

          {/* Code Icon </> */}
          <svg 
            className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="text-center space-y-1 z-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          THADD<span className="text-[#38bdf8]">101</span>
        </h1>
        <p className="text-[11px] font-bold tracking-[0.35em] text-[#38bdf8] uppercase">
          CODEORBIT
        </p>
        <p className="text-[9px] font-medium tracking-[0.25em] text-slate-400 uppercase pt-1">
          WEB & SOFTWARE DEVELOPER
        </p>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-32 h-[3px] bg-slate-800/80 rounded-full overflow-hidden mt-8 z-10">
        <div className="h-full bg-[#38bdf8] rounded-full animate-loader-progress shadow-[0_0_10px_#38bdf8]" />
      </div>

      {/* Custom Keyframe Animations */}
      <style>{`
        .style-orbit-tilt {
          transform: rotateX(72deg) rotateY(-18deg) rotateZ(0deg);
          animation: spinOrbit 4s linear infinite;
        }
        @keyframes spinOrbit {
          from { transform: rotateX(72deg) rotateY(-18deg) rotateZ(0deg); }
          to { transform: rotateX(72deg) rotateY(-18deg) rotateZ(360deg); }
        }
        @keyframes loaderProgress {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 60%; transform: translateX(20%); }
          100% { width: 100%; transform: translateX(100%); }
        }
        .animate-loader-progress {
          animation: loaderProgress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}