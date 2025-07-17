import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-red-100 animate-in slide-in-from-top-2 duration-500">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('error_occurred') || 'Algo salió mal'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {t('error_description') || 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.'}
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                Detalles del error (solo desarrollo)
              </summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto max-h-32">
                {error.message}
              </pre>
            </details>
          )}
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={resetErrorBoundary}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {t('try_again') || 'Intentar de nuevo'}
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {t('go_home') || 'Ir al inicio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback; 