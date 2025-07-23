import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userPoints: number;
  setUserPoints: (points: number) => void;
  boughtItems: any[];
  setBoughtItems: (items: any[]) => void;
}

const UserContext = createContext<UserContextType>({
  userPoints: 1200,
  setUserPoints: () => {},
  boughtItems: [],
  setBoughtItems: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userPoints, setUserPoints] = useState(1200);
  const [boughtItems, setBoughtItems] = useState<any[]>([]);

  return (
    <UserContext.Provider value={{ userPoints, setUserPoints, boughtItems, setBoughtItems }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 