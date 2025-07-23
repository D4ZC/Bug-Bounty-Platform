import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChartPie, 
  Calendar, 
  ChartBar, 
  Settings as SettingsIcon, 
  Email, 
  Light,
  Moon,
  Folder,
  UserMilitary,
  Folders,
  DataViewAlt,
  Home
} from '@carbon/icons-react';
import Settings from '@/pages/Settings';
import { useTranslation } from 'react-i18next';

// Custom Crossed Swords Icon Component (ya no se usa, pero lo dejo por si lo necesitas)
// const CrossedSwords: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
//   <svg ... />
// );

// Theme context
const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleTheme: () => void;
}>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const getUserId = () => localStorage.getItem('userId') || 'default';
const getSettingsKey = () => `settings_${getUserId()}`;
const getInitialSettings = () => {
  const stored = localStorage.getItem(getSettingsKey());
  if (stored) return JSON.parse(stored);
  return {
    sidebarFontSize: '100', // Valor inicial en porcentaje
    appColor: 'white',
    greyVariant: 'grey-darkbar',
  };
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [settings, setSettings] = useState(getInitialSettings());
  const navigate = useNavigate();
  const location = useLocation();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Escuchar cambios en settings
  useEffect(() => {
    const onSettingsUpdated = () => {
      setSettings(getInitialSettings());
    };
    window.addEventListener('settings-updated', onSettingsUpdated);
    return () => window.removeEventListener('settings-updated', onSettingsUpdated);
  }, []);

  // Aplicar clase de tema global y tamaño de fuente al body
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-white', 'theme-black', 'theme-grey-darkbar', 'theme-grey-lightbar');
    if (settings.appColor === 'white') root.classList.add('theme-white');
    if (settings.appColor === 'black') root.classList.add('theme-black');
    if (settings.appColor === 'grey') root.classList.add(settings.greyVariant);
    // Aplicar tamaño de fuente global al html
    root.style.fontSize = `${settings.sidebarFontSize}%`;
  }, [settings.appColor, settings.greyVariant, settings.sidebarFontSize]);

  // Navigation items for MANAGE section
  const manageItems = [
    { id: 'home', icon: <Home size={20} />, label: 'Home', path: '/home' },
    { id: 'dashboard', icon: <ChartPie size={20} />, label: 'Dashboard', path: '/dashboard' },
    { id: 'calendar', icon: <Calendar size={20} />, label: 'Calendar', path: '/calendar' },
    { id: 'duels', icon: <UserMilitary size={20} />, label: 'Duels', path: '/duels' },
    { id: 'files', icon: <Folders size={20} />, label: 'Files', path: '/files' },
    { id: 'file-review', icon: <DataViewAlt size={20} />, label: 'File Review', path: '/file-review' },
    { id: 'analytics', icon: <ChartBar size={20} />, label: 'Analytics', path: '/analytics' },
  ];

  // Navigation items for SETTINGS section
  const settingsItems = [
    { id: 'messages', icon: <Email size={20} />, label: 'Messages', path: '/messages' },
  ];

  // Utilidades para tamaño proporcional
  const sizeMap = {
    'text-xs': { icon: 16, avatar: 'w-7 h-7', padding: 'p-2', gap: 'gap-2' },
    'text-base': { icon: 20, avatar: 'w-10 h-10', padding: 'p-4', gap: 'gap-3' },
    'text-lg': { icon: 28, avatar: 'w-14 h-14', padding: 'p-6', gap: 'gap-4' },
  };
  const sidebarSize = sizeMap[settings.sidebarFontSize as 'text-xs' | 'text-base' | 'text-lg'] || sizeMap['text-base'];

  // Contador de mensajes en inbox (no en papelera)
  const getInboxCount = () => {
    try {
      const stored = localStorage.getItem('messages');
      if (!stored) return 0;
      const msgs = JSON.parse(stored);
      return Array.isArray(msgs) ? msgs.filter((m) => !m.trashed).length : 0;
    } catch {
      return 0;
    }
  };
  const [inboxCount, setInboxCount] = useState(getInboxCount());

  // Actualizar contador cuando cambian los mensajes
  useEffect(() => {
    const handler = () => setInboxCount(getInboxCount());
    window.addEventListener('storage', handler);
    // También actualizar cada vez que se monta el layout
    handler();
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode: settings.appColor === 'black', toggleTheme: () => {} }}>
      <div className={`min-h-screen flex flex-col ${settings.appColor === 'black' ? 'bg-gray-900' : settings.appColor === 'white' ? 'bg-gray-50' : settings.greyVariant === 'grey-darkbar' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Top Navbar */}
        <nav 
          className={`h-16 flex items-center px-6 shadow-lg z-10 transition-colors ${
            settings.appColor === 'white' 
              ? 'bg-white border-b border-gray-200' 
              : settings.appColor === 'black' || (settings.appColor === 'grey' && settings.greyVariant === 'grey-darkbar')
                ? 'bg-black' 
                : 'bg-white border-b border-gray-200'
          }`}
          style={{ fontSize: 'inherit', justifyContent: 'space-between' }}
        >
          <h1
            key={i18n.language}
            className={`text-2xl font-bold tracking-wide ${settings.appColor === 'white' || (settings.appColor === 'grey' && settings.greyVariant === 'grey-lightbar') ? 'text-gray-900' : 'text-white'}`}
          >
            {t('navbar.title')}
          </h1>
          <button onClick={() => setShowSettingsModal(true)} className="ml-auto flex items-center text-gray-500 hover:text-blue-600 focus:outline-none">
            <SettingsIcon size={28} />
          </button>
        </nav>
        {/* Settings Modal */}
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowSettingsModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
              <Settings />
            </div>
          </div>
        )}

        {/* Main Content with Sidebar */}
    <div className="flex flex-1">
          {/* Sidebar */}
          <aside 
            className={`transition-all duration-300 ease-in-out ${expanded ? 'w-64' : 'w-16'} transition-colors ${
              settings.appColor === 'white' 
                ? 'bg-white border-r border-gray-200' 
                : settings.appColor === 'black' || (settings.appColor === 'grey' && settings.greyVariant === 'grey-darkbar')
                  ? 'bg-black' 
                  : 'bg-white border-r border-gray-200'
            }`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            style={{ fontSize: 'inherit' }}
          >
            {/* User Profile Section */}
            <div className={`${sidebarSize.padding} ${settings.appColor === 'black' || settings.greyVariant === 'grey-darkbar' ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}
            >
              <button
                onClick={() => navigate('/profile')}
                className={`w-full flex items-center transition-colors rounded-lg px-2 py-2 ${expanded ? 'justify-start space-x-3' : 'justify-center'} ${settings.appColor === 'black' || settings.greyVariant === 'grey-darkbar' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} ${sidebarSize.gap}`}
              >
                <div className={`${sidebarSize.avatar} rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0`}>
                  <div className={`${settings.sidebarFontSize === 'text-lg' ? 'w-10 h-10' : settings.sidebarFontSize === 'text-xs' ? 'w-5 h-5' : 'w-6 h-6'} rounded-full bg-blue-600 flex items-center justify-center`}>
                    <div className={`${settings.sidebarFontSize === 'text-lg' ? 'w-7 h-7' : settings.sidebarFontSize === 'text-xs' ? 'w-3 h-3' : 'w-4 h-4'} rounded-full bg-blue-700`}></div>
                  </div>
                </div>
                {expanded && (
                  <div className="min-w-0">
                    <h3 className={`font-semibold truncate ${settings.appColor === 'black' || settings.greyVariant === 'grey-darkbar' ? 'text-white' : 'text-gray-900'}`}>John Doe</h3>
                    <p className={`${settings.appColor === 'black' || settings.greyVariant === 'grey-darkbar' ? 'text-gray-400' : 'text-gray-500'}`}>john.doe@example.com</p>
                  </div>
                )}
              </button>
            </div>
            {/* MANAGE Section */}
            <div className={`${sidebarSize.padding}`}>
              {expanded && (
                <h4 className={`text-xs font-medium uppercase tracking-wider mb-4 ${settings.appColor === 'black' || settings.greyVariant === 'grey-darkbar' ? 'text-gray-400' : 'text-gray-500'}`}>MANAGE</h4>
              )}
              <nav className="space-y-2">
                {manageItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center rounded-lg transition-colors ${sidebarSize.padding} ${expanded ? 'justify-start space-x-3' : 'justify-center'} ${sidebarSize.gap} ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : settings.appColor === 'black' || settings.greyVariant === 'grey-darkbar' 
                            ? 'text-gray-300 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className={isActive ? 'text-white' : settings.appColor === 'black' || settings.greyVariant === 'grey-darkbar' ? 'text-gray-400' : 'text-gray-500'}>
                        {React.cloneElement(item.icon, { size: sidebarSize.icon })}
                      </span>
                      {expanded && (
                        <span className="font-medium truncate">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
            {/* SETTINGS Section (only Messages now) */}
            <div className={`${sidebarSize.padding}`}>
              {expanded && (
                <h4 className={`text-xs font-medium uppercase tracking-wider mb-4 ${settings.appColor === 'black' || settings.greyVariant === 'grey-darkbar' ? 'text-gray-400' : 'text-gray-500'}`}>SETTINGS</h4>
              )}
              <nav className="space-y-2">
                {settingsItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center rounded-lg transition-colors ${sidebarSize.padding} ${expanded ? 'justify-start space-x-3' : 'justify-center'} ${sidebarSize.gap} ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : settings.appColor === 'black' || settings.greyVariant === 'grey-darkbar' 
                            ? 'text-gray-300 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className={isActive ? 'text-white' : settings.appColor === 'black' || settings.greyVariant === 'grey-darkbar' ? 'text-gray-400' : 'text-gray-500'} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', minWidth: sidebarSize.icon, minHeight: sidebarSize.icon }}>
                        <span style={{ position: 'relative', display: 'inline-block', width: sidebarSize.icon, height: sidebarSize.icon }}>
                          {React.cloneElement(item.icon, { size: sidebarSize.icon })}
                          {/* Badge para Messages */}
                          {item.id === 'messages' && inboxCount > 0 && (
                            <span className="badge badge-danger" style={{ position: 'absolute', top: '-8px', right: '-8px', minWidth: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, zIndex: 1, padding: 0 }}>
                              {inboxCount}
                            </span>
                          )}
                        </span>
                      </span>
                      {expanded && (
                        <span className="font-medium truncate">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
          {/* Page Content */}
          <main className={`flex-1 p-6 ${settings.appColor === 'black' ? 'bg-gray-900' : settings.appColor === 'white' ? 'bg-gray-50' : settings.greyVariant === 'grey-darkbar' ? 'bg-gray-50' : 'bg-gray-900'}`}>
            {children}
          </main>
    </div>
  </div>
    </ThemeContext.Provider>
);
};

export default MainLayout; 