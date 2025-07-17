import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CardData } from '../../types';

const CrearVulnerabilidad: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [jugador, setJugador] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [error, setError] = useState('');

  // Variables de usuario (mock, luego se puede obtener de contexto)
  const usuarioNombre = 'Alex Turner';
  const usuarioEmail = 'alex.turner@email.com';
  const fecha = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !descripcion) {
      setError('Todos los campos excepto la imagen son obligatorios.');
      return;
    }
    // Guardar usuario en localStorage para persistencia de votos y visualización
    localStorage.setItem('usuario_email_actual', usuarioEmail);
    localStorage.setItem('nombre_usuario', usuarioNombre);
    // Crear nueva tarjeta
    const nuevaCard: CardData = {
      id: uuidv4(),
      nombre,
      fecha,
      jugador: usuarioNombre,
      email: usuarioEmail,
      descripcion,
      imagenUrl: imagen ? URL.createObjectURL(imagen) : undefined,
      likes: 0,
      dislikes: 0,
      userVote: null,
      createdAt: Date.now(),
    };
    // Guardar en localStorage
    let prev = [];
    try {
      prev = JSON.parse(localStorage.getItem('vulnerabilidad_cards') || '[]');
      if (!Array.isArray(prev)) prev = [];
    } catch (e) {
      localStorage.removeItem('vulnerabilidad_cards');
      prev = [];
    }
    localStorage.setItem('vulnerabilidad_cards', JSON.stringify([nuevaCard, ...prev]));
    // Verificar guardado
    const test = JSON.parse(localStorage.getItem('vulnerabilidad_cards') || '[]');
    if (test && test.length > 0 && test[0].id === nuevaCard.id) {
      alert('¡Vulnerabilidad guardada correctamente!');
      setNombre('');
      setDescripcion('');
      setImagen(null);
      setError('');
      window.location.replace('/formulario'); // recarga completa
    } else {
      alert('Error: No se pudo guardar la vulnerabilidad.');
    }
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
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-700 transition">Crear</button>
        </form>
      </div>
    </div>
  );
};

export default CrearVulnerabilidad; 