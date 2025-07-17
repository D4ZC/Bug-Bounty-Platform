import React from 'react';

interface User {
  name: string;
  score: number;
}

const UserScoreCard: React.FC<{ users: User[] }> = ({ users }) => (
  <div className="col-span-1 flex flex-col gap-2 min-h-[200px] bg-gradient-to-br from-black to-[#0ff0fc] border-2 border-[#00fff7] rounded-2xl p-6 font-mono text-[#00fff7] mx-auto w-full max-w-md">
    <h2 className="text-2xl font-bold mb-2">User Score</h2>
    <div className="font-bold mb-4">Top 3 Users</div>
    <ol className="mt-2 space-y-1">
      {users.map((user, idx) => (
        <li key={user.name} className="flex justify-between">
          <span>{idx + 1}. {user.name}</span>
          <span className="font-bold">{user.score} pts</span>
        </li>
      ))}
    </ol>
  </div>
);

export default UserScoreCard; 