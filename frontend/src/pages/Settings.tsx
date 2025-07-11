import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState(() => localStorage.getItem('app_language') || 'es');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleTheme = (tVal: 'light' | 'dark') => {
    setTheme(tVal);
    localStorage.setItem('theme', tVal);
  };

  const handleLanguage = (lang: 'es' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app text-app font-mono p-8 relative">
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl border-4 border-card shadow-2xl bg-card relative cyber-glow">
        <h1 className="text-5xl font-extrabold text-center mb-12 tracking-widest neon-text animate-pulse">{t('Ajustes')}</h1>
        {/* Tema */}
        <div className="mb-8 p-4 border-2 border-card rounded-xl flex flex-col gap-2 bg-card">
          <span className="text-2xl font-bold mb-2">{t('Tema')}</span>
          <div className="flex gap-4">
            <button
              className={`px-6 py-2 rounded-lg border-2 text-lg font-bold transition-all duration-200 ${theme === 'light' ? 'border-cyan-400 bg-cyan-900/40 text-cyan-200 neon-btn' : 'border-cyan-700 bg-transparent text-cyan-400 hover:bg-cyan-900/20'}`}
              onClick={() => handleTheme('light')}
            >
              {t('Claro')}
            </button>
            <button
              className={`px-6 py-2 rounded-lg border-2 text-lg font-bold transition-all duration-200 ${theme === 'dark' ? 'border-cyan-400 bg-cyan-900/40 text-cyan-200 neon-btn' : 'border-cyan-700 bg-transparent text-cyan-400 hover:bg-cyan-900/20'}`}
              onClick={() => handleTheme('dark')}
            >
              {t('Oscuro')}
            </button>
          </div>
        </div>
        {/* Idioma */}
        <div className="mb-8 p-4 border-2 border-card rounded-xl flex flex-col gap-2 bg-card">
          <span className="text-2xl font-bold mb-2">{t('Idioma')}</span>
          <div className="flex gap-4">
            <button
              className={`px-6 py-2 rounded-lg border-2 text-lg font-bold transition-all duration-200 ${language === 'es' ? 'border-cyan-400 bg-cyan-900/40 text-cyan-200 neon-btn' : 'border-cyan-700 bg-transparent text-cyan-400 hover:bg-cyan-900/20'}`}
              onClick={() => handleLanguage('es')}
            >
              {t('Español')}
            </button>
            <button
              className={`px-6 py-2 rounded-lg border-2 text-lg font-bold transition-all duration-200 ${language === 'en' ? 'border-cyan-400 bg-cyan-900/40 text-cyan-200 neon-btn' : 'border-cyan-700 bg-transparent text-cyan-400 hover:bg-cyan-900/20'}`}
              onClick={() => handleLanguage('en')}
            >
              {t('Inglés')}
            </button>
          </div>
        </div>
        {/* Cerrar sesión */}
        <button
          className="w-full mt-6 py-4 text-2xl font-extrabold border-4 border-card rounded-xl neon-btn bg-card hover:bg-card text-app transition-all duration-200 shadow-lg animate-pulse"
          onClick={handleLogout}
        >
          {t('Cerrar sesión')}
        </button>
      </div>
      {/* Neon/cyber styles */}
      <style>{`
        .neon-text {
          text-shadow: 0 0 8px #00fff7, 0 0 16px #00fff7, 0 0 32px #00fff7;
        }
        .neon-btn {
          box-shadow: 0 0 8px #00fff7, 0 0 16px #00fff7;
        }
        .cyber-glow {
          box-shadow: 0 0 24px #00fff7, 0 0 48px #00fff7, 0 0 96px #00fff7;
        }
      `}</style>
    </div>
  );
};

export default Settings; 