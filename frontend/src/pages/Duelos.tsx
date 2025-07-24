import React, { useState } from 'react';
import { Eye, Flag, ChevronDown } from 'lucide-react';

const tiposEquipo = [
  { label: 'Todos los tipos de equipos', value: 'all' },
  { label: '1 vs 1', value: '1v1' },
  { label: 'Dúo', value: 'duo' },
  { label: 'Equipo', value: 'equipo' },
];

// Imágenes aleatorias de assets
const salaImages = [
  '/src/assets/images/fondos/FONDO_GAMER1.webp',
  '/src/assets/images/fondos/FONDO_GAMER2.jpg',
];

const mockSalas = [
  {
    id: 3256799763,
    usuario: 'maguatdd',
    tipo: 'equipo',
    modo: 'Escuadra',
    jugadores: 2,
    maxJugadores: 4,
    imagen: salaImages[0],
  },
  {
    id: 1234567890,
    usuario: 'alexdev',
    tipo: '1v1',
    modo: '1 vs 1',
    jugadores: 1,
    maxJugadores: 2,
    imagen: salaImages[1],
  },
];

const tipoToLabel = {
  '1v1': '1 vs 1',
  'duo': 'Dúo',
  'equipo': 'Escuadra',
};

const Duelos: React.FC = () => {
  const [tipoFiltro, setTipoFiltro] = useState('all');
  const [filtroOpen, setFiltroOpen] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  // Filtrado por tipo y búsqueda
  const salasFiltradas = mockSalas.filter(sala => {
    const matchTipo = tipoFiltro === 'all' || sala.tipo === tipoFiltro;
    const matchBusqueda =
      sala.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      sala.id.toString().includes(busqueda);
    return matchTipo && matchBusqueda;
  });

  return (
    <div className="min-h-screen h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Encabezado */}
      <header className="w-full flex justify-end items-center px-4 py-4 bg-white/10 flex-shrink-0 sticky top-0 z-10">
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded shadow min-w-[200px]"
            onClick={() => setFiltroOpen(f => !f)}
          >
            {tiposEquipo.find(t => t.value === tipoFiltro)?.label}
            <ChevronDown size={18} />
          </button>
          {filtroOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded shadow-lg border w-full min-w-[200px] z-20">
              {tiposEquipo.slice(1).map(t => (
                <button
                  key={t.value}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${tipoFiltro === t.value ? 'bg-gray-100 font-bold' : ''}`}
                  onClick={() => { setTipoFiltro(t.value); setFiltroOpen(false); }}
                >
                  {t.label}
                </button>
              ))}
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${tipoFiltro === 'all' ? 'bg-gray-100 font-bold' : ''}`}
                onClick={() => { setTipoFiltro('all'); setFiltroOpen(false); }}
              >
                Todos los tipos de equipos
              </button>
            </div>
          )}
        </div>
      </header>
      {/* Sección de salas (scrollable, alto fijo) */}
      <main className="w-full flex justify-center flex-shrink-0" style={{ background: 'inherit' }}>
        <div
          className="flex flex-col gap-4 max-w-full w-full overflow-y-auto px-0 md:px-8 py-4"
          style={{
            maxHeight: '400px', // desktop
            minHeight: '120px',
            height: '100%',
          }}
        >
          {salasFiltradas.length === 0 ? (
            <div className="text-center text-gray-300 py-8 text-lg">No se encontraron salas.</div>
          ) : (
            salasFiltradas.map((sala) => (
              <div
                key={sala.id}
                className="flex flex-row items-center w-full bg-gray-200 rounded-xl shadow-lg overflow-hidden h-[150px] min-h-[150px]"
                style={{ minWidth: 0 }}
              >
                {/* Imagen rectangular más grande y centrada */}
                <div className="flex-shrink-0 w-[220px] h-[130px] bg-gray-300 flex items-center justify-center m-4 rounded-lg overflow-hidden">
                  <img src={sala.imagen} alt="Sala" className="object-cover w-full h-full rounded-md" />
                </div>
                {/* Info usuario y sala */}
                <div className="flex flex-col justify-center px-6 flex-1 min-w-[160px] h-full">
                  <div className="text-xl font-semibold text-gray-800">Sala de {sala.usuario}</div>
                  <div className="text-sm text-gray-600 mt-1">ID: {sala.id}</div>
                </div>
                {/* Tipo de equipo */}
                <div className="flex flex-col items-center justify-center px-4 min-w-[100px]">
                  <div className="text-base font-semibold text-gray-800">{tipoToLabel[sala.tipo as keyof typeof tipoToLabel] || sala.modo}</div>
                  <div className="text-sm text-gray-600 mt-1">{sala.jugadores}/{sala.maxJugadores}</div>
                </div>
                {/* Ojo */}
                <div className="flex items-center justify-center px-4">
                  <Eye size={36} className="text-gray-700" />
                </div>
                {/* Bandera con + */}
                <div className="flex items-center justify-center px-4">
                  <Flag size={36} className="text-yellow-500" />
                  <span className="ml-[-18px] mt-[-18px] bg-white text-yellow-500 rounded-full border border-yellow-400 w-6 h-6 flex items-center justify-center font-bold text-lg shadow" style={{ position: 'relative', left: '-12px', top: '12px' }}>+</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      {/* Pie de página */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 bg-white/10 flex-shrink-0 sticky bottom-0 z-10">
        <input
          type="text"
          placeholder="Buscar por nombre o ID"
          className="flex-1 rounded px-4 py-2 bg-gray-200 text-gray-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 max-w-md"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button className="bg-gray-200 hover:bg-yellow-400 text-gray-800 hover:text-gray-900 font-bold px-8 py-2 rounded shadow transition w-full md:w-auto">CREAR SALA</button>
      </footer>
    </div>
  );
};

export default Duelos; 