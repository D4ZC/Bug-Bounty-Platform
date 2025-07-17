import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import XPProgressBar from '../components/ui/XPProgressBar';
import AchievementsGallery from '../components/ui/AchievementsGallery';
import Modal from '../components/ui/Modal';
import ConfettiBlast from '../components/ui/ConfettiBlast';
import { getUsers, getAllClans, getVulnerabilitiesByUser, getPurchasesByUser, getAchievementsByUser } from '../localDb';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, addXP, unlockAchievement, getActivityLog } = useAuth();
  const { showToast } = useToast();
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [ranking, setRanking] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiType, setConfettiType] = useState<'logro' | 'nivel'>('logro');
  const [clanesDestacados, setClanesDestacados] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedClan, setSelectedClan] = useState<any>(null);
  const [showClanModal, setShowClanModal] = useState(false);
  const [userStats, setUserStats] = useState({
    vulnerabilitiesFound: 0,
    streak: 0,
    accuracy: 0,
    criticalVulns: 0,
    highVulns: 0,
    mediumVulns: 0,
    lowVulns: 0
  });
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  // Eliminar la declaración previa de allUsers como useState
  // const [allUsers, setAllUsers] = useState<any[]>([]);
  // Usar solo la versión sincrónica:
  // const allUsers = getUsers();

  useEffect(() => {
    // Obtener clanes globales destacados (los 3 con más miembros)
    const allClans = getAllClans();
    const sortedClans = allClans
      .sort((a, b) => (b.members?.length || 0) - (a.members?.length || 0))
      .slice(0, 3);
    setClanesDestacados(sortedClans);
  }, []);

  useEffect(() => {
    if (user && user._id) {
      getActivityLog().then(log => {
        // Si el usuario es nuevo, no mostrar actividades
        if (!log || log.length === 0 || (user.points ?? 0) === 0) {
          setActivityLog([]);
        } else {
          setActivityLog(log);
        }
      });
    } else {
      setActivityLog([]);
    }
  }, [user]);

  useEffect(() => {
    // Obtener ranking real de usuarios
    const users = getUsers();
    const sortedUsers = users
      .sort((a, b) => b.points - a.points)
      .slice(0, 5)
      .map((user, index) => ({
        _id: user.id,
        username: user.username,
        points: user.points,
        rank: index + 1,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
      }));
    setRanking(sortedUsers);
  }, []);

  useEffect(() => {
    // Calcular estadísticas reales del usuario
    if (user && user._id) {
      const vulnerabilities = getVulnerabilitiesByUser(user._id);
      const purchases = getPurchasesByUser(user._id);
      
      const totalVulns = vulnerabilities.length;
      const criticalVulns = vulnerabilities.filter((v: any) => v.severity === 'critical').length;
      const highVulns = vulnerabilities.filter((v: any) => v.severity === 'high').length;
      const mediumVulns = vulnerabilities.filter((v: any) => v.severity === 'medium').length;
      const lowVulns = vulnerabilities.filter((v: any) => v.severity === 'low').length;
      
      // Calcular precisión (vulnerabilidades válidas / total reportadas)
      const validVulns = vulnerabilities.filter((v: any) => v.status === 'resolved').length;
      const accuracy = totalVulns > 0 ? Math.round((validVulns / totalVulns) * 100) : 0;
      
      // Calcular racha (días consecutivos con actividad)
      const today = new Date();
      const lastActivity = activityLog.length > 0 ? new Date(activityLog[0].date) : null;
      const streak = lastActivity ? Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)) : 0;
      
      setUserStats({
        vulnerabilitiesFound: totalVulns,
        streak: Math.max(0, streak),
        accuracy,
        criticalVulns,
        highVulns,
        mediumVulns,
        lowVulns
      });
    }
  }, [user, activityLog]);

  // Usar solo datos reales del usuario
  const xp = user?.xp ?? 0;
  const level = user?.level ?? 1;
  const xpToNextLevel = 1000;
  const achievements = user?.achievements ?? [];
  const isNewUser = !user || (user.points ?? 0) === 0;
  const hasMVP = achievements.some(a => a.name?.toLowerCase().includes('mvp'));

  // Simulación: desbloquear logro y subir de nivel
  const handleTestAchievement = () => {
    addXP(200);
    unlockAchievement({
      _id: 'test-achievement-' + Date.now(),
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

  // Funciones para manejar clanes
  // Recargar clanes y usuarios cada vez que se abra el modal de clan
  const handleClanClick = (clan: any) => {
    // Recargar datos actualizados
    const allClans = getAllClans();
    const sortedClans = allClans
      .sort((a, b) => (b.members?.length || 0) - (a.members?.length || 0))
      .slice(0, 3);
    setClanesDestacados(sortedClans);
    setAllUsers(getUsers());
    setSelectedClan(clan);
    setShowClanModal(true);
  };

  const handleCloseClanModal = () => {
    setShowClanModal(false);
    setSelectedClan(null);
  };

  // Handler para mostrar modal de perfil
  const handleProfileClick = (user: any) => {
    // Calcular nivel
    const level = Math.floor(user.points / 1000) + 1;
    // Obtener logros recientes
    const achievements = getAchievementsByUser ? getAchievementsByUser(user._id || user.id) : [];
    setSelectedProfile({
      ...user,
      level,
      bio: 'Sin biografía disponible',
      achievements,
    });
    setShowProfileModal(true);
  };
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
    setSelectedProfile(null);
  };

  // Reemplazar getClanMembersInfo para usar la misma lógica que Team.tsx
  const getClanMembersInfo = (clan: any, allUsers: any[]) => {
    if (!clan.members || clan.members.length === 0) return [];
    return clan.members.map((memberId: string) => {
      const user = allUsers.find(u => u.id === memberId);
      return user ? {
        id: user.id,
        username: user.username,
        points: user.points,
        level: user.level || 1,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
        bio: user.bio || 'Sin biografía disponible'
      } : null;
    }).filter(Boolean);
  };

  // Calcular porcentaje de progreso de XP
  const xpRequired = 1000; // XP requerido para el siguiente nivel
  const currentLevelXP = user?.xp || 0;
  const nextLevelXP = xpRequired - currentLevelXP;
  const progressPercentage = user?.xp ? Math.round((currentLevelXP / xpRequired) * 100) : 0;

  // Filtrar logros recientes (últimos 5)
  const recentAchievements = achievements.slice(-5);

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
        {/* Header Mejorado */}
        <header className="mb-12 relative">
          {/* Fondo animado del header */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-black/40 backdrop-blur-xl border-2 border-cyan-400/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <motion.h1 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <span className="text-6xl font-extrabold mb-4 tracking-widest neon-text drop-shadow-cyber bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    DASHBOARD
                  </span>
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  {/* Avatar con efectos */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-75"></div>
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'user'}`} 
                      alt="avatar" 
                      className="relative w-16 h-16 rounded-full border-4 border-cyan-400 shadow-cyber group-hover:scale-110 transition-all duration-300" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                  </div>
                  
                  {/* Información del usuario */}
                  <div className="flex flex-col gap-2">
                    <span className="text-3xl font-bold text-cyan-400 glow-cyber">{user?.username || ''}</span>
                    <div className="flex flex-wrap gap-3">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2 rounded-full text-lg font-bold border-2 border-cyan-400 shadow-cyber hover:shadow-cyan-400/50 transition-all duration-300"
                      >
                        💎 {user?.points ?? 0} Puntos
                      </motion.span>
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-2 rounded-full text-lg font-bold border-2 border-pink-400 shadow-cyber hover:shadow-pink-400/50 transition-all duration-300"
                      >
                        🏆 #{user?.rank ?? 999} Global
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* MVP Badge */}
              {!isNewUser && hasMVP && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex gap-2 mt-4 md:mt-0"
                >
                  <motion.span 
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(255, 215, 0, 0.5)",
                        "0 0 40px rgba(255, 215, 0, 0.8)",
                        "0 0 20px rgba(255, 215, 0, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400 text-yellow-200 px-6 py-3 rounded-2xl font-bold shadow-cyber backdrop-blur-sm"
                  >
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="animate-spin-slow">
                      <path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 21 12 17.27 7.82 21 9 12.91l-5-3.64 5.91-.01z" fill="#FFD700"/>
                    </svg>
                    <span className="text-lg">Insignia: MVP</span>
                  </motion.span>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {/* Stats Cards Mejoradas */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Total Points */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-cyan-900/90 to-cyan-700/70 border-2 border-cyan-400/80 rounded-2xl p-8 backdrop-blur-sm shadow-2xl hover:shadow-cyan-400/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-cyan-200 tracking-wider">Blue Points</h3>
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  💎
                </motion.span>
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-5xl font-extrabold text-cyan-300 drop-shadow-cyber mb-3"
              >
                {user?.points ?? 0}
              </motion.div>
              <div className="text-sm text-cyan-100 mb-4">+{isNewUser ? 0 : user?.xp || 0} esta semana</div>
              
              {/* Barra de progreso animada */}
              <div className="w-full bg-cyan-900/50 rounded-full h-2 mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((user?.points || 0) / 1000 * 100, 100)}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full shadow-lg"
                ></motion.div>
              </div>
              
              <div className="absolute right-4 bottom-4 opacity-20 text-8xl pointer-events-none select-none">⚡</div>
            </div>
          </motion.div>

          {/* Vulnerabilities Found */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-pink-900/90 to-pink-700/70 border-2 border-pink-400/80 rounded-2xl p-8 backdrop-blur-sm shadow-2xl hover:shadow-pink-400/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-pink-200 tracking-wider">Vulnerabilidades</h3>
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  🔍
                </motion.span>
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-5xl font-extrabold text-pink-300 drop-shadow-cyber mb-3"
              >
                {userStats.vulnerabilitiesFound}
              </motion.div>
              <div className="text-sm text-pink-100 mb-4">Total encontradas</div>
              
              {/* Indicador de severidad */}
              <div className="flex gap-1 mb-4">
                <div className="flex-1 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1 h-2 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="absolute left-4 bottom-4 opacity-20 text-8xl pointer-events-none select-none">🧾</div>
            </div>
          </motion.div>

          {/* Streak */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-yellow-900/90 to-yellow-700/70 border-2 border-yellow-400/80 rounded-2xl p-8 backdrop-blur-sm shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-yellow-200 tracking-wider">Racha</h3>
                <motion.span 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-4xl"
                >
                  🔥
                </motion.span>
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-5xl font-extrabold text-yellow-300 drop-shadow-cyber mb-3"
              >
                {userStats.streak}
              </motion.div>
              <div className="text-sm text-yellow-100 mb-4">días consecutivos</div>
              
              {/* Llamas animadas */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(Math.min(userStats.streak, 5))].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -5, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      delay: i * 0.1 
                    }}
                    className="w-2 h-4 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full"
                  ></motion.div>
                ))}
              </div>
              
              <div className="absolute right-4 top-4 opacity-20 text-8xl pointer-events-none select-none">⚡</div>
            </div>
          </motion.div>

          {/* Accuracy */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-purple-900/90 to-purple-700/70 border-2 border-purple-400/80 rounded-2xl p-8 backdrop-blur-sm shadow-2xl hover:shadow-purple-400/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-purple-200 tracking-wider">Precisión</h3>
                <motion.span 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  🎯
                </motion.span>
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-5xl font-extrabold text-purple-300 drop-shadow-cyber mb-3"
              >
                {userStats.accuracy}%
              </motion.div>
              <div className="text-sm text-purple-100 mb-4">Reportes válidos</div>
              
              {/* Círculo de precisión */}
              <div className="relative w-16 h-16 mx-auto mb-4">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(147, 51, 234, 0.3)"
                    strokeWidth="3"
                  />
                  <motion.path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#purpleGradient)"
                    strokeWidth="3"
                    strokeDasharray={`${userStats.accuracy}, 100`}
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: `${userStats.accuracy}, 100` }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                  <defs>
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-purple-200">
                  {userStats.accuracy}%
                </div>
              </div>
              
              <div className="absolute left-4 top-4 opacity-20 text-8xl pointer-events-none select-none">🛡️</div>
            </div>
          </motion.div>
        </motion.div>

        {/* XP Progress & Achievements Mejorados */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* XP Progress Mejorado */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border-2 border-purple-400/50 rounded-3xl p-8 shadow-2xl hover:shadow-purple-400/20 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-8 text-purple-200 flex items-center gap-3">
                <motion.div
                  animate={{ 
                    background: [
                      "linear-gradient(45deg, #a855f7, #ec4899)",
                      "linear-gradient(45deg, #ec4899, #a855f7)",
                      "linear-gradient(45deg, #a855f7, #ec4899)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                ></motion.div>
                Progreso de XP
              </h3>
              
              <div className="space-y-6">
                {/* Nivel actual */}
                <div className="text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
                  >
                    {user?.level || 1}
                  </motion.div>
                  <div className="text-purple-200 text-lg font-semibold">Nivel Actual</div>
                </div>

                {/* Barra de XP */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-purple-200">
                    <span>XP: {user?.xp || 0}</span>
                    <span>Próximo: {nextLevelXP}</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-purple-900/30 rounded-full h-4 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full relative overflow-hidden"
                      >
                        <motion.div
                          animate={{ x: [-100, 100] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        ></motion.div>
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white drop-shadow-lg">
                        {progressPercentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recompensas de nivel */}
                <div className="bg-purple-900/20 rounded-2xl p-4 border border-purple-400/30">
                  <div className="text-purple-200 font-semibold mb-2">Recompensa de Nivel {user?.level || 1}</div>
                  <div className="text-purple-300 text-sm">
                    +{(user?.level || 1) * 50} puntos base + {(user?.level || 1) * 10} bonus
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Mejorado */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-8 shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-8 text-yellow-200 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="text-3xl"
                >
                  🏆
                </motion.div>
                Logros Recientes
              </h3>
              
              <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
                {recentAchievements.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="text-6xl mb-4">🎯</div>
                    <div className="text-yellow-200 text-lg">Sin logros aún</div>
                    <div className="text-yellow-300 text-sm">¡Completa objetivos para desbloquear logros!</div>
                  </motion.div>
                ) : (
                  recentAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 group/item"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl"
                      >
                        {achievement.icon}
                      </motion.div>
                      <div className="flex-1">
                        <div className="font-bold text-yellow-200 group-hover/item:text-yellow-100 transition-colors">
                          {achievement.name}
                        </div>
                        <div className="text-sm text-yellow-300">
                          {achievement.description}
                        </div>
                        <div className="text-xs text-yellow-400 mt-1">
                          +{achievement.points} puntos
                        </div>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                        className="text-yellow-400 font-bold"
                      >
                        +{achievement.points}
                      </motion.div>
                    </motion.div>
                  ))
                )}
              </div>
              
              {recentAchievements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 text-center"
                >
                  <Link 
                    to="/achievements" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold rounded-full hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
                  >
                    Ver Todos los Logros
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Vulnerability Breakdown Mejorado */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Severity Chart Mejorado */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border-2 border-red-400/50 rounded-3xl p-8 shadow-2xl hover:shadow-red-400/20 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-8 text-red-200 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  🎯
                </motion.div>
                Vulnerabilidades por Severidad
              </h3>
              <div className="space-y-6">
                {/* Crítica */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg"
                      ></motion.div>
                      <span className="text-red-200 font-semibold">Crítica</span>
                    </div>
                    <span className="font-bold text-red-400 text-xl">{userStats.criticalVulns}</span>
                  </div>
                  <div className="w-full bg-red-900/30 rounded-full h-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${userStats.criticalVulns > 0 ? (userStats.criticalVulns / Math.max(userStats.vulnerabilitiesFound, 1)) * 100 : 0}%` }}
                      transition={{ duration: 1, delay: 1 }}
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full shadow-lg"
                    ></motion.div>
                  </div>
                </div>

                {/* Alta */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg"
                      ></motion.div>
                      <span className="text-orange-200 font-semibold">Alta</span>
                    </div>
                    <span className="font-bold text-orange-400 text-xl">{userStats.highVulns}</span>
                  </div>
                  <div className="w-full bg-orange-900/30 rounded-full h-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${userStats.highVulns > 0 ? (userStats.highVulns / Math.max(userStats.vulnerabilitiesFound, 1)) * 100 : 0}%` }}
                      transition={{ duration: 1, delay: 1.2 }}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full shadow-lg"
                    ></motion.div>
                  </div>
                </div>

                {/* Media */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-lg"
                      ></motion.div>
                      <span className="text-yellow-200 font-semibold">Media</span>
                    </div>
                    <span className="font-bold text-yellow-400 text-xl">{userStats.mediumVulns}</span>
                  </div>
                  <div className="w-full bg-yellow-900/30 rounded-full h-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${userStats.mediumVulns > 0 ? (userStats.mediumVulns / Math.max(userStats.vulnerabilitiesFound, 1)) * 100 : 0}%` }}
                      transition={{ duration: 1, delay: 1.4 }}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full shadow-lg"
                    ></motion.div>
                  </div>
                </div>

                {/* Baja */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                        className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg"
                      ></motion.div>
                      <span className="text-green-200 font-semibold">Baja</span>
                    </div>
                    <span className="font-bold text-green-400 text-xl">{userStats.lowVulns}</span>
                  </div>
                  <div className="w-full bg-green-900/30 rounded-full h-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${userStats.lowVulns > 0 ? (userStats.lowVulns / Math.max(userStats.vulnerabilitiesFound, 1)) * 100 : 0}%` }}
                      transition={{ duration: 1, delay: 1.6 }}
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full shadow-lg"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Mejorado */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border-2 border-blue-400/50 rounded-3xl p-8 shadow-2xl hover:shadow-blue-400/20 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-8 text-blue-200 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  📊
                </motion.div>
                Actividad Reciente
              </h3>
              <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
                {activityLog.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="text-6xl mb-4">😴</div>
                    <div className="text-blue-200 text-lg">Sin actividad reciente</div>
                    <div className="text-blue-300 text-sm">¡Comienza a explorar para ver tu actividad aquí!</div>
                  </motion.div>
                ) : (
                  activityLog.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 group/item"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className="text-2xl"
                        >
                          {activity.type === 'vulnerability'
                            ? '🔍'
                            : activity.type === 'reward'
                              ? '🎁'
                              : activity.type === 'achievement'
                                ? '🏆'
                                : '📋'}
                        </motion.div>
                        <div>
                          <div className="font-medium text-blue-200 group-hover/item:text-blue-100 transition-colors">
                            {activity.description || activity.title}
                          </div>
                          <div className="text-sm text-blue-300">
                            {activity.date}
                          </div>
                        </div>
                      </div>
                      {typeof activity.points === 'number' && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                          className={`font-bold text-lg px-3 py-1 rounded-full ${
                            activity.points > 0 
                              ? 'bg-green-900/50 text-green-300 border border-green-400/50' 
                              : 'bg-red-900/50 text-red-300 border border-red-400/50'
                          }`}
                        >
                          {activity.points > 0 ? '+' : ''}{activity.points}
                        </motion.span>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>

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
          isOpen={showModal}
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
                  <tr key={user._id} className="text-center text-lg font-bold text-cyan-100 border-b border-cyan-800 hover:bg-cyan-900/20 transition-all">
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full font-extrabold text-lg border-2 neon-shadow ${user.rank === 1 ? 'bg-yellow-400 text-yellow-900 border-yellow-300 animate-bounce' : user.rank === 2 ? 'bg-gray-300 text-gray-900 border-gray-200' : user.rank === 3 ? 'bg-orange-400 text-orange-900 border-orange-300' : 'bg-cyan-800 text-cyan-200 border-cyan-400'}`}>{user.rank}</span>
                    </td>
                    <td className="py-3 px-4">
                      <img 
                        src={user.avatar} 
                        alt={user.username} 
                        className="w-12 h-12 rounded-full border-2 border-cyan-400 neon-shadow mx-auto cursor-pointer hover:scale-110 transition-all duration-200" 
                        onClick={() => handleProfileClick(user)}
                      />
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
            {clanesDestacados.map((clan) => (
              <motion.div 
                key={clan.id} 
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClanClick(clan)}
                className="flex flex-col items-center bg-black/70 border-2 border-green-400 neon-shadow rounded-2xl p-6 w-full max-w-xs cursor-pointer transition-all duration-300 hover:shadow-green-400/50 group"
              >
                <div className="relative">
                  <img src={clan.logo || 'https://robohash.org/' + clan.name} alt={clan.name} className="w-20 h-20 rounded-full border-2 border-green-400 mb-4 neon-shadow group-hover:scale-110 transition-all duration-300" />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-black">
                    {clan.members?.length || 0}
                  </div>
                </div>
                <div className="text-xl font-bold text-green-200 mb-2 drop-shadow-cyber text-center">{clan.name}</div>
                <div className="text-sm text-green-100 mb-3 text-center">Miembros: <span className="font-bold">{clan.members?.length || 0}</span></div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 border border-green-400 rounded-lg text-green-100 font-bold hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-cyber"
                >
                  Ver Clan
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal de Detalles del Clan */}
        {showClanModal && selectedClan && (
          <Modal isOpen={showClanModal} onClose={handleCloseClanModal}>
            <button onClick={handleCloseClanModal} className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl">&times;</button>
            {/* Información del Clan */}
            <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={selectedClan.logo || 'https://robohash.org/' + selectedClan.name} 
                  alt={selectedClan.name} 
                  className="w-16 h-16 rounded-full border-2 border-green-400" 
                />
                <div>
                  <h3 className="text-2xl font-bold text-green-200">{selectedClan.name}</h3>
                  <p className="text-green-100">Miembros: {selectedClan.members?.length || 0}</p>
                </div>
              </div>
              <p className="text-green-100 text-sm">{selectedClan.description || 'Sin descripción disponible'}</p>
            </div>
            {/* Lista de Miembros */}
            <div>
              <h4 className="text-xl font-bold text-cyan-200 mb-4">Miembros del Clan</h4>
              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {getClanMembersInfo(selectedClan, allUsers).map((member, index) => (
                  <div
                    key={member.id}
                    className="bg-black/50 border border-cyan-400/30 rounded-lg p-4 hover:bg-cyan-900/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={member.avatar} 
                          alt={member.username} 
                          className="w-12 h-12 rounded-full border-2 border-cyan-400" 
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border border-black"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-cyan-200">{member.username}</span>
                          <span className="text-xs bg-cyan-600 text-cyan-100 px-2 py-1 rounded-full">Nivel {member.level}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-yellow-300">💎 {member.points} pts</span>
                          <span className="text-green-300">🛡️ Miembro</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-cyan-400/20">
                      <p className="text-sm text-cyan-100 italic">"{member.bio}"</p>
                    </div>
                  </div>
                ))}
                {getClanMembersInfo(selectedClan, allUsers).length === 0 && (
                  <div className="text-center py-8 text-cyan-300">
                    <div className="text-4xl mb-2">🛡️</div>
                    <p>Este clan aún no tiene miembros</p>
                  </div>
                )}
              </div>
            </div>
            {/* Botones de Acción */}
            <div className="flex gap-3 pt-4 border-t border-cyan-400/20">
              <button
                onClick={handleCloseClanModal}
                className="flex-1 bg-cyan-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  handleCloseClanModal();
                  // Aquí se podría navegar a la página de clanes
                }}
                className="flex-1 bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Ver Página del Clan
              </button>
            </div>
          </Modal>
        )}

        {/* Modal de Perfil de Usuario */}
        <Modal
          isOpen={showProfileModal}
          onClose={handleCloseProfileModal}
          title={selectedProfile ? `Perfil de ${selectedProfile.username}` : ''}
        >
          {selectedProfile && (
            <div className="flex flex-col items-center gap-4">
              <img src={selectedProfile.avatar} alt={selectedProfile.username} className="w-24 h-24 rounded-full border-4 border-cyan-400 neon-shadow mb-2" />
              <div className="text-2xl font-bold text-cyan-200">{selectedProfile.username}</div>
              <div className="flex gap-4 text-lg">
                <span className="text-yellow-300">💎 {selectedProfile.points} pts</span>
                <span className="text-cyan-300">🏅 Nivel {(selectedProfile as any).level}</span>
              </div>
              <div className="text-cyan-100 text-center italic text-base mb-2">{(selectedProfile as any).bio}</div>
              {/* Logros recientes si existen */}
              {selectedProfile.achievements && selectedProfile.achievements.length > 0 && (
                <div className="w-full">
                  <div className="text-cyan-200 font-bold mb-2 text-center">Logros recientes</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedProfile.achievements.slice(-5).map((ach: any) => (
                      <div key={ach.id} className="bg-cyan-900/60 border border-cyan-400 rounded-lg px-3 py-1 text-cyan-100 text-sm flex items-center gap-2">
                        <span className="text-lg">{ach.icon || '🏆'}</span> {ach.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={handleCloseProfileModal}
                className="mt-4 bg-cyan-600 text-white font-bold px-6 py-2 rounded-full hover:bg-cyan-700 transition"
              >
                Cerrar
              </button>
            </div>
          )}
        </Modal>
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
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Dashboard; 
