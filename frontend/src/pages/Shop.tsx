import React, { useState, useEffect } from 'react';
import { Edit, TrashCan, Checkmark } from '@carbon/icons-react';
import {
  Button,
  TextInput,
  TextArea,
  FileUploader,
  Tag,
  Tile,
  Modal,
  Select,
  SelectItem
} from '@carbon/react';

const MARCOS = [
  { name: 'Neón Azul', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Dorado', url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { name: 'Retro', url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
];

const FONDOS = [
  { name: 'Galaxia', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ciberpunk', url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80' },
  { name: 'Minimalista', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80' },
];

const sampleProducts = [
  {
    name: 'Marco Neon Azul',
    category: 'Marco',
    description: 'Marco digital con efecto neón azul para tu avatar.',
    fileName: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    price: 150,
    discount: 20,
  },
  {
    name: 'Fondo Galaxia',
    category: 'Fondo',
    description: 'Fondo espacial con estrellas y nebulosas para tu perfil.',
    fileName: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    price: 180,
    discount: 10,
  },
  {
    name: 'Marco Dorado',
    category: 'Marco',
    description: 'Marco elegante dorado para destacar tu avatar.',
    fileName: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    price: 220,
    discount: 15,
  },
  {
    name: 'Fondo Ciberpunk',
    category: 'Fondo',
    description: 'Fondo con luces y ambiente ciberpunk para tu perfil.',
    fileName: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    price: 200,
    discount: 25,
  },
  {
    name: 'Avatar Pixel Art',
    category: 'Avatar',
    description: 'Avatar estilo pixel art para personalizar tu perfil.',
    fileName: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    price: 120,
    discount: 0,
  },
  {
    name: 'Marco Retro',
    category: 'Marco',
    description: 'Marco con diseño retro y colores vibrantes.',
    fileName: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    price: 160,
    discount: 5,
  },
  {
    name: 'Fondo Minimalista',
    category: 'Fondo',
    description: 'Fondo claro y minimalista para un perfil elegante.',
    fileName: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    price: 110,
    discount: 0,
  },
  {
    name: 'Marco Animado',
    category: 'Marco',
    description: 'Marco animado con efectos de luz para tu avatar.',
    fileName: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    price: 250,
    discount: 30,
  },
  {
    name: 'Fondo Holográfico',
    category: 'Fondo',
    description: 'Fondo con efecto holográfico y colores iridiscentes.',
    fileName: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    price: 210,
    discount: 10,
  },
  {
    name: 'Avatar Cómic',
    category: 'Avatar',
    description: 'Avatar con estilo de cómic para destacar tu perfil.',
    fileName: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    price: 130,
    discount: 0,
  },
  {
    name: 'Marco Prisma',
    category: 'Marco',
    description: 'Marco con efecto prisma y reflejos multicolor para tu avatar.',
    fileName: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    price: 175,
    discount: 12,
  },
  {
    name: 'Fondo Digital Abstracto',
    category: 'Fondo',
    description: 'Fondo abstracto digital con formas geométricas y colores vivos.',
    fileName: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    price: 140,
    discount: 8,
  },
];

const Shop: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isPulse, setIsPulse] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // Eliminar el estado y lógica del carrusel
  const [products, setProducts] = useState(sampleProducts);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    fileName: '',
    price: 100,
    discount: 0,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [deleteTimer, setDeleteTimer] = useState(0);
  const [deleteModalExit, setDeleteModalExit] = useState(false);
  const [buyModal, setBuyModal] = useState<{ open: boolean, idx: number | null }>({ open: false, idx: null });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  // Para cerrar modal con ESC
  useEffect(() => {
    if (!showCreateModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowCreateModal(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showCreateModal]);

  // Eliminar el JSX del carrusel
  // Eliminar el estado y lógica del carrusel

  // Leer productos de localStorage al cargar
  useEffect(() => {
    const stored = localStorage.getItem('shopProducts');
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  // Guardar productos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('shopProducts', JSON.stringify(products));
  }, [products]);

  const handlePressStart = () => setIsPressed(true);
  const handlePressEnd = () => setIsPressed(false);

  const closeCreateModal = () => setShowCreateModal(false);
  const openCreateModal = () => {
    setNewProduct({ name: '', category: '', description: '', fileName: '', price: 100, discount: 0 });
    setShowCreateModal(true);
  };

  // Función para iniciar el proceso de borrado
  const startDeleteProcess = (idx: number) => {
    setDeleteIdx(idx);
    setShowDeleteConfirm(true);
    setDeleteTimer(3);
    let interval: any;
    interval = setInterval(() => {
      setDeleteTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const cancelDelete = () => {
    setDeleteModalExit(true);
    setTimeout(() => {
      setShowDeleteConfirm(false);
      setDeleteIdx(null);
      setDeleteTimer(0);
      setDeleteModalExit(false);
    }, 500);
  };
  const confirmDelete = () => {
    if (deleteIdx !== null) {
      setProducts(products.filter((_, i) => i !== deleteIdx));
      setShowDeleteConfirm(false);
      setDeleteIdx(null);
      setDeleteTimer(0);
    }
  };

  // Agregar estado para el índice del carrusel
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [carouselTransition, setCarouselTransition] = useState('');
  // Carrusel: obtener imágenes de los productos
  const productImages = products.map(p => p.fileName || '/bp-logo.png');
  const nextCarousel = () => {
    setCarouselTransition('slide-fade-out-left');
    setTimeout(() => {
      setCarouselIdx((prev) => (prev + 1) % productImages.length);
      setCarouselTransition('slide-fade-in-left');
    }, 300);
    setTimeout(() => setCarouselTransition(''), 700);
  };
  const prevCarousel = () => {
    setCarouselTransition('slide-fade-out-right');
    setTimeout(() => {
      setCarouselIdx((prev) => (prev - 1 + productImages.length) % productImages.length);
      setCarouselTransition('slide-fade-in-right');
    }, 300);
    setTimeout(() => setCarouselTransition(''), 700);
  };

  // Cambio automático de imagen cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselTransition('slide-fade-out-left');
      setTimeout(() => {
        setCarouselIdx((prev) => (prev + 1) % productImages.length);
        setCarouselTransition('slide-fade-in-left');
      }, 300);
      setTimeout(() => setCarouselTransition(''), 700);
    }, 3000);
    return () => clearInterval(interval);
  }, [productImages.length]);

  return (
    <div className="flex flex-col w-full text-black min-h-screen px-0">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold mr-4">Tienda</h2>
      </div>
      {/* Carrusel simple de imágenes de productos */}
      <div className="w-full flex flex-col items-center justify-center mb-10">
        <div className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
          <img
            src={productImages[carouselIdx]}
            alt={`Producto ${carouselIdx + 1}`}
            className={`w-full h-full object-cover transition-all duration-500 ${carouselTransition}`}
            style={{ background: '#fff', margin: 0, padding: 0 }}
            onError={e => (e.currentTarget.src = '/bp-logo.png')}
          />
          <button
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 shadow-md"
            onClick={prevCarousel}
            aria-label="Anterior"
            type="button"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 shadow-md"
            onClick={nextCarousel}
            aria-label="Siguiente"
            type="button"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {productImages.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === carouselIdx ? 'bg-blue-600' : 'bg-white border border-blue-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Catálogo de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 px-0">
        {products.map((product, idx) => (
          editMode && editingIdx === idx ? (
            <div
            key={idx}
            className="w-full max-w-xs bg-white rounded-lg shadow-md p-5 flex flex-col border border-gray-200 hover:shadow-lg transition-all duration-200 relative"
          >
                <Tag type="blue" className="mb-2">
                  <TextInput
                    id={`category-${idx}`}
                    labelText="Categoría"
                    hideLabel
                    value={product.category}
                    onChange={e => {
                      const newProducts = [...products];
                      newProducts[idx].category = e.target.value;
                      setProducts(newProducts);
                    }}
                    className="w-full"
                  />
                </Tag>
                <TextInput
                  id={`name-${idx}`}
                  labelText="Nombre"
                  value={product.name}
                  onChange={e => {
                    const newProducts = [...products];
                    newProducts[idx].name = e.target.value;
                    setProducts(newProducts);
                  }}
                  className="font-bold text-lg mb-1"
                />
                <TextArea
                  id={`desc-${idx}`}
                  labelText="Descripción"
                  value={product.description}
                  onChange={e => {
                    const newProducts = [...products];
                    newProducts[idx].description = e.target.value;
                    setProducts(newProducts);
                  }}
                  className="text-sm mb-2"
                />
              <TextInput
                id={`price-${idx}`}
                labelText="Precio (BugCoins)"
                type="number"
                min={0}
                value={product.price}
                onChange={e => {
                  const newProducts = [...products];
                  newProducts[idx].price = Number(e.target.value);
                  setProducts(newProducts);
                }}
                className="mb-2"
              />
              <TextInput
                id={`discount-${idx}`}
                labelText="Descuento (%)"
                type="number"
                min={0}
                max={100}
                value={product.discount}
                onChange={e => {
                  const newProducts = [...products];
                  newProducts[idx].discount = Number(e.target.value);
                  setProducts(newProducts);
                }}
                className="mb-2"
              />
                <FileUploader
                  labelTitle="Imagen"
                  labelDescription="Sube una imagen para el producto"
                  buttonLabel="Seleccionar archivo"
                  accept={[".jpg", ".png"]}
                  filenameStatus="edit"
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const newProducts = [...products];
                      newProducts[idx].fileName = file.name;
                      setProducts(newProducts);
                    }
                  }}
                  className="mt-2"
                />
                <div className="text-xs text-gray-500 mt-2">{product.fileName}</div>
                <Button
                  kind="primary"
                  size="sm"
                  className="mt-2"
                  onClick={() => setEditingIdx(null)}
                >
                  Guardar
                </Button>
            </div>
            ) : (
            <div
              key={idx}
              className="w-full max-w-xs bg-white rounded-xl shadow-md flex flex-col border border-gray-200 hover:shadow-lg transition-all duration-200 relative overflow-hidden cursor-pointer"
              onClick={() => !editMode && setBuyModal({ open: true, idx })}
              style={{ minHeight: 340 }}
            >
              {editMode && (
                <div className="absolute bottom-3 right-3 flex gap-2 z-10">
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={Edit}
                    onClick={() => setEditingIdx(idx)}
                    className="!p-0"
                  />
                  <Button
                    kind="ghost"
                    size="sm"
                    hasIconOnly
                    renderIcon={TrashCan}
                    onClick={() => startDeleteProcess(idx)}
                    className="!p-0"
                  />
                </div>
              )}
              {/* Imagen principal */}
              <div className="flex-1 flex items-center justify-center bg-gray-100" style={{ minHeight: 180 }}>
                <img
                  src={product.fileName || '/bp-logo.png'}
                  alt={product.name}
                  className="object-contain max-h-44 max-w-full rounded-t-xl"
                  style={{ background: '#fff', width: '100%' }}
                  onError={e => (e.currentTarget.src = '/bp-logo.png')}
                />
              </div>
              {/* Texto y costo */}
              <div className="flex flex-col justify-between p-4">
                <div className="font-bold text-base text-black mb-1 truncate" title={product.name}>{product.name}</div>
                <div className="text-xs text-gray-600 mb-2 truncate" title={product.description}>{product.description}</div>
                <div className="flex items-center gap-2 mt-2">
                  <img src="/bp-logo.png" alt="BugCoins" style={{ width: 22, height: 22, display: 'inline-block', objectFit: 'contain', transformStyle: 'preserve-3d' }} className="bugcoins-spin-3d" />
                  <span className="text-black text-lg font-bold">{product.price}</span>
                  {product.discount > 0 && (
                    <span className="text-green-500 text-sm font-semibold">-{product.discount}%</span>
                  )}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      {/* Botones flotantes: editar y agregar */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50">
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={() => <Edit size={20} className={`text-white ${editMode ? 'animate-wiggle' : ''}`} />}
          className="w-10 h-10 bg-black hover:bg-gray-900 focus:bg-gray-900 border-none flex items-center justify-center rounded-full"
          onClick={() => setEditMode((prev) => !prev)}
          style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)' }}
        />
        <button
          className={`w-14 h-14 bg-black text-white flex items-center justify-center rounded-full shadow-lg hover:bg-gray-900 transition-all focus:outline-none border-none ${isPulse ? 'animate-pulse-plus' : ''}`}
          style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)' }}
          aria-label="Agregar producto"
          type="button"
          onClick={() => {
            setIsPulse(true);
            setTimeout(() => setIsPulse(false), 250);
            openCreateModal();
          }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeLinecap="round" />
            <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {/* Modal overlay personalizado para crear producto */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Fondo semitransparente (sin onClick) */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-fade-in" />
          {/* Cuadro modal */}
          <div className="relative z-50 w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 animate-slide-fade-modal">
            <h2 className="text-2xl font-bold mb-6">Agregar producto</h2>
            <form onSubmit={e => {e.preventDefault(); setProducts([...products, {...newProduct}]); closeCreateModal();}}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                  value={newProduct.category}
                  onChange={e => setNewProduct(np => ({ ...np, category: e.target.value }))}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Swag">Swag</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                  value={newProduct.name}
                  onChange={e => setNewProduct(np => ({ ...np, name: e.target.value }))}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                  value={newProduct.description}
                  onChange={e => setNewProduct(np => ({ ...np, description: e.target.value }))}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Precio (BugCoins)</label>
                <input
                  type="number"
                  min={0}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                  value={newProduct.price}
                  onChange={e => setNewProduct(np => ({ ...np, price: Number(e.target.value) }))}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Descuento (%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                  value={newProduct.discount}
                  onChange={e => setNewProduct(np => ({ ...np, discount: Number(e.target.value) }))}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    if (file) setNewProduct(np => ({ ...np, fileName: file.name }));
                  }}
                />
                {newProduct.fileName && <div className="text-xs text-gray-500 mt-1">{newProduct.fileName}</div>}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300" onClick={closeCreateModal}>Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Crear</button>
              </div>
            </form>
            <style>{`
              .animate-fade-in { animation: fadeInBg 0.2s; }
              @keyframes fadeInBg { from { opacity: 0; } to { opacity: 1; } }
              .animate-slide-fade-modal { animation: slideFadeInModal 0.25s cubic-bezier(0.4,0,0.2,1); }
              @keyframes slideFadeInModal { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
          </div>
        </div>
      )}
      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${deleteModalExit ? 'pointer-events-none' : ''}`}>
          {/* Fondo semitransparente */}
          <div className={`fixed inset-0 bg-black bg-opacity-40 z-40 ${deleteModalExit ? 'animate-fade-out' : 'animate-fade-in'}`} onClick={cancelDelete} />
          {/* Cuadro modal */}
          <div className={`relative z-50 w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 ${deleteModalExit ? 'animate-modal-exit' : 'animate-slide-fade-modal'}`}>
            <div className="text-center">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" className="mx-auto mb-4 text-red-500">
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-lg font-bold text-gray-900 mb-2">¿Eliminar?</h3>
                <p className="text-gray-600 mb-6">
                  ¿Estás seguro que quieres eliminar el producto? <span className="text-red-600 font-bold uppercase">ESTO NO SE PUEDE DESHACER.</span>
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                  onClick={cancelDelete}
                >
                  Cancelar
                </button>
                <button
                  className={`px-4 py-2 rounded transition-colors ${
                    deleteTimer > 0 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                  onClick={confirmDelete}
                  disabled={deleteTimer > 0}
                >
                  {deleteTimer > 0 ? `Eliminar (${deleteTimer}s)` : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal de confirmación de compra */}
      {buyModal.open && buyModal.idx !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-gray-900">¿Estás seguro que quieres comprar este producto por <span className='text-blue-700'>{products[buyModal.idx].price} BugCoins</span>?</h3>
            <div className="flex gap-4 mt-4">
              <button className="px-5 py-2 bg-gray-200 rounded text-gray-700 font-semibold hover:bg-gray-300" onClick={() => setBuyModal({ open: false, idx: null })}>Cancelar</button>
              <button className="px-5 py-2 bg-blue-600 rounded text-white font-semibold hover:bg-blue-700" onClick={() => {
                setBuyModal({ open: false, idx: null });
                setSuccessMsg(`Has comprado "${products[buyModal.idx].name}" satisfactoriamente`);
                setTimeout(() => setSuccessMsg(null), 2500);
              }}>Comprar</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de compra exitosa */}
      {successMsg && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-green-100 border border-green-400 rounded-lg shadow-lg px-8 py-6 text-center">
            <span className="text-green-700 text-lg font-bold">{successMsg}</span>
          </div>
        </div>
      )}
      <style>{`
        .pressed-3d {
          transform: scale(0.93);
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        }
        .animate-wiggle {
          animation: wiggle 0.7s infinite;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-15deg); }
          30% { transform: rotate(10deg); }
          45% { transform: rotate(-10deg); }
          60% { transform: rotate(6deg); }
          75% { transform: rotate(-4deg); }
          90% { transform: rotate(2deg); }
        }
        .slide-fade-in-left {
          opacity: 1;
          transform: translateX(0);
          animation: slideFadeInLeft 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-fade-out-left {
          opacity: 0;
          transform: translateX(-120px) scale(0.98);
          animation: slideFadeOutLeft 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-fade-in-right {
          opacity: 1;
          transform: translateX(0);
          animation: slideFadeInRight 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-fade-out-right {
          opacity: 0;
          transform: translateX(120px) scale(0.98);
          animation: slideFadeOutRight 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideFadeInLeft {
          from { opacity: 0; transform: translateX(-120px) scale(0.98); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFadeOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-120px) scale(0.98); }
        }
        @keyframes slideFadeInRight {
          from { opacity: 0; transform: translateX(120px) scale(0.98); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFadeOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(120px) scale(0.98); }
        }
        .animate-pulse-plus {
          animation: pulse-plus 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes pulse-plus {
          0% { transform: scale(1); }
          50% { transform: scale(0.85); }
          100% { transform: scale(1); }
        }
        .animate-fade-out {
          animation: fadeOutBg 0.5s;
        }
        @keyframes fadeOutBg {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-modal-exit {
          animation: modalExit 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes modalExit {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(40px); }
        }
        .bugcoins-spin-3d {
          animation: bugcoins-spin-3d-rotate 2.5s linear infinite;
          transform-style: preserve-3d;
        }
        @keyframes bugcoins-spin-3d-rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Shop; 