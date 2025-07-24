import React from 'react';
import { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';

const notifications = [
  { id: 1, message: 'Nueva vulnerabilidad reportada', date: '2024-06-01', category: 'Vulnerabilidad' },
  { id: 2, message: 'Tu contribución fue aceptada', date: '2024-06-02', category: 'Contribución' },
  { id: 3, message: 'Nuevo mensaje del equipo', date: '2024-06-03', category: 'Mensaje' },
];

const categories = ['Todas', 'Vulnerabilidad', 'Contribución', 'Mensaje'];

const Notifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const filtered = selectedCategory === 'Todas' ? notifications : notifications.filter(n => n.category === selectedCategory);
  return (
    <MainLayout>
      <div className="flex flex-col w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-black">Notificaciones</h2>
          <select
            className="px-3 py-2 border border-gray-300 rounded text-black bg-white focus:outline-none"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        {filtered.length === 0 ? (
          <div className="text-black">No tienes notificaciones.</div>
      ) : (
        <ul className="space-y-4">
            {filtered.map((n) => (
            <li key={n.id} className="border-b border-gray-200 pb-2">
                <div className="font-medium text-black">{n.message}</div>
                <div className="text-xs text-black">{n.date}</div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </MainLayout>
  );
};

export default Notifications; 