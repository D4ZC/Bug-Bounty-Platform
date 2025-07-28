import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaPalette, FaGlobe, FaClock, FaShieldAlt, FaBell, FaSave, FaTimes } from 'react-icons/fa';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  // Estados para formularios
  const [accountSettings, setAccountSettings] = useState({
    email: 'nicole.hunt@example.com',
    username: 'NicoleHunt',
    firstName: 'Nicole',
    lastName: 'Hunt',
    bio: 'Cazador de bugs apasionado por la ciberseguridad.'
  });

  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    showEmail: false,
    showPoints: true,
    showTeam: true,
    showActivity: true
  });

  const [visualSettings, setVisualSettings] = useState({
    fontSize: 'medium',
    colorScheme: 'default',
    compactMode: false,
    animations: true
  });

  const [languageSettings, setLanguageSettings] = useState({
    language: 'es',
    timezone: 'America/Mexico_City'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginNotifications: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    doNotDisturb: false,
    doNotDisturbStart: '22:00',
    doNotDisturbEnd: '08:00',
    quietHours: false
  });

  const tabs = [
    { id: 'account', label: 'Cuenta', icon: <FaUser /> },
    { id: 'privacy', label: 'Privacidad', icon: <FaEye /> },
    { id: 'visual', label: 'Apariencia', icon: <FaPalette /> },
    { id: 'language', label: 'Idioma', icon: <FaGlobe /> },
    { id: 'security', label: 'Seguridad', icon: <FaShieldAlt /> },
    { id: 'notifications', label: 'Notificaciones', icon: <FaBell /> }
  ];

  const handleSave = (section: string) => {
    console.log(`Guardando configuración de ${section}`);
    // Aquí iría la lógica para guardar en el backend
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Configuración</h1>
        <p className="text-gray-300">Personaliza tu experiencia en la plataforma</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar de navegación */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4 text-purple-400">Secciones</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 rounded-xl p-8">
              
              {/* Sección: Cuenta */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaUser className="text-2xl text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Información de Cuenta</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={accountSettings.email}
                        onChange={(e) => setAccountSettings({...accountSettings, email: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nombre de Usuario</label>
                      <input
                        type="text"
                        value={accountSettings.username}
                        onChange={(e) => setAccountSettings({...accountSettings, username: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                      <input
                        type="text"
                        value={accountSettings.firstName}
                        onChange={(e) => setAccountSettings({...accountSettings, firstName: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Apellido</label>
                      <input
                        type="text"
                        value={accountSettings.lastName}
                        onChange={(e) => setAccountSettings({...accountSettings, lastName: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Biografía</label>
                    <textarea
                      value={accountSettings.bio}
                      onChange={(e) => setAccountSettings({...accountSettings, bio: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* Cambio de contraseña */}
                  <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FaLock className="text-purple-400" />
                      Cambiar Contraseña
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña Actual</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none pr-12"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Nueva Contraseña</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none pr-12"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSave('account')}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <FaSave />
                      Guardar Cambios
                    </button>
                    <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
                      <FaTimes />
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Sección: Privacidad */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaEye className="text-2xl text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Configuración de Privacidad</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Perfil Público</h3>
                        <p className="text-sm text-gray-400">Permitir que otros usuarios vean tu perfil</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacySettings.profilePublic}
                          onChange={(e) => setPrivacySettings({...privacySettings, profilePublic: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Mostrar Email</h3>
                        <p className="text-sm text-gray-400">Permitir que otros usuarios vean tu email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacySettings.showEmail}
                          onChange={(e) => setPrivacySettings({...privacySettings, showEmail: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Mostrar Puntos</h3>
                        <p className="text-sm text-gray-400">Mostrar tus puntos en el perfil público</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacySettings.showPoints}
                          onChange={(e) => setPrivacySettings({...privacySettings, showPoints: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Mostrar Equipo</h3>
                        <p className="text-sm text-gray-400">Mostrar información de tu equipo</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacySettings.showTeam}
                          onChange={(e) => setPrivacySettings({...privacySettings, showTeam: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Mostrar Actividad</h3>
                        <p className="text-sm text-gray-400">Mostrar tu actividad reciente</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacySettings.showActivity}
                          onChange={(e) => setPrivacySettings({...privacySettings, showActivity: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSave('privacy')}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <FaSave />
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              )}

              {/* Sección: Apariencia */}
              {activeTab === 'visual' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaPalette className="text-2xl text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Personalización Visual</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tamaño de Fuente</label>
                      <select
                        value={visualSettings.fontSize}
                        onChange={(e) => setVisualSettings({...visualSettings, fontSize: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="small">Pequeño</option>
                        <option value="medium">Mediano</option>
                        <option value="large">Grande</option>
                        <option value="extra-large">Extra Grande</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Esquema de Colores</label>
                      <select
                        value={visualSettings.colorScheme}
                        onChange={(e) => setVisualSettings({...visualSettings, colorScheme: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="default">Predeterminado</option>
                        <option value="purple">Púrpura</option>
                        <option value="blue">Azul</option>
                        <option value="green">Verde</option>
                        <option value="orange">Naranja</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Modo Compacto</h3>
                        <p className="text-sm text-gray-400">Reducir el espaciado entre elementos</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visualSettings.compactMode}
                          onChange={(e) => setVisualSettings({...visualSettings, compactMode: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Animaciones</h3>
                        <p className="text-sm text-gray-400">Mostrar animaciones y transiciones</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visualSettings.animations}
                          onChange={(e) => setVisualSettings({...visualSettings, animations: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSave('visual')}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <FaSave />
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              )}

              {/* Sección: Idioma */}
              {activeTab === 'language' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaGlobe className="text-2xl text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Idioma y Región</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Idioma</label>
                      <select
                        value={languageSettings.language}
                        onChange={(e) => setLanguageSettings({...languageSettings, language: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="pt">Português</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Zona Horaria</label>
                      <select
                        value={languageSettings.timezone}
                        onChange={(e) => setLanguageSettings({...languageSettings, timezone: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="America/Mexico_City">México (GMT-6)</option>
                        <option value="America/New_York">Nueva York (GMT-5)</option>
                        <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
                        <option value="Europe/Madrid">Madrid (GMT+1)</option>
                        <option value="Europe/London">Londres (GMT+0)</option>
                        <option value="Asia/Tokyo">Tokio (GMT+9)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSave('language')}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <FaSave />
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              )}

              {/* Sección: Seguridad */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaShieldAlt className="text-2xl text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Configuración de Seguridad</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Autenticación de Dos Factores</h3>
                        <p className="text-sm text-gray-400">Añadir una capa extra de seguridad a tu cuenta</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorEnabled}
                          onChange={(e) => setSecuritySettings({...securitySettings, twoFactorEnabled: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tiempo de Sesión (minutos)</label>
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value={15}>15 minutos</option>
                        <option value={30}>30 minutos</option>
                        <option value={60}>1 hora</option>
                        <option value={120}>2 horas</option>
                        <option value={0}>Nunca (no recomendado)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Notificaciones de Login</h3>
                        <p className="text-sm text-gray-400">Recibir notificaciones cuando inicies sesión desde un nuevo dispositivo</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.loginNotifications}
                          onChange={(e) => setSecuritySettings({...securitySettings, loginNotifications: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSave('security')}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <FaSave />
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              )}

              {/* Sección: Notificaciones */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaBell className="text-2xl text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Configuración de Notificaciones</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Modo No Molestar</h3>
                        <p className="text-sm text-gray-400">Silenciar todas las notificaciones durante las horas especificadas</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.doNotDisturb}
                          onChange={(e) => setNotificationSettings({...notificationSettings, doNotDisturb: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    {notificationSettings.doNotDisturb && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-800 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Hora de Inicio</label>
                          <input
                            type="time"
                            value={notificationSettings.doNotDisturbStart}
                            onChange={(e) => setNotificationSettings({...notificationSettings, doNotDisturbStart: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Hora de Fin</label>
                          <input
                            type="time"
                            value={notificationSettings.doNotDisturbEnd}
                            onChange={(e) => setNotificationSettings({...notificationSettings, doNotDisturbEnd: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Horas Silenciosas</h3>
                        <p className="text-sm text-gray-400">Reducir la frecuencia de notificaciones durante la noche</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.quietHours}
                          onChange={(e) => setNotificationSettings({...notificationSettings, quietHours: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSave('notifications')}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <FaSave />
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 