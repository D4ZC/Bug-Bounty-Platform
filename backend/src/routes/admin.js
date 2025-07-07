const express = require('express');
const router = express.Router();

// Ruta de prueba para admin
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Admin route working!',
    timestamp: new Date().toISOString()
  });
});

// Datos simulados de estadísticas
const mockStats = {
  users: 4,
  teams: 2,
  vulnerabilities: 3,
  challenges: 3,
  contributions: 3,
  lastUpdate: new Date()
};

// Ruta para obtener estadísticas generales
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: mockStats
  });
});

module.exports = router; 