import React, { useRef, useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Button, TextArea } from '@carbon/react';

const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/32.jpg"; // Nueva foto de perfil por defecto

const Profile: React.FC = () => {
  const [avatar, setAvatar] = useState<string>(() => {
    // Obtener la foto guardada en localStorage o usar la por defecto
    return localStorage.getItem('userAvatar') || DEFAULT_AVATAR;
  });
  const [bugCoins, setBugCoins] = useState<number>(() => {
    // Obtener los BugCoins guardados en localStorage o usar el valor por defecto
    const savedBugCoins = localStorage.getItem('userBugCoins');
    return savedBugCoins ? parseInt(savedBugCoins) : 1325;
  });
  const [bio, setBio] = useState<string>('Desarrollador apasionado por la seguridad informática y la caza de bugs. Siempre buscando nuevos desafíos y aprendiendo nuevas tecnologías.');
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  const [tempBio, setTempBio] = useState<string>('');
  const [profileFrame, setProfileFrame] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string>('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80');
  const [profileBackground, setProfileBackground] = useState<string>('bg-gray-200');
  const [showFrameModal, setShowFrameModal] = useState<boolean>(false);
  const [showBannerModal, setShowBannerModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const frameInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          const avatarData = ev.target.result as string;
          setAvatar(avatarData);
          // Guardar en localStorage para sincronizar con otras páginas
          localStorage.setItem('userAvatar', avatarData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditBio = () => {
    if (isEditingBio) {
      // Si está editando, guardar los cambios
      setBio(tempBio);
      setIsEditingBio(false);
    } else {
      // Si no está editando, iniciar edición
      setTempBio(bio);
      setIsEditingBio(true);
    }
  };

  const handleFrameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setProfileFrame(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setBannerImage(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (color: string) => {
    setProfileBackground(color);
  };

  const handleFrameSelect = (frameUrl: string) => {
    setProfileFrame(frameUrl);
    setShowFrameModal(false);
  };

  const handleBannerSelect = (bannerUrl: string) => {
    setBannerImage(bannerUrl);
    setShowBannerModal(false);
  };

  const updateBugCoins = (newAmount: number) => {
    setBugCoins(newAmount);
    localStorage.setItem('userBugCoins', newAmount.toString());
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center">
        {/* Título de la página */}
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-black mb-8">Perfil</h1>
        </div>
        <div className={`relative w-[1000px] h-[1100px] rounded-2xl shadow-2xl ${profileBackground} border border-gray-300 overflow-hidden flex flex-col`}>
          {/* Botón de Modo Edición */}
          <div className="absolute top-4 left-4 z-30">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                editMode 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
                  : 'bg-black hover:bg-gray-800 text-white shadow-lg'
              }`}
              title={editMode ? "Desactivar modo edición" : "Activar modo edición"}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
              </svg>
              {editMode ? "Desactivar Edición" : "Editar Perfil"}
            </button>
          </div>
          {/* Banner superior */}
          <div className="relative h-56 w-full bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})` }}>
            {/* Botón para cambiar banner */}
            {editMode && (
                            <button
                className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 flex items-center justify-center"
                onClick={() => setShowBannerModal(true)}
                title="Cambiar imagen de banner"
              >
                {/* Icono de imagen */}
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              ref={bannerInputRef}
              className="hidden"
              onChange={handleBannerChange}
            />
          </div>
          {/* Avatar y marco */}
          <div className="absolute left-16 top-60 z-10">
            <div className="relative">
              <img
                src={avatar}
                alt="Avatar"
                className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg bg-gray-200"
              />
              {/* Marco de perfil */}
              {profileFrame && (
                <div className="absolute w-56 h-56 rounded-full overflow-hidden z-20" style={{ left: '-30px', top: '-26px' }}>
                  <img
                    src={profileFrame}
                    alt="Marco de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {/* Botón para cambiar avatar */}
              {editMode && (
              <button
                  className="absolute bottom-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center z-20"
                  style={{ right: '-70px' }}
                onClick={() => fileInputRef.current?.click()}
                title="Cambiar foto de perfil"
              >
                {/* Icono de persona tipo Carbon */}
                <svg width="26" height="26" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="12" r="6" fill="white"/><circle cx="16" cy="12" r="5" fill="#2563eb"/><rect x="6" y="22" width="20" height="6" rx="3" fill="white"/><rect x="8" y="23" width="16" height="4" rx="2" fill="#2563eb"/></svg>
              </button>
            )}
              {/* Botón para cambiar marco */}
              {editMode && (
                <button
                  className="absolute bottom-2 bg-purple-700 hover:bg-purple-800 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 flex items-center justify-center z-20"
                  style={{ right: '-130px' }}
                  onClick={() => setShowFrameModal(true)}
                  title="Cambiar marco de perfil"
                >
                {/* Icono de marco */}
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 9h6v6H9V9zm2 2v2h2v-2h-2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAvatarChange}
              />
              <input
                type="file"
                accept="image/*"
                ref={frameInputRef}
                className="hidden"
                onChange={handleFrameChange}
              />
              {/* Decoración floral */}
              <span className="absolute -top-4 -left-4">
                <svg width="60" height="32" viewBox="0 0 40 24" fill="none"><ellipse cx="20" cy="12" rx="20" ry="8" fill="#F9A8D4" opacity="0.5"/></svg>
              </span>
            </div>
          </div>
          
          {/* Información del usuario */}
          <div className="absolute left-16 top-80 flex flex-col items-start gap-4 z-10" style={{ marginTop: '120px' }}>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-bold text-gray-900">JuanAM</span>
              <div className="text-gray-700 font-medium text-lg">@JuanDev</div>
            </div>
            {/* Roles integrados */}
            <div className="flex gap-4 mt-4">
              <span className="flex items-center gap-2 bg-green-200 text-green-800 px-5 py-2 rounded-full text-base font-semibold shadow">
                <svg width="20" height="20" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#22C55E"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                Moderator
              </span>
              <span className="flex items-center gap-2 bg-cyan-200 text-cyan-800 px-5 py-2 rounded-full text-base font-semibold shadow">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Development Software
                </span>
            </div>
          </div>
          {/* Contenido principal */}
          <div className="pt-44 pb-10 px-16 flex gap-8 flex-1">
            {/* Información del perfil */}
            <div className="flex flex-col gap-8 flex-1 mt-20">

              
              {/* Sección de Biografía */}
              <div className="mt-40">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Biografía</h3>
                  {editMode && (
                    <button 
                      onClick={handleEditBio}
                      className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                      title={isEditingBio ? "Guardar cambios" : "Editar biografía"}
                    >
                    <svg 
                      width="20" 
                      height="20" 
                      fill="none" 
                      viewBox="0 0 24 24"
                      className={`transition-transform duration-300 ${isEditingBio ? 'rotate-12' : 'rotate-0'}`}
                    >
                      <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
                    </svg>
                  </button>
                )}
                </div>
                
                {isEditingBio ? (
                  <div className="space-y-3">
                    <div className="min-h-[400px]">
                      <TextArea
                        id="bio"
                        labelText=""
                        value={tempBio}
                        onChange={(e) => {
                          if (e.target.value.length <= 700) {
                            setTempBio(e.target.value);
                          }
                        }}
                        rows={12}
                        className="w-full h-full text-black"
                        maxLength={700}
                      />
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      {tempBio.length}/700 caracteres
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[400px]">
                    <p className="text-gray-700 leading-relaxed">{bio}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sección de Emblemas */}
            <div className="w-80 flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Emblemas</h3>
                             <div className="grid grid-cols-2 gap-4">
                 {/* Emblema 1 - Bug Hunter */}
                 <div className="bg-gray-200 rounded-lg p-4 shadow-lg border-2 border-black relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-30"></div>
                   <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center mb-2 shadow-lg">
                       <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                         <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#FFD700"/>
                       </svg>
                     </div>
                     <span className="text-sm font-bold text-gray-900">Bug Hunter</span>
                     <span className="text-xs text-gray-600">Nivel 3</span>
                   </div>
                 </div>

                 {/* Emblema 2 - Security Expert */}
                 <div className="bg-gray-200 rounded-lg p-4 shadow-lg border-2 border-black relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-200 to-transparent opacity-40"></div>
                   <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center mb-2 shadow-lg">
                       <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                         <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="#3B82F6"/>
                       </svg>
                     </div>
                     <span className="text-sm font-bold text-gray-900">Security Expert</span>
                     <span className="text-xs text-gray-600">Nivel 2</span>
                   </div>
                 </div>

                 {/* Emblema 3 - Code Master */}
                 <div className="bg-gray-200 rounded-lg p-4 shadow-lg border-2 border-black relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-35"></div>
                   <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mb-2 shadow-lg">
                       <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                         <path d="M9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11ZM21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19H3V5H21V19Z" fill="#10B981"/>
                       </svg>
                     </div>
                     <span className="text-sm font-bold text-gray-900">Code Master</span>
                     <span className="text-xs text-gray-600">Nivel 4</span>
                   </div>
                 </div>

                 {/* Emblema 4 - Team Leader */}
                 <div className="bg-gray-200 rounded-lg p-4 shadow-lg border-2 border-black relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-red-200 to-transparent opacity-35"></div>
                   <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 bg-red-300 rounded-full flex items-center justify-center mb-2 shadow-lg">
                       <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                         <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 21H5V3H13V9H19V21Z" fill="#EF4444"/>
                       </svg>
                     </div>
                     <span className="text-sm font-bold text-gray-900">Team Leader</span>
                     <span className="text-xs text-gray-600">Nivel 1</span>
                   </div>
                 </div>

                 {/* Emblema 5 - MVP */}
                 <div className="bg-gray-200 rounded-lg p-4 shadow-lg border-2 border-black relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-50"></div>
                   <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center mb-2 shadow-lg">
                       <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                         <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" fill="#8B5CF6"/>
                       </svg>
                     </div>
                     <span className="text-sm font-bold text-gray-900">MVP</span>
                     <span className="text-xs text-gray-600">Nivel 5</span>
                   </div>
                 </div>

                 {/* Emblema 6 - Veteran */}
                 <div className="bg-gray-200 rounded-lg p-4 shadow-lg border-2 border-black relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30"></div>
                   <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mb-2 shadow-lg">
                       <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                         <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#6B7280"/>
                       </svg>
                     </div>
                     <span className="text-sm font-bold text-gray-900">Veteran</span>
                     <span className="text-xs text-gray-600">Nivel 3</span>
                   </div>
                 </div>

                 {/* Emblema 7 - Crazy File */}
                 <div className="bg-gray-200 rounded-lg p-4 shadow-lg border-2 border-black relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200 to-transparent opacity-40"></div>
                   <div className="flex flex-col items-center text-center relative z-10">
                     <div className="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center mb-2 shadow-lg">
                       <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                         <path d="M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z" fill="#EC4899"/>
                         <rect x="6" y="10" width="4" height="2" fill="#EC4899"/>
                         <rect x="6" y="13" width="6" height="2" fill="#EC4899"/>
                         <rect x="6" y="16" width="3" height="2" fill="#EC4899"/>
                       </svg>
                     </div>
                     <span className="text-sm font-bold text-gray-900">Crazy File</span>
                     <span className="text-xs text-gray-600">Nivel 2</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Botón para cambiar fondo del perfil */}
        {editMode && (
          <div className="fixed bottom-8 right-8 z-50">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Cambiar Fondo</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleBackgroundChange('bg-gray-200')}
                className="w-8 h-8 bg-gray-200 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
                title="Gris"
              />
              <button
                onClick={() => handleBackgroundChange('bg-blue-100')}
                className="w-8 h-8 bg-blue-100 rounded-full border-2 border-blue-300 hover:border-blue-500 transition-colors"
                title="Azul claro"
              />
              <button
                onClick={() => handleBackgroundChange('bg-green-100')}
                className="w-8 h-8 bg-green-100 rounded-full border-2 border-green-300 hover:border-green-500 transition-colors"
                title="Verde claro"
              />
              <button
                onClick={() => handleBackgroundChange('bg-purple-100')}
                className="w-8 h-8 bg-purple-100 rounded-full border-2 border-purple-300 hover:border-purple-500 transition-colors"
                title="Púrpura claro"
              />
              <button
                onClick={() => handleBackgroundChange('bg-pink-100')}
                className="w-8 h-8 bg-pink-100 rounded-full border-2 border-pink-300 hover:border-pink-500 transition-colors"
                title="Rosa claro"
              />
              <button
                onClick={() => handleBackgroundChange('bg-yellow-100')}
                className="w-8 h-8 bg-yellow-100 rounded-full border-2 border-yellow-300 hover:border-yellow-500 transition-colors"
                title="Amarillo claro"
              />
              <button
                onClick={() => handleBackgroundChange('bg-red-100')}
                className="w-8 h-8 bg-red-100 rounded-full border-2 border-red-300 hover:border-red-500 transition-colors"
                title="Rojo claro"
              />
              <button
                onClick={() => handleBackgroundChange('bg-indigo-100')}
                className="w-8 h-8 bg-indigo-100 rounded-full border-2 border-indigo-300 hover:border-indigo-500 transition-colors"
                title="Índigo claro"
              />
              <button
                onClick={() => handleBackgroundChange('bg-teal-100')}
                className="w-8 h-8 bg-teal-100 rounded-full border-2 border-teal-300 hover:border-teal-500 transition-colors"
                title="Verde azulado claro"
              />
            </div>
          </div>
        </div>
        )}
        
        {/* Tabla de vulnerabilidades resueltas y bugcoins */}
        <div className="w-full max-w-7xl mx-auto px-4 py-8 mt-8">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Vulnerabilidades Resueltas y Bugcoins</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vulnerabilidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Resuelta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bugcoins
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documentación Adjunta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      SQL Injection en Login
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Inyección SQL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Crítica
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      15/12/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +500
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        NO
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      XSS en Comentarios
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Cross-Site Scripting
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        Alta
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      10/12/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +300
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        NO
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      CSRF en Formularios
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Cross-Site Request Forgery
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Media
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      05/12/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +200
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        NO
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Path Traversal
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Directory Traversal
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        Alta
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      01/12/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +350
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        NO
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      IDOR en API
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Insecure Direct Object Reference
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Media
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      28/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +150
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        NO
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Open Redirect
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Unvalidated Redirects
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Media
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      25/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +125
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        NO
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Sensitive Data Exposure
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Information Disclosure
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        Alta
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      20/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +275
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        NO
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Broken Authentication
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Authentication Flaws
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Crítica
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      15/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +450
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        SI
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Security Misconfiguration
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Configuration Errors
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Media
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      10/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +175
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        NO
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Insecure Deserialization
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Serialization Attacks
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        Alta
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      05/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +325
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        SI
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      XXE Injection
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      XML External Entity
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Crítica
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      01/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +475
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        SI
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Verificado
              </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total de vulnerabilidades: <span className="font-semibold">10</span>
                </div>
                <div className="text-sm text-gray-600">
                  Total de bugcoins: <span className="font-semibold text-green-600">+{bugCoins.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de selección de marcos */}
      {showFrameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Seleccionar Marco</h2>
                <button
                  onClick={() => setShowFrameModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {/* Fila 1 */}
                {/* Marco Dorado */}
                <div className="group cursor-pointer hover:scale-105 transition-transform" onClick={() => handleFrameSelect('/marcos/marco1.png')}>
                  <div className="relative w-32 h-32 mx-auto mb-2">
                    <img 
                      src={avatar} 
                      alt="Avatar preview" 
                      className="absolute inset-0 w-20 h-20 rounded-full object-cover mx-auto my-auto z-10" 
                      style={{ top: 'calc(50% + 10px)', left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                    <img 
                      src="/marcos/marco1.png" 
                      alt="Marco Dorado" 
                      className="absolute inset-0 w-32 h-32 rounded-full object-cover shadow-lg z-20"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">Marco Dorado</p>
                </div>

                {/* Marco Hacker */}
                <div className="group cursor-pointer hover:scale-105 transition-transform" onClick={() => handleFrameSelect('/marcos/marco2.png')}>
                  <div className="relative w-32 h-32 mx-auto mb-2">
                    <img 
                      src={avatar} 
                      alt="Avatar preview" 
                      className="absolute inset-0 w-20 h-20 rounded-full object-cover mx-auto my-auto z-10" 
                      style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                    <img 
                      src="/marcos/marco2.png" 
                      alt="Marco Hacker" 
                      className="absolute inset-0 w-32 h-32 rounded-full object-cover shadow-lg z-20"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">Marco Hacker</p>
                </div>

                {/* Marco Demoníaco */}
                <div className="group cursor-pointer hover:scale-105 transition-transform" onClick={() => handleFrameSelect('/marcos/marco3.png')}>
                  <div className="relative w-32 h-32 mx-auto mb-2">
                    <img 
                      src={avatar} 
                      alt="Avatar preview" 
                      className="absolute inset-0 w-20 h-20 rounded-full object-cover mx-auto my-auto z-10" 
                      style={{ top: 'calc(50% + 5px)', left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                    <img 
                      src="/marcos/marco3.png" 
                      alt="Marco Demoníaco" 
                      className="absolute inset-0 w-32 h-32 rounded-full object-cover shadow-lg z-20"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">Marco Demoníaco</p>
                </div>

                {/* Fila 2 */}
                {/* Marco Teal */}
                <div className="group cursor-pointer hover:scale-105 transition-transform" onClick={() => handleFrameSelect('/marcos/marco4.png')}>
                  <div className="relative w-32 h-32 mx-auto mb-2">
                    <img 
                      src={avatar} 
                      alt="Avatar preview" 
                      className="absolute inset-0 w-20 h-20 rounded-full object-cover mx-auto my-auto z-10" 
                      style={{ top: 'calc(50% + 10px)', left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                    <img 
                      src="/marcos/marco4.png" 
                      alt="Marco Teal" 
                      className="absolute inset-0 w-32 h-32 rounded-full object-cover shadow-lg z-20"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">Marco Teal</p>
                </div>

                {/* Marco Real */}
                <div className="group cursor-pointer hover:scale-105 transition-transform" onClick={() => handleFrameSelect('/marcos/marco5.png')}>
                  <div className="relative w-32 h-32 mx-auto mb-2">
                    <img 
                      src={avatar} 
                      alt="Avatar preview" 
                      className="absolute inset-0 w-20 h-20 rounded-full object-cover mx-auto my-auto z-10" 
                      style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                    <img 
                      src="/marcos/marco5.png" 
                      alt="Marco Real" 
                      className="absolute inset-0 w-32 h-32 rounded-full object-cover shadow-lg z-20"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">Marco Real</p>
                </div>

                {/* Sin Marco */}
                <div className="group cursor-pointer hover:scale-105 transition-transform" onClick={() => handleFrameSelect('')}>
                  <div className="relative w-32 h-32 mx-auto mb-2">
                    <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-300 shadow-lg flex items-center justify-center">
                      <img 
                        src={avatar} 
                        alt="Avatar preview" 
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">Sin Marco</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de selección de banners */}
      {showBannerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Seleccionar Banner</h2>
                <button
                  onClick={() => setShowBannerModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
              
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg font-medium">
                  Vaya... aun no tienes banners. ¡¡Participa en Eventos para ganar Bugpoins y Obtener Banners!!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Profile;
