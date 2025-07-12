import React from 'react';

interface SkeletonCardProps {
  count?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative bg-gradient-to-br from-purple-700/50 via-blue-800/50 to-black/50 rounded-2xl shadow-xl p-4 flex flex-col items-center animate-pulse"
        >
          {/* Skeleton para la imagen */}
          <div className="w-full h-40 bg-gray-600 rounded-xl mb-3 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 animate-pulse"></div>
          </div>

          {/* Skeleton para el título */}
          <div className="w-3/4 h-6 bg-gray-600 rounded mb-2 animate-pulse"></div>

          {/* Skeleton para la rareza */}
          <div className="w-20 h-6 bg-gray-600 rounded-full mb-2 animate-pulse"></div>

          {/* Skeleton para la descripción */}
          <div className="w-full space-y-1 mb-3">
            <div className="w-full h-3 bg-gray-600 rounded animate-pulse"></div>
            <div className="w-3/4 h-3 bg-gray-600 rounded animate-pulse"></div>
            <div className="w-1/2 h-3 bg-gray-600 rounded animate-pulse"></div>
          </div>

          {/* Skeleton para el precio */}
          <div className="w-24 h-6 bg-gray-600 rounded mb-3 animate-pulse"></div>

          {/* Skeleton para el botón */}
          <div className="w-full h-12 bg-gray-600 rounded-lg animate-pulse"></div>

          {/* Efecto de brillo */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 animate-pulse"></div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard; 