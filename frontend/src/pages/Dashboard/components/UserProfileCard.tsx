import React from 'react';
import { Tile } from '@carbon/react';

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

const UserProfileCard: React.FC<{ user: UserProfile }> = ({ user }) => (
  <Tile className="col-span-1 flex flex-col items-start min-h-[200px] p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
    <h2 className="text-2xl font-bold text-primary-700 mb-2">{user.name}</h2>
    <div className="text-sm mb-2 text-primary-600">
      Vulnerabilidades solucionadas: {user.stats.total}<br />
      -Críticas: {user.stats.criticas}<br />
      -Altas: {user.stats.altas}<br />
      -Medianas: {user.stats.medianas}<br />
      -Bajas: {user.stats.bajas}
    </div>
    {/* Placeholder de radar chart */}
    <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center">
      {/* Aquí iría el radar chart */}
    </div>
  </Tile>
);

export default UserProfileCard; 