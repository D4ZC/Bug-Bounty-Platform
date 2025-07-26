import React, { useState } from 'react';
import UserRankingTable from '../components/UserRankingTable';
import TeamRankingTable from '../components/TeamRankingTable';
import UserModal from '../components/UserModal';
import { useNavigate, useLocation } from 'react-router-dom';

const mockUsers = [
  // Usuarios del equipo Consulting (7 usuarios)
  {
    id: 'USR-001',
    name: 'Alex Turner',
    role: 'Líder',
    team: 'Consulting',
    stats: { puntos: 1200, vulnerabilidades: 18, retos: 7 },
    badges: ['Top Performer', 'Bug Hunter'],
  },
  {
    id: 'USR-002',
    name: 'Sarah Chen',
    role: 'Miembro',
    team: 'Consulting',
    stats: { puntos: 950, vulnerabilidades: 12, retos: 5 },
    badges: ['Fast Solver'],
  },
  {
    id: 'USR-003',
    name: 'Michael Rodriguez',
    role: 'Miembro',
    team: 'Consulting',
    stats: { puntos: 800, vulnerabilidades: 10, retos: 3 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-004',
    name: 'Emily Watson',
    role: 'Miembro',
    team: 'Consulting',
    stats: { puntos: 650, vulnerabilidades: 8, retos: 2 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-005',
    name: 'David Kim',
    role: 'Miembro',
    team: 'Consulting',
    stats: { puntos: 580, vulnerabilidades: 7, retos: 2 },
    badges: ['Fast Solver'],
  },
  {
    id: 'USR-006',
    name: 'Lisa Park',
    role: 'Miembro',
    team: 'Consulting',
    stats: { puntos: 520, vulnerabilidades: 6, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-007',
    name: 'James Wilson',
    role: 'Miembro',
    team: 'Consulting',
    stats: { puntos: 480, vulnerabilidades: 5, retos: 1 },
    badges: ['Team Player'],
  },
  
  // Usuarios del equipo CyberWolves (7 usuarios)
  {
    id: 'USR-008',
    name: 'Carlos Mendoza',
    role: 'Miembro',
    team: 'CyberWolves',
    stats: { puntos: 420, vulnerabilidades: 4, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-009',
    name: 'Diego Ramirez',
    role: 'Miembro',
    team: 'CyberWolves',
    stats: { puntos: 380, vulnerabilidades: 3, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-010',
    name: 'Sofia Castro',
    role: 'Miembro',
    team: 'CyberWolves',
    stats: { puntos: 340, vulnerabilidades: 3, retos: 0 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-011',
    name: 'Andres Vargas',
    role: 'Miembro',
    team: 'CyberWolves',
    stats: { puntos: 300, vulnerabilidades: 2, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-012',
    name: 'Mateo Silva',
    role: 'Miembro',
    team: 'CyberWolves',
    stats: { puntos: 280, vulnerabilidades: 2, retos: 0 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-013',
    name: 'Fernando Ruiz',
    role: 'Miembro',
    team: 'CyberWolves',
    stats: { puntos: 260, vulnerabilidades: 1, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-014',
    name: 'Oscar Herrera',
    role: 'Miembro',
    team: 'CyberWolves',
    stats: { puntos: 240, vulnerabilidades: 1, retos: 0 },
    badges: ['Team Player'],
  },
  
  // Usuarios del equipo Apps (7 usuarios - MVP incluido)
  {
    id: 'USR-015',
    name: 'Liam Smith',
    role: 'MVP',
    team: 'Apps',
    stats: { puntos: 1065, vulnerabilidades: 25, retos: 10 },
    badges: ['MVP', 'Top Performer'],
  },
  {
    id: 'USR-016',
    name: 'Ana Torres',
    role: 'Miembro',
    team: 'Apps',
    stats: { puntos: 750, vulnerabilidades: 9, retos: 4 },
    badges: ['Fast Solver'],
  },
  {
    id: 'USR-017',
    name: 'Luis Pérez',
    role: 'Miembro',
    team: 'Apps',
    stats: { puntos: 680, vulnerabilidades: 8, retos: 3 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-018',
    name: 'Gabriel Torres',
    role: 'Miembro',
    team: 'Apps',
    stats: { puntos: 620, vulnerabilidades: 7, retos: 2 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-019',
    name: 'Camila Morales',
    role: 'Miembro',
    team: 'Apps',
    stats: { puntos: 580, vulnerabilidades: 6, retos: 2 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-020',
    name: 'Isabella Rodriguez',
    role: 'Miembro',
    team: 'Apps',
    stats: { puntos: 540, vulnerabilidades: 5, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-021',
    name: 'Lucia Herrera',
    role: 'Miembro',
    team: 'Apps',
    stats: { puntos: 500, vulnerabilidades: 4, retos: 1 },
    badges: ['Team Player'],
  },
  
  // Usuarios del equipo Data (7 usuarios)
  {
    id: 'USR-022',
    name: 'Lucas Martin',
    role: 'Miembro',
    team: 'Data',
    stats: { puntos: 460, vulnerabilidades: 4, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-023',
    name: 'Mia Lee',
    role: 'Miembro',
    team: 'Data',
    stats: { puntos: 420, vulnerabilidades: 3, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-024',
    name: 'Ethan Kim',
    role: 'Miembro',
    team: 'Data',
    stats: { puntos: 380, vulnerabilidades: 3, retos: 0 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-025',
    name: 'Daniel Herrera',
    role: 'Miembro',
    team: 'Data',
    stats: { puntos: 340, vulnerabilidades: 2, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-026',
    name: 'Sebastian Rojas',
    role: 'Miembro',
    team: 'Data',
    stats: { puntos: 300, vulnerabilidades: 2, retos: 0 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-027',
    name: 'Adrian Castro',
    role: 'Miembro',
    team: 'Data',
    stats: { puntos: 260, vulnerabilidades: 1, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-028',
    name: 'Ricardo Morales',
    role: 'Miembro',
    team: 'Data',
    stats: { puntos: 220, vulnerabilidades: 1, retos: 0 },
    badges: ['Team Player'],
  },
  
  // Usuarios del equipo P-TECH (7 usuarios)
  {
    id: 'USR-029',
    name: 'Marta López',
    role: 'Miembro',
    team: 'P-TECH',
    stats: { puntos: 200, vulnerabilidades: 1, retos: 0 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-030',
    name: 'Valentina Ruiz',
    role: 'Miembro',
    team: 'P-TECH',
    stats: { puntos: 180, vulnerabilidades: 1, retos: 0 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-031',
    name: 'Natalia Jimenez',
    role: 'Miembro',
    team: 'P-TECH',
    stats: { puntos: 160, vulnerabilidades: 0, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-032',
    name: 'Valeria Mendoza',
    role: 'Miembro',
    team: 'P-TECH',
    stats: { puntos: 140, vulnerabilidades: 0, retos: 1 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-033',
    name: 'Carmen Vargas',
    role: 'Miembro',
    team: 'P-TECH',
    stats: { puntos: 120, vulnerabilidades: 0, retos: 0 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-034',
    name: 'Rosa Ruiz',
    role: 'Miembro',
    team: 'P-TECH',
    stats: { puntos: 100, vulnerabilidades: 0, retos: 0 },
    badges: ['Team Player'],
  },
  {
    id: 'USR-035',
    name: 'Monica Rojas',
    role: 'Miembro',
    team: 'P-TECH',
    stats: { puntos: 80, vulnerabilidades: 0, retos: 0 },
    badges: ['Team Player'],
  },
];

const mockTeams = [
  {
    id: 'T001',
    name: 'P-TECH',
    description: 'Equipo líder en ciberseguridad.',
    members: ['U001', 'U002', 'U003'],
    stats: { puntos: 2000, retos: 15, vulnerabilidades: 30 },
  },
  {
    id: 'T002',
    name: 'Data',
    description: 'Expertos en análisis de datos.',
    members: ['U004', 'U005'],
    stats: { puntos: 1900, retos: 12, vulnerabilidades: 25 },
  },
  {
    id: 'T003',
    name: 'Apps',
    description: 'Desarrolladores de aplicaciones.',
    members: ['U006'],
    stats: { puntos: 1500, retos: 10, vulnerabilidades: 14 },
  },
];

// Ordenar por vulnerabilidades resueltas (descendente)
const sortedUsers = [...mockUsers].sort((a, b) => b.stats.vulnerabilidades - a.stats.vulnerabilidades);
const totalVulns = sortedUsers.reduce((acc, u) => acc + u.stats.vulnerabilidades, 0);
const sortedTeams = [...mockTeams].sort((a, b) => b.stats.vulnerabilidades - a.stats.vulnerabilidades);
const totalTeamVulns = sortedTeams.reduce((acc, t) => acc + t.stats.vulnerabilidades, 0);

function getCurrentMonthName() {
  return new Date().toLocaleString('es-ES', { month: 'long' });
}

// Componente de copas y estrellas cartoon con lluvia dinámica tipo Matrix
const TrophySection: React.FC = () => {
  const [starCount, setStarCount] = React.useState(14);
  const [containerWidth, setContainerWidth] = React.useState(600);
  const [containerHeight, setContainerHeight] = React.useState(300);
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleResize() {
      const width = containerRef.current?.offsetWidth || 600;
      const height = containerRef.current?.offsetHeight || 300;
      setContainerWidth(width);
      setContainerHeight(height);
      if (width < 500) setStarCount(12);
      else if (width < 900) setStarCount(16);
      else setStarCount(20);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Degradados para estrellas
  const starGradients = [
    ['#FFD700', '#FFB300'], ['#FFB347', '#FFD700'], ['#FF69B4', '#FFD700'], ['#00F0FF', '#FFD700'],
    ['#A259FF', '#FFD700'], ['#39FF14', '#FFD700'], ['#FF6347', '#FFD700'], ['#00BFFF', '#FFD700'],
    ['#FFB300', '#FFD700'], ['#FFD700', '#A259FF'], ['#FFD700', '#39FF14'], ['#FFD700', '#FF69B4'],
  ];
  // Estado para forzar re-render de estrellas
  const [starKey, setStarKey] = React.useState(0);
  // Generar props aleatorios para cada estrella
  const getStars = () => Array.from({ length: starCount }).map((_, i) => ({
    x: Math.random() * (containerWidth - 40) + 20,
    gradId: `star-grad-${i}`,
    delay: Math.random() * 1.5 + i * 0.07,
    rot: Math.random() * 360,
    size: Math.random() * 1.2 + 1.1,
    duration: Math.random() * 1.2 + 1.2,
    id: `${starKey}-${i}`
  }));
  const [stars, setStars] = React.useState(getStars());
  // Cuando cambia el tamaño o el key, regenerar estrellas
  React.useEffect(() => {
    setStars(getStars());
    // eslint-disable-next-line
  }, [containerWidth, starCount, starKey]);
  // Handler para reiniciar una estrella (cuando termina su animación)
  const handleStarEnd = (i: number) => {
    setStars(prev => {
      const newStars = [...prev];
      newStars[i] = {
        ...newStars[i],
        x: Math.random() * (containerWidth - 40) + 20,
        rot: Math.random() * 360,
        size: Math.random() * 1.2 + 1.1,
        duration: Math.random() * 1.2 + 1.2,
        delay: Math.random() * 1.5,
        id: `${Date.now()}-${i}`
      };
      return newStars;
    });
  };
  // Pasar la altura real al SVG y a las estrellas
  return (
    <div className="w-full flex flex-col items-center justify-center my-8">
      <div ref={containerRef} className="relative flex flex-col items-center justify-center w-full max-w-2xl py-12 rounded-2xl shadow-lg" style={{ background: 'linear-gradient(180deg, #fff 80%, #f4f4f4 100%)', boxShadow: '0 8px 32px #0002' }}>
        {/* Lluvia de estrellas tipo Matrix */}
        <svg width="100%" height={containerHeight} className="absolute left-0 top-0 pointer-events-none" style={{ zIndex: 1 }}>
          {stars.map((star, i) => (
            <g key={star.id} style={{ transformOrigin: `${star.x}px 0px` }}>
              <defs>
                <linearGradient id={star.gradId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={starGradients[i % starGradients.length][0]} />
                  <stop offset="100%" stopColor={starGradients[i % starGradients.length][1]} />
                </linearGradient>
              </defs>
              <StarMatrix x={star.x} delay={star.delay} gradId={star.gradId} rot={star.rot} size={star.size} duration={star.duration} onEnd={() => handleStarEnd(i)} height={containerHeight} />
            </g>
          ))}
        </svg>
        {/* Copas cartoon */}
        <div className="relative flex flex-row items-end justify-center gap-12 z-10">
          <TrophyCartoonSVG color="#C0C0C0" className="w-24 h-28" place="2" face="calm" rotate={-15} />
          <TrophyCartoonSVG color="#FFD700" className="w-28 h-32" place="1" face="happy" rotate={0} />
          <TrophyCartoonSVG color="#cd7f32" className="w-24 h-28" place="3" face="cheeky" rotate={15} />
        </div>
      </div>
      <style>{`
        @keyframes trophy-bounce {
          0% { transform: translateY(-30px) scale(0.8); opacity: 0; }
          60% { transform: translateY(10px) scale(1.1); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-trophy-bounce { animation: trophy-bounce 0.7s cubic-bezier(.68,-0.55,.27,1.55) both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        @keyframes star-matrix {
          0% { opacity: 0; transform: translateY(-60px) rotate(0deg) scale(var(--star-size,1)); }
          80% { opacity: 1; transform: translateY(var(--star-end,170px)) rotate(360deg) scale(var(--star-size,1.2)); }
          90% { filter: drop-shadow(0 0 12px #fff) brightness(1.7); }
          100% { opacity: 0; transform: translateY(var(--star-end,220px)) rotate(720deg) scale(var(--star-size,1)); filter: drop-shadow(0 0 0px #fff); }
        }
      `}</style>
    </div>
  );
};
// SVG de estrella animada tipo Matrix
const StarMatrix: React.FC<{ x: number; delay: number; gradId: string; rot: number; size: number; duration: number; onEnd: () => void; height: number }> = ({ x, delay, gradId, rot, size, duration, onEnd, height }) => {
  const ref = React.useRef<SVGPolygonElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => onEnd();
    el.addEventListener('animationiteration', handle);
    return () => el.removeEventListener('animationiteration', handle);
  }, [onEnd]);
  // Calcular el punto final de la animación según la altura
  const endY = Math.max(120, height - 40);
  return (
    <polygon
      ref={ref}
      points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7"
      fill={`url(#${gradId})`}
      stroke="#bfa100"
      strokeWidth="1"
      filter="drop-shadow(0 2px 4px #bfa10088)"
      transform={`translate(${x},0) scale(${size}) rotate(${rot})`}
      style={{
        animation: `star-matrix ${duration}s ${delay}s linear infinite`,
        transformBox: 'fill-box',
        transformOrigin: 'center',
        '--star-size': size,
        '--star-end': `${endY}px`,
      } as any}
    />
  );
};
// SVG de copa cartoon
const TrophyCartoonSVG: React.FC<{ color: string; className?: string; place: string; face: 'happy' | 'calm' | 'cheeky'; rotate: number }> = ({ color, className, place, face, rotate }) => (
  <svg viewBox="0 0 64 80" className={className} style={{ filter: 'drop-shadow(0 4px 8px #0002)', transform: `rotate(${rotate}deg)` }}>
    {/* Sombra */}
    <ellipse cx="32" cy="78" rx="20" ry="4" fill="#bbb" opacity=".2" />
    {/* Base */}
    <rect x="22" y="62" width="20" height="8" rx="3" fill="#888" />
    <rect x="26" y="56" width="12" height="8" rx="3" fill="#aaa" />
    {/* Cuerpo */}
    <path d="M12 16 Q32 2 52 16 Q52 44 32 68 Q12 44 12 16 Z" fill={color} stroke="#888" strokeWidth="2" />
    {/* Brillo */}
    <ellipse cx="32" cy="28" rx="10" ry="5" fill="#fff6" />
    {/* Mangos */}
    <path d="M12 24 Q2 32 12 40" stroke="#888" strokeWidth="3" fill="none" />
    <path d="M52 24 Q62 32 52 40" stroke="#888" strokeWidth="3" fill="none" />
    {/* Carita */}
    {face === 'happy' && (
      <g>
        <ellipse cx="25" cy="36" rx="2" ry="3" fill="#222" />
        <ellipse cx="39" cy="36" rx="2" ry="3" fill="#222" />
        <path d="M27 44 Q32 48 37 44" stroke="#222" strokeWidth="2" fill="none" />
        <ellipse cx="32" cy="42" rx="2" ry="1" fill="#fff" opacity=".7" />
      </g>
    )}
    {face === 'calm' && (
      <g>
        <ellipse cx="25" cy="36" rx="2" ry="2.5" fill="#222" />
        <ellipse cx="39" cy="36" rx="2" ry="2.5" fill="#222" />
        <path d="M28 44 Q32 46 36 44" stroke="#222" strokeWidth="1.5" fill="none" />
      </g>
    )}
    {face === 'cheeky' && (
      <g>
        <ellipse cx="25" cy="36" rx="2" ry="2.5" fill="#222" />
        <ellipse cx="39" cy="36" rx="2" ry="2.5" fill="#222" />
        <path d="M27 44 Q32 42 37 44" stroke="#222" strokeWidth="2" fill="none" />
        <ellipse cx="24" cy="40" rx="1" ry="0.5" fill="#f99" />
        <ellipse cx="40" cy="40" rx="1" ry="0.5" fill="#f99" />
      </g>
    )}
    {/* Número de lugar */}
    <circle cx="32" cy="54" r="7" fill="#fff" stroke="#888" strokeWidth="1.5" />
    <text x="32" y="58" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#888">{place}</text>
  </svg>
);

const UsersScorePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estados para la modal de usuario
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  return (
    <>
      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Clasificación {getCurrentMonthName().charAt(0).toUpperCase() + getCurrentMonthName().slice(1)}
        </div>
        <div className="mb-4 text-base font-semibold text-gray-600">Usuarios</div>
        <UserRankingTable 
          users={sortedUsers.map(u => ({ ...u, nivel: 1 }))} 
          onUserClick={handleUserClick}
        />
        {/* Tabla de equipos debajo */}
        <div className="mb-4 text-base font-semibold text-gray-600">Equipos</div>
        <TeamRankingTable teams={sortedTeams} />
      </div>

      {/* Modal de usuario */}
      <UserModal
        user={selectedUser}
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </>
  );
};

export default UsersScorePage; 