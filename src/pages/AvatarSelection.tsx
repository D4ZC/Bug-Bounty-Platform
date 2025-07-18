import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  unlocked: boolean;
  category: 'default' | 'premium' | 'special';
}

// Mover funciones auxiliares dentro del componente para acceso a t
type CategoryType = 'default' | 'premium' | 'special';

const AvatarSelection: React.FC = () => {
  const { t } = useTranslation();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimeout = useRef<NodeJS.Timeout | null>(null);

  // NUEVO: estados para búsqueda y filtros
  const [search, setSearch] = useState('');
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'default' | 'premium' | 'special'>('all');

  useEffect(() => {
    // Avatares con rutas relativas a public/avatars
    const mockAvatars: Avatar[] = [
      { id: 'Hacker_Básico', name: 'Hacker Básico', imageUrl: '/avatars/Hacker_Básico.png', unlocked: true, category: 'default' },
      { id: 'Ciberseguridad', name: 'Ciberseguridad', imageUrl: '/avatars/Ciberseguridad.png', unlocked: true, category: 'default' },
      { id: 'Programador', name: 'Programador', imageUrl: '/avatars/Programador.png', unlocked: true, category: 'default' },
      { id: 'Analista', name: 'Analista', imageUrl: '/avatars/Analista.png', unlocked: true, category: 'default' },
      { id: 'Pantester', name: 'Pantester', imageUrl: '/avatars/Pantester.png', unlocked: true, category: 'default' },

      { id: 'Ghost_Hacker', name: 'Ghost Hacker', imageUrl: '/avatars/Ghost_Hacker.png', unlocked: false, category: 'premium' },
      { id: 'Cyber_Ninja', name: 'Cyber Ninja', imageUrl: '/avatars/Cyber_Ninja.png', unlocked: false, category: 'premium' },
      { id: 'Digital_Phantom', name: 'Digital Phantom', imageUrl: '/avatars/Digital_Phantom.png', unlocked: false, category: 'premium' },
      { id: 'Stealth_Master', name: 'Stealth Master', imageUrl: '/avatars/Stealth_Master.png', unlocked: false, category: 'premium' },

      { id: 'Legendary_Hacker', name: 'Legendary Hacker', imageUrl: '/avatars/Legendary_Hacker.png', unlocked: false, category: 'special' },
      { id: 'Cyber_God', name: 'Cyber God', imageUrl: '/avatars/Cyber_God.png', unlocked: false, category: 'special' },
      { id: 'Digital_Overlord', name: 'Digital Overlord', imageUrl: '/avatars/Digital_Overlord.png', unlocked: false, category: 'special' },
    ];
    setAvatars(mockAvatars);
    setLoading(false);
  }, [t]);

  // NUEVO: lógica de filtrado
  const filteredAvatars = avatars.filter(avatar => {
    const matchesSearch = avatar.name.toLowerCase().includes(search.toLowerCase());
    const matchesUnlocked = showOnlyUnlocked ? avatar.unlocked : true;
    const matchesCategory = categoryFilter === 'all' ? true : avatar.category === categoryFilter;
    return matchesSearch && matchesUnlocked && matchesCategory;
  });

  // Funciones auxiliares dentro del componente para acceso a t
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

  if (loading) {
    return (
      <div className="min-h-screen bg-app text-app flex items-center justify-center">
        <div className="text-xl animate-pulse">{t('Cargando avatares...')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono relative overflow-hidden">
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
          onChange={e => setCategoryFilter(e.target.value as CategoryType | 'all')}
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
              <div className={`w-4 h-4 bg-gradient-to-r ${getCategoryColor(category)} rounded-full mr-3 animate-pulse`