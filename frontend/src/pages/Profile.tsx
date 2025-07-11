import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
// import PointsStats from '../components/Points/PointsStats';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import XPProgressBar from '../components/ui/XPProgressBar';
import AchievementsGallery from '../components/ui/AchievementsGallery';
import { useTheme } from '../contexts/ThemeContext';
import Modal from '../components/ui/Modal';

// Mock de usuario (mismo que en Dashboard y Shop)
const mockUser = {
  name: 'PlayerOne',
  level: 15,
  rank: 3,
  totalPoints: 1250,
  pointsThisWeek: 180,
  vulnerabilitiesFound: 47,
  criticalVulns: 8,
  highVulns: 12,
  mediumVulns: 18,
  lowVulns: 9,
  rewardsEarned: 12,
  streak: 7,
  accuracy: 94.2,
  achievements: [
    { id: 1, name: 'Vulnerabilidad Crítica', icon: '💥' },
    { id: 2, name: 'Vulnerabilidad Alta', icon: '⚠️' },
    { id: 3, name: 'MVP', icon: '🏆' },
    { id: 4, name: 'Vulnerabilidad Media', icon: '🔧' },
  ],
};

// Mock de puntos obtenidos
const mockPointsList = [
  {
    id: 1,
    cantidad: 100,
    motivo: 'Vulnerabilidad Crítica',
    fecha_obtencion: '2023-07-01',
    fecha_expiracion: '2024-07-01',
  },
  {
    id: 2,
    cantidad: 75,
    motivo: 'Vulnerabilidad Alta',
    fecha_obtencion: '2023-10-15',
    fecha_expiracion: '2024-10-15',
  },
  {
    id: 3,
    cantidad: 150,
    motivo: 'MVP',
    fecha_obtencion: '2024-01-10',
    fecha_expiracion: '2025-01-10',
  },
  {
    id: 4,
    cantidad: 50,
    motivo: 'Vulnerabilidad Media',
    fecha_obtencion: '2024-02-20',
    fecha_expiracion: '2025-02-20',
  },
];

// Mock de canjes realizados
const mockRedemptions = [
  {
    id: 1,
    recompensa: 'Camiseta Oficial',
    puntos_gastados: 200,
    fecha_canje: '2023-12-01',
  },
  {
    id: 2,
    recompensa: 'Sticker Pack',
    puntos_gastados: 50,
    fecha_canje: '2024-02-20',
  },
  {
    id: 3,
    recompensa: 'Skin Cyber Ninja',
    puntos_gastados: 400,
    fecha_canje: '2024-03-15',
  },
];

// Mock de avatares desbloqueados
const unlockedAvatars = [
  {
    id: 1,
    name: 'Cyber Ninja',
    url: 'https://robohash.org/cyberninja?set=set2',
  },
  {
    id: 2,
    name: 'Ice King',
    url: 'https://robohash.org/iceking?set=set2',
  },
  {
    id: 3,
    name: 'Blaze',
    url: 'https://robohash.org/blaze?set=set2',
  },
  {
    id: 4,
    name: 'Breakpoint',
    url: 'https://robohash.org/breakpoint?set=set2',
  },
  {
    id: 5,
    name: 'Shadow Samurai',
    url: 'https://robohash.org/shadowsamurai?set=set2',
  },
  {
    id: 6,
    name: 'Neon Wolf',
    url: 'https://robohash.org/neonwolf?set=set2',
  },
  {
    id: 7,
    name: 'Pixel Bot',
    url: 'https://robohash.org/pixelbot?set=set2',
  },
];

// Preferencias de usuario (animaciones, sonidos, notificaciones)
function getUserPrefs() {
  try {
    return JSON.parse(localStorage.getItem('userPrefs') || '{}');
  } catch {
    return {};
  }
}
function setUserPrefs(prefs: any) {
  localStorage.setItem('userPrefs', JSON.stringify(prefs));
}

const profileFrames = [
  { key: 'none', label: 'Sin marco', className: '' },
  { key: 'gold', label: 'Dorado', className: 'ring-4 ring-yellow-400 border-yellow-400 shadow-gold-frame' },
  { key: 'cyber', label: 'Cyberpunk', className: 'ring-4 ring-cyan-400 border-pink-500 shadow-cyber-frame' },
  { key: 'epic', label: 'Épico', className: 'ring-4 ring-purple-500 border-purple-400 shadow-epic-frame' },
];
function getProfilePrefs() {
  try {
    return JSON.parse(localStorage.getItem('profilePrefs') || '{}');
  } catch {
    return {};
  }
}
function setProfilePrefs(prefs: any) {
  localStorage.setItem('profilePrefs', JSON.stringify(prefs));
}

const profileBackgrounds = [
  { key: 'default', label: 'Predeterminado', className: 'bg-gradient-to-br from-blue-900 via-purple-900 to-black' },
  { key: 'cyber', label: 'Cyberpunk', className: 'bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] cyberpunk-bg' },
  { key: 'gold', label: 'Dorado', className: 'bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-700' },
  { key: 'epic', label: 'Épico', className: 'bg-gradient-to-br from-purple-700 via-pink-500 to-blue-700' },
];

function getVisibleAchievements() {
  try {
    return JSON.parse(localStorage.getItem('visibleAchievements') || '[]');
  } catch {
    return [];
  }
}
function setVisibleAchievements(ids: number[]) {
  localStorage.setItem('visibleAchievements', JSON.stringify(ids));
}

const Profile: React.FC = () => {
  const { user, updateAvatar, updateUser } = useAuth();
  const selectedAvatar = user?.avatarUrl || unlockedAvatars[0].url;
  const { showToast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAvatarName, setSelectedAvatarName] = useState<string | null>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [prefs, setPrefs] = useState(() => getUserPrefs());
  const [profilePrefs, setProfilePrefs] = useState(() => getProfilePrefs());
  // Sincronizar con localStorage
  useEffect(() => { setUserPrefs(prefs); }, [prefs]);
  useEffect(() => { setProfilePrefs(profilePrefs); }, [profilePrefs]);
  const [visibleAchievements, setVisibleAchievementsState] = useState<number[]>(() => getVisibleAchievements());
  useEffect(() => { setVisibleAchievements(visibleAchievements); }, [visibleAchievements]);
  // Obtener lista de logros del usuario
  const userAchievements = (user?.achievements && Array.isArray(user.achievements)) ? user.achievements : (Array.isArray(mockUser.achievements) ? mockUser.achievements : []);
  const visibleAchObjs = userAchievements.filter((a: any) => visibleAchievements.includes(a.id));
  const toggleAchievement = (id: number) => {
    setVisibleAchievementsState((prev) => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev; // máximo 3
      return [...prev, id];
    });
  };

  // Mock de XP y nivel
  const xp = user?.xp ?? 850;
  const level = user?.level ?? 15;
  const xpToNextLevel = 1000;
  const achievements = user?.achievements ?? [];

  const handleAvatarChange = (avatarUrl: string, avatarName: string) => {
    updateAvatar(avatarUrl);
    updateUser({
      ...user!,
      avatarUrl,
    });
    showToast(`Avatar cambiado a ${avatarName}!`, 'success');
    setShowConfetti(true);
    setSelectedAvatarName(avatarName);
    setShowModal(true);
    setTimeout(() => setShowConfetti(false), 1200);
  };

  return (
    <div className={`min-h-screen ${profileBackgrounds.find(b => b.key === profilePrefs.bg)?.className || profileBackgrounds[0].className} text-white`}>
      <div className="max-w-3xl mx-auto py-10 px-4">
        {/* Avatar Personalization */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold mb-4 neon-text drop-shadow-cyber tracking-widest">Personaliza tu Avatar</h2>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {unlockedAvatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => handleAvatarChange(avatar.url, avatar.name)}
                className={`relative p-2 rounded-2xl border-4 neon-shadow transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 active:scale-95 active:shadow-inner hover:shadow-cyan-400/60 hover:scale-110 ${selectedAvatar === avatar.url ? 'border-cyan-400 scale-110 ring-2 ring-cyan-400 animate-avatar-pop' : 'border-gray-700 opacity-60 hover:scale-105'}`}
                aria-label={`Seleccionar ${avatar.name}`}
                style={{ boxShadow: selectedAvatar === avatar.url ? '0 0 12px 2px #22d3ee' : undefined }}
              >
                <img src={avatar.url} alt={avatar.name} className="w-20 h-20 rounded-full" loading="lazy" width={80} height={80} />
                <div className="text-xs text-center mt-2 text-cyan-200 font-bold">{avatar.name}</div>
                {selectedAvatar === avatar.url && (
                  <span className="absolute top-2 right-2 bg-cyan-400 text-white rounded-full p-1 shadow-lg animate-pop-in">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#22d3ee"/><path d="M6 10.5l2.5 2.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Selección de marco de perfil */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold mb-4 neon-text drop-shadow-cyber tracking-widest">Marco de perfil</h2>
          <div className="flex gap-4 items-center justify-center flex-wrap">
            {profileFrames.map((frame) => (
              <button
                key={frame.key}
                className={`p-2 rounded-full border-2 font-bold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${profilePrefs.frame === frame.key ? 'scale-110 border-cyan-400 ring-2 ring-cyan-400' : 'border-gray-700 hover:scale-105'}`}
                onClick={() => setProfilePrefs((p: any) => ({ ...p, frame: frame.key }))}
                aria-label={frame.label}
              >
                <span className="block w-12 h-12 bg-gray-800 rounded-full relative">
                  <span className={`absolute inset-0 rounded-full pointer-events-none ${frame.className}`}></span>
                </span>
                <div className="text-xs text-center mt-1 text-cyan-200 font-bold">{frame.label}</div>
              </button>
            ))}
          </div>
        </div>
        {/* Selección de fondo de perfil */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold mb-4 neon-text drop-shadow-cyber tracking-widest">Fondo de perfil</h2>
          <div className="flex gap-4 items-center justify-center flex-wrap">
            {profileBackgrounds.map((bg) => (
              <button
                key={bg.key}
                className={`p-2 rounded-lg border-2 font-bold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${profilePrefs.bg === bg.key ? 'scale-110 border-cyan-400 ring-2 ring-cyan-400' : 'border-gray-700 hover:scale-105'}`}
                onClick={() => setProfilePrefs((p: any) => ({ ...p, bg: bg.key }))}
                aria-label={bg.label}
                style={{ minWidth: 48, minHeight: 48 }}
              >
                <span className={`block w-12 h-12 rounded-lg ${bg.className}`}></span>
                <div className="text-xs text-center mt-1 text-cyan-200 font-bold">{bg.label}</div>
              </button>
            ))}
          </div>
        </div>
        {/* Selector de tema visual */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold mb-4 neon-text drop-shadow-cyber tracking-widest">Tema visual</h2>
          <div className="flex gap-4 items-center justify-center">
            <button
              className={`px-4 py-2 rounded-lg font-bold border-2 transition-all shadow-cyber focus:outline-none focus:ring-2 focus:ring-cyan-400 ${theme === 'light' ? 'bg-white text-cyan-900 border-cyan-400 scale-105' : 'bg-gray-900 text-white border-gray-700 hover:scale-105'}`}
              onClick={() => setTheme('light')}
            >
              Claro
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-bold border-2 transition-all shadow-cyber focus:outline-none focus:ring-2 focus:ring-cyan-400 ${theme === 'dark' ? 'bg-gray-900 text-cyan-200 border-cyan-400 scale-105' : 'bg-gray-800 text-white border-gray-700 hover:scale-105'}`}
              onClick={() => setTheme('dark')}
            >
              Oscuro
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-bold border-2 transition-all shadow-cyber focus:outline-none focus:ring-2 focus:ring-pink-400 ${theme === 'cyberpunk' ? 'bg-gradient-to-r from-pink-500 to-cyan-400 text-white border-pink-400 scale-105' : 'bg-black text-pink-200 border-pink-400 hover:scale-105'}`}
              onClick={() => setTheme('cyberpunk')}
            >
              Cyberpunk
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-bold border-2 transition-all shadow-cyber focus:outline-none focus:ring-2 focus:ring-cyan-400 ${theme === 'system' ? 'bg-gray-200 text-cyan-900 border-cyan-400 scale-105' : 'bg-gray-800 text-white border-gray-700 hover:scale-105'}`}
              onClick={() => setTheme('system')}
            >
              Sistema
            </button>
          </div>
        </div>
        {/* Selección de insignias/logros destacados */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold mb-4 neon-text drop-shadow-cyber tracking-widest">Logros destacados</h2>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {userAchievements.map((ach: any) => (
              <button
                key={ach.id}
                className={`p-2 rounded-xl border-2 font-bold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 flex flex-col items-center gap-1 ${visibleAchievements.includes(ach.id) ? 'scale-110 border-cyan-400 ring-2 ring-cyan-400 bg-cyan-900/60' : 'border-gray-700 hover:scale-105 bg-gray-800/60'}`}
                onClick={() => toggleAchievement(ach.id)}
                aria-label={ach.name}
                disabled={!visibleAchievements.includes(ach.id) && visibleAchievements.length >= 3}
              >
                <span className="text-3xl">{ach.icon}</span>
                <span className="text-xs text-cyan-200 font-bold">{ach.name}</span>
              </button>
            ))}
          </div>
          <div className="text-xs text-cyan-300 mt-2">Puedes seleccionar hasta 3 logros para mostrar en tu perfil.</div>
        </div>
        {/* Avatar Preview */}
        <div className="flex flex-col items-center mb-8 relative">
          <span className={`inline-block rounded-full ${profileFrames.find(f => f.key === profilePrefs.frame)?.className || ''}`}
            style={{ boxShadow: '0 0 12px 2px #22d3ee' }}>
            <img src={selectedAvatar} alt="Avatar seleccionado" className="w-32 h-32 rounded-full border-4 border-cyan-400 neon-shadow mb-2" loading="lazy" width={128} height={128} />
          </span>
          {/* Fondo de avatar preview */}
          <span className={`absolute -z-10 w-40 h-40 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${profileBackgrounds.find(b => b.key === profilePrefs.bg)?.className || ''}`}></span>
          {/* Logros destacados preview */}
          <div className="flex gap-2 mt-2">
            {visibleAchObjs.map((ach: any) => (
              <span key={ach.id} title={ach.name} className="text-2xl drop-shadow-cyber animate-pop-in">{ach.icon}</span>
            ))}
          </div>
          {showConfetti && (
            <div ref={confettiRef} className="absolute inset-0 pointer-events-none z-20 animate-confetti">
              {[...Array(18)].map((_, i) => (
                <span key={i} className={`confetti-piece confetti-${i % 6}`}></span>
              ))}
            </div>
          )}
          <span className="text-lg font-bold text-cyan-200">Avatar actual</span>
        </div>
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg mb-4">
            Perfil de Usuario
          </h1>
          <div className="bg-blue-800 rounded-lg px-6 py-3 inline-flex items-center gap-3 shadow-lg">
            <span className="font-bold text-lg">{mockUser.name}</span>
            <span className="bg-blue-400 text-blue-900 font-bold px-3 py-1 rounded-full">
              {mockUser.totalPoints} Blue Points
            </span>
            <span className="bg-yellow-600 text-white font-bold px-3 py-1 rounded-full">
              Nivel {mockUser.level}
            </span>
            <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-full">
              #{mockUser.rank} Global
            </span>
          </div>
        </header>

        {/* Estadísticas de puntos */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total de puntos */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-center group hover:scale-105 hover:shadow-2xl focus-within:ring-2 focus-within:ring-blue-400 active:scale-95 transition-all animate-bounce-short-card">
              <div className="text-2xl font-bold text-white mb-1">
                {mockUser.totalPoints}
              </div>
              <div className="text-blue-100 text-sm">Total Blue Points</div>
              <div className="w-full bg-blue-800 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{
                    width: `${Math.min((mockUser.totalPoints / 1000) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Puntos este mes */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 text-center group hover:scale-105 hover:shadow-2xl focus-within:ring-2 focus-within:ring-blue-400 active:scale-95 transition-all animate-bounce-short-card">
              <div className="text-2xl font-bold text-white mb-1">
                {mockUser.pointsThisWeek}
              </div>
              <div className="text-purple-100 text-sm">Esta Semana</div>
              <div className="w-full bg-purple-800 rounded-full h-2 mt-2">
                <div
                  className="bg-pink-400 h-2 rounded-full"
                  style={{
                    width: `${Math.min((mockUser.pointsThisWeek / 200) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Vulnerabilidades encontradas */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-center group hover:scale-105 hover:shadow-2xl focus-within:ring-2 focus-within:ring-blue-400 active:scale-95 transition-all animate-bounce-short-card">
              <div className="text-2xl font-bold text-white mb-1">
                {mockUser.vulnerabilitiesFound}
              </div>
              <div className="text-green-100 text-sm">Vulns Encontradas</div>
              <div className="w-full bg-green-800 rounded-full h-2 mt-2">
                <div
                  className="bg-green-300 h-2 rounded-full"
                  style={{
                    width: `${Math.min((mockUser.vulnerabilitiesFound / 50) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Ranking */}
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-4 text-center group hover:scale-105 hover:shadow-2xl focus-within:ring-2 focus-within:ring-blue-400 active:scale-95 transition-all animate-bounce-short-card">
              <div className="text-2xl font-bold text-white mb-1">
                #{mockUser.rank}
              </div>
              <div className="text-yellow-100 text-sm">Ranking Global</div>
              <div className="flex justify-center mt-2">
                {mockUser.rank <= 3 ? (
                  <span className="text-2xl">
                    {mockUser.rank === 1
                      ? '🥇'
                      : mockUser.rank === 2
                        ? '🥈'
                        : '🥉'}
                  </span>
                ) : (
                  <span className="text-yellow-300">⭐</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Barra de progreso de XP/Nivel */}
        <XPProgressBar xp={xp} level={level} xpToNextLevel={xpToNextLevel} />

        {/* Galería de logros */}
        <h2 className="text-2xl font-extrabold mb-4 neon-text drop-shadow-cyber tracking-widest">Tus Logros</h2>
        <AchievementsGallery achievements={achievements} />

        {/* Lista de puntos obtenidos */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Puntos Obtenidos</h2>
          <div className="bg-white bg-opacity-10 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-800">
                  <tr>
                    <th className="py-3 px-4 text-left">Cantidad</th>
                    <th className="py-3 px-4 text-left">Motivo</th>
                    <th className="py-3 px-4 text-left">Fecha Obtención</th>
                    <th className="py-3 px-4 text-left">Expira</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPointsList.map((point) => (
                    <tr
                      key={point.id}
                      className="border-b border-blue-700 hover:bg-blue-800 hover:bg-opacity-30"
                    >
                      <td className="py-3 px-4 font-bold text-green-400">
                        {point.cantidad}
                      </td>
                      <td className="py-3 px-4">{point.motivo}</td>
                      <td className="py-3 px-4 text-blue-200">
                        {point.fecha_obtencion}
                      </td>
                      <td className="py-3 px-4 text-yellow-200">
                        {point.fecha_expiracion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Enlace a tienda */}
        <section className="mb-8 text-center">
          <a
            href="/shop"
            className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🛒 Ir a la Tienda Virtual
          </a>
        </section>

        {/* Historial de canjes */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Historial de Canjes</h2>
          <div className="bg-white bg-opacity-10 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-800">
                  <tr>
                    <th className="py-3 px-4 text-left">Recompensa</th>
                    <th className="py-3 px-4 text-left">Puntos Gastados</th>
                    <th className="py-3 px-4 text-left">Fecha de Canje</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRedemptions.map((redemption) => (
                    <tr
                      key={redemption.id}
                      className="border-b border-purple-700 hover:bg-purple-800 hover:bg-opacity-30"
                    >
                      <td className="py-3 px-4 font-bold">
                        {redemption.recompensa}
                      </td>
                      <td className="py-3 px-4 text-red-400 font-bold">
                        {redemption.puntos_gastados}
                      </td>
                      <td className="py-3 px-4 text-purple-200">
                        {redemption.fecha_canje}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Preferencias de usuario */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold mb-4 neon-text drop-shadow-cyber tracking-widest">Preferencias</h2>
          <div className="flex flex-col gap-4 items-center justify-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.animations !== false}
                onChange={e => setPrefs((p: any) => ({ ...p, animations: e.target.checked }))}
                className="form-checkbox h-5 w-5 text-cyan-500"
              />
              <span className="font-bold text-cyan-200">Animaciones</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.sounds === true}
                onChange={e => setPrefs((p: any) => ({ ...p, sounds: e.target.checked }))}
                className="form-checkbox h-5 w-5 text-pink-500"
              />
              <span className="font-bold text-pink-200">Sonidos</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.notifications !== false}
                onChange={e => setPrefs((p: any) => ({ ...p, notifications: e.target.checked }))}
                className="form-checkbox h-5 w-5 text-yellow-500"
              />
              <span className="font-bold text-yellow-200">Notificaciones</span>
            </label>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ← Volver al Dashboard
          </a>
        </div>
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title="¡Avatar cambiado!"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-5xl animate-bounce">🎭</span>
            <p className="text-lg font-bold text-cyan-200 text-center">Has cambiado tu avatar a <span className="text-pink-400">{selectedAvatarName}</span>.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-cyan-600 text-white font-bold px-6 py-2 rounded-full hover:bg-cyan-700 transition"
            >
              ¡Genial!
            </button>
          </div>
        </Modal>
      </div>
      {/* Estilos cyberpunk extra */}
      <style>{`
        .neon-text {
          color: #22d3ee;
          text-shadow: 0 0 8px #22d3ee, 0 0 16px #a78bfa, 0 0 32px #00fff7;
        }
        .drop-shadow-cyber {
          filter: drop-shadow(0 0 8px #00fff7) drop-shadow(0 0 16px #a78bfa);
        }
        .shadow-cyber {
          box-shadow: 0 0 16px 2px #00fff7, 0 0 32px 4px #a78bfa;
        }
        .neon-shadow {
          box-shadow: 0 0 16px 2px #22d3ee, 0 0 32px 4px #a78bfa, 0 0 8px #fff0;
        }
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes avatar-pop {
          0% { transform: scale(0.8); }
          60% { transform: scale(1.15); }
          100% { transform: scale(1.1); }
        }
        .animate-avatar-pop {
          animation: avatar-pop 0.5s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .animate-bounce-short-card {
          transition: transform 0.2s cubic-bezier(.4,0,.2,1);
        }
        .group:hover .animate-bounce-short-card, .group:focus-within .animate-bounce-short-card {
          animation: bounce-short-card 0.4s cubic-bezier(.4,0,.2,1);
        }
        @keyframes bounce-short-card {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.08); }
          60% { transform: scale(0.96); }
          80% { transform: scale(1.03); }
        }
        .animate-confetti {
          animation: confetti-burst 1.2s cubic-bezier(.4,0,.2,1);
        }
        @keyframes confetti-burst {
          0% { opacity: 0; transform: scale(0.7); }
          10% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1.2); }
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 18px;
          border-radius: 2px;
          opacity: 0.8;
        }
        .confetti-0 { left: 10%; top: 20%; background: #00fff7; transform: rotate(-12deg); }
        .confetti-1 { left: 20%; top: 40%; background: #ff00ea; transform: rotate(8deg); }
        .confetti-2 { left: 30%; top: 10%; background: #fff200; transform: rotate(-6deg); }
        .confetti-3 { left: 40%; top: 30%; background: #00ffae; transform: rotate(14deg); }
        .confetti-4 { left: 50%; top: 15%; background: #ff6b00; transform: rotate(-8deg); }
        .confetti-5 { left: 60%; top: 35%; background: #00bfff; transform: rotate(10deg); }
        .shadow-gold-frame { box-shadow: 0 0 16px 4px #ffd70099, 0 0 8px #fff0; }
        .shadow-cyber-frame { box-shadow: 0 0 16px 4px #00fff799, 0 0 8px #ff00ea99, 0 0 8px #fff0; }
        .shadow-epic-frame { box-shadow: 0 0 16px 4px #a78bfa99, 0 0 8px #fff0; }
        .cyberpunk-bg { background: radial-gradient(circle at 60% 20%, #ff00ea33 0%, #0f0026 100%); }
      `}</style>
    </div>
  );
};

export default Profile;
