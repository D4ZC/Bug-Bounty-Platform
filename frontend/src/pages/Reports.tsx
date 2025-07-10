import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaCommentDots, FaPaperclip, FaUserCircle } from 'react-icons/fa';

const mockReports = [
  {
    id: 1,
    user: { name: 'Juan Pérez', avatar: '' },
    title: 'SQL Injection en login',
    description: 'Encontré una vulnerabilidad de SQLi en el login usando payloads básicos.',
    type: 'SQL Injection',
    difficulty: 'Alta',
    createdAt: '2024-06-01T10:00:00',
    likes: 5,
    dislikes: 1,
    comments: [
      {
        id: 1,
        user: { name: 'Ana Torres', avatar: '' },
        text: '¡Buen hallazgo! ¿Puedes compartir el payload?',
        createdAt: '2024-06-01T12:00:00',
        likes: 2,
        dislikes: 0,
        replies: [
          {
            id: 2,
            user: { name: 'Juan Pérez', avatar: '' },
            text: 'Claro, usé " OR 1=1--',
            createdAt: '2024-06-01T12:10:00',
            likes: 1,
            dislikes: 0,
            replies: [],
          },
        ],
      },
    ],
    attachments: [],
  },
];

const defaultAvatar = <FaUserCircle className="text-3xl text-gray-400" />;

const Reports: React.FC = () => {
  const [reports, setReports] = useState(mockReports);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: '',
    difficulty: '',
    attachments: [] as File[],
  });
  const [commentText, setCommentText] = useState('');
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  // Simulación de subida de reporte
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.type || !form.difficulty) return;
    setReports([
      {
        id: Date.now(),
        user: { name: 'Usuario Actual', avatar: '' },
        title: form.title,
        description: form.description,
        type: form.type,
        difficulty: form.difficulty,
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        comments: [],
        attachments: form.attachments,
      },
      ...reports,
    ]);
    setForm({ title: '', description: '', type: '', difficulty: '', attachments: [] });
  };

  // Simulación de like/dislike
  const handleVote = (reportId: number, type: 'like' | 'dislike') => {
    setReports(reports.map(r =>
      r.id === reportId
        ? { ...r, likes: type === 'like' ? r.likes + 1 : r.likes, dislikes: type === 'dislike' ? r.dislikes + 1 : r.dislikes }
        : r
    ));
  };

  // Simulación de agregar comentario
  const handleAddComment = (reportId: number) => {
    if (!commentText) return;
    setReports(reports.map(r =>
      r.id === reportId
        ? {
            ...r,
            comments: [
              ...r.comments,
              {
                id: Date.now(),
                user: { name: 'Usuario Actual', avatar: '' },
                text: commentText,
                createdAt: new Date().toISOString(),
                likes: 0,
                dislikes: 0,
                replies: [],
              },
            ],
          }
        : r
    ));
    setCommentText('');
    setSelectedReport(null);
  };

  // Renderizado recursivo de comentarios con hilos
  const renderComments = (comments: any[], level = 0) => (
    <div className={level > 0 ? 'ml-8 border-l-2 border-gray-700 pl-4' : ''}>
      {comments.map(comment => (
        <div key={comment.id} className="mb-2">
          <div className="flex items-center gap-2 mb-1">
            {comment.user.avatar ? (
              <img src={comment.user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            ) : (
              defaultAvatar
            )}
            <span className="font-bold text-[#4fc3f7]">{comment.user.name}</span>
            <span className="text-xs text-gray-400 ml-2">{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <div className="ml-10 text-[#bfcfff]">{comment.text}</div>
          <div className="ml-10 flex gap-2 items-center mt-1">
            <button className="text-cyan-400 hover:text-cyan-300"><FaThumbsUp /></button>
            <button className="text-red-400 hover:text-red-300"><FaThumbsDown /></button>
            <button className="text-gray-400 hover:text-white text-xs">Responder</button>
          </div>
          {comment.replies && comment.replies.length > 0 && renderComments(comment.replies, level + 1)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2 bg-gradient-to-br from-[#181c24] via-[#23273a] to-[#181c24]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#4fc3f7] mb-10 tracking-wide drop-shadow-lg text-center">Reportes</h1>
      {/* Formulario de nuevo reporte */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-[#181c24] border-2 border-[#4fc3f7] rounded-2xl shadow-2xl p-8 mb-10 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#4fc3f7] mb-2">Subir nuevo reporte</h2>
        <input type="text" placeholder="Título" className="px-4 py-2 rounded bg-[#23273a] text-white" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
        <textarea placeholder="Descripción" className="px-4 py-2 rounded bg-[#23273a] text-white min-h-[80px]" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
        <div className="flex gap-4">
          <select className="px-4 py-2 rounded bg-[#23273a] text-white flex-1" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} required>
            <option value="">Tipo de vulnerabilidad</option>
            <option value="SQL Injection">SQL Injection</option>
            <option value="XSS">XSS</option>
            <option value="CSRF">CSRF</option>
            <option value="IDOR">IDOR</option>
            <option value="Otra">Otra</option>
          </select>
          <select className="px-4 py-2 rounded bg-[#23273a] text-white flex-1" value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))} required>
            <option value="">Dificultad</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
            <option value="Crítica">Crítica</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-[#bfcfff] cursor-pointer">
          <FaPaperclip /> Adjuntar archivos
          <input type="file" multiple className="hidden" onChange={e => setForm(f => ({ ...f, attachments: e.target.files ? Array.from(e.target.files) : [] }))} />
        </label>
        <button type="submit" className="mt-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-bold shadow hover:scale-105 transition">Subir reporte</button>
      </form>
      {/* Feed de reportes */}
      <div className="w-full max-w-2xl flex flex-col gap-8">
        {reports.map(report => (
          <div key={report.id} className="bg-[#23273a] border-2 border-[#4fc3f7] rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              {report.user.avatar ? (
                <img src={report.user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
              ) : (
                defaultAvatar
              )}
              <span className="font-bold text-[#4fc3f7] text-lg">{report.user.name}</span>
              <span className="text-xs text-gray-400 ml-2">{new Date(report.createdAt).toLocaleString()}</span>
              <span className="ml-auto text-xs text-[#bfcfff]">{report.type} | {report.difficulty}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{report.title}</h3>
            <p className="text-[#bfcfff] mb-2">{report.description}</p>
            {report.attachments && report.attachments.length > 0 && (
              <div className="flex gap-2 mb-2">
                {report.attachments.map((file, i) => (
                  <span key={i} className="text-xs text-[#bfcfff] bg-[#181c24] px-2 py-1 rounded flex items-center gap-1"><FaPaperclip /> {file.name}</span>
                ))}
              </div>
            )}
            <div className="flex gap-4 items-center mb-2">
              <button onClick={() => handleVote(report.id, 'like')} className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300"><FaThumbsUp /> {report.likes}</button>
              <button onClick={() => handleVote(report.id, 'dislike')} className="flex items-center gap-1 text-red-400 hover:text-red-300"><FaThumbsDown /> {report.dislikes}</button>
              <button onClick={() => setSelectedReport(report.id)} className="flex items-center gap-1 text-[#bfcfff] hover:text-white"><FaCommentDots /> Comentar</button>
              {/* Editar/Eliminar solo para el autor (simulado) */}
              <button className="ml-auto text-xs text-yellow-400 hover:text-yellow-200">Editar</button>
              <button className="text-xs text-red-400 hover:text-red-200">Eliminar</button>
            </div>
            {/* Comentarios */}
            <div className="mt-2">
              {renderComments(report.comments)}
              {selectedReport === report.id && (
                <div className="mt-2 flex flex-col gap-2">
                  <textarea className="px-4 py-2 rounded bg-[#181c24] text-white min-h-[40px]" placeholder="Escribe un comentario..." value={commentText} onChange={e => setCommentText(e.target.value)} />
                  <div className="flex gap-2">
                    <button onClick={() => handleAddComment(report.id)} className="px-4 py-2 bg-cyan-500 text-white rounded font-bold">Comentar</button>
                    <button onClick={() => setSelectedReport(null)} className="px-4 py-2 bg-gray-700 text-white rounded font-bold">Cancelar</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports; 