import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Mission = {
  id: string;
  title: string;
  description: string;
  details: string;
  reward: any;
  completed: boolean;
};

const Missions: React.FC = () => {
  const { t } = useTranslation();
  const missions: Mission[] = [
    {
      id: 'm1',
      title: t('Encuentra una vulnerabilidad XSS'),
      description: t('Identifica y reporta una vulnerabilidad de Cross-Site Scripting (XSS) en cualquier reto o entorno de la plataforma.'),
      details: t('El XSS permite a un atacante inyectar scripts maliciosos en páginas vistas por otros usuarios. Debes demostrar el impacto y enviar un reporte válido.'),
      reward: { type: 'bugcoin', amount: 200 },
      completed: false,
    },
    {
      id: 'm2',
      title: t('Exploita una inyección SQL (SQLi)'),
      description: t('Encuentra y explota una vulnerabilidad de inyección SQL en algún reto o entorno de pruebas.'),
      details: t('La inyección SQL permite manipular consultas a la base de datos. Debes demostrar acceso o manipulación de datos no autorizados.'),
      reward: { type: 'bugcoin', amount: 300 },
      completed: false,
    },
    {
      id: 'm3',
      title: t('Realiza un escaneo de puertos exitoso'),
      description: t('Utiliza herramientas de escaneo para identificar servicios expuestos en un entorno de laboratorio.'),
      details: t('Debes entregar un reporte con los puertos abiertos, servicios detectados y posibles vectores de ataque.'),
      reward: { type: 'frame', name: t('Marco Pentester'), id: 'frame_pentest', image: '/frames/exclusive.png' },
      completed: false,
    },
    {
      id: 'm4',
      title: t('Reporta un CSRF'),
      description: t('Identifica y reporta una vulnerabilidad de Cross-Site Request Forgery (CSRF) en algún reto.'),
      details: t('El CSRF permite a un atacante realizar acciones en nombre de otro usuario. Debes demostrar el ataque y su impacto.'),
      reward: { type: 'avatar', name: t('Avatar CSRF'), id: 'avatar_csrf', image: '/avatars/Cyber_Ninja.png' },
      completed: false,
    },
    {
      id: 'm5',
      title: t('Explotación de RCE'),
      description: t('Encuentra y explota una vulnerabilidad de Remote Code Execution (RCE) en un entorno controlado.'),
      details: t('El RCE permite ejecutar comandos en el servidor. Debes demostrar la explotación y enviar un reporte detallado.'),
      reward: { type: 'bugcoin', amount: 500 },
      completed: false,
    },
    {
      id: 'm6',
      title: t('Reporte de bug crítico'),
      description: t('Envía un reporte de una vulnerabilidad crítica validada por el staff.'),
      details: t('El reporte debe incluir descripción, pasos para reproducir, impacto y posible mitigación.'),
      reward: { type: 'title', name: t('Cazador de Bugs'), id: 'title_bug_hunter' },
      completed: false,
    },
  ];

  const getInitialInventory = () => {
    try {
      const inv = localStorage.getItem('user_inventory');
      return inv ? JSON.parse(inv) : { frames: [], avatars: [], titles: [], backgrounds: [], bluepoints: 0 };
    } catch {
      return { frames: [], avatars: [], titles: [], backgrounds: [], bluepoints: 0 };
    }
  };

  const [userMissions, setUserMissions] = useState(missions);
  const [inventory, setInventory] = useState(getInitialInventory);
  const [bugcoins, setBugcoins] = useState(() => Number(localStorage.getItem('bugcoins')) || 1000);
  const [detailsMission, setDetailsMission] = useState<Mission | null>(null);

  const updateInventory = (newInventory: any) => {
    setInventory(newInventory);
    localStorage.setItem('user_inventory', JSON.stringify(newInventory));
  };
  const updateBugcoins = (amount: number) => {
    setBugcoins(amount);
    localStorage.setItem('bugcoins', String(amount));
  };

  const handleComplete = (id: string) => {
    setUserMissions(prev => prev.map(m => m.id === id ? { ...m, completed: true } : m));
    const mission = userMissions.find(m => m.id === id);
    if (!mission) return;
    // Recompensa de bugcoin
    if (mission.reward.type === 'bugcoin' && typeof mission.reward.amount === 'number') {
      updateBugcoins(bugcoins + mission.reward.amount);
    }
    // Recompensa de frame/avatar/title
    if (['frame', 'avatar', 'title', 'background'].includes(mission.reward.type)) {
      const key = mission.reward.type + (mission.reward.type === 'background' ? 's' : 's');
      if (!inventory[key].includes(mission.reward.id)) {
        const newInventory = { ...inventory, [key]: [...inventory[key], mission.reward.id] };
        updateInventory(newInventory);
      }
    }
    alert(t('¡Misión completada! Recompensa obtenida.'));
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-12 overflow-hidden" style={{fontFamily: `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`}}>
      {/* Fondo Watch Dogs 2: gradiente neón, glitch, partículas, ruido digital */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradiente animado */}
        <div className="absolute inset-0 animate-wd2-bg-gradient" style={{background: 'linear-gradient(120deg, #00fff7 0%, #ff00cc 40%, #ffe600 80%, #00ff6a 100%)', opacity: 0.22}} />
        {/* SVG glitch/graffiti decorativo */}
        <svg className="absolute left-0 top-0 w-full h-full" style={{opacity:0.18}}>
          <g className="animate-glitch-move">
            <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
            <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
            <polygon points="80,400 120,420 100,440" fill="#ffe600" opacity="0.10" />
            <polygon points="600,80 650,100 630,120" fill="#00ff6a" opacity="0.10" />
            <rect x="60%" y="80%" width="60" height="10" fill="#fff" opacity="0.07" transform="skewY(8)" />
          </g>
        </svg>
        {/* Stickers y graffiti extra */}
        <svg className="absolute right-10 bottom-10 w-32 h-32 pointer-events-none" style={{opacity:0.22}}>
          <text x="0" y="30" fontSize="32" fill="#ff00cc" fontFamily="monospace" transform="rotate(-18)">#HACK</text>
          <text x="10" y="80" fontSize="24" fill="#00fff7" fontFamily="monospace" transform="rotate(8)">CTF</text>
          <circle cx="90" cy="90" r="18" fill="#ffe600" opacity="0.18" />
        </svg>
        {/* Ruido digital sutil */}
        <div className="absolute inset-0 bg-[url('/static/noise.png')] opacity-10 mix-blend-soft-light pointer-events-none" />
        {/* Partículas flotantes */}
        <svg className="absolute w-full h-full" style={{opacity:0.13}}>
          <circle cx="20%" cy="20%" r="60" fill="#00fff7" />
          <circle cx="80%" cy="30%" r="40" fill="#ff00cc" />
        </svg>
      </div>
      <div className="w-full max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-cyan-300 drop-shadow-lg tracking-widest font-mono animate-glitch-text">
          {t('Misiones de Ciberseguridad')}
        </h1>
        <div className="grid grid-cols-1 gap-10">
          {userMissions.map(mission => (
            <div key={mission.id} className={`relative p-8 rounded-3xl border-4 shadow-2xl glassmorphism flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-200 hover:scale-[1.025] hover:shadow-cyan-400/40 ${mission.completed ? 'from-green-400/30 to-blue-400/30 border-green-400' : 'from-cyan-900/80 to-cyan-800/60 border-cyan-400'} bg-gradient-to-br overflow-hidden`} style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
              {/* SVG decorativo glitch/graffiti */}
              <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.13, zIndex:0}}>
                <g className="animate-glitch-move">
                  <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
                  <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
                  <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
                </g>
              </svg>
              <div className="flex-1 z-10 relative">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-cyan-300 animate-glitch-text drop-shadow-lg">{t(mission.title)}</h2>
                <p className="text-cyan-100 mb-2 font-mono text-base md:text-lg" style={{textShadow:'0 2px 8px #0008'}}>{t(mission.description)}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-green-300">{t('Recompensa')}:</span>
                  {mission.reward.type === 'bugcoin' && (
                    <span className="flex items-center gap-1 text-yellow-300 font-bold">+{mission.reward.amount}</span>
                  )}
                  {mission.reward.type === 'frame' && (
                    <span className="flex items-center gap-1 text-green-300 font-bold">{t('Marco')}: <img src={mission.reward.image} alt={mission.reward.name} className="w-8 h-8 inline rounded-full border-2 border-green-400" /></span>
                  )}
                  {mission.reward.type === 'avatar' && (
                    <span className="flex items-center gap-1 text-blue-300 font-bold">{t('Avatar')}: <img src={mission.reward.image} alt={mission.reward.name} className="w-8 h-8 inline rounded-full border-2 border-blue-400" /></span>
                  )}
                  {mission.reward.type === 'title' && (
                    <span className="flex items-center gap-1 text-cyan-300 font-bold">{t('Título')}: {mission.reward.name}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <button
                    onClick={() => setDetailsMission(mission)}
                    className="px-4 py-2 rounded-xl bg-cyan-800 hover:bg-cyan-900 text-cyan-100 font-bold border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    Ver detalles
                  </button>
                  {mission.completed ? (
                    <span className="px-4 py-2 rounded-xl bg-green-500 text-white font-bold ml-2 animate-glow shadow-lg border-2 border-green-400">{t('Completada')}</span>
                  ) : (
                    <button
                      onClick={() => handleComplete(mission.id)}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-200 ml-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    {t('Completar')}
                  </button>
                )}
                </div>
              </div>
              {/* Sticker graffiti decorativo en la esquina */}
              <svg className="absolute -right-6 -bottom-6 w-24 h-24 pointer-events-none" style={{opacity:0.22}}>
                <text x="0" y="30" fontSize="28" fill="#ff00cc" fontFamily="monospace" transform="rotate(-18)">#CTF</text>
                <circle cx="90" cy="90" r="14" fill="#00fff7" opacity="0.18" />
              </svg>
            </div>
          ))}
        </div>
        {/* Modal de detalles */}
        {detailsMission && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in" onClick={() => setDetailsMission(null)}>
            <div className="bg-gradient-to-br from-cyan-900/95 to-cyan-800/95 rounded-3xl border-4 border-cyan-400 shadow-2xl p-8 max-w-lg w-full glassmorphism relative animate-pop-in overflow-hidden flex flex-col items-center" onClick={e => e.stopPropagation()} style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
              {/* SVG decorativo glitch/graffiti */}
              <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
                <g className="animate-glitch-move">
                  <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
                  <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
                  <polygon points="80,120 120,140 100,160" fill="#ffe600" opacity="0.10" />
                </g>
              </svg>
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-4 animate-glitch-text text-center drop-shadow-lg">{detailsMission.title}</h2>
              <p className="text-cyan-100 mb-4 font-mono text-base md:text-lg text-center" style={{textShadow:'0 2px 8px #0008'}}>{detailsMission.details}</p>
              <button
                className="absolute top-4 right-4 text-cyan-200 bg-black/60 rounded-full p-2 border-2 border-cyan-400 shadow-lg text-xl font-bold hover:bg-cyan-800 transition z-10"
                onClick={() => setDetailsMission(null)}
                aria-label="Cerrar"
              >
                &times;
              </button>
            </div>
          </div>
        )}
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
        .animate-glow { box-shadow: 0 0 32px #00fff7, 0 0 64px #00fff7; animation: glow 2.5s infinite alternate; }
        @keyframes glow { 0%{box-shadow:0 0 32px #00fff7,0 0 64px #00fff7;} 100%{box-shadow:0 0 64px #00fff7,0 0 128px #00fff7;} }
        .animate-fade-in { animation: fadeIn 0.3s both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-pop-in { animation: popIn 0.4s both; }
        @keyframes popIn { from { opacity: 0; transform: scale(0.7);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
};

export default Missions; 