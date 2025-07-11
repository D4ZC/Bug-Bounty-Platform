import React, { useEffect, useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import XPProgressBar from '../components/ui/XPProgressBar';
import AchievementsGallery from '../components/ui/AchievementsGallery';
import apiService from '../services/api';
import Modal from '../components/ui/Modal';
import ConfettiBlast from '../components/ui/ConfettiBlast';

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

// Mock de logros
const mockAchievements = [
  {
    _id: 'mock-1',
    id: 1,
    name: 'Primer Bug',
    description: 'Reporta tu primera vulnerabilidad.',
    icon: '🐞',
    unlocked: true,
    reward: '+50 Blue Points',
  },
  {
    _id: 'mock-2',
    id: 2,
    name: 'Cazador de Bugs',
    description: 'Reporta 10 vulnerabilidades.',
    icon: '🕷️',
    unlocked: true,
    reward: 'Skin exclusiva',
  },
  {
    _id: 'mock-3',
    id: 3,
    name: 'Comprador',
    description: 'Canjea tu primer producto en la tienda.',
    icon: '🛒',
    unlocked: false,
    reward: '+25 Blue Points',
  },
  {
    _id: 'mock-4',
    id: 4,
    name: 'Racha Imparable',
    description: 'Mantén una racha de 7 días.',
    icon: '🔥',
    unlocked: true,
    reward: 'Power-up especial',
  },
  {
    _id: 'mock-5',
    id: 5,
    name: 'Maestro de Ligas',
    description: 'Llega a la liga Maestro.',
    icon: '🏆',
    unlocked: false,
    reward: 'Insignia dorada',
  },
];

const Dashboard: React.FC = () => {
  const { user, addXP, unlockAchievement, getActivityLog } = useAuth();
  const { showToast } = useToast();
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [ranking, setRanking] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiType, setConfettiType] = useState<'logro' | 'nivel'>('logro');

  useEffect(() => {
    if (user && user._id) {
      getActivityLog().then(setActivityLog);
    }
  }, [user]);

  useEffect(() => {
    apiService.getUserRanking().then(res => {
      if (res.success && Array.isArray(res.data)) setRanking(res.data);
    });
  }, []);

  // Mock de XP y nivel
  const xp = user?.xp ?? 850;
  const level = user?.level ?? 15;
  const xpToNextLevel = 1000; // Puedes ajustar la lógica de XP real
  const achievements = user?.achievements ?? mockAchievements;

  // Simulación: desbloquear logro y subir de nivel
  const handleTestAchievement = () => {
    addXP(200);
    unlockAchievement({
      _id: 'mock-99',
      id: 99,
      name: 'Logro de Prueba',
      description: 'Has desbloqueado un logro de prueba.',
      icon: '🏆',
      unlocked: true,
      reward: '+200 XP',
      dateUnlocked: new Date().toLocaleDateString(),
    });
    showToast('¡Logro desbloqueado: Logro de Prueba!', 'success');
    setShowModal(true);
    setConfettiType('logro');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1800);
  };
  const handleLevelUp = () => {
    addXP(1000);
    showToast('¡Subiste de nivel!', 'success');
    setShowModal(true);
    setConfettiType('nivel');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1800);
  };

  // Mock: mostrar un toast de ejemplo al cargar
  useEffect(() => {
    setTimeout(() => {
      showToast('¡Has ganado 100 Blue Points!', 'success');
    }, 1200);
  }, [showToast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white relative overflow-x-hidden">
      <ConfettiBlast trigger={showConfetti} type={confettiType} />
      {/* Efecto de partículas/fondo cyberpunk */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#00fff7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="80%" cy="20%" r="400" fill="url(#cyberpunk-glow)" />
          <circle cx="20%" cy="80%" r="300" fill="url(#cyberpunk-glow)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto py-8 px-4 relative z-10">
        {/* Toast Notification */}
        {/* Eliminar el estado y lógica local de toast */}
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-extrabold mb-2 tracking-widest neon-text drop-shadow-cyber">DASHBOARD</h1>
            <div className="flex items-center gap-4">
              <img src={user?.avatarUrl} alt="avatar" className="w-12 h-12 rounded-full border-2 border-cyan-400 neon-shadow" />
              <span className="text-2xl font-bold text-cyan-400 glow-cyber">{user?.username || mockUser.name}</span>
              <span className="bg-cyan-600/80 px-4 py-1 rounded-full text-base font-bold border-2 border-cyan-400 shadow-cyber">Puntos {user?.points ?? mockUser.totalPoints}</span>
              <span className="bg-pink-600/80 px-4 py-1 rounded-full text-base font-bold border-2 border-pink-400 shadow-cyber">#{user?.rank || mockUser.rank} Global</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <span className="inline-flex items-center gap-2 bg-yellow-400/20 border-2 border-yellow-400 text-yellow-200 px-4 py-2 rounded-xl font-bold shadow-cyber animate-pulse">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 21 12 17.27 7.82 21 9 12.91l-5-3.64 5.91-.01z" fill="#FFD700"/></svg>
              Insignia: MVP
            </span>
            <span className="inline-flex items-center gap-2 bg-purple-400/20 border-2 border-purple-400 text-purple-200 px-4 py-2 rounded-xl font-bold shadow-cyber">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#a78bfa" strokeWidth="2"/></svg>
              Racha: {mockUser.streak} días
            </span>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Points */}
          <div className="bg-gradient-to-br from-cyan-900/80 to-cyan-700/60 border-2 border-cyan-400 neon-shadow rounded-xl p-6 relative overflow-hidden group hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus-within:ring-2 focus-within:ring-cyan-400 transition-all duration-300 animate-bounce-short-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-cyan-200 tracking-wider">Blue Points</h3>
              <span className="text-3xl animate-bounce">💎</span>
            </div>
            <div className="text-4xl font-extrabold text-cyan-300 drop-shadow-cyber">{mockUser.totalPoints}</div>
            <div className="text-sm text-cyan-100 mt-2">+{mockUser.pointsThisWeek} esta semana</div>
            <div className="absolute right-2 bottom-2 opacity-20 text-7xl pointer-events-none select-none">⚡</div>
          </div>
          {/* Vulnerabilities Found */}
          <div className="bg-gradient-to-br from-pink-900/80 to-pink-700/60 border-2 border-pink-400 neon-shadow rounded-xl p-6 relative overflow-hidden group hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus-within:ring-2 focus-within:ring-pink-400 transition-all duration-300 animate-bounce-short-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-pink-200 tracking-wider">Vulnerabilidades</h3>
              <span className="text-3xl animate-pulse">🔍</span>
            </div>
            <div className="text-4xl font-extrabold text-pink-300 drop-shadow-cyber">{mockUser.vulnerabilitiesFound}</div>
            <div className="text-sm text-pink-100 mt-2">Total encontradas</div>
            <div className="absolute left-2 bottom-2 opacity-20 text-7xl pointer-events-none select-none">🧾</div>
          </div>
          {/* Streak */}
          <div className="bg-gradient-to-br from-yellow-900/80 to-yellow-700/60 border-2 border-yellow-400 neon-shadow rounded-xl p-6 relative overflow-hidden group hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus-within:ring-2 focus-within:ring-yellow-400 transition-all duration-300 animate-bounce-short-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-yellow-200 tracking-wider">Racha</h3>
              <span className="text-3xl animate-spin">🔥</span>
            </div>
            <div className="text-4xl font-extrabold text-yellow-300 drop-shadow-cyber">{mockUser.streak}</div>
            <div className="text-sm text-yellow-100 mt-2">días consecutivos</div>
            <div className="absolute right-2 top-2 opacity-20 text-7xl pointer-events-none select-none">⚡</div>
          </div>
          {/* Accuracy */}
          <div className="bg-gradient-to-br from-purple-900/80 to-purple-700/60 border-2 border-purple-400 neon-shadow rounded-xl p-6 relative overflow-hidden group hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus-within:ring-2 focus-within:ring-purple-400 transition-all duration-300 animate-bounce-short-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-purple-200 tracking-wider">Precisión</h3>
              <span className="text-3xl animate-pulse">🎯</span>
            </div>
            <div className="text-4xl font-extrabold text-purple-300 drop-shadow-cyber">{mockUser.accuracy}%</div>
            <div className="text-sm text-purple-100 mt-2">Reportes válidos</div>
            <div className="absolute left-2 top-2 opacity-20 text-7xl pointer-events-none select-none">🛡️</div>
          </div>
        </div>
        {/* Ranking Semanal */}
        {/* <div className="my-12">
          <WeeklyRanking />
        </div> */}

        {/* Vulnerability Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Severity Chart */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-6">
              Vulnerabilidades por Severidad
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Crítica</span>
                </div>
                <span className="font-bold text-red-400">
                  {mockUser.criticalVulns}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>Alta</span>
                </div>
                <span className="font-bold text-orange-400">
                  {mockUser.highVulns}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Media</span>
                </div>
                <span className="font-bold text-yellow-400">
                  {mockUser.mediumVulns}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Baja</span>
                </div>
                <span className="font-bold text-green-400">
                  {mockUser.lowVulns}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-6">Actividad Reciente</h3>
            <div className="space-y-4">
              {activityLog.length === 0 && <div className="text-cyan-200">Sin actividad reciente.</div>}
              {activityLog.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {activity.type === 'vulnerability'
                        ? '🔍'
                        : activity.type === 'reward'
                          ? '🎁'
                          : activity.type === 'achievement'
                            ? '🏆'
                            : '📋'}
                    </span>
                    <div>
                      <div className="font-medium">{activity.description || activity.title}</div>
                      <div className="text-sm text-gray-400">
                        {activity.date}
                      </div>
                    </div>
                  </div>
                  {typeof activity.points === 'number' && (
                    <span
                      className={`font-bold ${activity.points > 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {activity.points > 0 ? '+' : ''}
                      {activity.points}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barra de progreso de XP/Nivel */}
        <XPProgressBar xp={xp} level={level} xpToNextLevel={xpToNextLevel} />
        {/* Botón de prueba para desbloquear logro y subir de nivel */}
        <div className="flex justify-center my-4">
          <button
            onClick={handleTestAchievement}
            className="bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold px-6 py-2 rounded-full shadow-cyber hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
          >
            Simular desbloqueo de logro
          </button>
          <button
            onClick={handleLevelUp}
            className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold px-6 py-2 rounded-full shadow-cyber hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
          >
            Simular subida de nivel
          </button>
        </div>
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={confettiType === 'nivel' ? '¡Nivel alcanzado!' : '¡Logro desbloqueado!'}
        >
          <div className="flex flex-col items-center gap-4">
            <span className={`text-5xl animate-bounce ${confettiType === 'nivel' ? 'text-yellow-300 glow-level' : 'text-pink-400 glow-achievement'}`}>{confettiType === 'nivel' ? '⭐' : '🏆'}</span>
            <p className="text-lg font-bold text-cyan-200 text-center">
              {confettiType === 'nivel'
                ? '¡Felicidades! Has subido de nivel y desbloqueado nuevas recompensas.'
                : 'Has desbloqueado el Logro de Prueba y ganado +200 XP.'}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-cyan-600 text-white font-bold px-6 py-2 rounded-full hover:bg-cyan-700 transition"
            >
              ¡Genial!
            </button>
          </div>
          <style>{`
            .glow-achievement {
              text-shadow: 0 0 16px #ff00ea, 0 0 32px #00fff7, 0 0 48px #fff200;
            }
            .glow-level {
              text-shadow: 0 0 16px #fff200, 0 0 32px #ff00ea, 0 0 48px #00fff7;
            }
          `}</style>
        </Modal>

        {/* Galería de logros */}
        <h2 className="text-3xl font-extrabold mb-6 neon-text drop-shadow-cyber tracking-widest text-center">LOGROS DESBLOQUEADOS</h2>
        <AchievementsGallery achievements={achievements} />

        {/* Weekly Ranking */}
        <div className="mt-16 mb-16">
          <h2 className="text-3xl font-extrabold mb-6 neon-text drop-shadow-cyber tracking-widest text-center">RANKING SEMANAL</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/70 border-2 border-cyan-400 neon-shadow rounded-2xl shadow-cyber">
              <thead>
                <tr className="text-cyan-200 text-lg">
                  <th className="py-3 px-4">Posición</th>
                  <th className="py-3 px-4">Avatar</th>
                  <th className="py-3 px-4">Nombre</th>
                  <th className="py-3 px-4">Puntos</th>
                  <th className="py-3 px-4">Medalla</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((user) => (
                  <tr key={user.id} className="text-center text-lg font-bold text-cyan-100 border-b border-cyan-800 hover:bg-cyan-900/20 transition-all">
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full font-extrabold text-lg border-2 neon-shadow ${user.rank === 1 ? 'bg-yellow-400 text-yellow-900 border-yellow-300 animate-bounce' : user.rank === 2 ? 'bg-gray-300 text-gray-900 border-gray-200' : user.rank === 3 ? 'bg-orange-400 text-orange-900 border-orange-300' : 'bg-cyan-800 text-cyan-200 border-cyan-400'}`}>{user.rank}</span>
                    </td>
                    <td className="py-3 px-4">
                      <img src={user.avatar || 'https://robohash.org/' + user.username} alt={user.username} className="w-12 h-12 rounded-full border-2 border-cyan-400 neon-shadow mx-auto" />
                    </td>
                    <td className="py-3 px-4">{user.username}</td>
                    <td className="py-3 px-4 text-yellow-300">{user.points}</td>
                    <td className="py-3 px-4">
                      {user.rank === 1 && <span className="text-3xl">🥇</span>}
                      {user.rank === 2 && <span className="text-3xl">🥈</span>}
                      {user.rank === 3 && <span className="text-3xl">🥉</span>}
                      {user.rank > 3 && <span className="text-2xl">⭐</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-10">
          <a
            href="/shop"
            className="bg-gradient-to-br from-purple-900 via-purple-700 to-purple-900 border-2 border-purple-400 neon-shadow rounded-xl p-6 text-center transition-transform hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
          >
            <div className="text-4xl mb-2 animate-bounce">🛒</div>
            <h3 className="text-lg font-extrabold mb-2 tracking-wider text-purple-200">Tienda</h3>
            <p className="text-sm text-purple-300">Canjea tus puntos</p>
            <span className="absolute right-2 bottom-2 opacity-10 text-7xl pointer-events-none select-none">💰</span>
          </a>
          <a
            href="/profile"
            className="bg-gradient-to-br from-cyan-900 via-cyan-700 to-cyan-900 border-2 border-cyan-400 neon-shadow rounded-xl p-6 text-center transition-transform hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
          >
            <div className="text-4xl mb-2 animate-pulse">👤</div>
            <h3 className="text-lg font-extrabold mb-2 tracking-wider text-cyan-200">Mi Perfil</h3>
            <p className="text-sm text-cyan-300">Ver estadísticas</p>
            <span className="absolute left-2 bottom-2 opacity-10 text-7xl pointer-events-none select-none">🧑‍💻</span>
          </a>
          <a
            href="/leagues"
            className="bg-gradient-to-br from-yellow-900 via-yellow-700 to-yellow-900 border-2 border-yellow-400 neon-shadow rounded-xl p-6 text-center transition-transform hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
          >
            <div className="text-4xl mb-2 animate-spin">🏆</div>
            <h3 className="text-lg font-extrabold mb-2 tracking-wider text-yellow-200">Ligas</h3>
            <p className="text-sm text-yellow-300">Progreso y recompensas</p>
            <span className="absolute right-2 top-2 opacity-10 text-7xl pointer-events-none select-none">⭐</span>
          </a>
          <a
            href="/exercises"
            className="bg-gradient-to-br from-pink-900 via-pink-700 to-pink-900 border-2 border-pink-400 neon-shadow rounded-xl p-6 text-center transition-transform hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
          >
            <div className="text-4xl mb-2 animate-bounce">🧩</div>
            <h3 className="text-lg font-extrabold mb-2 tracking-wider text-pink-200">Ejercicios</h3>
            <p className="text-sm text-pink-300">Practica y aprende</p>
            <span className="absolute left-2 top-2 opacity-10 text-7xl pointer-events-none select-none">🕹️</span>
          </a>
          <a
            href="/clans"
            className="bg-gradient-to-br from-green-900 via-green-700 to-green-900 border-2 border-green-400 neon-shadow rounded-xl p-6 text-center transition-transform hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
          >
            <div className="text-4xl mb-2 animate-pulse">🛡️</div>
            <h3 className="text-lg font-extrabold mb-2 tracking-wider text-green-200">Clanes</h3>
            <p className="text-sm text-green-300">Únete o crea un clan</p>
            <span className="absolute right-2 bottom-2 opacity-10 text-7xl pointer-events-none select-none">🏰</span>
          </a>
        </div>

        {/* Sección de Clanes */}
        <div className="mt-16 mb-16">
          <h2 className="text-3xl font-extrabold mb-6 neon-text drop-shadow-cyber tracking-widest text-center">CLANES DESTACADOS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
            {/* Mock de clanes */}
            {[
              { id: 1, name: 'Cyber Hunters', members: 12, logo: 'https://cdn-icons-png.flaticon.com/512/616/616494.png' },
              { id: 2, name: 'Shadow Hackers', members: 8, logo: 'https://cdn-icons-png.flaticon.com/512/616/616491.png' },
              { id: 3, name: 'Neon Wolves', members: 15, logo: 'https://cdn-icons-png.flaticon.com/512/616/616495.png' },
            ].map((clan) => (
              <div key={clan.id} className="flex flex-col items-center bg-black/70 border-2 border-green-400 neon-shadow rounded-2xl p-6 w-full max-w-xs">
                <img src={user?.avatarUrl} alt={user?.username || clan.name} className="w-20 h-20 rounded-full border-2 border-green-400 mb-4 neon-shadow" />
                <div className="text-xl font-bold text-green-200 mb-2 drop-shadow-cyber">{user?.username || clan.name}</div>
                <div className="text-sm text-green-100 mb-1">Miembros: <span className="font-bold">{clan.members}</span></div>
                <button className="mt-2 px-4 py-2 bg-green-700/80 border border-green-400 rounded-lg text-green-100 font-bold hover:bg-green-600 transition">Ver Clan</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Estilos cyberpunk extra */}
      <style>{`
        .neon-text {
          color: #00fff7;
          text-shadow: 0 0 8px #00fff7, 0 0 16px #00fff7, 0 0 32px #00fff7;
        }
        .drop-shadow-cyber {
          filter: drop-shadow(0 0 8px #00fff7) drop-shadow(0 0 16px #a78bfa);
        }
        .glow-cyber {
          text-shadow: 0 0 8px #a78bfa, 0 0 16px #00fff7;
        }
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
        .neon-shadow {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa, 0 0 8px #fff0;
        }
        .shadow-insignia {
          box-shadow: 0 2px 8px 0 #2228, 0 1.5px 0 #fff4 inset;
        }
        .insignia-3d {
          filter: drop-shadow(0 2px 0 #fff8) drop-shadow(0 6px 12px #0006);
          text-shadow: 0 1px 0 #fff8, 0 2px 4px #0006;
        }
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          80% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .animate-bounce-short-card {
          transition: transform 0.2s cubic-bezier(.4,0,.2,1);
        }
        .group:hover .animate-bounce-short-card, .group:focus-within .animate-bounce-short-card {
          animation: bounce-short-card 0.4s cubic-bezier(.4,0,.2,1);
        }
        @keyframes bounce-short-card {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.08); }
          60% { transform: scale(0.96); }
          80% { transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard; 
