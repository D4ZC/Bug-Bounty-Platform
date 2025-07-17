import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Login: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen text-gray-90dark:text-gray-100 transition-colors duration-500 flex items-center justify-centerisDark ? 'bg-black' : 'bg-white'}`}>
      Login Page
    </div>
  );
};

export default Login; 