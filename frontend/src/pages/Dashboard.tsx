import React from 'react';

// Mock de datos del usuario
const mockUser = {
  name: 'PlayerOne',
  level: 15,
  rank: 3,
  totalPoints: 1250,
  pointsThisWeek: 180,
  vulnerabilitiesFound: 47,
  criticalVulns: 8,
  highVulns: 12,
  mediumVulns: 18,
  lowVulns: 9,
  rewardsEarned: 12,
  streak: 7,
  accuracy: 94.2,
};

// Mock de estadísticas recientes
const mockRecentActivity = [
  { id: 1, type: 'vulnerability', title: 'SQL Injection en /api/users', severity: 'Crítica', points: 100, date: '2024-01-15' },
  { id: 2, type: 'reward', title: 'Skin Cyber Ninja', points: -400, date: '2024-01-14' },
  { id: 3, type: 'vulnerability', title: 'XSS en formulario de contacto', severity: 'Alta', points: 75, date: '2024-01-13' },
  { id: 4, type: 'achievement', title: 'MVP del Mes', points: 150, date: '2024-01-12' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-xl font-semibold">{mockUser.name}</span>
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">Nivel {mockUser.level}</span>
            <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">#{mockUser.rank} Global</span>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Points */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Blue Points</h3>
              <span className="text-2xl">💎</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">{mockUser.totalPoints}</div>
            <div className="text-sm text-gray-300 mt-2">+{mockUser.pointsThisWeek} esta semana</div>
          </div>

          {/* Vulnerabilities Found */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Vulnerabilidades</h3>
              <span className="text-2xl">🔍</span>
            </div>
            <div className="text-3xl font-bold text-green-400">{mockUser.vulnerabilitiesFound}</div>
            <div className="text-sm text-gray-300 mt-2">Total encontradas</div>
          </div>

          {/* Streak */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Racha</h3>
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-3xl font-bold text-orange-400">{mockUser.streak}</div>
            <div className="text-sm text-gray-300 mt-2">días consecutivos</div>
          </div>

          {/* Accuracy */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Precisión</h3>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-3xl font-bold text-purple-400">{mockUser.accuracy}%</div>
            <div className="text-sm text-gray-300 mt-2">Reportes válidos</div>
          </div>
        </div>

        {/* Vulnerability Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Severity Chart */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-6">Vulnerabilidades por Severidad</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Crítica</span>
                </div>
                <span className="font-bold text-red-400">{mockUser.criticalVulns}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>Alta</span>
                </div>
                <span className="font-bold text-orange-400">{mockUser.highVulns}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Media</span>
                </div>
                <span className="font-bold text-yellow-400">{mockUser.mediumVulns}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Baja</span>
                </div>
                <span className="font-bold text-green-400">{mockUser.lowVulns}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-6">Actividad Reciente</h3>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {activity.type === 'vulnerability' ? '🔍' : 
                       activity.type === 'reward' ? '🎁' : '🏆'}
                    </span>
                    <div>
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-gray-400">{activity.date}</div>
                    </div>
                  </div>
                  <span className={`font-bold ${activity.points > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {activity.points > 0 ? '+' : ''}{activity.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/vulnerabilities" className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-center transition-colors">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-lg font-bold mb-2">Buscar Vulnerabilidades</h3>
            <p className="text-sm text-blue-200">Explora nuevos targets</p>
          </a>
          
          <a href="/shop" className="bg-purple-600 hover:bg-purple-700 rounded-xl p-6 text-center transition-colors">
            <div className="text-3xl mb-2">🛒</div>
            <h3 className="text-lg font-bold mb-2">Tienda</h3>
            <p className="text-sm text-purple-200">Canjea tus puntos</p>
          </a>
          
          <a href="/profile" className="bg-green-600 hover:bg-green-700 rounded-xl p-6 text-center transition-colors">
            <div className="text-3xl mb-2">👤</div>
            <h3 className="text-lg font-bold mb-2">Mi Perfil</h3>
            <p className="text-sm text-green-200">Ver estadísticas</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 