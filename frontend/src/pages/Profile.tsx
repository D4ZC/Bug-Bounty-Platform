import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/ui/Modal';
import ConfettiBlast from '../components/ui/ConfettiBlast';
import {
  updateUser,
  getVulnerabilitiesByUser,
  getPurchasesByUser,
  getAchievementsByUser,
  Vulnerability,
  Purchase,
  Achievement
} from '../localDb';

const Profile: React.FC = () => {
  const { showToast } = useToast();
  const { user, updateUser: updateAuthUser } = useAuth();
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'vulnerabilities' | 'purchases' | 'achievements'>('overview');

  // Formulario de edición
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      const [userVulns, userPurchases, userAchievements] = await Promise.all([
        getVulnerabilitiesByUser(user._id),
        getPurchasesByUser(user._id),
        getAchievementsByUser(user._id)
      ]);
      setVulnerabilities(userVulns);
      setPurchases(userPurchases);
      setAchievements(userAchievements);
    } catch (error) {
      console.error('Error loading user data:', error);
      showToast('Error al cargar datos del usuario', 'error');
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const updatedUser = {
        ...user,
        ...editForm
      };

      await updateUser(updatedUser);
      updateAuthUser(updatedUser);
      showToast('Perfil actualizado exitosamente', 'success');
      setShowEditModal(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } catch (error) {
      showToast('Error al actualizar el perfil', 'error');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-400 to-red-600';
      case 'high': return 'from-orange-400 to-orange-600';
      case 'medium': return 'from-yellow-400 to-yellow-600';
      case 'low': return 'from-green-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'from-green-400 to-green-600';
      case 'rejected': return 'from-red-400 to-red-600';
      case 'pending': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return '✅';
      case 'rejected': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weapons': return '⚔️';
      case 'armor': return '🛡️';
      case 'consumables': return '🧪';
      case 'cosmetics': return '🎨';
      case 'tools': return '🔧';
      default: return '📦';
    }
  };

  const totalPoints = vulnerabilities
    .filter(v => v.status === 'accepted')
    .reduce((sum, v) => sum + v.points, 0);

  const totalSpent = purchases.reduce((sum, p) => sum + p.totalPrice, 0);

  const acceptedVulns = vulnerabilities.filter(v => v.status === 'accepted').length;
  const pendingVulns = vulnerabilities.filter(v => v.status === 'pending').length;
  const rejectedVulns = vulnerabilities.filter(v => v.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white relative overflow-x-hidden">
      {/* Efecto de partículas/fondo cyberpunk */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="80%" cy="20%" r="400" fill="url(#cyberpunk-glow)" />
          <circle cx="20%" cy="80%" r="300" fill="url(#cyberpunk-glow)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 relative z-10">
        {/* Header del Perfil */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-green-900/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border-2 border-green-400/50 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'user'}`} 
                    alt="avatar" 
                    className="relative w-32 h-32 rounded-full border-4 border-green-400 shadow-2xl group-hover:scale-110 transition-all duration-300" 
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                </div>

                {/* Información del usuario */}
                <div className="flex-1 text-center md:text-left">
                  <motion.h1 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent"
                  >
                    {user?.username || 'Usuario'}
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg text-green-200 mb-6"
                  >
                    Sin descripción
                  </motion.p>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2 rounded-full text-lg font-bold border-2 border-cyan-400 shadow-lg"
                    >
                      💎 {user?.points || 0} Puntos
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full text-lg font-bold border-2 border-purple-400 shadow-lg"
                    >
                      🏆 #{user?.rank || 999} Global
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-2 rounded-full text-lg font-bold border-2 border-yellow-400 shadow-lg"
                    >
                      ⭐ Nivel {user?.level || 1}
                    </motion.div>
                  </div>
                </div>

                {/* Botón Editar */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEditModal(true)}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-8 py-4 rounded-2xl border-2 border-green-400/50 shadow-2xl hover:shadow-green-400/30 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    ✏️
                    Editar Perfil
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Estadísticas Rápidas */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {/* Vulnerabilidades Encontradas */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                🔍
              </motion.div>
              <div className="text-3xl font-bold text-green-400 mb-1">
                {vulnerabilities.length}
              </div>
              <div className="text-green-200 text-sm">Vulnerabilidades</div>
            </div>
          </motion.div>

          {/* Puntos Ganados */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                💎
              </motion.div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">
                {totalPoints}
              </div>
              <div className="text-cyan-200 text-sm">Puntos Ganados</div>
            </div>
          </motion.div>

          {/* Compras Realizadas */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                🛍️
              </motion.div>
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {purchases.length}
              </div>
              <div className="text-purple-200 text-sm">Compras</div>
            </div>
          </motion.div>

          {/* Logros Desbloqueados */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-4xl mb-2"
              >
                🏆
              </motion.div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                {achievements.length}
              </div>
              <div className="text-yellow-200 text-sm">Logros</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs de Navegación */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-black/40 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-2">
            <div className="flex gap-2">
              {[
                { key: 'overview', label: 'Resumen', icon: '📊' },
                { key: 'vulnerabilities', label: 'Vulnerabilidades', icon: '🔍' },
                { key: 'purchases', label: 'Compras', icon: '🛍️' },
                { key: 'achievements', label: 'Logros', icon: '🏆' }
              ].map(tab => (
                <motion.button
                  key={tab.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    selectedTab === tab.key
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                      : 'text-green-200 hover:text-green-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contenido de las Tabs */}
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Estadísticas de Vulnerabilidades */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                <div className="relative bg-black/60 backdrop-blur-xl border-2 border-green-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-green-400/30 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-6 text-green-200 flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      📊
                    </motion.div>
                    Estadísticas de Vulnerabilidades
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-green-200">Aceptadas:</span>
                      <span className="text-green-400 font-bold">{acceptedVulns}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-200">Pendientes:</span>
                      <span className="text-yellow-400 font-bold">{pendingVulns}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-200">Rechazadas:</span>
                      <span className="text-red-400 font-bold">{rejectedVulns}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-200">Total Ganado:</span>
                      <span className="text-cyan-400 font-bold">{totalPoints} puntos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estadísticas de Compras */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                <div className="relative bg-black/60 backdrop-blur-xl border-2 border-purple-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-purple-400/30 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-6 text-purple-200 flex items-center gap-3">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🛍️
                    </motion.div>
                    Estadísticas de Compras
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Total Compras:</span>
                      <span className="text-purple-400 font-bold">{purchases.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Puntos Gastados:</span>
                      <span className="text-purple-400 font-bold">{totalSpent}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Promedio por Compra:</span>
                      <span className="text-purple-400 font-bold">
                        {purchases.length > 0 ? Math.round(totalSpent / purchases.length) : 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Última Compra:</span>
                      <span className="text-purple-400 font-bold">
                        {purchases.length > 0 ? new Date(purchases[purchases.length - 1].date).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'vulnerabilities' && (
            <motion.div
              key="vulnerabilities"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {vulnerabilities.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-green-200 mb-4">No hay vulnerabilidades reportadas</h3>
                  <p className="text-gray-400">¡Comienza a explorar para reportar tu primera vulnerabilidad!</p>
                </motion.div>
              ) : (
                vulnerabilities.map((vuln, index) => (
                  <motion.div
                    key={vuln.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${getSeverityColor(vuln.severity)} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300`}></div>
                    
                    <div className="relative bg-black/60 backdrop-blur-xl border-2 border-green-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-green-400/30 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-green-200 mb-2">{vuln.title}</h3>
                          <p className="text-gray-300 text-sm mb-3">{vuln.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ 
                              scale: vuln.status === 'accepted' ? [1, 1.1, 1] : 1,
                              rotate: vuln.status === 'rejected' ? [0, 10, -10, 0] : 0
                            }}
                            transition={{ 
                              duration: vuln.status === 'accepted' ? 2 : 1, 
                              repeat: vuln.status === 'accepted' ? Infinity : 0 
                            }}
                            className="text-3xl"
                          >
                            {getStatusIcon(vuln.status)}
                          </motion.div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-cyan-400">💎</div>
                          <div className="text-sm text-cyan-200">{vuln.points}</div>
                          <div className="text-xs text-gray-400">Puntos</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold px-3 py-1 rounded-full text-xs bg-gradient-to-r ${getSeverityColor(vuln.severity)} text-white`}>
                            {vuln.severity.toUpperCase()}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">Severidad</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold px-3 py-1 rounded-full text-xs bg-gradient-to-r ${getStatusColor(vuln.status)} text-white`}>
                            {vuln.status.toUpperCase()}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">Estado</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">📅</div>
                          <div className="text-sm text-blue-200">{new Date(vuln.date).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-400">Fecha</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {selectedTab === 'purchases' && (
            <motion.div
              key="purchases"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {purchases.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-8xl mb-6">🛍️</div>
                  <h3 className="text-2xl font-bold text-purple-200 mb-4">No hay compras registradas</h3>
                  <p className="text-gray-400">¡Visita la tienda para hacer tu primera compra!</p>
                </motion.div>
              ) : (
                purchases.map((purchase, index) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                    
                    <div className="relative bg-black/60 backdrop-blur-xl border-2 border-purple-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-purple-400/30 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-3xl"
                          >
                            {getCategoryIcon(purchase.product.category)}
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-purple-200">{purchase.product.name}</h3>
                            <div className="text-sm text-purple-300">{purchase.product.category}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-400">{purchase.totalPrice} 💎</div>
                          <div className="text-sm text-purple-300">{purchase.quantity}x</div>
                          <div className="text-xs text-gray-400">{new Date(purchase.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {selectedTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {achievements.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="text-8xl mb-6">🏆</div>
                  <h3 className="text-2xl font-bold text-yellow-200 mb-4">No hay logros desbloqueados</h3>
                  <p className="text-gray-400">¡Completa objetivos para desbloquear logros!</p>
                </motion.div>
              ) : (
                achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                    
                    <div className="relative bg-black/60 backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 h-full">
                      <div className="text-center">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="text-5xl mb-4"
                        >
                          {achievement.icon}
                        </motion.div>
                        
                        <h3 className="text-lg font-bold text-yellow-200 mb-2">{achievement.name}</h3>
                        <p className="text-yellow-300 text-sm mb-4">{achievement.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Puntos:</span>
                            <span className="text-yellow-400 font-bold">+{achievement.points}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Fecha:</span>
                            <span className="text-blue-200">{new Date(achievement.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de Edición */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Perfil"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Nombre de Usuario</label>
            <input
              type="text"
              value={editForm.username}
              onChange={(e) => setEditForm({...editForm, username: e.target.value})}
              className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
              placeholder="Tu nombre de usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Email</label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
              className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Biografía</label>
            <textarea
              value={editForm.bio}
              onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
              className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none h-24"
              placeholder="Cuéntanos sobre ti..."
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveProfile}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300"
            >
              Guardar Cambios
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEditModal(false)}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
            >
              Cancelar
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Confetti */}
      {showConfetti && <ConfettiBlast />}
    </div>
  );
};

export default Profile;
