import React from 'react';

interface ToastProps {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const icons = {
  success: '🎉',
  error: '❌',
  info: 'ℹ️',
};

const Toast: React.FC<ToastProps> = ({ open, message, type, onClose }) => {
  if (!open) {
    return null;
  }
  return (
    <div className={`fixed top-8 right-8 z-50 flex items-center gap-4 px-6 py-4 rounded-2xl border-2 neon-shadow shadow-cyber font-extrabold text-lg animate-pop-in ${type === 'success' ? 'bg-gradient-to-r from-cyan-500 to-green-500 border-cyan-400 text-white' : type === 'error' ? 'bg-gradient-to-r from-pink-500 to-red-500 border-pink-400 text-white' : 'bg-gradient-to-r from-yellow-500 to-pink-500 border-yellow-400 text-white'}`}>
      <span className="text-2xl">{icons[type]}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white/80 hover:text-white text-xl font-bold">×</button>
      <style>{`
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
        .neon-shadow {
          box-shadow: 0 0 16px 2px #ff00ea, 0 0 32px 4px #00fff7, 0 0 8px #fff0;
        }
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(0.23, 1.12, 0.32, 1) both;
        }
      `}</style>
    </div>
  );
};

export default Toast; 