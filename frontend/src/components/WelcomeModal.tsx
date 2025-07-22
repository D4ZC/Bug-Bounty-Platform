import React from 'react';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes, FaRocket, FaShieldAlt, FaTrophy, FaUsers } from 'react-icons/fa';

interface WelcomeModalProps {
  isVisible: boolean;
  onStartTutorial: () => void;
  onSkipTutorial: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ 
  isVisible, 
  onStartTutorial, 
  onSkipTutorial 
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isVisible) {
      // Crea el audio solo si no existe
      if (!audioRef.current) {
        audioRef.current = new window.Audio('/audios/bienvenida.mp3');
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else {
      // Pausa y reinicia el audio si el modal se oculta
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
    // Al desmontar, detener audio
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isVisible]);

  const handleStartTutorial = () => {
    console.log('Botón Ver Tutorial clickeado');
    onStartTutorial();
  };

  const handleSkipTutorial = () => {
    console.log('Botón Omitir Tutorial clickeado');
    onSkipTutorial();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay de fondo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
          />
          
          {/* Modal de bienvenida */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border-2 border-blue-500/50 p-6 max-w-md w-full mx-4 relative overflow-hidden pointer-events-auto" onClick={() => console.log('Modal container clicked')}>
              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse pointer-events-none" />
              
              {/* Header con logo */}
              <div className="text-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full mb-3"
                >
                  <img src="/logo/logo-bug-bounty.webp" alt="Logo Bug Bounty" className="w-10 h-10 object-contain" />
                </motion.div>
                <h1 className="text-2xl font-bold text-blue-400 mb-1">¡Bienvenido a Bug Bounty Platform!</h1>
                <p className="text-gray-300 text-base">¡Aprende, compite y conviértete en leyenda!</p>
              </div>

              {/* Características principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 flex flex-col justify-center h-full min-h-[120px]"
                >
                  <FaShieldAlt className="text-blue-400 text-2xl mx-auto mb-2" />
                  <h3 className="text-blue-300 font-semibold mb-1 whitespace-normal break-words">Encuentra Vulnerabilidades</h3>
                  <p className="text-gray-400 text-sm whitespace-normal break-words">Reporta bugs y gana recompensas</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 flex flex-col justify-center h-full min-h-[120px]"
                >
                  <FaTrophy className="text-yellow-400 text-2xl mx-auto mb-2" />
                  <h3 className="text-yellow-300 font-semibold mb-1">Compite</h3>
                  <p className="text-gray-400 text-sm">Sube en los rankings</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 flex flex-col justify-center h-full min-h-[120px]"
                >
                  <FaUsers className="text-green-400 text-2xl mx-auto mb-2" />
                  <span className="text-green-300 font-semibold leading-tight block">Colabora en equipo</span>
                  <p className="text-gray-400 text-sm whitespace-normal break-words mt-1">No tengas miedo de pedir ayuda.</p>
                </motion.div>
              </div>

              {/* Mensaje principal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mb-6"
              >
                <p className="text-gray-300 text-base leading-relaxed">
                  ¿Te gustaría que te guíe a través de las principales funciones de la plataforma? 
                  <br />
                  <span className="text-blue-400 font-semibold">Niva</span> estará aquí para ayudarte.
                </p>
              </motion.div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Botón Ver Tutorial clickeado directamente');
                    handleStartTutorial();
                  }}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg relative z-20"
                >
                  <FaPlay size={16} />
                  <span>Ver Tutorial</span>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Botón Omitir Tutorial clickeado directamente');
                    handleSkipTutorial();
                  }}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold rounded-xl transition-all border border-gray-600 relative z-20"
                >
                  <FaTimes size={16} />
                  <span>Omitir Tutorial</span>
                </motion.button>
              </div>

              {/* Nota adicional */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center text-gray-500 text-sm mt-6"
              >
                Siempre puedes acceder al tutorial desde el botón de ayuda en inicio
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal; 