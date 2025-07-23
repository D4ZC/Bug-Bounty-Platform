import React, { useState } from 'react';
import { Tile } from '@carbon/react';
import { UserAvatar, Warning, Fire, Information, Checkmark } from '@carbon/icons-react';
import { RefObject, useRef } from 'react';

interface User {
  name: string;
  score: number;
}

const medalColors = [
  'bg-yellow-300 text-yellow-900', // Oro
  'bg-gray-300 text-gray-700',    // Plata
  'bg-orange-400 text-white',     // Bronce
];
const medalEmojis = ['🥇', '🥈', '🥉'];

const statConfig = [
  { key: 'criticas', label: 'Críticas', color: 'bg-red-100 text-red-600', icon: <Warning size={20} /> },
  { key: 'altas', label: 'Altas', color: 'bg-orange-100 text-orange-600', icon: <Fire size={20} /> },
  { key: 'medianas', label: 'Medianas', color: 'bg-yellow-100 text-yellow-600', icon: <Information size={20} /> },
  { key: 'bajas', label: 'Bajas', color: 'bg-blue-100 text-blue-600', icon: <Checkmark size={20} /> },
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
const getCardPosition = (ref: RefObject<HTMLElement>, cardWidth = 280, cardHeight = 340) => {
  if (!ref?.current) return { left: '50%', top: 0 };
  const rect = ref.current.getBoundingClientRect();
  const padding = 16;
  let left = rect.right + 12 + window.scrollX; // por defecto a la derecha
  let top = rect.top + rect.height / 2 - cardHeight / 2 + window.scrollY;
  // Si no hay espacio a la derecha, mostrar a la izquierda
  if (rect.right + cardWidth + padding > window.innerWidth) {
    left = rect.left - cardWidth - 12 + window.scrollX;
    if (left < padding) left = padding;
  }
  // Ajustar top para no salir por arriba/abajo
  if (top < padding) top = padding;
  if (top + cardHeight > window.innerHeight - padding) top = window.innerHeight - cardHeight - padding;
  return { left, top };
};

const UserScoreCard: React.FC<{ users: User[] }> = ({ users }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const userCellRef = useRef<HTMLSpanElement>(null);

  return (
    <Tile className="col-span-1 flex flex-col gap-2 min-h-[200px] bg-white border border-gray-400 rounded-2xl shadow-lg p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-0.5">
        <UserAvatar className="text-blue-400" size={24} />
        <span className="font-bold text-lg text-gray-800">User Score</span>
      </div>
      <ol className="flex flex-col gap-2 mt-0.5">
        {users.map((user, idx) => (
          <li key={user.name} className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-lg text-sm font-bold ${medalColors[idx] || 'bg-gray-100 text-gray-500'}`}>{medalEmojis[idx] || idx + 1}</span>
              <span
                className="font-semibold text-gray-700 cursor-pointer relative"
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
                      ...getCardPosition(userCellRef, 280, 340),
                      width: 280,
                      minHeight: 260,
                      maxHeight: 340,
                    }}
                  >
                    <UserAvatar size={64} className="text-gray-300 bg-gray-100 rounded-full p-2 mb-2" />
                    <div className="font-bold text-xl mb-4 text-center">{user.name}</div>
                    <div className="grid grid-cols-2 gap-3 w-full mb-4">
                      {statConfig.map(stat => (
                        <div key={stat.key} className={`flex items-center gap-2 rounded-lg px-3 py-2 ${stat.color}`}>
                          {stat.icon}
                          <span className={stat.color.split(' ')[1] + ' font-bold text-lg'}>{userStats[user.name]?.stats?.[stat.key] ?? '-'}</span>
                          <span className={`text-xs font-semibold ${stat.color.split(' ')[1]}`}>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 text-gray-700 font-semibold text-base">
                      <Checkmark size={20} className="text-green-500" />
                      Total: {userStats[user.name]?.stats?.total ?? user.score}
                    </div>
                  </div>
                )}
              </span>
            </div>
            <span className="font-mono text-gray-600">{user.score} pts</span>
          </li>
        ))}
      </ol>
    </Tile>
  );
};

export default UserScoreCard; 