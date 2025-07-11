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
  <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-950 border border-indigo-400 rounded-xl shadow-md p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-200">
    <h2 className="text-2xl font-bold text-indigo-300 mb-2 text-center">{user.name}</h2>
    <p className="text-indigo-100 text-center mb-1">¡Perfil del jugador destacado!</p>
    <div className="flex justify-center mb-4">
      <span className="inline-block bg-indigo-700/60 text-indigo-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold">ESTADÍSTICAS</span>
    </div>
    <div className="text-center">
      <div className="text-sm mb-2 text-indigo-200">
        Vulnerabilidades solucionadas: <span className="font-bold text-indigo-300">{user.stats.total}</span><br />
        -Críticas: <span className="font-bold text-indigo-300">{user.stats.criticas}</span><br />
        -Altas: <span className="font-bold text-indigo-300">{user.stats.altas}</span><br />
        -Medianas: <span className="font-bold text-indigo-300">{user.stats.medianas}</span><br />
        -Bajas: <span className="font-bold text-indigo-300">{user.stats.bajas}</span>
      </div>
      {/* Placeholder de radar chart */}
      <div className="w-32 h-32 bg-indigo-300 rounded-full flex items-center justify-center mx-auto">
        {/* Aquí iría el radar chart */}
      </div>
    </div>
  </div>
);

export default UserProfileCard; 