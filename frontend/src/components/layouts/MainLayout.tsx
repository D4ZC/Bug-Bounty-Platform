import React from 'react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { Home, List, SettingsAdjust, Tablet, Add, Notification, UserAvatar } from '@carbon/icons-react';

const iconClass = "text-gray-900";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Header negro, más alto */}
    <header className="w-full bg-black h-16 flex items-center px-6 shadow z-20">
      <div className="flex-1 flex items-center">
        <span className="text-white text-xl font-bold tracking-wide">Bug Bounty Platform</span>
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="Notificaciones" className="text-white hover:text-primary-400 transition-colors">
          <Notification size={22} />
        </button>
        <button aria-label="Perfil" className="text-white hover:text-primary-400 transition-colors">
          <UserAvatar size={22} />
        </button>
      </div>
    </header>
    <div className="flex flex-1">
      {/* Navbar lateral blanco, angosto, íconos negros centrados */}
      <nav className="bg-white shadow-md min-h-full w-14 flex flex-col items-center py-6 z-10">
        <ul className="flex flex-col gap-8 items-center w-full">
          <li>
            <a href="/" className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100">
              <Home size={24} className={iconClass} />
            </a>
          </li>
          <li>
            <a href="/list" className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100">
              <List size={24} className={iconClass} />
            </a>
          </li>
          <li>
            <a href="/settings" className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100">
              <SettingsAdjust size={24} className={iconClass} />
            </a>
          </li>
          <li>
            <a href="/tablet" className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100">
              <Tablet size={24} className={iconClass} />
            </a>
          </li>
          <li>
            <a href="/add" className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100">
              <Add size={24} className={iconClass} />
            </a>
          </li>
        </ul>
      </nav>
      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  </div>
);

export default MainLayout; 