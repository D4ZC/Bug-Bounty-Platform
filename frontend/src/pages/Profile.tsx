import React from 'react';

const user = {
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  nombre: 'Pedro Ramiro',
  nickname: 'bughunter',
  email: 'pedro.ramiro@example.com',
  rango: 'Oro',
  puntos: 2450,
  miembroDesde: '2023-01-15',
};

const Profile: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
        <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full mb-4 border-4 border-blue-200" />
        <h2 className="text-2xl font-bold mb-1">{user.nombre}</h2>
        <span className="text-blue-600 font-semibold mb-2">@{user.nickname}</span>
        <div className="text-gray-600 mb-2">{user.email}</div>
        <div className="flex gap-4 mb-4">
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">{user.rango}</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{user.puntos} puntos</span>
        </div>
        <div className="text-sm text-gray-400">Miembro desde: {user.miembroDesde}</div>
      </div>
    </div>
  );
};

export default Profile; 