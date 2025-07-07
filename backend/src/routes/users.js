const express = require('express');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// Obtener un usuario específico
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.params.id,
      email: 'test@example.com',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      role: 'member',
      points: 0,
      rank: 1,
      isMVP: false,
      isGulagParticipant: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
});

module.exports = router; 