import React, { useState } from 'react';
import { FaPlus, FaSearch, FaUsers, FaCrown, FaUserPlus, FaTimes, FaCheck, FaEye, FaEdit, FaTrash, FaStar, FaTrophy } from 'react-icons/fa';

interface Team {
  id: string;
  name: string;
  description: string;
  leader: {
    name: string;
    avatar: string;
  };
  members: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    joinDate: string;
    points: number;
    resolved: number;
  }[];
  totalMembers: number;
  maxMembers: number;
  points: number;
  resolved: number;
  isPublic: boolean;
  requirements: string[];
  createdAt: string;
  status: 'open' | 'invite-only' | 'closed';
  achievements: string[];
  weeklyProgress: number;
}

const Teams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'search' | 'my-team'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'invite-only' | 'closed'>('all');

  // Datos mock de equipos existentes
  const existingTeams: Team[] = [
    {
      id: '1',
      name: 'CyberDragons',
      description: 'Equipo especializado en vulnerabilidades críticas y formación de nuevos talentos. Buscamos hackers apasionados por la ciberseguridad.',
      leader: {
        name: 'NinjaSec',
        avatar: '/src/assets/avatar1.png'
      },
      members: [
        { id: '1', name: 'NinjaSec', avatar: '/src/assets/avatar1.png', role: 'Líder', joinDate: 'Enero 2024', points: 1280, resolved: 48 },
        { id: '2', name: 'DragonGirl', avatar: '/src/assets/avatar4.png', role: 'Cazador Senior', joinDate: 'Febrero 2024', points: 960, resolved: 36 },
        { id: '3', name: 'CyberSamurai', avatar: '/src/assets/avatar6.png', role: 'Analista', joinDate: 'Marzo 2024', points: 640, resolved: 24 },
        { id: '4', name: 'RocketMan', avatar: '/src/assets/avatar7.png', role: 'Resolvedor', joinDate: 'Abril 2024', points: 320, resolved: 12 }
      ],
      totalMembers: 4,
      maxMembers: 5,
      points: 3200,
      resolved: 120,
      isPublic: true,
      requirements: ['Mínimo 500 puntos', 'Experiencia en vulnerabilidades críticas', 'Disponibilidad 10h/semana'],
      createdAt: 'Enero 2024',
      status: 'open',
      achievements: ['MVP Mensual', 'Equipo del Año', 'Mejor Colaboración'],
      weeklyProgress: 15
    },
    {
      id: '2',
      name: 'RocketSec',
      description: 'Equipo de élite enfocado en investigación avanzada y desarrollo de herramientas de seguridad.',
      leader: {
        name: 'RocketMan',
        avatar: '/src/assets/avatar8.png'
      },
      members: [
        { id: '1', name: 'RocketMan', avatar: '/src/assets/avatar8.png', role: 'Líder', joinDate: 'Diciembre 2023', points: 1180, resolved: 44 },
        { id: '2', name: 'ShadowNinja', avatar: '/src/assets/avatar9.png', role: 'Investigador', joinDate: 'Enero 2024', points: 885, resolved: 33 },
        { id: '3', name: 'PhantomCoder', avatar: '/src/assets/avatar10.png', role: 'Desarrollador', joinDate: 'Febrero 2024', points: 590, resolved: 22 },
        { id: '4', name: 'NeonHacker', avatar: '/src/assets/avatar11.png', role: 'Analista', joinDate: 'Marzo 2024', points: 295, resolved: 11 }
      ],
      totalMembers: 4,
      maxMembers: 4,
      points: 2950,
      resolved: 110,
      isPublic: false,
      requirements: ['Mínimo 1000 puntos', 'Conocimientos avanzados en pentesting', 'Portfolio de investigaciones'],
      createdAt: 'Diciembre 2023',
      status: 'invite-only',
      achievements: ['Investigación del Año', 'Mejor Herramienta'],
      weeklyProgress: 12
    },
    {
      id: '3',
      name: 'GearGuardians',
      description: 'Equipo especializado en protección de infraestructura crítica y análisis forense.',
      leader: {
        name: 'GuardMaster',
        avatar: '/src/assets/avatar12.png'
      },
      members: [
        { id: '1', name: 'GuardMaster', avatar: '/src/assets/avatar12.png', role: 'Líder', joinDate: 'Noviembre 2023', points: 1080, resolved: 40 },
        { id: '2', name: 'PhantomCoder', avatar: '/src/assets/avatar13.png', role: 'Analista Forense', joinDate: 'Diciembre 2023', points: 810, resolved: 30 },
        { id: '3', name: 'NeonHacker', avatar: '/src/assets/avatar14.png', role: 'Especialista en Redes', joinDate: 'Enero 2024', points: 540, resolved: 20 },
        { id: '4', name: 'VoidMaster', avatar: '/src/assets/Ninja2.png', role: 'Investigador', joinDate: 'Febrero 2024', points: 270, resolved: 10 }
      ],
      totalMembers: 4,
      maxMembers: 6,
      points: 2700,
      resolved: 100,
      isPublic: true,
      requirements: ['Mínimo 800 puntos', 'Experiencia en redes', 'Certificaciones de seguridad'],
      createdAt: 'Noviembre 2023',
      status: 'open',
      achievements: ['Mejor Defensa', 'Análisis Forense'],
      weeklyProgress: 8
    },
    {
      id: '4',
      name: 'Shielders',
      description: 'Equipo defensivo especializado en protección contra ataques y respuesta a incidentes.',
      leader: {
        name: 'ShieldLeader',
        avatar: '/src/assets/Robot2.png'
      },
      members: [
        { id: '1', name: 'ShieldLeader', avatar: '/src/assets/Robot2.png', role: 'Líder', joinDate: 'Octubre 2023', points: 880, resolved: 36 },
        { id: '2', name: 'CrystalKnight', avatar: '/src/assets/Dragon.png', role: 'Defensor', joinDate: 'Noviembre 2023', points: 660, resolved: 27 },
        { id: '3', name: 'ThunderStrike', avatar: '/src/assets/Samurai.png', role: 'Analista', joinDate: 'Diciembre 2023', points: 440, resolved: 18 },
        { id: '4', name: 'FirePhoenix', avatar: '/src/assets/Mago.png', role: 'Resolvedor', joinDate: 'Enero 2024', points: 220, resolved: 9 }
      ],
      totalMembers: 4,
      maxMembers: 4,
      points: 2200,
      resolved: 90,
      isPublic: true,
      requirements: ['Mínimo 600 puntos', 'Experiencia en defensa', 'Disponibilidad 24/7'],
      createdAt: 'Octubre 2023',
      status: 'open',
      achievements: ['Mejor Respuesta', 'Defensa del Año'],
      weeklyProgress: 5
    },
    {
      id: '5',
      name: 'PhantomHunters',
      description: 'Equipo sigiloso especializado en investigación encubierta y análisis de malware.',
      leader: {
        name: 'PhantomLord',
        avatar: '/src/assets/Pirata.png'
      },
      members: [
        { id: '1', name: 'PhantomLord', avatar: '/src/assets/Pirata.png', role: 'Líder', joinDate: 'Septiembre 2023', points: 840, resolved: 34 },
        { id: '2', name: 'ThunderStrike', avatar: '/src/assets/Vampiro.png', role: 'Analista de Malware', joinDate: 'Octubre 2023', points: 630, resolved: 25 },
        { id: '3', name: 'FirePhoenix', avatar: '/src/assets/Ciberespacio.png', role: 'Investigador', joinDate: 'Noviembre 2023', points: 420, resolved: 17 },
        { id: '4', name: 'ShadowNinja', avatar: '/src/assets/Ciudad.png', role: 'Analista', joinDate: 'Diciembre 2023', points: 210, resolved: 9 }
      ],
      totalMembers: 4,
      maxMembers: 5,
      points: 2100,
      resolved: 85,
      isPublic: false,
      requirements: ['Mínimo 1200 puntos', 'Experiencia en malware', 'Análisis forense avanzado'],
      createdAt: 'Septiembre 2023',
      status: 'invite-only',
      achievements: ['Mejor Investigación', 'Análisis de Malware'],
      weeklyProgress: 3
    }
  ];

  const filteredTeams = existingTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.leader.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || team.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  const handleFilterChange = (newFilter: 'all' | 'open' | 'invite-only' | 'closed') => {
    setFilterStatus(newFilter);
  };

  const handleCreateTeam = (formData: any) => {
    console.log('Creando equipo:', formData);
    
    // Validar campos requeridos
    if (!formData.name || !formData.description || !formData.teamType || !formData.maxMembers) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
    
    // Aquí se procesaría la creación del equipo
    const newTeam = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      teamType: formData.teamType,
      specialization: formData.specialization,
      experienceLevel: formData.experienceLevel,
      timeCommitment: formData.timeCommitment,
      requirements: formData.requirements,
      isPublic: formData.isPublic,
      requireApproval: formData.requireApproval,
      allowInvites: formData.allowInvites,
      maxMembers: formData.maxMembers,
      createdAt: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
      status: 'open',
      points: 0,
      resolved: 0,
      totalMembers: 1,
      leader: {
        name: 'Tu Nombre', // Aquí iría el nombre del usuario actual
        avatar: 'https://via.placeholder.com/100x100/8B5CF6/ffffff?text=Y'
      },
      members: [
        {
          id: '1',
          name: 'Tu Nombre',
          avatar: 'https://via.placeholder.com/100x100/8B5CF6/ffffff?text=Y',
          role: 'Líder',
          joinDate: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
          points: 0,
          resolved: 0
        }
      ],
      achievements: [],
      weeklyProgress: 0
    };
    
    console.log('Nuevo equipo creado:', newTeam);
    
    // Simular creación exitosa
    alert(`¡Equipo "${formData.name}" creado exitosamente! Ahora eres el líder del equipo.`);
    
    // Aquí se agregaría el equipo a la lista de equipos existentes
    // existingTeams.push(newTeam);
    
    // Cambiar a la pestaña de "Mi Equipo" para mostrar el equipo recién creado
    setActiveTab('my-team');
  };

  const handleJoinTeam = (teamId: string) => {
    console.log('Uniéndose al equipo:', teamId);
    // Simular solicitud de unión
    alert(`Solicitud enviada para unirse al equipo. El líder revisará tu solicitud.`);
  };

  const handleViewTeamDetails = (team: Team) => {
    setSelectedTeam(team);
    setShowTeamDetails(true);
  };

  const handleEditTeam = () => {
    alert('Función de editar equipo - En desarrollo');
  };

  const handleLeaveTeam = () => {
    if (confirm('¿Estás seguro de que quieres abandonar tu equipo? Esta acción no se puede deshacer.')) {
      alert('Has abandonado el equipo. Ahora puedes buscar otros equipos.');
      setActiveTab('search');
    }
  };

  const handleInviteMember = () => {
    alert('Función de invitar miembros - En desarrollo');
  };

  const handleManageTeam = () => {
    alert('Función de gestión avanzada del equipo - En desarrollo');
  };

  const myTeam = existingTeams[0]; // Simular que el usuario está en CyberDragons

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Gestión de Equipos</h1>
            <p className="text-gray-400">Crea, únete y gestiona equipos de ciberseguridad</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-900 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'create'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <FaPlus className="inline mr-2" />
            Crear Equipo
          </button>
          <button
            onClick={() => setActiveTab('my-team')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'my-team'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <FaUsers className="inline mr-2" />
            Mi Equipo
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'search'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <FaSearch className="inline mr-2" />
            Buscar
          </button>
        </div>

        {/* Contenido de las tabs */}
        <div className="space-y-6">
          {activeTab === 'create' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900 rounded-xl p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🏗️</div>
                  <h2 className="text-3xl font-bold text-white mb-2">Crear Nuevo Equipo</h2>
                  <p className="text-gray-400">Forma tu propio equipo y lidera la competencia de ciberseguridad</p>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateTeam({
                    name: (e.target as any).name.value,
                    description: (e.target as any).description.value,
                    maxMembers: parseInt((e.target as any).maxMembers.value),
                    isPublic: (e.target as any).isPublic.checked,
                    requirements: (e.target as any).requirements.value,
                    teamType: (e.target as any).teamType.value,
                    specialization: (e.target as any).specialization.value,
                    experienceLevel: (e.target as any).experienceLevel.value,
                    timeCommitment: (e.target as any).timeCommitment.value
                  });
                }} className="space-y-6">
                  
                  {/* Información Básica */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <FaUsers className="text-purple-400" />
                      Información Básica
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nombre del Equipo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                          placeholder="Ej: CyberDragons"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tipo de Equipo *
                        </label>
                        <select
                          name="teamType"
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value="">Seleccionar tipo</option>
                          <option value="offensive">Ofensivo (Pentesting)</option>
                          <option value="defensive">Defensivo (Blue Team)</option>
                          <option value="research">Investigación</option>
                          <option value="development">Desarrollo de Herramientas</option>
                          <option value="mixed">Mixto</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Descripción del Equipo</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Descripción Detallada *
                      </label>
                      <textarea
                        name="description"
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        placeholder="Describe la misión, objetivos y especialización de tu equipo..."
                      />
                    </div>
                  </div>

                  {/* Configuración del Equipo */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Configuración del Equipo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Máximo de Miembros *
                        </label>
                        <select
                          name="maxMembers"
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value={3}>3 miembros</option>
                          <option value={4}>4 miembros</option>
                          <option value={5}>5 miembros</option>
                          <option value={6}>6 miembros</option>
                          <option value={8}>8 miembros</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nivel de Experiencia
                        </label>
                        <select
                          name="experienceLevel"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value="">Cualquier nivel</option>
                          <option value="beginner">Principiante</option>
                          <option value="intermediate">Intermedio</option>
                          <option value="advanced">Avanzado</option>
                          <option value="expert">Experto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Compromiso de Tiempo
                        </label>
                        <select
                          name="timeCommitment"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value="">Flexible</option>
                          <option value="5-10">5-10 horas/semana</option>
                          <option value="10-20">10-20 horas/semana</option>
                          <option value="20-30">20-30 horas/semana</option>
                          <option value="30+">30+ horas/semana</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Especialización */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Especialización</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Áreas de Especialización
                      </label>
                      <select
                        name="specialization"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">Seleccionar especialización</option>
                        <option value="web-security">Seguridad Web</option>
                        <option value="network-security">Seguridad de Redes</option>
                        <option value="mobile-security">Seguridad Móvil</option>
                        <option value="cloud-security">Seguridad en la Nube</option>
                        <option value="iot-security">Seguridad IoT</option>
                        <option value="malware-analysis">Análisis de Malware</option>
                        <option value="forensics">Análisis Forense</option>
                        <option value="reverse-engineering">Ingeniería Inversa</option>
                        <option value="cryptography">Criptografía</option>
                        <option value="social-engineering">Ingeniería Social</option>
                      </select>
                    </div>
                  </div>

                  {/* Requisitos */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Requisitos para Unirse</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Requisitos Específicos
                      </label>
                      <textarea
                        name="requirements"
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        placeholder="Especifica los requisitos para unirse a tu equipo (puntos mínimos, certificaciones, experiencia, etc.)"
                      />
                    </div>
                  </div>

                  {/* Configuración de Privacidad */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Configuración de Privacidad</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="isPublic"
                          id="isPublic"
                          defaultChecked
                          className="rounded"
                        />
                        <label htmlFor="isPublic" className="text-gray-300">
                          Equipo público (cualquiera puede ver y solicitar unirse)
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="requireApproval"
                          id="requireApproval"
                          className="rounded"
                        />
                        <label htmlFor="requireApproval" className="text-gray-300">
                          Requerir aprobación para nuevos miembros
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="allowInvites"
                          id="allowInvites"
                          defaultChecked
                          className="rounded"
                        />
                        <label htmlFor="allowInvites" className="text-gray-300">
                          Permitir que miembros inviten a otros
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('¿Estás seguro de que quieres cancelar? Se perderán todos los datos ingresados.')) {
                          setActiveTab('search');
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaPlus />
                      Crear Equipo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'my-team' && (
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Mi Equipo: {myTeam.name}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={handleEditTeam}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaEdit className="inline mr-2" />
                    Editar
                  </button>
                  <button 
                    onClick={handleInviteMember}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaUserPlus className="inline mr-2" />
                    Invitar
                  </button>
                  <button 
                    onClick={handleManageTeam}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <FaUsers className="inline mr-2" />
                    Gestionar
                  </button>
                  <button 
                    onClick={handleLeaveTeam}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaTrash className="inline mr-2" />
                    Abandonar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información del equipo */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Información del Equipo</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Líder:</span>
                      <span className="text-white">{myTeam.leader.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Miembros:</span>
                      <span className="text-white">{myTeam.totalMembers}/{myTeam.maxMembers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Puntos:</span>
                      <span className="text-green-400 font-bold">{myTeam.points}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resueltas:</span>
                      <span className="text-blue-400 font-bold">{myTeam.resolved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Progreso Semanal:</span>
                      <span className="text-yellow-400 font-bold">+{myTeam.weeklyProgress}%</span>
                    </div>
                  </div>
                </div>

                {/* Logros */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Logros del Equipo</h4>
                  <div className="space-y-2">
                    {myTeam.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 text-yellow-400">
                        <FaTrophy />
                        <span className="text-white">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Miembros */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Miembros del Equipo</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {myTeam.members.map((member) => (
                    <div key={member.id} className="bg-gray-800 rounded-lg p-4 text-center">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-purple-400"
                      />
                      <div className="font-semibold text-white">{member.name}</div>
                      <div className="text-sm text-gray-400">{member.role}</div>
                      <div className="text-xs text-green-400 mt-1">{member.points} pts</div>
                      <div className="text-xs text-blue-400">{member.resolved} resueltas</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}




          {activeTab === 'search' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Buscar Equipos</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar equipos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => handleFilterChange(e.target.value as any)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="open">Solo abiertos</option>
                    <option value="invite-only">Solo invitación</option>
                    <option value="closed">Cerrados</option>
                  </select>
                  {(searchTerm || filterStatus !== 'all') && (
                    <button
                      onClick={handleClearSearch}
                      className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeams.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-white mb-2">No se encontraron equipos</h3>
                    <p className="text-gray-400 mb-4">
                      {searchTerm 
                        ? `No hay equipos que coincidan con "${searchTerm}"`
                        : 'No hay equipos disponibles con los filtros actuales.'
                      }
                    </p>
                    <button
                      onClick={handleClearSearch}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                ) : (
                  filteredTeams.map(team => (
                  <div key={team.id} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {team.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{team.name}</h4>
                          <p className="text-gray-400 text-sm">Líder: {team.leader.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">{team.points} pts</div>
                        <div className="text-gray-400 text-sm">{team.totalMembers}/{team.maxMembers} miembros</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{team.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          team.status === 'open' ? 'bg-green-600 text-white' :
                          team.status === 'invite-only' ? 'bg-yellow-600 text-white' :
                          'bg-red-600 text-white'
                        }`}>
                          {team.status === 'open' ? 'Abierto' : 
                           team.status === 'invite-only' ? 'Solo Invitación' : 'Cerrado'}
                        </span>
                        <span className="text-gray-400 text-sm">{team.resolved} resueltas</span>
                      </div>
                      <div className="text-yellow-400 text-sm">+{team.weeklyProgress}% semanal</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewTeamDetails(team)}
                        className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <FaEye className="inline mr-2" />
                        Ver Detalles
                      </button>
                      {team.status === 'open' && (
                        <button
                          onClick={() => handleJoinTeam(team.id)}
                          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Unirse
                        </button>
                      )}
                    </div>
                  </div>
                ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>



      {/* Modal para detalles del equipo */}
      {showTeamDetails && selectedTeam && (
        <TeamDetailsModal team={selectedTeam} onClose={() => setShowTeamDetails(false)} />
      )}
    </div>
  );
};



// Componente modal para detalles del equipo
const TeamDetailsModal: React.FC<{ team: Team; onClose: () => void }> = ({ team, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Detalles del Equipo</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FaTimes size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Header del equipo */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {team.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{team.name}</h2>
              <p className="text-gray-400">Creado en {team.createdAt}</p>
            </div>
          </div>
          
          {/* Descripción */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-2">Descripción</h4>
            <p className="text-gray-300">{team.description}</p>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{team.points}</div>
              <div className="text-sm text-gray-400">Puntos</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{team.resolved}</div>
              <div className="text-sm text-gray-400">Resueltas</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{team.totalMembers}</div>
              <div className="text-sm text-gray-400">Miembros</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{team.maxMembers}</div>
              <div className="text-sm text-gray-400">Máximo</div>
            </div>
          </div>
          
          {/* Líder */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <FaCrown className="text-yellow-400" />
              Líder del Equipo
            </h4>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-500/30">
              <img
                src={team.leader.avatar}
                alt={team.leader.name}
                className="w-12 h-12 rounded-full border-2 border-yellow-400"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{team.leader.name}</span>
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                    LÍDER
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Líder del equipo</p>
              </div>
            </div>
          </div>
          
          {/* Miembros */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <FaUsers className="text-blue-400" />
              Miembros ({team.totalMembers}/{team.maxMembers})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {team.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full border-2 border-blue-400"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{member.name}</span>
                      <span className="text-blue-400 font-bold">{member.points} pts</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{member.role}</span>
                      <span className="text-green-400">{member.resolved} resueltas</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Miembro desde {member.joinDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Logros */}
          {team.achievements.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaTrophy className="text-yellow-400" />
                Logros del Equipo
              </h4>
              <div className="space-y-2">
                {team.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 text-yellow-400">
                    <FaStar />
                    <span className="text-white">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Requisitos */}
          {team.requirements.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Requisitos para Unirse</h4>
              <div className="space-y-2">
                {team.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300">
                    <FaCheck className="text-green-400" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Estado del equipo */}
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                team.status === 'open' ? 'bg-green-600 text-white' :
                team.status === 'invite-only' ? 'bg-yellow-600 text-white' :
                'bg-red-600 text-white'
              }`}>
                {team.status === 'open' ? 'Abierto para unirse' : 
                 team.status === 'invite-only' ? 'Solo por invitación' : 'Cerrado'}
              </span>
            </div>
            {team.status === 'open' && (
              <button 
                onClick={() => {
                  console.log('Uniéndose al equipo:', team.id);
                  alert('Solicitud enviada para unirse al equipo. El líder revisará tu solicitud.');
                  onClose();
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Unirse al Equipo
              </button>
            )}
            {team.status === 'invite-only' && (
              <button 
                onClick={() => {
                  alert('Este equipo solo acepta miembros por invitación. Contacta al líder del equipo.');
                  onClose();
                }}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Solicitar Invitación
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams; 