import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

// Datos mock de notificaciones
const mockNotifications = [
  {
    id: 1,
    title: 'Nuevo Reto Disponible',
    preview: 'Se ha lanzado un nuevo reto de seguridad web. ¡Participa ahora!',
    content: 'Se ha lanzado un nuevo reto de seguridad web llamado "SQL Injection Master". Este reto te pondrá a prueba con técnicas avanzadas de inyección SQL. Los mejores participantes recibirán puntos extra y podrían ser considerados para el equipo de seguridad.',
    time: 'Hace 5 minutos',
    read: false,
    type: 'challenge'
  },
  {
    id: 2,
    title: 'Te Han Desafiado',
    preview: 'Alex Turner te ha desafiado a un duelo 1v1',
    content: 'Alex Turner del equipo Consulting te ha desafiado a un duelo 1v1. El duelo comenzará en 24 horas y tendrá una duración de 10 días. Prepárate para demostrar tus habilidades de hacking ético.',
    time: 'Hace 1 hora',
    read: false,
    type: 'duel'
  },
  {
    id: 3,
    title: 'Tu Equipo Ganó',
    preview: '¡Felicidades! Tu equipo ha ganado el torneo semanal',
    content: '¡Felicidades! Tu equipo "CyberWolves" ha ganado el torneo semanal de vulnerabilidades. Han resuelto 15 vulnerabilidades críticas y 23 vulnerabilidades altas. Como premio, cada miembro recibirá 500 puntos extra.',
    time: 'Hace 3 horas',
    read: true,
    type: 'victory'
  },
  {
    id: 4,
    title: 'Nueva Insignia Desbloqueada',
    preview: 'Has desbloqueado la insignia "Hacker Ético Nivel 3"',
    content: '¡Excelente trabajo! Has desbloqueado la insignia "Hacker Ético Nivel 3" por resolver más de 50 vulnerabilidades críticas. Esta insignia te da acceso a retos especiales y te posiciona como uno de los mejores hackers éticos de la plataforma.',
    time: 'Hace 1 día',
    read: true,
    type: 'badge'
  },
  {
    id: 5,
    title: 'Mantenimiento Programado',
    preview: 'La plataforma estará en mantenimiento mañana de 2:00 AM a 4:00 AM',
    content: 'Informamos que la plataforma estará en mantenimiento mañana de 2:00 AM a 4:00 AM (GMT-6). Durante este tiempo, no podrás acceder a los retos ni participar en duelos. Agradecemos tu paciencia.',
    time: 'Hace 2 días',
    read: false,
    type: 'maintenance'
  },
  {
    id: 6,
    title: 'Nuevo Miembro en tu Equipo',
    preview: 'Sarah Johnson se ha unido a tu equipo',
    content: 'Sarah Johnson se ha unido a tu equipo "CyberWolves". Sarah es especialista en análisis forense digital y tiene experiencia en respuesta a incidentes. ¡Dale la bienvenida al equipo!',
    time: 'Hace 3 días',
    read: true,
    type: 'team'
  }
];

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ open, onClose, onUnreadCountChange }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState(mockNotifications[0]);

  // Bloquear scroll del body cuando la modal está abierta
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Marcar notificación como leída
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Eliminar notificación
  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    if (selectedNotification.id === id) {
      const remainingNotifications = notifications.filter(notif => notif.id !== id);
      if (remainingNotifications.length > 0) {
        setSelectedNotification(remainingNotifications[0]);
      }
    }
  };

  // Contar notificaciones no leídas
  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Actualizar el contador en el navbar cuando cambie
  useEffect(() => {
    if (onUnreadCountChange) {
      onUnreadCountChange(unreadCount);
    }
  }, [unreadCount, onUnreadCountChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-2xl w-4/5 h-4/5 flex flex-col border-2 border-black">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6" />
            <span className="font-bold text-xl">Notificaciones</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-2xl font-bold"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Panel izquierdo - Lista de notificaciones */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedNotification.id === notification.id
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  } ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => {
                    setSelectedNotification(notification);
                    if (!notification.read) {
                      markAsRead(notification.id);
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold text-sm ${!notification.read ? 'text-blue-600' : 'text-gray-800'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 text-xs line-clamp-2">
                        {notification.preview}
                      </p>
                      <span className="text-gray-400 text-xs mt-1 block">
                        {notification.time}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-red-500 text-xs ml-2"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel derecho - Contenido completo */}
          <div className="flex-1 flex flex-col">
            {selectedNotification ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedNotification.title}
                    </h2>
                    <span className="text-gray-400 text-sm">
                      {selectedNotification.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedNotification.type === 'challenge' ? 'bg-green-100 text-green-800' :
                      selectedNotification.type === 'duel' ? 'bg-red-100 text-red-800' :
                      selectedNotification.type === 'victory' ? 'bg-yellow-100 text-yellow-800' :
                      selectedNotification.type === 'badge' ? 'bg-purple-100 text-purple-800' :
                      selectedNotification.type === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedNotification.type === 'challenge' ? 'Reto' :
                       selectedNotification.type === 'duel' ? 'Duelo' :
                       selectedNotification.type === 'victory' ? 'Victoria' :
                       selectedNotification.type === 'badge' ? 'Insignia' :
                       selectedNotification.type === 'maintenance' ? 'Mantenimiento' : 'Equipo'}
                    </span>
                    {!selectedNotification.read && (
                      <span className="text-blue-600 text-xs font-semibold">No leída</span>
                    )}
                  </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedNotification.content}
                  </p>
                </div>
                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={() => deleteNotification(selectedNotification.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Eliminar Notificación
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>No hay notificaciones seleccionadas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal; 