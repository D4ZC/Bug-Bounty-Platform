import React, { useState } from 'react';
import { teams, users, getTopTeams, getTopUsers } from '@/data/usersData';

const tableHeight = 'max-h-[500px]';

const Score: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teams' | 'user'>('teams');

  return (
    <div className="score-page w-full h-full">
      <div className="flex items-center gap-4 mb-6 mt-0 ml-0">
        <button
          onClick={() => setActiveTab('teams')}
          className={`text-2xl font-semibold focus:outline-none ${activeTab === 'teams' ? 'text-blue-700' : 'text-gray-400'}`}
        >
          Score Teams
        </button>
        <span className="text-2xl font-semibold text-gray-400">|</span>
        <button
          onClick={() => setActiveTab('user')}
          className={`text-2xl font-semibold focus:outline-none ${activeTab === 'user' ? 'text-blue-700' : 'text-gray-400'}`}
        >
          Score User
        </button>
      </div>
      <div className="w-full flex justify-center">
        {activeTab === 'teams' && (
          <div className="overflow-x-auto w-full max-w-7xl mx-auto rounded-xl">
            <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-xl ${tableHeight}`}>
              <table className="w-full bg-white rounded-xl shadow">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left">Posición</th>
                    <th className="py-2 px-4 text-left">Equipo</th>
                    <th className="py-2 px-4 text-right">Puntuación</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => (
                    <tr key={team.name} className="border-t">
                      <td className="py-2 px-4">{idx + 1}</td>
                      <td className="py-2 px-4">{team.name}</td>
                      <td className="py-2 px-4 text-right font-bold">{team.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'user' && (
          <div className="overflow-x-auto w-full max-w-7xl mx-auto rounded-xl bg-white shadow">
            <table className="w-full rounded-xl">
              <thead className="bg-white sticky top-0 z-10">
                <tr>
                  <th className="py-2 px-4 text-left">Posición</th>
                  <th className="py-2 px-4 text-left">Usuario</th>
                  <th className="py-2 px-4 text-right">Puntuación</th>
                </tr>
              </thead>
            </table>
            <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-b-xl ${tableHeight}`}>
              <table className="w-full">
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.name} className="border-t">
                      <td className="py-2 px-4">{idx + 1}</td>
                      <td className="py-2 px-4">{user.name}</td>
                      <td className="py-2 px-4 text-right font-bold">{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Score; 