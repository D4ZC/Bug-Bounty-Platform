import React from 'react';
import UserScoreCard from './Dashboard/components/UserScoreCard';
import TeamsScoreCard from './Dashboard/components/TeamsScoreCard';
import { useTranslation } from 'react-i18next';

const Rankings: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2 bg-gradient-to-br from-[#181c24] via-[#23273a] to-[#181c24]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#4fc3f7] mb-10 tracking-wide drop-shadow-lg text-center">{t('Rankings')}</h1>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Ranking de Usuarios */}
        <div className="bg-[#181c24] border-2 border-[#23273a] rounded-2xl shadow-2xl p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-cyan-300 mb-6 tracking-wide">{t('User Rankings')}</h2>
          <UserScoreCard title={t('Rankings')} subtitle={t('Top 4 Users')} />
        </div>
        {/* Ranking de Equipos */}
        <div className="bg-[#181c24] border-2 border-[#23273a] rounded-2xl shadow-2xl p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-yellow-300 mb-6 tracking-wide">{t('Team Rankings')}</h2>
          <TeamsScoreCard title={t('Teams Score')} subtitle={t('Top 3 Teams')} />
        </div>
      </div>
    </div>
  );
};

export default Rankings; 