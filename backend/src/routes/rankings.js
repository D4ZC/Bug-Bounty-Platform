const express = require('express');
const router = express.Router();

// Datos simulados de ranking
const mockUserRanking = [
  { username: 'alice', points: 100, rank: 1 },
  { username: 'bob', points: 80, rank: 2 },
  { username: 'carla', points: 150, rank: 3 },
  { username: 'daniel', points: 80, rank: 4 }
];
const mockTeamRanking = [
  { name: 'Equipo Alpha', points: 300, rank: 1 },
  { name: 'Equipo Beta', points: 180, rank: 2 }
];

// Obtener ranking de usuarios
router.get('/users', (req, res) => {
  res.json({
    success: true,
    data: mockUserRanking
  });
});

// Obtener ranking de equipos
router.get('/teams', (req, res) => {
  res.json({
    success: true,
    data: mockTeamRanking
  });
});

module.exports = router; 