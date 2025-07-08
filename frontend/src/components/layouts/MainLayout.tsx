import React from 'react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { Home, List, SettingsAdjust, Tablet, Add, Notification, UserAvatar } from '@carbon/icons-react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Navbar superior */}
    <Header aria-label="Bug Bounty Platform" className="bg-gray-900">
      <HeaderName href="/" prefix="">
        Bug Bounty Platform
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Notificaciones">
          <Notification size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Perfil">
          <UserAvatar size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
    <div className="flex flex-1">
      {/* Sidebar lateral */}
      <SideNav aria-label="Menú lateral" className="bg-white shadow-md min-h-full w-16 flex flex-col items-center py-4">
        <SideNavItems>
          <SideNavLink href="/">
            <Home size={24} />
          </SideNavLink>
          <SideNavLink href="/list">
            <List size={24} />
          </SideNavLink>
          <SideNavLink href="/settings">
            <SettingsAdjust size={24} />
          </SideNavLink>
          <SideNavLink href="/tablet">
            <Tablet size={24} />
          </SideNavLink>
          <SideNavLink href="/add">
            <Add size={24} />
          </SideNavLink>
        </SideNavItems>
      </SideNav>
      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  </div>
);

export default MainLayout; 