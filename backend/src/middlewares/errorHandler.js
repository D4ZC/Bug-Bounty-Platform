const logger = require('../utils/logger');

// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error
  logger.error(err);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      statusCode: 400,
      message: 'Error de validación',
      details: message
    };
  }

  // Error de duplicado de Mongoose
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    error = {
      statusCode: 400,
      message: 'Valor duplicado',
      details: `El campo ${field} con valor '${value}' ya existe`
    };
  }

  // Error de cast de Mongoose (ID inválido)
  if (err.name === 'CastError') {
    error = {
      statusCode: 400,
      message: 'ID inválido',
      details: 'El ID proporcionado no es válido'
    };
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    error = {
      statusCode: 401,
      message: 'Token inválido',
      details: 'El token de autenticación no es válido'
    };
  }

  // Error de JWT expirado
  if (err.name === 'TokenExpiredError') {
    error = {
      statusCode: 401,
      message: 'Token expirado',
      details: 'El token de autenticación ha expirado'
    };
  }

  // Error de límite de archivo
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = {
      statusCode: 400,
      message: 'Archivo demasiado grande',
      details: 'El archivo excede el tamaño máximo permitido'
    };
  }

  // Error de tipo de archivo no permitido
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = {
      statusCode: 400,
      message: 'Tipo de archivo no permitido',
      details: 'El tipo de archivo no está permitido'
    };
  }

  // Error de rate limiting
  if (err.status === 429) {
    error = {
      statusCode: 429,
      message: 'Demasiadas solicitudes',
      details: 'Has excedido el límite de solicitudes. Intenta de nuevo más tarde'
    };
  }

  // Error de red (timeout, conexión, etc.)
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    error = {
      statusCode: 503,
      message: 'Servicio no disponible',
      details: 'El servicio externo no está disponible en este momento'
    };
  }

  // Error de timeout
  if (err.code === 'ETIMEDOUT') {
    error = {
      statusCode: 408,
      message: 'Tiempo de espera agotado',
      details: 'La solicitud tardó demasiado en completarse'
    };
  }

  // Error de permisos de archivo
  if (err.code === 'EACCES') {
    error = {
      statusCode: 500,
      message: 'Error de permisos',
      details: 'Error de permisos en el servidor'
    };
  }

  // Error de espacio en disco
  if (err.code === 'ENOSPC') {
    error = {
      statusCode: 507,
      message: 'Espacio insuficiente',
      details: 'No hay suficiente espacio en el servidor'
    };
  }

  // Error de memoria
  if (err.code === 'ENOMEM') {
    error = {
      statusCode: 500,
      message: 'Error de memoria',
      details: 'Error interno del servidor por falta de memoria'
    };
  }

  // Error de sintaxis JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = {
      statusCode: 400,
      message: 'JSON inválido',
      details: 'El cuerpo de la solicitud no contiene JSON válido'
    };
  }

  // Error de multer
  if (err.name === 'MulterError') {
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        error = {
          statusCode: 400,
          message: 'Archivo demasiado grande',
          details: 'El archivo excede el tamaño máximo permitido'
        };
        break;
      case 'LIMIT_FILE_COUNT':
        error = {
          statusCode: 400,
          message: 'Demasiados archivos',
          details: 'Has excedido el número máximo de archivos permitidos'
        };
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        error = {
          statusCode: 400,
          message: 'Campo de archivo inesperado',
          details: 'Se recibió un archivo en un campo no esperado'
        };
        break;
      default:
        error = {
          statusCode: 400,
          message: 'Error al subir archivo',
          details: 'Ocurrió un error al procesar el archivo'
        };
    }
  }

  // Error de validación de Joi
  if (err.isJoi) {
    error = {
      statusCode: 400,
      message: 'Error de validación',
      details: err.details.map(detail => detail.message).join(', ')
    };
  }

  // Error de axios
  if (err.isAxiosError) {
    if (err.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      error = {
        statusCode: err.response.status,
        message: 'Error en servicio externo',
        details: err.response.data?.message || err.message
      };
    } else if (err.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      error = {
        statusCode: 503,
        message: 'Servicio externo no disponible',
        details: 'No se pudo conectar con el servicio externo'
      };
    } else {
      // Algo pasó al configurar la solicitud
      error = {
        statusCode: 500,
        message: 'Error de configuración',
        details: 'Error al configurar la solicitud al servicio externo'
      };
    }
  }

  // Error por defecto
  if (!error.statusCode) {
    error = {
      statusCode: 500,
      message: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'production' 
        ? 'Ocurrió un error interno en el servidor'
        : err.message
    };
  }

  // Respuesta de error
  res.status(error.statusCode).json({
    success: false,
    error: error.message,
    message: error.details,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method
    })
  });
};

// Middleware para manejar rutas no encontradas
const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Middleware para manejar errores asíncronos
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Función para crear errores personalizados
const createError = (statusCode, message, details = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (details) {
    error.details = details;
  }
  return error;
};

// Función para validar si un error es operacional
const isOperationalError = (error) => {
  if (error.isOperational) {
    return true;
  }
  
  // Lista de errores que se consideran operacionales
  const operationalErrors = [
    'ValidationError',
    'CastError',
    'JsonWebTokenError',
    'TokenExpiredError',
    'MulterError'
  ];
  
  return operationalErrors.includes(error.name);
};

module.exports = {
  errorHandler,
  notFound,
  asyncHandler,
  createError,
  isOperationalError
}; 