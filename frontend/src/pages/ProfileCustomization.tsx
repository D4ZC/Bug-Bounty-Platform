import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@carbon/react';
import { UserAvatar, Trophy, Star, Edit, Home, Security, Code, ShoppingCart, UserMultiple, User, Group, Trophy as Award } from '@carbon/icons-react';
import apiService from '@/services/api';
import { useTranslation } from 'react-i18next';

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  achievements: string[];
  points: number;
  rank: number;
  title?: string;
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

const ProfileCustomization: React.FC = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [editingTitle, setEditingTitle] = useState(false);
  const [customTitle, setCustomTitle] = useState(() => localStorage.getItem('profile_custom_title') || t('Sin título'));
  const [titleInput, setTitleInput] = useState(customTitle);
  const [editingUsername, setEditingUsername] = useState(false);
  const [customUsername, setCustomUsername] = useState(() => localStorage.getItem('profile_custom_username') || 'D4ZC');
  const [usernameInput, setUsernameInput] = useState(customUsername);

  useEffect(() => {
    // Cargar datos del perfil (simulado por ahora)
    const mockProfile: UserProfile = {
      _id: 'USER123456',
      username: localStorage.getItem('profile_custom_username') || 'D4ZC',
      email: 'd4zc@example.com',
      avatar: undefined,
      achievements: ['first_vulnerability', 'top_10_ranking', 'mvp_winner'],
      points: 2500,
      rank: 1,
      title: localStorage.getItem('profile_custom_title') || t('Sin título'),
    };

    const mockAchievements: Achievement[] = [
      { id: 'first_vulnerability', name: t('Primera Vulnerabilidad'), icon: '🏅', description: t('Encontró su primera vulnerabilidad'), unlocked: true },
      { id: 'top_10_ranking', name: t('Top 10'), icon: '🥇', description: t('Llegó al top 10 del ranking'), unlocked: true },
      { id: 'mvp_winner', name: t('MVP'), icon: '🏆', description: t('Ganó el título de MVP'), unlocked: true },
      { id: 'gulag_survivor', name: t('Sobreviviente del Gulag'), icon: '⚔️', description: t('Sobrevivió al evento Gulag'), unlocked: false },
      { id: 'team_captain', name: t('Capitán de Equipo'), icon: '👑', description: t('Lideró un equipo exitoso'), unlocked: false },
      { id: 'bug_hunter', name: t('Cazador de Bugs'), icon: '🐛', description: t('Encontró 50 vulnerabilidades'), unlocked: false }
    ];

    setProfile(mockProfile);
    setAchievements(mockAchievements);
    setLoading(false);
  }, []);

  const handleAvatarEdit = () => {
    navigate('/avatar-selection');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-app text-app flex items-center justify-center">
        <div className="text-xl animate-pulse">{t('Cargando perfil...')}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-app text-app flex items-center justify-center">
        <div className="text-xl">{t('Error al cargar el perfil')}</div>
      </div>
    );
  }

  const handleSaveTitle = () => {
    setCustomTitle(titleInput);
    localStorage.setItem('profile_custom_title', titleInput);
    setEditingTitle(false);
    setProfile({ ...profile, title: titleInput });
  };
  const handleSaveUsername = () => {
    setCustomUsername(usernameInput);
    localStorage.setItem('profile_custom_username', usernameInput);
    setEditingUsername(false);
    setProfile({ ...profile, username: usernameInput });
  };

  return (
    <div className="min-h-screen bg-app text-app p-8 font-mono">
      {/* Navbar horizontal eliminada */}

      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center tracking-widest bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
          {t('Personalización de Perfil')}
        </h1>
        
        {/* Información del perfil */}
        <div className="bg-card border-2 border-card rounded-xl shadow-2xl p-8 mb-8 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            {/* Avatar con icono de edición */}
            <div className="mb-6 relative group">
              <div className="relative">
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt="Avatar" 
                    className="w-32 h-32 rounded-full border-4 border-green-500 shadow-2xl animate-pulse"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-green-500 shadow-2xl bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center animate-pulse">
                    <UserAvatar size={64} className="text-white" />
                  </div>
                )}
                
                {/* Icono de lápiz en la esquina inferior derecha */}
                <button
                  onClick={handleAvatarEdit}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 group-hover:opacity-100 opacity-80"
                >
                  <Edit size={16} className="text-white" />
                </button>
              </div>
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-pulse"></div>
            </div>

            {/* Nombre y ID */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                {editingUsername ? (
                  <>
                    <input
                      className="bg-black border-2 border-cyan-700 rounded-lg px-2 py-1 text-cyan-300 text-3xl font-bold w-48 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      value={usernameInput}
                      onChange={e => setUsernameInput(e.target.value)}
                      autoFocus
                    />
                    <button onClick={handleSaveUsername} className="ml-2 px-2 py-1 border-2 border-green-700 rounded-lg text-green-400 hover:bg-green-900/20 font-bold">{t('Guardar')}</button>
                    <button onClick={() => { setEditingUsername(false); setUsernameInput(customUsername); }} className="ml-1 px-2 py-1 border-2 border-red-700 rounded-lg text-red-400 hover:bg-red-900/20 font-bold">{t('Cancelar')}</button>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2 animate-pulse">{customUsername}</h2>
                    <button onClick={() => setEditingUsername(true)} className="ml-2 px-2 py-1 border-2 border-cyan-700 rounded-lg text-cyan-400 hover:bg-cyan-900/20 font-bold text-base">{t('Editar')}</button>
                  </>
                )}
              </div>
              {/* Custom title editable */}
              <div className="flex items-center justify-center mb-2">
                {editingTitle ? (
                  <>
                    <input
                      className="bg-black border-2 border-cyan-700 rounded-lg px-2 py-1 text-cyan-300 text-lg font-bold w-48 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      value={titleInput}
                      onChange={e => setTitleInput(e.target.value)}
                      autoFocus
                    />
                    <button onClick={handleSaveTitle} className="ml-2 px-2 py-1 border-2 border-green-700 rounded-lg text-green-400 hover:bg-green-900/20 font-bold">{t('Guardar')}</button>
                    <button onClick={() => { setEditingTitle(false); setTitleInput(customTitle); }} className="ml-1 px-2 py-1 border-2 border-red-700 rounded-lg text-red-400 hover:bg-red-900/20 font-bold">{t('Cancelar')}</button>
                  </>
                ) : (
                  <>
                    <span className="text-cyan-300 text-lg font-semibold">{customTitle}</span>
                    <button onClick={() => setEditingTitle(true)} className="ml-2 px-2 py-1 border-2 border-cyan-700 rounded-lg text-cyan-400 hover:bg-cyan-900/20 font-bold text-base">{t('Editar')}</button>
                  </>
                )}
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-300 text-sm">{t('ID')}:</span>
                <span className="text-cyan-300 font-mono text-sm bg-gradient-to-r from-gray-800/50 to-blue-800/50 px-3 py-1 rounded-lg border border-green-500/50 backdrop-blur-sm">
                  {profile._id}
                </span>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="flex space-x-8 mb-6">
              <div className="text-center bg-gradient-to-br from-green-800/30 to-green-600/30 p-4 rounded-lg border border-green-500/30 backdrop-blur-sm">
                <div className="text-2xl font-bold text-green-300">{profile.points}</div>
                <div className="text-sm text-green-200">{t('Puntos')}</div>
              </div>
              <div className="text-center bg-gradient-to-br from-blue-800/30 to-blue-600/30 p-4 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                <div className="text-2xl font-bold text-blue-300">#{profile.rank}</div>
                <div className="text-sm text-blue-200">{t('Ranking')}</div>
              </div>
              <div className="text-center bg-gradient-to-br from-cyan-800/30 to-cyan-600/30 p-4 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
                <div className="text-2xl font-bold text-cyan-300">{profile.achievements.length}</div>
                <div className="text-sm text-cyan-200">{t('Logros')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Logros */}
        <div className="bg-card border-2 border-card rounded-xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="flex items-center mb-6">
            <Trophy size={32} className="text-green-400 mr-3 animate-bounce" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              {t('Logros Obtenidos')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-green-600/30 via-blue-600/30 to-cyan-600/30 border-green-400/50 hover:border-green-300 shadow-lg hover:shadow-green-500/25' 
                    : 'bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-900/30 border-gray-600/50 opacity-50 hover:opacity-70'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl ${achievement.unlocked ? 'opacity-100 animate-pulse' : 'opacity-30'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-sm ${achievement.unlocked ? 'text-green-200' : 'text-gray-400'}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-xs mt-1 ${achievement.unlocked ? 'text-green-100' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <div className="text-green-400 animate-pulse">
                      <Star size={16} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de logros */}
          <div className="mt-6 p-4 bg-card rounded-lg border-2 border-card backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-green-200">{t('Progreso de Logros')}:</span>
              <span className="text-green-100 font-bold">
                {achievements.filter(a => a.unlocked).length} / {achievements.length}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
              <div 
                className="bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500 animate-pulse"
                style={{ 
                  width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCustomization; 