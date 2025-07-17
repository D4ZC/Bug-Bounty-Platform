const express = require('express');
const router = express.Router();

// Datos simulados de la tienda
const mockShopItems = [
  {
    _id: '1',
    name: 'Camiseta Bug Bounty',
    price: 20,
    stock: 10,
    description: 'Camiseta oficial del evento',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Sticker Pack',
    price: 5,
    stock: 50,
    description: 'Stickers exclusivos de la plataforma',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'Taza Hacker',
    price: 12,
    stock: 20,
    description: 'Taza edición limitada',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Ruta de prueba para la tienda
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Shop route working!',
    timestamp: new Date().toISOString()
  });
});

// Obtener todos los items de la tienda
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockShopItems
  });
});

// Comprar un item (placeholder)
router.post('/buy', (req, res) => {
  const item = mockShopItems.find(i => i._id === req.body.itemId);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Item no encontrado' });
  }
  res.json({
    success: true,
    message: 'Compra realizada (simulada)',
    item: item._id,
    date: new Date()
  });
});

// PLACEHOLDER: Endpoints para gestión de tienda y blue points
// Ejemplo:
// router.get('/items', (req, res) => res.json({ placeholder: true }));
// router.post('/buy', (req, res) => res.json({ placeholder: true }));

module.exports = router; 