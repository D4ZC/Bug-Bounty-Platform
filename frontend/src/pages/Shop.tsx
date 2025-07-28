import React, { useState, useRef, useEffect } from 'react';
import UserProfileCard from '../pages/Dashboard/components/UserProfileCard';
import { Image, BorderFull } from '@carbon/icons-react';
import { Tile } from '@carbon/react';

const sections = [
  { key: 'temas', label: 'Temas', icon: <Image size={28} className="text-blue-400" /> },
  { key: 'marcos', label: 'Marcos', icon: <BorderFull size={28} className="text-green-400" /> },
];

const products = {
  temas: [
    { name: 'Tema Cyberpunk', description: 'Colores neón y estilo futurista.', price: 180, img: 'cyberpunk.jpg', color: 'bg-fuchsia-200' },
    { name: 'Dark Souls', description: 'Inspirado en la saga de caballeros y fuego.', price: 160, img: 'dark_souls.jpeg', color: 'bg-yellow-200' },
    { name: 'Tema Japonés', description: 'Estética tradicional japonesa.', price: 170, img: 'japon.jpg', color: 'bg-red-200' },
    { name: 'Tema Retro', description: 'Colores y formas de los 80s.', price: 150, img: 'retro.jpg', color: 'bg-orange-200' },
  ],
  marcos: [
    { name: 'Marco Challenger', description: '', price: 200, img: '', color: 'bg-yellow-100' },
  ],
};

const darkSoulsPreviewStats = {
  criticas: 12,
  altas: 22,
  medianas: 35,
  bajas: 10,
  total: 79,
};

const darkSoulsPreviewUser = {
  name: 'Solaire of Astora',
  img: '',
  stats: darkSoulsPreviewStats,
};

const Shop: React.FC = () => {
  const [selected, setSelected] = useState('temas');
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirmPurchase, setShowConfirmPurchase] = useState(false);
  const [purchaseProduct, setPurchaseProduct] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [purchasedProducts, setPurchasedProducts] = useState<Set<string>>(new Set());

  const handlePurchase = (product: any) => {
    setPurchaseProduct(product);
    setShowConfirmPurchase(true);
  };

  const confirmPurchase = () => {
    // Aquí se procesaría la compra en el backend
    console.log('Compra confirmada:', purchaseProduct);
    
    // Agregar el producto a la lista de comprados
    setPurchasedProducts(prev => new Set([...prev, purchaseProduct.name]));
    
    // Cerrar modal de confirmación
    setShowConfirmPurchase(false);
    setPurchaseProduct(null);
    
    // Mostrar mensaje de éxito
    setShowSuccess(true);
    
    // Ocultar mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-10 px-2 flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col">
        <Tile className="flex-1 min-h-[60vh] w-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-2xl border-2 border-purple-500 p-2 sm:p-6 md:p-10 animate-fade-in flex flex-col items-center justify-start">
          <h1 className="text-3xl font-bold mb-8 text-white">Tienda</h1>
          <div className="flex gap-4 mb-8 flex-wrap justify-center">
            {sections.map((sec) => (
              <button
                key={sec.key}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all border-2 ${selected === sec.key ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 text-white shadow-lg' : 'bg-gray-800 border-transparent text-gray-300 hover:bg-gray-700 hover:border-purple-500'}`}
                onClick={() => setSelected(sec.key)}
              >
                {sec.icon}
                {sec.label}
              </button>
            ))}
          </div>
          <div className={`w-full ${selected === 'marcos' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
            {products[selected as keyof typeof products].map((prod, idx) => {
              const isPurchased = purchasedProducts.has(prod.name);
              
              if (selected === 'marcos') {
                // Card vertical especial para marcos
                return (
                  <div
                    key={idx}
                    className="rounded-2xl p-6 shadow-2xl flex flex-col items-center border-2 border-purple-500 bg-gradient-to-br from-gray-800/80 to-gray-900/80 min-h-[420px] justify-between"
                  >
                    <h2 className="text-xl font-bold mb-2 text-white">{prod.name}</h2>
                    <div className="flex-1 flex flex-col items-center justify-center w-full">
                      <div className="w-full flex justify-center items-center">
                        <div className="relative w-[180px] h-[320px] flex items-center justify-center">
                          <img
                            src="/assets/chalenger.png"
                            alt="Marco Challenger"
                            className="object-contain w-full h-full drop-shadow-2xl"
                            style={{background: 'transparent'}}
                          />
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold mb-2 text-yellow-400">{prod.price} Puntos</span>
                    <div className="flex gap-2 w-full mt-2">
                      {isPurchased ? (
                        <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg flex-1 cursor-default shadow-lg">
                          ✅ Adquirido
                        </button>
                      ) : (
                        <button 
                          className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition flex-1 shadow-lg"
                          onClick={() => handlePurchase(prod)}
                        >
                          Comprar
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
              // Cards normales para los demás apartados
              const hasImage = !!prod.img;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-4 sm:p-5 shadow-md flex flex-col items-start border ${hasImage ? '' : prod.color}`}
                  style={hasImage ? {
                    backgroundImage: `url('/assets/${prod.img}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#fff',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '220px',
                    border: '2px solid #7df9ff',
                    boxShadow: '0 4px 32px 0 rgba(0,0,0,0.45)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  } : {}}
                >
                  {/* Overlay para mejorar legibilidad */}
                  {hasImage && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(10,10,30,0.75)',
                      zIndex: 0,
                      borderRadius: '1rem',
                      pointerEvents: 'none',
                    }} />
                  )}
                  <h2 className="text-lg font-bold mb-1" style={hasImage ? {zIndex: 1, position: 'relative', color: '#7df9ff', textShadow: '0 2px 8px #000'} : {}}>{prod.name}</h2>
                  <p className="text-gray-200 mb-2" style={hasImage ? {color: '#e0e0e0', zIndex: 1, position: 'relative', textShadow: '0 2px 8px #000'} : {}}>{prod.description}</p>
                  <span className="font-semibold mb-2" style={hasImage ? {color: '#fff', zIndex: 1, position: 'relative', textShadow: '0 2px 8px #000'} : {}}>{prod.price} Puntos</span>
                  <div className="mt-auto flex gap-2 w-full" style={hasImage ? {zIndex: 1, position: 'relative'} : {}}>
                    {isPurchased ? (
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg flex-1 cursor-default" style={hasImage ? {boxShadow: '0 2px 8px #000'} : {}}>
                        ✅ Adquirido
                      </button>
                    ) : (
                      <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex-1" 
                        style={hasImage ? {boxShadow: '0 2px 8px #000'} : {}}
                        onClick={() => handlePurchase(prod)}
                      >
                        Comprar
                      </button>
                    )}
                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex-1"
                      style={hasImage ? {background: 'rgba(255,255,255,0.85)', color: '#222', boxShadow: '0 2px 8px #000'} : {}}
                      onClick={() => {
                        if (prod.name === 'Dark Souls') setShowPreview(true);
                      }}
                    >
                      Vista previa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Tile>
      </div>

      {/* Modal de confirmación de compra */}
      {showConfirmPurchase && purchaseProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500 rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-bold mb-4 text-white">Confirmar compra</h3>
            <p className="text-gray-300 mb-6">
              ¿Estás seguro de que quieres comprar <strong className="text-white">{purchaseProduct.name}</strong> por <strong className="text-yellow-400">{purchaseProduct.price} puntos</strong>?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setShowConfirmPurchase(false);
                  setPurchaseProduct(null);
                }}
                className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmPurchase}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de preview para Dark Souls */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in">
          <div className="relative w-full max-w-2xl mx-auto p-4">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-900"
              style={{
                backgroundImage: "url('/assets/dark_souls2.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-85 z-0" />
              <div className="relative z-10 p-8 flex flex-col items-center">
                <UserProfileCard
                  user={darkSoulsPreviewUser}
                  bgClassName="bg-transparent"
                  textClassName="text-yellow-200"
                  borderClassName="border-yellow-900"
                  showRadarChart={false}
                />
                <button
                  className="mt-6 px-6 py-2 rounded-xl bg-yellow-900 text-yellow-200 font-bold text-lg hover:bg-yellow-800 transition shadow-lg"
                  onClick={() => setShowPreview(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <span className="font-semibold">¡Compra exitosa!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop; 