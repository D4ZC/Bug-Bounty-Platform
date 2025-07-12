import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/ui/Modal';
import ConfettiBlast from '../components/ui/ConfettiBlast';
import {
  getMVPWinners,
  getMVPRewards,
  MVPReward
} from '../localDb';

interface MVPWinner {
  id: string;
  username: string;
  points: number;
  rank: number;
  achievements: number;
  vulnerabilities: number;
  streak: number;
  joinDate: string;
  mvpMonth: string;
  rewards: {
    points: number;
    achievements: string[];
    specialRewards: string[];
  };
}

interface MVPTeam {
  id: string;
  name: string;
  members: string[];
  totalPoints: number;
  totalVulnerabilities: number;
  mvpMonth: string;
  rewards: {
    points: number;
    achievements: string[];
    specialRewards: string[];
  };
}

const MVP: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [mvpWinners, setMvpWinners] = useState<MVPWinner[]>([]);
  const [mvpTeams, setMvpTeams] = useState<MVPTeam[]>([]);
  const [mvpHistory, setMvpHistory] = useState<{ month: string; winners: MVPWinner[]; teams: MVPTeam[] }[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('current');
  const [selectedView, setSelectedView] = useState<'players' | 'teams' | 'history'>('players');
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    loadMVPData();
  }, []);

  const loadMVPData = async () => {
    try {
      const [winners, teams, history] = await Promise.all([
        getMVPWinners(),
        getMVPRewards(), // Changed from getMVPTeams()
        getMVPHistory()
      ]);
      setMvpWinners(winners);
      setMvpTeams(teams);
      setMvpHistory(history);
    } catch (error) {
      console.error('Error loading MVP data:', error);
      showToast('Error al cargar datos MVP', 'error');
    }
  };

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const getMonthName = (monthString: string) => {
    const [year, month] = monthString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏆';
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-400 to-gray-600';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-purple-400 to-purple-600';
    }
  };

  const currentMonth = getCurrentMonth();
  const availableMonths = ['current', ...Array.from(new Set([...mvpWinners.map(w => w.mvpMonth), ...mvpTeams.map(t => t.mvpMonth)]))];

  const filteredWinners = selectedMonth === 'current' 
    ? mvpWinners.filter(w => w.mvpMonth === currentMonth)
    : mvpWinners.filter(w => w.mvpMonth === selectedMonth);

  const filteredTeams = selectedMonth === 'current'
    ? mvpTeams.filter(t => t.mvpMonth === currentMonth)
    : mvpTeams.filter(t => t.mvpMonth === selectedMonth);

  const isUserMVP = () => {
    return user ? filteredWinners.some(w => w.id === user._id) : false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white relative overflow-x-hidden">
      {/* Efecto de partículas/fondo cyberpunk */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="80%" cy="20%" r="400" fill="url(#cyberpunk-glow)" />
          <circle cx="20%" cy="80%" r="300" fill="url(#cyberpunk-glow)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 relative z-10">
        {/* Header Mejorado */}
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 via-orange-900/20 to-yellow-900/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-8 shadow-2xl">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                👑
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-extrabold mb-4 tracking-widest bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
              >
                MVP AWARDS
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-yellow-200 max-w-3xl mx-auto"
              >
                Celebra a los jugadores y equipos más valiosos del mes. ¡Reconocimiento y recompensas épicas!
              </motion.p>
            </div>
          </div>
        </motion.header>

        {/* Estadísticas MVP */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {/* MVP Actual */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                👑
              </motion.div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                {filteredWinners.length > 0 ? filteredWinners[0].username : 'N/A'}
              </div>
              <div className="text-yellow-200 text-sm">MVP del Mes</div>
            </div>
          </motion.div>

          {/* Total MVPs */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-4xl mb-2"
              >
                🏆
              </motion.div>
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {mvpWinners.length}
              </div>
              <div className="text-purple-200 text-sm">Total MVPs</div>
            </div>
          </motion.div>

          {/* Equipos MVP */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-blue-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                🏅
              </motion.div>
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {mvpTeams.length}
              </div>
              <div className="text-blue-200 text-sm">Equipos MVP</div>
            </div>
          </motion.div>

          {/* Tu Estado MVP */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                {isUserMVP() ? '🎉' : '🎯'}
              </motion.div>
              <div className="text-3xl font-bold text-green-400 mb-1">
                {isUserMVP() ? 'MVP' : 'Aspirante'}
              </div>
              <div className="text-green-200 text-sm">Tu Estado</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Controles */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          {/* Selector de Mes */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-4">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent border-none outline-none text-white font-bold"
              >
                {availableMonths.map(month => (
                  <option key={month} value={month}>
                    {month === 'current' ? 'Mes Actual' : getMonthName(month)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón Recompensas */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRewardsModal(true)}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl border-2 border-pink-400/50 shadow-2xl hover:shadow-pink-400/30 transition-all duration-300">
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎁
                </motion.div>
                Ver Recompensas
              </span>
            </div>
          </motion.button>
        </motion.div>

        {/* Selector de Vista */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-black/40 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-2">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedView('players')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedView === 'players'
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                    : 'text-yellow-200 hover:text-yellow-100'
                }`}
              >
                🏆 Jugadores MVP
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedView('teams')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedView === 'teams'
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                    : 'text-yellow-200 hover:text-yellow-100'
                }`}
              >
                🏅 Equipos MVP
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedView('history')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedView === 'history'
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                    : 'text-yellow-200 hover:text-yellow-100'
                }`}
              >
                📜 Historial
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Contenido Principal */}
        <AnimatePresence mode="wait">
          {selectedView === 'players' && (
            <motion.div
              key="players"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredWinners.map((winner, index) => (
                <motion.div
                  key={winner.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getRankColor(winner.rank)} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300`}></div>
                  
                  <div className="relative bg-black/80 backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300">
                    {/* Header con ranking */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ 
                            scale: winner.rank === 1 ? [1, 1.2, 1] : 1,
                            rotate: winner.rank === 1 ? [0, 10, -10, 0] : 0
                          }}
                          transition={{ 
                            duration: winner.rank === 1 ? 2 : 1, 
                            repeat: winner.rank === 1 ? Infinity : 0 
                          }}
                          className="text-4xl"
                        >
                          {getRankIcon(winner.rank)}
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-yellow-200 group-hover:text-yellow-100 transition-colors">
                            {winner.username}
                          </h3>
                          <div className="text-sm text-yellow-300">Rank #{winner.rank}</div>
                        </div>
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">💎</div>
                        <div className="text-sm text-cyan-200">{winner.points}</div>
                        <div className="text-xs text-gray-400">Puntos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">🏆</div>
                        <div className="text-sm text-purple-200">{winner.achievements}</div>
                        <div className="text-xs text-gray-400">Logros</div>
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Vulnerabilidades:</span>
                        <span className="text-green-200">{winner.vulnerabilities}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Racha:</span>
                        <span className="text-orange-200">{winner.streak} días</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">MVP Mes:</span>
                        <span className="text-blue-200">{getMonthName(winner.mvpMonth)}</span>
                      </div>
                    </div>

                    {/* Recompensas */}
                    <div className="bg-yellow-900/20 rounded-2xl p-3 border border-yellow-400/30">
                      <div className="text-yellow-200 font-semibold text-sm mb-1">Recompensas</div>
                      <div className="text-yellow-300 text-xs">
                        +{winner.rewards.points} puntos + {winner.rewards.achievements.length} logros
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredWinners.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="text-8xl mb-6">👑</div>
                  <h3 className="text-2xl font-bold text-yellow-200 mb-4">No hay MVPs este mes</h3>
                  <p className="text-gray-400">¡Sé el primero en convertirse en MVP!</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {selectedView === 'teams' && (
            <motion.div
              key="teams"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTeams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                  
                  <div className="relative bg-black/80 backdrop-blur-xl border-2 border-blue-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-blue-400/30 transition-all duration-300">
                    {/* Header del equipo */}
                    <div className="text-center mb-4">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl mb-2"
                      >
                        🏅
                      </motion.div>
                      <h3 className="text-xl font-bold text-blue-200 group-hover:text-blue-100 transition-colors">
                        {team.name}
                      </h3>
                      <div className="text-sm text-blue-300">Equipo MVP</div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">💎</div>
                        <div className="text-sm text-cyan-200">{team.totalPoints}</div>
                        <div className="text-xs text-gray-400">Puntos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">🔍</div>
                        <div className="text-sm text-green-200">{team.totalVulnerabilities}</div>
                        <div className="text-xs text-gray-400">Vulns</div>
                      </div>
                    </div>

                    {/* Miembros */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-2">Miembros ({team.members.length})</div>
                      <div className="space-y-1">
                        {team.members.slice(0, 3).map((member, idx) => (
                          <div key={idx} className="text-xs text-blue-200">
                            • {member}
                          </div>
                        ))}
                        {team.members.length > 3 && (
                          <div className="text-xs text-gray-400">
                            +{team.members.length - 3} más...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">MVP Mes:</span>
                        <span className="text-purple-200">{getMonthName(team.mvpMonth)}</span>
                      </div>
                    </div>

                    {/* Recompensas */}
                    <div className="bg-blue-900/20 rounded-2xl p-3 border border-blue-400/30">
                      <div className="text-blue-200 font-semibold text-sm mb-1">Recompensas del Equipo</div>
                      <div className="text-blue-300 text-xs">
                        +{team.rewards.points} puntos + {team.rewards.achievements.length} logros
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredTeams.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="text-8xl mb-6">🏅</div>
                  <h3 className="text-2xl font-bold text-blue-200 mb-4">No hay equipos MVP este mes</h3>
                  <p className="text-gray-400">¡Forma un equipo y compite por el título!</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {selectedView === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {mvpHistory.map((monthData, index) => (
                <motion.div
                  key={monthData.month}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                  
                  <div className="relative bg-black/60 backdrop-blur-xl border-2 border-purple-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-purple-400/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="text-4xl"
                        >
                          📅
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-purple-200 mb-1">
                            {getMonthName(monthData.month)}
                          </h3>
                          <div className="text-sm text-purple-300">
                            {monthData.winners.length} MVPs • {monthData.teams.length} Equipos
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* MVPs del mes */}
                    {monthData.winners.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-bold text-yellow-200 mb-3">🏆 MVPs del Mes</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {monthData.winners.slice(0, 3).map((winner, idx) => (
                            <div key={winner.id} className="flex items-center gap-3 p-3 bg-yellow-900/20 rounded-xl border border-yellow-400/30">
                              <div className="text-2xl">{getRankIcon(winner.rank)}</div>
                              <div>
                                <div className="font-bold text-yellow-200">{winner.username}</div>
                                <div className="text-sm text-yellow-300">{winner.points} puntos</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Equipos del mes */}
                    {monthData.teams.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-blue-200 mb-3">🏅 Equipos del Mes</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {monthData.teams.slice(0, 3).map((team, idx) => (
                            <div key={team.id} className="flex items-center gap-3 p-3 bg-blue-900/20 rounded-xl border border-blue-400/30">
                              <div className="text-2xl">🏅</div>
                              <div>
                                <div className="font-bold text-blue-200">{team.name}</div>
                                <div className="text-sm text-blue-300">{team.totalPoints} puntos</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {mvpHistory.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-8xl mb-6">📜</div>
                  <h3 className="text-2xl font-bold text-purple-200 mb-4">No hay historial MVP</h3>
                  <p className="text-gray-400">¡Sé el primero en hacer historia!</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de Recompensas */}
      <Modal
        isOpen={showRewardsModal}
        onClose={() => setShowRewardsModal(false)}
        title="Recompensas MVP"
      >
        <div className="space-y-6">
          <div className="bg-yellow-900/20 rounded-2xl p-4 border border-yellow-400/30">
            <h3 className="text-lg font-bold text-yellow-200 mb-3">🥇 MVP Oro (1er Lugar)</h3>
            <ul className="space-y-2 text-yellow-100">
              <li>• +2000 puntos base</li>
              <li>• Insignia "MVP Champion"</li>
              <li>• Acceso exclusivo a contenido premium</li>
              <li>• 50% descuento en la tienda por 1 mes</li>
              <li>• Título especial en el perfil</li>
            </ul>
          </div>

          <div className="bg-gray-900/20 rounded-2xl p-4 border border-gray-400/30">
            <h3 className="text-lg font-bold text-gray-200 mb-3">🥈 MVP Plata (2do Lugar)</h3>
            <ul className="space-y-2 text-gray-100">
              <li>• +1500 puntos base</li>
              <li>• Insignia "MVP Elite"</li>
              <li>• 25% descuento en la tienda por 1 mes</li>
              <li>• Título especial en el perfil</li>
            </ul>
          </div>

          <div className="bg-orange-900/20 rounded-2xl p-4 border border-orange-400/30">
            <h3 className="text-lg font-bold text-orange-200 mb-3">🥉 MVP Bronce (3er Lugar)</h3>
            <ul className="space-y-2 text-orange-100">
              <li>• +1000 puntos base</li>
              <li>• Insignia "MVP Warrior"</li>
              <li>• 10% descuento en la tienda por 1 mes</li>
            </ul>
          </div>

          <div className="bg-blue-900/20 rounded-2xl p-4 border border-blue-400/30">
            <h3 className="text-lg font-bold text-blue-200 mb-3">🏅 Equipos MVP</h3>
            <ul className="space-y-2 text-blue-100">
              <li>• +3000 puntos para el equipo</li>
              <li>• Insignia "Team MVP" para todos los miembros</li>
              <li>• Acceso a desafíos exclusivos de equipo</li>
              <li>• Título especial para el equipo</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Confetti */}
      {showConfetti && <ConfettiBlast />}
    </div>
  );
};

export default MVP;
