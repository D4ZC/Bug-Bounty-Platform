const express = require('express');
const router = express.Router();

// Datos simulados de contribuciones
const mockContributions = [
  {
    _id: '1',
    title: 'Artículo sobre XSS',
    description: 'Explicación de XSS y cómo prevenirlo',
    type: 'article',
    author: 'alice',
    content: 'Contenido de ejemplo',
    status: 'published',
    votes: [],
    comments: [],
    tags: ['xss', 'seguridad'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'Guía de SQL Injection',
    description: 'Cómo detectar y explotar SQLi',
    type: 'guide',
    author: 'bob',
    content: 'Contenido de SQLi',
    status: 'published',
    votes: [],
    comments: [],
    tags: ['sqli', 'seguridad'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    title: 'Reporte de CSRF',
    description: 'Caso real de CSRF en una app',
    type: 'report',
    author: 'carla',
    content: 'Ejemplo de ataque CSRF',
    status: 'pending',
    votes: [],
    comments: [],
    tags: ['csrf'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Obtener todas las contribuciones
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockContributions
  });
});

// Obtener una contribución específica
router.get('/:id', (req, res) => {
  const contrib = mockContributions.find(c => c._id === req.params.id);
  if (!contrib) {
    return res.status(404).json({ success: false, error: 'Contribución no encontrada' });
  }
  res.json({
    success: true,
    data: contrib
  });
});

// Crear una nueva contribución
router.post('/', (req, res) => {
  const newContrib = {
    _id: (mockContributions.length + 1).toString(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mockContributions.push(newContrib);
  res.json({
    success: true,
    data: newContrib
  });
});

// PLACEHOLDER: Endpoints para gestión de contribuciones
// Ejemplo:
// router.post('/submit', (req, res) => res.json({ placeholder: true }));
// router.post('/vote', (req, res) => res.json({ placeholder: true }));

module.exports = router; 