import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import apiService from '@/services/api';

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState<'edit' | 'delete' | 'bluepoints' | null>(null);
  const [bluePoints, setBluePoints] = useState(0);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('user');
  const [error, setError] = useState('');

  // Cargar usuarios reales al montar
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiService.getAllUsers();
      setUsers(res.data || []);
    } catch (err) {
      setError('Error al cargar usuarios');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setBluePoints(0);
    if (type === 'edit') {
      setEditName(user.username);
      setEditRole(user.role);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
    setBluePoints(0);
    setEditName('');
    setEditRole('user');
  };

  const handleDelete = async () => {
    try {
      await apiService.deleteUser(selectedUser._id);
      setUsers(users.filter(u => u._id !== selectedUser._id));
      closeModal();
    } catch (err) {
      setError('Error al eliminar usuario');
    }
  };

  const handleEdit = async () => {
    try {
      const res = await apiService.editUser(selectedUser._id, { username: editName, role: editRole });
      setUsers(users.map(u =>
        u._id === selectedUser._id ? { ...u, username: res.data.username, role: res.data.role } : u
      ));
      closeModal();
    } catch (err) {
      setError('Error al editar usuario');
    }
  };

  const handleAssignBluePoints = async () => {
    if (bluePoints > 0) {
      try {
        const res = await apiService.assignBluePoints(selectedUser._id, bluePoints);
        setUsers(users.map(u =>
          u._id === selectedUser._id ? { ...u, points: res.data.points } : u
        ));
        closeModal();
      } catch (err) {
        setError('Error al asignar Blue Points');
      }
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-cyan-400 drop-shadow">Panel de Administración</h1>
        </div>
        {error && <div className="bg-red-700 text-white px-4 py-2 mb-4 rounded">{error}</div>}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar usuario por nombre o email..."
            className="border px-3 py-2 rounded w-full max-w-md bg-gray-900 text-white placeholder-gray-400"
            disabled={loading}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={fetchUsers} disabled={loading}>Refrescar</button>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          {loading ? (
            <div className="text-center py-10 text-cyan-300">Cargando usuarios...</div>
          ) : (
            <table className="min-w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Rol</th>
                  <th className="px-4 py-2">Fecha de registro</th>
                  <th className="px-4 py-2">Blue Points</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                    <td className="px-4 py-2 font-semibold">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className={`px-4 py-2 ${user.role === 'admin' ? 'text-yellow-400 font-bold' : ''}`}>{user.role}</td>
                    <td className="px-4 py-2">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</td>
                    <td className="px-4 py-2 text-blue-400 font-bold">{user.points || 0}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs shadow" onClick={() => openModal(user, 'edit')}>Editar</button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs shadow" onClick={() => openModal(user, 'delete')}>Eliminar</button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs shadow" onClick={() => openModal(user, 'bluepoints')}>Asignar Blue Points</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modales */}
        {modalType && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-8 shadow-lg max-w-md w-full text-white relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={closeModal}>&times;</button>
              {modalType === 'edit' && (
                <>
                  <h2 className="text-xl font-bold mb-4">Editar usuario</h2>
                  <label className="block mb-2">Nombre:</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="border px-3 py-2 rounded w-full mb-4 text-black"
                  />
                  <label className="block mb-2">Rol:</label>
                  <select
                    value={editRole}
                    onChange={e => setEditRole(e.target.value)}
                    className="border px-3 py-2 rounded w-full mb-4 text-black"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                  <div className="mt-4 flex justify-end">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={handleEdit}>Guardar</button>
                  </div>
                </>
              )}
              {modalType === 'delete' && (
                <>
                  <h2 className="text-xl font-bold mb-4">Eliminar usuario</h2>
                  <p>¿Seguro que quieres eliminar a <b>{selectedUser.username}</b>?</p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={closeModal}>Cancelar</button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={handleDelete}>Eliminar</button>
                  </div>
                </>
              )}
              {modalType === 'bluepoints' && (
                <>
                  <h2 className="text-xl font-bold mb-4">Asignar Blue Points</h2>
                  <p>Asignar puntos a <b>{selectedUser.username}</b></p>
                  <input
                    type="number"
                    min={1}
                    value={bluePoints}
                    onChange={e => setBluePoints(Number(e.target.value))}
                    className="border px-3 py-2 rounded w-full mt-4 text-black"
                    placeholder="Cantidad de Blue Points"
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={closeModal}>Cancelar</button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={handleAssignBluePoints}>Asignar</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AdminPanel; 