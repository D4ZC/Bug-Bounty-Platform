import React from 'react';

interface PodiumItem {
  name: string;
  avatar?: string; // opcional, por si luego se usa imagen
}

interface PodiumProps {
  items: PodiumItem[]; // Deben ser exactamente 3 elementos
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .join('')
    .slice(0, 2);
}

const heights = ['h-20 md:h-28', 'h-28 md:h-36', 'h-16 md:h-24']; // 2° 1° 3°
const translateY = ['translate-y-4', '', 'translate-y-8']; // 2° 1° 3°
const bgColors = ['bg-gray-200', 'bg-yellow-300', 'bg-orange-200'];

const Podium: React.FC<PodiumProps> = ({ items }) => {
  if (items.length < 3) return null;
  // Orden: 2° (izq), 1° (centro), 3° (der)
  const [second, first, third] = items;
  const podium = [second, first, third];
  return (
    <div className="flex justify-center items-end gap-2 md:gap-6 w-full mb-8">
      {podium.map((item, idx) => (
        <div
          key={item.name}
          className={`flex flex-col items-center w-20 md:w-32 ${translateY[idx]}`}
        >
          <div
            className={`rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold mb-2 ${bgColors[idx]} w-16 h-16 md:w-24 md:h-24 border-4 border-white shadow-lg`}
          >
            {getInitials(item.name)}
          </div>
          <div
            className={`w-full flex flex-col items-center justify-end ${heights[idx]} bg-gradient-to-t from-gray-200 to-white rounded-t-xl shadow-md`}
          >
            <span className="text-lg md:text-xl font-semibold text-gray-700 mt-2 text-center truncate w-full">
              {item.name}
            </span>
            <span className="text-xs text-gray-500 font-bold mt-1">
              {idx === 0 ? '2°' : idx === 1 ? '1°' : '3°'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Podium; 