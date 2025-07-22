import React from 'react';
import { FaUserCircle, FaLock, FaFire, FaAward, FaBug, FaCrown } from 'react-icons/fa';

const user = {
  name: 'Astorir',
  avatar: '', // Puedes poner una url o dejar vacío para usar el ícono
  achievements: [
    { icon: <FaLock size={32} />, title: 'Emóandal', subtitle: 'Sugé' },
    { icon: <FaFire size={32} />, title: 'Eapándos', subtitle: 'Tuge' },
    { icon: <FaAward size={32} />, title: 'Pndeitos', subtitle: 'Ougé' },
    { icon: <FaBug size={32} />, title: 'Sepentos', subtitle: 'Ougé' },
    { icon: <FaUserCircle size={32} />, title: 'Vtientos', subtitle: 'Ougé' },
  ],
  vulns: {
    criticas: 4,
    medias: 13,
    bajas: 7,
  },
  porcentaje: 15,
};

const MVPUser: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #1a1333 0%, #3a1c71 50%, #f5af19 100%)'}}>
      {/* Fondo animado de partículas doradas */}
      <div className="absolute inset-0 pointer-events-none z-0 animate-pulse" style={{background: 'radial-gradient(circle at 70% 30%, rgba(255,215,0,0.08) 0, transparent 70%)'}} />
      <div className="w-full max-w-xl bg-[#23263a]/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center z-10 relative border-4 border-yellow-400/60" style={{boxShadow: '0 0 40px 0 #f5af19aa'}}>
        {/* Título MVP */}
        <div className="flex flex-col items-center mb-4">
          <span className="text-yellow-400 text-3xl font-extrabold tracking-widest drop-shadow-lg flex items-center gap-2">
            <FaCrown className="text-yellow-300 animate-bounce" size={36} /> MVP USER
          </span>
          <span className="text-blue-100 text-lg font-semibold mt-1 tracking-wide">Usuario más valioso de la plataforma</span>
        </div>
        {/* Avatar destacado con corona */}
        <div className="relative mb-4">
          {/* Halo animado */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-500 to-pink-500 blur-2xl opacity-60 animate-pulse" />
          {/* Corona */}
          <FaCrown className="absolute -top-7 left-1/2 -translate-x-1/2 text-yellow-300 drop-shadow-xl z-20" size={48} />
          <div className="relative z-10 rounded-full bg-[#181A20] p-2 border-4 border-yellow-400 shadow-2xl">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-32 h-32 rounded-full object-cover border-4 border-yellow-300 shadow-xl" />
            ) : (
              <FaUserCircle className="w-32 h-32 text-blue-400 drop-shadow-lg" />
            )}
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-yellow-300 mb-2 tracking-wider drop-shadow">{user.name}</h2>
        {/* Logros */}
        <div className="w-full mt-6">
          <h3 className="text-lg font-bold text-yellow-200 mb-2 tracking-wide">Logros Destacados</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {user.achievements.map((ach, idx) => (
              <div key={idx} className="flex flex-col items-center bg-[#23263a] rounded-xl p-3 min-w-[90px] shadow-md border-2 border-yellow-400/30">
                <div className="mb-1 text-yellow-300">{ach.icon}</div>
                <div className="text-sm font-bold text-white">{ach.title}</div>
                <div className="text-xs text-yellow-100">{ach.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Vulnerabilidades resueltas */}
        <div className="w-full mt-8 flex flex-col items-center">
          <h3 className="text-lg font-bold text-yellow-200 mb-4 tracking-wide">Vulnerabilidades Resueltas</h3>
          <div className="flex items-center gap-8 w-full justify-center">
            <div className="flex flex-col items-center">
              <span className="text-yellow-300 text-xs mb-1">Críticas</span>
              <span className="text-2xl font-extrabold text-white drop-shadow">{user.vulns.criticas}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-300 text-xs mb-1">Medias</span>
              <span className="text-2xl font-extrabold text-white drop-shadow">{user.vulns.medias}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-300 text-xs mb-1">Bajas</span>
              <span className="text-2xl font-extrabold text-white drop-shadow">{user.vulns.bajas}</span>
            </div>
            {/* Gráfico tipo donut */}
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#23263a" strokeWidth="4" />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#f5af19"
                  strokeWidth="4"
                  strokeDasharray={`${user.porcentaje}, 100`}
                  strokeDashoffset="25"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-yellow-300 drop-shadow">{user.porcentaje}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MVPUser; 