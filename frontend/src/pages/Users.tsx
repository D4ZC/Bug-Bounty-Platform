import React, { useState } from 'react';

const users = [
  { name: 'Piteritos I', score: 2000, vulnerabilities: 15, rank: 1 },
  { name: 'Piteritos II', score: 1900, vulnerabilities: 12, rank: 2 },
  { name: 'Piteritos III', score: 1500, vulnerabilities: 8, rank: 3 },
  { name: 'D4ZC', score: 2200, vulnerabilities: 25, rank: 1 },
];

const notifications = [
  { id: 1, message: 'Nueva vulnerabilidad reportada', date: '2024-06-01', category: 'Vulnerabilidad' },
  { id: 2, message: 'Tu contribución fue aceptada', date: '2024-06-02', category: 'Contribución' },
  { id: 3, message: 'Nuevo mensaje del equipo', date: '2024-06-03', category: 'Mensaje' },
];

const Users: React.FC = () => (
  <div className="flex flex-col w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
    <h2 className="text-2xl font-bold mb-6">Usuarios / Users</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {users.map((user, idx) => (
        <div key={user.name} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <span className="text-2xl font-bold text-blue-600">{user.score} pts</span>
          </div>
          <div className="text-sm text-gray-600">
            <div>Rank: #{user.rank}</div>
            <div>Vulnerabilidades: {user.vulnerabilities}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Users; 