import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DuelContextType {
  isInDuel: boolean;
  isStartingDuel: boolean;
  countdown: number;
  duelTimer: number;
  showDuelTimer: boolean;
  joinDuel: () => void;
  leaveDuel: () => void;
}

const DuelContext = createContext<DuelContextType | undefined>(undefined);

export const useDuel = () => {
  const context = useContext(DuelContext);
  if (!context) {
    throw new Error('useDuel must be used within a DuelProvider');
  }
  return context;
};

interface DuelProviderProps {
  children: ReactNode;
}

export const DuelProvider: React.FC<DuelProviderProps> = ({ children }) => {
  const [isInDuel, setIsInDuel] = useState(() => {
    return localStorage.getItem('isInDuel') === 'true';
  });
  const [isStartingDuel, setIsStartingDuel] = useState(() => {
    return localStorage.getItem('isStartingDuel') === 'true';
  });
  const [countdown, setCountdown] = useState(() => {
    const saved = localStorage.getItem('countdown');
    return saved ? parseInt(saved) : 5;
  });
  const [duelTimer, setDuelTimer] = useState(() => {
    const saved = localStorage.getItem('duelTimer');
    return saved ? parseInt(saved) : 48 * 60 * 60;
  });
  const [showDuelTimer, setShowDuelTimer] = useState(() => {
    return localStorage.getItem('showDuelTimer') === 'true';
  });

  const joinDuel = () => {
    setIsInDuel(true);
    setIsStartingDuel(true);
    setCountdown(5);
    localStorage.setItem('isInDuel', 'true');
    localStorage.setItem('isStartingDuel', 'true');
    localStorage.setItem('countdown', '5');
  };

  const leaveDuel = () => {
    setIsInDuel(false);
    setIsStartingDuel(false);
    setShowDuelTimer(false);
    setDuelTimer(48 * 60 * 60);
    localStorage.removeItem('isInDuel');
    localStorage.removeItem('isStartingDuel');
    localStorage.removeItem('countdown');
    localStorage.removeItem('duelTimer');
    localStorage.removeItem('showDuelTimer');
  };

  // Efecto para el contador de inicio del duelo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isStartingDuel && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsStartingDuel(false);
            setShowDuelTimer(true);
            localStorage.setItem('isStartingDuel', 'false');
            localStorage.setItem('showDuelTimer', 'true');
            return 0;
          }
          const newCount = prev - 1;
          localStorage.setItem('countdown', newCount.toString());
          return newCount;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStartingDuel, countdown]);

  // Efecto para el timer del duelo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showDuelTimer && duelTimer > 0) {
      interval = setInterval(() => {
        setDuelTimer(prev => {
          const newTimer = prev - 1;
          localStorage.setItem('duelTimer', newTimer.toString());
          return newTimer;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showDuelTimer, duelTimer]);

  return (
    <DuelContext.Provider value={{
      isInDuel,
      isStartingDuel,
      countdown,
      duelTimer,
      showDuelTimer,
      joinDuel,
      leaveDuel
    }}>
      {children}
    </DuelContext.Provider>
  );
}; 