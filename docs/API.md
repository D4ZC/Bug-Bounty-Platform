# API Documentation - Bug Bounty Platform

## Información General

- **Base URL**: `http://localhost:3001/api`
- **Versión**: 1.0.0
- **Formato de respuesta**: JSON
- **Autenticación**: Bearer Token (JWT)

## Autenticación

### Login con w3id
```http
POST /auth/login
```

**Body:**
```json
{
  "w3id": "user-w3id",
  "email": "user@example.com",
  "name": "User Name"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "w3id": "user-w3id",
      "email": "user@example.com",
      "name": "User Name",
      "avatar": "avatar-url",
      "points": 100,
      "teamId": "team-id"
    }
  }
}
```

### Logout
```http
POST /auth/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

### Obtener Perfil
```http
GET /auth/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

## Usuarios

### Obtener Usuario
```http
GET /users/:id
```

### Actualizar Usuario
```http
PUT /users/:id
```

**Body:**
```json
{
  "name": "New Name",
  "avatar": "new-avatar-url",
  "notifications": {
    "email": true,
    "push": true
  }
}
```

### Obtener Métricas del Usuario
```http
GET /users/:id/metrics
```

### Buscar Usuarios
```http
GET /users/search?q=search-term
```

## Equipos

### Obtener Equipo
```http
GET /teams/:id
```

### Crear Equipo
```http
POST /teams
```

**Body:**
```json
{
  "name": "Team Name",
  "description": "Team Description",
  "maxMembers": 10
}
```

### Actualizar Equipo
```http
PUT /teams/:id
```

### Agregar Miembro
```http
POST /teams/:id/members
```

**Body:**
```json
{
  "userId": "user-id",
  "role": "member"
}
```

### Remover Miembro
```http
DELETE /teams/:id/members/:userId
```

## Vulnerabilidades

### Obtener Vulnerabilidades
```http
GET /vulnerabilities
```

**Query Parameters:**
- `severity`: critical, high, medium, low
- `status`: open, in_progress, resolved, closed
- `teamId`: team-id
- `page`: page number
- `limit`: items per page

### Crear Vulnerabilidad (Manual)
```http
POST /vulnerabilities
```

**Body:**
```json
{
  "title": "Vulnerability Title",
  "description": "Vulnerability Description",
  "severity": "critical",
  "application": {
    "name": "App Name",
    "version": "1.0.0",
    "url": "https://app.com"
  },
  "assignedTeamId": "team-id",
  "points": 100
}
```

### Marcar como Resuelta
```http
PUT /vulnerabilities/:id/resolve
```

**Body:**
```json
{
  "resolvedBy": "user-id",
  "resolutionNotes": "How it was resolved"
}
```

### Agregar Comentario
```http
POST /vulnerabilities/:id/comments
```

**Body:**
```json
{
  "content": "Comment content"
}
```

## Rankings

### Ranking de Usuarios
```http
GET /rankings/users
```

**Query Parameters:**
- `limit`: number of users to return
- `page`: page number

### Ranking de Equipos
```http
GET /rankings/teams
```

### Obtener Posición del Usuario
```http
GET /rankings/users/position
```

## Retos

### Obtener Retos
```http
GET /challenges
```

**Query Parameters:**
- `status`: pending, active, completed, cancelled
- `type`: individual, team
- `category`: critical, high, medium, low

### Crear Reto
```http
POST /challenges
```

**Body:**
```json
{
  "title": "Challenge Title",
  "description": "Challenge Description",
  "type": "individual",
  "category": "critical",
  "config": {
    "entryCost": 500,
    "duration": 24,
    "maxParticipants": 2,
    "minVulnerabilities": 1,
    "targetSeverity": "critical"
  }
}
```

### Unirse a Reto
```http
POST /challenges/:id/join
```

**Body:**
```json
{
  "betAmount": 500
}
```

### Obtener Progreso del Reto
```http
GET /challenges/:id/progress
```

### Iniciar Reto
```http
POST /challenges/:id/start
```

### Completar Reto
```http
POST /challenges/:id/complete
```

## Tienda

### Obtener Items
```http
GET /shop/items
```

**Query Parameters:**
- `type`: background, avatar_frame, animated_avatar, badge, name_plate
- `category`: regular, mvp, seasonal, limited

### Comprar Item
```http
POST /shop/purchase
```

**Body:**
```json
{
  "itemId": "item-id",
  "quantity": 1
}
```

### Items MVP
```http
GET /shop/mvp-items
```

### Convertir a Blue Points
```http
POST /shop/convert-blue-points
```

**Body:**
```json
{
  "points": 1000
}
```

## Contribuciones

### Obtener Contribuciones
```http
GET /contributions
```

**Query Parameters:**
- `type`: documentation, bug_report
- `status`: pending, validated, rejected
- `authorId`: user-id

### Crear Contribución
```http
POST /contributions
```

**Body:**
```json
{
  "title": "Contribution Title",
  "description": "Contribution Description",
  "type": "documentation",
  "content": {
    "vulnerabilityId": "vuln-id",
    "vulnerabilityTitle": "Vuln Title",
    "tools": ["tool1", "tool2"],
    "steps": [
      {
        "step": 1,
        "description": "Step description"
      }
    ]
  },
  "tags": ["tag1", "tag2"]
}
```

### Votar Contribución
```http
POST /contributions/:id/vote
```

**Body:**
```json
{
  "vote": "up"
}
```

### Agregar Comentario
```http
POST /contributions/:id/comments
```

**Body:**
```json
{
  "content": "Comment content"
}
```

## Administración

### Estadísticas Generales
```http
GET /admin/stats
```

### Usuarios Activos
```http
GET /admin/users/active
```

### Equipos Activos
```http
GET /admin/teams/active
```

### Vulnerabilidades por Estado
```http
GET /admin/vulnerabilities/status
```

### Exportar Reporte
```http
GET /admin/reports/export
```

**Query Parameters:**
- `format`: csv, pdf
- `type`: users, teams, vulnerabilities, challenges

### Crear Reto Administrativo
```http
POST /admin/challenges
```

### Actualizar Rankings Manualmente
```http
POST /admin/rankings/update
```

### Asignar MVP
```http
POST /admin/mvp/assign
```

**Body:**
```json
{
  "type": "user",
  "userId": "user-id"
}
```

## WebSocket Events

### Conectar
```javascript
const socket = io('http://localhost:3001', {
  auth: {
    token: 'jwt-token'
  }
});
```

### Eventos Recibidos

#### Rankings Actualizados
```javascript
socket.on('rankings-updated', (data) => {
  console.log('Rankings updated:', data);
});
```

#### Nuevo Reto
```javascript
socket.on('challenge-started', (data) => {
  console.log('Challenge started:', data);
});
```

#### Progreso de Reto
```javascript
socket.on('challenge-progress', (data) => {
  console.log('Challenge progress:', data);
});
```

#### Reto Completado
```javascript
socket.on('challenge-ended', (data) => {
  console.log('Challenge ended:', data);
});
```

#### Gulag Iniciado
```javascript
socket.on('gulag-started', (data) => {
  console.log('Gulag started:', data);
});
```

#### Gulag Terminado
```javascript
socket.on('gulag-ended', (data) => {
  console.log('Gulag ended:', data);
});
```

#### MVP Asignado
```javascript
socket.on('mvp-awarded', (data) => {
  console.log('MVP awarded:', data);
});
```

#### Nueva Vulnerabilidad
```javascript
socket.on('new-vulnerability', (data) => {
  console.log('New vulnerability:', data);
});
```

#### Nueva Contribución
```javascript
socket.on('new-contribution', (data) => {
  console.log('New contribution:', data);
});
```

### Eventos Enviados

#### Unirse a Reto
```javascript
socket.emit('join-challenge', 'challenge-id');
```

#### Salir de Reto
```javascript
socket.emit('leave-challenge', 'challenge-id');
```

#### Actualizar Perfil
```javascript
socket.emit('profile-update', {
  name: 'New Name',
  avatar: 'new-avatar'
});
```

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido o expirado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Recurso duplicado |
| 422 | Unprocessable Entity - Validación fallida |
| 429 | Too Many Requests - Límite de rate excedido |
| 500 | Internal Server Error - Error del servidor |

## Rate Limiting

- **Límite**: 100 requests por 15 minutos por IP
- **Headers de respuesta**:
  - `X-RateLimit-Limit`: Límite de requests
  - `X-RateLimit-Remaining`: Requests restantes
  - `X-RateLimit-Reset`: Tiempo de reset

## Paginación

Para endpoints que soportan paginación:

**Query Parameters:**
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10, max: 100)

**Response Headers:**
- `X-Total-Count`: Total de elementos
- `X-Page-Count`: Total de páginas
- `X-Current-Page`: Página actual
- `X-Per-Page`: Elementos por página

## Filtros y Búsqueda

### Búsqueda de Texto
```http
GET /users?q=john
GET /teams?q=security
GET /vulnerabilities?q=sql injection
```

### Filtros de Fecha
```http
GET /vulnerabilities?createdAt[gte]=2024-01-01&createdAt[lte]=2024-12-31
```

### Ordenamiento
```http
GET /users?sort=points&order=desc
GET /teams?sort=name&order=asc
```

### Filtros Múltiples
```http
GET /vulnerabilities?severity=critical&status=open&teamId=team-123
```

## Autenticación w3id

### Flujo de Autenticación

1. **Redirección a w3id**:
   ```
   GET https://w3id.sso.ibm.com/auth/authorize?
     client_id=YOUR_CLIENT_ID&
     response_type=code&
     redirect_uri=YOUR_REDIRECT_URI&
     scope=openid profile email
   ```

2. **Callback con código**:
   ```
   GET /auth/callback?code=AUTHORIZATION_CODE
   ```

3. **Intercambio de código por token**:
   ```http
   POST /auth/token
   ```

4. **Obtener información del usuario**:
   ```http
   GET /auth/userinfo
   ```

## Seguridad

### Headers de Seguridad
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

### Validación de Archivos
- **Tipos permitidos**: jpg, jpeg, png, gif, pdf, doc, docx, txt
- **Tamaño máximo**: 5MB
- **Escaneo antivirus**: Automático

### Tokens JWT
- **Expiración**: 24 horas
- **Refresh token**: 7 días
- **Algoritmo**: HS256

## Monitoreo

### Health Check
```http
GET /health
```

### Métricas
```http
GET /metrics
```

### Logs
```http
GET /admin/logs
```

**Query Parameters:**
- `level`: error, warn, info, debug
- `startDate`: ISO date string
- `endDate`: ISO date string
- `limit`: number of log entries 