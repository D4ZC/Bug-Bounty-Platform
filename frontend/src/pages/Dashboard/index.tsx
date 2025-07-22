import React, { useState, useRef, useEffect } from 'react';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import Podium from '../../components/Podium';
import ShopCard from '../../components/ShopCard';
import Carousel from '../../components/Carousel';
import { useTranslation } from 'react-i18next';

// Datos reales para equipos y usuarios
const realTeams = [
  { name: 'P-TECH', score: 30 },
  { name: 'Data', score: 25 },
  { name: 'Apps', score: 14 },
];
const realUsers = [
  { name: 'Ana Torres', score: 18 },
  { name: 'Luis Pérez', score: 12 },
  { name: 'Marta López', score: 10 },
];

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [teams] = useState(realTeams);
  const [users] = useState(realUsers);
  const [gulag] = useState([
    { name: 'deivid', score: 50 },
    { name: 'runrun', score: 25 },
    { name: 'excel', score: 20 },
    { name: 'kick ass', score: 20 },
    { name: 'pedrito sola', score: 10 },
  ]);
  const [mvpTeam] = useState('P-TECH');
  const [mvpUser] = useState({ name: 'D4ZC', img: '', stats: { criticas: 10, altas: 20, medianas: 30, bajas: 9, total: 69 } });

  const navigate = useNavigate();

  // Ordenar top 3 para podio
  const topTeams = [...teams].sort((a, b) => b.score - a.score).slice(0, 3);
  const topUsers = [...users].sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-6 bg-[#f9f9f6]">
      <Carousel />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* Columna 1: USUARIOS y GULAG */}
        <div className="flex flex-col gap-6 h-full">
          {/* USUARIOS Card - Pixel Arcade */}
          <div
            className="relative pixel-card rounded-3xl shadow-xl flex items-center justify-center w-full h-[220px] cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => navigate('/users-score')}
            tabIndex={0}
            role="button"
            aria-label={t('dashboard.users_aria', 'Ver ranking de usuarios')}
          >
            {/* Blob decorativo */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-800 opacity-30 rounded-none z-0" />
            <h2 className="relative z-10 text-3xl font-extrabold text-blue-500 text-center pixel-text">{t('dashboard.users', 'USUARIOS')}</h2>
          </div>
          {/* GULAG Card - Pastel Pink, Wave */}
          <div className="flex flex-col items-center w-full">
            <div
              className="relative carbon-fiber-bg rounded-3xl shadow-xl flex items-center justify-center w-full h-[220px] cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-[1.03] glitch-card"
              onClick={() => navigate('/gulag')}
              tabIndex={0}
              role="button"
              aria-label={t('dashboard.gulag_aria', 'Ver GULAG')}
            >
              {/* Wave decorativa */}
              <svg className="absolute bottom-0 left-0 w-full h-16 z-0" viewBox="0 0 1440 320"><path fill="#222" fillOpacity="0.2" d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,128C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
              <h2 className="relative z-10 text-3xl font-extrabold text-green-400 text-center glitch-text" data-text={t('dashboard.gulag', 'GULAG')}>{t('dashboard.gulag', 'GULAG')}</h2>
            </div>
          </div>
        </div>
        {/* Columna 2: MVP y TIENDA */}
        <div className="flex flex-col gap-6 h-full">
          {/* MVP Card - DVD Logo Bounce + Estrellas */}
          <div
            className="rounded-3xl shadow-xl flex items-center justify-center w-full h-[220px] cursor-pointer transition-all duration-200 hover:shadow-2xl hover:scale-[1.03] bg-black relative overflow-hidden"
            onClick={() => navigate('/mvp')}
            tabIndex={0}
            role="button"
            aria-label="Ver MVP"
          >
            <MVPBouncingBgWithStars />
          </div>
          {/* TIENDA Card - NO MODIFICAR */}
          <div className="w-full h-[220px] flex items-center justify-center">
            <ShopCard />
          </div>
        </div>
        {/* Columna 3: PERFIL */}
        <div className="flex flex-col h-full">
          {/* PERFIL Card - Matrix Canvas Fondo */}
          <div className="relative bg-white rounded-3xl shadow-xl flex items-center justify-center w-full h-[460px] md:h-full cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => navigate('/profile')}
            tabIndex={0}
            role="button"
            aria-label="Ver perfil"
          >
            <MatrixCanvas />
            <h2 className="relative z-10 text-3xl font-extrabold text-black text-center">PERFIL</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

// MatrixCanvas: canvas animado efecto Matrix azul eléctrico
const MatrixCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    // Ajustar tamaño
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    // Caracteres Matrix
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    function draw() {
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = '#00f';
      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
        if (drops[i] * fontSize > canvas.height) {
          drops[i] = 0;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }} />;
};

// Canvas animado: letras 'MVP' rebotando y estrellas parpadeando
const MVPBouncingBgWithStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    // Ajustar tamaño
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    // Paleta de colores vibrantes
    const colors = ['#ff1744', '#00e676', '#2979ff', '#ffd600', '#f500a3', '#00fff7', '#ff9100', '#7c3aed'];
    // Letras MVP rebotando
    const logos = Array.from({ length: 3 }).map(() => ({
      x: Math.random() * (canvas.width - 80),
      y: Math.random() * (canvas.height - 40),
      dx: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 1.5),
      dy: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 1.5),
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    // Estrellas
    const stars = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.5 + Math.random() * 1.2,
      alpha: 0.5 + Math.random() * 0.5,
      twinkle: Math.random() * Math.PI * 2
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Estrellas parpadeando
      stars.forEach(star => {
        star.twinkle += 0.05 + Math.random() * 0.03;
        const a = star.alpha + Math.sin(star.twinkle) * 0.3;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, a));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });
      // Letras MVP rebotando
      ctx.font = 'bold 32px "Press Start 2P", monospace';
      ctx.textBaseline = 'top';
      logos.forEach(logo => {
        ctx.save();
        ctx.shadowColor = logo.color;
        ctx.shadowBlur = 16;
        ctx.fillStyle = logo.color;
        ctx.fillText('MVP', logo.x, logo.y);
        ctx.restore();
        // Movimiento
        logo.x += logo.dx;
        logo.y += logo.dy;
        // Rebote y cambio de color
        let bounced = false;
        if (logo.x <= 0 || logo.x + 80 >= canvas.width) { logo.dx *= -1; bounced = true; }
        if (logo.y <= 0 || logo.y + 40 >= canvas.height) { logo.dy *= -1; bounced = true; }
        if (bounced) {
          let newColor;
          do {
            newColor = colors[Math.floor(Math.random() * colors.length)];
          } while (newColor === logo.color);
          logo.color = newColor;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }} />;
};

export default Dashboard; 