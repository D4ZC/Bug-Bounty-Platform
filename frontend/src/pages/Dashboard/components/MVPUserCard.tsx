import React from 'react';
import { useTranslation } from 'react-i18next';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

const MVPUserCard: React.FC<{ user: MVPUser }> = ({ user }) => {
  const { t } = useTranslation();
  return (
    <div className="relative rounded-3xl border-4 border-pink-400 shadow-2xl p-8 glassmorphism flex flex-col justify-between overflow-hidden" style={{fontFamily, clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
      {/* SVG decorativo glitch/graffiti */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
        <g className="animate-glitch-move">
          <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
          <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
          <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
        </g>
      </svg>
      <h3 className="text-2xl font-extrabold text-pink-300 mb-2 text-center font-mono animate-glitch-text">{t('MVP Usuario')}</h3>
      <div className="flex flex-col items-center z-10 relative">
        <div className="w-16 h-16 rounded-full bg-pink-700 mb-2 border-2 border-pink-400 animate-glow" />
        <span className="text-pink-200 font-bold text-lg mb-1 font-mono animate-glitch-text">{t(user.name)}</span>
        <span className="text-pink-100 text-xs font-mono animate-glitch-text">{user.stats.total} {t('puntos_abbr')}</span>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
        .animate-glow { box-shadow: 0 0 32px #ff00cc, 0 0 64px #ff00cc; animation: glow 2.5s infinite alternate; }
        @keyframes glow { 0%{box-shadow:0 0 32px #ff00cc,0 0 64px #ff00cc;} 100%{box-shadow:0 0 64px #ff00cc,0 0 128px #ff00cc;} }
      `}</style>
    </div>
  );
};

export default MVPUserCard; 