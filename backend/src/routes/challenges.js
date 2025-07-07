const express = require('express');
const router = express.Router();

// Datos simulados de retos
const mockChallenges = [
  {
    _id: '1',
    title: 'Reto SQLi',
    description: 'Encuentra y explota una inyección SQL',
    category: 'web',
    difficulty: 'medium',
    points: 100,
    status: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    participants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'Reto XSS',
    description: 'Demuestra un XSS en el chat',
    category: 'web',
    difficulty: 'easy',
    points: 50,
    status: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    participants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    title: 'Reto CSRF',
    description: 'Realiza un ataque CSRF exitoso',
    category: 'web',
    difficulty: 'hard',
    points: 200,
    status: 'inactive',
    startDate: new Date(),
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    participants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Obtener todos los retos
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockChallenges
  });
});

// Obtener un reto específico
router.get('/:id', (req, res) => {
  const challenge = mockChallenges.find(c => c._id === req.params.id);
  if (!challenge) {
    return res.status(404).json({ success: false, error: 'Reto no encontrado' });
  }
  res.json({
    success: true,
    data: challenge
  });
});

module.exports = router; 