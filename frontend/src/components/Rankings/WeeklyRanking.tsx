import React from 'react';

const mockRanking = [
  {
    name: 'PlayerOne',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=PlayerOne',
    points: 180,
    rank: 1,
  },
  {
    name: 'CyberFox',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=CyberFox',
    points: 170,
    rank: 2,
  },
  {
    name: 'NeonWolf',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=NeonWolf',
    points: 150,
    rank: 3,
  },
  {
    name: 'Glitcher',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Glitcher',
    points: 120,
    rank: 4,
  },
  {
    name: 'ZeroDay',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=ZeroDay',
    points: 110,
    rank: 5,
  },
];

const medalColors = [
  'from-yellow-400 to-yellow-200', // Oro
  'from-gray-400 to-gray-200',     // Plata
  'from-orange-500 to-yellow-300', // Bronce
];

const WeeklyRanking: React.FC = () => {
  return (
    <div className="bg-black/60 rounded-3xl border-2 border-cyan-400 neon-shadow p-8 max-w-xl mx-auto shadow-cyber">
      <h2 className="text-3xl font-extrabold neon-text mb-6 text-center tracking-widest">Ranking Semanal</h2>
      <ol className="space-y-4">
        {mockRanking.map((user, idx) => (
          <li
            key={user.name}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-transform ${
              idx < 3
                ? `bg-gradient-to-r ${medalColors[idx]} shadow-cyber scale-105 animate-pulse`
                : 'bg-gray-900/60'
            }`}
          >
            <span className={`text-3xl font-extrabold w-8 text-center ${idx === 0 ? 'text-yellow-300' : idx === 1 ? 'text-gray-300' : idx === 2 ? 'text-orange-300' : 'text-cyan-200'}`}>{user.rank}</span>
            <img
              src={user.avatar}
              alt={user.name}
              className={`w-14 h-14 rounded-full border-4 ${
                idx === 0
                  ? 'border-yellow-300'
                  : idx === 1
                  ? 'border-gray-300'
                  : idx === 2
                  ? 'border-orange-300'
                  : 'border-cyan-400'
              } shadow-cyber bg-black`}
            />
            <span className="font-bold text-lg text-cyan-100 flex-1">{user.name}</span>
            <span className="font-mono text-xl text-pink-300">{user.points} pts</span>
            {idx < 3 && (
              <span className="ml-2 text-2xl animate-bounce">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
              </span>
            )}
          </li>
        ))}
      </ol>
      <style>{`
        .neon-text {
          color: #ff00ea;
          text-shadow: 0 0 8px #ff00ea, 0 0 16px #00fff7, 0 0 32px #00fff7;
        }
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
        .neon-shadow {
          box-shadow: 0 0 16px 2px #ff00ea, 0 0 32px 4px #00fff7, 0 0 8px #fff0;
        }
      `}</style>
    </div>
  );
};

export default WeeklyRanking; 