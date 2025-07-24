import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <AlertTriangle className="w-16 h-16 text-danger-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            ¡Ups! Algo salió mal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Detalles del error:
            </h3>
            <pre className="text-sm text-gray-600 dark:text-gray-400 overflow-auto">
              {error.message}
            </pre>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full btn btn-primary flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Intentar de nuevo
          </button>
          
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full btn btn-outline flex items-center justify-center"
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