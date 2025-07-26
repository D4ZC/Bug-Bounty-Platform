import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, SlidersHorizontal, ShoppingBag, Landmark, Shield, Users, Trophy, BookOpen, Mail } from 'lucide-react';

interface SidebarOverlayProps {
  open: boolean;
  onClose: () => void;
  onChatOpen?: () => void;
}

const NAVBAR_HEIGHT = 96; // h-24 en Tailwind

const SidebarOverlay: React.FC<SidebarOverlayProps> = ({ open, onClose, onChatOpen }) => {
  const [formOpen, setFormOpen] = useState(false);
  const navigate = useNavigate();

  // Bloquear scroll del body cuando el sidebar está abierto
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  // Cierra el sidebar al navegar
  const handleNav = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <>
      {/* Overlay solo debajo del navbar */}
      <div
        className={`fixed left-0 right-0 z-40 bg-black transition-opacity duration-300 ${open ? 'opacity-30 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ top: NAVBAR_HEIGHT, height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
        onClick={onClose}
        aria-hidden="true"
      />
             {/* Sidebar solo debajo del navbar */}
       <aside
         className={`fixed top-0 left-0 z-50 h-full w-[250px] bg-black shadow-xl flex flex-col py-4 dark:bg-carbon-gray transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
         style={{ top: NAVBAR_HEIGHT, height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
         onClick={e => e.stopPropagation()}
         role="navigation"
         aria-label="Menú lateral"
       >
         <nav className="flex flex-col gap-1 px-2 overflow-y-auto scrollbar-hide">
          {/* Inicio */}
          <button onClick={() => handleNav('/')} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base">
            <Home size={24} />
            <span className="font-gamer-body">Inicio</span>
          </button>
          
                     {/* Equipos */}
           <button onClick={() => handleNav('/equipos')} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base mt-2">
             <Users size={24} />
             <span className="font-gamer-body">Equipos</span>
           </button>
           
           {/* Chat */}
           <button onClick={onChatOpen} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base mt-2">
             <Mail size={24} />
             <span className="font-gamer-body">Chat</span>
           </button>
           
           {/* Duelos */}
           <button onClick={() => handleNav('/duelos')} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base mt-2">
            <span className="inline-block" style={{ width: 24, height: 24 }}>
              {/* Heroicons Swords SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2L11 12" />
                <path d="M22 7L17 2L2 17L7 22L22 7Z" />
                <path d="M16 5L19 8" />
                <path d="M5 16L8 19" />
              </svg>
            </span>
            <span className="font-gamer-body">DUELOS</span>
          </button>
          
          {/* Tablas de Ranking */}
          <button onClick={() => handleNav('/users-score')} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base mt-2">
            <Trophy size={24} />
            <span className="font-gamer-body">Tablas de Ranking</span>
          </button>
          
          {/* MVP */}
          <button onClick={() => handleNav('/mvp')} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base mt-2">
            <Trophy size={24} />
            <span className="font-gamer-body">MVP</span>
          </button>
          
          {/* Gulag */}
          <button onClick={() => handleNav('/gulag')} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base mt-2">
            <Landmark size={24} />
            <span className="font-gamer-body">Gulag</span>
          </button>
          
          {/* Tienda */}
          <button onClick={() => handleNav('/shop')} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base mt-2">
            <ShoppingBag size={24} />
            <span className="font-gamer-body">Tienda</span>
          </button>
          
          {/* Reglas */}
          <button onClick={() => handleNav('/reglas')} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base mt-2">
            <Shield size={24} />
            <span className="font-gamer-body">Reglas</span>
          </button>
          
          {/* Documentación */}
          <button onClick={() => handleNav('/contributions')} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base mt-2">
            <BookOpen size={24} />
            <span className="font-gamer-body">Documentación</span>
          </button>
          
          {/* Formulario */}
          <div className="w-full mt-2">
            <button
              type="button"
              className="flex items-center gap-3 px-4 py-2 w-full text-left text-white hover:text-cyber-blue font-carbon-base"
              onClick={() => setFormOpen(v => !v)}
              aria-expanded={formOpen}
              aria-controls="submenu-formulario"
            >
              <FileText size={24} />
              <span className="font-gamer-body">Formulario</span>
              <svg className={`ml-auto w-4 h-4 transition-transform ${formOpen ? 'rotate-90' : ''}`} fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            {formOpen && (
              <div id="submenu-formulario" className="pl-10 flex flex-col gap-1">
                <button onClick={() => handleNav('/formulario/crear')} className="px-2 py-1 text-white hover:text-cyber-blue font-gamer-body text-left">CREAR</button>
                <button onClick={() => handleNav('/formulario')} className="px-2 py-1 text-white hover:text-cyber-blue font-gamer-body text-left">VER</button>
              </div>
            )}
          </div>
          
          {/* Ajustes */}
          <button onClick={() => handleNav('/ajustes')} className="flex items-center gap-3 px-4 py-2 text-white hover:text-cyber-blue font-carbon-base mt-2">
            <SlidersHorizontal size={24} />
            <span className="font-gamer-body">Ajustes</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default SidebarOverlay; 