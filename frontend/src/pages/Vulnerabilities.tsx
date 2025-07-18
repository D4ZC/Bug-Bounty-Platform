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
            <div key={vuln.id} className="flex flex-col bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
              <div className="font-semibold text-gray-900 mb-1">{vuln.title}</div>
              <div className="flex gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${severityColors[vuln.severity]}`}>{vuln.severity}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[vuln.status]}`}>{vuln.status}</span>
              </div>
              <div className="text-xs text-gray-500 mb-1">{vuln.date}</div>
              <div className="text-xs text-gray-600">{vuln.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-red-800 mb-2">🔍 Critical</h3>
          <p className="text-red-700 text-sm mb-4">High priority vulnerabilities</p>
          <ul className="space-y-3">
            {criticalVulns.map(vuln => (
              <li key={vuln.id} className="border-b pb-2">
                <div className="font-semibold text-gray-900">{vuln.title}</div>
                <div className="flex gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[vuln.status]}`}>{vuln.status}</span>
                  <span className="text-xs text-gray-500">{vuln.date}</span>
                </div>
                <div className="text-xs text-gray-600">{vuln.desc}</div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">⚠️ High</h3>
          <p className="text-orange-700 text-sm mb-4">Important security issues</p>
          <ul className="space-y-3">
            {highVulns.map(vuln => (
              <li key={vuln.id} className="border-b pb-2">
                <div className="font-semibold text-gray-900">{vuln.title}</div>
                <div className="flex gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[vuln.status]}`}>{vuln.status}</span>
                  <span className="text-xs text-gray-500">{vuln.date}</span>
                </div>
                <div className="text-xs text-gray-600">{vuln.desc}</div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">📊 Medium</h3>
          <p className="text-yellow-700 text-sm mb-4">Moderate risk vulnerabilities</p>
          <ul className="space-y-3">
            {mediumVulns.map(vuln => (
              <li key={vuln.id} className="border-b pb-2">
                <div className="font-semibold text-gray-900">{vuln.title}</div>
                <div className="flex gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[vuln.status]}`}>{vuln.status}</span>
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