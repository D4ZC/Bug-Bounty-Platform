import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

declare global {
  interface Window {
    __headerHidden?: boolean;
  }
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    // Escucha el evento global para ocultar o mostrar el header
    const handlerHide = () => { setHideHeader(true); window.__headerHidden = true; };
    const handlerShow = () => { setHideHeader(false); window.__headerHidden = false; };
    window.addEventListener('hide-header', handlerHide);
    window.addEventListener('show-header', handlerShow);
    return () => {
      window.removeEventListener('hide-header', handlerHide);
      window.removeEventListener('show-header', handlerShow);
    };
  }, []);

  if (typeof window !== 'undefined' && window.__headerHidden === undefined) {
    window.__headerHidden = false;
  }

  // Si está autenticado, no mostrar el header de bienvenida
  if (hideHeader || isAuthenticated) return null;

  return (
    <header className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-50 overflow-hidden" style={{fontFamily, background:'#070e0a', borderColor:'#00ff6a', boxShadow:'0 0 24px #00ff6a'}}>
      {/* Imagen de fondo */}
      <img src="/Header/Header.png" alt="Header background" className="absolute inset-0 w-full h-full object-cover object-center opacity-80 z-0 animate-bg-zoom" style={{pointerEvents:'none'}} />
      {/* Barra superior */}
      <div className="w-full flex items-center justify-between px-8 py-4 bg-black/70 border-b-2 border-cyan-400 z-20" style={{position:'absolute', top:0, left:0, right:0}}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard') }>
          <img src="/Logo/Logo.png" alt="Logo Bug Bounty" className="w-12 h-12 object-contain rounded-lg shadow-lg border-2" style={{borderColor:'#00ff6a', background:'#101a10', boxShadow:'0 0 16px #00ff6a'}} />
          <span className="text-2xl md:text-3xl font-extrabold tracking-widest animate-glitch-text font-mono drop-shadow-lg ml-2" style={{color:'#00ff6a', textShadow:'0 0 8px #00ff6a'}}>Bug Bounty Platform</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="px-6 py-2 rounded-xl font-bold border-2 shadow animate-glow transition-all text-lg"
            style={{background:'#101a10', color:'#00ff6a', borderColor:'#00ff6a', boxShadow:'0 0 8px #00ff6a'}}
            onClick={() => setShowLogin(true)}
          >
            {t('Iniciar sesión')}
          </button>
          <button
            className="px-6 py-2 rounded-xl font-bold border-2 shadow animate-glow transition-all text-lg"
            style={{background:'#101a10', color:'#39ff14', borderColor:'#00ff6a', boxShadow:'0 0 8px #00ff6a'}}
            onClick={() => navigate('/auth/register')}
          >
            {t('Registrarse')}
          </button>
        </div>
      </div>
      {/* Fondo y contenido central (puedes dejarlo vacío o con branding extra) */}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={() => {
        setShowLogin(false);
        window.dispatchEvent(new Event('hide-header'));
        navigate(window.location.pathname);
      }} />
      <style>{`
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00ff6a, -2px 0 #00fff7;} 50%{text-shadow:-2px 0 #39ff14, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00ff6a, -2px 0 #00fff7;} }
        .animate-glow { animation: glow 2.5s infinite alternate; }
        @keyframes glow { 0%{box-shadow:0 0 16px #00ff6a;} 100%{box-shadow:0 0 32px #00ff6a;} }
        .text-neon-green { color: #00ff6a; }
        .animate-bg-zoom { animation: bgZoom 12s ease-in-out infinite alternate; }
        @keyframes bgZoom { 0%{transform:scale(1);} 100%{transform:scale(1.08);} }
      `}</style>
    </header>
  );
};

export default Header; 