const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

// Datos simulados de equipos
let mockClans = [
  {
    _id: '1',
    name: 'Cyber Hunters',
    description: 'Clan de cazadores de bugs elite',
    logo: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
    leader: 'alice',
    members: ['alice', 'bob'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    name: 'Shadow Hackers',
    description: 'Clan de hackers sigilosos',
    logo: 'https://cdn-icons-png.flaticon.com/512/616/616491.png',
    leader: 'carla',
    members: ['carla', 'daniel'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Listar todos los clanes
router.get('/', (req, res) => {
  res.json({ success: true, data: mockClans });
});

// Ver detalles de un clan
router.get('/:id', (req, res) => {
  const clan = mockClans.find(c => c._id === req.params.id);
  if (!clan) return res.status(404).json({ success: false, error: 'Clan no encontrado' });
  res.json({ success: true, data: clan });
});

// Crear un nuevo clan
router.post('/', authMiddleware, (req, res) => {
  const { name, description, logo, leader } = req.body;
  const newClan = {
    _id: (mockClans.length + 1).toString(),
    name,
    description,
    logo: logo || '',
    leader,
    members: [leader],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockClans.push(newClan);
  res.json({ success: true, data: newClan });
});

// Unirse a un clan
router.post('/:id/join', (req, res) => {
  const clan = mockClans.find(c => c._id === req.params.id);
  const { username } = req.body;
  if (!clan) return res.status(404).json({ success: false, error: 'Clan no encontrado' });
  if (!clan.members.includes(username)) clan.members.push(username);
  clan.updatedAt = new Date();
  res.json({ success: true, data: clan });
});

// Salir de un clan
router.post('/:id/leave', (req, res) => {
  const clan = mockClans.find(c => c._id === req.params.id);
  const { username } = req.body;
  if (!clan) return res.status(404).json({ success: false, error: 'Clan no encontrado' });
  clan.members = clan.members.filter(m => m !== username);
  clan.updatedAt = new Date();
  res.json({ success: true, data: clan });
});

module.exports = router; 