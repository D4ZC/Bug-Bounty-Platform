import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Checkmark } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';

interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  unlocked: boolean;
  category: 'default' | 'premium' | 'special';
}

const AvatarSelection: React.FC = () => {
  const { t } = useTranslation();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'avatar' | 'frame' | 'title' | 'background'>('avatar');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    // Simular carga de avatares
    const mockAvatars: Avatar[] = [
      { id: 'Hacker_Básico', name: t('Hacker Clásico'), imageUrl: '/avatars/Hacker_Básico.png', unlocked: true, category: 'default' },
      { id: 'Ciberseguridad', name: t('Ciberseguridad'), imageUrl: '/avatars/Ciberseguridad.png', unlocked: true, category: 'default' },
      { id: 'Programador', name: t('Programador'), imageUrl: '/avatars/Programador.png', unlocked: true, category: 'default' },
      { id: 'Analista', name: t('Analista'), imageUrl: '/avatars/Analista.png', unlocked: true, category: 'default' },
      { id: 'Pantester', name: t('Pentester'), imageUrl: '/avatars/Pantester.png', unlocked: true, category: 'default' },
      { id: 'Ghost_Hacker', name: t('Ghost Hacker'), imageUrl: '/avatars/Ghost_Hacker.png', unlocked: false, category: 'premium' },
      { id: 'Cyber_Ninja', name: t('Cyber Ninja'), imageUrl: '/avatars/Cyber_Ninja.png', unlocked: false, category: 'premium' },
      { id: 'Digital_Phantom', name: t('Digital Phantom'), imageUrl: '/avatars/Digital_Phantom.png', unlocked: false, category: 'premium' },
      { id: 'Stealth_Master', name: t('Stealth Master'), imageUrl: '/avatars/Stealth_Master.png', unlocked: false, category: 'premium' },
      { id: 'Legendary_Hacker', name: t('Legendary Hacker'), imageUrl: '/avatars/Legendary_Hacker.png', unlocked: false, category: 'special' },
      { id: 'Cyber_God', name: t('Cyber God'), imageUrl: '/avatars/Cyber_God.png', unlocked: false, category: 'special' },
      { id: 'Digital_Overlord', name: t('Digital Overlord'), imageUrl: '/avatars/Digital_Overlord.png', unlocked: false, category: 'special' },
    ];
    setAvatars(mockAvatars);
    setLoading(false);
  }, [t]);

  // Guardar la ruta de imagen del avatar seleccionado
  const handleAvatarSelect = (avatarId: string) => {
    const avatar = avatars.find(a => a.id === avatarId);
    let unlocked = avatar?.unlocked;
    if (avatar?.category === 'default') {
      unlocked = true;
    } else {
      try {
        const inv = JSON.parse(localStorage.getItem('user_inventory') || '{}');
        unlocked = Array.isArray(inv.avatars) && inv.avatars.includes(avatarId);
      } catch {}
    }
    if (avatar && unlocked) {
      setSelectedAvatar(avatar.imageUrl);
    } else {
      setFeedbackMsg(t('Debes comprar este avatar en la tienda para desbloquearlo.'));
      setFeedbackType('error');
      setTimeout(() => {
        setFeedbackMsg(null);
        setFeedbackType(null);
      }, 2500);
    }
  };

  // Seleccionar avatar aleatorio desbloqueado
  const handleRandomAvatar = () => {
    const unlockedAvatars = avatars.filter(avatar => {
      if (avatar.category === 'default') return true;
      try {
        const inv = JSON.parse(localStorage.getItem('user_inventory') || '{}');
        return Array.isArray(inv.avatars) && inv.avatars.includes(avatar.id);
      } catch { return false; }
    });
    if (unlockedAvatars.length > 0) {
      const random = unlockedAvatars[Math.floor(Math.random() * unlockedAvatars.length)];
      setSelectedAvatar(random.imageUrl);
      setFeedbackMsg(t('¡Avatar aleatorio seleccionado!'));
      setFeedbackType('success');
      setTimeout(() => {
        setFeedbackMsg(null);
        setFeedbackType(null);
      }, 2000);
    }
  };

  const handleSaveAvatar = async () => {
    if (!selectedAvatar) return;
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('profile_custom_avatar', selectedAvatar);
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
      case 'default': return t('Por Defecto');
      case 'premium': return t('Premium');
      case 'special': return t('Especial');
      default: return t('Otros');
    }
  };

  // Botón para resetear tienda y bugcoins (solo para desarrollo/admin)
  const handleResetTienda = () => {
    localStorage.removeItem('user_inventory');
    localStorage.setItem('bugcoins', '1000');
    setAvatars([]); // Limpia el estado local
    setSelectedAvatar(null);
    setFeedbackMsg(t('Tienda reseteada'));
    setFeedbackType('success');
    setTimeout(() => {
      setFeedbackMsg(null);
      setFeedbackType(null);
    }, 2000);
    // No recargar la página
  };

  const renderFeedback = () =>
    feedbackMsg ? (
      <div
        className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all duration-300
          ${feedbackType === 'success' ? 'bg-green-600 text-white border-2 border-green-300' : 'bg-red-700 text-white border-2 border-red-400 animate-shake'}`}
        style={{ minWidth: 220, textAlign: 'center' }}
      >
        {feedbackMsg}
      </div>
    ) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-app text-app flex items-center justify-center">
        <div className="text-xl animate-pulse">{t('Cargando avatares...')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] to-[#181a20] text-app p-8 font-mono relative overflow-hidden flex flex-col items-center">
      {renderFeedback()}
      {/* Botón de avatar aleatorio */}
      <button
        onClick={handleRandomAvatar}
        className="mb-6 px-6 py-3 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white font-bold border-2 border-cyan-400 shadow animate-glitch-btn"
        style={{ position: 'absolute', top: 24, left: 24, zIndex: 50 }}
      >
        Avatar Aleatorio
      </button>
      {/* Botón de reset tienda/dev */}
      <button
        onClick={handleResetTienda}
        className="fixed top-6 right-6 z-50 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold border-2 border-red-400 shadow animate-glitch-btn"
        title="Resetear tienda y bugcoins (solo desarrollo)"
      >
        Resetear Tienda
      </button>
      {/* Tabs de selección */}
      <div className="w-full max-w-2xl flex justify-center gap-2 mb-8 z-20 relative animate-fade-in">
        <button
          className={`px-8 py-3 rounded-t-lg font-bold text-lg border-b-4 transition-all duration-150 ${activeTab==='avatar' ? 'bg-cyan-800 text-cyan-100 border-cyan-400' : 'bg-gray-800 text-gray-400 border-transparent hover:bg-cyan-900/40'}`}
          onClick={()=>setActiveTab('avatar')}
        >Avatar</button>
        <button
          className={`px-8 py-3 rounded-t-lg font-bold text-lg border-b-4 transition-all duration-150 ${activeTab==='frame' ? 'bg-cyan-800 text-cyan-100 border-cyan-400' : 'bg-gray-800 text-gray-400 border-transparent hover:bg-cyan-900/40'}`}
          onClick={()=>setActiveTab('frame')}
        >Marco</button>
        <button
          className={`px-8 py-3 rounded-t-lg font-bold text-lg border-b-4 transition-all duration-150 ${activeTab==='background' ? 'bg-cyan-800 text-cyan-100 border-cyan-400' : 'bg-gray-800 text-gray-400 border-transparent hover:bg-cyan-900/40'}`}
          onClick={()=>setActiveTab('background')}
        >Banner</button>
      </div>
      {/* Contenido según tab */}
      {activeTab==='avatar' && (
        <>
          {/* Fondo animado con partículas */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full absolute animate-fade-in" style={{opacity:0.13}}>
              <circle cx="20%" cy="20%" r="90" fill="#00fff7" opacity="0.18">
                <animate attributeName="r" values="90;120;90" dur="7s" repeatCount="indefinite" />
            </circle>
              <circle cx="80%" cy="30%" r="60" fill="#FFD700" opacity="0.13">
                <animate attributeName="r" values="60;90;60" dur="8s" repeatCount="indefinite" />
            </circle>
              <circle cx="60%" cy="80%" r="50" fill="#ff00cc" opacity="0.10">
                <animate attributeName="r" values="50;80;50" dur="9s" repeatCount="indefinite" />
            </circle>
          </svg>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10 animate-pulse-slow" />
          </div>
          {/* Cabecera y botones */}
          <div className="w-full max-w-3xl mx-auto mb-8 flex justify-between items-center gap-2 relative z-10 animate-fade-in">
            <button onClick={() => navigate('/profile-customization')} className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-5 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg border-2 border-green-400/40 text-lg font-bold">
              <ArrowLeft size={24} />
                  <span>{t('Volver')}</span>
                </button>
            <h1 className="text-4xl font-extrabold text-gradient drop-shadow-lg animate-glitch-text tracking-widest text-center flex-1">
                  {t('Seleccionar Avatar')}
                </h1>
                {selectedAvatar && (
                  <button
                    onClick={handleSaveAvatar}
                    disabled={saving}
                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg border-2 border-cyan-400/40 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed animate-pop-in"
                  >
                    {saving ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                <Checkmark size={24} />
                  )}
                    <span>{saving ? t('Guardando...') : t('Guardar')}</span>
                  </button>
                )}
              </div>
          {/* Avatares por categoría */}
          <div className="w-full max-w-6xl mx-auto relative z-10 animate-fade-in">
              {['default', 'premium', 'special'].map(category => {
                const categoryAvatars = avatars.filter(avatar => avatar.category === category);
                return (
                <div key={category} className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className={`w-5 h-5 bg-gradient-to-r ${getCategoryColor(category)} rounded-full mr-4 animate-pulse`} />
                      <h2 className="text-2xl font-bold text-gradient drop-shadow-lg tracking-wide">
                        {getCategoryName(category)}
                      </h2>
                    <span className="ml-6 text-base text-gray-400">
                        ({categoryAvatars.filter(a => a.unlocked).length}/{categoryAvatars.length} {t('desbloqueados')})
                      </span>
                    </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                      {categoryAvatars.map((avatar, index) => {
                        // Determina si está desbloqueado
                        let unlocked = avatar.unlocked;
                        if (avatar.category === 'default') {
                          unlocked = true;
                        } else {
                          try {
                            const inv = JSON.parse(localStorage.getItem('user_inventory') || '{}');
                            unlocked = Array.isArray(inv.avatars) && inv.avatars.includes(avatar.id);
                          } catch {}
                        }
                        return (
                          <div
                            key={avatar.id}
                            className={`relative p-6 rounded-3xl border-4 transition-all duration-300 transform ${
                              unlocked
                                ? 'hover:scale-110 cursor-pointer glassmorphism shadow-2xl'
                                : 'opacity-50 cursor-not-allowed glassmorphism shadow-lg'
                            } ${
                              unlocked && selectedAvatar === avatar.imageUrl
                                ? 'bg-gradient-to-br from-green-600/60 via-cyan-600/60 to-blue-600/60 border-yellow-400 shadow-2xl shadow-green-500/50 scale-105 animate-glow'
                                : 'bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-gray-900/60 border-green-500/30 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/25'
                            }`}
                            onClick={() => unlocked && handleAvatarSelect(avatar.id)}
                            title={unlocked ? t('Selecciona este avatar') : t('Desbloquea este avatar para usarlo')}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex justify-center mb-4">
                              <div className={`w-28 h-28 rounded-2xl border-4 flex items-center justify-center relative ${
                                unlocked
                                  ? selectedAvatar === avatar.imageUrl
                                    ? 'border-yellow-400 bg-gradient-to-br from-green-600 to-blue-600 scale-110 animate-avatar-pop'
                                    : 'border-green-400 bg-gradient-to-br from-green-600 to-blue-600'
                                  : 'border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800'
                              }`}>
                                <img src={avatar.imageUrl} alt={avatar.name} className="w-24 h-24 object-cover rounded-xl shadow-lg" style={{ filter: unlocked ? 'none' : 'grayscale(1) blur(1px)' }} />
                                {!unlocked && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl text-gray-400">🔒</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-center flex flex-col items-center">
                              <h3 className={`text-lg font-bold ${unlocked ? 'text-green-200' : 'text-gray-400'} text-shadow-lg`}>{avatar.name}</h3>
                              {avatar.category === 'premium' && <span className="badge badge-warning mt-1">Premium</span>}
                              {avatar.category === 'special' && <span className="badge badge-primary mt-1">Special</span>}
                            </div>
                            {unlocked && selectedAvatar === avatar.imageUrl && (
                              <div className="absolute top-3 right-3 w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pop-in">
                                <svg width="20" height="20" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2"/></svg>
                              </div>
                            )}
                          </div>
                        );
                      })}
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* Info adicional */}
              <div className="mt-8 p-8 bg-card border-2 border-card rounded-2xl backdrop-blur-sm max-w-2xl mx-auto glassmorphism animate-fade-in">
                    <h3 className="text-xl font-bold text-green-300 mb-4">{t('¿Cómo desbloquear más avatares?')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
                      <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-green-200">{t('Avatares Premium: Compra en la tienda')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-200">{t('Avatares Especiales: Logros especiales')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-yellow-200">{t('Eventos temporales y competiciones')}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {activeTab==='frame' && (
              <div className="w-full max-w-2xl mx-auto bg-black/40 border-2 border-cyan-700 rounded-2xl p-12 flex flex-col items-center glassmorphism animate-fade-in">
                <h2 className="text-2xl font-bold text-cyan-300 mb-6 animate-glitch-text">Selecciona tu Marco</h2>
                <div className="w-32 h-32 rounded-full border-4 border-cyan-400 flex items-center justify-center bg-gradient-to-br from-cyan-700 to-blue-700 mb-4">
                  <span className="text-4xl text-cyan-200">🖼️</span>
                </div>
                <div className="text-cyan-200 text-lg">Próximamente podrás elegir entre marcos personalizados para tu avatar.</div>
              </div>
            )}
            {activeTab==='background' && (
              <div className="w-full max-w-2xl mx-auto bg-black/40 border-2 border-cyan-700 rounded-2xl p-12 flex flex-col items-center glassmorphism animate-fade-in">
                <h2 className="text-2xl font-bold text-cyan-300 mb-6 animate-glitch-text">Selecciona tu Banner</h2>
                {/* Banner seleccionado */}
                <div className="mb-8 w-full flex flex-col items-center">
                  <span className="text-lg text-cyan-200 mb-2">Banner actual:</span>
                  <div className="px-6 py-3 rounded-xl border-2 border-cyan-400 bg-cyan-900/60 text-cyan-100 font-bold text-xl animate-glow shadow-lg flex items-center gap-3">
                    <img src={localStorage.getItem('profile_custom_banner') || '/Banners/Firewall_Rookie.png'} alt="Banner" className="w-32 h-16 rounded-lg border-2 border-cyan-400 bg-cyan-800 object-cover" />
                    <span className="ml-4 text-cyan-200 text-lg font-mono">{localStorage.getItem('profile_custom_banner_name') || 'Sin nombre'}</span>
                  </div>
                </div>
                {/* Galería de banners con nombres y desbloqueo */}
                <div className="w-full flex flex-wrap gap-6 justify-center">
                  {[
                    {src:'/Banners/Firewall_Rookie.png', name:'Firewall Rookie', id:'banner1'},
                    {src:'/Banners/Script_Kiddie _Ascendente.png', name:'Script Kiddie Ascendente', id:'banner2'},
                    {src:'/Banners/Código_Fantasma.png', name:'Código Fantasma', id:'banner3'},
                    {src:'/Banners/Kernel_Knight.png', name:'Kernel Knight', id:'banner4'},
                    {src:'/Banners/Root_Mastermind.png', name:'Root Mastermind', id:'banner5'},
                  ].map(banner => {
                    // Solo permitir seleccionar si está desbloqueado
                    let unlocked = false;
                    try {
                      const inv = JSON.parse(localStorage.getItem('user_inventory') || '{}');
                      unlocked = Array.isArray(inv.banners) && inv.banners.includes(banner.id);
                    } catch {}
                    return (
                      <button
                        key={banner.src}
                        className={`p-2 rounded-2xl border-4 transition-all duration-200 flex flex-col items-center ${localStorage.getItem('profile_custom_banner')===banner.src ? 'border-cyan-400 scale-105 shadow-lg animate-glow' : 'border-cyan-700 hover:border-cyan-400'} ${!unlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={()=>{
                          if (unlocked) {
                            localStorage.setItem('profile_custom_banner', banner.src);
                            localStorage.setItem('profile_custom_banner_name', banner.name);
                            window.location.reload();
                          }
                        }}
                        title={unlocked ? `Seleccionar banner: ${banner.name}` : 'Debes comprar este banner en la tienda'}
                        disabled={!unlocked}
                      >
                        <img src={banner.src} alt={banner.name} className="w-48 h-24 object-cover rounded-xl bg-cyan-900" />
                        <span className="mt-2 text-cyan-200 font-mono text-base text-center">{banner.name}</span>
                        {!unlocked && <span className="text-xs text-red-400 mt-1">Bloqueado</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Animaciones personalizadas */}
            <style>{`
              .animate-glow { box-shadow: 0 0 32px #00fff7, 0 0 64px #00fff7; animation: glow 2.5s infinite alternate; }
              @keyframes glow { 0%{box-shadow:0 0 32px #00fff7,0 0 64px #00fff7;} 100%{box-shadow:0 0 64px #00fff7,0 0 128px #00fff7;} }
              .animate-xp-bar { animation: xpbar 2s cubic-bezier(.4,2,.6,1) 1; }
              @keyframes xpbar { from { width: 0; } to { width: 60%; } }
              .animate-xp-glow { box-shadow: 0 0 48px #00fff7, 0 0 96px #00fff7, 0 0 0 12px #00fff733 inset; }
              .animate-pulse-slow { animation: pulse-slow 8s infinite alternate; }
              @keyframes pulse-slow { 0%{opacity:0.7;} 100%{opacity:1;} }
              .animate-fade-in { animation: fadeIn 1.2s both; }
              @keyframes fadeIn { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none;} }
              .animate-pop-in { animation: popIn 0.7s both; }
              @keyframes popIn { from { opacity: 0; transform: scale(0.7);} to { opacity: 1; transform: scale(1);} }
              .animate-avatar-pop { animation: avatarPop 1.2s cubic-bezier(.4,2,.6,1) both; }
              @keyframes avatarPop { from { opacity: 0; transform: scale(0.6);} to { opacity: 1; transform: scale(1);} }
              .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
            `}</style>
          </div>
        );
      };

      export default AvatarSelection; 