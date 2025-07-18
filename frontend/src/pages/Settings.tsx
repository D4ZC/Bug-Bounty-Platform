import React, { useState, useRef } from 'react';
import { Outlet, NavLink, useLocation, Routes, Route } from 'react-router-dom';
import { ChevronDown, ChevronRight, Security, View, Map, User as UserIcon, Locked, Email, TrashCan, Download, Wallet, Notification, Globe } from '@carbon/icons-react';

const user = {
  avatar: 'https://i.pinimg.com/736x/23/8d/ad/238dad5a2186e67d9c11d47a50f5100d.jpg',
  nombre: 'Pedro Ramiro',
  nickname: 'bughunter',
  email: 'pedro.ramiro@example.com',
  nacimiento: '28 de julio de 1990',
  genero: 'Prefiero no decirlo',
  telefono: '33 1234 5678',
};

const sections = [
  { label: 'Inicio', icon: UserIcon, iconColor: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Informacion Personal', icon: Locked, iconColor: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Datos Y Privacidad', icon: Security, iconColor: 'text-yellow-600', bg: 'bg-yellow-50' },
  { label: 'Seguridad', icon: View, iconColor: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Actividad', icon: Map, iconColor: 'text-pink-600', bg: 'bg-pink-50' },
  { label: 'Idioma y tema', icon: Globe, iconColor: 'text-cyan-600', bg: 'bg-cyan-50' },
  { label: 'Informacion General', icon: Notification, iconColor: 'text-orange-600', bg: 'bg-orange-50' },
];

const UserProfileSection: React.FC = () => (
  <div className="flex flex-col gap-8">
    <div className="flex items-center gap-8">
      <img src={user.avatar} alt="avatar"  />
        <div>
        <div className="font-bold text-2xl mb-1">{user.nombre}</div>
        <div className="text-blue-600 font-semibold text-lg mb-1">@{user.nickname}</div>
        <div className="text-gray-500 text-base">{user.email}</div>
      </div>
    </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
        <label className="block text-gray-600 text-sm mb-1">Nombre completo</label>
        <input type="text" value={user.nombre} disabled className="w-full bg-gray-100 rounded px-3 py-2 border" />
      </div>
              <div>
        <label className="block text-gray-600 text-sm mb-1">Nickname</label>
        <input type="text" value={user.nickname} disabled className="w-full bg-gray-100 rounded px-3 py-2 border" />
      </div>
            <div>
        <label className="block text-gray-600 text-sm mb-1">Email</label>
        <input type="email" value={user.email} disabled className="w-full bg-gray-100 rounded px-3 py-2 border" />
      </div>
            <div>
        <label className="block text-gray-600 text-sm mb-1">Avatar</label>
        <input type="text" value={user.avatar} disabled className="w-full bg-gray-100 rounded px-3 py-2 border" />
            </div>
          </div>
    <div className="mt-4 flex gap-3">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Editar perfil</button>
      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Cambiar contraseña</button>
      </div>
    </div>
  );

const QuickAccessPanel: React.FC<{ show: boolean; anchorRef: React.RefObject<HTMLDivElement> }> = ({ show, anchorRef }) => {
  if (!show) return null;
  return (
    <div
      className="absolute left-80 top-16 z-30 w-[540px] bg-white rounded-2xl shadow-2xl border p-8 animate-in fade-in duration-200"
      style={{ minHeight: 420 }}
    >
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold mb-2 border-4 border-blue-200">
          {user.nombre[0].toUpperCase()}
        </div>
        <div className="text-2xl font-semibold mb-1">Te damos la bienvenida, {user.nombre}</div>
        <div className="text-gray-600 text-base mb-2">Gestiona tu información, la privacidad y la seguridad para mejorar tu experiencia en la plataforma.</div>
                </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar en tu cuenta..."
          className="w-full rounded-full bg-gray-100 px-5 py-3 text-base border focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <button className="px-4 py-2 bg-white border rounded-full text-gray-700 hover:bg-gray-50 text-sm">Mi contraseña</button>
        <button className="px-4 py-2 bg-white border rounded-full text-gray-700 hover:bg-gray-50 text-sm">Dispositivos</button>
        <button className="px-4 py-2 bg-white border rounded-full text-gray-700 hover:bg-gray-50 text-sm">Mi actividad</button>
        <button className="px-4 py-2 bg-white border rounded-full text-gray-700 hover:bg-gray-50 text-sm">Correo electrónico</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-gray-50 rounded-xl p-5 flex flex-col justify-between h-36">
          <div className="font-semibold mb-2">Almacenamiento de reportes</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-blue-400 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <span className="text-xs text-gray-500">84,66 GB de 2 TB en uso</span>
          </div>
          <button className="text-blue-700 text-sm font-medium hover:underline self-start">Ver detalles</button>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 flex flex-col justify-between h-36">
          <div className="font-semibold mb-2">Privacidad y personalización</div>
          <div className="text-gray-600 text-sm mb-2">Consulta los datos almacenados y elige qué actividad se debe guardar para personalizar tu experiencia.</div>
          <button className="text-blue-700 text-sm font-medium hover:underline self-start">Gestionar privacidad</button>
        </div>
      </div>
    </div>
  );
};

const SettingsLayout: React.FC = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>('Inicio');
  const inicioRef = useRef<HTMLDivElement>(null);

  // Renderiza la tarjeta de información personal
  const renderPersonalInfo = () => (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-2">Información personal</h1>
      <div className="text-gray-600 mb-8">Información sobre ti y tus preferencias en la plataforma</div>
      <div className="text-2xl font-semibold mb-2">La información de tu perfil en la plataforma</div>
      <div className="text-gray-600 mb-8">Información personal y opciones para gestionarla. Puedes hacer que parte de esta información, como tus detalles de contacto, esté visible para otros usuarios. De este modo, les resultará más fácil ponerse en contacto contigo.</div>
      {/* Información básica */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-0 overflow-hidden">
        <div className="px-8 py-6 border-b">
          <div className="text-xl font-semibold mb-1">Información básica</div>
          <div className="text-gray-500 text-sm">Es posible que otros usuarios puedan ver parte de la información al usar la plataforma.</div>
        </div>
        <div className="divide-y">
          <div className="flex items-center px-8 py-5">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold mr-6 overflow-hidden">
              <img src={user.avatar} alt="avatar" className="w-12 h-12 object-cover rounded-full" />
            </div>
            <div className="flex-1">Imagen de perfil</div>
            <button className="text-blue-700 text-sm font-medium hover:underline flex items-center gap-1"><ChevronRight size={20} /></button>
          </div>
          <div className="flex items-center px-8 py-5">
            <div className="flex-1">Nombre</div>
            <div className="text-gray-900 font-medium">{user.nombre}</div>
            <button className="ml-4 text-gray-400 hover:text-blue-700"><ChevronRight size={20} /></button>
          </div>
          <div className="flex items-center px-8 py-5">
            <div className="flex-1">Fecha de nacimiento</div>
            <div className="text-gray-900 font-medium">{user.nacimiento}</div>
            <button className="ml-4 text-gray-400 hover:text-blue-700"><ChevronRight size={20} /></button>
          </div>
          <div className="flex items-center px-8 py-5">
            <div className="flex-1">Género</div>
            <div className="text-gray-900 font-medium">{user.genero}</div>
            <button className="ml-4 text-gray-400 hover:text-blue-700"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
      {/* Información de contacto */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-0 overflow-hidden">
        <div className="px-8 py-6 border-b">
          <div className="text-xl font-semibold mb-1">Información de contacto</div>
        </div>
        <div className="divide-y">
          <div className="flex items-center px-8 py-5">
            <div className="flex-1">Correo electrónico</div>
            <div className="text-gray-900 font-medium">{user.email}</div>
            <button className="ml-4 text-gray-400 hover:text-blue-700"><ChevronRight size={20} /></button>
          </div>
          <div className="flex items-center px-8 py-5">
            <div className="flex-1">Teléfono</div>
            <div className="text-gray-900 font-medium">{user.telefono}</div>
            <button className="ml-4 text-gray-400 hover:text-blue-700"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );

  // Tarjeta de bienvenida para Inicio
  const renderInicio = () => (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-10">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
          <UserIcon size={36} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-1">Bienvenido, {user.nombre}</h1>
          <div className="text-gray-600">Gestiona tu información, privacidad y seguridad para mejorar tu experiencia en la plataforma.</div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow border p-8">
        <div className="text-xl font-semibold mb-2">Accesos rápidos</div>
        <div className="flex flex-wrap gap-4 mb-6 mt-4">
          <button className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 text-sm">Mi contraseña</button>
          <button className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 text-sm">Dispositivos</button>
          <button className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 text-sm">Mi actividad</button>
          <button className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 text-sm">Correo electrónico</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-gray-50 rounded-xl p-5 flex flex-col justify-between h-36">
            <div className="font-semibold mb-2">Almacenamiento de Reportes</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-blue-400 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <span className="text-xs text-gray-500">84,66 GB de 2 TB en uso</span>
            </div>
            <button className="text-blue-700 text-sm font-medium hover:underline self-start">Ver detalles</button>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 flex flex-col justify-between h-36">
            <div className="font-semibold mb-2">Privacidad y personalización</div>
            <div className="text-gray-600 text-sm mb-2">Consulta los datos almacenados y elige qué actividad se debe guardar para personalizar tu experiencia.</div>
            <button className="text-blue-700 text-sm font-medium hover:underline self-start">Gestionar privacidad</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Tarjeta de Datos y Privacidad
  const renderDatosPrivacidad = () => (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-2">Datos y privacidad</h1>
      <div className="text-gray-600 mb-8">Opciones clave de privacidad para ayudarte a elegir los datos que se guardan en tu cuenta, la información que compartes con otros usuarios y mucho más.</div>
      {/* Sugerencias de privacidad */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6">
          <div>
            <div className="text-xl font-semibold mb-1">Sugerencias de privacidad disponibles</div>
            <div className="text-gray-600 text-sm">Realiza la Revisión de Privacidad y elige la configuración adecuada para ti</div>
          </div>
          <div className="hidden md:block">
            <Security size={64} className="text-blue-400 opacity-30" />
          </div>
        </div>
        <div className="border-t px-8 py-4">
          <button className="text-blue-700 text-sm font-medium hover:underline">Revisar sugerencia (1)</button>
        </div>
      </div>
      {/* Opciones de privacidad */}
      <div className="mb-10">
        <div className="text-2xl font-semibold mb-4">Tus datos y opciones de privacidad</div>
        <div className="bg-white rounded-2xl shadow border divide-y">
          <button className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-gray-50">
            <span className="flex items-center gap-3"><ChevronDown size={20} className="text-blue-400" />Cosas que has hecho y lugares que has visitado</span>
          </button>
          <button className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-gray-50">
            <span className="flex items-center gap-3"><ChevronDown size={20} className="text-blue-400" />Información que puedes compartir con otras personas</span>
          </button>
          <button className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-gray-50">
            <span className="flex items-center gap-3"><ChevronDown size={20} className="text-blue-400" />Datos de aplicaciones y servicios que usas</span>
          </button>
        </div>
      </div>
      {/* Más opciones y bloques extra */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-2xl shadow border p-6 flex flex-col gap-3">
          <div className="text-lg font-semibold mb-2 flex items-center gap-2"><View size={22} className="text-blue-400" />¿Quieres obtener más información?</div>
          <button className="flex items-center gap-2 text-blue-700 hover:underline text-sm"><View size={18} />Quién puede ver tus datos</button>
          <button className="flex items-center gap-2 text-blue-700 hover:underline text-sm"><Globe size={18} />Cómo mejoran tus datos tu experiencia</button>
        </div>
        <div className="bg-white rounded-2xl shadow border p-6 flex flex-col gap-3">
          <div className="text-lg font-semibold mb-2 flex items-center gap-2"><Locked size={22} className="text-yellow-500" />Más opciones</div>
          <button className="flex items-center gap-2 text-blue-700 hover:underline text-sm"><Wallet size={18} />Métodos de pago</button>
          <button className="flex items-center gap-2 text-blue-700 hover:underline text-sm"><Notification size={18} />Suscripciones</button>
          <button className="flex items-center gap-2 text-blue-700 hover:underline text-sm"><Email size={18} />Tus dispositivos</button>
          <button className="flex items-center gap-2 text-blue-700 hover:underline text-sm"><UserIcon size={18} />Contactos</button>
        </div>
      </div>
      {/* Descargar o eliminar datos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-2xl shadow border p-6 flex flex-col gap-3">
          <div className="text-lg font-semibold mb-2 flex items-center gap-2"><Download size={22} className="text-blue-400" />Descargar o eliminar tus datos</div>
          <button className="flex items-center gap-2 text-blue-700 hover:underline text-sm"><Download size={18} />Descargar tus datos</button>
          <button className="flex items-center gap-2 text-blue-700 hover:underline text-sm"><TrashCan size={18} />Eliminar tu cuenta</button>
        </div>
      </div>
    </div>
  );

  // Tarjeta de Seguridad
  const renderSeguridad = () => (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-2">Seguridad</h1>
      <div className="text-gray-600 mb-8">Opciones y recomendaciones que te ayudan a proteger tu cuenta</div>
      {/* Consejos de seguridad */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6">
          <div>
            <div className="text-xl font-semibold mb-1">Hay consejos de seguridad para ti</div>
            <div className="text-gray-600 text-sm">Consejos de seguridad encontrados en la Revisión de Seguridad</div>
          </div>
          <div className="hidden md:block">
            <Security size={64} className="text-green-500 opacity-30" />
          </div>
        </div>
        <div className="border-t px-8 py-4">
          <button className="text-blue-700 text-sm font-medium hover:underline">Revisar consejos de seguridad</button>
        </div>
      </div>
      {/* Actividad reciente */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-0 overflow-hidden">
        <div className="px-8 py-6 border-b">
          <div className="text-xl font-semibold mb-1">Actividad relacionada con la seguridad reciente</div>
        </div>
        <div className="divide-y">
          <div className="flex items-center px-8 py-5 justify-between">
            <div>Nuevo inicio de sesión en Apple iPhone 14 Plus</div>
            <div className="text-gray-500 text-sm">8 jul · Jalisco, México</div>
          </div>
          <div className="flex items-center px-8 py-5 justify-between">
            <div>Nuevo inicio de sesión en Windows</div>
            <div className="text-gray-500 text-sm">3 jul · Jalisco, México</div>
          </div>
          <div className="flex items-center px-8 py-5 justify-between">
            <div>Nuevo inicio de sesión en Windows</div>
            <div className="text-gray-500 text-sm">24 jun</div>
          </div>
        </div>
        <div className="border-t px-8 py-4">
          <button className="text-blue-700 text-sm font-medium hover:underline">Revisar actividad de seguridad</button>
        </div>
      </div>
      {/* Métodos de inicio de sesión */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-0 overflow-hidden">
        <div className="px-8 py-6 border-b">
          <div className="text-xl font-semibold mb-1">Cómo inicias sesión</div>
          <div className="text-gray-500 text-sm">Asegúrate de poder acceder siempre a tu cuenta manteniendo al día esta información</div>
        </div>
        <div className="divide-y">
          <div className="flex items-center px-8 py-5 justify-between">
            <div className="flex items-center gap-2"><Security size={20} className="text-green-500" />Verificación en dos pasos</div>
            <div className="text-green-600 text-sm">Activa desde: 20 may</div>
          </div>
          <div className="flex items-center px-8 py-5 justify-between">
            <div className="flex items-center gap-2"><UserIcon size={20} className="text-gray-500" />Llaves de acceso y seguridad</div>
            <div className="text-blue-700 text-sm">Empezar a usar llaves de acceso</div>
          </div>
          <div className="flex items-center px-8 py-5 justify-between">
            <div className="flex items-center gap-2"><Locked size={20} className="text-gray-500" />Contraseña</div>
            <div className="text-gray-500 text-sm">Última modificación: 20 may</div>
          </div>
          <div className="flex items-center px-8 py-5 justify-between">
            <div className="flex items-center gap-2"><View size={20} className="text-gray-500" />Saltar contraseña cuando sea posible</div>
            <div className="text-gray-500 text-sm">Desactivado</div>
          </div>
          <div className="flex items-center px-8 py-5 justify-between">
            <div className="flex items-center gap-2"><Notification size={20} className="text-blue-500" />Notificación de la app</div>
            <div className="text-gray-500 text-sm">2 dispositivos</div>
          </div>
          <div className="flex items-center px-8 py-5 justify-between">
            <div className="flex items-center gap-2"><Email size={20} className="text-gray-500" />Correo de recuperación</div>
            <div className="text-gray-500 text-sm">tornadocosmico@protonmail.com</div>
          </div>
          <div className="flex items-center px-8 py-5 justify-between">
            <div className="flex items-center gap-2"><UserIcon size={20} className="text-gray-500" />Teléfono de recuperación</div>
            <div className="text-gray-500 text-sm">33 1497 4163</div>
          </div>
        </div>
      </div>
      {/* Dispositivos y conexiones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-2xl shadow border p-6 flex flex-col gap-3">
          <div className="text-lg font-semibold mb-2">Tus dispositivos</div>
          <div className="text-gray-500 text-sm mb-2">Dónde has iniciado sesión</div>
          <div className="flex items-center gap-2 mb-1"><View size={20} className="text-gray-500" />6 sesiones en Windows</div>
          <div className="flex items-center gap-2 mb-1"><Map size={20} className="text-gray-500" />4 sesiones en iPhone</div>
          <button className="mt-2 text-blue-700 text-sm font-medium hover:underline">Gestionar todos los dispositivos</button>
        </div>
        <div className="bg-white rounded-2xl shadow border p-6 flex flex-col gap-3">
          <div className="text-lg font-semibold mb-2">Tus conexiones con aplicaciones y servicios de terceros</div>
          <div className="text-gray-500 text-sm mb-2">Controla tus conexiones con aplicaciones y servicios de terceros</div>
          <div className="flex items-center gap-2 mb-1"><Notification size={20} className="text-gray-500" />C&A</div>
          <div className="flex items-center gap-2 mb-1"><Notification size={20} className="text-gray-500" />Canva</div>
          <div className="flex items-center gap-2 mb-1"><Notification size={20} className="text-gray-500" />DiDi</div>
          <button className="mt-2 text-blue-700 text-sm font-medium hover:underline">Ver todas las conexiones</button>
        </div>
      </div>
      {/* Navegación segura y dark web */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-2xl shadow border p-6 flex flex-col gap-3">
          <div className="text-lg font-semibold mb-2">Navegación segura mejorada para tu cuenta</div>
          <div className="text-gray-500 text-sm mb-2">Más protecciones personalizadas frente a descargas, extensiones y sitios web peligrosos.</div>
          <div className="flex items-center gap-2 mb-2"><View size={20} className="text-gray-500" />Desactivado</div>
          <button className="mt-2 text-blue-700 text-sm font-medium hover:underline">Gestionar Navegación segura mejorada</button>
        </div>
        <div className="bg-white rounded-2xl shadow border p-6 flex flex-col gap-3">
          <div className="text-lg font-semibold mb-2">Informe de dark web</div>
          <div className="text-gray-500 text-sm mb-2">Inicia la monitorización para recibir alertas e instrucciones si tu información se encuentra en la dark web</div>
          <div className="flex items-center gap-2 mb-2"><View size={20} className="text-gray-500" />Desactivado</div>
          <button className="mt-2 text-blue-700 text-sm font-medium hover:underline">Empezar</button>
        </div>
      </div>
      {/* Gestor de contraseñas */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6">
          <div>
            <div className="text-xl font-semibold mb-1">Gestor de contraseñas</div>
            <div className="text-gray-600 text-sm">No tienes ninguna contraseña guardada en tu cuenta. Con el gestor de contraseñas puedes iniciar sesión más fácilmente en los sitios web y apps que uses en los dispositivos en los que hayas iniciado sesión.</div>
          </div>
        </div>
        <div className="border-t px-8 py-4">
          <button className="text-blue-700 text-sm font-medium hover:underline">Gestionar contraseñas</button>
        </div>
      </div>
    </div>
  );

  // Tarjeta de Actividad
  const renderActividad = () => (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-2">Actividad</h1>
      <div className="text-gray-600 mb-8">Resumen de tu actividad reciente en la plataforma: vulnerabilidades reportadas, retos completados y progreso semanal.</div>
      {/* Gráfica de actividad semanal */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-8">
        <div className="text-xl font-semibold mb-4">Actividad semanal</div>
        <div className="flex items-end gap-4 h-32 w-full mb-4">
          {/* Mock de barras */}
          {[3, 5, 2, 7, 4, 6, 1].map((val, i) => (
            <div key={i} className="flex flex-col items-center w-8">
              <div className="bg-blue-400 rounded-t-lg" style={{ height: `${val * 16}px`, width: '100%' }}></div>
              <span className="text-xs text-gray-500 mt-1">{['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500">Barras: acciones realizadas cada día (reportes, soluciones, comentarios, etc.)</div>
      </div>
      {/* Tabla de vulnerabilidades reportadas */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-8">
        <div className="text-xl font-semibold mb-4">Vulnerabilidades reportadas</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Título</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4">#1023</td>
                <td className="py-2 pr-4">SQL Injection en login</td>
                <td className="py-2 pr-4 text-green-600 font-semibold">Resuelta</td>
                <td className="py-2 pr-4">2024-07-08</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">#1018</td>
                <td className="py-2 pr-4">XSS en comentarios</td>
                <td className="py-2 pr-4 text-yellow-600 font-semibold">Pendiente</td>
                <td className="py-2 pr-4">2024-07-05</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">#1009</td>
                <td className="py-2 pr-4">CSRF en pagos</td>
                <td className="py-2 pr-4 text-green-600 font-semibold">Resuelta</td>
                <td className="py-2 pr-4">2024-07-01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Tabla de retos completados */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-8">
        <div className="text-xl font-semibold mb-4">Retos completados</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4">Reto</th>
                <th className="py-2 pr-4">Categoría</th>
                <th className="py-2 pr-4">Puntos</th>
                <th className="py-2 pr-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4">Crypto101</td>
                <td className="py-2 pr-4">Criptografía</td>
                <td className="py-2 pr-4">100</td>
                <td className="py-2 pr-4">2024-07-07</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">WebExploit</td>
                <td className="py-2 pr-4">Web</td>
                <td className="py-2 pr-4">150</td>
                <td className="py-2 pr-4">2024-07-03</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">ForensicsFun</td>
                <td className="py-2 pr-4">Forense</td>
                <td className="py-2 pr-4">80</td>
                <td className="py-2 pr-4">2024-07-02</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Tarjeta de Información General
  const renderInformacionGeneral = () => (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-2">Información General</h1>
      <div className="text-gray-600 mb-8">Resumen general de tu cuenta: notificaciones, mensajes del sistema y uso de la plataforma.</div>
      {/* Gráfica de uso de la plataforma */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-8">
        <div className="text-xl font-semibold mb-4">Uso de la plataforma (últimos 7 días)</div>
        <div className="flex items-end gap-4 h-32 w-full mb-4">
          {[2, 4, 3, 6, 5, 3, 1].map((val, i) => (
            <div key={i} className="flex flex-col items-center w-8">
              <div className="bg-orange-400 rounded-t-lg" style={{ height: `${val * 16}px`, width: '100%' }}></div>
              <span className="text-xs text-gray-500 mt-1">{['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500">Barras: sesiones iniciadas, páginas visitadas, interacciones, etc.</div>
      </div>
      {/* Tabla de notificaciones recientes */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-8">
        <div className="text-xl font-semibold mb-4">Notificaciones recientes</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4">Fecha</th>
                <th className="py-2 pr-4">Tipo</th>
                <th className="py-2 pr-4">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4">2024-07-08</td>
                <td className="py-2 pr-4">Sistema</td>
                <td className="py-2 pr-4">Actualización de plataforma aplicada correctamente.</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">2024-07-07</td>
                <td className="py-2 pr-4">Alerta</td>
                <td className="py-2 pr-4">Nuevo reto disponible: Crypto101.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">2024-07-05</td>
                <td className="py-2 pr-4">Info</td>
                <td className="py-2 pr-4">Tu reporte #1023 fue resuelto.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Tabla de mensajes del sistema */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-8">
        <div className="text-xl font-semibold mb-4">Mensajes del sistema</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4">Fecha</th>
                <th className="py-2 pr-4">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4">2024-07-06</td>
                <td className="py-2 pr-4">Mantenimiento programado el 10 de julio de 2:00 a 4:00 AM.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">2024-07-03</td>
                <td className="py-2 pr-4">Nueva funcionalidad: gestor de contraseñas disponible.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Tarjeta de Idioma y Tema
  const renderIdiomaTema = () => (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-2">Idioma y tema</h1>
      <div className="text-gray-600 mb-8">Configura el idioma de la plataforma y el tema visual que prefieres para tu experiencia.</div>
      {/* Selector de idioma */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-8">
        <div className="text-xl font-semibold mb-4">Idioma de la plataforma</div>
        <select className="w-full max-w-xs rounded-lg border px-4 py-2 text-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2">
          <option>Español (ES)</option>
          <option>Inglés (EN)</option>
          <option>Francés (FR)</option>
          <option>Portugués (PT)</option>
        </select>
        <div className="text-sm text-gray-500">El idioma seleccionado se aplicará a toda la plataforma.</div>
      </div>
      {/* Selector de tema */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-8">
        <div className="text-xl font-semibold mb-4">Tema visual</div>
        <div className="flex gap-6 mb-2">
          <button className="px-6 py-2 rounded-lg border bg-gray-50 text-gray-800 font-medium hover:bg-blue-50 focus:bg-blue-100 focus:text-blue-700">Claro</button>
          <button className="px-6 py-2 rounded-lg border bg-gray-900 text-white font-medium hover:bg-blue-900 focus:bg-blue-800 focus:text-white">Oscuro</button>
        </div>
        <div className="text-sm text-gray-500">Puedes cambiar entre modo claro y oscuro en cualquier momento.</div>
      </div>
      {/* Tabla de preferencias visuales */}
      <div className="bg-white rounded-2xl shadow border mb-8 p-8">
        <div className="text-xl font-semibold mb-4">Preferencias visuales</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4">Preferencia</th>
                <th className="py-2 pr-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4">Animaciones</td>
                <td className="py-2 pr-4 text-green-600 font-semibold">Activadas</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Contraste alto</td>
                <td className="py-2 pr-4 text-gray-500 font-semibold">Desactivado</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Mostrar tooltips</td>
                <td className="py-2 pr-4 text-green-600 font-semibold">Activado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r flex flex-col py-10 px-0 shadow-sm z-20 relative">
        <nav className="flex-1 flex flex-col gap-1 mt-2">
          {sections.map(({ label, icon: Icon, iconColor }, idx) => (
            <div
              key={label}
              ref={label === 'Inicio' ? inicioRef : undefined}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(label)}
            >
              <button
                className={
                  `w-full flex items-center gap-4 px-8 py-4 text-lg font-medium transition-colors duration-200 text-left ` +
                  ((selected === label || hovered === label)
                    ? 'bg-blue-100 text-blue-700 rounded-full'
                    : 'bg-white text-gray-900')
                }
              >
                <span className={`rounded-full p-2 ${selected === label || hovered === label ? 'bg-white text-blue-700' : 'bg-gray-100 text-gray-700'}`}><Icon size={28} /></span>
                {label}
              </button>
            </div>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center bg-gray-50 min-h-screen">
        {/* Header de usuario grande */}
        <div className="w-full flex flex-col items-center justify-center bg-white shadow-md border-b px-0 pt-0 pb-0 mb-0 relative">
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-end gap-8 px-12 pt-12 pb-8">
            <img src={user.avatar} alt="avatar" className="w-32 h-32 rounded-full border-4 border-blue-200 shadow" />
            <div className="flex-1">
              <div className="font-bold text-3xl mb-1">{user.nombre}</div>
              <div className="text-blue-600 font-semibold text-xl mb-1">@{user.nickname}</div>
              <div className="text-gray-500 text-lg">{user.email}</div>
            </div>
            <button className="bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors text-lg">Gestionar cuenta</button>
          </div>
        </div>
        {/* Renderiza la pestaña de inicio, información personal, datos y privacidad, seguridad, actividad, información general o idioma y tema según selección */}
        {selected === 'Inicio' && renderInicio()}
        {selected === 'Informacion Personal' && renderPersonalInfo()}
        {selected === 'Datos Y Privacidad' && renderDatosPrivacidad()}
        {selected === 'Seguridad' && renderSeguridad()}
        {selected === 'Actividad' && renderActividad()}
        {selected === 'Informacion General' && renderInformacionGeneral()}
        {selected === 'Idioma y tema' && renderIdiomaTema()}
      </main>
    </div>
  );
};

export default SettingsLayout; 