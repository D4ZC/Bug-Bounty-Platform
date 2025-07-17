import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSkull } from 'react-icons/fa';

const ACCENT_PURPLE = '#a259f7';
const DARK_BG = '#181A1A';
const PANEL_BG = '#23263a';
const TAB_STYLES =
  'px-6 py-2 rounded-lg font-bold text-base transition-all focus:outline-none';

const TABS = [
  { key: 'all', label: 'TODOS' },
  { key: 'active', label: 'ACTIVOS' },
  { key: 'completed', label: 'COMPLETADOS' },
  { key: 'waiting', label: 'ESPERANDO' },
];

// Ejemplo de desafíos
const challenges = [
  {
    id: '1',
    user: 'deivid',
    points: 50,
    status: 'EN_GULAG',
    time: '2h30',
  },
  {
    id: '2',
    user: 'runrun',
    points: 25,
    status: 'EN_GULAG',
    time: '1h45',
  },
  {
    id: '3',
    user: 'excel',
    points: 20,
    status: 'EN_GULAG',
    time: '3h15',
  },
  {
    id: '4',
    user: 'kick ass',
    points: 20,
    status: 'COMPLETADO',
    time: '0h 0',
  },
  {
    id: '5',
    user: 'pedrito sola',
    points: 10,
    status: 'ESPERANDO',
    time: '5h20',
  },
];

const statusStyles = {
  EN_GULAG: {
    color: 'text-red-500',
    bg: 'bg-red-100',
    dot: 'bg-red-500',
    button: 'bg-red-500 hover:bg-red-600',
    label: 'EN GULAG',
  },
  COMPLETADO: {
    color: 'text-green-500',
    bg: 'bg-green-100',
    dot: 'bg-green-500',
    button: 'bg-green-500 hover:bg-green-600',
    label: 'COMPLETADO',
  },
  ESPERANDO: {
    color: 'text-yellow-500',
    bg: 'bg-yellow-100',
    dot: 'bg-yellow-500',
    button: 'bg-yellow-400 hover:bg-yellow-500',
    label: 'ESPERANDO',
  },
};

// Simulación de tiempos iniciales en segundos para cada desafío
const initialTimes: Record<string, number> = {
  '1': 2 * 60 * 60 + 30 * 60, // 2h 30m
  '2': 1 * 60 * 60 + 45 * 60, // 1h 45m
  '3': 3 * 60 * 60 + 15 * 60, // 3h 15m
  '4': 0, // completado
  '5': 5 * 60 * 60 + 20 * 60, // 5h 20m
};

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m.toString().padStart(2, '0')}`;
}

const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; message: string }> = ({ open, onClose, title, message }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center border-2 border-purple-500">
        <h2 className="text-2xl font-bold text-red-400 mb-2 text-center">{title}</h2>
        <p className="text-gray-200 mb-6 text-center">{message}</p>
        <button
          className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold shadow"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const Gulag: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  // Estado para los temporizadores
  const [timers, setTimers] = useState<Record<string, number>>(initialTimes);
  // Estado para modal de error
  const [modal, setModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });

  // Efecto para actualizar los temporizadores cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated: Record<string, number> = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (updated[id] > 0) updated[id] = updated[id] - 1;
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtro simple (solo visual, lógica real después)
  const filtered =
    activeTab === 'all'
      ? challenges
      : challenges.filter((c) => {
          if (activeTab === 'active') return c.status === 'EN_GULAG';
          if (activeTab === 'completed') return c.status === 'COMPLETADO';
          if (activeTab === 'waiting') return c.status === 'ESPERANDO';
          return true;
        });

  // Lógica de disponibilidad y tiempo agotado
  const isAvailable = (challenge: any, time: number) => {
    if (challenge.status === 'EN_GULAG' && time <= 0) return false;
    if (challenge.status === 'COMPLETADO') return false;
    return true;
  };

  const handleAction = (challenge: any, time: number) => {
    if (challenge.status === 'EN_GULAG' && time <= 0) {
      setModal({
        open: true,
        title: 'Tiempo agotado',
        message: 'El tiempo para resolver este desafío ha finalizado. Ya no puedes enviar una solución.',
      });
      return;
    }
    if (challenge.status === 'COMPLETADO') {
      setModal({
        open: true,
        title: 'Desafío no disponible',
        message: 'Este desafío ya ha sido completado. Por favor, selecciona otro desafío.',
      });
      return;
    }
    if (challenge.status === 'ESPERANDO') {
      setModal({
        open: true,
        title: 'Desafío no disponible',
        message: 'Este desafío aún no está disponible para iniciar. Por favor, espera a que se active.',
      });
      return;
    }
    // Si todo está bien, navegar
    navigate(`/gulag/${challenge.id}`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-2 py-8" style={{ background: DARK_BG }}>
      <Modal open={modal.open} onClose={() => setModal({ ...modal, open: false })} title={modal.title} message={modal.message} />
      {/* Icono de calavera arriba del título */}
      <div className="flex flex-col items-center mb-2">
        <FaSkull size={64} color="#a259f7" />
      </div>
      {/* Título y subtítulo */}
      <h1 className="text-4xl font-extrabold text-white mb-2 mt-2 text-center">GULAG</h1>
      <p className="text-lg text-gray-300 mb-8 text-center">Zona de desafíos y pruebas especiales</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-10 bg-[#23263a] p-2 rounded-xl shadow" style={{ boxShadow: '0 2px 12px #a259f733' }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={
              `${TAB_STYLES} ` +
              (activeTab === tab.key
                ? 'bg-white text-purple-700 shadow border-2 border-purple-400'
                : 'bg-transparent text-gray-200 hover:bg-[#23263a]')
            }
            style={activeTab === tab.key ? { color: ACCENT_PURPLE } : {}}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid de tarjetas */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.map((challenge) => {
          const st = statusStyles[challenge.status as keyof typeof statusStyles];
          const time = timers[challenge.id] !== undefined ? timers[challenge.id] : 0;
          const available = isAvailable(challenge, time);
          let buttonText = '';
          if (challenge.status === 'EN_GULAG' && time <= 0) buttonText = 'TIEMPO AGOTADO';
          else if (challenge.status === 'COMPLETADO') buttonText = 'NO DISPONIBLE';
          else if (challenge.status === 'ESPERANDO') buttonText = 'ESPERAR';
          else if (challenge.status === 'EN_GULAG') buttonText = 'VER DESAFÍO';
          else buttonText = 'VER';
          return (
            <div
              key={challenge.id}
              className="bg-[#23263a] rounded-2xl shadow-lg border border-gray-700 flex flex-col p-6 min-h-[220px] relative"
            >
              {/* Avatar y nombre */}
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700 uppercase">
                  {challenge.user[0]}
                </div>
                <div>
                  <div className="font-bold text-lg text-white">{challenge.user}</div>
                  <div className="text-gray-300 text-sm">Puntuación: <span className="font-bold text-white">{challenge.points}</span></div>
                </div>
                <span className={`ml-auto w-3 h-3 rounded-full ${st.dot}`}></span>
              </div>
              {/* Estado */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${st.bg} ${st.color}`}>{st.label}</span>
              </div>
              {/* Tiempo restante */}
              <div className="mb-2">
                <span className="text-gray-300 text-sm">Tiempo restante: </span>
                <span className="font-bold text-white">{challenge.status === 'EN_GULAG' || challenge.status === 'ESPERANDO' ? formatTime(time) : challenge.time}</span>
              </div>
              {/* Barra de progreso */}
              <div className="w-full h-2 rounded bg-gray-300 mb-4">
                <div className={`h-2 rounded ${st.color}`} style={{ width: challenge.status === 'EN_GULAG' ? `${Math.max(0, Math.floor((time / initialTimes[challenge.id]) * 100))}%` : challenge.status === 'COMPLETADO' ? '100%' : '20%' }}></div>
              </div>
              {/* Botón principal */}
              <button
                className={`w-full py-2 rounded-lg font-bold text-white mt-auto transition-all duration-200 ${st.button} ${!available ? 'opacity-60 cursor-not-allowed' : ''}`}
                style={{ fontSize: 16, letterSpacing: 1 }}
                onClick={() => handleAction(challenge, time)}
                disabled={!available}
              >
                {buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gulag; 