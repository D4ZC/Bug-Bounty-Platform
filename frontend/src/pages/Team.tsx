import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/ui/Modal';
import ConfettiBlast from '../components/ui/ConfettiBlast';
import {
  getAllClans,
  saveClanGlobal,
  updateClanGlobal,
  findClanByName,
  getUsers,
  Clan,
  User
} from '../localDb';

const Team: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [clans, setClans] = useState<Clan[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedClan, setSelectedClan] = useState<Clan | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Formulario para crear clan
  const [newClan, setNewClan] = useState({
    name: '',
    description: '',
    maxMembers: 10,
    minPoints: 0,
    minLevel: 1,
    inviteOnly: false
  });

  // Formulario para unirse a clan
  const [joinClanId, setJoinClanId] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [allClans, allUsers] = await Promise.all([
        getAllClans(),
        getUsers()
      ]);
      setClans(allClans);
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('Error al cargar datos', 'error');
    }
  };

  const handleCreateClan = async () => {
    if (!user) {
      showToast('Debes iniciar sesión para crear un clan', 'error');
      return;
    }

    try {
      const clanData = {
        ...newClan,
        leader: user._id,
        members: [user._id],
        points: 0,
        level: 1,
        achievements: [],
        joinDate: new Date().toISOString(),
        stats: {
          totalVulnerabilities: 0,
          totalAchievements: 0,
          averageAccuracy: 0,
          winRate: 0
        }
      };

      await saveClanGlobal(clanData);
      showToast('¡Clan creado exitosamente!', 'success');
      setShowCreateModal(false);
      setNewClan({
        name: '',
        description: '',
        maxMembers: 10,
        minPoints: 0,
        minLevel: 1,
        inviteOnly: false
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      loadData();
    } catch (error) {
      showToast('Error al crear el clan', 'error');
    }
  };

  const handleJoinClan = async () => {
    if (!user) {
      showToast('Debes iniciar sesión para unirte a un clan', 'error');
      return;
    }

    try {
      await updateClanGlobal(selectedClan!._id, { $push: { members: user._id } });
      showToast('¡Te has unido al clan!', 'success');
      setShowJoinModal(false);
      setJoinClanId('');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      loadData();
    } catch (error) {
      showToast('Error al unirse al clan', 'error');
    }
  };

  const handleLeaveClan = async (clanId: string) => {
    if (!user) return;

    try {
      await updateClanGlobal(clanId, { $pull: { members: user._id } });
      showToast('Has abandonado el clan', 'info');
      loadData();
    } catch (error) {
      showToast('Error al abandonar el clan', 'error');
    }
  };

  const getUserClan = () => {
    return user ? clans.find(clan => clan.members.includes(user._id)) : null;
  };

  const getUserById = (userId: string) => {
    return users.find(u => u._id === userId);
  };

  const getClanLevelColor = (level: number) => {
    if (level >= 10) return 'from-purple-400 to-purple-600';
    if (level >= 5) return 'from-blue-400 to-blue-600';
    if (level >= 3) return 'from-green-400 to-green-600';
    return 'from-gray-400 to-gray-600';
  };

  const getClanLevelIcon = (level: number) => {
    if (level >= 10) return '👑';
    if (level >= 5) return '⭐';
    if (level >= 3) return '🔥';
    return '⚡';
  };

  const filteredClans = clans.filter(clan => {
    const matchesSearch = clan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'available' && clan.members.length < clan.maxMembers) ||
                         (selectedFilter === 'full' && clan.members.length >= clan.maxMembers);
    return matchesSearch && matchesFilter;
  });

  const userClan = getUserClan();

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
        {/* Header Mejorado */}
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-green-900/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border-2 border-green-400/50 rounded-3xl p-8 shadow-2xl">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                🛡️
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-extrabold mb-4 tracking-widest bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent"
              >
                CLANES
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-green-200 max-w-3xl mx-auto"
              >
                Únete a un clan, forma alianzas estratégicas y domina la plataforma junto a tus compañeros
              </motion.p>
            </div>
          </div>
        </motion.header>

        {/* Tu Clan Actual */}
        {userClan && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              <div className="relative bg-black/60 backdrop-blur-xl border-2 border-green-400/50 rounded-3xl p-8 shadow-2xl hover:shadow-green-400/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-5xl"
                    >
                      {getClanLevelIcon(userClan.level)}
                    </motion.div>
                    <div>
                      <h2 className="text-3xl font-bold text-green-200 mb-2">{userClan.name}</h2>
                      <div className="text-green-300">Tu Clan Actual</div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLeaveClan(userClan._id)}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-6 py-3 rounded-2xl hover:from-red-500 hover:to-red-600 transition-all duration-300"
                  >
                    Abandonar Clan
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">💎</div>
                    <div className="text-lg text-cyan-200">{userClan.points}</div>
                    <div className="text-sm text-gray-400">Puntos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">👥</div>
                    <div className="text-lg text-purple-200">{userClan.members.length}/{userClan.maxMembers}</div>
                    <div className="text-sm text-gray-400">Miembros</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">🔍</div>
                    <div className="text-lg text-green-200">{userClan.stats.totalVulnerabilities}</div>
                    <div className="text-sm text-gray-400">Vulns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">🏆</div>
                    <div className="text-lg text-yellow-200">{userClan.stats.totalAchievements}</div>
                    <div className="text-sm text-gray-400">Logros</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-green-200 mb-3">Miembros del Clan</h3>
                    <div className="space-y-2">
                      {userClan.members.map((memberId, index) => {
                        const member = getUserById(memberId);
                        return (
                          <motion.div
                            key={memberId}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-green-900/20 rounded-xl border border-green-400/30"
                          >
                            <img 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member?.username || 'user'}`} 
                              alt="avatar" 
                              className="w-8 h-8 rounded-full border-2 border-green-400" 
                            />
                            <div>
                              <div className="font-bold text-green-200">{member?.username || 'Usuario'}</div>
                              <div className="text-sm text-green-300">{member?.points || 0} puntos</div>
                            </div>
                            {memberId === userClan.leader && (
                              <div className="ml-auto text-yellow-400 text-lg">👑</div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-green-200 mb-3">Estadísticas del Clan</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Precisión Promedio:</span>
                        <span className="text-blue-200">{userClan.stats.averageAccuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tasa de Victoria:</span>
                        <span className="text-green-200">{userClan.stats.winRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Nivel del Clan:</span>
                        <span className="text-yellow-200">{userClan.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fecha de Creación:</span>
                        <span className="text-purple-200">{new Date(userClan.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Controles */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Búsqueda */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-4">
              <input
                type="text"
                placeholder="Buscar clanes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white placeholder-cyan-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                🔍
              </div>
            </div>
          </div>

          {/* Filtro */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white"
              >
                <option value="all">Todos los clanes</option>
                <option value="available">Con espacio</option>
                <option value="full">Completos</option>
              </select>
            </div>
          </div>

          {/* Botón Crear Clan */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-2xl border-2 border-green-400/50 shadow-2xl hover:shadow-green-400/30 transition-all duration-300">
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡
                </motion.div>
                Crear Clan
              </span>
            </div>
          </motion.button>

          {/* Botón Unirse a Clan */}
          {!userClan && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowJoinModal(true)}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-2xl border-2 border-blue-400/50 shadow-2xl hover:shadow-blue-400/30 transition-all duration-300">
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🛡️
                  </motion.div>
                  Unirse a Clan
                </span>
              </div>
            </motion.button>
          )}
        </motion.div>

        {/* Grid de Clanes */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredClans.map((clan, index) => (
              <motion.div
                key={clan._id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getClanLevelColor(clan.level)} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300`}></div>
                
                <div className="relative bg-black/80 backdrop-blur-xl border-2 border-green-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-green-400/30 transition-all duration-300 h-full">
                  {/* Header del clan */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          animate={{ 
                            scale: clan.level >= 5 ? [1, 1.1, 1] : 1,
                            rotate: clan.level >= 10 ? 360 : 0
                          }}
                          transition={{ 
                            duration: clan.level >= 5 ? 2 : 1, 
                            repeat: clan.level >= 5 ? Infinity : 0,
                            ease: clan.level >= 10 ? "linear" : "easeInOut"
                          }}
                          className="text-3xl"
                        >
                          {getClanLevelIcon(clan.level)}
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-green-200 group-hover:text-green-100 transition-colors">
                            {clan.name}
                          </h3>
                          <div className="text-sm text-green-300">Nivel {clan.level}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                    {clan.description}
                  </p>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">💎</div>
                      <div className="text-sm text-cyan-200">{clan.points}</div>
                      <div className="text-xs text-gray-400">Puntos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">👥</div>
                      <div className="text-sm text-purple-200">{clan.members.length}/{clan.maxMembers}</div>
                      <div className="text-xs text-gray-400">Miembros</div>
                    </div>
                  </div>

                  {/* Requisitos */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Min. Puntos:</span>
                      <span className="text-blue-200">{clan.requirements.minPoints}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Min. Nivel:</span>
                      <span className="text-green-200">{clan.requirements.minLevel}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Tipo:</span>
                      <span className="text-yellow-200">
                        {clan.requirements.inviteOnly ? 'Solo Invitación' : 'Abierto'}
                      </span>
                    </div>
                  </div>

                  {/* Líder */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-400 mb-2">Líder del Clan</div>
                    <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-xl border border-green-400/30">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${getUserById(clan.leader)?.username || 'leader'}`} 
                        alt="leader" 
                        className="w-8 h-8 rounded-full border-2 border-yellow-400" 
                      />
                      <div>
                        <div className="font-bold text-yellow-200">{getUserById(clan.leader)?.username || 'Líder'}</div>
                        <div className="text-sm text-yellow-300">{getUserById(clan.leader)?.points || 0} puntos</div>
                      </div>
                      <div className="ml-auto text-yellow-400">👑</div>
                    </div>
                  </div>

                  {/* Botón de acción */}
                  {userClan?._id === clan._id ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 px-4 rounded-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 text-white"
                    >
                      Tu Clan
                    </motion.button>
                  ) : clan.members.length >= clan.maxMembers ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled
                      className="w-full py-3 px-4 rounded-2xl font-bold bg-gray-600 text-gray-400 cursor-not-allowed"
                    >
                      Clan Lleno
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedClan(clan);
                        setShowJoinModal(true);
                      }}
                      className="w-full py-3 px-4 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
                    >
                      Unirse al Clan
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mensaje cuando no hay clanes */}
        {filteredClans.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🛡️</div>
            <h3 className="text-2xl font-bold text-green-200 mb-4">No se encontraron clanes</h3>
            <p className="text-gray-400 mb-8">Intenta ajustar los filtros o crear un nuevo clan</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-8 py-4 rounded-2xl hover:from-green-500 hover:to-green-600 transition-all duration-300"
            >
              Crear Primer Clan
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Modal para crear clan */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Crear Nuevo Clan"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Nombre del Clan</label>
            <input
              type="text"
              value={newClan.name}
              onChange={(e) => setNewClan({...newClan, name: e.target.value})}
              className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
              placeholder="Nombre del clan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Descripción</label>
            <textarea
              value={newClan.description}
              onChange={(e) => setNewClan({...newClan, description: e.target.value})}
              className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none h-24"
              placeholder="Describe tu clan..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-200 mb-2">Máximo de Miembros</label>
              <input
                type="number"
                value={newClan.maxMembers}
                onChange={(e) => setNewClan({...newClan, maxMembers: parseInt(e.target.value)})}
                className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
                min="2"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-200 mb-2">Puntos Mínimos</label>
              <input
                type="number"
                value={newClan.minPoints}
                onChange={(e) => setNewClan({...newClan, minPoints: parseInt(e.target.value)})}
                className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-200 mb-2">Nivel Mínimo</label>
              <input
                type="number"
                value={newClan.minLevel}
                onChange={(e) => setNewClan({...newClan, minLevel: parseInt(e.target.value)})}
                className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
                min="1"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newClan.inviteOnly}
                onChange={(e) => setNewClan({...newClan, inviteOnly: e.target.checked})}
                className="mr-3"
              />
              <label className="text-sm text-green-200">Solo por invitación</label>
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateClan}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300"
            >
              Crear Clan
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(false)}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
            >
              Cancelar
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Modal para unirse a clan */}
      <Modal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Unirse a Clan"
      >
        <div className="space-y-6">
          {selectedClan ? (
            <div>
              <div className="bg-green-900/20 rounded-2xl p-4 border border-green-400/30 mb-4">
                <h3 className="text-lg font-bold text-green-200 mb-2">{selectedClan.name}</h3>
                <p className="text-green-300 text-sm mb-3">{selectedClan.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Miembros:</span>
                    <span className="text-green-200 ml-2">{selectedClan.members.length}/{selectedClan.maxMembers}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Puntos:</span>
                    <span className="text-green-200 ml-2">{selectedClan.points}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleJoinClan}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300"
                >
                  Unirse
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
                >
                  Cancelar
                </motion.button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-green-200 mb-2">ID del Clan</label>
              <input
                type="text"
                value={joinClanId}
                onChange={(e) => setJoinClanId(e.target.value)}
                className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
                placeholder="Ingresa el ID del clan"
              />
              
              <div className="flex gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleJoinClan}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300"
                >
                  Unirse
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
                >
                  Cancelar
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Confetti */}
      {showConfetti && <ConfettiBlast />}
    </div>
  );
};

export default Team;
