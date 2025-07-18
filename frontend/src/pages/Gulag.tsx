import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaChevronDown, FaBook, FaUserShield, FaDoorOpen } from 'react-icons/fa';
import { mockUsers } from './UserProfile';

const glitchBg = '/gulag/glitch-bg.gif'; // Puedes poner aquí tu imagen glitch

const getGulagParticipants = () => {
  // Últimos 5 del ranking
  // Asignar un número fijo de veces en el Gulag para cada usuario
  const gulagCounts = [1, 2, 3, 5, 2]; // Puedes ajustar estos valores
  return mockUsers.slice(-5).map((u, i) => ({
    ...u,
    gulagCount: gulagCounts[i] || 1
  }));
};

const gulagDescription = `El Gulag es la última oportunidad para los usuarios con menor puntuación. Aquí, los últimos 5 del ranking luchan por redimirse y evitar penalizaciones. Solo los más fuertes, astutos y valientes podrán salir victoriosos. ¿Estás listo para sobrevivir al Gulag?`;

const gulagRules = [
  'Solo participan los últimos 5 usuarios del ranking.',
  'El objetivo es mejorar tu posición y evitar penalizaciones.',
  'Las penalizaciones pueden incluir tareas especiales o pérdida de puntos.',
  'El rendimiento en el Gulag puede darte una segunda oportunidad en el ranking.',
  'El Gulag es solo para valientes. ¡No hay segundas oportunidades!'
];

const getNextGulagDate = () => {
  // Próxima habilitación: hoy a las 18:00 o mañana si ya pasó
  const now = new Date();
  const next = new Date();
  next.setHours(18, 0, 0, 0);
  if (now > next) {
    next.setDate(next.getDate() + 1);
  }
  return next;
};

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = React.useState(targetDate.getTime() - Date.now());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  const total = Math.max(0, timeLeft);
  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, hours, minutes, seconds };
}

const Gulag: React.FC = () => {
  const [modalUser, setModalUser] = useState<any>(null);
  const navigate = useNavigate();
  const participants = getGulagParticipants();

  // Estado para botón de unirse
  const [joined, setJoined] = React.useState(false);
  const nextGulagDate = React.useMemo(() => getNextGulagDate(), []);
  const { total, hours, minutes, seconds } = useCountdown(nextGulagDate);
  const canJoin = total === 0 && !joined;

  // Scroll a la sección de reglas en /reglas
  const goToRules = () => {
    navigate('/reglas#gulag');
    setTimeout(() => {
      const el = document.getElementById('gulag');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2 relative overflow-x-hidden"
      style={{
        background: `url(${glitchBg}) center/cover no-repeat, linear-gradient(135deg, #111827 60%, #1e293b 100%)`,
        minHeight: '100vh',
      }}
    >
      {/* Botón Unirse al Gulag */}
      <div className="w-full max-w-4xl mx-auto flex justify-end mb-4">
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg border-2 text-lg transition-all
            ${canJoin ? 'bg-gradient-to-r from-red-600 to-cyan-500 text-white border-cyan-400 hover:scale-105' : 'bg-gray-800/80 text-cyan-300 border-gray-600 cursor-not-allowed'}
          `}
          disabled={!canJoin}
          onClick={() => setJoined(true)}
        >
          <FaDoorOpen className="text-2xl" />
          {canJoin
            ? (joined ? '¡Ya estás en el Gulag!' : 'Unirse al Gulag')
            : (
              <span className="flex flex-col items-start">
                <span>Unirse al Gulag</span>
                <span className="text-xs font-mono text-cyan-200">Disponible en: {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
              </span>
            )
          }
        </button>
      </div>
      {/* Fondo glitch animado eliminado, ahora el fondo es por CSS inline */}
      <div className="w-full max-w-4xl mx-auto bg-[#181c24]/90 rounded-2xl shadow-2xl border border-cyan-900/40 p-8 flex flex-col gap-8 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <FaUserShield className="text-3xl text-red-500 animate-pulse drop-shadow-glow" />
            <h1 className="text-3xl font-extrabold text-red-400 tracking-wide drop-shadow-lg">GULAG</h1>
          </div>
          <button
            onClick={goToRules}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-lg shadow hover:scale-105 transition-all border-2 border-cyan-400 hover:border-blue-400"
          >
            <FaBook className="text-xl" />
            Ver reglas del Gulag
          </button>
        </div>
        {/* Descripción */}
        <div className="bg-black/60 rounded-xl p-6 border-l-4 border-red-500 shadow-inner animate-fadeIn">
          <p className="text-lg text-cyan-100 font-mono tracking-wide">
            {gulagDescription}
          </p>
        </div>
        {/* Participantes */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Participantes actuales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {participants.map((user) => (
              <div
                key={user.id}
                className="bg-[#23273a] rounded-xl border-2 border-cyan-800 shadow-lg p-4 flex flex-col items-center gap-2 hover:scale-105 transition-all cursor-pointer group animate-fadeIn"
                onClick={() => setModalUser(user)}
              >
                <div className="relative mb-2 flex items-center justify-center w-28 h-28">
                  {user.selectedFrame && user.selectedFrame.startsWith('marco') && user.selectedFrame !== 'marco' ? (
                    <img src={`/marcos/${user.selectedFrame}.png`} alt="marco" className="absolute top-0 left-0 w-full h-full pointer-events-none select-none" style={{ zIndex: 2, objectFit: 'contain' }} />
                  ) : null}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover shadow-lg z-10 absolute top-1/2 left-1/2"
                    style={{ transform: 'translate(-50%, -50%)', zIndex: 1 }}
                  />
                </div>
                <div className="text-lg font-bold text-cyan-200 group-hover:text-cyan-300 text-center truncate w-full max-w-[140px]">{user.name}</div>
                <div className="text-base text-cyan-400 font-mono">{user.points} pts</div>
                <div className="text-xs text-red-400 font-bold">Veces en el Gulag: {user.gulagCount}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Eliminar la sección de reglas del Gulag (id="gulag") */}
      </div>
      {/* Modal de detalles de participante */}
      {modalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={() => setModalUser(null)}>
          <div className="bg-[#181c24] border-2 border-cyan-400 rounded-2xl p-8 min-w-[320px] max-w-xs flex flex-col items-center gap-4 relative animate-fadeIn" onClick={e => e.stopPropagation()} style={{ boxShadow: '0 0 40px 8px #00bcd4cc' }}>
            <div className="relative mb-2 flex items-center justify-center w-32 h-32">
              {modalUser.selectedFrame && modalUser.selectedFrame.startsWith('marco') && modalUser.selectedFrame !== 'marco' ? (
                <img src={`/marcos/${modalUser.selectedFrame}.png`} alt="marco" className="absolute top-0 left-0 w-full h-full pointer-events-none select-none" style={{ zIndex: 2, objectFit: 'contain' }} />
              ) : null}
              <img
                src={modalUser.avatar}
                alt={modalUser.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg z-10 absolute top-1/2 left-1/2"
                style={{ transform: 'translate(-50%, -50%)', zIndex: 1 }}
              />
            </div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-1 text-center">{modalUser.name}</h3>
            <div className="text-lg text-white font-mono mb-2">{modalUser.points} pts</div>
            <div className="text-base text-red-400 font-bold mb-2">Veces en el Gulag: {modalUser.gulagCount}</div>
            <button
              className="mt-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-bold shadow transition"
              onClick={() => {
                navigate(`/profile/${modalUser.id}`, { state: { fromGulag: true } });
                setModalUser(null);
              }}
            >
              Ver perfil
            </button>
            <button className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700" onClick={() => setModalUser(null)}>✕</button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(.4,0,.2,1) both; }
        .drop-shadow-glow { filter: drop-shadow(0 0 8px #00bcd4cc); }
      `}</style>
    </div>
  );
};

export default Gulag; 