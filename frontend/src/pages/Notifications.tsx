import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaBullhorn, FaFlag, FaEnvelope, FaTrash, FaCircle } from 'react-icons/fa';
import type { IconType } from 'react-icons';

// Tipos de notificación
const NOTIF_TYPES: Record<string, { icon: JSX.Element; label: string }> = {
  success: { icon: <FaCheckCircle style={{ color: '#4ade80' }} />, label: 'Éxito' },
  error: { icon: <FaExclamationCircle style={{ color: '#f87171' }} />, label: 'Error' },
  info: { icon: <FaInfoCircle style={{ color: '#60a5fa' }} />, label: 'Info' },
  announcement: { icon: <FaBullhorn style={{ color: '#facc15' }} />, label: 'Anuncio' },
  challenge: { icon: <FaFlag style={{ color: '#a78bfa' }} />, label: 'Desafío' },
  message: { icon: <FaEnvelope style={{ color: '#f472b6' }} />, label: 'Mensaje' },
};

// Datos mock de notificaciones
const mockNotifications = [
  {
    id: 1,
    type: 'success',
    title: "¡Bandera capturada en 'Desafío X'!",
    detail: 'Has sido el primero en capturar la bandera del reto.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // hace 5 minutos
    read: false,
    context: 'Desafío Web',
    link: '/challenges',
  },
  {
    id: 2,
    type: 'challenge',
    title: "Nuevo desafío disponible: 'Inyección SQL Avanzada'",
    detail: 'Participa para ganar puntos extra.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // hace 1 hora
    read: false,
    context: 'Desafíos',
    link: '/challenges',
  },
  {
    id: 3,
    type: 'announcement',
    title: 'Anuncio: El mantenimiento programado ha finalizado.',
    detail: 'La plataforma ya está disponible.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // hace 2 horas
    read: true,
    context: 'Anuncios del Administrador',
    link: '/dashboard',
  },
  {
    id: 4,
    type: 'error',
    title: "Tu equipo ha enviado una bandera incorrecta para 'Desafío Y'.",
    detail: 'Intenta revisar la pista y vuelve a intentarlo.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // hace 1 día
    read: false,
    context: 'Desafío Web',
    link: '/challenges',
  },
  {
    id: 5,
    type: 'message',
    title: 'Has recibido un mensaje privado de Alice.',
    detail: '¡Felicidades por tu progreso!',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // hace 2 días
    read: true,
    context: 'Mensajes',
    link: '/profile',
  },
];

function timeAgo(date: Date) {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `hace ${diff} seg.`;
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min.`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h.`;
  if (diff < 172800) return 'ayer';
  return date.toLocaleDateString();
}

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [typeFilters, setTypeFilters] = useState(Object.keys(NOTIF_TYPES));
  const [statusFilter, setStatusFilter] = useState('all'); // all, read, unread
  // Preferencias de notificación (simuladas)
  const [preferences, setPreferences] = useState({
    types: Object.keys(NOTIF_TYPES),
    feed: true,
    toast: true,
    doNotDisturb: false,
  });

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };
  const deleteNotif = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Filtrado
  const filteredNotifications = notifications.filter((notif) => {
    const typeMatch = typeFilters.includes(notif.type);
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'read' && notif.read) ||
      (statusFilter === 'unread' && !notif.read);
    return typeMatch && statusMatch;
  });

  // Paginación
  const PAGE_SIZE = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredNotifications.length / PAGE_SIZE);
  const paginatedNotifications = filteredNotifications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Resetear página si cambian los filtros
  React.useEffect(() => {
    setPage(1);
  }, [typeFilters, statusFilter, notifications.length]);

  const handleTypeChange = (type: string) => {
    setTypeFilters((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handlePrefTypeChange = (type: string) => {
    setPreferences((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };
  const handlePrefChange = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#181A20] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Notificaciones</h1>
      {/* Filtros de notificaciones (solo estado) */}
      <section className="mb-6">
        <div className="flex flex-wrap gap-6 items-center">
          {/* Filtro por estado */}
          <div className="flex gap-3 items-center">
            <span className="font-semibold text-blue-200 mr-2">Estado:</span>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="all"
                checked={statusFilter === 'all'}
                onChange={() => setStatusFilter('all')}
                className="accent-blue-400"
              />
              <span className="text-xs text-blue-100">Todas</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="unread"
                checked={statusFilter === 'unread'}
                onChange={() => setStatusFilter('unread')}
                className="accent-blue-400"
              />
              <span className="text-xs text-blue-100">No leídas</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="read"
                checked={statusFilter === 'read'}
                onChange={() => setStatusFilter('read')}
                className="accent-blue-400"
              />
              <span className="text-xs text-blue-100">Leídas</span>
            </label>
          </div>
        </div>
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold shadow disabled:opacity-50"
            onClick={markAllAsRead}
            disabled={notifications.every(n => n.read)}
          >
            Marcar todo como leído
          </button>
        </div>
      </section>
      {/* Feed de notificaciones */}
      <section className="mb-8">
        <ul className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <li className="text-gray-400">No tienes notificaciones.</li>
          ) : (
            paginatedNotifications.map((notif) => (
              <li
                key={notif.id}
                className={`flex items-start gap-4 p-4 rounded-lg border border-gray-700 shadow transition bg-[#23263a] relative ${notif.read ? 'opacity-70' : 'bg-opacity-100'}`}
              >
                <div className="mt-1">{NOTIF_TYPES[notif.type]?.icon || <FaInfoCircle />}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">{notif.title}</span>
                    {!notif.read && <FaCircle className="text-blue-400 text-xs animate-pulse" title="No leída" />}
                  </div>
                  <div className="text-sm text-blue-200 mb-1">{notif.context} • {timeAgo(notif.timestamp)}</div>
                  <div className="text-sm text-gray-200">
                    {expanded === notif.id ? notif.detail : notif.detail.slice(0, 60) + (notif.detail.length > 60 ? '...' : '')}
                    {notif.detail.length > 60 && (
                      <button
                        className="ml-2 text-blue-400 underline text-xs"
                        onClick={() => setExpanded(expanded === notif.id ? null : notif.id)}
                      >
                        {expanded === notif.id ? 'Ver menos' : 'Ver más'}
                      </button>
                    )}
                  </div>
                  <div className="mt-2 flex gap-3">
                    <a
                      href={notif.link}
                      className="text-blue-400 hover:underline text-sm font-medium"
                    >
                      Ir al contexto
                    </a>
                    {!notif.read && (
                      <button
                        className="text-green-400 hover:underline text-sm font-medium"
                        onClick={() => markAsRead(notif.id)}
                      >
                        Marcar como leída
                      </button>
                    )}
                  </div>
                </div>
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
                  onClick={() => deleteNotif(notif.id)}
                  title="Eliminar notificación"
                >
                  <FaTrash />
                </button>
              </li>
            ))
          )}
        </ul>
        {/* Controles de paginación */}
        {filteredNotifications.length > PAGE_SIZE && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span className="text-blue-200">Página {page} de {totalPages}</span>
            <button
              className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
      {/* Configuración de preferencias de notificación */}
      <section className="mt-10 border-t border-gray-700 pt-6">
        <h2 className="text-2xl font-semibold mb-4">Preferencias de Notificación</h2>
        <div className="space-y-4 max-w-xl">
          {/* Tipos de notificación a mostrar */}
          <div>
            <div className="font-semibold text-blue-200 mb-2">Tipos de notificación a mostrar:</div>
            <div className="flex flex-wrap gap-4">
              {Object.entries(NOTIF_TYPES).map(([type, { icon, label }]) => (
                <label key={type} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.types.includes(type)}
                    onChange={() => handlePrefTypeChange(type)}
                    className="accent-blue-400"
                  />
                  <span className="text-sm">{icon}</span>
                  <span className="text-xs text-blue-100">{label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Método de notificación */}
          <div>
            <div className="font-semibold text-blue-200 mb-2">Método de notificación:</div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.feed}
                onChange={() => handlePrefChange('feed')}
                className="accent-blue-400"
              />
              <span className="text-xs text-blue-100">En el feed</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer ml-6">
              <input
                type="checkbox"
                checked={preferences.toast}
                onChange={() => handlePrefChange('toast')}
                className="accent-blue-400"
              />
              <span className="text-xs text-blue-100">Notificaciones emergentes (toast)</span>
            </label>
          </div>
          {/* No molestar */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <span className="font-semibold text-blue-200">No molestar</span>
              <span className="relative inline-block w-10 align-middle select-none">
                <input
                  type="checkbox"
                  checked={preferences.doNotDisturb}
                  onChange={() => handlePrefChange('doNotDisturb')}
                  className="absolute block w-6 h-6 rounded-full bg-blue-400 border-4 appearance-none cursor-pointer transition-all duration-200 checked:translate-x-4"
                  style={{ left: 0, top: 0 }}
                />
                <span className={`block overflow-hidden h-6 rounded-full bg-gray-600 transition-all duration-200 ${preferences.doNotDisturb ? 'bg-blue-500' : 'bg-gray-600'}`}></span>
              </span>
              <span className="text-xs text-blue-100">Pausar todas las notificaciones visuales</span>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notifications; 