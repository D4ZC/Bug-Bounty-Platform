import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useBackground } from '../contexts/BackgroundContext';

const NotFound: React.FC = () => {
  const { isDark } = useTheme();
  const { backgroundUrl } = useBackground();
  return (
    <div className="min-h-screen flex items-center justify-center font-mono" style={{ background: backgroundUrl ? `url(${backgroundUrl}) center/cover no-repeat` : 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
      <div className="bg-[#181c2bcc] border-2 border-[#00fff7] rounded-2xl p-12 text-4xl font-extrabold text-[#00fff7] shadow-[0_0_32px_#00fff7] backdrop-blur-md animate-fade-in-up text-center">
        404<br/>Página no encontrada
      </div>
    </div>
  );
};

export default NotFound; 