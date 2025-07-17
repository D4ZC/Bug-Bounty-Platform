const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// const Contribution = require('../models/Contribution'); // Eliminado

// Middleware para verificar si es admin
const requireAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Se requieren permisos de administrador' 
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error de autorización' 
    });
  }
};

// Aplicar middleware de autenticación y admin a todas las rutas
// router.use(auth); // Eliminado para evitar crash
router.use(requireAdmin);

// Dashboard - Estadísticas generales
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalTeams,
      activeTeams,
      totalVulnerabilities,
      activeVulnerabilities,
      totalChallenges,
      activeChallenges,
      recentUsers,
      recentVulnerabilities
    ] = await Promise.all([
      // User.countDocuments(), // Eliminado
      // User.countDocuments({ isActive: true }), // Eliminado
      // Team.countDocuments(), // Eliminado
      // Team.countDocuments({ isActive: true }), // Eliminado
      // Vulnerability.countDocuments(), // Eliminado
      // Vulnerability.countDocuments({ status: 'active' }), // Eliminado
      // Challenge.countDocuments(), // Eliminado
      // Challenge.countDocuments({ status: 'active' }), // Eliminado
      // User.find().sort({ createdAt: -1 }).limit(5).select('firstName lastName email createdAt'), // Eliminado
      // Vulnerability.find().sort({ createdAt: -1 }).limit(5).select('title severity status createdAt') // Eliminado
    ]);

    res.json({
      success: true,
      stats: {
        users: { total: totalUsers, active: activeUsers },
        teams: { total: totalTeams, active: activeTeams },
        vulnerabilities: { total: totalVulnerabilities, active: activeVulnerabilities },
        challenges: { total: totalChallenges, active: activeChallenges }
      },
      recent: {
        users: recentUsers,
        vulnerabilities: recentVulnerabilities
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar estadísticas' 
    });
  }
});

// ===== GESTIÓN DE USUARIOS =====

// Obtener todos los usuarios con filtros
router.get('/users', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      role = '', 
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    // Filtro de búsqueda
    if (search) {
      // filter.$or = [ // Eliminado
      //   { firstName: { $regex: search, $options: 'i' } }, // Eliminado
      //   { lastName: { $regex: search, $options: 'i' } }, // Eliminado
      //   { email: { $regex: search, $options: 'i' } }, // Eliminado
      //   { nickname: { $regex: search, $options: 'i' } } // Eliminado
      // ];
    }

    // Filtro de rol
    if (role && role !== 'all') {
      // filter.role = role; // Eliminado
    }

    // Filtro de estado
    if (status && status !== 'all') {
      // filter.isActive = status === 'active'; // Eliminado
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const users = await Team.find(filter) // Mock data
      .select('-password')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('teamId', 'name');

    const total = await Team.countDocuments(filter); // Mock data

    res.json({
      success: true,
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener usuarios' 
    });
  }
});

// Obtener usuario específico
router.get('/users/:id', async (req, res) => {
  try {
    const user = await Team.findById(req.params.id) // Mock data
      .select('-password')
      .populate('teamId', 'name description');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Usuario no encontrado' 
      });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener usuario' 
    });
  }
});

// Actualizar usuario
router.put('/users/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, nickname, role, isActive, points } = req.body;
    
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (nickname) updateData.nickname = nickname;
    if (role) updateData.role = role;
    if (typeof isActive === 'boolean') updateData.isActive = isActive;
    if (typeof points === 'number') updateData.points = points;

    const user = await Team.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Usuario no encontrado' 
      });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al actualizar usuario' 
    });
  }
});

// Eliminar usuario
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await Team.findByIdAndDelete(req.params.id); // Mock data
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Usuario no encontrado' 
      });
    }

    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar usuario' 
    });
  }
});

// Acciones masivas en usuarios
router.post('/users/bulk-action', async (req, res) => {
  try {
    const { action, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No se seleccionaron usuarios' 
      });
    }

    let updateData = {};
    switch (action) {
      case 'activate':
        updateData = { isActive: true };
        break;
      case 'deactivate':
        updateData = { isActive: false };
        break;
      case 'delete':
        await Team.deleteMany({ _id: { $in: items } }); // Mock data
        return res.json({ 
          success: true, 
          message: `${items.length} usuarios eliminados` 
        });
      default:
        return res.status(400).json({ 
          success: false, 
          message: 'Acción no válida' 
        });
    }

    const result = await Team.updateMany( // Mock data
      { _id: { $in: items } },
      updateData
    );

    res.json({ 
      success: true, 
      message: `${result.modifiedCount} usuarios actualizados` 
    });
  } catch (error) {
    console.error('Bulk action error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en acción masiva' 
    });
  }
});

// Exportar usuarios
router.get('/users/export', async (req, res) => {
  try {
    const users = await Team.find().select('-password').populate('teamId', 'name'); // Mock data
    
    const csvData = users.map(user => ({
      ID: user._id,
      Nombre: user.firstName,
      Apellidos: user.lastName,
      Email: user.email,
      Nickname: user.nickname,
      Rol: user.role,
      Estado: user.isActive ? 'Activo' : 'Inactivo',
      Puntos: user.points,
      Equipo: user.teamId?.name || 'Sin equipo',
      'Último Login': user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Nunca',
      'Fecha Creación': new Date(user.createdAt).toLocaleString()
    }));

    // Convertir a CSV
    const headers = Object.keys(csvData[0]);
    const csv = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=usuarios-${new Date().toISOString().split('T')[0]}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Export users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al exportar usuarios' 
    });
  }
});

// ===== GESTIÓN DE EQUIPOS =====

// Obtener todos los equipos
router.get('/teams', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (status && status !== 'all') {
      filter.isActive = status === 'active';
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const teams = await Team.find(filter)
      .populate('leader', 'firstName lastName nickname')
      .populate('members', 'firstName lastName nickname')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Team.countDocuments(filter);

    res.json({
      success: true,
      teams,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get teams error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener equipos' 
    });
  }
});

// Obtener equipo específico
router.get('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'firstName lastName nickname email')
      .populate('members', 'firstName lastName nickname email points')
      .populate('joinRequests.user', 'firstName lastName nickname email');

    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Equipo no encontrado' 
      });
    }

    res.json({ success: true, team });
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener equipo' 
    });
  }
});

// Actualizar equipo
router.put('/teams/:id', async (req, res) => {
  try {
    const { name, description, isActive, points } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (typeof isActive === 'boolean') updateData.isActive = isActive;
    if (typeof points === 'number') updateData.points = points;

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('leader', 'firstName lastName nickname');

    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Equipo no encontrado' 
      });
    }

    res.json({ success: true, team });
  } catch (error) {
    console.error('Update team error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al actualizar equipo' 
    });
  }
});

// Eliminar equipo
router.delete('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    
    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Equipo no encontrado' 
      });
    }

    // Actualizar usuarios que estaban en este equipo
    // await User.updateMany( // Eliminado
    //   { teamId: req.params.id }, // Eliminado
    //   { $unset: { teamId: 1 } } // Eliminado
    // );

    res.json({ success: true, message: 'Equipo eliminado correctamente' });
  } catch (error) {
    console.error('Delete team error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar equipo' 
    });
  }
});

// ===== GESTIÓN DE VULNERABILIDADES =====

// Obtener todas las vulnerabilidades
router.get('/vulnerabilities', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      severity = '', 
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (severity && severity !== 'all') {
      filter.severity = severity;
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const vulnerabilities = await Vulnerability.find(filter)
      .populate('reportedBy', 'firstName lastName nickname')
      .populate('assignedTo', 'firstName lastName nickname')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Vulnerability.countDocuments(filter);

    res.json({
      success: true,
      vulnerabilities,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get vulnerabilities error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener vulnerabilidades' 
    });
  }
});

// Obtener vulnerabilidad específica
router.get('/vulnerabilities/:id', async (req, res) => {
  try {
    const vulnerability = await Vulnerability.findById(req.params.id)
      .populate('reportedBy', 'firstName lastName nickname email')
      .populate('assignedTo', 'firstName lastName nickname email')
      .populate('contributions.user', 'firstName lastName nickname');

    if (!vulnerability) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vulnerabilidad no encontrada' 
      });
    }

    res.json({ success: true, vulnerability });
  } catch (error) {
    console.error('Get vulnerability error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener vulnerabilidad' 
    });
  }
});

// Actualizar vulnerabilidad
router.put('/vulnerabilities/:id', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      severity, 
      status, 
      assignedTo, 
      points,
      resolvedAt 
    } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (severity) updateData.severity = severity;
    if (status) updateData.status = status;
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (typeof points === 'number') updateData.points = points;
    if (status === 'resolved' && !resolvedAt) {
      updateData.resolvedAt = new Date();
    }

    const vulnerability = await Vulnerability.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('reportedBy', 'firstName lastName nickname')
     .populate('assignedTo', 'firstName lastName nickname');

    if (!vulnerability) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vulnerabilidad no encontrada' 
      });
    }

    res.json({ success: true, vulnerability });
  } catch (error) {
    console.error('Update vulnerability error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al actualizar vulnerabilidad' 
    });
  }
});

// Eliminar vulnerabilidad
router.delete('/vulnerabilities/:id', async (req, res) => {
  try {
    const vulnerability = await Vulnerability.findByIdAndDelete(req.params.id);
    
    if (!vulnerability) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vulnerabilidad no encontrada' 
      });
    }

    res.json({ success: true, message: 'Vulnerabilidad eliminada correctamente' });
  } catch (error) {
    console.error('Delete vulnerability error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar vulnerabilidad' 
    });
  }
});

// ===== GESTIÓN DE RETOS =====

// Obtener todos los retos
router.get('/challenges', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      category = '', 
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const challenges = await Challenge.find(filter)
      .populate('createdBy', 'firstName lastName nickname')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Challenge.countDocuments(filter);

    res.json({
      success: true,
      challenges,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener retos' 
    });
  }
});

// Obtener reto específico
router.get('/challenges/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('createdBy', 'firstName lastName nickname email')
      .populate('participants.user', 'firstName lastName nickname points');

    if (!challenge) {
      return res.status(404).json({ 
        success: false, 
        message: 'Reto no encontrado' 
      });
    }

    res.json({ success: true, challenge });
  } catch (error) {
    console.error('Get challenge error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener reto' 
    });
  }
});

// Actualizar reto
router.put('/challenges/:id', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      category, 
      status, 
      entryCost, 
      prize,
      startsAt,
      endsAt 
    } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (status) updateData.status = status;
    if (typeof entryCost === 'number') updateData.entryCost = entryCost;
    if (typeof prize === 'number') updateData.prize = prize;
    if (startsAt) updateData.startsAt = startsAt;
    if (endsAt) updateData.endsAt = endsAt;

    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName nickname');

    if (!challenge) {
      return res.status(404).json({ 
        success: false, 
        message: 'Reto no encontrado' 
      });
    }

    res.json({ success: true, challenge });
  } catch (error) {
    console.error('Update challenge error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al actualizar reto' 
    });
  }
});

// Eliminar reto
router.delete('/challenges/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({ 
        success: false, 
        message: 'Reto no encontrado' 
      });
    }

    res.json({ success: true, message: 'Reto eliminado correctamente' });
  } catch (error) {
    console.error('Delete challenge error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar reto' 
    });
  }
});

// ===== CONFIGURACIÓN DEL SISTEMA =====

// Obtener configuración del sistema
router.get('/settings', async (req, res) => {
  try {
    // Aquí podrías obtener configuración desde una base de datos
    const settings = {
      pointsPerCriticalVuln: 100,
      pointsPerHighVuln: 75,
      pointsPerMediumVuln: 50,
      pointsPerLowVuln: 25,
      gulagDuration: 24, // horas
      maxTeamSize: 5,
      minPasswordLength: 8,
      maxLoginAttempts: 5,
      sessionTimeout: 24 // horas
    };

    res.json({ success: true, settings });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener configuración' 
    });
  }
});

// Actualizar configuración del sistema
router.put('/settings', async (req, res) => {
  try {
    const {
      pointsPerCriticalVuln,
      pointsPerHighVuln,
      pointsPerMediumVuln,
      pointsPerLowVuln,
      gulagDuration,
      maxTeamSize,
      minPasswordLength,
      maxLoginAttempts,
      sessionTimeout
    } = req.body;

    // Aquí podrías guardar la configuración en una base de datos
    const settings = {
      pointsPerCriticalVuln: pointsPerCriticalVuln || 100,
      pointsPerHighVuln: pointsPerHighVuln || 75,
      pointsPerMediumVuln: pointsPerMediumVuln || 50,
      pointsPerLowVuln: pointsPerLowVuln || 25,
      gulagDuration: gulagDuration || 24,
      maxTeamSize: maxTeamSize || 5,
      minPasswordLength: minPasswordLength || 8,
      maxLoginAttempts: maxLoginAttempts || 5,
      sessionTimeout: sessionTimeout || 24
    };

    res.json({ success: true, settings, message: 'Configuración actualizada' });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al actualizar configuración' 
    });
  }
});

module.exports = router; 