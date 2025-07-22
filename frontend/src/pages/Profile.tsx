import React, { useState, useEffect } from 'react';
import { UserAvatar, Idea, Portfolio, Phone, Email, Building, Certificate, Settings, User, LogoLinkedin, Trophy, Star, Group } from '@carbon/icons-react';
import { motion } from 'framer-motion';

const infoCircles = [
  { label: '5 años', desc: 'Experiencia', icon: <Certificate size={24} className="text-[#00fff7]" /> },
  { label: '10', desc: 'Proyectos', icon: <Portfolio size={24} className="text-[#a259ff]" /> },
  { label: 'Innovación', desc: '', icon: <Idea size={24} className="text-[#39ff14]" /> },
  { label: '7', desc: 'Habilidades', icon: <Settings size={24} className="text-[#ffb300]" /> },
];

const navLinks = [
  { icon: <User size={24} />, label: 'Acerca de Mí', href: '#about' },
  { icon: <Portfolio size={24} />, label: 'Proyectos', href: '#experience' },
  { icon: <Phone size={24} />, label: 'Contacto', href: '#contact' },
];

const cards = [
  {
    title: 'Acerca de Mí',
    icon: <UserAvatar size={32} className="text-[#00fff7]" />, 
    content: (
      <p className="text-sm text-gray-300">Desarrollador apasionado por la tecnología, la innovación y la resolución creativa de problemas. Mi misión es crear soluciones digitales que impacten positivamente.</p>
    ),
  },
  {
    title: 'Experiencia Profesional',
    icon: <Building size={32} className="text-[#a259ff]" />, 
    content: (
      <ul className="text-sm text-gray-300 list-disc pl-4">
        <li>Frontend Developer en TechCorp (2021-Actualidad)</li>
        <li>Diseñador UI/UX Freelance (2019-2021)</li>
        <li>Prácticas en InnovateX (2018-2019)</li>
      </ul>
    ),
  },
  {
    title: 'Habilidades',
    icon: <Settings size={32} className="text-[#39ff14]" />, 
    content: (
      <ul className="text-sm text-gray-300 flex flex-wrap gap-2">
        <li className="bg-[#101926] px-2 py-1 rounded">React</li>
        <li className="bg-[#101926] px-2 py-1 rounded">TypeScript</li>
        <li className="bg-[#101926] px-2 py-1 rounded">UI/UX</li>
        <li className="bg-[#101926] px-2 py-1 rounded">Node.js</li>
        <li className="bg-[#101926] px-2 py-1 rounded">Figma</li>
      </ul>
    ),
  },
  {
    title: 'Contacto',
    icon: <Email size={32} className="text-[#ffb300]" />, 
    content: (
      <div className="text-sm text-gray-300 flex flex-col gap-1">
        <span className="flex items-center gap-2"><Email size={18} /> usuario@email.com</span>
        <span className="flex items-center gap-2"><Phone size={18} /> +52 123 456 7890</span>
        <span className="flex items-center gap-2"><LogoLinkedin size={18} /> linkedin.com/in/usuario</span>
      </div>
    ),
  },
];

// Datos de ejemplo para el modal de perfil y equipo
const userDetails = {
  name: 'Juan Pérez',
  role: 'Desarrollador Frontend',
  team: 'TechCorp - Equipo de Innovación',
  about: 'Desarrollador apasionado por la tecnología, la innovación y la resolución creativa de problemas. Mi misión es crear soluciones digitales que impacten positivamente.',
  experience: 5,
  projects: 18,
  innovation: 7,
  skills: ['React', 'TypeScript', 'UI/UX', 'Node.js', 'Figma'],
  badges: [
    { icon: <Star size={24} className="text-yellow-400" />, title: 'Experto Frontend', desc: 'Otorgada por el dominio excepcional en desarrollo frontend.' },
    { icon: <Idea size={24} className="text-[#39ff14]" />, title: 'Innovador Destacado', desc: 'Reconocimiento por contribuciones significativas a proyectos de innovación.' },
    { icon: <Trophy size={24} className="text-[#00fff7]" />, title: 'Maestro de la Resolución', desc: 'Por la habilidad demostrada en la resolución de problemas complejos.' },
  ],
  vulnerabilities: [
    { id: 'VULN2024-001', date: '2024-03-10', desc: 'Corrección de XSS en módulo de autenticación.' },
    { id: 'VULN2024-002', date: '2024-02-15', desc: 'Parche de inyección SQL en la API de productos.' },
    { id: 'VULN2023-005', date: '2023-11-22', desc: 'Implementación de validación de entradas para prevenir ataques CSRF.' },
  ],
  history: [
    { role: 'Frontend Developer', company: 'TechCorp', period: '2021-Actualidad' },
    { role: 'Diseñador UI/UX Freelance', company: '', period: '2019-2021' },
    { role: 'Prácticas en Innovatek', company: '', period: '2018-2019' },
  ],
  contact: {
    email: 'usuario@email.com',
    phone: '+52 123 456 7890',
    linkedin: 'linkedin.com/in/usuario',
  },
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const teamDetails = {
  name: 'Equipo de Innovación',
  description: 'Un equipo multidisciplinario dedicado al desarrollo de soluciones innovadoras y a la resolución de desafíos tecnológicos complejos. Nuestro enfoque es la creación de productos de alto impacto.',
  ranking: '#1 en el Ranking de Equipos de Desarrollo',
  achievements: [
    { icon: <Trophy size={24} className="text-yellow-400" />, title: 'Proyecto X Lanzado Exitosamente', desc: 'Finalización y lanzamiento del Proyecto X antes de lo programado, con excelente recepción de usuarios.' },
    { icon: <Star size={24} className="text-[#00fff7]" />, title: 'Reducción del 15% en Incidentes Críticos', desc: 'Por la implementación de prácticas de desarrollo seguro que disminuyeron los incidentes críticos.' },
    { icon: <Idea size={24} className="text-[#39ff14]" />, title: 'Ganadores del Hackathon Interno 2024', desc: 'Por la solución más innovadora presentada en el hackathon anual.' },
  ],
  members: [
    { name: 'Juan Pérez', role: 'Desarrollador Frontend' },
    { name: 'María García', role: 'Backend Lead' },
    { name: 'Carlos Sánchez', role: 'Diseñador UI/UX Senior' },
    { name: 'Ana López', role: 'QA Engineer' },
  ],
  logo: 'https://ui-avatars.com/api/?name=Equipo+Innovacion&background=0D8ABC&color=fff',
};

// --- NUEVO DISEÑO TIPO STEAM ---

// Datos de ejemplo para amigos y grupos
const friends = [
  { name: 'LATIN HIKKICOMORI', status: 'Offline', avatar: 'https://randomuser.me/api/portraits/men/33.jpg', id: 112 },
  { name: '♥ Poppy ♥', status: 'Offline', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', id: 103 },
];
const groups = [
  { name: 'sh4dman', members: 27516 },
  { name: 'Chilean Community', members: 18417 },
  { name: 'pizza', members: 2450 },
];

const Profile: React.FC = () => {
  // Lista de avatares disponibles (simulando inventario)
  const availableAvatars = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/33.jpg',
    'https://randomuser.me/api/portraits/women/45.jpg',
  ];

  // Estado para datos editables del usuario
  const [editProfile, setEditProfile] = useState({
    name: userDetails.name,
    email: userDetails.contact.email,
    phrase: '"Puedes hacer lo que quieras, pero nunca hieras a otro"',
    avatar: userDetails.avatar,
  });
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Datos de ejemplo para la sección de personalizaciones
  const boughtBackgrounds = [
    { id: 1, name: 'Fondo Azul Oscuro', url: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Fondo Verde Claro', url: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Fondo Morado Profundo', url: 'https://via.placeholder.com/100' },
  ];
  const boughtFrames = [
    { id: 1, name: 'Marco Azul', color: 'border-blue-500' },
    { id: 2, name: 'Marco Verde', color: 'border-green-500' },
    { id: 3, name: 'Marco Rojo', color: 'border-red-500' },
  ];
  const boughtAnimatedAvatars = [
    { id: 1, name: 'Avatar Animado 1', url: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Avatar Animado 2', url: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Avatar Animado 3', url: 'https://via.placeholder.com/100' },
  ];
  const boughtSpecialBadges = [
    { id: 1, name: 'Insignia 1', icon: <Star size={24} className="text-yellow-400" /> },
    { id: 2, name: 'Insignia 2', icon: <Trophy size={24} className="text-[#00fff7]" /> },
    { id: 3, name: 'Insignia 3', icon: <Idea size={24} className="text-[#39ff14]" /> },
  ];
  const boughtSeasonalProfiles = [
    { id: 1, name: 'Perfil Temporada 1', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 2, name: 'Perfil Temporada 2', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 3, name: 'Perfil Temporada 3', color: 'bg-gradient-to-r from-green-500 to-teal-500' },
  ];
  const boughtNamePlates = [
    { id: 1, name: 'Placa 1', style: 'bg-yellow-500 text-black' },
    { id: 2, name: 'Placa 2', style: 'bg-purple-500 text-white' },
    { id: 3, name: 'Placa 3', style: 'bg-green-500 text-white' },
  ];

  // Estados de selección para personalización activa
  const [selectedBackground, setSelectedBackground] = useState(boughtBackgrounds[0]);
  const [selectedFrame, setSelectedFrame] = useState(boughtFrames[0]);
  const [selectedAnimatedAvatar, setSelectedAnimatedAvatar] = useState(boughtAnimatedAvatars[0]);
  const [selectedBadge, setSelectedBadge] = useState(boughtSpecialBadges[0]);
  const [selectedSeasonalProfile, setSelectedSeasonalProfile] = useState(boughtSeasonalProfiles[0]);
  const [selectedNamePlate, setSelectedNamePlate] = useState(boughtNamePlates[0]);

  // Cargar selección desde localStorage al montar
  useEffect(() => {
    const bgId = localStorage.getItem('profile_selectedBackground');
    const frameId = localStorage.getItem('profile_selectedFrame');
    const avatarId = localStorage.getItem('profile_selectedAnimatedAvatar');
    const badgeId = localStorage.getItem('profile_selectedBadge');
    const seasonId = localStorage.getItem('profile_selectedSeasonalProfile');
    const plateId = localStorage.getItem('profile_selectedNamePlate');
    if (bgId) {
      const found = boughtBackgrounds.find(bg => String(bg.id) === bgId);
      if (found) setSelectedBackground(found);
    }
    if (frameId) {
      const found = boughtFrames.find(f => String(f.id) === frameId);
      if (found) setSelectedFrame(found);
    }
    if (avatarId) {
      const found = boughtAnimatedAvatars.find(a => String(a.id) === avatarId);
      if (found) setSelectedAnimatedAvatar(found);
    }
    if (badgeId) {
      const found = boughtSpecialBadges.find(b => String(b.id) === badgeId);
      if (found) setSelectedBadge(found);
    }
    if (seasonId) {
      const found = boughtSeasonalProfiles.find(s => String(s.id) === seasonId);
      if (found) setSelectedSeasonalProfile(found);
    }
    if (plateId) {
      const found = boughtNamePlates.find(p => String(p.id) === plateId);
      if (found) setSelectedNamePlate(found);
    }
  }, []);
  // Guardar solo el id en localStorage
  useEffect(() => { localStorage.setItem('profile_selectedBackground', String(selectedBackground.id)); }, [selectedBackground]);
  useEffect(() => { localStorage.setItem('profile_selectedFrame', String(selectedFrame.id)); }, [selectedFrame]);
  useEffect(() => { localStorage.setItem('profile_selectedAnimatedAvatar', String(selectedAnimatedAvatar.id)); }, [selectedAnimatedAvatar]);
  useEffect(() => { localStorage.setItem('profile_selectedBadge', String(selectedBadge.id)); }, [selectedBadge]);
  useEffect(() => { localStorage.setItem('profile_selectedSeasonalProfile', String(selectedSeasonalProfile.id)); }, [selectedSeasonalProfile]);
  useEffect(() => { localStorage.setItem('profile_selectedNamePlate', String(selectedNamePlate.id)); }, [selectedNamePlate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0033] via-[#2d003e] to-[#0a183d] flex flex-col md:flex-row font-mono relative">
      {/* Fondo decorativo lateral */}
      <div className="hidden md:block fixed right-0 top-0 h-full w-1/3 z-0" style={{background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80) center/cover', opacity: 0.18}} />
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-8 p-6 md:pl-16 md:pr-8 z-10">
        {/* Header tipo Steam */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-[#1a0033cc] rounded-2xl shadow-[0_0_32px_#00fff7] border-2 border-[#00fff7] p-8 backdrop-blur-md animate-fade-in-up">
          {/* Avatar grande con marco y click para modal */}
          <div className="relative group cursor-pointer" onClick={() => setShowProfileModal(true)}>
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#00fff7] via-[#a259ff] to-[#39ff14] blur-2xl opacity-40 group-hover:opacity-70 transition" />
            <img src={userDetails.avatar} alt="Avatar" className="w-36 h-36 rounded-full border-4 border-[#00fff7] shadow-[0_0_32px_#00fff7,0_0_64px_#a259ff40] object-cover relative z-10 group-hover:scale-105 transition-transform duration-200" />
          </div>
          {/* Info principal */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-3xl font-extrabold text-white drop-shadow-lg font-mono">
              <span>♥ {userDetails.name} ♥</span>
              <span className="text-[#a259ff] text-lg">({userDetails.role})</span>
            </div>
            <div className="text-[#ffb300] font-bold text-lg font-mono">Level <span className="text-2xl">55</span></div>
            <div className="text-[#00fff7] text-sm font-mono">{userDetails.team}</div>
            <div className="text-gray-300 text-xs italic font-mono">"Puedes hacer lo que quieras, pero nunca hieras a otro"</div>
          </div>
          {/* Botones tipo Steam */}
          <div className="flex flex-col gap-2 items-end">
            <button className="px-4 py-2 rounded-lg bg-[#00fff7] text-black font-bold shadow-[0_0_8px_#00fff7] hover:bg-[#00e6d2] transition duration-200 font-mono animate-glow">Enviar mensaje</button>
            <button className="px-4 py-2 rounded-lg bg-[#a259ff] text-white font-bold shadow-[0_0_8px_#a259ff] hover:bg-[#7e1fff] transition duration-200 font-mono animate-glow">Más ▼</button>
            <button onClick={() => setShowEditProfileModal(true)} className="px-4 py-2 rounded-lg bg-[#ff4fa3] text-white font-bold shadow-[0_0_8px_#ff4fa3] hover:bg-[#ff7fcf] transition duration-200 font-mono animate-glow">Editar perfil</button>
          </div>
        </div>
        {/* Showcase de ítems y estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Showcase de ítems */}
          <div className="col-span-2 bg-[#181c2bcc] rounded-2xl shadow-[0_0_24px_#00fff7] border-2 border-[#00fff7] p-6 backdrop-blur-md animate-fade-in-up">
            <div className="text-xl font-bold text-[#00fff7] mb-4 font-mono">Item Showcase</div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {boughtAnimatedAvatars.concat(boughtBackgrounds).slice(0,8).map((item, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden border-2 border-[#a259ff] shadow-lg bg-[#101926] flex items-center justify-center h-16 w-16 hover:scale-110 transition-transform duration-200 animate-glow">
                  {item.url ? <img src={item.url} alt={item.name} className="object-cover w-full h-full" /> : <span className="text-xs text-[#00fff7] font-bold font-mono">{item.name}</span>}
                </div>
              ))}
            </div>
            <div className="flex gap-8 justify-between mt-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#00fff7] font-mono">396</span>
                <span className="text-xs text-gray-300 font-mono">Items Owned</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#ff4fa3] font-mono">2,895</span>
                <span className="text-xs text-gray-300 font-mono">Trades Made</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#39ff14] font-mono">3,255</span>
                <span className="text-xs text-gray-300 font-mono">Market Transactions</span>
              </div>
            </div>
          </div>
          {/* Estadísticas y logros */}
          <div className="bg-[#1a0033cc] rounded-2xl shadow-[0_0_24px_#a259ff] border-2 border-[#a259ff] p-6 flex flex-col gap-4 items-center backdrop-blur-md animate-fade-in-up">
            <div className="text-lg font-bold text-[#00fff7] mb-2 font-mono">Currently Online</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {userDetails.badges.map((badge, idx) => (
                <div key={idx} className="rounded-full border-2 border-[#00fff7] bg-[#101926] px-2 py-1 flex items-center gap-1 shadow-lg cursor-pointer hover:scale-110 transition animate-glow" title={badge.title}>
                  {badge.icon}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1 text-xs text-gray-300 w-full font-mono">
              <div><span className="text-[#00fff7] font-bold">Badges</span> 62</div>
              <div><span className="text-[#00fff7] font-bold">Games</span> 80</div>
              <div><span className="text-[#00fff7] font-bold">Inventory</span> 396</div>
              <div><span className="text-[#00fff7] font-bold">Screenshots</span> 513</div>
              <div><span className="text-[#00fff7] font-bold">Workshop Items</span> 13</div>
              <div><span className="text-[#00fff7] font-bold">Reviews</span> 10</div>
              <div><span className="text-[#00fff7] font-bold">Guides</span> 2</div>
              <div><span className="text-[#00fff7] font-bold">Artwork</span> 49</div>
              <div><span className="text-[#00fff7] font-bold">Groups</span> 36</div>
            </div>
          </div>
        </div>
        {/* Showcase de imágenes (tipo Steam) */}
        <div className="bg-[#181c2bcc] rounded-2xl shadow-[0_0_24px_#00fff7] border-2 border-[#00fff7] p-6 mt-6 backdrop-blur-md animate-fade-in-up">
          <div className="text-xl font-bold text-[#00fff7] mb-4 font-mono">Item Showcase</div>
          <div className="grid grid-cols-5 gap-3">
            {boughtAnimatedAvatars.concat(boughtBackgrounds).slice(0,10).map((item, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden border-2 border-[#a259ff] shadow-lg bg-[#101926] flex items-center justify-center h-16 w-16 hover:scale-110 transition-transform duration-200 animate-glow">
                {item.url ? <img src={item.url} alt={item.name} className="object-cover w-full h-full" /> : <span className="text-xs text-[#00fff7] font-bold font-mono">{item.name}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Barra lateral tipo Steam */}
      <aside className="w-full md:w-80 flex-shrink-0 bg-gradient-to-b from-[#1a0033cc] to-[#181c2bcc] p-6 flex flex-col gap-8 z-20 border-l-2 border-[#a259ff] shadow-[0_0_24px_#a259ff] backdrop-blur-md animate-fade-in-up">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold text-[#00fff7] font-mono">Logros y Grupos</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {userDetails.badges.map((badge, idx) => (
              <div key={idx} className="rounded-full border-2 border-[#00fff7] bg-[#101926] px-2 py-1 flex items-center gap-1 shadow-lg cursor-pointer hover:scale-110 transition animate-glow" title={badge.title}>
                {badge.icon}
              </div>
            ))}
          </div>
          <div className="text-[#00fff7] font-bold mt-2 font-mono">Groups</div>
          <ul className="text-xs text-gray-300 space-y-1 font-mono">
            {groups.map((g, idx) => (
              <li key={idx} className="flex items-center gap-2"><span className="font-bold text-[#a259ff]">{g.name}</span> <span className="text-gray-400">{g.members} Members</span></li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[#00fff7] font-bold font-mono">Friends</div>
          <ul className="text-xs text-gray-300 space-y-1 font-mono">
            {friends.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <img src={f.avatar} alt={f.name} className="w-6 h-6 rounded-full border-2 border-[#00fff7]" />
                <span className="font-bold text-[#a259ff]">{f.name}</span>
                <span className="text-gray-400">{f.status}</span>
                <span className="ml-auto text-xs text-[#ff4fa3]">{f.id}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Sección Mi equipo */}
        <div className="flex flex-col gap-2 mt-4 bg-[#181c2bcc] rounded-xl p-4 border-2 border-[#00fff7] shadow-[0_0_16px_#00fff7] animate-glow">
          <div className="flex items-center gap-2 mb-2">
            <img src={teamDetails.logo} alt="Logo del equipo" className="w-10 h-10 rounded-full border-2 border-[#00fff7]" />
            <span className="text-lg font-bold text-[#39ff14] font-mono">Mi equipo</span>
          </div>
          <div className="text-sm text-[#00fff7] font-semibold mb-1 font-mono">{teamDetails.name}</div>
          <div className="text-xs text-gray-300 mb-2 font-mono">{teamDetails.description}</div>
          <button onClick={() => setShowTeamModal(true)} className="px-3 py-1 rounded-lg bg-[#00fff7] text-black font-bold shadow-[0_0_8px_#00fff7] hover:bg-[#00e6d2] transition text-xs font-mono animate-glow">Ver equipo</button>
        </div>
      </aside>
      {/* Modales */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-[#00fff7] rounded-xl p-8 bg-[#181c2b] shadow-2xl relative animate-fade-in-up"
          >
            <button onClick={() => setShowProfileModal(false)} className="absolute top-4 right-4 text-[#00fff7] hover:text-white text-2xl font-bold">×</button>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img src={userDetails.avatar} alt="Foto de perfil" className="w-32 h-32 rounded-full border-4 border-[#00fff7] shadow-lg object-cover" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-2xl font-extrabold text-[#00fff7] font-mono">{userDetails.name}</div>
                <div className="text-lg text-[#a259ff] font-semibold font-mono">{userDetails.role}</div>
                <div className="text-base text-[#39ff14] font-semibold font-mono">{userDetails.team}</div>
                <div className="mt-2 text-gray-300 text-sm font-mono">{userDetails.about}</div>
              </div>
            </div>
            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="flex flex-col items-center">
                <Certificate size={28} className="text-[#00fff7] mb-1" />
                <span className="font-bold text-[#00fff7] font-mono">{userDetails.experience} años</span>
                <span className="text-xs text-gray-400 font-mono">Experiencia</span>
              </div>
              <div className="flex flex-col items-center">
                <Portfolio size={28} className="text-[#a259ff] mb-1" />
                <span className="font-bold text-[#00fff7] font-mono">{userDetails.projects}</span>
                <span className="text-xs text-gray-400 font-mono">Proyectos</span>
              </div>
              <div className="flex flex-col items-center">
                <Idea size={28} className="text-[#39ff14] mb-1" />
                <span className="font-bold text-[#00fff7] font-mono">{userDetails.innovation}</span>
                <span className="text-xs text-gray-400 font-mono">Innovación</span>
              </div>
              <div className="flex flex-col items-center">
                <Settings size={28} className="text-[#ffb300] mb-1" />
                <span className="font-bold text-[#00fff7] font-mono">{userDetails.skills.length}</span>
                <span className="text-xs text-gray-400 font-mono">Habilidades</span>
              </div>
            </div>
            {/* Insignias */}
            <div className="mt-8">
              <div className="text-lg font-bold text-[#00fff7] mb-2 font-mono">Insignias Obtenidas</div>
              <div className="flex flex-wrap gap-4">
                {userDetails.badges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#101926] border-2 border-[#00fff7] rounded-lg px-3 py-2 animate-glow">
                    {badge.icon}
                    <div>
                      <div className="font-semibold text-[#00fff7] font-mono">{badge.title}</div>
                      <div className="text-xs text-gray-400 font-mono">{badge.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Historial de vulnerabilidades */}
            <div className="mt-8">
              <div className="text-lg font-bold text-[#00fff7] mb-2 font-mono">Historial de Vulnerabilidades Resueltas</div>
              <ul className="text-sm text-gray-300 space-y-2 font-mono">
                {userDetails.vulnerabilities.map((v, idx) => (
                  <li key={idx} className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                    <span className="font-bold text-[#00fff7] font-mono">{v.id}</span>
                    <span className="text-xs text-gray-400 font-mono">[{v.date}]</span>
                    <span>{v.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Historial profesional */}
            <div className="mt-8">
              <div className="text-lg font-bold text-[#00fff7] mb-2 font-mono">Historial Profesional</div>
              <ul className="text-sm text-gray-300 space-y-2 font-mono">
                {userDetails.history.map((item, idx) => (
                  <li key={idx}><span className="font-bold text-[#00fff7] font-mono">{item.role}</span> {item.company && <>en <span className="font-semibold font-mono">{item.company}</span></>} <span className="text-xs text-gray-400 font-mono">({item.period})</span></li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
      {/* Modal de equipo */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-[#00fff7] rounded-xl p-8 bg-[#181c2b] shadow-2xl relative animate-fade-in-up"
          >
            <button onClick={() => setShowTeamModal(false)} className="absolute top-4 right-4 text-[#00fff7] hover:text-white text-2xl font-bold">×</button>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img src={teamDetails.logo} alt="Logo del equipo" className="w-32 h-32 rounded-full border-4 border-[#00fff7] shadow-lg object-cover" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-2xl font-extrabold text-[#00fff7] font-mono">{teamDetails.name}</div>
                <div className="mt-2 text-gray-300 text-sm font-mono">{teamDetails.description}</div>
                <div className="text-base text-[#39ff14] font-semibold mt-2 font-mono">{teamDetails.ranking}</div>
              </div>
            </div>
            {/* Logros */}
            <div className="mt-8">
              <div className="text-lg font-bold text-[#00fff7] mb-2 font-mono">Logros Grupales</div>
              <div className="flex flex-wrap gap-4">
                {teamDetails.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#101926] border-2 border-[#00fff7] rounded-lg px-3 py-2 animate-glow">
                    {ach.icon}
                    <div>
                      <div className="font-semibold text-[#00fff7] font-mono">{ach.title}</div>
                      <div className="text-xs text-gray-400 font-mono">{ach.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Integrantes */}
            <div className="mt-8">
              <div className="text-lg font-bold text-[#00fff7] mb-2 font-mono">Integrantes del Equipo</div>
              <ul className="text-sm text-gray-300 space-y-2 font-mono">
                {teamDetails.members.map((m, idx) => (
                  <li key={idx} className="flex items-center gap-2 cursor-pointer hover:text-[#00fff7] transition-colors">
                    <User size={18} className="text-[#00fff7]" />
                    <span className="font-bold font-mono">{m.name}</span> - <span className="text-xs text-gray-400 font-mono">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
      {/* Modal editar perfil */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md border-2 border-[#00fff7] rounded-xl p-8 bg-[#181c2b] shadow-2xl relative animate-fade-in-up"
          >
            <button onClick={() => setShowEditProfileModal(false)} className="absolute top-4 right-4 text-[#00fff7] hover:text-white text-2xl font-bold">×</button>
            <div className="text-2xl font-bold text-[#00fff7] mb-4 font-mono">Editar perfil</div>
            <form onSubmit={e => { e.preventDefault(); userDetails.name = editProfile.name; userDetails.contact.email = editProfile.email; userDetails.about = editProfile.phrase; userDetails.avatar = editProfile.avatar; setShowEditProfileModal(false); }} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1 text-sm font-mono">
                Nombre
                <input type="text" value={editProfile.name} onChange={e => setEditProfile(p => ({ ...p, name: e.target.value }))} className="px-3 py-2 rounded bg-[#101926] border-2 border-[#00fff7] text-white font-mono" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-mono">
                Correo
                <input type="email" value={editProfile.email} onChange={e => setEditProfile(p => ({ ...p, email: e.target.value }))} className="px-3 py-2 rounded bg-[#101926] border-2 border-[#00fff7] text-white font-mono" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-mono">
                Frase
                <input type="text" value={editProfile.phrase} onChange={e => setEditProfile(p => ({ ...p, phrase: e.target.value }))} className="px-3 py-2 rounded bg-[#101926] border-2 border-[#00fff7] text-white font-mono" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-mono">
                Avatar
                <div className="flex gap-2 mt-1">
                  {availableAvatars.map((url, idx) => (
                    <img key={idx} src={url} alt="avatar" onClick={() => setEditProfile(p => ({ ...p, avatar: url }))} className={`w-12 h-12 rounded-full border-2 cursor-pointer ${editProfile.avatar === url ? 'border-[#00fff7] ring-2 ring-[#00fff7]' : 'border-[#101926]'}`} />
                  ))}
                </div>
              </label>
              <button type="submit" className="mt-4 px-4 py-2 rounded-lg bg-[#00fff7] text-black font-bold shadow-[0_0_8px_#00fff7] hover:bg-[#00e6d2] transition font-mono animate-glow">Guardar cambios</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile; 