import React from 'react';
import { Tile } from '@carbon/react';

interface GulagUser {
  name: string;
  score: number;
}

const GulagCard: React.FC<{ gulag: GulagUser[] }> = ({ gulag }) => (
  <Tile className="col-span-1 min-h-[200px] bg-white flex flex-col border border-gray-200 rounded-xl shadow-sm relative">
    <h2 className="text-2xl font-bold text-danger-700">Gulag</h2>
    <div className="font-bold text-danger-500">Top 5 Worst</div>
    <ol className="mt-2">
      {gulag.map((user, idx) => (
        <li key={user.name} className="flex justify-between text-gray-700">
          <span>{idx + 1}. {user.name}</span>
          <span>{user.score} pts</span>
        </li>
      ))}
    </ol>
    {/* Placeholder de imagen de fondo */}
    <div className="absolute right-4 top-4 w-20 h-16 bg-gray-300 rounded shadow-inner opacity-40" />
  </Tile>
);

export default GulagCard; 