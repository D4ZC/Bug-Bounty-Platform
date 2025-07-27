import React, { useState } from 'react';
import { GiCrossedSwords, GiWolfHowl, GiLaurelsTrophy, GiPodiumWinner } from 'react-icons/gi';
import { FaUserFriends, FaUserShield, FaUsers, FaMedal, FaCrown, FaFlag, FaClock, FaGavel, FaTools, FaUserSecret, FaGift, FaSmile, FaExclamationTriangle, FaFire, FaCheckCircle } from 'react-icons/fa';


// Retos mock por modo
type Dificultad = 'Fácil' | 'Media' | 'Difícil';
type RetoCTF = { id: number; nombre: string; descripcion: string; puntos: number; flag: string; resuelto: boolean; dificultad: Dificultad };

const retosPorModo: Record<'individual'|'duo'|'equipo', RetoCTF[]> = {
  individual: [
    { id: 1, nombre: 'SQL Injection Básico', descripcion: 'Encuentra y explota una vulnerabilidad de SQLi en el login.', puntos: 100, flag: 'flag{sql_injection}', resuelto: false, dificultad: 'Fácil' },
    { id: 2, nombre: 'XSS Reflejado', descripcion: 'Demuestra un XSS reflejado en el buscador.', puntos: 80, flag: 'flag{xss_reflejado}', resuelto: false, dificultad: 'Fácil' },
    { id: 3, nombre: 'Password Hash', descripcion: 'Descifra el hash de la contraseña de admin.', puntos: 120, flag: 'flag{hash_cracked}', resuelto: false, dificultad: 'Media' },
    { id: 4, nombre: 'CSRF Token Leak', descripcion: 'Encuentra y explota una fuga de token CSRF.', puntos: 110, flag: 'flag{csrf_leak}', resuelto: false, dificultad: 'Media' },
    { id: 5, nombre: 'LFI Básico', descripcion: 'Exploita una vulnerabilidad de Local File Inclusion.', puntos: 130, flag: 'flag{lfi_found}', resuelto: false, dificultad: 'Difícil' },
    { id: 6, nombre: 'IDOR', descripcion: 'Accede a información de otro usuario mediante un IDOR.', puntos: 90, flag: 'flag{idor_access}', resuelto: false, dificultad: 'Media' },
    { id: 7, nombre: 'Open Redirect', descripcion: 'Encuentra y explota un open redirect.', puntos: 70, flag: 'flag{open_redirect}', resuelto: false, dificultad: 'Fácil' },
    { id: 8, nombre: 'RCE Básico', descripcion: 'Ejecuta código remoto en el servidor.', puntos: 200, flag: 'flag{rce_basic}', resuelto: false, dificultad: 'Difícil' },
    { id: 9, nombre: 'XXE', descripcion: 'Exploita una vulnerabilidad de XML External Entity.', puntos: 150, flag: 'flag{xxe_found}', resuelto: false, dificultad: 'Difícil' },
    { id: 10, nombre: 'Directory Traversal', descripcion: 'Accede a archivos restringidos mediante directory traversal.', puntos: 100, flag: 'flag{traversal}', resuelto: false, dificultad: 'Media' },
    { id: 11, nombre: 'Brute Force Login', descripcion: 'Realiza un ataque de fuerza bruta para acceder a una cuenta.', puntos: 80, flag: 'flag{bruteforce}', resuelto: false, dificultad: 'Fácil' },
    { id: 12, nombre: 'Sensitive Data Exposure', descripcion: 'Encuentra datos sensibles expuestos en la aplicación.', puntos: 110, flag: 'flag{sensitive_data}', resuelto: false, dificultad: 'Media' },
    { id: 13, nombre: 'Insecure Deserialization', descripcion: 'Exploita una deserialización insegura.', puntos: 170, flag: 'flag{insecure_deserialization}', resuelto: false, dificultad: 'Difícil' },
    { id: 14, nombre: 'Broken Access Control', descripcion: 'Accede a recursos restringidos por un fallo de control de acceso.', puntos: 120, flag: 'flag{broken_access}', resuelto: false, dificultad: 'Media' },
    { id: 15, nombre: 'Clickjacking', descripcion: 'Demuestra una vulnerabilidad de clickjacking.', puntos: 70, flag: 'flag{clickjacking}', resuelto: false, dificultad: 'Fácil' },
  ],
  duo: [
    { id: 1, nombre: 'CTF Colaborativo', descripcion: 'Trabajen juntos para encontrar el flag oculto en la web.', puntos: 150, flag: 'flag{duo_power}', resuelto: false, dificultad: 'Media' },
    { id: 2, nombre: 'Race Condition', descripcion: 'Exploten una condición de carrera para obtener acceso.', puntos: 130, flag: 'flag{race_condition}', resuelto: false, dificultad: 'Difícil' },
    { id: 3, nombre: 'Cross-Team XSS', descripcion: 'Encuentren y exploten un XSS que afecta a ambos usuarios.', puntos: 120, flag: 'flag{duo_xss}', resuelto: false, dificultad: 'Media' },
    { id: 4, nombre: 'JWT Manipulation', descripcion: 'Manipulen un JWT para escalar privilegios.', puntos: 140, flag: 'flag{jwt_duo}', resuelto: false, dificultad: 'Difícil' },
    { id: 5, nombre: 'File Upload Bypass', descripcion: 'Suban un archivo malicioso burlando las validaciones.', puntos: 110, flag: 'flag{file_upload_duo}', resuelto: false, dificultad: 'Media' },
    { id: 6, nombre: 'Session Fixation', descripcion: 'Realicen un ataque de session fixation.', puntos: 100, flag: 'flag{session_fixation}', resuelto: false, dificultad: 'Fácil' },
    { id: 7, nombre: 'API Enumeration', descripcion: 'Descubran y exploten endpoints ocultos en la API.', puntos: 120, flag: 'flag{api_enum_duo}', resuelto: false, dificultad: 'Media' },
  ],
  equipo: [
    { id: 1, nombre: 'Infraestructura Segura', descripcion: 'Encuentren y reporten todas las vulnerabilidades en la infraestructura.', puntos: 200, flag: 'flag{infra_secure}', resuelto: false, dificultad: 'Media' },
    { id: 2, nombre: 'CTF Pentesting', descripcion: 'Simulen un pentest real y capturen todos los flags.', puntos: 180, flag: 'flag{pentest_ctf}', resuelto: false, dificultad: 'Difícil' },
    { id: 3, nombre: 'Respuesta a Incidentes', descripcion: 'Detecten y mitiguen un ataque en tiempo real.', puntos: 160, flag: 'flag{incident_response}', resuelto: false, dificultad: 'Difícil' },
    { id: 4, nombre: 'Red Team vs Blue Team', descripcion: 'Compitan en un entorno de ataque y defensa.', puntos: 220, flag: 'flag{red_vs_blue}', resuelto: false, dificultad: 'Difícil' },
    { id: 5, nombre: 'Privilege Escalation', descripcion: 'Encuentren y exploten una escalada de privilegios.', puntos: 150, flag: 'flag{privesc_team}', resuelto: false, dificultad: 'Media' },
    { id: 6, nombre: 'Web Shell Upload', descripcion: 'Suban y utilicen una web shell en el servidor.', puntos: 200, flag: 'flag{webshell_team}', resuelto: false, dificultad: 'Difícil' },
    { id: 7, nombre: 'DNS Zone Transfer', descripcion: 'Realicen una transferencia de zona DNS para obtener información.', puntos: 120, flag: 'flag{dns_zone_team}', resuelto: false, dificultad: 'Media' },
    { id: 8, nombre: 'Phishing Simulation', descripcion: 'Simulen un ataque de phishing exitoso.', puntos: 100, flag: 'flag{phishing_team}', resuelto: false, dificultad: 'Fácil' },
    { id: 9, nombre: 'Misconfigured S3 Bucket', descripcion: 'Accedan a un bucket S3 mal configurado.', puntos: 130, flag: 'flag{s3_team}', resuelto: false, dificultad: 'Media' },
    { id: 10, nombre: 'Broken Authentication', descripcion: 'Exploten un fallo de autenticación en la aplicación.', puntos: 170, flag: 'flag{broken_auth_team}', resuelto: false, dificultad: 'Difícil' },
  ],
};

const duelModes = [
  {
    key: 'individual',
    name: 'Duelo Individual',
    subtitle: 'El Lobo Solitario',
    icon: <GiWolfHowl size={36} color="#00fff7" />,
    description: 'Cada participante recibe un entorno vulnerable o una serie de retos CTF diseñados para ser completados en solitario.',
    scoring: 'Puntos por cantidad y criticidad de vulnerabilidades encontradas/resueltas o flags capturados. El tiempo también cuenta.',
    winner: 'Mayor puntuación al finalizar el tiempo.'
  },
  {
    key: 'duo',
    name: 'Duelo en Dúo',
    subtitle: 'Los Compañeros de Armas',
    icon: <FaUserFriends size={36} color="#00fff7" />,
    description: 'Dos participantes colaboran en retos complejos que requieren trabajo en equipo.',
    scoring: 'Eficiencia, rapidez y precisión en la resolución. Trabajo en equipo y comunicación son clave.',
    winner: 'Dúo con la puntuación combinada más alta.'
  },
  {
    key: 'equipo',
    name: 'Duelo por Equipos',
    subtitle: 'La Legión de Hackers',
    icon: <FaUsers size={36} color="#00fff7" />,
    description: 'Equipos de 3+ miembros compiten para asegurar una infraestructura o conquistar un CTF de gran escala.',
    scoring: 'Cobertura, calidad de parches, rapidez y estrategia general.',
    winner: 'Equipo con mayor resiliencia y puntos de honor.'
  }
];

// Dificultad: color e ícono
const dificultadInfo: Record<Dificultad, { color: string; icon: React.ReactNode }> = {
  'Fácil': { color: '#39ff14', icon: <FaSmile color="#39ff14" /> },
  'Media': { color: '#ffb300', icon: <FaExclamationTriangle color="#ffb300" /> },
  'Difícil': { color: '#ff4fa3', icon: <FaFire color="#ff4fa3" /> },
};

// Utilidad para estadísticas por dificultad
function getStats(retos: RetoCTF[], dificultad: Dificultad) {
  const total = retos.filter(r => r.dificultad === dificultad).length;
  const resueltos = retos.filter(r => r.dificultad === dificultad && r.resuelto).length;
  const puntosTotales = retos.filter(r => r.dificultad === dificultad).reduce((a, b) => a + b.puntos, 0);
  const puntosObtenidos = retos.filter(r => r.dificultad === dificultad && r.resuelto).reduce((a, b) => a + b.puntos, 0);
  const porcentaje = total === 0 ? 0 : Math.round((resueltos / total) * 100);
  return { total, resueltos, puntosTotales, puntosObtenidos, porcentaje };
}

const ArenaDuelos: React.FC = () => {

  const [selectedMode, setSelectedMode] = useState<'individual'|'duo'|'equipo'>('individual');
  const [retos, setRetos] = useState<RetoCTF[]>(retosPorModo['individual']);
  const [dificultadFiltro, setDificultadFiltro] = useState<'Todas'|Dificultad>('Todas');
  const [puntos, setPuntos] = useState(0);

  // Cambiar retos al cambiar modo
  const handleModeChange = (mode: string) => {
    setSelectedMode(mode as 'individual'|'duo'|'equipo');
    setRetos(retosPorModo[mode as 'individual'|'duo'|'equipo'].map(r => ({ ...r, resuelto: false })));
    setPuntos(0);
  };

  // Filtrar retos por dificultad
  const retosFiltrados = dificultadFiltro === 'Todas' ? retos : retos.filter(r => r.dificultad === dificultadFiltro);

  // Progreso
  const progreso = Math.round((retos.filter(r => r.resuelto).length / retos.length) * 100);

  return (
         <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 font-mono" style={{ background: 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
       <div className="w-full flex flex-col items-center justify-center gap-8 px-4">
         <div className="flex-1 w-full flex flex-col items-center justify-center">
          <h1 className="text-6xl font-extrabold text-[#00fff7] drop-shadow-[0_0_16px_#00fff7] mb-8 flex items-center gap-4 font-mono tracking-wide justify-center">
            <GiCrossedSwords size={64} color="#00fff7" /> Arena Duelos
          </h1>
          
                     <section className="w-full mb-12">
            <h2 className="text-2xl font-bold text-[#00fff7] mb-6 text-center">Participa en un Duelo</h2>
            
            {/* Selector de modo y acción */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6">
              {duelModes.map(mode => (
                <button
                  key={mode.key}
                  className={`flex flex-col items-center px-6 py-4 rounded-2xl border-2 font-bold text-base transition focus:outline-none focus:ring-2 focus:ring-[#00fff7] ${selectedMode === mode.key ? 'bg-[#101926] border-[#00fff7] text-[#00fff7] shadow-[0_0_24px_#00fff7] scale-105 z-10' : 'bg-transparent border-[#232b36] text-[#6f7a8a] hover:bg-[#181c2b] hover:text-[#00fff7] hover:scale-105 transition'}`}
                  onClick={() => handleModeChange(mode.key)}
                  style={{ minWidth: 160 }}
                >
                  {mode.icon}
                  <span className="mt-2 text-base font-bold">{mode.name}</span>
                </button>
              ))}
            </div>
            
                                       {/* Estadísticas y barra de progreso por dificultad */}
              <div className="w-full mb-8">
               {(['Fácil', 'Media', 'Difícil'] as Dificultad[]).map(dif => {
                 const stats = getStats(retos, dif);
                 const info = dificultadInfo[dif];
                 return (
                   <div key={dif} className="mb-4">
                     <div className="flex items-center gap-2 mb-1">
                       <span className="font-bold text-base" style={{ color: info.color }}>{info.icon} {dif}</span>
                       <span className="text-xs text-[#00fff7] ml-2">{stats.resueltos}/{stats.total} retos resueltos</span>
                       <span className="text-xs text-[#a259ff] ml-2">Puntos: {stats.puntosObtenidos}/{stats.puntosTotales}</span>
                       <span className="text-xs text-[#39ff14] ml-2">{stats.porcentaje}%</span>
                     </div>
                     <div className="w-full h-3 bg-[#232b36] rounded-full overflow-hidden border border-[#00fff7]">
                       <div
                         className="h-full rounded-full transition-all duration-500"
                         style={{
                           width: `${stats.porcentaje}%`,
                           background: info.color,
                           boxShadow: `0 0 12px ${info.color}`
                         }}
                       />
                     </div>
                     {stats.total > 0 && stats.resueltos === stats.total && (
                       <div className="mt-1 text-xs font-bold text-[#39ff14] animate-pulse">¡Felicidades! Completaste todos los retos {dif.toLowerCase()} 🎉</div>
                     )}
                   </div>
                 );
               })}
             </div>
             
                          {/* Filtros de dificultad */}
             <div className="flex gap-4 mb-6 justify-center">
               {(['Todas', 'Fácil', 'Media', 'Difícil'] as const).map(df => (
                 <button
                   key={df}
                   className={`px-4 py-2 rounded-full font-bold border-2 text-base transition-all duration-200 ${dificultadFiltro === df ? 'bg-[#101926] border-[#00fff7] text-[#00fff7] shadow-[0_0_12px_#00fff7]' : 'bg-transparent border-[#232b36] text-[#6f7a8a] hover:bg-[#181c2b] hover:text-[#00fff7]'}`}
                   onClick={() => setDificultadFiltro(df)}
                 >
                   {df !== 'Todas' && <span className="inline-flex items-center gap-1 mr-1">{dificultadInfo[df as Dificultad].icon}</span>}
                   {df}
                 </button>
               ))}
             </div>
             
                           {/* Retos Duelo Individual */}
              <h3 className="text-4xl font-extrabold text-[#00fff7] mb-8 tracking-wide font-mono drop-shadow-[0_0_8px_#00fff7] text-center">Retos Duelo Individual</h3>
              
              {/* Grid de Retos CTF - 1 columna en móvil, 3 en escritorio */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12">
                {retosFiltrados.map((reto: RetoCTF) => (
                  <div 
                    key={reto.id} 
                    className="bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl p-6 shadow-[0_0_24px_#00fff7] flex flex-col gap-4 animate-fade-in-up hover:shadow-[0_0_32px_#00fff7] transition-all duration-300 relative"
                    style={{ 
                      height: '280px'
                    }}
                  >
                    {/* Título */}
                    <div className="mt-2">
                      <h3 className="font-bold text-2xl text-[#39ff14] font-mono leading-tight">
                        {reto.nombre}
                      </h3>
                    </div>
                    
                    {/* Etiqueta Default */}
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#232b36] text-[#00fff7] shadow-[0_0_8px_#00fff7]">
                        Default
                      </span>
                    </div>
                    
                    {/* Descripción */}
                    <div className="text-[#00fff7] text-sm font-mono flex-1">
                      {reto.descripcion}
                    </div>
                    
                    {/* Puntos */}
                    <div className="text-[#39ff14] font-bold text-lg font-mono">
                      Puntos: {reto.puntos}
                    </div>
                    
                    {/* Botón funcional estilizado */}
                    <button 
                      className="w-full px-6 py-3 bg-[#00fff7] text-black font-bold rounded-xl shadow-[0_0_12px_#00fff7] transition-all duration-300 hover:bg-[#39ff14] hover:shadow-[0_0_20px_#39ff14] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#39ff14] text-base font-mono"
                      style={{ height: '48px' }}
                    >
                      Iniciar Reto
                    </button>
                  </div>
                ))}
              </div>
             
                                         
             
             <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between w-full">
              <div className="text-[#00fff7] font-bold">Progreso: <span className="text-[#39ff14]">{progreso}%</span></div>
              <div className="text-[#00fff7] font-bold">Tu puntuación: <span className="text-[#39ff14]">{puntos}</span></div>
              <button className="px-6 py-2 bg-[#a259ff] text-white rounded-xl font-bold shadow-[0_0_8px_#a259ff] transition hover:bg-[#ff4fa3]">Ver Leaderboard</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ArenaDuelos; 