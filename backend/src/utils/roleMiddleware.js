const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (!req.user || req.user.role !== requiredRole) {
    return res.status(403).json({ error: 'Acceso denegado: permisos insuficientes' });
  }
  next();
};

module.exports = roleMiddleware; 