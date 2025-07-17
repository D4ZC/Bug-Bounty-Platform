import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ShopItem {
  id: number;
  name: string;
  price: number;
  img: string;
  desc: string;
  category: 'fondo' | 'marco' | 'ticker';
}

export interface UserItems {
  purchased: ShopItem[];
  selected: {
    fondo?: ShopItem;
    marco?: ShopItem;
    sticker?: ShopItem;
  };
}

interface ShopContextType {
  userItems: UserItems;
  purchaseItem: (item: ShopItem) => void;
  selectItem: (item: ShopItem) => boolean; // returns true if replacement needed
  isItemPurchased: (itemId: number) => boolean;
  getSelectedItem: (category: 'fondo' | 'marco' | 'sticker') => ShopItem | undefined;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

interface ShopProviderProps {
  children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const [userItems, setUserItems] = useState<UserItems>({
    purchased: [],
    selected: {
      fondo: undefined,
      marco: undefined,
      sticker: undefined,
    },
  });

  const purchaseItem = (item: ShopItem) => {
    setUserItems(prev => ({
      ...prev,
      purchased: [...prev.purchased, item],
    }));
  };

  const selectItem = (item: ShopItem): boolean => {
    const currentSelected = userItems.selected[item.category];
    
    if (currentSelected && currentSelected.id !== item.id) {
      // Hay un ítem seleccionado diferente, necesita confirmación
      return true;
    }
    
    // No hay ítem seleccionado o es el mismo, aplicar directamente
    setUserItems(prev => ({
      ...prev,
      selected: {
        ...prev.selected,
        [item.category]: item
      }
    }));
    return false;
  };

  const isItemPurchased = (itemId: number): boolean => {
    return userItems.purchased.some(item => item.id === itemId);
  };

  const getSelectedItem = (category: 'fondo' | 'marco' | 'sticker'): ShopItem | undefined => {
    return userItems.selected[category];
  };

  const value: ShopContextType = {
    userItems,
    purchaseItem,
    selectItem,
    isItemPurchased,
    getSelectedItem
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}; 