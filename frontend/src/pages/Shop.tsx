import React from 'react';
import AnimatedBackground from '../components/Shop/AnimatedBackground';
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

// Mock de recompensas
const mockRewards = [
  {
    id: 1,
    name: 'Skin Cyber Ninja',
    description: 'Desbloquea un aspecto exclusivo para tu avatar.',
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
    cost: 400,
    rarity: 'épico' as const,
    category: 'skin',
  },
  {
    id: 2,
    name: 'Teclado RGB Pro',
    description: 'Teclado mecánico con luces RGB y switches ultra rápidos.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80',
    ],
    cost: 900,
    rarity: 'legendario' as const,
    category: 'electrónico',
  },
  {
    id: 3,
    name: 'Audífonos Gamer',
    description: 'Sumérgete en el juego con sonido envolvente.',
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    ],
    cost: 600,
    rarity: 'épico' as const,
    category: 'electrónico',
  },
  {
    id: 4,
    name: 'Skin Dragón de Fuego',
    description: 'Aspecto mítico con efectos visuales especiales.',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
    cost: 1200,
    rarity: 'mítico' as const,
    category: 'skin',
  },
  {
    id: 5,
    name: 'Mouse Gamer',
    description: 'Precisión y velocidad para tus partidas.',
    images: [
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80',
    ],
    cost: 350,
    rarity: 'común' as const,
    category: 'electrónico',
  },
  {
    id: 6,
    name: 'Skin Guerrero de Hielo',
    description: 'Aspecto raro con detalles congelados.',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    cost: 500,
    rarity: 'raro' as const,
    category: 'skin',
  },
];

// Paginación sencilla
const PAGE_SIZE = 4;

const Shop: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(mockRewards.length / PAGE_SIZE);
  const rewardsToShow = mockRewards.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white overflow-x-hidden">
      <AnimatedBackground />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <header className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg mb-2">Tienda Virtual</h1>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-blue-300">Nivel {mockUser.level}</span>
              <span className="text-yellow-300">#{mockUser.rank} Global</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 bg-blue-800 rounded-lg px-6 py-3 flex items-center gap-3 shadow-lg">
            <span className="font-bold text-lg">{mockUser.name}</span>
            <span className="bg-blue-400 text-blue-900 font-bold px-3 py-1 rounded-full">{mockUser.totalPoints} Blue Points</span>
          </div>
        </header>

        {/* Stats Banner */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{mockUser.totalPoints}</div>
              <div className="text-sm text-gray-300">Total Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{mockUser.vulnerabilitiesFound}</div>
              <div className="text-sm text-gray-300">Vulns Found</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">{mockUser.streak}</div>
              <div className="text-sm text-gray-300">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{mockUser.accuracy}%</div>
              <div className="text-sm text-gray-300">Accuracy</div>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {rewardsToShow.map((reward) => (
            <RewardCard key={reward.id} reward={reward} userPoints={mockUser.totalPoints} />
          ))}
        </section>
        
        {/* Paginación */}
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 disabled:bg-gray-700 disabled:cursor-not-allowed"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span className="font-bold text-lg">Página {page} de {totalPages}</span>
          <button
            className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 disabled:bg-gray-700 disabled:cursor-not-allowed"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Siguiente
          </button>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <a 
            href="/" 
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ← Volver al Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Shop; 