import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Ajustes: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();
  const { logout } = useAuth();
  const [notificaciones, setNotificaciones] = useState(() => {
    const saved = localStorage.getItem('notificaciones');
    return saved ? saved === 'on' : true;
  });

  // Persistencia de notificaciones
  useEffect(() => {
    localStorage.setItem('notificaciones', notificaciones ? 'on' : 'off');
  }, [notificaciones]);

  // Animación para el toggle
  const [animDark, setAnimDark] = useState(false);
  const handleThemeToggle = () => {
    setAnimDark(true);
    setTimeout(() => setAnimDark(false), 400);
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-carbon-gray transition-colors duration-500">
      <div className="w-full max-w-xl bg-white dark:bg-carbon-dark rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-carbon-blue flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-cyber-blue mb-6">Ajustes</h2>
        {/* Barra de búsqueda */}
        <div className="w-full flex items-center mb-4 relative">
          <span className="absolute left-4 text-gray-400 pointer-events-none">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6z"/></svg>
          </span>
          <input
            type="text"
            placeholder="Buscar en ajustes..."
            className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 dark:border-carbon-blue bg-gray-50 dark:bg-carbon-gray text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition"
          />
        </div>
        {/* Toggle modo oscuro */}
        <div className="w-full flex items-center justify-between gap-4 mb-4">
          <span className="flex items-center gap-2 text-blue-700 dark:text-cyber-blue font-semibold">
            <span className="text-2xl">🌞</span> Modo oscuro
          </span>
          <button
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${isDark ? 'bg-cyber-blue' : 'bg-gray-300'} ${animDark ? 'ring-4 ring-cyber-blue/30' : ''}`}
            onClick={handleThemeToggle}
            aria-label="Cambiar modo oscuro"
          >
            <span
              className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 flex items-center justify-center text-lg ${isDark ? 'translate-x-8 bg-carbon-dark text-cyber-blue' : 'translate-x-0 text-yellow-400'}`}
              style={{ transform: isDark ? 'translateX(2rem)' : 'translateX(0)' }}
            >
              {isDark ? '🌙' : '🌞'}
            </span>
          </button>
        </div>
        {/* Toggle notificaciones */}
        <div className="w-full flex items-center justify-between gap-4 mb-2">
          <span className="flex items-center gap-2 text-blue-700 dark:text-cyber-blue font-semibold">
            <span className="text-2xl">🔔</span> Notificaciones
          </span>
          <button
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${notificaciones ? 'bg-cyber-blue' : 'bg-gray-300'}`}
            onClick={() => setNotificaciones(n => !n)}
            aria-label="Cambiar notificaciones"
          >
            <span
              className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 flex items-center justify-center text-lg ${notificaciones ? 'translate-x-8 text-cyber-blue' : 'translate-x-0 text-gray-400'}`}
              style={{ transform: notificaciones ? 'translateX(2rem)' : 'translateX(0)' }}
            >
              {notificaciones ? '🔔' : '🔕'}
            </span>
          </button>
        </div>
      </div>
      {/* Botón de log-out */}
      <button
        className="mt-8 px-6 py-3 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition-colors border border-red-600"
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Ajustes; 