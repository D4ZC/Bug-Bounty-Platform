import React, { useState } from 'react';
import { FaCrown, FaStar, FaFlagCheckered, FaKey, FaLock, FaShieldAlt, FaUserShield, FaUsers, FaTrophy } from 'react-icons/fa';

const mvpUser = {
  username: 'D4ZC',
  team: 'P-TECH',
  criticas: 15,
  altas: 25,
  medianas: 35,
  bajas: 12,
  puntos: 87,
  logros: [
    { icon: <FaFlagCheckered size={22} color="#00fff7" />, text: 'Primer lugar en CTF' },
    { icon: <FaKey size={22} color="#00fff7" />, text: 'Hallazgo crítico del mes' },
    { icon: <FaUsers size={22} color="#00fff7" />, text: 'Mentor del equipo' },
  ],
};

const mvpTeam = {
  name: 'P-TECH',
  puntos: 210,
  criticas: 30,
  altas: 40,
  medianas: 60,
  bajas: 20,
  logros: [
    { icon: <FaFlagCheckered size={22} color="#00fff7" />, text: 'Mayor número de vulnerabilidades resueltas' },
    { icon: <FaStar size={22} color="#00fff7" />, text: 'Premio a la colaboración' },
    { icon: <FaUsers size={22} color="#00fff7" />, text: 'Promedio de severidad resuelta más alto' },
  ],
  miembros: [
    { nombre: 'D4ZC', rol: 'Líder', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', contribuciones: 45, descripcion: 'Especialista en pentesting y mentor del equipo.' },
    { nombre: 'alice', rol: 'Analista', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', contribuciones: 38, descripcion: 'Experta en análisis de vulnerabilidades críticas.' },
    { nombre: 'bob', rol: 'Pentester', avatar: 'https://randomuser.me/api/portraits/men/33.jpg', contribuciones: 32, descripcion: 'Responsable de hallazgos de alto impacto.' },
    { nombre: 'carol', rol: 'DevSecOps', avatar: 'https://randomuser.me/api/portraits/women/45.jpg', contribuciones: 28, descripcion: 'Automatización y seguridad en pipelines.' },
  ]
};

const circuitBg = `
  linear-gradient(135deg, #181c2b 80%, #00fff7 100%),
  url('https://www.transparenttextures.com/patterns/circuit-board.png')
`;

const MVP: React.FC = () => {
  const [tab, setTab] = useState<'usuario' | 'equipo' | 'historial'>('usuario');
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 font-mono" style={{ background: circuitBg, backgroundBlendMode: 'overlay', backgroundSize: 'cover' }}>
      <div className="w-full max-w-2xl mx-auto bg-[#101926]/90 border-4 border-[#00fff7] rounded-3xl shadow-[0_0_32px_#00fff7] p-0 flex flex-col items-center relative" style={{ boxShadow: '0 0 32px #00fff7, 0 0 0 4px #232b36' }}>
        {/* Tabs y encabezado */}
        <div className="w-full flex flex-row items-center justify-center gap-2 md:gap-8 px-8 pt-8 pb-2 mb-2">
          <button onClick={() => setTab('usuario')} className={`flex flex-col items-center gap-1 px-6 py-4 rounded-2xl font-bold text-base transition border-2 focus:outline-none focus:ring-2 focus:ring-[#00fff7] ${tab === 'usuario' ? 'bg-[#101926] border-[#00fff7] text-[#00fff7] shadow-[0_0_24px_#00fff7] animate-mvp-glow scale-105 z-10' : 'bg-transparent border-transparent text-[#6f7a8a] hover:bg-[#181c2b] hover:text-[#00fff7] hover:scale-105 transition'}`} style={{ minWidth: 120 }}>
            <FaShieldAlt size={32} color={tab === 'usuario' ? '#00fff7' : '#6f7a8a'} />
            <span className="text-base">MVP</span>
            <span className="text-2xl font-extrabold">{mvpUser.username}</span>
            <span className="text-sm text-[#00fff7]">{mvpUser.team}</span>
          </button>
          <button onClick={() => setTab('equipo')} className={`flex flex-col items-center gap-1 px-6 py-4 rounded-2xl font-bold text-base transition border-2 focus:outline-none focus:ring-2 focus:ring-[#00fff7] ${tab === 'equipo' ? 'bg-[#101926] border-[#00fff7] text-[#00fff7] shadow-[0_0_24px_#00fff7] animate-mvp-glow scale-105 z-10' : 'bg-transparent border-transparent text-[#6f7a8a] hover:bg-[#181c2b] hover:text-[#00fff7] hover:scale-105 transition'}`} style={{ minWidth: 120 }}>
            <FaUserShield size={32} color={tab === 'equipo' ? '#00fff7' : '#6f7a8a'} />
            <span className="text-2xl font-extrabold">{mvpTeam.name}</span>
            <span className="text-sm text-[#00fff7]">{mvpTeam.name}</span>
          </button>
          <button onClick={() => setTab('historial')} className={`flex flex-col items-center gap-1 px-6 py-4 rounded-2xl font-bold text-base transition border-2 focus:outline-none focus:ring-2 focus:ring-[#00fff7] ${tab === 'historial' ? 'bg-[#101926] border-[#00fff7] text-[#00fff7] shadow-[0_0_24px_#00fff7] animate-mvp-glow scale-105 z-10' : 'bg-transparent border-transparent text-[#6f7a8a] hover:bg-[#181c2b] hover:text-[#00fff7] hover:scale-105 transition'}`} style={{ minWidth: 120 }}>
            <FaLock size={32} color={tab === 'historial' ? '#00fff7' : '#6f7a8a'} />
          </button>
        </div>
        <style>{`
          @keyframes mvp-glow {
            0%, 100% { box-shadow: 0 0 10px #00fff7, 0 0 18px #00fff7; }
            50% { box-shadow: 0 0 18px #00fff7, 0 0 28px #00fff7; }
          }
          .animate-mvp-glow {
            animation: mvp-glow 1.5s infinite alternate;
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.8s both; }
        `}</style>
        <div className="w-full text-center text-[#a259ff] font-bold text-lg mb-2">Valuable Player & Team - Diciembre 2024</div>
        {/* Contenido de la pestaña */}
        {tab === 'usuario' && (
          <div className="w-full flex flex-col items-center gap-6 px-8 pb-8">
            {/* Panel de puntos y resumen */}
            <div className="w-full flex flex-col md:flex-row gap-6">
              {/* Puntos totales */}
              <div className="flex-1 flex flex-col items-center justify-center bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl shadow-lg p-6 min-w-[180px] animate-mvp-glow">
                <span className="text-5xl font-extrabold text-[#00fff7] drop-shadow mb-2">{mvpUser.puntos}</span>
                <span className="text-lg font-bold text-[#00fff7]">PUNTOS TOTALES</span>
              </div>
              {/* Resumen de vulnerabilidades */}
              <div className="flex-1 flex flex-col gap-2 bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl shadow-lg p-6 min-w-[220px] animate-mvp-glow">
                <div className="text-base font-bold text-[#00fff7] mb-2">SUMMARY DES RESOLVADES</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-left text-[#fff]">CRÍTICAS</span>
                    <span className="font-bold text-[#ff3b3b]">{mvpUser.criticas}</span>
                    <div className="flex-1 h-2 rounded bg-[#232b36] ml-2">
                      <div className="h-2 rounded bg-[#ff3b3b]" style={{ width: `${mvpUser.criticas * 2.5}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-left text-[#fff]">ALTAS</span>
                    <span className="font-bold text-[#ffb300]">{mvpUser.altas}</span>
                    <div className="flex-1 h-2 rounded bg-[#232b36] ml-2">
                      <div className="h-2 rounded bg-[#ffb300]" style={{ width: `${mvpUser.altas * 2.5}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-left text-[#fff]">MEDIANAS</span>
                    <span className="font-bold text-yellow-300">{mvpUser.medianas}</span>
                    <div className="flex-1 h-2 rounded bg-[#232b36] ml-2">
                      <div className="h-2 rounded bg-yellow-300" style={{ width: `${mvpUser.medianas * 2.5}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-left text-[#fff]">BAJAS</span>
                    <span className="font-bold text-[#39ff14]">{mvpUser.bajas}</span>
                    <div className="flex-1 h-2 rounded bg-[#232b36] ml-2">
                      <div className="h-2 rounded bg-[#39ff14]" style={{ width: `${mvpUser.bajas * 2.5}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Logros del mes */}
            <div className="w-full mt-2">
              <div className="text-xl font-bold text-[#00fff7] mb-2">LOGROS DEL MES</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mvpUser.logros.map((l, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-[#101926] border-2 border-[#00fff7] rounded-xl px-4 py-3 shadow-lg animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
                    {l.icon}
                    <span className="text-white font-semibold text-base">{l.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === 'equipo' && (
          <div className="w-full flex flex-col items-center gap-6 px-8 pb-8">
            {/* Trofeo de primer lugar SVG exacto (líneas negras, número 1 integrado) */}
            <div className="flex flex-col items-center mb-2 animate-fade-in-up">
              <div className="relative flex flex-col items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 12px #00fff7)' }}>
                  <path d="M256 32c-17.7 0-32 14.3-32 32v16h-32c-17.7 0-32 14.3-32 32v16h-16c-17.7 0-32 14.3-32 32v16c0 53.9 43.1 97.6 96 111.2V400h-32c-17.7 0-32 14.3-32 32v16c0 17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32v-16c0-17.7-14.3-32-32-32h-32V271.2c52.9-13.6 96-57.3 96-111.2v-16c0-17.7-14.3-32-32-32h-16V80c0-17.7-14.3-32-32-32h-32V64c0-17.7-14.3-32-32-32zm0 32h32v16h-64V64h32zm-80 48h192v16H176v-16zm-48 48h288v16c0 44.2-35.8 80-80 80s-80-35.8-80-80v-16zm80 80c0 44.2 35.8 80 80 80s80-35.8 80-80v-16H176v16zm-80-48v-16c0-8.8 7.2-16 16-16h16v48H112zm288 0v-48h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16h-16zm-80 176v80h-64v-80h64zm-96 112v-16h192v16c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" fill="#000"/>
                  <path d="M256 120c-75 0-136 61-136 136s61 136 136 136 136-61 136-136-61-136-136-136zm0 240c-57.3 0-104-46.7-104-104s46.7-104 104-104 104 46.7 104 104-46.7 104-104 104zm0-176c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm0 128c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56zm0-96c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40zm0 64c-13.2 0-24-10.8-24-24s10.8-24 24-24 24 10.8 24 24-10.8 24-24 24z" fill="#000"/>
                  <path d="M256 180c-41.4 0-75 33.6-75 75s33.6 75 75 75 75-33.6 75-75-33.6-75-75-75zm0 128c-29.2 0-53-23.8-53-53s23.8-53 53-53 53 23.8 53 53-23.8 53-53 53z" fill="#000"/>
                  <text x="256" y="340" textAnchor="middle" fontSize="180" fontWeight="bold" fill="#00fff7" style={{ filter: 'drop-shadow(0 0 6px #00fff7)' }}>1</text>
                </svg>
              </div>
            </div>
            {/* Panel de puntos y resumen */}
            <div className="w-full flex flex-col md:flex-row gap-6">
              {/* Puntos totales */}
              <div className="flex-1 flex flex-col items-center justify-center bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl shadow-lg p-6 min-w-[180px] animate-mvp-glow">
                <span className="text-5xl font-extrabold text-[#00fff7] drop-shadow mb-2">{mvpTeam.puntos}</span>
                <span className="text-lg font-bold text-[#00fff7]">PUNTOS TOTALES</span>
              </div>
              {/* Resumen de vulnerabilidades */}
              <div className="flex-1 flex flex-col gap-2 bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl shadow-lg p-6 min-w-[220px] animate-mvp-glow">
                <div className="text-base font-bold text-[#00fff7] mb-2">SUMMARY DES RESOLVADES</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-left text-[#fff]">CRÍTICAS</span>
                    <span className="font-bold text-[#ff3b3b]">{mvpTeam.criticas}</span>
                    <div className="flex-1 h-2 rounded bg-[#232b36] ml-2">
                      <div className="h-2 rounded bg-[#ff3b3b]" style={{ width: `${mvpTeam.criticas * 1.5}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-left text-[#fff]">ALTAS</span>
                    <span className="font-bold text-[#ffb300]">{mvpTeam.altas}</span>
                    <div className="flex-1 h-2 rounded bg-[#232b36] ml-2">
                      <div className="h-2 rounded bg-[#ffb300]" style={{ width: `${mvpTeam.altas * 1.5}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-left text-[#fff]">MEDIANAS</span>
                    <span className="font-bold text-yellow-300">{mvpTeam.medianas}</span>
                    <div className="flex-1 h-2 rounded bg-[#232b36] ml-2">
                      <div className="h-2 rounded bg-yellow-300" style={{ width: `${mvpTeam.medianas * 1.5}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-left text-[#fff]">BAJAS</span>
                    <span className="font-bold text-[#39ff14]">{mvpTeam.bajas}</span>
                    <div className="flex-1 h-2 rounded bg-[#232b36] ml-2">
                      <div className="h-2 rounded bg-[#39ff14]" style={{ width: `${mvpTeam.bajas * 1.5}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Logros del mes */}
            <div className="w-full mt-2">
              <div className="text-xl font-bold text-[#00fff7] mb-2">LOGROS DEL MES</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mvpTeam.logros.map((l, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-[#101926] border-2 border-[#00fff7] rounded-xl px-4 py-3 shadow-lg">
                    {l.icon}
                    <span className="text-white font-semibold text-base">{l.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Miembros destacados */}
            <div className="w-full mt-2">
              <div className="text-xl font-bold text-[#00fff7] mb-2">MIEMBROS DESTACADOS</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {mvpTeam.miembros.map((m, idx) => (
                  <div key={idx} className="flex flex-col items-center bg-[#181c2b] border-2 border-[#00fff7] rounded-xl px-3 py-4 shadow gap-2 animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
                    <img src={m.avatar} alt={m.nombre} className="w-14 h-14 rounded-full border-2 border-[#00fff7] shadow-md mb-1" />
                    <span className="text-white font-bold text-base">{m.nombre}</span>
                    <span className="text-xs text-[#39ff14] font-semibold">{m.rol}</span>
                    <span className="text-xs text-[#00fff7]">Contribuciones: {m.contribuciones}</span>
                    <span className="text-xs text-gray-300 text-center">{m.descripcion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === 'historial' && (
          <div className="w-full flex flex-col items-center justify-center text-[#00fff7] py-12">
            <span className="text-2xl font-bold">Próximamente: Historial de MVPs</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MVP; 