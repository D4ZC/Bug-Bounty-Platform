import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/useTranslation';

// Datos mock del usuario
const mockUser = {
  name: 'D4ZC',
  avatar: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=D',
  points: 50000
};

// Productos mock (mismos que en Shop.tsx)
const mockProducts = {
  avatars: [
    { id: 'av1', name: 'Avatar Cyberpunk', price: 5000, image: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=CP', description: 'Avatar futurista con efectos neon', type: 'avatar' },
    { id: 'av2', name: 'Avatar Ninja', price: 3000, image: 'https://via.placeholder.com/200x200/6366F1/FFFFFF?text=NJ', description: 'Avatar sigiloso y elegante', type: 'avatar' },
    { id: 'av3', name: 'Avatar Robot', price: 8000, image: 'https://via.placeholder.com/200x200/EC4899/FFFFFF?text=RB', description: 'Avatar mecánico avanzado', type: 'avatar' },
    { id: 'av4', name: 'Avatar Mago', price: 6000, image: 'https://via.placeholder.com/200x200/A855F7/FFFFFF?text=MG', description: 'Avatar místico con poderes', type: 'avatar' }
  ],
  badges: [
    { id: 'bd1', name: 'Insignia Hacker', price: 2000, image: 'https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=H', description: 'Insignia para expertos en seguridad', type: 'badge' },
    { id: 'bd2', name: 'Insignia Bug Hunter', price: 1500, image: 'https://via.placeholder.com/100x100/6366F1/FFFFFF?text=B', description: 'Insignia para cazadores de bugs', type: 'badge' },
    { id: 'bd3', name: 'Insignia MVP', price: 10000, image: 'https://via.placeholder.com/100x100/EC4899/FFFFFF?text=M', description: 'Insignia para jugadores más valiosos', type: 'badge' }
  ],
  themes: [
    { id: 'th1', name: 'Tema Oscuro Pro', price: 4000, image: 'https://via.placeholder.com/200x150/1F2937/8B5CF6?text=Dark', description: 'Tema oscuro profesional', type: 'theme' },
    { id: 'th2', name: 'Tema Neon', price: 3500, image: 'https://via.placeholder.com/200x150/8B5CF6/FFFFFF?text=Neon', description: 'Tema con efectos neon', type: 'theme' },
    { id: 'th3', name: 'Tema Clásico', price: 2500, image: 'https://via.placeholder.com/200x150/374151/FFFFFF?text=Classic', description: 'Tema clásico y elegante', type: 'theme' }
  ],
  emotes: [
    { id: 'em1', name: 'Emote GG', price: 1000, image: 'https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=GG', description: 'Emote para buenos juegos', type: 'emote' },
    { id: 'em2', name: 'Emote OMG', price: 1200, image: 'https://via.placeholder.com/80x80/6366F1/FFFFFF?text=OMG', description: 'Emote de sorpresa', type: 'emote' },
    { id: 'em3', name: 'Emote GG EZ', price: 1500, image: 'https://via.placeholder.com/80x80/EC4899/FFFFFF?text=EZ', description: 'Emote para victorias fáciles', type: 'emote' }
  ],
  backgrounds: [
    { id: 'bg1', name: 'Fondo Galaxia', price: 3000, image: 'https://via.placeholder.com/300x200/1E1B4B/8B5CF6?text=Galaxy', description: 'Fondo espacial espectacular', type: 'background' },
    { id: 'bg2', name: 'Fondo Ciudad', price: 2500, image: 'https://via.placeholder.com/300x200/374151/6366F1?text=City', description: 'Fondo urbano moderno', type: 'background' },
    { id: 'bg3', name: 'Fondo Abstracto', price: 2000, image: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Abstract', description: 'Fondo abstracto artístico', type: 'background' }
  ]
};

// Categorías
const categories = [
  { id: 'avatars', name: 'Avatares', icon: '👤' },
  { id: 'badges', name: 'Insignias', icon: '🏆' },
  { id: 'themes', name: 'Temas', icon: '🎨' },
  { id: 'emotes', name: 'Emotes', icon: '😄' },
  { id: 'backgrounds', name: 'Fondos', icon: '🖼️' }
];

const Inventory: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('avatars');
  const [activeItems, setActiveItems] = useState<{ [key: string]: string }>({
    avatar: 'av1',
    theme: 'th1',
    background: 'bg1'
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);

  // Simular inventario del usuario (en un caso real vendría del backend)
  const userInventory = ['av1', 'av2', 'bd1', 'th1', 'th2', 'em1', 'bg1', 'bg2'];

  const getAllProducts = () => {
    return Object.values(mockProducts).flat();
  };

  const userProducts = getAllProducts().filter(product => 
    userInventory.includes(product.id)
  );

  const currentCategoryProducts = userProducts.filter(product => 
    product.type === selectedCategory.slice(0, -1) // Remove 's' from category name
  );

  const handleActivate = (product: any) => {
    if (product.type === 'avatar' || product.type === 'theme' || product.type === 'background') {
      setActiveItems(prev => ({
        ...prev,
        [product.type]: product.id
      }));
      setShowSuccessMessage(`${product.name} activado exitosamente!`);
      setTimeout(() => setShowSuccessMessage(null), 3000);
    }
  };

  const isActive = (product: any) => {
    return activeItems[product.type] === product.id;
  };

  const canBeActivated = (product: any) => {
    return ['avatar', 'theme', 'background'].includes(product.type);
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

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-purple-400">{userProducts.length}</div>
            <div className="text-gray-400">Total de Items</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-green-400">
              {userProducts.filter(p => p.type === 'avatar').length}
            </div>
            <div className="text-gray-400">Avatares</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">
              {userProducts.filter(p => p.type === 'badge').length}
            </div>
            <div className="text-gray-400">Insignias</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl font-bold text-yellow-400">
              {userProducts.filter(p => p.type === 'theme').length}
            </div>
            <div className="text-gray-400">Temas</div>
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
            <p className="text-gray-400 text-lg">No tienes items en esta categoría.</p>
            <p className="text-gray-500 text-sm mt-2">¡Visita la tienda para adquirir nuevos items!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventory; 