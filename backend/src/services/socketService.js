const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class SocketService {
  constructor() {
    this.io = null;
    this.connectedUsers = new Map(); // userId -> socketId
  }

  initialize(server) {
    this.io = socketIo(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    // Middleware de autenticación
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error('Token de autenticación requerido'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
          return next(new Error('Usuario no encontrado'));
        }

        socket.userId = decoded.userId;
        socket.user = user;
        next();
      } catch (error) {
        next(new Error('Token inválido'));
      }
    });

    // Manejo de conexiones
    this.io.on('connection', (socket) => {
      console.log(`Usuario conectado: ${socket.user.name} (${socket.userId})`);
      
      // Guardar referencia del usuario conectado
      this.connectedUsers.set(socket.userId, socket.id);
      
      // Unir al usuario a su sala personal
      socket.join(`user:${socket.userId}`);
      
      // Unir al usuario a la sala de su equipo
      if (socket.user.teamId) {
        socket.join(`team:${socket.user.teamId}`);
      }

      // Manejar desconexión
      socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.user.name} (${socket.userId})`);
        this.connectedUsers.delete(socket.userId);
      });

      // Manejar unirse a retos
      socket.on('join-challenge', (challengeId) => {
        socket.join(`challenge:${challengeId}`);
        console.log(`Usuario ${socket.user.name} se unió al reto ${challengeId}`);
      });

      // Manejar salir de retos
      socket.on('leave-challenge', (challengeId) => {
        socket.leave(`challenge:${challengeId}`);
        console.log(`Usuario ${socket.user.name} salió del reto ${challengeId}`);
      });

      // Manejar actualizaciones de perfil
      socket.on('profile-update', (data) => {
        socket.broadcast.to(`user:${socket.userId}`).emit('profile-updated', data);
      });

      // Manejar notificaciones de vulnerabilidades
      socket.on('vulnerability-solved', (data) => {
        // Notificar al equipo
        if (socket.user.teamId) {
          this.io.to(`team:${socket.user.teamId}`).emit('team-vulnerability-solved', {
            ...data,
            solvedBy: {
              userId: socket.userId,
              name: socket.user.name,
              avatar: socket.user.avatar
            }
          });
        }
      });
    });

    console.log('Servicio de WebSocket inicializado');
  }

  // Métodos para enviar notificaciones

  // Notificar a un usuario específico
  notifyUser(userId, event, data) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.io.to(socketId).emit(event, data);
    }
  }

  // Notificar a un equipo
  notifyTeam(teamId, event, data) {
    this.io.to(`team:${teamId}`).emit(event, data);
  }

  // Notificar a todos los usuarios
  notifyAll(event, data) {
    this.io.emit(event, data);
  }

  // Notificar actualización de rankings
  notifyRankingUpdate(rankings) {
    this.io.emit('rankings-updated', rankings);
  }

  // Notificar inicio de reto
  notifyChallengeStart(challengeId, challengeData) {
    this.io.to(`challenge:${challengeId}`).emit('challenge-started', challengeData);
  }

  // Notificar fin de reto
  notifyChallengeEnd(challengeId, results) {
    this.io.to(`challenge:${challengeId}`).emit('challenge-ended', results);
  }

  // Notificar actualización de progreso en reto
  notifyChallengeProgress(challengeId, progress) {
    this.io.to(`challenge:${challengeId}`).emit('challenge-progress', progress);
  }

  // Notificar inicio de competencia especial (Gulag)
  notifyGulagStart(participants) {
    participants.forEach(participant => {
      this.notifyUser(participant.userId, 'gulag-started', {
        message: '¡La competencia especial ha comenzado!',
        participants: participants.map(p => ({
          userId: p.userId,
          name: p.name,
          avatar: p.avatar
        }))
      });
    });
  }

  // Notificar fin de competencia especial
  notifyGulagEnd(winner, participants) {
    participants.forEach(participant => {
      this.notifyUser(participant.userId, 'gulag-ended', {
        winner: {
          userId: winner.userId,
          name: winner.name,
          avatar: winner.avatar
        },
        participants: participants.map(p => ({
          userId: p.userId,
          name: p.name,
          avatar: p.avatar,
          finalPoints: p.finalPoints
        }))
      });
    });
  }

  // Notificar nuevos MVP
  notifyNewMvp(mvpType, mvpData) {
    if (mvpType === 'user') {
      this.notifyUser(mvpData.userId, 'mvp-awarded', {
        type: 'user',
        message: '¡Felicidades! Has sido nombrado MVP del mes',
        data: mvpData
      });
    } else if (mvpType === 'team') {
      this.notifyTeam(mvpData.teamId, 'team-mvp-awarded', {
        type: 'team',
        message: '¡Felicidades! Tu equipo ha sido nombrado MVP del mes',
        data: mvpData
      });
    }
  }

  // Notificar nueva vulnerabilidad asignada
  notifyNewVulnerability(teamId, vulnerability) {
    this.notifyTeam(teamId, 'new-vulnerability', {
      message: 'Nueva vulnerabilidad asignada a tu equipo',
      vulnerability: {
        id: vulnerability._id,
        title: vulnerability.title,
        severity: vulnerability.severity,
        points: vulnerability.points
      }
    });
  }

  // Notificar nueva contribución
  notifyNewContribution(contribution) {
    this.io.emit('new-contribution', {
      message: 'Nueva contribución técnica disponible',
      contribution: {
        id: contribution._id,
        title: contribution.title,
        type: contribution.type,
        author: {
          name: contribution.author.userId.name,
          avatar: contribution.author.userId.avatar
        }
      }
    });
  }

  // Notificar actualización de tienda
  notifyShopUpdate(updateType, data) {
    this.io.emit('shop-updated', {
      type: updateType,
      data: data
    });
  }

  // Obtener usuarios conectados
  getConnectedUsers() {
    return Array.from(this.connectedUsers.keys());
  }

  // Verificar si un usuario está conectado
  isUserConnected(userId) {
    return this.connectedUsers.has(userId);
  }

  // Obtener socket ID de un usuario
  getUserSocketId(userId) {
    return this.connectedUsers.get(userId);
  }
}

module.exports = new SocketService(); 