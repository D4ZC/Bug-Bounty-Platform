import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const NotFound: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      Not Found
    </div>
  );
};

export default NotFound; 