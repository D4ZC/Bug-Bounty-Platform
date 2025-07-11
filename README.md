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

## 📁 Estructura del Proyecto

```
/Bug-Bounty-Platform
├── backend/           # API REST con Node.js
├── frontend/          # Aplicación React
├── docs/              # Documentación
│   ├── API.md         # Documentación de la API
│   ├── FRONTEND.md    # Guía de desarrollo frontend
│   └── DEVELOPMENT_HISTORY.md  # Historial de desarrollo
└── README.md
```

## 📚 Documentación

- **[API.md](docs/API.md)** - Documentación completa de la API REST
- **[FRONTEND.md](docs/FRONTEND.md)** - Guía de desarrollo del frontend
- **[DEVELOPMENT_HISTORY.md](docs/DEVELOPMENT_HISTORY.md)** - Historial completo de desarrollo y mejoras implementadas

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
- `POST /api/challenges`