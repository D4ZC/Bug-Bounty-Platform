import React from 'react';

interface GulagUserCardProps {
  avatar: string;
  name: string;
  vulnerabilities: number;
  isCurrentUser?: boolean;
  position: number;
}

const GulagUserCard: React.FC<GulagUserCardProps> = ({ avatar, name, vulnerabilities, isCurrentUser, position }) => {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border-2 ${isCurrentUser ? 'border-red-600 bg-red-900/30 animate-pulse' : 'border-gray-600 bg-gray-800/40'} mb-2 shadow-lg`}> 
      <span className={`font-bold text-lg w-6 text-center ${isCurrentUser ? 'text-red-400' : 'text-gray-400'}`}>{position}</span>
      <img src={avatar} alt={name} className={`w-10 h-10 rounded-full border-2 ${isCurrentUser ? 'border-red-500' : 'border-gray-400'}`} />
      <span className={`font-semibold ${isCurrentUser ? 'text-red-300' : 'text-white'}`}>{name}</span>
      <span className="ml-auto flex items-center gap-1 text-neon-green font-mono text-lg">
        {vulnerabilities} <span className="text-xs">VULN</span>
      </span>
      {isCurrentUser && <span className="ml-2 px-2 py-1 bg-red-700 text-white text-xs rounded">TÚ</span>}
    </div>
  );
};

export default GulagUserCard; 