import React from 'react';

const Team: React.FC = () => {
  const teamMembers = [
    { id: 1, name: 'Usuario 1', role: 'Líder', points: 1200, avatar: 'U1' },
    { id: 2, name: 'Usuario 2', role: 'Desarrollador', points: 950, avatar: 'U2' },
    { id: 3, name: 'Usuario 3', role: 'Analista', points: 800, avatar: 'U3' },
    { id: 4, name: 'Usuario 4', role: 'Tester', points: 750, avatar: 'U4' },
  ];

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-semibold mb-6">Mi Equipo</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Equipo Demo</h3>
          <span className="text-lg font-bold text-blue-600">Puntos: 3,700</span>
        </div>
        <p className="text-gray-600">Equipo especializado en seguridad web y análisis de vulnerabilidades.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {member.avatar}
              </div>
              <div>
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-blue-600">{member.points} puntos</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team; 