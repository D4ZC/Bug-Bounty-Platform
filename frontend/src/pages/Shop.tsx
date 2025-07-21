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

const carouselImages = [
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80',
];

const carouselImages2 = Array.from({ length: 5 }, (_, i) => `https://source.unsplash.com/random/800x320?sig=${i + Math.floor(Math.random()*10000)}`);

const sampleProducts = [
  {
    name: 'Camiseta Bug Bounty',
    category: 'Swag',
    description: 'Camiseta oficial del evento Bug Bounty, 100% algodón.',
    fileName: 'camiseta.jpg',
  },
  {
    name: 'Mouse Gamer',
    category: 'Hardware',
    description: 'Mouse óptico de alta precisión para gamers y pentesters.',
    fileName: 'mouse.png',
  },
  {
    name: 'Sticker Pack',
    category: 'Swag',
    description: 'Paquete de stickers exclusivos para tu laptop.',
    fileName: 'stickers.png',
  },
  {
    name: 'Licencia Software Pro',
    category: 'Software',
    description: 'Licencia anual para herramienta profesional de seguridad.',
    fileName: 'licencia.pdf',
  },
  // Nuevos productos
  {
    name: 'Taza Bug Hunter',
    category: 'Swag',
    description: 'Taza de cerámica con diseño exclusivo para cazadores de bugs.',
    fileName: 'taza.jpg',
  },
  {
    name: 'Teclado Mecánico',
    category: 'Hardware',
    description: 'Teclado mecánico retroiluminado ideal para programadores.',
    fileName: 'teclado.png',
  },
  {
    name: 'Curso Online Seguridad',
    category: 'Software',
    description: 'Acceso a curso online de seguridad informática y hacking ético.',
    fileName: 'curso.pdf',
  },
];

const Shop: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isPulse, setIsPulse] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [carouselIdx2, setCarouselIdx2] = useState(0);
  const [fade, setFade] = useState(false);
  const [fade2, setFade2] = useState(false);
  const [products, setProducts] = useState(sampleProducts);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    fileName: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [deleteTimer, setDeleteTimer] = useState(0);
  const [deleteModalExit, setDeleteModalExit] = useState(false);
  // Para cerrar modal con ESC
  useEffect(() => {
    if (!showCreateModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowCreateModal(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showCreateModal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCarouselIdx((prev) => (prev + 1) % carouselImages.length);
        setFade(false);
      }, 350);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval2 = setInterval(() => {
      setFade2(true);
      setTimeout(() => {
        setCarouselIdx2((prev) => (prev + 1) % carouselImages2.length);
        setFade2(false);
      }, 350);
    }, 3200);
    return () => clearInterval(interval2);
  }, []);

  const handlePressStart = () => setIsPressed(true);
  const handlePressEnd = () => setIsPressed(false);

  const nextImage = () => {
    setFade(true);
    setTimeout(() => {
      setCarouselIdx((prev) => (prev + 1) % carouselImages.length);
      setFade(false);
    }, 350);
  };
  const prevImage = () => {
    setFade(true);
    setTimeout(() => {
      setCarouselIdx((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
      setFade(false);
    }, 350);
  };

  const nextImage2 = () => {
    setFade2(true);
    setTimeout(() => {
      setCarouselIdx2((prev) => (prev + 1) % carouselImages2.length);
      setFade2(false);
    }, 350);
  };
  const prevImage2 = () => {
    setFade2(true);
    setTimeout(() => {
      setCarouselIdx2((prev) => (prev - 1 + carouselImages2.length) % carouselImages2.length);
      setFade2(false);
    }, 350);
  };

  const closeCreateModal = () => setShowCreateModal(false);
  const openCreateModal = () => {
    setNewProduct({ name: '', category: '', description: '', fileName: '' });
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

  return (
    <div className="flex flex-col w-full text-black min-h-screen px-0">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold mr-4">Tienda</h2>
      </div>
      {/* Carrusel de imágenes */}
      <div className="w-full flex flex-col justify-start mb-10">
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md">
          <img
            src={carouselImages[carouselIdx]}
            alt={`Imagen ${carouselIdx + 1}`}
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${fade ? 'slide-fade-out-left' : 'slide-fade-in-right'}`}
          />
          <button
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black rounded-full p-2 shadow-md"
            onClick={prevImage}
            aria-label="Anterior"
            type="button"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black rounded-full p-2 shadow-md"
            onClick={nextImage}
            aria-label="Siguiente"
            type="button"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, idx) => (
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
          <Tile
            key={idx}
            className="w-full max-w-xs bg-white rounded-lg shadow-md p-5 flex flex-col border border-gray-200 hover:shadow-lg transition-all duration-200 relative"
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
            {editMode && editingIdx === idx ? (
              <>
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
              </>
            ) : (
              <>
                <Tag type="blue" className="mb-2">{product.category}</Tag>
                <div className="font-bold text-lg mb-1">{product.name}</div>
                <div className="text-sm mb-2 text-gray-700">{product.description}</div>
                <div className="text-xs text-gray-500 mt-2">{product.fileName}</div>
              </>
            )}
          </Tile>
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
        .slide-fade-in-right {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .slide-fade-out-left {
          opacity: 0;
          transform: translateX(-120px) scale(0.98);
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
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
      `}</style>
    </div>
  );
};

export default Shop; 