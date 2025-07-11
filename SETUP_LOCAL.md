# 🚀 Configuración Local - Bug Bounty Platform

## ✅ Configuración Simplificada (Recomendada)

### Opción 1: Script Automático (Windows)
1. **Ejecuta el script automático:**
   ```bash
   start-local.bat
   ```
   
   Este script:
   - ✅ Configura automáticamente las variables de entorno
   - ✅ Instala todas las dependencias
   - ✅ Inicia backend y frontend en ventanas separadas
   - ✅ Usa SQLite (sin necesidad de MongoDB o Docker)

### Opción 2: Manual

#### 1. Configurar Variables de Entorno
```bash
# Backend
copy backend\env.sqlite.example backend\.env

# Frontend  
copy frontend\env.local.example frontend\.env
```

#### 2. Instalar Dependencias
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

#### 3. Iniciar Servicios
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

## 🌐 Acceso a la Aplicación

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000/api
- **Base de datos:** `./backend/data/bug-bounty.db` (SQLite)

---

## 📊 Características de la Configuración Local

### ✅ Ventajas
- **Sin dependencias externas:** No necesita MongoDB, Docker, o servicios externos
- **Base de datos local:** SQLite se crea automáticamente
- **Datos de ejemplo:** Incluye usuarios, clanes, vulnerabilidades, etc.
- **Configuración automática:** Scripts que configuran todo automáticamente
- **Desarrollo rápido:** Listo para usar en segundos

### 🔧 Tecnologías Utilizadas
- **Backend:** Node.js + Express + SQLite
- **Frontend:** React + Vite + TypeScript
- **Base de datos:** SQLite (archivo local)
- **Autenticación:** Mock para desarrollo

---

## 📁 Estructura de Archivos

```
Bug-Bounty-Platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js      # Configuración SQLite
│   │   │   ├── config.js        # Configuración general
│   │   │   └── seedData.js      # Datos de ejemplo
│   │   └── app.js              # Servidor principal
│   ├── data/                   # Base de datos SQLite
│   │   └── bug-bounty.db
│   └── .env                    # Variables de entorno
├── frontend/
│   ├── src/                    # Código React
│   └── .env                    # Variables de entorno
├── start-local.bat            # Script de inicio automático
└── SETUP_LOCAL.md             # Esta guía
```

---

## 🎯 Datos de Ejemplo Incluidos

### 👥 Usuarios
- Alice Johnson (XP: 1250, Nivel: 3)
- Bob Smith (XP: 2100, Nivel: 4)
- Carol Davis (XP: 800, Nivel: 2)
- David Wilson (XP: 3500, Nivel: 6)
- Eva Brown (XP: 1800, Nivel: 3)

### 🏆 Clanes
- Security Masters (Líder: David Wilson)
- Code Guardians (Líder: Bob Smith)

### 🐛 Vulnerabilidades
- SQL Injection en Login (Crítica, Resuelta)
- XSS en Comentarios (Alta, Abierta)
- CSRF en Formularios (Media, En Progreso)
- Path Traversal (Alta, Resuelta)
- Weak Password Policy (Baja, Abierta)

### 🛍️ Tienda
- Golden Avatar Frame (Legendario, 500 puntos)
- Bug Hunter Badge (Raro, 200 puntos)
- Dark Theme (Común, 150 puntos)
- Confetti Effect (Épico, 300 puntos)

---

## 🔧 Solución de Problemas

### Error: "Puerto ya en uso"
```bash
# Cambiar puerto en backend/.env
PORT=4001

# Cambiar puerto en frontend/.env
VITE_API_URL=http://localhost:4001/api
```

### Error: "Módulo no encontrado"
```bash
# Reinstalar dependencias
cd backend && npm install
cd ../frontend && npm install
```

### Error: "Base de datos no encontrada"
- La base de datos se crea automáticamente
- Verifica que exista la carpeta `backend/data/`
- Si no existe, crea la carpeta manualmente

### Error: "CORS"
- Verifica que el frontend apunte al puerto correcto del backend
- Revisa la configuración en `frontend/.env`

---

## 🚀 Próximos Pasos

1. **Explorar la aplicación:** Navega por todas las páginas
2. **Probar funcionalidades:** Crea usuarios, clanes, reporta vulnerabilidades
3. **Personalizar:** Modifica datos de ejemplo en `backend/src/config/seedData.js`
4. **Desarrollar:** Añade nuevas características

---

## 📞 Soporte

Si encuentras problemas:
1. Verifica que Node.js 18+ esté instalado
2. Revisa los logs en las terminales
3. Consulta la documentación en `docs/`
4. Revisa el historial de desarrollo en `docs/DEVELOPMENT_HISTORY.md`

---

*¡Disfruta desarrollando en la plataforma Bug Bounty! 🎉* 