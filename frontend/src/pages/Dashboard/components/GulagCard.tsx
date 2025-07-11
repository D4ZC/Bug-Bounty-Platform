import React from 'react';
import { useTranslation } from 'react-i18next';

interface GulagUser {
  name: string;
  score: number;
}

const GulagCard: React.FC<{ gulag: GulagUser[] }> = ({ gulag }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-br from-red-900/80 to-red-800/60 text-red-100 border border-red-500/50 rounded-xl shadow-lg p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-200 relative backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-red-300 mb-2 text-center">{t('Gulag')}</h2>
      <p className="text-red-100 text-center mb-1">{t('Gulag_description')}</p>
      <div className="flex justify-center mb-4">
        <span className="inline-block bg-red-700/60 text-red-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold">{t('Gulag_top_5_title')}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-red-100 text-sm">
          <thead>
            <tr>
              <th className="py-1 px-2 text-red-400 font-semibold">{t('Gulag_rank_header')}</th>
              <th className="py-1 px-2 text-red-400 font-semibold">{t('Gulag_player_header')}</th>
              <th className="py-1 px-2 text-red-400 font-semibold">{t('Gulag_score_header')}</th>
            </tr>
          </thead>
          <tbody>
            {gulag.map((user, i) => (
              <tr key={user.name} className="border-b border-red-700/50 last:border-none">
                <td className="py-1 px-2 font-bold text-red-300">{i + 1}</td>
                <td className="py-1 px-2 font-bold">{user.name}</td>
                <td className="py-1 px-2">{user.score} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Placeholder de imagen de fondo */}
      <div className="absolute right-4 top-4 w-20 h-16 bg-red-300 rounded shadow-inner opacity-40" />
    </div>
  );
};

export default GulagCard; 