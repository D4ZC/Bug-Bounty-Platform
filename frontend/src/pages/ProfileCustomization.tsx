import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const mockFrames = [
    { id: 'frame1', name: t('Marco Verde'), image: '/frames/green.png' },
    { id: 'frame2', name: t('Marco Dorado'), image: '/frames/gold.png' },
  ];
  const mockTitles = [
    t('Cazador de Bugs'),
    t('Pentester'),
    t('MVP'),
  ];
  const mockTitlesIds = ['title_bug_hunter', 'title_pentester', 'title_mvp'];
  const mockBackgrounds = [
    { id: 'bg1', name: t('Fondo Estático'), image: '/backgrounds/static1.jpg', animated: false },
    { id: 'bg2', name: t('Fondo Animado'), image: '/backgrounds/animated1.gif', animated: true },
  ];

  const [selectedFrame, setSelectedFrame] = useState<string>('frame1');
  const [selectedTitle, setSelectedTitle] = useState<string>('title_bug_hunter');
  const [selectedBackground, setSelectedBackground] = useState<string>('bg1');
  const [activeTab, setActiveTab] = useState(0); // BASIC por defecto

  const getInitialInventory = () => {
    try {
      const inv = localStorage.getItem('user_inventory');
      return inv ? JSON.parse(inv) : { frames: [], avatars: [], titles: [], backgrounds: [], bluepoints: 0 };
    } catch {
      return { frames: [], avatars: [], titles: [], backgrounds: [], bluepoints: 0 };
    }
  };

  const [inventory, setInventory] = useState(getInitialInventory);

  // Filtrar los ítems desbloqueados
  const unlockedFrames = mockFrames.filter(f => inventory.frames.includes(f.id));
  const unlockedTitles = mockTitles.filter((t, i) => inventory.titles.includes(mockTitlesIds[i]));
  const unlockedBackgrounds = mockBackgrounds.filter(bg => inventory.backgrounds.includes(bg.id));

  // Estado para animación de confeti al desbloquear logro
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimeout = useRef<NodeJS.Timeout | null>(null);

  // Simular desbloqueo de logro (puedes conectar esto a tu lógica real)
  const handleUnlockAchievement = (id: string) => {
    setShowConfetti(true);
    if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
    confettiTimeout.current = setTimeout(() => setShowConfetti(false), 2000);
  };

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
  }, [t]);

  const handleAvatarEdit = () => {
    // Guardar en sessionStorage que se viene de editar avatar
    sessionStorage.setItem('returnToBasic', 'true');
    navigate('/avatar-selection');
  };

  // Handler para editar marco (nuevo)
  const handleFrameEdit = () => {
    sessionStorage.setItem('returnToBasic', 'true');
    navigate('/frame-selection');
  };

  // Handler para editar título
  const handleTitleEdit = () => {
    sessionStorage.setItem('returnToBasic', 'true');
    navigate('/title-selection');
  };
  // Handler para editar fondo
  const handleBackgroundEdit = () => {
    sessionStorage.setItem('returnToBasic', 'true');
    navigate('/background-selection');
  };

  // Al montar, si se viene de seleccionar avatar, regresar a BASIC
  useEffect(() => {
    if (sessionStorage.getItem('returnToBasic')) {
      setActiveTab(0);
      sessionStorage.removeItem('returnToBasic');
    }
  }, []);

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

  const tabLabels = [
    // t('LEVEL UNLOCK'),
    t('BASIC'),
    t('ACHIEVEMENTS'),
    t('COLLECTION'),
    // t('HISTORY'),
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-mono">
      {/* Sidebar */}
      <aside className="w-64 bg-black/90 border-r-2 border-gray-700 flex flex-col p-4">
        {tabLabels.map((label, idx) => (
          <button
            key={label}
            className={`mb-2 py-3 px-4 text-lg font-bold rounded-lg text-left transition-all ${
              activeTab === idx
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {label}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* BASIC TAB: Tarjeta de vista principal */}
        {activeTab === 0 && (
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-cyan-900 via-gray-900 to-black rounded-2xl p-10 border-4 border-cyan-500/40 shadow-2xl flex flex-col items-center w-full max-w-2xl relative overflow-hidden animate-fade-in">
              {/* Partículas SVG animadas */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.18 }}>
                <circle cx="80" cy="80" r="60" fill="#00fff7" opacity="0.12">
                  <animate attributeName="r" values="60;80;60" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="300" cy="120" r="40" fill="#FFD700" opacity="0.10">
                  <animate attributeName="r" values="40;60;40" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="200" r="30" fill="#ff00cc" opacity="0.10">
                  <animate attributeName="r" values="30;50;30" dur="6s" repeatCount="indefinite" />
                </circle>
              </svg>
              {/* Eliminado: showConfetti y animación de confeti */}
              {/* Glow y partículas decorativas */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl animate-pulse z-0" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl animate-pulse z-0" />
              <div
                className="relative cursor-pointer group mb-4 z-10"
                onClick={handleAvatarEdit}
                title={t('Seleccionar Avatar')}
              >
                <img
                  src={profile.avatar || '/default-avatar.png'}
                  alt="Avatar"
                  className="w-40 h-40 object-cover rounded-2xl border-4 border-cyan-400 shadow-2xl transition-all duration-200 group-hover:scale-105 group-hover:border-yellow-400 animate-glow"
                  style={{ aspectRatio: '1 / 1', boxShadow: '0 0 32px 0 #00fff7, 0 0 0 4px #222' }}
                />
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-lg shadow-lg animate-bounce">{t('Editar')}</div>
              </div>
              <div className="text-3xl font-extrabold text-cyan-200 mb-1 drop-shadow-lg tracking-wide flex items-center gap-2">
                {customUsername}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-1 rounded-lg text-xs font-bold ml-2 shadow">{t('PRO')}</span>
              </div>
              <div className="text-cyan-400 text-lg mb-2 font-semibold tracking-wide">{customTitle}</div>
              <div className="flex gap-2 mb-2">
                <span className="bg-gray-800/80 px-2 py-1 rounded text-xs border border-cyan-500/30 shadow">UID: {profile._id}</span>
                <span className="bg-gray-800/80 px-2 py-1 rounded text-xs border border-cyan-500/30 shadow">{t('Puntos')}: <span className="text-yellow-300 font-bold">{profile.points}</span></span>
                <span className="bg-gray-800/80 px-2 py-1 rounded text-xs border border-cyan-500/30 shadow">{t('Ranking')}: <span className="text-cyan-300 font-bold">#{profile.rank}</span></span>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-6 w-full">
                <div className="bg-gradient-to-br from-cyan-800/80 to-cyan-400/20 rounded-xl p-6 border-2 border-cyan-400/40 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300 animate-pop-in">
                  <div className="text-xs text-cyan-200 mb-1 tracking-wider">{t('Tarjeta de Juego')}</div>
                  <span className="text-2xl font-bold text-cyan-100">{profile.rank}</span>
                </div>
                <div className="bg-gradient-to-br from-yellow-700/80 to-yellow-400/20 rounded-xl p-6 border-2 border-yellow-400/40 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300 animate-pop-in">
                  <div className="text-xs text-yellow-200 mb-1 tracking-wider">{t('Me gusta')}</div>
                  <span className="text-2xl font-bold text-yellow-100">1226</span>
                </div>
                <div className="bg-gradient-to-br from-pink-800/80 to-pink-400/20 rounded-xl p-6 border-2 border-pink-400/40 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300 animate-pop-in">
                  <div className="text-xs text-pink-200 mb-1 tracking-wider">{t('Tasa de MVP')}</div>
                  <span className="text-2xl font-bold text-pink-100">-</span>
                </div>
              </div>
              {/* Botón para editar marco */}
              <button onClick={handleFrameEdit} className="ml-2 px-2 py-1 bg-cyan-700 text-white rounded text-xs hover:bg-cyan-500 transition">{t('Editar Marco')}</button>
              <button onClick={handleTitleEdit} className="ml-2 px-2 py-1 bg-cyan-700 text-white rounded text-xs hover:bg-cyan-500 transition">{t('Editar Título')}</button>
              <button onClick={handleBackgroundEdit} className="ml-2 px-2 py-1 bg-cyan-700 text-white rounded text-xs hover:bg-cyan-500 transition">{t('Editar Fondo')}</button>
            </div>
          </div>
        )}
        {/* ACHIEVEMENTS TAB: Solo logros */}
        {activeTab === 1 && (
          <div className="flex flex-wrap gap-6 justify-center animate-fade-in-up">
            {achievements.map(ach => (
              <div
                key={ach.id}
                className={`p-6 rounded-2xl border-2 shadow-xl flex flex-col items-center min-w-[160px] max-w-xs relative ${ach.unlocked ? 'bg-gradient-to-br from-green-600/40 via-blue-600/30 to-cyan-600/30 border-green-400/60 animate-glow' : 'bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-900/30 border-gray-600/50 opacity-50'}`}
                onClick={() => ach.unlocked && handleUnlockAchievement(ach.id)}
                style={{ cursor: ach.unlocked ? 'pointer' : 'default' }}
                title={ach.description}
              >
                <div className="text-4xl mb-2 drop-shadow-lg">{ach.icon}</div>
                <div className="font-bold text-base text-cyan-100 mb-1 text-center">{ach.name}</div>
                <div className="text-xs mt-1 text-cyan-200 text-center">{ach.description}</div>
                {ach.unlocked && <span className="mt-2 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded shadow animate-bounce">{t('Desbloqueado')}</span>}
              </div>
            ))}
          </div>
        )}
        {/* COLLECTION TAB: Inventario visual */}
        {activeTab === 2 && (
          <div className="flex flex-col gap-8 items-center animate-fade-in-up">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-200 tracking-wide">{t('Marcos')}</h3>
              <div className="flex gap-6 flex-wrap justify-center">
                {mockFrames.map(frame => (
                  <div
                    key={frame.id}
                    className="flex flex-col items-center bg-gray-900/80 rounded-xl p-4 border-2 border-cyan-700 shadow hover:scale-110 transition-transform duration-200 animate-pop-in"
                    title={frame.name}
                  >
                    <img src={frame.image} alt={frame.name} className="w-16 h-16 object-contain border-2 rounded-lg mb-2" />
                    <span className="text-xs text-cyan-200 font-bold">{frame.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-200 tracking-wide">{t('Títulos')}</h3>
              <div className="flex gap-6 flex-wrap justify-center">
                {mockTitles.map((title, i) => (
                  <div key={mockTitlesIds[i]} className="px-4 py-2 bg-gradient-to-r from-cyan-700 to-cyan-400 rounded-lg border-2 border-cyan-700 text-white font-bold text-base shadow hover:scale-105 transition-transform duration-200">
                    {title}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-200 tracking-wide">{t('Fondos')}</h3>
              <div className="flex gap-6 flex-wrap justify-center">
                {mockBackgrounds.map(bg => (
                  <div key={bg.id} className="flex flex-col items-center bg-gray-900/80 rounded-xl p-4 border-2 border-cyan-700 shadow hover:scale-105 transition-transform duration-200">
                    <img src={bg.image} alt={bg.name} className="w-24 h-14 object-cover rounded-lg mb-2" />
                    <span className="text-xs text-cyan-200 font-bold">{bg.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfileCustomization; 