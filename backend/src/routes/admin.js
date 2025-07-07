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

// Ruta para obtener estadísticas generales
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      users: 0,
      teams: 0,
      vulnerabilities: 0,
      challenges: 0,
      contributions: 0,
      lastUpdate: new Date()
    }
  });
});

module.exports = router; 