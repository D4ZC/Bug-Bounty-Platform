import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;
// Simulación de usuario MVP (en producción, esto vendría del backend o contexto de usuario)
const isMVP = true; // Cambia a false para probar acceso normal

function getRandomPrice(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const bannersList = [
  {src:'/Banners/Firewall_Rookie.png', name:'Firewall Rookie'},
  {src:'/Banners/Script_Kiddie _Ascendente.png', name:'Script Kiddie Ascendente'},
  {src:'/Banners/Código_Fantasma.png', name:'Código Fantasma'},
  {src:'/Banners/Kernel_Knight.png', name:'Kernel Knight'},
  {src:'/Banners/Root_Mastermind.png', name:'Root Mastermind'},
  {src:'/Banners/Placeholder6.png', name:'Cazador de Exploits'},
  {src:'/Banners/Placeholder7.png', name:'Dominador del Backdoor'},
  {src:'/Banners/Placeholder8.png', name:'Overlord del Zero Day'},
  {src:'/Banners/Placeholder9.png', name:'Guardian del Ciberespacio'},
  {src:'/Banners/Placeholder10.png', name:'Sniffer Supremo'},
  {src:'/Banners/Placeholder11.png', name:'El Crackeador Silencioso'},
  {src:'/Banners/Placeholder12.png', name:'La Sombra del Sistema'},
  {src:'/Banners/Placeholder13.png', name:'RompeFirewalls'},
  {src:'/Banners/Placeholder14.png', name:'Proxy Phantom'},
  {src:'/Banners/Placeholder15.png', name:'El Intruso Elegante'},
  {src:'/Banners/Placeholder16.png', name:'Cifrador de Realidades'},
  {src:'/Banners/Placeholder17.png', name:'Rooteador Profesional'},
  {src:'/Banners/Placeholder18.png', name:'Ninja del Netcat'},
  {src:'/Banners/Placeholder19.png', name:'El Espectro del Ping'},
  {src:'/Banners/Placeholder20.png', name:'Le Hice Ping a tu Corazón 💔'},
  {src:'/Banners/Placeholder21.png', name:'1337 pero con estilo'},
  {src:'/Banners/Placeholder22.png', name:'Ctrl+C / Ctrl+P Hacker'},
  {src:'/Banners/Placeholder23.png', name:'Bug Bounty Baby'},
  {src:'/Banners/Placeholder24.png', name:'Me hackeo solo'},
  {src:'/Banners/Placeholder25.png', name:'Error 404: Miedo no encontrado'},
  {src:'/Banners/Placeholder26.png', name:'Ghost Hacker del Mes'},
  {src:'/Banners/Placeholder27.png', name:'Rey del CTF'},
  {src:'/Banners/Placeholder28.png', name:'Maestro del Terminal'},
  {src:'/Banners/Placeholder29.png', name:'Ganador del Torneo Eclipse'},
  {src:'/Banners/Placeholder30.png', name:'Cazador Nocturno del Sistema'},
  {src:'/Banners/Placeholder31.png', name:'Top Exploiter'},
];
const bannersCategory = {
  key: 'banners',
  label: 'Banners',
  products: bannersList.map((b, i) => ({
    id: `banner${i+1}`,
    name: b.name,
    price: getRandomPrice(200, 1000),
    currency: 'bugcoin',
    image: b.src,
    animated: false
  }))
};
const shopCategories = [
  {
    key: 'frames',
    label: 'Marcos',
    products: [
      { id: 'frame1', name: 'Marco Verde', price: 100, currency: 'bugcoin', image: '/public/Moneda/Moneda.png', animated: false },
      { id: 'frame2', name: 'Marco Dorado', price: 250, currency: 'bugcoin', image: '/public/Moneda/Moneda.png', animated: false },
    ],
  },
  {
    key: 'avatars',
    label: 'Avatares',
    products: [
      { id: 'Ghost_Hacker', name: 'Ghost Hacker', price: 200, currency: 'bugcoin', image: '/avatars/Ghost_Hacker.png', animated: false, description: 'Invisible y letal en el ciberespacio.' },
      { id: 'Cyber_Ninja', name: 'Cyber Ninja', price: 200, currency: 'bugcoin', image: '/avatars/Cyber_Ninja.png', animated: false, description: 'Sigiloso y rápido, como un ninja digital.' },
      { id: 'Digital_Phantom', name: 'Digital Phantom', price: 200, currency: 'bugcoin', image: '/avatars/Digital_Phantom.png', animated: false, description: 'Un fantasma en la red, imposible de rastrear.' },
      { id: 'Stealth_Master', name: 'Stealth Master', price: 200, currency: 'bugcoin', image: '/avatars/Stealth_Master.png', animated: false, description: 'Maestro del sigilo y la infiltración.' },
      { id: 'Legendary_Hacker', name: 'Legendary Hacker', price: 400, currency: 'bugcoin', image: '/avatars/Legendary_Hacker.png', animated: false, description: 'Solo para los hackers más legendarios.' },
      { id: 'Cyber_God', name: 'Cyber God', price: 400, currency: 'bugcoin', image: '/avatars/Cyber_God.png', animated: false, description: 'Domina el ciberespacio como un dios.' },
      { id: 'Digital_Overlord', name: 'Digital Overlord', price: 400, currency: 'bugcoin', image: '/avatars/Digital_Overlord.png', animated: false, description: 'Gobierna el mundo digital con poder absoluto.' },
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
  bannersCategory,
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
    return inv ? JSON.parse(inv) : { frames: [], avatars: [], titles: [], backgrounds: [], banners: [], bluepoints: 0 };
  } catch {
    return { frames: [], avatars: [], titles: [], backgrounds: [], banners: [], bluepoints: 0 };
  }
};

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('frames');
  const [bugcoins, setBugcoins] = useState(() => Number(localStorage.getItem('bugcoins')) || 1000);
  const [bluepoints, setBluepoints] = useState(() => getInitialInventory().bluepoints || 0);
  const [inventory, setInventory] = useState(getInitialInventory);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    localStorage.setItem('bugcoins', String(bugcoins));
    localStorage.setItem('user_inventory', JSON.stringify(inventory));
  }, [bugcoins, inventory]);

  const handleBuy = (product: any, categoryKey?: string) => {
    if (product.currency === 'bugcoin') {
      if (bugcoins >= product.price) {
        // Evitar comprar dos veces
        if (categoryKey && inventory[categoryKey]?.includes(product.id)) {
          setFeedbackMsg(t('Ya tienes este ítem.'));
          setFeedbackType('error');
          setTimeout(() => {
            setFeedbackMsg(null);
            setFeedbackType(null);
          }, 2500);
          return;
        }
        setBugcoins(bugcoins - product.price);
        if (categoryKey === 'avatars') {
          setInventory((prev: any) => {
            const currentAvatars = Array.isArray(prev.avatars) ? prev.avatars : [];
            if (!currentAvatars.includes(product.id)) {
              const newInventory = { ...prev, avatars: [...currentAvatars, product.id] };
              localStorage.setItem('user_inventory', JSON.stringify(newInventory));
              return newInventory;
            }
            return prev;
          });
          setFeedbackMsg(t('¡Compra exitosa!') + ' ' + product.name + '\n' + t('Ahora puedes seleccionarlo en la personalización de perfil.'));
          setFeedbackType('success');
          setTimeout(() => {
            setFeedbackMsg(null);
            setFeedbackType(null);
          }, 2500);
          if (window.location.pathname.includes('avatar-selection')) {
            window.location.reload();
          }
        } else if (categoryKey === 'banners') {
          setInventory((prev: any) => {
            const currentBanners = Array.isArray(prev.banners) ? prev.banners : [];
            if (!currentBanners.includes(product.id)) {
              const newInventory = { ...prev, banners: [...currentBanners, product.id] };
              localStorage.setItem('user_inventory', JSON.stringify(newInventory));
              return newInventory;
            }
            return prev;
          });
          setFeedbackMsg(t('¡Compra exitosa!') + ' ' + product.name + '\n' + t('Ahora puedes seleccionarlo en la personalización de perfil.'));
          setFeedbackType('success');
          setTimeout(() => {
            setFeedbackMsg(null);
            setFeedbackType(null);
          }, 2500);
        } else if (categoryKey) {
          setInventory((prev: any) => {
            const newInventory = { ...prev, [categoryKey]: [...prev[categoryKey], product.id] };
            localStorage.setItem('user_inventory', JSON.stringify(newInventory));
            return newInventory;
          });
          setFeedbackMsg(t('¡Compra exitosa!') + ' ' + product.name);
          setFeedbackType('success');
          setTimeout(() => {
            setFeedbackMsg(null);
            setFeedbackType(null);
          }, 2500);
        }
      } else {
        setFeedbackMsg(t('No tienes suficientes bugcoins.'));
        setFeedbackType('error');
        setTimeout(() => {
          setFeedbackMsg(null);
          setFeedbackType(null);
        }, 2500);
      }
    } else if (product.currency === 'bluepoint') {
      if (product.stock && product.stock > 0) {
        setInventory((prev: any) => ({ ...prev, bluepoints: (prev.bluepoints || 0) + 1 }));
        product.stock -= 1;
        setBluepoints(bluepoints + 1);
        setFeedbackMsg(t('¡Has comprado una Bluepoint IBM!'));
        setFeedbackType('success');
        setTimeout(() => {
          setFeedbackMsg(null);
          setFeedbackType(null);
        }, 2500);
      } else {
        setFeedbackMsg(t('No hay stock disponible para este producto.'));
        setFeedbackType('error');
        setTimeout(() => {
          setFeedbackMsg(null);
          setFeedbackType(null);
        }, 2500);
      }
    }
  };

  // Función para saber si el ítem ya está en el inventario
  const isInInventory = (category: string, id: string) => {
    return inventory[category]?.includes(id);
  };

  // Botón para resetear tienda y bugcoins (solo para desarrollo/admin)
  const handleResetTienda = () => {
    localStorage.removeItem('user_inventory');
    localStorage.setItem('bugcoins', '1000');
    window.location.reload();
  };

  const renderFeedback = () =>
    feedbackMsg ? (
      <div
        className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all duration-300
          ${feedbackType === 'success' ? 'bg-green-600 text-white border-2 border-green-300' : 'bg-red-700 text-white border-2 border-red-400 animate-shake'}`}
        style={{ minWidth: 220, textAlign: 'center' }}
      >
        {feedbackMsg}
      </div>
    ) : null;

  return (
    <div className="min-h-screen p-8" style={{fontFamily}}>
      {/* Botón de reset tienda/dev */}
      <button
        onClick={handleResetTienda}
        className="fixed top-6 right-6 z-50 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold border-2 border-red-400 shadow animate-glitch-btn"
        title="Resetear tienda y bugcoins (solo desarrollo)"
      >
        Resetear Tienda
      </button>
      {renderFeedback()}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-cyan-300 drop-shadow-lg tracking-widest font-mono animate-glitch-text">
          {t('Tienda de Personalización')}
        </h1>
        <div className="flex justify-center gap-8 mb-8">
          <span className="flex items-center gap-2 font-bold text-green-300 text-lg font-mono bg-black/40 px-4 py-2 rounded-xl border-2 border-cyan-400 shadow animate-glow">
            {bugcoins} <img src="/Moneda/Bugcoin.png" alt="bugcoin" className="w-6 h-6 inline" />
          </span>
          {isMVP && (
            <div className="flex items-center gap-2 text-lg font-mono bg-black/40 px-4 py-2 rounded-xl border-2 border-blue-400 shadow animate-glow">
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
              className={`px-6 py-3 rounded-t-xl font-bold font-mono border-2 border-cyan-400 bg-black/60 text-cyan-200 shadow transition-all duration-200 hover:bg-cyan-900/40 hover:text-cyan-100 animate-glitch-btn ${activeTab === cat.key ? 'bg-cyan-700 text-white border-pink-400' : ''}`}
            >
              {t(cat.label)}
            </button>
          ))}
          {isMVP && (
            <button
              onClick={() => setActiveTab('mvp')}
              className={`px-6 py-3 rounded-t-xl font-bold font-mono border-2 border-blue-400 bg-black/60 text-blue-200 shadow transition-all duration-200 hover:bg-blue-900/40 hover:text-blue-100 animate-glitch-btn ${activeTab === 'mvp' ? 'bg-blue-700 text-white border-pink-400' : ''}`}
            >
              {t('Exclusivo MVP')}
            </button>
          )}
        </div>
        {/* Contenido de la categoría activa */}
        <div className="rounded-b-3xl p-8 shadow-2xl border-4 border-cyan-400 glassmorphism relative overflow-hidden" style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
          {/* SVG decorativo glitch/graffiti */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
            <g className="animate-glitch-move">
              <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
              <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
              <polygon points="80,400 120,420 100,440" fill="#ffe600" opacity="0.10" />
            </g>
          </svg>
          {activeTab !== 'mvp' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 z-10 relative">
              {shopCategories.find((cat) => cat.key === activeTab)?.products.map((product) => (
                <div key={product.id} className="relative bg-black/60 rounded-2xl border-2 border-cyan-400 p-6 flex flex-col items-center shadow-xl glassmorphism animate-fade-in" style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
                  {product.image && (
                    <img src={product.image} alt={product.name} className={`w-20 h-20 mb-2 rounded-xl border-2 border-pink-400 ${product.animated ? 'animate-pulse' : ''}`} />
                  )}
                  <h3 className="font-bold text-lg mb-1 text-cyan-200 font-mono animate-glitch-text">{t(product.name)}</h3>
                  <div className="mb-2 text-cyan-400 flex items-center gap-1 font-mono">{product.price} <img src="/Moneda/Bugcoin.png" alt="bugcoin" className="w-5 h-5 inline" />{product.currency === 'bluepoint' && ' Bluepoint'}</div>
                  <button
                    onClick={() => handleBuy(product, activeTab)}
                    className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg font-bold font-mono border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    disabled={isInInventory(activeTab, product.id)}
                  >
                    {isInInventory(activeTab, product.id) ? t('Comprado') : t('Comprar')}
                  </button>
                </div>
              ))}
            </div>
          ) : isMVP ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 z-10 relative">
              {mvpExclusive.map((product) => (
                <div key={product.id} className="relative bg-black/60 rounded-2xl border-2 border-blue-400 p-6 flex flex-col items-center shadow-xl glassmorphism animate-fade-in" style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
                  {product.image && (
                    <img src={product.image} alt={product.name} className={`w-20 h-20 mb-2 rounded-xl border-2 border-yellow-400 ${product.animated ? 'animate-pulse' : ''}`} />
                  )}
                  <h3 className="font-bold text-lg mb-1 text-blue-200 font-mono animate-glitch-text">{t(product.name)}</h3>
                  <div className="mb-2 text-blue-400 flex items-center gap-1 font-mono">{product.price} {product.currency === 'bugcoin' ? 'Bugcoin' : 'Bluepoint'}</div>
                  {product.currency === 'bluepoint' && (
                    <div className="text-xs text-blue-600 mb-1">{t('Stock')}: {product.stock}</div>
                  )}
                  <button
                    onClick={() => handleBuy(product, 'mvp')}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-bold font-mono border-2 border-blue-400 shadow animate-glitch-btn transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    disabled={product.currency === 'bugcoin' && isInInventory('mvp', product.id)}
                  >
                    {product.currency === 'bugcoin' && isInInventory('mvp', product.id) ? t('Comprado') : t('Comprar')}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-red-500 font-bold text-lg font-mono animate-glitch-text">
              {t('Solo el MVP del mes puede acceder a esta sección.')}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-btn { animation: glitchBtn 1.5s infinite steps(2, end); }
        @keyframes glitchBtn { 0%{filter:none;} 20%{filter:brightness(1.2) hue-rotate(20deg);} 40%{filter:contrast(1.2) blur(0.5px);} 60%{filter:none;} 100%{filter:none;} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
        .animate-fade-in { animation: fadeIn 1.2s both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none;} }
      `}</style>
    </div>
  );
};

export default Shop; 