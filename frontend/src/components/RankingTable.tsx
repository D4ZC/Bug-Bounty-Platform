import React, { useState } from 'react';
import UserInfoModal from './UserInfoModal';

// Tipos de datos para la tabla
export type RankingRow = {
  position: number;
  name: string;
  icon?: string; // emoji o url
  resolved: number;
  resolvedGoal?: number; // para barra de progreso
  points: number;
  weeklyChange: number; // positivo, negativo o cero
  effectiveness: number; // porcentaje
  effectivenessIcon?: string; // emoji
  remaining: number;
  remainingGoal?: number; // para barra de progreso
  lastUpdate: string; // texto amigable
};

interface RankingTableProps {
  title: string;
  data: RankingRow[];
  type: 'team' | 'user';
}

const medalIcons = ['🥇', '🥈', '🥉'];

const RankingTable: React.FC<RankingTableProps> = ({ title, data, type }) => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserClick = (user: any) => {
    // Crear datos mock para la modal basados en los datos de la tabla
    const userInfo = {
      id: user.name.toLowerCase().replace(/\s+/g, '-'),
      name: user.name,
      avatar: `https://via.placeholder.com/150x150/6366f1/ffffff?text=${user.name.charAt(0)}`,
      team: type === 'user' ? 'CyberDragons' : undefined,
      position: user.position,
      points: user.points,
      bluePoints: Math.floor(user.points * 0.1),
      resolved: user.resolved,
      effectiveness: user.effectiveness,
      level: Math.floor(user.points / 100) + 1,
      experience: user.points % 1000,
      joinDate: 'Enero 2024',
      achievements: [
        'MVP Mensual',
        'Cazador de Bugs',
        'Resolvedor Crítico',
        'Efectividad 90%+'
      ],
      recentActivity: [
        { date: 'Hace 2 horas', action: 'Resolvió vulnerabilidad crítica', points: 100 },
        { date: 'Hace 1 día', action: 'Ganó duelo vs DragonGirl', points: 50 },
        { date: 'Hace 3 días', action: 'Completó documentación', points: 25 },
        { date: 'Hace 1 semana', action: 'Subió al top 10', points: 0 }
      ],
      stats: {
        critical: Math.floor(user.resolved * 0.3),
        high: Math.floor(user.resolved * 0.4),
        medium: Math.floor(user.resolved * 0.2),
        low: Math.floor(user.resolved * 0.1),
        total: user.resolved
      }
    };

    // Si es un equipo, agregar información de miembros
    if (type === 'team') {
      const teamMembers = [
        {
          id: '1',
          name: 'NinjaSec',
          avatar: 'https://via.placeholder.com/100x100/8B5CF6/ffffff?text=N',
          role: 'Líder',
          points: Math.floor(user.points * 0.4),
          resolved: Math.floor(user.resolved * 0.4),
          joinDate: 'Enero 2024'
        },
        {
          id: '2',
          name: 'DragonGirl',
          avatar: 'https://via.placeholder.com/100x100/EC4899/ffffff?text=D',
          role: 'Cazador Senior',
          points: Math.floor(user.points * 0.3),
          resolved: Math.floor(user.resolved * 0.3),
          joinDate: 'Febrero 2024'
        },
        {
          id: '3',
          name: 'CyberSamurai',
          avatar: 'https://via.placeholder.com/100x100/10B981/ffffff?text=C',
          role: 'Analista',
          points: Math.floor(user.points * 0.2),
          resolved: Math.floor(user.resolved * 0.2),
          joinDate: 'Marzo 2024'
        },
        {
          id: '4',
          name: 'RocketMan',
          avatar: 'https://via.placeholder.com/100x100/F59E0B/ffffff?text=R',
          role: 'Resolvedor',
          points: Math.floor(user.points * 0.1),
          resolved: Math.floor(user.resolved * 0.1),
          joinDate: 'Abril 2024'
        }
      ];

      userInfo.members = teamMembers;
      userInfo.leader = {
        name: 'NinjaSec',
        avatar: 'https://via.placeholder.com/100x100/8B5CF6/ffffff?text=N'
      };
      userInfo.totalMembers = teamMembers.length;
      userInfo.teamDescription = `El equipo ${user.name} es uno de los más destacados en la plataforma, especializado en la resolución de vulnerabilidades críticas y la formación de nuevos talentos.`;
    }
    
    setSelectedUser(userInfo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#23263a] rounded-2xl shadow-2xl p-8 mb-10">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-base text-left">
          <thead>
            <tr className="bg-[#181A20] text-blue-200">
              <th className="py-4 px-4">Posición</th>
              <th className="py-4 px-4">{type === 'team' ? 'Equipo' : 'Usuario'}</th>
              <th className="py-4 px-4">Vuln. Resueltas</th>
              <th className="py-4 px-4">Puntos</th>
              <th className="py-4 px-4">Progreso Semanal</th>
              <th className="py-4 px-4">Efectividad</th>
              <th className="py-4 px-4">Vuln. Restantes</th>
              <th className="py-4 px-4">Última Actualización</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.name} className={`border-b border-[#2d3147] hover:bg-gray-800/50 transition-colors ${idx === 0 ? 'bg-gradient-to-r from-yellow-900/30 to-transparent' : ''}`}>
                {/* Posición y medalla */}
                <td className="py-4 px-4 font-bold text-lg text-center">
                  {row.position <= 3 ? (
                    <span className="text-2xl">{medalIcons[row.position - 1]}</span>
                  ) : (
                    <span>{row.position}</span>
                  )}
                </td>
                {/* Nombre + icono */}
                <td className="py-4 px-4 font-semibold">
                  <button
                    onClick={() => handleUserClick(row)}
                    className="text-left hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    {row.icon && <span className="text-lg">{row.icon}</span>}
                    <span className="hover:underline">{row.name}</span>
                  </button>
                </td>
                {/* Vuln. Resueltas + barra */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{row.resolved}</span>
                    {row.resolvedGoal && (
                      <div className="w-24 h-2 bg-gray-700 rounded">
                        <div
                          className="h-2 bg-blue-400 rounded"
                          style={{ width: `${Math.min(100, (row.resolved / row.resolvedGoal) * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </td>
                {/* Puntos */}
                <td className="py-4 px-4">
                  <span className="text-lg font-extrabold text-green-400 drop-shadow">{row.points}</span>
                </td>
                {/* Progreso semanal */}
                <td className="py-4 px-4">
                  {row.weeklyChange > 0 && (
                    <span className="text-green-400 font-bold">↑ {row.weeklyChange}</span>
                  )}
                  {row.weeklyChange < 0 && (
                    <span className="text-red-400 font-bold">↓ {Math.abs(row.weeklyChange)}</span>
                  )}
                  {row.weeklyChange === 0 && (
                    <span className="text-gray-400 font-bold">-</span>
                  )}
                </td>
                {/* Efectividad */}
                <td className="py-4 px-4">
                  <span className="text-yellow-300 font-bold flex items-center gap-1">
                    {row.effectivenessIcon || '🌟'} {row.effectiveness}%
                  </span>
                </td>
                {/* Vuln. Restantes + barra */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span>{row.remaining}</span>
                    {row.remainingGoal && (
                      <div className="w-20 h-2 bg-gray-700 rounded">
                        <div
                          className="h-2 bg-pink-400 rounded"
                          style={{ width: `${Math.min(100, (row.remainingGoal - row.remaining) / row.remainingGoal * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </td>
                {/* Última actualización */}
                <td className="py-4 px-4 text-blue-200 text-sm">{row.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal de información del usuario */}
      <UserInfoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userInfo={selectedUser}
        type={type}
      />
    </div>
  );
};

export default RankingTable; 