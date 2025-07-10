import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaHome, FaUser, FaBug, FaTrophy, FaStore, FaUsers, FaShieldAlt, FaSignOutAlt, FaClipboardList, FaCog } from 'react-icons/fa';

const menuOptions = [
  { label: 'Dashboard', icon: <FaHome />, to: '/' },
  { label: 'Reportes', icon: <FaClipboardList />, to: '/reports' },
  { label: 'Rankings', icon: <FaTrophy />, to: '/rankings' },
  { label: 'Usuario', icon: <FaUser />, to: '/profile' },
  { label: 'MVP', icon: <FaTrophy />, to: '/mvp' },
  { label: 'Gulag', icon: <FaShieldAlt />, to: '/gulag' },
  { label: 'Duelos', icon: <FaBug />, to: '/challenges' },
  { label: 'Puntos', icon: <FaStore />, to: '/shop' },
];

const SIDEBAR_COLLAPSED_WIDTH = 'w-16';
const SIDEBAR_EXPANDED_WIDTH = 'w-64';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();

  // Determina si está expandido (hover en desktop, abierto en móvil)
  const isSidebarExpanded = sidebarHovered || sidebarOpenMobile;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Navbar superior */}
      <header className="flex items-center bg-gray-900 text-white h-14 px-4 shadow z-20 relative">
        <button
          className="md:hidden mr-4 focus:outline-none"
          onClick={() => setSidebarOpenMobile(true)}
          aria-label="Abrir menú"
        >
          <FaBars size={24} />
        </button>
        <span className="font-bold text-lg tracking-wide">Bug Bounty Platform</span>
        <button
          className="ml-auto p-2 rounded-full hover:bg-gray-800 transition-colors"
          onClick={() => setSettingsOpen(true)}
          aria-label="Configuración"
        >
          <FaCog size={22} />
        </button>
        {/* Modal o menú de configuración (placeholder) */}
        {settingsOpen && (
          <div className="absolute right-4 top-14 bg-gray-800 text-white rounded-lg shadow-lg p-4 z-50 min-w-[200px]">
            <div className="font-bold mb-2">Configuración</div>
            <div className="text-sm text-gray-300 mb-2">(Aquí irán opciones de configuración en el futuro)</div>
            <button className="mt-2 px-3 py-1 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={() => setSettingsOpen(false)}>Cerrar</button>
          </div>
        )}
      </header>
      <div className="flex flex-1">
        {/* Overlay para móvil */}
        {sidebarOpenMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setSidebarOpenMobile(false)}
          />
        )}
        {/* Sidebar */}
        <aside
          className={`
            fixed z-40 top-0 left-0 h-full transition-all duration-300
            ${isSidebarExpanded ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH}
            bg-black flex flex-col items-center py-6 shadow-lg
            md:static md:translate-x-0
          `}
          onMouseEnter={() => { if (!sidebarOpenMobile) setSidebarHovered(true); }}
          onMouseLeave={() => { if (!sidebarOpenMobile) setSidebarHovered(false); }}
          style={{ minWidth: isSidebarExpanded ? '16rem' : '4rem', width: isSidebarExpanded ? '16rem' : '4rem' }}
        >
          {/* Hamburguesa solo en móvil */}
          <button
            className="md:hidden mb-8 focus:outline-none self-start ml-4"
            onClick={() => setSidebarOpenMobile(false)}
            aria-label="Cerrar menú"
          >
            <FaBars size={24} className="text-white" />
          </button>
          <nav className="flex-1 w-full flex flex-col gap-2 mt-2">
            {menuOptions.map(opt => (
              <Link
                key={opt.to}
                to={opt.to}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap overflow-hidden
                  ${location.pathname === opt.to ? 'bg-gray-800 text-blue-400' : 'text-white hover:bg-gray-700'}
                  ${isSidebarExpanded ? 'justify-start' : 'justify-center'}
                `}
                onClick={() => setSidebarOpenMobile(false)}
              >
                <span className="text-xl flex-shrink-0">{opt.icon}</span>
                <span
                  className={`ml-2 font-medium truncate transition-all duration-300 ease-in-out origin-left
                    ${isSidebarExpanded ? 'opacity-100 scale-x-100 w-auto' : 'opacity-0 scale-x-0 w-0'}
                  `}
                  style={{ maxWidth: isSidebarExpanded ? '10rem' : '0' }}
                >
                  {opt.label}
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto mb-4 w-full flex flex-col items-center">
            <button className={`flex items-center gap-2 text-red-400 hover:text-red-600 px-4 py-2 w-full ${isSidebarExpanded ? 'justify-start' : 'justify-center'}`}>
              <FaSignOutAlt />
              <span
                className={`transition-all duration-300 ease-in-out origin-left
                  ${isSidebarExpanded ? 'opacity-100 scale-x-100 w-auto' : 'opacity-0 scale-x-0 w-0'}
                `}
                style={{ maxWidth: isSidebarExpanded ? '10rem' : '0' }}
              >
                Cerrar sesión
              </span>
            </button>
          </div>
        </aside>
        {/* Contenido principal */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen ml-16 md:ml-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 