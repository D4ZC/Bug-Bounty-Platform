import React, { useState, useRef } from 'react';

const userDefault = {
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  banner: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  displayName: 'MarcoAM',
  username: 'marco antonio moris',
  pronouns: 'He/Him',
  badges: [
    { icon: '🦑', label: 'HSR' },
    { icon: '🛡️', label: 'Moderator' },
    { icon: '💎', label: 'Assistant Moderator' },
  ],
  status: 'Cybersecurity Tester',
  roles: [
    { label: 'Moderator', color: 'bg-green-300', text: 'text-green-900' },
    { label: 'Assistant Moderator', color: 'bg-cyan-200', text: 'text-cyan-900' },
  ],
  serverCount: 1,
  // serverLabel: '1 servidor en común',
  registration: '2022-11-20',
};

const Profile: React.FC = () => {
  const [user, setUser] = useState(userDefault);
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [showBannerInput, setShowBannerInput] = useState(false);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUser((prev) => ({ ...prev, avatar: url }));
      setShowAvatarInput(false);
    }
  };
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUser((prev) => ({ ...prev, banner: url }));
      setShowBannerInput(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-b from-gray-300 to-gray-400 min-h-[700px] relative">
      {showBannerInput && (
        <div className="absolute top-12 right-2 bg-white p-2 rounded shadow">
          <input type="file" accept="image/*" onChange={handleBannerChange} />
          <button className="ml-2 px-2 py-1 bg-gray-200 rounded text-black" onClick={() => setShowBannerInput(false)}>Cancelar</button>
        </div>
      )}
      {/* Banner superior */}
      <div className="relative w-full h-40 bg-gray-300 p-0 m-0 overflow-visible">
        <img src={user.banner} alt="Banner" className="w-full h-full object-cover" />
        <input
          type="file"
          accept="image/*,.gif"
          id="banner-upload"
          className="hidden"
          onChange={handleBannerChange}
          ref={bannerInputRef}
        />
        <button
          className="absolute group bg-black/60 rounded-full transition-all duration-300 overflow-visible h-10 w-10 hover:w-44 hover:bg-black/80 flex items-center m-0 p-0"
          style={{ minWidth: '40px', minHeight: '40px', position: 'absolute', top: '2px', left: '2px', zIndex: 10 }}
          onClick={() => bannerInputRef.current && bannerInputRef.current.click()}
        >
          <span className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 pointer-events-none">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16.862 5.487a2.06 2.06 0 0 1 2.915 2.914l-9.2 9.2a2 2 0 0 1-.707.464l-3.2 1.2a.5.5 0 0 1-.64-.64l1.2-3.2a2 2 0 0 1 .464-.707l9.2-9.2Zm2.121-2.121a4.06 4.06 0 0 0-5.747 0l-9.2 9.2a4 4 0 0 0-.929 1.464l-1.2 3.2A2.5 2.5 0 0 0 4.77 20.07l3.2-1.2a4 4 0 0 0 1.464-.929l9.2-9.2a4.06 4.06 0 0 0 0-5.747Z" fill="#fff"/></svg>
          </span>
          <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap ml-12">
            Cambiar cartel
          </span>
        </button>
        {/* Avatar superpuesto */}
        <div className="absolute left-6 -bottom-16 flex flex-col items-center">
          <div className="relative">
            <img src={user.avatar} alt="Avatar" className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover" />
            <button className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100" onClick={() => setShowAvatarInput(true)} title="Cambiar foto de perfil">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 16v-4m0 0V8m0 4h4m-4 0H8" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {showAvatarInput && (
              <div className="absolute left-32 top-0 bg-white p-2 rounded shadow">
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                <button className="ml-2 px-2 py-1 bg-gray-200 rounded" onClick={() => setShowAvatarInput(false)}>Cancelar</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Contenido principal */}
      <div className="flex flex-col items-center pt-20 pb-8 px-6">
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-900">{user.displayName}</span>
          </div>
          <div className="text-gray-700 text-base font-semibold mb-1">@{user.username}</div>
          <div className="text-sm text-gray-600 mb-2">{user.pronouns}</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {user.badges.map((b, i) => (
              <span key={i} className="inline-flex items-center px-2 py-1 bg-white/80 rounded text-xs font-semibold shadow border border-gray-200 text-black">
                {b.icon} {b.label}
              </span>
            ))}
          </div>
          {/* Elimina el texto de servidor en común */}
          {/* <div className="text-xs text-gray-500 mb-2">{user.serverLabel}</div> */}
          <div className="flex gap-2 mb-2">
            <span className="text-2xl">💎</span>
            <span className="text-2xl">🦑</span>
            <span className="text-2xl">🛡️</span>
          </div>
          <div className="text-base text-gray-800 mb-2 text-center">{user.status}</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {user.roles.map((r, i) => (
              <span key={i} className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${r.color} ${r.text}`}>{r.label}</span>
            ))}
          </div>
          {/* Elimina el cuadro de enviar mensaje */}
          {/* <div className="w-full mt-2">
            <input
              className="w-full rounded-lg bg-white/80 border border-gray-300 px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
              placeholder={`Enviar un mensaje a @${user.username} ...`}
              disabled
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile; 
