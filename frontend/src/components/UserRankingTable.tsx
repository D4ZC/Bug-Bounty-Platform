import React, { useState } from 'react';

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

const UserRankingTable: React.FC<UserRankingTableProps> = ({ users }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-separate border-spacing-0 rounded-xl shadow-lg overflow-hidden" style={{ borderRadius: '16px' }}>
        <thead className="sticky top-0 z-10" style={{ backgroundColor: '#181A20' }}>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase">Puesto</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase">Jugador</th>
            <th className="px-4 py-3 text-center text-sm font-bold text-white uppercase">Puntos</th>
            <th className="px-4 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            const { color, initials } = getAvatarProps(user.name);
            const isExpanded = expandedId === user.id;
            const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-[#F4F6FA]';
            return (
              <React.Fragment key={user.id}>
                <tr className={`${rowBg} transition group`} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td className="px-4 py-3 font-semibold text-gray-900 text-center align-middle">{idx + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-3 min-w-[160px] align-middle">
                    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-base shrink-0 ${color}`}>{initials}</span>
                    <span className="truncate max-w-[120px] font-medium text-gray-800" title={user.name}>{user.name}</span>
                  </td>
                  <td className="px-4 py-3 text-center align-middle">
                    <span className="inline-flex items-center gap-1 text-lg font-extrabold text-green-600 drop-shadow-sm">
                      {user.stats.vulnerabilidades}
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-center align-middle cursor-pointer select-none"
                    onClick={() => setExpandedId(isExpanded ? null : user.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center justify-end gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <span className="inline-flex items-center justify-center w-5 h-5">
                        <svg
                          className={`w-[18px] h-[18px] text-blue-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
                {isExpanded && (
                  <tr className="bg-[#F4F6FA]">
                    <td colSpan={4} className="px-6 pb-4 pt-2 rounded-b-xl">
                      <div className="text-sm text-gray-700 mb-2"><span className="font-semibold">Rol:</span> {user.role}</div>
                      <div className="text-sm text-gray-700 mb-2"><span className="font-semibold">Equipo:</span> {user.team}</div>
                      <div className="text-sm text-gray-700 mb-2"><span className="font-semibold">Puntos:</span> {user.stats.vulnerabilidades}</div>
                      <div className="text-sm text-gray-700 mb-2"><span className="font-semibold">Retos completados:</span> {user.stats.retos}</div>
                      <div className="text-sm text-gray-700 mb-2"><span className="font-semibold">Insignias:</span> {user.badges.join(', ')}</div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserRankingTable; 