# Sistema de Chat en Tiempo Real

## Descripción General

El Sistema de Chat en Tiempo Real es una funcionalidad completa que permite a los usuarios comunicarse entre sí, con equipos y con administradores de la plataforma. Incluye chat privado, chat de equipo, chat global y sistema de soporte.

## Características Principales

### Tipos de Chat
- **Chat Privado**: Comunicación directa entre dos usuarios
- **Chat de Equipo**: Comunicación grupal entre miembros de un equipo
- **Chat Global**: Chat público para todos los usuarios de la plataforma
- **Chat de Soporte**: Comunicación con administradores y moderadores

### Funcionalidades de Mensajería
- Mensajes de texto en tiempo real
- Soporte para archivos adjuntos (imágenes, documentos)
- Sistema de reacciones con emojis
- Respuestas a mensajes específicos
- Edición y eliminación de mensajes
- Indicador de escritura
- Marcado de mensajes como leídos
- Menciones de usuarios (@usuario)

### Características Avanzadas
- Modo lento para control de spam
- Filtro de contenido inapropiado
- Moderación automática y manual
- Notificaciones push y por email
- Historial de mensajes con paginación
- Búsqueda de usuarios para menciones
- Estadísticas de chat

## Arquitectura del Sistema

### Backend

#### Modelo de Datos (Chat.js)
```javascript
const chatSchema = new mongoose.Schema({
  type: String, // 'private', 'team', 'global', 'support'
  participants: [{
    user: ObjectId,
    role: String, // 'member', 'admin', 'moderator'
    joinedAt: Date,
    lastSeen: Date,
    isActive: Boolean,
    notifications: {
      enabled: Boolean,
      muted: Boolean
    }
  }],
  team: ObjectId, // Para chats de equipo
  settings: {
    name: String,
    description: String,
    avatar: String,
    allowFileUploads: Boolean,
    slowMode: {
      enabled: Boolean,
      interval: Number
    },
    moderation: {
      enabled: Boolean,
      profanityFilter: Boolean
    }
  },
  messages: [messageSchema],
  stats: {
    messageCount: Number,
    participantCount: Number,
    lastActivity: Date
  }
});
```

#### Servicio de Chat (chatService.js)
- Gestión de conexiones WebSocket
- Operaciones CRUD para chats y mensajes
- Lógica de negocio para permisos y validaciones
- Integración con sistema de logs
- Manejo de notificaciones

#### Rutas de API (/api/chat)
- `GET /` - Obtener chats del usuario
- `GET /:chatId` - Obtener chat específico con mensajes
- `POST /private` - Crear chat privado
- `POST /team/:teamId` - Crear chat de equipo
- `GET /global/chat` - Obtener chat global
- `POST /:chatId/messages` - Enviar mensaje
- `PUT /:chatId/messages/:messageId` - Editar mensaje
- `DELETE /:chatId/messages/:messageId` - Eliminar mensaje
- `POST /:chatId/messages/:messageId/reactions` - Reaccionar a mensaje
- `POST /:chatId/read` - Marcar como leído
- `GET /search/users` - Buscar usuarios para menciones
- `GET /:chatId/stats` - Obtener estadísticas
- `GET /:chatId/unread` - Obtener mensajes no leídos

### Frontend

#### Página de Chat (Chat.tsx)
- Interfaz moderna y responsiva
- Lista de chats con indicadores de estado
- Área de mensajes con scroll automático
- Input de mensaje con funcionalidades avanzadas
- Modal para crear nuevos chats
- Búsqueda de usuarios y chats

#### Componentes Principales
- **ChatList**: Lista de chats disponibles
- **MessageArea**: Área de visualización de mensajes
- **MessageInput**: Input para escribir mensajes
- **UserSearch**: Búsqueda de usuarios para chats privados
- **ChatSettings**: Configuración de chat (solo admin/moderador)

## Flujo de Datos

### Conexión de Usuario
1. Usuario inicia sesión
2. Se establece conexión WebSocket
3. Se cargan chats del usuario
4. Se suscribe a salas de chat correspondientes

### Envío de Mensaje
1. Usuario escribe mensaje en frontend
2. Se valida contenido y permisos
3. Se envía mensaje al backend via API
4. Se guarda en base de datos
5. Se emite evento WebSocket a todos los participantes
6. Se actualiza UI en tiempo real

### Recepción de Mensaje
1. Cliente recibe evento WebSocket
2. Se actualiza estado local
3. Se muestra mensaje en UI
4. Se reproduce notificación (si está habilitada)
5. Se actualiza contador de no leídos

## Seguridad y Permisos

### Validaciones de Seguridad
- Autenticación requerida para todas las operaciones
- Verificación de participación en chat
- Validación de roles y permisos
- Sanitización de contenido de mensajes
- Límites de tamaño de archivos
- Rate limiting para prevenir spam

### Roles y Permisos
- **Member**: Enviar mensajes, reaccionar, editar propios mensajes
- **Moderator**: Moderar contenido, eliminar mensajes, gestionar participantes
- **Admin**: Configuración completa del chat, limpieza de mensajes

### Configuración de Chat
```javascript
settings: {
  allowFileUploads: true,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/*', 'application/pdf'],
  slowMode: {
    enabled: false,
    interval: 5 // segundos
  },
  moderation: {
    enabled: false,
    profanityFilter: true,
    autoDelete: false
  }
}
```

## Integración con Otros Sistemas

### Sistema de Notificaciones
- Notificaciones push para mensajes nuevos
- Notificaciones por email para menciones
- Integración con preferencias de usuario

### Sistema de Logs
- Logging de todas las acciones de chat
- Auditoría de mensajes eliminados
- Seguimiento de actividad de usuarios

### Sistema de Equipos
- Creación automática de chats de equipo
- Gestión de miembros y permisos
- Integración con roles de equipo

## Optimizaciones de Rendimiento

### Base de Datos
- Índices optimizados para consultas frecuentes
- Paginación de mensajes
- Limpieza automática de mensajes antiguos
- Compresión de datos

### WebSocket
- Conexiones persistentes
- Reconexión automática
- Manejo eficiente de eventos
- Limpieza de conexiones inactivas

### Frontend
- Virtualización de lista de mensajes
- Lazy loading de mensajes antiguos
- Debouncing para indicador de escritura
- Optimización de re-renders

## Configuración y Despliegue

### Variables de Entorno
```bash
# Configuración de WebSocket
WS_PORT=3002
WS_PATH=/socket.io

# Configuración de archivos
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/*,application/pdf

# Configuración de chat
CHAT_MESSAGE_LIMIT=2000
CHAT_SLOW_MODE_INTERVAL=5
CHAT_CLEANUP_DAYS=30
```

### Dependencias
```json
{
  "socket.io": "^4.7.0",
  "multer": "^1.4.5-lts.1",
  "sharp": "^0.32.0"
}
```

## Monitoreo y Mantenimiento

### Métricas a Monitorear
- Número de conexiones activas
- Tasa de mensajes por minuto
- Tiempo de respuesta de API
- Uso de memoria y CPU
- Errores de WebSocket

### Tareas de Mantenimiento
- Limpieza diaria de mensajes antiguos
- Backup de chats importantes
- Análisis de logs de seguridad
- Optimización de índices de base de datos

## Casos de Uso

### Chat Privado
1. Usuario busca otro usuario
2. Crea chat privado
3. Envía mensaje inicial
4. Conversación en tiempo real

### Chat de Equipo
1. Líder de equipo crea chat
2. Miembros se agregan automáticamente
3. Comunicación grupal
4. Compartir archivos y recursos

### Chat Global
1. Usuario accede al chat global
2. Participa en conversaciones públicas
3. Moderación automática activa
4. Modo lento para control de spam

### Soporte
1. Usuario reporta problema
2. Se crea chat de soporte
3. Administradores responden
4. Seguimiento hasta resolución

## Próximas Mejoras

### Funcionalidades Planificadas
- Videollamadas y llamadas de voz
- Compartir pantalla
- Mensajes de voz
- Bots de chat automáticos
- Integración con IA para moderación
- Exportación de conversaciones
- Búsqueda avanzada en mensajes

### Optimizaciones Técnicas
- Implementación de Redis para caché
- Compresión de mensajes
- CDN para archivos adjuntos
- Load balancing para WebSocket
- Microservicios para escalabilidad

## Conclusión

El Sistema de Chat en Tiempo Real proporciona una experiencia de comunicación completa y moderna para la plataforma Bug Bounty. Con su arquitectura escalable, características avanzadas y enfoque en la seguridad, permite a los usuarios colaborar efectivamente mientras mantiene la integridad y rendimiento del sistema.

La implementación sigue las mejores prácticas de desarrollo, incluyendo separación de responsabilidades, manejo de errores robusto, y documentación completa para facilitar el mantenimiento y la extensión futura. 