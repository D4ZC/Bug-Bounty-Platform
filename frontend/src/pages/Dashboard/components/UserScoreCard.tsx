import React from 'react';
import { useTranslation } from 'react-i18next';

interface User {
  name: string;
  score: number;
}

const UserScoreCard: React.FC<{ users: User[] }> = ({ users }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-br from-green-900/80 to-green-800/60 text-green-100 border border-green-500/50 rounded-xl shadow-lg p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-200 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-green-300 mb-2 text-center">{t('User Score')}</h2>
      <p className="text-green-100 text-center mb-1">{t('¡Los mejores jugadores individuales!')}</p>
      <div className="flex justify-center mb-4">
        <span className="inline-block bg-green-700/60 text-green-200 px-4 py-2 rounded-lg font-mono text-lg font-semibold">{t('TOP 3 - Usuarios')}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-green-100 text-sm">
          <thead>
            <tr>
              <th className="py-1 px-2 text-green-400 font-semibold">#</th>
              <th className="py-1 px-2 text-green-400 font-semibold">{t('Usuario')}</th>
              <th className="py-1 px-2 text-green-400 font-semibold">{t('Puntaje')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.name} className="border-b border-green-700/50 last:border-none">
                <td className="py-1 px-2 font-bold text-green-300">{i + 1}</td>
                <td className="py-1 px-2 font-bold">{user.name}</td>
                <td className="py-1 px-2">{user.score} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserScoreCard; 