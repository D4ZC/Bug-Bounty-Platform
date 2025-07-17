import React, { useState } from 'react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, Modal, Button, Search } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import {
  Dashboard,
  UserMilitary,
  Folders,
  TaskView,
  Notification,
  Chat,
  Settings,
  Help,
  Store,
  Gift
} from '@carbon/icons-react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<string | null>(null);
  const [selected, setSelected] = useState('Dashboard');
  const [expanded, setExpanded] = useState(false);

  // Mock user/team data
  const user = { name: 'Sofia Reynolds', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' };
  const team = { name: 'Saleshouse' };

  const navigate = useNavigate();

  // Placeholder modals
  const renderModal = () => {
    switch (modal) {
      case 'equipos':
        return <Modal open modalHeading="Equipos" onRequestClose={() => setModal(null)}>Lista de equipos (placeholder)</Modal>;
      case 'usuarios':
        return <Modal open modalHeading="Usuarios" onRequestClose={() => setModal(null)}>Lista de usuarios (placeholder)</Modal>;
      case 'gulag':
        return <Modal open modalHeading="Gulag" onRequestClose={() => setModal(null)}>Usuarios en Gulag (placeholder)</Modal>;
      case 'duelos':
        return <Modal open modalHeading="Duelos" onRequestClose={() => setModal(null)}>
          <div style={{ display: 'flex', gap: 16 }}>
            <Button size="sm">USERS</Button>
            <Button size="sm">TEAMS</Button>
          </div>
          <div style={{ marginTop: 16 }}>Contenido de duelos (placeholder)</div>
        </Modal>;
      case 'documentacion':
        return <Modal open modalHeading="Documentación" onRequestClose={() => setModal(null)}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <Search labelText="Buscar documentación" placeholder="Buscar..." size="sm" />
            <Button size="sm">Filtrar</Button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {/* Card de documentación placeholder */}
            <div style={{ background: '#2228', borderRadius: 12, padding: 16, color: 'white', width: 250 }}>
              <div style={{ fontWeight: 600 }}>Nombre de la documentación</div>
              <div style={{ fontSize: 12, margin: '8px 0' }}>Previsualización corta...</div>
              <Button size="sm" style={{ marginBottom: 8 }}>Subir archivo</Button>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button size="sm" kind="ghost">👍 10</Button>
                <Button size="sm" kind="ghost">👎 2</Button>
              </div>
            </div>
            {/* Más cards... */}
          </div>
        </Modal>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`h-screen ${expanded ? 'w-56' : 'w-20'} bg-white flex flex-col items-center py-4 shadow-lg fixed top-0 left-0 z-20 transition-all duration-300 border-r border-gray-200 ${!expanded ? 'justify-center' : ''}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Perfil */}
        <div
          className="flex flex-col items-center cursor-pointer mb-6"
          onClick={() => navigate('/perfil')}
        >
          <img
            src={user.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
        {/* Buscador */}
        <div className="mb-6 w-full flex justify-center px-2">
          {expanded ? (
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full h-8 rounded bg-gray-100 text-xs text-gray-800 px-2 outline-none border border-gray-300 placeholder-gray-400"
              style={{ fontSize: 12, minWidth: 120, transition: 'min-width 0.3s' }}
            />
          ) : (
            <button className="flex items-center justify-center w-10 h-10 focus:outline-none bg-transparent border-none">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#23232a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}
        </div>
        {/* Módulo Banners */}
        <nav className="flex flex-col gap-2 items-center w-full mb-2">
          <button
            className={`flex items-center gap-3 focus:outline-none w-full px-3 py-2 rounded transition-colors duration-150 text-[#7c3aed]`}
            onClick={() => navigate('/banners')}
            title="Banners"
          >
            <Gift size={24} />
            {expanded && <span className="text-base font-medium text-[#7c3aed]">Banners</span>}
          </button>
        </nav>
        {/* Módulos principales */}
        <nav className="flex flex-col gap-2 items-center w-full">
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus:outline-none w-full px-3 py-2 rounded transition-colors duration-150"
            onClick={() => navigate('/')}
            title="Dashboard"
          >
            <Dashboard size={24} />
            {expanded && <span className="text-base font-medium">Dashboard</span>}
          </button>
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus:outline-none w-full px-3 py-2 rounded transition-colors duration-150"
            onClick={() => navigate('/duel')}
            title="Duel"
          >
            <UserMilitary size={24} />
            {expanded && <span className="text-base font-medium">Duel</span>}
          </button>
        </nav>
        {/* Separador y Extra Points */}
        <div className="w-10 border-t border-gray-200 my-4"></div>
        {expanded && <div className="text-[11px] text-gray-500 mb-2 w-full px-3">Extra Points</div>}
        <nav className="flex flex-col gap-2 items-center w-full">
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus:outline-none w-full px-3 py-2 rounded transition-colors duration-150"
            onClick={() => navigate('/helpers')}
            title="Helpers"
          >
            <Help size={24} />
            {expanded && <span className="text-base font-medium">Helpers</span>}
          </button>
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus:outline-none w-full px-3 py-2 rounded transition-colors duration-150"
            onClick={() => navigate('/files')}
            title="Files"
          >
            <Folders size={24} />
            {expanded && <span className="text-base font-medium">Files</span>}
          </button>
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus:outline-none w-full px-3 py-2 rounded transition-colors duration-150"
            onClick={() => navigate('/recovery-files')}
            title="Recovery Files"
          >
            <TaskView size={24} />
            {expanded && <span className="text-base font-medium">Recovery Files</span>}
          </button>
        </nav>
        {/* Separador y Notifications */}
        <div className="w-10 border-t border-gray-200 my-4"></div>
        {expanded && <div className="text-[11px] text-gray-500 mb-2 w-full px-3">Notifications</div>}
        <nav className="flex flex-col gap-2 items-center w-full">
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus:outline-none w-full px-3 py-2 rounded transition-colors duration-150"
            onClick={() => navigate('/messages')}
            title="Message"
          >
            <Chat size={24} />
            {expanded && <span className="text-base font-medium">Message</span>}
          </button>
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus:outline-none w-full px-3 py-2 rounded transition-colors duration-150"
            onClick={() => navigate('/notifications')}
            title="Notifications"
          >
            <Notification size={24} />
            {expanded && <span className="text-base font-medium">Notifications</span>}
          </button>
        </nav>
        {/* Separador y Settings */}
        <div className="w-10 border-t border-gray-200 my-4"></div>
        {expanded && <div className="text-[11px] text-gray-500 mb-2 w-full px-3">Settings</div>}
        <nav className="flex flex-col gap-2 items-center w-full">
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 focus:outline-none w-full px-3 py-2 rounded transition-colors duration-150"
            onClick={() => navigate('/settings')}
            title="Settings"
          >
            <Settings size={24} />
            {expanded && <span className="text-base font-medium">Settings</span>}
          </button>
        </nav>
      </aside>
      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100 min-h-screen relative z-0 ml-20">{children}</main>
    </div>
  );
};

export default MainLayout; 