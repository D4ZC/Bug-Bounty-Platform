import React, { useState } from 'react';
import { Home, List, Chat, UserAvatar, Edit } from '@carbon/icons-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

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
  
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Navbar superior */}
      <header className={`w-full py-4 flex justify-center items-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <h1
          className={`text-4xl md:text-5xl font-extrabold tracking-wide uppercase ${neon}`}
          style={{ letterSpacing: '2px', fontFamily: 'sans-serif', textAlign: 'center' }}
        >
          BUG BOUNTY PLATFORM
        </h1>
      </header>
      <div className="flex flex-1">
        {/* Sidebar lateral */}
        <nav className={`min-h-full w-20 flex flex-col items-center pb-4 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-gray-100'}`}>
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
          </div>
        </nav>
        {/* Contenido principal */}
        <main className={`flex-1 p-6 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout; 