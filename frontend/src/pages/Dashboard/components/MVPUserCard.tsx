import React from 'react';
import { useTranslation } from 'react-i18next';

interface MVPUser {
  name: string;
  img: string;
  stats: any;
}

const MVPUserCard: React.FC<{ user: MVPUser }> = ({ user }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-br from-pink-900 via-pink-800 to-pink-950 border border-pink-400 rounded-xl shadow-md p-6 flex flex-col justify-between">
      <h3 className="text-2xl font-bold text-pink-300 mb-2 text-center">{t('MVP Usuario')}</h3>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-pink-700 mb-2" />
        <span className="text-pink-200 font-bold text-lg mb-1">{t(user.name)}</span>
        <span className="text-pink-100 text-xs">{user.stats.total} {t('puntos_abbr')}</span>
      </div>
    </div>
  );
};

export default MVPUserCard; 