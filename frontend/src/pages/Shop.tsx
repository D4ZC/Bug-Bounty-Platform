import React, { useState, useRef, useEffect } from 'react';
import { useShop, ShopItem } from '../contexts/ShopContext';
import { useWallet } from '../contexts/WalletContext';
import Ruleta from '../components/Ruleta';
import avatar from '../assets/images/Avatar/Avatar.png';
import avatar1 from '../assets/images/Avatar/Avatar1.png';
import avatar3 from '../assets/images/Avatar/Avatar3.png';
import avatar4 from '../assets/images/Avatar/Avatar4.png';
import avatar5 from '../assets/images/Avatar/Avatar5.png';
import avatar2 from '../assets/images/Avatar/Avatar2.png';
import avatar6 from '../assets/images/Avatar/Avatar6.png';
import avatar7 from '../assets/images/Avatar/Avatar7.png';
import avatar8 from '../assets/images/Avatar/Avatar8.png';
import avatar9 from '../assets/images/Avatar/Avatar9.png';
import fondoGamer from '../assets/images/fondos/FONDO_GAMER.webp';
import fondoGamer1 from '../assets/images/fondos/FONDO_GAMER1.webp';
import fondoGamer2 from '../assets/images/fondos/FONDO_GAMER2.jpg';
import marco from '../assets/images/marcos/Marco.png';
import marco1 from '../assets/images/marcos/Marco1.png';
import marco2 from '../assets/images/marcos/Marco2.png';
// Importa las portadas
import portada from '../assets/images/PortadaPerfil/PortadaPerfil.jpg';
import portada1 from '../assets/images/PortadaPerfil/PortadaPerfil1.jpg';
import portada2 from '../assets/images/PortadaPerfil/PortadaPerfil2.jpg';
import portada3 from '../assets/images/PortadaPerfil/PortadaPerfil3.jpg';
import portada4 from '../assets/images/PortadaPerfil/PortadaPerfil4.jpg';

const CATEGORIES = [
  { key: 'avatar', label: 'AVATAR' },
  { key: 'fondo', label: 'FONDOS' },
  { key: 'marco', label: 'MARCOS' },
  { key: 'portada', label: 'Portada de Perfil' },
  { key: 'etc', label: 'RULETA' },
];

const PRODUCTS = {
  avatar: [
    { id: 1, name: 'Avatar Gamer', price: 80, img: avatar, desc: 'Avatar gamer clásico.', category: 'avatar' as const },
    { id: 2, name: 'Avatar Pro', price: 90, img: avatar1, desc: 'Avatar profesional.', category: 'avatar' as const },
    { id: 3, name: 'Avatar Retro', price: 100, img: avatar3, desc: 'Avatar retro.', category: 'avatar' as const },
    { id: 4, name: 'Avatar 4', price: 110, img: avatar4, desc: 'Avatar especial 4.', category: 'avatar' as const },
    { id: 5, name: 'Avatar 5', price: 120, img: avatar5, desc: 'Avatar especial 5.', category: 'avatar' as const },
    { id: 101, name: 'Avatar 2', price: 95, img: avatar2, desc: 'Avatar alternativo 2.', category: 'avatar' as const },
    { id: 102, name: 'Avatar 6', price: 105, img: avatar6, desc: 'Avatar alternativo 6.', category: 'avatar' as const },
    { id: 103, name: 'Avatar 7', price: 115, img: avatar7, desc: 'Avatar alternativo 7.', category: 'avatar' as const },
    { id: 104, name: 'Avatar 8', price: 125, img: avatar8, desc: 'Avatar alternativo 8.', category: 'avatar' as const },
    { id: 105, name: 'Avatar 9', price: 130, img: avatar9, desc: 'Avatar alternativo 9.', category: 'avatar' as const },
  ],
  fondo: [
    { id: 4, name: 'Fondo Gamer', price: 100, img: fondoGamer, desc: 'Fondo gamer neón.', category: 'fondo' as const },
    { id: 5, name: 'Fondo Gamer 1', price: 120, img: fondoGamer1, desc: 'Fondo gamer alternativo.', category: 'fondo' as const },
    { id: 6, name: 'Fondo Gamer 2', price: 90, img: fondoGamer2, desc: 'Fondo gamer clásico.', category: 'fondo' as const },
  ],
  marco: [
    { id: 7, name: 'Marco Neon', price: 200, img: marco, desc: 'Marco neón brillante.', category: 'marco' as const },
    { id: 8, name: 'Marco Pro', price: 250, img: marco1, desc: 'Marco profesional.', category: 'marco' as const },
    { id: 9, name: 'Marco Retro', price: 180, img: marco2, desc: 'Marco retro.', category: 'marco' as const },
  ],
  portada: [
    { id: 201, name: 'Portada 1', price: 150, img: portada, desc: 'Portada de perfil especial 1.', category: 'PortadaPerfil' as const },
    { id: 202, name: 'Portada 2', price: 160, img: portada1, desc: 'Portada de perfil especial 2.', category: 'PortadaPerfil' as const },
    { id: 203, name: 'Portada 3', price: 170, img: portada2, desc: 'Portada de perfil especial 3.', category: 'PortadaPerfil' as const },
    { id: 204, name: 'Portada 4', price: 180, img: portada3, desc: 'Portada de perfil especial 4.', category: 'PortadaPerfil' as const },
    { id: 205, name: 'Portada 5', price: 190, img: portada4, desc: 'Portada de perfil especial 5.', category: 'PortadaPerfil' as const },
  ],
  etc: [
    { id: 1, name: 'Producto X', price: 80, img: 'https://cdn.pixabay.com/photo/2016/03/31/20/11/box-1294471_1280.png', desc: 'Producto especial X.', category: 'etc' as const },
    { id: 2, name: 'Producto Y', price: 110, img: 'https://cdn.pixabay.com/photo/2016/03/31/20/11/box-1294470_1280.png', desc: 'Producto especial Y.', category: 'etc' as const },
    { id: 3, name: 'Producto Z', price: 95, img: 'https://cdn.pixabay.com/photo/2016/03/31/20/11/box-1294472_1280.png', desc: 'Producto especial Z.', category: 'etc' as const },
  ],
};

const Shop: React.FC = () => {
  const { purchaseItem, isItemPurchased } = useShop();
  const { coins, bluepoints, spendCoins, spendBluepoints } = useWallet();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].key);
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef<number>(0);
  const dragStartRef = useRef<number | null>(null);

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
      spendCoins(product.price);
    } else {
      alert('No tienes suficientes monedas!');
    }
  };

  const products = PRODUCTS[selectedCategory];
  const selectedProduct = products[selectedProductIdx];

  // Mostrar las monedas reales del usuario
  const displayCoins = coins;

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50 animate-fade-in">
      {/* Barra superior de monedas */}
      <div className="w-full flex justify-end items-center gap-4 px-8 py-4 bg-white/80 shadow-sm sticky top-0 z-20 rounded-b-xl">
        <div className="bg-yellow-200 text-yellow-900 font-bold px-4 py-2 rounded shadow flex items-center gap-2">MONEDAS: {displayCoins}</div>
        <div className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded shadow flex items-center gap-2">BLUEPOINTS: {bluepoints}</div>
      </div>
      <div className="flex flex-row flex-1 w-full">
        {/* Contenedor 1: Opciones */}
        <div className="flex flex-col gap-2 p-4 bg-white border-r border-gray-200/70 shadow-sm" style={{ width: 180 }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className={`px-4 py-3 rounded-lg font-bold text-center cursor-pointer transition border-2 ${selectedCategory === cat.key
                ? (cat.key === 'etc'
                  ? 'bg-gradient-to-br from-orange-400 to-red-500 border-orange-500 text-white shadow-lg scale-105'
                  : 'bg-cyan-100 border-cyan-400 text-cyan-700 shadow-lg scale-105')
                : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-cyan-50'}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </div>
          ))}
        </div>
        {/* Contenedor 2: Productos */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
          {selectedCategory === 'etc' ? (
            <Ruleta />
          ) : (
            <div className="grid grid-cols-2 gap-8 w-full max-w-lg overflow-y-auto" style={{ maxHeight: 520, minHeight: 200, padding: '16px 0' }}>
              {products.map((prod, idx) => (
                <div
                  key={prod.id}
                  className={`relative rounded-2xl border-2 cursor-pointer flex flex-col items-center justify-center aspect-square transition-all duration-200 bg-gradient-to-br ${selectedProductIdx === idx ? 'from-cyan-50 to-blue-100 border-cyan-400 shadow-2xl scale-105 z-10' : 'from-gray-100 to-white border-gray-200 hover:border-cyan-300 hover:shadow-lg'} group overflow-visible min-h-[60px] min-w-[60px]`}
                  onClick={() => setSelectedProductIdx(idx)}
                  style={{ boxShadow: selectedProductIdx === idx ? '0 8px 32px 0 rgba(31, 38, 135, 0.15)' : undefined, margin: '8px 0' }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-200 opacity-70 group-hover:h-2 transition-all duration-300" />
                  <img src={prod.img} alt={prod.name} className="w-20 h-20 object-contain mb-2 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ zIndex: 2 }} />
                  <span className="font-semibold text-gray-700 text-center text-lg group-hover:text-cyan-700 transition-colors">{prod.name}</span>
                  <span className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 font-bold px-2 py-1 rounded-full text-xs shadow">${prod.price}</span>
                  {isItemPurchased(prod.id) && (
                    <div className="absolute top-2 left-2 bg-green-400 text-white font-bold px-2 py-1 rounded-full text-xs shadow animate-bounce">✓ COMPRADO</div>
                  )}
                  {/* Badge de oferta o nuevo */}
                  {prod.price < 100 && (
                    <span className="absolute bottom-2 left-2 bg-cyan-200 text-cyan-800 font-bold px-2 py-1 rounded-full text-xs shadow">OFERTA</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedCategory !== 'etc' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white/90 relative rounded-l-3xl shadow-xl">
            <div className="flex flex-col items-center">
              <div
                className="w-56 h-56 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 shadow-xl flex items-center justify-center mb-6 select-none border-4 border-cyan-200 animate-fade-in"
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
                <img src={selectedProduct.img} alt={selectedProduct.name} className="w-40 h-40 object-contain drop-shadow-2xl" draggable={false} />
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 mb-4 w-64 text-center font-semibold text-gray-700 shadow border border-cyan-100 animate-fade-in">
                {selectedProduct.desc}
              </div>
              <button 
                className={`px-8 py-3 rounded-xl font-bold shadow-lg transition text-lg tracking-wide mt-2 ${
                  isItemPurchased(selectedProduct.id)
                    ? 'bg-green-500 text-white cursor-not-allowed animate-pulse'
                    : displayCoins >= selectedProduct.price
                    ? 'bg-cyan-400 text-cyan-900 hover:bg-cyan-300'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={() => !isItemPurchased(selectedProduct.id) && handlePurchase(selectedProduct)}
                disabled={isItemPurchased(selectedProduct.id) || displayCoins < selectedProduct.price}
              >
                {isItemPurchased(selectedProduct.id) ? 'COMPRADO' : 'COMPRAR'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop; 