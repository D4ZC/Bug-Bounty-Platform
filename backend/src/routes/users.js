const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const roleMiddleware = require('../utils/roleMiddleware');
const { db } = require('../config/database');

// Proteger todas las rutas de usuarios
router.use(authMiddleware);

// Obtener todos los usuarios desde la base de datos
router.get('/', (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users').all();
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error al obtener usuarios' });
  }
});

// Obtener un usuario específico
router.get('/:id', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  res.json({
    success: true,
    data: user
  });
});

// --- ADMIN ENDPOINTS ---
// Eliminar usuario (solo admin)
router.delete('/:id', roleMiddleware('admin'), (req, res) => {
  try {
    const info = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
    if (info.changes === 0) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error al eliminar usuario' });
  }
});

// Editar usuario (solo admin)
router.put('/:id', roleMiddleware('admin'), (req, res) => {
  try {
    const { username, role } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }
    db.prepare('UPDATE users SET name = COALESCE(?, name), role = COALESCE(?, role), updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
      .run(username, role, req.params.id);
    const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error al editar usuario' });
  }
});

// Asignar Blue Points (solo admin)
router.patch('/:id/bluepoints', roleMiddleware('admin'), (req, res) => {
  try {
    const { bluePoints } = req.body;
    if (typeof bluePoints !== 'number' || bluePoints < 1) {
      return res.status(400).json({ success: false, error: 'Cantidad inválida de Blue Points' });
    }
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }
    db.prepare('UPDATE users SET bluePoints = bluePoints + ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
      .run(bluePoints, req.params.id);
    const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error al asignar Blue Points' });
  }
});

// Actualizar XP y nivel de un usuario
router.patch('/:id/xp', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  const { xp, level } = req.body;
  if (typeof xp === 'number') user.xp = xp;
  if (typeof level === 'number') user.level = level;
  user.updatedAt = new Date();
  res.json({ success: true, data: user });
});

// Actualizar logros de un usuario
router.patch('/:id/achievements', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  const { achievements } = req.body;
  if (Array.isArray(achievements)) user.achievements = achievements;
  user.updatedAt = new Date();
  res.json({ success: true, data: user });
});

// Obtener historial de canjes
router.get('/:id/redemptions', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  res.json({ success: true, data: user.redemptions || [] });
});
// Agregar un canje
router.post('/:id/redemptions', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  const redemption = req.body;
  if (!user.redemptions) user.redemptions = [];
  redemption.id = user.redemptions.length + 1;
  user.redemptions.push(redemption);
  user.updatedAt = new Date();
  res.json({ success: true, data: redemption });
});

// Obtener historial de actividades
router.get('/:id/activity', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  res.json({ success: true, data: user.activityLog || [] });
});
// Agregar una actividad
router.post('/:id/activity', (req, res) => {
  const user = mockUsers.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  const activity = req.body;
  if (!user.activityLog) user.activityLog = [];
  activity.id = user.activityLog.length + 1;
  activity.date = activity.date || new Date().toISOString().slice(0, 10);
  user.activityLog.unshift(activity); // más reciente primero
  user.updatedAt = new Date();
  res.json({ success: true, data: activity });
});

module.exports = router; 