import React from 'react';

interface User {
  id: string;
  name: string;
  role: string;
  team: string;
  stats: { puntos: number; vulnerabilidades: number; retos: number };
  badges: string[];
}

interface UserCardProps {
  user: User;
  expanded: boolean;
  onExpand: () => void;
  ranking: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, expanded, onExpand, ranking }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-sm p-6 transition-all duration-200 ${expanded ? 'shadow-lg' : ''} cursor-pointer`}
      onClick={onExpand}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-400">#{ranking}</span>
          <span className="text-xl font-bold text-gray-800">{user.name}</span>
        </div>
        {!expanded && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-2xl font-bold">...</span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
          </div>
        )}
      </div>
      <div className="text-gray-500 text-sm mt-1">{user.role} | Equipo: {user.team}</div>
      {expanded && (
        <div className="mt-4 border-t pt-4">
          <div className="mb-2">
            <span className="font-semibold text-gray-700">ID:</span> {user.id}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Estadísticas:</span>
            <ul className="ml-4 text-gray-600">
              <li>Puntos: {user.stats.puntos}</li>
              <li>Vulnerabilidades resueltas: {user.stats.vulnerabilidades}</li>
              <li>Retos completados: {user.stats.retos}</li>
            </ul>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Insignias:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {user.badges.map(badge => (
                <span key={badge} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium border border-yellow-300">{badge}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard; 