const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const logService = require('./services/logService');

class SocketServer {
  constructor() {
    this.io = null;
    this.connectedUsers = new Map(); // userId -> socket
    this.userRooms = new Map(); // userId -> Set of room names
  }

  initialize(server) {
    this.io = socketIo(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      },
      transports: ['websocket', 'polling']
    });

    // Middleware de autenticación
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
          return next(new Error('Token no proporcionado'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // En el middleware de autenticación de socket.io, reemplazar la lógica de búsqueda de usuario por un mock:
        // En vez de buscar en la base de datos, simular un usuario válido:
        socket.userId = 'mockUserId';
        socket.user = { _id: 'mockUserId', firstName: 'Mock', lastName: 'User', nickname: 'mockuser', avatar: '', role: 'user', isActive: true };
        next();
      } catch (error) {
        console.error('Socket authentication error:', error);
        next(new Error('Autenticación fallida'));
      }
    });

    this.setupEventHandlers();
    console.log('WebSocket server initialized');
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.userId} (${socket.user.nickname})`);
      
      // Agregar a usuarios conectados
      this.connectedUsers.set(socket.userId, socket);
      this.userRooms.set(socket.userId, new Set());

      // Unirse a sala personal del usuario
      socket.join(`user_${socket.userId}`);
      
      // Unirse a sala global
      socket.join('global');

      // Log de conexión
      logService.userLog('SOCKET_CONNECT', socket.userId, null, null, null, {
        socketId: socket.id,
        userAgent: socket.handshake.headers['user-agent']
      });

      // Eventos de notificaciones
      this.setupNotificationEvents(socket);
      
      // Eventos de actividad general
      this.setupGeneralEvents(socket);

      // Desconexión
      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });

      // Error handling
      socket.on('error', (error) => {
        console.error('Socket error:', error);
        logService.userLog('SOCKET_ERROR', socket.userId, null, null, null, {
          error: error.message,
          socketId: socket.id
        });
      });
    });
  }

  setupNotificationEvents(socket) {
    // Suscribirse a notificaciones
    socket.on('subscribe_notifications', () => {
      socket.join('notifications');
      socket.emit('notifications_subscribed');
    });

    // Desuscribirse de notificaciones
    socket.on('unsubscribe_notifications', () => {
      socket.leave('notifications');
      socket.emit('notifications_unsubscribed');
    });

    // Marcar notificación como leída
    socket.on('mark_notification_read', (data) => {
      const { notificationId } = data;
      // Aquí implementarías la lógica para marcar notificación como leída
      socket.emit('notification_marked_read', { notificationId });
    });
  }

  setupGeneralEvents(socket) {
    // Ping/Pong para mantener conexión
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: Date.now() });
    });

    // Actualizar estado de usuario
    socket.on('update_status', (data) => {
      const { status } = data;
      socket.user.status = status;
      
      // Emitir a todos los usuarios
      this.io.emit('user_status_changed', {
        userId: socket.userId,
        status,
        user: {
          _id: socket.user._id,
          firstName: socket.user.firstName,
          lastName: socket.user.lastName,
          nickname: socket.user.nickname,
          avatar: socket.user.avatar
        }
      });
    });

    // Solicitar lista de usuarios online
    socket.on('get_online_users', () => {
      const onlineUsers = Array.from(this.connectedUsers.keys()).map(userId => ({
        userId,
        socketId: this.connectedUsers.get(userId).id
      }));
      socket.emit('online_users', onlineUsers);
    });
  }

  handleDisconnect(socket) {
    console.log(`User disconnected: ${socket.userId} (${socket.user?.nickname})`);
    
    // Remover de usuarios conectados
    this.connectedUsers.delete(socket.userId);
    this.userRooms.delete(socket.userId);

    // Notificar a otros usuarios
    this.io.emit('user_disconnected', {
      userId: socket.userId,
      user: socket.user ? {
        _id: socket.user._id,
        firstName: socket.user.firstName,
        lastName: socket.user.lastName,
        nickname: socket.user.nickname
      } : null
    });

    // Log de desconexión
    if (socket.userId) {
      logService.userLog('SOCKET_DISCONNECT', socket.userId, null, null, null, {
        socketId: socket.id
      });
    }
  }

  // Métodos públicos para emitir eventos desde otros servicios

  // Emitir a un usuario específico
  emitToUser(userId, event, data) {
    const userSocket = this.connectedUsers.get(userId);
    if (userSocket) {
      userSocket.emit(event, data);
    }
  }

  // Emitir a múltiples usuarios
  emitToUsers(userIds, event, data) {
    userIds.forEach(userId => {
      this.emitToUser(userId, event, data);
    });
  }

  // Emitir a una sala específica
  emitToRoom(room, event, data) {
    this.io.to(room).emit(event, data);
  }

  // Emitir a todos los usuarios
  emitToAll(event, data) {
    this.io.emit(event, data);
  }

  // Emitir a todos excepto al emisor
  emitToOthers(socketId, event, data) {
    this.io.except(socketId).emit(event, data);
  }

  // Agregar usuario a una sala
  addUserToRoom(userId, room) {
    const userSocket = this.connectedUsers.get(userId);
    if (userSocket) {
      userSocket.join(room);
      this.userRooms.get(userId)?.add(room);
    }
  }

  // Remover usuario de una sala
  removeUserFromRoom(userId, room) {
    const userSocket = this.connectedUsers.get(userId);
    if (userSocket) {
      userSocket.leave(room);
      this.userRooms.get(userId)?.delete(room);
    }
  }

  // Obtener estadísticas de conexiones
  getStats() {
    return {
      totalConnections: this.connectedUsers.size,
      connectedUsers: Array.from(this.connectedUsers.keys()),
      rooms: Array.from(this.io.sockets.adapter.rooms.keys())
    };
  }

  // Broadcast de notificación
  broadcastNotification(notification) {
    this.io.emit('new_notification', notification);
  }

  // Broadcast de actualización de ranking
  broadcastRankingUpdate(rankingData) {
    this.io.emit('ranking_updated', rankingData);
  }

  // Broadcast de nuevo reto
  broadcastNewChallenge(challenge) {
    this.io.emit('new_challenge', challenge);
  }

  // Broadcast de vulnerabilidad resuelta
  broadcastVulnerabilityResolved(vulnerability) {
    this.io.emit('vulnerability_resolved', vulnerability);
  }

  // Broadcast de evento de equipo
  broadcastTeamEvent(teamId, event, data) {
    this.io.to(`team_${teamId}`).emit(`team_${event}`, data);
  }

  // Broadcast de evento de gulag
  broadcastGulagEvent(event, data) {
    this.io.emit('gulag_event', { event, data });
  }
}

// Crear instancia singleton
const socketServer = new SocketServer();

module.exports = socketServer; 