import React from 'react';

interface User {
  name: string;
  score: number;
}

const UserScoreCard: React.FC<{ users: User[] }> = ({ users }) => (
  <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-950 border border-green-400 rounded-xl shadow-md p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-200">
    <h2 className="text-2xl font-bold text-green-300 mb-2 text-center">User Score</h2>
    <p className="text-green-100 text-center mb-1">¡Los mejores jugadores individuales!</p>
    <div className="flex justify-center mb-4">
      <span className="inline-block bg-green-700/60 text-green-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold">TOP 3 - Usuarios</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-green-100 text-sm">
        <thead>
          <tr>
            <th className="py-1 px-2 text-green-400 font-semibold">#</th>
            <th className="py-1 px-2 text-green-400 font-semibold">Usuario</th>
            <th className="py-1 px-2 text-green-400 font-semibold">Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.name} className="border-b border-green-800 last:border-none">
              <td className="py-1 px-2 font-bold text-green-300">{i + 1}</td>
              <td className="py-1 px-2 font-bold">{user.name}</td>
              <td className="py-1 px-2">{user.score} pts</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserScoreCard; 