import React, { useState } from 'react';

const AVATARS = [
  { id: 1, name: 'Avatar 1', url: '/avatars/avatar1.png', category: 'Avatar', price: 100, description: 'Avatar misterioso con aura azul.' },
  { id: 2, name: 'Avatar 2', url: '/avatars/avatar2.png', category: 'Avatar', price: 100, description: 'Avatar ninja bajo la luna.' },
  { id: 3, name: 'Avatar 3', url: '/avatars/avatar3.png', category: 'Avatar', price: 100, description: 'Avatar hacker digital.' },
  { id: 4, name: 'Avatar 4', url: '/avatars/avatar4.png', category: 'Avatar', price: 100, description: 'Avatar ninja en la azotea.' },
  { id: 5, name: 'Avatar 5', url: '/avatars/avatar5.png', category: 'Avatar', price: 100, description: 'Avatar floral elegante.' },
  { id: 6, name: 'Avatar 6', url: '/avatars/avatar6.png', category: 'Avatar', price: 100, description: 'Avatar elfa mágica.' },
  { id: 7, name: 'Avatar 7', url: '/avatars/avatar7.png', category: 'Avatar', price: 100, description: 'Avatar ciudad azul.' },
  { id: 8, name: 'Avatar 8', url: '/avatars/avatar8.png', category: 'Avatar', price: 100, description: 'Avatar ninja sakura.' },
  { id: 9, name: 'Avatar 9', url: '/avatars/avatar9.png', category: 'Avatar', price: 100, description: 'Avatar cyborg futurista.' },
  { id: 10, name: 'Avatar 10', url: '/avatars/avatar10.png', category: 'Avatar', price: 100, description: 'Avatar DJ con estilo.' },
  { id: 11, name: 'Avatar 11', url: '/avatars/avatar11.png', category: 'Avatar', price: 100, description: 'Avatar DJ alternativo.' },
  { id: 12, name: 'Avatar 12', url: '/avatars/avatar12.png', category: 'Avatar', price: 100, description: 'Avatar calle azul.' },
  { id: 13, name: 'Avatar 13', url: '/avatars/avatar13.png', category: 'Avatar', price: 100, description: 'Avatar ninja ciudad.' },
  { id: 14, name: 'Avatar 14', url: '/avatars/avatar14.png', category: 'Avatar', price: 100, description: 'Avatar catgirl cyberpunk.' },
];

const BACKGROUNDS = [
  { id: 1, name: 'Fondo 1', url: '/backgrounds/bg1.png', category: 'Fondo', price: 200, description: 'Ciudad al atardecer con luces neón.' },
  { id: 2, name: 'Fondo 2', url: '/backgrounds/bg2.png', category: 'Fondo', price: 200, description: 'Galaxia espiral en tonos azules.' },
  { id: 3, name: 'Fondo 3', url: '/backgrounds/bg3.png', category: 'Fondo', price: 200, description: 'Bosque mágico iluminado.' },
  { id: 4, name: 'Fondo 4', url: '/backgrounds/bg4.png', category: 'Fondo', price: 200, description: 'Ciudad futurista con rascacielos.' },
  { id: 5, name: 'Fondo 5', url: '/backgrounds/bg5.png', category: 'Fondo', price: 200, description: 'Bosque con luz mística.' },
  { id: 6, name: 'Fondo 6', url: '/backgrounds/bg6.jpg', category: 'Fondo', price: 200, description: 'Eclipse rojo sobre la ciudad.' },
  { id: 7, name: 'Fondo 7', url: '/backgrounds/bg7.jpg', category: 'Fondo', price: 200, description: 'Eclipse rojo alternativo.' },
  { id: 8, name: 'Fondo 8', url: '/backgrounds/bg8.jpg', category: 'Fondo', price: 200, description: 'Paisaje de Elden Ring.' },
  { id: 9, name: 'Fondo 9', url: '/backgrounds/bg9.jpg', category: 'Fondo', price: 200, description: 'Templo japonés en la noche.' },
  { id: 10, name: 'Fondo 10', url: '/backgrounds/bg10.jpg', category: 'Fondo', price: 200, description: 'Planeta rosa en el espacio.' },
  { id: 11, name: 'Fondo 11', url: '/backgrounds/bg11.jpg', category: 'Fondo', price: 200, description: 'Montañas nevadas y aurora.' },
  { id: 12, name: 'Fondo 12', url: '/backgrounds/bg12.jpg', category: 'Fondo', price: 200, description: 'Ciudad espacial futurista.' },
  { id: 13, name: 'Fondo 13', url: '/backgrounds/bg13.jpg', category: 'Fondo', price: 200, description: 'Nieve y aurora boreal.' },
];

const PRODUCTS = [...AVATARS, ...BACKGROUNDS];
const FILTERS = ['Todos', 'Avatar', 'Fondo'];

const getInventory = () => {
  try {
    const inv = localStorage.getItem('user_inventory');
    return inv ? JSON.parse(inv) : [];
  } catch {
    return [];
  }
};

const Store: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [inventory, setInventory] = useState<any[]>(getInventory());
  const [userPoints, setUserPoints] = useState(1000);
  const [notification, setNotification] = useState<string | null>(null);
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');

  const addToCart = (item: any) => {
    if (!cart.find(i => i.id === item.id && i.category === item.category)) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id: number, category: string) => {
    setCart(cart.filter(i => !(i.id === id && i.category === category)));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePurchase = () => {
    if (cart.length === 0) {
      setNotification('El carrito está vacío.');
      return;
    }
    if (userPoints < total) {
      setNotification('No tienes suficientes puntos.');
      return;
    }
    const newInventory = [...inventory, ...cart.filter(item => !inventory.find(inv => inv.id === item.id && inv.category === item.category))];
    setInventory(newInventory);
    localStorage.setItem('user_inventory', JSON.stringify(newInventory));
    setUserPoints(userPoints - total);
    setCart([]);
    setShowCart(false);
    setNotification('¡Compra realizada con éxito!');
  };

  // Filtro y búsqueda
  const filteredProducts = PRODUCTS.filter(item =>
    (filter === 'Todos' || item.category === filter) &&
    (item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#1a0033] to-[#2d003e] font-mono text-[#00fff7]">
      {/* Carrusel de inventario */}
      {inventory.length > 0 && (
        <div className="w-full overflow-x-auto py-6 px-2 mb-4 bg-[#181c2bcc] border-b-2 border-[#00fff7] shadow-[0_0_24px_#00fff7] flex gap-6 items-center animate-fade-in-up">
          {inventory.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[120px] max-w-[120px]">
              <div className="rounded-xl overflow-hidden border-2 border-[#a259ff] shadow-lg bg-[#101926] w-20 h-20 flex items-center justify-center mb-2">
                <img src={item.url} alt={item.name} className="object-cover w-full h-full" />
              </div>
              <span className="text-xs text-[#00fff7] font-bold font-mono text-center truncate w-full">{item.name}</span>
              <span className="text-[10px] text-[#ff00ea] font-mono">{item.category}</span>
            </div>
          ))}
        </div>
      )}
      {/* Bloque fijo de puntos y carrito */}
      <div className="fixed top-8 right-8 z-50 flex flex-col items-center gap-4 bg-[#181c2b]/90 border-2 border-[#00fff7] rounded-2xl px-8 py-6 shadow-lg backdrop-blur-md" style={{backdropFilter: 'blur(8px)'}}>
        <div className="font-bold text-[#00fff7] text-2xl font-mono mb-2">Puntos: <span className="text-[#39ff14]">{userPoints}</span></div>
        <button
          className="bg-[#181c2b]/80 border-2 border-[#00fff7] rounded-full p-3 hover:scale-110 hover:shadow-[0_0_16px_#00fff7] transition flex items-center gap-2 font-mono backdrop-blur-md"
          onClick={() => setShowCart(!showCart)}
          title="Ver carrito"
          aria-label="Ver carrito"
          style={{backdropFilter: 'blur(8px)'}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#00fff7" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 4h13m-9 0a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
          {cart.length > 0 && <span className="bg-[#00fff7] text-black font-bold rounded-full px-2 text-sm font-mono">{cart.length}</span>}
        </button>
      </div>
      {/* Header */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-[#1a0033cc] rounded-2xl shadow-[0_0_32px_#00fff7] border-2 border-[#00fff7] p-8 mt-8 mb-8 backdrop-blur-md animate-fade-in-up">
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#00fff7] drop-shadow-[0_0_8px_#00fff7] font-mono mb-2 tracking-wide">TIENDA</h1>
          <div className="text-[#39ff14] font-bold text-xl font-mono mb-1">¡Personaliza tu experiencia y equipa tu perfil!</div>
          <div className="text-[#ff00ea] text-base font-mono">Compra fondos y avatares con tus puntos.</div>
        </div>
      </div>
      {/* Buscador y filtros */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4 mb-8 px-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre o descripción..."
          className="w-full md:w-1/2 px-4 py-2 rounded-full border-2 border-[#00fff7] bg-black text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7]"
          aria-label="Buscar artículos"
        />
        <div className="flex gap-4 flex-nowrap overflow-x-auto whitespace-nowrap">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`px-6 py-2 rounded-full border-2 font-bold font-mono transition-all duration-200 ${filter === f ? 'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_16px_#00fff7]' : 'bg-black border-[#00fff7] text-[#00fff7] hover:bg-[#00fff7] hover:text-black'}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      {/* Notificación */}
      {notification && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-2xl shadow-2xl font-mono text-lg border-2 border-[#00fff7] backdrop-blur-md animate-fade-in-up" style={{background: 'rgba(24,28,43,0.85)', minWidth: 220, maxWidth: 320, textAlign: 'center', color: '#00fff7', boxShadow: '0 0 32px #00fff7, 0 0 0 4px #232b36'}}>
          {notification}
        </div>
      )}
      {/* Sidebar carrito */}
      {showCart && (
        <div className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-[#181c2b]/95 border-l-2 border-[#00fff7] shadow-2xl animate-fade-in-up backdrop-blur-md flex flex-col" style={{backdropFilter: 'blur(12px)'}}>
          <div className="flex items-center justify-between p-6 border-b border-[#00fff7]/40">
            <h2 className="text-2xl font-bold text-[#00fff7] font-mono">Carrito</h2>
            <button onClick={() => setShowCart(false)} className="text-[#00fff7] hover:text-white text-2xl font-bold" aria-label="Cerrar carrito">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-[#ff3b3b] font-bold text-center mt-8">Tu carrito está vacío.</div>
            ) : (
              <ul className="mb-4 max-h-60 overflow-y-auto divide-y divide-[#00fff7]/30">
                {cart.map(item => (
                  <li key={item.id + item.category} className="flex items-center justify-between py-2 gap-2">
                    <div className="flex items-center gap-2">
                      <img src={item.url} alt={item.name} className="w-12 h-12 object-cover rounded border border-[#00fff7]" />
                      <span className="font-bold text-[#00fff7]">{item.name}</span>
                    </div>
                    <span className="text-[#ff00ea] font-bold">{item.price} pts</span>
                    <button className="ml-2 text-[#ff3b3b] font-bold hover:underline" onClick={() => removeFromCart(item.id, item.category)}>Quitar</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-6 border-t border-[#00fff7]/40">
            <div className="font-bold text-[#00fff7] mb-2 font-mono">Total: {total} pts</div>
            <button
              className="w-full px-4 py-2 bg-[#00fff7] text-black font-bold rounded-lg hover:bg-[#39ff14] transition font-mono animate-glow"
              onClick={handlePurchase}
              disabled={cart.length === 0 || userPoints < total}
            >
              Proceder a comprar
            </button>
          </div>
        </div>
      )}
      {/* Grid de productos */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 pb-24">
        {filteredProducts.map(item => {
          const isBought = inventory.some(inv => inv.id === item.id && inv.category === item.category);
          return (
            <div
              key={item.id + item.category}
              className="bg-[#101926]/90 border-2 border-[#00fff7] rounded-2xl p-6 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_32px_#00fff7,0_0_64px_#ff00ea] cursor-pointer font-mono backdrop-blur-md animate-fade-in-up relative"
              style={{backdropFilter: 'blur(6px)'}}
            >
              <img src={item.url} alt={item.name} className="w-full h-40 object-cover rounded-xl mb-4 border border-[#00fff7] shadow-[0_0_16px_#00fff7]" />
              <h3 className="text-2xl font-bold mb-2 text-[#00fff7] font-mono">{item.name}</h3>
              <p className="text-sm text-[#00fff7] mb-2 text-center font-mono">{item.description}</p>
              <span className="text-lg font-bold text-[#39ff14] mb-2 font-mono">{item.price} puntos</span>
              <span className="px-2 py-1 text-xs rounded-full bg-[#00fff7] text-black font-bold font-mono mb-2">{item.category}</span>
              <button
                className="px-6 py-2 bg-[#ff00ea] text-white font-bold rounded-lg hover:bg-[#39ff14] transition font-mono animate-glow disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => addToCart(item)}
                disabled={isBought}
              >
                {isBought ? 'Adquirido' : 'Agregar al carrito'}
              </button>
              {isBought && (
                <span className="mt-2 text-xs text-[#39ff14] font-bold font-mono absolute top-4 right-4 bg-[#232b36]/80 px-3 py-1 rounded-full border border-[#39ff14]">Adquirido</span>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Store; 