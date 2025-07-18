import React from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  score: number;
}

const mockUsers: User[] = [
  { name: 'Piteritos I', score: 2000 },
  { name: 'Piteritos II', score: 1900 },
  { name: 'Piteritos III', score: 1500 },
];

const UserScoreCard: React.FC<{ users?: User[] }> = ({ users = mockUsers }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col gap-2 bg-[#181c24] rounded-xl shadow-lg border border-[#23273a] p-4">
      <h2 className="text-2xl font-extrabold text-[#4fc3f7] tracking-wide mb-1">RANKINGS</h2>
      <div className="font-bold text-[#bfcfff] text-base mb-2">Top 4 Users</div>
      <ol className="flex-1 flex flex-col gap-1">
        {users.slice(0, 4).map((user, idx) => (
          <li
            key={user.name}
            className={`flex justify-between items-center px-2 py-1 rounded-lg group transition-all duration-200 ${idx === 0 ? 'bg-gradient-to-r from-cyan-400/20 via-blue-100/10 to-blue-400/20 shadow-lg border-l-4 border-cyan-400' : 'hover:bg-[#23273a]/60'} cursor-pointer`}
            onClick={() => navigate(`/profile/${encodeURIComponent(user.name)}`)}
          >
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-base ${idx === 0 ? 'text-cyan-300 animate-pulse' : 'text-[#bfcfff]'}`}>{idx + 1}. {user.name}</span>
            </div>
            <span className={`font-bold text-lg ${idx === 0 ? 'text-cyan-200' : 'text-[#bfcfff]'}`}>{user.points} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UserScoreCard; 