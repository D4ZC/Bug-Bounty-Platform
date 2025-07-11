import React from 'react';
import { FaHome, FaList, FaTabletAlt, FaBookOpen, FaBars, FaBell, FaUser } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SIDEBAR_WIDTH = 64; // w-16 = 64px
const HEADER_HEIGHT = 56; // py-3 + text-lg aprox 56px

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra superior negra fija */}
      <header
        className="fixed top-0 left-0 w-full bg-black text-white py-3 px-6 flex items-center shadow z-50"
        style={{ height: HEADER_HEIGHT }}
      >
        <span className="text-lg font-bold tracking-wide">Bug Bounty Platform</span>
        <div className="ml-auto flex items-center gap-6">
          <button className="focus:outline-none hover:text-gray-300" aria-label="Notificaciones">
            <FaBell size={22} />
          </button>
          <button className="focus:outline-none hover:text-gray-300" aria-label="Perfil">
            <FaUser size={22} />
          </button>
        </div>
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