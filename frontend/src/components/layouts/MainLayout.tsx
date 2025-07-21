import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { Home, TableSplit, Book, Rule, ShoppingBag, GameConsole, Notification, UserAvatar } from '@carbon/icons-react';

const initialNotifications = [
  { id: 1, text: 'Nueva vulnerabilidad reportada', read: false, link: '/documentation' },
  { id: 2, text: 'Tu equipo subió de ranking', read: true, link: '/rankings' },
  { id: 3, text: 'Tienes una recompensa pendiente', read: false, link: '/rewards' },
  { id: 4, text: 'Nuevo mensaje de tu capitán de equipo', read: false, link: '/team' },
  { id: 5, text: 'Desafío semanal disponible', read: true, link: '/challenges' },
  { id: 6, text: 'Tu reporte fue validado por un admin', read: false, link: '/contributions' },
  { id: 7, text: 'Has recibido un nuevo logro', read: true, link: '/profile' },
  { id: 8, text: 'Actualización de reglas en la plataforma', read: false, link: '/documentation' },
  { id: 9, text: 'Un miembro se unió a tu equipo', read: true, link: '/team' },
  { id: 10, text: 'Tu vulnerabilidad fue comentada', read: false, link: '/vulnerabilities' },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const bellRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;
  const navigate = useNavigate();

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
                  <li
                    key={n.id}
                    className={`p-4 border-b last:border-b-0 cursor-pointer transition hover:bg-blue-100 ${n.read ? 'bg-gray-100' : 'bg-blue-50 font-semibold'}`}
                    onClick={() => navigate(n.link)}
                  >
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
          <SideNavItems className="flex flex-col gap-6">
            <SideNavLink href="/" title="Inicio">
              <Home size={24} />
            </SideNavLink>
            <SideNavLink href="/tables" title="Tablas">
              <TableSplit size={24} />
            </SideNavLink>
            <SideNavLink href="/documentation" title="Documentación">
              <Book size={24} />
            </SideNavLink>
            <SideNavLink href="/rules" title="Reglas">
              <Rule size={24} />
            </SideNavLink>
            <SideNavLink href="/store" title="Tienda">
              <ShoppingBag size={24} />
            </SideNavLink>
            <SideNavLink href="/duels" title="Duelos">
              <GameConsole size={24} />
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