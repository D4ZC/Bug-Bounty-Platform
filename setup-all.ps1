# Script para instalar dependencias de backend y frontend
Write-Host "Instalando dependencias del backend..."
cd backend
npm install
Write-Host "Instalando dependencias del frontend..."
cd ../frontend
npm install
Write-Host "¡Dependencias instaladas correctamente!" 