import React, { useState, useMemo } from 'react';
import { FaShoppingCart, FaCheckCircle, FaCrown, FaGem, FaUser, FaImage, FaPalette, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Mock de usuario y ranking
const mockUser = {
  id: 1,
  name: 'Juan Pérez',
  points: 1200,
  isMVP: true, // Cambia a false para probar sin MVP
  ranking: 1, // top 1
  acquired: ['avatar1', 'marco1'], // ids de productos adquiridos
  bluePoints: 0,
};

// 2. Mock de productos
const products = [
  // Avatares (todos los encontrados en /avatars)
  { id: 'avatar_prueba', name: 'Prueba', type: 'avatar', price: 200, img: '/avatars/prueba.png', desc: 'Avatar de prueba', limited: false },
  { id: 'avatar_cat', name: 'Cat', type: 'avatar', price: 220, img: '/avatars/cat.gif', desc: 'Avatar de gato animado', limited: false },
  { id: 'avatar_cat_avatar', name: 'Cat Avatar', type: 'avatar', price: 230, img: '/avatars/cat_avatar.webp', desc: 'Avatar de gato', limited: false },
  { id: 'avatar_lucy', name: 'Lucy', type: 'avatar', price: 250, img: '/avatars/lucy_avatar.webp', desc: 'Avatar de Lucy', limited: false },
  { id: 'avatar_rebecca', name: 'Rebecca', type: 'avatar', price: 250, img: '/avatars/rebecca_avatar.webp', desc: 'Avatar de Rebecca', limited: false },
  { id: 'avatar_rebeca', name: 'Rebeca', type: 'avatar', price: 250, img: '/avatars/rebeca_avatar.webp', desc: 'Avatar de Rebeca', limited: false },
  { id: 'avatar_david2', name: 'David 2', type: 'avatar', price: 240, img: '/avatars/david_avatar2.webp', desc: 'Avatar de David versión 2', limited: false },
  { id: 'avatar_david', name: 'David', type: 'avatar', price: 240, img: '/avatars/david_avatar.webp', desc: 'Avatar de David', limited: false },
  { id: 'avatar_poro2', name: 'Poro 2', type: 'avatar', price: 210, img: '/avatars/poro_avatar2.webp', desc: 'Avatar de Poro versión 2', limited: false },
  { id: 'avatar_poro', name: 'Poro', type: 'avatar', price: 210, img: '/avatars/poro_avatar.webp', desc: 'Avatar de Poro', limited: false },
  { id: 'avatar_teemo', name: 'Teemo', type: 'avatar', price: 230, img: '/avatars/teemo.webp', desc: 'Avatar de Teemo', limited: false },
  { id: 'avatar_toga', name: 'Toga', type: 'avatar', price: 260, img: '/avatars/toga.gif', desc: 'Avatar de Toga animado', limited: false },
  { id: 'avatar_ado', name: 'Ado', type: 'avatar', price: 220, img: '/avatars/ado.webp', desc: 'Avatar de Ado', limited: false },
  { id: 'avatar_avatargif', name: 'Avatar GIF', type: 'avatar', price: 230, img: '/avatars/avatargif.gif', desc: 'Avatar animado', limited: false },
  { id: 'avatar_panda', name: 'Panda', type: 'avatar', price: 250, img: '/avatars/panda.gif', desc: 'Avatar de Panda animado', limited: false },
  { id: 'avatar_img_example', name: 'Ejemplo', type: 'avatar', price: 200, img: '/avatars/img_example.jpg', desc: 'Avatar de ejemplo', limited: false },
  { id: 'avatar_anime', name: 'Anime', type: 'avatar', price: 240, img: '/avatars/anime_avatar.gif', desc: 'Avatar de anime animado', limited: false },
  { id: 'avatar_naruto', name: 'Naruto', type: 'avatar', price: 260, img: '/avatars/naruto_avatar.gif', desc: 'Avatar de Naruto animado', limited: false },

  // Banners (todos los encontrados en /banners)
  { id: 'banner_lluvia', name: 'Lluvia', type: 'banner', price: 320, img: '/banners/lluvia_banner.gif', desc: 'Banner de lluvia animado', limited: false },
  { id: 'banner_cat', name: 'Cat', type: 'banner', price: 300, img: '/banners/cat.gif', desc: 'Banner de gato', limited: false },
  { id: 'banner_cat_banner', name: 'Cat Banner', type: 'banner', price: 320, img: '/banners/cat_banner.gif', desc: 'Banner de gato animado', limited: false },
  { id: 'banner_galaxy2', name: 'Galaxy 2', type: 'banner', price: 340, img: '/banners/banner_galaxy2.gif', desc: 'Banner galáctico 2', limited: false },
  { id: 'banner_galaxy', name: 'Galaxy', type: 'banner', price: 350, img: '/banners/banner_galaxy.gif', desc: 'Banner galáctico', limited: false },
  { id: 'banner_jinx', name: 'Jinx', type: 'banner', price: 330, img: '/banners/banner_jinx.gif', desc: 'Banner de Jinx', limited: false },
  { id: 'banner_lol', name: 'LOL', type: 'banner', price: 330, img: '/banners/banner_lol.gif', desc: 'Banner de LOL', limited: false },
  { id: 'banner_temo', name: 'Temo', type: 'banner', price: 320, img: '/banners/temo_banner.webp', desc: 'Banner de Temo', limited: false },
  { id: 'banner_2077', name: '2077', type: 'banner', price: 340, img: '/banners/2077.gif', desc: 'Banner 2077', limited: false },
  { id: 'banner_la', name: 'LA', type: 'banner', price: 340, img: '/banners/la.gif', desc: 'Banner LA', limited: false },
  { id: 'banner_moco', name: 'Moco', type: 'banner', price: 340, img: '/banners/moco.gif', desc: 'Banner Moco', limited: false },
  { id: 'banner_fondo', name: 'Fondo', type: 'banner', price: 320, img: '/banners/fondo.webp', desc: 'Banner Fondo', limited: false },

  // Marcos (todos los encontrados en /marcos)
  { id: 'marco1', name: 'Marco Dorado', type: 'marco', price: 400, img: '/marcos/marco1.png', desc: 'Marco dorado exclusivo', limited: true },
  { id: 'marco2', name: 'Marco Cibernético', type: 'marco', price: 350, img: '/marcos/marco2.png', desc: 'Marco con estilo tech', limited: false },
  { id: 'marco3', name: 'Marco Legendario', type: 'marco', price: 420, img: '/marcos/marco3.png', desc: 'Marco legendario para los mejores', limited: true },
  { id: 'marco4', name: 'Marco Glitch', type: 'marco', price: 390, img: '/marcos/marco4.png', desc: 'Marco con efecto glitch', limited: false },
  { id: 'marco5', name: 'Marco Supremo', type: 'marco', price: 450, img: '/marcos/marco5.png', desc: 'Marco supremo de élite', limited: true },

  // Fondos (todos los encontrados en /fondos)
  { id: 'fondo_nebula', name: 'Nebula', type: 'fondo', price: 200, img: '/fondos/nebula_fondo.webp', desc: 'Fondo Nebula', limited: false },
  { id: 'fondo_ado', name: 'Ado Artist', type: 'fondo', price: 210, img: '/fondos/Ado_ArtistImage.webp', desc: 'Fondo de Ado artista', limited: false },
  { id: 'fondo_2077', name: '2077', type: 'fondo', price: 220, img: '/fondos/2077.gif', desc: 'Fondo animado 2077', limited: false },
  { id: 'fondo_moco', name: 'Moco', type: 'fondo', price: 210, img: '/fondos/moco.gif', desc: 'Fondo Moco', limited: false },
  { id: 'fondo_fondo', name: 'Fondo', type: 'fondo', price: 200, img: '/fondos/fondo.webp', desc: 'Fondo especial', limited: false },

  // Blue Points (solo en tienda MVP)
  { id: 'blue1', name: 'Blue Points x100', type: 'blue', price: 500, img: '/badges/badge4.png', desc: '100 Blue Points para ventajas especiales', limited: true, mvpOnly: true },
];

// 3. Definición de categorías y tabs
const categories = [
  { key: 'avatar', label: 'Avatares', icon: <FaUser /> },
  { key: 'banner', label: 'Banners', icon: <FaImage /> },
  { key: 'marco', label: 'Marcos', icon: <FaPalette /> },
  { key: 'fondo', label: 'Fondos', icon: <FaStar /> },
];

const Shop: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState('avatar');
  const [showConfirm, setShowConfirm] = useState<{ id: string; name: string; price: number } | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 4. Lógica de filtrado de productos por tab
  const filtered = useMemo(() => {
    if (activeTab === 'mvp') {
      return products.filter(p => p.type === 'blue' && p.mvpOnly);
    }
    return products.filter(p => p.type === activeTab);
  }, [activeTab]);

  // Comprar producto
  const handleBuy = (prod: any) => {
    if (user.acquired.includes(prod.id) || (prod.limited && user.acquired.includes(prod.id))) {
      setError('Ya adquiriste este producto.');
      return;
    }
    if (user.points < prod.price) {
      setError('No tienes suficientes puntos.');
      return;
    }
    setShowConfirm({ id: prod.id, name: prod.name, price: prod.price });
  };

  // Confirmar compra
  const confirmBuy = () => {
    if (!showConfirm) return;
    const prod = products.find(p => p.id === showConfirm.id);
    if (!prod) return;
    if (user.points < prod.price) {
      setError('No tienes suficientes puntos.');
      setShowConfirm(null);
      return;
    }
    // Actualiza puntos, ranking y productos adquiridos (mock)
    setUser(prev => ({
      ...prev,
      points: prev.points - prod.price,
      acquired: [...prev.acquired, prod.id],
      bluePoints: prod.type === 'blue' ? prev.bluePoints + 100 : prev.bluePoints,
      ranking: Math.max(1, prev.ranking - 1), // Simula mejora en ranking
    }));
    setSuccess(prod.name);
    setShowConfirm(null);
    setTimeout(() => setSuccess(null), 2000);
  };

  // Tabs: categorías + MVP
  const tabs = [...categories, ...(user.isMVP ? [{ key: 'mvp', label: 'Tienda MVP', icon: <FaCrown className="text-blue-400 animate-pulse" /> }] : [])];

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-2 relative bg-gradient-to-br from-[#181c24] via-[#23273a] to-[#181c24]">
      <div className="w-full max-w-4xl mx-auto bg-[#181c24]/90 rounded-2xl shadow-2xl border border-cyan-900/40 p-8 flex flex-col gap-8 relative">
        {/* Header y saldo */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="text-3xl text-cyan-400" />
            <h1 className="text-3xl font-extrabold text-cyan-300 tracking-wide drop-shadow-lg">Tienda</h1>
            {user.isMVP && <span className="ml-3 px-3 py-1 bg-blue-900 text-blue-300 rounded-full font-bold flex items-center gap-2"><FaCrown className="text-yellow-400" /> MVP</span>}
          </div>
          <div className="flex items-center gap-2 bg-gray-900/80 px-4 py-2 rounded-xl shadow border border-cyan-700">
            <FaGem className="text-blue-400 text-xl animate-float" />
            <span className="text-lg font-bold text-cyan-200">{user.points} pts</span>
            {user.bluePoints > 0 && <span className="ml-2 text-blue-400 font-bold">+{user.bluePoints} Blue Points</span>}
          </div>
        </div>
        {/* Tabs */}
        <div className="flex flex-row gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all border-2 text-base
                ${activeTab === tab.key ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white border-cyan-400' : 'bg-gray-800/80 text-cyan-300 border-gray-600 hover:bg-cyan-900/40'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        {/* Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map(prod => (
            <motion.div
              key={prod.id}
              className={`bg-[#23273a] rounded-xl border-2 border-cyan-800 shadow-lg p-4 flex flex-col items-center gap-2 relative animate-fadeIn overflow-hidden ${user.acquired.includes(prod.id) ? 'opacity-60' : ''}`}
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px 8px #00bcd4cc, 0 8px 32px 0 #0ff2' }}
              style={{ position: 'relative', zIndex: 1 }}
              onMouseEnter={e => {
                const card = e.currentTarget;
                card.classList.add('shop-glow-soft');
              }}
              onMouseLeave={e => {
                const card = e.currentTarget;
                card.classList.remove('shop-glow-soft');
              }}
            >
              {/* Borde glow sutil */}
              <div className="absolute -inset-1 pointer-events-none z-0 shop-glow-soft-border" />
              <img src={prod.img} alt={prod.name} className="w-24 h-24 object-contain rounded-lg mb-2 z-10" />
              <div className="text-lg font-bold text-cyan-200 text-center truncate w-full max-w-[140px] z-10">{prod.name}</div>
              <div className="text-base text-cyan-400 font-mono mb-1 z-10">{prod.price} pts</div>
              <div className="text-xs text-gray-400 text-center mb-2 z-10">{prod.desc}</div>
              {prod.limited && <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded shadow z-20">Limitado</span>}
              {prod.mvpOnly && <span className="absolute top-2 left-2 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded shadow z-20">MVP</span>}
              {user.acquired.includes(prod.id) ? (
                <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg font-bold flex items-center gap-2 cursor-not-allowed z-10" disabled>
                  <FaCheckCircle /> Adquirido
                </button>
              ) : (
                <button
                  className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold flex items-center gap-2 transition z-10"
                  onClick={() => handleBuy(prod)}
                >
                  <FaShoppingCart /> Comprar
                </button>
              )}
            </motion.div>
          ))}
        </div>
        {/* Confirmación de compra */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(null)}
            >
              <motion.div
                className="bg-[#181c24] border-2 border-cyan-400 rounded-2xl p-8 min-w-[320px] max-w-xs flex flex-col items-center gap-4 relative animate-fadeIn"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-cyan-300 mb-2">¿Confirmar compra?</h3>
                <div className="text-lg text-white mb-2">{showConfirm.name}</div>
                <div className="text-cyan-400 font-bold mb-4">{showConfirm.price} pts</div>
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold" onClick={confirmBuy}>Comprar</button>
                  <button className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-bold" onClick={() => setShowConfirm(null)}>Cancelar</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Éxito/animación */}
        <AnimatePresence>
          {success && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-green-600/90 text-white text-2xl font-bold px-10 py-6 rounded-2xl shadow-2xl border-4 border-green-400 animate-float"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                ¡{success} adquirido!
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg font-bold animate-fadeIn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onAnimationComplete={() => setTimeout(() => setError(null), 2000)}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* 7. Estilos y animaciones personalizados */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(.4,0,.2,1) both; }
        .shop-glow-soft-border {
          opacity: 0;
          transition: opacity 0.2s;
          border-radius: 1rem;
          box-shadow: 0 0 0 0 #00fff7, 0 0 0 0 #0ff;
        }
        .shop-glow-soft:hover .shop-glow-soft-border,
        .shop-glow-soft:focus .shop-glow-soft-border {
          opacity: 1;
          box-shadow: 0 0 16px 4px #00fff799, 0 0 32px 8px #0ff5;
          border-radius: 1rem;
          animation: shopGlowSoftAnim 1.2s linear infinite alternate;
        }
        @keyframes shopGlowSoftAnim {
          0% { filter: blur(1px) brightness(1.08); }
          100% { filter: blur(2px) brightness(1.18); }
        }
      `}</style>
    </div>
  );
};

export default Shop; 