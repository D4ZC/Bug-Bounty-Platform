import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Fuente hacker para el body (Share Tech Mono, monospace)
const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

const ProfileCustomization: React.FC = () => {
  const { t } = useTranslation();
  const initialUsername = localStorage.getItem('profile_custom_username') || t('Tu Usuario');
  const [username, setUsername] = useState(initialUsername);
  const [editingName, setEditingName] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [bannerVersion] = useState(0); // Para forzar re-render
  const [bannerMsg] = useState<string | null>(null); // Mensaje de confirmación
  const avatar = localStorage.getItem('profile_custom_avatar') || '/avatars/Analista.png';
  const title = localStorage.getItem('profile_custom_title') || t('Sin título');
  const bugcoins = localStorage.getItem('bugcoins') || '1000';
  const navigate = useNavigate();

  // Datos simulados
  const stats = { nivel: 150, puntos: 2350, victorias: 120, pase: 60 };
  const userId = 'UID: 1234567890123456';
  const featuredBadges = [
    { icon: 'fas fa-crown', color: 'text-yellow-400', title: t('MVP') },
    { icon: 'fas fa-skull', color: 'text-red-400', title: t('Top Killer') },
    { icon: 'fas fa-star', color: 'text-cyan-300', title: t('Elite') },
  ];

  const handleSaveName = async () => {
    setSavingName(true);
    localStorage.setItem('profile_custom_username', username);
    setTimeout(() => {
      setSavingName(false);
      setEditingName(false);
    }, 700);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-12 overflow-hidden" style={{fontFamily}}>
      {bannerMsg && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg text-lg font-bold shadow-lg bg-green-700 text-white border-2 border-green-300 animate-glow transition-all duration-300" style={{ minWidth: 220, textAlign: 'center' }}>
          {bannerMsg}
        </div>
      )}
      {/* Fondo Watch Dogs 2: gradiente neón, glitch, partículas, ruido digital */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradiente animado */}
        <div className="absolute inset-0 animate-wd2-bg-gradient" style={{background: 'linear-gradient(120deg, #00fff7 0%, #ff00cc 40%, #ffe600 80%, #00ff6a 100%)', opacity: 0.18}} />
        {/* SVG glitch/graffiti decorativo */}
        <svg className="absolute left-0 top-0 w-full h-full" style={{opacity:0.13}}>
          <g className="animate-glitch-move">
            <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
            <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
            <polygon points="80,400 120,420 100,440" fill="#ffe600" opacity="0.10" />
            <polygon points="600,80 650,100 630,120" fill="#00ff6a" opacity="0.10" />
            <rect x="60%" y="80%" width="60" height="10" fill="#fff" opacity="0.07" transform="skewY(8)" />
          </g>
        </svg>
        {/* Ruido digital sutil */}
        <div className="absolute inset-0 bg-[url('/static/noise.png')] opacity-10 mix-blend-soft-light pointer-events-none" />
        {/* Partículas flotantes */}
        <svg className="absolute w-full h-full" style={{opacity:0.10}}>
          <circle cx="20%" cy="20%" r="60" fill="#00fff7" />
          <circle cx="80%" cy="30%" r="40" fill="#ff00cc" />
        </svg>
      </div>
      {/* Banner glitch/graffiti detrás de la tarjeta principal */}
      <div className="w-full max-w-3xl relative z-10 mb-8 flex flex-col items-center">
        <div className="relative rounded-3xl border-4 border-cyan-400 shadow-2xl p-0 overflow-hidden backdrop-blur-xl glassmorphism w-full" style={{
          boxShadow:'0 0 48px #00fff7, 0 0 96px #00fff7',
          zIndex:2,
          clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
          background:'transparent',
          position: 'relative'
        }}>
          {/* Banner animado de fondo */}
          <div className="absolute inset-0 animate-banner-zoom" key={bannerVersion} style={{
            backgroundImage: `url(${localStorage.getItem('profile_custom_banner') || '/Banners/Firewall_Rookie.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            opacity: 0.45
          }} />
          {/* Overlay para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent pointer-events-none z-10" />
          <div className="relative z-10 flex flex-row items-center gap-6 p-6 md:p-8">
            {/* Avatar grande */}
            <div className="w-32 h-32 rounded-2xl border-4 border-cyan-400 shadow-xl bg-black/60 group animate-glow flex-shrink-0 flex items-center justify-center relative" style={{ boxShadow: '0 0 32px #00fff7, 0 0 64px #00fff7' }}>
              <img src={avatar} alt="Avatar" className="w-28 h-28 rounded-xl object-cover mx-auto my-auto transition-transform duration-200 animate-avatar-pop border-2 border-dashed border-cyan-400" />
              {/* Sticker decorativo */}
              <span className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-yellow-400/60 to-pink-400/60 rounded-full rotate-12 blur-md" />
            </div>
            {/* Info principal */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 min-w-0">
                  {editingName ? (
                    <>
                      <input
                        className="text-3xl md:text-4xl font-extrabold text-cyan-200 bg-black/40 border-b-2 border-cyan-400 px-3 py-1 rounded outline-none focus:ring-2 focus:ring-cyan-400 transition-all w-44 md:w-64 font-mono animate-glitch-text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        maxLength={18}
                        autoFocus
                        style={{minWidth:'140px'}}
                      />
                      <button
                        className="flex items-center gap-1 text-green-400 bg-cyan-900/60 px-3 py-2 rounded hover:bg-cyan-800 border border-cyan-400 shadow text-base md:text-xl transition-all duration-150"
                        onClick={handleSaveName}
                        disabled={savingName || !username.trim()}
                        title={t('Guardar nombre')}
                        style={{minWidth:'40px', minHeight:'40px'}}
                      >
                        {savingName ? (
                          <span className="animate-spin inline-block w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full" />
                        ) : (
                          <>
                            <i className="fas fa-check" style={{fontSize:'1.3em'}} />
                            <span>{t('Guardar')}</span>
                          </>
                        )}
                      </button>
                      <button
                        className="flex items-center gap-1 text-red-400 bg-cyan-900/60 px-3 py-2 rounded hover:bg-cyan-800 border border-cyan-400 shadow text-base md:text-xl transition-all duration-150"
                        onClick={() => { setEditingName(false); setUsername(initialUsername); }}
                        title={t('Cancelar')}
                        style={{minWidth:'40px', minHeight:'40px'}}
                      >
                        <i className="fas fa-times" style={{fontSize:'1.3em'}} />
                        <span>{t('Cancelar')}</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl md:text-4xl font-extrabold text-cyan-200 drop-shadow-lg tracking-widest animate-fade-in truncate font-mono" style={{minWidth:'140px'}}>{username}</span>
                      <button
                        className="flex items-center justify-center text-cyan-400 hover:text-cyan-200 p-2 rounded-full border border-cyan-400 bg-cyan-900/60 shadow transition-all duration-150"
                        onClick={() => setEditingName(true)}
                        title={t('Editar nombre')}
                        style={{width:'36px', height:'36px', minWidth:'36px', minHeight:'36px'}}
                      >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12.242 6.344l1.414 1.414M4 13.586V16h2.414l8.486-8.486a2 2 0 0 0-2.828-2.828L4 13.586z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                <span className="text-cyan-300 font-mono text-base bg-cyan-900/40 px-2 py-1 rounded border border-cyan-400 ml-2">{userId}</span>
              </div>
              <div className="flex items-center gap-4 mt-1 flex-wrap">
                {/* Selector de título */}
                <select
                  className="text-cyan-200 text-base font-mono bg-cyan-900/40 px-3 py-1 rounded-lg border border-cyan-400 shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={title}
                  onChange={e => {
                    localStorage.setItem('profile_custom_title', e.target.value);
                    window.location.reload();
                  }}
                >
                  <option value={t('Sin título')}>{t('Sin título')}</option>
                  <option value={t('Cazador de Bugs')}>{t('Cazador de Bugs')}</option>
                  <option value={t('Pentester')}>{t('Pentester')}</option>
                  <option value={t('MVP')}>{t('MVP')}</option>
                </select>
                <span className="text-yellow-300 font-bold text-base flex items-center gap-1"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.91l-5-3.64 5.91-.01z"/></svg> {t('Nivel')} {stats.nivel}</span>
                <span className="text-green-300 font-bold text-base flex items-center gap-1">{bugcoins} <img src="/Moneda/Bugcoin.png" alt="bugcoin" className="w-5 h-5 inline" /></span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {featuredBadges.map((badge, i) => (
                  <span key={i} className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/60 border-2 border-cyan-400 shadow ${badge.color} text-xl`} title={badge.title}>
                    <i className={badge.icon}></i>
                  </span>
                ))}
          </div>
              {/* Línea decorativa glitch */}
              <div className="w-full h-1 mt-2 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-300 rounded-full opacity-60 animate-glitch-line" />
        </div>
            {/* Fondo decorativo lateral */}
            <div className="hidden md:block w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-700/30 to-purple-700/30 blur-2xl opacity-70 border-2 border-dashed border-pink-400 rotate-6" />
            {/* Botón editar perfil flotante */}
            <button
              className="absolute bottom-4 right-4 bg-cyan-700 text-white px-5 py-2 rounded-full text-base font-bold shadow-lg border-2 border-cyan-400 animate-glitch-btn hover:bg-cyan-800 transition z-20"
              onClick={() => navigate('/avatar-selection')}
              title="Editar perfil"
              style={{boxShadow:'0 0 16px #00fff7'}}
            >
              Editar perfil
            </button>
          </div>
        </div>
          {/* Radar chart estilo FIFA */}
          <div className="w-full flex flex-col items-center mt-8">
            <h3 className="text-lg font-bold text-cyan-300 mb-2 animate-glitch-text">Stats de Ciberseguridad</h3>
            <svg width="260" height="260" viewBox="0 0 260 260" className="mb-2">
              {/* Ejes y labels */}
              <g fontFamily="'Share Tech Mono', monospace" fontSize="13" fill="#00fff7" textAnchor="middle">
                <text x="130" y="22">{t('Pentesting')}</text>
                <text x="225" y="60">{t('OSINT')}</text>
                <text x="245" y="150">{t('Defensa')}</text>
                <text x="200" y="230">{t('Criptografía')}</text>
                <text x="130" y="255">{t('Reportes')}</text>
                <text x="60" y="230">{t('Exploiting')}</text>
                <text x="15" y="150">{t('Forense')}</text>
                <text x="35" y="60">{t('Ing. Social')}</text>
              </g>
              {/* Polígonos de fondo */}
              <polygon points="130,40 220,75 235,150 200,225 130,240 60,225 25,150 40,75" fill="#00fff7" opacity="0.08" />
              <polygon points="130,70 200,95 215,150 190,210 130,220 70,210 45,150 60,95" fill="#00fff7" opacity="0.13" />
              <polygon points="130,100 180,115 195,150 180,195 130,200 80,195 65,150 80,115" fill="#00fff7" opacity="0.18" />
              {/* Polígono de stats personalizados */}
              {(() => {
                const baseStats = [85, 78, 60, 72, 90, 88, 65, 82];
                const uname = username;
                const seed = uname.split('').reduce((a,c,i)=>a+c.charCodeAt(0)*((i%7)+1),0);
                const stats = baseStats.map((_,i) => 60 + ((seed + i*13) % 40));
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
                const baseStats = [85, 78, 60, 72, 90, 88, 65, 82];
                const uname = username;
                const seed = uname.split('').reduce((a,c,i)=>a+c.charCodeAt(0)*((i%7)+1),0);
                const stats = baseStats.map((_,i) => 60 + ((seed + i*13) % 40));
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
              {(() => {
                const baseStats = [85, 78, 60, 72, 90, 88, 65, 82];
                const uname = username;
                const seed = uname.split('').reduce((a,c,i)=>a+c.charCodeAt(0)*((i%7)+1),0);
                const stats = baseStats.map((_,i) => 60 + ((seed + i*13) % 40));
                const labels = [t('Pentesting'), t('OSINT'), t('Defensa'), t('Criptografía'), t('Reportes'), t('Exploiting'), t('Forense'), t('Ing. Social')];
                return stats.map((val,i)=>(
                  <span key={labels[i]}>{labels[i]}: <span className="text-cyan-100 font-bold">{val}</span></span>
                ));
              })()}
            </div>
          </div>
      </div>
      {/* Stats y experiencia */}
      <div className="w-full max-w-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl border-4 border-cyan-400 shadow-2xl p-8 flex flex-col items-center gap-8 relative z-10 backdrop-blur-xl" style={{boxShadow:'0 0 48px #00fff7, 0 0 96px #00fff7', fontFamily}}>
        {/* Barra de experiencia épica */}
        <div className="w-full flex flex-col items-center animate-fade-in">
          <span className="text-cyan-300 text-lg font-bold mb-2 tracking-widest flex items-center gap-2 font-mono">
            <svg className="w-7 h-7 text-yellow-300 animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.91l-5-3.64 5.91-.01z"/></svg>
            {t('EXPERIENCIA')}
          </span>
          <div className="w-full h-8 bg-gray-800 rounded-full relative overflow-hidden border-4 border-cyan-400 shadow-2xl">
            <div className="h-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-xp-bar shadow-xl"
              style={{ width: stats.pase + '%' }} />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-extrabold text-lg drop-shadow-lg tracking-widest font-mono">{stats.pase}%</span>
            <div className="absolute inset-0 pointer-events-none animate-xp-glow" />
          </div>
        </div>
        {/* Estadísticas principales */}
        <div className="w-full flex flex-wrap gap-8 justify-center mt-2">
          <div className="flex-1 min-w-[120px] bg-black/60 rounded-2xl p-8 border-2 border-cyan-700 text-center shadow-xl glassmorphism animate-fade-in">
            <div className="text-4xl font-extrabold text-cyan-400 animate-glow font-mono">{stats.nivel}</div>
            <div className="text-cyan-200 text-lg mt-2 font-mono">{t('Nivel')}</div>
        </div>
          <div className="flex-1 min-w-[120px] bg-black/60 rounded-2xl p-8 border-2 border-cyan-700 text-center shadow-xl glassmorphism animate-fade-in">
            <div className="text-4xl font-extrabold text-yellow-400 animate-glow font-mono">{stats.puntos}</div>
            <div className="text-cyan-200 text-lg mt-2 font-mono">{t('Puntos')}</div>
      </div>
          <div className="flex-1 min-w-[120px] bg-black/60 rounded-2xl p-8 border-2 border-cyan-700 text-center shadow-xl glassmorphism animate-fade-in">
            <div className="text-4xl font-extrabold text-green-400 animate-glow font-mono">{stats.victorias}</div>
            <div className="text-cyan-200 text-lg mt-2 font-mono">{t('Victorias')}</div>
              </div>
            </div>
      </div>
      {/* Animaciones y estilos personalizados Watch Dogs 2 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .animate-glow { box-shadow: 0 0 32px #00fff7, 0 0 64px #00fff7; animation: glow 2.5s infinite alternate; }
        @keyframes glow { 0%{box-shadow:0 0 32px #00fff7,0 0 64px #00fff7;} 100%{box-shadow:0 0 64px #00fff7,0 0 128px #00fff7;} }
        .animate-xp-bar { animation: xpbar 2s cubic-bezier(.4,2,.6,1) 1; }
        @keyframes xpbar { from { width: 0; } to { width: 60%; } }
        .animate-xp-glow { box-shadow: 0 0 48px #00fff7, 0 0 96px #00fff7, 0 0 0 12px #00fff733 inset; }
        .animate-fade-in { animation: fadeIn 1.2s both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none;} }
        .animate-pop-in { animation: popIn 0.7s both; }
        @keyframes popIn { from { opacity: 0; transform: scale(0.7);} to { opacity: 1; transform: scale(1);} }
        .animate-avatar-pop { animation: avatarPop 1.2s cubic-bezier(.4,2,.6,1) both; }
        @keyframes avatarPop { from { opacity: 0; transform: scale(0.6);} to { opacity: 1; transform: scale(1);} }
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-bg-gradient2 { animation: bgGradientMove2 18s ease-in-out infinite alternate; background-size: 200% 200%; }
        @keyframes bgGradientMove2 {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-btn { animation: glitchBtn 1.5s infinite steps(2, end); }
        @keyframes glitchBtn { 0%{filter:none;} 20%{filter:brightness(1.2) hue-rotate(20deg);} 40%{filter:contrast(1.2) blur(0.5px);} 60%{filter:none;} 100%{filter:none;} }
        .animate-glitch-line { animation: glitchLine 2.5s infinite alternate; }
        @keyframes glitchLine { 0%{filter:none;} 30%{filter:blur(1.5px) brightness(1.2);} 60%{filter:contrast(1.2) hue-rotate(30deg);} 100%{filter:none;} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
        .animate-banner-zoom { animation: bannerZoom 12s ease-in-out infinite alternate; }
        @keyframes bannerZoom { 0%{transform:scale(1);} 100%{transform:scale(1.08);} }
      `}</style>
    </div>
  );
};

export default ProfileCustomization; 