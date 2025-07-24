import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ChooseUsername: React.FC = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Aquí deberías llamar a tu API para actualizar el username
    try {
      // Simulación de éxito
      setLoading(false);
    } catch (err: any) {
      setError(err?.message || 'Error al actualizar el nombre de usuario');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSave} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Elige tu nombre de usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="bg-green-500 text-white rounded p-2" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default ChooseUsername; 