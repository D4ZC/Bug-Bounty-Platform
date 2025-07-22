import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from '@carbon/icons-react';

// Simulación de datos de ranking mensual
const mockRanking = Array.from({ length: 50 }, (_, i) => ({
  name: `Player${i + 1}`,
  score: Math.floor(Math.random() * 10000),
  avatar: `/avatars/${[
    'Analista','Ciberseguridad','Cyber_God','Cyber_Ninja','Digital_Overlord','Digital_Phantom','Ghost_Hacker','Hacker_Básico','Legendary_Hacker','Pantester','Programador','Stealth_Master'
  ][i%12]}.png`
})).sort((a, b) => b.score - a.score);

function getRankTier(index: number) {
  if (index < 5) return { label: 'DIAMANTE', color: 'text-cyan-300', bg: 'bg-cyan-900/40' };
  if (index < 15) return { label: 'ORO', color: 'text-yellow-300', bg: 'bg-yellow-900/30' };
  if (index < 30) return { label: 'PLATA', color: 'text-gray-200', bg: 'bg-gray-700/40' };
  return { label: 'BRONCE', color: 'text-orange-400', bg: 'bg-orange-900/30' };
}

const MensualRanking: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-black/90 text-app p-8 font-mono flex flex-col items-center relative overflow-hidden" style={{fontFamily: `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`}}>
      {/* Fondo glitch y partículas */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.13 }}>
        <circle cx="120" cy="80" r="60" fill="#00fff7" opacity="0.12" />
        <circle cx="600" cy="120" r="40" fill="#FFD700" opacity="0.10" />
        <circle cx="400" cy="200" r="30" fill="#ff00cc" opacity="0.10" />
      </svg>
      <div className="w-full max-w-2xl mx-auto p-10 rounded-3xl border-4 border-cyan-400 shadow-2xl glassmorphism relative z-10" style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)', background:'rgba(10,10,20,0.92)'}}>
        {/* SVG decorativo glitch/graffiti */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
          <g className="animate-glitch-move">
            <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
            <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
            <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
          </g>
        </svg>
        <h1 className="text-4xl font-bold mb-8 text-cyan-400 text-center tracking-widest animate-glitch-text">{t('Ranking Mensual')}</h1>
        <div className="flex flex-col gap-6">
          {mockRanking.map((player, idx) => (
            <div key={player.name} className="flex items-center gap-6 bg-black/40 border-2 border-cyan-700 rounded-xl p-4 shadow-lg glassmorphism hover:scale-[1.03] transition-all duration-200">
              {player.avatar ? (
                <img src={player.avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-cyan-400 shadow-md" />
              ) : (
                <div className="w-16 h-16 rounded-full border-2 border-cyan-400 shadow-md bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                  <UserAvatar size={32} className="text-white" />
                </div>
              )}
              <div className="flex-1">
                <div className="text-2xl font-bold text-cyan-200 mb-1">{player.name}</div>
              </div>
              <div className="text-xl font-bold text-yellow-300">{player.score} pts</div>
            </div>
          ))}
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

export default MensualRanking;
