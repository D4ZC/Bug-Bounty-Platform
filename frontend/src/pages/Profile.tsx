import React, { useState } from 'react';
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

const Profile: React.FC = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a183d] via-[#181c2b] to-[#0a183d] text-white font-mono">
      {/* Cabecera */}
      <div className="relative w-full flex flex-col md:flex-row items-center justify-between px-8 pt-12 pb-8 gap-8 bg-black/60 shadow-lg">
        {/* Imagen de perfil principal (clickable) */}
        <div className="relative flex-shrink-0 cursor-pointer group" onClick={() => setShowProfileModal(true)}>
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#00fff7] via-[#a259ff] to-[#39ff14] blur-2xl opacity-40 group-hover:opacity-70 transition" />
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Foto de perfil"
            className="w-40 h-40 rounded-full border-4 border-[#00fff7] shadow-[0_0_32px_#00fff7,0_0_64px_#a259ff40] object-cover relative z-10 group-hover:scale-105 transition"
          />
        </div>
        {/* Círculos de información */}
        <div className="flex flex-row md:flex-col gap-6 md:gap-4 items-center md:items-start">
          {infoCircles.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#101926] border-2 border-[#00fff7] shadow-[0_0_16px_#00fff7] flex items-center justify-center text-lg font-bold mb-1">
                {item.icon}
              </div>
              <span className="text-base font-bold text-[#00fff7]">{item.label}</span>
              {item.desc && <span className="text-xs text-gray-400">{item.desc}</span>}
            </div>
          ))}
        </div>
      </div>
      {/* Barra de navegación */}
      <div className="flex items-center justify-between px-8 py-4 bg-[#101926] border-b-2 border-[#00fff7]/30">
        <div className="text-2xl font-extrabold tracking-wide text-[#00fff7]">Juan Pérez</div>
        <div className="flex gap-6">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="flex items-center gap-2 text-[#a259ff] hover:text-[#00fff7] transition-colors">
              {link.icon}
              <span className="hidden md:inline text-base font-semibold">{link.label}</span>
            </a>
          ))}
          <button onClick={() => setShowTeamModal(true)} className="flex items-center gap-2 text-[#39ff14] hover:text-[#00fff7] transition-colors font-semibold"><Group size={24} /><span className="hidden md:inline">Mi Equipo</span></button>
        </div>
      </div>
      {/* Tarjetas secciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-12">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-[#181c2b] rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 border-2 border-[#00fff7]/20">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#101926] border-2 border-[#00fff7] mb-2">
              {card.icon}
            </div>
            <div className="text-lg font-bold text-[#00fff7] mb-1 text-center">{card.title}</div>
            <div className="w-full text-center">{card.content}</div>
          </div>
        ))}
      </div>

      {/* Modal de perfil detallado */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-[#00fff7] rounded-xl p-8 bg-[#181c2b] shadow-2xl relative"
          >
            <button onClick={() => setShowProfileModal(false)} className="absolute top-4 right-4 text-[#00fff7] hover:text-white text-2xl font-bold">×</button>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img src={userDetails.avatar} alt="Foto de perfil" className="w-32 h-32 rounded-full border-4 border-[#00fff7] shadow-lg object-cover" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-2xl font-extrabold text-[#00fff7]">{userDetails.name}</div>
                <div className="text-lg text-[#a259ff] font-semibold">{userDetails.role}</div>
                <div className="text-base text-[#39ff14] font-semibold">{userDetails.team}</div>
                <div className="mt-2 text-gray-300 text-sm">{userDetails.about}</div>
              </div>
            </div>
            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="flex flex-col items-center">
                <Certificate size={28} className="text-[#00fff7] mb-1" />
                <span className="font-bold text-[#00fff7]">{userDetails.experience} años</span>
                <span className="text-xs text-gray-400">Experiencia</span>
              </div>
              <div className="flex flex-col items-center">
                <Portfolio size={28} className="text-[#a259ff] mb-1" />
                <span className="font-bold text-[#00fff7]">{userDetails.projects}</span>
                <span className="text-xs text-gray-400">Proyectos</span>
              </div>
              <div className="flex flex-col items-center">
                <Idea size={28} className="text-[#39ff14] mb-1" />
                <span className="font-bold text-[#00fff7]">{userDetails.innovation}</span>
                <span className="text-xs text-gray-400">Innovación</span>
              </div>
              <div className="flex flex-col items-center">
                <Settings size={28} className="text-[#ffb300] mb-1" />
                <span className="font-bold text-[#00fff7]">{userDetails.skills.length}</span>
                <span className="text-xs text-gray-400">Habilidades</span>
              </div>
            </div>
            {/* Insignias */}
            <div className="mt-8">
              <div className="text-lg font-bold text-[#00fff7] mb-2">Insignias Obtenidas</div>
              <div className="flex flex-wrap gap-4">
                {userDetails.badges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#101926] border border-[#00fff7]/30 rounded-lg px-3 py-2">
                    {badge.icon}
                    <div>
                      <div className="font-semibold text-[#00fff7]">{badge.title}</div>
                      <div className="text-xs text-gray-400">{badge.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Historial de vulnerabilidades */}
            <div className="mt-8">
              <div className="text-lg font-bold text-[#00fff7] mb-2">Historial de Vulnerabilidades Resueltas</div>
              <ul className="text-sm text-gray-300 space-y-2">
                {userDetails.vulnerabilities.map((v, idx) => (
                  <li key={idx} className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                    <span className="font-bold text-[#00fff7]">{v.id}</span>
                    <span className="text-xs text-gray-400">[{v.date}]</span>
                    <span>{v.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Historial profesional */}
            <div className="mt-8">
              <div className="text-lg font-bold text-[#00fff7] mb-2">Historial Profesional</div>
              <ul className="text-sm text-gray-300 space-y-2">
                {userDetails.history.map((item, idx) => (
                  <li key={idx}><span className="font-bold text-[#00fff7]">{item.role}</span> {item.company && <>en <span className="font-semibold">{item.company}</span></>} <span className="text-xs text-gray-400">({item.period})</span></li>
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
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-[#00fff7] rounded-xl p-8 bg-[#181c2b] shadow-2xl relative"
          >
            <button onClick={() => setShowTeamModal(false)} className="absolute top-4 right-4 text-[#00fff7] hover:text-white text-2xl font-bold">×</button>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img src={teamDetails.logo} alt="Logo del equipo" className="w-32 h-32 rounded-full border-4 border-[#00fff7] shadow-lg object-cover" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-2xl font-extrabold text-[#00fff7]">{teamDetails.name}</div>
                <div className="mt-2 text-gray-300 text-sm">{teamDetails.description}</div>
                <div className="text-base text-[#39ff14] font-semibold mt-2">{teamDetails.ranking}</div>
              </div>
            </div>
            {/* Logros */}
            <div className="mt-8">
              <div className="text-lg font-bold text-[#00fff7] mb-2">Logros Grupales</div>
              <div className="flex flex-wrap gap-4">
                {teamDetails.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#101926] border border-[#00fff7]/30 rounded-lg px-3 py-2">
                    {ach.icon}
                    <div>
                      <div className="font-semibold text-[#00fff7]">{ach.title}</div>
                      <div className="text-xs text-gray-400">{ach.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Integrantes */}
            <div className="mt-8">
              <div className="text-lg font-bold text-[#00fff7] mb-2">Integrantes del Equipo</div>
              <ul className="text-sm text-gray-300 space-y-2">
                {teamDetails.members.map((m, idx) => (
                  <li key={idx} className="flex items-center gap-2 cursor-pointer hover:text-[#00fff7] transition-colors">
                    <User size={18} className="text-[#00fff7]" />
                    <span className="font-bold">{m.name}</span> - <span className="text-xs text-gray-400">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile; 