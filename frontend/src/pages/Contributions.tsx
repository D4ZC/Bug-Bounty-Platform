import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Contributions: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500isDark ? 'bg-black' : 'bg-white'}`}>
      Contributions Page
    </div>
  );
};

export default Contributions; 