import React, { useState } from 'react';

const teams = [
  { name: 'Piteritos I', score: 2000, members: 5, vulnerabilities: 15 },
  { name: 'Piteritos II', score: 1900, members: 4, vulnerabilities: 12 },
  { name: 'Piteritos III', score: 1500, members: 3, vulnerabilities: 8 },
  { name: 'P-TECH', score: 1800, members: 6, vulnerabilities: 20 },
];

const Team: React.FC = () => (
  <div className="flex flex-col w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
    <h2 className="text-2xl font-bold mb-6">Equipos / Teams</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {teams.map((team, idx) => (
        <div key={team.name} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{team.name}</h3>
            <span className="text-2xl font-bold text-blue-600">{team.score} pts</span>
          </div>
          <div className="text-sm text-gray-600">
            <div>Miembros: {team.members}</div>
            <div>Vulnerabilidades: {team.vulnerabilities}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Team; 