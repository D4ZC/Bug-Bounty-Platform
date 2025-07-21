import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaShoppingCart } from 'react-icons/fa';
import ProfileCustomizationTabs from '../components/ProfileCustomizationTabs';

interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  unlocked: boolean;
  category: 'default' | 'premium' | 'special';
}

type CategoryType = 'default' | 'premium' | 'special';

function AvatarSelection() {
  const { t } = useTranslation();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const confettiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [search, setSearch] = useState('');
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | CategoryType>('all');

  useEffect(() => {
    let userInventory: { avatars: string[] } = { avatars: [] };
    try {
      const inv = localStorage.getItem('user_inventory');
      if (inv) userInventory = JSON.parse(inv);
    } catch {}
    const mockAvatars: Avatar[] = [
      { id: 'Hacker_Básico', name: 'Hacker Básico', imageUrl: '/avatars/Hacker_Básico.png', unlocked: true, category: 'default' },
      { id: 'Ciberseguridad', name: 'Ciberseguridad', imageUrl: '/avatars/Ciberseguridad.png', unlocked: true, category: 'default' },
      { id: 'Programador', name: 'Programador', imageUrl: '/avatars/Programador.png', unlocked: true, category: 'default' },
      { id: 'Analista', name: 'Analista', imageUrl: '/avatars/Analista.png', unlocked: true, category: 'default' },
      { id: 'Pantester', name: 'Pantester', imageUrl: '/avatars/Pantester.png', unlocked: true, category: 'default' },
      { id: 'Ghost_Hacker', name: 'Ghost Hacker', imageUrl: '/avatars/Ghost_Hacker.png', unlocked: userInventory.avatars.includes('Ghost_Hacker'), category: 'premium' },
      { id: 'Cyber_Ninja', name: 'Cyber Ninja', imageUrl: '/avatars/Cyber_Ninja.png', unlocked: userInventory.avatars.includes('Cyber_Ninja'), category: 'premium' },
      { id: 'Digital_Phantom', name: 'Digital Phantom', imageUrl: '/avatars/Digital_Phantom.png', unlocked: userInventory.avatars.includes('Digital_Phantom'), category: 'premium' },
      { id: 'Stealth_Master', name: 'Stealth Master', imageUrl: '/avatars/Stealth_Master.png', unlocked: userInventory.avatars.includes('Stealth_Master'), category: 'premium' },
      { id: 'Legendary_Hacker', name: 'Legendary Hacker', imageUrl: '/avatars/Legendary_Hacker.png', unlocked: userInventory.avatars.includes('Legendary_Hacker'), category: 'special' },
      { id: 'Cyber_God', name: 'Cyber God', imageUrl: '/avatars/Cyber_God.png', unlocked: userInventory.avatars.includes('Cyber_God'), category: 'special' },
      { id: 'Digital_Overlord', name: 'Digital Overlord', imageUrl: '/avatars/Digital_Overlord.png', unlocked: userInventory.avatars.includes('Digital_Overlord'), category: 'special' },
    ];
    setAvatars(mockAvatars);
    setLoading(false);
  }, [t]);

  const filteredAvatars = avatars.filter(avatar => {
    const matchesSearch = avatar.name.toLowerCase().includes(search.toLowerCase());
    const matchesUnlocked = showOnlyUnlocked ? avatar.unlocked : true;
    const matchesCategory = categoryFilter === 'all' ? true : avatar.category === categoryFilter;
    return matchesSearch && matchesUnlocked && matchesCategory;
  });

  const getCategoryColor = (category: CategoryType) => {
    switch (category) {
      case 'default':
        return 'from-blue-500 to-purple-500';
      case 'premium':
        return 'from-green-500 to-teal-500';
      case 'special':
        return 'from-red-500 to-orange-500';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getCategoryName = (category: CategoryType) => {
    switch (category) {
      case 'default':
        return t('Por Defecto');
      case 'premium':
        return t('Premium');
      case 'special':
        return t('Especial');
      default:
        return t('Desconocido');
    }
  };

  const handleAvatarSelect = (avatarId: string) => {
    const avatar = avatars.find(a => a.id === avatarId);
    if (avatar && avatar.unlocked) {
      setSelectedAvatar(avatarId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-app text-app flex items-center justify-center">
        <div className="text-xl animate-pulse">{t('Cargando avatares...')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono relative overflow-hidden">
      <ProfileCustomizationTabs />
      {/* Barra de búsqueda y filtros */}
      <div className="w-full max-w-6xl mx-auto mb-8 flex flex-col md:flex-row items-center gap-4 z-20 relative">
        <input
          type="text"
          placeholder={t('Buscar avatar...')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border-2 border-cyan-400 bg-gray-900 text-white focus:outline-none focus:border-yellow-400 w-full md:w-72 shadow"
        />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyUnlocked}
            onChange={e => setShowOnlyUnlocked(e.target.checked)}
            className="accent-cyan-500"
          />
          <span className="text-cyan-200 text-sm">{t('Solo desbloqueados')}</span>
        </label>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value as CategoryType)}
          className="px-3 py-2 rounded-lg border-2 border-cyan-400 bg-gray-900 text-white focus:outline-none focus:border-yellow-400 text-sm shadow"
        >
          <option value="all">{t('Todas las categorías')}</option>
          <option value="default">{t('Por Defecto')}</option>
          <option value="premium">{t('Premium')}</option>
          <option value="special">{t('Especial')}</option>
        </select>
      </div>
      {/* Categorías visuales */}
      {(['default', 'premium', 'special'] as CategoryType[]).map(category => {
        const categoryAvatars = filteredAvatars.filter(avatar => avatar.category === category);
        if (categoryAvatars.length === 0) return null;
        return (
          <div key={category} className="mb-8">
            <div className="flex items-center mb-4">
              <div className={`w-4 h-4 bg-gradient-to-r ${getCategoryColor(category)} rounded-full mr-3 animate-pulse`} />
              <span className="font-bold text-lg">{getCategoryName(category)}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {categoryAvatars.map(avatar => (
                <div
                  key={avatar.id}
                  className={`relative flex flex-col items-center p-4 rounded-xl shadow-lg transition-all duration-200 ${avatar.unlocked ? 'bg-gradient-to-br from-cyan-900 to-cyan-700' : 'bg-gradient-to-br from-gray-800 to-gray-700 opacity-60'}`}
                  onClick={() => {
                    if (avatar.unlocked) {
                      handleAvatarSelect(avatar.id);
                    } else {
                      alert('Debes comprar este avatar en la tienda para seleccionarlo.');
                    }
                  }}
                >
                  <img src={avatar.imageUrl} alt={avatar.name} className="w-20 h-20 mb-2 rounded-full border-4 border-cyan-400" />
                  <span className="font-bold text-white mb-1 text-center">{avatar.name}</span>
                  {!avatar.unlocked && (
                    <>
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">{t('Bloqueado')}</span>
                      <div className="relative w-full flex justify-center">
                        <button
                          className="mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg font-bold flex items-center gap-2 animate-pulse shadow-lg border-2 border-yellow-300 transition-all duration-200"
                          style={{ fontSize: '1rem' }}
                          onClick={e => { e.stopPropagation(); window.location.href = '/shop'; }}
                          onMouseOver={e => {
                            const tooltip = document.createElement('div');
                            tooltip.innerText = 'Este avatar solo se puede obtener en la tienda.';
                            tooltip.className = 'absolute z-50 left-1/2 -translate-x-1/2 -top-10 bg-black text-white text-xs rounded px-2 py-1 shadow-lg';
                            tooltip.id = `tooltip-${avatar.id}`;
                            e.currentTarget.parentElement?.appendChild(tooltip);
                          }}
                          onMouseOut={e => {
                            const tooltip = document.getElementById(`tooltip-${avatar.id}`);
                            if (tooltip) tooltip.remove();
                          }}
                        >
                          <FaShoppingCart />
                          ¡Desbloquéalo en la tienda!
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AvatarSelection;