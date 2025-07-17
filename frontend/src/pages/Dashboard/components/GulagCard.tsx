import React from 'react';

interface GulagUser {
  name: string;
  score: number;
}

const GulagCard: React.FC<{ gulag: GulagUser[] }> = ({ gulag }) => (
  <div className="col-span-1 min-h-[200px] bg-gradient-to-br from-black to-[#ff3b3b] flex flex-col border-2 border-[#ff3b3b] rounded-2xl p-6 font-mono text-[#ff3b3b] mx-auto w-full max-w-md">
    <h2 className="text-2xl font-bold mb-2">Gulag</h2>
    <div className="font-bold mb-4">Top 5 Worst</div>
    <ol className="mt-2 space-y-1">
      {gulag.map((user, idx) => (
        <li key={user.name} className="flex justify-between">
          <span>{idx + 1}. {user.name}</span>
          <span className="font-bold">{user.score} pts</span>
        </li>
      ))}
    </ol>
  </div>
);

export default GulagCard; 