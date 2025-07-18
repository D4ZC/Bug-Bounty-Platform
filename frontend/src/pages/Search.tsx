import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { 
  Search as SearchIcon, 
  Filter, 
  User, 
  UserMultiple, 
  Warning, 
  Trophy,
  Star,
  Calendar
} from '@carbon/icons-react';
import api from '@/services/api';

interface SearchResult {
  _id: string;
  type: 'user' | 'team' | 'vulnerability' | 'challenge';
  title: string;
  description?: string;
  avatar?: string;
  score?: number;
  rank?: string;
  rankIcon?: string;
  members?: number;
  severity?: string;
  status?: string;
  createdAt?: string;
  tags?: string[];
}

const Search: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState<'all' | 'users' | 'teams' | 'vulnerabilities' | 'challenges'>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    rank: 'all',
    severity: 'all',
    status: 'all',
    dateRange: 'all',
    sortBy: 'relevance'
  });

  useEffect(() => {
    if (query.trim()) {
      performSearch();
    }
  }, [query, activeTab, filters]);

  const performSearch = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        q: query,
        type: activeTab,
        ...filters
      });

      const response = await api.get(`/search?${params}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error performing search:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      performSearch();
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User size={20} className="text-blue-500" />;
      case 'team':
        return <UserMultiple size={20} className="text-green-500" />;
      case 'vulnerability':
        return <Warning size={20} className="text-red-500" />;
      case 'challenge':
        return <Trophy size={20} className="text-yellow-500" />;
      default:
        return <SearchIcon size={20} className="text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'resolved':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'closed':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('search.title', 'Búsqueda Avanzada')}
        </h1>
        <p className="text-gray-600">
          {t('search.description', 'Encuentra usuarios, equipos, vulnerabilidades y retos en la plataforma.')}
        </p>
      </div>

      {/* Sugerencias para ti */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Sugerencias para ti</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <Star size={28} className="text-yellow-500" />
            <div>
              <div className="font-semibold text-gray-900">Usuario destacado: Ana Torres</div>
              <div className="text-xs text-gray-500">Top Hunter de la semana</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <Warning size={28} className="text-red-500" />
            <div>
              <div className="font-semibold text-gray-900">Reporte reciente: SQL Injection</div>
              <div className="text-xs text-gray-500">Nuevo reporte crítico en login</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <Calendar size={28} className="text-blue-500" />
            <div>
              <div className="font-semibold text-gray-900">Noticia: Mantenimiento programado</div>
              <div className="text-xs text-gray-500">10/06 de 2:00 a 4:00 AM</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <Trophy size={28} className="text-green-500" />
            <div>
              <div className="font-semibold text-gray-900">Reto recomendado: Bug Hunter del Mes</div>
              <div className="text-xs text-gray-500">Participa y gana recompensas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder', 'Buscar usuarios, equipos, vulnerabilidades...')}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 flex items-center bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-200"
          >
            {t('search.search', 'Buscar')}
          </button>
        </div>
      </form>

      {/* Filtros */}
      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t('search.filters', 'Filtros')}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Tipo de búsqueda */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.type', 'Tipo')}
            </label>
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('search.allTypes', 'Todos')}</option>
              <option value="users">{t('search.users', 'Usuarios')}</option>
              <option value="teams">{t('search.teams', 'Equipos')}</option>
              <option value="vulnerabilities">{t('search.vulnerabilities', 'Vulnerabilidades')}</option>
              <option value="challenges">{t('search.challenges', 'Retos')}</option>
            </select>
          </div>

          {/* Rango */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.rank', 'Rango')}
            </label>
            <select
              value={filters.rank}
              onChange={(e) => handleFilterChange('rank', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('search.allRanks', 'Todos')}</option>
              <option value="bronze">Bronce</option>
              <option value="silver">Plata</option>
              <option value="gold">Oro</option>
              <option value="platinum">Platino</option>
              <option value="diamond">Diamante</option>
            </select>
          </div>

          {/* Severidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.severity', 'Severidad')}
            </label>
            <select
              value={filters.severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('search.allSeverities', 'Todas')}</option>
              <option value="critical">Crítica</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.status', 'Estado')}
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('search.allStatuses', 'Todos')}</option>
              <option value="active">Activo</option>
              <option value="resolved">Resuelto</option>
              <option value="pending">Pendiente</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>

          {/* Ordenar por */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.sortBy', 'Ordenar por')}
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="relevance">{t('search.relevance', 'Relevancia')}</option>
              <option value="date">{t('search.date', 'Fecha')}</option>
              <option value="score">{t('search.score', 'Puntuación')}</option>
              <option value="name">{t('search.name', 'Nombre')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('search.loading', 'Buscando...')}</p>
          </div>
        ) : results.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {results.map((result) => (
              <div key={result._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {result.avatar ? (
                      <img
                        src={result.avatar}
                        alt={result.title}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        {getResultIcon(result.type)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      {getResultIcon(result.type)}
                      <h3 className="text-lg font-semibold text-gray-900">
                        {result.title}
                      </h3>
                      {result.score && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Star size={12} className="mr-1" />
                          {result.score} pts
                        </span>
                      )}
                    </div>
                    
                    {result.description && (
                      <p className="text-gray-600 mb-3">{result.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {result.rank && (
                        <span className="flex items-center">
                          <span className="mr-1">{result.rankIcon}</span>
                          {result.rank}
                        </span>
                      )}
                      
                      {result.members && (
                        <span className="flex items-center">
                          <UserMultiple size={14} className="mr-1" />
                          {result.members} {t('search.members', 'miembros')}
                        </span>
                      )}
                      
                      {result.severity && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(result.severity)}`}>
                          {result.severity}
                        </span>
                      )}
                      
                      {result.status && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                          {result.status}
                        </span>
                      )}
                      
                      {result.createdAt && (
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(result.createdAt)}
                        </span>
                      )}
                    </div>
                    
                    {result.tags && result.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {result.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="p-8 text-center">
            <SearchIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('search.noResults', 'No se encontraron resultados')}
            </h3>
            <p className="text-gray-600">
              {t('search.noResultsDescription', 'Intenta con otros términos de búsqueda o ajusta los filtros.')}
            </p>
          </div>
        ) : (
          <div className="p-8 text-center">
            <SearchIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('search.startSearching', 'Comienza a buscar')}
            </h3>
            <p className="text-gray-600">
              {t('search.startSearchingDescription', 'Ingresa un término de búsqueda para encontrar usuarios, equipos, vulnerabilidades y retos.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 