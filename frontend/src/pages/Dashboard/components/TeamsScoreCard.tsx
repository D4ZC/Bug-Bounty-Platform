import React from 'react';
import { useTranslation } from 'react-i18next';

interface Team {
  name: string;
  score: number;
}

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

const TeamsScoreCard: React.FC<{ teams: Team[] }> = ({ teams }) => {
  const { t } = useTranslation();
  return (
    <div className="relative rounded-3xl border-4 border-green-400 shadow-2xl p-8 glassmorphism flex flex-col justify-between overflow-hidden" style={{fontFamily, clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
      {/* SVG decorativo glitch/graffiti */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
        <g className="animate-glitch-move">
          <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
          <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
          <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
        </g>
      </svg>
      <h3 className="text-2xl font-extrabold text-green-300 mb-2 text-center font-mono animate-glitch-text">{t('Ranking Equipos')}</h3>
      <table className="w-full text-green-100 text-sm font-mono z-10 relative">
        <thead>
          <tr>
            <th className="py-1 px-2 text-green-400 font-semibold">#</th>
            <th className="py-1 px-2 text-green-400 font-semibold">{t('Equipo')}</th>
            <th className="py-1 px-2 text-green-400 font-semibold">{t('Puntaje')}</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, i) => (
            <tr key={team.name} className="border-b border-green-700/50 last:border-none hover:bg-green-900/10 transition-all">
              <td className="py-1 px-2 font-bold text-green-300 animate-glitch-text">{i + 1}</td>
              <td className="py-1 px-2 font-bold animate-glitch-text">{team.name}</td>
              <td className="py-1 px-2 animate-glitch-text">{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default TeamsScoreCard; 