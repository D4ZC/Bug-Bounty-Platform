import React from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useRef } from 'react';

interface Reward {
  id: number;
  name: string;
  description: string;
  images: string[];
  cost: number;
  rarity: 'común' | 'raro' | 'épico' | 'legendario' | 'mítico';
  category: string;
  featured?: boolean;
  stock?: number; // Agregar stock
}

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onBuy?: () => void;
  isLoading?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

const rarityStyles: Record<Reward['rarity'], string> = {
  común: 'bg-gray-300 text-black',
  raro: 'bg-blue-400 text-white animate-pulse',
  épico: 'bg-purple-500 text-white animate-bounce',
  legendario: 'bg-yellow-400 text-black animate-pulse',
  mítico:
    'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white animate-spin-slow',
};

const rarityBorderStyles: Record<Reward['rarity'], string> = {
  común: 'border-gray-400',
  raro: 'border-blue-400 border-opacity-60',
  épico: 'border-purple-400 border-opacity-70',
  legendario: 'border-yellow-400 border-opacity-80',
  mítico:
    'border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-[2px]',
};

const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, onBuy, isLoading, onSuccess, onError }) => {
  const [imgIndex, setImgIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [animateConfetti, setAnimateConfetti] = React.useState(false);
  const [animateShake, setAnimateShake] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
  const canRedeem = userPoints >= reward.cost;
  const hasStock = (reward.stock || 0) > 0;
  const isLowStock = (reward.stock || 0) <= 3 && (reward.stock || 0) > 0;
  const isOutOfStock = (reward.stock || 0) <= 0;
  const confettiRef = useRef<HTMLDivElement>(null);

  // Carrousel simple
  const nextImg = () => setImgIndex((i) => (i + 1) % reward.images.length);
  const prevImg = () =>
    setImgIndex((i) => (i - 1 + reward.images.length) % reward.images.length);

  const handleRedeem = async () => {
    if (!hasStock) {
      setAnimateShake(true);
      onError && onError();
      setTimeout(() => setAnimateShake(false), 600);
      return;
    }
    
    if (canRedeem) {
      if (onBuy) {
        await onBuy();
        setAnimateConfetti(true);
        onSuccess && onSuccess();
        setTimeout(() => setAnimateConfetti(false), 1200);
      } else {
        alert(`¡Has canjeado ${reward.name} por ${reward.cost} Blue Points!`);
      }
    } else {
      setAnimateShake(true);
      onError && onError();
      setTimeout(() => setAnimateShake(false), 600);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const isLegendaryOrMythic
    = reward.rarity === 'legendario' || reward.rarity === 'mítico';

  return (
    <>
      <div
        className={`relative bg-gradient-to-br from-purple-700 via-blue-800 to-black rounded-2xl shadow-xl p-4 flex flex-col items-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${rarityBorderStyles[reward.rarity]} ${animateShake ? 'animate-shake-x' : ''} ${isOutOfStock ? 'opacity-60 grayscale' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Confetti animación */}
        {animateConfetti && (
          <div ref={confettiRef} className="absolute inset-0 pointer-events-none z-20 animate-confetti">
            {[...Array(18)].map((_, i) => (
              <span key={i} className={`confetti-piece confetti-${i % 6}`}></span>
            ))}
          </div>
        )}

        {/* Badge Destacado */}
        {reward.featured && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-insignia z-10 border border-yellow-300 animate-pulse">Destacado</span>
        )}

        {/* Badge de Stock */}
        {isOutOfStock && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-insignia z-10 border border-red-300 animate-pulse">AGOTADO</span>
        )}
        
        {isLowStock && !isOutOfStock && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-insignia z-10 border border-orange-300 animate-pulse">¡ÚLTIMOS!</span>
        )}

        {/* Indicador de stock */}
        {!isOutOfStock && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-insignia z-10 border border-green-300">
            Stock: {reward.stock}
          </span>
        )}

        {/* Efectos de partículas para items legendarios y míticos */}
        {isLegendaryOrMythic && (
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div
              className={`absolute inset-0 ${reward.rarity === 'mítico' ? 'animate-pulse' : 'animate-bounce'} opacity-20`}
            >
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
            loading="lazy"
            width={240}
            height={160}
            className={`object-cover w-full h-full transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'} ${isOutOfStock ? 'filter grayscale' : ''}`}
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

        <h2 
          className="text-xl font-bold mb-1 text-center cursor-help"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {reward.name}
        </h2>
        
        <span
          className={`text-sm mb-2 px-3 py-1 rounded-full font-bold ${rarityStyles[reward.rarity]}`}
        >
          {reward.rarity.toUpperCase()}
        </span>
        
        <p className="text-sm text-blue-100 mb-3 text-center leading-relaxed">
          {reward.description}
        </p>
        
        <span className="font-bold text-lg mb-3 text-yellow-300">
          {reward.cost} Blue Points
        </span>

        <button
          onClick={handleRedeem}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 transform ${
            canRedeem && hasStock
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105 hover:shadow-lg'
              : !hasStock
              ? 'bg-red-500 text-white cursor-not-allowed'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          } ${isHovered && canRedeem && hasStock ? 'animate-pulse' : ''} flex items-center justify-center gap-2`}
          disabled={!canRedeem || isLoading || !hasStock}
        >
          {isLoading ? (
            <LoadingSpinner size={20} />
          ) : !hasStock ? (
            '❌ Agotado'
          ) : canRedeem ? (
            '🎁 Canjear'
          ) : (
            '❌ Insuficientes'
          )}
        </button>

        {/* Efecto de brillo para items especiales */}
        {isLegendaryOrMythic && isHovered && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse pointer-events-none" />
        )}

        {/* Overlay de agotado */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">😔</div>
              <div className="font-bold text-lg">Agotado</div>
              <div className="text-sm">Vuelve más tarde</div>
            </div>
          </div>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="fixed z-50 bg-black/90 border-2 border-cyan-400 rounded-lg p-3 text-white text-sm max-w-xs shadow-cyber pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="font-bold text-cyan-200 mb-1">{reward.name}</div>
          <div className="text-gray-300">{reward.description}</div>
          <div className="mt-2 text-yellow-300 font-bold">{reward.cost} Blue Points</div>
          <div className="text-xs text-gray-400 mt-1">
            Categoría: {reward.category} | Rareza: {reward.rarity}
          </div>
        </div>
      )}

      <style>{`
        .shadow-insignia {
          box-shadow: 0 2px 8px 0 #2228, 0 1.5px 0 #fff4 inset;
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s infinite;
        }
        @keyframes pulse-soft {
          0%, 100% { box-shadow: 0 0 0 0 #22d3ee44; }
          50% { box-shadow: 0 0 12px 4px #22d3ee44; }
        }
        .animate-shake-x {
          animation: shake-x 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake-x {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
        .animate-confetti {
          animation: confetti-burst 1.2s cubic-bezier(.4,0,.2,1);
        }
        @keyframes confetti-burst {
          0% { opacity: 0; transform: scale(0.7); }
          10% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1.2); }
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 18px;
          border-radius: 2px;
          opacity: 0.8;
        }
        .confetti-0 { left: 10%; top: 20%; background: #00fff7; transform: rotate(-12deg); }
        .confetti-1 { left: 20%; top: 40%; background: #ff00ea; transform: rotate(8deg); }
        .confetti-2 { left: 30%; top: 10%; background: #fff200; transform: rotate(-6deg); }
        .confetti-3 { left: 40%; top: 30%; background: #00ffae; transform: rotate(14deg); }
        .confetti-4 { left: 50%; top: 15%; background: #ff6b00; transform: rotate(-8deg); }
        .confetti-5 { left: 60%; top: 35%; background: #00bfff; transform: rotate(10deg); }
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
      `}</style>
    </>
  );
};

export default RewardCard;
