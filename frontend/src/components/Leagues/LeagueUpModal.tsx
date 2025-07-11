import React from 'react';

interface LeagueUpModalProps {
  open: boolean;
  leagueName: string;
  leagueImage: string;
  onClose: () => void;
}

const LeagueUpModal: React.FC<LeagueUpModalProps> = ({ open, leagueName, leagueImage, onClose }) => {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in">
      {/* Partículas cyberpunk */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow-league" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#00fff7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="80%" cy="20%" r="300" fill="url(#cyberpunk-glow-league)" />
          <circle cx="20%" cy="80%" r="200" fill="url(#cyberpunk-glow-league)" />
        </svg>
      </div>
      <div className="relative bg-gradient-to-br from-[#1a0033] via-[#0f0026] to-[#1a0033] border-4 border-cyan-400 rounded-3xl shadow-cyber p-10 flex flex-col items-center max-w-md w-full animate-pop-in">
        <img src={leagueImage} alt={leagueName} className="w-32 h-32 object-contain mb-6 drop-shadow-cyber animate-bounce" />
        <h2 className="text-4xl font-extrabold neon-text mb-2 text-center">¡Felicidades!</h2>
        <p className="text-2xl font-bold text-cyan-200 mb-4 text-center">Has ascendido a la liga <span className="text-pink-400">{leagueName}</span></p>
        <button
          onClick={onClose}
          className="mt-6 px-8 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-lg border-2 border-cyan-400 neon-shadow transition-all drop-shadow-cyber"
        >
          Cerrar
        </button>
      </div>
      <style>{`
        .neon-text {
          color: #ff00ea;
          text-shadow: 0 0 8px #ff00ea, 0 0 16px #00fff7, 0 0 32px #00fff7;
        }
        .drop-shadow-cyber {
          filter: drop-shadow(0 0 8px #00fff7) drop-shadow(0 0 16px #a78bfa);
        }
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
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease both;
        }
      `}</style>
    </div>
  );
};

export default LeagueUpModal; 