import React, { useState } from 'react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavItems, SideNavLink, Modal, Button, Search } from '@carbon/react';
import { Notification, UserAvatar, UserMultiple, Star, WarningAlt, Trophy, Document, Currency, Settings, Store } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar superior */}
      <nav className="w-full h-14 bg-[#181818] flex items-center px-8 shadow z-10 fixed top-0 left-0 justify-between" style={{ color: 'white' }}>
        <span className="text-2xl font-bold tracking-wide">BugBounty</span>
        <span className="flex items-center"><Store size={28} /></span>
      </nav>
      <div className="flex flex-1 pt-16">
        {/* Sidebar lateral */}
        <SideNav
          aria-label="Menú lateral"
          expanded={expanded}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          className={`transition-all duration-300 text-white shadow-lg min-h-full flex flex-col py-6 items-center border-none ${expanded ? 'w-64' : 'w-20'}`}
          style={{ width: expanded ? 240 : 80, color: 'white', background: '#181818', boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)' }}
        >
          {/* Avatar, nombre de usuario y equipo */}
          <div className={`flex flex-col items-center w-full ${expanded ? 'px-6 mb-4' : 'px-2 mb-2'}`}>
            <div className="flex flex-col items-center gap-2 mb-2 w-full">
              <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
              {expanded && (
                <div className="flex flex-col items-center w-full">
                  <span className="text-base font-semibold mt-1 cursor-pointer" onClick={() => navigate('/perfil')}>{user.name}</span>
                  <span className="text-xs text-gray-400 cursor-pointer" onClick={() => navigate('/perfil')}>{team.name}</span>
                </div>
              )}
            </div>
            {/* Buscador cuadrado/redondeado según estado */}
            <div className={`w-full flex justify-center ${expanded ? 'mt-2' : 'mt-1'}`}>
              <div className={`${expanded ? 'w-full' : 'w-10 h-10'} transition-all duration-300`}>
                {expanded ? (
                  <div className="flex items-center bg-black rounded-full px-3 py-1 w-full">
                    <svg width="22" height="22" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24" className="mr-2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" placeholder="Buscar..." className="flex-1 bg-transparent outline-none border-none text-white placeholder-gray-400 text-base" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center"><svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
                )}
              </div>
            </div>
          </div>
          {/* Menú principal */}
          <SideNavItems className="w-full px-4">
            <div className={`text-xs font-bold uppercase text-gray-400 mb-2 ${expanded ? 'opacity-100' : 'opacity-0'}`}>Menu</div>
            <SideNavLink href="#" renderIcon={Trophy} onClick={() => { setSelected('Dashboard'); navigate('/'); }} className={`flex items-center font-bold px-3 py-2 my-1 rounded-md transition-all duration-150 ${selected === 'Dashboard' ? 'text-blue-500' : 'text-white'} ${expanded ? '' : 'justify-center'}`} style={{ gap: 10, fontWeight: 700, fontSize: 16 }}>
              {expanded && 'Dashboard'}
            </SideNavLink>
            <SideNavLink href="#" renderIcon={UserAvatar} onClick={() => { setSelected('Perfil'); navigate('/perfil'); }} className={`flex items-center px-3 py-2 my-1 rounded-md transition-all duration-150 ${selected === 'Perfil' ? 'text-blue-500 font-bold' : 'text-white'} ${expanded ? '' : 'justify-center'}`} style={{ gap: 10, fontWeight: 700, fontSize: 16 }}>
              {expanded && 'Perfil'}
            </SideNavLink>
            <SideNavLink href="#" renderIcon={Star} onClick={() => setSelected('MVP')} className={`flex items-center px-3 py-2 my-1 rounded-md transition-all duration-150 ${selected === 'MVP' ? 'text-blue-500 font-bold' : 'text-white'} ${expanded ? '' : 'justify-center'}`} style={{ gap: 10, fontWeight: 700, fontSize: 16 }}>
              {expanded && 'MVP'}
            </SideNavLink>
            <SideNavLink href="#" renderIcon={WarningAlt} onClick={() => setSelected('Gulag')} className={`flex items-center px-3 py-2 my-1 rounded-md transition-all duration-150 ${selected === 'Gulag' ? 'text-blue-500 font-bold' : 'text-white'} ${expanded ? '' : 'justify-center'}`} style={{ gap: 10, fontWeight: 700, fontSize: 16 }}>
              {expanded && 'Gulag'}
            </SideNavLink>
            <SideNavLink href="#" renderIcon={Document} onClick={() => setSelected('Documentación')} className={`flex items-center px-3 py-2 my-1 rounded-md transition-all duration-150 ${selected === 'Documentación' ? 'text-blue-500 font-bold' : 'text-white'} ${expanded ? '' : 'justify-center'}`} style={{ gap: 10, fontWeight: 700, fontSize: 16 }}>
              {expanded && 'Documentación'}
            </SideNavLink>
            <SideNavLink href="#" renderIcon={Currency} onClick={() => setSelected('Blue Points')} className={`flex items-center px-3 py-2 my-1 rounded-md transition-all duration-150 ${selected === 'Blue Points' ? 'text-blue-500 font-bold' : 'text-white'} ${expanded ? '' : 'justify-center'}`} style={{ gap: 10, fontWeight: 700, fontSize: 16 }}>
              {expanded && 'Blue Points'}
            </SideNavLink>
          </SideNavItems>
          {/* Separador */}
          <div className="w-11/12 mx-auto border-t border-gray-700 my-4"></div>
          {/* Shortcuts */}
          <SideNavItems className="w-full px-4">
            <div className={`text-xs font-bold uppercase text-gray-400 mb-2 ${expanded ? 'opacity-100' : 'opacity-0'}`}>Shortcuts</div>
            <SideNavLink href="#" renderIcon={Settings} onClick={() => setSelected('Settings')} className={`flex items-center px-3 py-2 my-1 rounded-md transition-all duration-150 ${selected === 'Settings' ? 'text-blue-500 font-bold' : 'text-white'} ${expanded ? '' : 'justify-center'}`} style={{ gap: 10, fontWeight: 700, fontSize: 16 }}>
              {expanded && 'Settings'}
            </SideNavLink>
          </SideNavItems>
        </SideNav>
        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen relative z-0">{children}</main>
        {renderModal()}
      </div>
    </div>
  );
};

export default MainLayout; 