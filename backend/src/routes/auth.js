const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser, getUserById } = require('../database');

// Middleware para verificar token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Ruta de prueba para verificar que el servidor funciona
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Auth route working!',
    timestamp: new Date().toISOString()
  });
});

// Ruta para verificar el estado del usuario autenticado
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Remover password del response
    const { password, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email y contraseña son requeridos' 
      });
    }

    // Buscar usuario por email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key',
      { expiresIn: '7d' }
    );

    // Remover password del response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;

    // Validar campos requeridos
    if (!email || !password || !username || !firstName || !lastName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos los campos son requeridos' 
      });
    }

    // Validar longitud de contraseña
    if (password.length < 4) {
      return res.status(400).json({ 
        success: false, 
        message: 'La contraseña debe tener al menos 4 caracteres' 
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'El email ya está registrado' 
      });
    }

    // Crear nuevo usuario
    const newUser = await createUser({
      email,
      password,
      username,
      firstName,
      lastName
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key',
      { expiresIn: '7d' }
    );

    // Remover password del response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Ruta de logout (solo para limpiar token en frontend)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout exitoso'
  });
});

module.exports = { router, authenticateToken }; 