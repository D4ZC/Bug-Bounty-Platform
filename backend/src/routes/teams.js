const express = require('express');
const router = express.Router();

// Datos simulados de equipos
const mockTeams = [
  {
    _id: '1',
    name: 'Equipo Alpha',
    description: 'Equipo de prueba Alpha',
    leader: 'alice',
    members: ['alice', 'bob'],
    points: 300,
    rank: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Equipo Beta',
    description: 'Equipo de prueba Beta',
    leader: 'carla',
    members: ['carla', 'daniel'],
    points: 180,
    rank: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Obtener todos los equipos
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockTeams
  });
});

// Obtener un equipo específico
router.get('/:id', (req, res) => {
  const team = mockTeams.find(t => t._id === req.params.id);
  if (!team) {
    return res.status(404).json({ success: false, error: 'Equipo no encontrado' });
  }
  res.json({
    success: true,
    data: team
  });
});

// PLACEHOLDER: Endpoints para gestión de equipos, ranking y MVP
// Ejemplo:
// router.get('/ranking', (req, res) => res.json({ placeholder: true }));
// router.get('/mvp', (req, res) => res.json({ placeholder: true }));

module.exports = router; 