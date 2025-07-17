import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Simulación de usuario MVP (en producción, esto vendría del backend o contexto de usuario)
const isMVP = true; // Cambia a false para probar acceso normal

// Productos de ejemplo
const shopCategories = [
  {
    key: 'frames',
    label: 'Marcos',
    products: [
      { id: 'frame1', name: 'Marco Verde', price: 100, currency: 'bugcoin', image: '/frames/green.png', animated: false },
      { id: 'frame2', name: 'Marco Dorado', price: 250, currency: 'bugcoin', image: '/frames/gold.png', animated: false },
    ],
  },
  {
    key: 'avatars',
    label: 'Avatares',
    products: [
      { id: 'avatar1', name: 'Hacker Pro', price: 200, currency: 'bugcoin', image: '/avatars/hackerpro.png', animated: false },
      { id: 'avatar2', name: 'Cyber Ninja', price: 350, currency: 'bugcoin', image: '/avatars/ninja.png', animated: false },
    ],
  },
  {
    key: 'titles',
    label: 'Títulos',
    products: [
      { id: 'title1', name: 'Cazador de Bugs', price: 150, currency: 'bugcoin', image: '', animated: false },
      { id: 'title2', name: 'Pentester', price: 180, currency: 'bugcoin', image: '', animated: false },
    ],
  },
  {
    key: 'backgrounds',
    label: 'Fondos',
    products: [
      { id: 'bg1', name: 'Fondo Estático', price: 120, currency: 'bugcoin', image: '/backgrounds/static1.jpg', animated: false },
      { id: 'bg2', name: 'Fondo Animado', price: 300, currency: 'bugcoin', image: '/backgrounds/animated1.gif', animated: true },
    ],
  },
];

// Productos exclusivos MVP
const mvpExclusive = [
  { id: 'bluepoint1', name: 'Bluepoint IBM', price: 1, currency: 'bluepoint', image: '/bluepoint.png', animated: false, stock: 3 },
  { id: 'mvp-avatar1', name: 'Avatar MVP', price: 500, currency: 'bugcoin', image: '/avatars/mvp.png', animated: false },
  { id: 'mvp-frame1', name: 'Marco MVP', price: 400, currency: 'bugcoin', image: '/frames/mvp.png', animated: false },
  { id: 'mvp-title1', name: 'Título MVP', price: 350, currency: 'bugcoin', image: '', animated: false },
  { id: 'mvp-bg1', name: 'Fondo Animado Exclusivo', price: 800, currency: 'bugcoin', image: '/backgrounds/mvp-animated.gif', animated: true },
];

// Inventario inicial (leer de localStorage o iniciar vacío)
const getInitialInventory = () => {
  try {
    const inv = localStorage.getItem('user_inventory');
    return inv ? JSON.parse(inv) : { frames: [], avatars: [], titles: [], backgrounds: [], bluepoints: 0 };
  } catch {
    return { frames: [], avatars: [], titles: [], backgrounds: [], bluepoints: 0 };
  }
};

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('frames');
  const [bugcoins, setBugcoins] = useState(() => Number(localStorage.getItem('bugcoins')) || 1000); // Simulación de saldo
  const [bluepoints, setBluepoints] = useState(() => getInitialInventory().bluepoints || 0);
  const [inventory, setInventory] = useState(getInitialInventory);

  useEffect(() => {
    localStorage.setItem('bugcoins', String(bugcoins));
    localStorage.setItem('user_inventory', JSON.stringify(inventory));
  }, [bugcoins, inventory]);

  const handleBuy = (product: any, categoryKey?: string) => {
    if (product.currency === 'bugcoin') {
      if (bugcoins >= product.price) {
        // Evitar comprar dos veces
        if (categoryKey && inventory[categoryKey]?.includes(product.id)) {
          alert(t('Ya tienes este ítem.'));
          return;
        }
        setBugcoins(bugcoins - product.price);
        if (categoryKey) {
          setInventory((prev: any) => ({ ...prev, [categoryKey]: [...prev[categoryKey], product.id] }));
        }
        alert(t('¡Compra exitosa!') + ' ' + product.name);
      } else {
        alert(t('No tienes suficientes bugcoins.'));
      }
    } else if (product.currency === 'bluepoint') {
      if (product.stock && product.stock > 0) {
        setInventory((prev: any) => ({ ...prev, bluepoints: (prev.bluepoints || 0) + 1 }));
        product.stock -= 1;
        setBluepoints(bluepoints + 1);
        alert(t('¡Has comprado una Bluepoint IBM!'));
      } else {
        alert(t('No hay stock disponible para este producto.'));
      }
    }
  };

  // Función para saber si el ítem ya está en el inventario
  const isInInventory = (category: string, id: string) => {
    return inventory[category]?.includes(id);
  };

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          {t('Tienda de Personalización')}
        </h1>
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2 text-lg">
            <img src="/bugcoin.png" alt="bugcoin" className="w-6 h-6" />
            <span>{bugcoins} Bugcoins</span>
          </div>
          {isMVP && (
            <div className="flex items-center gap-2 text-lg">
              <img src="/bluepoint.png" alt="bluepoint" className="w-6 h-6" />
              <span>{bluepoints} Bluepoints</span>
            </div>
          )}
        </div>
        {/* Tabs de categorías */}
        <div className="flex justify-center gap-4 mb-6">
          {shopCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2 rounded-t-lg font-bold transition-all duration-200 ${activeTab === cat.key ? 'bg-yellow-500 text-white' : 'bg-card text-yellow-700'}`}
            >
              {t(cat.label)}
            </button>
          ))}
          {isMVP && (
            <button
              onClick={() => setActiveTab('mvp')}
              className={`px-4 py-2 rounded-t-lg font-bold transition-all duration-200 ${activeTab === 'mvp' ? 'bg-blue-700 text-white' : 'bg-card text-blue-700'}`}
            >
              {t('Exclusivo MVP')}
            </button>
          )}
        </div>
        {/* Contenido de la categoría activa */}
        <div className="bg-card rounded-b-xl p-8 shadow-lg border-2 border-yellow-400">
          {activeTab !== 'mvp' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {shopCategories.find((cat) => cat.key === activeTab)?.products.map((product) => (
                <div key={product.id} className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 flex flex-col items-center shadow-md">
                  {product.image && (
                    <img src={product.image} alt={product.name} className={`w-20 h-20 mb-2 ${product.animated ? 'animate-pulse' : ''}`} />
                  )}
                  <h3 className="font-bold text-lg mb-1 text-yellow-800">{t(product.name)}</h3>
                  <div className="mb-2 text-yellow-700">{product.price} {product.currency === 'bugcoin' ? 'Bugcoin' : 'Bluepoint'}</div>
                  <button
                    onClick={() => handleBuy(product, activeTab)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isInInventory(activeTab, product.id)}
                  >
                    {isInInventory(activeTab, product.id) ? t('Comprado') : t('Comprar')}
                  </button>
                </div>
              ))}
            </div>
          ) : isMVP ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {mvpExclusive.map((product) => (
                <div key={product.id} className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 flex flex-col items-center shadow-md border-2 border-blue-400">
                  {product.image && (
                    <img src={product.image} alt={product.name} className={`w-20 h-20 mb-2 ${product.animated ? 'animate-pulse' : ''}`} />
                  )}
                  <h3 className="font-bold text-lg mb-1 text-blue-800">{t(product.name)}</h3>
                  <div className="mb-2 text-blue-700">{product.price} {product.currency === 'bugcoin' ? 'Bugcoin' : 'Bluepoint'}</div>
                  {product.currency === 'bluepoint' && (
                    <div className="text-xs text-blue-600 mb-1">{t('Stock')}: {product.stock}</div>
                  )}
                  <button
                    onClick={() => handleBuy(product, 'mvp')}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.currency === 'bugcoin' && isInInventory('mvp', product.id)}
                  >
                    {product.currency === 'bugcoin' && isInInventory('mvp', product.id) ? t('Comprado') : t('Comprar')}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-red-500 font-bold text-lg">
              {t('Solo el MVP del mes puede acceder a esta sección.')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop; 