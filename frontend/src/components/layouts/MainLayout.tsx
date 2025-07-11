import React, { useState, useRef, useEffect } from 'react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { Home, List, SettingsAdjust, Tablet, Add, Notification, UserAvatar } from '@carbon/icons-react';

const initialNotifications = [
  { id: 1, text: 'Nueva vulnerabilidad reportada', read: false },
  { id: 2, text: 'Tu equipo subió de ranking', read: true },
  { id: 3, text: 'Tienes una recompensa pendiente', read: false },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const bellRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Marcar todas como leídas al abrir el menú
  const handleBellClick = () => {
    if (!open) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setIsVisible(true);
      setTimeout(() => setOpen(true), 10); // Espera para activar la animación de entrada
    }
    // Si ya está abierto, no hacer nada
  };

  // Cerrar con animación
  const handleClosePanel = () => {
    setOpen(false);
    setTimeout(() => setIsVisible(false), 300); // Espera a que termine la animación
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar superior */}
      <Header aria-label="Bug Bounty Platform" className="bg-black text-white h-20">
        <div className="flex w-full items-center h-20">
          <HeaderName href="/" prefix="" className="text-white text-2xl font-bold">
            Bug Bounty Platform
          </HeaderName>
          <div className="ml-auto flex items-center gap-6">
            <div className="relative" ref={bellRef}>
              <HeaderGlobalAction className="text-white" onClick={handleBellClick}>
                <Notification size={32} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 block h-3 w-3 rounded-full bg-red-500 border-2 border-black"></span>
                )}
              </HeaderGlobalAction>
            </div>
            <HeaderGlobalAction className="text-white">
              <UserAvatar size={32} />
            </HeaderGlobalAction>
          </div>
        </div>
      </Header>
      {/* Panel lateral de notificaciones con animación y handle */}
      {isVisible && (
        <div className={`fixed inset-0 z-50 flex justify-end pointer-events-none`}>
          {/* Fondo semitransparente */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={handleClosePanel}
          ></div>
          <aside
            className={`relative w-80 h-full bg-white text-black shadow-lg flex flex-col transform transition-transform duration-300 pointer-events-auto ${open ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="p-4 font-bold border-b text-lg flex justify-between items-center">
              Notificaciones
              <button onClick={handleClosePanel} className="text-gray-500 hover:text-black text-2xl">&times;</button>
            </div>
            <ul className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <li className="p-4 text-center text-gray-500">Sin notificaciones</li>
              ) : (
                notifications.map((n) => (
                  <li key={n.id} className={`p-4 border-b last:border-b-0 ${n.read ? 'bg-gray-100' : 'bg-blue-50 font-semibold'}`}>
                    {n.text}
                  </li>
                ))
              )}
            </ul>
          </aside>
        </div>
      )}
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
            <SideNavLink href="/documentation">
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
};

export default MainLayout;