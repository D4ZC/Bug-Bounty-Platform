import React from 'react';
import { Tile } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

interface GulagUser {
  name: string;
  score: number;
}

const GulagCard: React.FC<{ gulag: GulagUser[] }> = ({ gulag }) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-1 min-h-[160px] bg-white flex flex-col p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={() => navigate('/gulag')}>
      <h2 className="text-lg font-semibold text-danger-700 mb-1">Gulag</h2>
      <ol className="mt-1">
        {gulag.map((user, idx) => (
          <li key={user.name} className="flex justify-between text-gray-700 py-1">
            <span>{idx + 1}. {user.name}</span>
            <span>{user.score} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default GulagCard; 