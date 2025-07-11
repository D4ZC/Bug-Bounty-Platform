import React from 'react';

interface Team {
  name: string;
  score: number;
}

const TeamsScoreCard: React.FC<{ teams: Team[] }> = ({ teams }) => (
  <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 border border-blue-400 rounded-xl shadow-md p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-200">
    <h2 className="text-2xl font-bold text-blue-300 mb-2 text-center">Teams Score</h2>
    <p className="text-blue-100 text-center mb-1">¡Conoce a los mejores equipos!</p>
    <div className="flex justify-center mb-4">
      <span className="inline-block bg-blue-700/60 text-blue-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold">TOP 3 - Equipos</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-blue-100 text-sm">
        <thead>
          <tr>
            <th className="py-1 px-2 text-blue-400 font-semibold">#</th>
            <th className="py-1 px-2 text-blue-400 font-semibold">Equipo</th>
            <th className="py-1 px-2 text-blue-400 font-semibold">Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, i) => (
            <tr key={team.name} className="border-b border-blue-800 last:border-none">
              <td className="py-1 px-2 font-bold text-blue-300">{i + 1}</td>
              <td className="py-1 px-2 font-bold">{team.name}</td>
              <td className="py-1 px-2">{team.score} pts</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TeamsScoreCard; 