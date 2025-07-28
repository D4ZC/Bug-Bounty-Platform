const jwt = require('jsonwebtoken');

// Generar token JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'tu-secreto-jwt-super-seguro',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    }
  );
};

// Verificar token JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'tu-secreto-jwt-super-seguro');
  } catch (error) {
    throw new Error('Token inválido');
  }
};

// Generar token de verificación de email
const generateEmailVerificationToken = () => {
  return jwt.sign(
    { purpose: 'email-verification' },
    process.env.JWT_SECRET || 'tu-secreto-jwt-super-seguro',
    { expiresIn: '24h' }
  );
};

// Generar token para reset de contraseña
const generatePasswordResetToken = () => {
  return jwt.sign(
    { purpose: 'password-reset' },
    process.env.JWT_SECRET || 'tu-secreto-jwt-super-seguro',
    { expiresIn: '1h' }
  );
};

module.exports = {
  generateToken,
  verifyToken,
  generateEmailVerificationToken,
  generatePasswordResetToken
}; 