import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const defaultBackground = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';

const Perfil: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('todos');

  // Datos mockeados para demostración
  const mockCustomizationItems = [
    { id: 1, name: 'Marco Dorado', type: 'marco', image: 'https://via.placeholder.com/60x60/FFD700/000000?text=Marco' },
    { id: 2, name: 'Animación Fuego', type: 'animacion', image: 'https://via.placeholder.com/60x60/FF4500/FFFFFF?text=Fuego' },
    { id: 3, name: 'Fondo Espacial', type: 'fondo', image: 'https://via.placeholder.com/60x60/4B0082/FFFFFF?text=Espacio' },
    { id: 4, name: 'Efecto Holograma', type: 'efecto', image: 'https://via.placeholder.com/60x60/00FFFF/000000?text=Holo' },
  ];

  const filterTypes = [
    { id: 'todos', name: 'Todos' },
    { id: 'marco', name: 'Marcos' },
    { id: 'animacion', name: 'Animaciones' },
    { id: 'fondo', name: 'Fondos' },
    { id: 'efecto', name: 'Efectos' },
  ];

  const filteredItems = selectedFilter === 'todos' 
    ? mockCustomizationItems 
    : mockCustomizationItems.filter(item => item.type === selectedFilter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black">
      {/* Fondo superior */}
      <div className="w-full h-40 md:h-56 relative">
        <img
          src={defaultBackground}
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Avatar grande centrado, superpuesto */}
        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 flex flex-col items-center z-10">
          <img
            src={user?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg bg-white"
          />
        </div>
      </div>

      {/* Información del usuario */}
      <div className="w-full bg-black pt-20 pb-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          {user?.username || user?.firstName || 'Usuario'}
        </h2>

        {/* Sección de información básica */}
        <div className="w-full max-w-4xl px-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Equipo */}
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Equipo</h3>
              <p className="text-gray-300">{user?.team || 'Sin equipo'}</p>
            </div>

            {/* Puntos disponibles */}
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Puntos Disponibles</h3>
              <p className="text-green-400 font-bold text-xl">50,000</p>
            </div>

            {/* Filtro de personalización */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2 text-center">Personalización</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {filterTypes.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sección de contenido personalizable */}
          <div className="bg-gray-800 rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Elementos de Personalización</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-gray-700 rounded-lg p-3 text-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 mx-auto mb-2 rounded"
                  />
                  <p className="text-white text-sm">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sección de insignias y estadísticas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Insignias */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Insignias</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user?.badges?.slice(0, 6).map((badge, index) => (
                  <div key={badge._id || index} className="bg-gray-700 rounded-lg p-3 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🏆</span>
                    </div>
                    <p className="text-white text-sm">{badge.name}</p>
                    <p className="text-gray-400 text-xs">{badge.rarity}</p>
                  </div>
                )) || (
                  <>
                    <div className="bg-gray-700 rounded-lg p-3 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">🥇</span>
                      </div>
                      <p className="text-white text-sm">Primera Vulnerabilidad</p>
                      <p className="text-gray-400 text-xs">Común</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">⚡</span>
                      </div>
                      <p className="text-white text-sm">Rápido</p>
                      <p className="text-gray-400 text-xs">Raro</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">🎯</span>
                      </div>
                      <p className="text-white text-sm">Preciso</p>
                      <p className="text-gray-400 text-xs">Épico</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Puntos Totales:</span>
                  <span className="text-white font-bold">{user?.points || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Rango:</span>
                  <span className="text-white font-bold">#{user?.rank || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Insignias:</span>
                  <span className="text-white font-bold">{user?.badges?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Logros:</span>
                  <span className="text-white font-bold">{user?.achievements?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Estado MVP:</span>
                  <span className={`font-bold ${user?.isMVP ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {user?.isMVP ? 'MVP' : 'No MVP'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Gulag:</span>
                  <span className={`font-bold ${user?.isGulagParticipant ? 'text-red-400' : 'text-gray-400'}`}>
                    {user?.isGulagParticipant ? 'Participante' : 'No Participante'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil; 