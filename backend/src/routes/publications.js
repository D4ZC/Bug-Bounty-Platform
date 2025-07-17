const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de multer para archivos adjuntos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/publications';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000000000);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5 // Máximo 5 archivos
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'), false);
    }
  }
});

// Modelo de Publicación (simulado por ahora)
let publications = [];
let publicationHistory = [];
let notifications = [];

// Función para calcular puntos basado en severidad
const calculatePoints = (severity) => {
  switch (severity) {
    case 'critical': return 20;
    case 'high': return 150;
    case 'medium': return 100;
    case 'low': return 50;
    default: return 25;
  }
};

// Función para crear notificación
const createNotification = (type, userId, data) => {
  const notification = {
    _id: Date.now().toString(),
    type,
    userId,
    data,
    read: false,
    createdAt: new Date()
  };
  notifications.push(notification);
  return notification;
};

// GET /api/publications - Obtener todas las publicaciones
router.get('/', async (req, res) => {
  try {
    const { status, author, vulnerabilityId, search } = req.query;
    let filteredPublications = [...publications];
    
    if (status) {
      filteredPublications = filteredPublications.filter(pub => pub.status === status);
    }
    
    if (author) {
      filteredPublications = filteredPublications.filter(pub => pub.author === author);
    }
    
    if (vulnerabilityId) {
      filteredPublications = filteredPublications.filter(pub => pub.vulnerabilityId === vulnerabilityId);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPublications = filteredPublications.filter(pub => 
        pub.title.toLowerCase().includes(searchLower) ||
        pub.description.toLowerCase().includes(searchLower) ||
        pub.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    res.json({
      success: true,
      data: filteredPublications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener las publicaciones'
    });
  }
});

// GET /api/publications/pending - Obtener publicaciones pendientes (solo admin/moderador)
router.get('/pending', [auth, admin], async (req, res) => {
  try {
    const pendingPublications = publications.filter(pub => pub.status === 'pending_review');
    
    res.json({
      success: true,
      data: pendingPublications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener las publicaciones pendientes'
    });
  }
});

// GET /api/publications/:id - Obtener una publicación específica
router.get('/:id', async (req, res) => {
  try {
    const publication = publications.find(pub => pub._id === req.params.id);
    
    if (!publication) {
      return res.status(404).json({
        success: false,
        error: 'Publicación no encontrada'
      });
    }
    
    // Incrementar vistas
    publication.views += 1;
    
    res.json({
      success: true,
      data: publication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener la publicación'
    });
  }
});

// POST /api/publications - Crear una nueva publicación
router.post('/', upload.array('attachments', 5), async (req, res) => {
  try {
    const { title, description, content, vulnerabilityId, tags, estimatedPoints } = req.body;
    // Validar campos requeridos
    if (!title || !content || !vulnerabilityId) {
      return res.status(400).json({
        success: false,
        error: 'Título, contenido y vulnerabilidad son requeridos'
      });
    }
    // Procesar tags de forma segura
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : Array.isArray(tags) ? tags : [];
      } catch (e) {
        parsedTags = [];
      }
    }
    // Permitir vulnerabilidad libre y publicación anónima
    const vulnerability = {
      _id: vulnerabilityId,
      title: vulnerabilityId,
      severity: 'low',
      status: 'resolved',
      reporter: null
    };
    // Procesar archivos adjuntos de forma segura
    let attachments = [];
    try {
      attachments = req.files ? req.files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path
      })) : [];
    } catch (e) {
      attachments = [];
    }
    // Blindar req.user
    const authorId = req.user && req.user.id ? req.user.id : null;
    const authorName = req.user && req.user.username ? req.user.username : 'Anónimo';
    // Blindar estimatedPoints
    let safePoints = 25;
    if (estimatedPoints && !isNaN(parseInt(estimatedPoints))) {
      safePoints = parseInt(estimatedPoints);
    }
    const newPublication = {
      _id: Date.now().toString(),
      title,
      description: description || '',
      content,
      author: authorId,
      authorName: authorName,
      vulnerabilityId,
      vulnerabilityTitle: vulnerability.title,
      vulnerabilitySeverity: vulnerability.severity,
      status: 'pending_review',
      pointsAwarded: 0,
      estimatedPoints: safePoints,
      views: 0,
      likes: 0,
      tags: parsedTags,
      attachments,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    publications.push(newPublication);
    // Registrar en el historial
    publicationHistory.push({
      _id: Date.now().toString(),
      userId: authorId,
      publicationId: newPublication._id,
      publicationTitle: newPublication.title,
      vulnerabilityId: newPublication.vulnerabilityId,
      vulnerabilityTitle: newPublication.vulnerabilityTitle,
      action: 'created',
      pointsEarned: 0,
      date: new Date()
    });
    // Crear notificación para moderadores
    createNotification('new_publication', 'moderators', {
      publicationId: newPublication._id,
      publicationTitle: newPublication.title,
      authorName: newPublication.authorName,
      vulnerabilityTitle: newPublication.vulnerabilityTitle
    });
    res.status(201).json({
      success: true,
      data: newPublication
    });
  } catch (error) {
    console.error('Error en POST /publications:', error);
    res.status(500).json({
      success: false,
      error: error && error.message ? error.message : 'Error al crear la publicación',
      stack: error && error.stack ? error.stack : undefined
    });
  }
});

// PUT /api/publications/:id - Actualizar una publicación
router.put('/:id', auth, async (req, res) => {
  try {
    const publication = publications.find(pub => pub._id === req.params.id);
    
    if (!publication) {
      return res.status(404).json({
        success: false,
        error: 'Publicación no encontrada'
      });
    }
    
    // Solo el autor puede editar su publicación
    if (publication.author !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para editar esta publicación'
      });
    }
    
    // Solo se pueden editar publicaciones en borrador o pendientes
    if (publication.status !== 'draft' && publication.status !== 'pending_review') {
      return res.status(400).json({
        success: false,
        error: 'No se puede editar una publicación aprobada o rechazada'
      });
    }
    
    const { title, description, content, tags } = req.body;
    
    publication.title = title || publication.title;
    publication.description = description || publication.description;
    publication.content = content || publication.content;
    publication.tags = tags ? JSON.parse(tags) : publication.tags;
    publication.updatedAt = new Date();
    
    res.json({
      success: true,
      data: publication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar la publicación'
    });
  }
});

// POST /api/publications/:id/review - Revisar una publicación (solo admin/moderador)
router.post('/:id/review', [auth, admin], async (req, res) => {
  try {
    const { status, feedback, pointsAwarded } = req.body;
    
    if (!['approved', 'rejected', 'needs_revision'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Estado inválido'
      });
    }
    
    const publication = publications.find(pub => pub._id === req.params.id);
    
    if (!publication) {
      return res.status(404).json({
        success: false,
        error: 'Publicación no encontrada'
      });
    }
    
    const previousStatus = publication.status;
    publication.status = status;
    publication.moderatorId = req.user.id;
    publication.moderatorName = req.user.username;
    publication.moderatorFeedback = feedback || '';
    publication.reviewedAt = new Date();
    
    // Calcular puntos si es aprobada
    if (status === 'approved') {
      const points = pointsAwarded || publication.estimatedPoints || calculatePoints(publication.vulnerabilitySeverity);
      publication.pointsAwarded = points;
      
      // Actualizar historial con puntos ganados
      const historyEntry = publicationHistory.find(h => h.publicationId === publication._id);
      if (historyEntry) {
        historyEntry.pointsEarned = points;
        historyEntry.action = 'approved';
      }
      
      // Crear notificación para el autor
      createNotification('publication_approved', publication.author, {
        publicationId: publication._id,
        publicationTitle: publication.title,
        pointsAwarded: points
      });
    } else if (status === 'rejected') {
      // Crear notificación para el autor
      createNotification('publication_rejected', publication.author, {
        publicationId: publication._id,
        publicationTitle: publication.title,
        feedback: feedback
      });
    } else if (status === 'needs_revision') {
      // Crear notificación para el autor
      createNotification('publication_needs_revision', publication.author, {
        publicationId: publication._id,
        publicationTitle: publication.title,
        feedback: feedback
      });
    }
    
    res.json({
      success: true,
      data: publication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al revisar la publicación'
    });
  }
});

// POST /api/publications/:id/like - Dar like a una publicación
router.post('/:id/like', auth, async (req, res) => {
  try {
    const publication = publications.find(pub => pub._id === req.params.id);
    
    if (!publication) {
      return res.status(404).json({
        success: false,
        error: 'Publicación no encontrada'
      });
    }
    
    // Solo se pueden dar like a publicaciones aprobadas
    if (publication.status !== 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Solo se pueden dar like a publicaciones aprobadas'
      });
    }
    
    // Verificar si ya dio like
    if (!publication.likedBy) {
      publication.likedBy = [];
    }
    
    const hasLiked = publication.likedBy.includes(req.user.id);
    
    if (hasLiked) {
      // Remover like
      publication.likedBy = publication.likedBy.filter(id => id !== req.user.id);
      publication.likes = Math.max(0, publication.likes - 1);
    } else {
      // Agregar like
      publication.likedBy.push(req.user.id);
      publication.likes += 1;
    }
    
    res.json({
      success: true,
      data: {
        likes: publication.likes,
        isLiked: !hasLiked
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al procesar el like'
    });
  }
});

// GET /api/publications/history/:userId - Obtener historial de publicaciones de un usuario
router.get('/history/:userId', auth, async (req, res) => {
  try {
    const userHistory = publicationHistory.filter(h => h.userId === req.params.userId);
    
    res.json({
      success: true,
      data: userHistory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener el historial'
    });
  }
});

// GET /api/notifications - Obtener notificaciones del usuario
router.get('/notifications', auth, async (req, res) => {
  try {
    let userNotifications = notifications.filter(n => 
      n.userId === req.user.id || n.userId === 'moderators'
    );
    
    // Ordenar por fecha más reciente
    userNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({
      success: true,
      data: userNotifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener las notificaciones'
    });
  }
});

// PUT /api/notifications/:id/read - Marcar notificación como leída
router.put('/notifications/:id/read', auth, async (req, res) => {
  try {
    const notification = notifications.find(n => n._id === req.params.id);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notificación no encontrada'
      });
    }
    
    notification.read = true;
    
    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al marcar la notificación'
    });
  }
});

// DELETE /api/publications/:id - Eliminar una publicación (solo autor o admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const publication = publications.find(pub => pub._id === req.params.id);
    
    if (!publication) {
      return res.status(404).json({
        success: false,
        error: 'Publicación no encontrada'
      });
    }
    
    // Solo el autor o un admin puede eliminar
    if (publication.author !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'No tienes permisos para eliminar esta publicación'
      });
    }
    
    publications = publications.filter(pub => pub._id !== req.params.id);
    
    res.json({
      success: true,
      message: 'Publicación eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la publicación'
    });
  }
});

module.exports = router; 