import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications</h1>
      <p className="text-lg text-gray-600 mb-8">Real-time notification system</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">⚡ Real-time</h3>
          <p className="text-blue-700 text-sm">Instant alerts and updates</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-green-800 mb-2">📧 Email</h3>
          <p className="text-green-700 text-sm">Email notifications</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">⚙️ Settings</h3>
          <p className="text-purple-700 text-sm">Customize your preferences</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
