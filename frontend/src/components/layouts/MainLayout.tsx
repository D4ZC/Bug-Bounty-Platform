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
        <SideNav aria-label="Menú lateral" className="bg-white shadow-md min-h-full w-16 flex flex-col items-center py-4">
          <SideNavItems>
            <div className="flex flex-col gap-[45px] items-center w-full">
              <SideNavLink href="/">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <Home size={24} className="text-blue-600 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] transition-all duration-200" />
                </span>
              </SideNavLink>
              <SideNavLink href="/contributions">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <Add size={24} className="text-blue-600 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] transition-all duration-200" />
                </span>
              </SideNavLink>
              <SideNavLink href="/resolved-vulnerabilities">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <Document size={24} className="text-blue-600 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] transition-all duration-200" />
                </span>
              </SideNavLink>
              <SideNavLink href="/tablet">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <Tablet size={24} className="text-blue-600 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] transition-all duration-200" />
                </span>
              </SideNavLink>
              <SideNavLink href="/contributions">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <List size={24} className="text-blue-600 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] transition-all duration-200" />
                </span>
              </SideNavLink>
              <SideNavLink href="/settings">
                <span className="group flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:shadow-md">
                  <SettingsAdjust size={24} className="text-blue-600 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] transition-all duration-200" />
                </span>
              </SideNavLink>
            </div>
          </SideNavItems>
        </SideNav>
        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout; 