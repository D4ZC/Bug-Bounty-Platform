import React from 'react';
import { Tile } from '@carbon/react';

interface GulagUser {
  name: string;
  score: number;
}

const GulagCard: React.FC<{ gulag: GulagUser[] }> = ({ gulag }) => (
  <Tile className="dashboard-card col-span-1 min-h-[200px] bg-white flex flex-col border border-gray-200 rounded-xl shadow-sm relative p-5">
    <h2 className="text-2xl font-bold text-danger-700 text-center">Gulag</h2>
    <div className="font-bold text-danger-500 text-center">Top 5 Worst</div>
    <ol className="mt-2 text-center">
      {gulag.map((user, idx) => (
        <li key={user.name} className="flex justify-center space-x-4 text-gray-700">
          <span>{idx + 1}. {user.name}</span>
          <span>{user.score} pts</span>
        </li>
      ))}
    </ol>
  </Tile>
);

export default GulagCard; 