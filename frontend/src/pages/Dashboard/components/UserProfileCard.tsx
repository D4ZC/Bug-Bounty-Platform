import React from 'react';
import { useTranslation } from 'react-i18next';

interface UserProfile {
  name: string;
  img: string;
  stats: {
    criticas: number;
    altas: number;
    medianas: number;
    bajas: number;
    total: number;
  };
}

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

const UserProfileCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const { t } = useTranslation();
  return (
    <div className="relative rounded-3xl border-4 border-cyan-400 shadow-2xl p-8 glassmorphism flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden" style={{fontFamily, clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
      {/* SVG decorativo glitch/graffiti */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
        <g className="animate-glitch-move">
          <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
          <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
          <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
        </g>
      </svg>
      <h2 className="text-2xl font-extrabold text-cyan-300 mb-2 text-center font-mono animate-glitch-text">{user.name}</h2>
      <p className="text-cyan-100 text-center mb-1 font-mono animate-glitch-text">{t('Perfil_del_jugador_destacado')}</p>
      <div className="flex justify-center mb-4">
        <span className="inline-block bg-cyan-700/60 text-cyan-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold animate-glitch-btn">{t('Estadísticas')}</span>
      </div>
      <div className="text-center z-10 relative">
        <div className="text-sm mb-2 text-cyan-200 font-mono">
          {t('Vulnerabilidades_solucionadas')}: <span className="font-bold text-cyan-300">{user.stats.total}</span><br />
          -{t('Críticas')}: <span className="font-bold text-pink-400">{user.stats.criticas}</span><br />
          -{t('Altas')}: <span className="font-bold text-yellow-400">{user.stats.altas}</span><br />
          -{t('Medianas')}: <span className="font-bold text-cyan-400">{user.stats.medianas}</span><br />
          -{t('Bajas')}: <span className="font-bold text-green-400">{user.stats.bajas}</span>
        </div>
        {/* Stats tipo FIFA ciberseguridad */}
        <div className="w-full mb-4">
          <h3 className="text-lg font-bold text-cyan-300 mb-2 text-center animate-glitch-text">{t('Estadísticas de Ciberseguridad')}</h3>
          {(() => {
            const stats = [
              { label: t('Pentesting'), value: 85, color: 'from-cyan-400 to-cyan-700' },
              { label: t('Ingeniería Social'), value: 72, color: 'from-pink-400 to-pink-700' },
              { label: t('Criptografía'), value: 65, color: 'from-yellow-400 to-yellow-700' },
              { label: t('Análisis Forense'), value: 78, color: 'from-green-400 to-green-700' },
              { label: t('Reportes'), value: 90, color: 'from-blue-400 to-blue-700' },
              { label: t('Defensa'), value: 60, color: 'from-orange-400 to-orange-700' },
              { label: t('OSINT'), value: 82, color: 'from-purple-400 to-purple-700' },
              { label: t('Exploiting'), value: 88, color: 'from-red-400 to-red-700' },
            ];
            return (
              <div className="flex flex-col gap-1">
                {stats.map((stat, idx) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <span className="w-28 text-cyan-200 font-mono text-xs">{stat.label}</span>
                    <div className="flex-1 h-3 rounded-full bg-gray-800 overflow-hidden border-2 border-cyan-700">
                      <div className={`h-3 rounded-full bg-gradient-to-r ${stat.color} shadow animate-glitch-btn`} style={{width: `${stat.value}%`}}></div>
                    </div>
                    <span className="w-8 text-cyan-100 font-bold text-right font-mono">{stat.value}</span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
        {/* Placeholder de radar chart */}
        <div className="w-32 h-32 bg-cyan-300/10 border-2 border-cyan-400 rounded-full flex items-center justify-center mx-auto animate-glow">
          {/* Aquí iría el radar chart */}
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-btn { animation: glitchBtn 1.5s infinite steps(2, end); }
        @keyframes glitchBtn { 0%{filter:none;} 20%{filter:brightness(1.2) hue-rotate(20deg);} 40%{filter:contrast(1.2) blur(0.5px);} 60%{filter:none;} 100%{filter:none;} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
        .animate-glow { box-shadow: 0 0 32px #00fff7, 0 0 64px #00fff7; animation: glow 2.5s infinite alternate; }
        @keyframes glow { 0%{box-shadow:0 0 32px #00fff7,0 0 64px #00fff7;} 100%{box-shadow:0 0 64px #00fff7,0 0 128px #00fff7;} }
      `}</style>
    </div>
  );
};

export default UserProfileCard; 