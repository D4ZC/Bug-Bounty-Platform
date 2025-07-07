import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import socketService from '@/services/socket';
import { Notification } from '@/types';

interface SocketContextType {
  isConnected: boolean;
  notifications: Notification[];
  clearNotifications: () => void;
  markAsRead: (notificationId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { isAuthenticated, token } = useAuth();
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  useEffect(() => {
    if (isAuthenticated && token) {
      socketService.connect(token);

      // Escuchar notificaciones
      socketService.onNotification((notification) => {
        setNotifications(prev => [notification, ...prev]);
      });

      // Escuchar actualizaciones de retos
      socketService.onChallengeUpdate((data) => {
        console.log('Actualización de reto:', data);
      });

      // Escuchar actualizaciones de vulnerabilidades
      socketService.onVulnerabilityUpdate((data) => {
        console.log('Actualización de vulnerabilidad:', data);
      });

      // Escuchar anuncios de MVP
      socketService.onMVPAnnouncement((data) => {
        console.log('Anuncio de MVP:', data);
      });

      // Escuchar actualizaciones de Gulag
      socketService.onGulagUpdate((data) => {
        console.log('Actualización de Gulag:', data);
      });

      // Escuchar actualizaciones de contribuciones
      socketService.onContributionUpdate((data) => {
        console.log('Actualización de contribución:', data);
      });

      // Escuchar actualizaciones de la tienda
      socketService.onShopUpdate((data) => {
        console.log('Actualización de tienda:', data);
      });

      // Escuchar anuncios del sistema
      socketService.onSystemAnnouncement((data) => {
        console.log('Anuncio del sistema:', data);
      });

      return () => {
        socketService.removeAllListeners();
        socketService.disconnect();
      };
    }
  }, [isAuthenticated, token]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification._id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const value: SocketContextType = {
    isConnected: socketService.connected,
    notifications,
    clearNotifications,
    markAsRead,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket debe ser usado dentro de un SocketProvider');
  }
  return context;
} 