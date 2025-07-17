import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const UserProfileCard: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>👤</span>
        {t('user_profile') || 'Perfil de Usuario'}
      </h3>
      <div className="text-center">
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt="avatar" 
            className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-blue-200"
          />
        ) : (
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl font-bold text-blue-600">
              {user.nickname?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
        )}
        <h4 className="font-semibold text-gray-900">{user.nickname}</h4>
        <p className="text-sm text-gray-600">{user.email}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-lg">{user.rangoIcon}</span>
          <span className="text-blue-600 font-bold">{user.rango}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {user.nombre} {user.apellidos}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard; 