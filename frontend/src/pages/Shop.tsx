import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/ui/Modal';
import ConfettiBlast from '../components/ui/ConfettiBlast';
import {
  getProducts,
  getPurchasesByUser,
  savePurchase,
  updateProduct,
  initializeShopProducts,
  resetAndInitializeShopProducts,
  Product,
  Purchase
} from '../localDb';

const Shop: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Forzar inicialización de productos si no existen
      initializeShopProducts();
      
      const [allProducts, userPurchases] = await Promise.all([
        getProducts(),
        user ? getPurchasesByUser(user._id) : []
      ]);
      
      console.log('Productos cargados:', allProducts.length);
      setProducts(allProducts);
      setPurchases(userPurchases);
    } catch (error) {
      console.error('Error loading shop data:', error);
      showToast('Error al cargar la tienda', 'error');
    }
  };

  // Función para reinicializar productos (debug)
  const handleResetProducts = () => {
    resetAndInitializeShopProducts();
    loadData();
    showToast('Productos reinicializados', 'success');
  };

  const handlePurchase = async (productId: string, quantity: number = 1) => {
    if (!user) {
      showToast('Debes iniciar sesión para comprar', 'error');
      return;
    }

    try {
      const product = products.find(p => p.id === productId);
      if (!product) {
        showToast('Producto no encontrado', 'error');
        return;
      }

      const purchase: Purchase = {
        id: new Date().toISOString(), // Assuming a simple ID generation for now
        userId: user._id,
        productId: productId,
        pointsSpent: product.cost * quantity,
        totalPrice: product.cost * quantity,
        quantity: quantity,
        date: new Date().toISOString()
      };
      await savePurchase(purchase);
      showToast('¡Compra exitosa!', 'success');
      setShowPurchaseModal(false);
      setSelectedProduct(null);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      loadData();
    } catch (error) {
      showToast('Error al realizar la compra', 'error');
    }
  };

  const getRarityColor = (rarity: string) => {
    const rarityMap: { [key: string]: string } = {
      'común': 'from-gray-400 to-gray-600',
      'raro': 'from-blue-400 to-blue-600',
      'épico': 'from-purple-400 to-purple-600',
      'legendario': 'from-yellow-400 to-yellow-600',
      'mítico': 'from-red-400 to-red-600'
    };
    return rarityMap[rarity] || 'from-gray-400 to-gray-600';
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟡';
      default: return '⚪';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weapons': return '⚔️';
      case 'armor': return '🛡️';
      case 'consumables': return '🧪';
      case 'cosmetics': return '🎨';
      case 'tools': return '🔧';
      default: return '📦';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesRarity = selectedRarity === 'all' || product.rarity === selectedRarity;
    return matchesSearch && matchesCategory && matchesRarity;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.cost - b.cost;
      case 'price-desc':
        return b.cost - a.cost;
      case 'rarity':
        const rarityOrder = { 'común': 0, 'raro': 1, 'épico': 2, 'legendario': 3, 'mítico': 4 };
        return rarityOrder[a.rarity] - rarityOrder[b.rarity];
      case 'stock':
        return b.stock - a.stock;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const rarities = ['all', 'common', 'rare', 'epic', 'legendary'];

  const canAfford = (product: Product) => {
    return user ? (user.points || 0) >= product.cost : false;
  };

  const canPurchase = (product: Product) => {
    if (!user) return false;
    return canAfford(product) && product.stock > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white relative overflow-x-hidden">
      {/* Efecto de partículas/fondo cyberpunk */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="80%" cy="20%" r="400" fill="url(#cyberpunk-glow)" />
          <circle cx="20%" cy="80%" r="300" fill="url(#cyberpunk-glow)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 relative z-10">
        {/* Header Mejorado */}
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-red-900/20 to-orange-900/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border-2 border-orange-400/50 rounded-3xl p-8 shadow-2xl">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                🛒
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-extrabold mb-4 tracking-widest bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent"
              >
                TIENDA
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-orange-200 max-w-3xl mx-auto"
              >
                Descubre armas legendarias, armaduras épicas y herramientas únicas para dominar la plataforma
              </motion.p>
              
              {/* Botón de debug para reinicializar productos */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                onClick={handleResetProducts}
                className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all duration-300"
              >
                🔄 Reinicializar Productos (Debug)
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Estadísticas de la Tienda */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {/* Productos Disponibles */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                📦
              </motion.div>
              <div className="text-3xl font-bold text-green-400 mb-1">
                {products.length}
              </div>
              <div className="text-green-200 text-sm">Productos</div>
            </div>
          </motion.div>

          {/* Tu Saldo */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                💎
              </motion.div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">
                {user?.points || 0}
              </div>
              <div className="text-cyan-200 text-sm">Tus Puntos</div>
            </div>
          </motion.div>

          {/* Compras Realizadas */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                🛍️
              </motion.div>
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {purchases.length}
              </div>
              <div className="text-purple-200 text-sm">Compras</div>
            </div>
          </motion.div>

          {/* Productos Legendarios */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-4xl mb-2"
              >
                ⭐
              </motion.div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                {products.filter(p => p.rarity === 'legendary').length}
              </div>
              <div className="text-yellow-200 text-sm">Legendarios</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Controles Mejorados */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8"
        >
          {/* Búsqueda */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white placeholder-cyan-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                🔍
              </div>
            </div>
          </div>

          {/* Categoría */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rareza */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-4">
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white"
              >
                {rarities.map(rarity => (
                  <option key={rarity} value={rarity}>
                    {rarity === 'all' ? 'Todas las rarezas' : rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ordenar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white"
              >
                <option value="name">Nombre</option>
                <option value="price">Precio (Menor)</option>
                <option value="price-desc">Precio (Mayor)</option>
                <option value="rarity">Rareza</option>
                <option value="stock">Stock</option>
              </select>
            </div>
          </div>

          {/* Botón Historial */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPurchaseModal(true)}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold py-4 px-6 rounded-2xl border-2 border-pink-400/50 shadow-2xl hover:shadow-pink-400/30 transition-all duration-300">
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📜
                </motion.div>
                Historial
              </span>
            </div>
          </motion.button>
        </motion.div>

        {/* Grid de Productos */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        >
          <AnimatePresence>
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(product.rarity)} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300`}></div>
                
                <div className="relative bg-black/80 backdrop-blur-xl border-2 border-orange-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-orange-400/30 transition-all duration-300 h-full">
                  {/* Header del producto */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          animate={{ 
                            scale: product.rarity === 'legendary' ? [1, 1.2, 1] : 1,
                            rotate: product.rarity === 'legendary' ? [0, 10, -10, 0] : 0
                          }}
                          transition={{ 
                            duration: product.rarity === 'legendary' ? 2 : 1, 
                            repeat: product.rarity === 'legendary' ? Infinity : 0 
                          }}
                          className="text-3xl"
                        >
                          {getRarityIcon(product.rarity)}
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold text-orange-200 group-hover:text-orange-100 transition-colors">
                            {product.name}
                          </h3>
                          <div className="text-sm text-orange-300">{product.category}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Imagen del producto */}
                  <div className="relative mb-4">
                    <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center">
                      <span className="text-4xl">{getCategoryIcon(product.category)}</span>
                    </div>
                    
                    {/* Badge de stock */}
                    {product.stock <= 0 && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        AGOTADO
                      </div>
                    )}
                    
                    {/* Badge de rareza */}
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(product.rarity)} text-white`}>
                      {product.rarity.toUpperCase()}
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-cyan-400">💎</div>
                      <div className="text-sm text-cyan-200">{product.cost}</div>
                      <div className="text-xs text-gray-400">Precio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400">📦</div>
                      <div className="text-sm text-green-200">{product.stock}</div>
                      <div className="text-xs text-gray-400">Stock</div>
                    </div>
                  </div>

                  {/* Requisitos */}
                  {product.requirements && (
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Nivel:</span>
                        <span className="text-blue-200">{product.requirements.minLevel}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Puntos:</span>
                        <span className="text-purple-200">{product.requirements.minPoints}</span>
                      </div>
                    </div>
                  )}

                  {/* Efectos */}
                  {product.effects && product.effects.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs text-gray-400 mb-2">Efectos:</div>
                      <div className="space-y-1">
                        {product.effects.slice(0, 2).map((effect, idx) => (
                          <div key={idx} className="text-xs text-green-300">• {effect}</div>
                        ))}
                        {product.effects.length > 2 && (
                          <div className="text-xs text-gray-400">+{product.effects.length - 2} más...</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Botón de compra */}
                  {canPurchase(product) ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowPurchaseModal(true);
                      }}
                      className="w-full py-3 px-4 rounded-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-500 hover:to-green-600 transition-all duration-300"
                    >
                      Comprar
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled
                      className={`w-full py-3 px-4 rounded-2xl font-bold ${
                        product.stock <= 0
                          ? 'bg-red-600 text-white cursor-not-allowed'
                          : !canAfford(product)
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-yellow-600 text-white cursor-not-allowed'
                      }`}
                    >
                      {product.stock <= 0 
                        ? 'Agotado' 
                        : !canAfford(product)
                        ? 'Puntos Insuficientes'
                        : 'Requisitos No Cumplidos'
                      }
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Paginación */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center gap-2 mb-8"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                    : 'bg-black/60 text-orange-200 hover:text-orange-100 border border-orange-400/50'
                }`}
              >
                {page}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Mensaje cuando no hay productos */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🛒</div>
            <h3 className="text-2xl font-bold text-orange-200 mb-4">No se encontraron productos</h3>
            <p className="text-gray-400">Intenta ajustar los filtros de búsqueda</p>
          </motion.div>
        )}
      </div>

      {/* Modal de Compra/Historial */}
      <Modal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        title={selectedProduct ? `Comprar ${selectedProduct.name}` : "Historial de Compras"}
      >
        <div className="space-y-6">
          {selectedProduct ? (
            <div>
              <div className="bg-orange-900/20 rounded-2xl p-4 border border-orange-400/30 mb-4">
                <h3 className="text-lg font-bold text-orange-200 mb-2">{selectedProduct.name}</h3>
                <p className="text-orange-300 text-sm mb-3">{selectedProduct.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Precio:</span>
                    <span className="text-orange-200 ml-2">{selectedProduct.cost} puntos</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Stock:</span>
                    <span className="text-green-200 ml-2">{selectedProduct.stock}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePurchase(selectedProduct.id)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300"
                >
                  Confirmar Compra
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPurchaseModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
                >
                  Cancelar
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {purchases.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🛍️</div>
                  <div className="text-orange-200 text-lg">No hay compras registradas</div>
                  <div className="text-gray-400 text-sm">¡Haz tu primera compra!</div>
                </div>
              ) : (
                purchases.map((purchase, index) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-orange-900/20 rounded-2xl border border-orange-400/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{getCategoryIcon(purchase.product.category)}</div>
                      <div>
                        <div className="font-bold text-orange-200">{purchase.product.name}</div>
                        <div className="text-sm text-orange-300">
                          {purchase.quantity}x - {purchase.totalPrice} puntos
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(purchase.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* Confetti */}
      {showConfetti && <ConfettiBlast />}
    </div>
  );
};

export default Shop; 
