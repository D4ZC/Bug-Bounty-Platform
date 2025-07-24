import React, { useState } from 'react';
import { GiCrossedSwords, GiWolfHowl, GiTeamIdea, GiLaurelsTrophy, GiPodiumWinner } from 'react-icons/gi';
import { FaUserFriends, FaUserShield, FaUsers, FaMedal, FaCrown, FaFlag, FaClock, FaGavel, FaTools, FaUserSecret, FaGift, FaSmile, FaExclamationTriangle, FaFire, FaCheckCircle } from 'react-icons/fa';
import { useRef } from 'react';

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

const leaderboardMock = [
  { usuario: 'Alice', puntos: 400 },
  { usuario: 'Bob', puntos: 320 },
  { usuario: 'Tú', puntos: 0 },
];

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

const reglas = [
  { icon: <FaUserShield />, text: 'Entornos controlados y seguros.' },
  { icon: <FaUserSecret />, text: 'Solo hacking ético. Nada fuera del entorno.' },
  { icon: <FaClock />, text: 'Tiempo límite para cada duelo.' },
  { icon: <FaFlag />, text: 'Las vulnerabilidades deben ser reportadas y documentadas.' },
  { icon: <FaGavel />, text: 'Jueces o sistema automatizado validan y puntúan.' },
  { icon: <FaTools />, text: 'Se permite cualquier herramienta estándar de ciberseguridad.' },
  { icon: <FaCrown />, text: 'No compartir soluciones entre equipos, salvo en Dúo/Equipo.' },
];

const premios = [
  { icon: <FaMedal />, text: 'Insignias de "Maestro de Vulnerabilidades" (se mostrarán en tu perfil)' },
  { icon: <FaGift />, text: 'Acceso a recursos premium de ciberseguridad' },
  { icon: <GiLaurelsTrophy />, text: 'Oportunidades de capacitación o conferencias' },
  { icon: <GiPodiumWinner />, text: 'Reconocimiento en el cuadro de honor público' },
];

// Dificultad: color e ícono
const dificultadInfo: Record<Dificultad, { color: string; icon: React.ReactNode }> = {
  'Fácil': { color: '#39ff14', icon: <FaSmile color="#39ff14" /> },
  'Media': { color: '#ffb300', icon: <FaExclamationTriangle color="#ffb300" /> },
  'Difícil': { color: '#ff4fa3', icon: <FaFire color="#ff4fa3" /> },
};

type RetoCTFDetalle = RetoCTF & {
  hint?: string;
  pasos?: string[];
  herramientas?: string[];
  ejemploReporte?: string;
};

// Agregar detalles a los retos mock
const detallesRetos: Record<'individual'|'duo'|'equipo', Record<number, RetoCTFDetalle>> = {
  individual: {
    1: {
      id: 1,
      nombre: 'SQL Injection Básico',
      descripcion: 'Encuentra y explota una vulnerabilidad de SQLi en el login.',
      puntos: 100,
      flag: 'flag{sql_injection}',
      resuelto: false,
      dificultad: 'Fácil',
      hint: 'Prueba con comillas simples y observa el comportamiento del login.',
      pasos: [
        'Identifica los campos de entrada vulnerables.',
        'Intenta inyecciones básicas como \' OR 1=1--',
        'Observa si puedes evadir la autenticación.'
      ],
      herramientas: ['Burp Suite', 'sqlmap', 'Firefox DevTools'],
      ejemploReporte: 'Título: SQL Injection en login\nImpacto: Acceso no autorizado\nReproducción: Ingresa \' OR 1=1-- en el campo usuario.\nSolución: Usa consultas preparadas.'
    },
    2: {
      id: 2,
      nombre: 'XSS Reflejado',
      descripcion: 'Demuestra un XSS reflejado en el buscador.',
      puntos: 80,
      flag: 'flag{xss_reflejado}',
      resuelto: false,
      dificultad: 'Fácil',
      hint: 'Intenta inyectar <script>alert(1)</script> en el parámetro de búsqueda.',
      pasos: [
        'Busca un campo que refleje tu entrada en la página.',
        'Inyecta un payload XSS básico.',
        'Observa si se ejecuta JavaScript.'
      ],
      herramientas: ['Burp Suite', 'Firefox DevTools'],
      ejemploReporte: 'Título: XSS reflejado en buscador\nImpacto: Ejecución de JS arbitrario\nReproducción: Buscar <script>alert(1)</script>\nSolución: Escapar caracteres especiales.'
    },
    3: {
      id: 3,
      nombre: 'Password Hash',
      descripcion: 'Descifra el hash de la contraseña de admin.',
      puntos: 120,
      flag: 'flag{hash_cracked}',
      resuelto: false,
      dificultad: 'Media',
      hint: 'Busca el hash en bases de datos públicas.',
      pasos: [
        'Obtén el hash de la base de datos.',
        'Usa herramientas de cracking o bases de datos online.',
        'Valida el password obtenido.'
      ],
      herramientas: ['hashcat', 'CrackStation'],
      ejemploReporte: 'Título: Hash de contraseña débil\nImpacto: Compromiso de cuenta\nReproducción: Crackear hash con hashcat\nSolución: Usar hashes fuertes y salting.'
    }
  },
  duo: {
    1: {
      id: 1,
      nombre: 'CTF Colaborativo',
      descripcion: 'Trabajen juntos para encontrar el flag oculto en la web.',
      puntos: 150,
      flag: 'flag{duo_power}',
      resuelto: false,
      dificultad: 'Media',
      hint: 'Dividan tareas y compartan hallazgos.',
      pasos: [
        'Mapeen la aplicación juntos.',
        'Busquen endpoints ocultos.',
        'Combinen información para encontrar el flag.'
      ],
      herramientas: ['Burp Suite', 'Google Dorking'],
      ejemploReporte: 'Título: Flag oculto encontrado\nImpacto: Acceso a información sensible\nReproducción: Navegar a /hidden/flag\nSolución: Restringir acceso a rutas internas.'
    },
    2: {
      id: 2,
      nombre: 'Race Condition',
      descripcion: 'Exploten una condición de carrera para obtener acceso.',
      puntos: 130,
      flag: 'flag{race_condition}',
      resuelto: false,
      dificultad: 'Difícil',
      hint: 'Intenten enviar múltiples peticiones simultáneas.',
      pasos: [
        'Identifiquen operaciones críticas.',
        'Usen herramientas para enviar requests en paralelo.',
        'Verifiquen si logran condiciones inesperadas.'
      ],
      herramientas: ['Burp Suite Intruder', 'curl'],
      ejemploReporte: 'Título: Race Condition en compra\nImpacto: Doble compra\nReproducción: Enviar dos requests simultáneos\nSolución: Sincronizar operaciones en backend.'
    }
  },
  equipo: {
    1: {
      id: 1,
      nombre: 'Infraestructura Segura',
      descripcion: 'Encuentren y reporten todas las vulnerabilidades en la infraestructura.',
      puntos: 200,
      flag: 'flag{infra_secure}',
      resuelto: false,
      dificultad: 'Media',
      hint: 'Revisen todos los servicios expuestos.',
      pasos: [
        'Hagan un escaneo de puertos y servicios.',
        'Analicen configuraciones y permisos.',
        'Documenten cada hallazgo.'
      ],
      herramientas: ['Nmap', 'Nessus', 'Burp Suite'],
      ejemploReporte: 'Título: Servicio vulnerable expuesto\nImpacto: Acceso no autorizado\nReproducción: Escaneo con Nmap\nSolución: Cerrar puertos innecesarios.'
    },
    2: {
      id: 2,
      nombre: 'CTF Pentesting',
      descripcion: 'Simulen un pentest real y capturen todos los flags.',
      puntos: 180,
      flag: 'flag{pentest_ctf}',
      resuelto: false,
      dificultad: 'Difícil',
      hint: 'Coordinen roles y ataquen en paralelo.',
      pasos: [
        'Asignen roles (recon, explotación, reporte).',
        'Compartan hallazgos en tiempo real.',
        'Documenten flags capturados.'
      ],
      herramientas: ['Burp Suite', 'Metasploit', 'Hydra'],
      ejemploReporte: 'Título: Flag capturado en pentest\nImpacto: Acceso a sistema\nReproducción: Explotar vulnerabilidad X\nSolución: Parchear vulnerabilidad.'
    },
    3: {
      id: 3,
      nombre: 'Respuesta a Incidentes',
      descripcion: 'Detecten y mitiguen un ataque en tiempo real.',
      puntos: 160,
      flag: 'flag{incident_response}',
      resuelto: false,
      dificultad: 'Difícil',
      hint: 'Monitoreen logs y tráfico de red.',
      pasos: [
        'Detecten actividad sospechosa.',
        'Aíslen el sistema afectado.',
        'Mitiguen y documenten la respuesta.'
      ],
      herramientas: ['Wireshark', 'Splunk', 'ELK Stack'],
      ejemploReporte: 'Título: Incidente detectado y mitigado\nImpacto: Contención de ataque\nReproducción: Analizar logs y aislar host\nSolución: Mejorar monitoreo y alertas.'
    }
  }
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

const DuelosPage: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<'individual'|'duo'|'equipo'>('individual');
  const [retos, setRetos] = useState<RetoCTF[]>(retosPorModo['individual']);
  const [flagInputs, setFlagInputs] = useState<{ [key: number]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({});
  const [puntos, setPuntos] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [retoDetalle, setRetoDetalle] = useState<RetoCTFDetalle | null>(null);
  const [dificultadFiltro, setDificultadFiltro] = useState<'Todas'|Dificultad>('Todas');
  // Estado: intentos por reto
  const [intentos, setIntentos] = useState<{ [key: number]: number }>({});
  // Estado: animación de check por reto
  const [checkAnim, setCheckAnim] = useState<{ [key: number]: boolean }>({});
  // Estado para tooltips del menú lateral
  const [menuTooltip, setMenuTooltip] = useState<{ type: 'regla'|'premio', idx: number }|null>(null);
  // Estado para modal de info del menú lateral
  const [menuModal, setMenuModal] = useState<{ type: 'regla'|'premio', idx: number }|null>(null);

  // Cambiar retos al cambiar modo
  const handleModeChange = (mode: string) => {
    setSelectedMode(mode as 'individual'|'duo'|'equipo');
    setRetos(retosPorModo[mode as 'individual'|'duo'|'equipo'].map(r => ({ ...r, resuelto: false })));
    setFlagInputs({});
    setFeedback({});
    setPuntos(0);
    setIntentos({}); // Resetear intentos al cambiar modo
    setCheckAnim({}); // Resetear animación de check
  };

  // Filtrar retos por dificultad
  const retosFiltrados = dificultadFiltro === 'Todas' ? retos : retos.filter(r => r.dificultad === dificultadFiltro);

  // Handler para reintentar reto
  const handleReintentar = (retoId: number) => {
    setRetos(rs => rs.map(r => r.id === retoId ? { ...r, resuelto: false } : r));
    setFeedback(f => {
      const copy = { ...f };
      delete copy[retoId];
      return copy;
    });
    setFlagInputs(f => ({ ...f, [retoId]: '' }));
    setIntentos(i => ({ ...i, [retoId]: 0 }));
    setCheckAnim(a => ({ ...a, [retoId]: false }));
  };

  // Flag submit
  const handleFlagSubmit = (retoId: number) => {
    const reto = retos.find(r => r.id === retoId);
    if (!reto) return;
    if (reto.resuelto) return;
    setIntentos(i => ({ ...i, [retoId]: (i[retoId] || 0) + 1 }));
    if (flagInputs[retoId]?.trim() === reto.flag) {
      setFeedback(f => ({ ...f, [retoId]: '¡Correcto! Flag válido.' }));
      setRetos(rs => rs.map(r => r.id === retoId ? { ...r, resuelto: true } : r));
      setPuntos(p => p + reto.puntos);
      setCheckAnim(a => ({ ...a, [retoId]: true }));
      setTimeout(() => setCheckAnim(a => ({ ...a, [retoId]: false })), 1200);
    } else {
      setFeedback(f => ({ ...f, [retoId]: 'Flag incorrecto, intenta de nuevo.' }));
    }
  };

  // Progreso
  const progreso = Math.round((retos.filter(r => r.resuelto).length / retos.length) * 100);

  // Leaderboard actualizado
  const leaderboard = leaderboardMock.map(u => u.usuario === 'Tú' ? { ...u, puntos } : u).sort((a, b) => b.puntos - a.puntos);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 font-mono bg-gradient-to-br from-[#0a183d] via-[#1a0033] to-[#2d003e]">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-8">
        {/* El menú lateral fue eliminado, así que todo el contenido está centrado */}
        <div className="flex-1 min-w-[320px] max-w-2xl w-full flex flex-col items-center justify-center">
          <h1 className="text-6xl font-extrabold text-[#00fff7] drop-shadow-[0_0_16px_#00fff7] mb-8 flex items-center gap-4 font-mono tracking-wide justify-center">
            <GiCrossedSwords size={64} color="#00fff7" /> Duelos
          </h1>
          {/* Selector de modo y acción, filtros, estadísticas, retos, progreso, leaderboard, modal de detalle */}
          {/* ...todo el contenido interactivo que ya tienes, desde el selector de modo hasta el modal de detalle... */}
          {/* Selector de modo y acción */}
          <section className="w-full max-w-2xl mb-12">
            <h2 className="text-2xl font-bold text-[#00fff7] mb-6 text-center">Participa en un Duelo</h2>
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
            {/* Estadísticas y barra de progreso por dificultad */}
            <div className="w-full max-w-2xl mb-8">
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
            {/* Retos interactivos tipo CTF */}
            <div className="w-full bg-[#181c2bcc] border-2 border-[#00fff7] rounded-2xl p-12 shadow-[0_0_32px_#00fff7] mb-8 max-w-7xl mx-auto">
              <h3 className="text-3xl font-bold text-[#00fff7] mb-8">Retos Duelo Individual</h3>
              <div className="flex flex-col gap-8">
                {retosFiltrados.map((reto: RetoCTF) => {
                  const detalle = detallesRetos[selectedMode][reto.id];
                  const dif = dificultadInfo[reto.dificultad];
                  const intentosReto = intentos[reto.id] || 0;
                  return (
                    <div
                      key={reto.id}
                      className={`p-4 rounded-xl border-2 ${reto.resuelto ? 'border-[#39ff14] bg-[#101926]/80' : 'border-[#a259ff] bg-[#232b36]/80'} shadow-md flex flex-col gap-2 hover:scale-[1.01] transition relative`}
                      onClick={() => setRetoDetalle(detalle)}
                      title={`Dificultad: ${reto.dificultad}\nPuntos: ${reto.puntos}\nIntentos: ${intentosReto}\nEstado: ${reto.resuelto ? 'Resuelto' : 'Pendiente'}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FaFlag color="#00fff7" />
                        <span className="font-bold text-base text-[#00fff7]">{reto.nombre}</span>
                        <span className="ml-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold" style={{ background: dif.color, color: '#181c2b' }}>{dif.icon} {reto.dificultad}</span>
                        <span className="ml-2 text-xs text-[#a259ff]">Intentos: {intentosReto}</span>
                        {reto.resuelto && <span className="ml-2 px-2 py-1 rounded bg-[#39ff14] text-black text-xs font-bold flex items-center gap-1">Resuelto
                          <FaCheckCircle color="#39ff14" size={16} />
                        </span>}
                      </div>
                      <div className="text-white text-sm mb-2 font-mono">{reto.descripcion}</div>
                      <div className="text-[#a259ff] text-sm font-mono mb-2">Puntos: {reto.puntos}</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="text-[#00fff7] font-bold">Progreso: <span className="text-[#39ff14]">{progreso}%</span></div>
                <div className="text-[#00fff7] font-bold">Tu puntuación: <span className="text-[#39ff14]">{puntos}</span></div>
                <button className="px-6 py-2 bg-[#a259ff] text-white rounded-xl font-bold shadow-[0_0_8px_#a259ff] transition hover:bg-[#ff4fa3]" onClick={() => setShowLeaderboard(true)}>Ver Leaderboard</button>
              </div>
            </div>
            {/* Leaderboard modal */}
            {showLeaderboard && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setShowLeaderboard(false); }}>
                <div className="bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl p-8 shadow-2xl w-full max-w-md animate-fade-in-up relative">
                  <button className="absolute top-2 right-2 text-[#00fff7] text-3xl font-extrabold bg-[#232b36] border-2 border-[#00fff7] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#00fff7] hover:text-black transition" onClick={() => setShowLeaderboard(false)} title="Cerrar">×</button>
                  <h3 className="text-2xl font-bold text-[#00fff7] mb-4 text-center">Leaderboard</h3>
                  <table className="w-full text-left font-mono">
                    <thead>
                      <tr className="text-[#00fff7] border-b border-[#00fff7]">
                        <th className="py-2">Usuario</th>
                        <th className="py-2">Puntos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((u, idx) => (
                        <tr key={u.usuario} className={u.usuario === 'Tú' ? 'bg-[#00fff7]/20 font-bold' : ''}>
                          <td className="py-2">{u.usuario}</td>
                          <td className="py-2">{u.puntos}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Modal de detalle del reto */}
            {retoDetalle && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setRetoDetalle(null); }}>
                <div className="bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl p-8 shadow-2xl w-full max-w-lg animate-fade-in-up relative">
                  <button className="absolute top-2 right-2 text-[#00fff7] text-3xl font-extrabold bg-[#232b36] border-2 border-[#00fff7] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#00fff7] hover:text-black transition" onClick={() => setRetoDetalle(null)} title="Cerrar">×</button>
                  <h3 className="text-2xl font-bold text-[#00fff7] mb-2">{retoDetalle.nombre}</h3>
                  <div className="mb-2 text-white">{retoDetalle.descripcion}</div>
                  <div className="mb-2 text-[#a259ff] text-xs">Intentos: {intentos[retoDetalle.id] || 0}</div>
                  {retoDetalle.hint && <div className="mb-2 text-[#39ff14] font-mono"><b>Pista:</b> {retoDetalle.hint}</div>}
                  {retoDetalle.pasos && (
                    <div className="mb-2">
                      <div className="text-[#00fff7] font-bold mb-1">Pasos sugeridos:</div>
                      <ul className="list-disc ml-6 text-white text-sm">
                        {retoDetalle.pasos.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                  )}
                  {retoDetalle.herramientas && (
                    <div className="mb-2">
                      <div className="text-[#00fff7] font-bold mb-1">Herramientas recomendadas:</div>
                      <ul className="list-disc ml-6 text-white text-sm">
                        {retoDetalle.herramientas.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    </div>
                  )}
                  {retoDetalle.ejemploReporte && (
                    <div className="mb-2">
                      <div className="text-[#00fff7] font-bold mb-1">Ejemplo de reporte:</div>
                      <pre className="bg-[#232b36] text-white rounded p-3 text-xs whitespace-pre-wrap">{retoDetalle.ejemploReporte}</pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
      {/* Modal de info del menú lateral */}
      {menuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) setMenuModal(null); }}>
          <div className="bg-[#181c2b] border-2 border-[#00fff7] rounded-2xl p-8 shadow-2xl w-full max-w-md animate-fade-in-up relative">
            <button className="absolute top-2 right-2 text-[#00fff7] text-3xl font-extrabold bg-[#232b36] border-2 border-[#00fff7] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#00fff7] hover:text-black transition" onClick={() => setMenuModal(null)} title="Cerrar">×</button>
            <div className="flex flex-col items-center gap-4">
              <div className="text-3xl text-[#00fff7]">
                {menuModal.type === 'regla' ? reglas[menuModal.idx].icon : premios[menuModal.idx].icon}
              </div>
              <div className="text-2xl font-bold text-[#00fff7] text-center mb-2">
                {menuModal.type === 'regla' ? 'Regla General' : 'Premio al Honor'}
              </div>
              <div className="text-white text-lg text-center whitespace-pre-line">
                {menuModal.type === 'regla' ? reglas[menuModal.idx].text : premios[menuModal.idx].text}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal de detalle y otros overlays fuera del grid principal si es necesario */}
    </div>
  );
};

export default DuelosPage; 