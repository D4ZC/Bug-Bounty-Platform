import React, { useState } from 'react';
import { FiMoreVertical, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

interface Doc {
  id: string;
  name: string;
  cve: string;
  severity: string;
  description: string;
  file: string;
  fileName: string;
  username: string;
  date: string;
  likes: number;
  dislikes: number;
  userLiked?: boolean;
  userDisliked?: boolean;
  inReview?: boolean;
}

const initialDocs: Doc[] = [
  // Critic
  {
    id: '1', name: 'SQL Injection', cve: 'CVE-2023-1234', severity: 'Critic', description: 'Inyección de SQL en el login de la app.', file: 'https://ejemplo.com/doc-sql-injection.pdf', fileName: '', username: 'admin', date: '2024-06-10', likes: 15, dislikes: 2, inReview: false },
  {
    id: '2', name: 'Remote Code Execution', cve: 'CVE-2023-5678', severity: 'Critic', description: 'Ejecución remota de código en el backend.', file: 'https://ejemplo.com/doc-rce.pdf', fileName: '', username: 'alice', date: '2024-06-09', likes: 12, dislikes: 8, inReview: false },
  {
    id: '3', name: 'Privilege Escalation', cve: 'CVE-2023-9999', severity: 'Critic', description: 'Escalada de privilegios en el sistema.', file: 'https://ejemplo.com/doc-privilege.pdf', fileName: '', username: 'bob', date: '2024-06-08', likes: 8, dislikes: 12, inReview: false },
  // High
  {
    id: '4', name: 'Cross-Site Scripting', cve: 'CVE-2022-5678', severity: 'High', description: 'XSS en el campo de comentarios.', file: 'https://ejemplo.com/doc-xss.pdf', fileName: '', username: 'carol', date: '2024-06-07', likes: 20, dislikes: 3, inReview: false },
  {
    id: '5', name: 'Directory Traversal', cve: 'CVE-2022-8888', severity: 'High', description: 'Acceso a archivos fuera del directorio permitido.', file: 'https://ejemplo.com/doc-traversal.pdf', fileName: '', username: 'dave', date: '2024-06-06', likes: 5, dislikes: 10, inReview: false },
  {
    id: '6', name: 'Broken Authentication', cve: 'CVE-2022-7777', severity: 'High', description: 'Fallo en la autenticación de usuarios.', file: 'https://ejemplo.com/doc-auth.pdf', fileName: '', username: 'eve', date: '2024-06-05', likes: 18, dislikes: 4, inReview: false },
  // Medium
  {
    id: '7', name: 'Sensitive Data Exposure', cve: 'CVE-2021-3333', severity: 'Medium', description: 'Exposición de datos sensibles en logs.', file: 'https://ejemplo.com/doc-data.pdf', fileName: '', username: 'frank', date: '2024-06-04', likes: 10, dislikes: 15, inReview: false },
  {
    id: '8', name: 'Open Redirect', cve: 'CVE-2021-4444', severity: 'Medium', description: 'Redirección abierta en enlaces externos.', file: 'https://ejemplo.com/doc-redirect.pdf', fileName: '', username: 'grace', date: '2024-06-03', likes: 7, dislikes: 12, inReview: false },
  {
    id: '9', name: 'Insecure Deserialization', cve: 'CVE-2021-5555', severity: 'Medium', description: 'Deserialización insegura de objetos.', file: 'https://ejemplo.com/doc-deserialization.pdf', fileName: '', username: 'heidi', date: '2024-06-02', likes: 14, dislikes: 6, inReview: false },
  // Low
  {
    id: '10', name: 'Information Disclosure', cve: 'CVE-2020-1111', severity: 'Low', description: 'Divulgación de información en headers HTTP.', file: 'https://ejemplo.com/doc-info.pdf', fileName: '', username: 'ivan', date: '2024-06-01', likes: 6, dislikes: 8, inReview: false },
  {
    id: '11', name: 'Clickjacking', cve: 'CVE-2020-2222', severity: 'Low', description: 'Vulnerabilidad de clickjacking en iframes.', file: 'https://ejemplo.com/doc-clickjacking.pdf', fileName: '', username: 'judy', date: '2024-05-31', likes: 9, dislikes: 11, inReview: false },
  {
    id: '12', name: 'Cache Control', cve: 'CVE-2020-3333', severity: 'Low', description: 'Falta de control de caché en respuestas HTTP.', file: 'https://ejemplo.com/doc-cache.pdf', fileName: '', username: 'mallory', date: '2024-05-30', likes: 4, dislikes: 9, inReview: false },
];

const severities = ['All', 'Critic', 'High', 'Medium', 'Low'];

const Contributions: React.FC = () => {
  const [docs, setDocs] = useState<Doc[]>(initialDocs);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'documentation' | 'review'>('documentation');
  const [form, setForm] = useState({
    name: '', cve: '', severity: 'Critic', description: '', file: '', fileName: '', fileObject: null as File | null, username: '', date: '' });
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [menuOpenIdx, setMenuOpenIdx] = useState<number | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [docToDelete, setDocToDelete] = useState<Doc | null>(null);

  // Separar documentos en documentación y revisión
  const documentationDocs = docs.filter(doc => !doc.inReview);
  const reviewDocs = docs.filter(doc => doc.inReview);

  // Filtrar según el tab activo
  const currentDocs = activeTab === 'documentation' ? documentationDocs : reviewDocs;
  
  const filteredDocs = currentDocs.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) &&
    (severityFilter === 'All' || doc.severity === severityFilter)
  );

  // Lógica de likes/dislikes: solo 1 like o 1 dislike, nunca ambos, nunca negativos
  const handleLike = (docId: string, isLike: boolean) => {
    setDocs(docs => docs.map(doc => {
      if (doc.id === docId && !doc.inReview) {
        let newLikes = doc.likes;
        let newDislikes = doc.dislikes;
        let userLiked = !!doc.userLiked;
        let userDisliked = !!doc.userDisliked;

        if (isLike) {
          if (userLiked) {
            // Quitar like
            newLikes = Math.max(0, newLikes - 1);
            userLiked = false;
          } else {
            // Dar like, quitar dislike si existía
            newLikes = newLikes + 1;
            userLiked = true;
            if (userDisliked) {
              newDislikes = Math.max(0, newDislikes - 1);
              userDisliked = false;
            }
          }
        } else {
          if (userDisliked) {
            // Quitar dislike
            newDislikes = Math.max(0, newDislikes - 1);
            userDisliked = false;
          } else {
            // Dar dislike, quitar like si existía
            newDislikes = newDislikes + 1;
            userDisliked = true;
            if (userLiked) {
              newLikes = Math.max(0, newLikes - 1);
              userLiked = false;
            }
          }
        }

        // Si hay más dislikes que likes, mover a revisión
        if (newDislikes > newLikes) {
          return { ...doc, likes: newLikes, dislikes: newDislikes, userLiked, userDisliked, inReview: true };
        }
        return { ...doc, likes: newLikes, dislikes: newDislikes, userLiked, userDisliked, inReview: false };
      }
      return doc;
    }));
  };

  const handleReviewed = (docId: string) => {
    setDocs(docs => docs.map(doc => {
      if (doc.id === docId) {
        return { ...doc, likes: 0, dislikes: 0, userLiked: false, userDisliked: false, inReview: false };
      }
      return doc;
    }));
  };

  const handleDeleteClick = (doc: Doc) => {
    setDocToDelete(doc);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (docToDelete) {
      setDocs(docs => docs.filter(doc => doc.id !== docToDelete.id));
      setShowDeleteModal(false);
      setDocToDelete(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setForm({
        ...form,
        file: URL.createObjectURL(file),
        fileName: file.name,
        fileObject: file,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIdx !== null) {
      setDocs(docs => docs.map((doc, i) => i === editIdx ? { ...form, date: doc.date, likes: doc.likes, dislikes: doc.dislikes, id: doc.id, inReview: doc.inReview } : doc));
      setEditIdx(null);
    } else {
      const newDoc: Doc = {
        ...form,
        id: Date.now().toString(),
        date: new Date().toISOString().slice(0, 10),
        likes: 0,
        dislikes: 0,
        inReview: false,
      };
      setDocs([newDoc, ...docs]);
    }
    setShowForm(false);
    setForm({ name: '', cve: '', severity: 'Critic', description: '', file: '', fileName: '', fileObject: null, username: '', date: '' });
  };

  const handleDelete = (idx: number) => {
    const docToDelete = filteredDocs[idx];
    setDocs(docs => docs.filter(doc => doc.id !== docToDelete.id));
    setMenuOpenIdx(null);
  };

  const handleEdit = (idx: number) => {
    const doc = filteredDocs[idx];
    setForm({
      name: doc.name,
      cve: doc.cve,
      severity: doc.severity,
      description: doc.description,
      file: doc.file,
      fileName: doc.fileName,
      fileObject: null,
      username: doc.username,
      date: doc.date,
    });
    setEditIdx(docs.findIndex(d => d.id === doc.id));
    setShowForm(true);
    setMenuOpenIdx(null);
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-semibold mb-6">Documentación</h2>
      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('documentation')}
          className={`text-xl font-semibold focus:outline-none transition-colors ${
            activeTab === 'documentation' ? 'text-blue-700' : 'text-gray-400'
          }`}
        >
          Documentación
        </button>
        <span className="text-xl font-semibold text-gray-400">|</span>
        <button
          onClick={() => setActiveTab('review')}
          className={`text-xl font-semibold focus:outline-none transition-colors ${
            activeTab === 'review' ? 'text-blue-700' : 'text-gray-400'
          }`}
        >
          Revisión ({reviewDocs.length})
        </button>
      </div>

      <div className="flex items-center mb-8 max-w-2xl gap-4">
        <input
          type="text"
          placeholder="Buscar vulnerabilidad..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white shadow"
        />
        <div className="flex justify-center items-center gap-2">
          {severities.map((s, idx) => (
            <React.Fragment key={s}>
              <span
                onClick={() => setSeverityFilter(s)}
                className={`cursor-pointer select-none text-base font-semibold transition-colors ${severityFilter === s ? 'text-blue-700' : 'text-gray-400'} hover:text-blue-700`}
                style={{ textDecoration: 'none' }}
              >
                {s}
              </span>
              {idx < severities.length - 1 && <span className="text-gray-300 mx-1">|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc, idx) => (
          <div key={doc.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-start relative">
            {/* Icono de 3 puntos y menú */}
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={() => setMenuOpenIdx(menuOpenIdx === idx ? null : idx)}
                className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label="Opciones"
              >
                <FiMoreVertical size={20} />
              </button>
              {menuOpenIdx === idx && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg py-1">
                  {activeTab === 'review' ? (
                    <>
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => handleReviewed(doc.id)}>Revisado</button>
                      <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => handleDeleteClick(doc)}>Eliminar</button>
                    </>
                  ) : (
                    <>
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => handleEdit(idx)}>Editar</button>
                      <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => handleDelete(idx)}>Eliminar</button>
                    </>
                  )}
                </div>
              )}
            </div>
            <span className="absolute left-4 top-4 text-xs text-gray-400">{doc.severity}</span>
            <h4 className="text-lg font-bold mb-2 w-full text-left mt-4">{doc.name}</h4>
            <div className="mb-1 w-full text-left text-sm text-gray-700">
              {doc.cve.replace(/^CVE:/i, '').trim()}
            </div>
            <div className="mb-2 w-full text-left text-gray-700">{doc.description}</div>
            {doc.file && doc.file.startsWith('blob:') ? (
              <a href={doc.file} download={doc.fileName} className="text-blue-600 underline text-sm">{doc.fileName}</a>
            ) : doc.file ? (
              <a href={doc.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">{doc.file}</a>
            ) : null}
            {/* Likes/Dislikes */}
            {activeTab === 'documentation' && (
              <div className="mt-3 flex items-center gap-4 w-full">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(doc.id, true)}
                    className={`p-1 rounded transition-colors ${
                      doc.userLiked ? 'text-green-600 bg-green-100' : 'text-gray-400 hover:text-green-600'
                    }`}
                  >
                    <FiThumbsUp size={16} />
                  </button>
                  <span className="text-sm font-medium">{doc.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(doc.id, false)}
                    className={`p-1 rounded transition-colors ${
                      doc.userDisliked ? 'text-red-600 bg-red-100' : 'text-gray-400 hover:text-red-600'
                    }`}
                  >
                    <FiThumbsDown size={16} />
                  </button>
                  <span className="text-sm font-medium">{doc.dislikes}</span>
                </div>
              </div>
            )}
            <div className="mt-3 flex flex-row gap-4 w-full text-xs text-gray-500 justify-between">
              <span>Fecha: {doc.date}</span>
              <span>Usuario: {doc.username}</span>
            </div>
          </div>
        ))}
        {filteredDocs.length === 0 && (
          <div className="col-span-3 text-gray-400 text-center py-8">
            {activeTab === 'review' ? 'No hay documentos en revisión.' : 'No se encontraron resultados.'}
          </div>
        )}
      </div>
      <button
        className="fixed bottom-8 right-8 bg-blue-600 text-white text-3xl rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition z-50"
        onClick={() => { setShowForm(true); setEditIdx(null); }}
      >
        +
      </button>
      {/* Modal de confirmación para eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" style={{backdropFilter: 'blur(2px)'}}>
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirmar eliminación</h3>
            <p className="text-gray-600 mb-6">¿Estás seguro que deseas eliminar esta card?</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" style={{backdropFilter: 'blur(2px)'}}>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md flex flex-col gap-4 relative">
            <h3 className="text-xl font-bold mb-2">{editIdx !== null ? 'Editar documentación' : 'Nueva documentación'}</h3>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Nombre de la vulnerabilidad" className="border px-3 py-2 rounded" />
            <input name="cve" value={form.cve} onChange={handleChange} required placeholder="CVE" className="border px-3 py-2 rounded" />
            <select name="severity" value={form.severity} onChange={handleChange} className="border px-3 py-2 rounded">
              {severities.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Descripción" className="border px-3 py-2 rounded" />
            <input name="file" value={form.file} onChange={handleChange} placeholder="Link" className="border px-3 py-2 rounded" />
            <input name="username" value={form.username} onChange={handleChange} required placeholder="Usuario que sube la documentación" className="border px-3 py-2 rounded" />
            <div className="flex flex-col gap-2">
              <label htmlFor="file-upload" className="text-sm text-gray-600 font-medium cursor-pointer bg-blue-50 border border-blue-200 px-4 py-2 rounded text-center hover:bg-blue-100 transition">
                {form.fileName ? `Archivo seleccionado: ${form.fileName}` : 'Selecciona un archivo de tu equipo'}
              </label>
              <input id="file-upload" type="file" onChange={handleFile} className="hidden" />
            </div>
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Aceptar</button>
              <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={() => { setShowForm(false); setEditIdx(null); }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Contributions; 