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
  const { isLoggedIn, user } = useAuth();
  const token = localStorage.getItem('authToken');
  // const { addNotification } = useNotification(); // ELIMINADO para evitar ciclo
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  useEffect(() => {
    if (isLoggedIn && token) {
      socketService.connect(token);

      // Escuchar notificaciones generales
      socketService.onNotification((notification) => {
        if (user?.preferences?.notifications?.push) {
          setNotifications(prev => [notification, ...prev]);
          // Aquí podrías disparar una notificación global si lo necesitas
        }
      });

      // Escuchar actualizaciones de retos
      socketService.onChallengeUpdate((data) => {
        if (user?.preferences?.notifications?.challenges) {
          console.log('Actualización de reto:', data);
          // Aquí podrías disparar una notificación global si lo necesitas
        }
      });

      // Escuchar actualizaciones de vulnerabilidades
      socketService.onVulnerabilityUpdate((data) => {
        if (user?.preferences?.notifications?.push) {
          console.log('Actualización de vulnerabilidad:', data);
          // Aquí podrías disparar una notificación global si lo necesitas
        }
      });

      // Escuchar anuncios de MVP
      socketService.onMVPAnnouncement((data) => {
        if (user?.preferences?.notifications?.push) {
          console.log('Anuncio de MVP:', data);
          // Aquí podrías disparar una notificación global si lo necesitas
        }
      });

      // Escuchar actualizaciones de Gulag
      socketService.onGulagUpdate((data) => {
        if (user?.preferences?.notifications?.gulag) {
          console.log('Actualización de Gulag:', data);
          // Aquí podrías disparar una notificación global si lo necesitas
        }
      });

      // Escuchar actualizaciones de contribuciones
      socketService.onContributionUpdate((data) => {
        if (user?.preferences?.notifications?.push) {
          console.log('Actualización de contribución:', data);
          // Aquí podrías disparar una notificación global si lo necesitas
        }
      });

      // Escuchar actualizaciones de la tienda
      socketService.onShopUpdate((data) => {
        if (user?.preferences?.notifications?.push) {
          console.log('Actualización de tienda:', data);
          // Aquí podrías disparar una notificación global si lo necesitas
        }
      });

      // Escuchar anuncios del sistema
      socketService.onSystemAnnouncement((data) => {
        if (user?.preferences?.notifications?.push) {
          console.log('Anuncio del sistema:', data);
          // Aquí podrías disparar una notificación global si lo necesitas
        }
      });

      return () => {
        socketService.removeAllListeners();
        socketService.disconnect();
      };
    }
  }, [isLoggedIn, token, user]);

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