const express = require('express');
const router = express.Router();
const { mockUsers } = require('./users');

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
  // Ordenar por puntos y XP descendente
  const ranking = (mockUsers || []).slice().sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return (b.xp || 0) - (a.xp || 0);
  });
  res.json({
    success: true,
    data: ranking.map((u, i) => ({
      id: u._id,
      username: u.username,
      avatar: u.avatarUrl || '',
      points: u.points,
      xp: u.xp || 0,
      level: u.level || 1,
      rank: i + 1,
    })),
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