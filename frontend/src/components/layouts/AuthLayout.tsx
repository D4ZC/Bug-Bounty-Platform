import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-500isDark ? 'bg-black' : 'bg-white'}`}>
      {children}
    </div>
  );
};

export default AuthLayout; 