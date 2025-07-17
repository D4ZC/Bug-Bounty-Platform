const express = require('express');
const { body, validationResult } = require('express-validator');
const { requireRole, requireTeamLeader, requireTeamMembership } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Validaciones
const createTeamValidation = [
  body('name').trim().isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('La descripción no puede exceder 500 caracteres'),
  body('leaderId').isString().notEmpty().withMessage('ID de líder requerido')
];

const updateTeamValidation = [
  body('name').optional().trim().isLength({ min: 3, max: 50 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('logo').optional().isURL().withMessage('URL de logo inválida')
];

/**
 * @route   GET /api/teams
 * @desc    Obtener lista de equipos
 * @access  Private
 */
// Obtener todos los equipos (mock)
router.get('/', (req, res) => {
  res.json({
    success: true,
    teams: [
      {
        _id: 'mockteamid1',
        name: 'Equipo Alpha',
        description: 'Equipo de ejemplo Alpha',
        logo: null,
        leaderId: 'mockuserid1',
        members: [
          { userId: 'mockuserid1', role: 'leader' },
          { userId: 'mockuserid2', role: 'member' }
        ],
        points: 1000,
        isMVP: false
      },
      {
        _id: 'mockteamid2',
        name: 'Equipo Beta',
        description: 'Equipo de ejemplo Beta',
        logo: null,
        leaderId: 'mockuserid2',
        members: [
          { userId: 'mockuserid2', role: 'leader' }
        ],
        points: 500,
        isMVP: true
      }
    ]
  });
});

/**
 * @route   POST /api/teams
 * @desc    Crear nuevo equipo
 * @access  Private (admin)
 */
router.post('/', requireRole('admin'), createTeamValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { name, description, leaderId, logo } = req.body;

    // Verificar si el nombre ya existe
    // const existingTeam = await Team.findOne({ name }); // Eliminado
    // if (existingTeam) { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Ya existe un equipo con ese nombre' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Verificar que el líder existe
    // const leader = await User.findById(leaderId); // Eliminado
    // if (!leader) { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Líder no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Crear equipo
    // const team = new Team({ // Eliminado
    //   name, // Eliminado
    //   description, // Eliminado
    //   leaderId, // Eliminado
    //   logo // Eliminado
    // }); // Eliminado

    // await team.save(); // Eliminado

    // Agregar líder como miembro
    // team.addMember(leaderId, 'leader'); // Eliminado
    // await team.save(); // Eliminado

    // Actualizar usuario con el nuevo equipo
    // leader.teamId = team._id; // Eliminado
    // leader.role = 'team_leader'; // Eliminado
    // await leader.save(); // Eliminado

    logger.info(`Nuevo equipo creado: ${name}`);

    res.status(201).json({
      success: true,
      message: 'Equipo creado exitosamente',
      data: { team: { _id: 'mockteamid1', name, description, leaderId, logo } } // Mock data
    });

  } catch (error) {
    logger.error('Error al crear equipo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   GET /api/teams/:id
 * @desc    Obtener equipo por ID
 * @access  Private
 */
// Obtener equipo específico (mock)
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    team: {
      _id: req.params.id,
      name: 'Equipo Mock',
      description: 'Equipo de ejemplo',
      logo: null,
      leaderId: 'mockuserid1',
      members: [
        { userId: 'mockuserid1', role: 'leader' },
        { userId: 'mockuserid2', role: 'member' }
      ],
      points: 1000,
      isMVP: false
    }
  });
});

/**
 * @route   PUT /api/teams/:id
 * @desc    Actualizar equipo
 * @access  Private (líder o admin)
 */
router.put('/:id', requireTeamLeader, updateTeamValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { name, description, logo, settings } = req.body;
    // const team = await Team.findById(req.params.id); // Eliminado

    // if (!team) { // Eliminado
    //   return res.status(404).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Equipo no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Verificar nombre único si se está cambiando
    // if (name && name !== team.name) { // Eliminado
    //   const existingTeam = await Team.findOne({ name }); // Eliminado
    //   if (existingTeam) { // Eliminado
    //     return res.status(400).json({ // Eliminado
    //       success: false, // Eliminado
    //       message: 'Ya existe un equipo con ese nombre' // Eliminado
    //     }); // Eliminado
    //   } // Eliminado
    // } // Eliminado

    // Actualizar campos
    // if (name) team.name = name; // Eliminado
    // if (description !== undefined) team.description = description; // Eliminado
    // if (logo !== undefined) team.logo = logo; // Eliminado
    // if (settings) { // Eliminado
    //   team.settings = { ...team.settings, ...settings }; // Eliminado
    // } // Eliminado

    // await team.save(); // Eliminado

    logger.info(`Equipo actualizado: ${name}`);

    res.json({
      success: true,
      message: 'Equipo actualizado exitosamente',
      data: { team: { _id: req.params.id, name, description, logo } } // Mock data
    });

  } catch (error) {
    logger.error('Error al actualizar equipo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   GET /api/teams/:id/statistics
 * @desc    Obtener estadísticas del equipo
 * @access  Private
 */
router.get('/:id/statistics', async (req, res) => {
  try {
    // const team = await Team.findById(req.params.id) // Eliminado
    //   .populate('members.userId', 'points monthlyPoints vulnerabilitiesResolved totalVulnerabilities'); // Eliminado

    // if (!team) { // Eliminado
    //   return res.status(404).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Equipo no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // // Obtener vulnerabilidades del equipo // Eliminado
    // const vulnerabilities = await Vulnerability.find({ // Eliminado
    //   teamId: team._id, // Eliminado
    //   status: 'closed' // Eliminado
    // }); // Eliminado

    // // Calcular estadísticas // Eliminado
    // const totalMembers = team.members.length; // Eliminado
    // const totalPoints = team.members.reduce((sum, member) => sum + member.userId.points, 0); // Eliminado
    // const totalMonthlyPoints = team.members.reduce((sum, member) => sum + member.userId.monthlyPoints, 0); // Eliminado
    
    // const totalVulnerabilities = vulnerabilities.length; // Eliminado
    // const criticalCount = vulnerabilities.filter(v => v.severity === 'critical').length; // Eliminado
    // const highCount = vulnerabilities.filter(v => v.severity === 'high').length; // Eliminado
    // const mediumCount = vulnerabilities.filter(v => v.severity === 'medium').length; // Eliminado
    // const lowCount = vulnerabilities.filter(v => v.severity === 'low').length; // Eliminado

    // // Calcular participación // Eliminado
    // const activeMembers = team.members.filter(member =>  // Eliminado
    //   member.userId.totalVulnerabilities > 0 // Eliminado
    // ).length; // Eliminado
    // const participationRate = totalMembers > 0 ? (activeMembers / totalMembers) * 100 : 0; // Eliminado

    const statistics = {
      totalPoints: 1500, // Mock data
      monthlyPoints: 500, // Mock data
      rank: 1, // Mock data
      isMVP: false, // Mock data
      mvpStreak: 0, // Mock data
      members: {
        total: 2, // Mock data
        active: 1, // Mock data
        participationRate: 50 // Mock data
      },
      vulnerabilities: {
        total: 10, // Mock data
        critical: 2, // Mock data
        high: 3, // Mock data
        medium: 4, // Mock data
        low: 1 // Mock data
      },
      averagePointsPerMember: 750, // Mock data
      averageVulnerabilitiesPerMember: 5 // Mock data
    };

    res.json({
      success: true,
      data: { statistics }
    });

  } catch (error) {
    logger.error('Error al obtener estadísticas del equipo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   GET /api/teams/:id/members
 * @desc    Obtener miembros del equipo
 * @access  Private
 */
router.get('/:id/members', async (req, res) => {
  try {
    // const team = await Team.findById(req.params.id) // Eliminado
    //   .populate('members.userId', 'firstName lastName nickname avatar points rank isMVP'); // Eliminado

    // if (!team) { // Eliminado
    //   return res.status(404).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Equipo no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // // Ordenar miembros por puntos // Eliminado
    // const sortedMembers = team.members.sort((a, b) => b.userId.points - a.userId.points); // Eliminado

    const members = [
      { userId: 'mockuserid1', role: 'leader' },
      { userId: 'mockuserid2', role: 'member' }
    ];

    res.json({
      success: true,
      data: { members }
    });

  } catch (error) {
    logger.error('Error al obtener miembros del equipo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   POST /api/teams/:id/members
 * @desc    Agregar miembro al equipo
 * @access  Private (líder o admin)
 */
router.post('/:id/members', requireTeamLeader, async (req, res) => {
  try {
    const { userId, role = 'member' } = req.body;
    // const team = await Team.findById(req.params.id); // Eliminado

    // if (!team) { // Eliminado
    //   return res.status(404).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Equipo no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Verificar que el usuario existe
    // const user = await User.findById(userId); // Eliminado
    // if (!user) { // Eliminado
    //   return res.status(404).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Usuario no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Verificar que no es ya miembro
    // if (team.isMember(userId)) { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'El usuario ya es miembro del equipo' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Verificar límite de miembros
    // if (!team.canAcceptMembers()) { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'El equipo ha alcanzado el límite de miembros' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Agregar miembro
    // team.addMember(userId, role); // Eliminado
    // await team.save(); // Eliminado

    // Actualizar usuario
    // user.teamId = team._id; // Eliminado
    // await user.save(); // Eliminado

    logger.info(`Miembro agregado al equipo mock: ${userId}`);

    res.json({
      success: true,
      message: 'Miembro agregado exitosamente'
    });

  } catch (error) {
    logger.error('Error al agregar miembro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   DELETE /api/teams/:id/members/:userId
 * @desc    Remover miembro del equipo
 * @access  Private (líder o admin)
 */
router.delete('/:id/members/:userId', requireTeamLeader, async (req, res) => {
  try {
    const { userId } = req.params;
    // const team = await Team.findById(req.params.id); // Eliminado

    // if (!team) { // Eliminado
    //   return res.status(404).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Equipo no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Verificar que es miembro
    // if (!team.isMember(userId)) { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'El usuario no es miembro del equipo' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // No permitir remover al líder
    // if (team.leaderId.toString() === userId) { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'No se puede remover al líder del equipo' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Remover miembro
    // team.removeMember(userId); // Eliminado
    // await team.save(); // Eliminado

    // Actualizar usuario (asignar a equipo por defecto o null)
    // const user = await User.findById(userId); // Eliminado
    // if (user) { // Eliminado
    //   user.teamId = null; // O asignar a un equipo por defecto // Eliminado
    //   user.role = 'member'; // Eliminado
    //   await user.save(); // Eliminado
    // } // Eliminado

    logger.info(`Miembro removido del equipo mock: ${userId}`);

    res.json({
      success: true,
      message: 'Miembro removido exitosamente'
    });

  } catch (error) {
    logger.error('Error al remover miembro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   POST /api/teams/:id/join-request
 * @desc    Solicitar unirse al equipo
 * @access  Private
 */
router.post('/:id/join-request', async (req, res) => {
  try {
    const { message } = req.body;
    // const team = await Team.findById(req.params.id); // Eliminado

    // if (!team) { // Eliminado
    //   return res.status(404).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Equipo no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // if (!team.settings.allowJoinRequests) { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Este equipo no acepta solicitudes de unión' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Verificar que no es ya miembro
    // if (team.isMember(req.user._id)) { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Ya eres miembro de este equipo' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Verificar que no hay solicitud pendiente
    // const existingRequest = team.joinRequests.find( // Eliminado
    //   req => req.userId.toString() === req.user._id.toString() && req.status === 'pending' // Eliminado
    // ); // Eliminado

    // if (existingRequest) { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Ya tienes una solicitud pendiente' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // Agregar solicitud
    // team.joinRequests.push({ // Eliminado
    //   userId: req.user._id, // Eliminado
    //   message: message || '' // Eliminado
    // }); // Eliminado

    // await team.save(); // Eliminado

    logger.info(`Solicitud de unión enviada al equipo mock: ${req.user.email}`);

    res.json({
      success: true,
      message: 'Solicitud enviada exitosamente'
    });

  } catch (error) {
    logger.error('Error al enviar solicitud de unión:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   PUT /api/teams/:id/join-requests/:requestId
 * @desc    Responder a solicitud de unión
 * @access  Private (líder o admin)
 */
router.put('/:id/join-requests/:requestId', requireTeamLeader, async (req, res) => {
  try {
    const { status } = req.body; // 'approved' o 'rejected'
    // const team = await Team.findById(req.params.id); // Eliminado

    // if (!team) { // Eliminado
    //   return res.status(404).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Equipo no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // const request = team.joinRequests.id(req.params.requestId); // Eliminado
    // if (!request) { // Eliminado
    //   return res.status(404).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Solicitud no encontrada' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // if (request.status !== 'pending') { // Eliminado
    //   return res.status(400).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'La solicitud ya fue procesada' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // request.status = status; // Eliminado

    // if (status === 'approved') { // Eliminado
    //   // Verificar límite de miembros // Eliminado
    //   if (!team.canAcceptMembers()) { // Eliminado
    //     return res.status(400).json({ // Eliminado
    //       success: false, // Eliminado
    //       message: 'El equipo ha alcanzado el límite de miembros' // Eliminado
    //     }); // Eliminado
    //   } // Eliminado

    //   // Agregar miembro // Eliminado
    //   team.addMember(request.userId); // Eliminado
      
    //   // Actualizar usuario // Eliminado
    //   const user = await User.findById(request.userId); // Eliminado
    //   if (user) { // Eliminado
    //     user.teamId = team._id; // Eliminado
    //     await user.save(); // Eliminado
    //   } // Eliminado
    // } // Eliminado

    // await team.save(); // Eliminado

    logger.info(`Solicitud de unión ${status} en equipo mock: ${req.params.requestId}`);

    res.json({
      success: true,
      message: `Solicitud ${status === 'approved' ? 'aprobada' : 'rechazada'} exitosamente`
    });

  } catch (error) {
    logger.error('Error al procesar solicitud de unión:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * @route   DELETE /api/teams/:id
 * @desc    Eliminar equipo (solo admin)
 * @access  Private (admin)
 */
router.delete('/:id', requireRole('admin'), async (req, res) => {
  try {
    // const team = await Team.findById(req.params.id); // Eliminado
    
    // if (!team) { // Eliminado
    //   return res.status(404).json({ // Eliminado
    //     success: false, // Eliminado
    //     message: 'Equipo no encontrado' // Eliminado
    //   }); // Eliminado
    // } // Eliminado

    // // Remover usuarios del equipo // Eliminado
    // for (const member of team.members) { // Eliminado
    //   const user = await User.findById(member.userId); // Eliminado
    //   if (user) { // Eliminado
    //     user.teamId = null; // Eliminado
    //     user.role = 'member'; // Eliminado
    //     await user.save(); // Eliminado
    //   } // Eliminado
    // } // Eliminado

    // await Team.findByIdAndDelete(req.params.id); // Eliminado

    logger.info(`Equipo eliminado: ${req.params.id}`);

    res.json({
      success: true,
      message: 'Equipo eliminado exitosamente'
    });

  } catch (error) {
    logger.error('Error al eliminar equipo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router; 