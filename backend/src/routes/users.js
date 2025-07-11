const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

// Datos simulados de usuarios
const mockUsers = [
  {
    _id: '1',
    email: 'alice@example.com',
    username: 'alice',
    firstName: 'Alice',
    lastName: 'Doe',
    role: 'member',
    points: 100,
    xp: 500,
    level: 5,
    achievements: [
      {
        id: 1,
        name: 'Primer Bug',
        description: 'Reporta tu primera vulnerabilidad.',
        icon: '🐞',
        unlocked: true,
        reward: '+50 XP',
        dateUnlocked: '2024-01-10',
      },
      {
        id: 2,
        name: 'Cazador',
        description: 'Reporta 10 vulnerabilidades.',
        icon: '🏆',
        unlocked: false,
        reward: '+100 XP',
      },
    ],
    redemptions: [
      {
        id: 1,
        recompensa: 'Camiseta Oficial',
        puntos_gastados: 200,
        fecha_canje: '2023-12-01',
      },
    ],
    activityLog: [
      {
        id: 1,
        type: 'points',
        description: 'Ganaste 100 puntos por vulnerabilidad crítica',
        points: 100,
        date: '2024-06-01',
      },
      {
        id: 2,
        type: 'achievement',
        description: 'Desbloqueaste el logro "Primer Bug"',
        points: 0,
        date: '2024-06-02',
      },
    ],
    rank: 1,
    isMVP: false,
    isGulagParticipant: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    email: 'bob@example.com',
    username: 'bob',
    firstName: 'Bob',
    lastName: 'Smith',
    role: 'admin',
    points: 200,
    xp: 1200,
    level: 8,
    achievements: [
      {
        id: 1,
        name: 'Primer Bug',
        description: 'Reporta tu primera vulnerabilidad.',
        icon: '🐞',
        unlocked: true,
        reward: '+50 XP',
        dateUnlocked: '2024-01-12',
      },
      {
        id: 3,
        name: 'Comprador',
        description: 'Canjea tu primer producto.',
        icon: '🛒',
        unlocked: true,
        reward: '+25 XP',
        dateUnlocked: '2024-02-01',
      },
    ],
    redemptions: [],
    activityLog: [],
    rank: 2,
    isMVP: true,
    isGulagParticipant: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    email: 'carla@example.com',
    username: 'carla',
    firstName: 'Carla',
    lastName: 'García',
    role: 'member',
    points: 150,
    xp: 700,
    level: 6,
    achievements: [
      {
        id: 1,
        name: 'Primer Bug',
        description: 'Reporta tu primera vulnerabilidad.',
        icon: '🐞',
        unlocked: true,
        reward: '+50 XP',
        dateUnlocked: '2024-01-15',
      },
      {
        id: 4,
        name: 'Guerrero',
        description: 'Derrota a 5 enemigos.',
        icon: '⚔️',
        unlocked: false,
        reward: '+150 XP',
      },
    ],
    redemptions: [],
    activityLog: [],
    rank: 3,
    isMVP: false,
    isGulagParticipant: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    email: 'daniel@example.com',
    username: 'daniel',
    firstName: 'Daniel',
    lastName: 'Pérez',
    role: 'member',
    points: 80,
    xp: 300,
    level: 4,
    achievements: [
      {
        id: 1,
        name: 'Primer Bug',
        description: 'Reporta tu primera vulnerabilidad.',
        icon: '🐞',
        unlocked: true,
        reward: '+50 XP',
        dateUnlocked: '2024-01-20',
      },
    ],
    redemptions: [],
    activityLog: [],
    rank: 4,
    isMVP: false,
    isGulagParticipant: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Proteger todas las rutas de usuarios
router.use(authMiddleware);

// Obtener todos los usuarios
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockUsers
  });
});

// Obtener un usuario específico
router.get('/:id', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  res.json({
    success: true,
    data: user
  });
});

// Actualizar XP y nivel de un usuario
router.patch('/:id/xp', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  const { xp, level } = req.body;
  if (typeof xp === 'number') user.xp = xp;
  if (typeof level === 'number') user.level = level;
  user.updatedAt = new Date();
  res.json({ success: true, data: user });
});

// Actualizar logros de un usuario
router.patch('/:id/achievements', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  const { achievements } = req.body;
  if (Array.isArray(achievements)) user.achievements = achievements;
  user.updatedAt = new Date();
  res.json({ success: true, data: user });
});

// Obtener historial de canjes
router.get('/:id/redemptions', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  res.json({ success: true, data: user.redemptions || [] });
});
// Agregar un canje
router.post('/:id/redemptions', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  const redemption = req.body;
  if (!user.redemptions) user.redemptions = [];
  redemption.id = user.redemptions.length + 1;
  user.redemptions.push(redemption);
  user.updatedAt = new Date();
  res.json({ success: true, data: redemption });
});

// Obtener historial de actividades
router.get('/:id/activity', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  res.json({ success: true, data: user.activityLog || [] });
});
// Agregar una actividad
router.post('/:id/activity', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  const activity = req.body;
  if (!user.activityLog) user.activityLog = [];
  activity.id = user.activityLog.length + 1;
  activity.date = activity.date || new Date().toISOString().slice(0, 10);
  user.activityLog.unshift(activity); // más reciente primero
  user.updatedAt = new Date();
  res.json({ success: true, data: activity });
});

module.exports = router; 