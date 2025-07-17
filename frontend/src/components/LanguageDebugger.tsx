import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageDebugger: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs z-50">
      <div className="font-bold mb-1">🌍 Language Debugger</div>
      <div>Current: <span className="text-yellow-300">{language}</span></div>
      <div>Welcome: <span className="text-green-300">{t('welcome')}</span></div>
      <div>Settings: <span className="text-green-300">{t('settings')}</span></div>
      <div className="text-gray-400 mt-1">
        localStorage: {localStorage.getItem('i18nextLng') || 'none'}
      </div>
    </div>
  );
};

export default LanguageDebugger; 