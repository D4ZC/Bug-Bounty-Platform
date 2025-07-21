import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useShop, ShopItem } from '../contexts/ShopContext';
import ReplaceItemModal from '../components/ReplaceItemModal';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';
import carrusel from '../assets/images/otros/Carrussel.png';
import carrusel1 from '../assets/images/otros/Carrussel1.png';
import carrusel2 from '../assets/images/otros/Carrussel2.png';
import carrusel3 from '../assets/images/otros/Carrussel3.png';

const pieData = [
  { name: 'HARD', value: 50, color: '#f43f5e' },
  { name: 'MEDIUM', value: 30, color: '#f59e42' },
  { name: 'LOW', value: 20, color: '#10b981' },
];

const barData = [
  { name: 'Ene', coins: 80 },
  { name: 'Feb', coins: 120 },
  { name: 'Mar', coins: 100 },
  { name: 'Abr', coins: 140 },
  { name: 'May', coins: 90 },
  { name: 'Jun', coins: 110 },
];

const carouselImages = [
  carrusel,
  carrusel1,
  carrusel2,
  carrusel3,
];

const mockUser = {
  id: 'USR-001',
  name: 'Alex Turner',
  country: 'Germany',
  flag: '🇩🇪',
  coins: 100,
  bluepoints: 0,
  likes: 100,
  dislikes: 200,
  description: 'Bug hunter, gamer y entusiasta de la ciberseguridad.',
  email: 'alex.turner@email.com',
};

const Profile: React.FC = () => {
  const { userItems, selectItem, getSelectedItem } = useShop();
  const { coins, bluepoints } = useWallet();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'avatar' | 'fondos' | 'marcos' | 'badges' | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [desc, setDesc] = useState(mockUser.description);
  const [editDesc, setEditDesc] = useState(false);
  const [name, setName] = useState(mockUser.name);
  const [country, setCountry] = useState(mockUser.country);
  const [carouselIdx, setCarouselIdx] = useState(0);
  // Estado para la modal de reemplazo
  const [replaceModal, setReplaceModal] = useState<{
    isOpen: boolean;
    item: ShopItem | null;
  }>({
    isOpen: false,
    item: null
  });
  const [email, setEmail] = useState(mockUser.email);
  const [editEmail, setEditEmail] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [frame, setFrame] = useState('default');
  // Likes/dislikes totales de los formularios publicados por el usuario
  const [totals, setTotals] = useState({ likes: 0, dislikes: 0 });
  // Estado para fondo seleccionado
  const [selectedBg, setSelectedBg] = useState(() => {
    return localStorage.getItem('selectedBg') || '';
  });
  // Estado para marco seleccionado
  const [selectedFrame, setSelectedFrame] = useState(() => {
    return localStorage.getItem('selectedFrame') || '';
  });
  // Estado para avatar seleccionado
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return localStorage.getItem('selectedAvatar') || '';
  });

  // Actualizar fondo al seleccionar
  const handleSelectBg = (img: string) => {
    setSelectedBg(img);
    localStorage.setItem('selectedBg', img);
  };

  // Actualizar marco al seleccionar
  const handleSelectFrame = (img: string) => {
    setSelectedFrame(img);
    localStorage.setItem('selectedFrame', img);
  };

  // Actualizar avatar al seleccionar
  const handleSelectAvatar = (img: string) => {
    setSelectedAvatar(img);
    localStorage.setItem('selectedAvatar', img);
  };

  // Fondos comprados
  const fondosComprados = userItems.purchased.filter(item => item.category === 'fondo');

  // Marcos comprados
  const marcosComprados = userItems.purchased.filter(item => item.category === 'marco');

  // Badges comprados (solo de vista)
  const badgesComprados = userItems.purchased.filter(item => item.category === 'sticker');

  // Avatares comprados
  const avatarsComprados = userItems.purchased.filter(item => item.category === 'avatar');

  // Usar fondo seleccionado en el div principal
  const mainBg = selectedBg || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';

  // Auto-slide del carrusel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Likes/dislikes totales de los formularios publicados por el usuario
  useEffect(() => {
    function normalize(email: string) {
      return (email || '').trim().toLowerCase();
    }
    function updateTotals() {
      if (!user?.email) {
        setTotals({ likes: 0, dislikes: 0 });
        return;
      }
      const stored = localStorage.getItem('vulnerabilidades');
      if (!stored) {
        setTotals({ likes: 0, dislikes: 0 });
        return;
      }
      const cards = JSON.parse(stored);
      const userEmail = normalize(user.email);
      const userCards = cards.filter((c: any) => normalize(c.email) === userEmail);
      // Mostrar emails en pantalla si no hay coincidencias
      if (userCards.length === 0 && cards.length > 0) {
        setTotals({ likes: 0, dislikes: 0 });
        (window as any).debugEmails = { perfil: userEmail, cards: cards.map((c: any) => normalize(c.email)) };
      } else {
        const likes = userCards.reduce((acc: number, c: any) => acc + (c.likes || 0), 0);
        const dislikes = userCards.reduce((acc: number, c: any) => acc + (c.dislikes || 0), 0);
        setTotals({ likes, dislikes });
      }
    }
    updateTotals();
    window.addEventListener('storage', updateTotals);
    const interval = setInterval(updateTotals, 1000);
    return () => {
      window.removeEventListener('storage', updateTotals);
      clearInterval(interval);
    };
  }, [user?.email]);

  // Modal para FONDOS, MARCOS, BADGES
  const closeSectionModal = () => setActiveSection(null);
  const openSectionModal = (section: 'avatar' | 'fondos' | 'marcos' | 'badges') => setActiveSection(section);

  // Función para manejar la selección de ítems
  const handleItemSelection = (item: ShopItem) => {
    const needsConfirmation = selectItem(item);
    
    if (needsConfirmation) {
      setReplaceModal({
        isOpen: true,
        item: item
      });
    }
  };

  // Función para confirmar reemplazo
  const confirmReplacement = () => {
    if (replaceModal.item) {
      // Aplicar el ítem directamente (ya se aplicó en selectItem)
      setReplaceModal({ isOpen: false, item: null });
    }
  };

  // Función para cancelar reemplazo
  const cancelReplacement = () => {
    setReplaceModal({ isOpen: false, item: null });
  };

  // Obtener ítems por categoría
  const getItemsByCategory = (category: 'fondos' | 'marcos' | 'sticker') => {
    return userItems.purchased.filter(item => item.category === category);
  };

  // Carrusel handlers
  const prevImg = () => setCarouselIdx((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  const nextImg = () => setCarouselIdx((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <div
        className="w-full max-w-6xl flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-lg p-4 md:p-8 min-h-[700px] relative overflow-hidden"
        style={{
          backgroundImage: `url('${mainBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Capa de opacidad */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'rgba(255,255,255,0.7)' }} />
        {/* Contenido principal (poner z-10 para estar sobre el fondo) */}
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row gap-6">
          {/* Columna Izquierda */}
          <div className="w-full md:w-1/4 flex flex-col items-center gap-6 justify-between min-h-full">
            {/* Gráfica de barras de monedas */}
            <div className="w-full flex flex-col items-center flex-1 justify-center">
              <div className="w-full h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="coins" fill="#38bdf8" radius={[8,8,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full flex justify-center mt-2">
                <span className="text-lg font-bold text-purple-700 tracking-wide" style={{ marginLeft: '40px' }}>EFICIENCIA</span>
              </div>
            </div>
            {/* Botones verticales */}
            <div className="flex flex-col gap-4 w-full mt-[-50px] flex-1 justify-end">
              <button className={`w-full py-3 rounded-lg font-bold text-lg border ${activeSection === 'avatar' ? 'border-yellow-500 shadow' : 'border-gray-200'} bg-gray-100 hover:bg-yellow-50`} onClick={() => openSectionModal('avatar')}>AVATAR</button>
              <button className={`w-full py-3 rounded-lg font-bold text-lg border ${activeSection === 'fondos' ? 'border-blue-500 shadow' : 'border-gray-200'} bg-gray-100 hover:bg-blue-50`} onClick={() => openSectionModal('fondos')}>FONDOS</button>
              <button className={`w-full py-3 rounded-lg font-bold text-lg border ${activeSection === 'marcos' ? 'border-purple-600 shadow-lg' : 'border-gray-200'} bg-gray-100 hover:bg-purple-50`} onClick={() => openSectionModal('marcos')}>MARCOS</button>
              <button className={`w-full py-3 rounded-lg font-bold text-lg border ${activeSection === 'badges' ? 'border-blue-500 shadow' : 'border-gray-200'} bg-gray-100 hover:bg-blue-50`} onClick={() => openSectionModal('badges')}>BADGES</button>
            </div>
          </div>
          {/* Columna Central */}
          <div className="w-full md:w-2/4 flex flex-col items-center gap-4 justify-between min-h-full">
            {/* Barra superior */}
            <div className="w-full flex items-center justify-between bg-gray-100 rounded-lg px-6 py-3 mb-2">
              <span className="font-bold text-gray-700">MONEDAS: <span className="text-yellow-500">{coins}</span></span>
              <span className="font-bold text-gray-700 ml-auto">bluepoints: <span className="text-blue-500">{bluepoints}</span></span>
            </div>
            {/* Avatar con marco personalizado */}
            <div className="relative flex flex-col items-center flex-1 justify-center" style={{ marginTop: '-10px' }}>
              <div className="flex items-center justify-center relative" style={{ background: 'rgba(243, 244, 246, 0.7)', borderRadius: '18px', width: '270px', height: '290px' }}>
                {/* Marco seleccionado debajo del avatar */}
                {selectedFrame && (
                  <img src={selectedFrame} alt="marco" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[230px] h-[230px] z-10 pointer-events-none" style={{ objectFit: 'contain' }} />
                )}
                {/* Avatar seleccionado encima del marco */}
                <div className="bg-white flex items-center justify-center text-[8rem] z-20 overflow-hidden rounded-full border-2 border-gray-200 shadow-lg" style={{ width: '200px', height: '200px', position: 'relative' }}>
                  {selectedAvatar ? (
                    <img src={selectedAvatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                  ) : profilePic ? (
                    <img src={profilePic} alt="avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span role="img" aria-label="avatar" className="w-full h-full flex items-center justify-center">👤</span>
                  )}
                </div>
              </div>
              {/* Botones debajo del avatar */}
              <div className="flex gap-4 mt-4">
                <button className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold hover:bg-blue-100" onClick={() => setShowEditProfile(true)}>EDITAR PERFIL</button>
                <button className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold hover:bg-blue-100" onClick={() => setShowPassword(true)}>CAMBIAR CONTRASEÑA</button>
              </div>
              {/* Caja de descripción */}
              <div className="w-full mt-4">
                <div className="bg-gray-100 rounded-lg p-4 min-h-[80px] flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-700">DESCRIPCIÓN</span>
                    {!editDesc && <button className="text-blue-600 font-semibold" onClick={() => setEditDesc(true)}>Editar</button>}
                  </div>
                  {editDesc ? (
                    <div className="flex flex-col gap-2">
                      <textarea className="w-full rounded border p-2" value={desc} onChange={e => setDesc(e.target.value)} rows={3} />
                      <div className="flex gap-2 justify-end">
                        <button className="px-3 py-1 rounded bg-gray-200 text-gray-800 font-bold" onClick={() => setEditDesc(false)}>Cancelar</button>
                        <button className="px-3 py-1 rounded bg-blue-600 text-white font-bold" onClick={() => setEditDesc(false)}>Guardar</button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-700">{desc}</span>
                  )}
                </div>
              </div>
              {/* Caja de vulnerabilidades */}
              <div className="w-full mt-4">
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                  <span className="font-bold text-gray-700 text-center mb-3 text-lg">VULNERABILIDADES</span>
                  <div className="flex flex-row justify-center gap-8 w-full">
                    {/* Críticas */}
                    <div className="flex flex-col items-center">
                      <span className="text-3xl mb-1">💀</span>
                      <span className="text-red-800 font-bold">Críticas</span>
                      <span className="text-xl font-bold text-gray-700">3</span>
                    </div>
                    {/* High */}
                    <div className="flex flex-col items-center">
                      <span className="text-3xl mb-1">💀</span>
                      <span className="text-red-600 font-bold">High</span>
                      <span className="text-xl font-bold text-gray-700">7</span>
                    </div>
                    {/* Medium */}
                    <div className="flex flex-col items-center">
                      <span className="text-3xl mb-1">🕷️</span>
                      <span className="text-orange-500 font-bold">Medium</span>
                      <span className="text-xl font-bold text-gray-700">12</span>
                    </div>
                    {/* Low */}
                    <div className="flex flex-col items-center">
                      <span className="text-3xl mb-1">⚡</span>
                      <span className="text-green-500 font-bold">Low</span>
                      <span className="text-xl font-bold text-gray-700">4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Columna Derecha */}
          <div className="w-full md:w-1/4 flex flex-col gap-4 items-center justify-between min-h-full">
            {/* Cuadros grandes de nombre y país */}
            <div className="w-full flex flex-col gap-4 flex-1 justify-center">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                <span className="font-bold text-gray-700 mb-1">NOMBRE</span>
                <input className="w-full text-center font-semibold text-lg bg-transparent outline-none" value={name} onChange={e => setName(e.target.value)} />
                {/* Correo debajo del nombre */}
                <div className="w-full mt-2 flex flex-col items-center">
                  <span className="font-bold text-gray-700 mb-1">CORREO</span>
                  <div className="flex items-center gap-2">
                    <span className="font-carbon-base text-gray-700">{email}</span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">ID: {mockUser.id}</span>
                </div>
                {/* Cuadros pequeños de estadísticas */}
                <div className="w-full flex flex-row gap-2 mt-2 justify-center">
                  <div className="flex-1 bg-gray-100 rounded-lg p-2 flex flex-col items-center max-w-[80px]">
                    <span className="font-bold text-gray-700 text-xs">LIKES</span>
                    <span className="text-green-600 font-bold text-base">{totals.likes}</span>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg p-2 flex flex-col items-center max-w-[80px]">
                    <span className="font-bold text-gray-700 text-xs">DISLIKES</span>
                    <span className="text-red-600 font-bold text-base">{totals.dislikes}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                <span className="font-bold text-gray-700 mb-1">PAÍS</span>
                <select className="w-full text-center font-semibold text-lg bg-transparent outline-none" value={country} onChange={e => setCountry(e.target.value)}>
                  <option value="Germany">🇩🇪 Germany</option>
                  <option value="Mexico">🇲🇽 Mexico</option>
                  <option value="USA">🇺🇸 USA</option>
                  <option value="Spain">🇪🇸 Spain</option>
                </select>
              </div>
            </div>
            {/* Carrusel de imágenes */}
            <div className="w-full flex flex-col items-center mt-4 flex-1 justify-center">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center w-full">
                <div className="flex items-center justify-center w-full">
                  <img src={carouselImages[carouselIdx]} alt="mock" className="w-full h-32 object-cover rounded-lg border transition-all duration-700" />
                </div>
                <div className="flex gap-1 mt-2 justify-center w-full">
                  {carouselImages.map((_, idx) => (
                    <span key={idx} className={`inline-block w-2 h-2 rounded-full ${carouselIdx === idx ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modales de sección (FONDOS, MARCOS, BADGES) */}
      {activeSection === 'avatar' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-carbon-dark rounded-xl shadow-2xl p-8 w-[90vw] max-w-2xl max-h-[80vh] flex flex-col items-center border-2 border-yellow-400 animate-fade-in overflow-y-auto scrollbar-thin scrollbar-thumb-cyber-blue scrollbar-track-gray-200">
            <h2 className="font-gamer-title text-2xl text-yellow-500 mb-4">Tus avatares comprados</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {avatarsComprados.length === 0 ? (
                <span className="text-gray-500 col-span-2 md:col-span-3">No tienes avatares comprados.</span>
              ) : (
                avatarsComprados.map(avatar => (
                  <div key={avatar.id} className="flex flex-col items-center bg-gray-100 dark:bg-carbon-gray rounded-lg p-3 shadow-md">
                    <img src={avatar.img} alt={avatar.name} className="w-28 h-28 object-cover rounded-full mb-2" />
                    <span className="font-semibold text-gray-700 dark:text-gray-100 mb-2 text-center">{avatar.name}</span>
                    <button
                      className={`px-3 py-1 rounded font-bold flex items-center gap-2 transition-colors ${selectedAvatar === avatar.img ? 'bg-green-500 text-white' : 'bg-yellow-400 text-white hover:bg-yellow-500'}`}
                      onClick={() => handleSelectAvatar(avatar.img)}
                    >
                      {selectedAvatar === avatar.img ? 'Seleccionado' : 'Seleccionar como avatar'}
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              className="mt-6 px-4 py-2 rounded font-gamer-body bg-yellow-200 text-yellow-900 hover:bg-yellow-300 transition-colors border border-yellow-300"
              onClick={closeSectionModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal para FONDOS */}
      {activeSection === 'fondos' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-carbon-dark rounded-xl shadow-2xl p-8 w-[90vw] max-w-2xl max-h-[80vh] flex flex-col items-center border-2 border-strong-blue animate-fade-in overflow-y-auto scrollbar-thin scrollbar-thumb-cyber-blue scrollbar-track-gray-200">
            <h2 className="font-gamer-title text-2xl text-strong-blue mb-4">Tus fondos comprados</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {fondosComprados.length === 0 ? (
                <span className="text-gray-500 col-span-2 md:col-span-3">No tienes fondos comprados.</span>
              ) : (
                fondosComprados.map(fondo => (
                  <div key={fondo.id} className="flex flex-col items-center bg-gray-100 dark:bg-carbon-gray rounded-lg p-3 shadow-md">
                    <img src={fondo.img} alt={fondo.name} className="w-28 h-20 object-cover rounded mb-2" />
                    <span className="font-semibold text-gray-700 dark:text-gray-100 mb-2 text-center">{fondo.name}</span>
                    <button
                      className={`px-3 py-1 rounded font-bold flex items-center gap-2 transition-colors ${selectedBg === fondo.img ? 'bg-green-500 text-white' : 'bg-cyber-blue text-white hover:bg-blue-700'}`}
                      onClick={() => handleSelectBg(fondo.img)}
                    >
                      {selectedBg === fondo.img ? (
                        <span className="inline-block w-4 h-4 bg-white rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                      ) : null}
                      {selectedBg === fondo.img ? 'Seleccionado' : 'Seleccionar como fondo'}
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              className="mt-6 px-4 py-2 rounded font-gamer-body bg-purple-200 text-purple-900 hover:bg-purple-300 transition-colors border border-purple-300"
              onClick={closeSectionModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal para MARCOS */}
      {activeSection === 'marcos' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-carbon-dark rounded-xl shadow-2xl p-8 w-[90vw] max-w-2xl max-h-[80vh] flex flex-col items-center border-2 border-strong-blue animate-fade-in overflow-y-auto scrollbar-thin scrollbar-thumb-cyber-blue scrollbar-track-gray-200">
            <h2 className="font-gamer-title text-2xl text-strong-blue mb-4">Tus marcos comprados</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {marcosComprados.length === 0 ? (
                <span className="text-gray-500 col-span-2 md:col-span-3">No tienes marcos comprados.</span>
              ) : (
                marcosComprados.map(marco => (
                  <div key={marco.id} className="flex flex-col items-center bg-gray-100 dark:bg-carbon-gray rounded-lg p-3 shadow-md">
                    <img src={marco.img} alt={marco.name} className="w-28 h-20 object-cover rounded mb-2" />
                    <span className="font-semibold text-gray-700 dark:text-gray-100 mb-2 text-center">{marco.name}</span>
                    <button
                      className={`px-3 py-1 rounded font-bold flex items-center gap-2 transition-colors ${selectedFrame === marco.img ? 'bg-green-500 text-white' : 'bg-cyber-blue text-white hover:bg-blue-700'}`}
                      onClick={() => handleSelectFrame(marco.img)}
                    >
                      {selectedFrame === marco.img ? (
                        <span className="inline-block w-4 h-4 bg-white rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                      ) : null}
                      {selectedFrame === marco.img ? 'Seleccionado' : 'Seleccionar como marco'}
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              className="mt-6 px-4 py-2 rounded font-gamer-body bg-purple-200 text-purple-900 hover:bg-purple-300 transition-colors border border-purple-300"
              onClick={closeSectionModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal para BADGES */}
      {activeSection === 'badges' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-carbon-dark rounded-xl shadow-2xl p-8 w-[90vw] max-w-2xl max-h-[80vh] flex flex-col items-center border-2 border-strong-blue animate-fade-in overflow-y-auto scrollbar-thin scrollbar-thumb-cyber-blue scrollbar-track-gray-200">
            <h2 className="font-gamer-title text-2xl text-strong-blue mb-4">Tus badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {badgesComprados.length === 0 ? (
                <span className="text-gray-500 col-span-2 md:col-span-3">No tienes badges.</span>
              ) : (
                badgesComprados.map(badge => (
                  <div key={badge.id} className="flex flex-col items-center bg-gray-100 dark:bg-carbon-gray rounded-lg p-3 shadow-md">
                    <img src={badge.img} alt={badge.name} className="w-20 h-20 object-cover rounded mb-2" />
                    <span className="font-semibold text-gray-700 dark:text-gray-100 mb-2 text-center">{badge.name}</span>
                  </div>
                ))
              )}
            </div>
            <button
              className="mt-6 px-4 py-2 rounded font-gamer-body bg-purple-200 text-purple-900 hover:bg-purple-300 transition-colors border border-purple-300"
              onClick={closeSectionModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmación de reemplazo */}
      <ReplaceItemModal
        isOpen={replaceModal.isOpen}
        onClose={cancelReplacement}
        onConfirm={confirmReplacement}
        item={replaceModal.item!}
        currentItem={replaceModal.item ? getSelectedItem(replaceModal.item.category) : undefined}
      />

      {/* Modales de edición y cambio de contraseña (reutilizados) */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-[90vw] max-w-md flex flex-col items-center border-2 border-cyber-blue animate-fade-in">
            <h2 className="font-gamer-title text-2xl text-cyber-blue mb-4">Editar Perfil</h2>
            <div className="w-full flex flex-col gap-4">
              <label className="font-bold text-gray-700">Nombre
                <input className="w-full text-center font-gamer-body text-base bg-gray-100 border border-cyber-blue rounded px-2 py-1 outline-none" value={name} onChange={e => setName(e.target.value)} />
              </label>
              <label className="font-bold text-gray-700">Correo
                <input className="w-full text-center font-gamer-body text-base bg-gray-100 border border-cyber-blue rounded px-2 py-1 outline-none" value={email} onChange={e => setEmail(e.target.value)} />
              </label>
              <label className="font-bold text-gray-700">Foto de perfil
                <input type="file" accept="image/*" className="w-full text-center font-gamer-body text-base bg-gray-100 border border-cyber-blue rounded px-2 py-1 outline-none" onChange={e => setProfilePic(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)} />
              </label>
            </div>
            <div className="flex gap-2 justify-center mt-6">
              <button className="px-3 py-1 rounded bg-gray-200 text-gray-800 font-bold" onClick={() => setShowEditProfile(false)}>Cancelar</button>
              <button className="px-3 py-1 rounded bg-cyber-blue text-black font-bold" onClick={() => setShowEditProfile(false)}>Guardar</button>
            </div>
          </div>
        </div>
      )}
      {showPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button onClick={() => setShowPassword(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold">×</button>
            <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
            <form className="flex flex-col gap-4">
              <label className="font-semibold text-gray-700">Contraseña Actual
                <input type="password" className="input mt-1 w-full border rounded px-3 py-2" />
              </label>
              <label className="font-semibold text-gray-700">Nueva Contraseña
                <input type="password" className="input mt-1 w-full border rounded px-3 py-2" />
              </label>
              <label className="font-semibold text-gray-700">Confirmar Nueva Contraseña
                <input type="password" className="input mt-1 w-full border rounded px-3 py-2" />
              </label>
              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold" onClick={() => setShowPassword(false)}>Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-bold">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {!user?.email && (
        <div className="text-red-600 font-bold">No hay usuario autenticado. Inicia sesión para ver tus likes/dislikes.</div>
      )}
    </div>
  );
};

export default Profile; 

<style jsx>{`
  .fire-frame .flame1 {
    animation: flame1 2.2s ease-in-out infinite alternate;
  }
  .fire-frame .flame2 {
    animation: flame2 2.4s ease-in-out infinite alternate;
  }
  .fire-frame .flame3 {
    animation: flame3 2.1s ease-in-out infinite alternate;
  }
  .fire-frame .flame4 {
    animation: flame4 2.3s ease-in-out infinite alternate;
  }
  .fire-frame .flame5 {
    animation: flame5 2.5s ease-in-out infinite alternate;
  }
  .fire-frame .flame6 {
    animation: flame6 2.6s ease-in-out infinite alternate;
  }
  @keyframes flame1 {
    0% { opacity: 0.8; transform: scaleY(1) translateY(0); }
    50% { opacity: 1; transform: scaleY(1.15) translateY(-4px); }
    100% { opacity: 0.7; transform: scaleY(0.95) translateY(2px); }
  }
  @keyframes flame2 {
    0% { opacity: 0.7; transform: scaleY(1) translateY(0); }
    50% { opacity: 1; transform: scaleY(1.12) translateY(-3px); }
    100% { opacity: 0.8; transform: scaleY(0.97) translateY(2px); }
  }
  @keyframes flame3 {
    0% { opacity: 0.8; transform: scaleX(1) translateX(0); }
    50% { opacity: 1; transform: scaleX(1.13) translateX(-4px); }
    100% { opacity: 0.7; transform: scaleX(0.95) translateX(2px); }
  }
  @keyframes flame4 {
    0% { opacity: 0.7; transform: scaleX(1) translateX(0); }
    50% { opacity: 1; transform: scaleX(1.12) translateX(3px); }
    100% { opacity: 0.8; transform: scaleX(0.97) translateX(-2px); }
  }
  @keyframes flame5 {
    0% { opacity: 0.8; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.1) rotate(-3deg); }
    100% { opacity: 0.7; transform: scale(0.95) rotate(2deg); }
  }
  @keyframes flame6 {
    0% { opacity: 0.8; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.1) rotate(3deg); }
    100% { opacity: 0.7; transform: scale(0.95) rotate(-2deg); }
  }
`}</style> 