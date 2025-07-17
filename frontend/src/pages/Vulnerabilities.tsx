import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const Vulnerabilities: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Vulnerabilities</h1>
      <p className="text-lg text-gray-600 mb-8">Vulnerability management system coming soon</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-red-800 mb-2">🔍 Critical</h3>
          <p className="text-red-700 text-sm">High priority vulnerabilities</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">⚠️ High</h3>
          <p className="text-orange-700 text-sm">Important security issues</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">📊 Medium</h3>
          <p className="text-yellow-700 text-sm">Moderate risk vulnerabilities</p>
        </div>
      </div>
    </div>
  );
};

export default Vulnerabilities; 