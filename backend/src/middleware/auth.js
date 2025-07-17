const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Eliminado
const logger = require('../utils/logger');

/**
 * Middleware para verificar token JWT (mock: siempre autoriza)
 */
const authenticateToken = async (req, res, next) => {
  // Simula un usuario autenticado para desarrollo
  req.user = {
    _id: 'mockuserid',
    role: 'admin',
    firstName: 'Mock',
    lastName: 'User',
    email: 'mock@example.com',
    isActive: true
  };
  next();
};

/**
 * Middleware para verificar roles específicos
 */
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Autenticación requerida'
      });
    }

    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Permisos insuficientes'
      });
    }

    next();
  };
};

/**
 * Middleware para verificar si es MVP
 */
const requireMVP = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Autenticación requerida'
    });
  }

  if (!req.user.isMVP) {
    return res.status(403).json({
      success: false,
      message: 'Se requiere ser MVP para acceder a este recurso'
    });
  }

  next();
};

/**
 * Middleware para verificar si es líder de equipo
 */
const requireTeamLeader = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Autenticación requerida'
      });
    }

    // Verificar si es admin
    if (req.user.role === 'admin') {
      return next();
    }

    // Verificar si es líder de equipo
    if (req.user.role === 'team_leader') {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Se requiere ser líder de equipo o administrador'
    });

  } catch (error) {
    logger.error('Error en verificación de líder de equipo:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

/**
 * Middleware para verificar si es propietario del recurso
 */
const requireOwnership = (resourceField = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Autenticación requerida'
      });
    }

    // Si es admin, permitir acceso
    if (req.user.role === 'admin') {
      return next();
    }

    // Verificar si es propietario del recurso
    const resourceUserId = req.params[resourceField] || req.body[resourceField];
    
    if (resourceUserId && resourceUserId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para acceder a este recurso'
      });
    }

    next();
  };
};

/**
 * Middleware para verificar si es miembro del equipo
 */
const requireTeamMembership = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Autenticación requerida'
      });
    }

    const teamId = req.params.teamId || req.body.teamId;
    
    if (!teamId) {
      return res.status(400).json({
        success: false,
        message: 'ID de equipo requerido'
      });
    }

    // Si es admin, permitir acceso
    if (req.user.role === 'admin') {
      return next();
    }

    // Verificar si es miembro del equipo
    if (req.user.teamId.toString() !== teamId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No eres miembro de este equipo'
      });
    }

    next();

  } catch (error) {
    logger.error('Error en verificación de membresía de equipo:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

/**
 * Middleware opcional para autenticación
 * No falla si no hay token, pero agrega usuario si existe
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId)
      .select('-password')
      .populate('teamId', 'name logo');

    if (user && user.isActive) {
      req.user = user;
    }

    next();

  } catch (error) {
    // Si hay error en el token, continuar sin usuario
    next();
  }
};

/**
 * Middleware para generar token JWT
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

/**
 * Middleware para verificar token de refresh
 */
const verifyRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token requerido'
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    req.user = user;
    next();

  } catch (error) {
    logger.error('Error en verificación de refresh token:', error);
    
    return res.status(401).json({
      success: false,
      message: 'Refresh token inválido'
    });
  }
};

module.exports = {
  authenticateToken,
  requireRole,
  requireMVP,
  requireTeamLeader,
  requireOwnership,
  requireTeamMembership,
  optionalAuth,
  generateToken,
  verifyRefreshToken
}; 