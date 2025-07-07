const express = require('express');
const router = express.Router();

// Obtener todos los retos
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// Obtener un reto específico
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.params.id,
      title: 'Reto de prueba',
      description: 'Descripción del reto',
      category: 'web',
      difficulty: 'medium',
      points: 100,
      status: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      participants: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
});

module.exports = router; 