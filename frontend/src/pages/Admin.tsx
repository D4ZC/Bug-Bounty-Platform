import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/hooks/useNotification';
import { 
  Users, 
  Shield, 
  Target, 
  Trophy, 
  BarChart3, 
  Settings,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  Activity
} from 'lucide-react';
import api from '@/services/api';

interface AdminTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  nickname: string;
  role: string;
  isActive: boolean;
  points: number;
  teamId?: string;
  lastLogin?: string;
  createdAt: string;
}

interface Team {
  _id: string;
  name: string;
  description: string;
  leader: {
    _id: string;
    nickname: string;
  };
  members: number;
  points: number;
  isActive: boolean;
  createdAt: string;
}

interface Vulnerability {
  _id: string;
  title: string;
  severity: string;
  status: string;
  assignedTo?: string;
  points: number;
  createdAt: string;
  resolvedAt?: string;
}

interface Challenge {
  _id: string;
  title: string;
  category: string;
  status: string;
  participants: number;
  entryCost: number;
  prize: number;
  createdAt: string;
  endsAt: string;
}

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    role: 'all',
    severity: 'all',
    category: 'all'
  });

  // Data states
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // Check if user is admin
  useEffect(() => {
    if (user?.role !== 'admin') {
      addNotification('error', 'Acceso denegado. Se requieren permisos de administrador.');
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  }, [user, addNotification]);

  const tabs: AdminTab[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Vista general del sistema'
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: <Users className="w-5 h-5" />,
      description: 'Gestionar usuarios y permisos'
    },
    {
      id: 'teams',
      label: 'Equipos',
      icon: <Shield className="w-5 h-5" />,
      description: 'Administrar equipos y líderes'
    },
    {
      id: 'vulnerabilities',
      label: 'Vulnerabilidades',
      icon: <Target className="w-5 h-5" />,
      description: 'Supervisar vulnerabilidades'
    },
    {
      id: 'challenges',
      label: 'Retos',
      icon: <Trophy className="w-5 h-5" />,
      description: 'Gestionar retos y competencias'
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: <Settings className="w-5 h-5" />,
      description: 'Configuración del sistema'
    }
  ];

  useEffect(() => {
    if (user?.role === 'admin') {
      loadData();
    }
  }, [activeTab, user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      switch (activeTab) {
        case 'users':
          const usersResponse = await api.get('/admin/users');
          setUsers(usersResponse.data.users);
          break;
        case 'teams':
          const teamsResponse = await api.get('/admin/teams');
          setTeams(teamsResponse.data.teams);
          break;
        case 'vulnerabilities':
          const vulnsResponse = await api.get('/admin/vulnerabilities');
          setVulnerabilities(vulnsResponse.data.vulnerabilities);
          break;
        case 'challenges':
          const challengesResponse = await api.get('/admin/challenges');
          setChallenges(challengesResponse.data.challenges);
          break;
      }
    } catch (error) {
      addNotification('error', 'Error al cargar datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedItems.length === 0) {
      addNotification('warning', 'Selecciona al menos un elemento');
      return;
    }

    try {
      await api.post(`/admin/${activeTab}/bulk-action`, {
        action,
        items: selectedItems
      });
      
      addNotification('success', `Acción ${action} completada`);
      setSelectedItems([]);
      loadData();
    } catch (error) {
      addNotification('error', 'Error al ejecutar acción masiva');
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get(`/admin/${activeTab}/export`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${activeTab}-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      addNotification('success', 'Exportación completada');
    } catch (error) {
      addNotification('error', 'Error al exportar datos');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Equipos</p>
              <p className="text-2xl font-bold text-gray-900">{teams.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Target className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Vulnerabilidades Activas</p>
              <p className="text-2xl font-bold text-gray-900">
                {vulnerabilities.filter(v => v.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Retos Activos</p>
              <p className="text-2xl font-bold text-gray-900">
                {challenges.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Actividad Reciente</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Nuevo usuario registrado: John Doe</p>
              <span className="text-xs text-gray-400">Hace 2 horas</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Vulnerabilidad resuelta: SQL Injection</p>
              <span className="text-xs text-gray-400">Hace 4 horas</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Nuevo reto creado: Web Security Challenge</p>
              <span className="text-xs text-gray-400">Hace 6 horas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filters.role}
              onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los roles</option>
              <option value="member">Miembro</option>
              <option value="team_leader">Líder</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedItems.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                >
                  Activar ({selectedItems.length})
                </button>
                <button
                  onClick={() => handleBulkAction('deactivate')}
                  className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                >
                  Desactivar ({selectedItems.length})
                </button>
              </div>
            )}
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(users.map(u => u._id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Puntos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Último Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(user._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(prev => [...prev, user._id]);
                      } else {
                        setSelectedItems(prev => prev.filter(id => id !== user._id));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.firstName[0]}{user.lastName[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'team_leader' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Nunca'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeams = () => (
    <div className="space-y-6">
      {/* Similar structure to users but for teams */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Gestionar Equipos</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Crear Equipo</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">{team.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                team.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {team.isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{team.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Líder:</span>
                <span className="font-medium">{team.leader.nickname}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Miembros:</span>
                <span className="font-medium">{team.members}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Puntos:</span>
                <span className="font-medium">{team.points}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                <Eye className="w-4 h-4 inline mr-1" />
                Ver
              </button>
              <button className="text-green-600 hover:text-green-900 text-sm">
                <Edit className="w-4 h-4 inline mr-1" />
                Editar
              </button>
              <button className="text-red-600 hover:text-red-900 text-sm">
                <Trash2 className="w-4 h-4 inline mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVulnerabilities = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Supervisar Vulnerabilidades</h3>
          <div className="flex items-center space-x-2">
            <select
              value={filters.severity}
              onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">Todas las severidades</option>
              <option value="critical">Crítica</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Exportar
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Puntos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asignado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vulnerabilities.map((vuln) => (
              <tr key={vuln._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {vuln.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(vuln.severity)}`}>
                    {vuln.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vuln.status)}`}>
                    {vuln.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vuln.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vuln.assignedTo || 'Sin asignar'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Gestionar Retos</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Crear Reto</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">{challenge.title}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(challenge.status)}`}>
                {challenge.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Categoría:</span>
                <span className="font-medium">{challenge.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Participantes:</span>
                <span className="font-medium">{challenge.participants}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Costo entrada:</span>
                <span className="font-medium">{challenge.entryCost} pts</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Premio:</span>
                <span className="font-medium">{challenge.prize} pts</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                <Eye className="w-4 h-4 inline mr-1" />
                Ver
              </button>
              <button className="text-green-600 hover:text-green-900 text-sm">
                <Edit className="w-4 h-4 inline mr-1" />
                Editar
              </button>
              <button className="text-red-600 hover:text-red-900 text-sm">
                <Trash2 className="w-4 h-4 inline mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración del Sistema</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Puntos por vulnerabilidad crítica</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Puntos por vulnerabilidad alta</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={75}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duración del evento Gulag (horas)</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={24}
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUsers();
      case 'teams':
        return renderTeams();
      case 'vulnerabilities':
        return renderVulnerabilities();
      case 'challenges':
        return renderChallenges();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

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
          Panel de Administración
        </h1>
        <p className="text-gray-600">
          Gestiona usuarios, equipos, vulnerabilidades y configuración del sistema.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
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

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        renderTabContent()
      )}
    </div>
  );
};

export default Admin; 