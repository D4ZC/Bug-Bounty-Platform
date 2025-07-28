# 🧪 Guía de Pruebas - Sistema de Autenticación

## ✅ Verificación Rápida

### 1. Verificar que el backend esté funcionando

```bash
# En el directorio backend
npm run dev
```

Deberías ver:
```
Servidor corriendo en puerto 3001
MongoDB conectado: localhost
API disponible en: http://localhost:3001/api
```

### 2. Verificar que el frontend esté funcionando

```bash
# En el directorio frontend
npm run dev
```

Deberías ver:
```
Local:   http://localhost:3000/
```

### 3. Probar las rutas de autenticación

#### Probar Login con usuario Ocampo:
1. Ir a `http://localhost:3000/login`
2. Usar credenciales:
   - **Email:** ocampoale250806@gmail.com
   - **Contraseña:** 123456
3. Hacer clic en "Iniciar Sesión"
4. Deberías ser redirigido al dashboard

#### Probar Registro de nuevo usuario:
1. Ir a `http://localhost:3000/register`
2. Completar formulario con datos válidos
3. Hacer clic en "Crear Cuenta"
4. Deberías ser redirigido al dashboard

### 4. Probar protección de rutas

#### Sin autenticación:
1. Abrir nueva ventana privada
2. Ir a `http://localhost:3000/dashboard`
3. Deberías ser redirigido a `/login`

#### Con autenticación:
1. Hacer login
2. Navegar a cualquier página
3. Todas deberían ser accesibles

### 5. Probar logout

1. Estar logueado en cualquier página
2. Hacer clic en el botón de logout (icono rosa) en el header
3. Deberías ser redirigido a `/login`
4. Intentar acceder a cualquier página debería redirigir a login

## 🔍 Verificación de Base de Datos

### Verificar usuario Ocampo:

```bash
# En el directorio backend
npm run init-db
```

Deberías ver:
```
Usuario Ocampo creado exitosamente:
Email: ocampoale250806@gmail.com
Nombre: Ocampo Alejandra
Username: ocampo
Rol: admin
```

## 🐛 Solución de Problemas Comunes

### Error: "Cannot connect to MongoDB"
```bash
# Verificar que MongoDB esté corriendo
mongod --version

# Si no está instalado, instalar MongoDB
# En Windows: descargar desde mongodb.com
# En Mac: brew install mongodb-community
# En Linux: sudo apt install mongodb
```

### Error: "CORS policy"
```bash
# Verificar que FRONTEND_URL en .env sea correcto
FRONTEND_URL=http://localhost:3000
```

### Error: "Token inválido"
```bash
# Limpiar localStorage del navegador
# O ir a /login para re-autenticarse
```

### Error: "Usuario no encontrado"
```bash
# Ejecutar script de inicialización
cd backend
npm run init-db
```

## 📊 Verificación de Funcionalidades

### ✅ Checklist de Funcionalidades:

- [ ] **Login funciona** - Usuario Ocampo puede hacer login
- [ ] **Registro funciona** - Nuevos usuarios pueden registrarse
- [ ] **Logout funciona** - Botón de logout en header
- [ ] **Rutas protegidas** - Sin login redirige a /login
- [ ] **Redirección inteligente** - Después de login va a página intentada
- [ ] **Información de usuario** - Se muestra username y rol en header
- [ ] **Validación de formularios** - Errores se muestran correctamente
- [ ] **Estados de carga** - Spinners durante login/registro
- [ ] **Persistencia de sesión** - Login persiste al recargar página

### 🔧 Comandos de Verificación:

```bash
# Verificar que todos los servicios estén corriendo
curl http://localhost:3001/api/health

# Verificar conexión a MongoDB
curl http://localhost:3001/api

# Verificar que el frontend responda
curl http://localhost:3000
```

## 🎯 Próximas Pruebas

Una vez que todo funcione, puedes probar:

1. **Registrar múltiples usuarios** y verificar que no haya conflictos
2. **Probar diferentes roles** (admin, member, moderator)
3. **Probar validaciones** con datos inválidos
4. **Probar expiración de tokens** (cambiar JWT_EXPIRE a 1m)
5. **Probar rate limiting** (hacer muchas requests rápidas)

¡El sistema de autenticación está listo para usar! 🚀 