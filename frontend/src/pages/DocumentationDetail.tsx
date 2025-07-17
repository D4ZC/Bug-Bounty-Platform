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
        description: 'Inyección SQL encontrada en el formulario de login que permite el acceso no autorizado.'
      },
      {
        name: 'SQLi en parámetro de búsqueda',
        cve: 'CVE-2022-5678',
        files: ['captura.png'],
        description: 'El parámetro de búsqueda no filtra correctamente las entradas, permitiendo inyección.'
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
        description: 'Permite la ejecución de scripts en los comentarios públicos.'
      },
      {
        name: 'XSS en perfil de usuario',
        cve: 'CVE-2021-2222',
        files: ['perfil-xss.png'],
        description: 'El campo de perfil permite inyección de scripts.'
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
        description: 'El endpoint de carga de imágenes permite hacer peticiones a servidores internos.'
      },
      {
        name: 'SSRF en importación de feeds',
        cve: 'CVE-2022-4444',
        files: ['feed-ssrf.png'],
        description: 'La importación de feeds permite acceder a recursos internos.'
      }
    ]
  }
];

const DocumentationDetail: React.FC = () => {
  const { vulnName } = useParams<{ vulnName: string }>();
  const navigate = useNavigate();
  const decodedVuln = decodeURIComponent(vulnName || '');
  const vulnData = exampleDocs.find(v => v.vuln === decodedVuln);
  const [search, setSearch] = useState('');
  const instances = vulnData ? vulnData.instances.filter(vuln =>
    vuln.name.toLowerCase().includes(search.toLowerCase()) ||
    vuln.cve.toLowerCase().includes(search.toLowerCase()) ||
    (vuln.description && vuln.description.toLowerCase().includes(search.toLowerCase()))
  ) : [];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/documentation')}
          className="mr-4 text-blue-600 hover:text-blue-800 text-2xl"
          title="Volver"
        >
          &#8592;
        </button>
        <h1 className="text-2xl font-semibold">Documentación: {decodedVuln}</h1>
      </div>
      <div className="mb-6 max-w-md">
        <input
          type="text"
          placeholder="Buscar por nombre, CVE o descripción..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {instances.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          No hay vulnerabilidades reportadas para esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instances.map((vuln, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col">
              <span className="text-lg font-bold mb-2">{vuln.name}</span>
              <span className="text-sm text-gray-500 mb-1">CVE: {vuln.cve}</span>
              <span className="mb-2 text-gray-700">{vuln.description}</span>
              <div className="mb-2">
                <strong>Archivos:</strong>
                <ul className="list-disc ml-6">
                  {vuln.files.map((file, i) => (
                    <li key={i} className="text-blue-600 underline cursor-pointer">{file}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentationDetail; 