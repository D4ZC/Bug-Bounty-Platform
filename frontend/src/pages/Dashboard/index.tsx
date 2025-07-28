import React, { useState, useRef } from 'react';
import TeamsScoreCard from './components/TeamsScoreCard';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import UserScoreCard from './components/UserScoreCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { useAuth } from '../../contexts/AuthContext';
import { Image, BorderFull, PaintBrush, ShoppingCart, Star, ChartLine } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

const storePreview = [
  {
    icon: <Image size={24} className="text-blue-400" />,
    title: 'Tema Cyberpunk',
    price: 180,
    category: 'Temas',
    description: 'Colores neón y estilo futurista',
    popular: true
  },
  {
    icon: <BorderFull size={24} className="text-green-400" />,
    title: 'Marco Challenger',
    price: 200,
    category: 'Marcos',
    description: 'Marco dorado con estilo de campeón',
    popular: false
  },
  {
    icon: <PaintBrush size={24} className="text-purple-400" />,
    title: 'Dark Souls',
    price: 160,
    category: 'Temas',
    description: 'Inspirado en la saga de caballeros',
    popular: true
  },
];

const teams = [
  { name: 'Warriors of Sunlight', score: 2000 },
  { name: 'Darkwraiths', score: 1900 },
  { name: 'Blades of the Darkmoon', score: 1500 },
  { name: 'Way of Blue', score: 1400 },
  { name: 'Blue Sentinels', score: 1300 },
  { name: 'Aldrich Faithful', score: 1200 },
  { name: 'Watchdogs of Farron', score: 1100 },
  { name: 'Rosaria\'s Fingers', score: 1000 },
];
const users = [
  { name: 'Solaire of Astora', score: 2100 },
  { name: 'Siegmeyer of Catarina', score: 1800 },
  { name: 'Knight Lautrec', score: 1700 },
  { name: 'Big Hat Logan', score: 1600 },
  { name: 'Oscar of Astora', score: 1500 },
  { name: 'Patches', score: 1400 },
  { name: 'Gwynevere', score: 1300 },
  { name: 'Gwyndolin', score: 1200 },
  { name: 'Andre of Astora', score: 1150 },
  { name: 'Shiva of the East', score: 1100 },
  { name: 'Domhnall of Zena', score: 1050 },
  { name: 'Laurentius', score: 1000 },
  { name: 'Quelaag\'s Sister', score: 950 },
  { name: 'Havel the Rock', score: 900 },
  { name: 'Chester', score: 850 },
  { name: 'Crestfallen Warrior', score: 800 },
  { name: 'Vince of Thorolund', score: 750 },
  { name: 'Griggs of Vinheim', score: 700 },
];
const mvpTeam = 'Warriors of Sunlight';
const mvpUser = { name: 'Solaire of Astora', img: '', stats: { criticas: 12, altas: 22, medianas: 35, bajas: 10, total: 79 } };
const gulag = [
  { name: 'Chester', score: 850, img: '', stats: { criticas: 2, altas: 4, medianas: 3, bajas: 1, total: 10 } },
  { name: 'Crestfallen Warrior', score: 800, img: '', stats: { criticas: 1, altas: 2, medianas: 4, bajas: 2, total: 9 } },
  { name: 'Vince of Thorolund', score: 750, img: '', stats: { criticas: 0, altas: 1, medianas: 2, bajas: 3, total: 6 } },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showStorePreview, setShowStorePreview] = useState(false);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const handleEnter = () => {
    timerRef.current = window.setTimeout(() => setShowStorePreview(true), 300);
  };
  const handleLeave = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setShowStorePreview(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Primera fila */}
        <TeamsScoreCard teams={teams.slice(0, 5)} />
        <MVPTeamCard team={mvpTeam} />
        <GulagCard gulag={gulag} />
        {/* Segunda fila */}
        <UserScoreCard users={users.slice(0, 5)} />
        <MVPUserCard user={mvpUser} />
        {user ? (
          <UserProfileCard
            user={{
              name: user.username,
              img: user.avatar || '',
              stats: {
                criticas: 12,
                altas: 22,
                medianas: 35,
                bajas: 10,
                total: 79,
              },
            }}
            darkSoulsStyle
            showRadarChart={false}
          />
        ) : (
          <UserProfileCard user={mvpUser} darkSoulsStyle showRadarChart={false} />
        )}
      </div>
      {/* Botón de tienda con preview mejorado */}
      <div className="flex justify-center items-center mt-10">
        <div
          className="w-full md:w-2/3 lg:w-1/2 bg-gradient-to-br from-gray-800/80 to-purple-900/80 border-2 border-purple-500 rounded-xl shadow-2xl flex justify-center py-12 relative cursor-pointer hover:from-gray-700 hover:to-purple-800 transition-all group"
          onClick={() => navigate('/store')}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onFocus={handleEnter}
          onBlur={handleLeave}
          tabIndex={0}
          role="button"
          aria-label="Ir a la tienda"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart size={24} className="text-white" />
            <span className="text-lg font-semibold text-white select-none">Visit Store</span>
          </div>
          
          {showStorePreview && (
            <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-full z-20 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-purple-500 rounded-xl shadow-2xl animate-fade-in min-w-[480px] p-6">
              {/* Header del preview */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">🏪 Tienda</h3>
                <div className="flex items-center gap-2">
                  <ChartLine size={16} className="text-green-400" />
                  <span className="text-sm text-green-400 font-semibold">+2 nuevos items</span>
                </div>
              </div>
              
              {/* Productos destacados */}
              <div className="grid grid-cols-1 gap-3 mb-4">
                {storePreview.map((product, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg border border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
                        {product.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">{product.title}</h4>
                          {product.popular && (
                            <Star size={12} className="text-yellow-400" />
                          )}
                        </div>
                        <p className="text-xs text-gray-300">{product.description}</p>
                        <span className="text-xs text-purple-300">{product.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-400">{product.price}</div>
                      <div className="text-xs text-gray-400">puntos</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer con estadísticas */}
              <div className="flex items-center justify-between pt-3 border-t border-purple-500/30">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-300">🎨 <span className="text-white font-semibold">4</span> Temas</span>
                  <span className="text-gray-300">🖼️ <span className="text-white font-semibold">1</span> Marco</span>
                </div>
                <button 
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/store');
                  }}
                >
                  Ver Todo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 