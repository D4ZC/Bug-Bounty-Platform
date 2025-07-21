import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/useToast';


const CHALLENGE_CATEGORIES = {
  WEB: 'web',
  MOBILE: 'mobile',
  NETWORK: 'network',
};

const webChallenges = [
  { id: 1, name: 'SQL Injection', desc: 'Encuentra y explota una vulnerabilidad de inyección SQL.', difficulty: 'Alta', status: 'Abierto', reward: 500 },
  { id: 2, name: 'XSS Persistente', desc: 'Demuestra un XSS persistente en el foro.', difficulty: 'Media', status: 'Abierto', reward: 300 },
  { id: 3, name: 'CSRF en perfil', desc: 'Realiza un ataque CSRF exitoso en la edición de perfil.', difficulty: 'Baja', status: 'Cerrado', reward: 200 },
  { id: 4, name: 'Directory Traversal', desc: 'Accede a archivos fuera del directorio permitido.', difficulty: 'Alta', status: 'Abierto', reward: 450 },
  { id: 5, name: 'Open Redirect', desc: 'Encuentra una redirección abierta en la app.', difficulty: 'Media', status: 'Cerrado', reward: 250 },
  { id: 6, name: 'Reflected XSS', desc: 'Refleja un script en los resultados de búsqueda.', difficulty: 'Media', status: 'Abierto', reward: 220 },
  { id: 7, name: 'File Upload Bypass', desc: 'Sube un archivo no permitido por validación.', difficulty: 'Alta', status: 'Abierto', reward: 400 },
  { id: 8, name: 'Broken Access Control', desc: 'Accede a recursos restringidos.', difficulty: 'Alta', status: 'Cerrado', reward: 350 },
  { id: 9, name: 'Sensitive Data Exposure', desc: 'Encuentra datos sensibles expuestos en la web.', difficulty: 'Media', status: 'Abierto', reward: 300 },
  { id: 10, name: 'Clickjacking', desc: 'Demuestra un ataque de clickjacking.', difficulty: 'Baja', status: 'Cerrado', reward: 150 },
] as const;

const mobileChallenges = [
  { id: 1, name: 'Reverse APK', desc: 'Analiza y revierte una APK para encontrar credenciales.', difficulty: 'Alta', status: 'Abierto', reward: 600 },
  { id: 2, name: 'Insecure Storage', desc: 'Detecta almacenamiento inseguro en la app.', difficulty: 'Media', status: 'Abierto', reward: 350 },
  { id: 3, name: 'Intercepción de tráfico', desc: 'Intercepta tráfico no cifrado.', difficulty: 'Baja', status: 'Cerrado', reward: 150 },
  { id: 4, name: 'Root/Jailbreak Detection Bypass', desc: 'Evita la detección de root/jailbreak.', difficulty: 'Alta', status: 'Abierto', reward: 500 },
  { id: 5, name: 'Hardcoded Credentials', desc: 'Encuentra credenciales hardcodeadas en la app.', difficulty: 'Alta', status: 'Cerrado', reward: 400 },
  { id: 6, name: 'Insecure Communication', desc: 'Detecta comunicación insegura entre app y servidor.', difficulty: 'Media', status: 'Abierto', reward: 320 },
  { id: 7, name: 'Improper Platform Usage', desc: 'Identifica mal uso de la plataforma móvil.', difficulty: 'Media', status: 'Cerrado', reward: 200 },
  { id: 8, name: 'Code Tampering', desc: 'Modifica el código de la app y ejecuta cambios.', difficulty: 'Alta', status: 'Abierto', reward: 450 },
  { id: 9, name: 'Weak Authentication', desc: 'Demuestra autenticación débil en la app.', difficulty: 'Alta', status: 'Abierto', reward: 380 },
  { id: 10, name: 'Sensitive Data in Logs', desc: 'Encuentra datos sensibles en logs de la app.', difficulty: 'Media', status: 'Cerrado', reward: 210 },
] as const;

const networkChallenges = [
  { id: 1, name: 'Escaneo de puertos', desc: 'Identifica servicios expuestos en la red.', difficulty: 'Baja', status: 'Abierto', reward: 200 },
  { id: 2, name: 'MitM Attack', desc: 'Realiza un ataque Man-in-the-Middle.', difficulty: 'Alta', status: 'Abierto', reward: 700 },
  { id: 3, name: 'DNS Spoofing', desc: 'Demuestra un ataque de DNS spoofing.', difficulty: 'Media', status: 'Cerrado', reward: 300 },
  { id: 4, name: 'ARP Poisoning', desc: 'Envenena la caché ARP de la red.', difficulty: 'Alta', status: 'Abierto', reward: 500 },
  { id: 5, name: 'Packet Sniffing', desc: 'Captura paquetes sensibles en la red.', difficulty: 'Media', status: 'Abierto', reward: 350 },
  { id: 6, name: 'Rogue DHCP Server', desc: 'Implementa un servidor DHCP malicioso.', difficulty: 'Alta', status: 'Cerrado', reward: 400 },
  { id: 7, name: 'SSL Strip', desc: 'Elimina cifrado SSL en una conexión.', difficulty: 'Alta', status: 'Abierto', reward: 600 },
  { id: 8, name: 'SMB Relay Attack', desc: 'Realiza un ataque de relay SMB.', difficulty: 'Media', status: 'Cerrado', reward: 250 },
  { id: 9, name: 'Network Segmentation Bypass', desc: 'Accede a segmentos de red restringidos.', difficulty: 'Alta', status: 'Abierto', reward: 550 },
  { id: 10, name: 'ICMP Tunneling', desc: 'Establece un canal encubierto usando ICMP.', difficulty: 'Media', status: 'Cerrado', reward: 220 },
] as const;

type Difficulty = 'Alta' | 'Media' | 'Baja';
type Status = 'Abierto' | 'Cerrado';

const statusColors = {
  'Abierto': 'bg-green-100 text-green-800',
  'Cerrado': 'bg-red-100 text-red-800',
};
const difficultyColors = {
  'Alta': 'bg-red-200 text-red-900',
  'Media': 'bg-yellow-200 text-yellow-900',
  'Baja': 'bg-green-200 text-green-900',
};

const cardExtraDetails = {
  'SQL Injection': {
    fecha: '2024-06-10',
    pasos: ['Identifica campos vulnerables', 'Intenta payloads clásicos', 'Extrae datos de la base'],
    tips: 'Revisa los mensajes de error SQL y usa herramientas como sqlmap.',
    descripcionLarga: 'Este reto consiste en encontrar y explotar una vulnerabilidad de inyección SQL en la aplicación web. Deberás demostrar cómo un atacante puede acceder a datos restringidos usando técnicas de inyección.',
  },
  'Reverse APK': {
    fecha: '2024-06-09',
    pasos: ['Descarga la APK', 'Usa apktool o jadx', 'Busca credenciales hardcodeadas'],
    tips: 'Analiza los strings y los archivos de configuración.',
    descripcionLarga: 'Analiza y revierte una APK para encontrar credenciales o secretos embebidos. El reto es demostrar cómo un atacante puede obtener información sensible de una app móvil.',
  },
  'MitM Attack': {
    fecha: '2024-06-08',
    pasos: ['Configura un proxy', 'Intercepta tráfico', 'Busca datos sensibles'],
    tips: 'Utiliza Burp Suite o mitmproxy para facilitar el ataque.',
    descripcionLarga: 'Realiza un ataque Man-in-the-Middle exitoso en la red objetivo. El objetivo es interceptar y modificar el tráfico entre cliente y servidor.',
  },
  'XSS Persistente': {
    fecha: '2024-06-07',
    pasos: ['Identifica un punto de entrada vulnerable', 'Genera un payload XSS', 'Prueba la persistencia'],
    tips: 'Prueba diferentes tipos de XSS (Reflected, Stored, DOM) y usa herramientas de fuzzing.',
    descripcionLarga: 'Este reto implica demostrar la capacidad de persistir un script XSS en un sitio web, lo que puede permitir la ejecución de código malicioso en el contexto del usuario.',
  },
  'CSRF en perfil': {
    fecha: '2024-06-06',
    pasos: ['Identifica un formulario vulnerable', 'Genera un token CSRF', 'Realiza la solicitud de modificación'],
    tips: 'Asegúrate de que el token CSRF sea único y difícil de predecir.',
    descripcionLarga: 'Este reto consiste en realizar un ataque de Cross-Site Request Forgery (CSRF) exitoso en la edición de perfil de un usuario, lo que permitirá que un atacante realice acciones en nombre del usuario sin su conocimiento.',
  },
  'Directory Traversal': {
    fecha: '2024-06-05',
    pasos: ['Identifica la ruta base', 'Intenta acceder a directorios fuera de la ruta permitida', 'Explora la estructura del servidor'],
    tips: 'Usa herramientas de enumeración de directorios y técnicas de fuerza bruta.',
    descripcionLarga: 'Este reto implica acceder a archivos fuera del directorio permitido por la aplicación web, lo que puede revelar información sensible o permitir la ejecución de código.',
  },
  'Open Redirect': {
    fecha: '2024-06-04',
    pasos: ['Identifica un punto de entrada vulnerable', 'Genera una URL de redirección', 'Redirige a una URL maliciosa'],
    tips: 'Prueba diferentes tipos de redirección (301, 302, 307) y asegúrate de que la URL sea externa.',
    descripcionLarga: 'Este reto consiste en encontrar una redirección abierta en la aplicación web, lo que puede permitir la redirección a sitios maliciosos o la exposición de datos sensibles.',
  },
  'Reflected XSS': {
    fecha: '2024-06-03',
    pasos: ['Identifica un punto de entrada vulnerable', 'Genera un payload XSS', 'Redirige a un sitio de phishing'],
    tips: 'Prueba diferentes tipos de XSS (Reflected, Stored, DOM) y usa herramientas de fuzzing.',
    descripcionLarga: 'Este reto implica demostrar la capacidad de reflejar un script XSS en la aplicación web, lo que puede permitir la ejecución de código malicioso en el contexto del usuario.',
  },
  'File Upload Bypass': {
    fecha: '2024-06-02',
    pasos: ['Identifica un punto de entrada vulnerable', 'Sube un archivo no permitido', 'Explota la vulnerabilidad'],
    tips: 'Prueba diferentes tipos de archivos (PHP, ASP, JSP) y asegúrate de que el servidor acepte el tipo de archivo.',
    descripcionLarga: 'Este reto consiste en superar la validación de archivos en la aplicación web, lo que puede permitir la subida de archivos no autorizados o la ejecución de código.',
  },
  'Broken Access Control': {
    fecha: '2024-06-01',
    pasos: ['Identifica un recurso restringido', 'Intenta acceder a él sin credenciales', 'Explora la lógica de acceso'],
    tips: 'Prueba diferentes roles de usuario y técnicas de bypass.',
    descripcionLarga: 'Este reto implica demostrar la capacidad de acceder a recursos que deberían estar restringidos por la aplicación web, lo que puede revelar información sensible o permitir la ejecución de código.',
  },
  'Sensitive Data Exposure': {
    fecha: '2024-05-31',
    pasos: ['Identifica un punto de exposición', 'Recopila datos sensibles', 'Explota la vulnerabilidad'],
    tips: 'Usa herramientas de reconocimiento de datos y técnicas de enumeración.',
    descripcionLarga: 'Este reto consiste en encontrar y explotar la exposición de datos sensibles en la aplicación web, lo que puede permitir la exposición de información confidencial.',
  },
  'Clickjacking': {
    fecha: '2024-05-30',
    pasos: ['Identifica un botón vulnerable', 'Genera un iframe', 'Redirige a un sitio de phishing'],
    tips: 'Prueba diferentes tipos de clickjacking y asegúrate de que el iframe sea visible.',
    descripcionLarga: 'Este reto implica demostrar la capacidad de engañar a un usuario para que haga clic en un botón o enlace que no es el que parece ser, lo que puede permitir la ejecución de código malicioso en el contexto del usuario.',
  },
  'Insecure Storage': {
    fecha: '2024-06-08',
    pasos: ['Identifica un punto de entrada vulnerable', 'Genera un payload de almacenamiento', 'Prueba la persistencia'],
    tips: 'Prueba diferentes tipos de almacenamiento (SharedPreferences, SQLite, Keychain) y asegúrate de que el cifrado sea débil.',
    descripcionLarga: 'Este reto consiste en superar la seguridad de almacenamiento en la aplicación móvil, lo que puede permitir la exposición de datos sensibles o la ejecución de código.',
  },
  'Intercepción de tráfico': {
    fecha: '2024-06-07',
    pasos: ['Configura un proxy', 'Intercepta tráfico no cifrado', 'Modifica la solicitud'],
    tips: 'Utiliza herramientas como Burp Suite o mitmproxy para interceptar el tráfico.',
    descripcionLarga: 'Este reto implica interceptar y modificar el tráfico no cifrado entre la aplicación móvil y el servidor, lo que puede permitir la exposición de datos sensibles o la ejecución de código.',
  },
  'Root/Jailbreak Detection Bypass': {
    fecha: '2024-06-06',
    pasos: ['Identifica un punto de entrada vulnerable', 'Genera un payload de bypass', 'Prueba la persistencia'],
    tips: 'Prueba diferentes tipos de bypass y asegúrate de que el dispositivo sea vulnerable.',
    descripcionLarga: 'Este reto consiste en superar la detección de root/jailbreak en la aplicación móvil, lo que puede permitir la ejecución de código con privilegios de administrador.',
  },
  'Hardcoded Credentials': {
    fecha: '2024-06-05',
    pasos: ['Identifica un archivo con credenciales', 'Recopila las credenciales', 'Explota la vulnerabilidad'],
    tips: 'Usa herramientas de reconocimiento de credenciales y técnicas de fuerza bruta.',
    descripcionLarga: 'Este reto consiste en encontrar y explotar credenciales hardcodeadas en la aplicación móvil, lo que puede permitir la ejecución de código con privilegios de administrador.',
  },
  'Insecure Communication': {
    fecha: '2024-06-04',
    pasos: ['Identifica un punto de entrada vulnerable', 'Genera un payload de comunicación', 'Prueba la persistencia'],
    tips: 'Prueba diferentes tipos de comunicación (HTTP, HTTPS, WebSocket) y asegúrate de que el cifrado sea débil.',
    descripcionLarga: 'Este reto consiste en superar la seguridad de comunicación en la aplicación móvil, lo que puede permitir la exposición de datos sensibles o la ejecución de código.',
  },
  'Improper Platform Usage': {
    fecha: '2024-06-03',
    pasos: ['Identifica un punto de entrada vulnerable', 'Genera un payload de plataforma', 'Prueba la persistencia'],
    tips: 'Prueba diferentes tipos de plataforma (Android, iOS, Windows) y asegúrate de que la aplicación sea vulnerable.',
    descripcionLarga: 'Este reto consiste en superar la seguridad de la plataforma en la aplicación móvil, lo que puede permitir la ejecución de código con privilegios de administrador.',
  },
  'Code Tampering': {
    fecha: '2024-06-02',
    pasos: ['Identifica un punto de entrada vulnerable', 'Genera un payload de código', 'Prueba la persistencia'],
    tips: 'Prueba diferentes tipos de código (Java, C++, JavaScript) y asegúrate de que el servidor acepte el tipo de código.',
    descripcionLarga: 'Este reto consiste en superar la seguridad de código en la aplicación móvil, lo que puede permitir la ejecución de código con privilegios de administrador.',
  },
  'Weak Authentication': {
    fecha: '2024-06-01',
    pasos: ['Identifica un punto de entrada vulnerable', 'Genera un payload de autenticación', 'Prueba la persistencia'],
    tips: 'Prueba diferentes tipos de autenticación (Username/Password, Fingerprint, Biometric) y asegúrate de que el cifrado sea débil.',
    descripcionLarga: 'Este reto consiste en superar la seguridad de autenticación en la aplicación móvil, lo que puede permitir la ejecución de código con privilegios de administrador.',
  },
  'Sensitive Data in Logs': {
    fecha: '2024-05-31',
    pasos: ['Identifica un punto de exposición', 'Recopila los logs', 'Explota la vulnerabilidad'],
    tips: 'Usa herramientas de reconocimiento de logs y técnicas de enumeración.',
    descripcionLarga: 'Este reto consiste en encontrar y explotar la exposición de datos sensibles en los logs de la aplicación móvil, lo que puede permitir la exposición de información confidencial.',
  },
  'Escaneo de puertos': {
    fecha: '2024-06-10',
    pasos: ['Identifica el rango de puertos', 'Usa herramientas de escaneo', 'Identifica servicios expuestos'],
    tips: 'Utiliza herramientas como Nmap o Metasploit.',
    descripcionLarga: 'Este reto consiste en identificar servicios expuestos en la red, lo que puede revelar información sobre la infraestructura y la configuración de la red.',
  },
  'DNS Spoofing': {
    fecha: '2024-06-07',
    pasos: ['Configura un servidor DNS', 'Envenena la caché DNS', 'Redirige tráfico'],
    tips: 'Utiliza herramientas como DNSChef o Ettercap.',
    descripcionLarga: 'Este reto consiste en realizar un ataque de DNS spoofing exitoso, lo que puede permitir la redirección de tráfico a sitios maliciosos o la exposición de datos sensibles.',
  },
  'ARP Poisoning': {
    fecha: '2024-06-06',
    pasos: ['Configura un servidor DHCP', 'Envenena la caché ARP', 'Redirige tráfico'],
    tips: 'Utiliza herramientas como Ettercap o ARPspoof.',
    descripcionLarga: 'Este reto consiste en realizar un ataque de ARP poisoning exitoso, lo que puede permitir la redirección de tráfico a sitios maliciosos o la exposición de datos sensibles.',
  },
  'Packet Sniffing': {
    fecha: '2024-06-05',
    pasos: ['Configura un proxy', 'Captura paquetes', 'Identifica datos sensibles'],
    tips: 'Utiliza herramientas como Wireshark o Burp Suite.',
    descripcionLarga: 'Este reto consiste en capturar paquetes sensibles en la red, lo que puede revelar información confidencial o la ejecución de código.',
  },
  'Rogue DHCP Server': {
    fecha: '2024-06-04',
    pasos: ['Configura un servidor DHCP', 'Envenena la caché DHCP', 'Redirige tráfico'],
    tips: 'Utiliza herramientas como Ettercap o DHCPStarvation.',
    descripcionLarga: 'Este reto consiste en implementar un servidor DHCP malicioso, lo que puede permitir la redirección de tráfico a sitios maliciosos o la exposición de datos sensibles.',
  },
  'SSL Strip': {
    fecha: '2024-06-03',
    pasos: ['Configura un proxy', 'Intercepta conexión SSL', 'Elimina cifrado'],
    tips: 'Utiliza herramientas como mitmproxy o Burp Suite.',
    descripcionLarga: 'Este reto consiste en eliminar el cifrado SSL en una conexión, lo que puede permitir la exposición de datos sensibles o la ejecución de código.',
  },
  'SMB Relay Attack': {
    fecha: '2024-06-02',
    pasos: ['Configura un servidor SMB', 'Envenena la caché SMB', 'Realiza un ataque de relay'],
    tips: 'Utiliza herramientas como Metasploit o Responder.',
    descripcionLarga: 'Este reto consiste en realizar un ataque de SMB relay exitoso, lo que puede permitir la ejecución de código con privilegios de administrador.',
  },
  'Network Segmentation Bypass': {
    fecha: '2024-06-01',
    pasos: ['Identifica un punto de entrada vulnerable', 'Accede a un segmento de red restringido', 'Explora la lógica de acceso'],
    tips: 'Prueba diferentes tipos de bypass y asegúrate de que el dispositivo sea vulnerable.',
    descripcionLarga: 'Este reto consiste en acceder a un segmento de red restringido por la aplicación web, lo que puede revelar información sensible o la ejecución de código.',
  },
  'ICMP Tunneling': {
    fecha: '2024-05-31',
    pasos: ['Configura un servidor ICMP', 'Establece un canal encubierto', 'Transmite datos'],
    tips: 'Utiliza herramientas como Netcat o Metasploit.',
    descripcionLarga: 'Este reto consiste en establecer un canal encubierto usando ICMP, lo que puede permitir la transmisión de datos confidenciales o la ejecución de código.',
  },
};

const ChallengeCard: React.FC<{ch: any, categoria?: string}> = ({ ch, categoria }) => {
  const [expanded, setExpanded] = useState(false);
  const { showSuccess } = useToast();
  const extra = cardExtraDetails[ch.name as keyof typeof cardExtraDetails] || {
    fecha: '2024-06-01',
    pasos: ['Lee la descripción', 'Sigue los pasos sugeridos', 'Envía tu reporte'],
    tips: 'Lee la documentación y prueba diferentes enfoques.',
    descripcionLarga: ch.desc,
  };
  const handleParticipar = (e: React.MouseEvent) => {
    e.stopPropagation();
    showSuccess('¡Participación exitosa! Comienza el reto.', { duration: 2000 });
    setExpanded(false);
  };
  return (
    <div
      className={`flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer ${expanded ? 'ring-2 ring-blue-300' : ''}`}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="font-semibold text-gray-900 mb-1">{ch.name}</div>
      <div className="text-xs text-gray-500 mb-1">Categoría: {categoria || ''}</div>
      <div className="flex gap-2 mb-2">
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColors[ch.difficulty as Difficulty]}`}>{ch.difficulty}</span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[ch.status as Status]}`}>{ch.status}</span>
      </div>
      <div className="font-bold text-blue-700 mb-2">Recompensa: {ch.reward} puntos</div>
      <div className="text-xs text-gray-500 mb-2">{ch.desc}</div>
      {/* Detalles expandibles */}
      <div
        className={`transition-all duration-300 overflow-hidden ${expanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-xs text-gray-400 mb-1">Fecha de publicación: {extra.fecha}</div>
        <div className="text-sm text-gray-700 mb-2">{extra.descripcionLarga}</div>
        <div className="mb-2">
          <span className="font-semibold text-xs text-gray-600">Pasos sugeridos:</span>
          <ul className="list-disc ml-5 text-xs text-gray-600">
            {extra.pasos.map((p: string, i: number) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-xs text-gray-600">Tip:</span>
          <span className="ml-2 text-xs text-blue-700">{extra.tips}</span>
        </div>
        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm" onClick={handleParticipar}>Participar</button>
      </div>
    </div>
  );
};

const Challenges: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);

  const renderChallenges = (challenges: ReadonlyArray<any>, title: string) => (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map(ch => (
          <ChallengeCard key={ch.id} ch={ch} categoria={title.replace('Retos de ', '')} />
        ))}
      </div>
      <button className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Retos y Competencias</h1>
      <p className="text-lg text-gray-600 mb-8">Participa en retos de seguridad y gana recompensas</p>

      {/* Retos destacados */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Retos destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ejemplo de retos destacados de distintas categorías */}
          <ChallengeCard ch={{ name: 'SQL Injection', difficulty: 'Alta', status: 'Abierto', reward: 500, desc: 'Encuentra y explota una vulnerabilidad de inyección SQL.' }} categoria="Web" />
          <ChallengeCard ch={{ name: 'Reverse APK', difficulty: 'Alta', status: 'Abierto', reward: 600, desc: 'Analiza y revierte una APK para encontrar credenciales.' }} categoria="Mobile" />
          <ChallengeCard ch={{ name: 'MitM Attack', difficulty: 'Alta', status: 'Abierto', reward: 700, desc: 'Realiza un ataque Man-in-the-Middle.' }} categoria="Network" />
          <ChallengeCard ch={{ name: 'XSS Persistente', difficulty: 'Media', status: 'Abierto', reward: 300, desc: 'Demuestra un XSS persistente en el foro.' }} categoria="Web" />
          <ChallengeCard ch={{ name: 'Insecure Storage', difficulty: 'Media', status: 'Abierto', reward: 350, desc: 'Detecta almacenamiento inseguro en la app.' }} categoria="Mobile" />
          <ChallengeCard ch={{ name: 'CSRF en perfil', difficulty: 'Baja', status: 'Cerrado', reward: 200, desc: 'Realiza un ataque CSRF exitoso en la edición de perfil.' }} categoria="Web" />
          <ChallengeCard ch={{ name: 'File Upload Bypass', difficulty: 'Alta', status: 'Abierto', reward: 400, desc: 'Sube un archivo no permitido por validación.' }} categoria="Web" />
          <ChallengeCard ch={{ name: 'Root/Jailbreak Detection Bypass', difficulty: 'Alta', status: 'Abierto', reward: 500, desc: 'Evita la detección de root/jailbreak.' }} categoria="Mobile" />
          <ChallengeCard ch={{ name: 'Packet Sniffing', difficulty: 'Media', status: 'Abierto', reward: 350, desc: 'Captura paquetes sensibles en la red.' }} categoria="Network" />
          <ChallengeCard ch={{ name: 'Open Redirect', difficulty: 'Media', status: 'Cerrado', reward: 250, desc: 'Encuentra una redirección abierta en la app.' }} categoria="Web" />
          <ChallengeCard ch={{ name: 'Hardcoded Credentials', difficulty: 'Alta', status: 'Cerrado', reward: 400, desc: 'Encuentra credenciales hardcodeadas en la app.' }} categoria="Mobile" />
          <ChallengeCard ch={{ name: 'SSL Strip', difficulty: 'Alta', status: 'Abierto', reward: 600, desc: 'Elimina cifrado SSL en una conexión.' }} categoria="Network" />
          <ChallengeCard ch={{ name: 'Directory Traversal', difficulty: 'Alta', status: 'Abierto', reward: 450, desc: 'Accede a archivos fuera del directorio permitido.' }} categoria="Web" />
          <ChallengeCard ch={{ name: 'Intercepción de tráfico', difficulty: 'Baja', status: 'Cerrado', reward: 150, desc: 'Intercepta tráfico no cifrado.' }} categoria="Mobile" />
          <ChallengeCard ch={{ name: 'ARP Poisoning', difficulty: 'Alta', status: 'Abierto', reward: 500, desc: 'Envenena la caché ARP de la red.' }} categoria="Network" />
          <ChallengeCard ch={{ name: 'Sensitive Data Exposure', difficulty: 'Media', status: 'Abierto', reward: 300, desc: 'Encuentra datos sensibles expuestos en la web.' }} categoria="Web" />
          <ChallengeCard ch={{ name: 'Weak Authentication', difficulty: 'Alta', status: 'Abierto', reward: 380, desc: 'Demuestra autenticación débil en la app.' }} categoria="Mobile" />
          <ChallengeCard ch={{ name: 'Network Segmentation Bypass', difficulty: 'Alta', status: 'Abierto', reward: 550, desc: 'Accede a segmentos de red restringidos.' }} categoria="Network" />
        </div>
      </div>
      {/* Subtítulo antes de los cards de categorías */}
      <h2 className="text-xl font-bold text-blue-800 mb-4">Más retos!!!!</h2>
      {!selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all text-left"
            onClick={() => setSelected(CHALLENGE_CATEGORIES.WEB)}
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">🌐 Web</h3>
            <p className="text-blue-700 text-sm">Vulnerabilidades en aplicaciones web</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-green-200 hover:border-green-400 transition-all text-left"
            onClick={() => setSelected(CHALLENGE_CATEGORIES.MOBILE)}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-2">📱 Mobile</h3>
            <p className="text-green-700 text-sm">Seguridad en aplicaciones móviles</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all text-left"
            onClick={() => setSelected(CHALLENGE_CATEGORIES.NETWORK)}
          >
            <h3 className="text-lg font-semibold text-purple-800 mb-2">🌍 Network</h3>
            <p className="text-purple-700 text-sm">Redes e infraestructura</p>
          </button>
        </div>
      )}
      {selected === CHALLENGE_CATEGORIES.WEB && renderChallenges(webChallenges, 'Retos de Web')}
      {selected === CHALLENGE_CATEGORIES.MOBILE && renderChallenges(mobileChallenges, 'Retos de Mobile')}
      {selected === CHALLENGE_CATEGORIES.NETWORK && renderChallenges(networkChallenges, 'Retos de Network')}
    </div>
  );
};

export default Challenges; 