import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type DocInstance = { cve: string; description: string; url: string; files: File[] };
type Resource = { title: string; docs: DocInstance[] };

const initialResources: Resource[] = [
  {
    title: 'SQL Injection',
    docs: [
      {
        cve: 'CVE-2021-1234',
        description: 'Inyección SQL que permite a un atacante manipular consultas a la base de datos y acceder a información sensible.',
        url: 'https://owasp.org/www-community/attacks/SQL_Injection',
        files: []
      },
      {
        cve: 'CVE-2022-5678',
        description: 'Vulnerabilidad de SQLi en el endpoint de login que permite eludir la autenticación.',
        url: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-5678',
        files: []
      },
    ],
  },
  {
    title: 'XSS (Cross-Site Scripting)',
    docs: [
      {
        cve: 'CVE-2020-1111',
        description: 'Permite la ejecución de scripts maliciosos en el navegador de la víctima mediante la inyección de código en campos de entrada.',
        url: 'https://owasp.org/www-community/attacks/xss/',
        files: []
      },
      {
        cve: 'CVE-2021-2222',
        description: 'Reflected XSS en el parámetro de búsqueda de la aplicación.',
        url: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-2222',
        files: []
      },
    ],
  },
  {
    title: 'Server-Side Request Forgery',
    docs: [
      {
        cve: 'CVE-2019-3333',
        description: 'SSRF que permite a un atacante hacer solicitudes arbitrarias desde el servidor, accediendo a recursos internos.',
        url: 'https://owasp.org/www-community/attacks/Server_Side_Request_Forgery',
        files: []
      },
      {
        cve: 'CVE-2022-4444',
        description: 'SSRF en el microservicio de imágenes que permite escanear la red interna.',
        url: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-4444',
        files: []
      },
    ],
  },
];

const Documentation: React.FC = () => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [vulnName, setVulnName] = useState('');
  const [cve, setCve] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const navigate = useNavigate();
  const filtered = resources.filter(res =>
    res.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResources(prev => {
      const idx = prev.findIndex(r => r.title.trim().toLowerCase() === vulnName.trim().toLowerCase());
      const newDoc = { cve, description, url, files: files ? Array.from(files) : [] };
      if (idx !== -1) {
        // Si existe, agregar una nueva instancia
        return prev.map((r, i) =>
          i === idx
            ? { ...r, docs: [...r.docs, newDoc] }
            : r
        );
      } else {
        // Si no existe, agregar nueva card con la instancia
        return [
          ...prev,
          { title: vulnName.trim(), docs: [newDoc] },
        ];
      }
    });
    setModalOpen(false);
    setVulnName('');
    setCve('');
    setDescription('');
    setUrl('');
    setFiles(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <h1 className="text-2xl font-semibold mb-6 text-white">Documentación</h1>
      <div className="mb-8 flex items-center">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-purple-500 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
        />
        <span className="-ml-8 text-gray-400">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6z"/></svg>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <div className="col-span-3 text-center text-gray-400">No results found.</div>
        ) : (
          filtered.map((res, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500 rounded-lg shadow-2xl p-6 flex flex-col items-start">
              <span className="text-lg font-medium mb-2 text-white">{res.title}</span>
              <span className="text-2xl font-semibold mb-4 text-purple-400">{res.docs.length}</span>
              <button
                className="border border-purple-500 text-purple-400 px-4 py-1 rounded hover:bg-purple-700 transition"
                onClick={() => navigate(`/documentation/${encodeURIComponent(res.title)}`)}
              >
                View All
              </button>
            </div>
          ))
        )}
      </div>
      <button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-2xl text-3xl transition-all transform hover:scale-105"
        onClick={() => setModalOpen(true)}
        aria-label="Agregar documentación"
      >
        +
      </button>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-purple-500 rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl transition-colors"
              onClick={() => { setModalOpen(false); setVulnName(''); setCve(''); setDescription(''); setUrl(''); setFiles(null); }}
              aria-label="Cerrar"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-white">Agregar nueva documentación</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-300">Nombre de la vulnerabilidad</label>
              <input
                type="text"
                value={vulnName}
                onChange={e => setVulnName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-300">CVE</label>
              <input
                type="text"
                value={cve}
                onChange={e => setCve(e.target.value)}
                placeholder="CVE-XXXX-XXXX"
                className="w-full px-3 py-2 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-300">Descripción</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white resize-none"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-300">URL</label>
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 font-medium text-gray-300">Subir archivos</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full text-gray-300"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => { setModalOpen(false); setVulnName(''); setCve(''); setDescription(''); setUrl(''); setFiles(null); }}
                className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded hover:from-gray-700 hover:to-gray-800 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Documentation; 