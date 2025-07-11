import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiBlastProps {
  trigger: boolean;
  type?: 'logro' | 'nivel' | 'canje' | 'exito';
  soundUrl?: string;
}

const confettiConfigs = {
  logro: {
    particleCount: 160,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#00fff7', '#ff00ea', '#fff200', '#22d3ee', '#a78bfa'],
    scalar: 1.2,
    angle: 90,
    ticks: 200,
  },
  nivel: {
    particleCount: 200,
    spread: 120,
    origin: { y: 0.7 },
    colors: ['#fff200', '#ff00ea', '#00fff7', '#facc15', '#a78bfa'],
    scalar: 1.3,
    angle: 60,
    ticks: 220,
  },
  canje: {
    particleCount: 120,
    spread: 80,
    origin: { y: 0.5 },
    colors: ['#22d3ee', '#a78bfa', '#facc15', '#ff00ea'],
    scalar: 1.1,
    angle: 120,
    ticks: 180,
  },
  exito: {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#00fff7', '#fff200', '#a78bfa'],
    scalar: 1.1,
    angle: 90,
    ticks: 160,
  },
};

const soundByType: Record<string, string> = {
  logro: '/success.mp3',
  nivel: '/levelup.mp3',
  canje: '/reward.mp3',
  exito: '/success.mp3',
};

const ConfettiBlast: React.FC<ConfettiBlastProps> = ({ trigger, type = 'logro', soundUrl }) => {
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (trigger && !hasPlayed.current) {
      hasPlayed.current = true;
      // Ráfaga central
      confetti(confettiConfigs[type]);
      // Ráfagas laterales para más espectacularidad
      setTimeout(() => confetti({ ...confettiConfigs[type], angle: 60, origin: { x: 0, y: 0.7 } }), 150);
      setTimeout(() => confetti({ ...confettiConfigs[type], angle: 120, origin: { x: 1, y: 0.7 } }), 300);
      // Sonido
      const url = soundUrl || soundByType[type] || '/success.mp3';
      if (url) {
        const audio = new Audio(url);
        audio.volume = 0.5;
        audio.play();
      }
      setTimeout(() => {
        hasPlayed.current = false;
      }, 1800);
    }
  }, [trigger, type, soundUrl]);

  return null;
};

export default ConfettiBlast; 