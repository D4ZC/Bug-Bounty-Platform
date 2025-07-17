import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const MVP: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500isDark ? 'bg-black' : 'bg-white'}`}>
      MVP Page
    </div>
  );
};

export default MVP; 