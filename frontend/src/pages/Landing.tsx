import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

// Importar todas las imágenes de backgrounds automáticamente (Vite/webpack require.context alternativa)
const importAll = (r: __WebpackModuleApi.RequireContext) =>
  r.keys().filter(k => !k.includes('README')).map(r);

// @ts-ignore
const backgrounds = import.meta.globEager('/public/backgrounds/*.{jpg,jpeg,png,webp}')
  ? Object.keys(import.meta.globEager('/public/backgrounds/*.{jpg,jpeg,png,webp}'))
      .filter(k => !k.includes('README'))
      .map(k => k.replace('/public', ''))
  : [
      '/backgrounds/fondo_inicio.webp',
      '/backgrounds/fondo_inicio_apex.webp',
      '/backgrounds/fondo_inicio_genshin.webp',
    ];

const INTERVAL = 7000; // ms

const Landing: React.FC = () => {
  const [bg, setBg] = useState(backgrounds[0]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cambiar fondo aleatorio cada INTERVAL ms
    let timeout: any;
    const changeBg = () => {
      setBg(prev => {
        let next;
        do {
          next = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        } while (next === prev && backgrounds.length > 1);
        return next;
      });
      timeout = setTimeout(changeBg, INTERVAL);
    };
    changeBg();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        background: `url(${bg}) center/cover no-repeat, #10131a`,
        minHeight: '100vh',
      }}
    >
      {/* Overlay mejorado con desenfoque */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center h-screen w-full animate-fadein-slideup">
        {/* Eslogan motivador */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-300 drop-shadow-lg mb-4 text-center tracking-tight animate-fadein">
          Bug Bounty Platform
        </h1>
        {/* Eslogan motivador debajo del título */}
        <span className="text-base md:text-lg text-cyan-300 font-semibold mb-4 tracking-wide drop-shadow-md animate-fadein">¡Aprende, compite y conviértete en leyenda!</span>
        <img src="/logo/logo3.png" alt="Logo Bug Bounty Platform" className="h-40 w-auto mb-6 drop-shadow-xl animate-logo-float" />
        {/* Subtítulo separado */}
        <p className="text-lg md:text-xl text-white/90 mb-2 text-center max-w-2xl animate-fadein">
          Plataforma ideal para hacer el trabajo de una manera mas entretenida.
        </p>
        <p className="text-base md:text-lg text-white/70 mb-8 text-center max-w-xl animate-fadein">
          Reporta vulnerabilidades, gana puntos, sube en el ranking y personaliza tu perfil.<br />
          ¡Únete a la comunidad y demuestra tus habilidades!
        </p>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-md justify-center animate-fadein">
          <button
            className="landing-btn w-full md:w-1/2 py-2 px-6 mb-4 md:mb-0 text-lg rounded-lg"
            onClick={() => navigate('/auth/login')}
          >
            Iniciar sesión
          </button>
          <button
            className="landing-btn-outline w-full md:w-1/2 py-2 px-6 text-lg rounded-lg"
            onClick={() => navigate('/auth/register')}
          >
            Registrarte
          </button>
        </div>
      </div>
      <style>{`
@keyframes logo-float {
  0% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 16px #00eaffcc); }
  50% { transform: translateY(-18px) scale(1.04); filter: drop-shadow(0 0 40px #00fff7) drop-shadow(0 0 64px #00eaff); }
  100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 16px #00eaffcc); }
}
.animate-logo-float {
  animation: logo-float 3.5s ease-in-out infinite;
  filter: drop-shadow(0 0 16px #00eaffcc);
  transition: filter 0.3s;
}
@keyframes btn-pulse {
  0%, 100% { box-shadow: 0 0 0px #00eaff44; }
  50% { box-shadow: 0 0 16px 4px #00eaff88; }
}
.landing-btn {
  background: rgba(10, 20, 40, 0.85);
  color: #60a5fa;
  font-size: 1.125rem;
  font-weight: 800;
  border-radius: 0.5rem;
  border: 2px solid #2563eb;
  box-shadow: 0 0 0px #00eaff44;
  transition: box-shadow 0.25s, transform 0.18s, background 0.25s, color 0.25s;
  animation: btn-pulse 2.2s infinite;
}
.landing-btn:hover, .landing-btn:focus {
  box-shadow: 0 0 32px 8px #00eaffcc, 0 0 0 2px #00eaff;
  color: #00fff7;
  background: rgba(10, 30, 60, 0.95);
  transform: translateY(-4px) scale(1.04);
  outline: none;
}
.landing-btn-outline {
  background: rgba(10, 20, 40, 0.85);
  color: #60a5fa;
  font-size: 1.125rem;
  font-weight: 800;
  border-radius: 0.5rem;
  border: 2px solid #2563eb;
  box-shadow: 0 0 0px #00eaff44;
  transition: box-shadow 0.25s, transform 0.18s, background 0.25s, color 0.25s;
  animation: btn-pulse 2.2s infinite;
}
.landing-btn-outline:hover, .landing-btn-outline:focus {
  box-shadow: 0 0 32px 8px #00eaffcc, 0 0 0 2px #00eaff;
  color: #00fff7;
  background: rgba(10, 30, 60, 0.95);
  transform: translateY(-4px) scale(1.04);
  outline: none;
}
@keyframes fadein-slideup {
  0% { opacity: 0; transform: translateY(32px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadein-slideup {
  animation: fadein-slideup 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes fadein {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.animate-fadein {
  animation: fadein 1.5s cubic-bezier(0.22, 1, 0.36, 1);
}
`}</style>
    </div>
  );
};

export default Landing; 