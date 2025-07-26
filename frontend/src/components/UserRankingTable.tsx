import React, { useState, useEffect } from 'react';
import insigniaImg from '../assets/images/Insignias/Insignia.png';
import insignia1 from '../assets/images/Insignias/Insignia1.png';
import insignia2 from '../assets/images/Insignias/Insignia2.png';
import insignia3 from '../assets/images/Insignias/Insignia3.png';
import insignia4 from '../assets/images/Insignias/Insignia4.png';
import insignia5 from '../assets/images/Insignias/Insignia5.png';
import insignia6 from '../assets/images/Insignias/Insignia6.png';
import insignia7 from '../assets/images/Insignias/Insignia7.png';

interface User {
  id: string;
  name: string;
  role: string;
  team: string;
  stats: { puntos: number; vulnerabilidades: number; retos: number };
  badges: string[];
}

interface UserRankingTableProps {
  users: User[];
}

function getAvatarProps(name: string) {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-gray-500', 'bg-indigo-500', 'bg-teal-500', 'bg-purple-500', 'bg-pink-500',
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return { color, initials };
}

// Generar usuarios mock realistas y equipos
const TEAM_NAMES = ['P-TECH', 'Data', 'Apps', 'Consulting', 'CyberWolves'];
const CONSULTING_USERS = [
  { id: 'USR-001', name: 'Alex Turner', team: 'Consulting' },
  { id: 'USR-002', name: 'Samus Aran', team: 'Consulting' },
  { id: 'USR-003', name: 'D4ZC', team: 'Consulting' },
  { id: 'USR-004', name: 'Zero Cool', team: 'Consulting' },
  { id: 'USR-005', name: 'Trinity', team: 'Consulting' },
  { id: 'USR-006', name: 'Neo', team: 'Consulting' },
  { id: 'USR-007', name: 'Ada Lovelace', team: 'Consulting' },
  { id: 'USR-008', name: 'Kevin Mitnick', team: 'Consulting' },
  { id: 'USR-009', name: 'Cyb3rW0lf', team: 'Consulting' },
  { id: 'USR-010', name: 'Rootkit', team: 'Consulting' },
];
const MOCK_NAMES = [
  'Sophie Müller', 'Liam Smith', 'Emma Johnson', 'Noah Williams', 'Olivia Brown',
  'Elena García', 'Lucas Martin', 'Mia Lee', 'Ethan Kim', 'Ava Chen',
  'Mateo Rossi', 'Isabella Silva', 'Leo Dubois', 'Chloe Laurent', 'Mason Clark',
  'Emily Davis', 'Benjamin Wilson', 'Charlotte Moore', 'Henry Taylor', 'Amelia Anderson',
  'Jack Thomas', 'Grace Martinez', 'Sebastian Lopez', 'Victoria Perez', 'Daniel Harris',
  'Sofia Gonzalez', 'David Young', 'Ella King', 'Gabriel Scott', 'Lily Walker',
  'Julian Hall', 'Zoe Allen', 'Samuel Wright', 'Hannah Adams', 'Alexander Nelson',
  'Layla Baker', 'Owen Carter', 'Scarlett Rivera', 'Isaac Evans', 'Penelope Murphy',
  'Andres Vargas',
];
const MOCK_USERS = MOCK_NAMES.map((name, i) => ({
  id: `USR-${i + 11}`,
  name,
  team: name === 'Andres Vargas' ? 'CyberWolves' : TEAM_NAMES[(i + 1) % TEAM_NAMES.length],
}));
// Función para generar números pseudo-aleatorios consistentes
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generar puntos estables basados en el ID del usuario
const generateStablePoints = (userId: string) => {
  const seed = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Math.floor(seededRandom(seed) * 1000) + 100; // Entre 100 y 1100
};

// Unir todos los usuarios
const ALL_USERS = [...CONSULTING_USERS, ...MOCK_USERS].map((u, i) => {
  let puntos;
  if (u.id === 'USR-011') { // Liam Smith - MVP (según la imagen, posición 0 en MOCK_NAMES + 11)
    puntos = 1065; // Puntos exactos de la imagen para asegurar primera posición
  } else {
    puntos = generateStablePoints(u.id);
  }
  
  return {
    ...u,
    role: 'Miembro',
    stats: { 
      puntos: puntos, 
      vulnerabilidades: Math.floor(seededRandom(u.id.charCodeAt(0) + i) * 100) + 1, 
      retos: Math.floor(seededRandom(u.id.charCodeAt(0) + i + 100) * 50) + 1 
    },
    badges: [],
  };
}).sort((a, b) => b.stats.puntos - a.stats.puntos); // Ordenar por puntos de mayor a menor

const ALL_BADGES = [
  { img: insignia1, name: 'Insignia 1' },
  { img: insignia2, name: 'Insignia 2' },
  { img: insignia3, name: 'Insignia 3' },
  { img: insignia4, name: 'Insignia 4' },
  { img: insignia5, name: 'Insignia 5' },
  { img: insignia6, name: 'Insignia 6' },
  { img: insignia7, name: 'Insignia 7' },
];

const UserRankingTable: React.FC<UserRankingTableProps> = () => {
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(ALL_USERS);

  useEffect(() => {
    setFiltered(
      ALL_USERS.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.team.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  // 1. Bloquea el scroll del body cuando cualquier modal esté abierto
  useEffect(() => {
    if (showAll || modalUser) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [showAll, modalUser]);

  // Asignar insignias diferentes a cada usuario (cíclico)
  const INSIGNIAS = [
    { img: insignia1, label: 'TOP 10 BUGS' },
    { img: insignia2, label: 'MVP' },
    { img: insignia3, label: 'BUG HUNTER DEL MES' },
  ];

  // Modal de usuario
  const UserModal = ({ user, onClose, idx }: { user: User; onClose: () => void; idx: number }) => {
    // Obtener insignias seleccionadas
    let selectedBadges: string[] = [];
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedBadges');
      if (saved) selectedBadges = JSON.parse(saved);
    }
    if (!selectedBadges || selectedBadges.length !== 3) {
      selectedBadges = ALL_BADGES.slice(0, 3).map(b => b.img);
    }
    const userInsignias = selectedBadges.map(img => ALL_BADGES.find(b => b.img === img)).filter(Boolean) as {img: string, name: string}[];
    
    // Solo mostrar avatar y fondo personalizados si es el usuario autenticado (Alex Turner)
    const isCurrentUser = user.id === 'USR-001'; // Alex Turner
    let selectedAvatar = '';
    let portada = null;
    if (isCurrentUser && typeof window !== 'undefined') {
      selectedAvatar = localStorage.getItem('selectedAvatar') || '';
      portada = localStorage.getItem('selectedPortadaPerfil');
    }
    const bg = isCurrentUser && portada ? portada : 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80';
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
        <div
          className="relative bg-white rounded-2xl shadow-2xl flex flex-col items-center p-8 w-[340px] max-w-[90vw]"
          style={{ backgroundImage: `url('${bg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 bg-gray-200 flex items-center justify-center overflow-hidden">
            {isCurrentUser && selectedAvatar ? (
              <img src={selectedAvatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-4xl font-bold text-white bg-blue-500 w-full h-full flex items-center justify-center">{user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div className="text-2xl font-extrabold text-white drop-shadow mb-2 text-center">{user.name}</div>
          <div className="text-base font-semibold text-white drop-shadow mb-1">Equipo: <span className="font-bold">{user.team}</span></div>
          <div className="text-sm text-white/80 mb-1">ID: {user.id}</div>
          {/* Insignias seleccionadas en V */}
          <div className="flex flex-row gap-3 mt-4 mb-2 justify-center items-end" style={{ height: 70 }}>
            {userInsignias.map((ins, i) => (
              <div
                key={i}
                className="relative group"
                style={
                  i === 1
                    ? { marginBottom: -12, zIndex: 2 }
                    : { marginBottom: 0, zIndex: 1 }
                }
              >
                <img src={ins.img} alt={ins.name} className="w-16 h-16 rounded-full border-2 border-yellow-500 shadow object-cover bg-white cursor-pointer" />
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                  {ins.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Modal de ranking completo
  const RankingModal = ({ onClose }: { onClose: () => void }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col p-6" onClick={e => e.stopPropagation()}>
          <button className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-red-600 font-bold z-10" onClick={onClose}>&times;</button>
          <div className="mb-4 flex items-center gap-3">
            <input
              type="text"
              className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 mr-8"
              placeholder="Buscar usuario o equipo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className="overflow-y-auto transition-all duration-300" style={{ maxHeight: '65vh' }}>
            <table className="min-w-full border-separate border-spacing-0 rounded-xl shadow-lg overflow-hidden" style={{ borderRadius: '16px' }}>
              <thead className="sticky top-0 z-10" style={{ backgroundColor: '#181A20' }}>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase">Puesto</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase">Jugador</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-white uppercase">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => {
                  const { color, initials } = getAvatarProps(user.name);
                  const puesto = ALL_USERS.findIndex(u => u.id === user.id) + 1;
                  return (
                    <tr key={user.id} className={`transition group`} style={{ borderBottom: '1px solid #E5E7EB', background: 'inherit' }}>
                      <td className="px-4 py-3 font-semibold text-gray-900 text-center align-middle">{puesto}</td>
                      <td className="px-4 py-3 flex items-center gap-3 min-w-[160px] align-middle">
                        <span
                          className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-base shrink-0 ${color} cursor-pointer`}
                          onClick={() => setModalUser(user)}
                        >{initials}</span>
                        <span
                          className="truncate max-w-[120px] font-medium text-gray-800 cursor-pointer"
                          title={user.name}
                          onClick={() => setModalUser(user)}
                        >{user.name}</span>
                      </td>
                      <td className="px-4 py-3 text-center align-middle">
                        <span className="inline-flex items-center gap-1 text-lg font-extrabold text-green-600 drop-shadow-sm">
                          {user.stats.puntos}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Mostrar solo los 5 primeros usuarios y el botón
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-separate border-spacing-0 rounded-xl shadow-lg overflow-hidden" style={{ borderRadius: '16px' }}>
        <thead className="sticky top-0 z-10" style={{ backgroundColor: '#181A20' }}>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase">Puesto</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase">Jugador</th>
            <th className="px-4 py-3 text-center text-sm font-bold text-white uppercase">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {ALL_USERS.slice(0, 5).map((user) => {
            const { color, initials } = getAvatarProps(user.name);
            const puesto = ALL_USERS.findIndex(u => u.id === user.id) + 1;
            return (
              <tr key={user.id} className={`transition group`} style={{ borderBottom: '1px solid #E5E7EB', background: 'inherit' }}>
                <td className="px-4 py-3 font-semibold text-gray-900 text-center align-middle">{puesto}</td>
                <td className="px-4 py-3 flex items-center gap-3 min-w-[160px] align-middle">
                  <span
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-base shrink-0 ${color} cursor-pointer`}
                    onClick={() => setModalUser(user)}
                  >{initials}</span>
                  <span
                    className="truncate max-w-[120px] font-medium text-gray-800 cursor-pointer"
                    title={user.name}
                    onClick={() => setModalUser(user)}
                  >{user.name}</span>
                </td>
                <td className="px-4 py-3 text-center align-middle">
                  <span className="inline-flex items-center gap-1 text-lg font-extrabold text-green-600 drop-shadow-sm">
                    {user.stats.puntos}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-bold shadow hover:bg-cyan-700 transition"
          onClick={() => setShowAll(true)}
        >
          Mostrar ranking completo
        </button>
      </div>
      {showAll && <RankingModal onClose={() => setShowAll(false)} />}
      {modalUser && <UserModal user={modalUser} onClose={() => setModalUser(null)} idx={ALL_USERS.findIndex(u => u.id === modalUser.id)} />}
    </div>
  );
};

export default UserRankingTable; 