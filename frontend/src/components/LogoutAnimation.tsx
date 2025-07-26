import React, { useState, useEffect } from 'react';

interface LogoutAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LogoutAnimation: React.FC<LogoutAnimationProps> = ({ isVisible, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showStatic, setShowStatic] = useState(false);
  const [showShutdown, setShowShutdown] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setShowStatic(false);
      setShowShutdown(false);
      setShowHeader(false);
      return;
    }

    // Secuencia de animación de cierre de sesión
    const animationSequence = [
      // Paso 1: Mostrar estática (0.5s)
      () => {
        setShowStatic(true);
        setTimeout(() => setCurrentStep(1), 500);
      },
      // Paso 2: Efecto de apagado (1s)
      () => {
        setShowStatic(false);
        setShowShutdown(true);
        setTimeout(() => setCurrentStep(2), 1000);
      },
      // Paso 3: Mostrar header (0.5s)
      () => {
        setShowShutdown(false);
        setShowHeader(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    ];

    if (currentStep < animationSequence.length) {
      animationSequence[currentStep]();
    }
  }, [isVisible, currentStep, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Efecto de estática */}
      {showStatic && (
        <div className="absolute inset-0 animate-static-noise">
          <div className="w-full h-full bg-black opacity-90"></div>
          <div className="absolute inset-0 static-pattern"></div>
        </div>
      )}

      {/* Efecto de apagado de TV */}
      {showShutdown && (
        <div className="absolute inset-0 animate-tv-shutdown">
          <div className="w-full h-full bg-black"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-6xl font-mono animate-flicker">
              *
            </div>
          </div>
        </div>
      )}

      {/* Header que aparece al final */}
      {showHeader && (
        <div className="absolute inset-0 animate-header-appear">
          <div className="w-full h-full flex flex-col items-center justify-center bg-black">
            <div className="text-white text-4xl font-mono mb-4 animate-text-glow">
              Bug Bounty Platform
            </div>
            <div className="text-green-400 text-xl font-mono animate-pulse">
              Sesión cerrada
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes static-noise {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        .animate-static-noise {
          animation: static-noise 0.1s infinite;
        }

        .static-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, white 1px, transparent 1px);
          background-size: 4px 4px;
          animation: static-move 0.05s infinite;
        }

        @keyframes static-move {
          0% { transform: translate(0, 0); }
          25% { transform: translate(1px, 1px); }
          50% { transform: translate(-1px, 1px); }
          75% { transform: translate(1px, -1px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes tv-shutdown {
          0% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(0.8);
            opacity: 0.5;
          }
          100% { 
            transform: scale(0.1);
            opacity: 0;
          }
        }

        .animate-tv-shutdown {
          animation: tv-shutdown 1s ease-in forwards;
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .animate-flicker {
          animation: flicker 0.1s infinite;
        }

        @keyframes header-appear {
          0% { 
            opacity: 0;
            transform: scale(0.5);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-header-appear {
          animation: header-appear 0.5s ease-out forwards;
        }

        @keyframes text-glow {
          0% { text-shadow: 0 0 8px #00ff6a; }
          100% { text-shadow: 0 0 16px #00ff6a, 0 0 24px #00ff6a; }
        }

        .animate-text-glow {
          animation: text-glow 1s infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default LogoutAnimation; 