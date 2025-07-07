const express = require('express');
const router = express.Router();

// Ruta de prueba para verificar que el servidor funciona
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Auth route working!',
    timestamp: new Date().toISOString()
  });
});

// Ruta para verificar el estado del usuario autenticado
router.get('/me', (req, res) => {
  // Por ahora retornamos un usuario de prueba
  res.json({
    success: true,
    data: {
      _id: '1',
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

// Ruta de login (placeholder)
router.post('/login', (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        _id: '1',
        email: req.body.email || 'test@example.com',
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
    }
  });
});

// Ruta de registro (placeholder)
router.post('/register', (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        _id: '1',
        email: req.body.email || 'test@example.com',
        username: req.body.username || 'testuser',
        firstName: req.body.firstName || 'Test',
        lastName: req.body.lastName || 'User',
        role: 'member',
        points: 0,
        rank: 1,
        isMVP: false,
        isGulagParticipant: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
  });
});

module.exports = router; 