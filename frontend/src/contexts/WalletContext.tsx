import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WalletContextType {
  coins: number;
  bluepoints: number;
  setCoins: (c: number) => void;
  setBluepoints: (b: number) => void;
  spendCoins: (amount: number) => void;
  spendBluepoints: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const COINS_KEY = 'wallet_coins';
const BLUEPOINTS_KEY = 'wallet_bluepoints';

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoinsState] = useState<number>(() => {
    localStorage.setItem(COINS_KEY, '1000');
    return 1000;
  });
  const [bluepoints, setBluepointsState] = useState<number>(() => {
    const saved = localStorage.getItem(BLUEPOINTS_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem(COINS_KEY, coins.toString());
  }, [coins]);
  useEffect(() => {
    localStorage.setItem(BLUEPOINTS_KEY, bluepoints.toString());
  }, [bluepoints]);

  // Sincronización entre pestañas
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === COINS_KEY && e.newValue) setCoinsState(parseInt(e.newValue, 10));
      if (e.key === BLUEPOINTS_KEY && e.newValue) setBluepointsState(parseInt(e.newValue, 10));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const setCoins = (c: number) => setCoinsState(c);
  const setBluepoints = (b: number) => setBluepointsState(b);
  const spendCoins = (amount: number) => setCoinsState(prev => Math.max(0, prev - amount));
  const spendBluepoints = (amount: number) => setBluepointsState(prev => Math.max(0, prev - amount));

  return (
    <WalletContext.Provider value={{ coins, bluepoints, setCoins, setBluepoints, spendCoins, spendBluepoints }}>
      {children}
    </WalletContext.Provider>
  );
};

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet debe usarse dentro de WalletProvider');
  return ctx;
} 