import React from 'react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { Home, List, SettingsAdjust, ShoppingCart, Add, Notification, UserAvatar, Document } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
// const bpLogo = '/bp-logo.png';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar superior */}
      <Header aria-label="Bug Bounty Platform" className="bg-gray-900 h-20 min-h-0 flex items-center px-8">
        <HeaderName href="/" prefix="" className="text-lg">
          Bug Bounty Platform
        </HeaderName>
        <div className="flex-1" />
        <div className="flex items-center gap-6 pr-2">
          <span className="group flex items-center" onClick={() => navigate('/eventos')}>
            <img src={'/bp-logo.png'} alt="BP Logo" style={{ width: 36, height: 36, display: 'block', objectFit: 'contain', transformStyle: 'preserve-3d' }} className="cursor-pointer mr-2 bugcoins-spin-3d" />
            <span className="text-white text-lg font-bold ml-1 select-none">1325</span>
          </span>
          <span className="group" onClick={() => navigate('/notifications')}>
            <Notification size={28} className="text-white cursor-pointer group-hover:bg-white group-hover:text-gray-900 rounded-full transition-colors duration-200 p-1" />
          </span>
          <span className="group" onClick={() => navigate('/profile')}>
            <UserAvatar size={28} className="text-white cursor-pointer group-hover:bg-white group-hover:text-gray-900 rounded-full transition-colors duration-200 p-1" />
          </span>
        </div>
      </Header>
      <div className="flex flex-1">
        {/* Sidebar lateral */}
        <SideNav aria-label="Menú lateral" className="bg-white shadow-md min-h-full w-16 flex flex-col items-center py-4 fixed top-20 left-0 h-[calc(100vh-5rem)] z-40">
          <SideNavItems>
            <div className="flex flex-col gap-[45px] items-center w-full">
              <SideNavLink href="/">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <Home size={24} className="text-black group-hover:text-blue-600 transition-all duration-200 home-anim" />
                </span>
              </SideNavLink>
              <SideNavLink href="/contributions">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <Add size={24} className="text-black group-hover:text-blue-600 transition-all duration-200 add-anim" />
                </span>
              </SideNavLink>
              <SideNavLink href="/resolved-vulnerabilities">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  {/* Icono bug SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 32 32" className="text-black group-hover:text-blue-600 transition-all duration-200 bug-anim">
                    <g stroke="currentColor" stroke-width="2">
                      <ellipse cx="16" cy="20" rx="7" ry="8"/>
                      <path d="M16 12V8m0 0V4m0 4c-3.5 0-6 2.5-6 6m6-6c3.5 0 6 2.5 6 6M4 20h4m20 0h-4M7 27l2.5-2.5M25 27l-2.5-2.5M7 13l2.5 2.5M25 13l-2.5 2.5"/>
                    </g>
                  </svg>
                </span>
              </SideNavLink>
              <SideNavLink href="/shop">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <ShoppingCart size={24} className="text-black group-hover:text-blue-600 transition-all duration-200 shop-anim" />
                </span>
              </SideNavLink>
              <SideNavLink href="/eventos">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  {/* Icono Events de IBM Carbon (3 personas) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-black group-hover:text-blue-600 transition-all duration-200 eventos-anim">
                    <circle cx="16" cy="10" r="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="24" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M4 26c0-3.313 5.373-6 12-6s12 2.687 12 6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 17c-2.21 0-4 1.343-4 3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M24 17c2.21 0 4 1.343 4 3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
              </SideNavLink>
              <SideNavLink href="/settings">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  {/* Engranaje Carbon perfectamente centrado */}
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black group-hover:text-blue-600 transition-all duration-200 gear-spin">
                    <path d="M16 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0-8c.6 0 1 .4 1 1v2.1a9.9 9.9 0 0 1 2.5.7l1.5-1.5a1 1 0 0 1 1.4 0l2.1 2.1a1 1 0 0 1 0 1.4l-1.5 1.5c.3.8.5 1.6.7 2.5H27a1 1 0 0 1 1 1v3c0 .6-.4 1-1 1h-2.1a9.9 9.9 0 0 1-.7 2.5l1.5 1.5a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0l-1.5-1.5a9.9 9.9 0 0 1-2.5.7V27a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-2.1a9.9 9.9 0 0 1-2.5-.7l-1.5 1.5a1 1 0 0 1-1.4 0l-2.1-2.1a1 1 0 0 1 0-1.4l1.5-1.5a9.9 9.9 0 0 1-.7-2.5H5a1 1 0 0 1-1-1v-3c0-.6.4-1 1-1h2.1a9.9 9.9 0 0 1 .7-2.5l-1.5-1.5a1 1 0 0 1 0-1.4l2.1-2.1a1 1 0 0 1 1.4 0l1.5 1.5a9.9 9.9 0 0 1 2.5-.7V5c0-.6.4-1 1-1zm0 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
              </SideNavLink>
            </div>
          </SideNavItems>
        </SideNav>
        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen ml-16">{children}</main>
      </div>
      <style>{`
        .home-anim:hover { animation: bounceY 0.5s; }
        @keyframes bounceY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .add-anim:hover { animation: spinAdd 0.5s; }
        @keyframes spinAdd {
          0% { transform: rotate(0deg); }
          60% { transform: rotate(90deg); }
          100% { transform: rotate(0deg); }
        }
        .bug-anim:hover { animation: shakeBug 0.5s; }
        @keyframes shakeBug {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .shop-anim:hover { animation: shakeShop 0.5s; }
        @keyframes shakeShop {
          0%, 100% { transform: translateX(0); }
          30% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
        }
        .eventos-anim:hover { animation: pulseEventos 0.5s; }
        @keyframes pulseEventos {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .gear-spin:hover {
          animation: gear-spin-rotate 1s linear infinite;
        }
        @keyframes gear-spin-rotate {
          100% { transform: rotate(360deg); }
        }
        .bugcoins-spin {
          animation: bugcoins-spin-rotate 6s linear infinite;
        }
        @keyframes bugcoins-spin-rotate {
          100% { transform: rotate(360deg); }
        }
        .bugcoins-spin-3d {
          animation: bugcoins-spin-3d-rotate 2.5s linear infinite;
          transform-style: preserve-3d;
        }
        @keyframes bugcoins-spin-3d-rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MainLayout; 