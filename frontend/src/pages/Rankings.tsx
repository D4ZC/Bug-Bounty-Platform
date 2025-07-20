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
          ...team
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
          <p className="text-3xl font-bold text-blue-600">7{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('rankings total Teams')}</h3>
          <p className="text-3xl font-bold text-green-600">1{teams.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('rankings average Score')}</h3>
          <p className="text-3xl font-bold text-purple-600">8
            {users.length > 0 ? Math.round(users.reduce((sum, user) => sum + user.score, 0) / users.length) : 0}
          </p>
        </div>
      </div>

      {/* Paneles de resumen adicionales */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center min-h-[220px]">
          <span className="text-4xl mb-2">🏅</span>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Top 3 usuarios</h3>
          <ul className="w-full mt-4 space-y-2">
            {(
              users.length > 0
                ? users.slice(0, 3)
                : [
                    { _id: '1', nickname: 'Osaman', avatar: 'https://th.bing.com/th/id/R.e38a55ad885e82ae573d225d1870b38f?rik=tULgGNmjjOQEqQ&riu=http%3a%2f%2fi2.cdn.cnn.com%2fcnnnext%2fdam%2fassets%2f120523120531-osama-bin-laden-super-169.jpg&ehk=vDaH7yATrfWpYK218%2baYgGdAFWBfJ1%2bj9RlNqW7E5Pk%3d&risl=&pid=ImgRaw&r=0', score: 3200 },
                    { _id: '2', nickname: 'Cluass', avatar: 'https://cdn.britannica.com/81/248081-050-24CD5B24/Claudia-Sheinbaum-head-of-government-of-Mexico-City-2022-pardo.jpg', score: 2950 },
                    { _id: '3', nickname: 'Canaya', avatar: 'https://cdn.forbes.com.mx/2021/09/ricardo-anaya.jpg', score: 2700 },
                  ]
            ).map((u, i) => (
              <li key={u._id} className="flex items-center gap-2 justify-between bg-gray-50 rounded px-2 py-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{i + 1}.</span>
                  <img src={u.avatar || '/default-avatar.png'} alt={u.nickname} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium">{u.nickname}</span>
                </div>
                <span className="text-xs text-blue-700 font-semibold">{u.score} pts</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center min-h-[220px]">
          <span className="text-4xl mb-2">👥</span>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Top equipos</h3>
          <ul className="w-full mt-4 space-y-2">
            {(
              teams.length > 0
                ? teams.slice(0, 3)
                : [
                    { _id: '1', name: 'CTF Masters', logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', score: 9000 },
                    { _id: '2', name: 'Bug Busters', logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png', score: 8700 },
                    { _id: '3', name: 'Cyber Ninjas', logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png', score: 8500 },
                  ]
            ).map((t, i) => (
              <li key={t._id} className="flex items-center gap-2 justify-between bg-gray-50 rounded px-2 py-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{i + 1}.</span>
                  {t.logo && <img src={t.logo} alt={t.name} className="w-6 h-6 rounded-full" />}
                  <span className="text-sm font-medium">{t.name}</span>
                </div>
                <span className="text-xs text-green-700 font-semibold">{t.score} pts</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <span className="text-4xl mb-2">📈</span>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Progreso semanal</h3>
          <div className="w-full h-20 flex items-end gap-1 mt-2">
            {[40, 60, 80, 100, 70, 90, 50].map((v, i) => (
              <div key={i} className="flex-1 bg-blue-200 rounded-t" style={{ height: `${v}%` }}></div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2">Actividad de los últimos 7 días</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <span className="text-4xl mb-2">💡</span>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Sugerencias para mejorar</h3>
          <ul className="text-sm text-gray-700 list-disc ml-4">
            <li>Participa en más retos para subir tu ranking</li>
            <li>Colabora con tu equipo en vulnerabilidades críticas</li>
            <li>Completa logros para obtener bonificaciones</li>
            <li>Revisa el panel de actividad para ver tu progreso</li>
          </ul>
        </div>
      </div>

      {/* Gráfica de distribución de vulnerabilidades (mock) */}
      <div className="mt-10 bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de vulnerabilidades reportadas</h3>
        <div className="w-full flex justify-center">
          <svg width="220" height="120" viewBox="0 0 220 120">
            <rect x="10" y="40" width="30" height="60" fill="#f87171" />
            <rect x="50" y="60" width="30" height="40" fill="#fb923c" />
            <rect x="90" y="80" width="30" height="20" fill="#facc15" />
            <rect x="130" y="90" width="30" height="10" fill="#4ade80" />
          </svg>
        </div>
        <div className="flex gap-4 mt-4">
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded bg-red-400 inline-block"></span>Críticas</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded bg-orange-400 inline-block"></span>Altas</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded bg-yellow-300 inline-block"></span>Medias</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded bg-green-400 inline-block"></span>Bajas</span>
        </div>
      </div>

      {/* Gráfica de pastel de participación por equipos (mock) */}
      <div className="mt-10 bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Participación por equipos</h3>
        <svg width="160" height="160" viewBox="0 0 32 32">
          <circle r="16" cx="16" cy="16" fill="#e5e7eb" />
          <path d="M16 16 L16 0 A16 16 0 0 1 31.2 10.4 Z" fill="#60a5fa" />
          <path d="M16 16 L31.2 10.4 A16 16 0 0 1 25.6 28 Z" fill="#fbbf24" />
          <path d="M16 16 L25.6 28 A16 16 0 0 1 8 28 Z" fill="#34d399" />
          <path d="M16 16 L8 28 A16 16 0 0 1 0.8 10.4 Z" fill="#f87171" />
        </svg>
        <div className="flex gap-4 mt-4">
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded bg-blue-400 inline-block"></span>CTF Masters</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded bg-yellow-400 inline-block"></span>Bug Busters</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded bg-green-400 inline-block"></span>Red Team</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded bg-red-400 inline-block"></span>Cyber Ninjas</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded bg-gray-200 inline-block"></span>Otros</span>
        </div>
      </div>

      {/* Ranking por vulnerabilidades críticas */}
      <div className="mt-10 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking por vulnerabilidades críticas</h3>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">Usuario</th>
              <th className="py-2">Críticas</th>
              <th className="py-2">Altas</th>
              <th className="py-2">Medias</th>
              <th className="py-2">Bajas</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td className="py-2 flex items-center gap-2"><img src="https://tse1.mm.bing.net/th/id/OIP.oastz31foOmT1sVlQp35HQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-5 h-5 rounded-full" />Valerina Capuchina</td>
                <td className="py-2 text-red-600 font-bold">10</td>
                <td className="py-2 text-orange-600">15</td>
                <td className="py-2 text-yellow-600">19</td>
                <td className="py-2 text-green-600">25</td>
              </tr>
              <tr>
                <td className="py-2 flex items-center gap-2"><img src="https://i.pinimg.com/736x/9f/64/af/9f64afc11054194af5163b29a0ce92e2.jpg" className="w-5 h-5 rounded-full" />Xavier Hernandez</td>
                <td className="py-2 text-red-600 font-bold">8</td>
                <td className="py-2 text-orange-600">13</td>
                <td className="py-2 text-yellow-600">15</td>
                <td className="py-2 text-green-600">30</td>
              </tr>
              <tr>
                <td className="py-2 flex items-center gap-2"><img src="https://i.pinimg.com/736x/cc/f3/03/ccf303a37e2bd5f8b203ed84a4b1b1a1.jpg" className="w-5 h-5 rounded-full" />Andres Iniesta</td>
                <td className="py-2 text-red-600 font-bold">6</td>
                <td className="py-2 text-orange-600">10</td>
                <td className="py-2 text-yellow-600">10</td>
                <td className="py-2 text-green-600">35</td>
              </tr>
              <tr>
                <td className="py-2 flex items-center gap-2"><img src="https://i.pinimg.com/736x/7b/c8/41/7bc8419738c8fa8dd7506af770ff9692.jpg" className="w-5 h-5 rounded-full" />Gerrad Pique</td>
                <td className="py-2 text-red-600 font-bold">6</td>
                <td className="py-2 text-orange-600">8</td>
                <td className="py-2 text-yellow-600">6</td>
                <td className="py-2 text-green-600">40</td>
              </tr>
          </tbody>
        </table>
      </div>

      {/* Tabla de actividad mensual (mock) */}
      <div className="mt-10 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad mensual</h3>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">Usuario</th>
              <th className="py-2">Reportes</th>
              <th className="py-2">Retos completados</th>
              <th className="py-2">Puntos ganados</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 flex items-center gap-2"><img src="https://static.independent.co.uk/2023/05/20/09/caf56fe37d31207533c11ada99e7e7d7Y29udGVudHNlYXJjaGFwaSwxNjg0NjE5Mzkw-2.72214858.jpg" className="w-5 h-5 rounded-full" />Josep Guardiola</td>
              <td className="py-2">12</td>
              <td className="py-2">5</td>
              <td className="py-2">3200</td>
            </tr>
            <tr>
              <td className="py-2 flex items-center gap-2"><img src="https://d.ibtimes.co.uk/en/full/1564527/jurgen-klopp.jpg" className="w-5 h-5 rounded-full" />Jürgen Klopp</td>
              <td className="py-2">10</td>
              <td className="py-2">7</td>
              <td className="py-2">2950</td>
            </tr>
            <tr>
              <td className="py-2 flex items-center gap-2"><img src="https://tse1.mm.bing.net/th/id/OIP.Up-0tLptohPT15m9Lg8lhAHaE1?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-5 h-5 rounded-full" />José Mourinho</td>
              <td className="py-2">8</td>
              <td className="py-2">6</td>
              <td className="py-2">2700</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tabla de logros recientes */}
      <div className="mt-10 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Logros recientes</h3>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">Usuario</th>
              <th className="py-2">Logro</th>
              <th className="py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 flex items-center gap-2"><img src="https://www.spectator.co.uk/wp-content/uploads/2023/09/GettyImages-56034481.jpg?w=3000" className="w-5 h-5 rounded-full" />Ronaldo de Assis Moreira</td>
              <td className="py-2">Bug Hunter del Mes</td>
              <td className="py-2">2024-07-15</td>
            </tr>
            <tr>
              <td className="py-2 flex items-center gap-2"><img src="https://news.cgtn.com/news/2024-05-04/Marco-Reus-to-leave-Borussia-Dortmund-at-the-end-of-2023-24-season-1tkzeQ4RIly/img/c0f2271f683640fca9db228463cedaef/c0f2271f683640fca9db228463cedaef.jpeg" className="w-5 h-5 rounded-full" />Marco Reus</td>
              <td className="py-2">Top 1er lugar semanal</td>
              <td className="py-2">2024-07-13</td>
            </tr>
            <tr>
              <td className="py-2 flex items-center gap-2"><img src="https://i.pinimg.com/736x/a1/cf/ac/a1cfac269039394821bdb8b764e379b1.jpg" className="w-5 h-5 rounded-full" />Ronaldo Luís Nazário</td>
              <td className="py-2">Logro: 10 vulnerabilidades críticas</td>
              <td className="py-2">2024-07-10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rankings; 