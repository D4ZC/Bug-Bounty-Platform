import React, { useState } from 'react';
import { Home, List, Chat, UserAvatar, Edit } from '@carbon/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaUsers } from 'react-icons/fa';

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
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a183d] via-[#1a0033] to-[#2d003e] font-mono transition-colors duration-500">
      {/* Navbar superior */}
      <header className="w-full py-4 flex justify-center items-center bg-[#181c2bcc] border-b-2 border-[#00fff7] shadow-[0_0_24px_#00fff7] backdrop-blur-md">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-wide uppercase text-[#00fff7] drop-shadow-[0_0_8px_#00fff7] font-mono"
          style={{ letterSpacing: '2px', textAlign: 'center' }}
        >
          BUG BOUNTY PLATFORM
        </h1>
      </header>
      <div className="flex flex-1">
        {/* Sidebar lateral */}
        <nav className="min-h-full w-20 flex flex-col items-center pb-4 bg-[#181c2bcc] border-r-2 border-[#00fff7] shadow-[0_0_24px_#00fff7] backdrop-blur-md">
          {/* Icono de usuario con margen superior y mismo efecto de hover/click */}
          <SidebarIcon to="/profile" className="mt-8">
            <UserAvatar size={36} className={neonIcon} />
          </SidebarIcon>
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
            {/* Moderación solo para admin o moderator */}
            {user && (user.role === 'admin' || user.role === 'moderator') && (
              null
            )}
            <SidebarIcon to="/feedback">
              <Chat size={36} className={neonIcon} />
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