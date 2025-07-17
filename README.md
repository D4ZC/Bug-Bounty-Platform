# 🐛 Bug Bounty Platform

Una plataforma completa para gestionar vulnerabilidades, competencias y colaboración entre equipos de desarrollo de seguridad.

## 🚀 Características Principales

### 🔐 Autenticación y Gestión de Usuarios
- **Sistema de autenticación JWT** con refresh tokens
- **Registro y login** con validación completa
- **Perfiles de usuario** con avatares y nicknames únicos
- **Sistema de roles** (member, team_leader, admin)
- **Gestión de preferencias** (idioma, tema, notificaciones)

### 🏆 Sistema de Puntuación y Rankings
- **Puntuación por severidad**:
  - Críticas: 100 puntos
  - Altas: 75 puntos
  - Medias: 50 puntos
  - Bajas: 25 puntos
- **Rankings duales**: Usuarios y Equipos
- **Actualización automática** cada 15 días
- **Segmentación por colores** según posición
- **Sistema de desempate** por vulnerabilidades críticas

### 🎯 Sistema MVP (Most Valuable Player)
- **Reconocimientos mensuales** para usuarios y equipos
- **Bonificaciones por racha** (3+ meses consecutivos)
- **Tienda exclusiva MVP** con cosméticos premium
- **Blue Points** como moneda premium
- **Emblemas y títulos** especiales

### ⚔️ Evento Gulag
- **Competencia especial** para los últimos 5 del ranking
- **Marcador adicional** durante el evento
- **Penalizaciones** para bajo rendimiento
- **Notificaciones automáticas** y alertas

### 🥊 Sistema de Retos y Duelos
- **Retos individuales y por equipos**
- **Sistema de apuestas** con puntos
- **Participación anónima** hasta el final
- **Categorías por dificultad** (Críticas, Altas, Medias, Bajas)
- **Premios proporcionales** al riesgo

### 🛍️ Tienda Virtual
- **Cosméticos personalizables**:
  - Fondos de perfil (1920x1080)
  - Marcos de avatar (500x500)
  - Avatares animados (GIF 300x300)
  - Insignias especiales (150x150)
  - Placas de nombre (600x100)
- **Sistema Blue Points** para items premium
- **Contenido estacional** y exclusivo MVP
- **Inventario personal** con equipamiento

### 📚 Contribuciones Técnicas
- **Documentación de vulnerabilidades** resueltas
- **Reportes de bugs** encontrados
- **Sistema de votación** comunitario
- **Validación automática** por votos positivos
- **Puntos por contribución** aprobada

### 🔍 Búsqueda y Filtros
- **Búsqueda avanzada** de usuarios y equipos
- **Filtros por múltiples criterios**
- **Paginación optimizada**
- **Resultados en tiempo real**

## 🏗️ Arquitectura Técnica

### Frontend (React + TypeScript)
- **React 18** con hooks modernos
- **TypeScript** para type safety
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **React i18next** para internacionalización
- **Context API** para estado global
- **Axios** para llamadas API

### Backend (Node.js + Express)
- **Node.js 18+** con Express
- **MongoDB** con Mongoose ODM
- **JWT** para autenticación
- **bcryptjs** para encriptación
- **express-validator** para validaciones
- **helmet** para seguridad
- **rate-limiting** para protección
- **multer** para uploads de archivos

### Base de Datos
- **MongoDB** como base principal
- **Índices optimizados** para consultas
- **Relaciones** entre colecciones
- **Validaciones** a nivel de esquema
- **Métodos personalizados** en modelos

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- MongoDB 5+
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd Bug-Bounty-Platform
```

### 2. Configurar Backend
```bash
cd backend
npm install
cp env.example .env
# Editar .env con tus configuraciones
npm run dev
```

### 3. Configurar Frontend
```bash
cd frontend
npm install
cp env.example .env
# Editar .env con la URL del backend
npm run dev
```

### 4. Configurar Base de Datos
```bash
# Asegúrate de que MongoDB esté corriendo
mongod
```

## 🔧 Configuración de Variables de Entorno

### Backend (.env)
```env
# Servidor
NODE_ENV=development
PORT=3001

# Base de datos
MONGODB_URI=mongodb://localhost:27017/bug-bounty-platform

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3002
```

## 🚀 Uso

### 1. Registro e Inicio de Sesión
- Accede a `/register` para crear cuenta
- Proporciona nombre, apellido, email y contraseña
- El sistema genera automáticamente un nickname único
- Se asigna un rango aleatorio y equipo

### 2. Gestión de Perfil
- Edita tu perfil en `/profile`
- Cambia nickname, avatar y preferencias
- Modifica contraseña de forma segura
- Personaliza cosméticos equipados

### 3. Explorar Rankings
- Visualiza rankings de usuarios y equipos
- Filtra por diferentes criterios
- Observa la segmentación por colores
- Revisa estadísticas detalladas

### 4. Participar en Retos
- Crea o únete a retos individuales/equipos
- Apuesta puntos según la categoría
- Resuelve vulnerabilidades durante el tiempo límite
- Gana premios proporcionales al riesgo

### 5. Contribuir al Conocimiento
- Sube documentación de vulnerabilidades resueltas
- Reporta bugs encontrados en aplicaciones
- Vota contribuciones de otros usuarios
- Gana puntos por contribuciones validadas

### 6. Tienda y Personalización
- Compra cosméticos con puntos normales
- Accede a items exclusivos con Blue Points
- Equipa cosméticos en tu perfil
- Personaliza tu apariencia

## 📊 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener perfil
- `PUT /api/auth/profile` - Actualizar perfil
- `PUT /api/auth/password` - Cambiar contraseña
- `POST /api/auth/logout` - Cerrar sesión

### Usuarios
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario
- `GET /api/users/:id/statistics` - Estadísticas
- `GET /api/users/:id/vulnerabilities` - Vulnerabilidades resueltas

### Equipos
- `GET /api/teams` - Listar equipos
- `POST /api/teams` - Crear equipo
- `GET /api/teams/:id` - Obtener equipo
- `PUT /api/teams/:id` - Actualizar equipo
- `GET /api/teams/:id/statistics` - Estadísticas del equipo
- `POST /api/teams/:id/members` - Agregar miembro

### Vulnerabilidades
- `GET /api/vulnerabilities` - Listar vulnerabilidades
- `POST /api/vulnerabilities` - Crear vulnerabilidad
- `GET /api/vulnerabilities/:id` - Obtener vulnerabilidad
- `PUT /api/vulnerabilities/:id` - Actualizar vulnerabilidad
- `POST /api/vulnerabilities/:id/resolve` - Resolver vulnerabilidad

### Rankings
- `GET /api/rankings/users` - Ranking de usuarios
- `GET /api/rankings/teams` - Ranking de equipos
- `GET /api/rankings/mvp` - Usuarios MVP

### Retos
- `GET /api/challenges` - Listar retos
- `POST /api/challenges` - Crear reto
- `GET /api/challenges/:id` - Obtener reto
- `POST /api/challenges/:id/join` - Unirse a reto
- `POST /api/challenges/:id/complete` - Completar reto

### Tienda
- `GET /api/shop/items` - Listar items
- `POST /api/shop/purchase` - Comprar item
- `GET /api/shop/inventory` - Inventario del usuario
- `PUT /api/shop/equip` - Equipar cosmético

### Contribuciones
- `GET /api/contributions` - Listar contribuciones
- `POST /api/contributions` - Crear contribución
- `GET /api/contributions/:id` - Obtener contribución
- `POST /api/contributions/:id/vote` - Votar contribución

## 🔒 Seguridad

### Autenticación
- **JWT tokens** con expiración configurable
- **Refresh tokens** para renovación automática
- **Encriptación bcrypt** para contraseñas
- **Validación de entrada** en todos los endpoints

### Autorización
- **Middleware de roles** para control de acceso
- **Verificación de propiedad** de recursos
- **Protección de rutas** según permisos
- **Validación de membresía** de equipos

### Protección
- **Rate limiting** para prevenir abuso
- **Helmet** para headers de seguridad
- **CORS** configurado apropiadamente
- **Validación de archivos** en uploads
- **Sanitización de entrada** automática

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
npm run test:watch
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:ui
```

## 📈 Monitoreo y Logs

### Logging
- **Winston** para logging estructurado
- **Niveles de log** configurables
- **Rotación de archivos** automática
- **Logs de auditoría** para acciones críticas

### Health Checks
- `GET /api/health` - Estado del servidor
- **Verificación de base de datos**
- **Métricas de memoria** y rendimiento
- **Estado de servicios** externos

## 🚀 Despliegue

### Docker
```bash
# Construir imágenes
docker-compose build

# Ejecutar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### Producción
1. Configurar variables de entorno de producción
2. Configurar MongoDB Atlas o cluster local
3. Configurar reverse proxy (nginx)
4. Configurar SSL/TLS
5. Configurar monitoreo y alertas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

- **Documentación**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/your-repo/discussions)

## 🎯 Roadmap

### Próximas Características
- [ ] **Integración con Mendscan** para vulnerabilidades automáticas
- [ ] **WebSockets** para actualizaciones en tiempo real
- [ ] **Sistema de notificaciones** push y email
- [ ] **API pública** para integraciones externas
- [ ] **Dashboard de administración** avanzado
- [ ] **Sistema de achievements** y badges
- [ ] **Integración con CI/CD** para validación automática
- [ ] **Métricas avanzadas** y analytics
- [ ] **Sistema de mentoría** entre usuarios
- [ ] **Eventos en vivo** y streaming

---

**Desarrollado con ❤️ para la comunidad de seguridad**