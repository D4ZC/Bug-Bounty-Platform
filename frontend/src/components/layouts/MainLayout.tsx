import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaUser, FaBug, FaTrophy, FaStore, FaUsers, FaShieldAlt, FaSignOutAlt, FaClipboardList, FaCog, FaBook } from 'react-icons/fa';
import Profile from '../../pages/Profile';
import { ProfileProvider } from '../../contexts/ProfileContext';
import { useAuth } from '@/contexts/AuthContext';

const menuOptions = [
  { label: 'Dashboard', icon: <FaHome />, to: '/dashboard' },
  { label: 'Reportes', icon: <FaClipboardList />, to: '/reports' },
  { label: 'Rankings', icon: <FaTrophy />, to: '/rankings' },
  { label: 'Usuario', icon: <FaUser />, to: '/profile' },
  { label: 'Reglas', icon: <FaBook />, to: '/reglas' },
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
  // --- MODAL PERFIL ---
  const [isProfileModalMounted, setIsProfileModalMounted] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Cierra el modal de perfil si la ruta cambia
  React.useEffect(() => {
    setIsProfileModalOpen(false);
    // Desmontar tras animación si estaba abierto
    if (isProfileModalMounted) {
      setTimeout(() => setIsProfileModalMounted(false), 250);
    }
  }, [location.pathname]);

  // Abrir modal: montar y luego mostrar
  const openProfileModal = () => {
    setIsProfileModalMounted(true);
    setTimeout(() => setIsProfileModalOpen(true), 10); // siguiente tick
  };
  // Cerrar modal: ocultar y desmontar tras animación
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setTimeout(() => setIsProfileModalMounted(false), 250); // igual a duración animación
  };

  // Determina si está expandido (hover en desktop, abierto en móvil)
  const isSidebarExpanded = sidebarHovered || sidebarOpenMobile;

  return (
    <ProfileProvider>
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
          <span className="font-bold text-lg tracking-wide cursor-pointer" onClick={() => navigate('/')}>Bug Bounty Platform</span>
          <button
            className="ml-auto p-2 rounded-full hover:bg-gray-800 transition-colors"
            onClick={openProfileModal}
            aria-label="Perfil"
          >
            <FaUser size={22} />
          </button>
          <button
            className="ml-2 p-2 rounded-full hover:bg-gray-800 transition-colors"
            onClick={() => setSettingsOpen(true)}
            aria-label="Configuración"
          >
            <FaCog size={22} />
          </button>
          {/* Modal de perfil animado */}
          {isProfileModalMounted && (
            <div
              className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-250
                ${isProfileModalOpen ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-0 pointer-events-none'}`}
              style={{ transition: 'background 250ms cubic-bezier(.4,0,.2,1)' }}
            >
              <div
                className={`relative w-full max-w-4xl mx-auto transform transition-all duration-250
                  ${isProfileModalOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                style={{ transition: 'opacity 250ms cubic-bezier(.4,0,.2,1), transform 250ms cubic-bezier(.4,0,.2,1)' }}
              >
                <button
                  className="absolute top-2 right-2 z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
                  onClick={closeProfileModal}
                  aria-label="Cerrar perfil"
                >
                  ✕
                </button>
                <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
                  <Profile />
                </div>
              </div>
            </div>
          )}
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
              <button
                className={`flex items-center gap-2 text-red-400 hover:text-red-600 px-4 py-2 w-full ${isSidebarExpanded ? 'justify-start' : 'justify-center'}`}
                onClick={() => { logout(); navigate('/auth/login'); }}
              >
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
    </ProfileProvider>
  );
};

export default MainLayout; 