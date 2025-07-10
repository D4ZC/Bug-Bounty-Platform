import React from 'react';
import { Tile } from '@carbon/react';

interface GulagUser {
  name: string;
  score: number;
}

const GulagCard: React.FC<{ gulag: GulagUser[] }> = ({ gulag }) => (
  <Tile className="col-span-1 min-h-[200px] bg-[#282828] flex flex-col border border-gray-700 rounded-xl shadow-lg relative">
    <h2 className="text-2xl font-bold text-red-400">Gulag</h2>
    <div className="font-bold text-red-300">Top 5 Worst</div>
    <ol className="mt-2">
      {gulag.map((user, idx) => (
        <li key={user.name} className="flex justify-between text-gray-200">
          <span>{idx + 1}. {user.name}</span>
          <span className="text-red-300">{user.score} pts</span>
        </li>
      ))}
    </ol>
    {/* Placeholder de imagen de fondo */}
    <div className="absolute right-4 top-4 w-20 h-16 bg-gray-600 rounded shadow-inner opacity-40" />
  </Tile>
);

export default GulagCard; 