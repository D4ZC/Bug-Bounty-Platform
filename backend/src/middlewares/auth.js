const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Token de acceso requerido',
        message: 'Debes proporcionar un token de autenticación válido'
      });
    }

    const token = authHeader.substring(7); // Remover 'Bearer ' del inicio

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuario en la base de datos
    const user = await User.findById(decoded.userId)
      .select('-__v')
      .populate('teamId', 'name description');

    if (!user) {
      return res.status(401).json({
        error: 'Usuario no encontrado',
        message: 'El token proporcionado no corresponde a un usuario válido'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        error: 'Usuario inactivo',
        message: 'Tu cuenta ha sido desactivada'
      });
    }

    // Agregar usuario a la request
    req.user = user;
    req.userId = user._id;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token inválido',
        message: 'El token proporcionado no es válido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado',
        message: 'Tu sesión ha expirado, por favor inicia sesión nuevamente'
      });
    }

    console.error('Error en middleware de autenticación:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error durante la autenticación'
    });
  }
};

// Middleware para verificar roles de administrador
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'No autorizado',
        message: 'Debes estar autenticado para acceder a este recurso'
      });
    }

    // Verificar si el usuario es administrador
    // Aquí puedes implementar tu lógica de roles
    // Por ahora, asumimos que los administradores tienen un campo isAdmin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        error: 'Acceso denegado',
        message: 'No tienes permisos para acceder a este recurso'
      });
    }

    next();
  } catch (error) {
    console.error('Error en middleware de administrador:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error durante la verificación de permisos'
    });
  }
};

// Middleware para verificar si el usuario es líder de equipo
const requireTeamLeader = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'No autorizado',
        message: 'Debes estar autenticado para acceder a este recurso'
      });
    }

    const teamId = req.params.teamId || req.body.teamId;
    
    if (!teamId) {
      return res.status(400).json({
        error: 'ID de equipo requerido',
        message: 'Debes proporcionar un ID de equipo válido'
      });
    }

    // Verificar si el usuario es líder del equipo
    const team = await Team.findById(teamId);
    
    if (!team) {
      return res.status(404).json({
        error: 'Equipo no encontrado',
        message: 'El equipo especificado no existe'
      });
    }

    if (team.leaderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: 'Acceso denegado',
        message: 'Solo el líder del equipo puede realizar esta acción'
      });
    }

    req.team = team;
    next();
  } catch (error) {
    console.error('Error en middleware de líder de equipo:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error durante la verificación de permisos'
    });
  }
};

// Middleware para verificar si el usuario es miembro del equipo
const requireTeamMember = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'No autorizado',
        message: 'Debes estar autenticado para acceder a este recurso'
      });
    }

    const teamId = req.params.teamId || req.body.teamId;
    
    if (!teamId) {
      return res.status(400).json({
        error: 'ID de equipo requerido',
        message: 'Debes proporcionar un ID de equipo válido'
      });
    }

    // Verificar si el usuario es miembro del equipo
    const team = await Team.findById(teamId);
    
    if (!team) {
      return res.status(404).json({
        error: 'Equipo no encontrado',
        message: 'El equipo especificado no existe'
      });
    }

    const isMember = team.members.some(member => 
      member.userId.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        error: 'Acceso denegado',
        message: 'Debes ser miembro del equipo para realizar esta acción'
      });
    }

    req.team = team;
    next();
  } catch (error) {
    console.error('Error en middleware de miembro de equipo:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error durante la verificación de permisos'
    });
  }
};

// Middleware para verificar si el usuario es MVP
const requireMvp = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'No autorizado',
        message: 'Debes estar autenticado para acceder a este recurso'
      });
    }

    if (!req.user.isCurrentMvp) {
      return res.status(403).json({
        error: 'Acceso denegado',
        message: 'Solo los MVP pueden acceder a este recurso'
      });
    }

    next();
  } catch (error) {
    console.error('Error en middleware de MVP:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error durante la verificación de permisos'
    });
  }
};

// Middleware para verificar si el usuario está en Gulag
const requireGulagParticipant = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'No autorizado',
        message: 'Debes estar autenticado para acceder a este recurso'
      });
    }

    if (!req.user.isInGulag) {
      return res.status(403).json({
        error: 'Acceso denegado',
        message: 'Solo los participantes del Gulag pueden acceder a este recurso'
      });
    }

    next();
  } catch (error) {
    console.error('Error en middleware de Gulag:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error durante la verificación de permisos'
    });
  }
};

module.exports = {
  auth,
  requireAdmin,
  requireTeamLeader,
  requireTeamMember,
  requireMvp,
  requireGulagParticipant
}; 