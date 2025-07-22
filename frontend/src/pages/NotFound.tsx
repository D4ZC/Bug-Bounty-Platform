import React from 'react';
import { useNavigate } from 'react-router-dom';
const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;
const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative" style={{fontFamily}}>
      <div className="rounded-3xl border-4 border-cyan-400 shadow-2xl p-12 glassmorphism relative overflow-hidden" style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
        <h1 className="text-7xl font-extrabold text-cyan-300 drop-shadow-lg tracking-widest font-mono animate-glitch-text mb-4">404</h1>
        <p className="text-2xl font-bold text-cyan-200 font-mono animate-glitch-text mb-8">Página no encontrada</p>
        <button onClick={()=>navigate('/dashboard')} className="px-8 py-3 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold font-mono border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-200">
          Volver al inicio
        </button>
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
          <g className="animate-glitch-move">
            <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
            <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
            <polygon points="80,400 120,420 100,440" fill="#ffe600" opacity="0.10" />
          </g>
        </svg>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-btn { animation: glitchBtn 1.5s infinite steps(2, end); }
        @keyframes glitchBtn { 0%{filter:none;} 20%{filter:brightness(1.2) hue-rotate(20deg);} 40%{filter:contrast(1.2) blur(0.5px);} 60%{filter:none;} 100%{filter:none;} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
      `}</style>
    </div>
  );
};
export default NotFound; 