import React, { useState, useRef, useEffect } from 'react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { Home, List, SettingsAdjust, Tablet, Add, Notification, UserAvatar } from '@carbon/icons-react';
import { Bell, User, Menu, Home as HomeIcon, FileText } from 'lucide-react';

const NAVBAR_HEIGHT = 64 + 50; // altura original + 50px extra
// Elimino SIDEBAR_HEIGHT y lógica de sidebar superior

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Elimino lógica de menú hamburguesa y sidebar superior
  return (
    <div className="min-h-screen bg-transparent">
      {/* Navbar superior */}
      <Header aria-label="Bug Bounty Platform" className="bg-softGray-dark flex items-center h-24 shadow-md transition-all duration-300 w-full">
        <span
          className="font-sans text-2xl font-bold tracking-wide text-gray-800 select-none ml-6"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          BUG BOUNTY PLATFORM
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-6 mr-6">
          <button aria-label="Notificaciones" className="text-gray-700 hover:text-primaryBlue-dark transition-colors">
            <Bell size={28} />
          </button>
          <button aria-label="Perfil" className="text-gray-700 hover:text-primaryBlue-dark transition-colors">
            <User size={28} />
          </button>
        </div>
      </Header>
      <div className="flex flex-1">
        {/* Sidebar lateral restaurado */}
        <SideNav aria-label="Menú lateral" className="bg-white shadow-md min-h-full w-[250px] flex flex-col items-start py-4">
          <SideNavItems>
            <SideNavLink href="/" className="flex flex-row items-center gap-3 px-4 py-2 w-full">
              <Home size={24} />
              <span className="text-gray-700 font-medium">Inicio</span>
            </SideNavLink>
            <SideNavLink href="/formulario" className="flex flex-row items-center gap-3 px-4 py-2 w-full">
              <FileText size={24} />
              <span className="text-gray-700 font-medium">Formulario</span>
            </SideNavLink>
            <SideNavLink href="/settings" className="flex flex-row items-center gap-3 px-4 py-2 w-full">
              <SettingsAdjust size={24} />
              <span className="text-gray-700 font-medium">Ajustes</span>
            </SideNavLink>
            <SideNavLink href="/tablet" className="flex flex-row items-center gap-3 px-4 py-2 w-full">
              <Tablet size={24} />
              <span className="text-gray-700 font-medium">Tablet</span>
            </SideNavLink>
            <SideNavLink href="/add" className="flex flex-row items-center gap-3 px-4 py-2 w-full">
              <Add size={24} />
              <span className="text-gray-700 font-medium">Próximamente</span>
            </SideNavLink>
          </SideNavItems>
        </SideNav>
        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen transition-all duration-300">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout; 