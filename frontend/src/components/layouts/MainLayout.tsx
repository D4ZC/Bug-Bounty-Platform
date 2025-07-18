import React, { useState, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChartPie, 
  Calendar, 
  ChartBar, 
  Settings, 
  Email, 
  Notification,
  Light,
  Moon,
  Folder,
  UserMilitary,
  Folders,
  DataViewAlt
} from '@carbon/icons-react';

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

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Navigation items for MANAGE section
  const manageItems = [
    { id: 'dashboard', icon: <ChartPie size={20} />, label: 'Dashboard', path: '/dashboard' },
    { id: 'calendar', icon: <Calendar size={20} />, label: 'Calendar', path: '/calendar' },
    { id: 'duels', icon: <UserMilitary size={20} />, label: 'Duels', path: '/duels' },
    { id: 'files', icon: <Folders size={20} />, label: 'Files', path: '/files' },
    { id: 'file-review', icon: <DataViewAlt size={20} />, label: 'File Review', path: '/file-review' },
    { id: 'analytics', icon: <ChartBar size={20} />, label: 'Analytics', path: '/analytics' },
  ];

  // Navigation items for SETTINGS section
  const settingsItems = [
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { id: 'messages', icon: <Email size={20} />, label: 'Messages', path: '/messages' },
  ];

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Top Navbar */}
        <nav className={`h-16 ${isDarkMode ? 'bg-black' : 'bg-white border-b border-gray-200'} text-white flex items-center px-6 shadow-lg z-10`}>
          <h1 className={`text-2xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>BugBounty</h1>
        </nav>

        {/* Main Content with Sidebar */}
    <div className="flex flex-1">
          {/* Sidebar */}
          <aside 
            className={`${isDarkMode ? 'bg-black' : 'bg-white border-r border-gray-200'} text-white transition-all duration-300 ease-in-out ${
              expanded ? 'w-64' : 'w-16'
            }`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
          >
            {/* User Profile Section */}
            <div className={`p-4 ${isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
              <button
                onClick={() => navigate('/profile')}
                className={`w-full flex items-center transition-colors rounded-lg px-2 py-2 ${
                  expanded ? 'justify-start space-x-3' : 'justify-center'
                } ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                  </div>
                </div>
                {expanded && (
                  <div className="min-w-0">
                    <h3 className={`font-semibold text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</h3>
                    <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>john.doe@example.com</p>
                  </div>
                )}
              </button>
            </div>

            {/* MANAGE Section */}
            <div className="p-4">
              {expanded && (
                <h4 className={`text-xs font-medium uppercase tracking-wider mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>MANAGE</h4>
              )}
              <nav className="space-y-2">
                {manageItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                        expanded ? 'justify-start space-x-3' : 'justify-center'
                      } ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className={isActive ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {item.icon}
                      </span>
                      {expanded && (
                        <span className="text-sm font-medium truncate">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* SETTINGS Section */}
            <div className={`p-4 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
              {expanded && (
                <h4 className={`text-xs font-medium uppercase tracking-wider mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>SETTINGS</h4>
              )}
              <nav className="space-y-2">
                {settingsItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                        expanded ? 'justify-start space-x-3' : 'justify-center'
                      } ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className={isActive ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {item.icon}
                      </span>
                      {expanded && (
                        <span className="text-sm font-medium truncate">{item.label}</span>
                      )}
                      {expanded && item.id === 'messages' && (
                        <div className="ml-auto w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Theme Toggle */}
            <div className={`p-4 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
              {expanded && (
                <h4 className={`text-xs font-medium uppercase tracking-wider mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>THEME</h4>
              )}
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  expanded ? 'justify-start space-x-3' : 'justify-center'
                } ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {isDarkMode ? <Light size={20} /> : <Moon size={20} />}
                </span>
                {expanded && (
                  <span className="text-sm font-medium truncate">
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                )}
              </button>
            </div>
          </aside>

          {/* Page Content */}
          <main className={`flex-1 p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {children}
          </main>
    </div>
  </div>
    </ThemeContext.Provider>
);
};

export default MainLayout; 