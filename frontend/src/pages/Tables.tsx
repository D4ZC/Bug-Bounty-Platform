import React, { useState, useRef, useEffect, RefObject } from 'react';
import { UserAvatar, Warning, Fire, Information, Checkmark } from '@carbon/icons-react';

const allTeams = [
  { name: 'Warriors of Sunlight', score: 2000 },
  { name: 'Darkwraiths', score: 1900 },
  { name: 'Blades of the Darkmoon', score: 1500 },
  { name: 'Way of Blue', score: 1400 },
  { name: 'Blue Sentinels', score: 1300 },
  { name: 'Aldrich Faithful', score: 1200 },
  { name: 'Watchdogs of Farron', score: 1100 },
  { name: 'Rosaria’s Fingers', score: 1000 },
];
const allUsers = [
  { name: 'Solaire of Astora', score: 2100 },
  { name: 'Siegmeyer of Catarina', score: 1800 },
  { name: 'Knight Lautrec', score: 1700 },
  { name: 'Big Hat Logan', score: 1600 },
  { name: 'Oscar of Astora', score: 1500 },
  { name: 'Patches', score: 1400 },
  { name: 'Gwynevere', score: 1300 },
  { name: 'Gwyndolin', score: 1200 },
  { name: 'Andre of Astora', score: 1150 },
  { name: 'Shiva of the East', score: 1100 },
  { name: 'Domhnall of Zena', score: 1050 },
  { name: 'Laurentius', score: 1000 },
  { name: 'Quelaag’s Sister', score: 950 },
  { name: 'Havel the Rock', score: 900 },
  { name: 'Chester', score: 850 },
  { name: 'Crestfallen Warrior', score: 800 },
  { name: 'Vince of Thorolund', score: 750 },
  { name: 'Griggs of Vinheim', score: 700 },
];

const filterOptions = [
  { label: 'Top 3', value: 3 },
  { label: 'Top 5', value: 5 },
  { label: 'Todos', value: 99 },
];

const orderOptions = [
  { label: 'Por posición', value: 'ranking' },
  { label: 'Nombre (A-Z)', value: 'az' },
  { label: 'Nombre (Z-A)', value: 'za' },
];

const podiumColors = [
  'text-yellow-600 font-bold', // Oro
  'text-gray-500 font-bold',  // Plata
  'text-orange-500 font-bold', // Bronce
];

function sortArray<T extends { name: string; score: number }>(arr: T[], order: string, key: keyof T = 'name'): T[] {
  if (order === 'az') return [...arr].sort((a, b) => String(a[key]).localeCompare(String(b[key])));
  if (order === 'za') return [...arr].sort((a, b) => String(b[key]).localeCompare(String(a[key])));
  // ranking: por score descendente
  return [...arr].sort((a, b) => b.score - a.score);
}

const getCardPosition = (ref: RefObject<HTMLElement>, cardHeight = 340) => {
  if (!ref?.current) return { left: '50%', top: 0 };
  const rect = ref.current.getBoundingClientRect();
  const cardWidth = 280;
  const padding = 16;
  let left = rect.left + rect.width / 2 - cardWidth / 2;
  if (left < padding) left = padding;
  if (left + cardWidth > window.innerWidth - padding) left = window.innerWidth - cardWidth - padding;

  // Calcular top/bottom para evitar que se salga por abajo
  let top = rect.bottom + 8 + window.scrollY;
  if (rect.bottom + cardHeight + 24 > window.innerHeight) {
    // Mostrar arriba si no hay espacio abajo
    top = rect.top - cardHeight - 8 + window.scrollY;
    if (top < padding) top = padding; // No salir por arriba
  }
  return { left: left + window.scrollX, top };
};

const Tables: React.FC = () => {
  const [order, setOrder] = useState('ranking');
  const teams = sortArray(allTeams, order);
  const users = sortArray(allUsers, order);
  const needsScroll = users.length > 15 || teams.length > 15;
  const cardRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);

  // Podio y gulag reales (por puntaje)
  const usersByScore = sortArray(allUsers, 'ranking');
  const podiumNames = usersByScore.slice(0, 3).map(u => u.name);
  const gulagNames = usersByScore.slice(-5).map(u => u.name);

  useEffect(() => {
    if (!needsScroll) {
      setShowFade(false);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowFade(el.scrollTop + el.clientHeight < el.scrollHeight - 2);
    };
    handleScroll();
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [needsScroll, users, teams]);

  const statConfig = [
    { key: 'criticas', label: 'Críticas', color: 'bg-red-100 text-red-600', icon: <Warning size={18} /> },
    { key: 'altas', label: 'Altas', color: 'bg-orange-100 text-orange-600', icon: <Fire size={18} /> },
    { key: 'medianas', label: 'Medianas', color: 'bg-yellow-100 text-yellow-600', icon: <Information size={18} /> },
    { key: 'bajas', label: 'Bajas', color: 'bg-blue-100 text-blue-600', icon: <Checkmark size={18} /> },
  ];

  const userStats: Record<string, any> = {
    'Solaire of Astora': { img: '', stats: { criticas: 12, altas: 22, medianas: 35, bajas: 10, total: 79 } },
    'Siegmeyer of Catarina': { img: '', stats: { criticas: 8, altas: 15, medianas: 20, bajas: 5, total: 48 } },
    'Knight Lautrec': { img: '', stats: { criticas: 7, altas: 14, medianas: 18, bajas: 6, total: 45 } },
    'Big Hat Logan': { img: '', stats: { criticas: 6, altas: 12, medianas: 15, bajas: 7, total: 40 } },
    'Oscar of Astora': { img: '', stats: { criticas: 5, altas: 10, medianas: 12, bajas: 3, total: 30 } },
    'Patches': { img: '', stats: { criticas: 3, altas: 8, medianas: 10, bajas: 4, total: 25 } },
    'Gwynevere': { img: '', stats: { criticas: 2, altas: 7, medianas: 8, bajas: 3, total: 20 } },
    'Gwyndolin': { img: '', stats: { criticas: 2, altas: 6, medianas: 7, bajas: 2, total: 17 } },
    'Andre of Astora': { img: '', stats: { criticas: 1, altas: 5, medianas: 6, bajas: 3, total: 15 } },
    'Shiva of the East': { img: '', stats: { criticas: 1, altas: 4, medianas: 5, bajas: 2, total: 12 } },
    'Domhnall of Zena': { img: '', stats: { criticas: 1, altas: 3, medianas: 4, bajas: 2, total: 10 } },
    'Laurentius': { img: '', stats: { criticas: 0, altas: 2, medianas: 3, bajas: 2, total: 7 } },
    'Quelaag’s Sister': { img: '', stats: { criticas: 0, altas: 1, medianas: 2, bajas: 2, total: 5 } },
    'Havel the Rock': { img: '', stats: { criticas: 0, altas: 1, medianas: 1, bajas: 1, total: 3 } },
    'Chester': { img: '', stats: { criticas: 2, altas: 4, medianas: 3, bajas: 1, total: 10 } },
    'Crestfallen Warrior': { img: '', stats: { criticas: 1, altas: 2, medianas: 4, bajas: 2, total: 9 } },
    'Vince of Thorolund': { img: '', stats: { criticas: 0, altas: 1, medianas: 2, bajas: 3, total: 6 } },
    'Griggs of Vinheim': { img: '', stats: { criticas: 0, altas: 0, medianas: 1, bajas: 2, total: 3 } },
  };

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full max-w-full mx-auto py-10 px-2">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">Leaderboard</h1>
      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="order" className="font-semibold text-gray-700">Ordenar:</label>
        <select
          id="order"
          value={order}
          onChange={e => setOrder(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {orderOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div
        ref={cardRef}
        className={`bg-white rounded-2xl shadow-lg border border-gray-300 p-8 w-full ${needsScroll ? 'max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent relative' : ''}`}
        style={{ scrollbarWidth: needsScroll ? 'none' : undefined }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tabla de Usuarios */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-700">Usuarios</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th className="pb-2 w-8">#</th>
                  <th className="pb-2">Nombre</th>
                  <th className="pb-2 text-right">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => {
                  // Ranking real según puntaje
                  const realRank = usersByScore.findIndex(u => u.name === user.name) + 1;
                  let nameClass = 'text-black';
                  let posClass = 'text-gray-400';
                  let scoreClass = '';
                  if (podiumNames.includes(user.name)) {
                    const pidx = podiumNames.indexOf(user.name);
                    nameClass = podiumColors[pidx];
                  }
                  if (gulagNames.includes(user.name)) {
                    nameClass = 'text-red-600 font-semibold';
                    posClass = 'text-red-400';
                    scoreClass = 'text-red-600';
                  }
                  const userCellRef = useRef<HTMLSpanElement>(null);
                  return (
                    <tr
                      key={user.name}
                      className={gulagNames.includes(user.name)
                        ? 'border-t border-red-100 hover:bg-red-50 transition'
                        : 'border-t border-gray-100 hover:bg-green-50 transition'}
                    >
                      <td className={`py-2 font-bold ${posClass}`}>{realRank}.</td>
                      <td className={`py-2 ${nameClass} font-semibold`}>
                        <span
                          className="cursor-pointer relative"
                          ref={userCellRef}
                          onMouseEnter={() => setHovered(user.name)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(user.name)}
                          onBlur={() => setHovered(null)}
                          tabIndex={0}
                        >
                          {user.name}
                          {hovered === user.name && (
                            <div
                              className="fixed z-50 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 flex flex-col items-center min-w-[260px] max-w-[320px] animate-fade-in"
                              style={{
                                ...getCardPosition(userCellRef, 340),
                                width: 280,
                                minHeight: 260,
                                maxHeight: 340,
                              }}
                            >
                              <UserAvatar size={64} className="text-gray-300 bg-gray-100 rounded-full p-2 mb-2" />
                              <div className="font-bold text-xl mb-4 text-center">{user.name}</div>
                              <div className="grid grid-cols-2 gap-3 w-full mb-4">
                                <div className="flex items-center gap-2 bg-red-100 rounded-lg px-3 py-2">
                                  <Warning size={20} className="text-red-500" />
                                  <span className="text-red-600 font-bold text-lg">{userStats[user.name]?.stats?.criticas ?? '-'}</span>
                                  <span className="text-xs text-red-700 font-semibold">Críticas</span>
                                </div>
                                <div className="flex items-center gap-2 bg-orange-100 rounded-lg px-3 py-2">
                                  <Fire size={20} className="text-orange-500" />
                                  <span className="text-orange-600 font-bold text-lg">{userStats[user.name]?.stats?.altas ?? '-'}</span>
                                  <span className="text-xs text-orange-700 font-semibold">Altas</span>
                                </div>
                                <div className="flex items-center gap-2 bg-yellow-100 rounded-lg px-3 py-2">
                                  <Information size={20} className="text-yellow-600" />
                                  <span className="text-yellow-700 font-bold text-lg">{userStats[user.name]?.stats?.medianas ?? '-'}</span>
                                  <span className="text-xs text-yellow-800 font-semibold">Medianas</span>
                                </div>
                                <div className="flex items-center gap-2 bg-blue-100 rounded-lg px-3 py-2">
                                  <Checkmark size={20} className="text-blue-600" />
                                  <span className="text-blue-600 font-bold text-lg">{userStats[user.name]?.stats?.bajas ?? '-'}</span>
                                  <span className="text-xs text-blue-700 font-semibold">Bajas</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 text-gray-700 font-semibold text-base">
                                <Checkmark size={20} className="text-green-500" />
                                Total: {userStats[user.name]?.stats?.total ?? user.score}
                              </div>
                            </div>
                          )}
                        </span>
                      </td>
                      <td className={`py-2 text-right font-mono ${scoreClass}`}>{user.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Tabla de Equipos */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Equipos</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th className="pb-2 w-8">#</th>
                  <th className="pb-2">Nombre</th>
                  <th className="pb-2 text-right">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr
                    key={team.name}
                    className="border-t border-gray-100 hover:bg-blue-50 transition"
                  >
                    <td className="py-2 font-bold text-gray-400">{idx + 1}.</td>
                    <td className="py-2 text-black font-semibold">{team.name}</td>
                    <td className="py-2 text-right font-mono text-blue-600">{team.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;