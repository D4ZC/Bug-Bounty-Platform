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

  // Leer selección personalizada de localStorage
  const [customAvatar, setCustomAvatar] = useState(() => localStorage.getItem('profile_custom_avatar'));
  const [customFrame, setCustomFrame] = useState(() => localStorage.getItem('profile_custom_frame'));
  const [customBg, setCustomBg] = useState(() => localStorage.getItem('profile_custom_background'));

  // Actualizar preview en tiempo real al volver de selección
  useEffect(() => {
    const onStorage = () => {
      setCustomAvatar(localStorage.getItem('profile_custom_avatar'));
      setCustomFrame(localStorage.getItem('profile_custom_frame'));
      setCustomBg(localStorage.getItem('profile_custom_background'));
      setCustomTitle(localStorage.getItem('profile_custom_title') || t('Sin título'));
    };
    window.addEventListener('storage', onStorage);
    onStorage();
    return () => window.removeEventListener('storage', onStorage);
  }, [t]);

  // Obtener datos visuales de avatar, marco y fondo
  const avatarObj = (() => {
    // Mapeo de IDs a imágenes reales de avatares (de la carpeta Avatars)
    const map: Record<string, string> = {
      Analista: '/avatars/Analista.png',
      Ciberseguridad: '/avatars/Ciberseguridad.png',
      Cyber_God: '/avatars/Cyber_God.png',
      Cyber_Ninja: '/avatars/Cyber_Ninja.png',
      Digital_Overlord: '/avatars/Digital_Overlord.png',
      Digital_Phantom: '/avatars/Digital_Phantom.png',
      Ghost_Hacker: '/avatars/Ghost_Hacker.png',
      Hacker_Básico: '/avatars/Hacker_Básico.png',
      Legendary_Hacker: '/avatars/Legendary_Hacker.png',
      Pantester: '/avatars/Pantester.png',
      Programador: '/avatars/Programador.png',
      Stealth_Master: '/avatars/Stealth_Master.png',
      // Puedes agregar más avatares aquí siguiendo el mismo formato
    };
    return customAvatar && map[customAvatar] ? map[customAvatar] : '/default-avatar.png';
  })();
  const frameObj = mockFrames.find(f => f.id === customFrame) || mockFrames[0];
  const bgObj = mockBackgrounds.find(bg => bg.id === customBg) || mockBackgrounds[0];

  // Copiar la lista de títulos predefinidos y sus estilos aquí también
  const predefinedTitles = [
    { label: 'Maestro de la Seguridad', color: 'from-blue-700 to-cyan-400', icon: '🛡️' },
    { label: 'Cazador de Vulnerabilidades', color: 'from-green-700 to-green-400', icon: '🐞' },
    { label: 'Leyenda Digital', color: 'from-purple-700 to-pink-400', icon: '🌟' },
    { label: 'El MVP', color: 'from-yellow-600 to-yellow-300', icon: '🏆' },
    { label: 'Capitán del Equipo', color: 'from-indigo-700 to-indigo-400', icon: '👑' },
    { label: 'Héroe Anónimo', color: 'from-gray-700 to-gray-400', icon: '🦸' },
    { label: 'Analista Supremo', color: 'from-cyan-700 to-cyan-300', icon: '📊' },
    { label: 'Pentester Pro', color: 'from-red-700 to-pink-400', icon: '💻' },
    { label: 'Ciberdefensor', color: 'from-blue-900 to-blue-400', icon: '🛡️' },
    { label: 'Shadow Walker', color: 'from-black to-gray-700', icon: '👤' },
    { label: 'Overlord del Código', color: 'from-yellow-800 to-yellow-400', icon: '🤖' },
    { label: 'Phantom Debugger', color: 'from-pink-700 to-pink-300', icon: '👻' },
    { label: 'Blue Team Leader', color: 'from-blue-800 to-blue-300', icon: '🔵' },
    { label: 'Red Team Specialist', color: 'from-red-800 to-red-400', icon: '🔴' },
    { label: 'Bug Slayer', color: 'from-green-800 to-green-300', icon: '🗡️' },
  ];

  // En la sección de visualización del título en el perfil:
  const selectedTitleObj = predefinedTitles.find(t => t.label === customTitle);

  // Estado para detectar cambios
  const [pendingChanges, setPendingChanges] = useState(false);

  // Detectar cambios en avatar, marco, título y fondo
  useEffect(() => {
    const storedAvatar = localStorage.getItem('profile_custom_avatar');
    const storedFrame = localStorage.getItem('profile_custom_frame');
    const storedTitle = localStorage.getItem('profile_custom_title');
    const storedBg = localStorage.getItem('profile_custom_background');
    setPendingChanges(
      customAvatar !== storedAvatar ||
      customFrame !== storedFrame ||
      customTitle !== storedTitle ||
      customBg !== storedBg
    );
  }, [customAvatar, customFrame, customTitle, customBg]);

  // Función para guardar cambios
  const handleSaveAll = () => {
    if (customAvatar) localStorage.setItem('profile_custom_avatar', customAvatar);
    if (customFrame) localStorage.setItem('profile_custom_frame', customFrame);
    if (customTitle) localStorage.setItem('profile_custom_title', customTitle);
    if (customBg) localStorage.setItem('profile_custom_background', customBg);
    window.location.reload(); // Recargar para reflejar los cambios
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
          <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative">
            {/* Tarjeta de vista seleccionada como fondo decorativo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
              <div className="w-[520px] h-[320px] bg-gradient-to-br from-cyan-900/80 via-gray-900/90 to-black/90 rounded-3xl border-4 border-cyan-400/60 shadow-2xl" style={{ backgroundImage: `url(${bgObj.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            </div>
            {/* Contenido principal */}
            <div className="relative z-10 w-full max-w-2xl mt-12">
              {/* Header con avatar, nombre, nivel, insignias */}
              <div className="flex items-center gap-6 px-8 pt-8 pb-4">
                {/* Avatar clickable */}
                <div className="relative flex flex-col items-center group" style={{ minWidth: '120px' }}>
                  <div onClick={handleAvatarEdit} title={t('Seleccionar Avatar')} className="cursor-pointer">
                    <img
                      src={avatarObj}
                      alt="Avatar"
                      className="w-28 h-28 object-cover rounded-2xl border-4 border-cyan-300 shadow-xl bg-black/40"
                      style={{ aspectRatio: '1 / 1' }}
                    />
                  </div>
                  {/* Marco visual */}
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-cyan-700/90 text-cyan-100 px-4 py-1 rounded-full text-xs font-bold border-2 border-cyan-400/40 shadow z-20">
                    {frameObj.name}
                  </span>
                </div>
                {/* Info principal */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {editingUsername ? (
                      <>
                        <input value={usernameInput} onChange={e => setUsernameInput(e.target.value)} className="px-2 py-1 rounded text-black text-sm border border-cyan-400/40" />
                        <button onClick={handleSaveUsername} className="ml-2 px-2 py-1 bg-green-700 text-white rounded text-xs border border-green-400/40 hover:bg-green-500 transition">{t('Guardar')}</button>
                        <button onClick={() => { setEditingUsername(false); setUsernameInput(customUsername); }} className="ml-1 px-2 py-1 bg-gray-700 text-white rounded text-xs border border-gray-400/40 hover:bg-gray-500 transition">{t('Cancelar')}</button>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl font-extrabold text-cyan-100 tracking-wide">{customUsername}</span>
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-1 rounded text-xs font-bold border border-yellow-300 ml-2">PRO</span>
                        <button onClick={() => setEditingUsername(true)} className="ml-2 px-2 py-1 bg-cyan-700 text-white rounded text-xs border border-cyan-400/40 hover:bg-cyan-500 transition">{t('Editar Usuario')}</button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    {editingTitle ? (
                      <>
                        <input value={titleInput} onChange={e => setTitleInput(e.target.value)} className="px-2 py-1 rounded text-black text-sm border border-cyan-400/40" />
                        <button onClick={handleSaveTitle} className="ml-2 px-2 py-1 bg-green-700 text-white rounded text-xs border border-green-400/40 hover:bg-green-500 transition">{t('Guardar')}</button>
                        <button onClick={() => { setEditingTitle(false); setTitleInput(customTitle); }} className="ml-1 px-2 py-1 bg-gray-700 text-white rounded text-xs border border-gray-400/40 hover:bg-gray-500 transition">{t('Cancelar')}</button>
                      </>
                    ) : (
                      <>
                        {selectedTitleObj ? (
                          <span className={`
                            flex items-center gap-2 px-6 py-2 rounded-full font-extrabold text-lg border-4 border-yellow-400 shadow-xl
                            bg-gradient-to-r ${selectedTitleObj.color} text-white uppercase tracking-widest relative overflow-hidden
                          `} style={{ letterSpacing: '0.08em' }}>
                            <span className="text-2xl drop-shadow-lg">{selectedTitleObj.icon}</span>
                            <span className="drop-shadow-lg" style={{
                              WebkitTextStroke: '1.5px #222',
                              textShadow: '0 2px 8px #000, 0 0 16px #fff8',
                              fontSize: '1.35em',
                              fontWeight: 900,
                              textTransform: 'uppercase',
                            }}>
                              {selectedTitleObj.label}
                            </span>
                            {/* Brillo superior */}
                            <span className="absolute left-0 top-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />
                          </span>
                        ) : (
                          <span className="text-cyan-300 text-lg font-semibold">{customTitle}</span>
                        )}
                        <button onClick={() => setEditingTitle(true)} className="ml-2 px-2 py-1 bg-cyan-700 text-white rounded text-xs border border-cyan-400/40 hover:bg-cyan-500 transition">{t('Editar Título')}</button>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-gray-800/80 px-3 py-1 rounded text-xs border border-cyan-500/30 shadow">UID: {profile._id}</span>
                    <span className="bg-gray-800/80 px-3 py-1 rounded text-xs border border-cyan-500/30 shadow">{t('Puntos')}: <span className="text-yellow-300 font-bold">{profile.points}</span></span>
                    <span className="bg-gray-800/80 px-3 py-1 rounded text-xs border border-cyan-500/30 shadow">{t('Ranking')}: <span className="text-cyan-300 font-bold">#{profile.rank}</span></span>
                  </div>
                </div>
                {/* Likes y nivel */}
                <div className="flex flex-col items-end gap-2">
                  <span className="text-yellow-300 font-bold text-lg flex items-center gap-1"><svg width='18' height='18' fill='currentColor' className='inline'><circle cx='9' cy='9' r='8' stroke='#FFD700' strokeWidth='2' fill='none'/><path d='M6 9l2 2 4-4' stroke='#FFD700' strokeWidth='2' fill='none'/></svg>1226</span>
                  <span className="bg-cyan-800/80 text-cyan-200 px-2 py-1 rounded text-xs font-bold border border-cyan-400/30 shadow">LV. 1</span>
                </div>
              </div>
              {/* Barra de stats principales */}
              <div className="flex justify-between items-center px-8 py-3 bg-black/40 border-t border-cyan-400/20">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-cyan-200 mb-1 tracking-wider">{t('Tarjeta de Juego')}</span>
                  <span className="text-lg font-bold text-cyan-100">{profile.rank}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-yellow-200 mb-1 tracking-wider">{t('Me gusta')}</span>
                  <span className="text-lg font-bold text-yellow-100">1226</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-pink-200 mb-1 tracking-wider">{t('Tasa de MVP')}</span>
                  <span className="text-lg font-bold text-pink-100">-</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-cyan-200 mb-1 tracking-wider">{t('Victorias')}</span>
                  <span className="text-lg font-bold text-cyan-100">-</span>
                </div>
              </div>
            </div>
            {/* Sección para la tarjeta de vista seleccionada */}
            <div className="relative z-10 w-full max-w-2xl mb-12 bg-gradient-to-br from-cyan-900/80 via-gray-900/90 to-black/90 rounded-3xl border-4 border-cyan-400/60 shadow-2xl p-8 flex flex-col items-center">
              <h3 className="text-xl font-bold text-cyan-200 mb-4">{t('Tarjeta de Vista Seleccionada')}</h3>
              <div className="w-full flex flex-col items-center">
                <img src={bgObj.image} alt={bgObj.name} className="w-full max-w-md h-48 object-cover rounded-2xl border-2 border-cyan-400/40 shadow mb-4" />
                <span className="px-4 py-2 bg-cyan-900/80 text-cyan-200 rounded-full text-sm font-bold border border-cyan-400/30 shadow">{bgObj.name}</span>
              </div>
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
      {/* Botón de Guardar Cambios */}
      <div className="w-full flex justify-center mt-12">
        <button
          onClick={handleSaveAll}
          className="px-8 py-4 bg-cyan-700 text-white rounded-xl text-lg font-bold border-2 border-cyan-400 hover:bg-cyan-800 transition disabled:opacity-60"
          disabled={!pendingChanges}
        >
          {t('Guardar Cambios')}
        </button>
      </div>
    </div>
  );
};

export default ProfileCustomization; 