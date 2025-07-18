import React from 'react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { Home, List, SettingsAdjust, Tablet, Add, Notification, UserAvatar, Document } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

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
                  <Home size={24} className="text-black group-hover:text-gray-700 transition-all duration-200" />
                </span>
              </SideNavLink>
              <SideNavLink href="/contributions">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <Add size={24} className="text-black group-hover:text-gray-700 transition-all duration-200" />
                </span>
              </SideNavLink>
              <SideNavLink href="/resolved-vulnerabilities">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  {/* Icono bug SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 32 32" className="text-black group-hover:text-gray-700 transition-all duration-200">
                    <g stroke="currentColor" stroke-width="2">
                      <ellipse cx="16" cy="20" rx="7" ry="8"/>
                      <path d="M16 12V8m0 0V4m0 4c-3.5 0-6 2.5-6 6m6-6c3.5 0 6 2.5 6 6M4 20h4m20 0h-4M7 27l2.5-2.5M25 27l-2.5-2.5M7 13l2.5 2.5M25 13l-2.5 2.5"/>
                    </g>
                  </svg>
                </span>
              </SideNavLink>
              <SideNavLink href="/tablet">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <Tablet size={24} className="text-black group-hover:text-gray-700 transition-all duration-200" />
                </span>
              </SideNavLink>
              <SideNavLink href="/contributions">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <List size={24} className="text-black group-hover:text-gray-700 transition-all duration-200" />
                </span>
              </SideNavLink>
              <SideNavLink href="/settings">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <SettingsAdjust size={24} className="text-black group-hover:text-gray-700 transition-all duration-200" />
                </span>
              </SideNavLink>
            </div>
          </SideNavItems>
        </SideNav>
        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen" style={{ paddingLeft: '4rem' }}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout; 