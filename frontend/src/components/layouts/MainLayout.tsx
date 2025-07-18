import React, { useRef, useState, useEffect } from 'react';
import { FaHome, FaList, FaTabletAlt, FaBookOpen, FaBars, FaBell, FaUser } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

const SIDEBAR_WIDTH = 64; // w-16 = 64px
const HEADER_HEIGHT = 56; // py-3 + text-lg aprox 56px

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: '¡Bienvenido a la plataforma Bug Bounty!', time: 'Hace 1 minuto' },
    { id: 2, title: 'Tienes un nuevo reto disponible.', time: 'Hace 5 minutos' },
    { id: 3, title: '¡Felicidades! Has resuelto una vulnerabilidad crítica.', time: 'Hace 10 minutos' },
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleRemoveNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra superior negra fija */}
      <header
        className="fixed top-0 left-0 w-full bg-black text-white py-3 px-6 flex items-center shadow z-50"
        style={{ height: HEADER_HEIGHT }}
      >
        <span className="text-lg font-bold tracking-wide">Bug Bounty Platform</span>
        <div className="ml-auto flex items-center gap-6">
          <button
            className="focus:outline-none hover:text-gray-300 relative"
            aria-label="Notificaciones"
            onClick={() => setShowNotifications((v) => !v)}
          >
            <FaBell size={22} />
          </button>
          <button
            className="focus:outline-none hover:text-gray-300"
            aria-label="Perfil"
            onClick={() => navigate('/profile')}
          >
            <FaUser size={22} />
          </button>
        </div>
        {/* Notificaciones emergentes */}
        {showNotifications && (
          <div
            ref={notifRef}
            className="absolute right-8 top-16 w-80 max-w-full bg-white text-black rounded-xl shadow-2xl border border-gray-200 z-50 animate-fade-in"
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
              <span className="font-semibold text-lg">Notificaciones</span>
              <button
                className="text-gray-400 hover:text-gray-700 text-xl p-1 rounded-full focus:outline-none"
                onClick={() => setShowNotifications(false)}
                aria-label="Cerrar notificaciones"
              >
                <IoMdClose />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-4 flex flex-col gap-3">
              {notifications.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No hay notificaciones.</div>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="bg-gray-50 rounded-lg px-3 py-2 shadow-sm border border-gray-100 flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium">{notif.title}</div>
                      <div className="text-xs text-gray-500">{notif.time}</div>
                    </div>
                    <button
                      className="text-gray-400 hover:text-gray-700 text-lg p-1 rounded-full focus:outline-none mt-1"
                      onClick={() => handleRemoveNotification(notif.id)}
                      aria-label="Eliminar notificación"
                    >
                      <IoMdClose />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </header>
      {/* Sidebar lateral fijo */}
      <aside
        className="fixed top-0 left-0 bg-white shadow-md w-16 flex flex-col items-center py-4 justify-between z-40"
        style={{ height: '100vh', marginTop: HEADER_HEIGHT }}
      >
        <div className="flex flex-col items-center space-y-8 mt-12">
          <button onClick={() => navigate('/')} className="mb-2 p-2 hover:bg-gray-200 rounded">
            <FaHome size={24} />
          </button>
          <button onClick={() => navigate('/score')} className="mb-2 p-2 hover:bg-gray-200 rounded">
            <FaList size={24} />
          </button>
          <button onClick={() => navigate('/duels')} className="mb-2 p-2 hover:bg-gray-200 rounded">
            <GiCrossedSwords size={24} />
          </button>
          {/* Gulag icono de barras verticales */}
          <button onClick={() => navigate('/gulag')} className="mb-2 p-2 hover:bg-gray-200 rounded">
            <div style={{ transform: 'rotate(90deg)' }}>
              <FaBars size={24} />
            </div>
          </button>
          <button onClick={() => navigate('/contributions')} className="mb-2 p-2 hover:bg-gray-200 rounded">
            <FaTabletAlt size={24} />
          </button>
          {/* Icono de pluma para reportes */}
          <button onClick={() => navigate('/reports')} className="mb-2 p-2 hover:bg-gray-200 rounded">
            <FiEdit2 size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center mb-auto mt-20">
          <button onClick={() => navigate('/rules')} className="p-2 hover:bg-gray-200 rounded">
            <FaBookOpen size={24} />
          </button>
        </div>
      </aside>
      {/* Contenido principal con padding para no tapar header y sidebar */}
      <main
        className="bg-gray-100 min-h-screen"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          paddingTop: HEADER_HEIGHT + 16,
          paddingRight: 0,
          paddingLeft: 0,
        }}
      >
        <div className="p-6">{children}</div>
      </main>
  </div>
);
};

export default MainLayout; 