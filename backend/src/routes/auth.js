const express = require('express');
const { body, validationResult } = require('express-validator');
const { generateToken, authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Validaciones
const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

const registerValidation = [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden');
    }
    return true;
  }),
  body('teamId').isMongoId().withMessage('ID de equipo inválido')
];

const updateProfileValidation = [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
  body('nickname').optional().trim().isLength({ min: 3, max: 30 }).withMessage('El nickname debe tener entre 3 y 30 caracteres')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Contraseña actual requerida'),
  body('newPassword').isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
    return true;
  })
];

// Función para generar nickname único
const generateUniqueNickname = async (firstName, lastName) => {
  const baseNickname = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
  // Mock: siempre devuelve el nickname base
  return baseNickname;
};

// Función para asignar rango aleatorio
const assignRandomRank = () => {
  const ranks = [
    { name: 'Novato', icon: '🥉', color: '#b2babb' },
    { name: 'Aprendiz', icon: '🥈', color: '#7f8c8d' },
    { name: 'Experto', icon: '🥇', color: '#424949' },
    { name: 'Maestro', icon: '👑', color: '#27ae60' },
    { name: 'Leyenda', icon: '⭐', color: '#f39c12' }
  ];
  
  return ranks[Math.floor(Math.random() * ranks.length)];
};

/**
 * @route   POST /api/auth/register
 * @desc    Registrar nuevo usuario
 * @access  Public
 */
router.post('/register', registerValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password, teamId } = req.body;

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Verificar si el equipo existe
    // const team = await Team.findById(teamId); // Eliminado
    // if (!team) { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Equipo no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Generar nickname único
    const nickname = await generateUniqueNickname(firstName, lastName);
    
    // Asignar rango aleatorio
    const rank = assignRandomRank();

    // Crear usuario
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      nickname,
      // teamId, // Eliminado
      rank: rank.name,
      avatar: null // Se puede subir después
    });

    await user.save();

    // Agregar usuario al equipo
    // team.addMember(user._id); // Eliminado
    // await team.save(); // Eliminado

    // Generar token
    const token = generateToken(user._id);

    // Actualizar último login
    user.lastLogin = new Date();
    await user.save();

    logger.info(`Nuevo usuario registrado: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          nickname: user.nickname,
          avatar: user.avatar,
          // teamId: user.teamId, // Eliminado
          role: user.role,
          points: user.points,
          rank: user.rank,
          isMVP: user.isMVP,
          isGulagParticipant: user.isGulagParticipant,
          preferences: user.preferences
        },
        token
      }
    });

  } catch (error) {
    logger.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión
 * @access  Public
 */
router.post('/login', loginValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email }).populate('teamId', 'name logo');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Cuenta desactivada'
      });
    }

    // Generar token
    const token = generateToken(user._id);

    // Actualizar último login
    user.lastLogin = new Date();
    await user.save();

    logger.info(`Usuario conectado: ${email}`);

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          nickname: user.nickname,
          avatar: user.avatar,
          // teamId: user.teamId, // Eliminado
          role: user.role,
          points: user.points,
          monthlyPoints: user.monthlyPoints,
          rank: user.rank,
          isMVP: user.isMVP,
          isGulagParticipant: user.isGulagParticipant,
          preferences: user.preferences,
          cosmetics: user.cosmetics,
          bluePoints: user.bluePoints
        },
        token
      }
    });

  } catch (error) {
    logger.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Obtener información del usuario autenticado
 * @access  Private
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('teamId', 'name logo')
      .populate('contributions');

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          nickname: user.nickname,
          avatar: user.avatar,
          // teamId: user.teamId, // Eliminado
          role: user.role,
          points: user.points,
          monthlyPoints: user.monthlyPoints,
          rank: user.rank,
          isMVP: user.isMVP,
          isGulagParticipant: user.isGulagParticipant,
          gulagPoints: user.gulagPoints,
          vulnerabilitiesResolved: user.vulnerabilitiesResolved,
          totalVulnerabilities: user.totalVulnerabilities,
          averageResolutionTime: user.averageResolutionTime,
          preferences: user.preferences,
          cosmetics: user.cosmetics,
          bluePoints: user.bluePoints,
          contributions: user.contributions,
          lastLogin: user.lastLogin,
          mvpAwardedAt: user.mvpAwardedAt,
          gulagJoinedAt: user.gulagJoinedAt
        }
      }
    });

  } catch (error) {
    logger.error('Error al obtener perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   PUT /api/auth/profile
 * @desc    Actualizar perfil del usuario
 * @access  Private
 */
router.put('/profile', authenticateToken, updateProfileValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { firstName, lastName, nickname, avatar, preferences } = req.body;
    const user = await User.findById(req.user._id);

    // Verificar si el nickname ya existe (si se está cambiando)
    if (nickname && nickname !== user.nickname) {
      const existingUser = await User.findOne({ nickname });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'El nickname ya está en uso'
        });
      }
    }

    // Actualizar campos básicos
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (nickname) user.nickname = nickname;
    if (avatar !== undefined) user.avatar = avatar;

    // Actualizar preferencias si se proporcionan
    if (preferences) {
      if (preferences.language) {
        user.preferences.language = preferences.language;
      }
      if (preferences.theme) {
        user.preferences.theme = preferences.theme;
      }
      if (preferences.notifications) {
        // Actualizar preferencias de notificaciones
        if (preferences.notifications.email !== undefined) {
          user.preferences.notifications.email = preferences.notifications.email;
        }
        if (preferences.notifications.push !== undefined) {
          user.preferences.notifications.push = preferences.notifications.push;
        }
        if (preferences.notifications.challenges !== undefined) {
          user.preferences.notifications.challenges = preferences.notifications.challenges;
        }
        if (preferences.notifications.gulag !== undefined) {
          user.preferences.notifications.gulag = preferences.notifications.gulag;
        }
      }
    }

    await user.save();

    logger.info(`Perfil actualizado para usuario: ${user.email}`, {
      userId: user._id,
      updatedFields: Object.keys(req.body)
    });

    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          nickname: user.nickname,
          avatar: user.avatar,
          // teamId: user.teamId, // Eliminado
          role: user.role,
          points: user.points,
          rank: user.rank,
          isMVP: user.isMVP,
          isGulagParticipant: user.isGulagParticipant,
          preferences: user.preferences
        }
      }
    });

  } catch (error) {
    logger.error('Error al actualizar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   PUT /api/auth/password
 * @desc    Cambiar contraseña
 * @access  Private
 */
router.put('/password', authenticateToken, changePasswordValidation, async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    // Verificar contraseña actual
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña actual es incorrecta'
      });
    }

    // Actualizar contraseña
    user.password = newPassword;
    await user.save();

    logger.info(`Contraseña cambiada para usuario: ${user.email}`);

    res.json({
      success: true,
      message: 'Contraseña cambiada exitosamente'
    });

  } catch (error) {
    logger.error('Error al cambiar contraseña:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   PUT /api/auth/preferences
 * @desc    Actualizar preferencias del usuario
 * @access  Private
 */
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const { language, theme, notifications } = req.body;
    const user = await User.findById(req.user._id);

    // Actualizar preferencias
    if (language) user.preferences.language = language;
    if (theme) user.preferences.theme = theme;
    if (notifications) {
      user.preferences.notifications = {
        ...user.preferences.notifications,
        ...notifications
      };
    }

    await user.save();

    logger.info(`Preferencias actualizadas para usuario: ${user.email}`);

    res.json({
      success: true,
      message: 'Preferencias actualizadas exitosamente',
      data: {
        preferences: user.preferences
      }
    });

  } catch (error) {
    logger.error('Error al actualizar preferencias:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Cerrar sesión
 * @access  Private
 */
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // En una implementación más avanzada, aquí se invalidaría el token
    // Por ahora, solo retornamos éxito
    logger.info(`Usuario desconectado: ${req.user.email}`);

    res.json({
      success: true,
      message: 'Sesión cerrada exitosamente'
    });

  } catch (error) {
    logger.error('Error en logout:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   POST /api/auth/refresh
 * @desc    Renovar token
 * @access  Private
 */
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('teamId', 'name logo');
    
    // Generar nuevo token
    const newToken = generateToken(user._id);

    res.json({
      success: true,
      message: 'Token renovado exitosamente',
      data: {
        token: newToken,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          nickname: user.nickname,
          avatar: user.avatar,
          // teamId: user.teamId, // Eliminado
          role: user.role,
          points: user.points,
          rank: user.rank,
          isMVP: user.isMVP,
          isGulagParticipant: user.isGulagParticipant,
          preferences: user.preferences
        }
      }
    });

  } catch (error) {
    logger.error('Error al renovar token:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   GET /api/auth/validate
 * @desc    Validar token
 * @access  Private
 */
router.get('/validate', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Token válido',
      data: {
        user: {
          _id: req.user._id,
          email: req.user.email,
          nickname: req.user.nickname,
          role: req.user.role
        }
      }
    });

  } catch (error) {
    logger.error('Error al validar token:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router; 