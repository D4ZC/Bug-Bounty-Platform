const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const logService = require('../services/logService');

// Middleware para verificar si es admin
const requireAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Se requieren permisos de administrador' 
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error de autorización' 
    });
  }
};

// Aplicar middleware de autenticación y admin a todas las rutas
// router.use(auth); // Eliminado para evitar crash
router.use(requireAdmin);

// Obtener estadísticas de logs
router.get('/stats', async (req, res) => {
  try {
    const { startDate, endDate, level, category, userId } = req.query;
    
    const filters = {};
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (level) filters.level = level;
    if (category) filters.category = category;
    if (userId) filters.userId = userId;

    const stats = await logService.getStats(filters);
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get log stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener estadísticas de logs' 
    });
  }
});

// Obtener logs con filtros y paginación
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      level,
      category,
      userId,
      action,
      startDate,
      endDate,
      sortBy = 'timestamp',
      sortOrder = 'desc'
    } = req.query;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      level,
      category,
      userId,
      action,
      startDate,
      endDate,
      sortBy,
      sortOrder
    };

    const result = await logService.getLogs(filters);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener logs' 
    });
  }
});

// Obtener logs de un usuario específico
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      page = 1,
      limit = 50,
      level,
      category,
      startDate,
      endDate
    } = req.query;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      level,
      category,
      startDate,
      endDate
    };

    const result = await logService.getUserLogs(userId, filters);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get user logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener logs del usuario' 
    });
  }
});

// Obtener logs de una categoría específica
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const {
      page = 1,
      limit = 50,
      level,
      userId,
      startDate,
      endDate
    } = req.query;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      level,
      userId,
      startDate,
      endDate
    };

    const result = await logService.getCategoryLogs(category, filters);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get category logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener logs de la categoría' 
    });
  }
});

// Obtener logs de errores
router.get('/errors', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      category,
      userId,
      startDate,
      endDate
    } = req.query;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      category,
      userId,
      startDate,
      endDate
    };

    const result = await logService.getErrorLogs(filters);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get error logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener logs de errores' 
    });
  }
});

// Obtener logs de seguridad
router.get('/security', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      userId,
      startDate,
      endDate
    } = req.query;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      userId,
      startDate,
      endDate
    };

    const result = await logService.getSecurityLogs(filters);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get security logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener logs de seguridad' 
    });
  }
});

// Obtener logs de administración
router.get('/admin', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      userId,
      startDate,
      endDate
    } = req.query;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      userId,
      startDate,
      endDate
    };

    const result = await logService.getAdminLogs(filters);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get admin logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener logs de administración' 
    });
  }
});

// Obtener logs de rendimiento
router.get('/performance', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      startDate,
      endDate
    } = req.query;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      startDate,
      endDate
    };

    const result = await logService.getPerformanceLogs(filters);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get performance logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener logs de rendimiento' 
    });
  }
});

// Exportar logs
router.get('/export', async (req, res) => {
  try {
    const {
      level,
      category,
      userId,
      action,
      startDate,
      endDate,
      format = 'json',
      limit = 10000
    } = req.query;

    const filters = {
      level,
      category,
      userId,
      action,
      startDate,
      endDate,
      limit: parseInt(limit)
    };

    const logs = await logService.exportLogs(filters, format);
    
    if (format === 'csv') {
      // Convertir a CSV
      const headers = Object.keys(logs[0] || {});
      const csv = [
        headers.join(','),
        ...logs.map(log => headers.map(header => `"${log[header]}"`).join(','))
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=logs-${new Date().toISOString().split('T')[0]}.csv`);
      res.send(csv);
    } else {
      res.json({
        success: true,
        logs,
        count: logs.length
      });
    }
  } catch (error) {
    console.error('Export logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al exportar logs' 
    });
  }
});

// Limpiar logs antiguos
router.delete('/cleanup', async (req, res) => {
  try {
    const { daysToKeep = 90 } = req.body;
    
    const result = await logService.cleanOldLogs(parseInt(daysToKeep));
    
    res.json({
      success: true,
      message: `${result.deletedCount} logs eliminados`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Cleanup logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al limpiar logs' 
    });
  }
});

// Obtener resumen de logs por nivel
router.get('/summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const filters = {};
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    const stats = await logService.getStats(filters);
    
    // Agrupar por nivel
    const summary = {
      total: 0,
      byLevel: {
        info: 0,
        warning: 0,
        error: 0,
        critical: 0,
        debug: 0
      },
      byCategory: {
        auth: 0,
        user: 0,
        team: 0,
        vulnerability: 0,
        challenge: 0,
        admin: 0,
        security: 0,
        system: 0,
        api: 0,
        performance: 0,
        notification: 0,
        shop: 0,
        gulag: 0,
        mvp: 0
      },
      recentActivity: []
    };

    stats.forEach(stat => {
      summary.total += stat.count;
      summary.byLevel[stat._id.level] += stat.count;
      summary.byCategory[stat._id.category] += stat.count;
    });

    // Obtener actividad reciente
    const recentLogs = await logService.getLogs({
      limit: 10,
      sortBy: 'timestamp',
      sortOrder: 'desc'
    });

    summary.recentActivity = recentLogs.logs.map(log => ({
      timestamp: log.timestamp,
      level: log.level,
      category: log.category,
      action: log.action,
      description: log.description,
      user: log.userId ? `${log.userId.firstName} ${log.userId.lastName}` : 'System'
    }));

    res.json({
      success: true,
      summary
    });
  } catch (error) {
    console.error('Get log summary error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener resumen de logs' 
    });
  }
});

// Obtener logs de un recurso específico
router.get('/resource/:resourceType/:resourceId', async (req, res) => {
  try {
    const { resourceType, resourceId } = req.params;
    const {
      page = 1,
      limit = 50,
      startDate,
      endDate
    } = req.query;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      startDate,
      endDate
    };

    // Buscar logs específicos del recurso
    const result = await logService.getLogs({
      ...filters,
      resourceType,
      resourceId
    });
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get resource logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener logs del recurso' 
    });
  }
});

// Obtener logs de una IP específica
router.get('/ip/:ip', async (req, res) => {
  try {
    const { ip } = req.params;
    const {
      page = 1,
      limit = 50,
      startDate,
      endDate
    } = req.query;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      startDate,
      endDate
    };

    // Buscar logs por IP
    const result = await logService.getLogs({
      ...filters,
      'requestInfo.ip': ip
    });
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get IP logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener logs de la IP' 
    });
  }
});

// Obtener logs de una acción específica
router.get('/action/:action', async (req, res) => {
  try {
    const { action } = req.params;
    const {
      page = 1,
      limit = 50,
      startDate,
      endDate
    } = req.query;

    const filters = {
      page: parseInt(page),
      limit: parseInt(limit),
      startDate,
      endDate
    };

    const result = await logService.getLogs({
      ...filters,
      action
    });
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get action logs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener logs de la acción' 
    });
  }
});

module.exports = router; 