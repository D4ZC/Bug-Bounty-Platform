import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes, FaPlay } from 'react-icons/fa';
import { useTutorial } from '../contexts/TutorialContext';

const TutorialModal: React.FC = () => {
  const { 
    isTutorialActive, 
    currentStep, 
    steps, 
    nextStep, 
    previousStep, 
    skipTutorial,
    completeTutorial 
  } = useTutorial();

  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentStepData = steps[currentStep];

  // Reproduce el audio correspondiente al id del paso
  useEffect(() => {
    if (isTutorialActive && currentStepData && currentStepData.id) {
      const audioPath = `/audios/${currentStepData.id}.mp3`;
      if (!audioRef.current) {
        audioRef.current = new window.Audio(audioPath);
      } else {
        audioRef.current.src = audioPath;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
    // Al desmontar o cambiar de paso, detener audio
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isTutorialActive, currentStep]);

  useEffect(() => {
    if (isTutorialActive) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isTutorialActive]);

  if (!isVisible) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <AnimatePresence>
      {isTutorialActive && (
        <>
          {/* Modal del tutorial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-50 ${getPositionClasses(currentStepData.position)}`}
          >
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-blue-500/50 p-6 max-w-sm w-80 relative overflow-hidden">
              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse pointer-events-none" />
              
              {/* Avatar NV */}
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="relative"
                >
                  <img 
                    src="/avatars/avatar_tutorial/avatar.png" 
                    alt="NV - Guía Tutorial" 
                    className="w-16 h-16 rounded-full border-2 border-blue-400 shadow-lg"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaPlay className="text-white text-xs" />
                  </div>
                </motion.div>
              </div>

              {/* Contenido */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-blue-400 mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {currentStepData.description}
                </p>
                <div className="bg-blue-500/20 rounded-lg p-3 mb-4">
                  <p className="text-blue-300 text-xs">
                    💡 <strong>Consejo:</strong> {currentStepData.tip}
                  </p>
                </div>
              </motion.div>

              {/* Controles */}
              <div className="flex items-center justify-between relative z-10">
                <button
                  onClick={() => {
                    console.log('Previous button clicked');
                    previousStep();
                  }}
                  disabled={isFirstStep}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isFirstStep 
                      ? 'text-gray-500 cursor-not-allowed' 
                      : 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/20'
                  }`}
                >
                  <FaChevronLeft size={14} />
                  <span className="text-sm">Anterior</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {currentStep + 1} / {steps.length}
                  </span>
                </div>

                <button
                  onClick={() => {
                    console.log('Next/Complete button clicked, isLastStep:', isLastStep);
                    if (isLastStep) {
                      completeTutorial();
                    } else {
                      nextStep();
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all"
                >
                  <span className="text-sm">
                    {isLastStep ? 'Finalizar' : 'Siguiente'}
                  </span>
                  {!isLastStep && <FaChevronRight size={14} />}
                </button>
              </div>

              {/* Botón saltar */}
              <button
                onClick={skipTutorial}
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors z-10"
              >
                <FaTimes size={16} />
              </button>

              {/* Indicador de progreso */}
              <div className="mt-4 relative z-10">
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TutorialModal; 