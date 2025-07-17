const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Eliminar importación de database y referencias a healthCheck
// Eliminar uso de database.connect() y lógica de conexión
// Eliminar rutas protegidas y reemplazar por mocks

// Importar middleware de autenticación
const { authenticateToken } = require('./middleware/auth');

// Importar rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');
const vulnerabilityRoutes = require('./routes/vulnerabilities');
const rankingRoutes = require('./routes/rankings');
const challengeRoutes = require('./routes/challenges');
const shopRoutes = require('./routes/shop');
const contributionRoutes = require('./routes/contributions');
const adminRoutes = require('./routes/admin');
const logRoutes = require('./routes/logs');
// const chatRoutes = require('./routes/chat');

// Importar servidor WebSocket
const socketServer = require('./socket');

// Importar utilidades
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // límite por IP
  message: {
    error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Middlewares de seguridad y utilidad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "ws:", "wss:"]
    }
  }
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(compression());
app.use(limiter);
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware para logging de requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Middleware para manejo de errores de parsing JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'JSON inválido en el cuerpo de la petición'
    });
  }
  next();
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/teams', authenticateToken, teamRoutes);
app.use('/api/vulnerabilities', authenticateToken, vulnerabilityRoutes);
app.use('/api/rankings', authenticateToken, rankingRoutes);
app.use('/api/challenges', authenticateToken, challengeRoutes);
app.use('/api/shop', authenticateToken, shopRoutes);
app.use('/api/contributions', authenticateToken, contributionRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);
app.use('/api/logs', authenticateToken, logRoutes);
// app.use('/api/chat', authenticateToken, chatRoutes);

// Ruta de salud
app.get('/api/health', async (req, res) => {
  try {
    // Eliminar importación de database y referencias a healthCheck
    // Eliminar uso de database.connect() y lógica de conexión
    // Eliminar rutas protegidas y reemplazar por mocks
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      // database: dbHealth, // Removed as per edit hint
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      }
    });
  } catch (error) {
    logger.error('Error en health check:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Error en health check',
      error: error.message
    });
  }
});

// Ruta para obtener información de la API
app.get('/api', (req, res) => {
  res.json({
    name: 'Bug Bounty Platform API',
    version: '1.0.0',
    description: 'API para la gestión de vulnerabilidades y competencias',
    documentation: '/api/docs',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      teams: '/api/teams',
      vulnerabilities: '/api/vulnerabilities',
      rankings: '/api/rankings',
      challenges: '/api/challenges',
      shop: '/api/shop',
      contributions: '/api/contributions',
      admin: '/api/admin',
      chat: '/api/chat'
    },
    features: [
      'Autenticación JWT',
      'Gestión de usuarios y equipos',
      'Sistema de vulnerabilidades',
      'Rankings y puntuaciones',
      'Sistema de retos y duelos',
      'Tienda virtual con cosméticos',
      'Contribuciones técnicas',
      'Panel de administración',
      'Chat en tiempo real',
      'Sistema de logs'
    ]
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  logger.error('Error no manejado:', err);
  
  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors
    });
  }
  
  // Error de duplicado de Mongoose
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} ya existe en el sistema`
    });
  }
  
  // Error de cast de Mongoose
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID inválido'
    });
  }
  
  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expirado'
    });
  }
  
  // Error genérico
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });
});

// Ruta para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe en esta API`,
    availableEndpoints: [
      '/api/auth',
      '/api/users',
      '/api/teams',
      '/api/vulnerabilities',
      '/api/rankings',
      '/api/challenges',
      '/api/shop',
      '/api/contributions',
      '/api/admin',
      '/api/health'
    ]
  });
});

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Eliminar importación de database y referencias a healthCheck
    // Eliminar uso de database.connect() y lógica de conexión
    // Eliminar rutas protegidas y reemplazar por mocks

    // Crear servidor HTTP
    const server = app.listen(PORT, () => {
      logger.info(`Servidor corriendo en puerto ${PORT}`);
      logger.info(`Ambiente: ${process.env.NODE_ENV}`);
    });

    // Inicializar servidor WebSocket
    socketServer.initialize(server);
    logger.info('Servidor WebSocket inicializado');

    // Manejo de señales de terminación
    process.on('SIGTERM', () => {
      logger.info('SIGTERM recibido, cerrando servidor...');
      server.close(() => {
        logger.info('Servidor cerrado');
        // Eliminar importación de database y referencias a healthCheck
        // Eliminar uso de database.disconnect() y lógica de desconexión
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT recibido, cerrando servidor...');
      server.close(() => {
        logger.info('Servidor cerrado');
        // Eliminar importación de database y referencias a healthCheck
        // Eliminar uso de database.disconnect() y lógica de desconexión
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Iniciar servidor si este archivo se ejecuta directamente
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer }; 