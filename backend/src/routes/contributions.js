const express = require('express');
const router = express.Router();

// Obtener todas las contribuciones
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// Obtener una contribución específica
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.params.id,
      title: 'Contribución de prueba',
      description: 'Descripción de la contribución',
      type: 'article',
      author: 'testuser',
      content: 'Contenido de ejemplo',
      status: 'published',
      votes: [],
      comments: [],
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
});

// Crear una nueva contribución
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