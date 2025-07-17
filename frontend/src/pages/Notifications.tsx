import React from 'react';

const notifications = [
  { id: 1, message: 'Nueva vulnerabilidad reportada', date: '2024-06-01' },
  { id: 2, message: 'Tu contribución fue aceptada', date: '2024-06-02' },
  { id: 3, message: 'Nuevo mensaje del equipo', date: '2024-06-03' },
];

const Notifications: React.FC = () => (
  <div className="flex flex-col w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
    <h2 className="text-2xl font-bold mb-4">Notificaciones</h2>
    {notifications.length === 0 ? (
      <div className="text-gray-500">No tienes notificaciones.</div>
    ) : (
      <ul className="space-y-4">
        {notifications.map((n) => (
          <li key={n.id} className="border-b border-gray-200 pb-2">
            <div className="font-medium">{n.message}</div>
            <div className="text-xs text-gray-400">{n.date}</div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Notifications; 