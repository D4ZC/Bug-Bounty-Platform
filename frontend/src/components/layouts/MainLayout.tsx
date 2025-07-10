import React from 'react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { Home, List, SettingsAdjust, Tablet, Add, Notification, UserAvatar } from '@carbon/icons-react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Navbar superior */}
    <Header aria-label="Bug Bounty Platform" className="bg-blue-600 flex justify-between items-center py-3" >
      <HeaderName href="/" prefix="" className="text-3xl font-serif">
        Bug Bounty Platform
      </HeaderName>
      <HeaderGlobalBar className="flex items-center space-x-8 pr-6">
        <HeaderGlobalAction aria-label="Notificaciones" className="flex items-center">
          <Notification size={24} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Perfil">
          <UserAvatar size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
    <div className="flex flex-1">
      {/* Sidebar lateral */}
      <SideNav aria-label="Menú lateral" className="bg-blue-800 shadow-md min-h-full w-20 flex flex-col items-center py-6">
        <SideNavItems className="flex flex-col space-y-6">
          <SideNavLink href="/" className="p-3 rounded-lg">
            <Home size={28} />
          </SideNavLink>
          <SideNavLink href="/list" className="p-3 rounded-lg">
            <List size={28} />
          </SideNavLink>
          <SideNavLink href="/settings" className="p-3 rounded-lg">
            <SettingsAdjust size={28} />
          </SideNavLink>
          <SideNavLink href="/tablet" className="p-3 rounded-lg">
            <Tablet size={28} />
          </SideNavLink>
          <SideNavLink href="/add" className="p-3 rounded-lg">
            <Add size={28} />
          </SideNavLink>
        </SideNavItems>
      </SideNav>
      
      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  </div>
);

export default MainLayout; 