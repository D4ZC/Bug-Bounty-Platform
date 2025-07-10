import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Fondo base animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black animate-pulse" />
      
      {/* Partículas flotantes */}
      <div className="absolute inset-0">
        {/* Partículas grandes */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-pink-400 bg-opacity-20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-yellow-300 bg-opacity-15 rounded-full blur-2xl animate-bounce" />
        <div className="absolute top-2/3 right-1/2 w-24 h-24 bg-blue-400 bg-opacity-15 rounded-full blur-2xl animate-pulse" />
        
        {/* Partículas medianas */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-purple-400 bg-opacity-20 rounded-full blur-xl animate-bounce" />
        <div className="absolute bottom-1/3 left-2/3 w-20 h-20 bg-green-400 bg-opacity-15 rounded-full blur-xl animate-pulse" />
        
        {/* Partículas pequeñas */}
        <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-red-400 bg-opacity-30 rounded-full blur-lg animate-pulse" />
        <div className="absolute bottom-1/2 right-1/6 w-12 h-12 bg-orange-400 bg-opacity-25 rounded-full blur-lg animate-bounce" />
        <div className="absolute top-3/4 left-1/2 w-6 h-6 bg-cyan-400 bg-opacity-30 rounded-full blur-md animate-pulse" />
        
        {/* Efectos de ondas */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-10 animate-pulse" />
          <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-10 animate-bounce" />
        </div>
        
        {/* Efectos de destellos */}
        <div className="absolute top-1/6 right-1/4 w-2 h-2 bg-white rounded-full animate-ping" />
        <div className="absolute bottom-1/6 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping" />
        <div className="absolute top-1/2 left-1/8 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" />
      </div>
      
      {/* Overlay de gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30" />
    </div>
  );
};

export default AnimatedBackground; 