import React from 'react';
import RewardCard from '../components/Shop/RewardCard';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { usePagination } from '../hooks/usePagination';
import Modal from '../components/ui/Modal';

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

// Definir el tipo Reward igual que en RewardCard
interface Reward {
  id: number;
  name: string;
  description: string;
  images: string[];
  cost: number;
  rarity: 'común' | 'raro' | 'épico' | 'legendario' | 'mítico';
  category: string;
  featured?: boolean;
}

interface Redemption {
  id: number;
  recompensa: string;
  puntos_gastados: number;
  fecha_canje: string;
}

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const { user, updateUser, addRedemption } = useAuth();
  const { showToast } = useToast();
  const [autocomplete, setAutocomplete] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [loadingRewardId, setLoadingRewardId] = React.useState<number | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [redeemedReward, setRedeemedReward] = React.useState<Reward | null>(null);

  const userPoints = user?.points || 0;
  const redemptions = user?.redemptions || [];

  // Filtrado de productos según búsqueda y categoría
  const filteredRewards = (selectedCategory === 'all' ? mockRewards : mockRewards.filter((r) => r.category === selectedCategory))
    .filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    );

  // Paginación real usando hook
  const {
    page,
    setPage,
    nextPage,
    prevPage,
    totalPages,
    paginatedItems: paginatedRewards,
  } = usePagination(filteredRewards, PAGE_SIZE);

  React.useEffect(() => {
    setPage(1); // Reiniciar a la página 1 al cambiar filtro o búsqueda
  }, [selectedCategory, search, setPage]);

  // Autocompletado de nombres
  React.useEffect(() => {
    if (search.length > 0) {
      setAutocomplete(
        mockRewards
          .map((r) => r.name)
          .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
          .slice(0, 5)
      );
      setShowSuggestions(true);
    } else {
      setAutocomplete([]);
      setShowSuggestions(false);
    }
  }, [search]);

  // Lógica de compra
  const handleBuy = async (reward: Reward) => {
    if (userPoints < reward.cost) {
      showToast('No tienes suficientes puntos para este producto.', 'error');
      return;
    }
    setLoadingRewardId(reward.id);
    try {
      await new Promise((res) => setTimeout(res, 1200));
      const newRedemption = {
        id: Date.now(),
        recompensa: reward.name,
        puntos_gastados: reward.cost,
        fecha_canje: new Date().toISOString().slice(0, 10),
      };
      addRedemption(newRedemption);
      updateUser({
        ...user!,
        points: userPoints - reward.cost,
      });
      showToast(`¡Has canjeado ${reward.name}!`, 'success');
      setRedeemedReward(reward);
      setShowModal(true);
    } catch (e) {
      showToast('Error al canjear. Intenta de nuevo.', 'error');
    } finally {
      setLoadingRewardId(null);
    }
  };

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
            <span className="bg-cyan-400 text-cyan-900 font-bold px-4 py-2 rounded-full border-2 border-cyan-300 shadow-cyber text-lg animate-pulse-soft">
              {userPoints} Blue Points
            </span>
          </div>
        </header>

        {/* Barra de búsqueda con autocompletado */}
        <div className="mb-6 flex flex-col items-center relative max-w-lg mx-auto">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border-2 border-cyan-400 neon-shadow text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg font-mono"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          {showSuggestions && autocomplete.length > 0 && (
            <ul className="absolute top-14 left-0 w-full bg-black/90 border-2 border-cyan-400 rounded-lg shadow-cyber z-20">
              {autocomplete.map((suggestion) => (
                <li
                  key={suggestion}
                  className="px-4 py-2 cursor-pointer hover:bg-cyan-800 text-cyan-200"
                  onMouseDown={() => {
                    setSearch(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`px-6 py-2 rounded-full font-bold border-2 transition-all text-lg shadow-cyber tracking-wider neon-shadow focus:outline-none focus:ring-2 focus:ring-pink-400 active:scale-95 active:shadow-inner hover:shadow-pink-400/60 hover:scale-110 ${selectedCategory === cat.key ? 'bg-pink-600 border-pink-400 text-white scale-105 animate-bounce-short' : 'bg-white/10 border-white/20 hover:bg-cyan-800 text-cyan-200 hover:scale-105'}`}
              onClick={() => {
                setSelectedCategory(cat.key);
                // setPage(1); // <-- Quitar esta línea
              }}
              style={{ boxShadow: selectedCategory === cat.key ? '0 0 12px 2px #ec4899' : undefined }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Paginación de productos */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold mb-4 text-yellow-300 neon-text drop-shadow-cyber tracking-widest">Productos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedRewards.length === 0 ? (
              <div className="text-pink-400 font-bold text-xl col-span-4">No se encontraron productos.</div>
            ) : (
              paginatedRewards.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userPoints={userPoints}
                  onBuy={() => handleBuy(reward)}
                  isLoading={loadingRewardId === reward.id}
                />
              ))
            )}
          </div>
          {/* Controles de paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                className="px-3 py-2 rounded-full bg-cyan-800 border-2 border-cyan-400 neon-shadow text-lg font-bold disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-cyan-400 active:scale-95 hover:shadow-cyan-400/60 hover:scale-110 transition-all"
                onClick={prevPage}
                disabled={page === 1}
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`px-3 py-2 rounded-full font-bold border-2 transition-all text-lg shadow-cyber tracking-wider neon-shadow focus:outline-none focus:ring-2 focus:ring-pink-400 active:scale-95 active:shadow-inner hover:shadow-pink-400/60 hover:scale-110 ${page === p ? 'bg-pink-600 border-pink-400 text-white scale-105 animate-bounce-short' : 'bg-white/10 border-white/20 hover:bg-cyan-800 text-cyan-200 hover:scale-105'}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className="px-3 py-2 rounded-full bg-cyan-800 border-2 border-cyan-400 neon-shadow text-lg font-bold disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-cyan-400 active:scale-95 hover:shadow-cyan-400/60 hover:scale-110 transition-all"
                onClick={nextPage}
                disabled={page === totalPages}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>

        {/* Historial de canjes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-cyan-200 drop-shadow-cyber">Historial de Canjes</h2>
          {redemptions.length === 0 ? (
            <div className="text-gray-400">Aún no has canjeado productos.</div>
          ) : (
            <ul className="space-y-2">
              {redemptions.map((r) => (
                <li key={r.id} className="bg-black/60 border-2 border-cyan-400 neon-shadow rounded-lg px-4 py-2 flex items-center gap-4">
                  <span className="font-bold text-cyan-200">{r.recompensa}</span>
                  <span className="text-yellow-300">-{r.puntos_gastados} pts</span>
                  <span className="text-gray-400 ml-auto text-sm">{r.fecha_canje}</span>
                </li>
              ))}
            </ul>
          )}
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
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="¡Canje exitoso!"
      >
        {redeemedReward && (
          <div className="flex flex-col items-center gap-4">
            <img src={redeemedReward.images[0]} alt={redeemedReward.name} className="w-24 h-24 rounded-xl shadow-cyber" />
            <h3 className="text-xl font-bold text-cyan-200 text-center">{redeemedReward.name}</h3>
            <p className="text-pink-300 text-center">{redeemedReward.description}</p>
            <span className="text-yellow-300 font-bold">-{redeemedReward.cost} Blue Points</span>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-cyan-600 text-white font-bold px-6 py-2 rounded-full hover:bg-cyan-700 transition"
            >
              ¡Genial!
            </button>
          </div>
        )}
      </Modal>
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
        .animate-bounce-short {
          animation: bounce-short 0.4s cubic-bezier(.4,0,.2,1);
        }
        @keyframes bounce-short {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.18); }
          60% { transform: scale(0.92); }
          80% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Shop; 
