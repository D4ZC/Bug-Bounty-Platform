import React from 'react';
import { FaTimes, FaTrophy, FaCoins, FaUser, FaUsers, FaCalendar, FaStar, FaMedal, FaChartLine } from 'react-icons/fa';

interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  team?: string;
  position: number;
  points: number;
  bluePoints: number;
  resolved: number;
  effectiveness: number;
  level: number;
  experience: number;
  joinDate: string;
  achievements: string[];
  recentActivity: {
    date: string;
    action: string;
    points: number;
  }[];
  stats: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    total: number;
  };
  // Información adicional para equipos
  members?: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    points: number;
    resolved: number;
    joinDate: string;
  }[];
  leader?: {
    name: string;
    avatar: string;
  };
  totalMembers?: number;
  teamDescription?: string;
}

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: UserInfo | null;
  type: 'user' | 'team';
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, onClose, userInfo, type }) => {
  if (!isOpen || !userInfo) return null;

  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-400';
    if (position === 2) return 'text-gray-300';
    if (position === 3) return 'text-orange-500';
    return 'text-gray-400';
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return `#${position}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaUser className="text-purple-400" />
            Información de {type === 'user' ? 'Usuario' : 'Equipo'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User/Team Header */}
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <img
                src={userInfo.avatar}
                alt={userInfo.name}
                className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-purple-600 rounded-full p-2">
                <span className="text-2xl">{getPositionIcon(userInfo.position)}</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-2">{userInfo.name}</h3>
              <div className="flex items-center gap-4 text-gray-300">
                <span className={`text-lg font-semibold ${getPositionColor(userInfo.position)}`}>
                  Posición #{userInfo.position}
                </span>
                {userInfo.team && (
                  <span className="flex items-center gap-2">
                    <FaUsers className="text-blue-400" />
                    {userInfo.team}
                  </span>
                )}
              </div>
              {type === 'team' && userInfo.teamDescription && (
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                  {userInfo.teamDescription}
                </p>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{userInfo.points}</div>
              <div className="text-sm text-gray-400">Puntos</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{userInfo.bluePoints}</div>
              <div className="text-sm text-gray-400">Blue Points</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{userInfo.resolved}</div>
              <div className="text-sm text-gray-400">Resueltas</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{userInfo.effectiveness}%</div>
              <div className="text-sm text-gray-400">Efectividad</div>
            </div>
          </div>

          {/* Level and Experience */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Nivel {userInfo.level}</span>
              <span className="text-gray-400 text-sm">{userInfo.experience} XP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(userInfo.experience % 1000) / 10}%` }}
              />
            </div>
          </div>

          {/* Vulnerability Stats */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <FaChartLine className="text-green-400" />
              Estadísticas de Vulnerabilidades
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-xl font-bold text-red-400">{userInfo.stats.critical}</div>
                <div className="text-xs text-gray-400">Críticas</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-400">{userInfo.stats.high}</div>
                <div className="text-xs text-gray-400">Altas</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-400">{userInfo.stats.medium}</div>
                <div className="text-xs text-gray-400">Medias</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{userInfo.stats.low}</div>
                <div className="text-xs text-gray-400">Bajas</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700 text-center">
              <div className="text-2xl font-bold text-purple-400">{userInfo.stats.total}</div>
              <div className="text-sm text-gray-400">Total Resueltas</div>
            </div>
          </div>

          {/* Achievements */}
          {userInfo.achievements.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaMedal className="text-yellow-400" />
                Logros
              </h4>
              <div className="flex flex-wrap gap-2">
                {userInfo.achievements.map((achievement, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Team Members - Solo para equipos */}
          {type === 'team' && userInfo.members && (
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaUsers className="text-green-400" />
                Miembros del Equipo ({userInfo.totalMembers || userInfo.members.length})
              </h4>
              
              {/* Líder del equipo */}
              {userInfo.leader && (
                <div className="mb-4 p-3 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-3">
                    <img
                      src={userInfo.leader.avatar}
                      alt={userInfo.leader.name}
                      className="w-12 h-12 rounded-full border-2 border-yellow-400"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{userInfo.leader.name}</span>
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          LÍDER
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">Líder del equipo</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Lista de miembros */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {userInfo.members.map((member, index) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full border-2 border-blue-400"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{member.name}</span>
                        <span className="text-blue-400 font-bold">{member.points}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{member.role}</span>
                        <span className="text-green-400">{member.resolved} resueltas</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Miembro desde {member.joinDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <FaCalendar className="text-blue-400" />
              Actividad Reciente
            </h4>
            <div className="space-y-2">
              {userInfo.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400" />
                    <span className="text-gray-300">{activity.action}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 font-semibold">+{activity.points}</span>
                    <span className="text-gray-400 text-sm">{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join Date */}
          <div className="text-center text-gray-400 text-sm">
            Miembro desde {userInfo.joinDate}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal; 