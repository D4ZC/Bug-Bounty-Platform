import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { CartIcon, CartDrawer } from '@/components/ui/CartWidget';
import { useAuth } from '@/contexts/AuthContext';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/hooks/useToast';

const SHOP_CATEGORIES = {
  REWARDS: 'rewards',
  ACHIEVEMENTS: 'achievements',
  PREMIUM: 'premium',
};

const rewards = [
  { id: 1, name: 'Tarjeta Amazon $10', img: 'https://cdn-icons-png.flaticon.com/512/5968/5968982.png', desc: 'Canjea por una tarjeta de regalo Amazon.', price: 2000 },
  { id: 2, name: 'Descuento en cursos', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', desc: 'Cupón 50% en cursos de ciberseguridad.', price: 1500 },
  { id: 3, name: 'Sticker pack', img: 'https://cdn-icons-png.flaticon.com/512/747/747376.png', desc: 'Paquete de stickers edición limitada.', price: 500 },
  { id: 4, name: 'Taza edición especial', img: 'https://cdn-icons-png.flaticon.com/512/3500/3500833.png', desc: 'Taza con diseño exclusivo de la plataforma.', price: 1200 },
  { id: 5, name: 'Sudadera Bug Hunter', img: 'https://cdn-icons-png.flaticon.com/512/892/892458.png', desc: 'Sudadera oficial para cazadores de bugs.', price: 3500 },
  { id: 6, name: 'Mousepad gamer', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png', desc: 'Mousepad grande para escritorio.', price: 900 },
  { id: 7, name: 'Libro: Hacking Ético', img: 'https://cdn-icons-png.flaticon.com/512/29/29302.png', desc: 'Libro digital sobre hacking ético.', price: 800 },
  { id: 8, name: 'Tarjeta Steam $5', img: 'https://cdn-icons-png.flaticon.com/512/5968/5968703.png', desc: 'Canjea por saldo en Steam.', price: 1200 },
  { id: 9, name: 'Camiseta edición limitada', img: 'https://cdn-icons-png.flaticon.com/512/892/892458.png', desc: 'Camiseta exclusiva para miembros.', price: 1800 },
];

const achievements = [
  { id: 1, name: 'Insignia "Top Hunter"', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png', desc: 'Insignia especial por logros destacados.', price: 800 },
  { id: 2, name: 'Insignia "Bug Master"', img: 'https://cdn-icons-png.flaticon.com/512/616/616494.png', desc: 'Por reportar 10 bugs críticos.', price: 1000 },
  { id: 3, name: 'Insignia "Colaborador"', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828919.png', desc: 'Por contribuciones a la comunidad.', price: 600 },
  { id: 4, name: 'Insignia "CTF Winner"', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png', desc: 'Por ganar una competencia CTF.', price: 1200 },
  { id: 5, name: 'Insignia "Early Adopter"', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828961.png', desc: 'Por ser de los primeros usuarios.', price: 700 },
  { id: 6, name: 'Insignia "Mentor"', img: 'https://cdn-icons-png.flaticon.com/512/616/616494.png', desc: 'Por ayudar a nuevos usuarios.', price: 900 },
  { id: 7, name: 'Insignia "Hall of Fame"', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png', desc: 'Por entrar al salón de la fama.', price: 2000 },
];

const premium = [
  { id: 1, name: 'Membresía Premium (1 mes)', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png', desc: 'Acceso a funciones exclusivas por 1 mes.', price: 2500 },
  { id: 2, name: 'Skin de perfil dorado', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png', desc: 'Personaliza tu perfil con un skin dorado.', price: 1200 },
  { id: 3, name: 'Tema oscuro avanzado', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828961.png', desc: 'Desbloquea el tema oscuro premium.', price: 900 },
  { id: 4, name: 'Cambio de nickname', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828919.png', desc: 'Cambia tu nickname una vez.', price: 400 },
  { id: 5, name: 'Avatar animado', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png', desc: 'Desbloquea un avatar animado exclusivo.', price: 1500 },
  { id: 6, name: 'Marco de perfil especial', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', desc: 'Añade un marco especial a tu perfil.', price: 800 },
  { id: 7, name: 'Acceso beta a nuevas funciones', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png', desc: 'Prueba funciones antes que nadie.', price: 1000 },
  { id: 8, name: 'Sticker animado exclusivo', img: 'https://cdn-icons-png.flaticon.com/512/747/747376.png', desc: 'Sticker animado para chat.', price: 600 },
  { id: 9, name: 'Tema retro', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828961.png', desc: 'Personaliza la app con un tema retro.', price: 700 },
];

const Shop: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const [userPoints, setUserPoints] = useState(user?.points ?? 0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [cartBump, setCartBump] = useState(false);
  const toast = useToast();
  useEffect(() => {
    if ((user?.points ?? 0) < 70000) {
      setUserPoints(70000);
    } else {
      setUserPoints(user?.points ?? 0);
    }
  }, [user]);

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    if (total > userPoints) {
      setModalMsg('No tienes suficientes puntos para canjear estos productos.');
      setModalOpen(true);
      return;
    }
    setUserPoints(prev => prev - total);
    setModalMsg('¡Canje realizado con éxito!');
    setModalOpen(true);
    setCart([]);
    setCartOpen(false);
  };

  const handleAddToCart = (prod: any) => {
    setCart(prev => {
      const found = prev.find((p) => p.id === prod.id);
      if (found) {
        return prev.map(p => p.id === prod.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...prod, qty: 1 }];
    });
    setCartBump(true);
    toast.showSuccess('¡Producto agregado al carrito!');
    setTimeout(() => setCartBump(false), 400);
    // // Sonido (opcional):
    // new Audio('/sounds/add-to-cart.mp3').play();
  };

  const renderProducts = (products: any[], title: string) => (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(prod => (
          <div key={prod.id} className="flex flex-col items-center bg-gray-50 rounded-lg p-6 shadow hover:shadow-lg transition">
            <img src={prod.img} alt={prod.name} className="w-16 h-16 mb-3" />
            <div className="font-semibold text-gray-900 mb-1">{prod.name}</div>
            <div className="text-xs text-gray-500 mb-2 text-center">{prod.desc}</div>
            <div className="font-bold text-blue-700 mb-2">{prod.price} puntos</div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm mb-1 animate-fly-to-cart" onClick={() => handleAddToCart(prod)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
      <button className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {/* Card de puntos */}
          <div className="bg-white rounded-lg shadow px-4 py-2 flex items-center gap-2 border border-blue-100 min-w-[110px]">
            <span className="text-yellow-500 text-xl">⭐</span>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-gray-500">Puntos</span>
              <span className="font-bold text-blue-700 text-lg">{userPoints.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <CartIcon count={cart.reduce((acc, item) => acc + item.qty, 0)} onClick={() => setCartOpen(true)} bump={cartBump} />
      </div>
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        onQtyChange={(id, qty) => setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item))}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl">{modalMsg.includes('éxito') ? '🎉' : '⚠️'}</span>
          <p className="text-lg font-semibold text-center">{modalMsg}</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setModalOpen(false)}>Cerrar</button>
        </div>
      </Modal>
      <p className="text-lg text-gray-600 mb-8">Canjea tus puntos por recompensas, insignias y funciones premium</p>

      {/* Bloque de selección de categorías */}
      {!selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-green-200 hover:border-green-400 transition-all text-left"
            onClick={() => setSelected(SHOP_CATEGORIES.REWARDS)}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-2">🏆 Recompensas</h3>
            <p className="text-green-700 text-sm">Canjea puntos por recompensas físicas y digitales</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all text-left"
            onClick={() => setSelected(SHOP_CATEGORIES.ACHIEVEMENTS)}
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">🎖️ Insignias</h3>
            <p className="text-blue-700 text-sm">Desbloquea insignias y logros especiales</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all text-left"
            onClick={() => setSelected(SHOP_CATEGORIES.PREMIUM)}
          >
            <h3 className="text-lg font-semibold text-purple-800 mb-2">⭐ Premium</h3>
            <p className="text-purple-700 text-sm">Funciones y personalización exclusivas</p>
          </button>
        </div>
      )}

      {/* Destacados de la tienda */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Destacados de la tienda</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Productos destacados de rewards */}
          <div className="flex flex-col gap-4">
            {[rewards[0], rewards[1], rewards[2]].map((item) => (
              <div key={item.id} className="flex flex-col items-center bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                <img src={item.img} alt={item.name} className="w-14 h-14 mb-2" />
                <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                <div className="text-xs text-gray-500 mb-1 text-center">{item.desc}</div>
                <div className="font-bold text-blue-700 mb-1">{item.price} puntos</div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs mt-1" onClick={() => handleAddToCart(item)}>Agregar al carrito</button>
              </div>
            ))}
          </div>
          {/* Productos destacados de achievements */}
          <div className="flex flex-col gap-4">
            {[achievements[0], achievements[1], achievements[2]].map((item) => (
              <div key={item.id} className="flex flex-col items-center bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                <img src={item.img} alt={item.name} className="w-14 h-14 mb-2" />
                <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                <div className="text-xs text-gray-500 mb-1 text-center">{item.desc}</div>
                <div className="font-bold text-blue-700 mb-1">{item.price} puntos</div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs mt-1" onClick={() => handleAddToCart(item)}>Agregar al carrito</button>
              </div>
            ))}
          </div>
          {/* Productos destacados de premium */}
          <div className="flex flex-col gap-4">
            {[premium[0], premium[1], premium[2]].map((item) => (
              <div key={item.id} className="flex flex-col items-center bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                <img src={item.img} alt={item.name} className="w-14 h-14 mb-2" />
                <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                <div className="text-xs text-gray-500 mb-1 text-center">{item.desc}</div>
                <div className="font-bold text-blue-700 mb-1">{item.price} puntos</div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs mt-1" onClick={() => handleAddToCart(item)}>Agregar al carrito</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selected === SHOP_CATEGORIES.REWARDS && renderProducts(rewards, 'Recompensas disponibles')}
      {selected === SHOP_CATEGORIES.ACHIEVEMENTS && renderProducts(achievements, 'Insignias y logros')}
      {selected === SHOP_CATEGORIES.PREMIUM && renderProducts(premium, 'Funciones premium')}
    </div>
  );
};

export default Shop; 