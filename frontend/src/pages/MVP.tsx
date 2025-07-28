import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import insignia1 from '../assets/images/Insignias/Insignia1.png';
import insignia2 from '../assets/images/Insignias/Insignia2.png';
import insignia3 from '../assets/images/Insignias/Insignia3.png';
import insignia4 from '../assets/images/Insignias/Insignia4.png';
import insignia5 from '../assets/images/Insignias/Insignia5.png';
import insignia6 from '../assets/images/Insignias/Insignia6.png';
import insignia7 from '../assets/images/Insignias/Insignia7.png';

// Función para generar números pseudo-aleatorios consistentes (igual que en UserRankingTable)
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generar puntos estables basados en el ID del usuario
const generateStablePoints = (userId: string) => {
  const seed = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Math.floor(seededRandom(seed) * 1000) + 100;
};

// Usuarios del equipo Consulting (7 usuarios - manteniendo Alex Turner)
const CONSULTING_USERS = [
  { id: 'USR-001', name: 'Alex Turner', team: 'Consulting', role: 'Líder' },
  { id: 'USR-002', name: 'Sarah Chen', team: 'Consulting', role: 'Miembro' },
  { id: 'USR-003', name: 'Michael Rodriguez', team: 'Consulting', role: 'Miembro' },
  { id: 'USR-004', name: 'Emily Watson', team: 'Consulting', role: 'Miembro' },
  { id: 'USR-005', name: 'David Kim', team: 'Consulting', role: 'Miembro' },
  { id: 'USR-006', name: 'Lisa Park', team: 'Consulting', role: 'Miembro' },
  { id: 'USR-007', name: 'James Wilson', team: 'Consulting', role: 'Miembro' },
];

// Usuarios del equipo CyberWolves (7 usuarios)
const CYBERWOLVES_USERS = [
  { id: 'USR-008', name: 'Carlos Mendoza', team: 'CyberWolves', role: 'Miembro' },
  { id: 'USR-009', name: 'Diego Ramirez', team: 'CyberWolves', role: 'Miembro' },
  { id: 'USR-010', name: 'Sofia Castro', team: 'CyberWolves', role: 'Miembro' },
  { id: 'USR-011', name: 'Andres Vargas', team: 'CyberWolves', role: 'Miembro' },
  { id: 'USR-012', name: 'Mateo Silva', team: 'CyberWolves', role: 'Miembro' },
  { id: 'USR-013', name: 'Fernando Ruiz', team: 'CyberWolves', role: 'Miembro' },
  { id: 'USR-014', name: 'Oscar Herrera', team: 'CyberWolves', role: 'Miembro' },
];

// Usuarios del equipo Apps (7 usuarios - manteniendo Liam Smith MVP)
const APPS_USERS = [
  { id: 'USR-015', name: 'Liam Smith', team: 'Apps', role: 'Miembro' }, // MVP - puntos más altos
  { id: 'USR-016', name: 'Ana Torres', team: 'Apps', role: 'Miembro' },
  { id: 'USR-017', name: 'Luis Pérez', team: 'Apps', role: 'Miembro' },
  { id: 'USR-018', name: 'Gabriel Torres', team: 'Apps', role: 'Miembro' },
  { id: 'USR-019', name: 'Camila Morales', team: 'Apps', role: 'Miembro' },
  { id: 'USR-020', name: 'Isabella Rodriguez', team: 'Apps', role: 'Miembro' },
  { id: 'USR-021', name: 'Lucia Herrera', team: 'Apps', role: 'Miembro' },
];

// Usuarios del equipo Data (7 usuarios)
const DATA_USERS = [
  { id: 'USR-022', name: 'Lucas Martin', team: 'Data', role: 'Miembro' },
  { id: 'USR-023', name: 'Mia Lee', team: 'Data', role: 'Miembro' },
  { id: 'USR-024', name: 'Ethan Kim', team: 'Data', role: 'Miembro' },
  { id: 'USR-025', name: 'Daniel Herrera', team: 'Data', role: 'Miembro' },
  { id: 'USR-026', name: 'Sebastian Rojas', team: 'Data', role: 'Miembro' },
  { id: 'USR-027', name: 'Adrian Castro', team: 'Data', role: 'Miembro' },
  { id: 'USR-028', name: 'Ricardo Morales', team: 'Data', role: 'Miembro' },
];

// Usuarios del equipo P-TECH (7 usuarios)
const PTECH_USERS = [
  { id: 'USR-029', name: 'Marta López', team: 'P-TECH', role: 'Miembro' },
  { id: 'USR-030', name: 'Valentina Ruiz', team: 'P-TECH', role: 'Miembro' },
  { id: 'USR-031', name: 'Natalia Jimenez', team: 'P-TECH', role: 'Miembro' },
  { id: 'USR-032', name: 'Valeria Mendoza', team: 'P-TECH', role: 'Miembro' },
  { id: 'USR-033', name: 'Carmen Vargas', team: 'P-TECH', role: 'Miembro' },
  { id: 'USR-034', name: 'Rosa Ruiz', team: 'P-TECH', role: 'Miembro' },
  { id: 'USR-035', name: 'Monica Rojas', team: 'P-TECH', role: 'Miembro' },
];

// Combinar usuarios y asignar puntos estables
const ALL_USERS = [...CONSULTING_USERS, ...CYBERWOLVES_USERS, ...APPS_USERS, ...DATA_USERS, ...PTECH_USERS].map((u, i) => {
  let puntos;
  if (u.id === 'USR-015') { // Liam Smith - MVP (nuevo ID)
    puntos = 1065; // Puntos más altos para asegurar primera posición
  } else {
    puntos = generateStablePoints(u.id);
  }
  
  return {
    ...u,
    role: 'Miembro',
    stats: { 
      puntos: puntos, 
      vulnerabilidades: Math.floor(seededRandom(u.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) * 100), 
      retos: Math.floor(seededRandom(u.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) * 50) 
    },
    badges: [],
  };
}).sort((a, b) => b.stats.puntos - a.stats.puntos); // Ordenar por puntos de mayor a menor

// Obtener el MVP (primer lugar en el ranking)
const mvpUser = ALL_USERS[0];

// Descripciones personalizadas para cada MVP
const MVP_DESCRIPTIONS = {
  'Liam Smith': '🔍 Especialista en análisis de vulnerabilidades web con más de 5 años de experiencia. Su enfoque meticuloso y capacidad para encontrar bugs críticos lo han convertido en una leyenda en la plataforma. Siempre comparte sus conocimientos con la comunidad. 💡',
  'Alex Turner': '⚡ Líder nato del equipo Consulting, combina experiencia técnica con habilidades de mentoría excepcionales. Su estrategia de caza de bugs es impecable y ha ayudado a formar a decenas de nuevos investigadores. 🎯',
  'Sarah Chen': '🛡️ Experta en seguridad de aplicaciones móviles y APIs. Su metodología sistemática y atención al detalle la han llevado a descubrir vulnerabilidades críticas en sistemas empresariales. Siempre innovando en técnicas de testing. 🚀',
  'Michael Rodriguez': '💎 Maestro del reverse engineering y análisis de malware. Su capacidad para entender sistemas complejos y encontrar vectores de ataque únicos es simplemente extraordinaria. Comparte generosamente sus hallazgos. 🔬',
  'Emily Watson': '🌟 Investigadora de seguridad con enfoque en criptografía y blockchain. Su trabajo en auditorías de smart contracts ha establecido nuevos estándares en la industria. Siempre a la vanguardia de las nuevas tecnologías. ⚙️',
  'David Kim': '🎯 Especialista en pentesting de infraestructura y redes. Su metodología de testing de caja negra es legendaria. Ha descubierto múltiples vulnerabilidades críticas en sistemas de alta seguridad. Un verdadero maestro del oficio. 🔥',
  'Lisa Park': '⚡ Investigadora de seguridad con expertise en análisis forense digital. Su capacidad para reconstruir ataques y encontrar evidencia oculta es simplemente asombrosa. Siempre dispuesta a ayudar a otros investigadores. 🕵️',
  'James Wilson': '💎 Experto en seguridad de aplicaciones web y móviles. Su enfoque en la automatización de procesos de testing ha revolucionado la forma en que se realizan las auditorías. Un innovador nato en el campo. 🚀',
  'Carlos Mendoza': '🛡️ Líder del equipo CyberWolves, especialista en seguridad de redes y sistemas distribuidos. Su visión estratégica y capacidad de coordinación han llevado a su equipo a múltiples victorias. Un verdadero estratega. 🎖️',
  'Diego Ramirez': '🔍 Investigador de seguridad con enfoque en análisis de malware y threat hunting. Su capacidad para identificar patrones de ataque y desarrollar contramedidas es excepcional. Siempre compartiendo conocimiento. 🧠',
  'Sofia Castro': '🌟 Especialista en seguridad de aplicaciones cloud y DevOps. Su expertise en contenedores y orquestación la ha convertido en una autoridad en seguridad de infraestructura moderna. Innovadora y visionaria. ☁️',
  'Andres Vargas': '⚡ Investigador de seguridad con especialización en IoT y dispositivos embebidos. Su trabajo en hardening de dispositivos conectados ha establecido nuevos benchmarks en la industria. Siempre explorando nuevas fronteras. 🔌',
  'Mateo Silva': '💎 Experto en análisis de vulnerabilidades de día cero y exploits. Su capacidad para entender y reproducir ataques complejos es simplemente extraordinaria. Un verdadero maestro del exploit development. 🎯',
  'Fernando Ruiz': '🛡️ Especialista en seguridad de aplicaciones empresariales y sistemas legacy. Su metodología de testing de caja gris ha sido adoptada por múltiples organizaciones. Un investigador meticuloso y confiable. 🏢',
  'Oscar Herrera': '🚀 Investigador de seguridad con enfoque en automatización y machine learning aplicado a la detección de amenazas. Su trabajo en herramientas de análisis automatizado ha revolucionado el campo. Un visionario tecnológico. 🤖'
};

const ALL_BADGES = [
  { img: insignia1, name: '🏆 Campeón de Bugs' },
  { img: insignia2, name: '⭐ MVP del Mes' },
  { img: insignia3, name: '🔍 Cazador Elite' },
  { img: insignia4, name: '🛡️ Defensor Digital' },
  { img: insignia5, name: '⚡ Hacker Veloz' },
  { img: insignia6, name: '💎 Maestro de la Seguridad' },
  { img: insignia7, name: '🌟 Leyenda del Ciberespacio' },
];

const MVP: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'team' | 'history'>('user');
  const { user: currentUser } = useAuth();

  // Obtener insignias seleccionadas del perfil
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedBadges');
      if (saved) {
        setSelectedBadges(JSON.parse(saved));
      }
    }
  }, []);

  // Obtener marco seleccionado
  const [selectedMarco, setSelectedMarco] = useState<string>('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const marco = localStorage.getItem('selectedMarco');
      if (marco) {
        setSelectedMarco(marco);
      }
    }
  }, []);

  // Obtener avatar seleccionado
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const avatar = localStorage.getItem('selectedAvatar');
      if (avatar) {
        setSelectedAvatar(avatar);
      }
    }
  }, []);

  const userInsignias = selectedBadges.map(img => ALL_BADGES.find(b => b.img === img)).filter(Boolean) as {img: string, name: string}[];

  // Generar iniciales del MVP
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-white rounded-lg p-2 shadow-sm">
            {[
              { key: 'user', label: 'MVP USUARIO', icon: '👤' },
              { key: 'team', label: 'MVP EQUIPO', icon: '👥' },
              { key: 'history', label: 'HISTORIAL', icon: '📅' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'user' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              {/* MVP User Section */}
              <div className="mb-8">
                {/* Marco cuadrado blanco con Avatar integrado */}
                <div className="flex justify-center mb-4">
                  {/* Marco cuadrado blanco con Avatar dentro */}
                  <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center shadow-lg border-2 border-gray-200">
                    {/* Avatar dentro del marco */}
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      {mvpUser.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                </div>
                
                {/* Nombre y Equipo */}
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{mvpUser.name}</h2>
                <p className="text-xl text-blue-600 font-semibold mb-4">{mvpUser.team}</p>
                
                {/* Descripción personalizada del MVP */}
                <div className="max-w-3xl mx-auto mb-8">
                  <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    {/* Decoración de esquina */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-br-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-tl-2xl"></div>
                    
                    {/* Icono decorativo */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl">⭐</span>
                    </div>
                    
                    {/* Contenido principal */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                        <h3 className="text-lg font-bold text-gray-800">Perfil del MVP</h3>
                      </div>
                      
                      <p className="text-gray-700 text-base leading-relaxed font-medium">
                        {MVP_DESCRIPTIONS[mvpUser.name as keyof typeof MVP_DESCRIPTIONS] || 
                         '🔍 Investigador de seguridad excepcional con un historial impresionante de descubrimientos. Su dedicación y expertise lo han convertido en un referente en la comunidad de bug bounty. 💎'}
                      </p>
                      
                      {/* Línea decorativa inferior */}
                      <div className="mt-4 pt-3 border-t border-blue-200">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>🏆 MVP del Mes</span>
                          <span>•</span>
                          <span>🎯 Especialista</span>
                          <span>•</span>
                          <span>💎 Elite</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">15</div>
                  <div className="text-sm text-red-700">Críticas</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">25</div>
                  <div className="text-sm text-orange-700">Altas</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">35</div>
                  <div className="text-sm text-yellow-700">Medianas</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-green-700">Bajas</div>
                </div>
              </div>

              {/* Puntos totales */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-center text-white mb-8">
                <div className="text-4xl font-bold mb-2">{mvpUser.stats.puntos}</div>
                <div className="text-lg">PUNTOS TOTALES</div>
              </div>

              {/* Insignias seleccionadas */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🏅 Insignias del MVP</h3>
                <div className="flex justify-center gap-4">
                  {userInsignias.length > 0 ? (
                    userInsignias.map((ins, i) => (
                      <div key={i} className="relative group">
                        <img 
                          src={ins.img} 
                          alt={ins.name} 
                          className="w-16 h-16 rounded-full border-2 border-yellow-500 shadow object-cover bg-white" 
                        />
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                          {ins.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center">
                      <p>No hay insignias seleccionadas</p>
                      <p className="text-sm">Selecciona insignias en tu perfil para verlas aquí</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              {/* Avatar del equipo */}
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                C
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">CyberWolves</h2>
              <p className="text-xl text-blue-600 font-semibold">Equipo Destacado del Mes</p>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">3,674</div>
                <div className="text-sm text-blue-700">PUNTOS TOTALES</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600">156</div>
                <div className="text-sm text-green-700">VULNERABILIDADES</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">67</div>
                <div className="text-sm text-purple-700">CHALLENGES</div>
              </div>
            </div>

            {/* Team Members */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Miembros del Equipo</h3>
              <div className="overflow-x-auto">
                <div className="flex gap-4 min-w-max pb-2">
                  {ALL_USERS.filter(user => user.team === 'CyberWolves').map((member, index) => {
                    const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase();
                    return (
                      <div key={member.id} className="bg-gray-50 rounded-lg p-4 text-center min-w-[120px]">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm">
                          {initials}
                        </div>
                        <div className="font-semibold text-gray-700 text-sm">{member.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Insignias seleccionadas */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🏅 Insignias del Equipo</h3>
              <div className="flex justify-center gap-4">
                {userInsignias.length > 0 ? (
                  userInsignias.map((ins, i) => (
                    <div key={i} className="relative group">
                      <img 
                        src={ins.img} 
                        alt={ins.name} 
                        className="w-16 h-16 rounded-full border-2 border-yellow-500 shadow object-cover bg-white" 
                      />
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                        {ins.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center">
                    <p>No hay insignias seleccionadas</p>
                    <p className="text-sm">Selecciona insignias en tu perfil para verlas aquí</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 Historial de MVPs</h2>
            
            <div className="space-y-4">
              {[
                { month: 'Noviembre 2024', user: 'Ana Torres', team: 'Data', score: 78 },
                { month: 'Octubre 2024', user: 'Luis Pérez', team: 'Apps', score: 65 },
                { month: 'Septiembre 2024', user: 'Marta López', team: 'P-TECH', score: 72 }
              ].map((mvp, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{mvp.month}</h3>
                      <p className="text-gray-600">MVP: {mvp.user} | Equipo: {mvp.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{mvp.score}</div>
                    <div className="text-sm text-gray-500">Puntos</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">¿Quién será el próximo MVP?</p>
              <p className="text-sm text-gray-500">¡Participa activamente en los desafíos y reporta vulnerabilidades!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MVP; 