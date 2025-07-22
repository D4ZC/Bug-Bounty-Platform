import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';
import ChatModal from '../ChatModal';
import { Header, SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import { Mail, User, Home, FileText, SlidersHorizontal, ShoppingBag, Landmark } from 'lucide-react';

const NAVBAR_HEIGHT = 64 + 50; // altura original + 50px extra
// Elimino SIDEBAR_HEIGHT y lógica de sidebar superior

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(0);
  const [showChat, setShowChat] = useState(false);
  // Elimino lógica de menú hamburguesa y sidebar superior
  const navigate = useNavigate();
  // Mock de mensajes
  const mensajes = [
    { title: 'HOLA', content: '¡Bienvenido a la plataforma! Aquí recibirás tus notificaciones importantes.' },
    { title: 'Recordatorio', content: 'No olvides revisar los nuevos retos de la semana.' },
    { title: 'Actualización', content: 'Se han mejorado las funciones de la tienda. ¡Explora las novedades!' },
  ];
  return (
    <div className="min-h-screen bg-transparent dark:bg-carbon-dark dark:text-gray-100 transition-colors duration-300">
      {/* Navbar superior */}
      <Header aria-label="Bug Bounty Platform" className="bg-[#000000] flex items-center h-24 shadow-md transition-all duration-300 w-full dark:bg-carbon-dark">
        <span
          className="font-gamer-title text-2xl font-bold tracking-wide text-white select-none ml-6"
          style={{ fontFamily: 'Orbitron, Arial, sans-serif' }}
        >
          BUG BOUNTY PLATFORM
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-6 mr-6">
          <LanguageSelector />
          <button aria-label="Mensajes" className="text-white hover:text-cyber-blue transition-colors" onClick={() => setShowMsgModal(true)}>
            <Mail size={28} />
          </button>
          <button aria-label="Perfil" className="text-white hover:text-cyber-blue transition-colors" onClick={() => navigate('/profile')}>
            <User size={28} />
          </button>
          {/* EQUIPOS - Lucide Users, ahora en navbar */}
          <button aria-label="Equipos" className="text-white hover:text-cyber-blue transition-colors" onClick={() => navigate('/equipos')}>
            <span className="inline-block" style={{ width: 28, height: 28 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
          </button>
        </div>
        {/* Modal de mensajes */}
        {showMsgModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-carbon-light rounded-xl shadow-2xl flex w-[500px] h-[300px] border-2 border-black animate-fade-in">
              {/* Sección izquierda: lista de títulos */}
              <div className="w-[120px] h-full border-r border-carbon-gray flex flex-col overflow-y-auto">
                {mensajes.map((msg, idx) => (
                  <button
                    key={msg.title}
                    className={`w-full px-2 py-2 text-left font-gamer-body text-sm border-b border-carbon-gray hover:bg-black hover:text-white transition-colors ${selectedMsg === idx ? 'bg-black text-white' : 'bg-transparent text-carbon-dark'}`}
                    onClick={() => setSelectedMsg(idx)}
                  >
                    {msg.title}
                  </button>
                ))}
              </div>
              {/* Sección derecha: contenido del mensaje */}
              <div className="flex-1 h-full p-4 flex flex-col justify-between">
                <div className="font-gamer-body text-carbon-dark text-base mb-2">
                  {mensajes[selectedMsg].content}
                </div>
                <button className="self-end mt-auto px-3 py-1 rounded bg-black text-white font-bold hover:bg-gray-800 transition-colors" onClick={() => setShowMsgModal(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </Header>
      <div className="flex flex-1">
        {/* Sidebar lateral restaurado */}
        <SideNav aria-label="Menú lateral" className="bg-gradient-to-b from-black to-blue-900 shadow-md min-h-full w-[250px] flex flex-col items-start py-4">
          <SideNavItems>
            <SideNavLink href="/" className="flex flex-row items-center gap-3 px-4 py-2 w-full text-white hover:text-cyber-blue transition-colors font-carbon-base">
              <Home size={24} color="#fff" />
              <span className="font-gamer-body text-white">Inicio</span>
            </SideNavLink>
            {/* Formulario con submenú */}
            <div className="w-full">
              <button
                type="button"
                className="flex flex-row items-center gap-3 px-4 py-2 w-full focus:outline-none text-left text-white hover:text-cyber-blue transition-colors font-carbon-base"
                onClick={() => setFormOpen((v) => !v)}
                aria-expanded={formOpen}
                aria-controls="submenu-formulario"
              >
                <FileText size={24} color="#fff" />
                <span className="font-gamer-body text-white">Formulario</span>
                <svg className={`ml-auto w-4 h-4 transition-transform ${formOpen ? 'rotate-90' : ''}`} fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              {formOpen && (
                <div id="submenu-formulario" className="pl-10 flex flex-col gap-1">
                  <SideNavLink href="/formulario/crear" className="px-2 py-1 text-white hover:text-cyber-blue font-gamer-body">CREAR</SideNavLink>
                  <SideNavLink href="/formulario" className="px-2 py-1 text-white hover:text-cyber-blue font-gamer-body">VER</SideNavLink>
                </div>
              )}
            </div>
            <SideNavLink href="/ajustes" className="flex flex-row items-center gap-3 px-4 py-2 w-full text-white hover:text-cyber-blue transition-colors font-carbon-base">
              <SlidersHorizontal size={24} color="#fff" />
              <span className="font-gamer-body text-white">Ajustes</span>
            </SideNavLink>
            <SideNavLink href="/shop" className="flex flex-row items-center gap-3 px-4 py-2 w-full text-white hover:text-cyber-blue transition-colors font-carbon-base mt-2">
              <ShoppingBag size={24} color="#fff" />
              <span className="font-gamer-body text-white">Tienda</span>
            </SideNavLink>
            <SideNavLink href="/gulag" className="flex flex-row items-center gap-3 px-4 py-2 w-full text-white hover:text-cyber-blue transition-colors font-carbon-base mt-2">
              <Landmark size={24} color="#fff" />
              <span className="font-gamer-body text-white">Gulag</span>
            </SideNavLink>
            <SideNavLink href="/chat" className="flex flex-row items-center gap-3 px-4 py-2 w-full text-white hover:text-cyber-blue transition-colors font-carbon-base mt-2" onClick={e => { e.preventDefault(); setShowChat(true); }}>
              <Mail size={24} color="#fff" />
              <span className="font-gamer-body text-white">CHAT</span>
            </SideNavLink>
            {/* DUELOS - Espadas cruzadas Heroicons */}
            <SideNavLink href="/duelos" className="flex flex-row items-center gap-3 px-4 py-2 w-full text-white hover:text-cyber-blue transition-colors font-carbon-base mt-2">
              <span className="inline-block" style={{ width: 24, height: 24 }}>
                {/* Heroicons Swords SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2L11 12" />
                  <path d="M22 7L17 2L2 17L7 22L22 7Z" />
                  <path d="M16 5L19 8" />
                  <path d="M5 16L8 19" />
                </svg>
              </span>
              <span className="font-gamer-body text-white">DUELOS</span>
            </SideNavLink>
          </SideNavItems>
        </SideNav>
        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen transition-all duration-300 dark:bg-carbon-dark dark:text-gray-100">{children}</main>
        <ChatModal open={showChat} onClose={() => setShowChat(false)} />
      </div>
    </div>
  );
};

export default MainLayout; 