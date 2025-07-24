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

// Importa todas las imágenes posibles de la carpeta 'otros' (webp, jpg, jpeg, png)
const salaImageModules = import.meta.glob('/src/assets/images/otros/SALA{1,2,3,4}.*', { eager: true, import: 'default' });
const salaImagePaths = Object.values(salaImageModules) as string[];

function getRandomSalaImage(): string {
  if (salaImagePaths.length === 0) return '';
  const idx = Math.floor(Math.random() * salaImagePaths.length);
  return salaImagePaths[idx] as string;
}

const initialSalas = [
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

const NOMBRE_USUARIO = 'Alex Turner';

const Duelos: React.FC = () => {
  const [tipoFiltro, setTipoFiltro] = useState('all');
  const [filtroOpen, setFiltroOpen] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [nombreSala, setNombreSala] = useState(NOMBRE_USUARIO);
  const [contrasena, setContrasena] = useState('');
  const [modo, setModo] = useState<'solo' | 'duo' | 'equipos'>('solo');
  const [numJugadores, setNumJugadores] = useState(2);
  const [espectadores, setEspectadores] = useState(10);
  const [salas, setSalas] = useState(initialSalas);
  const [error, setError] = useState('');

  // Ajuste automático de jugadores según modo
  React.useEffect(() => {
    if (modo === 'solo') setNumJugadores(2);
    else if (modo === 'duo' && (numJugadores < 2 || numJugadores > 4)) setNumJugadores(4);
    else if (modo === 'equipos' && (numJugadores < 4 || numJugadores > 20)) setNumJugadores(10);
    // eslint-disable-next-line
  }, [modo]);

  // Filtrado por tipo y búsqueda
  const salasFiltradas = salas.filter(sala => {
    const matchTipo = tipoFiltro === 'all' || sala.tipo === tipoFiltro;
    const matchBusqueda =
      sala.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      sala.id.toString().includes(busqueda);
    return matchTipo && matchBusqueda;
  });

  // Handler para crear sala
  const handleCrearSala = () => {
    if (!nombreSala.trim()) {
      setError('El nombre de la sala es obligatorio.');
      return;
    }
    setError('');
    const nuevaSala = {
      id: Math.floor(100000000 + Math.random() * 900000000),
      usuario: nombreSala,
      tipo: modo === 'solo' ? '1v1' : modo === 'duo' ? 'duo' : 'equipo',
      modo: modo === 'solo' ? '1 vs 1' : modo === 'duo' ? 'Dúo' : 'Escuadra',
      jugadores: 1, // El creador es el primer usuario
      maxJugadores: numJugadores, // El máximo es el valor editable
      imagen: getRandomSalaImage(),
    };
    setSalas(prev => [nuevaSala, ...prev]);
    setModalOpen(false);
    setNombreSala(NOMBRE_USUARIO);
    setContrasena('');
    setModo('solo');
    setNumJugadores(2);
    setEspectadores(10);
  };

  // Modal de crear sala
  const renderModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-[95vw] max-w-lg p-6 flex flex-col gap-6 z-10 mx-2">
        {/* Botón cerrar */}
        <button className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700 font-bold" aria-label="Cerrar modal" onClick={() => setModalOpen(false)}>
          ×
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Crear sala</h2>
        {/* Nombre de la sala */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-700">Nombre de la sala</span>
          <input
            className="rounded px-3 py-2 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={nombreSala}
            onChange={e => setNombreSala(e.target.value)}
          />
        </label>
        {error && <div className="text-red-500 text-sm text-center font-semibold">{error}</div>}
        {/* Contraseña */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-700">Contraseña (opcional)</span>
          <input
            className="rounded px-3 py-2 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            type="password"
          />
        </label>
        {/* Modo de equipo */}
        <div className="flex flex-row items-center gap-6 justify-center">
          {['solo', 'duo', 'equipos'].map((m) => (
            <button
              key={m}
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${modo === m ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-100'} font-semibold text-gray-700 transition`}
              onClick={() => setModo(m as 'solo' | 'duo' | 'equipos')}
            >
              <span>{m === 'solo' ? 'Solo' : m === 'duo' ? 'Duo' : 'Equipos'}</span>
              <span className={`w-3 h-3 rounded-full border-2 ml-1 ${modo === m ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'}`} />
            </button>
          ))}
        </div>
        {/* Número de jugadores y espectadores */}
        <div className="flex flex-row gap-6 justify-center">
          <label className="flex flex-col gap-1 items-center">
            <span className="text-sm font-semibold text-gray-700">Num. jugadores</span>
            <input
              type="number"
              className="rounded px-3 py-2 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-28 text-center"
              value={numJugadores}
              min={modo === 'solo' ? 2 : modo === 'duo' ? 2 : 4}
              max={modo === 'solo' ? 2 : modo === 'duo' ? 4 : 20}
              onChange={e => setNumJugadores(Number(e.target.value))}
              disabled={modo === 'solo'}
            />
          </label>
          <label className="flex flex-col gap-1 items-center">
            <span className="text-sm font-semibold text-gray-700">Espectadores</span>
            <input
              type="number"
              className="rounded px-3 py-2 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-28 text-center"
              value={espectadores}
              min={0}
              max={50}
              onChange={e => setEspectadores(Number(e.target.value))}
            />
          </label>
        </div>
        {/* Botones */}
        <div className="flex flex-row gap-6 justify-center mt-2">
          <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold px-8 py-2 rounded shadow transition">GUARDAR</button>
          <button className="bg-gray-700 hover:bg-yellow-400 text-white hover:text-gray-900 font-bold px-8 py-2 rounded shadow transition" onClick={handleCrearSala}>CREAR</button>
        </div>
      </div>
    </div>
  );

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
      {/* Modal crear sala */}
      {modalOpen && renderModal()}
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
        <button className="bg-gray-200 hover:bg-yellow-400 text-gray-800 hover:text-gray-900 font-bold px-8 py-2 rounded shadow transition w-full md:w-auto" onClick={() => setModalOpen(true)}>CREAR SALA</button>
      </footer>
    </div>
  );
};

export default Duelos; 