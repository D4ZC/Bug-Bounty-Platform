import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-app text-app p-8 font-mono relative overflow-hidden" style={{fontFamily: `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`}}>
      {/* Fondo glitch y partículas */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.13 }}>
        <circle cx="120" cy="80" r="60" fill="#00fff7" opacity="0.12" />
        <circle cx="600" cy="120" r="40" fill="#FFD700" opacity="0.10" />
        <circle cx="400" cy="200" r="30" fill="#ff00cc" opacity="0.10" />
      </svg>
      <div className="w-full max-w-lg mx-auto p-10 rounded-3xl border-4 border-cyan-400 shadow-2xl glassmorphism relative z-10" style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
        {/* SVG decorativo glitch/graffiti */}
        <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
          <g className="animate-glitch-move">
            <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
            <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
            <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
          </g>
        </svg>
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-widest text-cyan-300 animate-glitch-text">Perfil</h1>
        <div className="flex flex-col gap-4 items-center">
          <div className="w-24 h-24 rounded-full border-4 border-cyan-400 bg-black/60 flex items-center justify-center mb-4">
            <span className="text-3xl text-cyan-300">👤</span>
          </div>
          <div className="text-cyan-200 text-xl font-bold">Usuario Demo</div>
          <div className="text-cyan-400 text-base">usuario@demo.com</div>
          <div className="flex gap-4 mt-4">
            <span className="bg-cyan-700/60 text-cyan-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold border-2 border-cyan-400">Nivel 1</span>
            <span className="bg-yellow-700/60 text-yellow-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold border-2 border-yellow-400">1000 Bugcoins</span>
          </div>
          {/* Radar chart estilo FIFA */}
          <div className="w-full flex flex-col items-center mt-8">
            <h3 className="text-lg font-bold text-cyan-300 mb-2 animate-glitch-text">Stats de Ciberseguridad</h3>
            <svg width="260" height="260" viewBox="0 0 260 260" className="mb-2">
              {/* Ejes y labels */}
              <g fontFamily="'Share Tech Mono', monospace" fontSize="13" fill="#00fff7" textAnchor="middle">
                <text x="130" y="22">Pentesting</text>
                <text x="225" y="60">OSINT</text>
                <text x="245" y="150">Defensa</text>
                <text x="200" y="230">Criptografía</text>
                <text x="130" y="255">Reportes</text>
                <text x="60" y="230">Exploiting</text>
                <text x="15" y="150">Forense</text>
                <text x="35" y="60">Ing. Social</text>
              </g>
              {/* Polígonos de fondo */}
              <polygon points="130,40 220,75 235,150 200,225 130,240 60,225 25,150 40,75" fill="#00fff7" opacity="0.08" />
              <polygon points="130,70 200,95 215,150 190,210 130,220 70,210 45,150 60,95" fill="#00fff7" opacity="0.13" />
              <polygon points="130,100 180,115 195,150 180,195 130,200 80,195 65,150 80,115" fill="#00fff7" opacity="0.18" />
              {/* Polígono de stats reales (mock) */}
              {(() => {
                // Valores de 0 a 100 para cada stat (mock demo)
                const stats = [85, 78, 60, 72, 90, 88, 65, 82];
                // Coordenadas de cada vértice
                const angles = stats.map((_,i)=>((Math.PI*2)/8)*i-Math.PI/2);
                const rMin = 40, rMax = 100;
                const points = stats.map((val, i) => {
                  const r = rMin + (rMax-rMin)*(val/100);
                  const x = 130 + r * Math.cos(angles[i]);
                  const y = 130 + r * Math.sin(angles[i]);
                  return `${x},${y}`;
                }).join(' ');
                return <polygon points={points} fill="#00fff7" opacity="0.45" stroke="#00fff7" strokeWidth="2" style={{filter:'drop-shadow(0 0 12px #00fff7)'}} />;
              })()}
              {/* Puntos de stats */}
              {(() => {
                const stats = [85, 78, 60, 72, 90, 88, 65, 82];
                const angles = stats.map((_,i)=>((Math.PI*2)/8)*i-Math.PI/2);
                const rMin = 40, rMax = 100;
                return stats.map((val, i) => {
                  const r = rMin + (rMax-rMin)*(val/100);
                  const x = 130 + r * Math.cos(angles[i]);
                  const y = 130 + r * Math.sin(angles[i]);
                  return <circle key={i} cx={x} cy={y} r="6" fill="#00fff7" opacity="0.85" stroke="#fff" strokeWidth="2" />;
                });
              })()}
            </svg>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-cyan-200 text-sm font-mono">
              <span>Pentesting: <span className="text-cyan-100 font-bold">85</span></span>
              <span>OSINT: <span className="text-cyan-100 font-bold">78</span></span>
              <span>Defensa: <span className="text-cyan-100 font-bold">60</span></span>
              <span>Criptografía: <span className="text-cyan-100 font-bold">72</span></span>
              <span>Reportes: <span className="text-cyan-100 font-bold">90</span></span>
              <span>Exploiting: <span className="text-cyan-100 font-bold">88</span></span>
              <span>Forense: <span className="text-cyan-100 font-bold">65</span></span>
              <span>Ing. Social: <span className="text-cyan-100 font-bold">82</span></span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
      `}</style>
    </div>
  );
};

export default Profile; 