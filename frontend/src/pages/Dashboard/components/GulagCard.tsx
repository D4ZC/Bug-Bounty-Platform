import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GulagUser {
  name: string;
  score: number;
}

const mockGulag: GulagUser[] = [
  { name: 'deivid', score: 50 },
  { name: 'runrun', score: 25 },
  { name: 'excel', score: 20 },
  { name: 'kick ass', score: 20 },
  { name: 'pedrito sola', score: 10 },
];

const GulagCard: React.FC<{ gulag?: GulagUser[] }> = ({ gulag = mockGulag }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col gap-2 bg-[#181c24] rounded-xl shadow-lg border-2 border-red-700 p-4">
      <h2 className="text-2xl font-extrabold text-red-500 tracking-wide mb-1">Gulag</h2>
      <div className="font-bold text-red-400 text-base mb-2">Top 5 Worst</div>
      <ol className="flex-1 flex flex-col gap-1">
        {gulag.map((user, idx) => (
          <li
            key={user.name}
            className={`flex justify-between items-center px-2 py-1 rounded-lg group transition-all duration-200 ${idx === 0 ? 'bg-gradient-to-r from-red-700/40 via-red-400/10 to-red-700/40 shadow-lg border-l-4 border-red-500 animate-pulse' : 'hover:bg-[#23273a]/60'} cursor-pointer`}
            onClick={() => navigate(`/profile/${encodeURIComponent(user.name)}`)}
          >
            <span className={`font-bold text-base ${idx === 0 ? 'text-red-300' : 'text-red-200'}`}>{idx + 1}. {user.name}</span>
            <span className={`font-bold text-lg ${idx === 0 ? 'text-red-100' : 'text-red-300'}`}>{user.points !== undefined ? user.points : user.score} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default GulagCard; 