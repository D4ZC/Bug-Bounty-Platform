import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/ui/Modal';
import ConfettiBlast from '../components/ui/ConfettiBlast';
import { getAllChallenges, joinChallenge, leaveChallenge, createChallenge } from '../localDb';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  points: number;
  participants: string[];
  maxParticipants: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  category: string;
  requirements: string[];
  rewards: {
    points: number;
    achievements: string[];
    specialRewards: string[];
  };
}

const Challenges: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Formulario para crear desafío
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    difficulty: 'medium' as const,
    points: 100,
    maxParticipants: 10,
    startDate: '',
    endDate: '',
    category: 'web',
    requirements: [''],
    specialRewards: ['']
  });

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const allChallenges = await getAllChallenges();
      setChallenges(allChallenges);
    } catch (error) {
      console.error('Error loading challenges:', error);
      showToast('Error al cargar los desafíos', 'error');
    }
  };

  const handleJoinChallenge = async (challengeId: string) => {
    if (!user) {
      showToast('Debes iniciar sesión para unirte a un desafío', 'error');
      return;
    }

    try {
      await joinChallenge(challengeId, user.id);
      showToast('¡Te has unido al desafío!', 'success');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      loadChallenges();
    } catch (error) {
      showToast('Error al unirse al desafío', 'error');
    }
  };

  const handleLeaveChallenge = async (challengeId: string) => {
    if (!user) return;

    try {
      await leaveChallenge(challengeId, user.id);
      showToast('Has abandonado el desafío', 'info');
      loadChallenges();
    } catch (error) {
      showToast('Error al abandonar el desafío', 'error');
    }
  };

  const handleCreateChallenge = async () => {
    if (!user) {
      showToast('Debes iniciar sesión para crear un desafío', 'error');
      return;
    }

    try {
      const challengeData = {
        ...newChallenge,
        requirements: newChallenge.requirements.filter(req => req.trim()),
        specialRewards: newChallenge.specialRewards.filter(reward => reward.trim()),
        participants: [],
        status: 'upcoming' as const,
        rewards: {
          points: newChallenge.points,
          achievements: [],
          specialRewards: newChallenge.specialRewards.filter(reward => reward.trim())
        }
      };

      await createChallenge(challengeData);
      showToast('¡Desafío creado exitosamente!', 'success');
      setShowCreateModal(false);
      setNewChallenge({
        title: '',
        description: '',
        difficulty: 'medium',
        points: 100,
        maxParticipants: 10,
        startDate: '',
        endDate: '',
        category: 'web',
        requirements: [''],
        specialRewards: ['']
      });
      loadChallenges();
    } catch (error) {
      showToast('Error al crear el desafío', 'error');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-green-600';
      case 'medium': return 'from-yellow-400 to-yellow-600';
      case 'hard': return 'from-orange-400 to-orange-600';
      case 'extreme': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🟠';
      case 'extreme': return '🔴';
      default: return '⚪';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'from-blue-400 to-blue-600';
      case 'active': return 'from-green-400 to-green-600';
      case 'completed': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === 'all' || challenge.status === selectedStatus;
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesStatus && matchesSearch;
  });

  const isUserParticipating = (challenge: Challenge) => {
    return user ? challenge.participants.includes(user.id) : false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white relative overflow-x-hidden">
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
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border-2 border-cyan-400/50 rounded-3xl p-8 shadow-2xl">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-extrabold mb-4 tracking-widest bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                DESAFÍOS
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-cyan-200 max-w-3xl mx-auto"
              >
                Enfréntate a retos épicos, demuestra tus habilidades y gana recompensas legendarias
              </motion.p>
            </div>
          </div>
        </motion.header>

        {/* Controles y Filtros Mejorados */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Búsqueda */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-4">
                <input
                  type="text"
                  placeholder="Buscar desafíos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white placeholder-cyan-300"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Filtro de Dificultad */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-4">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white"
                >
                  <option value="all">Todas las dificultades</option>
                  <option value="easy">Fácil</option>
                  <option value="medium">Medio</option>
                  <option value="hard">Difícil</option>
                  <option value="extreme">Extremo</option>
                </select>
              </div>
            </div>

            {/* Filtro de Estado */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white"
                >
                  <option value="all">Todos los estados</option>
                  <option value="upcoming">Próximos</option>
                  <option value="active">Activos</option>
                  <option value="completed">Completados</option>
                </select>
              </div>
            </div>

            {/* Botón Crear Desafío */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl border-2 border-pink-400/50 shadow-2xl hover:shadow-pink-400/30 transition-all duration-300">
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⚡
                  </motion.div>
                  Crear Desafío
                </span>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Grid de Desafíos Mejorado */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                {/* Fondo con gradiente dinámico */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getDifficultyColor(challenge.difficulty)} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300`}></div>
                
                <div className="relative bg-black/80 backdrop-blur-xl border-2 border-cyan-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-cyan-400/30 transition-all duration-300 h-full">
                  {/* Header del desafío */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-cyan-200 mb-2 group-hover:text-cyan-100 transition-colors">
                        {challenge.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-2xl ${getDifficultyIcon(challenge.difficulty)}`}></span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)} text-white`}>
                          {challenge.difficulty.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getStatusColor(challenge.status)} text-white`}>
                          {challenge.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                    {challenge.description}
                  </p>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">💎</div>
                      <div className="text-sm text-cyan-200">{challenge.points}</div>
                      <div className="text-xs text-gray-400">Puntos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">👥</div>
                      <div className="text-sm text-purple-200">{challenge.participants.length}/{challenge.maxParticipants}</div>
                      <div className="text-xs text-gray-400">Participantes</div>
                    </div>
                  </div>

                  {/* Fechas */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Inicio:</span>
                      <span className="text-blue-200">{new Date(challenge.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Fin:</span>
                      <span className="text-red-200">{new Date(challenge.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => isUserParticipating(challenge) 
                      ? handleLeaveChallenge(challenge.id)
                      : handleJoinChallenge(challenge.id)
                    }
                    disabled={challenge.participants.length >= challenge.maxParticipants && !isUserParticipating(challenge)}
                    className={`w-full py-3 px-4 rounded-2xl font-bold transition-all duration-300 ${
                      isUserParticipating(challenge)
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600'
                        : challenge.participants.length >= challenge.maxParticipants
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500'
                    }`}
                  >
                    {isUserParticipating(challenge) 
                      ? 'Abandonar Desafío' 
                      : challenge.participants.length >= challenge.maxParticipants
                      ? 'Desafío Lleno'
                      : 'Unirse al Desafío'
                    }
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mensaje cuando no hay desafíos */}
        {filteredChallenges.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🎯</div>
            <h3 className="text-2xl font-bold text-cyan-200 mb-4">No se encontraron desafíos</h3>
            <p className="text-gray-400 mb-8">Intenta ajustar los filtros o crear un nuevo desafío</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
            >
              Crear Primer Desafío
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Modal para crear desafío */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Crear Nuevo Desafío"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-cyan-200 mb-2">Título</label>
            <input
              type="text"
              value={newChallenge.title}
              onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
              className="w-full bg-black/60 border-2 border-cyan-400/50 rounded-xl p-3 text-white focus:border-cyan-400 outline-none"
              placeholder="Nombre del desafío"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-200 mb-2">Descripción</label>
            <textarea
              value={newChallenge.description}
              onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
              className="w-full bg-black/60 border-2 border-cyan-400/50 rounded-xl p-3 text-white focus:border-cyan-400 outline-none h-24"
              placeholder="Describe el desafío..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cyan-200 mb-2">Dificultad</label>
              <select
                value={newChallenge.difficulty}
                onChange={(e) => setNewChallenge({...newChallenge, difficulty: e.target.value as any})}
                className="w-full bg-black/60 border-2 border-cyan-400/50 rounded-xl p-3 text-white focus:border-cyan-400 outline-none"
              >
                <option value="easy">Fácil</option>
                <option value="medium">Medio</option>
                <option value="hard">Difícil</option>
                <option value="extreme">Extremo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-200 mb-2">Puntos</label>
              <input
                type="number"
                value={newChallenge.points}
                onChange={(e) => setNewChallenge({...newChallenge, points: parseInt(e.target.value)})}
                className="w-full bg-black/60 border-2 border-cyan-400/50 rounded-xl p-3 text-white focus:border-cyan-400 outline-none"
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cyan-200 mb-2">Fecha de Inicio</label>
              <input
                type="datetime-local"
                value={newChallenge.startDate}
                onChange={(e) => setNewChallenge({...newChallenge, startDate: e.target.value})}
                className="w-full bg-black/60 border-2 border-cyan-400/50 rounded-xl p-3 text-white focus:border-cyan-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-200 mb-2">Fecha de Fin</label>
              <input
                type="datetime-local"
                value={newChallenge.endDate}
                onChange={(e) => setNewChallenge({...newChallenge, endDate: e.target.value})}
                className="w-full bg-black/60 border-2 border-cyan-400/50 rounded-xl p-3 text-white focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-200 mb-2">Máximo de Participantes</label>
            <input
              type="number"
              value={newChallenge.maxParticipants}
              onChange={(e) => setNewChallenge({...newChallenge, maxParticipants: parseInt(e.target.value)})}
              className="w-full bg-black/60 border-2 border-cyan-400/50 rounded-xl p-3 text-white focus:border-cyan-400 outline-none"
              min="1"
              max="100"
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateChallenge}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
            >
              Crear Desafío
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

      {/* Confetti */}
      {showConfetti && <ConfettiBlast />}
    </div>
  );
};

export default Challenges;
