import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';
import ChatModal from '../ChatModal';
import SidebarOverlay from './SidebarOverlay';
import { Header } from '@carbon/react';
import { Mail, User, AlignJustify } from 'lucide-react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      <Header aria-label="Bug Bounty Platform" className="bg-[#000000] flex items-center h-24 shadow-md transition-all duration-300 w-full dark:bg-carbon-dark relative">
        {/* Ícono de hamburguesa alineado */}
        <button
          className="text-white hover:text-cyber-blue transition-colors mr-6 ml-4 flex items-center justify-center"
          style={{ height: 48, width: 48, zIndex: 60 }}
          aria-label="Abrir menú lateral"
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <AlignJustify size={32} />
        </button>
        <span
          className="font-gamer-title text-2xl font-bold tracking-wide text-white select-none"
          style={{ fontFamily: 'Orbitron, Arial, sans-serif' }}
        >
          BUG BOUNTY PLATFORM
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-6 mr-6">
          <LanguageSelector />
          <button aria-label="Perfil" className="text-white hover:text-cyber-blue transition-colors" onClick={() => navigate('/profile')}>
            <User size={28} />
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
      {/* SidebarOverlay superpuesto */}
      <SidebarOverlay 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onChatOpen={() => setShowChat(true)}
      />
      <div className="flex flex-1">
         {/* Sidebar lateral restaurado ELIMINADO */}
        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen transition-all duration-300 dark:bg-carbon-dark dark:text-gray-100">{children}</main>
        <ChatModal open={showChat} onClose={() => setShowChat(false)} position="left" />
      </div>
    </div>
  );
};

export default MainLayout; 