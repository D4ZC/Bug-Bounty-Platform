import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useTheme();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#1a0033] to-[#2d003e] font-mono transition-colors duration-500">
      {children}
    </div>
  );
};

export default AuthLayout; 