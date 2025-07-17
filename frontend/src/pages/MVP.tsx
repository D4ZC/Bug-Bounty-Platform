import React from 'react';

const mvpUsers = [
  { id: 1, name: 'Ana Torres', points: 3200, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'Carlos Pérez', points: 2950, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'Lucía Gómez', points: 2780, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
];

const MVP: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Usuarios Destacados (MVP)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mvpUsers.map(user => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mb-4" />
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-blue-600 font-bold">{user.points} puntos</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MVP; 