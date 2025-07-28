import React, { createContext, useContext, useEffect, useState } from 'react';

interface BackgroundContextType {
  backgroundUrl: string | null;
  setBackgroundUrl: (url: string) => void;
  profileBackgroundUrl: string | null;
  setProfileBackgroundUrl: (url: string) => void;
}

const BackgroundContext = createContext<BackgroundContextType>({
  backgroundUrl: null,
  setBackgroundUrl: () => {},
  profileBackgroundUrl: null,
  setProfileBackgroundUrl: () => {},
});

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [backgroundUrl, setBackgroundUrlState] = useState<string | null>(null);
  const [profileBackgroundUrl, setProfileBackgroundUrlState] = useState<string | null>(null);

  useEffect(() => {
    const url = localStorage.getItem('profile_selectedBackgroundUrl');
    const profileUrl = localStorage.getItem('profile_background_url');
    if (url) setBackgroundUrlState(url);
    if (profileUrl) setProfileBackgroundUrlState(profileUrl);
    console.log('BackgroundContext loaded:', { backgroundUrl: url, profileBackgroundUrl: profileUrl });
  }, []);

  const setBackgroundUrl = (url: string) => {
    setBackgroundUrlState(url);
    localStorage.setItem('profile_selectedBackgroundUrl', url);
    console.log('Global background set to:', url);
  };

  const setProfileBackgroundUrl = (url: string) => {
    setProfileBackgroundUrlState(url);
    localStorage.setItem('profile_background_url', url);
    console.log('Profile background set to:', url);
  };

  return (
    <BackgroundContext.Provider value={{ 
      backgroundUrl, 
      setBackgroundUrl, 
      profileBackgroundUrl, 
      setProfileBackgroundUrl 
    }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext); 