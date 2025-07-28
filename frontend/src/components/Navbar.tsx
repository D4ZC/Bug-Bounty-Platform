import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaBell, FaGamepad } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationContext';
import { usePoints } from '../contexts/PointsContext';

const mockNotifications = [
  { id: 1, message: 'Nueva vulnerabilidad reportada.' },
  { id: 2, message: 'Tu equipo ha subido de ranking.' },
  { id: 3, message: 'Tienes una recompensa pendiente.' },
];

interface NavbarProps {
  backgroundEnabled?: boolean;
  onBackgroundToggle?: (enabled: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ backgroundEnabled = false, onBackgroundToggle }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount } = useNotifications();
  const { userPoints } = usePoints();
  const navigate = useNavigate();

  // Cerrar paneles al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
        setShowUserMenu(false);
      } else if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      } else if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-black border-b border-gray-800 h-[60px] w-full relative">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-white">Bug Bounty Platform</span>
      </div>
      <div className="flex items-center gap-6">
        {/* Botón de Pac-Man */}
        <div className="relative">
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full transition text-2xl focus:outline-none border ${
              backgroundEnabled 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-cyan-400 shadow-lg theme-button-active' 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700'
            }`}
            title={backgroundEnabled ? 'Desactivar Pac-Man' : 'Activar Pac-Man'}
            onClick={() => onBackgroundToggle && onBackgroundToggle(!backgroundEnabled)}
          >
            <FaGamepad />
          </button>
        </div>
        {/* Notificaciones */}
        <div className="relative" ref={notificationRef}>
          <button
            className="text-white text-2xl relative focus:outline-none"
            onClick={() => setShowNotifications((v) => !v)}
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center border border-black">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#181A20] border border-gray-700 rounded shadow-lg z-50 animate-fade-in">
              <div
                className="p-4 border-b font-bold text-white cursor-pointer hover:bg-gray-800"
                onClick={() => {
                  navigate('/notifications');
                  setShowNotifications(false);
                }}
              >
                Notificaciones
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="p-4 text-gray-400">No hay notificaciones pendientes.</li>
                ) : (
                  notifications.slice(0, 5).map((notif) => (
                                          <li key={notif.id} className="px-4 py-2 border-b last:border-b-0 hover:bg-gray-800 cursor-pointer text-white">
                        <div className="flex items-start gap-2">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notif.read ? 'bg-gray-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white">{notif.title}</div>
                            <div className="text-sm text-gray-400 truncate">{notif.detail}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(notif.timestamp).toLocaleTimeString('es-ES', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
              </ul>
            </div>
          )}
        </div>
        {/* Menú de usuario */}
        <div className="relative" ref={userMenuRef}>
          <button
            className="text-white text-2xl focus:outline-none flex items-center"
            onClick={() => setShowUserMenu((v) => !v)}
          >
            <FaUserCircle />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#181A20] border border-gray-700 rounded shadow-lg z-50 animate-fade-in">
              <ul className="py-2">
                <li 
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white"
                  onClick={() => {
                    navigate('/profile');
                    setShowUserMenu(false);
                  }}
                >
                  Mi perfil
                </li>
                <li 
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white"
                  onClick={() => {
                    navigate('/settings');
                    setShowUserMenu(false);
                  }}
                >
                  Configuración
                </li>
                <li 
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white"
                  onClick={() => {
                    navigate('/help');
                    setShowUserMenu(false);
                  }}
                >
                  Ayuda
                </li>
                <li className="border-t my-2 border-gray-700" />
                <li className="px-4 py-2 hover:bg-red-900 cursor-pointer text-red-400 font-semibold">Cerrar sesión</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 