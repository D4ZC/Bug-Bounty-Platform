const { authorize } = require('./auth');

// Middleware para rutas que requieren rol de admin
const adminAuth = authorize('admin');

// Middleware para rutas que requieren rol de admin o moderator
const adminOrModeratorAuth = authorize('admin', 'moderator');

module.exports = {
  adminAuth,
  adminOrModeratorAuth
}; 