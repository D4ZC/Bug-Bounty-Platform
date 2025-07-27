import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useBackground } from '../../contexts/BackgroundContext';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useTheme();
  const { backgroundUrl } = useBackground();

  return (
    <div className="min-h-screen font-mono transition-colors duration-500" style={{ background: backgroundUrl ? `url(${backgroundUrl}) center/cover no-repeat` : 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
      {children}
    </div>
  );
};

export default AuthLayout; 