import { Socket, io } from 'socket.io-client';
import { Notification, SocketEvent } from '@/types';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect(token: string) {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(
      import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000',
      {
        auth: {
          token,
        },
        transports: ['websocket', 'polling'],
        timeout: 20000,
      },
    );

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) { return; }

    this.socket.on('connect', () => {
      console.log('Socket conectado');
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket desconectado:', reason);
      this.isConnected = false;

      if (reason === 'io server disconnect') {
        // El servidor desconectó el socket
        this.socket?.connect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error de conexión del socket:', error);
      this.isConnected = false;

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.socket?.connect();
        }, this.reconnectDelay * this.reconnectAttempts);
      }
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('Socket reconectado después de', attemptNumber, 'intentos');
      this.isConnected = true;
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('Error de reconexión:', error);
    });

    this.socket.on('reconnect_failed', () => {
      console.error(
        'Falló la reconexión después de',
        this.maxReconnectAttempts,
        'intentos',
      );
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Métodos para emitir eventos
  joinRoom(room: string) {
    this.socket?.emit('join_room', { room });
  }

  leaveRoom(room: string) {
    this.socket?.emit('leave_room', { room });
  }

  // Métodos para escuchar eventos
  onNotification(callback: (notification: Notification) => void) {
    this.socket?.on('notification', callback);
  }

  onChallengeUpdate(callback: (data: any) => void) {
    this.socket?.on('challenge_update', callback);
  }

  onVulnerabilityUpdate(callback: (data: any) => void) {
    this.socket?.on('vulnerability_update', callback);
  }

  onMVPAnnouncement(callback: (data: any) => void) {
    this.socket?.on('mvp_announcement', callback);
  }

  onGulagUpdate(callback: (data: any) => void) {
    this.socket?.on('gulag_update', callback);
  }

  onContributionUpdate(callback: (data: any) => void) {
    this.socket?.on('contribution_update', callback);
  }

  onShopUpdate(callback: (data: any) => void) {
    this.socket?.on('shop_update', callback);
  }

  onSystemAnnouncement(callback: (data: any) => void) {
    this.socket?.on('system_announcement', callback);
  }

  // Métodos para remover listeners
  offNotification() {
    this.socket?.off('notification');
  }

  offChallengeUpdate() {
    this.socket?.off('challenge_update');
  }

  offVulnerabilityUpdate() {
    this.socket?.off('vulnerability_update');
  }

  offMVPAnnouncement() {
    this.socket?.off('mvp_announcement');
  }

  offGulagUpdate() {
    this.socket?.off('gulag_update');
  }

  offContributionUpdate() {
    this.socket?.off('contribution_update');
  }

  offShopUpdate() {
    this.socket?.off('shop_update');
  }

  offSystemAnnouncement() {
    this.socket?.off('system_announcement');
  }

  // Métodos para remover todos los listeners
  removeAllListeners() {
    this.socket?.removeAllListeners();
  }

  // Getters
  get connected() {
    return this.isConnected;
  }

  get socketInstance() {
    return this.socket;
  }
}

export const socketService = new SocketService();
export default socketService;
