const express = require('express');
const router = express.Router();

// Obtener ranking de usuarios
router.get('/users', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// Obtener ranking de equipos
router.get('/teams', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

module.exports = router; 