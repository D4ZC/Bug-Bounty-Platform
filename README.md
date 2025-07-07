# Bug Bounty Platform

Una aplicación web para gestionar y puntuar la resolución de vulnerabilidades en aplicaciones, promoviendo la colaboración y competencia amistosa entre equipos y usuarios.

## 🚀 Características Principales

- **Gestión de Vulnerabilidades**: Integración con Mendscan para obtener y clasificar vulnerabilidades
- **Sistema de Rankings**: Rankings de usuarios y equipos con segmentación por colores
- **Sistema de Retos**: Duelos individuales y por equipos con apuestas de puntos
- **Tienda Virtual**: Cosméticos y personalización de perfiles
- **Contribuciones Técnicas**: Documentación y reportes de fallos
- **Eventos Especiales**: Competencias y reconocimientos MVP

## 🛠️ Tecnologías

- **Frontend**: React.js con IBM Carbon Design System
- **Backend**: Node.js + Express.js
- **Base de Datos**: MongoDB
- **Autenticación**: w3id de IBM
- **Notificaciones**: WebSockets + Push Notifications

## 📁 Estructura del Proyecto

```
/Bug-Bounty-Platform
├── backend/           # API REST con Node.js
├── frontend/          # Aplicación React
├── docs/              # Documentación
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- MongoDB
- Cuenta w3id de IBM

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd Bug-Bounty-Platform

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

### Configuración
1. Copiar `.env.example` a `.env` en ambas carpetas
2. Configurar variables de entorno
3. Iniciar MongoDB
4. Ejecutar migraciones

### Desarrollo
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

## 📋 Funcionalidades

### Usuarios y Equipos
- Autenticación mediante w3id de IBM
- Gestión de perfiles y equipos
- Sistema de puntuación individual y por equipos

### Vulnerabilidades
- Clasificación por severidad (Críticas, Altas, Medias, Bajas)
- Puntuación proporcional a la severidad
- Integración con Mendscan

### Rankings
- Rankings de usuarios y equipos
- Actualización cada 15 días
- Segmentación por colores
- Sistema de empates

### Retos y Eventos
- Retos individuales y por equipos
- Sistema de apuestas
- Competencia especial (Gulag)
- Eventos MVP mensuales

### Tienda Virtual
- Cosméticos para personalización
- Blue Points (moneda premium)
- Tienda especial para MVPs

### Contribuciones
- Documentación de problemas resueltos
- Reportes de fallos
- Sistema de validación comunitaria

## 🔧 Configuración de Entorno

### Variables de Entorno Backend
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/bug-bounty
JWT_SECRET=your-jwt-secret
W3ID_CLIENT_ID=your-w3id-client-id
W3ID_CLIENT_SECRET=your-w3id-client-secret
MENDSCAN_API_URL=your-mendscan-api-url
MENDSCAN_API_KEY=your-mendscan-api-key
```

### Variables de Entorno Frontend
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_W3ID_CLIENT_ID=your-w3id-client-id
```

## 📊 API Endpoints

### Autenticación
- `POST /api/auth/login` - Login con w3id
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Obtener perfil

### Usuarios
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario
- `GET /api/users/:id/metrics` - Métricas del usuario

### Equipos
- `GET /api/teams` - Listar equipos
- `GET /api/teams/:id` - Obtener equipo
- `POST /api/teams` - Crear equipo
- `PUT /api/teams/:id` - Actualizar equipo

### Vulnerabilidades
- `GET /api/vulnerabilities` - Listar vulnerabilidades
- `POST /api/vulnerabilities` - Crear vulnerabilidad manual
- `PUT /api/vulnerabilities/:id` - Marcar como resuelta

### Rankings
- `GET /api/rankings/users` - Ranking de usuarios
- `GET /api/rankings/teams` - Ranking de equipos

### Retos
- `GET /api/challenges` - Listar retos
- `POST /api/challenges` - Crear reto
- `PUT /api/challenges/:id/join` - Unirse a reto
- `GET /api/challenges/:id/progress` - Progreso del reto

### Tienda
- `GET /api/shop/items` - Listar items
- `POST /api/shop/purchase` - Comprar item
- `GET /api/shop/mvp-items` - Items MVP

### Contribuciones
- `GET /api/contributions` - Listar contribuciones
- `POST /api/contributions` - Crear contribución
- `POST /api/contributions/:id/vote` - Votar contribución

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Despliegue

### Producción
```bash
# Build frontend
cd frontend
npm run build

# Start backend
cd backend
npm start
```

### Docker
```bash
docker-compose up -d
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Para soporte técnico, contacta al equipo de desarrollo o crea un issue en el repositorio.