const express = require('express');
const { body, validationResult } = require('express-validator');
const { requireRole, requireOwnership } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Validaciones
const updateUserValidation = [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }),
  body('nickname').optional().trim().isLength({ min: 3, max: 30 }),
  body('preferences.language').optional().isIn(['es', 'en']),
  body('preferences.theme').optional().isIn(['light', 'dark'])
];

/**
 * @route   GET /api/users
 * @desc    Obtener lista de usuarios (con paginación y filtros)
 * @access  Private
 */
// Obtener todos los usuarios (mock)
router.get('/', (req, res) => {
  res.json({
    success: true,
    users: [
      {
        _id: 'mockuserid1',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        nickname: 'alice',
        role: 'admin',
        isActive: true
      },
      {
        _id: 'mockuserid2',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
        nickname: 'bobby',
        role: 'member',
        isActive: true
      }
    ],
    pagination: {
      current: 1,
      pages: 1,
      total: 2
    }
  });
});

/**
 * @route   GET /api/users/:id
 * @desc    Obtener usuario por ID
 * @access  Private
 */
// Obtener usuario específico (mock)
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    user: {
      _id: req.params.id,
      firstName: 'Mock',
      lastName: 'User',
      email: 'mock@example.com',
      nickname: 'mockuser',
      role: 'member',
      isActive: true
    }
  });
});

/**
 * @route   PUT /api/users/:id
 * @desc    Actualizar usuario
 * @access  Private (propietario o admin)
 */
router.put('/:id', requireOwnership('id'), updateUserValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { firstName, lastName, nickname, preferences, cosmetics } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar nickname único si se está cambiando
    if (nickname && nickname !== user.nickname) {
      const existingUser = await User.findOne({ nickname });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'El nickname ya está en uso'
        });
      }
    }

    // Actualizar campos
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (nickname) user.nickname = nickname;
    if (preferences) {
      user.preferences = { ...user.preferences, ...preferences };
    }
    if (cosmetics) {
      user.cosmetics = { ...user.cosmetics, ...cosmetics };
    }

    await user.save();

    logger.info(`Usuario actualizado: ${user.email}`);

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: { user }
    });

  } catch (error) {
    logger.error('Error al actualizar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   GET /api/users/:id/statistics
 * @desc    Obtener estadísticas del usuario
 * @access  Private
 */
router.get('/:id/statistics', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Obtener vulnerabilidades resueltas
    // const vulnerabilities = await Vulnerability.find({ // Eliminado
    //   'resolvedBy.userId': user._id, // Eliminado
    //   status: 'closed' // Eliminado
    // }); // Eliminado

    // Calcular estadísticas
    const totalVulnerabilities = 0; // Eliminado
    const criticalCount = 0; // Eliminado
    const highCount = 0; // Eliminado
    const mediumCount = 0; // Eliminado
    const lowCount = 0; // Eliminado

    // Calcular tiempo promedio de resolución
    const resolutionTimes = []; // Eliminado
    
    const avgResolutionTime = 0; // Eliminado

    // Obtener contribuciones
    const contributions = await require('../models/Contribution').find({
      'author.userId': user._id,
      validationStatus: 'approved'
    });

    const statistics = {
      totalPoints: user.points + user.monthlyPoints,
      monthlyPoints: user.monthlyPoints,
      rank: user.rank,
      isMVP: user.isMVP,
      mvpStreak: user.mvpStreak,
      isGulagParticipant: user.isGulagParticipant,
      gulagPoints: user.gulagPoints,
      vulnerabilities: {
        total: totalVulnerabilities,
        critical: criticalCount,
        high: highCount,
        medium: mediumCount,
        low: lowCount,
        averageResolutionTime: Math.round(avgResolutionTime)
      },
      contributions: {
        total: contributions.length,
        documentation: contributions.filter(c => c.type === 'documentation').length,
        bugReports: contributions.filter(c => c.type === 'bug_report').length
      },
      cosmetics: {
        backgrounds: user.cosmetics.backgrounds.length,
        frames: user.cosmetics.frames.length,
        avatars: user.cosmetics.avatars.length,
        badges: user.cosmetics.badges.length,
        nameplates: user.cosmetics.nameplates.length
      },
      bluePoints: user.bluePoints,
      lastLogin: user.lastLogin,
      memberSince: user.createdAt
    };

    res.json({
      success: true,
      data: { statistics }
    });

  } catch (error) {
    logger.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   GET /api/users/:id/vulnerabilities
 * @desc    Obtener vulnerabilidades resueltas por el usuario
 * @access  Private
 */
router.get('/:id/vulnerabilities', async (req, res) => {
  try {
    const { page = 1, limit = 20, severity, status } = req.query;
    const skip = (page - 1) * limit;

    // Construir filtros
    const filters = { 'resolvedBy.userId': req.params.id };
    if (severity) filters.severity = severity;
    if (status) filters.status = status;

    const vulnerabilities = []; // Eliminado

    const total = 0; // Eliminado

    res.json({
      success: true,
      data: {
        vulnerabilities,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    logger.error('Error al obtener vulnerabilidades del usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   GET /api/users/:id/contributions
 * @desc    Obtener contribuciones del usuario
 * @access  Private
 */
router.get('/:id/contributions', async (req, res) => {
  try {
    const { page = 1, limit = 20, type, validationStatus } = req.query;
    const skip = (page - 1) * limit;

    // Construir filtros
    const filters = { 'author.userId': req.params.id };
    if (type) filters.type = type;
    if (validationStatus) filters.validationStatus = validationStatus;

    const contributions = await require('../models/Contribution').find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await require('../models/Contribution').countDocuments(filters);

    res.json({
      success: true,
      data: {
        contributions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    logger.error('Error al obtener contribuciones del usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   PUT /api/users/:id/avatar
 * @desc    Actualizar avatar del usuario
 * @access  Private (propietario)
 */
router.put('/:id/avatar', requireOwnership('id'), async (req, res) => {
  try {
    const { avatar } = req.body;
    
    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: 'Avatar requerido'
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    user.avatar = avatar;
    await user.save();

  res.json({
    success: true,
      message: 'Avatar actualizado exitosamente',
      data: { avatar: user.avatar }
    });

  } catch (error) {
    logger.error('Error al actualizar avatar:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   PUT /api/users/:id/cosmetics
 * @desc    Actualizar cosméticos del usuario
 * @access  Private (propietario)
 */
router.put('/:id/cosmetics', requireOwnership('id'), async (req, res) => {
  try {
    const { activeBackground, activeFrame, activeAvatar, activeBadge, activeNameplate } = req.body;
    
    const user = await User.findById(req.params.id);
  if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar que el usuario posee los cosméticos
    if (activeBackground && !user.cosmetics.backgrounds.includes(activeBackground)) {
      return res.status(400).json({
        success: false,
        message: 'No posees este fondo'
      });
    }

    if (activeFrame && !user.cosmetics.frames.includes(activeFrame)) {
      return res.status(400).json({
        success: false,
        message: 'No posees este marco'
      });
    }

    if (activeAvatar && !user.cosmetics.avatars.includes(activeAvatar)) {
      return res.status(400).json({
        success: false,
        message: 'No posees este avatar'
      });
    }

    if (activeBadge && !user.cosmetics.badges.includes(activeBadge)) {
      return res.status(400).json({
        success: false,
        message: 'No posees esta insignia'
      });
    }

    if (activeNameplate && !user.cosmetics.nameplates.includes(activeNameplate)) {
      return res.status(400).json({
        success: false,
        message: 'No posees esta placa'
      });
    }

    // Actualizar cosméticos activos
    if (activeBackground !== undefined) user.cosmetics.activeBackground = activeBackground;
    if (activeFrame !== undefined) user.cosmetics.activeFrame = activeFrame;
    if (activeAvatar !== undefined) user.cosmetics.activeAvatar = activeAvatar;
    if (activeBadge !== undefined) user.cosmetics.activeBadge = activeBadge;
    if (activeNameplate !== undefined) user.cosmetics.activeNameplate = activeNameplate;

    await user.save();

    res.json({
      success: true,
      message: 'Cosméticos actualizados exitosamente',
      data: { cosmetics: user.cosmetics }
    });

  } catch (error) {
    logger.error('Error al actualizar cosméticos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Eliminar usuario (solo admin)
 * @access  Private (admin)
 */
router.delete('/:id', requireRole('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Remover usuario del equipo
    // const team = await Team.findById(user.teamId); // Eliminado
    // if (team) {
    //   team.removeMember(user._id);
    //   await team.save();
    // }

    await User.findByIdAndDelete(req.params.id);

    logger.info(`Usuario eliminado: ${user.email}`);

  res.json({
    success: true,
      message: 'Usuario eliminado exitosamente'
    });

  } catch (error) {
    logger.error('Error al eliminar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router; 