import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUserCircle, FaSearch, FaCoins } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const ACCENT = '#00BFFF';
const DARK_BG = '#181A20';
const DARKER_BG = '#13151A';
const HEADER_BG = 'linear-gradient(90deg, #23263a 0%, #181A20 100%)';
const FONT = 'Inter, Roboto, Arial, sans-serif';

const userMock = {
  name: 'D4ZC',
  avatar: 'https://via.placeholder.com/40x40/00BFFF/FFFFFF?text=D',
  points: 50000,
  bluePoints: 0,
};

const categories = [
  { id: 'backgrounds', name: 'Fondos de perfil' },
  { id: 'miniprofiles', name: 'Miniperfiles' },
  { id: 'frames', name: 'Marcos de avatar' },
  { id: 'animated', name: 'Avatares animados' },
  { id: 'badges', name: 'Insignias especiales' },
  { id: 'season', name: 'Perfiles de temporada/juego' },
  { id: 'plates', name: 'Placas de nombre' },
];

const BADGES = ['Nuevo', 'Exclusivo', 'Limitado', null];

function randomBadge() {
  const b = BADGES[Math.floor(Math.random() * BADGES.length)];
  return b;
}

const mockProducts: Record<string, Product[]> = {
  backgrounds: [
    { id: 'bg1', name: 'Galaxia', price: 3000, image: 'https://via.placeholder.com/240x140/23263a/00BFFF?text=Galaxy', description: 'Fondo espacial espectacular.' },
    { id: 'bg2', name: 'Ciudad', price: 2500, image: 'https://via.placeholder.com/240x140/23263a/00BFFF?text=City', description: 'Fondo urbano moderno.' },
    { id: 'bg3', name: 'Montaña', price: 3200, image: 'https://via.placeholder.com/240x140/23263a/00BFFF?text=Mountain', description: 'Paisaje de montaña nevada.' },
    { id: 'bg4', name: 'Ciberespacio', price: 3500, image: 'https://via.placeholder.com/240x140/23263a/00BFFF?text=Cyber', description: 'Fondo digital futurista.' },
  ],
  miniprofiles: [
    { id: 'mp1', name: 'Mini Hacker', price: 4000, image: 'https://via.placeholder.com/120x120/23263a/00BFFF?text=Mini', description: 'Miniperfil hacker.' },
    { id: 'mp2', name: 'Mini Ninja', price: 4200, image: 'https://via.placeholder.com/120x120/23263a/00BFFF?text=Ninja', description: 'Miniperfil ninja veloz.' },
    { id: 'mp3', name: 'Mini Cyborg', price: 4100, image: 'https://via.placeholder.com/120x120/23263a/00BFFF?text=Cyborg', description: 'Miniperfil mitad humano, mitad máquina.' },
  ],
  frames: [
    { id: 'fr1', name: 'Marco Dorado', price: 2000, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Gold', description: 'Marco elegante dorado.' },
    { id: 'fr2', name: 'Marco Azul', price: 1800, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Blue', description: 'Marco con acento azul eléctrico.' },
    { id: 'fr3', name: 'Marco Pixel', price: 2100, image: 'https://via.placeholder.com/120x120/23263a/FFD700?text=Pixel', description: 'Marco estilo pixel art.' },
  ],
  animated: [
    { id: 'an1', name: 'Avatar Ninja', price: 5000, image: '/src/assets/Ninja.png', description: 'Avatar animado ninja.' },
    { id: 'an2', name: 'Avatar Robot', price: 5200, image: '/src/assets/Robot.jpg', description: 'Avatar animado robot.' },
    { id: 'an3', name: 'Avatar Dragón', price: 5400, image: '/src/assets/Dragon.png', description: 'Avatar animado dragón legendario.' },
  ],
  badges: [
    { id: 'bd1', name: 'Insignia Hacker', price: 1500, image: 'https://via.placeholder.com/100x100/00BFFF/23263a?text=H', description: 'Insignia para expertos en seguridad.' },
    { id: 'bd2', name: 'Insignia MVP', price: 1700, image: 'https://via.placeholder.com/100x100/FFD700/23263a?text=MVP', description: 'Insignia para jugadores destacados.' },
    { id: 'bd3', name: 'Insignia Legendaria', price: 2000, image: 'https://via.placeholder.com/100x100/23263a/FFD700?text=Legend', description: 'Insignia de edición limitada.' },
  ],
  season: [
    { id: 'ss1', name: 'Perfil Invierno', price: 3500, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Winter', description: 'Perfil de temporada invernal.' },
    { id: 'ss2', name: 'Perfil Verano', price: 3400, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Summer', description: 'Perfil de temporada veraniega.' },
    { id: 'ss3', name: 'Perfil Halloween', price: 3700, image: 'https://via.placeholder.com/120x120/23263a/FFD700?text=Halloween', description: 'Perfil de temporada de Halloween.' },
  ],
  plates: [
    { id: 'pl1', name: 'Placa Pro', price: 1000, image: 'https://via.placeholder.com/120x60/00BFFF/23263a?text=Pro', description: 'Placa de nombre profesional.' },
    { id: 'pl2', name: 'Placa Elite', price: 1200, image: 'https://via.placeholder.com/120x60/FFD700/23263a?text=Elite', description: 'Placa de nombre para élite.' },
    { id: 'pl3', name: 'Placa Gamer', price: 1100, image: 'https://via.placeholder.com/120x60/23263a/00BFFF?text=Gamer', description: 'Placa de nombre para gamers.' },
  ],
};

const getBadge = (id: string) => {
  // Deterministic badge for demo
  if (id.endsWith('1')) return 'Nuevo';
  if (id.endsWith('2')) return 'Exclusivo';
  return null;
};

const getUserPoints = () => {
  const points = localStorage.getItem('userPoints');
  return points ? parseInt(points, 10) : 0;
};

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('backgrounds');
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('default');
  const [cart, setCart] = useState<Product[]>([]);
  const [userPoints, setUserPoints] = useState(getUserPoints());
  const [userBluePoints] = useState(userMock.bluePoints);
  const [showCart, setShowCart] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserPoints(getUserPoints());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtrado y orden
  let products: Product[] = mockProducts[selectedCategory] || [];
  if (search) {
    products = products.filter((p: Product) => p.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (order === 'price-asc') {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (order === 'price-desc') {
    products = [...products].sort((a, b) => b.price - a.price);
  }

  // Carrito
  const addToCart = (product: Product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };
  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Comprar desde modal
  const handleBuy = (product: Product) => {
    if (userPoints >= product.price) {
      setUserPoints((pts) => pts - product.price);
      setSuccessMessage(`¡${product.name} adquirido!`);
      setTimeout(() => setSuccessMessage(null), 2500);
    setModalProduct(null);
    } else {
      setErrorMessage('No tienes suficientes puntos');
      setTimeout(() => setErrorMessage(null), 2500);
    }
  };

  return (
    <div style={{ background: DARK_BG, minHeight: '100vh', fontFamily: FONT }}>
      {/* Header */}
      <header style={{ background: HEADER_BG }} className="w-full px-0 py-0 shadow-lg">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div />
          {/* Search */}
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full max-w-md px-4 py-2 rounded-lg bg-[#23263a] text-white placeholder-gray-400 border-2 border-transparent focus:border-blue-400 outline-none transition"
              style={{ fontSize: 18 }}
            />
          </div>
          {/* User info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#23263a] px-3 py-1 rounded-full">
              <FaCoins color={ACCENT} size={20} />
              <span className="text-lg font-bold text-white">{userPoints}</span>
              <span className="text-xs text-blue-400 ml-1">Puntos</span>
            </div>
            <div className="flex items-center gap-2 bg-[#23263a] px-3 py-1 rounded-full">
              <FaCoins color={'#3af0ff'} size={20} />
              <span className="text-lg font-bold text-white">{userBluePoints}</span>
              <span className="text-xs text-cyan-400 ml-1">Blue-points</span>
            </div>
            <img src={userMock.avatar} alt="avatar" className="w-10 h-10 rounded-full border-2 border-blue-400" />
          </div>
        </div>
        {/* Categorías */}
        <nav className="flex gap-2 px-8 pb-2 border-b border-[#23263a]">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-200 text-sm md:text-base focus:outline-none ${selectedCategory === cat.id ? 'bg-[#23263a] text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-blue-300 hover:bg-[#23263a]'}`}
              style={{ letterSpacing: 0.5 }}
          >
            {cat.name}
          </button>
        ))}
        </nav>
      </header>
      {/* Mensajes de éxito/error */}
          {successMessage && (
        <div className="fixed top-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold animate-fade-in" style={{ background: ACCENT }}>
              {successMessage}
            </div>
          )}
      {errorMessage && (
        <div className="fixed top-6 right-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold animate-fade-in">
          {errorMessage}
        </div>
      )}
      {/* Main content solo grid de productos */}
      <main className="max-w-7xl mx-auto px-4 py-10" style={{ background: DARK_BG }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" style={{ background: DARK_BG }}>
          {products.map(product => {
            const badge = getBadge(product.id);
            const canBuy = userPoints >= product.price;
            return (
            <div
              key={product.id}
                className="relative bg-[#23263a] rounded-2xl shadow-lg border border-[#23263a] flex flex-col items-center p-5 transition-transform hover:scale-105 hover:border-blue-400 group"
                style={{ minHeight: 320, boxShadow: '0 4px 24px rgba(0,191,255,0.08)' }}
              >
                {/* Badge */}
                {badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${badge === 'Nuevo' ? 'bg-blue-500 text-white' : badge === 'Exclusivo' ? 'bg-purple-600 text-white' : 'bg-yellow-500 text-black'}`}>{badge}</span>
                )}
                {/* Imagen */}
                <img src={product.image} alt={product.name} className="w-40 h-24 object-cover rounded-lg mb-4 border-2 border-[#181A20]" style={{ boxShadow: '0 2px 8px #00BFFF22' }} />
                {/* Nombre */}
                <div className="font-bold text-lg text-white mb-1 text-center" style={{ letterSpacing: 0.5 }}>{product.name}</div>
                {/* Descripción */}
                <div className="text-gray-400 text-xs mb-2 text-center" style={{ minHeight: 32 }}>{product.description}</div>
                {/* Precio */}
                <div className="flex items-center gap-2 mb-4">
                  <FaCoins color={ACCENT} size={18} />
                  <span className="font-semibold text-blue-400 text-base">{product.price}</span>
                  <span className="text-xs text-gray-400">Puntos</span>
                </div>
                {/* Botón Comprar */}
                <button
                  className={`w-full py-2 rounded-lg font-bold text-white transition-all duration-200 mt-auto ${canBuy ? 'bg-blue-500 hover:bg-blue-400 shadow-lg' : 'bg-gray-700 cursor-not-allowed opacity-60'}`}
                  style={{ fontSize: 16, letterSpacing: 1, boxShadow: canBuy ? '0 2px 8px #00BFFF55' : undefined }}
                  disabled={!canBuy}
              onClick={() => setModalProduct(product)}
                  title={canBuy ? 'Comprar' : 'Puntos insuficientes'}
            >
                  {canBuy ? 'Comprar' : 'Puntos insuficientes'}
                </button>
            </div>
            );
          })}
        </div>
      </main>
        {/* Modal de detalles */}
        {modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#23263a] rounded-2xl shadow-2xl p-8 w-full max-w-md relative border-2 border-blue-400" style={{ boxShadow: '0 8px 32px #00BFFF33' }}>
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl" onClick={() => setModalProduct(null)}>&times;</button>
            <img src={modalProduct.image} alt={modalProduct.name} className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-[#181A20]" />
            <div className="font-bold text-2xl text-white mb-2 text-center">{modalProduct.name}</div>
            <div className="text-blue-400 font-bold text-lg mb-2 flex items-center justify-center gap-2"><FaCoins color={ACCENT} /> {modalProduct.price} <span className="text-xs text-gray-400">Puntos</span></div>
            <div className="mb-4 text-gray-300 text-center">{modalProduct.description}</div>
              <button
              className={`w-full py-2 rounded-lg font-bold text-white transition-all duration-200 mt-2 ${userPoints >= modalProduct.price ? 'bg-blue-500 hover:bg-blue-400 shadow-lg' : 'bg-gray-700 cursor-not-allowed opacity-60'}`}
              style={{ fontSize: 16, letterSpacing: 1 }}
              disabled={userPoints < modalProduct.price}
              onClick={() => handleBuy(modalProduct)}
              >
              {userPoints >= modalProduct.price ? 'Confirmar compra' : 'Puntos insuficientes'}
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

export default Shop; 