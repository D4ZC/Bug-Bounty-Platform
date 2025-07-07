const express = require('express');
const router = express.Router();

// Obtener todos los equipos
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// Obtener un equipo específico
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.params.id,
      name: 'Equipo de prueba',
      description: 'Descripción del equipo',
      leader: 'testuser',
      members: ['testuser'],
      points: 0,
      rank: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
});

module.exports = router; 