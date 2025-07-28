import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PointsContextType {
  userPoints: number;
  addPoints: (points: number) => void;
  subtractPoints: (points: number) => void;
  setPoints: (points: number) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

interface PointsProviderProps {
  children: ReactNode;
}

export const PointsProvider: React.FC<PointsProviderProps> = ({ children }) => {
  const [userPoints, setUserPoints] = useState(5000); // Puntos iniciales aumentados

  const addPoints = (points: number) => {
    setUserPoints(prev => prev + points);
  };

  const subtractPoints = (points: number) => {
    setUserPoints(prev => Math.max(0, prev - points));
  };

  const setPoints = (points: number) => {
    setUserPoints(Math.max(0, points));
  };

  return (
    <PointsContext.Provider value={{
      userPoints,
      addPoints,
      subtractPoints,
      setPoints,
    }}>
      {children}
    </PointsContext.Provider>
  );
}; 