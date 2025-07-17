import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const MVPUserCard: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('mvp_user')}</h3>
      <div className="text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">👑</span>
        </div>
        <h4 className="font-semibold text-gray-900">John Doe</h4>
        <p className="text-sm text-gray-600">Most valuable player this week</p>
        <div className="mt-3 text-yellow-600 font-bold">1800 {t('points')}</div>
      </div>
    </div>
  );
};

export default MVPUserCard; 