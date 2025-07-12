import React from 'react';

interface CollectionStatsProps {
  totalProducts: number;
  purchasedProducts: number;
  totalSpent: number;
  averageRarity: string;
  favoriteCategory: string;
}

const CollectionStats: React.FC<CollectionStatsProps> = ({
  totalProducts,
  purchasedProducts,
  totalSpent,
  averageRarity,
  favoriteCategory,
}) => {
  const completionPercentage = totalProducts > 0 ? (purchasedProducts / totalProducts) * 100 : 0;
  const progressColor = completionPercentage >= 80 ? 'bg-green-500' : 
                       completionPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-black/60 border-2 border-cyan-400 rounded-xl p-6 mb-8 shadow-cyber">
      <h3 className="text-2xl font-bold text-cyan-200 mb-4 text-center drop-shadow-cyber">
        📊 Estadísticas de Colección
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progreso de colección */}
        <div className="bg-purple-900/50 border border-purple-400 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-lg font-bold text-purple-200">Colección</div>
          <div className="text-2xl font-bold text-white">{purchasedProducts}/{totalProducts}</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${progressColor}`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-300 mt-1">{completionPercentage.toFixed(1)}%</div>
        </div>

        {/* Puntos gastados */}
        <div className="bg-blue-900/50 border border-blue-400 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-lg font-bold text-blue-200">Puntos Gastados</div>
          <div className="text-2xl font-bold text-white">{totalSpent.toLocaleString()}</div>
          <div className="text-sm text-gray-300 mt-1">Blue Points</div>
        </div>

        {/* Rareza promedio */}
        <div className="bg-yellow-900/50 border border-yellow-400 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-lg font-bold text-yellow-200">Rareza Promedio</div>
          <div className="text-2xl font-bold text-white">{averageRarity}</div>
          <div className="text-sm text-gray-300 mt-1">Calidad</div>
        </div>

        {/* Categoría favorita */}
        <div className="bg-green-900/50 border border-green-400 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-lg font-bold text-green-200">Categoría Favorita</div>
          <div className="text-xl font-bold text-white">{favoriteCategory}</div>
          <div className="text-sm text-gray-300 mt-1">Más comprada</div>
        </div>
      </div>

      {/* Logros de colección */}
      <div className="mt-6">
        <h4 className="text-lg font-bold text-cyan-200 mb-3">🏅 Logros de Colección</h4>
        <div className="flex flex-wrap gap-2">
          {purchasedProducts >= 5 && (
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              🥉 Coleccionista Novato
            </span>
          )}
          {purchasedProducts >= 10 && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              🥈 Coleccionista Experto
            </span>
          )}
          {purchasedProducts >= 20 && (
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              🥇 Maestro Coleccionista
            </span>
          )}
          {completionPercentage >= 100 && (
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              👑 Colección Completa
            </span>
          )}
          {totalSpent >= 5000 && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              💎 Gran Inversor
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionStats; 