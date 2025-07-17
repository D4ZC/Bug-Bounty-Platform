import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, UserMultiple, User, Group, Settings, Trophy } from '@carbon/icons-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const navigationItems = [
  { icon: Home, label: 'Menú', path: '/dashboard', color: 'from-green-500 to-green-600' },
  { icon: ShoppingCart, label: 'Tienda', path: '/shop', color: 'from-yellow-500 to-yellow-600' },
  { icon: Trophy, label: 'Misiones', path: '/missions', color: 'from-cyan-500 to-cyan-600' },
  { icon: User, label: 'Perfil', path: '/profile-customization', color: 'from-cyan-500 to-cyan-600' },
  { icon: Group, label: 'Equipo', path: '/team', color: 'from-orange-500 to-orange-600' },
  { icon: Settings, label: 'Ajustes', path: '/settings', color: 'from-cyan-500 to-cyan-700' }
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState(() => localStorage.getItem('app_language') || 'es');

  const handleThemeToggle = () => {
    // Toggle between dark, light, and system
    if (theme === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    } else if (theme === 'light') {
      setTheme('system');
      localStorage.setItem('theme', 'system');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleLanguageToggle = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
    localStorage.setItem('app_language', newLang);
    window.location.reload(); // For demo, reload to apply language
  };

  const handleLogout = () => {
    // Placeholder: clear localStorage and redirect to login
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col bg-app text-app">
      <div className="flex flex-1">
        {/* Sidebar lateral con navbar de iconos */}
        <div className="bg-card border-r border-card shadow-lg min-h-full w-20 flex flex-col items-center py-8 gap-4">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`group relative p-3 rounded-xl bg-gradient-to-r ${item.color} hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-white/20 flex flex-col items-center`}
                title={t(item.label)}
              >
                <IconComponent size={28} className="text-white" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-lg border border-cyan-400">
                  {t(item.label)}
                </span>
              </button>
            );
          })}
        </div>
        {/* Contenido principal */}
        <main className="flex-1 bg-app text-app min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout; 