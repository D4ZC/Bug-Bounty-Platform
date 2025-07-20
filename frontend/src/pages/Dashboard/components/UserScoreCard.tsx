import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const UserScoreCard: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Datos simulados de usuarios con puntuaciones
  const topUsers = [
    { name: 'Alex Chen', points: 2840, rank: '🥇', color: 'bg-yellow-50', textColor: 'text-yellow-600' },
    { name: 'Maria Garcia', points: 2650, rank: '🥈', color: 'bg-gray-50', textColor: 'text-gray-600' },
    { name: 'David Kim', points: 2420, rank: '🥉', color: 'bg-orange-50', textColor: 'text-orange-600' },
    { name: 'Sarah Wilson', points: 2180, rank: '4', color: 'bg-blue-50', textColor: 'text-blue-600' },
    { name: 'Carlos Rodriguez', points: 1950, rank: '5', color: 'bg-green-50', textColor: 'text-green-600' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-gray-800 bg-yellow-100 mb-4 flex items-center gap-2">
        <span >🏆</span>
        {t('Top users') || 'Usuarios Destacados'}
      </h3>
      <div className="space-y-3">
        {topUsers.map((user, index) => (
          <div 
            key={user.name}
            className={`flex justify-between items-center p-3 ${user.color} rounded-lg hover:shadow-sm transition-shadow duration-200`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold">{user.rank}</span>
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
            <span className={`font-bold ${user.textColor}`}>
              {user.points.toLocaleString()} {t('points') || 'pts'}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          {t('') || 'Actualizado diariamente'}
        </p>
      </div>
    </div>
  );
};

export default UserScoreCard; 