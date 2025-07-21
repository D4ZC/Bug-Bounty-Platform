import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const featuredVulns = [
  { id: 1, title: 'SQL Injection en login', severity: 'Crítica', status: 'Abierta', date: '2024-06-10', desc: 'Permite acceso no autorizado a cuentas de usuario.' },
  { id: 2, title: 'XSS persistente en comentarios', severity: 'Alta', status: 'Abierta', date: '2024-06-09', desc: 'Ejecución de scripts maliciosos en comentarios públicos.' },
  { id: 3, title: 'CSRF en perfil', severity: 'Media', status: 'Cerrada', date: '2024-06-08', desc: 'Modificación de datos de perfil sin autorización.' },
  { id: 4, title: 'Insecure Storage en app móvil', severity: 'Alta', status: 'Abierta', date: '2024-06-07', desc: 'Datos sensibles almacenados sin cifrado.' },
  { id: 5, title: 'IDOR en historial de compras', severity: 'Crítica', status: 'Cerrada', date: '2024-06-06', desc: 'Acceso a compras de otros usuarios.' },
  { id: 6, title: 'Desbordamiento de búfer en chat', severity: 'Media', status: 'Abierta', date: '2024-06-05', desc: 'Posible denegación de servicio en el chat.' },
  { id: 7, title: 'Directory Traversal en descargas', severity: 'Crítica', status: 'Abierta', date: '2024-06-04', desc: 'Permite acceso a archivos fuera del directorio permitido.' },
  { id: 8, title: 'Open Redirect en login', severity: 'Alta', status: 'Cerrada', date: '2024-06-03', desc: 'Redirección a sitios externos no controlados.' },
  { id: 9, title: 'Race Condition en transferencias', severity: 'Crítica', status: 'Abierta', date: '2024-06-02', desc: 'Condición de carrera que permite transferencias duplicadas.' },
  { id: 10, title: 'Clickjacking en panel de usuario', severity: 'Media', status: 'Cerrada', date: '2024-06-01', desc: 'Interfaz vulnerable a ataques de clickjacking.' },
  { id: 11, title: 'Exposure of Sensitive Data', severity: 'Alta', status: 'Abierta', date: '2024-05-30', desc: 'Datos personales expuestos en respuestas de API.' },
  { id: 12, title: 'Weak Password Policy', severity: 'Media', status: 'Abierta', date: '2024-05-29', desc: 'Permite contraseñas débiles y fáciles de adivinar.' },
  { id: 13, title: 'Path Disclosure en errores', severity: 'Media', status: 'Cerrada', date: '2024-05-28', desc: 'Mensajes de error revelan rutas internas del servidor.' },
  { id: 14, title: 'Cross-Site Request Forgery en pagos', severity: 'Crítica', status: 'Abierta', date: '2024-05-27', desc: 'Permite realizar pagos no autorizados.' },
  { id: 15, title: 'Server-Side Request Forgery', severity: 'Crítica', status: 'Cerrada', date: '2024-05-26', desc: 'El servidor puede ser usado para hacer peticiones a recursos internos.' },
  { id: 16, title: 'XML External Entity (XXE)', severity: 'Alta', status: 'Abierta', date: '2024-05-25', desc: 'Procesamiento inseguro de entidades externas en XML.' },
  { id: 17, title: 'Insufficient Logging', severity: 'Media', status: 'Abierta', date: '2024-05-24', desc: 'Faltan logs de eventos críticos de seguridad.' },
  { id: 18, title: 'Broken Access Control', severity: 'Crítica', status: 'Abierta', date: '2024-05-23', desc: 'Usuarios pueden acceder a recursos restringidos.' },
  { id: 19, title: 'Sensitive Cookie Without Secure Flag', severity: 'Alta', status: 'Cerrada', date: '2024-05-22', desc: 'Cookies sensibles sin flag Secure.' },
  { id: 20, title: 'Unvalidated Redirects', severity: 'Media', status: 'Abierta', date: '2024-05-21', desc: 'Redirecciones no validadas pueden ser explotadas.' },
  { id: 21, title: 'Privilege Escalation', severity: 'Crítica', status: 'Abierta', date: '2024-05-20', desc: 'Usuarios pueden escalar privilegios a admin.' },
  { id: 22, title: 'Information Disclosure en headers', severity: 'Media', status: 'Cerrada', date: '2024-05-19', desc: 'Headers HTTP revelan información sensible.' },
  { id: 23, title: 'JWT None Algorithm', severity: 'Crítica', status: 'Cerrada', date: '2024-05-18', desc: 'Permite forjar tokens JWT usando algoritmo none.' },
  { id: 24, title: 'Insecure Direct Object Reference', severity: 'Alta', status: 'Abierta', date: '2024-05-17', desc: 'Acceso directo a objetos sin autorización.' },
  { id: 25, title: 'Improper Error Handling', severity: 'Media', status: 'Abierta', date: '2024-05-16', desc: 'Errores no controlados revelan información interna.' },
  { id: 26, title: 'Mass Assignment', severity: 'Crítica', status: 'Abierta', date: '2024-05-15', desc: 'Asignación masiva permite modificar campos no autorizados.' },
  { id: 27, title: 'Unsafe File Upload', severity: 'Alta', status: 'Cerrada', date: '2024-05-14', desc: 'Carga de archivos sin validación de tipo.' },
  { id: 28, title: 'Reflected XSS en búsqueda', severity: 'Media', status: 'Abierta', date: '2024-05-13', desc: 'Refleja scripts en los resultados de búsqueda.' },
  { id: 29, title: 'Improper Session Expiration', severity: 'Alta', status: 'Abierta', date: '2024-05-12', desc: 'Sesiones no expiran correctamente tras logout.' },
  { id: 30, title: 'Brute Force en login', severity: 'Crítica', status: 'Cerrada', date: '2024-05-11', desc: 'No hay protección contra ataques de fuerza bruta.' },
] as const;

type Severity = 'Crítica' | 'Alta' | 'Media';
type Status = 'Abierta' | 'Cerrada';

const severityColors: Record<Severity, string> = {
  'Crítica': 'bg-red-200 text-red-900',
  'Alta': 'bg-orange-200 text-orange-900',
  'Media': 'bg-yellow-200 text-yellow-900',
};
const statusColors: Record<Status, string> = {
  'Abierta': 'bg-green-100 text-green-800',
  'Cerrada': 'bg-gray-100 text-gray-800',
};

const vulnExtraDetails: Record<string, { descripcionLarga: string, pasos: string[], tips: string, referencia: string }> = {
  'SQL Injection en login': {
    descripcionLarga: 'Permite a un atacante acceder a cuentas de usuario mediante inyección de código SQL en el formulario de login. Puede comprometer toda la base de datos.',
    pasos: ['Identificar campos vulnerables', 'Probar payloads clásicos de SQLi', 'Extraer datos o acceder como otro usuario'],
    tips: 'Utiliza herramientas como sqlmap y revisa los mensajes de error.',
    referencia: 'https://owasp.org/www-community/attacks/SQL_Injection',
  },
  'XSS persistente en comentarios': {
    descripcionLarga: 'Permite la ejecución de scripts maliciosos que se almacenan y ejecutan cada vez que otro usuario ve el comentario.',
    pasos: ['Identificar campos de comentarios', 'Insertar payloads de XSS', 'Verificar persistencia y ejecución'],
    tips: 'Prueba diferentes tipos de XSS y utiliza herramientas de fuzzing.',
    referencia: 'https://owasp.org/www-community/attacks/xss/',
  },
  'CSRF en perfil': {
    descripcionLarga: 'Permite modificar datos de perfil de un usuario autenticado sin su consentimiento mediante solicitudes forjadas.',
    pasos: ['Identificar formularios vulnerables', 'Crear solicitud forjada', 'Enviar la solicitud desde otro sitio'],
    tips: 'Verifica la presencia de tokens CSRF y cabeceras de origen.',
    referencia: 'https://owasp.org/www-community/attacks/csrf',
  },
  'Insecure Storage en app móvil': {
    descripcionLarga: 'Permite que datos sensibles como contraseñas, tokens, claves de API, etc., sean almacenados de forma no cifrada en el dispositivo del usuario.',
    pasos: ['Identificar lugares donde se almacenan datos sensibles', 'Implementar cifrado de datos en el cliente', 'Usar encriptación de extremo a extremo'],
    tips: 'Utiliza bibliotecas de cifrado robustas y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Insecure_Storage',
  },
  'IDOR en historial de compras': {
    descripcionLarga: 'Permite a un atacante acceder a las compras de otros usuarios sin autorización, a través de la manipulación de parámetros o la explotación de la lógica de negocio.',
    pasos: ['Identificar la URL del historial de compras', 'Manipular parámetros para ver compras de otros usuarios', 'Asegurarse de que la lógica de negocio permita esto'],
    tips: 'Verifica la autenticación y autorización de los usuarios.',
    referencia: 'https://owasp.org/www-community/attacks/IDOR',
  },
  'Desbordamiento de búfer en chat': {
    descripcionLarga: 'Permite la ejecución de código arbitrario en el servidor al sobrepasar los límites de un búfer de datos, lo que puede llevar a la ejecución de código malicioso.',
    pasos: ['Identificar el punto donde se maneja el búfer', 'Sobrepasar el límite del búfer', 'Ejecutar código malicioso'],
    tips: 'Utiliza herramientas de fuzzing y sigue buenas prácticas de codificación.',
    referencia: 'https://owasp.org/www-community/attacks/Buffer_Overflow',
  },
  'Directory Traversal en descargas': {
    descripcionLarga: 'Permite la lectura y escritura de archivos fuera del directorio de descargas permitido, lo que puede llevar a la lectura de archivos sensibles o la escritura de archivos maliciosos.',
    pasos: ['Identificar la URL de descarga', 'Manipular la ruta para acceder a archivos fuera del directorio', 'Ejecutar código malicioso'],
    tips: 'Valida las rutas de descarga y utiliza técnicas de sanitización.',
    referencia: 'https://owasp.org/www-community/attacks/Directory_Traversal',
  },
  'Open Redirect en login': {
    descripcionLarga: 'Permite la redirección de usuarios a sitios web no autorizados o maliciosos, a través de parámetros de URL manipulados.',
    pasos: ['Identificar el punto de redirección', 'Manipular el parámetro de redirección', 'Redirigir a un sitio no autorizado'],
    tips: 'Valida la URL de redirección y utiliza cabeceras de origen.',
    referencia: 'https://owasp.org/www-community/attacks/Open_Redirect',
  },
  'Race Condition en transferencias': {
    descripcionLarga: 'Permite la ejecución de transferencias duplicadas o la modificación de datos no autorizados, explotando una condición de carrera en el sistema.',
    pasos: ['Identificar la lógica de transferencia', 'Manipular el flujo de ejecución para que se ejecute dos veces', 'Ejecutar código malicioso'],
    tips: 'Utiliza técnicas de bloqueo y verifica la atomicidad de las operaciones.',
    referencia: 'https://owasp.org/www-community/attacks/Race_Condition',
  },
  'Clickjacking en panel de usuario': {
    descripcionLarga: 'Permite que un atacante haga clic en un elemento visible, pero que la acción real se realice en un iframe oculto o en un área de clic diferente.',
    pasos: ['Identificar el área de clic visible', 'Crear un iframe oculto con una acción maliciosa', 'Hacer que el usuario haga clic en el iframe'],
    tips: 'Utiliza cabeceras de X-Frame-Options y sigue buenas prácticas de diseño.',
    referencia: 'https://owasp.org/www-community/attacks/Clickjacking',
  },
  'Exposure of Sensitive Data': {
    descripcionLarga: 'Permite que datos sensibles como contraseñas, tokens, claves de API, etc., sean expuestos en respuestas de API o logs.',
    pasos: ['Identificar la fuente de la exposición', 'Implementar cifrado de datos en tránsito y en reposo', 'Utilizar tokens de corta duración'],
    tips: 'Utiliza cabeceras de seguridad y sigue buenas prácticas de API.',
    referencia: 'https://owasp.org/www-community/attacks/Exposure_of_Sensitive_Data',
  },
  'Weak Password Policy': {
    descripcionLarga: 'Permite que usuarios utilicen contraseñas débiles o fáciles de adivinar, lo que facilita el acceso no autorizado.',
    pasos: ['Identificar políticas de contraseña actuales', 'Implementar políticas de contraseña robustas', 'Enseñar a los usuarios a usar contraseñas seguras'],
    tips: 'Utiliza políticas de contraseña robustas y notifica a los usuarios sobre la importancia de las contraseñas seguras.',
    referencia: 'https://owasp.org/www-community/attacks/Weak_Password_Strength',
  },
  'Path Disclosure en errores': {
    descripcionLarga: 'Permite que mensajes de error revelen información sobre la estructura del servidor o rutas internas, lo que puede ayudar a un atacante a entender la lógica de la aplicación.',
    pasos: ['Identificar la fuente de los mensajes de error', 'Implementar manejo de errores robusto', 'No revelar información sensible en mensajes de error'],
    tips: 'Utiliza un sistema de logging robusto y sigue buenas prácticas de manejo de errores.',
    referencia: 'https://owasp.org/www-community/attacks/Information_Disclosure',
  },
  'Cross-Site Request Forgery en pagos': {
    descripcionLarga: 'Permite la realización de pagos no autorizados a través de solicitudes forjadas, a menudo a través de formularios web.',
    pasos: ['Identificar formularios de pago', 'Crear solicitud forjada', 'Enviar la solicitud desde otro sitio'],
    tips: 'Utiliza tokens CSRF y verifica la autenticación de doble factor.',
    referencia: 'https://owasp.org/www-community/attacks/CSRF',
  },
  'Server-Side Request Forgery': {
    descripcionLarga: 'Permite que un atacante realice solicitudes HTTP a recursos internos del servidor, a través de la manipulación de parámetros o la explotación de la lógica de negocio.',
    pasos: ['Identificar la URL de la solicitud', 'Manipular el parámetro de la solicitud', 'Ejecutar código malicioso'],
    tips: 'Valida las solicitudes y utiliza cabeceras de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Server_Side_Request_Forgery',
  },
  'XML External Entity (XXE)': {
    descripcionLarga: 'Permite la inyección de entidades externas en documentos XML, lo que puede llevar a la ejecución de código malicioso o a la lectura de archivos del sistema.',
    pasos: ['Identificar el punto de procesamiento de XML', 'Inyectar entidades externas', 'Ejecutar código malicioso'],
    tips: 'Utiliza un parser XML seguro y sigue buenas prácticas de codificación.',
    referencia: 'https://owasp.org/www-community/attacks/XML_External_Entity',
  },
  'Insufficient Logging': {
    descripcionLarga: 'Permite que los eventos críticos de seguridad, como intentos de acceso no autorizado, cambios de estado, etc., no sean registrados o que los logs sean fácilmente manipulables.',
    pasos: ['Identificar los eventos críticos', 'Implementar un sistema de logging robusto', 'No permitir la manipulación de logs'],
    tips: 'Utiliza un sistema de logging robusto y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Insufficient_Logging',
  },
  'Broken Access Control': {
    descripcionLarga: 'Permite que usuarios o aplicaciones accedan a recursos que no deberían tener acceso, a través de la manipulación de parámetros, la omisión de autenticación, o la explotación de la lógica de negocio.',
    pasos: ['Identificar la lógica de acceso', 'Implementar controles de acceso robustos', 'Validar la autenticación de doble factor'],
    tips: 'Utiliza controles de acceso robustos y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Broken_Access_Control',
  },
  'Sensitive Cookie Without Secure Flag': {
    descripcionLarga: 'Permite que cookies sensibles, como tokens de sesión, sean enviadas sin el flag Secure, lo que las hace vulnerables a ataques de MITM.',
    pasos: ['Identificar cookies sensibles', 'Asegurarse de que el flag Secure esté presente', 'No enviar cookies sensibles sin el flag Secure'],
    tips: 'Utiliza el flag Secure y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Sensitive_Cookie_Without_Secure_Flag',
  },
  'Unvalidated Redirects': {
    descripcionLarga: 'Permite la redirección a sitios web no autorizados o maliciosos, a través de parámetros de URL manipulados o la explotación de la lógica de negocio.',
    pasos: ['Identificar el punto de redirección', 'Manipular el parámetro de redirección', 'Redirigir a un sitio no autorizado'],
    tips: 'Valida la URL de redirección y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Unvalidated_Redirects',
  },
  'Privilege Escalation': {
    descripcionLarga: 'Permite que un atacante obtenga privilegios de usuario con menos privilegios, a través de la explotación de la lógica de negocio o la manipulación de parámetros.',
    pasos: ['Identificar la lógica de escalación de privilegios', 'Manipular la solicitud para obtener privilegios más altos', 'Ejecutar código malicioso'],
    tips: 'Utiliza controles de acceso robustos y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Privilege_Escalation',
  },
  'Information Disclosure en headers': {
    descripcionLarga: 'Permite que información sensible, como cabeceras HTTP, sean reveladas a través de la manipulación de solicitudes o la explotación de la lógica de negocio.',
    pasos: ['Identificar la fuente de la exposición', 'Implementar un sistema de logging robusto', 'No revelar información sensible en cabeceras'],
    tips: 'Utiliza un sistema de logging robusto y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Information_Disclosure',
  },
  'JWT None Algorithm': {
    descripcionLarga: 'Permite la creación de tokens JWT firmados con el algoritmo "none", lo que los hace vulnerables a ataques de forja de tokens.',
    pasos: ['Identificar el punto de generación del token', 'Generar un token JWT con el algoritmo "none"', 'Ejecutar código malicioso'],
    tips: 'Utiliza un algoritmo de firma robusto y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/JWT_None_Algorithm',
  },
  'Insecure Direct Object Reference': {
    descripcionLarga: 'Permite el acceso directo a objetos sin autorización, a través de la manipulación de parámetros o la explotación de la lógica de negocio.',
    pasos: ['Identificar el objeto vulnerable', 'Manipular el parámetro para acceder al objeto', 'Ejecutar código malicioso'],
    tips: 'Utiliza controles de acceso robustos y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Insecure_Direct_Object_Reference',
  },
  'Improper Error Handling': {
    descripcionLarga: 'Permite que errores no controlados revelen información interna sobre la estructura del servidor o la lógica de la aplicación.',
    pasos: ['Identificar la fuente de los errores', 'Implementar un sistema de logging robusto', 'No revelar información sensible en errores'],
    tips: 'Utiliza un sistema de logging robusto y sigue buenas prácticas de manejo de errores.',
    referencia: 'https://owasp.org/www-community/attacks/Improper_Error_Handling',
  },
  'Mass Assignment': {
    descripcionLarga: 'Permite la asignación masiva de propiedades de objetos, a través de la manipulación de parámetros o la explotación de la lógica de negocio.',
    pasos: ['Identificar el punto de asignación masiva', 'Manipular el parámetro para asignar propiedades no autorizadas', 'Ejecutar código malicioso'],
    tips: 'Utiliza controles de acceso robustos y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Mass_Assignment',
  },
  'Unsafe File Upload': {
    descripcionLarga: 'Permite la carga de archivos sin validación de tipo o contenido, lo que puede llevar a la ejecución de código malicioso o a la corrupción de datos.',
    pasos: ['Identificar el punto de carga de archivos', 'Validar el tipo de archivo y el contenido', 'No permitir la carga de archivos no válidos'],
    tips: 'Utiliza bibliotecas de validación robustas y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Unsafe_File_Upload',
  },
  'Reflected XSS en búsqueda': {
    descripcionLarga: 'Permite la inyección de código JavaScript en los resultados de búsqueda, lo que puede llevar a la ejecución de scripts maliciosos en el navegador del usuario.',
    pasos: ['Identificar el punto de reflexión', 'Inyectar un payload de XSS', 'Ejecutar código malicioso'],
    tips: 'Utiliza sanitización de datos y sigue buenas prácticas de codificación.',
    referencia: 'https://owasp.org/www-community/attacks/XSS',
  },
  'Improper Session Expiration': {
    descripcionLarga: 'Permite que las sesiones no expiren correctamente tras el logout, lo que puede llevar a la persistencia de la sesión y el acceso no autorizado.',
    pasos: ['Identificar el punto de expiración de la sesión', 'Implementar un sistema de expiración robusto', 'No permitir la persistencia de la sesión'],
    tips: 'Utiliza un sistema de expiración robusto y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Improper_Session_Expiration',
  },
  'Brute Force en login': {
    descripcionLarga: 'Permite la realización de intentos de acceso repetidos a través de fuerza bruta, lo que puede llevar a la exposición de credenciales o a la denegación de servicio.',
    pasos: ['Identificar el punto de acceso', 'Realizar intentos de acceso repetidos', 'Ejecutar código malicioso'],
    tips: 'Utiliza protección contra fuerza bruta robusta y sigue buenas prácticas de seguridad.',
    referencia: 'https://owasp.org/www-community/attacks/Brute_Force',
  },
};

const ExpandableVulnCard: React.FC<{ vuln: any }> = ({ vuln }) => {
  const [expanded, setExpanded] = useState(false);
  const extra = vulnExtraDetails[vuln.title] || {
    descripcionLarga: vuln.desc,
    pasos: ['Revisa la descripción', 'Consulta la documentación', 'Aplica parches recomendados'],
    tips: 'Consulta OWASP y sigue buenas prácticas de seguridad.',
    referencia: '#',
  };
  return (
    <div
      className={`flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer animate-fade-in duration-1500 ${expanded ? 'ring-2 ring-blue-300' : ''}`}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="font-semibold text-gray-900 mb-1">{vuln.title}</div>
      <div className="flex gap-2 mb-1">
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${severityColors[vuln.severity as Severity]}`}>{vuln.severity}</span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[vuln.status as Status]}`}>{vuln.status}</span>
      </div>
      <div className="text-xs text-gray-500 mb-1">{vuln.date}</div>
      <div className="text-xs text-gray-600 mb-2">{vuln.desc}</div>
      {/* Detalles expandibles */}
      <div className={`transition-all duration-300 overflow-hidden ${expanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <div className="text-sm text-gray-700 mb-2">{extra.descripcionLarga}</div>
        <div className="mb-2">
          <span className="font-semibold text-xs text-gray-600">Pasos de remediación:</span>
          <ul className="list-disc ml-5 text-xs text-gray-600">
            {extra.pasos.map((p: string, i: number) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-xs text-gray-600">Tip:</span>
          <span className="ml-2 text-xs text-blue-700">{extra.tips}</span>
        </div>
        <a href={extra.referencia} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline mb-4 inline-block">Referencia OWASP</a>
        <div className="h-2" />
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">Ver menos</button>
      </div>
    </div>
  );
};

const Vulnerabilities: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const criticalVulns = featuredVulns.filter(v => v.severity === 'Crítica');
  const highVulns = featuredVulns.filter(v => v.severity === 'Alta');
  const mediumVulns = featuredVulns.filter(v => v.severity === 'Media');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Vulnerabilidades</h1>
      <p className="text-lg text-gray-600 mb-8">Gestión y seguimiento de vulnerabilidades en la plataforma</p>

      {/* Vulnerabilidades destacadas */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-red-800 mb-4">Vulnerabilidades destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVulns.map(vuln => (
            <ExpandableVulnCard key={vuln.id} vuln={vuln} />
          ))}
        </div>
      </div>
      <h2 className="text-xl font-bold text-red-800 mb-4">Vulnerabilidades</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in duration-1500">
          <h3 className="text-lg font-semibold text-red-800 mb-2">🔍 Critical</h3>
          <p className="text-red-700 text-sm mb-4">High priority vulnerabilities</p>
          <ul className="space-y-3">
            {criticalVulns.map(vuln => (
              <li key={vuln.id}>
                <ExpandableVulnCard vuln={vuln} />
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in duration-1500">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">⚠️ High</h3>
          <p className="text-orange-700 text-sm mb-4">Important security issues</p>
          <ul className="space-y-3">
            {highVulns.map(vuln => (
              <li key={vuln.id}>
                <ExpandableVulnCard vuln={vuln} />
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in duration-1500">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">📊 Medium</h3>
          <p className="text-yellow-700 text-sm mb-4">Moderate risk vulnerabilities</p>
          <ul className="space-y-3">
            {mediumVulns.map(vuln => (
              <li key={vuln.id}>
                <ExpandableVulnCard vuln={vuln} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Vulnerabilities; 