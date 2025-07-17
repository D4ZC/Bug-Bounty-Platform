import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop</h1>
      <p className="text-lg text-gray-600 mb-8">Rewards and merchandise store</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🏆 Rewards</h3>
          <p className="text-green-700 text-sm">Redeem points for rewards</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">🎖️ Achievements</h3>
          <p className="text-blue-700 text-sm">Unlock special achievements</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">⭐ Premium</h3>
          <p className="text-purple-700 text-sm">Exclusive premium features</p>
        </div>
      </div>
    </div>
  );
};

export default Shop; 