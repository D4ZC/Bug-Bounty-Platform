import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [language, setLanguage] = useState('es');
  const [theme, setTheme] = useState('light');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Configuración de la Cuenta</h2>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Preferencias</h3>
        <div className="flex gap-8 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Idioma</label>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="border rounded-lg px-3 py-2">
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tema</label>
            <select value={theme} onChange={e => setTheme(e.target.value)} className="border rounded-lg px-3 py-2">
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Notificaciones</h3>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={emailNotifications} onChange={e => setEmailNotifications(e.target.checked)} />
            Notificaciones por email
              </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={pushNotifications} onChange={e => setPushNotifications(e.target.checked)} />
            Notificaciones push
              </label>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Seguridad</h3>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600">Eliminar cuenta</button>
      </div>
    </div>
  );
};

export default Settings; 