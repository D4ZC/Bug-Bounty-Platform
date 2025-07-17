import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const Team: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Team</h1>
      <p className="text-lg text-gray-600 mb-8">Team management and collaborations</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">👥 Members</h3>
          <p className="text-blue-700 text-sm">Member and role management</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-green-800 mb-2">📊 Analytics</h3>
          <p className="text-green-700 text-sm">Team metrics and statistics</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">🏆 Competitions</h3>
          <p className="text-purple-700 text-sm">Team competitions and events</p>
        </div>
      </div>
    </div>
  );
};

export default Team; 