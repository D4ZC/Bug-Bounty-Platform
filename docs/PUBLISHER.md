# Publisher - Funcionalidad de Publicaciones

## Descripción

La funcionalidad de Publisher permite a los usuarios publicar documentaciones detalladas sobre cómo resolvieron vulnerabilidades, compartiendo su conocimiento con la comunidad y ganando puntos adicionales por sus contribuciones educativas.

## Características Principales

### 🎯 Para Usuarios
- **Crear Publicaciones**: Los usuarios pueden crear publicaciones detalladas asociadas a vulnerabilidades resueltas
- **Contenido Rico**: Soporte para texto detallado, tags, y asociación con vulnerabilidades específicas
- **Sistema de Puntos**: Recompensas por publicaciones aprobadas
- **Historial Personal**: Seguimiento de todas las publicaciones del usuario
- **Filtros**: Ver publicaciones por estado (todas, mías, aprobadas, pendientes)

### 🔍 Para Moderadores/Admins
- **Panel de Moderación**: Revisar y aprobar/rechazar publicaciones pendientes
- **Feedback**: Proporcionar comentarios constructivos a los autores
- **Asignación de Puntos**: Determinar la cantidad de puntos a otorgar
- **Gestión de Estados**: Control completo del flujo de publicación

## Flujo de Trabajo

### 1. Creación de Publicación
```
Usuario → Crea publicación → Asocia vulnerabilidad → Envía para revisión
```

### 2. Proceso de Moderación
```
Moderador → Revisa contenido → Proporciona feedback → Aprueba/Rechaza → Asigna puntos
```

### 3. Publicación Aprobada
```
Sistema → Actualiza estado → Otorga puntos → Registra en historial → Notifica al usuario
```

## Estructura de Datos

### Publication
```typescript
interface Publication {
  _id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  vulnerabilityId: string;
  vulnerabilityTitle: string;
  vulnerabilitySeverity: VulnerabilitySeverity;
  status: PublicationStatus;
  moderatorId?: string;
  moderatorFeedback?: string;
  approvedAt?: Date;
  pointsAwarded: number;
  views: number;
  likes: number;
  tags: stringhments: Attachment[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
```

### PublicationHistory
```typescript
interface PublicationHistory {
  _id: string;
  userId: string;
  publicationId: string;
  publicationTitle: string;
  vulnerabilityId: string;
  vulnerabilityTitle: string;
  action: 'created' | 'submitted| 'approved' | 'rejected;
  pointsEarned: number;
  date: Date;
}
```

## Estados de Publicación

- **`draft`**: Borrador (solo visible para el autor)
- **`pending_review`**: Pendiente de revisión por moderador
- **`approved`**: Aprobada y visible públicamente
- **`rejected`**: Rechazada (con feedback del moderador)

## API Endpoints

### Publicaciones
- `GET /api/publications` - Obtener todas las publicaciones
- `GET /api/publications/:id` - Obtener publicación específica
- `POST /api/publications` - Crear nueva publicación
- `PUT /api/publications/:id` - Actualizar publicación
- `DELETE /api/publications/:id` - Eliminar publicación

### Moderación
- `POST /api/publications/:id/review` - Revisar publicación (admin/moderador)
- `POST /api/publications/:id/like` - Dar like a publicación

### Historial
- `GET /api/publications/history/:userId` - Obtener historial de usuario

## Criterios de Aceptación

### ✅ Completados
- [x] Los usuarios pueden publicar explicaciones detalladas asociadas a vulnerabilidades resueltas
- [x] Las publicaciones son revisadas y aprobadas por moderadores
- [x] Se otorgan puntos adicionales al usuario tras la aprobación
- [x] Las publicaciones son visibles en un apartado público
- [x] El historial del usuario registra esta actividad
- [x] Sistema de filtros por estado y autor
- [x] Panel de moderación para administradores
- [x] Sistema de likes y vistas
- [x] Feedback del moderador
- [x] Asociación con vulnerabilidades específicas

### 🔄 En Desarrollo
- [ ] Integración con sistema de notificaciones
- [ ] Sistema de comentarios en publicaciones
- [ ] Adjuntos de archivos
- [ ] Búsqueda y filtros avanzados
- [ ] Estadísticas de publicaciones

## Ejemplo de Uso

### Escenario: Usuario Publica Documentación1. **Usuario resuelve vulnerabilidad**: Completa una vulnerabilidad de criticidad alta
2. **Accede a Publisher**: Hace clic en el icono de Tablet en el sidebar
3. **Crea publicación**: Completa el formulario con:
   - Título:Cómoresolví una vulnerabilidad SQL Injection
   - Descripción:Guía paso a paso para identificar y corregir SQL Injection"
   - Contenido: Explicación detallada con código y herramientas
   - Vulnerabilidad asociada: Selecciona la vulnerabilidad resuelta
   - Tags: sql-injection, owasp, web-security"
4. **Envía para revisión**: La publicación queda en estado pending_review"
5. **Moderador revisa**: Evalúa la calidad y utilidad del contenido
6. **Aprueba publicación**: Asigna 75 puntos y proporciona feedback
7. **Sistema actualiza**: Usuario recibe puntos y la publicación es visible públicamente

## Beneficios

### Para la Comunidad
- **Aprendizaje Colectivo**: Compartir conocimiento y experiencias
- **Mejores Prácticas**: Documentación de técnicas efectivas
- **Reducción de Duplicación**: Evitar que otros reinventen soluciones
- **Mentoría**: Usuarios experimentados ayudan a principiantes

### Para los Usuarios
- **Reconocimiento**: Puntos adicionales por contribuciones educativas
- **Portfolio**: Historial de publicaciones como credencial
- **Networking**: Conectar con otros investigadores
- **Desarrollo Profesional**: Mejorar habilidades de documentación

### Para la Plataforma
- **Contenido de Calidad**: Biblioteca de recursos educativos
- **Engagement**: Mayor participación de usuarios
- **Reputación**: Posicionamiento como plataforma educativa
- **Retención**: Usuarios más comprometidos con la comunidad

## Configuración

### Variables de Entorno
```env
# Puntos por defecto para publicaciones aprobadas
DEFAULT_PUBLICATION_POINTS=50

# Roles que pueden moderar publicaciones
MODERATOR_ROLES=admin,moderator

# Límite de publicaciones por usuario
MAX_PUBLICATIONS_PER_USER=10
```

### Permisos
- **Crear publicación**: Usuarios autenticados
- **Editar publicación**: Solo el autor (si está en borrador o pendiente)
- **Eliminar publicación**: Autor o administrador
- **Moderar publicación**: Administradores y moderadores
- **Ver historial**: Usuario propietario o administrador

## Próximas Mejoras

### Funcionalidades Planificadas
- [ ] Sistema de versionado de publicaciones
- [ ] Colaboración entre autores
-las de publicación
- [ ] Integración con herramientas externas
- [ ] Sistema de badges por publicaciones destacadas
- [ ] Analytics de engagement
- ortación de publicaciones
- ] Sistema de citas y referencias

### Mejoras Técnicas
- [ ] Optimización de consultas de base de datos
- [ ] Cache de publicaciones populares
-Búsqueda full-text
- [ ] Sistema de recomendaciones
- [ ] API rate limiting específico
-ación de contenido automática

## Contribución

Para contribuir a esta funcionalidad:

1. Revisa los issues abiertos en el repositorio
2Sigue las guías de estilo del proyecto
3. Escribe tests para nuevas funcionalidades
4. Documenta los cambios realizados
5icita review antes de hacer merge

## Soporte

Para reportar bugs o solicitar nuevas funcionalidades:

- Crea un issue en el repositorio
- Proporciona información detallada del problema
- Incluye pasos para reproducir el error
- Adjunta capturas de pantalla si es relevante 