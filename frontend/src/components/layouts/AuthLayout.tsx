import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen font-mono transition-colors duration-500" style={{ background: 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
      {children}
    </div>
  );
};

export default AuthLayout; 