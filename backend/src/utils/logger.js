const fs = require('fs');
const path = require('path');

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Función para formatear fecha
const formatDate = (date) => {
  return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

// Función para obtener nivel de log
const getLogLevel = () => {
  return process.env.LOG_LEVEL || 'info';
};

// Función para escribir log
const writeLog = (level, message, meta = {}) => {
  const timestamp = formatDate(new Date());
  const logEntry = {
    timestamp,
    level: level.toUpperCase(),
    message,
    ...meta
  };

  const logString = JSON.stringify(logEntry) + '\n';
  
  // Escribir a archivo
  const logFile = path.join(logsDir, `${level}.log`);
  fs.appendFileSync(logFile, logString);

  // También escribir a consola en desarrollo
  if (process.env.NODE_ENV === 'development') {
    const colors = {
      error: '\x1b[31m', // Rojo
      warn: '\x1b[33m',  // Amarillo
      info: '\x1b[36m',  // Cyan
      debug: '\x1b[35m'  // Magenta
    };
    
    const reset = '\x1b[0m';
    const color = colors[level] || '';
    
    console.log(`${color}[${timestamp}] ${level.toUpperCase()}: ${message}${reset}`);
    
    if (Object.keys(meta).length > 0) {
      console.log(`${color}  Meta: ${JSON.stringify(meta, null, 2)}${reset}`);
    }
  }
};

// Función para verificar si debe loguear
const shouldLog = (level) => {
  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  };
  
  const currentLevel = levels[getLogLevel()] || 2;
  const messageLevel = levels[level] || 2;
  
  return messageLevel <= currentLevel;
};

// Logger principal
const logger = {
  error: (message, meta = {}) => {
    if (shouldLog('error')) {
      writeLog('error', message, meta);
    }
  },

  warn: (message, meta = {}) => {
    if (shouldLog('warn')) {
      writeLog('warn', message, meta);
    }
  },

  info: (message, meta = {}) => {
    if (shouldLog('info')) {
      writeLog('info', message, meta);
    }
  },

  debug: (message, meta = {}) => {
    if (shouldLog('debug')) {
      writeLog('debug', message, meta);
    }
  },

  // Log específico para requests HTTP
  request: (req, res, responseTime) => {
    const meta = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      userId: req.user ? req.user._id : null
    };

    const level = res.statusCode >= 400 ? 'warn' : 'info';
    const message = `${req.method} ${req.originalUrl} - ${res.statusCode}`;
    
    logger[level](message, meta);
  },

  // Log específico para errores de base de datos
  database: (operation, collection, error = null, meta = {}) => {
    const message = `Database ${operation} on ${collection}`;
    const level = error ? 'error' : 'info';
    
    const logMeta = {
      operation,
      collection,
      ...meta
    };

    if (error) {
      logMeta.error = error.message;
      logMeta.stack = error.stack;
    }

    logger[level](message, logMeta);
  },

  // Log específico para autenticación
  auth: (action, userId, success, meta = {}) => {
    const message = `Authentication ${action} - ${success ? 'SUCCESS' : 'FAILED'}`;
    const level = success ? 'info' : 'warn';
    
    const logMeta = {
      action,
      userId,
      success,
      ...meta
    };

    logger[level](message, logMeta);
  },

  // Log específico para operaciones de archivos
  file: (operation, filename, success, meta = {}) => {
    const message = `File ${operation} - ${filename} - ${success ? 'SUCCESS' : 'FAILED'}`;
    const level = success ? 'info' : 'error';
    
    const logMeta = {
      operation,
      filename,
      success,
      ...meta
    };

    logger[level](message, logMeta);
  },

  // Log específico para WebSocket
  websocket: (event, userId, success, meta = {}) => {
    const message = `WebSocket ${event} - ${success ? 'SUCCESS' : 'FAILED'}`;
    const level = success ? 'info' : 'warn';
    
    const logMeta = {
      event,
      userId,
      success,
      ...meta
    };

    logger[level](message, logMeta);
  },

  // Log específico para tareas programadas
  cron: (jobName, success, meta = {}) => {
    const message = `Cron job ${jobName} - ${success ? 'SUCCESS' : 'FAILED'}`;
    const level = success ? 'info' : 'error';
    
    const logMeta = {
      jobName,
      success,
      ...meta
    };

    logger[level](message, logMeta);
  },

  // Log específico para emails
  email: (to, subject, success, meta = {}) => {
    const message = `Email to ${to} - ${subject} - ${success ? 'SENT' : 'FAILED'}`;
    const level = success ? 'info' : 'error';
    
    const logMeta = {
      to,
      subject,
      success,
      ...meta
    };

    logger[level](message, logMeta);
  },

  // Log específico para API externas
  api: (service, endpoint, method, success, meta = {}) => {
    const message = `API ${service} ${method} ${endpoint} - ${success ? 'SUCCESS' : 'FAILED'}`;
    const level = success ? 'info' : 'error';
    
    const logMeta = {
      service,
      endpoint,
      method,
      success,
      ...meta
    };

    logger[level](message, logMeta);
  },

  // PLACEHOLDER: Función para monitorear actividades sospechosas
  // function logSuspiciousActivity(activity) {
  //   // Lógica de monitoreo (placeholder)
  //   return true;
  // }

  // Función para limpiar logs antiguos
  cleanup: (daysToKeep = 30) => {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const logFiles = fs.readdirSync(logsDir);
      
      logFiles.forEach(filename => {
        const filePath = path.join(logsDir, filename);
        const stats = fs.statSync(filePath);
        
        if (stats.mtime < cutoffDate) {
          fs.unlinkSync(filePath);
          logger.info(`Deleted old log file: ${filename}`);
        }
      });
    } catch (error) {
      logger.error('Error cleaning up old logs', { error: error.message });
    }
  },

  // Función para obtener estadísticas de logs
  getStats: () => {
    try {
      const stats = {};
      const levels = ['error', 'warn', 'info', 'debug'];
      
      levels.forEach(level => {
        const logFile = path.join(logsDir, `${level}.log`);
        if (fs.existsSync(logFile)) {
          const content = fs.readFileSync(logFile, 'utf8');
          const lines = content.split('\n').filter(line => line.trim());
          stats[level] = lines.length;
        } else {
          stats[level] = 0;
        }
      });
      
      return stats;
    } catch (error) {
      logger.error('Error getting log stats', { error: error.message });
      return {};
    }
  }
};

// Middleware para Express
logger.middleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.request(req, res, duration);
  });
  
  next();
};

module.exports = logger; 