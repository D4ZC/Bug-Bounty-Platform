import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a183d] via-[#1a0033] to-[#2d003e] font-mono px-4">
      <div className="max-w-md w-full text-center bg-[#181c2bcc] border-2 border-[#00fff7] rounded-2xl p-10 shadow-[0_0_32px_#00fff7] backdrop-blur-md animate-fade-in-up">
        <div className="mb-6">
          <AlertTriangle className="w-16 h-16 text-[#ff4fa3] mx-auto mb-4 animate-glow" />
          <h1 className="text-2xl font-bold text-[#00fff7] mb-2 font-mono drop-shadow-[0_0_8px_#00fff7]">
            ¡Ups! Algo salió mal
          </h1>
          <p className="text-[#00fff7] mb-6 font-mono">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
          </p>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-[#232b36]/80 rounded-lg text-left font-mono animate-fade-in-up">
            <h3 className="font-semibold text-[#00fff7] mb-2 font-mono">
              Detalles del error:
            </h3>
            <pre className="text-sm text-[#00fff7] overflow-auto font-mono">{error.message}</pre>
          </div>
        )}
        <div className="space-y-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full px-4 py-3 bg-[#00fff7] text-black font-bold rounded-lg hover:bg-[#39ff14] transition font-mono animate-glow flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Intentar de nuevo
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-4 py-3 border-2 border-[#00fff7] text-[#00fff7] font-bold rounded-lg hover:bg-[#00fff7] hover:text-black transition font-mono animate-glow flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback; 