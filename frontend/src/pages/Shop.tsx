import React from 'react';
import RewardCard from '../components/Shop/RewardCard';

// Mock de usuario (mismo que en Dashboard)
const mockUser = {
  name: 'PlayerOne',
  level: 15,
  rank: 3,
  totalPoints: 1250,
  pointsThisWeek: 180,
  vulnerabilitiesFound: 47,
  criticalVulns: 8,
  highVulns: 12,
  mediumVulns: 18,
  lowVulns: 9,
  rewardsEarned: 12,
  streak: 7,
  accuracy: 94.2,
};

// Mock de recompensas mejorado
const mockRewards = [
  // Skins
  {
    id: 1,
    name: 'Skin Cyber Ninja',
    description:
      'Desbloquea un aspecto exclusivo para tu avatar estilo ninja cibernético.',
    images: [
      'https://static.wikia.nocookie.net/fortnite_gamepedia/images/2/2e/Cyber_Ninja_Skin.png',
    ],
    cost: 400,
    rarity: 'épico' as const,
    category: 'skin',
    featured: true,
  },
  {
    id: 2,
    name: 'Skin Guerrero de Hielo',
    description: 'Aspecto raro con detalles congelados y efectos de hielo.',
    images: [
      'https://static.wikia.nocookie.net/fortnite_gamepedia/images/7/7e/Ice_King_Skin.png',
    ],
    cost: 500,
    rarity: 'raro' as const,
    category: 'skin',
    featured: false,
  },
  {
    id: 3,
    name: 'Skin Dragón de Fuego',
    description:
      'Aspecto mítico con efectos visuales de fuego y alas de dragón.',
    images: [
      'https://static.wikia.nocookie.net/fortnite_gamepedia/images/3/3d/Blaze_Skin.png',
    ],
    cost: 1200,
    rarity: 'mítico' as const,
    category: 'skin',
    featured: true,
  },
  {
    id: 4,
    name: 'Skin Hacker Pro',
    description: 'Skin especial para los mejores cazadores de bugs.',
    images: [
      'https://static.wikia.nocookie.net/fortnite_gamepedia/images/6/6e/Breakpoint_Skin.png',
    ],
    cost: 800,
    rarity: 'legendario' as const,
    category: 'skin',
    featured: false,
  },
  // Electrónicos
  {
    id: 5,
    name: 'Teclado RGB Pro',
    description: 'Teclado mecánico con luces RGB y switches ultra rápidos.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    ],
    cost: 900,
    rarity: 'legendario' as const,
    category: 'electrónico',
    featured: true,
  },
  {
    id: 6,
    name: 'Mouse Gamer',
    description: 'Precisión y velocidad para tus partidas.',
    images: [
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80',
    ],
    cost: 350,
    rarity: 'común' as const,
    category: 'electrónico',
    featured: false,
  },
  {
    id: 7,
    name: 'Audífonos Gamer',
    description:
      'Sumérgete en el juego con sonido envolvente y cancelación de ruido.',
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    ],
    cost: 600,
    rarity: 'épico' as const,
    category: 'electrónico',
    featured: false,
  },
  {
    id: 8,
    name: 'Monitor UltraWide 144Hz',
    description: 'Pantalla curva para máxima inmersión.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    ],
    cost: 2000,
    rarity: 'mítico' as const,
    category: 'electrónico',
    featured: true,
  },
  // Power-ups
  {
    id: 9,
    name: 'Doble Puntos (1h)',
    description: 'Duplica los puntos ganados durante 1 hora.',
    images: ['https://cdn-icons-png.flaticon.com/512/1828/1828884.png'],
    cost: 300,
    rarity: 'raro' as const,
    category: 'power-up',
    featured: false,
  },
  {
    id: 10,
    name: 'Revivir Racha',
    description: 'Recupera tu racha si la pierdes por un día.',
    images: ['https://cdn-icons-png.flaticon.com/512/1828/1828919.png'],
    cost: 250,
    rarity: 'épico' as const,
    category: 'power-up',
    featured: false,
  },
  // Objetos virtuales
  {
    id: 11,
    name: 'Avatar Personalizado',
    description: 'Crea tu propio avatar único.',
    images: ['https://cdn-icons-png.flaticon.com/512/3135/3135715.png'],
    cost: 700,
    rarity: 'legendario' as const,
    category: 'virtual',
    featured: true,
  },
  {
    id: 12,
    name: 'Marco de Perfil Dorado',
    description: 'Haz que tu perfil destaque con un marco dorado.',
    images: ['https://cdn-icons-png.flaticon.com/512/1828/1828884.png'],
    cost: 150,
    rarity: 'común' as const,
    category: 'virtual',
    featured: false,
  },
];

const categories = [
  { key: 'all', label: 'Todos' },
  { key: 'skin', label: 'Skins' },
  { key: 'electrónico', label: 'Electrónicos' },
  { key: 'power-up', label: 'Power-Ups' },
  { key: 'virtual', label: 'Virtuales' },
];

const PAGE_SIZE = 4;

const Shop: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredRewards
    = selectedCategory === 'all'
      ? mockRewards
      : mockRewards.filter((r) => r.category === selectedCategory);

  const totalPages = Math.ceil(filteredRewards.length / PAGE_SIZE);
  const rewardsToShow = filteredRewards.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white overflow-x-hidden">
      {/* Fondo cyberpunk con partículas */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow-shop" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#ff00ea" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="80%" cy="20%" r="400" fill="url(#cyberpunk-glow-shop)" />
          <circle cx="20%" cy="80%" r="300" fill="url(#cyberpunk-glow-shop)" />
        </svg>
      </div>
      <div className="max-w-5xl mx-auto py-10 px-4 relative z-10">
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <div>
            <h1 className="text-5xl font-extrabold tracking-widest neon-text drop-shadow-cyber mb-2">TIENDA VIRTUAL</h1>
            <div className="flex items-center gap-4 text-lg">
              <span className="text-cyan-300 font-bold">Nivel {mockUser.level}</span>
              <span className="text-pink-300 font-bold">#{mockUser.rank} Global</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 bg-cyan-900/80 border-2 border-cyan-400 rounded-xl px-8 py-4 flex items-center gap-3 shadow-cyber">
            <span className="font-bold text-2xl text-cyan-200 drop-shadow-cyber">{mockUser.name}</span>
            <span className="bg-cyan-400 text-cyan-900 font-bold px-4 py-2 rounded-full border-2 border-cyan-300 shadow-cyber text-lg">
              {mockUser.totalPoints} Blue Points
            </span>
          </div>
        </header>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`px-6 py-2 rounded-full font-bold border-2 transition-colors text-lg shadow-cyber tracking-wider neon-shadow ${selectedCategory === cat.key ? 'bg-pink-600 border-pink-400 text-white scale-105' : 'bg-white/10 border-white/20 hover:bg-cyan-800 text-cyan-200 hover:scale-105'}`}
              onClick={() => {
                setSelectedCategory(cat.key);
                setPage(1);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Ofertas y destacados */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold mb-4 text-yellow-300 neon-text drop-shadow-cyber tracking-widest">Ofertas y Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockRewards
              .filter((r) => r.featured)
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userPoints={mockUser.totalPoints}
                />
              ))}
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {rewardsToShow.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userPoints={mockUser.totalPoints}
            />
          ))}
        </section>
        
        {/* Paginación */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-6 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 border-2 border-cyan-400 neon-shadow text-lg font-bold disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span className="font-bold text-xl text-cyan-200">Página {page} de {totalPages}</span>
          <button
            className="px-6 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 border-2 border-cyan-400 neon-shadow text-lg font-bold disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Siguiente
          </button>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-12">
          <a 
            href="/" 
            className="inline-block bg-gradient-to-br from-gray-700 via-gray-900 to-black hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-extrabold text-lg border-2 border-cyan-400 neon-shadow transition-colors tracking-widest drop-shadow-cyber"
          >
            ← Volver al Dashboard
          </a>
        </div>
      </div>
      {/* Estilos cyberpunk extra */}
      <style>{`
        .neon-text {
          color: #ff00ea;
          text-shadow: 0 0 8px #ff00ea, 0 0 16px #00fff7, 0 0 32px #00fff7;
        }
        .drop-shadow-cyber {
          filter: drop-shadow(0 0 8px #00fff7) drop-shadow(0 0 16px #a78bfa);
        }
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
        .neon-shadow {
          box-shadow: 0 0 16px 2px #ff00ea, 0 0 32px 4px #00fff7, 0 0 8px #fff0;
        }
      `}</style>
    </div>
  );
};

export default Shop;
