import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CardData } from '../../types';

const CrearVulnerabilidad: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [jugador, setJugador] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Variables de usuario (mock, luego se puede obtener de contexto)
  const usuarioNombre = 'Alex Turner';
  const usuarioEmail = 'alex.turner@email.com';
  const fecha = new Date().toISOString().slice(0, 10);

  // Convertir imagen a base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !descripcion) {
      setError('Todos los campos excepto la imagen son obligatorios.');
      return;
    }
    setLoading(true);
    localStorage.setItem('usuario_email_actual', usuarioEmail);
    localStorage.setItem('nombre_usuario', usuarioNombre);
    let imagenBase64: string | undefined = undefined;
    if (imagen) {
      try {
        imagenBase64 = await fileToBase64(imagen);
      } catch {
        setError('Error al procesar la imagen.');
        setLoading(false);
        return;
      }
    }
    const nuevaCard: CardData = {
      id: uuidv4(),
      nombre,
      fecha,
      jugador: usuarioNombre,
      email: usuarioEmail,
      descripcion,
      imagenUrl: imagenBase64,
      likes: 0,
      dislikes: 0,
      userVote: null,
      createdAt: Date.now(),
    };
    // Guardar en localStorage
    let prev = [];
    try {
      prev = JSON.parse(localStorage.getItem('vulnerabilidades') || '[]');
      if (!Array.isArray(prev)) prev = [];
    } catch (e) {
      localStorage.removeItem('vulnerabilidades');
      prev = [];
    }
    localStorage.setItem('vulnerabilidades', JSON.stringify([nuevaCard, ...prev]));
    setLoading(false);
    window.location.replace('/formulario');
  };

  return (
    <div className="w-full flex flex-row min-h-screen">
      <div className="flex-1 p-8 ml-2">
        <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear Vulnerabilidad</h2>
          {error && <div className="text-red-500 font-semibold">{error}</div>}
          <label className="font-semibold text-gray-700">Nombre de la vulnerabilidad
            <input type="text" className="input mt-1" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </label>
          <label className="font-semibold text-gray-700">Nombre del usuario
            <input type="text" className="input mt-1 bg-gray-100" value={usuarioNombre} readOnly />
          </label>
          <label className="font-semibold text-gray-700">Email
            <input type="text" className="input mt-1 bg-gray-100" value={usuarioEmail} readOnly />
          </label>
          <label className="font-semibold text-gray-700">Fecha
            <input type="text" className="input mt-1 bg-gray-100" value={fecha} readOnly />
          </label>
          <label className="font-semibold text-gray-700">Descripción
            <textarea className="input mt-1" value={descripcion} onChange={e => setDescripcion(e.target.value)} required rows={4} />
          </label>
          <label className="font-semibold text-gray-700">Subir imagen (opcional)
            <input type="file" className="input mt-1" accept="image/*" onChange={e => setImagen(e.target.files?.[0] || null)} />
          </label>
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-700 transition" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</button>
        </form>
      </div>
    </div>
  );
};

export default CrearVulnerabilidad; 