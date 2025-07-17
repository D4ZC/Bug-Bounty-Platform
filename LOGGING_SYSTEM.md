# Sistema de Logs Avanzado - Bug Bounty Platform

## Descripción General

El Sistema de Logs Avanzado es una solución completa de auditoría y monitoreo que registra todas las actividades del sistema, proporcionando visibilidad total sobre las operaciones, seguridad y rendimiento de la plataforma Bug Bounty.

## Características Principales

### 📊 Logging Comprehensivo
- **Logs de autenticación**: Login, logout, registro, cambios de contraseña
- **Logs de administración**: Acciones administrativas y cambios de configuración
- **Logs de seguridad**: Intentos de acceso no autorizado, eventos de seguridad
- **Logs de usuarios**: Creación, actualización, eliminación de perfiles
- **Logs de equipos**: Gestión de equipos y membresías
- **Logs de vulnerabilidades**: Reportes, asignaciones, resoluciones
- **Logs de retos**: Creación, participación, resultados
- **Logs de rendimiento**: Métricas de API y tiempos de respuesta
- **Logs de sistema**: Eventos del sistema y errores

### 🔍 Filtrado y Búsqueda Avanzada
- **Filtros por nivel**: Info, warning, error, critical, debug
- **Filtros por categoría**: 14 categorías diferentes de logs
- **Filtros por usuario**: Logs específicos de un usuario
- **Filtros por fecha**: Rango de fechas personalizable
- **Búsqueda por texto**: Búsqueda en descripciones y acciones
- **Filtros por IP**: Seguimiento de actividad por dirección IP

### 📈 Dashboard y Estadísticas
- **Estadísticas en tiempo real**: Total de logs por nivel y categoría
- **Actividad reciente**: Últimos logs con información detallada
- **Métricas de rendimiento**: Tiempos de respuesta y uso de memoria
- **Análisis de errores**: Distribución y frecuencia de errores
- **Tendencias temporales**: Patrones de actividad a lo largo del tiempo

### 🛡️ Seguridad y Auditoría
- **Trail de auditoría completo**: Registro de todos los cambios
- **Información de contexto**: IP, user agent, referer
- **Cambios antes/después**: Para operaciones de actualización
- **Identificación de usuarios**: Email, rol, sesión
- **Geolocalización**: País, ciudad, timezone (si está disponible)

### 📤 Exportación y Gestión
- **Exportación a CSV**: Descarga de logs filtrados
- **Limpieza automática**: Eliminación de logs antiguos
- **Retención configurable**: Políticas de retención por prioridad
- **Backup automático**: Respaldo de logs críticos
- **Compresión**: Optimización de almacenamiento

## Arquitectura Técnica

### Modelo de Datos (MongoDB)

#### Esquema de Log
```javascript
{
  level: 'info' | 'warning' | 'error' | 'critical' | 'debug',
  category: 'auth' | 'user' | 'team' | 'vulnerability' | 'challenge' | 'admin' | 'security' | 'system' | 'api' | 'performance' | 'notification' | 'shop' | 'gulag' | 'mvp',
  action: String,
  description: String,
  userId: ObjectId,
  userEmail: String,
  userRole: String,
  sessionId: String,
  requestInfo: {
    method: String,
    url: String,
    userAgent: String,
    ip: String,
    referer: String
  },
  metadata: Mixed,
  resourceType: String,
  resourceId: ObjectId,
  changes: {
    before: Mixed,
    after: Mixed
  },
  performance: {
    duration: Number,
    memoryUsage: Number
  },
  error: {
    message: String,
    stack: String,
    code: String
  },
  location: {
    country: String,
    city: String,
    timezone: String
  },
  timestamp: Date,
  retention: {
    expiresAt: Date,
    priority: 'low' | 'medium' | 'high' | 'critical'
  }
}
```

#### Índices Optimizados
```javascript
// Índices principales para consultas eficientes
{ timestamp: -1 }
{ level: 1, timestamp: -1 }
{ category: 1, timestamp: -1 }
{ userId: 1, timestamp: -1 }
{ action: 1, timestamp: -1 }
{ 'requestInfo.ip': 1, timestamp: -1 }
{ 'retention.expiresAt': 1 } // TTL index
```

### Servicio de Logging (Node.js)

#### LogService Class
```javascript
class LogService {
  // Métodos principales
  async createLog(logData)
  async authLog(action, userId, userEmail, userRole, requestInfo, metadata)
  async adminLog(action, userId, userEmail, userRole, requestInfo, metadata)
  async securityLog(action, userId, userEmail, userRole, requestInfo, metadata)
  async errorLog(action, error, userId, userEmail, userRole, requestInfo, metadata)
  async performanceLog(action, duration, memoryUsage, requestInfo, metadata)
  async auditLog(action, resourceType, resourceId, changes, userId, userEmail, userRole, requestInfo, metadata)
  
  // Métodos de consulta
  async getStats(filters)
  async getLogs(filters)
  async exportLogs(filters, format)
  async cleanOldLogs(daysToKeep)
  
  // Métodos específicos
  async getUserLogs(userId, filters)
  async getCategoryLogs(category, filters)
  async getErrorLogs(filters)
  async getSecurityLogs(filters)
  async getAdminLogs(filters)
  async getPerformanceLogs(filters)
}
```

### API REST (Express.js)

#### Endpoints Principales
```javascript
// Estadísticas y resumen
GET    /api/logs/stats              // Estadísticas de logs
GET    /api/logs/summary            // Resumen general

// Consulta de logs
GET    /api/logs                    // Logs con filtros y paginación
GET    /api/logs/user/:userId       // Logs de usuario específico
GET    /api/logs/category/:category // Logs de categoría específica
GET    /api/logs/errors             // Solo logs de errores
GET    /api/logs/security           // Solo logs de seguridad
GET    /api/logs/admin              // Solo logs de administración
GET    /api/logs/performance        // Solo logs de rendimiento

// Logs específicos
GET    /api/logs/resource/:type/:id // Logs de recurso específico
GET    /api/logs/ip/:ip             // Logs de IP específica
GET    /api/logs/action/:action     // Logs de acción específica

// Gestión
GET    /api/logs/export             // Exportar logs
DELETE /api/logs/cleanup            // Limpiar logs antiguos
```

### Frontend (React + TypeScript)

#### Componente Logs
```typescript
interface Log {
  _id: string;
  level: 'info' | 'warning' | 'error' | 'critical' | 'debug';
  category: string;
  action: string;
  description: string;
  userId?: User;
  userEmail?: string;
  userRole?: string;
  requestInfo?: RequestInfo;
  metadata?: any;
  timestamp: string;
  performance?: Performance;
  error?: Error;
}

interface LogStats {
  total: number;
  byLevel: LevelStats;
  byCategory: CategoryStats;
  recentActivity: RecentActivity[];
}
```

## Funcionalidades Detalladas

### Sistema de Niveles de Log

#### Niveles Disponibles
- **Info**: Información general del sistema
- **Warning**: Advertencias y eventos que requieren atención
- **Error**: Errores que no impiden el funcionamiento
- **Critical**: Errores críticos que afectan el sistema
- **Debug**: Información detallada para debugging

#### Categorías de Logs
- **Auth**: Autenticación y autorización
- **User**: Gestión de usuarios
- **Team**: Gestión de equipos
- **Vulnerability**: Vulnerabilidades reportadas
- **Challenge**: Retos y competencias
- **Admin**: Acciones administrativas
- **Security**: Eventos de seguridad
- **System**: Eventos del sistema
- **API**: Llamadas a la API
- **Performance**: Métricas de rendimiento
- **Notification**: Notificaciones enviadas
- **Shop**: Transacciones de la tienda
- **Gulag**: Eventos del Gulag
- **MVP**: Eventos MVP

### Filtrado y Búsqueda

#### Filtros Disponibles
```javascript
{
  level: 'info' | 'warning' | 'error' | 'critical' | 'debug' | 'all',
  category: 'auth' | 'user' | 'team' | ... | 'all',
  userId: 'string',
  action: 'string',
  startDate: 'YYYY-MM-DD',
  endDate: 'YYYY-MM-DD',
  page: number,
  limit: number,
  sortBy: 'timestamp' | 'level' | 'category' | 'action',
  sortOrder: 'asc' | 'desc'
}
```

#### Búsqueda de Texto
- Búsqueda en campos: action, description, userEmail
- Búsqueda insensible a mayúsculas/minúsculas
- Búsqueda con expresiones regulares
- Búsqueda en tiempo real

### Dashboard de Logs

#### Estadísticas en Tiempo Real
- **Total de logs**: Número total de logs en el sistema
- **Logs por nivel**: Distribución por nivel de severidad
- **Logs por categoría**: Distribución por tipo de evento
- **Errores críticos**: Logs de nivel critical y error
- **Actividad reciente**: Últimos 10 logs con detalles

#### Métricas de Rendimiento
- **Tiempo de respuesta**: Duración promedio de operaciones
- **Uso de memoria**: Consumo de memoria por operación
- **Errores por hora**: Frecuencia de errores
- **Usuarios activos**: Número de usuarios con actividad reciente

### Exportación y Gestión

#### Formatos de Exportación
- **JSON**: Formato completo con todos los campos
- **CSV**: Formato tabular para análisis en Excel
- **Filtros aplicables**: Exportar solo logs filtrados
- **Límites configurables**: Control del tamaño de exportación

#### Limpieza Automática
- **Política de retención**: 90 días por defecto
- **Preservación de críticos**: Logs críticos se mantienen más tiempo
- **Limpieza manual**: Interfaz para limpieza bajo demanda
- **Confirmación requerida**: Confirmación antes de eliminar

## Integración con el Sistema

### Middleware de Logging
```javascript
// Middleware para logging automático de requests
app.use((req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    
    logService.apiLog(
      `${req.method} ${req.path}`,
      req.user?._id,
      req.user?.email,
      req.user?.role,
      {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      },
      {
        statusCode: res.statusCode,
        duration,
        memoryUsage
      }
    );
  });
  
  next();
});
```

### Logging en Rutas Específicas
```javascript
// Ejemplo: Logging en autenticación
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && await user.comparePassword(password)) {
      await logService.logSuccessfulLogin(user, {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      // ... resto del código de login
    } else {
      await logService.logFailedLogin(email, {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      // ... manejo de error
    }
  } catch (error) {
    await logService.errorLog('LOGIN_ERROR', error, null, null, null, {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip
    });
  }
});
```

### Logging de Cambios (Auditoría)
```javascript
// Ejemplo: Logging de cambios en usuario
router.put('/users/:id', async (req, res) => {
  try {
    const oldUser = await User.findById(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    await logService.auditLog(
      'UPDATE_USER',
      'User',
      req.params.id,
      {
        before: { email: oldUser.email, role: oldUser.role, isActive: oldUser.isActive },
        after: { email: updatedUser.email, role: updatedUser.role, isActive: updatedUser.isActive }
      },
      req.user._id,
      req.user.email,
      req.user.role,
      {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip
      }
    );
    
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    // ... manejo de error
  }
});
```

## Seguridad y Privacidad

### Protección de Datos Sensibles
- **Contraseñas**: Nunca se registran en logs
- **Tokens**: Solo se registran hashes o identificadores
- **Datos personales**: Encriptación opcional para datos sensibles
- **IPs**: Anonimización opcional para cumplimiento GDPR

### Control de Acceso
- **Solo administradores**: Acceso restringido a logs
- **Verificación de permisos**: Middleware de autorización
- **Auditoría de acceso**: Logs de acceso a logs
- **Rate limiting**: Protección contra consultas excesivas

### Retención y Cumplimiento
- **Políticas configurables**: Retención por tipo de log
- **Cumplimiento legal**: Configuración para GDPR, SOX, etc.
- **Backup seguro**: Encriptación de backups
- **Eliminación segura**: Borrado permanente de datos

## Monitoreo y Alertas

### Métricas de Sistema
- **Uso de almacenamiento**: Monitoreo del tamaño de logs
- **Rendimiento de consultas**: Tiempo de respuesta de búsquedas
- **Errores de logging**: Fallos en el sistema de logs
- **Espacio en disco**: Alertas de espacio insuficiente

### Alertas Automáticas
- **Errores críticos**: Notificación inmediata
- **Patrones sospechosos**: Detección de actividad anómala
- **Fallos de autenticación**: Múltiples intentos fallidos
- **Acceso no autorizado**: Intentos de acceso a recursos protegidos

### Dashboards de Monitoreo
- **Gráficos en tiempo real**: Visualización de actividad
- **Tendencias históricas**: Análisis de patrones
- **Alertas configurables**: Umbrales personalizables
- **Reportes automáticos**: Resúmenes periódicos

## Optimización y Rendimiento

### Estrategias de Optimización
- **Índices compuestos**: Para consultas frecuentes
- **Particionamiento**: Por fecha para logs antiguos
- **Compresión**: Reducción del tamaño de almacenamiento
- **Caché**: Para estadísticas frecuentemente consultadas

### Escalabilidad
- **Arquitectura distribuida**: Soporte para múltiples instancias
- **Sharding**: Distribución de logs por fecha o categoría
- **Replicación**: Copias de seguridad automáticas
- **Load balancing**: Distribución de carga de consultas

### Mantenimiento
- **Limpieza automática**: Eliminación programada de logs antiguos
- **Optimización de índices**: Reconstrucción periódica
- **Backup automático**: Respaldo programado
- **Monitoreo de salud**: Verificación de integridad

## Próximas Mejoras

### Funcionalidades Planificadas
- **Análisis de ML**: Detección automática de anomalías
- **Correlación de eventos**: Relación entre logs relacionados
- **Alertas inteligentes**: Basadas en patrones y contexto
- **Integración SIEM**: Conectores para sistemas externos
- **Visualización avanzada**: Gráficos interactivos y dashboards

### Mejoras Técnicas
- **Streaming en tiempo real**: WebSockets para actualizaciones
- **Búsqueda full-text**: Motor de búsqueda avanzado
- **APIs de terceros**: Integración con herramientas externas
- **Automatización**: Scripts de mantenimiento automático

## Conclusión

El Sistema de Logs Avanzado proporciona una base sólida para la auditoría, monitoreo y debugging de la plataforma Bug Bounty. Con características comprehensivas de logging, filtrado avanzado, exportación flexible y gestión automática, el sistema asegura visibilidad total sobre las operaciones del sistema mientras mantiene la seguridad y privacidad de los datos.

La arquitectura escalable y las características de optimización garantizan que el sistema pueda manejar grandes volúmenes de logs de manera eficiente, proporcionando información valiosa para la toma de decisiones y el mantenimiento del sistema. 