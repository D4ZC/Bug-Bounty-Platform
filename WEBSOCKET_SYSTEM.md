# Sistema WebSocket en Tiempo Real

## Descripción General

El Sistema WebSocket en Tiempo Real proporciona comunicación bidireccional instantánea entre el cliente y el servidor, habilitando funcionalidades como chat en tiempo real, notificaciones push, actualizaciones de estado y eventos de la plataforma.

## Arquitectura del Sistema

### Backend (Socket Server)

#### Servidor WebSocket (socket.js)
```javascript
class SocketServer {
  constructor() {
    this.io = null;
    this.connectedUsers = new Map(); // userId -> socket
    this.userRooms = new Map(); // userId -> Set of room names
  }
}
```

#### Características Principales
- **Autenticación JWT**: Verificación de tokens en cada conexión
- **Gestión de Salas**: Organización de usuarios en salas por chat/equipo
- **Reconexión Automática**: Manejo robusto de desconexiones
- **Rate Limiting**: Prevención de spam y abuso
- **Logging Completo**: Auditoría de todas las conexiones y eventos

#### Eventos de Chat
- `join_chat`: Unirse a un chat específico
- `leave_chat`: Salir de un chat
- `send_message`: Enviar mensaje
- `typing_start/stop`: Indicador de escritura
- `react_to_message`: Reaccionar a mensajes
- `mark_as_read`: Marcar mensajes como leídos

#### Eventos de Notificaciones
- `subscribe_notifications`: Suscribirse a notificaciones
- `unsubscribe_notifications`: Desuscribirse
- `mark_notification_read`: Marcar como leída

#### Eventos Generales
- `update_status`: Actualizar estado de usuario
- `get_online_users`: Obtener usuarios conectados
- `ping/pong`: Mantener conexión activa

### Frontend (WebSocket Hook)

#### Hook Personalizado (useWebSocket.ts)
```typescript
interface WebSocketHook {
  isConnected: boolean;
  isConnecting: boolean;
  joinChat: (chatId: string) => void;
  sendMessage: (chatId: string, content: string) => void;
  onChatMessage: (callback: Function) => void;
  // ... más métodos
}
```

#### Características del Hook
- **Estado de Conexión**: Monitoreo en tiempo real
- **Reconexión Automática**: Intento de reconexión con backoff exponencial
- **Event Listeners**: Sistema de callbacks para eventos
- **Error Handling**: Manejo robusto de errores
- **TypeScript**: Tipado completo para desarrollo seguro

## Flujo de Datos

### Conexión Inicial
1. **Cliente**: Establece conexión WebSocket con token JWT
2. **Servidor**: Valida token y autentica usuario
3. **Servidor**: Agrega usuario a salas globales y personales
4. **Cliente**: Recibe confirmación de conexión
5. **Servidor**: Emite evento de usuario conectado

### Envío de Mensaje
1. **Cliente**: Emite `send_message` con datos del mensaje
2. **Servidor**: Valida permisos y contenido
3. **Servidor**: Guarda mensaje en base de datos
4. **Servidor**: Emite `new_message` a todos los participantes
5. **Clientes**: Reciben mensaje y actualizan UI

### Notificaciones en Tiempo Real
1. **Servidor**: Detecta evento que requiere notificación
2. **Servidor**: Emite `new_notification` a usuarios suscritos
3. **Clientes**: Reciben notificación y muestran toast
4. **Clientes**: Actualizan contadores de notificaciones

## Eventos del Sistema

### Eventos de Chat
```javascript
// Nuevo mensaje
socket.on('new_message', (message) => {
  // Actualizar lista de mensajes
  // Mostrar notificación si no es propio
});

// Usuario escribiendo
socket.on('user_typing', (data) => {
  // Mostrar indicador de escritura
});

// Usuario se unió/salió
socket.on('user_joined_chat', (data) => {
  // Actualizar lista de participantes
});
```

### Eventos de Plataforma
```javascript
// Ranking actualizado
socket.on('ranking_updated', (data) => {
  // Actualizar rankings en tiempo real
});

// Nuevo reto
socket.on('new_challenge', (challenge) => {
  // Mostrar notificación de nuevo reto
});

// Vulnerabilidad resuelta
socket.on('vulnerability_resolved', (vulnerability) => {
  // Actualizar estado de vulnerabilidades
});

// Evento Gulag
socket.on('gulag_event', (data) => {
  // Notificar eventos especiales
});
```

### Eventos de Equipo
```javascript
// Evento de equipo específico
socket.on('team_event', (data) => {
  // Actualizar información del equipo
});
```

## Configuración y Despliegue

### Variables de Entorno
```bash
# Backend
WS_PORT=3002
WS_PATH=/socket.io
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000

# Frontend
VITE_BACKEND_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

### Configuración de CORS
```javascript
// Backend
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});
```

### Configuración de Reconexión
```javascript
// Frontend
const socket = io(url, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000
});
```

## Optimizaciones de Rendimiento

### Backend
- **Connection Pooling**: Gestión eficiente de conexiones
- **Room Management**: Organización en salas para reducir broadcast
- **Event Debouncing**: Prevención de eventos excesivos
- **Memory Management**: Limpieza de conexiones inactivas

### Frontend
- **Event Throttling**: Limitación de eventos de escritura
- **Message Batching**: Agrupación de mensajes para reducir re-renders
- **Connection Monitoring**: Monitoreo de calidad de conexión
- **Offline Handling**: Manejo de desconexiones temporales

## Seguridad

### Autenticación
- **JWT Validation**: Verificación de tokens en cada conexión
- **User Verification**: Confirmación de usuario activo
- **Permission Checking**: Validación de permisos por evento

### Rate Limiting
- **Message Rate**: Límite de mensajes por minuto
- **Connection Rate**: Límite de conexiones por IP
- **Event Throttling**: Prevención de spam de eventos

### Sanitización
- **Content Validation**: Validación de contenido de mensajes
- **XSS Prevention**: Sanitización de datos de entrada
- **Injection Protection**: Prevención de inyección de código

## Monitoreo y Logging

### Métricas de Conexión
```javascript
// Estadísticas del servidor
const stats = {
  totalConnections: connectedUsers.size,
  activeRooms: io.sockets.adapter.rooms.size,
  messagesPerMinute: messageCount,
  errorRate: errorCount / totalEvents
};
```

### Logging de Eventos
```javascript
// Log de conexión
logService.userLog('SOCKET_CONNECT', userId, null, null, null, {
  socketId: socket.id,
  userAgent: socket.handshake.headers['user-agent']
});

// Log de mensaje
logService.userLog('CHAT_MESSAGE', userId, null, null, null, {
  chatId,
  messageId,
  messageType
});
```

## Casos de Uso

### Chat en Tiempo Real
1. **Conexión**: Usuario se conecta al WebSocket
2. **Unirse a Chat**: Se une a sala específica del chat
3. **Enviar Mensaje**: Emite evento con contenido
4. **Recibir Mensaje**: Recibe mensaje de otros usuarios
5. **Indicador de Escritura**: Muestra cuando otros escriben
6. **Marcar como Leído**: Actualiza estado de lectura

### Notificaciones Push
1. **Suscripción**: Usuario se suscribe a notificaciones
2. **Evento**: Sistema detecta evento importante
3. **Broadcast**: Se emite notificación a usuarios suscritos
4. **Recepción**: Cliente recibe y muestra notificación
5. **Marcar Leída**: Usuario marca notificación como leída

### Actualizaciones de Estado
1. **Cambio de Estado**: Usuario cambia su estado
2. **Broadcast**: Se emite a todos los usuarios
3. **Actualización**: Otros usuarios ven el cambio
4. **Sincronización**: Estado se mantiene sincronizado

## Integración con Otros Sistemas

### Sistema de Chat
- **Mensajes Instantáneos**: Entrega inmediata de mensajes
- **Indicadores de Estado**: En línea, escribiendo, último visto
- **Notificaciones**: Alertas para mensajes nuevos

### Sistema de Notificaciones
- **Notificaciones Push**: Alertas en tiempo real
- **Contadores**: Actualización automática de contadores
- **Preferencias**: Respeto a preferencias de usuario

### Sistema de Rankings
- **Actualizaciones en Vivo**: Cambios de ranking instantáneos
- **Logros**: Notificaciones de logros y badges
- **Competencia**: Estado de otros competidores

### Sistema de Retos
- **Nuevos Retos**: Notificaciones de retos disponibles
- **Progreso**: Actualización de progreso en tiempo real
- **Finalización**: Notificaciones de retos completados

## Troubleshooting

### Problemas Comunes

#### Conexión Fallida
```javascript
// Verificar configuración
socket.on('connect_error', (error) => {
  console.error('Connection failed:', error);
  // Implementar fallback o retry
});
```

#### Mensajes Perdidos
```javascript
// Implementar acknowledgment
socket.emit('send_message', data, (ack) => {
  if (ack.success) {
    // Mensaje enviado correctamente
  } else {
    // Reintentar envío
  }
});
```

#### Reconexión Fallida
```javascript
// Configurar reconexión manual
socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    // Reconexión manual
    setTimeout(() => socket.connect(), 1000);
  }
});
```

### Debugging
```javascript
// Habilitar logs detallados
const socket = io(url, {
  debug: true,
  logger: console
});

// Monitorear eventos
socket.onAny((eventName, ...args) => {
  console.log(`Event: ${eventName}`, args);
});
```

## Próximas Mejoras

### Funcionalidades Planificadas
- **Videollamadas**: Integración con WebRTC
- **Compartir Pantalla**: Funcionalidad de presentación
- **Mensajes de Voz**: Grabación y envío de audio
- **Bots Inteligentes**: Asistentes automáticos
- **Moderación IA**: Filtrado automático de contenido

### Optimizaciones Técnicas
- **Redis Adapter**: Escalabilidad horizontal
- **Message Queuing**: Colas para mensajes importantes
- **Compression**: Compresión de mensajes
- **CDN Integration**: Distribución de contenido
- **Load Balancing**: Balanceo de carga WebSocket

## Conclusión

El Sistema WebSocket en Tiempo Real proporciona la base tecnológica para una experiencia de usuario fluida y responsiva en la plataforma Bug Bounty. Con su arquitectura robusta, características de seguridad avanzadas y optimizaciones de rendimiento, permite la comunicación instantánea y la colaboración efectiva entre usuarios.

La implementación sigue las mejores prácticas de desarrollo, incluyendo manejo de errores robusto, logging completo, y documentación detallada para facilitar el mantenimiento y la extensión futura del sistema. 