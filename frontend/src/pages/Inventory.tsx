import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/useTranslation';
import { useInventory } from '../contexts/InventoryContext';

// Datos mock del usuario
const mockUser = {
  name: 'D4ZC',
  avatar: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=D',
  points: 50000
};



// Categorías
const categories = [
  { id: 'backgrounds', name: 'Fondos', icon: '🖼️' },
  { id: 'miniprofiles', name: 'Miniperfiles', icon: '👤' },
  { id: 'frames', name: 'Marcos', icon: '🖼️' },
  { id: 'animated', name: 'Avatares', icon: '🎭' },
  { id: 'badges', name: 'Insignias', icon: '🏆' },
  { id: 'season', name: 'Temporada', icon: '🌍' },
  { id: 'plates', name: 'Placas', icon: '🏷️' }
];

const Inventory: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { inventory, getInventoryByCategory } = useInventory();
  const [selectedCategory, setSelectedCategory] = useState('backgrounds');
  const [activeItems, setActiveItems] = useState<{ [key: string]: string }>({
    avatar: '',
    theme: '',
    background: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);

  // Obtener productos del inventario por categoría
  const currentCategoryProducts = getInventoryByCategory(selectedCategory);
  
  // Debug: Mostrar información del inventario
  console.log('Inventario completo:', inventory);
  console.log('Categoría seleccionada:', selectedCategory);
  console.log('Productos de la categoría:', currentCategoryProducts);

  const handleActivate = (product: any) => {
    if (product.category === 'animated' || product.category === 'backgrounds') {
      setActiveItems(prev => ({
        ...prev,
        [product.category === 'animated' ? 'avatar' : product.category.slice(0, -1)]: product.id
      }));
      setShowSuccessMessage(`${product.name} activado exitosamente!`);
      setTimeout(() => setShowSuccessMessage(null), 3000);
    }
  };

  const isActive = (product: any) => {
    const type = product.category === 'animated' ? 'avatar' : product.category.slice(0, -1);
    return activeItems[type] === product.id;
  };

  const canBeActivated = (product: any) => {
    return ['animated', 'backgrounds'].includes(product.category);
  };

  const handleShopClick = () => {
    navigate('/shop');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-400">Mi Inventario</h1>
            </div>
            
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">💰</span>
                <span className="font-semibold">{mockUser.points.toLocaleString()}</span>
              </div>
              <button
                onClick={handleShopClick}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Ir a la Tienda
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-8 h-8 rounded-full border-2 border-purple-500"
                />
                <span className="text-sm">{mockUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Navigation */}
      <nav className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  selectedCategory === category.id
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-600'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 rounded-lg bg-green-600 text-white">
            {showSuccessMessage}
          </div>
        )}

        {/* Debug Info */}
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-300">Debug: Total items en inventario: {inventory.length}</p>
          <p className="text-sm text-gray-300">Debug: Items en categoría "{selectedCategory}": {currentCategoryProducts.length}</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-purple-400">{inventory.length}</div>
            <div className="text-gray-400">Total de Items</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-green-400">
              {inventory.filter(p => p.category === 'animated').length}
            </div>
            <div className="text-gray-400">Avatares</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">
              {inventory.filter(p => p.category === 'backgrounds').length}
            </div>
            <div className="text-gray-400">Fondos</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-yellow-400">
              {inventory.filter(p => p.category === 'badges').length}
            </div>
            <div className="text-gray-400">Insignias</div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCategoryProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-gray-900 rounded-lg border overflow-hidden transition-all duration-200 hover:shadow-lg ${
                isActive(product) 
                  ? 'border-green-500 shadow-green-500/20' 
                  : 'border-gray-700 hover:border-purple-500 hover:shadow-purple-500/20'
              }`}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {isActive(product) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Activo
                  </div>
                )}
                {/* Badge de fecha de compra */}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  Comprado: {new Date(product.purchasedAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">💰</span>
                    <span className="font-semibold">{product.price.toLocaleString()}</span>
                  </div>
                  
                  {canBeActivated(product) ? (
                    <button
                      onClick={() => handleActivate(product)}
                      disabled={isActive(product)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isActive(product)
                          ? 'bg-green-600 text-white cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {isActive(product) ? 'Activado' : 'Activar'}
                    </button>
                  ) : (
                    <div className="text-gray-400 text-sm">Coleccionable</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentCategoryProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-400 text-lg">No tienes items en esta categoría.</p>
            <p className="text-gray-500 text-sm mt-2">¡Visita la tienda para adquirir nuevos items!</p>
            <button
              onClick={handleShopClick}
              className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Ir a la Tienda
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventory; 