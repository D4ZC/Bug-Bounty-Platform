import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'info' | 'announcement' | 'challenge' | 'message' | 'documentation';
  title: string;
  detail: string;
  timestamp: Date;
  read: boolean;
  context: string;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: number) => void;
  deleteNotification: (id: number) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    // Notificaciones de prueba
    {
      id: Date.now() - 1000,
      type: 'info',
      title: 'Nueva vulnerabilidad reportada',
      detail: 'Se ha reportado una nueva vulnerabilidad en el sistema.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      context: 'Vulnerabilidades',
      link: '/vulnerabilities',
    },
    {
      id: Date.now() - 2000,
      type: 'success',
      title: 'Tu equipo ha subido de ranking',
      detail: '¡Felicidades! Tu equipo ha escalado posiciones en el ranking.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      context: 'Ranking',
      link: '/team',
    },
    {
      id: Date.now() - 3000,
      type: 'announcement',
      title: 'Tienes una recompensa pendiente',
      detail: 'Has ganado una recompensa por completar un desafío.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      context: 'Recompensas',
      link: '/shop',
    },
  ]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      deleteNotification,
      markAllAsRead,
      unreadCount,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}; 