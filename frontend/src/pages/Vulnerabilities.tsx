import React from 'react';
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
            <div key={vuln.id} className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition animate-fade-in duration-1500">
              <div className="font-semibold text-gray-900 mb-1">{vuln.title}</div>
              <div className="flex gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${severityColors[vuln.severity as Severity]}`}>{vuln.severity}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[vuln.status as Status]}`}>{vuln.status}</span>
              </div>
              <div className="text-xs text-gray-500 mb-1">{vuln.date}</div>
              <div className="text-xs text-gray-600">{vuln.desc}</div>
            </div>
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
              <li key={vuln.id} className="border-b pb-2">
                <div className="font-semibold text-gray-900">{vuln.title}</div>
                <div className="flex gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[vuln.status as Status]}`}>{vuln.status}</span>
                  <span className="text-xs text-gray-500">{vuln.date}</span>
                </div>
                <div className="text-xs text-gray-600">{vuln.desc}</div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in duration-1500">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">⚠️ High</h3>
          <p className="text-orange-700 text-sm mb-4">Important security issues</p>
          <ul className="space-y-3">
            {highVulns.map(vuln => (
              <li key={vuln.id} className="border-b pb-2">
                <div className="font-semibold text-gray-900">{vuln.title}</div>
                <div className="flex gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[vuln.status as Status]}`}>{vuln.status}</span>
                  <span className="text-xs text-gray-500">{vuln.date}</span>
                </div>
                <div className="text-xs text-gray-600">{vuln.desc}</div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in duration-1500">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">📊 Medium</h3>
          <p className="text-yellow-700 text-sm mb-4">Moderate risk vulnerabilities</p>
          <ul className="space-y-3">
            {mediumVulns.map(vuln => (
              <li key={vuln.id} className="border-b pb-2">
                <div className="font-semibold text-gray-900">{vuln.title}</div>
                <div className="flex gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[vuln.status as Status]}`}>{vuln.status}</span>
                  <span className="text-xs text-gray-500">{vuln.date}</span>
                </div>
                <div className="text-xs text-gray-600">{vuln.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Vulnerabilities; 