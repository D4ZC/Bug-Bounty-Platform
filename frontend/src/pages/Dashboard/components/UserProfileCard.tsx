import React from 'react';

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
  <div className="col-span-1 flex flex-col items-start min-h-[200px] p-6 bg-gradient-to-br from-black to-[#0ff0fc] border-2 border-[#00fff7] rounded-2xl font-mono text-[#00fff7] mx-auto w-full max-w-md">
    <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
    <div className="text-sm mb-2">
      Vulnerabilidades solucionadas: {user.stats.total}<br />
      -Críticas: {user.stats.criticas}<br />
      -Altas: {user.stats.altas}<br />
      -Medianas: {user.stats.medianas}<br />
      -Bajas: {user.stats.bajas}
    </div>
    {/* Placeholder de radar chart */}
    <div className="w-32 h-32 bg-[#7a3a09] rounded-full flex items-center justify-center" />
  </div>
);

export default UserProfileCard; 