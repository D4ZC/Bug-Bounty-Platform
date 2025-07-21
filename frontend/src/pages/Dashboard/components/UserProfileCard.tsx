import React from 'react';
import { Tile } from '@carbon/react';
import { UserAvatar, Warning, Fire, Information, Checkmark } from '@carbon/icons-react';

interface UserProfile {
  name: string;
  img: string;
  stats: {
    criticas: number;
    altas: number;
    medianas: number;
    bajas: number;
    total: number;
  };
}

const statConfig = [
  { key: 'criticas', label: 'Críticas', color: 'bg-red-100 text-red-600', icon: <Warning size={20} /> },
  { key: 'altas', label: 'Altas', color: 'bg-orange-100 text-orange-600', icon: <Fire size={20} /> },
  { key: 'medianas', label: 'Medianas', color: 'bg-yellow-100 text-yellow-600', icon: <Information size={20} /> },
  { key: 'bajas', label: 'Bajas', color: 'bg-blue-100 text-blue-600', icon: <Checkmark size={20} /> },
];

const UserProfileCard: React.FC<{ user: UserProfile }> = ({ user }) => (
  <Tile className="col-span-1 flex flex-col items-center justify-between gap-4 min-h-[260px] bg-white border border-blue-400 rounded-2xl shadow-lg p-6 animate-fade-in">
    {/* Imagen de perfil */}
    <div className="flex flex-col items-center">
      {user.img ? (
        <img src={user.img} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
      ) : (
        <UserAvatar size={80} className="text-gray-300 bg-gray-100 rounded-full p-2" />
      )}
      <h2 className="text-2xl font-bold mt-3 mb-1 text-gray-800">{user.name}</h2>
    </div>
    {/* Estadísticas */}
    <div className="w-full grid grid-cols-2 gap-2 mt-2">
      {statConfig.map(stat => (
        <div key={stat.key} className={`flex items-center gap-2 rounded-lg px-3 py-2 ${stat.color}`}>
          {stat.icon}
          <span className="font-semibold">{(user.stats as any)[stat.key]}</span>
          <span className="text-xs">{stat.label}</span>
        </div>
      ))}
    </div>
    {/* Total */}
    <div className="mt-4 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 text-gray-700 font-semibold">
      <Checkmark size={20} className="text-green-500" />
      Total: {user.stats.total}
    </div>
  </Tile>
);

export default UserProfileCard; 