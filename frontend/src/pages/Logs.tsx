import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/hooks/useNotification';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Activity,
  BarChart3,
  Trash2,
  Eye,
  Clock,
  Globe,
  Shield,
  Settings,
  Database
} from 'lucide-react';
import api from '@/services/api';

interface Log {
  _id: string;
  level: 'info' | 'warning' | 'error' | 'critical' | 'debug';
  category: string;
  action: string;
  description: string;
  userId?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    nickname: string;
  };
  userEmail?: string;
  userRole?: string;
  requestInfo?: {
    method: string;
    url: string;
    ip: string;
    userAgent: string;
  };
  metadata?: any;
  timestamp: string;
  performance?: {
    duration: number;
    memoryUsage: number;
  };
  error?: {
    message: string;
    stack: string;
    code: string;
  };
}

interface LogStats {
  total: number;
  byLevel: {
    info: number;
    warning: number;
    error: number;
    critical: number;
    debug: number;
  };
  byCategory: {
    auth: number;
    user: number;
    team: number;
    vulnerability: number;
    challenge: number;
    admin: number;
    security: number;
    system: number;
    api: number;
    performance: number;
    notification: number;
    shop: number;
    gulag: number;
    mvp: number;
  };
  recentActivity: Array<{
    timestamp: string;
    level: string;
    category: string;
    action: string;
    description: string;
    user: string;
  }>;
}

const Logs: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  
  const [logs, setLogs] = useState<Log[]>([]);
  const [stats, setStats] = useState<LogStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: 'all',
    category: 'all',
    userId: '',
    action: '',
    startDate: '',
    endDate: ''
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 0,
    total: 0,
    limit: 50
  });
  const [activeTab, setActiveTab] = useState('all');

  // Check if user is admin
  useEffect(() => {
    if (user?.role !== 'admin') {
      addNotification('error', 'Acceso denegado. Se requieren permisos de administrador.');
      window.location.href = '/dashboard';
    }
  }, [user, addNotification]);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadData();
      loadStats();
    }
  }, [user, activeTab, filters, pagination.current]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.current.toString(),
        limit: pagination.limit.toString(),
        ...filters
      });

      let endpoint = '/api/logs';
      if (activeTab === 'errors') endpoint = '/api/logs/errors';
      else if (activeTab === 'security') endpoint = '/api/logs/security';
      else if (activeTab === 'admin') endpoint = '/api/logs/admin';
      else if (activeTab === 'performance') endpoint = '/api/logs/performance';

      const response = await api.get(`${endpoint}?${params}`);
      
      if (response.data.success) {
        setLogs(response.data.logs);
        setPagination(prev => ({
          ...prev,
          pages: response.data.pagination.pages,
          total: response.data.pagination.total
        }));
      }
    } catch (error) {
      addNotification('error', 'Error al cargar logs');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await api.get('/api/logs/summary');
      if (response.data.success) {
        setStats(response.data.summary);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([loadData(), loadStats()]);
    setIsRefreshing(false);
    addNotification('success', 'Logs actualizados');
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams({
        format: 'csv',
        ...filters
      });

      const response = await api.get(`/api/logs/export?${params}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `logs-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      addNotification('success', 'Logs exportados correctamente');
    } catch (error) {
      addNotification('error', 'Error al exportar logs');
    }
  };

  const handleCleanup = async () => {
    if (!confirm('¿Estás seguro de que quieres limpiar logs antiguos? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const response = await api.delete('/api/logs/cleanup', {
        data: { daysToKeep: 90 }
      });
      
      if (response.data.success) {
        addNotification('success', `${response.data.deletedCount} logs eliminados`);
        loadData();
        loadStats();
      }
    } catch (error) {
      addNotification('error', 'Error al limpiar logs');
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'debug': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
      case 'debug': return <Settings className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'auth': return <Shield className="w-4 h-4" />;
      case 'user': return <User className="w-4 h-4" />;
      case 'team': return <User className="w-4 h-4" />;
      case 'vulnerability': return <AlertTriangle className="w-4 h-4" />;
      case 'challenge': return <Activity className="w-4 h-4" />;
      case 'admin': return <Settings className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'system': return <Database className="w-4 h-4" />;
      case 'api': return <Globe className="w-4 h-4" />;
      case 'performance': return <BarChart3 className="w-4 h-4" />;
      case 'notification': return <Info className="w-4 h-4" />;
      case 'shop': return <Activity className="w-4 h-4" />;
      case 'gulag': return <Activity className="w-4 h-4" />;
      case 'mvp': return <Activity className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatMemory = (mb: number) => {
    if (mb < 1) return `${(mb * 1024).toFixed(2)}KB`;
    return `${mb.toFixed(2)}MB`;
  };

  const tabs = [
    { id: 'all', label: 'Todos', icon: <FileText className="w-4 h-4" /> },
    { id: 'errors', label: 'Errores', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'security', label: 'Seguridad', icon: <Shield className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin', icon: <Settings className="w-4 h-4" /> },
    { id: 'performance', label: 'Rendimiento', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h2>
          <p className="text-gray-600">Se requieren permisos de administrador para acceder a esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sistema de Logs
        </h1>
        <p className="text-gray-600">
          Monitorea y gestiona todos los logs del sistema para auditoría y debugging.
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Errores</p>
                <p className="text-2xl font-bold text-gray-900">{stats.byLevel.error + stats.byLevel.critical}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Advertencias</p>
                <p className="text-2xl font-bold text-gray-900">{stats.byLevel.warning}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Info</p>
                <p className="text-2xl font-bold text-gray-900">{stats.byLevel.info}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar en logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filters.level}
              onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los niveles</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="critical">Critical</option>
              <option value="debug">Debug</option>
            </select>
            
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              <option value="auth">Autenticación</option>
              <option value="user">Usuario</option>
              <option value="team">Equipo</option>
              <option value="vulnerability">Vulnerabilidad</option>
              <option value="challenge">Reto</option>
              <option value="admin">Admin</option>
              <option value="security">Seguridad</option>
              <option value="system">Sistema</option>
              <option value="api">API</option>
              <option value="performance">Rendimiento</option>
              <option value="notification">Notificación</option>
              <option value="shop">Tienda</option>
              <option value="gulag">Gulag</option>
              <option value="mvp">MVP</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            <button
              onClick={handleCleanup}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>
        
        {/* Date Filters */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-500">a</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nivel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                          {getLevelIcon(log.level)}
                          <span className="ml-1">{log.level}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getCategoryIcon(log.category)}
                          <span className="ml-2 text-sm text-gray-900">{log.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{log.action}</div>
                        <div className="text-sm text-gray-500">{log.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.userId ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {log.userId.firstName} {log.userId.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{log.userId.email}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Sistema</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.requestInfo?.ip || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
                    disabled={pagination.current === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
                    disabled={pagination.current === pagination.pages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{((pagination.current - 1) * pagination.limit) + 1}</span> a{' '}
                      <span className="font-medium">
                        {Math.min(pagination.current * pagination.limit, pagination.total)}
                      </span>{' '}
                      de <span className="font-medium">{pagination.total}</span> resultados
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setPagination(prev => ({ ...prev, current: page }))}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === pagination.current
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Logs; 