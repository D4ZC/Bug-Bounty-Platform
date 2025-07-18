import React from 'react';
import { useState } from 'react';
import { FaEllipsisV, FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

const profileProducts = [
  { id: 1, name: 'Perfil Hacker', price: 300, img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'Perfil Elite', price: 400, img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'Perfil Cyber', price: 350, img: 'https://randomuser.me/api/portraits/men/45.jpg' },
];
const frameProducts = [
  { id: 4, name: 'Marco Dorado', price: 200, img: 'https://i.imgur.com/1Q9Z1Zm.png' },
  { id: 5, name: 'Marco Azul', price: 180, img: 'https://i.imgur.com/2nCt3Sbl.png' },
  { id: 6, name: 'Marco Cyber', price: 220, img: 'https://i.imgur.com/8Km9tLL.png' },
];
const bannerProducts = [
  { id: 7, name: 'Banner Matrix', price: 250, img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: 8, name: 'Banner Hacker', price: 230, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 9, name: 'Banner Futurista', price: 270, img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80' },
];

const Shop: React.FC = () => {
  const [userPoints, setUserPoints] = useState(1200);
  const [acquired, setAcquired] = useState<number[]>([]);
  const [editMode, setEditMode] = useState({ perfiles: false, marcos: false, baners: false });
  const [menuOpen, setMenuOpen] = useState<{ [key: number]: boolean }>({});
  const [editBannerModal, setEditBannerModal] = useState<{ open: boolean, product: any | null }>({ open: false, product: null });
  const [bannerProductsState, setBannerProductsState] = useState(bannerProducts);
  const editNameRef = useRef<HTMLInputElement>(null);
  const editImgRef = useRef<HTMLInputElement>(null);

  const handleAcquire = (productId: number, price: number) => {
    if (userPoints >= price && !acquired.includes(productId)) {
      setUserPoints(userPoints - price);
      setAcquired([...acquired, productId]);
    }
  };

  const handleEditSection = (section: 'perfiles' | 'marcos' | 'baners') => {
    setEditMode({ ...editMode, [section]: !editMode[section] });
  };
  const handleMenuToggle = (id: number) => {
    setMenuOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const handleAddCard = (section: 'perfiles' | 'marcos' | 'baners') => {
    // Aquí podrías abrir un modal o formulario para agregar un producto
    alert(`Agregar nuevo a ${section}`);
  };

  const handleEditBanner = (product: any) => {
    setEditBannerModal({ open: true, product });
  };
  const handleSaveBannerEdit = () => {
    if (!editBannerModal.product) return;
    const newName = editNameRef.current?.value || editBannerModal.product.name;
    const file = editImgRef.current?.files?.[0];
    let newImg = editBannerModal.product.img;
    if (file) {
      newImg = URL.createObjectURL(file);
    }
    setBannerProductsState(bannerProductsState.map(b => b.id === editBannerModal.product.id ? { ...b, name: newName, img: newImg } : b));
    setEditBannerModal({ open: false, product: null });
  };

  return (
    <div className="w-full h-full max-w-5xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Tienda</h2>
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center min-w-[220px]">
          <div className="text-lg font-semibold text-gray-700 mb-2">Tus puntos</div>
          <div className="text-3xl font-bold text-blue-600 mb-1">{userPoints}</div>
          <div className="text-sm text-blue-400">Puntos</div>
        </div>
      </div>

      {/* Perfiles */}
      <div className="flex items-center gap-2 mb-4 mt-8">
        <h3 className="text-2xl font-bold text-blue-700">Perfiles</h3>
        <button className="ml-2 text-xs text-blue-400 hover:underline" onClick={() => handleEditSection('perfiles')}>Editar</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {profileProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center relative">
            {editMode.perfiles && (
              <div className="absolute top-2 right-2 z-10">
                <button onClick={() => handleMenuToggle(product.id)} className="p-1 rounded-full hover:bg-gray-100">
                  <FaEllipsisV size={18} />
                </button>
                {menuOpen[product.id] && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg text-sm">
                    <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">Editar</button>
                    <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500">Eliminar</button>
                  </div>
                )}
              </div>
            )}
            <img src={product.img} alt={product.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-200" />
            <div className="text-lg font-bold mb-2">{product.name}</div>
            <div className="text-blue-600 font-bold mb-2">{product.price} puntos</div>
            <button
              className={`px-4 py-2 rounded font-semibold transition text-white ${userPoints >= product.price && !acquired.includes(product.id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={userPoints < product.price || acquired.includes(product.id)}
              onClick={() => handleAcquire(product.id, product.price)}
            >
              {acquired.includes(product.id) ? 'Adquirido' : 'Adquirir'}
            </button>
          </div>
        ))}
        {editMode.perfiles && (
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 border-2 border-dashed border-blue-300 min-h-[220px]" onClick={() => handleAddCard('perfiles')}>
            <FaPlus size={36} className="text-blue-400 mb-2" />
            <span className="text-blue-400 font-semibold">Agregar</span>
          </div>
        )}
      </div>

      {/* Marcos */}
      <div className="flex items-center gap-2 mb-4 mt-8">
        <h3 className="text-2xl font-bold text-blue-700">Marcos</h3>
        <button className="ml-2 text-xs text-blue-400 hover:underline" onClick={() => handleEditSection('marcos')}>Editar</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {frameProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center relative">
            {editMode.marcos && (
              <div className="absolute top-2 right-2 z-10">
                <button onClick={() => handleMenuToggle(product.id)} className="p-1 rounded-full hover:bg-gray-100">
                  <FaEllipsisV size={18} />
                </button>
                {menuOpen[product.id] && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg text-sm">
                    <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">Editar</button>
                    <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500">Eliminar</button>
                  </div>
                )}
              </div>
            )}
            <img src={product.img} alt={product.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-yellow-300" />
            <div className="text-lg font-bold mb-2">{product.name}</div>
            <div className="text-blue-600 font-bold mb-2">{product.price} puntos</div>
            <button
              className={`px-4 py-2 rounded font-semibold transition text-white ${userPoints >= product.price && !acquired.includes(product.id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={userPoints < product.price || acquired.includes(product.id)}
              onClick={() => handleAcquire(product.id, product.price)}
            >
              {acquired.includes(product.id) ? 'Adquirido' : 'Adquirir'}
            </button>
          </div>
        ))}
        {editMode.marcos && (
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 border-2 border-dashed border-blue-300 min-h-[220px]" onClick={() => handleAddCard('marcos')}>
            <FaPlus size={36} className="text-blue-400 mb-2" />
            <span className="text-blue-400 font-semibold">Agregar</span>
          </div>
        )}
      </div>

      {/* Baners */}
      <div className="flex items-center gap-2 mb-4 mt-8">
        <h3 className="text-2xl font-bold text-blue-700">Baners</h3>
        <button className="ml-2 text-xs text-blue-400 hover:underline" onClick={() => handleEditSection('baners')}>Editar</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {bannerProductsState.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center relative">
            {editMode.baners && (
              <div className="absolute top-2 right-2 z-10">
                <button onClick={() => handleMenuToggle(product.id)} className="p-1 rounded-full hover:bg-gray-100">
                  <FaEllipsisV size={18} />
                </button>
                {menuOpen[product.id] && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg text-sm">
                    <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left" onClick={() => { setMenuOpen({}); handleEditBanner(product); }}>Editar</button>
                    <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500">Eliminar</button>
                  </div>
                )}
              </div>
            )}
            <img src={product.img} alt={product.name} className="w-32 h-20 rounded object-cover mb-4 border-4 border-purple-300" />
            <div className="text-lg font-bold mb-2">{product.name}</div>
            <div className="text-blue-600 font-bold mb-2">{product.price} puntos</div>
            <button
              className={`px-4 py-2 rounded font-semibold transition text-white ${userPoints >= product.price && !acquired.includes(product.id) ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={userPoints < product.price || acquired.includes(product.id)}
              onClick={() => handleAcquire(product.id, product.price)}
            >
              {acquired.includes(product.id) ? 'Adquirido' : 'Adquirir'}
            </button>
          </div>
        ))}
        {editMode.baners && (
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 border-2 border-dashed border-blue-300 min-h-[120px]" onClick={() => handleAddCard('baners')}>
            <FaPlus size={36} className="text-blue-400 mb-2" />
            <span className="text-blue-400 font-semibold">Agregar</span>
          </div>
        )}
      </div>

      {/* Modal para editar baner */}
      {editBannerModal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl relative w-full max-w-md flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setEditBannerModal({ open: false, product: null })}>×</button>
            <div className="text-xl font-bold mb-4">Editar Baner</div>
            <label className="block w-full text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input ref={editNameRef} defaultValue={editBannerModal.product?.name} className="input w-full mb-4 border rounded px-2 py-1" />
            <label className="block w-full text-sm font-medium text-gray-700 mb-2">Imagen</label>
            <input ref={editImgRef} type="file" accept="image/*" className="mb-4" />
            <button className="btn-primary w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSaveBannerEdit}>Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop; 