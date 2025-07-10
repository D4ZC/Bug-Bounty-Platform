import React from 'react';

interface Reward {
  id: number;
  name: string;
  description: string;
  images: string[];
  cost: number;
  rarity: 'común' | 'raro' | 'épico' | 'legendario' | 'mítico';
  category: string;
}

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
}

const rarityStyles: Record<Reward['rarity'], string> = {
  'común': 'bg-gray-300 text-black',
  'raro': 'bg-blue-400 text-white animate-pulse',
  'épico': 'bg-purple-500 text-white animate-bounce',
  'legendario': 'bg-yellow-400 text-black animate-pulse',
  'mítico': 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white animate-spin-slow',
};

const rarityBorderStyles: Record<Reward['rarity'], string> = {
  'común': 'border-gray-400',
  'raro': 'border-blue-400 border-opacity-60',
  'épico': 'border-purple-400 border-opacity-70',
  'legendario': 'border-yellow-400 border-opacity-80',
  'mítico': 'border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-[2px]',
};

const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints }) => {
  const [imgIndex, setImgIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const canRedeem = userPoints >= reward.cost;

  // Carrousel simple
  const nextImg = () => setImgIndex((i) => (i + 1) % reward.images.length);
  const prevImg = () => setImgIndex((i) => (i - 1 + reward.images.length) % reward.images.length);

  const handleRedeem = () => {
    if (canRedeem) {
      // Aquí iría la lógica de canje
      alert(`¡Has canjeado ${reward.name} por ${reward.cost} Blue Points!`);
    }
  };

  const isLegendaryOrMythic = reward.rarity === 'legendario' || reward.rarity === 'mítico';

  return (
    <div 
      className={`relative bg-gradient-to-br from-purple-700 via-blue-800 to-black rounded-2xl shadow-xl p-4 flex flex-col items-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${rarityBorderStyles[reward.rarity]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efectos de partículas para items legendarios y míticos */}
      {isLegendaryOrMythic && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className={`absolute inset-0 ${reward.rarity === 'mítico' ? 'animate-pulse' : 'animate-bounce'} opacity-20`}>
            <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-4 right-4 w-1 h-1 bg-pink-400 rounded-full"></div>
            <div className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            <div className="absolute bottom-4 right-2 w-1 h-1 bg-yellow-300 rounded-full"></div>
          </div>
        </div>
      )}

      <div className="w-full h-40 bg-black rounded-xl mb-3 overflow-hidden flex items-center justify-center relative group">
        <img 
          src={reward.images[imgIndex]} 
          alt={reward.name} 
          className={`object-cover w-full h-full transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`} 
        />
        {reward.images.length > 1 && (
          <>
            <button 
              onClick={prevImg} 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70"
            >
              &#8592;
            </button>
            <button 
              onClick={nextImg} 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70"
            >
              &#8594;
            </button>
          </>
        )}
        {/* Indicadores de imagen */}
        {reward.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {reward.images.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${index === imgIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
              />
            ))}
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mb-1 text-center">{reward.name}</h2>
      <span className={`text-sm mb-2 px-3 py-1 rounded-full font-bold ${rarityStyles[reward.rarity]}`}>
        {reward.rarity.toUpperCase()}
      </span>
      <p className="text-sm text-blue-100 mb-3 text-center leading-relaxed">{reward.description}</p>
      <span className="font-bold text-lg mb-3 text-yellow-300">{reward.cost} Blue Points</span>
      
      <button
        onClick={handleRedeem}
        className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 transform ${
          canRedeem 
            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105 hover:shadow-lg' 
            : 'bg-gray-500 text-gray-300 cursor-not-allowed'
        } ${isHovered && canRedeem ? 'animate-pulse' : ''}`}
        disabled={!canRedeem}
      >
        {canRedeem ? '🎁 Canjear' : '❌ Insuficientes'}
      </button>

      {/* Efecto de brillo para items especiales */}
      {isLegendaryOrMythic && isHovered && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

export default RewardCard; 