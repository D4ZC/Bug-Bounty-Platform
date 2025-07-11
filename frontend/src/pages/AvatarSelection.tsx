import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Checkmark } from '@carbon/icons-react';
import apiService from '@/services/api';

interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  unlocked: boolean;
  category: 'default' | 'premium' | 'special';
}

const AvatarSelection: React.FC = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular carga de avatares
    const mockAvatars: Avatar[] = [
      // Avatares por defecto (desbloqueados)
      { id: 'default1', name: 'Hacker Clásico', imageUrl: '/avatars/hacker1.png', unlocked: true, category: 'default' },
      { id: 'default2', name: 'Ciberseguridad', imageUrl: '/avatars/security1.png', unlocked: true, category: 'default' },
      { id: 'default3', name: 'Programador', imageUrl: '/avatars/coder1.png', unlocked: true, category: 'default' },
      { id: 'default4', name: 'Analista', imageUrl: '/avatars/analyst1.png', unlocked: true, category: 'default' },
      { id: 'default5', name: 'Pentester', imageUrl: '/avatars/pentester1.png', unlocked: true, category: 'default' },
      
      // Avatares premium (bloqueados)
      { id: 'premium1', name: 'Ghost Hacker', imageUrl: '/avatars/ghost.png', unlocked: false, category: 'premium' },
      { id: 'premium2', name: 'Cyber Ninja', imageUrl: '/avatars/ninja.png', unlocked: false, category: 'premium' },
      { id: 'premium3', name: 'Digital Phantom', imageUrl: '/avatars/phantom.png', unlocked: false, category: 'premium' },
      { id: 'premium4', name: 'Shadow Walker', imageUrl: '/avatars/shadow.png', unlocked: false, category: 'premium' },
      { id: 'premium5', name: 'Stealth Master', imageUrl: '/avatars/stealth.png', unlocked: false, category: 'premium' },
      
      // Avatares especiales (bloqueados)
      { id: 'special1', name: 'Legendary Hacker', imageUrl: '/avatars/legendary.png', unlocked: false, category: 'special' },
      { id: 'special2', name: 'Cyber God', imageUrl: '/avatars/god.png', unlocked: false, category: 'special' },
      { id: 'special3', name: 'Digital Overlord', imageUrl: '/avatars/overlord.png', unlocked: false, category: 'special' },
    ];

    setAvatars(mockAvatars);
    setLoading(false);
  }, []);

  const handleAvatarSelect = (avatarId: string) => {
    const avatar = avatars.find(a => a.id === avatarId);
    if (avatar && avatar.unlocked) {
      setSelectedAvatar(avatarId);
    }
  };

  const handleSaveAvatar = async () => {
    if (!selectedAvatar) return;

    setSaving(true);
    try {
      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí iría la llamada real a la API
      // await apiService.updateAvatar(selectedAvatar);
      
      navigate('/profile-customization');
    } catch (error) {
      console.error('Error al guardar avatar:', error);
    } finally {
      setSaving(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'default': return 'from-green-500 to-green-600';
      case 'premium': return 'from-blue-500 to-purple-600';
      case 'special': return 'from-yellow-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'default': return 'Por Defecto';
      case 'premium': return 'Premium';
      case 'special': return 'Especial';
      default: return 'Otros';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-green-400 flex items-center justify-center">
        <div className="text-xl animate-pulse">Cargando avatares...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-green-400 p-8 font-mono">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/profile-customization')}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Seleccionar Avatar
          </h1>
          
          {selectedAvatar && (
            <button
              onClick={handleSaveAvatar}
              disabled={saving}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Checkmark size={20} />
              )}
              <span>{saving ? 'Guardando...' : 'Guardar'}</span>
            </button>
          )}
        </div>

        {/* Categorías de avatares */}
        {['default', 'premium', 'special'].map(category => {
          const categoryAvatars = avatars.filter(avatar => avatar.category === category);
          
          return (
            <div key={category} className="mb-8">
              <div className="flex items-center mb-4">
                <div className={`w-4 h-4 bg-gradient-to-r ${getCategoryColor(category)} rounded-full mr-3 animate-pulse`}></div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  {getCategoryName(category)}
                </h2>
                <span className="ml-4 text-sm text-gray-400">
                  ({categoryAvatars.filter(a => a.unlocked).length}/{categoryAvatars.length} desbloqueados)
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {categoryAvatars.map((avatar, index) => (
                  <div
                    key={avatar.id}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      avatar.unlocked
                        ? selectedAvatar === avatar.id
                          ? 'bg-gradient-to-br from-green-600/50 via-cyan-600/50 to-blue-600/50 border-green-400 shadow-2xl shadow-green-500/50'
                          : 'bg-gradient-to-br from-gray-800/50 via-blue-900/50 to-gray-900/50 border-green-500/30 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/25'
                        : 'bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-900/30 border-gray-600/50 opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => handleAvatarSelect(avatar.id)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Avatar Image */}
                    <div className="flex justify-center mb-3">
                      <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                        avatar.unlocked 
                          ? 'border-green-400 bg-gradient-to-br from-green-600 to-blue-600' 
                          : 'border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800'
                      }`}>
                        {avatar.unlocked ? (
                          <div className="text-2xl">👤</div> // Placeholder para imagen real
                        ) : (
                          <div className="text-2xl opacity-50">🔒</div>
                        )}
                      </div>
                    </div>
                    
                    {/* Avatar Name */}
                    <div className="text-center">
                      <h3 className={`text-sm font-bold ${
                        avatar.unlocked ? 'text-green-200' : 'text-gray-400'
                      }`}>
                        {avatar.name}
                      </h3>
                    </div>
                    
                    {/* Selection Indicator */}
                    {selectedAvatar === avatar.id && avatar.unlocked && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <Checkmark size={12} className="text-white" />
                      </div>
                    )}
                    
                    {/* Lock Icon for locked avatars */}
                    {!avatar.unlocked && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                        <div className="text-xs">🔒</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Información adicional */}
        <div className="mt-8 p-6 bg-gradient-to-br from-gray-800/50 via-green-900/50 to-blue-900/50 border-2 border-green-500/30 rounded-xl backdrop-blur-sm">
          <h3 className="text-xl font-bold text-green-300 mb-4">¿Cómo desbloquear más avatares?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-200">Avatares Premium: Compra en la tienda</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-blue-200">Avatares Especiales: Logros especiales</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-200">Eventos temporales y competiciones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelection; 