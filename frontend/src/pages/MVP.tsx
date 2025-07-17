import React, { useState } from 'react';

// Datos ficticios de MVP
const mvpData = {
  currentMonth: 'Diciembre 2024',
  mvpUser: {
    name: 'D4ZC',
    avatar: '👨‍💻',
    team: 'P-TECH',
    stats: {
      criticas: 15,
      altas: 25,
      medianas: 35,
      bajas: 12,
      total: 87
    },
    achievements: ['Primer lugar en CTF', 'Hallazgo crítico del mes', 'Mentor del equipo']
  },
  mvpTeam: {
    name: 'P-TECH',
    members: ['D4ZC', 'Ana Torres', 'Luis Pérez', 'Marta López'],
    stats: {
      totalScore: 450,
      vulnerabilities: 67,
      challenges: 23
    },
    achievements: ['Equipo del mes', 'Mejor colaboración', 'Innovación técnica']
  },
  previousMVPs: [
    { month: 'Noviembre 2024', user: 'Ana Torres', team: 'Data', score: 78 },
    { month: 'Octubre 2024', user: 'Luis Pérez', team: 'Apps', score: 65 },
    { month: 'Septiembre 2024', user: 'Marta López', team: 'P-TECH', score: 72 }
  ]
};

const MVP: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'team' | 'history'>('user');

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 MVP</h1>
          <p className="text-gray-600">Valuable Player & Team - {mvpData.currentMonth}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-white rounded-lg p-2 shadow-sm">
            {[
              { key: 'user', label: 'MVP USUARIO', icon: '👤' },
              { key: 'team', label: 'MVP EQUIPO', icon: '👥' },
              { key: 'history', label: 'HISTORIAL', icon: '📅' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'user' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">👑</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{mvpData.mvpUser.name}</h2>
              <p className="text-xl text-blue-600 font-semibold">Equipo: {mvpData.mvpUser.team}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{mvpData.mvpUser.stats.criticas}</div>
                <div className="text-sm text-red-700">Críticas</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{mvpData.mvpUser.stats.altas}</div>
                <div className="text-sm text-orange-700">Altas</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{mvpData.mvpUser.stats.medianas}</div>
                <div className="text-sm text-yellow-700">Medianas</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{mvpData.mvpUser.stats.bajas}</div>
                <div className="text-sm text-green-700">Bajas</div>
              </div>
            </div>

            {/* Total Score */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 center text-white mb-8">
              <div className="text-4xl font-bold mb-2">{mvpData.mvpUser.stats.total}</div>
              <div className="text-lg">PUNTOS TOTALES</div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">🏅 Logros del Mes</h3>
              <div className="space-y-3">
                {mvpData.mvpUser.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{mvpData.mvpTeam.name}</h2>
              <p className="text-xl text-blue-600 font-semibold">Equipo Destacado del Mes</p>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">{mvpData.mvpTeam.stats.totalScore}</div>
                <div className="text-sm text-blue-700">PUNTOS TOTALES</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600">{mvpData.mvpTeam.stats.vulnerabilities}</div>
                <div className="text-sm text-green-700">VULNERABILIDADES</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">{mvpData.mvpTeam.stats.challenges}</div>
                <div className="text-sm text-purple-700">CHALLENGES</div>
              </div>
            </div>

            {/* Team Members */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Miembros del Equipo</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mvpData.mvpTeam.members.map((member, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">👤</div>
                    <div className="font-semibold text-gray-700">{member}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Achievements */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">🏅 Logros del Equipo</h3>
              <div className="space-y-3">
                {mvpData.mvpTeam.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <span className="text-yellow-500">🏆</span>
                    <span className="font-semibold text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 Historial de MVPs</h2>
            
            <div className="space-y-4">
              {mvpData.previousMVPs.map((mvp, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{mvp.month}</h3>
                      <p className="text-gray-600">MVP: {mvp.user} | Equipo: {mvp.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{mvp.score}</div>
                    <div className="text-sm text-gray-500">Puntos</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">¿Quién será el próximo MVP?</p>
              <p className="text-sm text-gray-500">¡Participa activamente en los desafíos y reporta vulnerabilidades!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MVP; 