import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const TeamsScoreCard: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4 bg-blue-100">{t('Teams score')}</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="font-medium">Team Alpha</span>
          <span className="text-blue-600 font-bold">1500 {t('points')}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span className="font-medium">Team Beta</span>
          <span className="text-green-600 font-bold">1200 {t('points')}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
          <span className="font-medium">Team Gamma</span>
          <span className="text-purple-600 font-bold">900 {t('points')}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamsScoreCard; 