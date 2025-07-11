import React from 'react';
import { useTranslation } from 'react-i18next';

interface Team {
  name: string;
  score: number;
}

const TeamsScoreCard: React.FC<{ teams: Team[] }> = ({ teams }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-br from-green-900/80 to-green-800/60 text-green-100 border border-green-500/50 rounded-xl shadow-lg p-6 flex flex-col justify-between backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-green-300 mb-2 text-center">{t('Ranking Equipos')}</h3>
      <table className="w-full text-green-100 text-sm">
        <thead>
          <tr>
            <th className="py-1 px-2 text-green-400 font-semibold">#</th>
            <th className="py-1 px-2 text-green-400 font-semibold">{t('Equipo')}</th>
            <th className="py-1 px-2 text-green-400 font-semibold">{t('Puntaje')}</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, i) => (
            <tr key={team.name} className="border-b border-green-700/50 last:border-none">
              <td className="py-1 px-2 font-bold text-green-300">{i + 1}</td>
              <td className="py-1 px-2 font-bold">{team.name}</td>
              <td className="py-1 px-2">{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsScoreCard; 