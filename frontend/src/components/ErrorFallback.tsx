import React from 'react';
import { useBackground } from '../contexts/BackgroundContext';

const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({ error, resetErrorBoundary }) => {
  const { backgroundUrl } = useBackground();
  
  return (
    <div className="min-h-screen flex items-center justify-center font-mono px-4" style={{ background: backgroundUrl ? `url(${backgroundUrl}) center/cover no-repeat` : 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
      <div className="bg-[#181c2bcc] border-2 border-[#ff3b3b] rounded-2xl p-8 text-center shadow-[0_0_32px_#ff3b3b] backdrop-blur-md animate-fade-in-up max-w-md">
        <h2 className="text-2xl font-extrabold text-[#ff3b3b] mb-4">¡Ups! Algo salió mal</h2>
        <p className="text-white mb-4 text-sm">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 bg-[#00fff7] text-black font-bold rounded-xl shadow-[0_0_8px_#00fff7] hover:bg-[#39ff14] hover:shadow-[0_0_16px_#39ff14] transition"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback; 