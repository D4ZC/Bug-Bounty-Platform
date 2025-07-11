import React from 'react';

const LoadingSpinner: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 32, color = '#00fff7', className = '' }) => (
  <div
    className={`flex items-center justify-center ${className}`}
    style={{ width: size, height: size }}
    aria-label="Cargando..."
  >
    <svg
      className="animate-spin drop-shadow-cyber"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="#222"
        strokeWidth="6"
        opacity="0.2"
      />
      <path
        d="M45 25c0-11.046-8.954-20-20-20"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        className="neon-glow"
      />
    </svg>
    <style>{`
      .neon-glow {
        filter: drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color});
      }
      .drop-shadow-cyber {
        filter: drop-shadow(0 0 8px #00fff7) drop-shadow(0 0 2px #fff);
      }
    `}</style>
  </div>
);

export default LoadingSpinner;
