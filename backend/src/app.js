const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Importar configuración de base de datos SQLite
const { db } = require('./config/database');
const { seedData } = require('./config/seedData');
const config = require('./config/config');

// Cargar variables de entorno
dotenv.config();

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

// Eliminar importaciones de middlewares
// Eliminar uso de authMiddleware y errorHandler en las rutas y app.use

// Eliminar importación y uso de socketService

// Eliminar importación y uso de cronService

const app = express();
const PORT = config.port;

// Configuración de rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // límite por IP
  message: {
    error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
  }
});

// Middlewares de seguridad y utilidadclear
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(compression());
app.use(limiter);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/vulnerabilities', vulnerabilityRoutes);
app.use('/api/rankings', rankingRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/admin', adminRoutes);

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Ruta para obtener información de la API
app.get('/api', (req, res) => {
  res.json({
    name: 'Bug Bounty Platform API',
    version: '1.0.0',
    description: 'API para la gestión de vulnerabilidades y competencias',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      teams: '/api/teams',
      vulnerabilities: '/api/vulnerabilities',
      rankings: '/api/rankings',
      challenges: '/api/challenges',
      shop: '/api/shop',
      contributions: '/api/contributions',
      admin: '/api/admin'
    }
  });
});

// Middleware de manejo de errores
// Eliminar errorHandler

// Ruta para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe en esta API`
  });
});

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Poblar base de datos con datos de ejemplo
    seedData();
    
    // Iniciar servidor HTTP
    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`🌍 Ambiente: ${config.nodeEnv}`);
      console.log(`📊 Base de datos SQLite: ${config.database.path}`);
      console.log(`🔗 API disponible en: http://localhost:${PORT}/api`);
      console.log(`💡 Modo desarrollo: ${config.development.enableMockAuth ? 'Activado' : 'Desactivado'}`);
    });
    
    // Manejo de señales para cierre graceful
    process.on('SIGTERM', () => {
      console.log('SIGTERM recibido, cerrando servidor...');
      server.close(() => {
        console.log('Servidor cerrado');
        process.exit(0);
      });
    });
    
    process.on('SIGINT', () => {
      console.log('SIGINT recibido, cerrando servidor...');
      server.close(() => {
        console.log('Servidor cerrado');
        process.exit(0);
      });
    });
    
  } catch (error) {
    console.error('Error iniciando servidor:', error);
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Iniciar servidor si este archivo se ejecuta directamente
if (require.main === module) {
  startServer();
}

module.exports = app; 