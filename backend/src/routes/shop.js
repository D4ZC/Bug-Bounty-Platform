const express = require('express');
const router = express.Router();

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
    data: []
  });
});

// Comprar un item (placeholder)
router.post('/buy', (req, res) => {
  res.json({
    success: true,
    message: 'Compra realizada (simulada)',
    item: req.body.itemId || 'item-id',
    date: new Date()
  });
});

module.exports = router; 