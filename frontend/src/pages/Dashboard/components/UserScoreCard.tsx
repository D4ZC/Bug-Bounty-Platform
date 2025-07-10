import React from 'react';
import { Tile } from '@carbon/react';

interface User {
  name: string;
  score: number;
}

const UserScoreCard: React.FC<{ users: User[] }> = ({ users }) => (
  <Tile className="col-span-1 flex flex-col gap-2 min-h-[200px] bg-[#282828] border border-gray-700 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-purple-400">User Score</h2>
    <div className="font-bold text-purple-300">Top 3 Users</div>
    <ol className="mt-2">
      {users.map((user, idx) => (
        <li key={user.name} className="flex justify-between text-gray-200">
          <span>{idx + 1}. {user.name}</span>
          <span className="font-semibold text-yellow-400">{user.score} pts</span>
        </li>
      ))}
    </ol>
  </Tile>
);

export default UserScoreCard; 