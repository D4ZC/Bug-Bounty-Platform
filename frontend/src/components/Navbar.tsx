import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaSearch, FaBell } from 'react-icons/fa';

const mockNotifications = [
  { id: 1, message: 'Nueva vulnerabilidad reportada.' },
  { id: 2, message: 'Tu equipo ha subido de ranking.' },
  { id: 3, message: 'Tienes una recompensa pendiente.' },
];

const Navbar: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pendingCount = mockNotifications.length;

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
        <div className="flex items-center bg-[#181A20] px-2 py-1 rounded border border-gray-700">
          <span className="mr-2"><FaSearch size={16} color="#fff" /></span>
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none text-white placeholder-gray-400"
          />
        </div>
        {/* Notificaciones */}
        <div className="relative" ref={notificationRef}>
          <button
            className="text-white text-2xl relative focus:outline-none"
            onClick={() => setShowNotifications((v) => !v)}
          >
            <FaBell />
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center border border-black">
                {pendingCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#181A20] border border-gray-700 rounded shadow-lg z-50 animate-fade-in">
              <div className="p-4 border-b font-bold text-white">Notificaciones</div>
              <ul className="max-h-60 overflow-y-auto">
                {mockNotifications.length === 0 ? (
                  <li className="p-4 text-gray-400">No hay notificaciones pendientes.</li>
                ) : (
                  mockNotifications.map((notif) => (
                    <li key={notif.id} className="px-4 py-2 border-b last:border-b-0 hover:bg-gray-800 cursor-pointer text-white">
                      {notif.message}
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
                <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white">Mi perfil</li>
                <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white">Configuración</li>
                <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white">Ayuda</li>
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