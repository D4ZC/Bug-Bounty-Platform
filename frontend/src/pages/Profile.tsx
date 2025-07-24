import React, { useRef, useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';

const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/32.jpg"; // Nueva foto de perfil por defecto

const Profile: React.FC = () => {
  const [avatar, setAvatar] = useState<string>(DEFAULT_AVATAR);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setAvatar(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="relative w-[1000px] h-[1100px] rounded-2xl shadow-2xl bg-gray-200 border border-gray-300 overflow-hidden flex flex-col">
          {/* Banner superior */}
          <div className="h-56 w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80)' }} />
          {/* Avatar y botón */}
          <div className="absolute left-16 top-60 flex items-end gap-4 z-10">
            <div className="relative">
              <img
                src={avatar}
                alt="Avatar"
                className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg bg-gray-200"
              />
              {/* Botón para cambiar avatar, movido 5px a la derecha */}
              <button
                className="absolute bottom-2 right-[10px] bg-blue-700 hover:bg-blue-800 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
                style={{ right: '10px' }}
                onClick={() => fileInputRef.current?.click()}
                title="Cambiar foto de perfil"
              >
                {/* Icono de persona tipo Carbon */}
                <svg width="26" height="26" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="12" r="6" fill="white"/><circle cx="16" cy="12" r="5" fill="#2563eb"/><rect x="6" y="22" width="20" height="6" rx="3" fill="white"/><rect x="8" y="23" width="16" height="4" rx="2" fill="#2563eb"/></svg>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAvatarChange}
              />
              {/* Decoración floral */}
              <span className="absolute -top-4 -left-4">
                <svg width="60" height="32" viewBox="0 0 40 24" fill="none"><ellipse cx="20" cy="12" rx="20" ry="8" fill="#F9A8D4" opacity="0.5"/></svg>
              </span>
            </div>
          </div>
          {/* Contenido principal */}
          <div className="pt-44 pb-10 px-16 flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-gray-900">JuanAM</span>
            </div>
            <div className="text-gray-700 font-medium -mt-1 text-lg">@JuanDev</div>
            {/* Descripción */}
            <div className="mt-4 text-gray-800 text-xl">Development Software</div>
            {/* Roles */}
            <div className="flex gap-4 mt-4">
              <span className="flex items-center gap-2 bg-green-200 text-green-800 px-5 py-2 rounded-full text-base font-semibold shadow">
                <svg width="20" height="20" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#22C55E"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                Moderator
              </span>
              <span className="flex items-center gap-2 bg-cyan-200 text-cyan-800 px-5 py-2 rounded-full text-base font-semibold shadow">
                <svg width="20" height="20" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#06B6D4"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                Assistant Moderator
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
