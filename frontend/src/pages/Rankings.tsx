import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useSocket } from '@/contexts/SocketContext';
import api from '@/services/api';

interface RankingUser {
  _id: string;
  nickname: string;
  email: string;
  avatar?: string;
  rank: string;
  rankIcon: string;
  score: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  team?: {
    _id: string;
    name: string;
    logo?: string;
  };
  isCurrentUser?: boolean;
}

interface RankingTeam {
  _id: string;
  name: string;
  logo?: string;
  description?: string;
  leader: {
    _id: string;
    nickname: string;
    avatar?: string;
  };
  members: number;
  score: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  isCurrentUserTeam?: boolean;
}

const Rankings: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isConnected } = useSocket();
  
  const [activeTab, setActiveTab] = useState<'users' | 'teams'>('users');
  const [users, setUsers] = useState<RankingUser[]>([]);
  const [teams, setTeams] = useState<RankingTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRank, setFilterRank] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'vulnerabilities'>('score');

  useEffect(() => {
    fetchRankings();
  }, [activeTab, sortBy]);

  useEffect(() => {
    if (isConnected) {
      // Escuchar actualizaciones de rankings en tiempo real
      const handleRankingUpdate = () => {
        fetchRankings();
      };

      // Aquí se conectarían los eventos de socket para actualizaciones
      return () => {
        // Cleanup listeners
      };
    }
  }, [isConnected]);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      if (activeTab === 'users') {
        const response = await api.get('/rankings/users', {
          params: { sortBy }
        });
        const usersData = response.data.map((user: RankingUser) => ({
          ...user,
          isCurrentUser: user._id === user?._id
        }));
        setUsers(usersData);
      } else {
        const response = await api.get('/rankings/teams', {
          params: { sortBy }
        });
        const teamsData = response.data.map((team: RankingTeam) => ({
          ...team,
          isCurrentUserTeam: team._id === user?.team?._id
        }));
        setTeams(teamsData);
      }
    } catch (error) {
      console.error('Error fetching rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (position: number) => {
    if (position === 1) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    if (position === 2) return 'bg-gray-100 border-gray-300 text-gray-800';
    if (position === 3) return 'bg-orange-100 border-orange-300 text-orange-800';
    return 'bg-white border-gray-200';
  };

  const getRankIcon = (position: number) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return `#${position}`;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRank = filterRank === 'all' || user.rank === filterRank;
    return matchesSearch && matchesRank;
  });

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.leader.nickname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRank = filterRank === 'all';
    return matchesSearch && matchesRank;
  });

  const getVulnerabilityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('rankings.title')}
        </h1>
        <p className="text-gray-600">
          {t('Rankings description')}
        </p>
      </div>

      {/* Destacados y sugerencias */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Destacados y sugerencias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <span className="text-2xl">🥇</span>
            <div>
              <div className="font-semibold text-gray-900">Usuario top: Ana Torres</div>
              <div className="text-xs text-gray-500">1er lugar en el ranking semanal</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <div className="font-semibold text-gray-900">Equipo en ascenso: CTF Masters</div>
              <div className="text-xs text-gray-500">Subió 3 posiciones esta semana</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="font-semibold text-gray-900">Logro reciente: "Bug Hunter del Mes"</div>
              <div className="text-xs text-gray-500">Otorgado a Carlos Pérez</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
            <span className="text-2xl">📰</span>
            <div>
              <div className="font-semibold text-gray-900">Noticia: Nueva competencia</div>
              <div className="text-xs text-gray-500">Inscríbete al CTF de verano</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('Rankings users')} ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'teams'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('Rankings teams')} ({teams.length})
          </button>
        </nav>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t('rankings search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterRank}
            onChange={(e) => setFilterRank(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{t('rankings all Ranks')}</option>
            <option value="bronze">{t('rankings bronze')}</option>
            <option value="silver">{t('rankings silver')}</option>
            <option value="gold">{t('rankings gold')}</option>
            <option value="platinum">{t('rankings platinum')}</option>
            <option value="diamond">{t('rankings diamond')}</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'score' | 'vulnerabilities')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="score">{t('rankings sort By Score')}</option>
            <option value="vulnerabilities">{t('rankings sort By Vulnerabilities')}</option>
          </select>
        </div>
      </div>

      {/* Estado de conexión */}
      <div className="mb-4 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600">
          {isConnected ? t('rankings live Updates') : t('rankings offline')}
        </span>
      </div>

      {/* Lista de rankings */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {activeTab === 'users' ? (
          <div className="divide-y divide-gray-200">
            {filteredUsers.map((user, index) => (
              <div
                key={user._id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  user.isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getRankColor(index + 1)}`}>
                      {getRankIcon(index + 1)}
                    </div>
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar || '/default-avatar.png'}
                        alt={user.nickname}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user.nickname}
                          {user.isCurrentUser && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {t('rankings you')}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm font-medium text-gray-700">{user.rank}</span>
                          <span className="text-lg">{user.rankIcon}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{user.score}</div>
                    <div className="text-sm text-gray-500">{t('rankings points')}</div>
                    <div className="flex space-x-2 mt-2">
                      <span className={`text-xs ${getVulnerabilityColor('critical')}`}>
                        {user.vulnerabilities.critical} {t('rankings critical')}
                      </span>
                      <span className={`text-xs ${getVulnerabilityColor('high')}`}>
                        {user.vulnerabilities.high} {t('rankings high')}
                      </span>
                      <span className={`text-xs ${getVulnerabilityColor('medium')}`}>
                        {user.vulnerabilities.medium} {t('rankings medium')}
                      </span>
                      <span className={`text-xs ${getVulnerabilityColor('low')}`}>
                        {user.vulnerabilities.low} {t('rankings low')}
                      </span>
                    </div>
                  </div>
                </div>
                
                {user.team && (
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{t('rankings team')}:</span>
                    <div className="flex items-center space-x-2">
                      {user.team.logo && (
                        <img src={user.team.logo} alt={user.team.name} className="w-5 h-5 rounded" />
                      )}
                      <span className="text-sm font-medium text-gray-700">{user.team.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTeams.map((team, index) => (
              <div
                key={team._id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  team.isCurrentUserTeam ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getRankColor(index + 1)}`}>
                      {getRankIcon(index + 1)}
                    </div>
                    <div className="flex items-center space-x-3">
                      {team.logo && (
                        <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-full" />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {team.name}
                          {team.isCurrentUserTeam && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {t('rankings your Team')}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">{team.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">{t('rankings leader')}:</span>
                          <div className="flex items-center space-x-1">
                            <img
                              src={team.leader.avatar || '/default-avatar.png'}
                              alt={team.leader.nickname}
                              className="w-5 h-5 rounded-full"
                            />
                            <span className="text-sm font-medium text-gray-700">{team.leader.nickname}</span>
                          </div>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{team.members} {t('rankings members')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{team.score}</div>
                    <div className="text-sm text-gray-500">{t('rankings points')}</div>
                    <div className="flex space-x-2 mt-2">
                      <span className={`text-xs ${getVulnerabilityColor('critical')}`}>
                        {team.vulnerabilities.critical} {t('rankings critical')}
                      </span>
                      <span className={`text-xs ${getVulnerabilityColor('high')}`}>
                        {team.vulnerabilities.high} {t('rankings high')}
                      </span>
                      <span className={`text-xs ${getVulnerabilityColor('medium')}`}>
                        {team.vulnerabilities.medium} {t('rankings medium')}
                      </span>
                      <span className={`text-xs ${getVulnerabilityColor('low')}`}>
                        {team.vulnerabilities.low} {t('rankings low')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Estadísticas adicionales */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('rankings total Participants')}</h3>
          <p className="text-3xl font-bold text-blue-600">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('rankings total Teams')}</h3>
          <p className="text-3xl font-bold text-green-600">{teams.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('rankings average Score')}</h3>
          <p className="text-3xl font-bold text-purple-600">
            {users.length > 0 ? Math.round(users.reduce((sum, user) => sum + user.score, 0) / users.length) : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rankings; 