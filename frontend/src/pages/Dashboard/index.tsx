import React, { useState, useRef, useEffect } from 'react';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import Podium from '../../components/Podium';
import ShopCard from '../../components/ShopCard';
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

// Consejos y personaje tipo vecino
const CONSEJOS = [
  'Hackea el sistema, pero siempre con ética. ¡El verdadero hacker respeta las reglas!',
  '¿Sabías que la mejor defensa es un buen ataque? Prueba tus habilidades en los retos más difíciles.',
  'Mantén tu identidad segura: nunca compartas tus credenciales.',
  'El conocimiento es poder. Investiga, aprende y comparte con la comunidad.',
  '¿Listo para el siguiente nivel? Explora los eventos especiales y gana logros únicos.',
  'No subestimes los pequeños bugs, ¡pueden valer oro!',
  'Personaliza tu avatar y presume tu estilo hacker.',
  'Recuerda: la perseverancia y la creatividad son tus mejores armas.',
  '¡Diviértete, aprende y conviértete en leyenda del hacking!'
];

// SVG avatar hacker realista (más detalles, azul neón)
const HackerSVG = () => (
  <svg width="150" height="190" viewBox="0 0 150 190" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sombra */}
    <ellipse cx="75" cy="180" rx="55" ry="10" fill="#222" opacity=".25" />
    {/* Hoodie exterior */}
    <ellipse cx="75" cy="100" rx="60" ry="65" fill="#1a2233" stroke="#00e0ff" strokeWidth="2.5" />
    {/* Hoodie interior sombra */}
    <ellipse cx="75" cy="90" rx="48" ry="54" fill="#232b3b" opacity=".7" />
    {/* Capucha */}
    <ellipse cx="75" cy="55" rx="40" ry="22" fill="#1a2233" stroke="#00e0ff" strokeWidth="2" />
    <ellipse cx="75" cy="60" rx="36" ry="18" fill="#232b3b" opacity=".7" />
    {/* Cara */}
    <ellipse cx="75" cy="80" rx="28" ry="32" fill="#e0d6c3" stroke="#222" strokeWidth="2" />
    {/* Nariz */}
    <ellipse cx="75" cy="95" rx="5" ry="3" fill="#d1bfa3" />
    {/* Gafas */}
    <rect x="54" y="75" width="18" height="12" rx="5" fill="#111a" stroke="#00e0ff" strokeWidth="2" />
    <rect x="78" y="75" width="18" height="12" rx="5" fill="#111a" stroke="#00e0ff" strokeWidth="2" />
    <rect x="72" y="80" width="6" height="2" rx="1" fill="#00e0ff" />
    {/* Reflejo gafas */}
    <rect x="58" y="78" width="6" height="2" rx="1" fill="#1ecfff" opacity=".7" />
    <rect x="82" y="78" width="6" height="2" rx="1" fill="#1ecfff" opacity=".7" />
    {/* Boca */}
    <path d="M65 105 Q75 112 85 105" stroke="#222" strokeWidth="2" fill="none" />
    {/* Laptop */}
    <rect x="45" y="125" width="60" height="30" rx="8" fill="#181f2b" stroke="#00e0ff" strokeWidth="2.5" />
    <rect x="55" y="138" width="40" height="10" rx="3" fill="#232b3b" />
    {/* Logo laptop */}
    <circle cx="75" cy="150" r="3" fill="#00e0ff" />
    {/* Manos */}
    <ellipse cx="55" cy="155" rx="8" ry="5" fill="#e0d6c3" stroke="#222" strokeWidth="1.5" />
    <ellipse cx="95" cy="155" rx="8" ry="5" fill="#e0d6c3" stroke="#222" strokeWidth="1.5" />
    {/* Dedos */}
    <ellipse cx="52" cy="160" rx="2.5" ry="1.2" fill="#e0d6c3" />
    <ellipse cx="58" cy="160" rx="2.5" ry="1.2" fill="#e0d6c3" />
    <ellipse cx="92" cy="160" rx="2.5" ry="1.2" fill="#e0d6c3" />
    <ellipse cx="98" cy="160" rx="2.5" ry="1.2" fill="#e0d6c3" />
    {/* Detalles hoodie */}
    <ellipse cx="75" cy="120" rx="32" ry="12" fill="#232b3b" opacity=".5" />
    <ellipse cx="75" cy="110" rx="40" ry="10" fill="#232b3b" opacity=".3" />
    {/* Sombra laptop */}
    <ellipse cx="75" cy="158" rx="22" ry="4" fill="#111" opacity=".18" />
  </svg>
);

const getConsejoAleatorio = () => CONSEJOS[Math.floor(Math.random() * CONSEJOS.length)];

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

  // Consejero tipo vecino
  const [showVecino, setShowVecino] = useState(false);
  const [consejo, setConsejo] = useState('');
  useEffect(() => {
    if (!sessionStorage.getItem('dashboard_vecino_mostrado')) {
      setShowVecino(true);
      setConsejo(getConsejoAleatorio());
      sessionStorage.setItem('dashboard_vecino_mostrado', '1');
    }
  }, []);
  useEffect(() => {
    if (!showVecino) return;
    const handle = () => setShowVecino(false);
    window.addEventListener('click', handle);
    return () => window.removeEventListener('click', handle);
  }, [showVecino]);

  // Ordenar top 3 para podio
  const topTeams = [...teams].sort((a, b) => b.score - a.score).slice(0, 3);
  const topUsers = [...users].sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-6 bg-[#f9f9f6] relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* Columna 1: USUARIOS y GULAG */}
        <div className="flex flex-col gap-6 h-full">
          {/* USUARIOS Card */}
          <div
            className="relative pixel-card rounded-3xl shadow-xl flex items-center justify-center w-full h-[220px] cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => navigate('/users-score')}
            tabIndex={0}
            role="button"
            aria-label={t('dashboard.users_aria', 'Ver ranking de usuarios')}
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-800 opacity-30 rounded-none z-0" />
            <h2 className="relative z-10 text-3xl font-extrabold text-blue-500 text-center pixel-text">{t('dashboard.users', 'USUARIOS')}</h2>
          </div>
          {/* GULAG Card */}
          <div className="flex flex-col items-center w-full">
            <div
              className="relative carbon-fiber-bg rounded-3xl shadow-xl flex items-center justify-center w-full h-[220px] cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-2xl hover:scale-[1.03] glitch-card"
              onClick={() => navigate('/gulag')}
              tabIndex={0}
              role="button"
              aria-label={t('dashboard.gulag_aria', 'Ver GULAG')}
            >
              <svg className="absolute bottom-0 left-0 w-full h-16 z-0" viewBox="0 0 1440 320"><path fill="#222" fillOpacity="0.2" d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,128C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
              <h2 className="relative z-10 text-3xl font-extrabold text-green-400 text-center glitch-text" data-text={t('dashboard.gulag', 'GULAG')}>{t('dashboard.gulag', 'GULAG')}</h2>
            </div>
          </div>
        </div>
        {/* Columna 2: PERFIL */}
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
        {/* Columna 3: MVP y TIENDA */}
        <div className="flex flex-col gap-6 h-full">
          {/* MVP Card */}
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
      </div>
      {/* Personaje y diálogo tipo vecino */}
      {showVecino && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-row items-end gap-2 animate-fade-in">
          {/* Globo de diálogo hacker */}
          <div className="mb-24 mr-2 bg-[#181f1b] border-2 border-neon-blue rounded-2xl shadow-lg px-6 py-4 text-neon-blue text-lg font-mono relative overflow-hidden" style={{ minWidth: 240, maxWidth: 340, boxShadow: '0 0 16px #00e0ff88, 0 0 4px #00e0ff' }}>
            {/* Fondo animado de líneas de código azul */}
            <div className="absolute inset-0 z-0 pointer-events-none animate-hacker-bg" style={{ opacity: 0.18 }}>
              <svg width="100%" height="100%">
                <defs>
                  <linearGradient id="codeLineBlue" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00e0ff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#00e0ff" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {Array.from({ length: 16 }).map((_, i) => (
                  <rect key={i} x="0" y={12 + i * 14} width="100%" height="8" fill="url(#codeLineBlue)" />
                ))}
              </svg>
            </div>
            <div className="relative z-10">
              <div className="font-bold text-xl mb-1 text-neon-blue drop-shadow">¡BIENVENIDO!</div>
              <div className="text-base font-normal text-neon-blue drop-shadow">{consejo}</div>
              <div className="text-xs text-neon-blue/70 mt-2">Haz clic para continuar</div>
            </div>
            <div className="absolute left-[-18px] bottom-4 w-6 h-6 bg-[#181f1b] border-l-2 border-b-2 border-neon-blue rounded-bl-2xl" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
            <style>{`
              .border-neon-blue { box-shadow: 0 0 8px #00e0ff, 0 0 2px #00e0ff; border-color: #00e0ff; }
              .text-neon-blue { color: #1ecfff; }
              .text-neon-blue\/70 { color: #1ecfffcc; }
              .animate-hacker-bg {
                animation: hacker-bg-move 2.5s linear infinite alternate;
              }
              @keyframes hacker-bg-move {
                0% { background-position-y: 0; }
                100% { background-position-y: 30px; }
              }
            `}</style>
          </div>
          {/* Personaje SVG hacker */}
          <div className="w-[120px] h-[160px] flex items-end">
            <HackerSVG />
          </div>
        </div>
      )}
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
      ctx!.fillStyle = 'rgba(255,255,255,0.15)';
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      ctx!.font = `${fontSize}px monospace`;
      ctx!.fillStyle = '#00f';
      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx!.fillText(char, i * fontSize, drops[i] * fontSize);
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
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      // Estrellas parpadeando
      stars.forEach(star => {
        star.twinkle += 0.05 + Math.random() * 0.03;
        const a = star.alpha + Math.sin(star.twinkle) * 0.3;
        ctx!.save();
        ctx!.globalAlpha = Math.max(0, Math.min(1, a));
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx!.fillStyle = '#fff';
        ctx!.shadowColor = '#fff';
        ctx!.shadowBlur = 6;
        ctx!.fill();
        ctx!.restore();
      });
      // Letras MVP rebotando
      ctx!.font = 'bold 32px "Press Start 2P", monospace';
      ctx!.textBaseline = 'top';
      logos.forEach(logo => {
        ctx!.save();
        ctx!.shadowColor = logo.color;
        ctx!.shadowBlur = 16;
        ctx!.fillStyle = logo.color;
        ctx!.fillText('MVP', logo.x, logo.y);
        ctx!.restore();
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