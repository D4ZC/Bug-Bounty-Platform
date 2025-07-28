import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  purchasedAt: Date;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  addToInventory: (item: Omit<InventoryItem, 'purchasedAt'>) => void;
  removeFromInventory: (itemId: string) => void;
  isInInventory: (itemId: string) => boolean;
  getInventoryByCategory: (category: string) => InventoryItem[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    // Productos de prueba para demostración
    {
      id: 'bg1',
      name: 'Galaxia',
      price: 300,
      image: '/src/assets/Galaxia.png',
      description: 'Fondo espacial espectacular con estrellas brillantes.',
      category: 'backgrounds',
      purchasedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
    },
    {
      id: 'an1',
      name: 'Avatar Ninja',
      price: 520,
      image: '/src/assets/Ninja2.png',
      description: 'Avatar animado ninja con movimientos fluidos.',
      category: 'animated',
      purchasedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
    },
    {
      id: 'bd1',
      name: 'Insignia Hacker',
      price: 150,
      image: 'https://via.placeholder.com/100x100/00BFFF/23263a?text=H',
      description: 'Insignia para expertos en seguridad.',
      category: 'badges',
      purchasedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 días atrás
    },
    {
      id: 'fr1',
      name: 'Marco Dorado',
      price: 200,
      image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Gold',
      description: 'Marco elegante dorado con detalles.',
      category: 'frames',
      purchasedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 días atrás
    },
    {
      id: 'mp1',
      name: 'Mini Hacker',
      price: 400,
      image: 'https://via.placeholder.com/120x120/23263a/00BFFF?text=Hacker',
      description: 'Miniperfil hacker con efectos de código.',
      category: 'miniprofiles',
      purchasedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 días atrás
    },
  ]);

  const addToInventory = (item: Omit<InventoryItem, 'purchasedAt'>) => {
    const newItem: InventoryItem = {
      ...item,
      purchasedAt: new Date(),
    };
    setInventory(prev => [...prev, newItem]);
  };

  const removeFromInventory = (itemId: string) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
  };

  const isInInventory = (itemId: string) => {
    return inventory.some(item => item.id === itemId);
  };

  const getInventoryByCategory = (category: string) => {
    return inventory.filter(item => item.category === category);
  };

  return (
    <InventoryContext.Provider value={{
      inventory,
      addToInventory,
      removeFromInventory,
      isInInventory,
      getInventoryByCategory,
    }}>
      {children}
    </InventoryContext.Provider>
  );
}; 