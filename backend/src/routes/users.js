const express = require('express');
const router = express.Router();

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
    rank: 4,
    isMVP: false,
    isGulagParticipant: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

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

module.exports = router; 