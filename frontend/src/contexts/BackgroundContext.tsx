import React, { createContext, useContext, useEffect, useState } from 'react';

interface BackgroundContextType {
  backgroundUrl: string | null;
  setBackgroundUrl: (url: string) => void;
}

const BackgroundContext = createContext<BackgroundContextType>({
  backgroundUrl: null,
  setBackgroundUrl: () => {},
});

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [backgroundUrl, setBackgroundUrlState] = useState<string | null>(null);

  useEffect(() => {
    const url = localStorage.getItem('profile_selectedBackgroundUrl');
    if (url) setBackgroundUrlState(url);
  }, []);

  const setBackgroundUrl = (url: string) => {
    setBackgroundUrlState(url);
    localStorage.setItem('profile_selectedBackgroundUrl', url);
  };

  return (
    <BackgroundContext.Provider value={{ backgroundUrl, setBackgroundUrl }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext); 