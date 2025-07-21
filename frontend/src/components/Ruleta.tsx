import React, { useState, useRef } from 'react';

const FAKE_PRODUCTS = [
  { id: 1, name: 'Producto 1', desc: 'Descripción del producto 1', img: 'https://via.placeholder.com/120' },
  { id: 2, name: 'Producto 2', desc: 'Descripción del producto 2', img: 'https://via.placeholder.com/120' },
  { id: 3, name: 'Producto 3', desc: 'Descripción del producto 3', img: 'https://via.placeholder.com/120' },
  { id: 4, name: 'Producto 4', desc: 'Descripción del producto 4', img: 'https://via.placeholder.com/120' },
  { id: 5, name: 'Producto 5', desc: 'Descripción del producto 5', img: 'https://via.placeholder.com/120' },
  { id: 6, name: 'Producto 6', desc: 'Descripción del producto 6', img: 'https://via.placeholder.com/120' },
  { id: 7, name: 'Producto 7', desc: 'Descripción del producto 7', img: 'https://via.placeholder.com/120' },
  { id: 8, name: 'Producto 8', desc: 'Descripción del producto 8', img: 'https://via.placeholder.com/120' },
];

const highlightColor = 'from-orange-400 to-red-500 border-orange-500';
const normalColor = 'from-orange-100 to-yellow-50 border-orange-200';
// El efecto gusano debe recorrer los índices: 0,1,2,5,8,7,6,3 (sentido horario)
const CLOCKWISE_INDICES = [0, 1, 2, 5, 8, 7, 6, 3];

const Ruleta: React.FC = () => {
  // Mapeo de la cuadrícula 3x3 con centro vacío
  // Orden: 0 1 2
  //        7   3
  //        6 5 4
  const grid = [
    FAKE_PRODUCTS[0], FAKE_PRODUCTS[1], FAKE_PRODUCTS[2],
    FAKE_PRODUCTS[7], null,                 FAKE_PRODUCTS[3],
    FAKE_PRODUCTS[6], FAKE_PRODUCTS[5], FAKE_PRODUCTS[4],
  ];

  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [winnerIdx, setWinnerIdx] = useState<number | null>(null);
  const [showChest, setShowChest] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    setWinnerIdx(null);
    setShowChest(false);
    let idx = 0;
    let steps = 0;
    const totalSteps = 3 * 8 + Math.floor(Math.random() * 8); // 3 vueltas + aleatorio
    intervalRef.current = setInterval(() => {
      setActiveIdx(CLOCKWISE_INDICES[idx % 8]);
      idx++;
      steps++;
      if (steps > totalSteps) {
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setIsRolling(false);
          setWinnerIdx(CLOCKWISE_INDICES[(idx - 1) % 8]);
          setShowChest(true);
        }, 200);
      }
    }, 100);
  };

  // Producto ganado
  const wonProduct = winnerIdx !== null && showChest ? FAKE_PRODUCTS[CLOCKWISE_INDICES.indexOf(winnerIdx!)] : null;

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl min-h-[400px] items-center justify-center gap-8 md:gap-12 animate-fade-in">
      {/* Centro: Ruleta y botón */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 min-w-[320px] w-full max-w-lg">
        <div className="grid grid-cols-3 grid-rows-3 gap-6">
          {grid.map((prod, idx) => (
            prod ? (
              <div
                key={prod.id}
                className={`w-24 h-24 flex flex-col items-center justify-center rounded-xl border-4 font-bold text-center text-orange-900 text-xs bg-gradient-to-br select-none transition-all duration-150 ${activeIdx === idx ? highlightColor + ' scale-110 shadow-2xl z-10' : normalColor + ' shadow'} ${winnerIdx === idx && showChest ? 'ring-4 ring-yellow-400' : ''}`}
              >
                <img src={prod.img} alt={prod.name} className="w-10 h-10 object-contain mb-1 rounded" />
                <span className="truncate w-full">{prod.name}</span>
              </div>
            ) : (
              <div key={idx} className="w-24 h-24" />
            )
          ))}
        </div>
        <button
          className={`mt-8 px-8 py-3 rounded-xl font-bold shadow-lg text-lg tracking-wide transition bg-orange-500 text-white hover:bg-orange-600 ${isRolling ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={startRoll}
          disabled={isRolling}
        >
          20 MONEDAS
        </button>
      </div>
      {/* Derecha: Producto ganado */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-[320px] w-full max-w-lg">
        {wonProduct ? (
          <div className="flex flex-col items-center w-full bg-gradient-to-br from-orange-100 to-yellow-50 rounded-2xl border-4 border-orange-200 shadow-xl p-8 animate-fade-in">
            <img src={wonProduct.img} alt={wonProduct.name} className="w-32 h-32 object-contain mb-4 rounded-xl border-2 border-orange-300 bg-white" />
            <span className="text-xl font-bold text-orange-900 mb-2 text-center">{wonProduct.name}</span>
            <span className="text-gray-700 text-center mb-2">{wonProduct.desc}</span>
            <button
              className={`px-8 py-3 rounded-xl font-bold shadow-lg text-lg tracking-wide transition bg-orange-400 text-white hover:bg-orange-500`}
              onClick={() => setShowChest(false)}
            >
              RECLAMAR
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full bg-gradient-to-br from-orange-100 to-yellow-50 rounded-2xl border-4 border-orange-200 shadow-xl p-8">
            <span className="text-gray-400 font-semibold text-lg text-center">Gira la ruleta para ganar un producto</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ruleta; 