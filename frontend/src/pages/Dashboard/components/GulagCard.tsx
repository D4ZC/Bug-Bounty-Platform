import React from 'react';
import { useTranslation } from 'react-i18next';

interface GulagUser {
  name: string;
  score: number;
}

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

const GulagCard: React.FC<{ gulag: GulagUser[] }> = ({ gulag }) => {
  const { t } = useTranslation();
  return (
    <div className="relative rounded-3xl border-4 border-red-400 shadow-2xl p-8 glassmorphism flex flex-col justify-between overflow-hidden" style={{fontFamily, clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
      {/* SVG decorativo glitch/graffiti */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
        <g className="animate-glitch-move">
          <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
          <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
          <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
        </g>
      </svg>
      <h2 className="text-2xl font-extrabold text-red-300 mb-2 text-center font-mono animate-glitch-text">{t('Gulag')}</h2>
      <p className="text-red-100 text-center mb-1 font-mono animate-glitch-text">{t('Gulag_description')}</p>
      <div className="flex justify-center mb-4">
        <span className="inline-block bg-red-700/60 text-red-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold animate-glitch-btn">{t('Gulag_top_5_title')}</span>
      </div>
      <div className="overflow-x-auto z-10 relative">
        <table className="w-full text-red-100 text-sm font-mono">
          <thead>
            <tr>
              <th className="py-1 px-2 text-red-400 font-semibold">{t('Gulag_rank_header')}</th>
              <th className="py-1 px-2 text-red-400 font-semibold">{t('Gulag_player_header')}</th>
              <th className="py-1 px-2 text-red-400 font-semibold">{t('Gulag_score_header')}</th>
            </tr>
          </thead>
          <tbody>
            {gulag.map((user, i) => (
              <tr key={user.name} className="border-b border-red-700/50 last:border-none hover:bg-red-900/10 transition-all">
                <td className="py-1 px-2 font-bold text-red-300 animate-glitch-text">{i + 1}</td>
                <td className="py-1 px-2 font-bold animate-glitch-text">{user.name}</td>
                <td className="py-1 px-2 animate-glitch-text">{user.score} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Placeholder de imagen de fondo */}
      <div className="absolute right-4 top-4 w-20 h-16 bg-red-300 rounded shadow-inner opacity-40" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-btn { animation: glitchBtn 1.5s infinite steps(2, end); }
        @keyframes glitchBtn { 0%{filter:none;} 20%{filter:brightness(1.2) hue-rotate(20deg);} 40%{filter:contrast(1.2) blur(0.5px);} 60%{filter:none;} 100%{filter:none;} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
      `}</style>
    </div>
  );
};

export default GulagCard; 