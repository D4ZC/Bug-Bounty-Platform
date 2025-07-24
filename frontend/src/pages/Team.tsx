import React, { useState, useRef, useEffect } from 'react';
import { FaUsers, FaPlus, FaSearch, FaBell, FaUserEdit, FaCrown, FaUserMinus, FaExchangeAlt, FaTrophy, FaCommentDots, FaCheck, FaTimes } from 'react-icons/fa';
import { Team } from '../types';
import { useBackground } from '../contexts/BackgroundContext';

const mockEquipos: Team[] = [
  {
    _id: '1',
    name: 'P-TECH',
    description: 'Equipo de pentesting y seguridad ofensiva.',
    leader: 'OCAMPO',
    members: ['OCAMPO', 'alice', 'bob'],
    points: 60,
    rank: 1,
    logo: '',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    _id: '2',
    name: 'CyberGuard',
    description: 'Defensores de la infraestructura.',
    leader: 'carol',
    members: ['carol', 'juan'],
    points: 45,
    rank: 2,
    logo: '',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
];
const mockUsuarios = [
  { id: 1, nombre: 'OCAMPO', correo: 'ocampo@correo.com' },
  { id: 2, nombre: 'alice', correo: 'alice@correo.com' },
  { id: 3, nombre: 'bob', correo: 'bob@correo.com' },
  { id: 4, nombre: 'carol', correo: 'carol@correo.com' },
  { id: 5, nombre: 'juan', correo: 'juan@correo.com' },
  { id: 6, nombre: 'sofia', correo: 'sofia@correo.com' },
];

const TeamPage: React.FC = () => {
  const { backgroundUrl } = useBackground();
  const [tab, setTab] = useState<'miEquipo' | 'buscar' | 'crear'>('miEquipo');
  const [busqueda, setBusqueda] = useState('');
  const [busquedaExplorar, setBusquedaExplorar] = useState('');
  const [nuevoEquipo, setNuevoEquipo] = useState({ nombre: '', descripcion: '' });
  const [miembroBusqueda, setMiembroBusqueda] = useState('');
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<any[]>([]);
  const [feedback, setFeedback] = useState('');
  const [equipos, setEquipos] = useState<Team[]>(mockEquipos);
  const [equiposExplorar, setEquiposExplorar] = useState<Team[]>(mockEquipos);
  const [unido, setUnido] = useState<string | null>(null);
  const [detalleEquipo, setDetalleEquipo] = useState<Team | null>(null);
  const [tabDetalle, setTabDetalle] = useState<'resumen'|'miembros'|'historial'|'logros'|'chat'>('resumen');
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, texto: 'Invitación pendiente para CyberGuard', leida: false },
    { id: 2, texto: 'OCAMPO añadió a María García', leida: false },
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'OCAMPO', text: '¡Bienvenidos al equipo!', time: '10:00' },
    { id: 2, user: 'sofia', text: '¡Gracias! ¿Cuándo la próxima reunión?', time: '10:01' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [activityHistory, setActivityHistory] = useState([
    { id: 1, type: 'join', user: 'sofia', text: 'Sofía se unió al equipo', date: '2024-06-01 10:00' },
    { id: 2, type: 'leave', user: 'juan', text: 'Juan salió del equipo', date: '2024-06-01 09:00' },
    { id: 3, type: 'leader', user: 'OCAMPO', text: 'OCAMPO transfirió el liderazgo a Sofía', date: '2024-05-31 18:00' },
    { id: 4, type: 'trophy', user: 'equipo', text: '¡El equipo ganó un trofeo!', date: '2024-05-30 20:00' },
  ]);
  const [achievements, setAchievements] = useState([
    { id: 1, name: 'Primer bug', icon: '🐞', unlocked: true, date: '2024-05-01' },
    { id: 2, name: 'Equipo MVP', icon: '🏆', unlocked: true, date: '2024-05-10' },
    { id: 3, name: 'Top 3', icon: '🥉', unlocked: false },
    { id: 4, name: 'Cazador veloz', icon: '⚡', unlocked: false },
  ]);
  const usuarioActual = 'OCAMPO';

  // Filtrar equipos por búsqueda
  // Solo mostrar equipos donde el usuario es miembro
  const equiposFiltrados = equipos.filter(e =>
    e.members.includes(usuarioActual) &&
    (e.name.toLowerCase().includes(busqueda.toLowerCase()) ||
     e.description.toLowerCase().includes(busqueda.toLowerCase()))
  );
  const equiposExplorarFiltrados = equiposExplorar.filter(e =>
    e.name.toLowerCase().includes(busquedaExplorar.toLowerCase()) ||
    e.description.toLowerCase().includes(busquedaExplorar.toLowerCase())
  );

  const inputCrearRef = useRef<HTMLInputElement>(null);

  // Foco automático en input al abrir tab crear
  useEffect(() => {
    if (tab === 'crear' && inputCrearRef.current) {
      inputCrearRef.current.focus();
    }
  }, [tab]);
  // Cerrar modal con ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && detalleEquipo) setDetalleEquipo(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [detalleEquipo]);
  // Limpiar feedback al cambiar de tab
  useEffect(() => { setFeedback(''); }, [tab]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-12 font-mono"
      style={{
        background: backgroundUrl
          ? `url(${backgroundUrl}) center/cover no-repeat`
          : 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)',
      }}
    >
      <div className="w-full max-w-6xl mx-auto bg-[#181c2b]/90 border-2 border-[#00fff7] rounded-3xl p-10 flex flex-col items-center animate-fade-in-up">
        {/* Saludo y dashboard */}
        <div className="w-full flex flex-row items-center justify-between mb-10">
          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-[#00fff7] drop-shadow-[0_0_8px_#00fff7]">Bienvenido, OCAMPO</span>
            <span className="text-xs text-[#a259ff] font-bold tracking-widest uppercase">Mi Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <FaBell size={32} color="#00fff7" />
            <FaUserEdit size={32} color="#00fff7" />
          </div>
        </div>
        {/* Tabs principales */}
        <div className="flex gap-6 mb-10">
          <button onClick={() => setTab('miEquipo')} className={`px-8 py-4 rounded-xl font-bold text-xl border-2 ${tab === 'miEquipo' ? 'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_24px_#00fff7]' : 'bg-transparent text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'} transition-all duration-200`}><span className="inline-flex items-center gap-2"><FaUsers />Mi equipo</span></button>
          <button onClick={() => setTab('buscar')} className={`px-8 py-4 rounded-xl font-bold text-xl border-2 ${tab === 'buscar' ? 'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_24px_#00fff7]' : 'bg-transparent text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'} transition-all duration-200`}><span className="inline-flex items-center gap-2"><FaSearch />Explorar Equipos</span></button>
          <button onClick={() => setTab('crear')} className={`px-8 py-4 rounded-xl font-bold text-xl border-2 ${tab === 'crear' ? 'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_24px_#00fff7]' : 'bg-transparent text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'} transition-all duration-200`}><span className="inline-flex items-center gap-2"><FaPlus />Crear Equipo</span></button>
        </div>
        {/* Feedback/toast */}
        {feedback && <div className="mb-6 text-[#39ff14] font-bold text-lg animate-fade-in-up">{feedback}</div>}
        {/* Mi Equipos - Cards */}
        {tab === 'miEquipo' && (
          <div className="w-full">
            <h2 className="text-2xl font-bold text-[#00fff7] mb-4">Mis Equipos</h2>
            <input type="text" placeholder="Buscar equipo..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="mb-4 px-3 py-2 rounded bg-[#101926]/80 border border-[#00fff7] text-white w-full font-mono" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equiposFiltrados.map((eq, idx) => (
                <div key={eq._id} className={`card-equipo bg-[#232b36]/80 border-2 border-[#00fff7] rounded-2xl p-6 flex flex-col gap-2 shadow-[0_0_24px_#00fff7] hover:scale-105 transition animate-fade-in-up cursor-pointer font-mono ${idx === equiposFiltrados.length-1 ? 'animate-pulse' : ''}`} onClick={() => setDetalleEquipo(eq)}>
                  <div className="flex items-center gap-2 text-2xl font-extrabold text-[#00fff7] mb-1"><FaUsers /> <span className="font-mono">{eq.name}</span></div>
                  <div className="text-base text-gray-200 mb-2 font-mono">{eq.description}</div>
                  <div className="text-base font-bold font-mono"><span className="text-[#39ff14]">Miembros: <span className="font-extrabold">{eq.members.length}</span></span></div>
                  <div className="text-base font-mono text-[#a259ff]">Creado: {eq.createdAt instanceof Date ? eq.createdAt.toISOString().slice(0,10) : new Date(eq.createdAt).toISOString().slice(0,10)}</div>
                </div>
              ))}
              {equiposFiltrados.length === 0 && <div className="text-[#ff3b3b] text-center col-span-2">No tienes equipos.</div>}
            </div>
          </div>
        )}
        {/* Explorar Equipos - Cards y botón unirse (mock) */}
        {tab === 'buscar' && (
          <div className="w-full">
            <h2 className="text-2xl font-bold text-[#00fff7] mb-4">Explorar Equipos</h2>
            <input type="text" placeholder="Buscar equipo..." value={busquedaExplorar} onChange={e => setBusquedaExplorar(e.target.value)} className="mb-4 px-3 py-2 rounded bg-[#101926]/80 border border-[#00fff7] text-white w-full font-mono" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equiposExplorarFiltrados.map(eq => (
                <div key={eq._id} className="bg-[#232b36]/80 border-2 border-[#00fff7] rounded-2xl p-6 flex flex-col gap-2 shadow-[0_0_24px_#00fff7] hover:scale-105 transition animate-fade-in-up cursor-pointer font-mono" onClick={() => setDetalleEquipo(eq)}>
                  <div className="flex items-center gap-2 text-2xl font-extrabold text-[#00fff7] mb-1"><FaUsers /> <span className="font-mono">{eq.name}</span></div>
                  <div className="text-base text-gray-200 mb-2 font-mono">{eq.description}</div>
                  <div className="text-base font-bold font-mono"><span className="text-[#39ff14]">Miembros: <span className="font-extrabold">{eq.members.length}</span></span></div>
                  <div className="text-base font-mono text-[#a259ff]">Creado: {eq.createdAt instanceof Date ? eq.createdAt.toISOString().slice(0,10) : new Date(eq.createdAt).toISOString().slice(0,10)}</div>
                  {/* Solo mostrar botón si el usuario NO es miembro */}
                  {!eq.members.includes(usuarioActual) && (
                    <button className={`mt-2 px-4 py-2 rounded-full font-bold border-2 ${unido === eq._id ? 'bg-[#39ff14] text-black border-[#39ff14]' : 'bg-[#00fff7] text-black border-[#00fff7] hover:bg-[#39ff14] hover:border-[#39ff14]'} transition`} onClick={e => { e.stopPropagation(); setUnido(eq._id); setFeedback('¡Solicitud de unión enviada!'); setTimeout(() => setFeedback(''), 2000); }}> {unido === eq._id ? 'Solicitud enviada' : 'Unirse'} </button>
                  )}
                </div>
              ))}
              {equiposExplorarFiltrados.length === 0 && <div className="text-[#ff3b3b] text-center col-span-2">No se encontraron equipos.</div>}
            </div>
          </div>
        )}
        {/* Crear Equipo - Formulario visual y chips de miembros (mock) */}
        {tab === 'crear' && (
          <div className="w-full max-w-xl mx-auto animate-fade-in-up">
            <h2 className="text-2xl font-bold text-[#00fff7] mb-4">Crear Equipo</h2>
            <form className="flex flex-col gap-4 bg-[#232b36]/80 border-2 border-[#00fff7] rounded-2xl p-6" onSubmit={e => {
              e.preventDefault();
              if (!nuevoEquipo.nombre.trim()) return setFeedback('El nombre es obligatorio');
              if (equipos.some(eq => eq.name.toLowerCase() === nuevoEquipo.nombre.trim().toLowerCase())) {
                setFeedback('Ya existe un equipo con ese nombre');
                return;
              }
              const nuevo = {
                _id: Date.now().toString(),
                name: nuevoEquipo.nombre.trim(),
                description: nuevoEquipo.descripcion,
                leader: usuarioActual,
                members: [usuarioActual, ...usuariosSeleccionados.map(u => u.nombre)],
                points: 0,
                rank: 0,
                logo: '',
                createdAt: new Date(),
                updatedAt: new Date(),
              };
              setEquipos(prev => [...prev, nuevo]);
              setEquiposExplorar(prev => [...prev, nuevo]);
              setNuevoEquipo({ nombre: '', descripcion: '' });
              setUsuariosSeleccionados([]);
              setFeedback('¡Equipo creado!');
              setTimeout(() => setFeedback(''), 2500);
              setTimeout(() => {
                const cards = document.querySelectorAll('.card-equipo');
                if (cards.length > 0) cards[cards.length-1].scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 300);
            }}>
              <input ref={inputCrearRef} type="text" placeholder="Nombre del equipo" className="px-4 py-2 rounded bg-[#181a20] border border-[#00fff7] text-[#00fff7]" value={nuevoEquipo.nombre} onChange={e => setNuevoEquipo({ ...nuevoEquipo, nombre: e.target.value })} />
              <textarea placeholder="Descripción" className="px-4 py-2 rounded bg-[#181a20] border border-[#00fff7] text-[#00fff7]" value={nuevoEquipo.descripcion} onChange={e => setNuevoEquipo({ ...nuevoEquipo, descripcion: e.target.value })} />
              <input type="text" placeholder="Buscar usuario para agregar..." className="px-4 py-2 rounded bg-[#181a20] border border-[#00fff7] text-[#00fff7]" value={miembroBusqueda} onChange={e => setMiembroBusqueda(e.target.value)} />
              {/* Sugerencias de usuarios */}
              {miembroBusqueda && (
                <div className="bg-[#181c2b] border border-[#00fff7] rounded-lg mt-1 max-h-32 overflow-y-auto">
                  {mockUsuarios.filter(u =>
                    (u.nombre.toLowerCase().includes(miembroBusqueda.toLowerCase()) ||
                     u.correo.toLowerCase().includes(miembroBusqueda.toLowerCase())) &&
                    !usuariosSeleccionados.some(sel => sel.id === u.id)
                  ).map(u => (
                    <div key={u.id} className="px-3 py-2 hover:bg-[#00fff7] hover:text-black cursor-pointer flex items-center gap-2" onClick={() => {
                      setUsuariosSeleccionados([...usuariosSeleccionados, u]);
                      setMiembroBusqueda('');
                    }}>
                      <span>{u.nombre} <span className="text-xs text-gray-400">({u.correo})</span></span>
                    </div>
                  ))}
                  {mockUsuarios.filter(u =>
                    (u.nombre.toLowerCase().includes(miembroBusqueda.toLowerCase()) ||
                     u.correo.toLowerCase().includes(miembroBusqueda.toLowerCase())) &&
                    !usuariosSeleccionados.some(sel => sel.id === u.id)
                  ).length === 0 && <div className="px-3 py-2 text-gray-400">Sin resultados</div>}
                </div>
              )}
              {/* Chips de usuarios seleccionados */}
              <div className="flex flex-wrap gap-2 mt-2">
                {usuariosSeleccionados.map(u => (
                  <span key={u.id} className="flex items-center gap-1 bg-[#101926] border border-[#00fff7] rounded-full px-3 py-1 text-[#00fff7] text-sm">
                    {u.nombre}
                    <button type="button" className="ml-1 text-[#ff3b3b] hover:text-white" onClick={() => setUsuariosSeleccionados(usuariosSeleccionados.filter(sel => sel.id !== u.id))}>×</button>
                  </span>
                ))}
              </div>
              <button type="submit" className="mt-2 px-6 py-2 bg-[#00fff7] text-[#181a20] rounded-full font-bold hover:bg-[#39ff14] transition">Crear equipo</button>
            </form>
          </div>
        )}
        {/* Modal de detalle de equipo con tabs y funcionalidades */}
        {detalleEquipo && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setDetalleEquipo(null); }}>
            <div className="bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl p-8 shadow-2xl w-full max-w-2xl animate-fade-in-up relative">
              <button className="absolute top-2 right-2 text-[#00fff7] text-3xl font-extrabold bg-[#232b36] border-2 border-[#00fff7] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#00fff7] hover:text-black transition" onClick={() => setDetalleEquipo(null)} title="Cerrar">×</button>
              {/* Tabs */}
              <div className="flex gap-4 mb-6 justify-center">
                <button onClick={() => setTabDetalle('resumen')} className={`px-4 py-2 rounded font-bold text-base border-2 ${tabDetalle==='resumen'?'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_8px_#00fff7]':'bg-transparent text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'} transition`}>Resumen</button>
                <button onClick={() => setTabDetalle('miembros')} className={`px-4 py-2 rounded font-bold text-base border-2 ${tabDetalle==='miembros'?'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_8px_#00fff7]':'bg-transparent text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'} transition`}>Miembros</button>
                <button onClick={() => setTabDetalle('historial')} className={`px-4 py-2 rounded font-bold text-base border-2 ${tabDetalle==='historial'?'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_8px_#00fff7]':'bg-transparent text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'} transition`}>Historial</button>
                <button onClick={() => setTabDetalle('logros')} className={`px-4 py-2 rounded font-bold text-base border-2 ${tabDetalle==='logros'?'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_8px_#00fff7]':'bg-transparent text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'} transition`}>Logros</button>
                <button onClick={() => setTabDetalle('chat')} className={`px-4 py-2 rounded font-bold text-base border-2 ${tabDetalle==='chat'?'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_8px_#00fff7]':'bg-transparent text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'} transition`}>Chat</button>
              </div>
              {/* Tab content */}
              {tabDetalle==='resumen' && (
                <div>
                  <div className="flex items-center gap-2 mb-2 text-2xl font-bold text-[#00fff7]"><FaUsers /> {detalleEquipo.name}</div>
                  <div className="text-base text-gray-300 mb-2">{detalleEquipo.description}</div>
                  <div className="text-base text-[#39ff14] mb-2">Miembros: {detalleEquipo.members.length}</div>
                  <div className="text-base text-[#a259ff] mb-2">Creado: {detalleEquipo.createdAt instanceof Date ? detalleEquipo.createdAt.toISOString().slice(0,10) : new Date(detalleEquipo.createdAt).toISOString().slice(0,10)}</div>
                  <div className="text-base text-[#00fff7] mb-2 flex items-center gap-2"><FaCrown color="#FFD700" /> Líder: {detalleEquipo.leader}</div>
                  <div className="text-base text-[#00fff7] mb-2">Puntos: {detalleEquipo.points}</div>
                  {/* Acciones de equipo */}
                  <div className="flex gap-2 mt-4">
                    {detalleEquipo.leader === usuarioActual && <button className="px-4 py-2 rounded bg-[#00fff7] text-black font-bold hover:bg-[#39ff14] transition"><FaUserEdit /> Editar equipo</button>}
                    {detalleEquipo.leader === usuarioActual && detalleEquipo.members.length === 1 && <button className="px-4 py-2 rounded bg-[#ff3b3b] text-white font-bold hover:bg-[#ff5f5f] transition"><FaTimes /> Eliminar equipo</button>}
                    {detalleEquipo.leader !== usuarioActual && <button className="px-4 py-2 rounded bg-[#ff3b3b] text-white font-bold hover:bg-[#ff5f5f] transition"><FaTimes /> Abandonar equipo</button>}
                  </div>
                </div>
              )}
              {tabDetalle==='miembros' && (
                <div>
                  <div className="font-bold text-[#00fff7] mb-2 text-lg">Miembros del equipo</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {detalleEquipo.members.map((m, idx) => (
                      <div key={m+idx} className="flex items-center gap-3 bg-[#101926]/70 border border-[#00fff7] rounded-lg px-3 py-2 relative">
                        <span className="font-bold text-[#00fff7]">{m}</span>
                        {detalleEquipo.leader === m && <FaCrown color="#FFD700" title="Líder" />}
                        {detalleEquipo.leader === usuarioActual && m !== usuarioActual && (
                          <button className="ml-auto text-red-400 hover:text-red-600" title="Eliminar miembro"><FaUserMinus /></button>
                        )}
                        {detalleEquipo.leader === usuarioActual && m !== usuarioActual && (
                          <button className="ml-2 text-[#FFD700] hover:text-[#00fff7]" title="Transferir liderazgo"><FaExchangeAlt /></button>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Invitar miembro (mock visual) */}
                  {detalleEquipo.leader === usuarioActual && (
                    <button className="mt-4 px-4 py-2 bg-[#00fff7] text-[#181a20] rounded-full font-bold flex items-center gap-2"><FaPlus />Invitar miembro</button>
                  )}
                </div>
              )}
              {tabDetalle==='historial' && (
                <div>
                  <div className="font-bold text-[#00fff7] mb-2 text-lg">Historial de actividades</div>
                  <div className="flex flex-col gap-2">
                    {activityHistory.map(ev => (
                      <div key={ev.id} className="flex items-center gap-2 bg-[#101926]/70 border-l-4 rounded-lg px-3 py-2"
                        style={{ borderColor: ev.type === 'join' ? '#39ff14' : ev.type === 'leave' ? '#ff3b3b' : ev.type === 'leader' ? '#FFD700' : ev.type === 'trophy' ? '#00fff7' : '#00fff7' }}>
                        <span>
                          {ev.type === 'join' && <FaCheck color="#39ff14" size={18} />}
                          {ev.type === 'leave' && <FaTimes color="#ff3b3b" size={18} />}
                          {ev.type === 'leader' && <FaExchangeAlt color="#FFD700" size={18} />}
                          {ev.type === 'trophy' && <FaTrophy color="#00fff7" size={18} />}
                        </span>
                        <span className="flex-1 text-xs text-gray-200">{ev.text}</span>
                        <span className="text-[10px] text-gray-400">{ev.date}</span>
                      </div>
                    ))}
                    {activityHistory.length === 0 && <div className="text-gray-400 text-center">Sin actividad reciente.</div>}
                  </div>
                </div>
              )}
              {tabDetalle==='logros' && (
                <div>
                  <div className="font-bold text-[#00fff7] mb-2 text-lg">Logros del equipo</div>
                  <div className="flex flex-wrap gap-4">
                    {achievements.map(a => (
                      <div key={a.id} className={`flex flex-col items-center p-4 rounded-xl border-2 ${a.unlocked ? 'border-[#00fff7] bg-[#232b36]' : 'border-gray-600 bg-[#181c2b]'}`}>
                        <span className="text-3xl mb-2">{a.icon}</span>
                        <span className="font-bold text-[#00fff7]">{a.name}</span>
                        <span className="text-xs text-gray-400">{a.unlocked ? `Desbloqueado: ${a.date}` : 'Bloqueado'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tabDetalle==='chat' && (
                <div>
                  <div className="font-bold text-[#00fff7] mb-2 text-lg flex items-center gap-2"><FaCommentDots /> Chat del equipo</div>
                  <div className="bg-[#101926]/70 border border-[#00fff7] rounded-lg p-3 max-h-56 overflow-y-auto flex flex-col gap-2 mb-2" style={{ minHeight: 120 }}>
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.user === usuarioActual ? 'justify-end' : 'justify-start'}`}> 
                        <div className={`px-3 py-1 rounded-xl max-w-[70%] ${msg.user === usuarioActual ? 'bg-[#00fff7] text-black' : 'bg-[#232b36] text-[#00fff7] border border-[#00fff7]'}`}> 
                          <span className="block text-xs font-bold">{msg.user}</span>
                          <span className="block text-sm">{msg.text}</span>
                          <span className="block text-[10px] text-right text-gray-400">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form className="flex gap-2" onSubmit={e => { e.preventDefault(); if (chatInput.trim()) { setChatMessages(msgs => [...msgs, { id: Date.now(), user: usuarioActual, text: chatInput, time: new Date().toLocaleTimeString().slice(0,5) }]); setChatInput(''); } }}>
                    <input type="text" className="flex-1 px-3 py-2 rounded bg-[#101926] border border-[#00fff7] text-[#00fff7] placeholder-gray-400 focus:outline-none font-mono" placeholder="Escribe un mensaje..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
                    <button type="submit" className="px-4 py-2 rounded bg-[#00fff7] text-black font-bold hover:bg-[#39ff14] animate-glow">Enviar</button>
                  </form>
                </div>
              )}
              {/* Notificaciones (mock visual) */}
              <div className="mt-8">
                <div className="font-bold text-[#00fff7] mb-2 flex items-center gap-2"><FaBell /> Notificaciones</div>
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                  {notificaciones.length === 0 && <div className="text-gray-400 text-center">Sin notificaciones.</div>}
                  {notificaciones.map(n => (
                    <div key={n.id} className={`text-sm mb-1 ${n.leida ? 'text-gray-400' : 'text-white font-bold'}`}>{n.texto}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage; 