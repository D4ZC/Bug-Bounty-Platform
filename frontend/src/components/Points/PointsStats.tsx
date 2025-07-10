import React from 'react';

interface PointsStatsProps {
  totalPoints: number;
  pointsThisMonth: number;
  pointsThisWeek: number;
  rank: number;
}

const PointsStats: React.FC<PointsStatsProps> = ({ totalPoints, pointsThisMonth, pointsThisWeek, rank }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total de puntos */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-white mb-1">{totalPoints}</div>
        <div className="text-blue-100 text-sm">Total Blue Points</div>
        <div className="w-full bg-blue-800 rounded-full h-2 mt-2">
          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${Math.min((totalPoints / 1000) * 100, 100)}%` }}></div>
        </div>
      </div>

      {/* Puntos este mes */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-white mb-1">{pointsThisMonth}</div>
        <div className="text-purple-100 text-sm">Este Mes</div>
        <div className="w-full bg-purple-800 rounded-full h-2 mt-2">
          <div className="bg-pink-400 h-2 rounded-full" style={{ width: `${Math.min((pointsThisMonth / 500) * 100, 100)}%` }}></div>
        </div>
      </div>

      {/* Puntos esta semana */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-white mb-1">{pointsThisWeek}</div>
        <div className="text-green-100 text-sm">Esta Semana</div>
        <div className="w-full bg-green-800 rounded-full h-2 mt-2">
          <div className="bg-green-300 h-2 rounded-full" style={{ width: `${Math.min((pointsThisWeek / 200) * 100, 100)}%` }}></div>
        </div>
      </div>

      {/* Ranking */}
      <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-white mb-1">#{rank}</div>
        <div className="text-yellow-100 text-sm">Ranking Global</div>
        <div className="flex justify-center mt-2">
          {rank <= 3 ? (
            <span className="text-2xl">
              {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
            </span>
          ) : (
            <span className="text-yellow-300">⭐</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointsStats; 