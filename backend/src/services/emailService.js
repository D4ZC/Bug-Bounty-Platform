const nodemailer = require('nodemailer');

const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  initialize() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      logger.info('Email service initialized', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT
      });
    } catch (error) {
      logger.error('Failed to initialize email service', { error: error.message });
    }
  }

  async sendEmail(to, subject, html, text = null) {
    try {
      if (!this.transporter) {
        throw new Error('Email service not initialized');
      }

      const mailOptions = {
        from: `"Bug Bounty Platform" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        text: text || this.stripHtml(html)
      };

      const result = await this.transporter.sendMail(mailOptions);

      logger.email(to, subject, true, { messageId: result.messageId });

      return result;
    } catch (error) {
      logger.email(to, subject, false, { error: error.message });
      throw error;
    }
  }

  // Función para remover HTML y obtener texto plano
  stripHtml(html) {
    return html.replace(/<[^>]*>/g, '');
  }

  // Email de bienvenida
  async sendWelcomeEmail(user) {
    const subject = '¡Bienvenido a Bug Bounty Platform!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">¡Bienvenido a Bug Bounty Platform!</h2>
        <p>Hola <strong>${user.name}</strong>,</p>
        <p>¡Nos complace darte la bienvenida a nuestra plataforma de Bug Bounty!</p>
        <p>Aquí podrás:</p>
        <ul>
          <li>Resolver vulnerabilidades y ganar puntos</li>
          <li>Participar en retos y competencias</li>
          <li>Colaborar con tu equipo</li>
          <li>Personalizar tu perfil con cosméticos</li>
          <li>Contribuir con documentación técnica</li>
        </ul>
        <p>¡Comienza tu aventura ahora mismo!</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(user.email, subject, html);
  }

  // Email de notificación de Gulag
  async sendGulagNotification(email, userName) {
    const subject = '¡Has sido seleccionado para la Competencia Especial!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6b35;">¡Competencia Especial - Gulag!</h2>
        <p>Hola <strong>${userName}</strong>,</p>
        <p>Has sido seleccionado para participar en la <strong>Competencia Especial (Gulag)</strong>.</p>
        <p>Esta es tu oportunidad de mejorar tu posición en el ranking resolviendo vulnerabilidades.</p>
        <h3>Reglas de la competencia:</h3>
        <ul>
          <li>Duración: 24 horas</li>
          <li>Los puntos ganados se suman a tu puntuación total</li>
          <li>El ganador será quien obtenga más puntos</li>
          <li>Los perdedores tendrán actividades presenciales asignadas</li>
        </ul>
        <p>¡Buena suerte y que gane el mejor!</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  // Email de ganador del Gulag
  async sendGulagWinnerNotification(email, userName) {
    const subject = '¡Felicidades! Has ganado la Competencia Especial';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">¡Felicidades! 🎉</h2>
        <p>Hola <strong>${userName}</strong>,</p>
        <p>¡Has ganado la <strong>Competencia Especial (Gulag)</strong>!</p>
        <p>Has demostrado ser el mejor resolviendo vulnerabilidades y has mejorado tu posición en el ranking.</p>
        <p>¡Continúa así y mantén tu excelente rendimiento!</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  // Email de perdedor del Gulag
  async sendGulagLoserNotification(email, userName) {
    const subject = 'Resultado de la Competencia Especial';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Resultado de la Competencia Especial</h2>
        <p>Hola <strong>${userName}</strong>,</p>
        <p>La <strong>Competencia Especial (Gulag)</strong> ha terminado.</p>
        <p>Lamentablemente, no has sido el ganador. Como consecuencia, tendrás actividades presenciales asignadas durante una semana en horario laboral.</p>
        <p>No te desanimes, esta es una oportunidad para mejorar y volver más fuerte en la próxima competencia.</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  // Email de notificación de MVP
  async sendMvpNotification(email, userName, mvpType) {
    const subject = `¡Felicidades! Has sido nombrado ${mvpType.toUpperCase()}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ffd700;">¡Felicidades! 🏆</h2>
        <p>Hola <strong>${userName}</strong>,</p>
        <p>¡Has sido nombrado <strong>${mvpType.toUpperCase()}</strong> del mes!</p>
        <p>Este reconocimiento te otorga:</p>
        <ul>
          <li>Acceso a la tienda especial de MVP</li>
          <li>Cosméticos exclusivos</li>
          <li>Insignias y títulos destacados</li>
          <li>Bonos adicionales en puntos</li>
        </ul>
        <p>¡Sigue manteniendo este excelente nivel!</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  // Email de notificación de nuevo reto
  async sendChallengeNotification(email, userName, challengeData) {
    const subject = '¡Nuevo reto disponible!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff;">¡Nuevo Reto Disponible!</h2>
        <p>Hola <strong>${userName}</strong>,</p>
        <p>Se ha creado un nuevo reto que podría interesarte:</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>${challengeData.title}</h3>
          <p><strong>Categoría:</strong> ${challengeData.category}</p>
          <p><strong>Costo de entrada:</strong> ${challengeData.config.entryCost} puntos</p>
          <p><strong>Duración:</strong> ${challengeData.config.duration} horas</p>
          <p>${challengeData.description}</p>
        </div>
        <p>¡No pierdas la oportunidad de participar y ganar puntos!</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  // Email de notificación de nueva vulnerabilidad
  async sendVulnerabilityNotification(email, userName, vulnerabilityData) {
    const subject = 'Nueva vulnerabilidad asignada a tu equipo';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Nueva Vulnerabilidad Asignada</h2>
        <p>Hola <strong>${userName}</strong>,</p>
        <p>Se ha asignado una nueva vulnerabilidad a tu equipo:</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>${vulnerabilityData.title}</h3>
          <p><strong>Severidad:</strong> ${vulnerabilityData.severity}</p>
          <p><strong>Puntos:</strong> ${vulnerabilityData.points}</p>
          <p><strong>Aplicación:</strong> ${vulnerabilityData.application.name}</p>
          <p>${vulnerabilityData.description}</p>
        </div>
        <p>¡Resuélvela antes que otros equipos!</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  // Email de notificación de contribución validada
  async sendContributionValidatedNotification(email, userName, contributionData) {
    const subject = 'Tu contribución ha sido validada';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">¡Contribución Validada!</h2>
        <p>Hola <strong>${userName}</strong>,</p>
        <p>Tu contribución ha sido validada por la comunidad:</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>${contributionData.title}</h3>
          <p><strong>Tipo:</strong> ${contributionData.type}</p>
          <p><strong>Puntos otorgados:</strong> ${contributionData.points}</p>
        </div>
        <p>¡Gracias por contribuir al conocimiento de la comunidad!</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  // Email de notificación de actualización de ranking
  async sendRankingUpdateNotification(email, userName, rankingData) {
    const subject = 'Actualización de Ranking';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6f42c1;">Actualización de Ranking</h2>
        <p>Hola <strong>${userName}</strong>,</p>
        <p>Los rankings han sido actualizados:</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Tu posición actual:</strong> ${rankingData.currentRank}</p>
          <p><strong>Posición anterior:</strong> ${rankingData.previousRank}</p>
          <p><strong>Puntos totales:</strong> ${rankingData.points}</p>
          <p><strong>Color de ranking:</strong> ${rankingData.rankColor}</p>
        </div>
        <p>¡Sigue trabajando para mejorar tu posición!</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  // Email de recuperación de contraseña
  async sendPasswordResetEmail(email, resetToken) {
    const subject = 'Recuperación de Contraseña - Bug Bounty Platform';
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff;">Recuperación de Contraseña</h2>
        <p>Has solicitado restablecer tu contraseña en Bug Bounty Platform.</p>
        <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Restablecer Contraseña
          </a>
        </div>
        <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
        <p>Este enlace expirará en 1 hora.</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }

  // Email de verificación de cuenta
  async sendAccountVerificationEmail(email, verificationToken) {
    const subject = 'Verificación de Cuenta - Bug Bounty Platform';
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-account?token=${verificationToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">Verificación de Cuenta</h2>
        <p>Gracias por registrarte en Bug Bounty Platform.</p>
        <p>Para completar tu registro, verifica tu cuenta haciendo clic en el siguiente enlace:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verificationUrl}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verificar Cuenta
          </a>
        </div>
        <p>Si no creaste esta cuenta, puedes ignorar este email.</p>
        <p>Saludos,<br>El equipo de Bug Bounty Platform</p>
      </div>
    `;

    return this.sendEmail(email, subject, html);
  }
}

module.exports = new EmailService();
