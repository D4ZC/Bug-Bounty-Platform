import React, { useState, useRef, useEffect } from 'react';
import { useShop, ShopItem } from '../contexts/ShopContext';

const CATEGORIES = [
  { key: 'fondo', label: 'FONDO' },
  { key: 'marco', label: 'MARCO' },
  { key: 'sticker', label: 'STICKER' },
  { key: 'etc', label: 'ETC' },
];

const PRODUCTS = {
  fondo: [
    { id: 1, name: 'Fondo Azul', price: 100, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80', desc: 'Fondo azul para tu perfil.', category: 'fondo' as const },
    { id: 2, name: 'Fondo Gris', price: 120, img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&q=80', desc: 'Fondo gris elegante.', category: 'fondo' as const },
    { id: 3, name: 'Fondo Verde', price: 90, img: 'https://images.unsplash.com/photo-1519340333755-c6e2a6a1b49a?auto=format&fit=facearea&w=400&q=80', desc: 'Fondo verde vibrante.', category: 'fondo' as const },
  ],
  marco: [
    { id: 1, name: 'Marco Fuego', price: 200, img: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/fire-1959824_1280.png', desc: 'Marco animado de fuego.', category: 'marco' as const },
    { id: 2, name: 'Marco Oro', price: 250, img: 'https://cdn.pixabay.com/photo/2016/03/31/19/56/gold-1294463_1280.png', desc: 'Marco dorado brillante.', category: 'marco' as const },
    { id: 3, name: 'Marco Flores', price: 180, img: 'https://cdn.pixabay.com/photo/2017/01/31/13/14/flowers-2021755_1280.png', desc: 'Marco decorado con flores.', category: 'marco' as const },
  ],
  sticker: [
    { id: 1, name: 'Sticker Hacker', price: 50, img: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/hacker-312817_1280.png', desc: 'Sticker de hacker.', category: 'sticker' as const },
    { id: 2, name: 'Sticker Bug', price: 60, img: 'https://cdn.pixabay.com/photo/2013/07/12/13/57/bug-147909_1280.png', desc: 'Sticker de bug.', category: 'sticker' as const },
    { id: 3, name: 'Sticker Escudo', price: 70, img: 'https://cdn.pixabay.com/photo/2012/04/13/00/22/shield-31234_1280.png', desc: 'Sticker de escudo.', category: 'sticker' as const },
  ],
  etc: [
    { id: 1, name: 'Producto X', price: 80, img: 'https://cdn.pixabay.com/photo/2016/03/31/20/11/box-1294471_1280.png', desc: 'Producto especial X.', category: 'etc' as const },
    { id: 2, name: 'Producto Y', price: 110, img: 'https://cdn.pixabay.com/photo/2016/03/31/20/11/box-1294470_1280.png', desc: 'Producto especial Y.', category: 'etc' as const },
    { id: 3, name: 'Producto Z', price: 95, img: 'https://cdn.pixabay.com/photo/2016/03/31/20/11/box-1294472_1280.png', desc: 'Producto especial Z.', category: 'etc' as const },
  ],
};

const Shop: React.FC = () => {
  const { purchaseItem, isItemPurchased } = useShop();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].key);
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef<number>(0);
  const dragStartRef = useRef<number | null>(null);
  const [coins, setCoins] = useState(100);
  const [bluepoints, setBluepoints] = useState(100);

  useEffect(() => {
    setSelectedProductIdx(0);
  }, [selectedCategory]);

  // Rotación automática eje Y (3D)
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => r + 1);
      rotationRef.current += 1;
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Drag para rotar eje Y
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartRef.current = e.clientX;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (dragStartRef.current !== null) {
      const delta = e.clientX - dragStartRef.current;
      setRotation(rotationRef.current + delta);
    }
  };
  const handleMouseUp = () => {
    rotationRef.current = rotation;
    dragStartRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handlePurchase = (product: ShopItem) => {
    if (coins >= product.price) {
      purchaseItem(product);
      setCoins(prev => prev - product.price);
    } else {
      alert('No tienes suficientes monedas!');
    }
  };

  const products = PRODUCTS[selectedCategory];
  const selectedProduct = products[selectedProductIdx];

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      {/* Barra superior de monedas */}
      <div className="w-full flex justify-end items-center gap-4 px-8 py-4 bg-transparent">
        <div className="bg-yellow-200 text-yellow-900 font-bold px-4 py-2 rounded shadow">COINS: {coins}</div>
        <div className="bg-yellow-200 text-yellow-900 font-bold px-4 py-2 rounded shadow">BLUEPOINTS: {bluepoints}</div>
      </div>
      <div className="flex flex-row flex-1 w-full">
        {/* Contenedor 1: Opciones */}
        <div className="flex flex-col gap-2 p-4 bg-white border-r border-gray-200" style={{ width: 180 }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className={`px-4 py-3 rounded-lg font-bold text-center cursor-pointer transition border ${selectedCategory === cat.key ? 'bg-blue-100 border-blue-500 text-blue-700 shadow' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-blue-50'}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </div>
          ))}
        </div>
        {/* Contenedor 2: Productos */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
            {products.map((prod, idx) => (
              <div
                key={prod.id}
                className={`relative rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center aspect-square transition-all duration-200 ${selectedProductIdx === idx ? 'border-blue-500 shadow-lg bg-white scale-105 z-10' : 'border-gray-200 bg-gray-100 hover:border-blue-300'}`}
                onClick={() => setSelectedProductIdx(idx)}
              >
                <img src={prod.img} alt={prod.name} className="w-20 h-20 object-contain mb-2" />
                <span className="font-semibold text-gray-700 text-center">{prod.name}</span>
                <span className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 font-bold px-2 py-1 rounded text-xs">${prod.price}</span>
                {isItemPurchased(prod.id) && (
                  <div className="absolute top-2 left-2 bg-green-50 text-white font-bold px-2 py-1 rounded text-xs">
                    ✓ COMPRADO
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Contenedor 3: Vista detallada */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white relative">
          <div className="flex flex-col items-center">
            <div
              className="w-56 h-56 rounded-full bg-gray-100 shadow-lg flex items-center justify-center mb-6 select-none"
              style={{
                transform: `perspective(600px) rotateY(${rotation}deg)`,
                transition: dragStartRef.current ? 'none' : 'transform 0.3s',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                cursor: 'grab',
                position: 'relative',
                zIndex: 20,
              }}
              onMouseDown={handleMouseDown}
            >
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-40 h-40 object-contain" draggable={false} />
            </div>
            <div className="bg-gray-100 rounded-lg p-4 mb-4 w-64 text-center font-semibold text-gray-700 shadow">{selectedProduct.desc}</div>
            <button 
              className={`px-6 py-3 rounded-lg font-bold shadow transition ${
                isItemPurchased(selectedProduct.id)
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : coins >= selectedProduct.price
                  ? 'bg-yellow-300 text-yellow-900 hover:bg-yellow-400'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={() => !isItemPurchased(selectedProduct.id) && handlePurchase(selectedProduct)}
              disabled={isItemPurchased(selectedProduct.id) || coins < selectedProduct.price}
            >
              {isItemPurchased(selectedProduct.id) ? 'COMPRADO' : 'COMPRAR'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 