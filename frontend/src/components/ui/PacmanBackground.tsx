import React, { useEffect, useRef } from 'react';

interface PacmanBackgroundProps {
  className?: string;
}

const PacmanBackground: React.FC<PacmanBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuración del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuración del juego
    const gridSize = 35;
    const cols = Math.floor(canvas.width / gridSize);
    const rows = Math.floor(canvas.height / gridSize);

    // Pac-Man
    let pacman = {
      x: 1,
      y: 1,
      direction: { x: 1, y: 0 },
      mouth: 0,
      mouthSpeed: 0.2,
      color: '#FFD700'
    };

    // Fantasmas - posicionados más centralmente y con colores más vibrantes
    const ghosts = [
      { x: Math.floor(cols * 0.7), y: Math.floor(rows * 0.3), color: '#FF0000', direction: { x: -1, y: 0 } },
      { x: Math.floor(cols * 0.3), y: Math.floor(rows * 0.7), color: '#FFB8FF', direction: { x: 1, y: 0 } },
      { x: Math.floor(cols * 0.5), y: Math.floor(rows * 0.5), color: '#00FFFF', direction: { x: 0, y: 1 } },
    ];

    // Puntos - menos puntos pero más visibles
    const dots: { x: number; y: number; eaten: boolean }[] = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() < 0.15) {
          dots.push({ x: i, y: j, eaten: false });
        }
      }
    }

    // Función para dibujar Pac-Man
    const drawPacman = () => {
      ctx.save();
      ctx.translate(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2);
      
      // Rotar según la dirección
      const angle = Math.atan2(pacman.direction.y, pacman.direction.x);
      ctx.rotate(angle);

      // Efecto de glow más intenso
      ctx.shadowColor = pacman.color;
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.beginPath();
      ctx.arc(0, 0, gridSize / 2 - 1, pacman.mouth * Math.PI, (2 - pacman.mouth) * Math.PI);
      ctx.lineTo(0, 0);
      ctx.fillStyle = pacman.color;
      ctx.fill();
      
      // Resetear shadow
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    // Función para dibujar fantasmas
    const drawGhost = (ghost: any) => {
      ctx.save();
      ctx.translate(ghost.x * gridSize + gridSize / 2, ghost.y * gridSize + gridSize / 2);
      
      // Efecto de glow más intenso para fantasmas
      ctx.shadowColor = ghost.color;
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Cuerpo del fantasma más grande y detallado
      ctx.fillStyle = ghost.color;
      ctx.beginPath();
      ctx.arc(0, -gridSize / 3, gridSize / 2 - 1, 0, Math.PI);
      ctx.rect(-gridSize / 2 + 1, -gridSize / 3, gridSize - 2, gridSize / 2);
      ctx.fill();

      // Detalles del fantasma - ondulaciones en la parte inferior
      ctx.fillStyle = ghost.color;
      for (let i = 0; i < 3; i++) {
        const x = -gridSize / 2 + 1 + (i * gridSize / 3);
        ctx.beginPath();
        ctx.arc(x + gridSize / 6, gridSize / 6, gridSize / 6, 0, Math.PI);
        ctx.fill();
      }

      // Resetear shadow para ojos
      ctx.shadowBlur = 0;

      // Ojos más grandes y visibles
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-gridSize / 5, -gridSize / 5, 4, 0, Math.PI * 2);
      ctx.arc(gridSize / 5, -gridSize / 5, 4, 0, Math.PI * 2);
      ctx.fill();

      // Pupilas negras
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(-gridSize / 5, -gridSize / 5, 2, 0, Math.PI * 2);
      ctx.arc(gridSize / 5, -gridSize / 5, 2, 0, Math.PI * 2);
      ctx.fill();

      // Boca pequeña
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI);
      ctx.fill();

      ctx.restore();
    };

    // Función para dibujar puntos
    const drawDots = () => {
      ctx.fillStyle = '#FFD700';
      dots.forEach(dot => {
        if (!dot.eaten) {
          // Efecto de glow para los puntos
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          
          ctx.beginPath();
          ctx.arc(dot.x * gridSize + gridSize / 2, dot.y * gridSize + gridSize / 2, 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Resetear shadow
          ctx.shadowBlur = 0;
        }
      });
    };

    // Función para actualizar posiciones
    const update = () => {
      // Actualizar Pac-Man
      pacman.mouth += pacman.mouthSpeed;
      if (pacman.mouth > 0.5) {
        pacman.mouthSpeed = -pacman.mouthSpeed;
      } else if (pacman.mouth < 0) {
        pacman.mouthSpeed = -pacman.mouthSpeed;
      }

      // Mover Pac-Man
      const newX = pacman.x + pacman.direction.x;
      const newY = pacman.y + pacman.direction.y;

      if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        pacman.x = newX;
        pacman.y = newY;
      } else {
        // Cambiar dirección cuando llega al borde
        const directions = [
          { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }
        ];
        const validDirections = directions.filter(dir => {
          const testX = pacman.x + dir.x;
          const testY = pacman.y + dir.y;
          return testX >= 0 && testX < cols && testY >= 0 && testY < rows;
        });
        if (validDirections.length > 0) {
          pacman.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
        }
      }

      // Mover fantasmas
      ghosts.forEach(ghost => {
        const newX = ghost.x + ghost.direction.x;
        const newY = ghost.y + ghost.direction.y;

        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
          ghost.x = newX;
          ghost.y = newY;
        } else {
          // Cambiar dirección
          const directions = [
            { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }
          ];
          const validDirections = directions.filter(dir => {
            const testX = ghost.x + dir.x;
            const testY = ghost.y + dir.y;
            return testX >= 0 && testX < cols && testY >= 0 && testY < rows;
          });
          if (validDirections.length > 0) {
            ghost.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
          }
        }
      });

      // Verificar colisión con puntos
      dots.forEach(dot => {
        if (!dot.eaten && Math.abs(pacman.x - dot.x) < 0.5 && Math.abs(pacman.y - dot.y) < 0.5) {
          dot.eaten = true;
        }
      });
    };

    // Función de animación
    const animate = () => {
      // Limpiar canvas con transparencia
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar fondo con gradiente sutil y efecto de neón
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 10, 15, 0.05)');
      gradient.addColorStop(0.5, 'rgba(26, 26, 46, 0.08)');
      gradient.addColorStop(1, 'rgba(10, 10, 15, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Efecto de partículas flotantes - menos partículas para mejor rendimiento
      const time = Date.now() * 0.001;
      for (let i = 0; i < 10; i++) {
        const x = (Math.sin(time + i * 0.5) * canvas.width / 2) + canvas.width / 2;
        const y = (Math.cos(time + i * 0.3) * canvas.height / 2) + canvas.height / 2;
        ctx.fillStyle = `rgba(0, 212, 255, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dibujar elementos
      drawDots();
      drawPacman();
      ghosts.forEach(drawGhost);

      // Actualizar posiciones
      update();

      requestAnimationFrame(animate);
    };

    // Iniciar animación
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 pacman-canvas ${className}`}
      style={{ opacity: 0.5 }}
    />
  );
};

export default PacmanBackground; 