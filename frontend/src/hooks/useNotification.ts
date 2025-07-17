import { useState, useCallback, useRef } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useAuth } from '@/contexts/AuthContext';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  timestamp: Date;
  isRead: boolean;
}

export interface UseNotificationReturn {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  markAsRead: (id: string) => void;
  unreadCount: number;
}

export const useNotification = (): UseNotificationReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isConnected } = useSocket();
  const { user } = useAuth();
  const notificationIdRef = useRef(0);

  const generateId = useCallback(() => {
    return `notification-${Date.now()}-${++notificationIdRef.current}`;
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      timestamp: new Date(),
      isRead: false,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Limitar el número de notificaciones en memoria
    if (notifications.length > 50) {
      setNotifications(prev => prev.slice(0, 50));
    }
  }, [generateId, notifications.length]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Escuchar notificaciones del socket cuando esté conectado
  React.useEffect(() => {
    if (isConnected && user) {
      // Aquí se conectarían los eventos de socket para recibir notificaciones
      // Por ejemplo:
      // socketService.onNotification((data) => {
      //   addNotification({
      //     type: data.type,
      //     title: data.title,
      //     message: data.message,
      //     duration: data.duration || 5000,
      //     action: data.action
      //   });
      // });
    }
  }, [isConnected, user, addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    markAsRead,
    unreadCount,
  };
}; 