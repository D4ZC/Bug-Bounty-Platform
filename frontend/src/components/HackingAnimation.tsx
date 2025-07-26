import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface HackingAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
  mode?: 'login' | 'register';
}

const HackingAnimation: React.FC<HackingAnimationProps> = ({ isVisible, onComplete, mode = 'login' }) => {
  const { t } = useTranslation();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [isHacking, setIsHacking] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [lockStatus, setLockStatus] = useState<'locked' | 'unlocking' | 'unlocked'>('locked');
  const [fieldsFixed, setFieldsFixed] = useState(false);

  const fakeUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'hacker', password: 'secret' },
    { username: 'Retr0', password: 'bugbounty2024' }
  ];

  const bootMessages = mode === 'login' ? [
    { text: 'Cargando, espera...', delay: 300 },
    { text: 'Iniciado: Intentando montar puente SAEU Dedware.', delay: 400, isGreen: true },
    { text: '[ 0.000000] init_mapeado_memoria: [mem 0x00100000-0xdefa4FFF]', delay: 300 },
    { text: 'estado: Ok EXT4-Fs (sdal): sistema de archivos montado', delay: 400, isGreen: true },
    { text: 'Dispositivo Dedware montado: dedsec00 inicio de sesión:', delay: 500, isGreen: true },
    { text: 'Conectándose a los servidores de Bug Bounty...', delay: 600 },
    { text: 'Verificando credenciales de usuario...', delay: 500 },
    { text: 'Autenticación exitosa. Bienvenido al sistema.', delay: 800, isGreen: true, isFinal: true }
  ] : [
    { text: 'Iniciando proceso de registro...', delay: 300 },
    { text: 'Iniciado: Configurando nuevo puente SAEU Dedware.', delay: 400, isGreen: true },
    { text: '[ 0.000000] init_mapeado_memoria: [mem 0x00100000-0xdefa4FFF]', delay: 300 },
    { text: 'estado: Ok EXT4-Fs (sdal): sistema de archivos montado', delay: 400, isGreen: true },
    { text: 'Dispositivo Dedware montado: dedsec00 registro:', delay: 500, isGreen: true },
    { text: 'Conectándose a los servidores de Bug Bounty...', delay: 600 },
    { text: 'Creando nueva cuenta de usuario...', delay: 500 },
    { text: 'Registro exitoso. Cuenta creada correctamente.', delay: 800, isGreen: true, isFinal: true }
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentLineIndex(0);
      setShowGlitch(false);
      setUsername('');
      setPassword('');
      setShowLoginForm(false);
      setShowStatusBar(false);
      setIsHacking(false);
      setCurrentAttempt(0);
      setFieldsFixed(false);
      setLockStatus('locked');
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const showNextLine = () => {
      if (currentLineIndex >= bootMessages.length) {
        setTimeout(() => {
          setShowGlitch(true);
          setTimeout(() => {
            onComplete();
          }, 1000);
        }, 500);
        return;
      }

      const message = bootMessages[currentLineIndex];
      
      // Mostrar formulario de login después de la línea 4
      if (currentLineIndex === 4 && mode === 'login') { // Show login form and start hacking sequence
        setShowLoginForm(true);
        setIsHacking(true);
        startHackingSequence();
      }

      if (currentLineIndex === 5 && mode === 'login') { // Cuando aparece "Conectándose a los servidores..."
        setFieldsFixed(true);
        setUsername('Retr0');
        setPassword('************');
      }

      timeoutId = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        showNextLine();
      }, message.delay);
    };

    timeoutId = setTimeout(showNextLine, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isVisible, onComplete, bootMessages, currentLineIndex, mode]);

  const startHackingSequence = () => {
    const attemptHack = (attemptIndex: number) => {
      if (attemptIndex >= fakeUsers.length) {
        // Mostrar barra de estado después de encontrar el usuario correcto
        setShowStatusBar(true);
        // Mantener campos fijos cuando aparece la barra de estado
        setUsername('Retr0');
        setPassword('************');
        setFieldsFixed(true);
        return;
      }

      const currentUser = fakeUsers[attemptIndex];
      setCurrentAttempt(attemptIndex);

      // Si los campos ya están fijos, no cambiar más
      if (fieldsFixed) {
        return;
      }

      // Simular typing del username y contraseña al mismo tiempo
      let charIndex = 0;
      const maxLength = Math.max(currentUser.username.length, currentUser.password.length);
      
      const typeBoth = () => {
        if (charIndex < maxLength) {
          // Escribir usuario
          if (charIndex < currentUser.username.length) {
            setUsername(currentUser.username.substring(0, charIndex + 1));
          }
          
          // Escribir contraseña censurada
          if (charIndex < currentUser.password.length) {
            setPassword('*'.repeat(charIndex + 1));
          }
          
          charIndex++;
          setTimeout(typeBoth, 100);
        } else {
          // Pausa antes del siguiente intento
          setTimeout(() => {
            if (attemptIndex < fakeUsers.length - 1) {
              // Intento fallido - candado rojo vibrante
              setLockStatus('locked');
              // Limpiar campos para el siguiente intento solo si no están fijos
              if (!fieldsFixed) {
                setUsername('');
                setPassword('');
              }
              setTimeout(() => {
                attemptHack(attemptIndex + 1);
              }, 300);
            } else {
              // Usuario correcto encontrado - candado verde que se abre
              setLockStatus('unlocking');
              setTimeout(() => {
                setLockStatus('unlocked');
                setShowStatusBar(true);
                // Mantener campos fijos
                setUsername('Retr0');
                setPassword('************');
                setFieldsFixed(true);
              }, 500);
            }
          }, 800);
        }
      };
      
      setTimeout(typeBoth, 100);
    };

    setTimeout(() => {
      attemptHack(0);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="matrix-rain"></div>
      </div>

      {/* Logo en la esquina superior derecha */}
      <div className="absolute top-4 right-4 text-white text-sm font-mono z-10">
        <div className="text-2xl font-bold mb-1">BB</div>
        <div className="text-xs">www.bugbounty.com</div>
      </div>

      {/* Terminal principal */}
      <div className="w-full max-w-4xl h-96 bg-black border-2 border-neon-green rounded-lg p-6 font-mono text-sm overflow-hidden relative z-10">
        <div className="text-white whitespace-pre-wrap leading-relaxed">
          {bootMessages.slice(0, currentLineIndex + 1).map((message, index) => (
            <div 
              key={index} 
              className={`${message.isGreen ? 'text-green-400' : 'text-white'} ${message.isFinal ? 'font-bold text-xl' : ''}`}
              style={{
                textShadow: message.isGreen ? '0 0 8px #00ff6a' : 'none',
                animation: message.isFinal ? 'finalGlow 1s infinite alternate' : 'none'
              }}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Cursor parpadeante */}
        <div className="inline-block w-2 h-5 bg-neon-green animate-pulse ml-1"></div>

        {/* Efecto de glitch final */}
        {showGlitch && (
          <div className="absolute inset-0 bg-black animate-glitch-overlay">
            <div className="absolute inset-0 bg-green-400 opacity-20 animate-glitch-scan"></div>
          </div>
        )}
      </div>

      {/* Formulario de login que aparece durante la animación */}
      {showLoginForm && (
        <div className="absolute top-4 right-4 z-20">
          <div className="w-80 bg-black/90 border-2 border-neon-green rounded-lg p-6">
            {/* Logo grande en el fondo estilo Watch Dogs */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <div className="text-6xl font-bold text-gray-800" style={{fontFamily: 'monospace'}}>BB</div>
            </div>
            
            {/* Campos de entrada estilo Watch Dogs */}
            <div className="relative z-10 space-y-4">
              <div>
                <input
                  type="text"
                  value={username}
                  readOnly
                  className="w-full bg-transparent border-2 border-gray-600 text-white font-mono px-3 py-2 text-lg tracking-wider"
                  placeholder="Usuario"
                  style={{fontFamily: 'monospace'}}
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  readOnly
                  className="w-full bg-transparent border-2 border-gray-600 text-white font-mono px-3 py-2 text-lg tracking-wider"
                  placeholder="Contraseña"
                  style={{fontFamily: 'monospace'}}
                />
              </div>
              
              {/* Candado */}
              <div className="flex justify-center mt-2">
                <div className={`text-2xl transition-all duration-300 ${
                  lockStatus === 'locked' ? 'text-red-500 animate-lock-shake' :
                  lockStatus === 'unlocking' ? 'text-yellow-500 animate-lock-unlock' :
                  'text-green-500 animate-lock-open'
                }`}>
                  {lockStatus === 'locked' ? '🔒' : lockStatus === 'unlocking' ? '🔓' : '🔓'}
                </div>
              </div>
            </div>

            {/* Barra de estado estilo Watch Dogs */}
            {showStatusBar && (
              <div className="mt-4 bg-blue-600 text-white font-mono px-4 py-2 text-center text-sm tracking-wide" style={{fontFamily: 'monospace'}}>
                Conectándose a los servidores de Bug Bounty...
                <span className="ml-2 animate-pulse">...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Advertencia de epilepsia en la parte inferior */}
      <div className="absolute bottom-4 left-4 right-4 text-white text-xs text-center opacity-70 z-10">
        Un pequeño porcentaje de personas puede sufrir ataques epilépticos o desmayos cuando se ve expuesto a ciertos destellos o imágenes intermitentes...
      </div>

      <style>{`
        .text-neon-green { color: #00ff6a; }
        .border-neon-green { border-color: #00ff6a; }
        
        @keyframes finalGlow {
          0% { text-shadow: 0 0 8px #00ff6a; }
          100% { text-shadow: 0 0 16px #00ff6a, 0 0 24px #00ff6a; }
        }
        
        @keyframes glitch-overlay {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes glitch-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .animate-glitch-overlay {
          animation: glitch-overlay 0.5s infinite;
        }
        
        .animate-glitch-scan {
          animation: glitch-scan 2s linear infinite;
        }

        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 255, 106, 0.1) 50%, transparent 100%);
          animation: matrixRain 20s linear infinite;
        }

        @keyframes matrixRain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .matrix-rain::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 106, 0.1) 2px,
            rgba(0, 255, 106, 0.1) 4px
          );
          animation: matrixScan 3s linear infinite;
        }

        @keyframes matrixScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes lock-shake {
          0%, 100% { transform: rotate(0deg); }
          20%, 80% { transform: rotate(-10deg); }
          40%, 60% { transform: rotate(10deg); }
        }

        @keyframes lock-unlock {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(0deg); }
        }

        @keyframes lock-open {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-10deg); }
          40% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
        }

        .animate-lock-shake {
          animation: lock-shake 0.5s ease-in-out;
        }
        
        .animate-lock-unlock {
          animation: lock-unlock 0.5s ease-in-out;
        }
        
        .animate-lock-open {
          animation: lock-open 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default HackingAnimation; 