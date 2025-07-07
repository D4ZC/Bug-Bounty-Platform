const cron = require('node-cron');
const User = require('../models/User');
const Team = require('../models/Team');
const Vulnerability = require('../models/Vulnerability');
const Challenge = require('../models/Challenge');
const socketService = require('./socketService');
const emailService = require('./emailService');
const logger = require('../utils/logger');

class CronService {
  constructor() {
    this.jobs = new Map();
  }

  async start() {
    console.log('Iniciando servicios de tareas programadas...');
    
    // Actualización de rankings cada 15 días
    this.scheduleRankingUpdate();
    
    // Actualización de MVP mensual
    this.scheduleMvpUpdate();
    
    // Limpieza de retos expirados
    this.scheduleChallengeCleanup();
    
    // Verificación de competencia especial (Gulag)
    this.scheduleGulagCheck();
    
    // Actualización de contribuciones
    this.scheduleContributionValidation();
    
    console.log('Servicios de tareas programadas iniciados');
  }

  // Actualización de rankings cada 15 días
  scheduleRankingUpdate() {
    const job = cron.schedule(process.env.RANKING_UPDATE_CRON || '0 0 */15 * * *', async () => {
      try {
        console.log('Iniciando actualización de rankings...');
        await this.updateRankings();
        console.log('Rankings actualizados exitosamente');
      } catch (error) {
        logger.error('Error actualizando rankings:', error);
      }
    }, {
      scheduled: true,
      timezone: "America/Mexico_City"
    });

    this.jobs.set('ranking-update', job);
    console.log('Tarea de actualización de rankings programada');
  }

  // Actualización de MVP mensual
  scheduleMvpUpdate() {
    const job = cron.schedule(process.env.MVP_UPDATE_CRON || '0 0 1 * * *', async () => {
      try {
        console.log('Iniciando actualización de MVP...');
        await this.updateMvp();
        console.log('MVP actualizados exitosamente');
      } catch (error) {
        logger.error('Error actualizando MVP:', error);
      }
    }, {
      scheduled: true,
      timezone: "America/Mexico_City"
    });

    this.jobs.set('mvp-update', job);
    console.log('Tarea de actualización de MVP programada');
  }

  // Limpieza de retos expirados
  scheduleChallengeCleanup() {
    const job = cron.schedule('0 */6 * * *', async () => { // Cada 6 horas
      try {
        console.log('Iniciando limpieza de retos expirados...');
        await this.cleanupExpiredChallenges();
        console.log('Limpieza de retos completada');
      } catch (error) {
        logger.error('Error limpiando retos expirados:', error);
      }
    }, {
      scheduled: true,
      timezone: "America/Mexico_City"
    });

    this.jobs.set('challenge-cleanup', job);
    console.log('Tarea de limpieza de retos programada');
  }

  // Verificación de competencia especial
  scheduleGulagCheck() {
    const job = cron.schedule('0 */2 * * *', async () => { // Cada 2 horas
      try {
        await this.checkGulagStatus();
      } catch (error) {
        logger.error('Error verificando estado del Gulag:', error);
      }
    }, {
      scheduled: true,
      timezone: "America/Mexico_City"
    });

    this.jobs.set('gulag-check', job);
    console.log('Tarea de verificación de Gulag programada');
  }

  // Validación de contribuciones
  scheduleContributionValidation() {
    const job = cron.schedule('0 */4 * * *', async () => { // Cada 4 horas
      try {
        console.log('Iniciando validación automática de contribuciones...');
        await this.validateContributions();
        console.log('Validación de contribuciones completada');
      } catch (error) {
        logger.error('Error validando contribuciones:', error);
      }
    }, {
      scheduled: true,
      timezone: "America/Mexico_City"
    });

    this.jobs.set('contribution-validation', job);
    console.log('Tarea de validación de contribuciones programada');
  }

  // Método para actualizar rankings
  async updateRankings() {
    // Actualizar ranking de usuarios
    const users = await User.find({ isActive: true })
      .sort({ points: -1, 'vulnerabilitiesSolved.critical': -1, createdAt: 1 })
      .populate('teamId', 'name');

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const previousRank = user.currentRank;
      const newRank = i + 1;
      
      // Determinar color del ranking
      let rankColor = 'black';
      if (newRank === 1) {
        rankColor = 'green';
      } else if (newRank <= 10) {
        rankColor = 'blue';
      } else if (newRank <= Math.floor(users.length / 2)) {
        rankColor = 'orange';
      }

      user.previousRank = previousRank;
      user.currentRank = newRank;
      user.rankColor = rankColor;
      await user.save();
    }

    // Actualizar ranking de equipos
    const teams = await Team.find({ isActive: true })
      .sort({ points: -1, 'vulnerabilitiesSolved.critical': -1, createdAt: 1 });

    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const previousRank = team.currentRank;
      const newRank = i + 1;
      
      // Determinar color del ranking
      let rankColor = 'black';
      if (newRank === 1) {
        rankColor = 'green';
      } else if (newRank <= 10) {
        rankColor = 'blue';
      } else if (newRank <= Math.floor(teams.length / 2)) {
        rankColor = 'orange';
      }

      team.previousRank = previousRank;
      team.currentRank = newRank;
      team.rankColor = rankColor;
      await team.save();
    }

    // Notificar actualización de rankings
    const rankings = {
      users: users.slice(0, 50).map(user => ({
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        points: user.points,
        rank: user.currentRank,
        rankColor: user.rankColor,
        team: user.teamId ? { id: user.teamId._id, name: user.teamId.name } : null
      })),
      teams: teams.slice(0, 20).map(team => ({
        id: team._id,
        name: team.name,
        points: team.points,
        rank: team.currentRank,
        rankColor: team.rankColor,
        memberCount: team.memberCount
      }))
    };

    socketService.notifyRankingUpdate(rankings);

    // Verificar si hay usuarios para el Gulag
    await this.checkGulagEligibility();
  }

  // Método para actualizar MVP
  async updateMvp() {
    // Resetear MVP actuales
    await User.updateMany({}, { isCurrentMvp: false });
    await Team.updateMany({}, { isCurrentMvp: false });

    // Encontrar MVP de usuario
    const topUser = await User.findOne({ isActive: true })
      .sort({ monthlyPoints: -1, 'vulnerabilitiesSolved.critical': -1 });

    if (topUser) {
      topUser.setMvp();
      
      // Aplicar bonos por racha
      if (topUser.consecutiveMvpMonths >= 3) {
        const bonus = Math.floor(topUser.monthlyPoints * 0.15);
        await topUser.addPoints(bonus);
      }
    }

    // Encontrar MVP de equipo
    const topTeam = await Team.findOne({ isActive: true })
      .sort({ monthlyPoints: -1, 'vulnerabilitiesSolved.critical': -1 });

    if (topTeam) {
      topTeam.setMvp();
      
      // Aplicar bonos por racha
      if (topTeam.consecutiveMvpMonths >= 3) {
        const bonus = Math.floor(topTeam.monthlyPoints * 0.10);
        await topTeam.addPoints(bonus);
      }
    }

    // Notificar nuevos MVP
    if (topUser) {
      socketService.notifyNewMvp('user', {
        userId: topUser._id,
        name: topUser.name,
        avatar: topUser.avatar,
        monthlyPoints: topUser.monthlyPoints,
        consecutiveMonths: topUser.consecutiveMvpMonths
      });
    }

    if (topTeam) {
      socketService.notifyNewMvp('team', {
        teamId: topTeam._id,
        name: topTeam.name,
        monthlyPoints: topTeam.monthlyPoints,
        consecutiveMonths: topTeam.consecutiveMvpMonths
      });
    }

    // Resetear puntos mensuales
    await User.updateMany({}, { monthlyPoints: 0 });
    await Team.updateMany({}, { monthlyPoints: 0 });
  }

  // Método para limpiar retos expirados
  async cleanupExpiredChallenges() {
    const expiredChallenges = await Challenge.find({
      status: 'active',
      endDate: { $lt: new Date() }
    });

    for (const challenge of expiredChallenges) {
      await challenge.complete();
      
      // Notificar fin del reto
      socketService.notifyChallengeEnd(challenge._id, {
        challengeId: challenge._id,
        status: 'completed',
        participants: challenge.participants,
        winner: challenge.participants.find(p => p.isWinner)
      });
    }
  }

  // Método para verificar estado del Gulag
  async checkGulagStatus() {
    const gulagUsers = await User.find({ isInGulag: true })
      .populate('teamId', 'name');

    if (gulagUsers.length > 0) {
      // Verificar si algún usuario ha ganado suficientes puntos
      for (const user of gulagUsers) {
        const gulagDuration = Date.now() - user.gulagStartDate.getTime();
        const gulagHours = gulagDuration / (1000 * 60 * 60);
        
        // Si han pasado más de 24 horas, finalizar el Gulag
        if (gulagHours >= 24) {
          await this.endGulag();
          break;
        }
      }
    }
  }

  // Método para verificar elegibilidad para Gulag
  async checkGulagEligibility() {
    const bottomUsers = await User.find({ isActive: true })
      .sort({ points: 1 })
      .limit(5)
      .populate('teamId', 'name');

    // Verificar si los últimos 5 usuarios no están ya en Gulag
    const eligibleUsers = bottomUsers.filter(user => !user.isInGulag);
    
    if (eligibleUsers.length > 0) {
      // Iniciar Gulag para estos usuarios
      for (const user of eligibleUsers) {
        await user.enterGulag();
      }

      // Notificar inicio del Gulag
      socketService.notifyGulagStart(eligibleUsers.map(user => ({
        userId: user._id,
        name: user.name,
        avatar: user.avatar
      })));

      // Enviar notificaciones por email
      for (const user of eligibleUsers) {
        await emailService.sendGulagNotification(user.email, user.name);
      }
    }
  }

  // Método para finalizar Gulag
  async endGulag() {
    const gulagUsers = await User.find({ isInGulag: true })
      .populate('teamId', 'name')
      .sort({ points: -1 });

    if (gulagUsers.length > 0) {
      const winner = gulagUsers[0];
      
      // Sacar a todos del Gulag
      for (const user of gulagUsers) {
        await user.exitGulag();
      }

      // Notificar fin del Gulag
      socketService.notifyGulagEnd(winner, gulagUsers.map(user => ({
        userId: user._id,
        name: user.name,
        avatar: user.avatar,
        finalPoints: user.points
      })));

      // Enviar notificaciones por email
      for (const user of gulagUsers) {
        if (user._id.toString() === winner._id.toString()) {
          await emailService.sendGulagWinnerNotification(user.email, user.name);
        } else {
          await emailService.sendGulagLoserNotification(user.email, user.name);
        }
      }
    }
  }

  // Método para validar contribuciones automáticamente
  async validateContributions() {
    const pendingContributions = await Contribution.find({ status: 'pending' })
      .populate('author.userId', 'name avatar')
      .populate('author.teamId', 'name');

    for (const contribution of pendingContributions) {
      if (contribution.votes.length >= 5) {
        const validationRate = contribution.validationRate;
        
        if (validationRate >= 70) {
          await contribution.validate();
          
          // Otorgar puntos al autor
          const author = await User.findById(contribution.author.userId);
          if (author) {
            await author.addPoints(contribution.points);
            contribution.pointsAwarded = true;
            await contribution.save();
          }
          
          // Notificar nueva contribución validada
          socketService.notifyNewContribution(contribution);
        } else if (validationRate <= 30) {
          await contribution.reject();
        }
      }
    }
  }

  // Método para detener todos los jobs
  stop() {
    for (const [name, job] of this.jobs) {
      job.stop();
      console.log(`Tarea ${name} detenida`);
    }
    this.jobs.clear();
  }

  // Método para obtener estado de los jobs
  getJobsStatus() {
    const status = {};
    for (const [name, job] of this.jobs) {
      status[name] = {
        running: job.running,
        nextDate: job.nextDate()
      };
    }
    return status;
  }
}

module.exports = new CronService(); 