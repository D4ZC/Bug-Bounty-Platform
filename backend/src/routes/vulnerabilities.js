const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

// Datos simulados de vulnerabilidades
const mockVulns = [
  {
    _id: '1',
    title: 'XSS en login',
    description: 'Cross-site scripting en el formulario de login',
    severity: 'medium',
    status: 'open',
    reporter: 'alice',
    target: 'example.com',
    points: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'SQL Injection en búsqueda',
    description: 'Inyección SQL en el endpoint de búsqueda',
    severity: 'high',
    status: 'closed',
    reporter: 'bob',
    target: 'api.example.com',
    points: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    title: 'CSRF en perfil',
    description: 'Cross-site request forgery en la edición de perfil',
    severity: 'low',
    status: 'open',
    reporter: 'carla',
    target: 'profile.example.com',
    points: 30,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Obtener todas las vulnerabilidades
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockVulns
  });
});

// Obtener una vulnerabilidad específica
router.get('/:id', (req, res) => {
  const vuln = mockVulns.find(v => v._id === req.params.id);
  if (!vuln) {
    return res.status(404).json({ success: false, error: 'Vulnerabilidad no encontrada' });
  }
  res.json({
    success: true,
    data: vuln
  });
});

// Crear una nueva vulnerabilidad
router.post('/', authMiddleware, (req, res) => {
  const newVuln = {
    _id: (mockVulns.length + 1).toString(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mockVulns.push(newVuln);
  res.json({
    success: true,
    data: newVuln
  });
});

module.exports = router; 