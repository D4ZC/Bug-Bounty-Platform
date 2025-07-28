import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BackgroundContextType {
  backgroundEnabled: boolean;
  setBackgroundEnabled: (enabled: boolean) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

interface BackgroundProviderProps {
  children: ReactNode;
}

export function BackgroundProvider({ children }: BackgroundProviderProps) {
  const [backgroundEnabled, setBackgroundEnabled] = useState(true);

  const value: BackgroundContextType = {
    backgroundEnabled,
    setBackgroundEnabled,
  };

  return <BackgroundContext.Provider value={value}>{children}</BackgroundContext.Provider>;
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground debe ser usado dentro de un BackgroundProvider');
  }
  return context;
} 