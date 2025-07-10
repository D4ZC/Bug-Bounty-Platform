import React from 'react';

const Shop: React.FC = () => {
  const products = [
    { id: 1, name: 'Insignia de Oro', price: 100, type: 'blue-points', description: 'Insignia exclusiva para mostrar tu estatus' },
    { id: 2, name: 'Título "Hacker Elite"', price: 200, type: 'blue-points', description: 'Título especial para tu perfil' },
    { id: 3, name: 'Acceso VIP', price: 500, type: 'blue-points', description: 'Acceso a contenido exclusivo' },
    { id: 4, name: 'Multiplicador de Puntos x2', price: 150, type: 'points', description: 'Duplica tus puntos por 24 horas' },
  ];

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-semibold mb-6">Tienda</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">
                {product.price} {product.type === 'blue-points' ? 'BP' : 'Puntos'}
              </span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop; 