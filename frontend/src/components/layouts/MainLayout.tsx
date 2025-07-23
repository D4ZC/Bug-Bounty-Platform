import React, { useState } from 'react';
import { useTranslation } from '../../utils/useTranslation';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaTrophy, FaStore, FaUser, FaGavel } from 'react-icons/fa';

const sidebarLinks = [
  { label: 'Home', path: '/dashboard', icon: <FaHome /> },
  { label: 'Perfil', path: '/profile', icon: <FaUser /> },
  { label: 'Documentación', path: '/documentation', icon: <FaBook /> },
  { label: 'Duelos', path: '/duelos', icon: <FaTrophy /> },
  { label: 'Gulag', path: '/gulag', icon: <FaGavel /> },
  { label: 'Tienda', path: '/shop', icon: <FaStore /> },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1">
        {/* Sidebar mejorado */}
        <aside
          className={`flex flex-col py-6 border-r border-gray-800 bg-black shadow-lg min-h-full transition-all duration-300 ${expanded ? 'w-56' : 'w-16'} relative`}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          <nav className="flex flex-col gap-2 mt-10">
            {sidebarLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-900 transition-colors text-base font-medium text-white ${location.pathname.startsWith(link.path) ? 'bg-gray-900 text-purple-400 font-bold' : ''}`}
                tabIndex={0}
                aria-label={link.label}
              >
                <span className="text-xl">{link.icon}</span>
                {expanded && <span className="whitespace-nowrap">{link.label}</span>}
              </button>
            ))}
          </nav>
        </aside>
        {/* Contenido principal ajustado */}
        <main className="flex-1 p-6 bg-[#181A20] min-h-screen text-white">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout; 