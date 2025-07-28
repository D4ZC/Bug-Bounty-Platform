@echo off
echo 🚀 Configurando Sistema de Autenticación - Bug Bounty Platform
echo ================================================================

REM Verificar Node.js
echo 1. Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js encontrado
) else (
    echo ❌ Node.js no está instalado. Por favor instálalo desde nodejs.org
    pause
    exit /b 1
)

REM Verificar npm
echo 2. Verificando npm...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ npm encontrado
) else (
    echo ❌ npm no está instalado
    pause
    exit /b 1
)

REM Verificar MongoDB
echo 3. Verificando MongoDB...
mongod --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB encontrado
) else (
    echo ⚠️  MongoDB no está instalado. Por favor instálalo desde mongodb.com
)

REM Configurar Backend
echo 4. Configurando Backend...
cd backend

REM Instalar dependencias
echo    Instalando dependencias...
call npm install

REM Crear archivo .env si no existe
if not exist .env (
    echo    Creando archivo .env...
    copy env.example .env
    echo ✅ Archivo .env creado
) else (
    echo ✅ Archivo .env ya existe
)

REM Inicializar base de datos
echo    Inicializando base de datos...
call npm run init-db

cd ..

REM Configurar Frontend
echo 5. Configurando Frontend...
cd frontend

REM Instalar dependencias
echo    Instalando dependencias...
call npm install

REM Crear archivo .env si no existe
if not exist .env (
    echo    Creando archivo .env...
    copy env.example .env
    echo ✅ Archivo .env creado
) else (
    echo ✅ Archivo .env ya existe
)

cd ..

echo.
echo 🎉 Configuración completada!
echo.
echo 📋 Próximos pasos:
echo 1. Iniciar MongoDB:
echo    mongod
echo.
echo 2. Iniciar Backend (Terminal 1):
echo    cd backend
echo    npm run dev
echo.
echo 3. Iniciar Frontend (Terminal 2):
echo    cd frontend
echo    npm run dev
echo.
echo 4. Probar el sistema:
echo    - Ir a http://localhost:3000/login
echo    - Usar credenciales: ocampoale250806@gmail.com / 123456
echo.
echo 🔧 Si hay problemas, revisa DIAGNOSTIC.md
pause 