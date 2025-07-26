import React, { useState } from 'react';
import { Button, TextInput } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';

const initialUser = {
  username: 'juanperez',
  fullName: 'Juan Pérez',
  email: 'juan.perez@email.com',
  phone: '+52 123 456 7890',
  birthdate: '1990-01-01',
};

const Settings: React.FC = () => {
  const [user, setUser] = useState(initialUser);
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const navigate = useNavigate();

  // Guardar el cambio directamente
  const handleSave = () => {
    if (editField) {
      setUser((prev) => ({ ...prev, [editField]: editValue }));
    }
    setEditField(null);
  };

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto px-2 md:px-4 py-8 min-h-screen bg-white">
        <h1 className="text-3xl font-bold text-black mb-8">Configuración</h1>
        <div className="flex flex-col w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Ajustes de Usuario</h2>
        <table className="w-full text-left mb-8">
          <tbody>
            <tr>
              <th className="py-2 pr-4 text-gray-800 font-semibold">Nombre de usuario</th>
              <td className="py-2 text-gray-900 font-medium">{user.username}</td>
              <td className="py-2 text-right text-gray-500 font-semibold">No editable</td>
            </tr>
            <tr>
              <th className="py-2 pr-4 text-gray-800 font-semibold">Nombre completo</th>
              <td className="py-2 text-gray-900 font-medium">{editField === 'fullName' ? (
                <TextInput
                  id="fullName"
                  labelText="Nombre completo"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  className="w-full"
                />
              ) : user.fullName}</td>
              <td className="py-2 text-right">
                {editField === 'fullName' ? (
                  <>
                    <Button size="sm" kind="primary" onClick={handleSave} className="font-semibold">Guardar</Button>
                    <Button size="sm" kind="ghost" onClick={() => setEditField(null)} className="ml-2 font-semibold text-gray-700">Cancelar</Button>
                  </>
                ) : (
                  <Button size="sm" kind="ghost" onClick={() => { setEditField('fullName'); setEditValue(user.fullName); }} className="font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50">Editar</Button>
                )}
              </td>
            </tr>
            <tr>
              <th className="py-2 pr-4 text-gray-800 font-semibold">Email</th>
              <td className="py-2 text-gray-900 font-medium">{editField === 'email' ? (
                <TextInput
                  id="email"
                  labelText="Email"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  className="w-full"
                  type="email"
                />
              ) : user.email}</td>
              <td className="py-2 text-right">
                {editField === 'email' ? (
                  <>
                    <Button size="sm" kind="primary" onClick={handleSave} className="font-semibold">Guardar</Button>
                    <Button size="sm" kind="ghost" onClick={() => setEditField(null)} className="ml-2 font-semibold text-gray-700">Cancelar</Button>
                  </>
                ) : (
                  <Button size="sm" kind="ghost" onClick={() => { setEditField('email'); setEditValue(user.email); }} className="font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50">Editar</Button>
                )}
              </td>
            </tr>
            <tr>
              <th className="py-2 pr-4 text-gray-800 font-semibold">Teléfono</th>
              <td className="py-2 text-gray-900 font-medium">{editField === 'phone' ? (
                <TextInput
                  id="phone"
                  labelText="Teléfono"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  className="w-full"
                  type="tel"
                />
              ) : user.phone}</td>
              <td className="py-2 text-right">
                {editField === 'phone' ? (
                  <>
                    <Button size="sm" kind="primary" onClick={handleSave} className="font-semibold">Guardar</Button>
                    <Button size="sm" kind="ghost" onClick={() => setEditField(null)} className="ml-2 font-semibold text-gray-700">Cancelar</Button>
                  </>
                ) : (
                  <Button size="sm" kind="ghost" onClick={() => { setEditField('phone'); setEditValue(user.phone); }} className="font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50">Editar</Button>
                )}
              </td>
            </tr>
            <tr>
              <th className="py-2 pr-4 text-gray-800 font-semibold">Fecha de nacimiento</th>
              <td className="py-2 text-gray-900 font-medium">{editField === 'birthdate' ? (
                <TextInput
                  id="birthdate"
                  labelText="Fecha de nacimiento"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  className="w-full"
                  type="date"
                />
              ) : user.birthdate}</td>
              <td className="py-2 text-right">
                {editField === 'birthdate' ? (
                  <>
                    <Button size="sm" kind="primary" onClick={handleSave} className="font-semibold">Guardar</Button>
                    <Button size="sm" kind="ghost" onClick={() => setEditField(null)} className="ml-2 font-semibold text-gray-700">Cancelar</Button>
                  </>
                ) : (
                  <Button size="sm" kind="ghost" onClick={() => { setEditField('birthdate'); setEditValue(user.birthdate); }} className="font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50">Editar</Button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        <div className="flex justify-center mt-6">
          <button className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-800 transition text-lg mb-4" onClick={() => navigate('/auth/login')}>Cerrar Sesión</button>
        </div>
        <div className="flex justify-center mt-2 mb-10">
          <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition text-lg">Solicitar Eliminación de cuenta</button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings; 