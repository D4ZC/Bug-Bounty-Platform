import React from 'react';
import { useTranslation } from 'react-i18next';

const MVPTeamCard: React.FC<{ team: string }> = ({ team }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-br from-purple-900/80 to-purple-800/60 text-purple-100 border border-purple-500/50 rounded-xl shadow-lg p-6 flex flex-col justify-between backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-purple-300 mb-2 text-center">{t('MVP Team')}</h2>
      <p className="text-purple-100 text-center mb-1">{t('El equipo más valioso del momento!')}</p>
      <div className="flex justify-center mb-4">
        <span className="inline-block bg-purple-700/60 text-purple-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold">{t('EQUIPO MVP')}</span>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-purple-300 mb-4">{team}</div>
        {/* Placeholder de pedestal */}
        <div className="w-24 h-12 bg-purple-300 rounded-b-full shadow-inner mx-auto" />
      </div>
    </div>
  );
};

export default MVPTeamCard; 