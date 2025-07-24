import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import i18n from '@/utils/i18n';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState(() => localStorage.getItem('app_language') || 'es');
  const { t } = useTranslation();

  const handleTheme = (tVal: 'light' | 'dark') => {
    setTheme(tVal);
    localStorage.setItem('theme', tVal);
  };

  const handleLanguage = (lang: 'es' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('show-header'));
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-12 overflow-hidden" style={{fontFamily: `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`}}>
      {/* Fondo Watch Dogs 2: gradiente neón, glitch, partículas, ruido digital */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradiente animado */}
        <div className="absolute inset-0 animate-wd2-bg-gradient" style={{background: 'linear-gradient(120deg, #00fff7 0%, #ff00cc 40%, #ffe600 80%, #00ff6a 100%)', opacity: 0.22}} />
        {/* SVG glitch/graffiti decorativo */}
        <svg className="absolute left-0 top-0 w-full h-full" style={{opacity:0.18}}>
          <g className="animate-glitch-move">
            <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
            <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
            <polygon points="80,400 120,420 100,440" fill="#ffe600" opacity="0.10" />
            <polygon points="600,80 650,100 630,120" fill="#00ff6a" opacity="0.10" />
            <rect x="60%" y="80%" width="60" height="10" fill="#fff" opacity="0.07" transform="skewY(8)" />
          </g>
        </svg>
        {/* Stickers y graffiti extra */}
        <svg className="absolute right-10 bottom-10 w-32 h-32 pointer-events-none" style={{opacity:0.22}}>
          <text x="0" y="30" fontSize="32" fill="#ff00cc" fontFamily="monospace" transform="rotate(-18)">#SETTINGS</text>
          <text x="10" y="80" fontSize="24" fill="#00fff7" fontFamily="monospace" transform="rotate(8)">WD2</text>
          <circle cx="90" cy="90" r="18" fill="#ffe600" opacity="0.18" />
        </svg>
        {/* Ruido digital sutil */}
        <div className="absolute inset-0 bg-[url('/static/noise.png')] opacity-10 mix-blend-soft-light pointer-events-none" />
        {/* Partículas flotantes */}
        <svg className="absolute w-full h-full" style={{opacity:0.13}}>
          <circle cx="20%" cy="20%" r="60" fill="#00fff7" />
          <circle cx="80%" cy="30%" r="40" fill="#ff00cc" />
        </svg>
      </div>
      <div className="w-full max-w-md mx-auto p-8 rounded-3xl border-4 border-cyan-400 shadow-2xl glassmorphism relative z-10" style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
        <h1 className="text-5xl font-extrabold text-center mb-12 tracking-widest text-cyan-300 neon-text animate-glitch-text drop-shadow-lg font-mono">
          {t('Ajustes')}
        </h1>
        {/* Tema */}
        <div className="mb-8 p-4 border-2 border-cyan-400 rounded-xl flex flex-col gap-2 glassmorphism bg-black/40">
          <span className="text-2xl font-bold mb-2 text-cyan-200 font-mono">{t('Tema')}</span>
          <div className="flex gap-4">
            <button
              className={`px-6 py-2 rounded-lg border-2 text-lg font-bold transition-all duration-200 font-mono ${theme === 'light' ? 'border-cyan-400 bg-cyan-900/40 text-cyan-200 animate-glitch-btn' : 'border-cyan-700 bg-transparent text-cyan-400 hover:bg-cyan-900/20'}`}
              onClick={() => handleTheme('light')}
            >
              {t('Claro')}
            </button>
            <button
              className={`px-6 py-2 rounded-lg border-2 text-lg font-bold transition-all duration-200 font-mono ${theme === 'dark' ? 'border-cyan-400 bg-cyan-900/40 text-cyan-200 animate-glitch-btn' : 'border-cyan-700 bg-transparent text-cyan-400 hover:bg-cyan-900/20'}`}
              onClick={() => handleTheme('dark')}
            >
              {t('Oscuro')}
            </button>
          </div>
        </div>
        {/* Idioma */}
        <div className="mb-8 p-4 border-2 border-cyan-400 rounded-xl flex flex-col gap-2 glassmorphism bg-black/40">
          <span className="text-2xl font-bold mb-2 text-cyan-200 font-mono">{t('Idioma')}</span>
          <div className="flex gap-4">
            <button
              className={`px-6 py-2 rounded-lg border-2 text-lg font-bold transition-all duration-200 font-mono ${language === 'es' ? 'border-cyan-400 bg-cyan-900/40 text-cyan-200 animate-glitch-btn' : 'border-cyan-700 bg-transparent text-cyan-400 hover:bg-cyan-900/20'}`}
              onClick={() => handleLanguage('es')}
            >
              {t('Español')}
            </button>
            <button
              className={`px-6 py-2 rounded-lg border-2 text-lg font-bold transition-all duration-200 font-mono ${language === 'en' ? 'border-cyan-400 bg-cyan-900/40 text-cyan-200 animate-glitch-btn' : 'border-cyan-700 bg-transparent text-cyan-400 hover:bg-cyan-900/20'}`}
              onClick={() => handleLanguage('en')}
            >
              {t('Inglés')}
            </button>
          </div>
        </div>
        {/* Cerrar sesión */}
        <button
          className="w-full mt-6 py-4 text-2xl font-extrabold border-4 border-cyan-400 rounded-xl neon-btn glassmorphism bg-black/40 hover:bg-cyan-900/30 text-cyan-200 font-mono transition-all duration-200 shadow-lg animate-glitch-btn"
          onClick={handleLogout}
        >
          {t('Cerrar sesión')}
        </button>
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
        .neon-text { text-shadow: 0 0 8px #00fff7, 0 0 16px #00fff7, 0 0 32px #00fff7; }
      `}</style>
    </div>
  );
};

export default Settings; 