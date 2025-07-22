import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Login: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a183d] via-[#1a0033] to-[#2d003e] font-mono">
      <div className="bg-[#181c2bcc] border-2 border-[#00fff7] rounded-2xl p-12 text-3xl font-extrabold text-[#00fff7] shadow-[0_0_32px_#00fff7] backdrop-blur-md animate-fade-in-up">
        Login Page
      </div>
    </div>
  );
};

export default Login; 