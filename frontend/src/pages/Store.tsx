import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const items = [
  {
    id: 1,
    name: 'Fondo Neón Animado',
    description: 'Fondo animado con luces de neón para tu perfil.',
    price: 500,
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
    category: 'Fondos de perfil',
    type: 'Animado',
  },
  {
    id: 2,
    name: 'MiniPerfil Hacker',
    description: 'Miniperfil con estética hacker y animaciones sutiles.',
    price: 300,
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    category: 'Miniperfiles',
    type: 'Animado',
  },
  {
    id: 3,
    name: 'Marco Avatar Cian',
    description: 'Marco de avatar con efecto neón cian.',
    price: 200,
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    category: 'Marcos de avatar',
    type: 'Estático',
  },
  {
    id: 4,
    name: 'Insignia Elite',
    description: 'Insignia especial para usuarios elite.',
    price: 150,
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    category: 'Insignias especiales',
    type: 'Estático',
  },
  {
    id: 5,
    name: 'Perfil Temporada Cyber',
    description: 'Perfil especial de la temporada Cyber.',
    price: 400,
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    category: 'Perfiles de temporada/juego',
    type: 'Animado',
  },
];

const categories = [
  'Todos',
  'Fondos de perfil',
  'Miniperfiles',
  'Marcos de avatar',
  'Insignias especiales',
  'Perfiles de temporada/juego',
];

const types = ['Todos', 'Estático', 'Animado'];

const Store: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const userPoints = 1200;

  const filteredItems = items.filter(item =>
    (selectedCategory === 'Todos' || item.category === selectedCategory) &&
    (selectedType === 'Todos' || item.type === selectedType)
  );

  const addToCart = (item: any) => {
    if (!cart.find(i => i.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={`min-h-screen font-mono text-[#00fff7] relative transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Barra superior: puntos y carrito */}
      <div className="fixed top-16 right-8 z-50 flex items-center gap-6">
        <div className="bg-[#181c2b] border-2 border-[#00fff7] rounded-xl px-4 py-2 font-bold text-[#00fff7] text-lg shadow-md">
          Puntos acumulados: <span className="text-[#39ff14]">{userPoints}</span>
        </div>
        <button
          className="bg-[#181c2b] border-2 border-[#00fff7] rounded-full p-3 hover:scale-110 hover:shadow-[0_0_16px_#00fff7] transition flex items-center gap-2"
          onClick={() => setShowCart(!showCart)}
          title="Ver carrito"
        >
          {/* Ícono de carrito SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#00fff7" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 4h13m-9 0a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
          {cart.length > 0 && <span className="bg-[#00fff7] text-black font-bold rounded-full px-2 text-sm">{cart.length}</span>}
        </button>
      </div>
      {showCart && (
        <>
          {/* Overlay para cerrar el carrito al hacer clic fuera */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-0 cursor-pointer"
            onClick={() => setShowCart(false)}
          />
          <div className="fixed top-32 right-8 z-50 bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-[#00fff7]">Carrito de compras</h3>
            {cart.length === 0 ? (
              <div className="text-[#00fff7]">El carrito está vacío.</div>
            ) : (
              <ul className="mb-4">
                {cart.map(item => (
                  <li key={item.id} className="flex justify-between items-center mb-2">
                    <span>{item.name}</span>
                    <span className="text-[#39ff14] font-bold">{item.price} pts</span>
                    <button className="ml-2 text-[#ff00ea] hover:underline" onClick={() => removeFromCart(item.id)}>Quitar</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="font-bold text-[#00fff7] mb-2">Total: {total} pts</div>
            <button className="w-full px-4 py-2 bg-[#00fff7] text-black font-bold rounded-lg hover:bg-[#39ff14] transition">Proceder a comprar</button>
          </div>
        </>
      )}

      {/* Hero Banner */}
      <section className="pt-8 pb-8 px-8 flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto">
        <img src={items[0].img} alt={items[0].name} className="w-full md:w-1/2 rounded-2xl border-2 border-[#00fff7] mb-4 md:mb-0" />
        <div className="flex-1 flex flex-col items-start gap-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00fff7] drop-shadow-[0_0_8px_#00fff7]">{items[0].name}</h2>
          <p className="text-lg text-[#39ff14]">{items[0].description}</p>
          <span className="text-2xl font-bold text-[#ff00ea]">{items[0].price} puntos</span>
          <button className="mt-4 px-8 py-3 bg-[#00fff7] text-black font-bold rounded-xl text-xl shadow-lg hover:bg-[#39ff14] hover:text-black transition" onClick={() => addToCart(items[0])}>Agregar al carrito</button>
        </div>
      </section>

      {/* Filtros/Categorías */}
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 justify-center mb-4 flex-nowrap overflow-x-auto whitespace-nowrap px-4">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full border-2 font-bold transition-all duration-200 ${selectedCategory === cat ? 'bg-[#00fff7] text-black border-[#00fff7]' : 'bg-black border-[#00fff7] text-[#00fff7] hover:bg-[#00fff7] hover:text-black'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-4 justify-center mb-8 flex-nowrap overflow-x-auto whitespace-nowrap px-4">
          {types.map(type => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full border-2 font-bold transition-all duration-200 ${selectedType === type ? 'bg-[#00fff7] text-black border-[#00fff7]' : 'bg-black border-[#00fff7] text-[#00fff7] hover:bg-[#00fff7] hover:text-black'}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Artículos de la tienda */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 pb-24">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl p-4 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_32px_#00fff7] cursor-pointer"
          >
            <img src={item.img} alt={item.name} className="w-full h-40 object-cover rounded-xl mb-4 border border-[#00fff7]" />
            <h3 className="text-2xl font-bold mb-2 text-[#00fff7]">{item.name}</h3>
            <p className="text-sm text-[#00fff7] mb-2 text-center">{item.description}</p>
            <span className="text-lg font-bold text-[#39ff14] mb-2">{item.price} puntos</span>
            <div className="flex gap-2 mb-2 flex-wrap">
              <span className="px-2 py-1 text-xs rounded-full bg-[#00fff7] text-black font-bold">{item.category}</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[#ff00ea] text-white font-bold">{item.type}</span>
            </div>
            <button className="px-6 py-2 bg-[#ff00ea] text-white font-bold rounded-lg hover:bg-[#39ff14] transition" onClick={() => addToCart(item)}>Agregar al carrito</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Store; 