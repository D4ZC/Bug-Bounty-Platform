const express = require('express');
const router = express.Router();

// Obtener todas las vulnerabilidades
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// Obtener una vulnerabilidad específica
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.params.id,
      title: 'Vulnerabilidad de prueba',
      description: 'Descripción de prueba',
      severity: 'medium',
      status: 'open',
      reporter: 'testuser',
      target: 'example.com',
      points: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
});

// Crear una nueva vulnerabilidad
router.post('/', (req, res) => {
  res.json({
    success: true,
    data: {
      _id: 'new-id',
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
});

module.exports = router; 