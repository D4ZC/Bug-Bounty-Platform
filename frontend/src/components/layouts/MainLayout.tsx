import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaUser, FaBug, FaTrophy, FaStore, FaUsers, FaShieldAlt, FaSignOutAlt, FaClipboardList, FaCog, FaBook, FaTimes, FaQuestionCircle } from 'react-icons/fa';
import Profile from '../../pages/Profile';
import { ProfileProvider } from '../../contexts/ProfileContext';
import { useAuth } from '@/contexts/AuthContext';
import TutorialManager from '../TutorialManager';
import TutorialHeaderButtons from '../TutorialHeaderButtons';
import { useAutoLogout } from '@/hooks/useAutoLogout';
import InactivityModal from '../InactivityModal';

const menuOptions = [
  { label: 'Dashboard', icon: <FaHome />, to: '/dashboard' },
  { label: 'Reportes', icon: <FaClipboardList />, to: '/reports' },
  { label: 'Rankings', icon: <FaTrophy />, to: '/rankings' },
  { label: 'Usuario', icon: <FaUser />, to: '/profile' },
  { label: 'Reglas', icon: <FaBook />, to: '/reglas' },
  { label: 'Gulag', icon: <FaShieldAlt />, to: '/gulag' },
  { label: 'Duelos', icon: <FaBug />, to: '/challenges' },
  { label: 'Tienda', icon: <FaStore />, to: '/shop' },
];

const SIDEBAR_COLLAPSED_WIDTH = 'w-16';
const SIDEBAR_EXPANDED_WIDTH = 'w-64';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHover, setSidebarHover] = useState(false);
  const [isProfileModalMounted, setIsProfileModalMounted] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mainKey, setMainKey] = useState(location.pathname);
  const [entryAnim, setEntryAnim] = useState(true);
  const [sidebarBounce, setSidebarBounce] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);

  useEffect(() => {
    setMainKey(location.pathname);
    setEntryAnim(true);
    const timeout = setTimeout(() => setEntryAnim(false), 600); // duración animación entrada
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // Cerrar sidebar al cambiar de ruta
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Cuando el sidebar se abre, activa la animación de rebote
  useEffect(() => {
    if (sidebarOpen) {
      setSidebarBounce(true);
      const timeout = setTimeout(() => setSidebarBounce(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [sidebarOpen]);

  // Cierra el modal de perfil si la ruta cambia
  React.useEffect(() => {
    setIsProfileModalOpen(false);
    if (isProfileModalMounted) {
      setTimeout(() => setIsProfileModalMounted(false), 250);
    }
  }, [location.pathname]);

  // Abrir modal: montar y luego mostrar
  const openProfileModal = () => {
    setIsProfileModalMounted(true);
    setTimeout(() => setIsProfileModalOpen(true), 10);
  };
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setTimeout(() => setIsProfileModalMounted(false), 250);
  };

  useAutoLogout(logout, () => setShowInactivityModal(true));

  return (
    <ProfileProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <InactivityModal open={showInactivityModal} />
        {/* Navbar superior */}
        <header className="flex items-center bg-gray-900 text-white h-14 px-4 shadow z-20 relative">
          <div
            className="mr-4 focus:outline-none"
            onMouseEnter={() => setSidebarOpen(true)}
            onMouseLeave={() => setSidebarOpen(false)}
            style={{ display: 'inline-block' }}
          >
            {(sidebarOpen || sidebarHover) ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
          <img src="/logo/logo3.png" alt="Logo" className="h-8 w-8 mr-2 select-none" style={{userSelect: 'none'}} />
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
          <TutorialHeaderButtons />
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
          {/* Overlay para el drawer */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          {/* Sidebar tipo drawer */}
          <aside
            className={`
              fixed z-40 top-0 left-0 h-full w-64 bg-black flex flex-col items-center py-6 shadow-lg
              transition-transform duration-300 ease-in-out
              ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0 pointer-events-none'}
              ${sidebarBounce && sidebarOpen ? 'animate-bounceInLeft' : ''}
            `}
            style={{ minWidth: '16rem', width: '16rem', transition: 'transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s cubic-bezier(.4,0,.2,1)' }}
            onMouseEnter={() => setSidebarOpen(true)}
            onMouseLeave={() => setSidebarOpen(false)}
          >
            <nav className="flex-1 w-full flex flex-col gap-2 mt-2">
              {menuOptions.map(opt => (
                <Link
                  key={opt.to}
                  to={opt.to}
                  className={
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap overflow-hidden ` +
                    (location.pathname === opt.to ? 'bg-gray-800 text-blue-400' : 'text-white hover:bg-blue-900/60 hover:text-cyan-300 hover:translate-x-2')
                  }
                  style={{ transition: 'background 0.2s, color 0.2s, transform 0.2s' }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-xl flex-shrink-0">{opt.icon}</span>
                  <span className="ml-2 font-medium truncate">{opt.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto mb-4 w-full flex flex-col items-center">
              <button
                className="flex items-center gap-2 text-red-400 hover:text-red-600 px-4 py-2 w-full justify-start"
                onClick={() => { logout(); navigate('/auth/login'); setSidebarOpen(false); }}
              >
                <FaSignOutAlt />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </aside>
          {/* Contenido principal */}
          <main
            className={`flex-1 p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen ${entryAnim ? 'animate-zoomFadeIn' : 'animate-fadeSlideIn'}`}
            style={{ animation: entryAnim ? 'zoomFadeIn 0.6s cubic-bezier(.4,0,.2,1)' : 'fadeSlideIn 0.5s cubic-bezier(.4,0,.2,1)' }}
          >
            {children}
          </main>
        </div>
      </div>
    </ProfileProvider>
  );
};

export default MainLayout;

// Animación personalizada para el rebote
<style>{`
@keyframes bounceInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%) scale(0.95);
  }
  60% {
    opacity: 1;
    transform: translateX(20px) scale(1.05);
  }
  80% {
    transform: translateX(-5px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
.animate-bounceInLeft {
  animation: bounceInLeft 0.5s cubic-bezier(.4,0,.2,1);
}
@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(24px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeSlideIn {
  animation: fadeSlideIn 0.5s cubic-bezier(.4,0,.2,1);
}
@keyframes zoomFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(32px);
  }
  60% {
    opacity: 1;
    transform: scale(1.03) translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.animate-zoomFadeIn {
  animation: zoomFadeIn 0.6s cubic-bezier(.4,0,.2,1);
}
`}</style> 