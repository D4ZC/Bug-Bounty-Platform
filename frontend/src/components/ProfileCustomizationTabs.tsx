import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { label: 'Avatar', path: '/avatar-selection' },
  { label: 'Marco', path: '/frame-selection' },
  { label: 'Título', path: '/title-selection' },
  { label: 'Tarjeta de Vista', path: '/background-selection' },
];

function ProfileCustomizationTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 flex justify-center gap-2 z-20 relative">
      {tabs.map(tab => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`px-6 py-3 rounded-t-lg font-bold text-base border-b-4 transition-all duration-150
              ${isActive ? 'bg-cyan-800 text-cyan-100 border-cyan-400' : 'bg-gray-800 text-gray-400 border-transparent hover:bg-cyan-900/40'}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default ProfileCustomizationTabs; 