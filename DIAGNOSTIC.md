# 🔍 Diagnóstico de Problemas de Conexión

## 🚨 Problema: Error de conexión al iniciar sesión

### 📋 Pasos de Diagnóstico

#### 1. Verificar que el backend esté corriendo

```bash
# En el directorio backend
cd backend

# Instalar dependencias (si no lo has hecho)
npm install

# Iniciar el servidor
npm run dev
```

**Deberías ver:**
```
Servidor corriendo en puerto 3001
MongoDB conectado: localhost
API disponible en: http://localhost:3001/api
```

#### 2. Verificar que MongoDB esté corriendo

```bash
# Verificar si MongoDB está instalado
mongod --version

# Si no está corriendo, iniciarlo
mongod
```

#### 3. Verificar variables de entorno

**Crear archivo `.env` en el directorio backend:**

```bash
# En el directorio backend
cp env.example .env
```

**Contenido del `.env`:**
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

#### 4. Inicializar la base de datos

```bash
# En el directorio backend
npm run init-db
```

**Deberías ver:**
```
Usuario Ocampo creado exitosamente:
Email: ocampoale250806@gmail.com
Nombre: Ocampo Alejandra
Username: ocampo
Rol: admin
```

#### 5. Probar endpoints manualmente

**Usando curl o Postman:**

```bash
# Probar endpoint de salud
curl http://localhost:3001/api/health

# Probar endpoint de información
curl http://localhost:3001/api

# Probar login (debería dar error 400 por datos vacíos)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{}'
```

#### 6. Verificar configuración del frontend

**Crear archivo `.env` en el directorio frontend:**

```bash
# En el directorio frontend
cp env.example .env
```

**Contenido del `.env`:**
```env
# Configuración de la API
VITE_API_URL=http://localhost:3001
```

#### 7. Verificar consola del navegador

1. Abrir DevTools (F12)
2. Ir a la pestaña Console
3. Intentar hacer login
4. Revisar errores en la consola

### 🐛 Errores Comunes y Soluciones

#### Error: "Cannot connect to MongoDB"
```bash
# Solución: Instalar y configurar MongoDB
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

### 🔧 Script de Prueba Automática

```bash
# Ejecutar script de prueba
node test-connection.js
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

### 🆘 Si el problema persiste

1. **Revisar logs del backend** para errores específicos
2. **Verificar versión de Node.js** (debe ser >= 18)
3. **Limpiar cache del navegador**
4. **Verificar firewall/antivirus**
5. **Probar en modo incógnito**

### 📞 Información para Debug

**Comandos útiles:**
```bash
# Verificar versión de Node.js
node --version

# Verificar versión de npm
npm --version

# Verificar procesos corriendo en puerto 3001
lsof -i :3001

# Verificar logs de MongoDB
tail -f /var/log/mongodb/mongod.log
```

¡Sigue estos pasos y el problema debería resolverse! 🚀 