import React, { useState } from 'react';

const mockSalas = [
  {
    id: 101,
    nombre: 'Sala Élite',
    jugadores: [
      { nombre: 'Player1', avatar: '/src/assets/images/Avatar/Avatar1.png' },
      { nombre: 'Player2', avatar: '/src/assets/images/Avatar/Avatar3.png' },
    ],
    maxJugadores: 4,
    estado: 'Esperando',
  },
  {
    id: 202,
    nombre: 'Sala Pro',
    jugadores: [
      { nombre: 'Player3', avatar: '/src/assets/images/Avatar/Avatar4.png' },
      { nombre: 'Player4', avatar: '/src/assets/images/Avatar/Avatar5.png' },
      { nombre: 'Player5', avatar: '/src/assets/images/Avatar/Avatar.png' },
      { nombre: 'Player6', avatar: '/src/assets/images/Avatar/Avatar1.png' },
    ],
    maxJugadores: 4,
    estado: 'En juego',
  },
  {
    id: 303,
    nombre: 'Sala Novatos',
    jugadores: [
      { nombre: 'Player7', avatar: '/src/assets/images/Avatar/Avatar3.png' },
    ],
    maxJugadores: 4,
    estado: 'Esperando',
  },
];

const estadoColor = (estado: string) => {
  switch (estado) {
    case 'Esperando':
      return 'bg-yellow-300 text-gray-900';
    case 'En juego':
      return 'bg-green-400 text-gray-900';
    default:
      return 'bg-gray-400 text-gray-900';
  }
};

const Duelos: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');

  const salasFiltradas = mockSalas.filter(
    (sala) =>
      sala.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      sala.id.toString().includes(busqueda)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-2 flex flex-col items-center">
      <header className="w-full max-w-4xl flex flex-col items-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow mb-2 text-center tracking-wide">
          <span className="inline-block align-middle mr-2">⚔️</span> Duelos
        </h1>
        <p className="text-gray-300 text-lg md:text-xl text-center max-w-2xl">
          ¡Enfréntate a otros jugadores en duelos épicos! Únete a una sala existente o crea la tuya propia.
        </p>
      </header>
      <div className="w-full max-w-4xl bg-white/10 rounded-2xl shadow-2xl p-4 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded-lg shadow-lg flex items-center gap-2 transition">
            <span className="text-xl">➕</span> Crear sala
          </button>
          <div className="flex-1 flex justify-end">
            <input
              type="text"
              placeholder="Buscar sala por nombre o ID..."
              className="w-full md:w-72 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-900 text-gray-100 placeholder-gray-400 shadow"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {salasFiltradas.length === 0 ? (
            <div className="col-span-full text-center text-gray-300 py-8 text-lg">No se encontraron salas.</div>
          ) : (
            salasFiltradas.map((sala) => (
              <div
                key={sala.id}
                className="bg-gray-800/80 rounded-xl shadow-lg p-5 flex flex-col gap-4 border-2 border-transparent hover:border-yellow-400 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-700 text-yellow-300 font-mono text-xs px-2 py-1 rounded">ID: {sala.id}</span>
                    <h2 className="text-2xl font-bold text-yellow-300 flex-1 truncate">{sala.nombre}</h2>
                  </div>
                  <span className={`ml-4 px-3 py-1 rounded-full text-xs font-bold ${estadoColor(sala.estado)}`}>{sala.estado}</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {sala.jugadores.map((jugador, idx) => (
                    <div key={jugador.nombre} className="flex flex-col items-center">
                      <img
                        src={jugador.avatar}
                        alt={jugador.nombre}
                        className="w-12 h-12 rounded-full border-2 border-yellow-400 shadow-md object-cover bg-gray-700"
                      />
                      <span className="text-xs text-gray-200 mt-1 truncate max-w-[60px]">{jugador.nombre}</span>
                    </div>
                  ))}
                  {/* Espacios vacíos para jugadores que faltan */}
                  {Array.from({ length: sala.maxJugadores - sala.jugadores.length }).map((_, idx) => (
                    <div key={idx} className="flex flex-col items-center opacity-40">
                      <div className="w-12 h-12 rounded-full border-2 border-gray-500 bg-gray-700 flex items-center justify-center text-gray-400 text-2xl">
                        ?
                      </div>
                      <span className="text-xs text-gray-400 mt-1">Vacante</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow transition flex items-center gap-2"
                    disabled={sala.estado !== 'Esperando'}
                  >
                    <span>Unirse</span>
                    <span className="text-lg">🎮</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Duelos; 