import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Pencil } from 'lucide-react';

// SVG de trofeo dorado
const TrophySVG = ({ style = {} }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={style} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="44" rx="12" ry="3" fill="#22292f" fillOpacity="0.3" />
    <path d="M24 36c-5 0-9-4-9-9V10h18v17c0 5-4 9-9 9Z" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
    <path d="M19 10V7a5 5 0 0 1 10 0v3" stroke="#B8860B" strokeWidth="2" fill="#FFD700" />
    <rect x="20" y="36" width="8" height="5" rx="2" fill="#B8860B" />
    <rect x="21.5" y="41" width="5" height="2" rx="1" fill="#FFD700" />
    <path d="M15 13c-2.5 0-5 2-5 5 0 3.5 2.5 6 5 6" stroke="#FFD700" strokeWidth="2" />
    <path d="M33 13c2.5 0 5 2 5 5 0 3.5-2.5 6-5 6" stroke="#FFD700" strokeWidth="2" />
  </svg>
);

// PERFIL-AVATAR-ORIGEN: Este es el avatar y nombre que se debe sincronizar con el perfil del usuario
const perfilUsuario = {
  nombre: 'Alex Turner',
  avatar: 'https://files.oaiusercontent.com/file-6b1e7e2e-6e7e-4e2e-8e2e-6e7e2e6e7e2e.png',
  racha: 5,
  top: 'TOP 10',
  online: true,
  admin: true,
};

// Mock de logros
const logros = [
  { tipo: 'trofeo', nombre: 'Campeón Nacional', color: '#FFD700', icon: '🏆' },
  { tipo: 'medalla', nombre: 'Participación', color: '#C0C0C0', icon: '🥈' },
  { tipo: 'medalla', nombre: 'Espíritu de Equipo', color: '#CD7F32', icon: '🥉' },
  { tipo: 'trofeo', nombre: 'Invictos', color: '#FFD700', icon: '🏆' },
];

// Mock de eventos recientes
const eventos = [
  { tipo: 'victoria', texto: 'Victoria contra RedHawks', fecha: '2024-05-01', icon: '✅' },
  { tipo: 'derrota', texto: 'Derrota contra BlueTeam', fecha: '2024-04-28', icon: '❌' },
  { tipo: 'nuevo', texto: 'Nuevo integrante: Samus Aran', fecha: '2024-04-25', icon: '➕' },
  { tipo: 'logro', texto: 'Logro obtenido: Invictos', fecha: '2024-04-20', icon: '🏆' },
];

const integrantes = [
  perfilUsuario,
  {
    nombre: 'Samus Aran',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    racha: 2,
    top: 'TOP 15',
    online: false,
  },
  {
    nombre: 'D4ZC',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    racha: 8,
    top: 'TOP 3',
    online: false,
  },
  {
    nombre: 'Zero Cool',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    racha: 4,
    top: 'TOP 20',
    online: false,
  },
  {
    nombre: 'Trinity',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    racha: 6,
    top: 'TOP 8',
    online: false,
  },
  {
    nombre: 'Neo',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    racha: 3,
    top: 'TOP 12',
    online: false,
  },
  {
    nombre: 'Ada Lovelace',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    racha: 7,
    top: 'TOP 6',
    online: false,
  },
  {
    nombre: 'Kevin Mitnick',
    avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
    racha: 1,
    top: 'TOP 30',
    online: false,
  },
  {
    nombre: 'Cyb3rW0lf',
    avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
    racha: 2,
    top: 'TOP 25',
    online: false,
  },
  {
    nombre: 'Rootkit',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    racha: 5,
    top: 'TOP 11',
    online: false,
  },
];

const radarData = [
  { subject: 'Red Team', A: 120, fullMark: 150 },
  { subject: 'Blue Team', A: 98, fullMark: 150 },
  { subject: 'Forensics', A: 86, fullMark: 150 },
  { subject: 'Crypto', A: 99, fullMark: 150 },
  { subject: 'Web', A: 85, fullMark: 150 },
  { subject: 'PWN', A: 65, fullMark: 150 },
];

const teamName = 'CONSULTING';
const defaultDescription = 'Equipo especializado en ciberseguridad ofensiva y defensiva.';

const Equipos: React.FC = () => {
  const [description, setDescription] = useState(defaultDescription);
  const [editing, setEditing] = useState(false);
  const isAdmin = perfilUsuario.admin;

  return (
    <div className="w-full h-screen flex flex-row overflow-x-auto">
      {/* Panel izquierdo */}
      <div style={{ width: 330, minWidth: 330, height: '100vh', background: '#23272b', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0', overflowY: 'auto' }} className="flex-shrink-0 flex-grow-0">
        {/* Foto de equipo */}
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <img
            src={perfilUsuario.avatar}
            alt={perfilUsuario.nombre}
            style={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', border: '4px solid #101114', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.25)' }}
          />
          {isAdmin && (
            <button
              style={{
                position: 'absolute',
                right: 10,
                bottom: 10,
                background: '#181a20',
                borderRadius: '50%',
                border: '2px solid #23272b',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.18)',
                cursor: 'pointer',
                zIndex: 2,
              }}
              title="Cambiar avatar"
              tabIndex={-1}
            >
              <Pencil size={20} color="#b6e3ff" style={{ opacity: 0.7 }} />
            </button>
          )}
        </div>
        {/* Nombre de equipo */}
        <div className="text-white font-extrabold text-xl mb-3 tracking-wide text-center" style={{ letterSpacing: 2 }}>{teamName}</div>
        {/* Descripción editable */}
        <div className="w-full flex justify-center mb-6">
          {isAdmin && editing ? (
            <textarea
              className="w-11/12 rounded-md bg-[#181a20] text-white p-3 text-sm border border-[#23272b] focus:outline-none focus:ring-2 focus:ring-blue-700"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onBlur={() => setEditing(false)}
              autoFocus
              rows={3}
              maxLength={160}
            />
          ) : (
            <div
              className="w-11/12 rounded-md bg-[#1de9f6] text-[#23272b] text-sm font-semibold text-center py-3 cursor-pointer select-none"
              style={{ minHeight: 44, opacity: 0.95 }}
              onClick={() => isAdmin && setEditing(true)}
              title={isAdmin ? 'Editar descripción' : ''}
            >
              {description}
            </div>
          )}
        </div>
        {/* Trofeos en V */}
        <div className="flex flex-row items-end justify-center gap-4 mb-6 w-full relative" style={{ height: 70 }}>
          <div style={{ alignSelf: 'flex-end' }}>
            <TrophySVG style={{ width: 56, height: 56 }} />
          </div>
          <div style={{ alignSelf: 'flex-end', position: 'relative', top: 30 }}>
            <TrophySVG style={{ width: 56, height: 56 }} />
          </div>
          <div style={{ alignSelf: 'flex-end' }}>
            <TrophySVG style={{ width: 56, height: 56 }} />
          </div>
        </div>
        {/* Gráfica radar */}
        <div className="w-full flex items-center justify-center mb-6" style={{ marginTop: 32 }}>
          <div style={{ width: 220, height: 220, background: 'rgba(16,17,20,0.85)', borderRadius: 16, padding: 12, boxShadow: '0 2px 12px 0 #0004' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#444" />
                <PolarAngleAxis dataKey="subject" stroke="#b6e3ff" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#888" fontSize={10} />
                <Radar name="Equipo" dataKey="A" stroke="#1de9f6" fill="#1de9f6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Área de estadísticas */}
        <div className="w-full flex flex-col items-center justify-center mb-6 px-4">
          <div className="w-full flex flex-row items-center justify-between mb-2">
            <span className="text-sm text-[#b6e3ff] font-bold">Estadísticas</span>
          </div>
          <div className="w-full h-3 rounded-full flex mb-3 overflow-hidden" style={{ opacity: 0.7 }}>
            <div style={{ width: `${(9/12)*100}%`, background: '#1de9f6', height: '100%' }} />
            <div style={{ width: `${(3/12)*100}%`, background: '#e74c3c', height: '100%' }} />
          </div>
          <div className="w-full flex flex-row justify-between text-sm text-white">
            <span>Victorias: <b>9</b></span>
            <span>Derrotas: <b>3</b></span>
          </div>
        </div>
      </div>
      {/* Div central (ocupa el resto) */}
      <div style={{ flex: 1, height: '100vh', background: '#f3f4f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', overflowY: 'auto', paddingTop: 60 }} className="flex-shrink-0">
        {/* Cards de top 3 usuarios en V */}
        {(() => {
          // Ordenar por racha (victorias) descendente y tomar top 3
          const top3 = [...integrantes].sort((a, b) => b.racha - a.racha).slice(0, 3);
          // Posiciones en V: [izq, centro, der] (ajustadas para no quedar tan arriba)
          const positions = [
            { left: '0%', top: -40, z: 1 },
            { left: '50%', top: -70, z: 2 },
            { left: '100%', top: -40, z: 1 },
          ];
          return (
            <div style={{ width: 520, maxWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', gap: 0, marginBottom: 40 }}>
              {top3.map((user, idx) => (
                <div
                  key={user.nombre}
                  style={{
                    width: 120,
                    minWidth: 100,
                    height: 260,
                    background: 'rgba(24,26,32,0.85)',
                    borderRadius: '18px 18px 0 0',
                    boxShadow: '0 6px 32px 0 #0004',
                    border: '2.5px solid #111215',
                    borderBottom: 'none',
                    margin: '0 6px',
                    position: 'relative',
                    zIndex: positions[idx].z,
                    top: positions[idx].top,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '32px 0 0 0',
                    overflow: 'visible',
                  }}
                >
                  {/* Pico bandera */}
                  <svg width="120" height="32" viewBox="0 0 120 32" style={{ position: 'absolute', left: 0, bottom: -32, zIndex: 1 }}><polygon points="0,0 120,0 60,32" fill="#181a20" stroke="#111215" strokeWidth="2.5"/></svg>
                  {/* Marco circular (placeholder) */}
                  <div style={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    background: '#23272b',
                    border: '5px dashed #35373b',
                    position: 'relative',
                    marginBottom: -45,
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {/* Avatar encima del marco */}
                    <img
                      src={user.avatar}
                      alt={user.nombre}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid #fff',
                        boxShadow: '0 2px 12px 0 #0003',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: '#fff',
                      }}
                    />
                  </div>
                  {/* Nombre y username */}
                  <div style={{ marginTop: 55, textAlign: 'center', width: '100%' }}>
                    <div style={{ fontWeight: 900, fontSize: 15, color: '#fff', letterSpacing: 1 }}>{user.nombre}</div>
                    <div style={{ fontWeight: 600, fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{user.nombre}</div>
                  </div>
                  {/* Espacio para insignias */}
                  <div style={{ marginTop: 18, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {/* Placeholder insignias */}
                    <div style={{ width: 22, height: 22, background: '#23272b', borderRadius: '50%', border: '2px dashed #35373b' }} />
                    <div style={{ width: 22, height: 22, background: '#23272b', borderRadius: '50%', border: '2px dashed #35373b' }} />
                    <div style={{ width: 22, height: 22, background: '#23272b', borderRadius: '50%', border: '2px dashed #35373b' }} />
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
        {/* NUEVAS SECCIONES VISUALES */}
        <div style={{ width: 540, maxWidth: '98vw', margin: '48px auto 0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Área para invitar/agregar miembros */}
          <div className="w-full flex flex-col items-center mb-2 px-4">
            <div className="w-full bg-[#181a20] rounded-lg border border-[#23272b] p-3 flex flex-col items-center gap-2" style={{ opacity: 0.95 }}>
              <span className="text-xs text-[#b6e3ff] font-bold mb-1">Invitar miembro</span>
              <input
                type="text"
                placeholder="Correo o usuario..."
                className="w-full px-2 py-1 rounded bg-[#23272b] text-white text-xs border border-[#35373b] focus:outline-none focus:ring-2 focus:ring-blue-700"
                disabled
                value=""
                style={{ opacity: 0.7 }}
              />
              <button className="mt-1 bg-blue-500 text-white text-xs px-3 py-1 rounded shadow hover:bg-blue-600 transition" disabled style={{ opacity: 0.7 }}>Invitar</button>
            </div>
          </div>
          {/* Sección de logros */}
          <div className="w-full flex flex-col items-center mb-2 px-4">
            <div className="w-full bg-[#181a20] rounded-lg border border-[#23272b] p-3 flex flex-col items-center gap-2" style={{ opacity: 0.95 }}>
              <span className="text-xs text-[#facc15] font-bold mb-1">Logros del equipo</span>
              <div className="flex flex-wrap gap-2 justify-center">
                {logros.map((logro, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span style={{ fontSize: 28, color: logro.color, filter: 'drop-shadow(0 1px 2px #0008)' }}>{logro.icon}</span>
                    <span className="text-[10px] text-gray-300 mt-1 text-center max-w-[60px]">{logro.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Sección de eventos recientes/historial */}
          <div className="w-full flex flex-col items-center mb-2 px-4">
            <div className="w-full bg-[#181a20] rounded-lg border border-[#23272b] p-3 flex flex-col items-center gap-2" style={{ opacity: 0.95, minHeight: 80 }}>
              <span className="text-xs text-[#b6e3ff] font-bold mb-1">Eventos recientes</span>
              <ul className="w-full flex flex-col gap-1">
                {eventos.map((evento, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-gray-200">
                    <span style={{ fontSize: 16 }}>{evento.icon}</span>
                    <span className="flex-1 truncate">{evento.texto}</span>
                    <span className="text-[10px] text-gray-400">{evento.fecha}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Panel derecho (integrantes) */}
      <div style={{ width: 250, minWidth: 250, height: '100vh', background: '#181a20', display: 'flex', flexDirection: 'column' }} className="flex-shrink-0 flex-grow-0">
        {/* Encabezado */}
        <div style={{ background: '#101114', color: '#fff', fontWeight: 900, fontSize: 18, letterSpacing: 1, padding: '18px 0', textAlign: 'center', borderBottom: '2px solid #23272b' }}>
          INTEGRANTES DEL EQUIPO
        </div>
        {/* Lista de integrantes */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#23272b', padding: '18px 0 18px 0' }}>
          {integrantes.map((user, idx) => (
            <div
              key={user.nombre}
              className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg"
              style={{
                background: 'rgba(0,0,0,0.85)',
                borderLeft: '4px solid #000',
                borderBottom: '4px solid #000',
                marginTop: idx === 0 ? 8 : 0,
              }}>
              {/* Avatar con puntito de estado */}
              <div style={{ position: 'relative', width: 48, height: 48 }}>
                <img src={user.avatar} alt={user.nombre} style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #222', objectFit: 'cover', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.15)' }} />
                <span style={{
                  position: 'absolute',
                  right: 2,
                  bottom: 2,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: user.online ? '#22c55e' : '#888',
                  border: '2px solid #23272b',
                  display: 'block',
                }} />
              </div>
              {/* Nombre y estado */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <span className="text-white font-bold text-base text-center" style={{ letterSpacing: 1 }}>{user.nombre}</span>
                <span style={{ fontSize: 11, color: user.online ? '#22c55e' : '#888', fontWeight: 700, marginTop: 2 }}>{user.online ? 'Online' : 'Offline'}</span>
              </div>
              {/* Racha y Top */}
              <div className="flex flex-col items-end justify-center text-xs text-white font-semibold" style={{ minWidth: 60 }}>
                <span style={{ fontSize: 12, color: '#b6e3ff', fontWeight: 700 }}>RACHA:</span>
                <span style={{ fontSize: 16, color: '#fff', fontWeight: 900 }}>{user.racha}</span>
                <span style={{ fontSize: 11, color: '#facc15', fontWeight: 700, marginTop: 2 }}>{user.top}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equipos; 