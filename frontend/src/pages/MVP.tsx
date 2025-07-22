import React from 'react';
import { useTranslation } from 'react-i18next';

const MVP: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-app text-app p-8 font-mono relative overflow-hidden" style={{fontFamily: `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`}}>
      {/* Fondo glitch y partículas */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.13 }}>
        <circle cx="120" cy="80" r="60" fill="#00fff7" opacity="0.12" />
        <circle cx="600" cy="120" r="40" fill="#FFD700" opacity="0.10" />
        <circle cx="400" cy="200" r="30" fill="#ff00cc" opacity="0.10" />
      </svg>
      <div className="w-full max-w-lg mx-auto p-10 rounded-3xl border-4 border-pink-400 shadow-2xl glassmorphism relative z-10" style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
        {/* SVG decorativo glitch/graffiti */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
          <g className="animate-glitch-move">
            <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
            <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
            <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
          </g>
        </svg>
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-widest text-pink-300 animate-glitch-text">MVP</h1>
        <div className="flex flex-col gap-4 items-center">
          <div className="w-24 h-24 rounded-full border-4 border-pink-400 bg-black/60 flex items-center justify-center mb-4">
            <span className="text-3xl text-pink-300">🏆</span>
          </div>
          <div className="text-pink-200 text-xl font-bold">Usuario MVP</div>
          <div className="text-pink-400 text-base">usuario@mvp.com</div>
          <div className="flex gap-4 mt-4">
            <span className="bg-pink-700/60 text-pink-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold border-2 border-pink-400">Nivel 99</span>
            <span className="bg-yellow-700/60 text-yellow-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold border-2 border-yellow-400">9999 Bugcoins</span>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
      `}</style>
    </div>
  );
};

export default MVP; 