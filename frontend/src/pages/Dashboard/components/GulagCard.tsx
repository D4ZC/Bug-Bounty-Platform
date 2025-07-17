import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const GulagCard: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('gulag')}</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
          <span className="font-medium">Player A</span>
          <span className="text-red-600 font-bold">Eliminated</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
          <span className="font-medium">Player B</span>
          <span className="text-orange-600 font-bold">Surviving</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
          <span className="font-medium">Player C</span>
          <span className="text-yellow-600 font-bold">Champion</span>
        </div>
      </div>
    </div>
  );
};

export default GulagCard; 