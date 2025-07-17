import React from 'react';
import { Tile } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  score: number;
}

const UserScoreCard: React.FC<{ users: User[] }> = ({ users }) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-1 flex flex-col gap-3 min-h-[160px] bg-white p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={() => navigate('/users')}>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">User Score</h2>
      <ol className="mt-1">
        {users.map((user, idx) => (
          <li key={user.name} className="flex justify-between text-gray-700 py-1">
            <span>{idx + 1}. {user.name}</span>
            <span className="font-medium">{user.score} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UserScoreCard; 