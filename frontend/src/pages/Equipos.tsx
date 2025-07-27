import React, { useState, useEffect } from 'react';
import { Pencil, Users, Trophy, Target, Zap, Shield, Crown, Star, Plus, CheckCircle, XCircle, Calendar, X } from 'lucide-react';

// Array de insignias disponibles (emojis)
const insigniasDisponibles = [
  { emoji: '🏆', name: '🏆 Campeón del Equipo' },
  { emoji: '🥇', name: '🥇 Oro - Primer Lugar' },
  { emoji: '🥈', name: '🥈 Plata - Segundo Lugar' },
  { emoji: '🥉', name: '🥉 Bronce - Tercer Lugar' },
  { emoji: '⭐', name: '⭐ Estrella del Mes' },
  { emoji: '💎', name: '💎 Diamante - Elite' },
  { emoji: '🔥', name: '🔥 Fuego - En Racha' },
];

const Equipos: React.FC = () => {
  const [description, setDescription] = useState('Equipo especializado en ciberseguridad ofensiva y defensiva.');
  const [editing, setEditing] = useState(false);
  
  // Estado para el perfil del equipo (independiente del avatar de usuario)
  const [perfilUsuario, setPerfilUsuario] = useState({
    nombre: 'Alex Turner',
    avatar: '/src/assets/images/Avatar/Avatar.png', // Avatar del equipo (estático)
    racha: 5,
    top: 'TOP 10',
    online: true,
    admin: true,
  });

  // Estado para el avatar del usuario (se sincroniza con localStorage)
  const [userAvatar, setUserAvatar] = useState(
    localStorage.getItem('selectedAvatar') || '/src/assets/images/Avatar/Avatar.png'
  );

  // Estado para la modal de cambio de avatar del equipo
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Estados para la funcionalidad de invitación
  const [inviteEmail, setInviteEmail] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  // Estados para la funcionalidad de eliminación de usuarios
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ nombre: string; id?: string } | null>(null);

  // Efecto para escuchar cambios en el avatar del perfil del usuario
  useEffect(() => {
    const handleStorageChange = () => {
      const selectedAvatar = localStorage.getItem('selectedAvatar') || '/src/assets/images/Avatar/Avatar.png';
      setUserAvatar(selectedAvatar);
    };

    // Escuchar cambios en localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // También verificar cada segundo para cambios locales
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Efecto para controlar el scroll del body cuando la modal está abierta
  useEffect(() => {
    if (showAvatarModal || showSuccessModal || showDeleteModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAvatarModal, showSuccessModal, showDeleteModal]);

  const isAdmin = perfilUsuario.admin;

  // Función para validar email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    return emailRegex.test(email);
  };

  // Función para enviar invitación
  const handleSendInvitation = () => {
    if (!validateEmail(inviteEmail)) {
      alert('Por favor ingresa un correo válido (debe terminar en .com)');
      return;
    }

    setIsInviting(true);
    
    // Simular envío de invitación
    setTimeout(() => {
      // Aquí iría la lógica real de envío de invitación
      console.log('Invitación enviada a:', inviteEmail);
      console.log('Mensaje: Has sido invitado a unirte al equipo CONSULTING. ¿Aceptas la invitación?');
      
      setInviteEmail('');
      setShowSuccessModal(true);
      setIsInviting(false);
      
      // Cerrar modal de éxito después de 3 segundos
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }, 1000);
  };

  // Función para abrir modal de eliminación
  const handleDeleteUser = (user: { nombre: string; admin?: boolean }) => {
    // Solo permitir eliminar usuarios que no sean admin
    if (user.admin) {
      return;
    }
    
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Función para confirmar eliminación
  const confirmDeleteUser = () => {
    if (userToDelete) {
      // Aquí iría la lógica real de eliminación del usuario
      console.log('Usuario eliminado:', userToDelete.nombre);
      
      // Eliminar usuario del array de integrantes
      setIntegrantes(prevIntegrantes => 
        prevIntegrantes.filter(user => user.nombre !== userToDelete.nombre)
      );
      
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  // Función para cancelar eliminación
  const cancelDeleteUser = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Definir integrantes dentro del componente para acceder al estado perfilUsuario
  const [integrantes, setIntegrantes] = useState([
    {
      ...perfilUsuario,
      avatar: userAvatar, // Alex Turner usa el avatar sincronizado del perfil
      admin: true, // Alex Turner es admin
    },
    {
      nombre: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      racha: 2,
      top: 'TOP 15',
      online: false,
      admin: false,
    },
    {
      nombre: 'Michael Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
      racha: 8,
      top: 'TOP 3',
      online: false,
      admin: false,
    },
    {
      nombre: 'Emily Watson',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      racha: 4,
      top: 'TOP 20',
      online: false,
      admin: false,
    },
    {
      nombre: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
      racha: 6,
      top: 'TOP 8',
      online: false,
      admin: false,
    },
    {
      nombre: 'Lisa Park',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      racha: 3,
      top: 'TOP 12',
      online: false,
      admin: false,
    },
    {
      nombre: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      racha: 7,
      top: 'TOP 6',
      online: false,
      admin: false,
    },
  ]);

  return (
    <div className="w-full h-screen flex flex-row overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Panel izquierdo - Mejorado */}
      <div className="w-80 min-w-80 h-full bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 flex flex-col items-center p-8 overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
        {/* Foto de equipo con efectos mejorados */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <img
            src={perfilUsuario.avatar}
            alt={perfilUsuario.nombre}
            className="relative w-40 h-40 rounded-full object-cover border-4 border-slate-700 shadow-2xl hover:border-cyan-400 transition-all duration-300 transform hover:scale-105"
          />
                     {isAdmin && (
             <button
               className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
               title="Cambiar avatar"
               onClick={() => setShowAvatarModal(true)}
             >
               <Pencil size={16} />
             </button>
           )}
        </div>

        {/* Nombre de equipo con efectos */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 tracking-wider">
            CONSULTING
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Descripción editable mejorada */}
        <div className="w-full mb-8">
          {isAdmin && editing ? (
            <textarea
              className="w-full rounded-xl bg-slate-800 text-white p-4 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onBlur={() => setEditing(false)}
              autoFocus
              rows={3}
              maxLength={160}
            />
          ) : (
            <div
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 text-white text-sm font-medium text-center py-4 cursor-pointer hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300"
              onClick={() => isAdmin && setEditing(true)}
              title={isAdmin ? 'Editar descripción' : ''}
            >
              {description}
            </div>
          )}
        </div>

        {/* Insignias con animación */}
        <div className="flex items-end justify-center gap-4 mb-8">
          {insigniasDisponibles.slice(0, 3).map((insignia, index) => (
            <div
              key={index}
              className="relative group transform hover:scale-110 transition-transform duration-300 animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <span className="text-5xl filter drop-shadow-lg cursor-pointer">{insignia.emoji}</span>
              {/* Tooltip personalizado */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                {insignia.name}
                {/* Flecha del tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Estadísticas mejoradas */}
        <div className="w-full mb-8">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600">
            <h3 className="text-cyan-400 font-bold text-sm mb-4 flex items-center gap-2">
              <Trophy size={16} />
              Estadísticas del Equipo
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span>Victorias</span>
                  <span className="font-bold">9</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span>Derrotas</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Habilidades del equipo mejoradas */}
        <div className="w-full">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600">
            <h3 className="text-yellow-400 font-bold text-sm mb-4 flex items-center gap-2">
              <Target size={16} />
              Habilidades del Equipo
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-white font-bold text-lg">85</span>
                </div>
                <span className="text-xs text-slate-300">Ataque</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-white font-bold text-lg">92</span>
                </div>
                <span className="text-xs text-slate-300">Defensa</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-white font-bold text-lg">78</span>
                </div>
                <span className="text-xs text-slate-300">Velocidad</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-white font-bold text-lg">88</span>
                </div>
                <span className="text-xs text-slate-300">Técnica</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel central mejorado */}
      <div className="flex-1 h-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex flex-col items-center justify-start pt-8 overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
        {/* Top 3 usuarios con diseño mejorado */}
        {(() => {
          const top3 = [...integrantes].sort((a, b) => b.racha - a.racha).slice(0, 3);
          
          return (
            <div className="relative w-full max-w-4xl flex justify-center items-end mb-12">
              <div className="flex items-end gap-4">
                {top3.map((user, idx) => (
                  <div
                    key={user.nombre}
                    className="relative transform transition-all duration-300 hover:scale-105"
                    style={{
                      transform: idx === 1 ? 'scale(1.1)' : 'scale(0.9)',
                      marginTop: idx === 1 ? '-40px' : '0px',
                    }}
                  >
                    <div className="w-32 h-80 bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-2xl border-2 border-slate-600 shadow-2xl flex flex-col items-center pt-8 relative overflow-hidden">
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"></div>
                      
                      {/* Avatar con marco mejorado */}
                      <div className="relative mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1">
                          <img
                            src={user.avatar}
                            alt={user.nombre}
                            className="w-full h-full rounded-full object-cover border-2 border-white shadow-lg"
                          />
                        </div>
                        {/* Indicador de posición */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">#{idx + 1}</span>
                        </div>
                      </div>

                      {/* Información del usuario */}
                      <div className="text-center px-2">
                        <h3 className="text-white font-bold text-sm mb-1 truncate">{user.nombre}</h3>
                        <p className="text-slate-400 text-xs mb-3">{user.top}</p>
                        
                        {/* Racha */}
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-2 mb-3">
                          <div className="text-cyan-400 font-bold text-lg">{user.racha}</div>
                          <div className="text-slate-300 text-xs">Victorias</div>
                        </div>

                        {/* Insignias placeholder */}
                        <div className="flex justify-center gap-1">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Secciones mejoradas */}
        <div className="w-full max-w-4xl px-8 space-y-6">
                     {/* Invitar miembro mejorado */}
           <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-slate-600 p-6">
             <h3 className="text-cyan-400 font-bold text-sm mb-4 flex items-center gap-2">
               <Users size={16} />
               Invitar Miembro
             </h3>
             <div className="flex gap-3">
               <input
                 type="email"
                 placeholder="Correo electrónico..."
                 value={inviteEmail}
                 onChange={(e) => setInviteEmail(e.target.value)}
                 className="flex-1 px-4 py-3 rounded-lg bg-slate-700 text-white text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                 disabled={isInviting}
               />
               <button 
                 className={`px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 ${
                   isInviting 
                     ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                     : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:shadow-xl'
                 }`}
                 onClick={handleSendInvitation}
                 disabled={isInviting || !inviteEmail.trim()}
               >
                 <Plus size={16} />
                 {isInviting ? 'Enviando...' : 'Invitar'}
               </button>
             </div>
           </div>

          {/* Logros mejorados */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-slate-600 p-6">
            <h3 className="text-yellow-400 font-bold text-sm mb-4 flex items-center gap-2">
              <Crown size={16} />
              Logros del Equipo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '🏆', title: 'Campeón Nacional', color: '#FFD700' },
                { icon: '🥈', title: 'Participación', color: '#C0C0C0' },
                { icon: '🥉', title: 'Espíritu de Equipo', color: '#CD7F32' },
                { icon: '⭐', title: 'Invictos', color: '#FFD700' },
              ].map((logro, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center mb-2 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                    <span className="text-2xl filter drop-shadow-lg">{logro.icon}</span>
                  </div>
                  <span className="text-xs text-slate-300 font-medium">{logro.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eventos recientes mejorados */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-slate-600 p-6">
            <h3 className="text-cyan-400 font-bold text-sm mb-4 flex items-center gap-2">
              <Calendar size={16} />
              Eventos Recientes
            </h3>
            <div className="space-y-3">
              {[
                { icon: <CheckCircle size={16} className="text-green-400" />, text: 'Victoria contra RedHawks', date: '2024-05-01' },
                { icon: <XCircle size={16} className="text-red-400" />, text: 'Derrota contra BlueTeam', date: '2024-04-28' },
                { icon: <Plus size={16} className="text-blue-400" />, text: 'Nuevo integrante: Samus Aran', date: '2024-04-25' },
                { icon: <Star size={16} className="text-yellow-400" />, text: 'Logro obtenido: Invictos', date: '2024-04-20' },
              ].map((evento, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                  {evento.icon}
                  <span className="flex-1 text-sm text-slate-200">{evento.text}</span>
                  <span className="text-xs text-slate-400">{evento.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho mejorado */}
      <div className="w-72 min-w-72 h-full bg-gradient-to-b from-slate-800 to-slate-900 border-l border-slate-700 flex flex-col" onWheel={(e) => e.stopPropagation()}>
        {/* Encabezado mejorado */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold text-lg p-6 text-center border-b border-slate-600">
          <div className="flex items-center justify-center gap-2">
            <Users size={20} />
            <span className="tracking-wider">INTEGRANTES</span>
          </div>
        </div>

                 {/* Lista de integrantes mejorada */}
         <div className="flex-1 overflow-y-auto p-4 space-y-3" onWheel={(e) => e.stopPropagation()}>
           {integrantes.map((user, idx) => (
             <div
               key={user.nombre}
               className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-4 border border-slate-600 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative group"
             >
               {/* Botón de eliminar (solo para admin y usuarios no-admin) */}
               {isAdmin && !user.admin && (
                 <button
                   className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
                   onClick={() => handleDeleteUser(user)}
                   title={`Eliminar a ${user.nombre}`}
                 >
                   <X size={12} />
                 </button>
               )}
               
               <div className="flex items-center gap-4">
                 {/* Avatar con estado */}
                 <div className="relative">
                   <img 
                     src={user.avatar} 
                     alt={user.nombre} 
                     className="w-12 h-12 rounded-full object-cover border-2 border-slate-600 shadow-lg" 
                   />
                   <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                     user.online ? 'bg-green-400' : 'bg-slate-500'
                   }`}></div>
                 </div>

                 {/* Información del usuario */}
                 <div className="flex-1">
                   <h4 className="text-white font-semibold text-sm mb-1">{user.nombre}</h4>
                   <div className="flex items-center gap-2">
                     <span className={`text-xs font-medium ${
                       user.online ? 'text-green-400' : 'text-slate-400'
                     }`}>
                       {user.online ? 'Online' : 'Offline'}
                     </span>
                     <span className="text-xs text-yellow-400 font-bold">{user.top}</span>
                   </div>
                 </div>

                 {/* Racha */}
                 <div className="text-right">
                   <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg px-3 py-2">
                     <div className="text-cyan-400 font-bold text-lg">{user.racha}</div>
                     <div className="text-slate-300 text-xs">Victorias</div>
                   </div>
                 </div>
               </div>
             </div>
           ))}
                  </div>
       </div>

               {/* Modal para cambiar avatar del equipo */}
        {showAvatarModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setShowAvatarModal(false)}
          >
            <div 
              className="relative flex flex-col bg-white border-2 border-gray-300 rounded-xl shadow-2xl overflow-hidden"
              style={{ width: 400, height: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 bg-gray-50 border-b border-gray-200">
                <span className="text-xl font-bold text-gray-800">Cambiar Avatar del Equipo</span>
                <button 
                  onClick={() => setShowAvatarModal(false)} 
                  className="text-gray-600 hover:text-red-500 text-xl font-bold transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Contenido */}
              <div className="flex-1 p-6 flex flex-col items-center justify-center">
                {/* Cuadrícula de avatares (vacía por ahora) */}
                <div className="grid grid-cols-4 gap-4 mb-6 w-full">
                  {Array.from({ length: 8 }, (_, index) => (
                    <div 
                      key={index}
                      className="w-16 h-16 bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-not-allowed opacity-50"
                    >
                      <span className="text-gray-500 text-xs">Avatar {index + 1}</span>
                    </div>
                  ))}
                </div>
                
                {/* Mensaje de no disponibles */}
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium">
                    No hay avatares disponibles
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Esta función estará disponible próximamente
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

                 {/* Modal de éxito para invitación */}
         {showSuccessModal && (
           <div 
             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
             onClick={() => setShowSuccessModal(false)}
           >
             <div 
               className="relative flex flex-col bg-white border-2 border-gray-300 rounded-xl shadow-2xl overflow-hidden"
               style={{ width: 350, height: 200 }}
               onClick={(e) => e.stopPropagation()}
             >
               {/* Header */}
               <div className="flex items-center justify-center px-6 pt-6 pb-4 bg-green-50 border-b border-green-200">
                 <span className="text-lg font-bold text-green-800">¡Éxito!</span>
               </div>
               
               {/* Contenido */}
               <div className="flex-1 p-6 flex flex-col items-center justify-center">
                 <div className="text-center">
                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                     <CheckCircle size={24} className="text-green-600" />
                   </div>
                   <p className="text-gray-800 text-base font-medium">
                     Invitación enviada con éxito
                   </p>
                   <p className="text-gray-600 text-sm mt-2">
                     El usuario recibirá una notificación para unirse al equipo
                   </p>
                 </div>
               </div>
             </div>
           </div>
         )}

         {/* Modal de confirmación para eliminar usuario */}
         {showDeleteModal && userToDelete && (
           <div 
             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
             onClick={cancelDeleteUser}
           >
             <div 
               className="relative flex flex-col bg-white border-2 border-gray-300 rounded-xl shadow-2xl overflow-hidden"
               style={{ width: 400, height: 250 }}
               onClick={(e) => e.stopPropagation()}
             >
               {/* Header */}
               <div className="flex items-center justify-center px-6 pt-6 pb-4 bg-red-50 border-b border-red-200">
                 <span className="text-lg font-bold text-red-800">Confirmar Eliminación</span>
               </div>
               
               {/* Contenido */}
               <div className="flex-1 p-6 flex flex-col items-center justify-center">
                 <div className="text-center">
                   <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                     <X size={24} className="text-red-600" />
                   </div>
                   <p className="text-gray-800 text-base font-medium mb-2">
                     ¿Estás seguro de querer eliminar a {userToDelete.nombre} de tu equipo?
                   </p>
                   <p className="text-gray-600 text-sm">
                     Esta acción no se puede deshacer
                   </p>
                 </div>
               </div>

               {/* Botones */}
               <div className="flex gap-3 p-6 bg-gray-50 border-t border-gray-200">
                 <button
                   onClick={cancelDeleteUser}
                   className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                 >
                   No
                 </button>
                 <button
                   onClick={confirmDeleteUser}
                   className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
                 >
                   Sí
                 </button>
               </div>
             </div>
           </div>
         )}
     </div>
   );
 };

export default Equipos; 