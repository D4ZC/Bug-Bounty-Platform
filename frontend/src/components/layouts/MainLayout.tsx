import React, { useState } from 'react';
import { Home, List, Chat, UserAvatar, Edit, ShoppingCart, Logout } from '@carbon/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaUsers } from 'react-icons/fa';
import { GiCrossedSwords, GiPodiumWinner } from 'react-icons/gi';
// Eliminar import { useBackground } from '../../contexts/BackgroundContext';

const neon = 'text-[#00fff7] drop-shadow-[0_0_8px_#00fff7]';
const neonIcon = 'text-[#00fff7] drop-shadow-[0_0_8px_#00fff7]';

const SidebarIcon = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <Link
      to={to}
      className={`transition-transform duration-200 hover:scale-125 ${clicked ? 'scale-125' : 'scale-100'} ${className} hover:drop-shadow-[0_0_16px_#00fff7]`}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 200);
      }}
    >
      {children}
    </Link>
  );
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // Eliminar const { backgroundUrl } = useBackground();

  return (
    <div
      className="min-h-screen flex flex-col font-mono transition-colors duration-500"
      style={{
        background: 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)',
      }}
    >
      {/* Navbar superior */}
      <header className="w-full py-4 flex justify-between items-center bg-[#181c2bcc] border-b-2 border-[#00fff7] shadow-[0_0_24px_#00fff7] backdrop-blur-md px-6">
        <div className="flex-1"></div>
        <h1
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide uppercase text-[#00fff7] drop-shadow-[0_0_8px_#00fff7] font-mono flex-1 text-center whitespace-nowrap"
          style={{ letterSpacing: '1px' }}
        >
          BUG BOUNTY PLATFORM
        </h1>
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* Información del usuario */}
          {user && (
            <div className="text-right mr-4">
              <div className="text-[#00fff7] text-sm font-bold">{user.username}</div>
              <div className="text-[#6f7a8a] text-xs">{user.role}</div>
            </div>
          )}
          
          {/* Botón de perfil */}
          <SidebarIcon to="/profile" className="hover:scale-125 transition-transform duration-200">
            <UserAvatar size={36} className={neonIcon} />
          </SidebarIcon>
          
          {/* Botón de logout */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="hover:scale-125 transition-transform duration-200 hover:drop-shadow-[0_0_16px_#ff4fa3]"
            title="Cerrar sesión"
          >
            <Logout size={36} className="text-[#ff4fa3] drop-shadow-[0_0_8px_#ff4fa3]" />
          </button>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar lateral */}
        <nav className="min-h-full w-20 flex flex-col items-center pb-4 border-r-2 border-[#00fff7] shadow-[0_0_24px_#00fff7]" style={{ background: 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
          <div className="flex flex-col items-center gap-8 mt-8 w-full">
            <SidebarIcon to="/">
              <Home size={36} className={neonIcon} />
            </SidebarIcon>
            <SidebarIcon to="/publisher">
              <Edit size={36} className={neonIcon} />
            </SidebarIcon>
            <SidebarIcon to="/documentacion">
              <List size={36} className={neonIcon} />
            </SidebarIcon>
            <SidebarIcon to="/store">
              <ShoppingCart size={36} className={neonIcon} />
            </SidebarIcon>
            {/* Moderación solo para admin o moderator */}
            {user && (user.role === 'admin' || user.role === 'moderator') && (
              null
            )}
            <SidebarIcon to="/feedback">
              <Chat size={36} className={neonIcon} />
            </SidebarIcon>
            <SidebarIcon to="/duelos">
              <GiCrossedSwords size={36} color="#00fff7" />
            </SidebarIcon>
            <SidebarIcon to="/arena-duelos">
              <GiPodiumWinner size={36} color="#ffb300" />
            </SidebarIcon>
            <button onClick={() => navigate('/equipos')} className="text-[#00fff7] hover:text-[#39ff14] transition text-2xl" title="Equipos">
              <FaUsers />
            </button>
          </div>
        </nav>
        {/* Contenido principal */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout; 