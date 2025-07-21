import React, { useState } from 'react';
import { Tile } from '@carbon/react';
import { Warning, Fire, Information, Checkmark, UserAvatar } from '@carbon/icons-react';

interface GulagUser {
  name: string;
  score: number;
  img?: string; // Added for UserAvatar
  stats?: { // Added for new preview
    criticas: number;
    altas: number;
    medianas: number;
    bajas: number;
    total: number;
  };
}

const GulagCard: React.FC<{ gulag: GulagUser[] }> = ({ gulag }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const statConfig = [
    { key: 'criticas', label: 'Críticas', color: 'bg-red-100 text-red-600', icon: <Warning size={18} /> },
    { key: 'altas', label: 'Altas', color: 'bg-orange-100 text-orange-600', icon: <Fire size={18} /> },
    { key: 'medianas', label: 'Medianas', color: 'bg-yellow-100 text-yellow-600', icon: <Information size={18} /> },
    { key: 'bajas', label: 'Bajas', color: 'bg-blue-100 text-blue-600', icon: <Checkmark size={18} /> },
  ];

  return (
    <Tile className="col-span-1 flex flex-col gap-4 min-h-[200px] bg-white border border-red-400 rounded-2xl shadow-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Warning className="text-red-500" size={28} />
        <span className="font-bold text-lg text-red-700">Gulag</span>
      </div>
      <ol className="flex flex-col gap-3 mt-2">
        {gulag.map((user, idx) => (
          <li key={user.name} className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-lg text-sm font-bold bg-red-100 text-red-600">{idx + 1}</span>
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
                  <div className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 min-w-[220px] animate-fade-in text-sm text-gray-800 flex flex-col items-center gap-2">
                    {/* Fondo e icono/avatar */}
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                      {user.img ? (
                        <img src={user.img} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <UserAvatar size={48} className="text-gray-300" />
                      )}
                    </div>
                    <div className="font-bold text-base mb-1">{user.name}</div>
                    <div className="grid grid-cols-2 gap-1 w-full mb-1">
                      {statConfig.map(stat => (
                        <div key={stat.key} className={`flex items-center gap-1 rounded px-2 py-1 ${stat.color} text-xs`}>
                          {stat.icon}
                          <span className="font-semibold">{user.stats ? (user.stats as any)[stat.key] : '-'}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 text-xs text-gray-700 font-semibold">
                      <Checkmark size={16} className="text-green-500" />
                      Total: {user.stats ? user.stats.total : user.score}
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

export default GulagCard; 