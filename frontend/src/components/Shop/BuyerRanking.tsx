import React from 'react';

interface Buyer {
  name: string;
  totalSpent: number;
  itemsPurchased: number;
  rank: number;
  avatar?: string;
}

interface BuyerRankingProps {
  buyers: Buyer[];
  currentUser?: string;
}

const BuyerRanking: React.FC<BuyerRankingProps> = ({ buyers, currentUser }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-600/50 border-yellow-400';
      case 2: return 'bg-gray-600/50 border-gray-400';
      case 3: return 'bg-orange-600/50 border-orange-400';
      default: return 'bg-purple-900/50 border-purple-400';
    }
  };

  return (
    <div className="bg-black/60 border-2 border-cyan-400 rounded-xl p-6 mb-8 shadow-cyber">
      <h3 className="text-2xl font-bold text-cyan-200 mb-4 text-center drop-shadow-cyber">
        🏆 Ranking de Compradores
      </h3>
      
      <div className="space-y-3">
        {buyers.map((buyer, index) => (
          <div
            key={buyer.name}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
              getRankColor(buyer.rank)
            } ${currentUser === buyer.name ? 'ring-2 ring-cyan-400 ring-opacity-50' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-white">
                {getRankIcon(buyer.rank)}
              </div>
              
              <div className="flex items-center gap-3">
                {buyer.avatar ? (
                  <img
                    src={buyer.avatar}
                    alt={buyer.name}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold">
                    {buyer.name.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    {buyer.name}
                    {currentUser === buyer.name && (
                      <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">
                        Tú
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-300">
                    {buyer.itemsPurchased} productos comprados
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xl font-bold text-yellow-300">
                {buyer.totalSpent.toLocaleString()}
              </div>
              <div className="text-sm text-gray-300">Blue Points</div>
            </div>
          </div>
        ))}
      </div>

      {/* Estadísticas del ranking */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-900/50 border border-purple-400 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-200">Total Compradores</div>
          <div className="text-2xl font-bold text-white">{buyers.length}</div>
        </div>
        
        <div className="bg-blue-900/50 border border-blue-400 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-200">Puntos Totales</div>
          <div className="text-2xl font-bold text-white">
            {buyers.reduce((sum, buyer) => sum + buyer.totalSpent, 0).toLocaleString()}
          </div>
        </div>
        
        <div className="bg-green-900/50 border border-green-400 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-200">Promedio por Usuario</div>
          <div className="text-2xl font-bold text-white">
            {buyers.length > 0 
              ? Math.round(buyers.reduce((sum, buyer) => sum + buyer.totalSpent, 0) / buyers.length).toLocaleString()
              : 0
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerRanking; 