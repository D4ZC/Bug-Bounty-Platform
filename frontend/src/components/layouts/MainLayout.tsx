import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, UserMultiple, User, Group, Settings, Trophy } from '@carbon/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

const navigationItems = [
  { icon: Home, label: 'Menú', path: '/dashboard', color: 'from-green-500 to-green-600' },
  { icon: ShoppingCart, label: 'Tienda', path: '/shop', color: 'from-yellow-500 to-yellow-600' },
  { icon: Trophy, label: 'Misiones', path: '/missions', color: 'from-cyan-500 to-cyan-600' },
  { icon: (props: any) => {
    const { size = 28, className = 'text-white', ...rest } = props || {};
    return (
      <svg width={size} height={size} className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...rest}>
        {/* Espada 1 */}
        <path d="M6 26 L26 6" />
        <rect x="24.2" y="4.2" width="3.6" height="2.2" rx="1" transform="rotate(45 26 6)" fill="currentColor" stroke="none" />
        <rect x="4.2" y="24.2" width="3.6" height="2.2" rx="1" transform="rotate(45 6 26)" fill="currentColor" stroke="none" />
        <circle cx="26" cy="6" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="6" cy="26" r="1.2" fill="currentColor" stroke="none" />
        {/* Espada 2 */}
        <path d="M6 6 L26 26" />
        <rect x="24.2" y="25.6" width="3.6" height="2.2" rx="1" transform="rotate(-45 26 26)" fill="currentColor" stroke="none" />
        <rect x="4.2" y="5.6" width="3.6" height="2.2" rx="1" transform="rotate(-45 6 6)" fill="currentColor" stroke="none" />
        <circle cx="26" cy="26" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="6" cy="6" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  }, label: 'Duelos', path: '/duelos', color: 'from-pink-500 to-yellow-400' },
  { icon: User, label: 'Perfil', path: '/profile-customization', color: 'from-cyan-500 to-cyan-600' },
  { icon: Group, label: 'Equipo', path: '/team', color: 'from-orange-500 to-orange-600' },
  { icon: Settings, label: 'Ajustes', path: '/settings', color: 'from-cyan-500 to-cyan-700' }
];

const HackerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState(() => localStorage.getItem('app_language') || 'es');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{fontFamily}}>
      {/* Fondo hacker global: gradiente animado, glitch, partículas, ruido digital */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 animate-wd2-bg-gradient" style={{background: 'linear-gradient(120deg, #00fff7 0%, #ff00cc 40%, #ffe600 80%, #00ff6a 100%)', opacity: 0.15}} />
        <svg className="absolute left-0 top-0 w-full h-full" style={{opacity:0.10}}>
          <g className="animate-glitch-move">
            <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
            <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
            <polygon points="80,400 120,420 100,440" fill="#ffe600" opacity="0.10" />
            <polygon points="600,80 650,100 630,120" fill="#00ff6a" opacity="0.10" />
            <rect x="60%" y="80%" width="60" height="10" fill="#fff" opacity="0.07" transform="skewY(8)" />
          </g>
        </svg>
        <div className="absolute inset-0 bg-[url('/static/noise.png')] opacity-10 mix-blend-soft-light pointer-events-none" />
        <svg className="absolute w-full h-full" style={{opacity:0.07}}>
          <circle cx="20%" cy="20%" r="60" fill="#00fff7" />
          <circle cx="80%" cy="30%" r="40" fill="#ff00cc" />
        </svg>
      </div>
      <div className="flex flex-1 relative z-10" style={{fontFamily}}>
        {/* Sidebar hacker */}
        <div className="bg-black/70 border-r-2 border-cyan-400 shadow-2xl min-h-full w-20 flex flex-col items-center py-8 gap-4 glassmorphism" style={{backdropFilter:'blur(8px) saturate(1.2)'}}>
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`group relative p-3 rounded-xl bg-gradient-to-r ${item.color} hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-cyan-400 hover:border-pink-400 flex flex-col items-center animate-glitch-btn`}
                title={t(item.label)}
              >
                <IconComponent size={28} className="text-white" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black/90 text-cyan-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-lg border border-cyan-400 font-mono animate-glitch-text">
                  {t(item.label)}
                </span>
              </button>
            );
          })}
        </div>
        {/* Contenido principal hacker */}
        <main className="flex-1 min-h-screen relative z-10 px-0 md:px-0" style={{fontFamily}}>
          {children}
        </main>
      </div>
      {/* Animaciones y estilos personalizados Watch Dogs 2 global */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-wd2-bg-gradient { animation: bgGradientMove2 18s ease-in-out infinite alternate; background-size: 200% 200%; }
        @keyframes bgGradientMove2 {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
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

export default HackerLayout; 