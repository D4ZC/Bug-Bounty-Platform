import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Eliminado el título y subtítulo */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-in slide-in-from-top-2 duration-500 delay-200">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout; 