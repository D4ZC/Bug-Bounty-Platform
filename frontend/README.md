# Frontend - Bug Bounty Platform

Frontend de la plataforma de Bug Bounty construido con React, TypeScript y Vite.

## 🚀 Características

- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **React Query** para gestión de estado del servidor
- **Socket.io** para notificaciones en tiempo real
- **Framer Motion** para animaciones
- **Lucide React** para iconos
- **React Hook Form** para formularios
- **Zustand** para gestión de estado local

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Backend corriendo en `http://localhost:5000`

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd Bug-Bounty-Platform/frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env.local
   ```
   
   Editar `.env.local` con tus configuraciones:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── auth/           # Componentes de autenticación
│   ├── layouts/        # Layouts de la aplicación
│   ├── ui/             # Componentes de UI básicos
│   └── forms/          # Componentes de formularios
├── contexts/           # Contextos de React
├── hooks/              # Hooks personalizados
├── pages/              # Páginas de la aplicación
├── services/           # Servicios de API y WebSocket
├── store/              # Estado global con Zustand
├── styles/             # Estilos globales
├── types/              # Tipos de TypeScript
├── utils/              # Utilidades y helpers
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada
```

## 🎨 Componentes Principales

### Layouts
- `MainLayout`: Layout principal con navegación
- `AuthLayout`: Layout para páginas de autenticación

### Páginas
- `Dashboard`: Panel principal con estadísticas
- `Vulnerabilities`: Gestión de vulnerabilidades
- `Challenges`: Retos y competencias
- `Shop`: Tienda virtual
- `Contributions`: Contribuciones técnicas
- `Profile`: Perfil de usuario
- `Team`: Gestión de equipos
- `Gulag`: Evento especial Gulag
- `MVP`: Sistema de MVP

### Componentes UI
- `LoadingSpinner`: Indicador de carga
- `Button`: Botones con variantes
- `Card`: Tarjetas de contenido
- `Modal`: Modales reutilizables
- `Badge`: Etiquetas de estado
- `Input`: Campos de entrada
- `Select`: Selectores

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de producción

# Testing
npm run test         # Ejecutar tests
npm run test:ui      # Tests con interfaz visual

# Linting
npm run lint         # Verificar código
npm run lint:fix     # Corregir problemas automáticamente
```

## 🎯 Funcionalidades

### Autenticación
- Login/Registro con w3id de IBM
- Protección de rutas
- Recuperación de contraseña

### Dashboard
- Estadísticas en tiempo real
- Gráficos de actividad
- Notificaciones
- Rankings de usuarios y equipos

### Vulnerabilidades
- Listado con filtros avanzados
- Creación y edición
- Integración con Mendscan
- Sistema de comentarios
- Adjuntos de archivos

### Retos
- Creación de retos por categoría
- Sistema de participación
- Envío de soluciones
- Evaluación automática
- Rankings y recompensas

### Tienda Virtual
- Catálogo de items
- Sistema de puntos
- Compras seguras
- Historial de transacciones

### Contribuciones
- Artículos técnicos
- Herramientas y scripts
- Tutoriales
- Sistema de votación
- Moderación de contenido

### Eventos Especiales
- **Gulag**: Competencia de eliminación
- **MVP**: Sistema de jugadores más valiosos
- Notificaciones en tiempo real
- Rankings especiales

## 🔌 Integraciones

### WebSocket
- Notificaciones en tiempo real
- Actualizaciones de estado
- Chat en vivo
- Eventos del sistema

### API REST
- Autenticación JWT
- CRUD completo
- Paginación
- Filtros avanzados
- Subida de archivos

### Servicios Externos
- **Mendscan**: Análisis de vulnerabilidades
- **w3id**: Autenticación IBM
- **Email**: Notificaciones por correo

## 🎨 Temas y Estilos

### Modo Oscuro/Claro
- Detección automática del sistema
- Cambio manual de tema
- Persistencia en localStorage

### Diseño Responsivo
- Mobile-first approach
- Breakpoints optimizados
- Componentes adaptativos

### Animaciones
- Transiciones suaves
- Micro-interacciones
- Estados de carga
- Feedback visual

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test -- --coverage

# Tests de integración
npm run test:integration

# Tests E2E (Cypress)
npm run test:e2e
```

## 📦 Build y Despliegue

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run preview
```

### Docker
```bash
docker build -t bug-bounty-frontend .
docker run -p 3000:3000 bug-bounty-frontend
```

## 🔒 Seguridad

- Validación de formularios
- Sanitización de datos
- Protección XSS
- CSRF tokens
- Rate limiting
- Headers de seguridad

## 📊 Performance

- Code splitting automático
- Lazy loading de componentes
- Optimización de imágenes
- Caching inteligente
- Bundle analysis

## 🌐 Internacionalización

- Soporte multiidioma
- Formateo de fechas
- Números y monedas
- Dirección de texto (RTL)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

- **Documentación**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discord**: [Servidor de la comunidad](https://discord.gg/your-server)

## 🔄 Changelog

Ver [CHANGELOG.md](./CHANGELOG.md) para el historial de cambios. 