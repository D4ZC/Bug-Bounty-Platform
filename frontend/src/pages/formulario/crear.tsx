import React, { useState } from 'react';

const CrearVulnerabilidad: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [jugador, setJugador] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [error, setError] = useState('');

  const fecha = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !jugador || !descripcion) {
      setError('Todos los campos excepto la imagen son obligatorios.');
      return;
    }
    // Aquí se enviará la info al estado global/contexto
    setNombre('');
    setJugador('');
    setDescripcion('');
    setImagen(null);
    setError('');
    // Redirigir o mostrar mensaje de éxito si se desea
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
          <label className="font-semibold text-gray-700">Fecha
            <input type="text" className="input mt-1 bg-gray-100" value={fecha} readOnly />
          </label>
          <label className="font-semibold text-gray-700">Nombre del jugador
            <input type="text" className="input mt-1" value={jugador} onChange={e => setJugador(e.target.value)} required />
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