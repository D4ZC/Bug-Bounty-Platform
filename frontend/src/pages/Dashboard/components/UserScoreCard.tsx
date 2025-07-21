import React, { useState } from 'react';
import { Tile } from '@carbon/react';
import { UserAvatar } from '@carbon/icons-react';

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

const UserScoreCard: React.FC<{ users: User[] }> = ({ users }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <Tile className="col-span-1 flex flex-col gap-2 min-h-[200px] bg-white border border-gray-400 rounded-2xl shadow-lg p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-0.5">
        <UserAvatar className="text-blue-400" size={24} />
        <span className="font-bold text-lg text-gray-800">User Score</span>
      </div>
      <span className="text-xs text-gray-500 mb-2">Top 3 usuarios</span>
      <ol className="flex flex-col gap-2 mt-0.5">
        {users.map((user, idx) => (
          <li key={user.name} className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-lg text-sm font-bold ${medalColors[idx] || 'bg-gray-100 text-gray-500'}`}>{medalEmojis[idx] || idx + 1}</span>
              <span
                className="font-semibold text-gray-700 cursor-pointer relative"
                onMouseEnter={() => setHovered(user.name)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(user.name)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
              >
                {user.name}
                {hovered === user.name && (
                  <div className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-2 min-w-[180px] animate-fade-in text-sm text-gray-800">
                    <div className="font-bold text-base mb-1">{user.name}</div>
                    <div className="mb-1">Puntaje: <span className="font-mono font-semibold">{user.score}</span></div>
                    <div className="text-xs text-gray-500">Perfil destacado en el ranking.</div>
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