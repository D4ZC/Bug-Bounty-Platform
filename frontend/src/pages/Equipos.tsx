import React, { useState, useEffect } from 'react';
import { FaUsers, FaPlus, FaSearch, FaTrash, FaUserPlus, FaCrown, FaBell, FaUserEdit, FaSignOutAlt, FaExchangeAlt, FaEllipsisV, FaCheck, FaTimes, FaCommentDots, FaUserMinus, FaTrophy } from 'react-icons/fa';
import { apiService } from '../services/api';
import { Team } from '../types';
import socketService from '../services/socket';

// Mock de datos
const mockEquipos: Team[] = [
  {
    _id: '1',
    name: 'P-TECH',
    description: 'Equipo de pentesting y seguridad ofensiva.',
    leader: 'D4ZC',
    members: ['D4ZC', 'alice', 'bob'],
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
  { id: 1, nombre: 'D4ZC', correo: 'd4zc@correo.com' },
  { id: 2, nombre: 'alice', correo: 'alice@correo.com' },
  { id: 3, nombre: 'bob', correo: 'bob@correo.com' },
  { id: 4, nombre: 'carol', correo: 'carol@correo.com' },
  { id: 5, nombre: 'juan', correo: 'juan@correo.com' },
  { id: 6, nombre: 'sofia', correo: 'sofia@correo.com' },
];
const mockNotificaciones = [
  { id: 1, texto: 'Fuiste añadido al equipo P-TECH', leida: false },
  { id: 2, texto: 'Invitación pendiente para CyberGuard', leida: false },
];
const mockActividad = [
  { id: 1, texto: 'Juan Pérez añadió a María García', fecha: '2024-07-15' },
  { id: 2, texto: 'La descripción del equipo fue actualizada por Administrador', fecha: '2024-07-14' },
];

const Equipos: React.FC = () => {
  const [tab, setTab] = useState<'miEquipo' | 'buscar' | 'crear'>('miEquipo');
  const [equipos, setEquipos] = useState<Team[]>(mockEquipos);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<any | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [nuevoEquipo, setNuevoEquipo] = useState({ nombre: '' });
  const [miembroBusqueda, setMiembroBusqueda] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showNotificaciones, setShowNotificaciones] = useState(false);
  const [showEditarPerfil, setShowEditarPerfil] = useState(false);
  const [perfilEditable, setPerfilEditable] = useState({ nombre: 'D4ZC', correo: 'd4zc@correo.com', rol: 'Líder' });
  const [showModalConfirm, setShowModalConfirm] = useState<{ accion: string, data?: any } | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [errorTeams, setErrorTeams] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState({ name: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);
  const [removalError, setRemovalError] = useState<string | null>(null);
  const [removalSuccess, setRemovalSuccess] = useState<string | null>(null);
  const [transferringId, setTransferringId] = useState<string | null>(null);
  const [transferError, setTransferError] = useState<string | null>(null);
  const [transferSuccess, setTransferSuccess] = useState<string | null>(null);
  const [pendingInvites, setPendingInvites] = useState([
    { id: '1', email: 'sofia@correo.com' },
    { id: '2', email: 'juan@correo.com' },
  ]);
  const [inviteLoading, setInviteLoading] = useState<string | null>(null);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);
  const [notifications, setNotifications] = useState([
    { id: '1', text: '¡Nuevo miembro se unió al equipo!', type: 'info', read: false },
    { id: '2', text: 'Has sido promovido a líder.', type: 'success', read: false },
    { id: '3', text: 'Invitación rechazada por juan@correo.com', type: 'warning', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', user: 'D4ZC', text: '¡Bienvenidos al equipo!', time: '10:00' },
    { id: '2', user: 'sofia', text: '¡Gracias! ¿Cuándo la próxima reunión?', time: '10:01' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [activityHistory, setActivityHistory] = useState([
    { id: '1', type: 'join', user: 'sofia', text: 'Sofía se unió al equipo', date: '2024-06-01 10:00' },
    { id: '2', type: 'leave', user: 'juan', text: 'Juan salió del equipo', date: '2024-06-01 09:00' },
    { id: '3', type: 'leader', user: 'D4ZC', text: 'D4ZC transfirió el liderazgo a Sofía', date: '2024-05-31 18:00' },
    { id: '4', type: 'trophy', user: 'equipo', text: '¡El equipo ganó un trofeo!', date: '2024-05-30 20:00' },
  ]);
  const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [mentionList, setMentionList] = useState(['D4ZC', 'sofia', 'juan']);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [reactions, setReactions] = useState<{ [msgId: string]: { [emoji: string]: string[] } }>({});
  const [achievements, setAchievements] = useState([
    { id: '1', name: 'Primer bug', icon: '🐞', unlocked: true, date: '2024-05-01' },
    { id: '2', name: 'Equipo MVP', icon: '🏆', unlocked: true, date: '2024-05-10' },
    { id: '3', name: 'Top 3', icon: '🥉', unlocked: false },
    { id: '4', name: 'Cazador veloz', icon: '⚡', unlocked: false },
  ]);
  const [showAchievementAnim, setShowAchievementAnim] = useState<string | null>(null);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<any[]>([]);
  const [visibilidad, setVisibilidad] = useState<'publico' | 'privado' | 'secreto'>('publico');
  const [tipoEquipo, setTipoEquipo] = useState('Proyecto');
  const [mensajeBienvenida, setMensajeBienvenida] = useState('');
  const [iconoEquipo, setIconoEquipo] = useState<string | null>(null);

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
    setCreateError(null);
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
      setCreateError('Error al crear el equipo');
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

  const handleRemoveMember = async (userId: string) => {
    setRemovingMemberId(userId);
    setRemovalError(null);
    setRemovalSuccess(null);
    try {
      // await apiService.delete(`/teams/${equipoSeleccionado._id}/members/${userId}`);
      setRemovalSuccess('Miembro eliminado');
      // Actualiza localmente
      equipoSeleccionado.members = equipoSeleccionado.members.filter((m: string) => m !== userId);
    } catch (err) {
      setRemovalError('Error al eliminar miembro');
    } finally {
      setRemovingMemberId(null);
    }
  };

  const handleTransferLeader = async (userId: string) => {
    setTransferringId(userId);
    setTransferError(null);
    setTransferSuccess(null);
    try {
      // await apiService.post(`/teams/${equipoSeleccionado._id}/transfer-leader`, { userId });
      setTransferSuccess('Liderazgo transferido');
      // Actualiza localmente (mock)
      equipoSeleccionado.members = equipoSeleccionado.members.map((m: any) => {
        if (typeof m === 'object') {
          return { ...m, rol: m.id === userId ? 'Líder' : 'Miembro' };
        } else if (typeof m === 'string') {
          return m === userId ? { nombre: m, rol: 'Líder' } : { nombre: m, rol: 'Miembro' };
        }
        return m;
      });
    } catch (err) {
      setTransferError('Error al transferir liderazgo');
    } finally {
      setTransferringId(null);
    }
  };

  const handleInviteAction = async (inviteId: string, action: 'accept' | 'reject') => {
    setInviteLoading(inviteId + action);
    setInviteError(null);
    setInviteSuccess(null);
    try {
      // await apiService.post(`/teams/${equipoSeleccionado._id}/invitations/${inviteId}/${action}`);
      setInviteSuccess(action === 'accept' ? 'Invitación aceptada' : 'Invitación rechazada');
      setPendingInvites(prev => prev.filter(i => i.id !== inviteId));
    } catch (err) {
      setInviteError('Error al procesar invitación');
    } finally {
      setInviteLoading(null);
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
  const unlockAchievement = (id: string) => {
    setAchievements(achs => achs.map(a => a.id === id ? { ...a, unlocked: true, date: new Date().toISOString().slice(0,10) } : a));
    setShowAchievementAnim(id);
    setTimeout(() => setShowAchievementAnim(null), 2500);
  };

  // Mostrar mensaje de éxito y ocultarlo después de 3 segundos
  useEffect(() => {
    if (createSuccess) {
      const timer = setTimeout(() => setCreateSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [createSuccess]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a183d] via-[#1a0033] to-[#2d003e] flex flex-col items-center py-12 font-mono">
      <div className="w-full max-w-6xl mx-auto bg-[#181c2b]/90 border-2 border-[#00fff7] rounded-3xl shadow-[0_0_48px_#00fff7] p-10 flex flex-col items-center relative animate-fade-in-up">
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
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
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
                      <span className="flex-shrink-0">
                        {n.type === 'info' && <FaCommentDots color="#00fff7" size={18} />}
                        {n.type === 'success' && <FaCheck color="#39ff14" size={18} />}
                        {n.type === 'warning' && <FaTimes color="#ff3b3b" size={18} />}
                      </span>
                      <span className="flex-1 text-xs text-gray-200">{n.text}</span>
                      {!n.read && <button className="text-xs text-[#39ff14] hover:underline" onClick={() => handleMarkNotification(n.id)}>Marcar leído</button>}
                      <button className="text-xs text-[#ff3b3b] hover:underline" onClick={() => handleDeleteNotification(n.id)}>Eliminar</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Chat de equipo */}
            <div className="mb-6">
              <div className="font-bold text-[#00fff7] mb-2 text-xl flex items-center gap-2"><FaCommentDots /> Chat del equipo</div>
              <div className="bg-[#101926]/70 border border-[#00fff7] rounded-lg p-3 max-h-56 overflow-y-auto flex flex-col gap-2 mb-2" style={{ minHeight: 120 }}>
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.user === 'Tú' ? 'justify-end' : 'justify-start'}`}> 
                    <div className={`px-3 py-1 rounded-xl max-w-[70%] ${msg.user === 'Tú' ? 'bg-[#00fff7] text-black' : 'bg-[#232b36] text-[#00fff7] border border-[#00fff7]'}`}> 
                      <span className="block text-xs font-bold">{msg.user}</span>
                      <span className="block text-sm">{renderMessageText(msg.text)}</span>
                      <span className="block text-[10px] text-right text-gray-400">{msg.time}</span>
                      {/* Reacciones */}
                      <div className="flex gap-1 mt-1">
                        {emojis.map(emoji => (
                          <button key={emoji} className={`text-lg px-1 rounded hover:bg-[#232b36] ${reactions[msg.id]?.[emoji]?.includes('Tú') ? 'bg-[#00fff7] text-black' : 'text-[#00fff7]'}`} onClick={() => handleReact(msg.id, emoji)}>
                            {emoji} {reactions[msg.id]?.[emoji]?.length > 0 && <span className="text-xs">{reactions[msg.id][emoji].length}</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {isSomeoneTyping && <div className="text-xs text-[#00fff7] italic">Sofía está escribiendo...</div>}
              </div>
              <form className="flex gap-2 relative" onSubmit={handleSendChat}>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 rounded bg-[#101926]/80 border border-[#00fff7] text-[#00fff7] placeholder-gray-400 focus:outline-none font-mono"
                  placeholder="Escribe un mensaje..."
                  value={chatInput}
                  onChange={handleChatInput}
                  onKeyDown={handleTyping}
                  autoComplete="off"
                />
                <button type="submit" className="px-4 py-2 rounded bg-[#00fff7] text-black font-bold hover:bg-[#39ff14] animate-glow">Enviar</button>
                {/* Dropdown de menciones */}
                {showMentionDropdown && mentionQuery && (
                  <div className="absolute left-0 top-12 bg-[#232b36] border border-[#00fff7] rounded-lg shadow-lg z-30 w-48">
                    {mentionList.filter(u => u.toLowerCase().startsWith(mentionQuery.toLowerCase())).map(u => (
                      <div key={u} className="px-3 py-2 hover:bg-[#00fff7] hover:text-black cursor-pointer" onClick={() => handleSelectMention(u)}>{u}</div>
                    ))}
                    {mentionList.filter(u => u.toLowerCase().startsWith(mentionQuery.toLowerCase())).length === 0 && <div className="px-3 py-2 text-gray-400">Sin resultados</div>}
                  </div>
                )}
              </form>
            </div>
            {/* Historial de actividades detallado */}
            <div className="mb-6">
              <div className="font-bold text-[#00fff7] mb-2 text-xl flex items-center gap-2"><FaExchangeAlt /> Historial de actividades</div>
              <div className="flex flex-col gap-2">
                {activityHistory.map(ev => (
                  <div key={ev.id} className="flex items-center gap-2 bg-[#101926]/70 border-l-4 rounded-lg px-3 py-2"
                    style={{ borderColor: ev.type === 'join' ? '#39ff14' : ev.type === 'leave' ? '#ff3b3b' : ev.type === 'leader' ? '#FFD700' : ev.type === 'trophy' ? '#00fff7' : '#00fff7' }}>
                    <span>
                      {ev.type === 'join' && <FaUserPlus color="#39ff14" size={18} />}
                      {ev.type === 'leave' && <FaUserMinus color="#ff3b3b" size={18} />}
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
            {/* Miembros */}
            <div className="mb-6">
              <div className="font-bold text-[#00fff7] mb-2 text-xl flex items-center gap-2"><FaUsers size={20} color="#00fff7" />Miembros del equipo</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {equipoSeleccionado.members.map((m: any, idx: number) => {
                  const nombre = typeof m === 'string' ? m : m.nombre || m.name || '';
                  return (
                    <div key={nombre + idx} className="flex items-center gap-3 bg-[#101926]/70 border border-[#00fff7] rounded-lg px-3 py-2 relative">
                      <img src={`https://ui-avatars.com/api/?name=${nombre}`} alt={nombre} className="w-10 h-10 rounded-full border-2 border-[#00fff7]" />
                      <div className="flex-1">
                        <div className="font-bold text-[#00fff7]">{nombre}</div>
                        <div className="text-xs text-[#39ff14]">Miembro</div>
                      </div>
                      <button className="text-xl text-[#00fff7] hover:text-[#39ff14] p-1 relative group"><FaEllipsisV />
                        {/* Menú contextual mock visual */}
                        <div className="hidden group-hover:block absolute right-0 top-8 bg-[#232b36] border border-[#00fff7] rounded-lg shadow-lg z-10 min-w-[140px]">
                          {/* <button className="block w-full text-left px-4 py-2 text-[#ff3b3b] hover:bg-[#101926]">Eliminar miembro</button> */}
                          {/* <button className="block w-full text-left px-4 py-2 text-[#00fff7] hover:bg-[#101926]">Transferir liderazgo</button> */}
                          {/* <span className="block w-full text-left px-4 py-2 text-[#FFD700]">Líder actual</span> */}
                        </div>
                      </button>
                    </div>
                  );
                })}
                {(!equipoSeleccionado.members || equipoSeleccionado.members.length === 0) && <div className="text-gray-400 text-center col-span-2">No hay miembros en este equipo.</div>}
              </div>
            </div>
            {/* Timeline de actividad visual */}
            <div className="mb-6">
              <div className="font-bold text-[#00fff7] mb-2 text-xl">Actividad del equipo</div>
              <div className="timeline flex flex-col gap-2">
                {mockActividad.map(a => (
                  <div key={a.id} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00fff7]" />
                    <span className="text-xs text-gray-300">{a.texto} <span className="text-[#a259ff]">({a.fecha})</span></span>
                  </div>
                ))}
                {mockActividad.length === 0 && <div className="text-gray-400 text-center">Sin actividad reciente.</div>}
              </div>
            </div>
            {/* Invitaciones visuales */}
            <div className="mb-6">
              <div className="font-bold text-[#00fff7] mb-2 text-xl">Invitaciones pendientes</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 bg-[#232b36]/70 border border-[#00fff7] rounded-lg px-3 py-2">
                  <span className="font-bold text-[#00fff7]">sofia@correo.com</span>
                  <button className="ml-auto px-2 py-1 rounded bg-[#39ff14] text-black font-bold">Aceptar</button>
                  <button className="px-2 py-1 rounded bg-[#ff3b3b] text-white font-bold">Rechazar</button>
                </div>
                {/* Estado vacío */}
                {/* <div className="text-gray-400 text-center">No hay invitaciones pendientes.</div> */}
              </div>
            </div>
            {/* Toast notification ejemplo */}
            {feedback && <div className="fixed bottom-8 right-8 bg-[#232b36] border-2 border-[#00fff7] rounded-xl px-4 py-2 text-[#00fff7] shadow-xl animate-fade-in-up">{feedback}</div>}
          </div>
        )}
        {/* Explorar Equipos */}
        <div className="max-w-4xl mx-auto mt-8">
          {/* Eliminar la barra de tabs de navegación superior */}
          {/* simplemente no renderizar nada en ese lugar ... */}
          {tab === 'miEquipo' && equipoSeleccionado && (
            null
          )}
          {tab === 'buscar' && (
            <div className="glass-card p-6 rounded-2xl shadow-xl border-2 border-[#00fff7] max-w-2xl w-full mx-auto mb-8 bg-[#232b36]/60 backdrop-blur-md animate-fade-in-up">
              <div className="mb-4 flex gap-2">
                <input type="text" placeholder="Buscar equipos..." className="flex-1 px-3 py-2 rounded bg-[#101926]/80 border border-[#00fff7] text-[#00fff7] placeholder-gray-400 focus:outline-none font-mono" />
              </div>
              {loadingTeams && <div className="text-[#00fff7] text-center">Cargando equipos...</div>}
              {errorTeams && <div className="text-[#ff3b3b] text-center">{errorTeams}</div>}
              {joinError && <div className="text-[#ff3b3b] text-center mb-2">{joinError}</div>}
              {joinSuccess && <div className="text-[#39ff14] text-center mb-2">{joinSuccess}</div>}
              <div className="flex flex-col gap-3">
                {!loadingTeams && !errorTeams && teams.length === 0 && (
                  <div className="text-gray-400 text-center">No se encontraron equipos.</div>
                )}
                {!loadingTeams && !errorTeams && teams.map(equipo => (
                  <div key={equipo._id} className="flex items-center gap-3 bg-[#101926]/70 border border-[#00fff7] rounded-lg px-3 py-2 transition-transform hover:scale-105 animate-fade-in-up">
                    <div className="font-bold text-[#00fff7] text-lg">{equipo.name}</div>
                    <div className="text-xs text-[#39ff14]">{equipo.members.length} miembros</div>
                    <div className="flex-1 text-gray-300 text-xs">{equipo.description}</div>
                    <button
                      className="px-3 py-1 rounded bg-[#00fff7] text-black font-bold hover:bg-[#39ff14] disabled:opacity-60"
                      disabled={joiningId === equipo._id}
                      onClick={() => handleJoinTeam(equipo._id)}
                    >
                      {joiningId === equipo._id ? 'Enviando...' : 'Unirse'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'crear' && (
            <div className="flex flex-col w-full max-w-2xl mx-auto animate-fade-in-up">
              <div className="glass-card p-6 shadow-xl bg-[#232b36]/60 backdrop-blur-md rounded-2xl border-2 border-[#00fff7]">
                <h3 className="text-xl font-bold text-[#00fff7] mb-4">Crear equipo rápido (mock)</h3>
                <form className="flex flex-col gap-4" onSubmit={e => {
                  e.preventDefault();
                  if (!nuevoEquipo.nombre) return setFeedback('El nombre es obligatorio');
                  setEquipos([...equipos, {
                    _id: Date.now().toString(),
                    name: nuevoEquipo.nombre,
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
                    leader: 'Tú',
                    members: usuariosSeleccionados.map(u => u.nombre),
                    points: 0,
                    rank: 0,
                    logo: iconoEquipo || '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  }]);
                  setNuevoEquipo({ nombre: '' });
                  setUsuariosSeleccionados([]);
                  setVisibilidad('publico');
                  setMensajeBienvenida('');
                  setIconoEquipo(null);
                  setFeedback('¡Equipo creado!');
                }}>
                  {/* Información básica */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#00fff7] font-bold">Nombre del equipo</label>
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre del equipo"
                      className="px-3 py-2 rounded bg-[#101926]/80 border border-[#00fff7] text-[#00fff7] placeholder-gray-400 focus:outline-none font-mono"
                      value={nuevoEquipo.nombre}
                      onChange={e => setNuevoEquipo({ nombre: e.target.value })}
                      required
                    />
                  </div>
                  {/* Agregar miembros */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#00fff7] font-bold">Buscar y agregar usuarios</label>
                    <input
                      type="text"
                      placeholder="Buscar usuario por nombre o correo..."
                      className="px-3 py-2 rounded bg-[#101926]/80 border border-[#00fff7] text-[#00fff7] placeholder-gray-400 focus:outline-none font-mono"
                      value={miembroBusqueda}
                      onChange={e => setMiembroBusqueda(e.target.value)}
                    />
                    {/* Lista de usuarios sugeridos */}
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
                            <img src={`https://ui-avatars.com/api/?name=${u.nombre}`} alt={u.nombre} className="w-6 h-6 rounded-full border border-[#00fff7]" />
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
                          <img src={`https://ui-avatars.com/api/?name=${u.nombre}`} alt={u.nombre} className="w-5 h-5 rounded-full border border-[#00fff7]" />
                          {u.nombre}
                          <button type="button" className="ml-1 text-[#ff3b3b] hover:text-white" onClick={() => setUsuariosSeleccionados(usuariosSeleccionados.filter(sel => sel.id !== u.id))}>×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Configuración */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#00fff7] font-bold">Visibilidad del equipo</label>
                    <select
                      className="px-3 py-2 rounded bg-[#101926]/80 border border-[#00fff7] text-[#00fff7] focus:outline-none font-mono"
                      value={visibilidad}
                      onChange={e => setVisibilidad(e.target.value as any)}
                    >
                      <option value="publico">Público</option>
                      <option value="privado">Privado</option>
                      <option value="secreto">Secreto</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#00fff7] font-bold">Mensaje de bienvenida</label>
                    <textarea
                      className="px-3 py-2 rounded bg-[#101926]/80 border border-[#00fff7] text-[#00fff7] placeholder-gray-400 focus:outline-none font-mono"
                      rows={2}
                      placeholder="Mensaje para los nuevos miembros..."
                      value={mensajeBienvenida}
                      onChange={e => setMensajeBienvenida(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#00fff7] font-bold">Ícono del equipo</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="text-[#00fff7]"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = ev => setIconoEquipo(ev.target?.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {iconoEquipo && <img src={iconoEquipo} alt="Ícono del equipo" className="w-16 h-16 rounded-full border-2 border-[#00fff7] mt-2" />}
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button type="submit" className="px-4 py-2 rounded bg-[#00fff7] text-black font-bold hover:bg-[#39ff14] animate-glow">Crear equipo (mock)</button>
                    <button type="button" className="px-4 py-2 rounded bg-gray-500 text-white font-bold" onClick={() => {
                      setNuevoEquipo({ nombre: '' });
                      setUsuariosSeleccionados([]);
                      setVisibilidad('publico');
                      setMensajeBienvenida('');
                      setIconoEquipo(null);
                      setFeedback('');
                    }}>Cancelar</button>
                  </div>
                </form>
                {feedback && <div className="mt-4 text-[#39ff14] text-center font-bold animate-fade-in-up">{feedback}</div>}
              </div>
            </div>
          )}
        </div>
        {/* Modal de confirmación para acciones críticas */}
        {showModalConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#181c2b] border-2 border-[#00fff7] rounded-xl p-8 shadow-xl w-full max-w-md animate-fade-in-up">
              <div className="text-xl font-bold text-[#00fff7] mb-4">Confirmar acción</div>
              <div className="mb-4 text-white">¿Estás seguro de que quieres {showModalConfirm.accion}?</div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowModalConfirm(null)} className="px-4 py-2 rounded-lg bg-gray-500 text-white font-bold">Cancelar</button>
                <button type="button" onClick={() => { setShowModalConfirm(null); setFeedback('Acción realizada (mock).'); }} className="px-4 py-2 rounded-lg bg-[#00fff7] text-black font-bold">Confirmar</button>
              </div>
            </div>
          </div>
        )}
        {/* Eliminar el indicador de conexión */}
      </div>
    </div>
  );
};

export default Equipos; 