import React from 'react';
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

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Notificaciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notifications.map((notif, idx) => (
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
