import React, { useEffect, useRef, useState } from 'react';

interface XPProgressBarProps {
  xp: number;
  level: number;
  xpToNextLevel: number;
}

const XPProgressBar: React.FC<XPProgressBarProps> = ({ xp, level, xpToNextLevel }) => {
  const percent = Math.min((xp / xpToNextLevel) * 100, 100);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevPercent = useRef(percent);

  useEffect(() => {
    if (percent === 100 && prevPercent.current < 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    prevPercent.current = percent;
  }, [percent]);

  return (
    <div className="w-full my-4 relative">
      <div className="flex justify-between mb-1">
        <span className="text-cyan-300 font-bold">Nivel {level}</span>
        <span className="text-cyan-100 text-xs">{xp} / {xpToNextLevel} XP</span>
      </div>
      <div className="w-full bg-cyan-900 rounded-full h-4 shadow-inner relative overflow-hidden">
        <div
          className={`bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-4 rounded-full transition-all duration-700 animate-xp-bar ${percent === 100 ? 'xp-flash' : ''}`}
          style={{ width: `${percent}%` }}
        ></div>
        <div className="absolute right-2 top-0 text-xs text-cyan-200 font-bold drop-shadow-cyber">
          {percent === 100 ? '¡Sube de nivel!' : ''}
        </div>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Confeti simple SVG */}
            <svg width="100%" height="32" className="block">
              <circle cx="20" cy="16" r="4" fill="#fbbf24" />
              <circle cx="60" cy="8" r="3" fill="#a78bfa" />
              <circle cx="120" cy="20" r="2.5" fill="#22d3ee" />
              <circle cx="180" cy="12" r="3.5" fill="#f472b6" />
              <circle cx="240" cy="24" r="3" fill="#34d399" />
              <circle cx="300" cy="10" r="2" fill="#fbbf24" />
              <circle cx="360" cy="18" r="3" fill="#a78bfa" />
              <circle cx="420" cy="6" r="2.5" fill="#22d3ee" />
            </svg>
          </div>
        )}
      </div>
      <style>{`
        @keyframes xp-bar {
          0% { width: 0; }
          100% { width: ${percent}%; }
        }
        .animate-xp-bar {
          animation: xp-bar 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .xp-flash {
          box-shadow: 0 0 24px 8px #fbbf24, 0 0 48px 16px #a78bfa;
          filter: brightness(1.3) drop-shadow(0 0 8px #fbbf24);
          transition: box-shadow 0.3s, filter 0.3s;
        }
      `}</style>
    </div>
  );
};

export default XPProgressBar; 