import React from 'react';

const MVP: React.FC = () => {
  const currentMVP = {
    user: { name: 'Usuario Elite', points: 2500, team: 'Equipo Alpha' },
    team: { name: 'Equipo Alpha', points: 8500, members: 5 }
  };

  const mvpHistory = [
    { month: 'Enero 2024', user: 'Usuario Elite', team: 'Equipo Alpha' },
    { month: 'Diciembre 2023', user: 'Usuario Pro', team: 'Equipo Beta' },
    { month: 'Noviembre 2023', user: 'Usuario Elite', team: 'Equipo Alpha' },
  ];

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-semibold mb-6">MVP - Most Valuable Player</h2>
      
      {/* MVP Actual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">MVP Usuario Actual</h3>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              👑
            </div>
            <div>
              <h4 className="text-xl font-bold">{currentMVP.user.name}</h4>
              <p className="text-gray-600">{currentMVP.user.team}</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-600">{currentMVP.user.points} puntos</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">MVP Equipo Actual</h3>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              🏆
            </div>
            <div>
              <h4 className="text-xl font-bold">{currentMVP.team.name}</h4>
              <p className="text-gray-600">{currentMVP.team.members} miembros</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-600">{currentMVP.team.points} puntos</p>
        </div>
      </div>

      {/* Beneficios MVP */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Beneficios MVP</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Acceso a tienda exclusiva</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Emblema de temporada</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Insignia especial</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Título exclusivo</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>10-15% extra en puntos</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Acceso a contenido VIP</span>
            </p>
          </div>
        </div>
      </div>

      {/* Historial MVP */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Historial MVP</h3>
        <div className="space-y-3">
          {mvpHistory.map((mvp, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">{mvp.month}</span>
              <div className="text-sm text-gray-600">
                <span>Usuario: {mvp.user}</span>
                <span className="mx-2">|</span>
                <span>Equipo: {mvp.team}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MVP; 