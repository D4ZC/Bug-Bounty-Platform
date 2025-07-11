@echo off
echo ========================================
echo    Bug Bounty Platform - Local Setup
echo ========================================
echo.

echo [1/4] Configurando variables de entorno...
if not exist "backend\.env" (
    copy "backend\env.sqlite.example" "backend\.env"
    echo ✅ Backend .env creado
) else (
    echo ℹ️  Backend .env ya existe
)

if not exist "frontend\.env" (
    copy "frontend\env.local.example" "frontend\.env"
    echo ✅ Frontend .env creado
) else (
    echo ℹ️  Frontend .env ya existe
)

echo.
echo [2/4] Instalando dependencias del backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Error instalando dependencias del backend
    pause
    exit /b 1
)

echo.
echo [3/4] Instalando dependencias del frontend...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Error instalando dependencias del frontend
    pause
    exit /b 1
)

echo.
echo [4/4] Iniciando servicios...
echo.
echo 🚀 Iniciando backend en puerto 4000...
start "Backend" cmd /k "cd backend && npm run dev"

echo ⏳ Esperando 3 segundos para que el backend inicie...
timeout /t 3 /nobreak > nul

echo 🌐 Iniciando frontend en puerto 5173...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo ✅ ¡Servicios iniciados correctamente!
echo ========================================
echo.
echo 📊 Backend: http://localhost:4000/api
echo 🌐 Frontend: http://localhost:5173
echo 📁 Base de datos: ./backend/data/bug-bounty.db
echo.
echo 💡 Para detener los servicios, cierra las ventanas de terminal
echo.
pause 