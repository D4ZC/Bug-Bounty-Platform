# 🚀 Sistema de Autenticación - Bug Bounty Platform

## 📋 Resumen

Se ha implementado un sistema completo de autenticación con las siguientes características:

- ✅ **Base de datos MongoDB** con modelo de usuario
- ✅ **Backend con Express** y autenticación JWT
- ✅ **Frontend con React** y páginas de Login/Register
- ✅ **Context de autenticación** para manejo de estado
- ✅ **Rutas protegidas** para páginas que requieren autenticación
- ✅ **Usuario Ocampo** pre-creado en la base de datos

## 🛠️ Instalación y Configuración

### 1. Prerrequisitos

- Node.js (versión 18 o superior)
- MongoDB (local o Atlas)
- npm o yarn

### 2. Configuración del Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env (copiar de env.example)
cp env.example .env
```

#### Configurar variables de entorno (.env):

```env
# Configuración del servidor
PORT=3001
NODE_ENV=development

# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/bug-bounty-platform

# JWT
JWT_SECRET=tu-secreto-jwt-super-seguro-cambiar-en-produccion
JWT_EXPIRE=30d

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Configuración del Frontend

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install
```

### 4. Inicializar la Base de Datos

```bash
# Desde el directorio backend
npm run init-db
```

Esto creará:
- ✅ Usuario Ocampo con credenciales:
  - **Email:** ocampoale250806@gmail.com
  - **Contraseña:** 123456
  - **Rol:** admin

### 5. Ejecutar la Aplicación

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

## 🔐 Funcionalidades Implementadas

### Backend (API)

#### Rutas de Autenticación:
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener usuario actual
- `PUT /api/auth/profile` - Actualizar perfil
- `PUT /api/auth/change-password` - Cambiar contraseña

#### Características:
- ✅ Validación de datos con express-validator
- ✅ Hashing de contraseñas con bcryptjs
- ✅ Autenticación JWT
- ✅ Middleware de protección de rutas
- ✅ Manejo de roles (member, admin, moderator)
- ✅ Cookies seguras para tokens

### Frontend

#### Páginas:
- ✅ **Login** (`/login`) - Inicio de sesión
- ✅ **Register** (`/register`) - Registro de usuarios
- ✅ **Dashboard** (`/dashboard`) - Página principal (protegida)

#### Características:
- ✅ Diseño consistente con el tema actual
- ✅ Validación de formularios en tiempo real
- ✅ Manejo de errores y estados de carga
- ✅ Context de autenticación global
- ✅ Rutas protegidas automáticas
- ✅ Redirección inteligente después del login

## 👤 Usuario de Prueba

### Credenciales del Usuario Ocampo:
- **Nombre:** Ocampo Alejandra
- **Email:** ocampoale250806@gmail.com
- **Username:** ocampo
- **Contraseña:** 123456
- **Rol:** admin

## 🔧 Uso del Sistema

### 1. Registro de Nuevos Usuarios

1. Ir a `/register`
2. Completar el formulario con:
   - Nombre y apellido
   - Email válido
   - Username único
   - Contraseña que cumpla los requisitos
3. Hacer clic en "Crear Cuenta"

### 2. Inicio de Sesión

1. Ir a `/login`
2. Ingresar email y contraseña
3. Hacer clic en "Iniciar Sesión"
4. Será redirigido al dashboard

### 3. Acceso a Páginas Protegidas

- Todas las páginas existentes ahora requieren autenticación
- Si no está autenticado, será redirigido a `/login`
- Después del login, será redirigido a la página que intentaba acceder

## 🛡️ Seguridad

### Implementado:
- ✅ Contraseñas hasheadas con bcryptjs
- ✅ Tokens JWT con expiración
- ✅ Validación de datos en frontend y backend
- ✅ Protección CSRF con cookies httpOnly
- ✅ Rate limiting para prevenir ataques
- ✅ Sanitización de inputs
- ✅ Validación de roles

### Recomendaciones para Producción:
- 🔒 Cambiar JWT_SECRET por uno más seguro
- 🔒 Usar HTTPS
- 🔒 Configurar CORS apropiadamente
- 🔒 Implementar logging de seguridad
- 🔒 Configurar backup de base de datos

## 📁 Estructura de Archivos

```
backend/
├── src/
│   ├── models/
│   │   └── User.js              # Modelo de usuario MongoDB
│   ├── routes/
│   │   └── auth.js              # Rutas de autenticación
│   ├── middleware/
│   │   └── auth.js              # Middleware de autenticación
│   ├── utils/
│   │   └── jwt.js               # Utilidades JWT
│   ├── config/
│   │   └── database.js          # Configuración de base de datos
│   ├── scripts/
│   │   └── initDb.js            # Script de inicialización
│   └── app.js                   # Aplicación principal
└── package.json

frontend/
├── src/
│   ├── pages/auth/
│   │   ├── Login.tsx            # Página de login
│   │   └── Register.tsx         # Página de registro
│   ├── components/auth/
│   │   └── ProtectedRoute.tsx   # Componente de ruta protegida
│   ├── contexts/
│   │   └── AuthContext.tsx      # Contexto de autenticación
│   └── ...
└── package.json
```

## 🚨 Solución de Problemas

### 🔧 Instalación Automática

**Para Windows:**
```bash
# Ejecutar script de configuración automática
setup-auth.bat
```

**Para Linux/Mac:**
```bash
# Ejecutar script de configuración automática
./setup-auth.sh
```

### 🔍 Diagnóstico Manual

Si el script automático no funciona, sigue estos pasos:

#### 1. Verificar Dependencias
```bash
# Verificar Node.js (debe ser >= 18)
node --version

# Verificar npm
npm --version

# Verificar MongoDB
mongod --version
```

#### 2. Configurar Backend
```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cp env.example .env

# Inicializar base de datos
npm run init-db
```

#### 3. Configurar Frontend
```bash
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env
cp env.example .env
```

#### 4. Probar Conexión
```bash
# Ejecutar script de prueba
node test-connection.js
```

### 🐛 Errores Comunes

#### Error: "Cannot connect to MongoDB"
```bash
# Verificar que MongoDB esté corriendo
mongod --version

# Si no está instalado:
# Windows: Descargar desde mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt install mongodb
```

#### Error: "CORS policy"
```bash
# Verificar que FRONTEND_URL en .env sea correcto
FRONTEND_URL=http://localhost:3000
```

#### Error: "Module not found"
```bash
# Reinstalar dependencias
cd backend
rm -rf node_modules package-lock.json
npm install
```

#### Error: "Port already in use"
```bash
# Cambiar puerto en .env
PORT=3002

# O matar proceso que usa el puerto
lsof -ti:3001 | xargs kill -9
```

#### Error: "Token inválido"
```bash
# Limpiar localStorage del navegador
# O ir a /login para re-autenticarse
```

### 📊 Checklist de Verificación

- [ ] MongoDB está corriendo
- [ ] Backend está corriendo en puerto 3001
- [ ] Variables de entorno están configuradas
- [ ] Base de datos está inicializada
- [ ] Usuario Ocampo existe
- [ ] Frontend está corriendo en puerto 3000
- [ ] Variables de entorno del frontend están configuradas
- [ ] No hay errores CORS
- [ ] Endpoints responden correctamente

### 📖 Documentación Adicional

- **DIAGNOSTIC.md** - Guía completa de diagnóstico
- **TEST_AUTH.md** - Guía de pruebas del sistema

## 🎯 Próximos Pasos

1. ✅ **Integrar con páginas existentes** - Agregar logout en el header
2. ✅ **Proteger todas las rutas** - Todas las páginas ahora requieren autenticación
3. **Perfil de usuario** - Página para editar información personal
4. **Recuperación de contraseña** - Sistema de reset por email
5. **Verificación de email** - Confirmación de cuenta
6. **Roles y permisos** - Sistema más granular de autorización

## 📞 Soporte

Si encuentras algún problema:

1. Verificar que MongoDB esté corriendo
2. Verificar que las variables de entorno estén configuradas
3. Revisar los logs del backend para errores
4. Verificar la consola del navegador para errores del frontend

¡El sistema de autenticación está listo para usar! 🚀 