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
import MainLayout from '../components/layouts/MainLayout';

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
    name: 'Marco de Madera',
    category: 'Marco',
    description: 'Marco elegante con textura de madera natural para un look rústico y sofisticado.',
    fileName: '/gemini-product.png',
    price: 150,
    discount: 20,
  },
  {
    name: 'Marco de Gemas',
    category: 'Fondo',
    description: 'Marco brillante con cristales y gemas que reflejan la luz de manera mágica.',
    fileName: '/gemini-product-2.png',
    price: 180,
    discount: 10,
  },
  {
    name: 'Marco Dorado',
    category: 'Marco',
    description: 'Marco premium con acabado dorado que transmite elegancia y prestigio.',
    fileName: '/marcos/marco1.png',
    price: 220,
    discount: 15,
  },
  {
    name: 'Marco de Loki',
    category: 'Fondo',
    description: 'Marco místico inspirado en el dios del engaño con efectos místicos y misteriosos.',
    fileName: '/marcos/marco2.png',
    price: 200,
    discount: 25,
  },
  {
    name: 'Banner de Puente',
    category: 'Avatar',
    description: 'Banner con paisaje de puente sobre aguas tranquilas, perfecto para perfiles serenos.',
    fileName: '/paradise1.jpg',
    price: 120,
    discount: 0,
  },
  {
    name: 'Banner de Lago',
    category: 'Marco',
    description: 'Banner con vista panorámica de lago cristalino rodeado de naturaleza exuberante.',
    fileName: '/paradise2.jpg',
    price: 160,
    discount: 5,
  },
  {
    name: 'Banner de Circuito',
    category: 'Fondo',
    description: 'Banner tecnológico con patrones de circuitos electrónicos para amantes de la tecnología.',
    fileName: '/circuit.jpg',
    price: 110,
    discount: 0,
  },
  {
    name: 'Banner de Hola Mundo!',
    category: 'Marco',
    description: 'Banner programático con código "Hello World" para desarrolladores y entusiastas del código.',
    fileName: '/code.jpg',
    price: 250,
    discount: 30,
  },
];

const Shop: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isPulse, setIsPulse] = useState(false);
  const [editMode, setEditMode] = useState(() => {
    const savedEditMode = localStorage.getItem('shopEditMode');
    return savedEditMode ? JSON.parse(savedEditMode) : false;
  });
  const [products, setProducts] = useState(sampleProducts);

  const [editingIdx, setEditingIdx] = useState<number | null>(() => {
    const savedEditingIdx = localStorage.getItem('shopEditingIdx');
    return savedEditingIdx ? JSON.parse(savedEditingIdx) : null;
  });
  const [showCreateModal, setShowCreateModal] = useState(() => {
    const savedShowCreateModal = localStorage.getItem('shopShowCreateModal');
    return savedShowCreateModal ? JSON.parse(savedShowCreateModal) : false;
  });
  const [newProduct, setNewProduct] = useState(() => {
    const savedNewProduct = localStorage.getItem('shopNewProduct');
    return savedNewProduct ? JSON.parse(savedNewProduct) : {
      name: '',
      category: '',
      description: '',
      fileName: '',
      price: 100,
      discount: 0,
    };
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [deleteTimer, setDeleteTimer] = useState(0);
  const [deleteModalExit, setDeleteModalExit] = useState(false);
  const [buyModal, setBuyModal] = useState<{ open: boolean, idx: number | null }>({ open: false, idx: null });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showProductPreview, setShowProductPreview] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<any>(null);
  const [showConfirmPurchase, setShowConfirmPurchase] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseText, setPurchaseText] = useState('Comprando...');
  const [isJumping, setIsJumping] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState<any>(null);
  // Para cerrar modal con ESC
  useEffect(() => {
    if (!showCreateModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowCreateModal(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showCreateModal]);

  // Animación de puntos suspensivos durante la compra
  useEffect(() => {
    if (!isPurchasing) return;
    
    const dots = ['Comprando...', 'Comprando..', 'Comprando.', 'Comprando'];
    let dotIndex = 0;
    
    const interval = setInterval(() => {
      setPurchaseText(dots[dotIndex]);
      dotIndex = (dotIndex + 1) % dots.length;
    }, 500);
    
    return () => clearInterval(interval);
  }, [isPurchasing]);

  // Leer productos de localStorage al cargar y restablecer BugCoins
  useEffect(() => {
    const stored = localStorage.getItem('shopProducts');
    if (stored) {
      setProducts(JSON.parse(stored));
    }
    
    // Restablecer BugCoins a 1325 (solo una vez al cargar)
    const currentBugCoins = localStorage.getItem('userBugCoins');
    if (!currentBugCoins || parseInt(currentBugCoins) !== 1325) {
      localStorage.setItem('userBugCoins', '1325');
    }
  }, []);

  // Guardar productos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('shopProducts', JSON.stringify(products));
  }, [products]);

  // Guardar modo de edición en localStorage
  useEffect(() => {
    localStorage.setItem('shopEditMode', JSON.stringify(editMode));
  }, [editMode]);

  // Guardar nuevo producto en localStorage
  useEffect(() => {
    localStorage.setItem('shopNewProduct', JSON.stringify(newProduct));
  }, [newProduct]);

  // Guardar índice de edición en localStorage
  useEffect(() => {
    localStorage.setItem('shopEditingIdx', JSON.stringify(editingIdx));
  }, [editingIdx]);

  // Guardar estado del modal de creación en localStorage
  useEffect(() => {
    localStorage.setItem('shopShowCreateModal', JSON.stringify(showCreateModal));
  }, [showCreateModal]);



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
      const newProducts = products.filter((_, idx) => idx !== deleteIdx);
      setProducts(newProducts);
      setShowDeleteConfirm(false);
      setDeleteIdx(null);
      setDeleteTimer(0);
    }
  };

  const handleBuy = (idx: number) => {
    setBuyModal({ open: true, idx });
  };

  const handleProductPreview = (product: any) => {
    setPreviewProduct(product);
    setShowProductPreview(true);
  };

  const confirmBuy = () => {
    if (buyModal.idx !== null) {
      setSuccessMsg('¡Compra exitosa! Producto añadido a tu inventario.');
      setTimeout(() => setSuccessMsg(null), 3000);
      setBuyModal({ open: false, idx: null });
    }
  };

  const cancelBuy = () => {
    setBuyModal({ open: false, idx: null });
  };

  // Función para actualizar BugCoins
  const updateBugCoins = (newAmount: number) => {
    localStorage.setItem('userBugCoins', newAmount.toString());
  };

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto px-2 md:px-4 py-8 min-h-screen bg-white">
        <h1 className="text-3xl font-bold text-black mb-8">Tienda</h1>
        
        {/* Layout con texto promocional y anuncio alineados */}
        <div className="flex gap-8 mb-8 items-start">
          {/* Texto promocional */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 relative overflow-hidden" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Fondo con patrones */}
              <div className="absolute inset-0 bg-white opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #e5e7eb 1px, transparent 1px),
                                 radial-gradient(circle at 75% 75%, #e5e7eb 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 transform -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-200 to-blue-200 rounded-full opacity-30 transform translate-x-12 translate-y-12"></div>
              
              <div className="relative z-10 text-center">
                <p className="text-6xl font-bold text-blue-800 leading-tight uppercase">
                  ¡¡AQUÍ ENCONTRARÁS TODO LO NECESARIO PARA TU PERFIL!!
                </p>
              </div>
            </div>
          </div>
          
          {/* Anuncio */}
          <div className="w-96">
            <div className="flex items-center justify-center bg-gray-50 rounded-2xl" style={{ height: '400px' }}>
              <img 
                src="/anuncio.png" 
                alt="Publicidad" 
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '700px', maxWidth: '100%' }}
              />
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
              onClick={() => !editMode && handleProductPreview(product)}
              style={{ minHeight: 340 }}
            >
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg px-8 py-6 text-center">
            <h3 className="text-xl font-bold mb-4 text-gray-900">¿Estás seguro que quieres comprar este producto por <span className='text-blue-700'>{products[buyModal.idx].price} BugCoins</span>?</h3>
            <div className="flex gap-4 mt-4">
              <button className="px-5 py-2 bg-gray-200 rounded text-gray-700 font-semibold hover:bg-gray-300" onClick={cancelBuy}>Cancelar</button>
              <button className="px-5 py-2 bg-blue-600 rounded text-white font-semibold hover:bg-blue-700" onClick={confirmBuy}>Comprar</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de previsualización de productos */}
      {showProductPreview && previewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo semitransparente */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-fade-in" onClick={() => {
            setShowProductPreview(false);
            setShowConfirmPurchase(false);
            setIsPurchasing(false);
            setIsJumping(false);
            setShowSuccessModal(false);
            setPurchasedProduct(null);
            setPurchaseText('Comprando...');
          }} />
          {/* Modal de previsualización */}
          <div className="relative z-50 w-full max-w-4xl h-[80vh] mx-auto bg-white rounded-lg shadow-lg animate-slide-fade-modal">
            {/* Header del modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{previewProduct.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{previewProduct.category}</p>
              </div>
              <button
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setShowProductPreview(false);
                  setShowConfirmPurchase(false);
                  setIsPurchasing(false);
                  setIsJumping(false);
                  setShowSuccessModal(false);
                  setPurchasedProduct(null);
                  setPurchaseText('Comprando...');
                }}
                title="Cerrar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Contenido del producto */}
            <div className="flex-1 p-6 overflow-auto" style={{ height: 'calc(80vh - 120px)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Imagen del producto */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={previewProduct.fileName || '/bp-logo.png'}
                      alt={previewProduct.name}
                      className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
                      onError={e => (e.currentTarget.src = '/bp-logo.png')}
                    />
                    {previewProduct.discount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{previewProduct.discount}%
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Información del producto */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h4>
                    <p className="text-gray-700 leading-relaxed">{previewProduct.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src="/bugcoin.png" 
                        alt="BugCoin" 
                        className={`w-8 h-8 mr-2 ${isJumping ? 'bugcoins-jump' : isPurchasing ? 'bugcoins-spin-fast' : 'bugcoins-spin-3d'}`}
                        style={{ transformStyle: 'preserve-3d' }}
                      />
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          {previewProduct.price}
                        </span>
                        {previewProduct.discount > 0 && (
                          <span className="text-lg text-gray-500 line-through ml-2">
                            {Math.round(previewProduct.price * (1 + previewProduct.discount / 100))}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Categoría: {previewProduct.category}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      className={`flex-1 px-6 py-3 rounded-lg transition-all duration-300 font-semibold ${
                        isPurchasing 
                          ? 'bg-gray-500 text-white cursor-not-allowed' 
                          : showConfirmPurchase 
                            ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse' 
                            : (() => {
                                const finalPrice = previewProduct.discount > 0 
                                  ? Math.round(previewProduct.price * (1 - previewProduct.discount / 100))
                                  : previewProduct.price;
                                const currentBugCoins = parseInt(localStorage.getItem('userBugCoins') || '1325');
                                return currentBugCoins >= finalPrice 
                                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                  : 'bg-gray-400 text-white cursor-not-allowed';
                              })()
                      }`}
                      onClick={() => {
                        if (isPurchasing) return; // No hacer nada si está comprando
                        
                        // Verificar si tiene suficientes BugCoins
                        const finalPrice = previewProduct.discount > 0 
                          ? Math.round(previewProduct.price * (1 - previewProduct.discount / 100))
                          : previewProduct.price;
                        
                        const currentBugCoins = parseInt(localStorage.getItem('userBugCoins') || '1325');
                        if (currentBugCoins < finalPrice) {
                          alert('No tienes suficientes BugCoins para comprar este producto.');
                          return;
                        }
                        
                        if (!showConfirmPurchase) {
                          setShowConfirmPurchase(true);
                          // Resetear después de 3 segundos
                          setTimeout(() => setShowConfirmPurchase(false), 3000);
                        } else {
                          // Confirmar compra - activar animación rápida
                          setIsPurchasing(true);
                          setShowConfirmPurchase(false);
                          
                          // Activar salto a los 3.5 segundos
                          setTimeout(() => {
                            setIsJumping(true);
                          }, 3500);
                          
                          // Recuperar velocidad de moneda a los 4 segundos
                          setTimeout(() => {
                            setIsPurchasing(false);
                            setIsJumping(false);
                          }, 4000);
                          
                          // Cerrar modal después de 5 segundos
                          setTimeout(() => {
                            setShowProductPreview(false);
                            setIsPurchasing(false);
                            const productIndex = products.findIndex(p => p.name === previewProduct.name);
                            if (productIndex !== -1) {
                              // Calcular el precio final con descuento
                              const finalPrice = previewProduct.discount > 0 
                                ? Math.round(previewProduct.price * (1 - previewProduct.discount / 100))
                                : previewProduct.price;
                              
                              // Rebajar BugCoins
                              const currentBugCoins = parseInt(localStorage.getItem('userBugCoins') || '1325');
                              const newBugCoins = currentBugCoins - finalPrice;
                              updateBugCoins(newBugCoins);
                              
                              setPurchasedProduct(previewProduct);
                              setShowSuccessModal(true);
                              setTimeout(() => setShowSuccessModal(false), 4000);
                            }
                          }, 5000);
                        }
                      }}
                    >
                      {isPurchasing ? purchaseText : showConfirmPurchase ? '¿Estás Seguro?' : (() => {
                        const finalPrice = previewProduct.discount > 0 
                          ? Math.round(previewProduct.price * (1 - previewProduct.discount / 100))
                          : previewProduct.price;
                        const currentBugCoins = parseInt(localStorage.getItem('userBugCoins') || '1325');
                        return currentBugCoins >= finalPrice ? 'Comprar Ahora' : 'BugCoins Insuficientes';
                      })()}
                    </button>
                    <button
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                      onClick={() => {
                        setShowProductPreview(false);
                        setShowConfirmPurchase(false);
                        setIsPurchasing(false);
                        setIsJumping(false);
                        setShowSuccessModal(false);
                        setPurchasedProduct(null);
                        setPurchaseText('Comprando...');
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de compra exitosa */}
      {showSuccessModal && purchasedProduct && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Fondo semitransparente */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-fade-in" />
          
          {/* Modal de éxito */}
          <div className="relative z-50 w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl animate-slide-fade-modal overflow-hidden">
            {/* Confetis que se disparan */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Confetis que se disparan desde el centro */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Confeti 1 - Amarillo */}
                <div className="absolute confetti-shoot-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
                {/* Confeti 2 - Rosa */}
                <div className="absolute confetti-shoot-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
                {/* Confeti 3 - Azul */}
                <div className="absolute confetti-shoot-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                {/* Confeti 4 - Verde */}
                <div className="absolute confetti-shoot-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                {/* Confeti 5 - Púrpura */}
                <div className="absolute confetti-shoot-5">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
                {/* Confeti 6 - Naranja */}
                <div className="absolute confetti-shoot-6">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                </div>
                {/* Confeti 7 - Rojo */}
                <div className="absolute confetti-shoot-7">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
                {/* Confeti 8 - Cian */}
                <div className="absolute confetti-shoot-8">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Contenido del modal */}
            <div className="p-8 text-center relative z-10">
              {/* Imagen del producto */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <img
                    src={purchasedProduct.fileName || '/bp-logo.png'}
                    alt={purchasedProduct.name}
                    className="w-24 h-24 object-contain rounded-lg shadow-lg"
                    onError={e => (e.currentTarget.src = '/bp-logo.png')}
                  />
                  {purchasedProduct.discount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{purchasedProduct.discount}%
                    </div>
                  )}
                </div>
              </div>
              
              {/* Mensaje de éxito */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Has comprado exitosamente!
              </h3>
              
              {/* Nombre del producto */}
              <p className="text-lg font-semibold text-blue-600 mb-4">
                {purchasedProduct.name}
              </p>
              
              {/* Precio con moneda */}
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="/bugcoin.png" 
                  alt="BugCoin" 
                  className="w-6 h-6 mr-2 bugcoins-spin-3d" 
                  style={{ transformStyle: 'preserve-3d' }}
                />
                <span className="text-xl font-bold text-blue-600">
                  {purchasedProduct.discount > 0 
                    ? Math.round(purchasedProduct.price * (1 - purchasedProduct.discount / 100))
                    : purchasedProduct.price
                  }
                </span>
                <span className="text-lg text-gray-600 ml-1">BugCoins</span>
              </div>
              
              {/* Nuevo saldo de BugCoins */}
              <div className="flex items-center justify-center mb-6">
                <span className="text-sm text-gray-600 mr-2">Nuevo saldo:</span>
                <img 
                  src="/bugcoin.png" 
                  alt="BugCoin" 
                  className="w-5 h-5 mr-1 bugcoins-spin-3d" 
                  style={{ transformStyle: 'preserve-3d' }}
                />
                <span className="text-lg font-bold text-green-600">
                  {parseInt(localStorage.getItem('userBugCoins') || '1325')}
                </span>
                <span className="text-sm text-gray-600 ml-1">BugCoins</span>
              </div>
              
              {/* Mensaje de agradecimiento */}
              <p className="text-lg font-bold text-green-600">
                ¡¡Gracias!!
              </p>
            </div>
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
        .bugcoins-spin-fast {
          animation: bugcoins-spin-fast-rotate 0.3s linear infinite;
          transform-style: preserve-3d;
        }
        .bugcoins-jump {
          animation: bugcoins-jump-animation 0.5s ease-in-out;
          transform-style: preserve-3d;
        }
        @keyframes bugcoins-spin-3d-rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes bugcoins-spin-fast-rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes bugcoins-jump-animation {
          0% { transform: translateY(0px) rotateY(0deg); }
          25% { transform: translateY(-20px) rotateY(90deg); }
          50% { transform: translateY(-30px) rotateY(180deg); }
          75% { transform: translateY(-20px) rotateY(270deg); }
          100% { transform: translateY(0px) rotateY(360deg); }
        }
        
        /* Animaciones de confetis que se disparan */
        .confetti-shoot-1 {
          animation: confetti-shoot-1-animation 2s ease-out forwards;
        }
        .confetti-shoot-2 {
          animation: confetti-shoot-2-animation 2s ease-out forwards;
        }
        .confetti-shoot-3 {
          animation: confetti-shoot-3-animation 2s ease-out forwards;
        }
        .confetti-shoot-4 {
          animation: confetti-shoot-4-animation 2s ease-out forwards;
        }
        .confetti-shoot-5 {
          animation: confetti-shoot-5-animation 2s ease-out forwards;
        }
        .confetti-shoot-6 {
          animation: confetti-shoot-6-animation 2s ease-out forwards;
        }
        .confetti-shoot-7 {
          animation: confetti-shoot-7-animation 2s ease-out forwards;
        }
        .confetti-shoot-8 {
          animation: confetti-shoot-8-animation 2s ease-out forwards;
        }
        
        @keyframes confetti-shoot-1-animation {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          50% { transform: translate(-80px, -60px) rotate(180deg); opacity: 1; }
          100% { transform: translate(-120px, 120px) rotate(360deg); opacity: 0; }
        }
        @keyframes confetti-shoot-2-animation {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          50% { transform: translate(60px, -80px) rotate(180deg); opacity: 1; }
          100% { transform: translate(120px, 100px) rotate(360deg); opacity: 0; }
        }
        @keyframes confetti-shoot-3-animation {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          50% { transform: translate(-60px, -40px) rotate(180deg); opacity: 1; }
          100% { transform: translate(-100px, 80px) rotate(360deg); opacity: 0; }
        }
        @keyframes confetti-shoot-4-animation {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          50% { transform: translate(80px, -60px) rotate(180deg); opacity: 1; }
          100% { transform: translate(140px, 120px) rotate(360deg); opacity: 0; }
        }
        @keyframes confetti-shoot-5-animation {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          50% { transform: translate(-40px, -80px) rotate(180deg); opacity: 1; }
          100% { transform: translate(-80px, 100px) rotate(360deg); opacity: 0; }
        }
        @keyframes confetti-shoot-6-animation {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          50% { transform: translate(40px, -40px) rotate(180deg); opacity: 1; }
          100% { transform: translate(80px, 80px) rotate(360deg); opacity: 0; }
        }
        @keyframes confetti-shoot-7-animation {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          50% { transform: translate(-60px, -20px) rotate(180deg); opacity: 1; }
          100% { transform: translate(-100px, 60px) rotate(360deg); opacity: 0; }
        }
        @keyframes confetti-shoot-8-animation {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          50% { transform: translate(60px, -20px) rotate(180deg); opacity: 1; }
          100% { transform: translate(100px, 60px) rotate(360deg); opacity: 0; }
        }
        .animate-fade-in {
          animation: fadeInBg 0.2s;
        }
        @keyframes fadeInBg {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-fade-modal {
          animation: slideFadeInModal 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideFadeInModal {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      </div>
    </MainLayout>
  );
};

export default Shop; 