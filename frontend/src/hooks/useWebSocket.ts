import { useEffect, useRef, useCallback, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/hooks/useNotification';
import io, { Socket } from 'socket.io-client';

interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: string;
}

interface ChatMessage {
  _id: string;
  chatId: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    nickname: string;
    avatar?: string;
  };
  content: string;
  messageType: 'text' | 'image' | 'file' | 'system' | 'notification';
  timestamp: string;
  isEdited: boolean;
  isDeleted: boolean;
}

interface UserTyping {
  chatId: string;
  userId: string;
  isTyping: boolean;
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    nickname: string;
  };
}

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  timestamp: string;
  read: boolean;
}

interface WebSocketHook {
  // Estado de conexión
  isConnected: boolean;
  isConnecting: boolean;
  
  // Métodos de chat
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
  sendMessage: (chatId: string, content: string, messageType?: string, attachments?: any[], replyTo?: string) => void;
  startTyping: (chatId: string) => void;
  stopTyping: (chatId: string) => void;
  reactToMessage: (chatId: string, messageId: string, emoji: string) => void;
  markAsRead: (chatId: string) => void;
  
  // Métodos de notificaciones
  subscribeNotifications: () => void;
  unsubscribeNotifications: () => void;
  markNotificationRead: (notificationId: string) => void;
  
  // Métodos generales
  updateStatus: (status: string) => void;
  getOnlineUsers: () => void;
  
  // Eventos
  onChatMessage: (callback: (message: ChatMessage) => void) => void;
  onUserTyping: (callback: (data: UserTyping) => void) => void;
  onUserJoined: (callback: (data: any) => void) => void;
  onUserLeft: (callback: (data: any) => void) => void;
  onNotification: (callback: (notification: Notification) => void) => void;
  onRankingUpdate: (callback: (data: any) => void) => void;
  onNewChallenge: (callback: (challenge: any) => void) => void;
  onVulnerabilityResolved: (callback: (vulnerability: any) => void) => void;
  onGulagEvent: (callback: (data: any) => void) => void;
  onTeamEvent: (callback: (data: any) => void) => void;
  
  // Limpiar listeners
  clearListeners: () => void;
}

export const useWebSocket = (): WebSocketHook => {
  const { user, token } = useAuth();
  const { addNotification } = useNotification();
  
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const listenersRef = useRef<Map<string, Function[]>>(new Map());
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 1000; // 1 segundo

  // Función para agregar listeners
  const addListener = useCallback((event: string, callback: Function) => {
    if (!listenersRef.current.has(event)) {
      listenersRef.current.set(event, []);
    }
    listenersRef.current.get(event)!.push(callback);
  }, []);

  // Función para emitir eventos a todos los listeners
  const emitToListeners = useCallback((event: string, data: any) => {
    const listeners = listenersRef.current.get(event);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }, []);

  // Función para conectar al WebSocket
  const connect = useCallback(async () => {
    if (!user || !token || socketRef.current?.connected) {
      return;
    }

    setIsConnecting(true);

    try {
      const socket = io(process.env.VITE_BACKEND_URL || 'http://localhost:3001', {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling'],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: maxReconnectAttempts,
        reconnectionDelay: reconnectDelay,
        reconnectionDelayMax: 5000
      });

      socketRef.current = socket;

      // Eventos de conexión
      socket.on('connect', () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setIsConnecting(false);
        reconnectAttemptsRef.current = 0;
        addNotification('success', 'Conectado al servidor en tiempo real');
      });

      socket.on('disconnect', (reason) => {
        console.log('WebSocket disconnected:', reason);
        setIsConnected(false);
        setIsConnecting(false);
        
        if (reason === 'io server disconnect') {
          // El servidor desconectó, intentar reconectar
          socket.connect();
        }
      });

      socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
        setIsConnecting(false);
        
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++;
          setTimeout(() => {
            connect();
          }, reconnectDelay * reconnectAttemptsRef.current);
        } else {
          addNotification('error', 'Error de conexión con el servidor');
        }
      });

      // Eventos de chat
      socket.on('new_message', (message: ChatMessage) => {
        emitToListeners('chat_message', message);
        
        // Notificación si no es el usuario actual
        if (message.sender._id !== user._id) {
          addNotification('info', `Nuevo mensaje de ${message.sender.firstName}`);
        }
      });

      socket.on('user_typing', (data: UserTyping) => {
        emitToListeners('user_typing', data);
      });

      socket.on('user_joined_chat', (data) => {
        emitToListeners('user_joined', data);
      });

      socket.on('user_left_chat', (data) => {
        emitToListeners('user_left', data);
      });

      socket.on('message_edited', (data) => {
        emitToListeners('message_edited', data);
      });

      socket.on('message_deleted', (data) => {
        emitToListeners('message_deleted', data);
      });

      socket.on('message_reaction', (data) => {
        emitToListeners('message_reaction', data);
      });

      socket.on('messages_read', (data) => {
        emitToListeners('messages_read', data);
      });

      // Eventos de notificaciones
      socket.on('new_notification', (notification: Notification) => {
        emitToListeners('notification', notification);
        addNotification('info', notification.title);
      });

      socket.on('notifications_subscribed', () => {
        console.log('Subscribed to notifications');
      });

      socket.on('notifications_unsubscribed', () => {
        console.log('Unsubscribed from notifications');
      });

      socket.on('notification_marked_read', (data) => {
        emitToListeners('notification_read', data);
      });

      // Eventos generales
      socket.on('user_status_changed', (data) => {
        emitToListeners('user_status_changed', data);
      });

      socket.on('user_disconnected', (data) => {
        emitToListeners('user_disconnected', data);
      });

      socket.on('online_users', (data) => {
        emitToListeners('online_users', data);
      });

      // Eventos de la plataforma
      socket.on('ranking_updated', (data) => {
        emitToListeners('ranking_update', data);
        addNotification('info', 'Ranking actualizado');
      });

      socket.on('new_challenge', (challenge) => {
        emitToListeners('new_challenge', challenge);
        addNotification('success', `Nuevo reto: ${challenge.title}`);
      });

      socket.on('vulnerability_resolved', (vulnerability) => {
        emitToListeners('vulnerability_resolved', vulnerability);
        addNotification('success', `Vulnerabilidad resuelta: ${vulnerability.title}`);
      });

      socket.on('gulag_event', (data) => {
        emitToListeners('gulag_event', data);
        addNotification('warning', `Evento Gulag: ${data.event}`);
      });

      socket.on('team_event', (data) => {
        emitToListeners('team_event', data);
      });

      // Ping/Pong para mantener conexión
      socket.on('pong', (data) => {
        console.log('Pong received:', data);
      });

      // Error handling
      socket.on('chat_error', (error) => {
        addNotification('error', error.message);
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
        addNotification('error', 'Error en la conexión');
      });

    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      setIsConnecting(false);
      addNotification('error', 'Error al conectar con el servidor');
    }
  }, [user, token, addNotification, emitToListeners]);

  // Conectar cuando el usuario cambie
  useEffect(() => {
    if (user && token) {
      connect();
    } else {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setIsConnected(false);
      setIsConnecting(false);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user, token, connect]);

  // Métodos de chat
  const joinChat = useCallback((chatId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('join_chat', { chatId });
    }
  }, []);

  const leaveChat = useCallback((chatId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('leave_chat', { chatId });
    }
  }, []);

  const sendMessage = useCallback((chatId: string, content: string, messageType = 'text', attachments = [], replyTo?: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('send_message', {
        chatId,
        content,
        messageType,
        attachments,
        replyTo
      });
    }
  }, []);

  const startTyping = useCallback((chatId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('typing_start', { chatId });
    }
  }, []);

  const stopTyping = useCallback((chatId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('typing_stop', { chatId });
    }
  }, []);

  const reactToMessage = useCallback((chatId: string, messageId: string, emoji: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('react_to_message', {
        chatId,
        messageId,
        emoji
      });
    }
  }, []);

  const markAsRead = useCallback((chatId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('mark_as_read', { chatId });
    }
  }, []);

  // Métodos de notificaciones
  const subscribeNotifications = useCallback(() => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('subscribe_notifications');
    }
  }, []);

  const unsubscribeNotifications = useCallback(() => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('unsubscribe_notifications');
    }
  }, []);

  const markNotificationRead = useCallback((notificationId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('mark_notification_read', { notificationId });
    }
  }, []);

  // Métodos generales
  const updateStatus = useCallback((status: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('update_status', { status });
    }
  }, []);

  const getOnlineUsers = useCallback(() => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('get_online_users');
    }
  }, []);

  // Métodos para agregar listeners
  const onChatMessage = useCallback((callback: (message: ChatMessage) => void) => {
    addListener('chat_message', callback);
  }, [addListener]);

  const onUserTyping = useCallback((callback: (data: UserTyping) => void) => {
    addListener('user_typing', callback);
  }, [addListener]);

  const onUserJoined = useCallback((callback: (data: any) => void) => {
    addListener('user_joined', callback);
  }, [addListener]);

  const onUserLeft = useCallback((callback: (data: any) => void) => {
    addListener('user_left', callback);
  }, [addListener]);

  const onNotification = useCallback((callback: (notification: Notification) => void) => {
    addListener('notification', callback);
  }, [addListener]);

  const onRankingUpdate = useCallback((callback: (data: any) => void) => {
    addListener('ranking_update', callback);
  }, [addListener]);

  const onNewChallenge = useCallback((callback: (challenge: any) => void) => {
    addListener('new_challenge', callback);
  }, [addListener]);

  const onVulnerabilityResolved = useCallback((callback: (vulnerability: any) => void) => {
    addListener('vulnerability_resolved', callback);
  }, [addListener]);

  const onGulagEvent = useCallback((callback: (data: any) => void) => {
    addListener('gulag_event', callback);
  }, [addListener]);

  const onTeamEvent = useCallback((callback: (data: any) => void) => {
    addListener('team_event', callback);
  }, [addListener]);

  // Limpiar listeners
  const clearListeners = useCallback(() => {
    listenersRef.current.clear();
  }, []);

  return {
    isConnected,
    isConnecting,
    joinChat,
    leaveChat,
    sendMessage,
    startTyping,
    stopTyping,
    reactToMessage,
    markAsRead,
    subscribeNotifications,
    unsubscribeNotifications,
    markNotificationRead,
    updateStatus,
    getOnlineUsers,
    onChatMessage,
    onUserTyping,
    onUserJoined,
    onUserLeft,
    onNotification,
    onRankingUpdate,
    onNewChallenge,
    onVulnerabilityResolved,
    onGulagEvent,
    onTeamEvent,
    clearListeners
  };
}; 