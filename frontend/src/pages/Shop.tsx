import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/useTranslation';

// Datos mock del usuario
const mockUser = {
  name: 'D4ZC',
  avatar: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=D',
  points: 50000
};

// Categorías de productos
const categories = [
  { id: 'avatars', name: 'Avatares Únicos', icon: '👤' },
  { id: 'badges', name: 'Insignias Exclusivas', icon: '🏆' },
  { id: 'themes', name: 'Temas de Perfil', icon: '🎨' },
  { id: 'emotes', name: 'Emotes Personalizados', icon: '😄' },
  { id: 'backgrounds', name: 'Fondos de Perfil', icon: '🖼️' }
];

// Productos mock por categoría
const mockProducts = {
  avatars: [
    { id: 'av1', name: 'Avatar Cyberpunk', price: 5000, image: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=CP', description: 'Avatar futurista con efectos neon' },
    { id: 'av2', name: 'Avatar Ninja', price: 3000, image: 'https://via.placeholder.com/200x200/6366F1/FFFFFF?text=NJ', description: 'Avatar sigiloso y elegante' },
    { id: 'av3', name: 'Avatar Robot', price: 8000, image: 'https://via.placeholder.com/200x200/EC4899/FFFFFF?text=RB', description: 'Avatar mecánico avanzado' },
    { id: 'av4', name: 'Avatar Mago', price: 6000, image: 'https://via.placeholder.com/200x200/A855F7/FFFFFF?text=MG', description: 'Avatar místico con poderes' }
  ],
  badges: [
    { id: 'bd1', name: 'Insignia Hacker', price: 2000, image: 'https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=H', description: 'Insignia para expertos en seguridad' },
    { id: 'bd2', name: 'Insignia Bug Hunter', price: 1500, image: 'https://via.placeholder.com/100x100/6366F1/FFFFFF?text=B', description: 'Insignia para cazadores de bugs' },
    { id: 'bd3', name: 'Insignia MVP', price: 10000, image: 'https://via.placeholder.com/100x100/EC4899/FFFFFF?text=M', description: 'Insignia para jugadores más valiosos' }
  ],
  themes: [
    { id: 'th1', name: 'Tema Oscuro Pro', price: 4000, image: 'https://via.placeholder.com/200x150/1F2937/8B5CF6?text=Dark', description: 'Tema oscuro profesional' },
    { id: 'th2', name: 'Tema Neon', price: 3500, image: 'https://via.placeholder.com/200x150/8B5CF6/FFFFFF?text=Neon', description: 'Tema con efectos neon' },
    { id: 'th3', name: 'Tema Clásico', price: 2500, image: 'https://via.placeholder.com/200x150/374151/FFFFFF?text=Classic', description: 'Tema clásico y elegante' }
  ],
  emotes: [
    { id: 'em1', name: 'Emote GG', price: 1000, image: 'https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=GG', description: 'Emote para buenos juegos' },
    { id: 'em2', name: 'Emote OMG', price: 1200, image: 'https://via.placeholder.com/80x80/6366F1/FFFFFF?text=OMG', description: 'Emote de sorpresa' },
    { id: 'em3', name: 'Emote GG EZ', price: 1500, image: 'https://via.placeholder.com/80x80/EC4899/FFFFFF?text=EZ', description: 'Emote para victorias fáciles' }
  ],
  backgrounds: [
    { id: 'bg1', name: 'Fondo Galaxia', price: 3000, image: 'https://via.placeholder.com/300x200/1E1B4B/8B5CF6?text=Galaxy', description: 'Fondo espacial espectacular' },
    { id: 'bg2', name: 'Fondo Ciudad', price: 2500, image: 'https://via.placeholder.com/300x200/374151/6366F1?text=City', description: 'Fondo urbano moderno' },
    { id: 'bg3', name: 'Fondo Abstracto', price: 2000, image: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Abstract', description: 'Fondo abstracto artístico' }
  ]
};

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('avatars');
  const [userPoints, setUserPoints] = useState(mockUser.points);
  const [userInventory, setUserInventory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);

  const currentProducts = mockProducts[selectedCategory as keyof typeof mockProducts] || [];

  const filteredProducts = currentProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePurchase = (product: any) => {
    if (userPoints >= product.price) {
      setUserPoints(prev => prev - product.price);
      setUserInventory(prev => [...prev, product.id]);
      setShowSuccessMessage(`¡${product.name} adquirido exitosamente!`);
      setTimeout(() => setShowSuccessMessage(null), 3000);
    } else {
      setShowSuccessMessage('No tienes suficientes puntos para esta compra.');
      setTimeout(() => setShowSuccessMessage(null), 3000);
    }
  };

  const isProductOwned = (productId: string) => userInventory.includes(productId);

  const handleInventoryClick = () => {
    navigate('/inventory');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-400">Bug Bounty Store</h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">💰</span>
                <span className="font-semibold">{userPoints.toLocaleString()}</span>
              </div>
              <button
                onClick={handleInventoryClick}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Mi Inventario
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
        {/* Success/Error Message */}
        {showSuccessMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            showSuccessMessage.includes('adquirido') 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white'
          }`}>
            {showSuccessMessage}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden hover:border-purple-500 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {isProductOwned(product.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Propio
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
                  
                  <button
                    onClick={() => handlePurchase(product)}
                    disabled={isProductOwned(product.id) || userPoints < product.price}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isProductOwned(product.id)
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : userPoints < product.price
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {isProductOwned(product.id) ? 'Adquirido' : 'Comprar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop; 