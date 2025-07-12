import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/ui/Modal';
import ConfettiBlast from '../components/ui/ConfettiBlast';
import { getUsers, getGulagParticipants, joinGulag, leaveGulag, getGulagHistory } from '../localDb';

interface GulagParticipant {
  id: string;
  username: string;
  points: number;
  rank: number;
  joinDate: string;
  status: 'active' | 'eliminated' | 'winner';
  eliminationDate?: string;
  eliminationReason?: string;
}

interface GulagMatch {
  id: string;
  participants: string[];
  winner: string;
  loser: string;
  date: string;
  duration: number;
  type: 'duel' | 'battle_royale';
}

const Gulag: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [participants, setParticipants] = useState<GulagParticipant[]>([]);
  const [gulagHistory, setGulagHistory] = useState<GulagMatch[]>([]);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedView, setSelectedView] = useState<'current' | 'history'>('current');

  useEffect(() => {
    loadGulagData();
  }, []);

  const loadGulagData = async () => {
    try {
      const [currentParticipants, history] = await Promise.all([
        getGulagParticipants(),
        getGulagHistory()
      ]);
      setParticipants(currentParticipants);
      setGulagHistory(history);
    } catch (error) {
      console.error('Error loading gulag data:', error);
      showToast('Error al cargar datos del Gulag', 'error');
    }
  };

  const handleJoinGulag = async () => {
    if (!user) {
      showToast('Debes iniciar sesión para unirte al Gulag', 'error');
      return;
    }

    try {
      await joinGulag(user.id);
      showToast('¡Te has unido al Gulag! Prepárate para la batalla...', 'success');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      loadGulagData();
    } catch (error) {
      showToast('Error al unirse al Gulag', 'error');
    }
  };

  const handleLeaveGulag = async () => {
    if (!user) return;

    try {
      await leaveGulag(user.id);
      showToast('Has abandonado el Gulag', 'info');
      loadGulagData();
    } catch (error) {
      showToast('Error al abandonar el Gulag', 'error');
    }
  };

  const isUserInGulag = () => {
    return user ? participants.some(p => p.id === user.id && p.status === 'active') : false;
  };

  const getUserRank = () => {
    if (!user) return null;
    const participant = participants.find(p => p.id === user.id);
    return participant?.rank || null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'from-green-400 to-green-600';
      case 'eliminated': return 'from-red-400 to-red-600';
      case 'winner': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '⚔️';
      case 'eliminated': return '💀';
      case 'winner': return '👑';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white relative overflow-x-hidden">
      {/* Efecto de partículas/fondo cyberpunk */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#ff0000" stopOpacity="0.3" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-orange-900/20 to-red-900/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border-2 border-red-400/50 rounded-3xl p-8 shadow-2xl">
              <motion.div
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(255, 0, 0, 0.5)",
                    "0 0 40px rgba(255, 0, 0, 0.8)",
                    "0 0 20px rgba(255, 0, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                ⚔️
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-extrabold mb-4 tracking-widest bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
              >
                EL GULAG
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-red-200 max-w-3xl mx-auto"
              >
                La arena definitiva donde solo los más fuertes sobreviven. ¿Tienes lo que se necesita?
              </motion.p>
            </div>
          </div>
        </motion.header>

        {/* Estadísticas del Gulag */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {/* Participantes Activos */}
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
                ⚔️
              </motion.div>
              <div className="text-3xl font-bold text-green-400 mb-1">
                {participants.filter(p => p.status === 'active').length}
              </div>
              <div className="text-green-200 text-sm">Participantes Activos</div>
            </div>
          </motion.div>

          {/* Eliminados */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-red-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-4xl mb-2"
              >
                💀
              </motion.div>
              <div className="text-3xl font-bold text-red-400 mb-1">
                {participants.filter(p => p.status === 'eliminated').length}
              </div>
              <div className="text-red-200 text-sm">Eliminados</div>
            </div>
          </motion.div>

          {/* Ganadores */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                👑
              </motion.div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                {participants.filter(p => p.status === 'winner').length}
              </div>
              <div className="text-yellow-200 text-sm">Ganadores</div>
            </div>
          </motion.div>

          {/* Tu Posición */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                🎯
              </motion.div>
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {getUserRank() || 'N/A'}
              </div>
              <div className="text-purple-200 text-sm">Tu Posición</div>
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
          {/* Botón Unirse/Abandonar */}
          {isUserInGulag() ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLeaveGulag}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 px-8 rounded-2xl border-2 border-red-400/50 shadow-2xl hover:shadow-red-400/30 transition-all duration-300">
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    🏃
                  </motion.div>
                  Abandonar Gulag
                </span>
              </div>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinGulag}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-8 rounded-2xl border-2 border-green-400/50 shadow-2xl hover:shadow-green-400/30 transition-all duration-300">
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚔️
                  </motion.div>
                  Unirse al Gulag
                </span>
              </div>
            </motion.button>
          )}

          {/* Botón Reglas */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRulesModal(true)}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-2xl border-2 border-blue-400/50 shadow-2xl hover:shadow-blue-400/30 transition-all duration-300">
              <span className="flex items-center gap-2">
                📖
                Ver Reglas
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
          <div className="bg-black/40 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-2">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedView('current')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedView === 'current'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                    : 'text-cyan-200 hover:text-cyan-100'
                }`}
              >
                Participantes Actuales
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedView('history')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedView === 'history'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                    : 'text-cyan-200 hover:text-cyan-100'
                }`}
              >
                Historial de Batallas
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Contenido Principal */}
        <AnimatePresence mode="wait">
          {selectedView === 'current' ? (
            <motion.div
              key="current"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {participants.map((participant, index) => (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(participant.status)} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300`}></div>
                  
                  <div className="relative bg-black/80 backdrop-blur-xl border-2 border-cyan-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-cyan-400/30 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ 
                            scale: participant.status === 'active' ? [1, 1.1, 1] : 1,
                            rotate: participant.status === 'eliminated' ? 360 : 0
                          }}
                          transition={{ 
                            duration: participant.status === 'active' ? 2 : 3, 
                            repeat: participant.status === 'active' ? Infinity : 0,
                            ease: participant.status === 'eliminated' ? "linear" : "easeInOut"
                          }}
                          className="text-3xl"
                        >
                          {getStatusIcon(participant.status)}
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold text-cyan-200 group-hover:text-cyan-100 transition-colors">
                            {participant.username}
                          </h3>
                          <div className="text-sm text-gray-400">Rank #{participant.rank}</div>
                        </div>
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Puntos:</span>
                        <span className="text-cyan-400 font-bold">{participant.points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Estado:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getStatusColor(participant.status)} text-white`}>
                          {participant.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Unido:</span>
                        <span className="text-blue-200 text-sm">
                          {new Date(participant.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Información adicional para eliminados */}
                    {participant.status === 'eliminated' && participant.eliminationDate && (
                      <div className="mt-4 p-3 bg-red-900/30 rounded-xl border border-red-400/30">
                        <div className="text-sm text-red-200">
                          <div>Eliminado: {new Date(participant.eliminationDate).toLocaleDateString()}</div>
                          {participant.eliminationReason && (
                            <div className="text-xs text-red-300 mt-1">
                              Razón: {participant.eliminationReason}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {gulagHistory.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                  
                  <div className="relative bg-black/60 backdrop-blur-xl border-2 border-purple-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-purple-400/30 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-4xl"
                        >
                          ⚔️
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-purple-200 mb-2">
                            Batalla #{match.id.slice(-4)}
                          </h3>
                          <div className="text-sm text-purple-300">
                            {match.type === 'duel' ? 'Duelo' : 'Batalla Real'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Duración</div>
                        <div className="text-lg font-bold text-purple-400">{match.duration} min</div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Ganador</div>
                        <div className="text-lg font-bold text-green-400">👑 {match.winner}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Perdedor</div>
                        <div className="text-lg font-bold text-red-400">💀 {match.loser}</div>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <div className="text-sm text-gray-400">
                        {new Date(match.date).toLocaleDateString()} - {new Date(match.date).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {gulagHistory.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-8xl mb-6">⚔️</div>
                  <h3 className="text-2xl font-bold text-purple-200 mb-4">No hay batallas registradas</h3>
                  <p className="text-gray-400">¡Sé el primero en iniciar una batalla épica!</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de Reglas */}
      <Modal
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
        title="Reglas del Gulag"
      >
        <div className="space-y-6 text-left">
          <div className="bg-red-900/20 rounded-2xl p-4 border border-red-400/30">
            <h3 className="text-lg font-bold text-red-200 mb-3">⚔️ Reglas de Combate</h3>
            <ul className="space-y-2 text-red-100">
              <li>• Solo los 5 usuarios con menos puntos pueden unirse</li>
              <li>• Los participantes luchan en duelos 1v1</li>
              <li>• El perdedor es eliminado permanentemente</li>
              <li>• El ganador recibe puntos del perdedor</li>
              <li>• El último sobreviviente gana el Gulag</li>
            </ul>
          </div>

          <div className="bg-yellow-900/20 rounded-2xl p-4 border border-yellow-400/30">
            <h3 className="text-lg font-bold text-yellow-200 mb-3">🏆 Recompensas</h3>
            <ul className="space-y-2 text-yellow-100">
              <li>• Ganador: +1000 puntos + Insignia "Gulag Champion"</li>
              <li>• Finalista: +500 puntos + Insignia "Gulag Survivor"</li>
              <li>• Participantes: +100 puntos por cada eliminación</li>
            </ul>
          </div>

          <div className="bg-blue-900/20 rounded-2xl p-4 border border-blue-400/30">
            <h3 className="text-lg font-bold text-blue-200 mb-3">⚠️ Advertencias</h3>
            <ul className="space-y-2 text-blue-100">
              <li>• Una vez eliminado, no puedes volver a unirte</li>
              <li>• Los duelos son automáticos cada 24 horas</li>
              <li>• No hay pausas ni interrupciones</li>
              <li>• El Gulag es para siempre</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Confetti */}
      {showConfetti && <ConfettiBlast />}
    </div>
  );
};

export default Gulag;
