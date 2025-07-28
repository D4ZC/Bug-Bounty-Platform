#!/bin/bash

echo "🚀 Configurando Sistema de Autenticación - Bug Bounty Platform"
echo "================================================================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar Node.js
echo "1. Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js encontrado: $NODE_VERSION"
else
    print_error "Node.js no está instalado. Por favor instálalo desde nodejs.org"
    exit 1
fi

# Verificar npm
echo "2. Verificando npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_status "npm encontrado: $NPM_VERSION"
else
    print_error "npm no está instalado"
    exit 1
fi

# Verificar MongoDB
echo "3. Verificando MongoDB..."
if command -v mongod &> /dev/null; then
    print_status "MongoDB encontrado"
else
    print_warning "MongoDB no está instalado. Por favor instálalo:"
    echo "   Windows: Descargar desde mongodb.com"
    echo "   Mac: brew install mongodb-community"
    echo "   Linux: sudo apt install mongodb"
fi

# Configurar Backend
echo "4. Configurando Backend..."
cd backend

# Instalar dependencias
echo "   Instalando dependencias..."
npm install

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "   Creando archivo .env..."
    cp env.example .env
    print_status "Archivo .env creado"
else
    print_status "Archivo .env ya existe"
fi

# Inicializar base de datos
echo "   Inicializando base de datos..."
npm run init-db

cd ..

# Configurar Frontend
echo "5. Configurando Frontend..."
cd frontend

# Instalar dependencias
echo "   Instalando dependencias..."
npm install

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "   Creando archivo .env..."
    cp env.example .env
    print_status "Archivo .env creado"
else
    print_status "Archivo .env ya existe"
fi

cd ..

echo ""
echo "🎉 Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Iniciar MongoDB:"
echo "   mongod"
echo ""
echo "2. Iniciar Backend (Terminal 1):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "3. Iniciar Frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Probar el sistema:"
echo "   - Ir a http://localhost:3000/login"
echo "   - Usar credenciales: ocampoale250806@gmail.com / 123456"
echo ""
echo "🔧 Si hay problemas, revisa DIAGNOSTIC.md" 