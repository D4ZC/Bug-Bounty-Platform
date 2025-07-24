import React, { useState, useEffect } from 'react';
import { FaUsers, FaPlus, FaSearch, FaTrash, FaUserPlus, FaCrown, FaBell, FaUserEdit, FaSignOutAlt, FaExchangeAlt, FaEllipsisV, FaCheck, FaTimes, FaCommentDots, FaUserMinus, FaTrophy } from 'react-icons/fa';
import { apiService } from '../services/api';
import { Team } from '../types';
import socketService from '../services/socket';
import { useBackground } from '../contexts/BackgroundContext';

// Mock de datos
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
const mockNotificaciones = [
  { id: 1, texto: 'OCAMPO añadió a María García', leida: false },
  { id: 2, texto: 'Invitación pendiente para CyberGuard', leida: false },
];
const mockActividad = [
  { id: 1, texto: 'OCAMPO añadió a María García', fecha: '2024-07-15' },
  { id: 2, texto: 'La descripción del equipo fue actualizada por Administrador', fecha: '2024-07-14' },
];

const Equipos: React.FC = () => {
  const { backgroundUrl } = useBackground();
  const [tab, setTab] = useState<'miEquipo' | 'buscar' | 'crear'>('miEquipo');
  const [equipos, setEquipos] = useState<Team[]>(mockEquipos);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<any | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [nuevoEquipo, setNuevoEquipo] = useState({ nombre: '', descripcion: '' });
  const [miembroBusqueda, setMiembroBusqueda] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showNotificaciones, setShowNotificaciones] = useState(false);
  const [showEditarPerfil, setShowEditarPerfil] = useState(false);
  const [perfilEditable, setPerfilEditable] = useState({ nombre: 'OCAMPO', correo: 'ocampo@correo.com', rol: 'Líder' });
  const [showModalConfirm, setShowModalConfirm] = useState<{ accion: string, data?: any } | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [errorTeams, setErrorTeams] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState({ name: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [notifications, setNotifications] = useState([
    { id: '1', text: '¡Nuevo miembro se unió al equipo!', type: 'info', read: false },
    { id: '2', text: 'Has sido promovido a líder.', type: 'success', read: false },
    { id: '3', text: 'Invitación rechazada por juan@correo.com', type: 'warning', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', user: 'OCAMPO', text: '¡Bienvenidos al equipo!', time: '10:00' },
    { id: '2', user: 'sofia', text: '¡Gracias! ¿Cuándo la próxima reunión?', time: '10:01' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [activityHistory, setActivityHistory] = useState([
    { id: '1', type: 'join', user: 'sofia', text: 'Sofía se unió al equipo', date: '2024-06-01 10:00' },
    { id: '2', type: 'leave', user: 'juan', text: 'Juan salió del equipo', date: '2024-06-01 09:00' },
    { id: '3', type: 'leader', user: 'OCAMPO', text: 'OCAMPO transfirió el liderazgo a Sofía', date: '2024-05-31 18:00' },
    { id: '4', type: 'trophy', user: 'equipo', text: '¡El equipo ganó un trofeo!', date: '2024-05-30 20:00' },
  ]);
  const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [mentionList, setMentionList] = useState(['OCAMPO', 'sofia', 'juan']);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [reactions, setReactions] = useState<{ [msgId: string]: { [emoji: string]: string[] } }>({});
  const [visibilidad, setVisibilidad] = useState<'publico' | 'privado' | 'secreto'>('publico');
  const [mensajeBienvenida, setMensajeBienvenida] = useState('');
  const [iconoEquipo, setIconoEquipo] = useState<string | null>(null);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<any[]>([]);

  // Integración de socket real (sin simulación)
  useEffect(() => {
    if (!equipoSeleccionado) return;
    let cleanupFns: (() => void)[] = [];
    if (socketService.socketInstance) {
      setIsSocketConnected(true);
      // Escuchar mensajes de chat
      const chatListener = (msg: any) => {
        setChatMessages(msgs => [...msgs, msg]);
      };
      socketService.socketInstance.on('team:chat', chatListener);
      cleanupFns.push(() => socketService.socketInstance?.off('team:chat', chatListener));
      // Escuchar notificaciones
      const notifListener = (notif: any) => {
        setNotifications(n => [notif, ...n]);
      };
      socketService.socketInstance.on('team:notification', notifListener);
      cleanupFns.push(() => socketService.socketInstance?.off('team:notification', notifListener));
      // Escuchar actividades
      const activityListener = (act: any) => {
        setActivityHistory(h => [act, ...h]);
      };
      socketService.socketInstance.on('team:activity', activityListener);
      cleanupFns.push(() => socketService.socketInstance?.off('team:activity', activityListener));
      // Escuchar typing
      const typingListener = (user: string) => {
        setIsSomeoneTyping(true);
        setTimeout(() => setIsSomeoneTyping(false), 2000);
      };
      socketService.socketInstance.on('team:typing', typingListener);
      cleanupFns.push(() => socketService.socketInstance?.off('team:typing', typingListener));
      return () => { cleanupFns.forEach(fn => fn()); };
    } else {
      setIsSocketConnected(false);
    }
  }, [equipoSeleccionado]);

  useEffect(() => {
    if (tab === 'buscar') {
      setLoadingTeams(true);
      setErrorTeams(null);
      apiService.get<Team[]>('/teams')
        .then(res => {
          setTeams(res.data || []);
          setLoadingTeams(false);
        })
        .catch(err => {
          setErrorTeams('Error al cargar equipos');
          setLoadingTeams(false);
        });
    }
  }, [tab]);

  // Filtrar equipos por búsqueda
  const equiposFiltrados = equipos.filter(e =>
    e.name.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.description.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Filtrar usuarios para agregar
  const usuariosParaAgregar = mockUsuarios.filter(u =>
    !equipoSeleccionado?.members.some((m: any) => m.id === u.id) &&
    (u.nombre.toLowerCase().includes(miembroBusqueda.toLowerCase()) || u.correo.toLowerCase().includes(miembroBusqueda.toLowerCase()))
  );

  // Handlers
  const handleCrearEquipo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoEquipo.nombre) return setFeedback('El nombre es obligatorio');
    setEquipos([...equipos, {
      _id: Date.now().toString(),
      name: nuevoEquipo.nombre,
      description: '',
      leader: 'Tú',
      members: usuariosSeleccionados.map(u => u.nombre),
      points: 0,
      rank: 0,
      logo: iconoEquipo || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
    setTeams(prev => Array.isArray(prev) ? [...prev, {
      _id: Date.now().toString(),
      name: nuevoEquipo.nombre,
      description: '',
      leader: 'Tú',
      members: usuariosSeleccionados.map(u => u.nombre),
      points: 0,
      rank: 0,
      logo: iconoEquipo || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }] : [{
      _id: Date.now().toString(),
      name: nuevoEquipo.nombre,
      description: '',
      leader: 'Tú',
      members: usuariosSeleccionados.map(u => u.nombre),
      points: 0,
      rank: 0,
      logo: iconoEquipo || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
    setNuevoEquipo({ nombre: '', descripcion: '' });
    setFeedback('¡Equipo creado!');
  };
  const handleSeleccionarEquipo = (equipo: any) => {
    setEquipoSeleccionado(equipo);
    setTab('miEquipo');
    setFeedback('');
  };
  const handleAgregarMiembro = (usuario: any) => {
    setEquipos(equipos.map(eq => eq._id === equipoSeleccionado._id ? {
      ...eq,
      members: [...eq.members, usuario.id],
    } : eq));
    setEquipoSeleccionado({
      ...equipoSeleccionado,
      members: [...equipoSeleccionado.members, usuario.id],
    });
    setFeedback(`Usuario ${usuario.nombre} añadido.`);
  };
  const handleEliminarMiembro = (usuarioId: string) => {
    setEquipos(equipos.map(eq => eq._id === equipoSeleccionado._id ? {
      ...eq,
      members: eq.members.filter((m: string) => m !== usuarioId),
    } : eq));
    setEquipoSeleccionado({
      ...equipoSeleccionado,
      members: equipoSeleccionado.members.filter((m: string) => m !== usuarioId),
    });
    setFeedback('Miembro eliminado.');
  };

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateSuccess(null);
    try {
      const res = await apiService.post<Team>('/teams', {
        name: createForm.name,
        description: createForm.description,
      });
      setCreateSuccess('¡Equipo creado exitosamente!');
      setCreateForm({ name: '', description: '' });
      // Agrega el nuevo equipo a ambas listas locales
      const now = new Date();
      const nuevoEquipo: Team = {
        _id: res.data?._id || Date.now().toString(),
        name: res.data?.name || createForm.name,
        description: res.data?.description || createForm.description,
        leader: res.data?.leader || 'Tú',
        members: res.data?.members || [],
        points: res.data?.points || 0,
        rank: res.data?.rank || 0,
        logo: res.data?.logo || '',
        createdAt: res.data?.createdAt ? new Date(res.data.createdAt) : now,
        updatedAt: res.data?.updatedAt ? new Date(res.data.updatedAt) : now,
      };
      setEquipos(prev => Array.isArray(prev) ? [...prev, nuevoEquipo] : [nuevoEquipo]);
      setTeams(prev => Array.isArray(prev) ? [...prev, nuevoEquipo] : [nuevoEquipo]);
      setEquipoSeleccionado(nuevoEquipo);
      setTab('miEquipo');
    } catch (err) {
      setFeedback('Error al crear el equipo');
    } finally {
      setCreating(false);
    }
  };

  const handleJoinTeam = async (teamId: string) => {
    setJoiningId(teamId);
    setJoinError(null);
    setJoinSuccess(null);
    try {
      await apiService.post(`/teams/${teamId}/join`);
      setJoinSuccess('¡Solicitud enviada!');
      // Opcional: actualizar estado del equipo o usuario
    } catch (err) {
      setJoinError('Error al unirse al equipo');
    } finally {
      setJoiningId(null);
    }
  };

  const handleMarkNotification = (id: string) => {
    setNotifications(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  };
  const handleDeleteNotification = (id: string) => {
    setNotifications(n => n.filter(notif => notif.id !== id));
  };
  // Emitir mensaje de chat o typing
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const msg = { id: Date.now().toString(), user: 'Tú', text: chatInput, time: new Date().toLocaleTimeString().slice(0,5) };
      setChatMessages(msgs => [...msgs, msg]);
      if (isSocketConnected && socketService.socketInstance) {
        socketService.socketInstance.emit('team:chat', msg);
      }
      setChatInput('');
    }
  };
  const handleTyping = () => {
    if (isSocketConnected && socketService.socketInstance) {
      socketService.socketInstance.emit('team:typing', 'Tú');
    }
  };

  // Menciones: autocompletado simple
  const handleChatInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setChatInput(val);
    const match = val.match(/@([\w]*)$/);
    if (match) {
      setMentionQuery(match[1]);
      setShowMentionDropdown(true);
    } else {
      setShowMentionDropdown(false);
      setMentionQuery('');
    }
  };
  const handleSelectMention = (user: string) => {
    setChatInput(chatInput.replace(/@([\w]*)$/, `@${user} `));
    setShowMentionDropdown(false);
    setMentionQuery('');
  };
  // Resalta menciones en mensajes
  const renderMessageText = (text: string) => {
    return text.split(/(\s+)/).map((part, i) =>
      part.startsWith('@') && mentionList.includes(part.slice(1)) ? (
        <span key={i} className="text-[#39ff14] font-bold">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };
  // Reacciones a mensajes
  const emojis = ['👍', '😂', '🔥', '🎉', '😮'];
  const handleReact = (msgId: string, emoji: string) => {
    setReactions(prev => {
      const users = prev[msgId]?.[emoji] || [];
      const hasReacted = users.includes('Tú');
      return {
        ...prev,
        [msgId]: {
          ...prev[msgId],
          [emoji]: hasReacted ? users.filter(u => u !== 'Tú') : [...users, 'Tú']
        }
      };
    });
  };
  // Panel de logros/trofeos
  // Elimina la función unlockAchievement y cualquier referencia a setAchievements y setShowAchievementAnim.

  // Mostrar mensaje de éxito y ocultarlo después de 3 segundos
  useEffect(() => {
    if (createSuccess) {
      const timer = setTimeout(() => setCreateSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [createSuccess]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 font-mono" style={{ background: backgroundUrl ? `url(${backgroundUrl}) center/cover no-repeat` : 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
      <div className="w-full max-w-6xl mx-auto bg-[#181c2b]/90 border-2 border-[#00fff7] rounded-3xl p-10 flex flex-col items-center relative animate-fade-in-up">
        {/* Barra superior: Dashboard, notificaciones, perfil */}
        <div className="w-full flex flex-row items-center justify-between mb-10">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-extrabold text-[#00fff7] drop-shadow-[0_0_8px_#00fff7]">Bienvenido, {perfilEditable.nombre}</span>
            <span className="text-xs text-[#a259ff] font-bold tracking-widest uppercase">Mi Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowNotificaciones(!showNotificaciones)} className="relative text-3xl text-[#00fff7] hover:text-[#39ff14] transition animate-glow"><FaBell />
              {mockNotificaciones.some(n => !n.leida) && <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff3b3b] rounded-full" />}
            </button>
            <button onClick={() => setShowEditarPerfil(true)} className="text-3xl text-[#00fff7] hover:text-[#39ff14] transition animate-glow"><FaUserEdit /></button>
          </div>
        </div>
        {/* Notificaciones (mock) */}
        {showNotificaciones && (
          <div className="absolute top-24 right-8 bg-[#232b36]/95 border-2 border-[#00fff7] rounded-2xl shadow-2xl p-6 w-80 z-50 animate-fade-in-up">
            <div className="font-bold text-[#00fff7] mb-2 text-lg flex items-center gap-2"><FaBell /> Notificaciones</div>
            {mockNotificaciones.map(n => (
              <div key={n.id} className={`text-sm mb-1 ${n.leida ? 'text-gray-400' : 'text-white font-bold'}`}>{n.texto}</div>
            ))}
            {mockNotificaciones.length === 0 && <div className="text-xs text-gray-400">Sin notificaciones.</div>}
          </div>
        )}
        {/* Modal editar perfil */}
        {showEditarPerfil && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setShowEditarPerfil(false); }}>
            <div className="bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl p-10 shadow-2xl w-full max-w-md animate-fade-in-up">
              <div className="text-2xl font-bold text-[#00fff7] mb-6">Editar Perfil</div>
              <form className="flex flex-col gap-4">
                <input type="text" value={perfilEditable.nombre} onChange={e => setPerfilEditable(p => ({ ...p, nombre: e.target.value }))} className="px-3 py-2 rounded bg-[#101926] border border-[#00fff7] text-white font-mono" placeholder="Nombre" />
                <input type="email" value={perfilEditable.correo} onChange={e => setPerfilEditable(p => ({ ...p, correo: e.target.value }))} className="px-3 py-2 rounded bg-[#101926] border border-[#00fff7] text-white font-mono" placeholder="Correo" />
                <select value={perfilEditable.rol} onChange={e => setPerfilEditable(p => ({ ...p, rol: e.target.value }))} className="px-3 py-2 rounded bg-[#101926] border border-[#00fff7] text-white font-mono">
                  <option value="Líder">Líder</option>
                  <option value="Miembro">Miembro</option>
                  <option value="Invitado">Invitado</option>
                </select>
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setShowEditarPerfil(false)} className="px-4 py-2 rounded-lg bg-gray-500 text-white font-bold font-mono">Cancelar</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-[#00fff7] text-black font-bold font-mono animate-glow">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Tabs principales */}
        <div className="flex gap-6 mb-10">
          <button onClick={() => { setTab('miEquipo'); setEquipoSeleccionado(null); }} className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 border-2 ${tab === 'miEquipo' ? 'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_16px_#00fff7]' : 'bg-[#232b36] text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'}`}> <span className="inline-flex items-center gap-2"><FaUsers size={22} color={tab === 'miEquipo' ? '#000' : '#00fff7'} />Mi equipo</span></button>
          <button onClick={() => { setTab('buscar'); setEquipoSeleccionado(null); }} className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 border-2 ${tab === 'buscar' ? 'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_16px_#00fff7]' : 'bg-[#232b36] text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'}`}> <span className="inline-flex items-center gap-2"><FaSearch size={22} color={tab === 'buscar' ? '#000' : '#00fff7'} />Explorar Equipos</span></button>
          <button onClick={() => { setTab('crear'); setEquipoSeleccionado(null); }} className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 border-2 ${tab === 'crear' ? 'bg-[#00fff7] text-black border-[#00fff7] shadow-[0_0_16px_#00fff7]' : 'bg-[#232b36] text-[#00fff7] border-[#00fff7] hover:bg-[#00fff7] hover:text-black'}`}> <span className="inline-flex items-center gap-2"><FaPlus size={22} color={tab === 'crear' ? '#000' : '#00fff7'} />Crear Equipo</span></button>
        </div>
        {/* Feedback/toast */}
        {feedback && <div className="mb-6 text-[#39ff14] font-bold text-lg animate-fade-in-up">{feedback}</div>}
        {createSuccess && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#181c2b]/90 border-2 border-[#00fff7] rounded-xl px-8 py-4 text-[#39ff14] font-bold text-xl shadow-2xl animate-fade-in-up">
            {createSuccess}
          </div>
        )}
        {/* Mis Equipos */}
        {tab === 'miEquipo' && !equipoSeleccionado && (
          <div className="w-full">
            <h2 className="text-2xl font-bold text-[#00fff7] mb-4">Mis Equipos</h2>
            <input type="text" placeholder="Buscar equipo..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="mb-4 px-3 py-2 rounded bg-[#101926]/80 border border-[#00fff7] text-white w-full font-mono" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equiposFiltrados.map(eq => (
                <div key={eq._id} className="bg-[#232b36]/80 border-2 border-[#00fff7] rounded-2xl p-4 flex flex-col gap-2 shadow-[0_0_24px_#00fff7] hover:scale-105 transition animate-fade-in-up cursor-pointer" onClick={() => handleSeleccionarEquipo(eq)}>
                  <div className="flex items-center gap-2 text-lg font-bold text-[#00fff7]"><FaUsers size={18} color="#00fff7" />{eq.name}</div>
                  <div className="text-xs text-gray-300">{eq.description}</div>
                  <div className="text-xs text-[#39ff14]">Miembros: {eq.members.length}</div>
                  <div className="text-xs text-[#a259ff]">Creado: {eq.createdAt instanceof Date ? eq.createdAt.toISOString().slice(0,10) : new Date(eq.createdAt).toISOString().slice(0,10)}</div>
                </div>
              ))}
              {equiposFiltrados.length === 0 && <div className="text-[#ff3b3b] text-center col-span-2">No tienes equipos.</div>}
            </div>
          </div>
        )}
        {/* Detalles de Equipo seleccionado (restaurado) */}
        {tab === 'miEquipo' && equipoSeleccionado && (
          <div className="glass-card p-6 rounded-2xl shadow-xl border-2 border-[#00fff7] max-w-2xl w-full mx-auto mb-8 bg-[#232b36]/60 backdrop-blur-md relative animate-fade-in-up">
            {/* Botón de notificaciones */}
            <button
              className="absolute top-4 right-4 text-[#00fff7] hover:text-[#39ff14] text-2xl z-20"
              onClick={() => setShowNotifications(v => !v)}
              aria-label="Ver notificaciones"
            >
              <FaBell />
              {notifications.some(n => !n.read) && <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff3b3b] rounded-full border-2 border-[#232b36]" />}
            </button>
            {/* Panel de notificaciones */}
            {showNotifications && (
              <div className="absolute top-12 right-4 w-80 bg-[#232b36]/95 border-2 border-[#00fff7] rounded-xl shadow-xl z-30 p-4 animate-fade-in-up">
                <div className="font-bold text-[#00fff7] mb-2 flex items-center gap-2"><FaBell /> Notificaciones</div>
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                  {notifications.length === 0 && <div className="text-gray-400 text-center">Sin notificaciones.</div>}
                  {notifications.map(n => (
                    <div key={n.id} className={`flex items-center gap-2 p-2 rounded-lg ${n.read ? 'bg-[#101926]/60' : 'bg-[#101926]/90 border-l-4 border-[#00fff7]'}`}>
                      <span className="text-sm font-bold text-[#00fff7]">{n.text}</span>
                      <span className="text-xs text-gray-400">{n.type}</span>
                      <button onClick={() => handleMarkNotification(n.id)} className="text-xs text-[#00fff7] hover:text-[#39ff14] ml-auto">
                        <FaCheck />
                      </button>
                      <button onClick={() => handleDeleteNotification(n.id)} className="text-xs text-[#ff3b3b] hover:text-[#ff1414] ml-2">
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Panel de actividad */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-[#00fff7] mb-4 flex items-center gap-2"><FaCommentDots /> Actividad</h3>
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
                {activityHistory.length === 0 && <div className="text-gray-400 text-center">No hay actividad reciente.</div>}
                {activityHistory.map(act => (
                  <div key={act.id} className="text-sm text-gray-300">
                    <span className="font-bold text-[#00fff7]">{act.user}:</span> {act.text} ({act.date})
                  </div>
                ))}
              </div>
            </div>
            {/* Panel de chat */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-[#00fff7] mb-4 flex items-center gap-2"><FaCommentDots /> Chat</h3>
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
                {chatMessages.length === 0 && <div className="text-gray-400 text-center">No hay mensajes.</div>}
                {chatMessages.map(msg => (
                  <div key={msg.id} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="font-bold text-[#00fff7]">{msg.user}</span>
                    <span>{renderMessageText(msg.text)}</span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                    {reactions[msg.id] && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        {Object.entries(reactions[msg.id]).map(([emoji, users]) => (
                          <span key={emoji} title={`${users.length} ${emoji}`}>{emoji}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendChat} className="flex items-center gap-2 mt-4">
                <input
                  type="text"
                  value={chatInput}
                  onChange={handleChatInput}
                  onKeyPress={e => { if (e.key === 'Enter') handleSendChat(e); }}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-3 py-2 rounded bg-[#101926] border border-[#00fff7] text-white font-mono"
                />
                <button type="submit" className="p-2 rounded-full bg-[#00fff7] text-black hover:bg-[#39ff14] transition-colors">
                  <FaCommentDots />
                </button>
              </form>
              {isSomeoneTyping && <span className="text-xs text-gray-400">Alguien está escribiendo...</span>}
            </div>
            {/* Panel de miembros */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-[#00fff7] mb-4 flex items-center gap-2"><FaUsers /> Miembros</h3>
              <div className="flex flex-col gap-2">
                {equipoSeleccionado.members.map((miembro: string) => (
                  <div key={miembro} className="flex items-center justify-between p-2 rounded-lg bg-[#101926]/60">
                    <span className="font-bold text-[#00fff7]">{miembro}</span>
                    <button onClick={() => handleEliminarMiembro(miembro)} className="text-red-500 hover:text-red-300 text-lg">
                      <FaUserMinus />
                    </button>
                  </div>
                ))}
                {equipoSeleccionado.members.length === 0 && <div className="text-gray-400 text-center">No hay miembros en este equipo.</div>}
              </div>
              <div className="mt-4 flex gap-2">
                <input type="text" placeholder="Buscar miembro..." value={miembroBusqueda} onChange={e => setMiembroBusqueda(e.target.value)} className="flex-1 px-3 py-2 rounded bg-[#101926] border border-[#00fff7] text-white font-mono" />
                <button onClick={() => {
                  const usuarioSeleccionado = mockUsuarios.find(u => u.nombre === miembroBusqueda);
                  if (usuarioSeleccionado) {
                    handleAgregarMiembro(usuarioSeleccionado);
                    setMiembroBusqueda('');
                  } else {
                    setFeedback('Miembro no encontrado.');
                  }
                }} className="px-4 py-2 rounded-lg bg-[#00fff7] text-black font-bold font-mono animate-glow">Agregar Miembro</button>
              </div>
            </div>
            {/* Panel de acciones */}
            <div className="mt-6 flex gap-4">
              <button onClick={() => handleMarkNotification('1')} className="px-4 py-2 rounded-lg bg-[#00fff7] text-black font-bold font-mono animate-glow">
                <FaCheck /> Marcar como leído
              </button>
              <button onClick={() => handleDeleteNotification('1')} className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold font-mono">
                <FaTrash /> Eliminar notificación
              </button>
            </div>
          </div>
        )}
        {/* Modal de creación de equipo */}
        {tab === 'crear' && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setTab('miEquipo'); }}>
            <div className="bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl p-10 shadow-2xl w-full max-w-md animate-fade-in-up">
              <div className="text-2xl font-bold text-[#00fff7] mb-6">Crear Nuevo Equipo</div>
              <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
                <input type="text" name="name" value={nuevoEquipo.nombre} onChange={e => setNuevoEquipo(n => ({ ...n, nombre: e.target.value }))} className="px-3 py-2 rounded bg-[#101926] border border-[#00fff7] text-white font-mono" placeholder="Nombre del equipo" />
                <textarea name="description" value={nuevoEquipo.descripcion} onChange={e => setNuevoEquipo(n => ({ ...n, descripcion: e.target.value }))} className="px-3 py-2 rounded bg-[#101926] border border-[#00fff7] text-white font-mono" placeholder="Descripción del equipo" rows={3} />
                <select value={visibilidad} onChange={e => setVisibilidad(e.target.value as 'publico' | 'privado' | 'secreto')} className="px-3 py-2 rounded bg-[#101926] border border-[#00fff7] text-white font-mono">
                  <option value="publico">Público</option>
                  <option value="privado">Privado</option>
                  <option value="secreto">Secreto</option>
                </select>
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setTab('miEquipo')} className="px-4 py-2 rounded-lg bg-gray-500 text-white font-bold font-mono">Cancelar</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-[#00fff7] text-black font-bold font-mono animate-glow" disabled={creating}>
                    {creating ? 'Creando...' : 'Crear Equipo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Modal de búsqueda de equipos */}
        {tab === 'buscar' && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setTab('miEquipo'); }}>
            <div className="bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl p-10 shadow-2xl w-full max-w-md animate-fade-in-up">
              <div className="text-2xl font-bold text-[#00fff7] mb-6">Buscar Equipos</div>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Buscar equipo por nombre o descripción..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className="px-3 py-2 rounded bg-[#101926] border border-[#00fff7] text-white font-mono" />
                {loadingTeams ? (
                  <div className="text-center py-8">Cargando equipos...</div>
                ) : errorTeams ? (
                  <div className="text-center py-8 text-[#ff3b3b]">{errorTeams}</div>
                ) : teams.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">No se encontraron equipos.</div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {teams.map(team => (
                      <div key={team._id} className="bg-[#232b36]/80 border-2 border-[#00fff7] rounded-2xl p-4 flex flex-col gap-2 shadow-[0_0_24px_#00fff7] hover:scale-105 transition animate-fade-in-up cursor-pointer" onClick={() => handleSeleccionarEquipo(team)}>
                        <div className="flex items-center gap-2 text-lg font-bold text-[#00fff7]"><FaUsers size={18} color="#00fff7" />{team.name}</div>
                        <div className="text-xs text-gray-300">{team.description}</div>
                        <div className="text-xs text-[#39ff14]">Miembros: {team.members.length}</div>
                        <div className="text-xs text-[#a259ff]">Creado: {team.createdAt instanceof Date ? team.createdAt.toISOString().slice(0,10) : new Date(team.createdAt).toISOString().slice(0,10)}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setTab('miEquipo')} className="px-4 py-2 rounded-lg bg-gray-500 text-white font-bold font-mono">Volver</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Equipos;