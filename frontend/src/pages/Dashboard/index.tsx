import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

// Componentes del Dashboard
import TeamsScoreCard from './components/TeamsScoreCard';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import UserScoreCard from './components/UserScoreCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 animate-in fade-in duration-300">
        {t('dashboard')}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Primera fila */}
        <div className="animate-in slide-in-from-left duration-300 delay-100">
          <TeamsScoreCard />
        </div>
        <div className="animate-in slide-in-from-left duration-300 delay-200">
          <MVPTeamCard />
        </div>
        <div className="animate-in slide-in-from-left duration-300 delay-300">
          <GulagCard />
        </div>
        
        {/* Segunda fila */}
        <div className="animate-in slide-in-from-left duration-300 delay-400">
          <UserScoreCard />
        </div>
        <div className="animate-in slide-in-from-left duration-300 delay-500">
          <MVPUserCard />
        </div>
        <div className="animate-in slide-in-from-left duration-300 delay-600">
          <UserProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 