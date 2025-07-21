import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const notifications = [
  {
    type: 'warning',
    title: 'Reporte rechazado',
    message: 'Tu reporte "SQL Injection en login" fue rechazado por el equipo de revisión.',
    time: 'Hace 2 minutos',
  },
  {
    type: 'like',
    title: '¡Nuevo like!',
    message: 'El usuario @security_guru le dio like a tu reporte "XSS en comentarios".',
    time: 'Hace 5 minutos',
  },
  {
    type: 'dislike',
    title: 'Dislike recibido',
    message: 'El usuario @pentester99 le dio dislike a tu reporte "CSRF en perfil".',
    time: 'Hace 10 minutos',
  },
  {
    type: 'update',
    title: 'Actualización de la plataforma',
    message: 'Se han agregado nuevas funciones al panel de reportes.',
    time: 'Hace 30 minutos',
  },
  {
    type: 'maintenance',
    title: 'Cerrado por mantenimiento',
    message: 'La plataforma estará en mantenimiento el 10/06 de 2:00 a 4:00 AM.',
    time: 'Hace 1 hora',
  },
  {
    type: 'info',
    title: 'Nuevo desafío disponible',
    message: 'Participa en el reto "Bug Hunter del Mes" y gana recompensas.',
    time: 'Hace 2 horas',
  },
  {
    type: 'success',
    title: 'Reporte aceptado',
    message: '¡Felicidades! Tu reporte "IDOR en transferencias" fue aceptado.',
    time: 'Hace 3 horas',
  },
  {
    type: 'warning',
    title: 'Advertencia de conducta',
    message: 'Recibiste una advertencia por lenguaje inapropiado en los comentarios.',
    time: 'Hace 4 horas',
  },
  {
    type: 'like',
    title: '¡Nuevo like!',
    message: 'El usuario @admin le dio like a tu contribución en el foro.',
    time: 'Hace 5 horas',
  },
  {
    type: 'update',
    title: 'Actualización de términos',
    message: 'Se actualizaron los términos y condiciones de la plataforma.',
    time: 'Hace 6 horas',
  },
  {
    type: 'info',
    title: 'Nuevo mensaje',
    message: 'Tienes un nuevo mensaje del equipo de soporte.',
    time: 'Hace 7 horas',
  },
  {
    type: 'success',
    title: 'Desafío completado',
    message: 'Completaste el desafío "Encuentra el bug oculto".',
    time: 'Hace 8 horas',
  },
];

const typeStyles = {
  warning: 'border-yellow-400 bg-yellow-50 text-yellow-800',
  like: 'border-green-400 bg-green-50 text-green-800',
  dislike: 'border-red-400 bg-red-50 text-red-800',
  update: 'border-blue-400 bg-blue-50 text-blue-800',
  maintenance: 'border-purple-400 bg-purple-50 text-purple-800',
  info: 'border-cyan-400 bg-cyan-50 text-cyan-800',
  success: 'border-emerald-400 bg-emerald-50 text-emerald-800',
};

const notifStats = {
  total: notifications.length,
  likes: notifications.filter(n => n.type === 'like').length,
  warnings: notifications.filter(n => n.type === 'warning').length,
  success: notifications.filter(n => n.type === 'success').length,
};
const notifAchievements = [
  { icon: '🔔', label: '10+ notificaciones recibidas' },
  { icon: '👍', label: '5 likes en reportes' },
  { icon: '✅', label: '3 éxitos recientes' },
];
const notifTips = [
  'Revisa tus notificaciones regularmente para no perderte novedades.',
  'Marca como leídas las notificaciones importantes.',
  'Configura tus preferencias para recibir solo lo que te interesa.',
];
const allTypes = Array.from(new Set(notifications.map(n => n.type)));
const featuredNotifs = notifications.filter(n => n.type === 'success' || n.type === 'like').slice(0, 3);

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [typeFilter, setTypeFilter] = useState('');
  const filteredNotifs = notifications.filter(n => !typeFilter || n.type === typeFilter);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner motivacional */}
      <div className="mb-8 bg-gradient-to-r from-blue-200 via-green-100 to-yellow-100 rounded-lg shadow p-6 flex flex-col items-center animate-in fade-in duration-300">
        <span className="text-3xl mb-2">🔔</span>
        <span className="font-bold text-blue-900 text-xl mb-1">¡Mantente informado!</span>
        <span className="text-gray-700 text-sm text-center">Revisa tus notificaciones para estar al día con la plataforma.</span>
      </div>
      {/* Estadísticas y logros */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-blue-700">{notifStats.total}</span>
          <span className="text-xs text-gray-600">Total</span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-green-700">{notifStats.likes}</span>
          <span className="text-xs text-gray-600">Likes</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-yellow-700">{notifStats.warnings}</span>
          <span className="text-xs text-gray-600">Advertencias</span>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 flex flex-col items-center shadow">
          <span className="text-2xl font-bold text-emerald-700">{notifStats.success}</span>
          <span className="text-xs text-gray-600">Éxitos</span>
        </div>
      </div>
      {/* Badges de logros */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-center">
        {notifAchievements.map((a, i) => (
          <div key={i} className="flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 shadow text-green-800 font-semibold text-sm">
            <span className="text-xl">{a.icon}</span> {a.label}
          </div>
        ))}
      </div>
      {/* Filtros por tipo */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <select className="border rounded px-3 py-1 text-sm" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">Todos los tipos</option>
          {allTypes.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      {/* Notificaciones destacadas */}
      <div className="mb-8 bg-yellow-50 rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">⭐ Notificaciones destacadas</h3>
        <ul className="flex flex-wrap gap-4">
          {featuredNotifs.map((n, i) => (
            <li key={i} className="flex flex-col items-center bg-white rounded-lg p-3 min-w-[180px] shadow">
              <span className="font-bold text-yellow-900 text-sm mb-1">{n.title}</span>
              <span className="text-gray-700 text-xs text-center mb-1">{n.message}</span>
              <span className="text-xs text-gray-500">{n.time}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Tips de uso */}
      <div className="mb-8 bg-green-50 rounded-lg shadow p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">💡 Tips de uso</h3>
        <ul className="list-disc ml-6 text-green-900 text-sm flex flex-col gap-1">
          {notifTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Notificaciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotifs.map((notif, idx) => (
          <div
            key={idx}
            className={`border-l-4 p-5 rounded-lg shadow-sm mb-2 ${typeStyles[notif.type as keyof typeof typeStyles]} bg-white`}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold">{notif.title}</h3>
              <span className="text-xs text-gray-400">{notif.time}</span>
            </div>
            <p className="text-sm">{notif.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
