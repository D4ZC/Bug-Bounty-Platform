import React from 'react';

const mvpUsers = [
  { id: 1, name: 'Ana Torres', points: 3200, avatar: 'https://randomuser.me/api/portraits/women/44.jpg', rank: 'Oro', acceptedReports: 18, recentAchievement: 'Top Hunter de la semana' },
  { id: 2, name: 'Carlos Pérez', points: 2950, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', rank: 'Plata', acceptedReports: 15, recentAchievement: 'Mayor número de likes' },
  { id: 3, name: 'Lucía Gómez', points: 2780, avatar: 'https://randomuser.me/api/portraits/women/68.jpg', rank: 'Bronce', acceptedReports: 13, recentAchievement: 'Reporte crítico aceptado' },
  { id: 4, name: 'Pedro Ramiro', points: 2650, avatar: 'https://randomuser.me/api/portraits/men/45.jpg', rank: 'Oro', acceptedReports: 12, recentAchievement: 'Desafío mensual completado' },
  { id: 5, name: 'Sofía Martínez', points: 2500, avatar: 'https://randomuser.me/api/portraits/women/12.jpg', rank: 'Plata', acceptedReports: 11, recentAchievement: 'Mejor reporte de bug' },
  { id: 6, name: 'Miguel Ángel', points: 2400, avatar: 'https://randomuser.me/api/portraits/men/21.jpg', rank: 'Bronce', acceptedReports: 10, recentAchievement: 'Participación destacada' },
];

const rankColors: Record<string, string> = {
  'Oro': 'bg-yellow-200 text-yellow-800',
  'Plata': 'bg-gray-200 text-gray-700',
  'Bronce': 'bg-orange-200 text-orange-800',
};

const MVP: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Usuarios Destacados (MVP)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mvpUsers.map((user, idx) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <span className="mb-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">#{idx + 1}</span>
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mb-3" />
            <h3 className="text-lg font-semibold mb-1">{user.name}</h3>
            <span className={`mb-2 px-3 py-1 rounded-full text-xs font-semibold ${rankColors[user.rank]}`}>{user.rank}</span>
            <p className="text-blue-600 font-bold mb-1">{user.points} puntos</p>
            <p className="text-green-700 text-sm mb-1">{user.acceptedReports} reportes aceptados</p>
            <p className="text-gray-500 text-xs italic">{user.recentAchievement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MVP; 