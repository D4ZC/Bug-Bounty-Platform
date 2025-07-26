import React, { useState, useEffect } from 'react';
import { Shield, ThumbsUp, X } from 'lucide-react';
import UserModal from '../components/UserModal';

const initialChallenges = [
  { id: 'sql-injection', nombre: 'SQL Injection', descripcion: 'Encuentra y explota una vulnerabilidad de inyección SQL en la base de datos.' },
  { id: 'xss-hunter', nombre: 'XSS Hunter', descripcion: 'Identifica y explota una vulnerabilidad de Cross-Site Scripting en la aplicación.' },
  { id: 'phishing-trap', nombre: 'Phishing Trap', descripcion: 'Detecta y reporta un intento de phishing en el sistema.' },
  { id: 'csrf-bypass', nombre: 'CSRF Bypass', descripcion: 'Realiza un ataque exitoso de Cross-Site Request Forgery.' },
  { id: 'reverse-shell', nombre: 'Reverse Shell', descripcion: 'Obtén una reverse shell en el servidor objetivo.' },
  { id: 'privilege-escalation', nombre: 'Privilege Escalation', descripcion: 'Escala privilegios en el sistema comprometido.' },
];

const rowStyles = [
  { border: '4px solid #2ecc71', background: 'rgba(46,204,113,0.85)', color: '#fff' },
  { border: '4px solid #e74c3c', background: 'rgba(231,76,60,0.85)', color: '#fff' },
  { border: '4px solid #e74c3c', background: 'rgba(231,76,60,0.85)', color: '#fff' },
  { border: '4px solid #e74c3c', background: 'rgba(231,76,60,0.85)', color: '#fff' },
  { border: '4px solid #5f0101', background: 'rgba(95,1,1,0.85)', color: '#fff' },
];

function usePersistentLikes(cardIds) {
  const [likes, setLikes] = useState(() => {
    const stored = localStorage.getItem('gulag_likes');
    if (stored) return JSON.parse(stored);
    const initial = {};
    cardIds.forEach(id => { initial[id] = false; });
    return initial;
  });
  useEffect(() => {
    localStorage.setItem('gulag_likes', JSON.stringify(likes));
  }, [likes]);
  const toggleLike = (id) => {
    setLikes(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('gulag_likes', JSON.stringify(updated));
      return updated;
    });
  };
  return { likes, toggleLike };
}

function usePersistentSolves(cardIds) {
  const [solves, setSolves] = useState(() => {
    const stored = localStorage.getItem('gulag_solves');
    if (stored) return JSON.parse(stored);
    const initial = {};
    cardIds.forEach(id => { initial[id] = 0; });
    return initial;
  });
  useEffect(() => {
    localStorage.setItem('gulag_solves', JSON.stringify(solves));
  }, [solves]);
  const addSolve = (id) => {
    setSolves(prev => {
      const updated = { ...prev, [id]: (prev[id] || 0) + 1 };
      localStorage.setItem('gulag_solves', JSON.stringify(updated));
      return updated;
    });
  };
  return { solves, addSolve };
}

function usePersistentCompleted(cardIds) {
  const [completed, setCompleted] = useState(() => {
    const stored = localStorage.getItem('gulag_completed');
    if (stored) return JSON.parse(stored);
    const initial = {};
    cardIds.forEach(id => { initial[id] = false; });
    return initial;
  });
  useEffect(() => {
    localStorage.setItem('gulag_completed', JSON.stringify(completed));
  }, [completed]);
  const markCompleted = (id) => {
    setCompleted(prev => {
      const updated = { ...prev, [id]: true };
      localStorage.setItem('gulag_completed', JSON.stringify(updated));
      return updated;
    });
  };
  return { completed, markCompleted };
}

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const Gulag: React.FC = () => {
  const [tab, setTab] = useState<'desafios' | 'completados'>('desafios');
  const cardIds = initialChallenges.map(c => c.id);
  const { likes, toggleLike } = usePersistentLikes(cardIds);
  const { solves, addSolve } = usePersistentSolves(cardIds);
  const { completed, markCompleted } = usePersistentCompleted(cardIds);

  // Estados para la modal de usuario
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Separar desafíos y completados
  const desafios = initialChallenges.filter(c => !completed[c.id]);
  const completados = initialChallenges.filter(c => completed[c.id]);
  const cards = tab === 'desafios' ? desafios : completados;

  // Estados para la modal de desafío
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCard, setModalCard] = useState(null);
  const [answer, setAnswer] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive, timer]);

  const closeModal = () => {
    setModalOpen(false);
    setModalCard(null);
    setAnswer('');
    setTimer(0);
    setTimerActive(false);
  };

  const openModal = (card) => {
    setModalCard(card);
    setModalOpen(true);
  };

  const getLikePercent = (id) => {
    const l = likes[id] ? 1 : 0;
    const s = solves[id] || 1;
    return Math.round((l / s) * 100);
  };

  // Obtener los últimos 5 usuarios con menos puntos (los mismos que en UsersScorePage)
  const gulagUsers = [
    { 
      id: 'USR-046', 
      name: 'Monica Rojas', 
      role: 'Miembro', 
      team: 'P-TECH', 
      stats: { puntos: 45, vulnerabilidades: 2, retos: 1 }, 
      badges: ['Team Player'],
      puntosGulag: 20 
    },
    { 
      id: 'USR-047', 
      name: 'Alberto Silva', 
      role: 'Miembro', 
      team: 'Data', 
      stats: { puntos: 42, vulnerabilidades: 1, retos: 1 }, 
      badges: ['Team Player'],
      puntosGulag: 19 
    },
    { 
      id: 'USR-048', 
      name: 'Graciela Mendoza', 
      role: 'Miembro', 
      team: 'Apps', 
      stats: { puntos: 38, vulnerabilidades: 1, retos: 0 }, 
      badges: ['Team Player'],
      puntosGulag: 17 
    },
    { 
      id: 'USR-049', 
      name: 'Felipe Castro', 
      role: 'Miembro', 
      team: 'CyberWolves', 
      stats: { puntos: 35, vulnerabilidades: 1, retos: 0 }, 
      badges: ['Team Player'],
      puntosGulag: 15 
    },
    { 
      id: 'USR-050', 
      name: 'Silvia Herrera', 
      role: 'Miembro', 
      team: 'P-TECH', 
      stats: { puntos: 32, vulnerabilidades: 0, retos: 0 }, 
      badges: ['Team Player'],
      puntosGulag: 12 
    },
  ];

  // Ordenar por Puntos Gulag (de mayor a menor)
  const sortedGulagUsers = [...gulagUsers].sort((a, b) => b.puntosGulag - a.puntosGulag);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-10">
      <h1 className="text-6xl font-bold mb-2 text-center font-sprite-graffiti-shadow">GULAG</h1>
      <h2 className="text-lg md:text-xl font-normal mb-8 text-center italic">Zona de desafíos y pruebas especiales</h2>
      
      {/* Tabla de usuarios del GULAG - Reemplaza la tabla de desafíos original */}
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">👥 Usuarios del GULAG</h2>
          <p className="text-gray-600">Los últimos 5 usuarios con menos puntos - Haz clic en un nombre para ver más información</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200">
          <table className="min-w-full border-separate border-spacing-0">
            <thead className="bg-gray-800">
                             <tr>
                 <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase">Puesto</th>
                 <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase">Usuario</th>
                 <th className="px-4 py-3 text-center text-sm font-bold text-white uppercase">Puntos</th>
                 <th className="px-4 py-3 text-center text-sm font-bold text-white uppercase">Puntos Gulag</th>
               </tr>
            </thead>
            <tbody>
              {sortedGulagUsers.map((user, idx) => {
                const color = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'][idx % 5];
                const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                return (
                  <tr key={user.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                    <td className="px-4 py-3 font-semibold text-gray-900 text-center">#{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => handleUserClick(user)}
                      >
                        <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-base ${color}`}>
                          {initials}
                        </span>
                        <span className="font-medium text-gray-800 hover:text-blue-600 transition-colors">
                          {user.name}
                        </span>
                      </div>
                    </td>
                                         <td className="px-4 py-3 text-center">
                       <span className="inline-flex items-center gap-1 text-lg font-extrabold text-green-600">
                         {user.stats.puntos}
                       </span>
                     </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-lg font-extrabold text-red-600">
                        {user.puntosGulag}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Línea horizontal negra */}
      <div className="w-full" style={{ height: '6px', background: '#000', margin: '32px 0 0 0' }} />
      
      {/* Botones de tabs */}
      <div className="w-full max-w-4xl flex flex-row justify-between items-center mt-6 mb-8">
        <button
          className={`px-8 py-2 font-bold uppercase tracking-wide border-none bg-${tab === 'desafios' ? '[#ededed]' : 'transparent'} text-black transition`}
          style={{ background: tab === 'desafios' ? '#ededed' : 'transparent', borderRadius: 0 }}
          onClick={() => setTab('desafios')}
        >
          DESAFÍOS
        </button>
        <button
          className={`px-8 py-2 font-bold uppercase tracking-wide border-none bg-${tab === 'completados' ? '[#ededed]' : 'transparent'} text-black transition`}
          style={{ background: tab === 'completados' ? '#ededed' : 'transparent', borderRadius: 0 }}
          onClick={() => setTab('completados')}
        >
          COMPLETADOS
        </button>
      </div>
      
      {/* Cards blancas con diseño tipo challenge */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div
          className="w-full grid gap-8 overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-200"
          style={{
            maxHeight: 650,
            minHeight: 300,
            paddingRight: 8,
            marginBottom: 0,
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gridAutoRows: '1fr',
          }}
        >
          {cards.map((item) => {
            const liked = likes[item.id] || false;
            const isCompleted = completed[item.id];
            const percent = getLikePercent(item.id);
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between shadow-lg bg-white cursor-pointer relative"
                style={{
                  width: '100%',
                  minWidth: 0,
                  maxWidth: 340,
                  height: 300,
                  border: '2px solid #e5e7eb',
                  borderRadius: 16,
                  color: '#222',
                  padding: 24,
                  opacity: isCompleted && tab === 'desafios' ? 0.5 : 1,
                  pointerEvents: isCompleted && tab === 'desafios' ? 'none' : 'auto',
                  margin: '0 auto',
                }}
                onClick={() => openModal(item)}
              >
                {/* Sello de completado */}
                {isCompleted && (
                  <div
                    className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center pointer-events-none"
                    style={{
                      transform: 'translate(-50%, -50%) rotate(-12deg)',
                      zIndex: 10,
                    }}
                  >
                    <svg width="160" height="160" viewBox="0 0 160 160" style={{ display: 'block' }}>
                      <defs>
                        <mask id="stamp-mask">
                          <rect width="160" height="160" fill="white" />
                          <circle cx="40" cy="40" r="8" fill="black" />
                          <circle cx="120" cy="60" r="7" fill="black" />
                          <circle cx="80" cy="140" r="9" fill="black" />
                          <circle cx="140" cy="110" r="6" fill="black" />
                          <circle cx="30" cy="120" r="7" fill="black" />
                        </mask>
                      </defs>
                      <path
                        d="M80,12
                          Q105,15 145,40
                          Q158,80 150,120
                          Q135,150 80,152
                          Q25,150 10,120
                          Q2,80 15,40
                          Q55,15 80,12Z"
                        fill="#22c55e"
                        fillOpacity="0.85"
                        mask="url(#stamp-mask)"
                      />
                      <text x="80" y="78" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="20" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                        COMPLETADO
                      </text>
                      <text x="80" y="104" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="12" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                        BUG BOUNTY
                      </text>
                      <text x="80" y="120" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="12" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                        PLATAFORM
                      </text>
                    </svg>
                  </div>
                )}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base text-gray-600 font-medium">DUELOS</span>
                  <span className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold">
                    <Shield size={16} className="inline-block" />
                  </span>
                </div>
                <div className="text-3xl font-bold mb-8 mt-8 text-center w-full">{item.nombre}</div>
                <div className="flex justify-between items-end mt-auto w-full">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{solves[item.id] || 0}</span>
                    <span className="text-xs text-gray-500">solves</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <button onClick={e => { e.stopPropagation(); toggleLike(item.id); }} className="focus:outline-none">
                      <span className="text-lg font-semibold flex items-center gap-1">
                        {percent}%{' '}
                        <ThumbsUp size={18} className="inline-block" color={liked ? '#22c55e' : '#222'} fill={liked ? '#22c55e' : 'none'} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Línea negra horizontal debajo del área de desafíos */}
        <div className="w-full max-w-4xl mx-auto" style={{ height: '6px', background: '#000', margin: '32px 0 0 0' }} />
      </div>

      {/* Modal de desafío */}
      {modalOpen && modalCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div
            className="relative flex flex-col"
            style={{ width: 500, height: 580, background: 'rgba(20,20,20,0.6)', border: '4px solid #000', borderRadius: 18, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.5)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <span className="text-3xl font-bold text-white">{modalCard.nombre}</span>
              <button onClick={closeModal} className="text-white hover:text-red-500 text-2xl font-bold"><X size={32} /></button>
            </div>
            {/* Descripción */}
            <div className="px-8 pb-2">
              <span className="text-lg text-white font-semibold">DESCRIPCIÓN:</span>
              <div className="text-base text-gray-200 mt-2 mb-6">{modalCard.descripcion}</div>
            </div>
            {/* Botón Comenzar y Cronómetro */}
            <div className="flex flex-row items-center justify-between px-8 mb-6">
              <button
                className="px-6 py-2 bg-white text-black font-bold rounded shadow hover:bg-gray-200 transition"
                style={{ borderRadius: 8 }}
                onClick={() => { setTimer(600); setTimerActive(true); }}
                disabled={timerActive && timer > 0 || completed[modalCard.id]}
              >
                Comenzar
              </button>
              {timer > 0 && !completed[modalCard.id] && (
                <span className="text-2xl font-mono text-white bg-black px-6 py-2 rounded flex items-center gap-4" style={{ letterSpacing: 2 }}>
                  {formatTime(timer)}
                  <span
                    className="ml-4 underline cursor-pointer text-base text-gray-300 hover:text-white select-none"
                    onClick={() => { setTimer(600); setTimerActive(true); }}
                  >
                    Reiniciar
                  </span>
                </span>
              )}
            </div>
            {/* Área de respuesta */}
            <div className="px-8 flex-1 flex flex-col">
              <textarea
                className="w-full flex-1 rounded p-4 text-black text-lg bg-white mb-4 resize-none"
                style={{ minHeight: 120, maxHeight: 200 }}
                placeholder="Describe cómo resolviste el desafío..."
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                disabled={completed[modalCard.id]}
              />
              {!completed[modalCard.id] && (
                <button
                  className="w-full py-3 bg-white text-black font-bold rounded shadow hover:bg-gray-200 transition text-lg"
                  style={{ borderRadius: 8 }}
                  onClick={() => {
                    markCompleted(modalCard.id);
                    addSolve(modalCard.id);
                    setTimerActive(false);
                    setTimer(0);
                  }}
                >
                  Enviar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de usuario */}
      <UserModal
        user={selectedUser}
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
};

export default Gulag; 