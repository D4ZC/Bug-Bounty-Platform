import React from 'react';
import { Achievement } from '@/types';

interface AchievementCardProps {
  achievement: Achievement;
  highlight?: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, highlight }) => {
  return (
    <div
      className={`relative bg-gradient-to-br from-purple-800 via-blue-900 to-black rounded-2xl shadow-lg p-4 flex flex-col items-center transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 ${achievement.unlocked ? 'border-cyan-400' : 'border-gray-700 opacity-60 grayscale'} ${highlight ? 'animate-ach-pop' : ''}`}
      title={achievement.unlocked ? achievement.description : 'Desbloquea este logro para ver la descripción'}
    >
      <div className={`text-4xl mb-2 animate-pop-in ${highlight ? 'ach-glow' : ''}`}>{achievement.icon}</div>
      <h3 className="text-lg font-bold text-center mb-1 text-cyan-200 drop-shadow-cyber">{achievement.name}</h3>
      <p className="text-xs text-blue-100 text-center mb-2 min-h-[32px]">
        {achievement.unlocked ? achievement.description : '???'}
      </p>
      <span className="text-xs font-bold text-yellow-300 mb-1">{achievement.reward}</span>
      {achievement.unlocked && achievement.dateUnlocked && (
        <span className="text-xs text-green-300">{achievement.dateUnlocked}</span>
      )}
      {!achievement.unlocked && (
        <span className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full animate-pulse">Bloqueado</span>
      )}
      <style>{`
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-ach-pop {
          animation: ach-pop 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes ach-pop {
          0% { box-shadow: 0 0 0 0 #22d3ee88, 0 0 0 0 #fbbf24; }
          40% { box-shadow: 0 0 24px 8px #22d3ee88, 0 0 48px 16px #fbbf24; }
          100% { box-shadow: 0 0 0 0 #22d3ee00, 0 0 0 0 #fbbf2400; }
        }
        .ach-glow {
          filter: drop-shadow(0 0 8px #fbbf24) drop-shadow(0 0 16px #22d3ee);
        }
      `}</style>
    </div>
  );
};

export default AchievementCard; 