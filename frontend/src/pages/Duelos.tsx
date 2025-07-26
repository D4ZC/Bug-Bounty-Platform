import React, { useState } from 'react';
import { Eye, Flag, ChevronDown, Lock } from 'lucide-react';

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
    contrasena: '123456', // Sala con contraseña
    estado: 'esperando',
    creador: 'maguatdd',
    participantes: ['maguatdd', 'alexdev'],
    tiempoInicio: null,
    tiempoFin: null,
  },
  {
    id: 1234567890,
    usuario: 'alexdev',
    tipo: '1v1',
    modo: '1 vs 1',
    jugadores: 1,
    maxJugadores: 2,
    imagen: salaImages[1],
    contrasena: '', // Sala sin contraseña
    estado: 'esperando',
    creador: 'alexdev',
    participantes: ['alexdev'],
    tiempoInicio: null,
    tiempoFin: null,
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
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [selectedSala, setSelectedSala] = useState<any>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [salaActiva, setSalaActiva] = useState<any>(null);
  const [mostrarSalasActivas, setMostrarSalasActivas] = useState(false);
  const [salaEnProgreso, setSalaEnProgreso] = useState<any>(null);
  const [tiempoRestante, setTiempoRestante] = useState<number>(0);
  const [contadorActivo, setContadorActivo] = useState(false);

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
    // Solo mostrar salas en estado "esperando"
    return matchTipo && matchBusqueda && sala.estado === 'esperando';
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
      contrasena: contrasena, // Guardar la contraseña
      estado: 'esperando',
      creador: nombreSala,
      participantes: [nombreSala],
      tiempoInicio: null,
      tiempoFin: null,
    };
    setSalas(prev => [nuevaSala, ...prev]);
    setSalaActiva(nuevaSala);
    setMostrarSalasActivas(true);
    setModalOpen(false);
    setNombreSala(NOMBRE_USUARIO);
    setContrasena('');
    setModo('solo');
    setNumJugadores(2);
    setEspectadores(10);
  };

  // Handler para unirse a sala
  const handleJoinSala = (sala: any) => {
    if (salaActiva) {
      alert('Ya estás en una sala activa. Debes salir primero.');
      return;
    }
    
    if (sala.contrasena && sala.contrasena.trim() !== '') {
      // Sala con contraseña - abrir modal
      setSelectedSala(sala);
      setPasswordInput('');
      setPasswordError('');
      setJoinSuccess(false);
      setPasswordModalOpen(true);
    } else {
      // Sala sin contraseña - unirse directamente
      handleJoinDirectly(sala);
    }
  };

  // Handler para verificar contraseña
  const handleVerifyPassword = () => {
    if (passwordInput === selectedSala.contrasena) {
      setJoinSuccess(true);
      setPasswordError('');
      setTimeout(() => {
        setPasswordModalOpen(false);
        setJoinSuccess(false);
        setSalaActiva(selectedSala); // Unirse a la sala
        alert('¡Contraseña correcta! Te has unido a la sala.');
      }, 1500);
    } else {
      setPasswordError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  // Handler para unirse directamente (sin contraseña)
  const handleJoinDirectly = (sala: any) => {
    // Actualizar la sala con el nuevo participante
    const salaActualizada = {
      ...sala,
      participantes: [...(sala.participantes || []), NOMBRE_USUARIO],
      jugadores: (sala.jugadores || 1) + 1
    };
    
    // Actualizar la lista de salas
    setSalas(prev => prev.map(s => s.id === sala.id ? salaActualizada : s));
    
    setSalaActiva(salaActualizada);
    alert('Te has unido a la sala de ' + sala.usuario);
  };

  // Handler para salir de la sala
  const handleSalirSala = () => {
    if (salaActiva && salaActiva.creador === NOMBRE_USUARIO) {
      // Si es el creador, eliminar la sala completamente
      setSalas(prev => prev.filter(s => s.id !== salaActiva.id));
      if (contadorActivo) {
        setContadorActivo(false);
        setTiempoRestante(0);
      }
    } else if (salaActiva) {
      // Si no es el creador, solo remover del participante
      const salaActualizada = {
        ...salaActiva,
        participantes: salaActiva.participantes.filter((p: string) => p !== NOMBRE_USUARIO),
        jugadores: salaActiva.jugadores - 1
      };
      setSalas(prev => prev.map(s => s.id === salaActiva.id ? salaActualizada : s));
    }
    
    setSalaActiva(null);
    setMostrarSalasActivas(false);
    setSalaEnProgreso(null);
    alert('Has salido de la sala.');
  };

  // Handler para empezar la sala
  const handleEmpezarSala = () => {
    if (!salaActiva) return;
    
    const tiempoInicio = Date.now();
    const tiempoFin = tiempoInicio + (10 * 24 * 60 * 60 * 1000); // 10 días en milisegundos
    
    const salaEnProgreso = {
      ...salaActiva,
      estado: 'en_progreso',
      tiempoInicio,
      tiempoFin
    };
    
    setSalaEnProgreso(salaEnProgreso);
    setContadorActivo(true);
    setTiempoRestante(10 * 24 * 60 * 60 * 1000);
    
    // Remover la sala de la lista de salas disponibles
    setSalas(prev => prev.filter(s => s.id !== salaActiva.id));
    
    alert('¡La sala ha comenzado! El tiempo de 10 días ha iniciado.');
  };

  // Handler para finalizar la sala
  const handleFinalizarSala = () => {
    if (!salaEnProgreso) return;
    
    const salaFinalizada = {
      ...salaEnProgreso,
      estado: 'finalizada'
    };
    
    setSalaEnProgreso(salaFinalizada);
    setContadorActivo(false);
    setTiempoRestante(0);
    
    // Determinar ganador basado en puntos
    const ganador = 'Alex Turner'; // Mock - en realidad se calcularía basado en puntos
    alert(`¡Sala finalizada! Ganador: ${ganador}`);
  };

  // Handler para mostrar salas activas
  const handleMostrarSalasActivas = () => {
    if (salaActiva || salaEnProgreso) {
      setMostrarSalasActivas(true);
    } else {
      alert('No tienes ninguna sala activa.');
    }
  };

  // Efecto para el contador de tiempo
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (contadorActivo && tiempoRestante > 0) {
      interval = setInterval(() => {
        setTiempoRestante(prev => {
          const nuevoTiempo = prev - 1000;
          if (nuevoTiempo <= 0) {
            // Tiempo agotado - finalizar sala automáticamente
            handleFinalizarSala();
            return 0;
          }
          return nuevoTiempo;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [contadorActivo, tiempoRestante]);

  // Función para formatear el tiempo
  const formatearTiempo = (ms: number) => {
    const dias = Math.floor(ms / (1000 * 60 * 60 * 24));
    const horas = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((ms % (1000 * 60)) / 1000);
    
    return `${dias.toString().padStart(2, '0')}:${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
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

  // Modal de contraseña
  const renderPasswordModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-[95vw] max-w-md p-6 flex flex-col gap-4 z-10 mx-2">
        {/* Botón cerrar */}
        <button className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700 font-bold" aria-label="Cerrar modal" onClick={() => setPasswordModalOpen(false)}>
          ×
        </button>
        
        {joinSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">¡Contraseña correcta!</h2>
            <p className="text-gray-600">Te has unido a la sala.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Unirse a la sala</h2>
            <p className="text-gray-600 text-center mb-4">Esta sala está protegida con contraseña</p>
            
            {/* Contraseña */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-gray-700">Contraseña</span>
              <input
                className="rounded px-3 py-2 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                type="password"
                placeholder="Ingresa la contraseña"
                onKeyPress={(e) => e.key === 'Enter' && handleVerifyPassword()}
              />
            </label>
            
            {passwordError && <div className="text-red-500 text-sm text-center font-semibold">{passwordError}</div>}
            
            {/* Botones */}
            <div className="flex flex-row gap-4 justify-center mt-4">
              <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold px-6 py-2 rounded shadow transition" onClick={() => setPasswordModalOpen(false)}>
                Cancelar
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded shadow transition" onClick={handleVerifyPassword}>
                Unirse
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Componente para mostrar vulnerabilidades
  const renderVulnerabilidades = (esNuevaSala: boolean = false) => (
    <div className="flex gap-2 mb-4">
      <div className="bg-red-100 rounded-lg p-3 text-center flex-1">
        <div className="text-red-600 text-xl font-bold">{esNuevaSala ? '0' : '15'}</div>
        <div className="text-red-700 text-xs font-semibold">Críticas</div>
      </div>
      <div className="bg-orange-100 rounded-lg p-3 text-center flex-1">
        <div className="text-orange-600 text-xl font-bold">{esNuevaSala ? '0' : '25'}</div>
        <div className="text-orange-700 text-xs font-semibold">Altas</div>
      </div>
      <div className="bg-yellow-100 rounded-lg p-3 text-center flex-1">
        <div className="text-yellow-600 text-xl font-bold">{esNuevaSala ? '0' : '35'}</div>
        <div className="text-yellow-700 text-xs font-semibold">Medianas</div>
      </div>
      <div className="bg-green-100 rounded-lg p-3 text-center flex-1">
        <div className="text-green-600 text-xl font-bold">{esNuevaSala ? '0' : '12'}</div>
        <div className="text-green-700 text-xs font-semibold">Bajas</div>
      </div>
    </div>
  );

  // Componente para mostrar puntos
  const renderPuntos = (puntaje: number, esNuevaSala: boolean = false) => (
    <div className="bg-blue-100 rounded-lg p-4 text-center mb-4">
      <div className="text-blue-600 text-2xl font-bold">{esNuevaSala ? 0 : puntaje}</div>
      <div className="text-blue-700 text-sm font-semibold">Puntos</div>
    </div>
  );

  // Componente para mostrar avatar o iniciales
  const renderAvatar = (nombre: string, avatar?: string) => {
    if (avatar) {
      return (
        <img 
          src={avatar} 
          alt={nombre} 
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
        />
      );
    }
    
    const iniciales = nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    return (
      <div className="w-16 h-16 rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center">
        <span className="text-gray-700 font-bold text-lg">{iniciales}</span>
      </div>
    );
  };

  // Componente para mostrar lado vacío (esperando jugador)
  const renderLadoVacio = () => (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 relative">
        {/* Reloj de arena rotando */}
        <div className="w-full h-full border-4 border-gray-300 rounded-full flex items-center justify-center animate-spin">
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <p className="text-gray-600 font-semibold">Esperando jugador...</p>
      <p className="text-gray-500 text-sm">Se unirá pronto</p>
    </div>
  );

  // Componente para mostrar sala activa
  const renderSalaActiva = () => {
    const salaActual = salaEnProgreso || salaActiva;
    if (!salaActual) return null;

    // Determinar si hay suficientes jugadores para empezar
    const puedeEmpezar = salaActual.participantes && salaActual.participantes.length >= 2;
    const esCreador = salaActual.creador === NOMBRE_USUARIO;
    const haySegundoJugador = salaActual.participantes && salaActual.participantes.length >= 2;

    // Datos mock según el tipo de sala
    const getDatosMock = () => {
      const primerJugador = salaActual.participantes[0] || 'Alex Turner';
      const esNuevaSala = salaActual.estado === 'esperando';
      
      switch (salaActual.tipo) {
        case '1v1':
          return {
            lado1: { nombre: primerJugador, avatar: '/src/assets/images/Avatar/Avatar.png', puntaje: esNuevaSala ? 0 : 1250 },
            lado2: haySegundoJugador ? { nombre: salaActual.participantes[1], avatar: '', puntaje: esNuevaSala ? 0 : 1180 } : null
          };
        case 'duo':
          return {
            lado1: [
              { nombre: primerJugador, avatar: '/src/assets/images/Avatar/Avatar.png' },
              { nombre: 'Michael Rodriguez', avatar: '' }
            ],
            lado2: haySegundoJugador ? [
              { nombre: salaActual.participantes[1], avatar: '' },
              { nombre: 'Emily Watson', avatar: '' }
            ] : null,
            puntaje1: esNuevaSala ? 0 : 2100,
            puntaje2: haySegundoJugador ? (esNuevaSala ? 0 : 1950) : 0
          };
        case 'equipo':
          return {
            lado1: {
              nombre: 'Consulting Team',
              avatar: '/src/assets/images/Avatar/Avatar.png',
              integrantes: [primerJugador, 'Sarah Chen', 'Michael Rodriguez', 'Emily Watson'],
              puntaje: esNuevaSala ? 0 : 4500
            },
            lado2: haySegundoJugador ? {
              nombre: 'CyberWolves',
              avatar: '',
              integrantes: [salaActual.participantes[1], 'Lisa Park', 'James Wilson', 'Jessica Lee'],
              puntaje: esNuevaSala ? 0 : 4200
            } : null
          };
        default:
          return null;
      }
    };

    const datos = getDatosMock();
    if (!datos) return null;

    const esNuevaSala = salaActual.estado === 'esperando';

    return (
      <div className="min-h-screen h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
        {/* Contador flotante */}
        {contadorActivo && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg">
            <div className="text-center">
              <div className="text-sm font-semibold mb-1">Tiempo Restante</div>
              <div className="text-xl font-bold font-mono">{formatearTiempo(tiempoRestante)}</div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="w-full flex justify-between items-center px-4 py-4 bg-white/10 flex-shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded shadow"
              onClick={() => setMostrarSalasActivas(false)}
            >
              ← Volver
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              {salaEnProgreso ? 'Sala en Progreso' : 'Sala Activa'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {esCreador && puedeEmpezar && !salaEnProgreso && (
              <button 
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow"
                onClick={handleEmpezarSala}
              >
                Empezar
              </button>
            )}
            <button 
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow"
              onClick={handleSalirSala}
            >
              Salir de la Sala
            </button>
          </div>
        </header>

        {/* Información de la sala */}
        <div className="w-full bg-white rounded-lg shadow-lg mx-4 mt-4 p-6">
          <div className="flex items-center gap-4 mb-4">
            <img src={salaActual.imagen} alt="Sala" className="w-20 h-20 rounded-lg object-cover" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Sala de {salaActual.usuario}</h2>
              <p className="text-gray-600">ID: {salaActual.id}</p>
              <p className="text-gray-600">Tipo: {tipoToLabel[salaActual.tipo as keyof typeof tipoToLabel] || salaActual.modo}</p>
              <p className="text-gray-600">Estado: {salaActual.estado === 'esperando' ? 'Esperando jugadores' : salaActual.estado === 'en_progreso' ? 'En progreso' : 'Finalizada'}</p>
              <p className="text-gray-600">Jugadores: {salaActual.participantes ? salaActual.participantes.length : 1}/{salaActual.maxJugadores}</p>
            </div>
          </div>
        </div>

        {/* Contenido principal - Dos columnas */}
        <main className="flex-1 flex gap-8 p-4">
          {/* Lado izquierdo */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Lado A</h3>
            
                         {salaActual.tipo === '1v1' && (
               <div className="text-center">
                 {renderAvatar(datos.lado1.nombre, datos.lado1.avatar)}
                 <p className="mt-2 font-semibold text-gray-800">{datos.lado1.nombre}</p>
                 {renderVulnerabilidades(esNuevaSala)}
                 {renderPuntos(datos.lado1.puntaje, esNuevaSala)}
               </div>
             )}

                         {salaActual.tipo === 'duo' && (
               <div className="text-center">
                 <div className="flex justify-center gap-4 mb-4">
                   {datos.lado1.map((jugador: any, idx: number) => (
                     <div key={idx} className="text-center">
                       {renderAvatar(jugador.nombre, jugador.avatar)}
                       <p className="mt-2 text-sm font-semibold text-gray-800">{jugador.nombre}</p>
                     </div>
                   ))}
                 </div>
                 {renderVulnerabilidades(esNuevaSala)}
                 {renderPuntos(datos.puntaje1, esNuevaSala)}
               </div>
             )}

                         {salaActual.tipo === 'equipo' && (
               <div className="text-center">
                 {renderAvatar(datos.lado1.nombre, datos.lado1.avatar)}
                 <p className="mt-2 font-semibold text-gray-800">{datos.lado1.nombre}</p>
                 <div className="mt-4">
                   <h4 className="font-semibold text-gray-700 mb-2">Integrantes:</h4>
                   <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                     {datos.lado1.integrantes.map((integrante: string, idx: number) => (
                       <div key={idx} className="bg-gray-100 rounded p-2">{integrante}</div>
                     ))}
                   </div>
                 </div>
                 {renderVulnerabilidades(esNuevaSala)}
                 {renderPuntos(datos.lado1.puntaje, esNuevaSala)}
               </div>
             )}
          </div>

          {/* Separador VS */}
          <div className="flex items-center">
            <div className="bg-yellow-500 text-white font-bold text-2xl px-6 py-4 rounded-lg shadow-lg">
              VS
            </div>
          </div>

                     {/* Lado derecho */}
           <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
             <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Lado B</h3>
             
             {!haySegundoJugador ? (
               renderLadoVacio()
             ) : (
               <>
                                   {salaActual.tipo === '1v1' && (
                    <div className="text-center">
                      {renderAvatar(datos.lado2.nombre, datos.lado2.avatar)}
                      <p className="mt-2 font-semibold text-gray-800">{datos.lado2.nombre}</p>
                      {renderVulnerabilidades(esNuevaSala)}
                      {renderPuntos(datos.lado2.puntaje, esNuevaSala)}
                    </div>
                  )}

                                   {salaActual.tipo === 'duo' && (
                    <div className="text-center">
                      <div className="flex justify-center gap-4 mb-4">
                        {datos.lado2.map((jugador: any, idx: number) => (
                          <div key={idx} className="text-center">
                            {renderAvatar(jugador.nombre, jugador.avatar)}
                            <p className="mt-2 text-sm font-semibold text-gray-800">{jugador.nombre}</p>
                          </div>
                        ))}
                      </div>
                      {renderVulnerabilidades(esNuevaSala)}
                      {renderPuntos(datos.puntaje2, esNuevaSala)}
                    </div>
                  )}

                                   {salaActual.tipo === 'equipo' && (
                    <div className="text-center">
                      {renderAvatar(datos.lado2.nombre, datos.lado2.avatar)}
                      <p className="mt-2 font-semibold text-gray-800">{datos.lado2.nombre}</p>
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Integrantes:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          {datos.lado2.integrantes.map((integrante: string, idx: number) => (
                            <div key={idx} className="bg-gray-100 rounded p-2">{integrante}</div>
                          ))}
                        </div>
                      </div>
                      {renderVulnerabilidades(esNuevaSala)}
                      {renderPuntos(datos.lado2.puntaje, esNuevaSala)}
                    </div>
                  )}
               </>
             )}
           </div>
        </main>
      </div>
    );
  };

  return (
    <>
      {mostrarSalasActivas && (salaActiva || salaEnProgreso) ? (
        renderSalaActiva()
      ) : (
        <div className="min-h-screen h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
             {/* Encabezado */}
       <header className="w-full flex justify-between items-center px-4 py-4 bg-white/10 flex-shrink-0 sticky top-0 z-10">
                   {/* Botón Salas Activas */}
          <div>
            <button 
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded shadow"
              onClick={handleMostrarSalasActivas}
            >
              Salas Activas
            </button>
          </div>
         
         {/* Filtro de tipos */}
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
      {/* Modal de contraseña */}
      {passwordModalOpen && renderPasswordModal()}
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
                 className="flex flex-row items-center w-full bg-gray-200 rounded-xl shadow-lg overflow-hidden h-[150px] min-h-[150px] relative"
                 style={{ minWidth: 0 }}
               >
                 {/* Candado para salas con contraseña */}
                 {sala.contrasena && sala.contrasena.trim() !== '' && (
                   <div className="absolute top-2 right-2 z-10">
                     <Lock size={20} className="text-gray-600" />
                   </div>
                 )}
                 
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
                 <div className="flex items-center justify-center px-4 cursor-pointer" onClick={() => handleJoinSala(sala)}>
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
       )}
     </>
   );
 };

export default Duelos; 