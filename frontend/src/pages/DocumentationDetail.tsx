import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const exampleDocs = [
  {
    vuln: 'SQL Injection',
    instances: [
      {
        name: 'SQL Injection en login',
        cve: 'CVE-2021-1234',
        files: ['evidencia1.png', 'poc.txt'],
        description: 'Inyección SQL encontrada en el formulario de login que permite el acceso no autorizado.',
        url: 'https://example.com/sql-injection-login'
      },
      {
        name: 'SQLi en parámetro de búsqueda',
        cve: 'CVE-2022-5678',
        files: ['captura.png'],
        description: 'El parámetro de búsqueda no filtra correctamente las entradas, permitiendo inyección.',
        url: 'https://example.com/sql-injection-search'
      }
    ]
  },
  {
    vuln: 'XSS (Cross-Site Scripting)',
    instances: [
      {
        name: 'XSS en comentarios',
        cve: 'CVE-2020-1111',
        files: ['xss-demo.png'],
        description: 'Permite la ejecución de scripts en los comentarios públicos.',
        url: 'https://example.com/xss-comments'
      },
      {
        name: 'XSS en perfil de usuario',
        cve: 'CVE-2021-2222',
        files: ['perfil-xss.png'],
        description: 'El campo de perfil permite inyección de scripts.',
        url: 'https://example.com/xss-profile'
      }
    ]
  },
  {
    vuln: 'Server-Side Request Forgery',
    instances: [
      {
        name: 'SSRF en carga de imágenes',
        cve: 'CVE-2019-3333',
        files: ['ssrf-ejemplo.png'],
        description: 'El endpoint de carga de imágenes permite hacer peticiones a servidores internos.',
        url: 'https://example.com/ssrf-image-upload'
      },
      {
        name: 'SSRF en importación de feeds',
        cve: 'CVE-2022-4444',
        files: ['feed-ssrf.png'],
        description: 'La importación de feeds permite acceder a recursos internos.',
        url: 'https://example.com/ssrf-feed-import'
      }
    ]
  }
];

const reportReasons = [
  'Información incorrecta o desactualizada',
  'CVE duplicado o mal asignado',
  'Descripción confusa o incompleta',
  'Enlaces rotos o inválidos',
  'Archivos faltantes o corruptos',
  'Otro'
];

const DocumentationDetail: React.FC = () => {
  const { vulnName } = useParams<{ vulnName: string }>();
  const navigate = useNavigate();
  const decodedVuln = decodeURIComponent(vulnName || '');
  const vulnData = exampleDocs.find(v => v.vuln === decodedVuln);
  const [search, setSearch] = useState('');
  const [reportModal, setReportModal] = useState<{ open: boolean; vulnIndex: number | null }>({ open: false, vulnIndex: null });
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [hoveredFlag, setHoveredFlag] = useState<number | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  
  const instances = vulnData ? vulnData.instances.filter(vuln =>
    vuln.name.toLowerCase().includes(search.toLowerCase()) ||
    vuln.cve.toLowerCase().includes(search.toLowerCase()) ||
    (vuln.description && vuln.description.toLowerCase().includes(search.toLowerCase()))
  ) : [];

  const handleReport = (vulnIndex: number) => {
    setReportModal({ open: true, vulnIndex });
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se enviaría el reporte al backend
    console.log('Reporte enviado:', {
      vulnIndex: reportModal.vulnIndex,
      reason: reportReason,
      description: reportDescription,
      vulnName: instances[reportModal.vulnIndex!]?.name
    });
    
    // Cerrar modal de reporte
    setReportModal({ open: false, vulnIndex: null });
    setReportReason('');
    setReportDescription('');
    
    // Mostrar popup de agradecimiento
    setShowThankYou(true);
    
    // Ocultar popup después de 3 segundos
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/documentation')}
          className="mr-4 text-purple-400 hover:text-purple-300 text-2xl transition-colors"
          title="Volver"
        >
          &#8592;
        </button>
        <h1 className="text-2xl font-semibold text-white">Documentación: {decodedVuln}</h1>
      </div>
      <div className="mb-6 max-w-md">
        <input
          type="text"
          placeholder="Buscar por nombre, CVE o descripción..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-purple-500 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white placeholder-gray-400"
        />
      </div>
      {instances.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500 rounded-lg shadow-2xl p-6 text-center text-gray-300">
          No hay vulnerabilidades reportadas para esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instances.map((vuln, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500 rounded-lg shadow-2xl p-6 flex flex-col relative">
              {/* Bandera de reporte */}
              <div className="absolute top-4 right-4">
                <button
                  className={`text-2xl transition-colors duration-200 ${
                    hoveredFlag === idx ? 'text-red-500' : 'text-gray-400'
                  } hover:text-red-500`}
                  onMouseEnter={() => setHoveredFlag(idx)}
                  onMouseLeave={() => setHoveredFlag(null)}
                  onClick={() => handleReport(idx)}
                  title="Reportar documentación"
                >
                  🚩
                </button>
              </div>
              
              <span className="text-lg font-bold mb-2 pr-12 text-white">{vuln.name || vuln.cve}</span>
              <span className="text-sm text-purple-300 mb-1">CVE: {vuln.cve}</span>
              <span className="mb-2 text-gray-300">{vuln.description}</span>
              {vuln.url && (
                <a href={vuln.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 text-xs underline mb-2 hover:text-purple-300 transition-colors">{vuln.url}</a>
              )}
              <div className="mb-2">
                <strong className="text-white">Archivos:</strong>
                <ul className="list-disc ml-6">
                  {vuln.files && vuln.files.map((file, i) => (
                    <li key={i} className="text-purple-400 underline cursor-pointer hover:text-purple-300 transition-colors">{file}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de reporte */}
      {reportModal.open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500 rounded-lg shadow-2xl p-8 w-full max-w-md relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl transition-colors"
              onClick={() => {
                setReportModal({ open: false, vulnIndex: null });
                setReportReason('');
                setReportDescription('');
              }}
              aria-label="Cerrar"
            >
              &times;
            </button>
            
            <h2 className="text-xl font-bold mb-4 text-white">Reportar documentación</h2>
            <p className="text-gray-300 mb-4">
              Reportando: <strong className="text-white">{instances[reportModal.vulnIndex!]?.name}</strong>
            </p>
            
            <form onSubmit={handleReportSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-300">Motivo del reporte:</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
                >
                  <option value="">Selecciona un motivo</option>
                  {reportReasons.map((reason, index) => (
                    <option key={index} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-300">Descripción adicional:</label>
                <textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  rows={4}
                  placeholder="Proporciona más detalles sobre el problema..."
                  className="w-full px-3 py-2 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white resize-none placeholder-gray-400"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setReportModal({ open: false, vulnIndex: null });
                    setReportReason('');
                    setReportDescription('');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded hover:from-gray-700 hover:to-gray-800 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded hover:from-red-700 hover:to-red-800 transition-all"
                >
                  Enviar Reporte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup de agradecimiento */}
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500 rounded-lg shadow-2xl p-8 max-w-sm mx-4 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-green-400 mb-2">¡Gracias!</h3>
            <p className="text-gray-300 mb-4">
              Tu reporte ha sido enviado correctamente. Nuestro equipo lo revisará pronto.
            </p>
            <button
              onClick={() => setShowThankYou(false)}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded hover:from-green-700 hover:to-green-800 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentationDetail; 