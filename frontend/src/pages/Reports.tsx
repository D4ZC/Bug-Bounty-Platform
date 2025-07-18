import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaCommentDots, FaPaperclip, FaUserCircle, FaPlus } from 'react-icons/fa';

const mockReports: Array<any> = [
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

const difficultyOptions = [
  { value: 'Fácil', color: 'bg-green-500' },
  { value: 'Medio', color: 'bg-yellow-400' },
  { value: 'Difícil', color: 'bg-orange-500' },
  { value: 'Crítica', color: 'bg-red-600' },
];

const Reports: React.FC = () => {
  const [reports, setReports] = useState(mockReports);
  const [form, setForm] = useState<{
    title: string;
    description: string;
    type: string;
    difficulty: string;
    attachments: File[];
  }>({
    title: '',
    description: '',
    type: '',
    difficulty: '',
    attachments: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  // Estado para modal de detalle
  const [detailReport, setDetailReport] = useState<any | null>(null);
  // Estado para vista previa de archivos
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  // Estado para errores de formulario
  const [formErrors, setFormErrors] = useState<{ title?: string; description?: string; type?: string; difficulty?: string; attachments?: string }>({});

  // Simulación de usuario actual y admin
  const currentUser = { name: 'Usuario Actual', avatar: '', isAdmin: true };

  // Simulación de votos por usuario (mock)
  const [userVotes, setUserVotes] = useState<{ [reportId: number]: 'like' | 'dislike' | null }>({});
  // Estado para votos de comentarios (por usuario y comentario)
  const [commentVotes, setCommentVotes] = useState<{ [commentId: number]: 'like' | 'dislike' | null }>({});

  // Simulación de subida de reporte
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { title?: string; description?: string; type?: string; difficulty?: string; attachments?: string } = {};
    if (!form.title.trim()) errors.title = "El título es obligatorio.";
    if (!form.description.trim()) errors.description = "La descripción es obligatoria.";
    if (!form.type) errors.type = "Selecciona un tipo de vulnerabilidad.";
    if (!form.difficulty) errors.difficulty = "Selecciona la dificultad.";
    if (!form.attachments.length) errors.attachments = "Adjunta al menos un archivo.";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
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
    setFilePreviews([]); // Limpiar vistas previas al subir
    setShowModal(false);
    setFormErrors({});
  };

  // Lógica de like/dislike único por usuario
  const handleVote = (reportId: number, type: 'like' | 'dislike') => {
    setReports(reports.map(r => {
      if (r.id !== reportId) return r;
      const prevVote = userVotes[reportId];
      let likes = r.likes;
      let dislikes = r.dislikes;
      if (type === 'like') {
        if (prevVote === 'like') return r;
        likes += 1;
        if (prevVote === 'dislike') dislikes -= 1;
      } else {
        if (prevVote === 'dislike') return r;
        dislikes += 1;
        if (prevVote === 'like') likes -= 1;
      }
      return { ...r, likes, dislikes };
    }));
    setUserVotes(v => ({ ...v, [reportId]: type }));
  };

  // Lógica de like/dislike único por usuario en comentarios
  const handleCommentVote = (reportId: number, commentId: number, type: 'like' | 'dislike') => {
    setReports(reports.map(r => {
      if (r.id !== reportId) return r;
      // Recursivo para encontrar y actualizar el comentario
      const updateVotes = (comments: any[]): any[] => comments.map(c => {
        if (c.id === commentId) {
          const prevVote = commentVotes[commentId];
          let likes = c.likes;
          let dislikes = c.dislikes;
          if (type === 'like') {
            if (prevVote === 'like') return c;
            likes += 1;
            if (prevVote === 'dislike') dislikes -= 1;
          } else {
            if (prevVote === 'dislike') return c;
            dislikes += 1;
            if (prevVote === 'like') likes -= 1;
          }
          return { ...c, likes, dislikes };
        }
        return { ...c, replies: updateVotes(c.replies) };
      });
      return { ...r, comments: updateVotes(r.comments) };
    }));
    setCommentVotes(v => ({ ...v, [commentId]: type }));
  };

  // Eliminar reporte (solo autor o admin)
  const handleDeleteReport = (reportId: number) => {
    setReports(reports.filter(r => r.id !== reportId));
    setDetailReport(null);
  };

  // Editar reporte (solo autor o admin, abre modal de edición)
  const [editForm, setEditForm] = useState<any | null>(null);
  const handleEditReport = (report: any) => {
    setEditForm({ ...report });
  };
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReports(reports.map(r => r.id === editForm.id ? { ...editForm } : r));
    setDetailReport({ ...editForm });
    setEditForm(null);
  };

  // Comentarios: agregar, editar, eliminar (solo autor o admin)
  const [editingComment, setEditingComment] = useState<{ id: number, text: string } | null>(null);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const handleAddComment = (reportId: number, text: string, parentId?: number) => {
    setReports(reports.map(r => {
      if (r.id !== reportId) return r;
      const newComment = {
                id: Date.now(),
        user: { name: currentUser.name, avatar: currentUser.avatar },
        text,
                createdAt: new Date().toISOString(),
                likes: 0,
                dislikes: 0,
                replies: [],
      };
      if (!parentId) {
        return { ...r, comments: [...r.comments, newComment] };
      }
      // Recursivo para hilos
      const addReply = (comments: any[]): any[] => comments.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: [...c.replies, newComment] };
        }
        return { ...c, replies: addReply(c.replies) };
      });
      return { ...r, comments: addReply(r.comments) };
    }));
    setReplyTo(null);
    setEditingComment(null);
  };
  const handleEditComment = (reportId: number, commentId: number, newText: string) => {
    setReports(reports.map(r => {
      if (r.id !== reportId) return r;
      const editRec = (comments: any[]): any[] => comments.map(c => {
        if (c.id === commentId) return { ...c, text: newText };
        return { ...c, replies: editRec(c.replies) };
      });
      return { ...r, comments: editRec(r.comments) };
    }));
    setEditingComment(null);
  };
  const handleDeleteComment = (reportId: number, commentId: number) => {
    setReports(reports.map(r => {
      if (r.id !== reportId) return r;
      const delRec = (comments: any[]): any[] => comments.filter(c => c.id !== commentId).map(c => ({ ...c, replies: delRec(c.replies) }));
      return { ...r, comments: delRec(r.comments) };
    }));
  };

  // Renderizado recursivo de comentarios con hilos
  const renderComments = (comments: any[], level = 0, reportId?: number) => (
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
            {/* Editar/Eliminar solo autor o admin */}
            {(comment.user.name === currentUser.name || currentUser.isAdmin) && (
              <>
                <button className="text-xs text-yellow-400 hover:text-yellow-200 ml-2" onClick={() => setEditingComment({ id: comment.id, text: comment.text })}>Editar</button>
                <button className="text-xs text-red-400 hover:text-red-200 ml-1" onClick={() => handleDeleteComment(detailReport.id, comment.id)}>Eliminar</button>
              </>
            )}
          </div>
          {editingComment && editingComment.id === comment.id ? (
            <div className="ml-10 flex flex-col gap-2">
              <textarea className="px-4 py-2 rounded bg-[#181c24] text-white min-h-[40px]" value={editingComment.text} onChange={e => setEditingComment({ id: comment.id, text: e.target.value })} />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded font-bold" onClick={() => handleEditComment(detailReport.id, comment.id, editingComment.text)}>Guardar</button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded font-bold" onClick={() => setEditingComment(null)}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div className="ml-10 text-[#bfcfff]">
              {comment.text.startsWith('@') ? (() => {
                // Buscar la mención completa: @ seguido de palabras y espacios hasta el primer espacio después del nombre
                const mentionMatch = comment.text.match(/^@[^ ]+(?: [^ ]+)* /);
                if (mentionMatch) {
                  const mention = mentionMatch[0];
                  const rest = comment.text.slice(mention.length);
                  return <><span className="text-[#4fc3f7] font-semibold">{mention.trim()}</span>{' '}{rest}</>;
                }
                return comment.text;
              })() : comment.text}
            </div>
          )}
          <div className="ml-10 flex gap-2 items-center mt-1">
            <button
              className={`flex items-center gap-1 ${commentVotes[comment.id]==='like' ? 'text-blue-400' : 'text-cyan-400 hover:text-cyan-300'}`}
              onClick={() => handleCommentVote(detailReport.id, comment.id, 'like')}
            >
              <FaThumbsUp /> {comment.likes}
            </button>
            <button
              className={`flex items-center gap-1 ${commentVotes[comment.id]==='dislike' ? 'text-red-500' : 'text-red-400 hover:text-red-300'}`}
              onClick={() => handleCommentVote(detailReport.id, comment.id, 'dislike')}
            >
              <FaThumbsDown /> {comment.dislikes}
            </button>
            <button className="text-gray-400 hover:text-white text-xs" onClick={() => {
              setReplyTo(comment.id);
              // Si el textarea no empieza con @NombreUsuario, anteponerlo
              const mention = `@${comment.user.name} `;
              if (!commentText.startsWith(mention)) setCommentText(mention);
            }}>
              Responder
            </button>
          </div>
          {/* Respuesta a comentario */}
          {replyTo === comment.id && (
            <div className="ml-10 flex flex-col gap-2 mt-1">
              <textarea className="px-4 py-2 rounded bg-[#181c24] text-white min-h-[40px]" placeholder="Escribe una respuesta..." value={commentText} onChange={e => setCommentText(e.target.value)} />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-cyan-500 text-white rounded font-bold" onClick={() => {
                  if (commentText.trim() === '') return;
                  handleAddComment(detailReport.id, commentText, comment.id);
                  setCommentText('');
                  setReplyTo(null);
                }}>
                  Responder
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded font-bold" onClick={() => setReplyTo(null)}>Cancelar</button>
              </div>
            </div>
          )}
          {/* Hilos */}
          {comment.replies && comment.replies.length > 0 && renderComments(comment.replies, level + 1, reportId)}
        </div>
      ))}
      {/* Nuevo comentario raíz */}
      {level === 0 && (
        <div className="mt-2 flex flex-col gap-2">
          <textarea className="px-4 py-2 rounded bg-[#181c24] text-white min-h-[40px]" placeholder="Escribe un comentario..." value={replyTo === null ? commentText : ''} onChange={e => setCommentText(e.target.value)} />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-cyan-500 text-white rounded font-bold" onClick={() => {
              if (commentText.trim() === '') return;
              handleAddComment(detailReport.id, commentText);
              setCommentText('');
            }}>
              Comentar
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Vista previa de archivo
  const renderAttachmentPreview = (file: File) => {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith('image/')) {
      return <img src={url} alt={file.name} className="max-h-48 rounded-lg border-2 border-[#4fc3f7] shadow mb-2" />;
    }
    if (file.type === 'application/pdf') {
      return <iframe src={url} title={file.name} className="w-full h-48 rounded-lg border-2 border-[#4fc3f7] shadow mb-2" />;
    }
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline flex items-center gap-1 mb-2">
        <FaPaperclip /> {file.name}
      </a>
    );
  };

  // Función para limpiar el formulario de reporte
  const resetReportForm = () => {
    setForm({ title: '', description: '', type: '', difficulty: '', attachments: [] });
    setFilePreviews([]);
    setFormErrors({});
  };

  // Actualiza detailReport cuando cambian los reports
  React.useEffect(() => {
    if (detailReport) {
      const updated = reports.find(r => r.id === detailReport.id);
      if (updated) setDetailReport(updated);
    }
  }, [reports]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-2 bg-gradient-to-br from-[#181c24] via-[#23273a] to-[#181c24]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#4fc3f7] mb-10 tracking-wide drop-shadow-lg text-center">Reportes</h1>
      {/* Botón para abrir modal de nuevo reporte */}
      <button
        className="mb-8 px-6 py-3 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-bold shadow hover:scale-105 transition text-lg"
        onClick={() => setShowModal(true)}
      >
        <FaPlus /> Nuevo reporte
      </button>
      {/* Modal de nuevo reporte */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in" onClick={() => { setShowModal(false); resetReportForm(); }}>
          <form
            className="bg-[#181c24] border-2 border-[#4fc3f7] rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 relative animate-modal-in"
            onClick={e => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
        <h2 className="text-2xl font-bold text-[#4fc3f7] mb-2">Subir nuevo reporte</h2>
        <input
          type="text"
          placeholder="Título"
          className={`px-4 py-2 rounded bg-[#23273a] text-white ${formErrors.title ? 'border-2 border-red-500' : ''}`}
          value={form.title}
          onChange={e => {
            setForm(f => ({ ...f, title: e.target.value }));
            if (formErrors.title && e.target.value.trim()) {
              setFormErrors(errors => ({ ...errors, title: undefined }));
            }
          }}
        />
        {formErrors.title && (
          <span className="text-xs text-red-400 mt-1 block animate-pulse">{formErrors.title}</span>
        )}
        <textarea
          placeholder="Descripción"
          className={`px-4 py-2 rounded bg-[#23273a] text-white min-h-[80px] ${formErrors.description ? 'border-2 border-red-500' : ''}`}
          value={form.description}
          onChange={e => {
            setForm(f => ({ ...f, description: e.target.value }));
            if (formErrors.description && e.target.value.trim()) {
              setFormErrors(errors => ({ ...errors, description: undefined }));
            }
          }}
        />
        {formErrors.description && (
          <span className="text-xs text-red-400 mt-1 block animate-pulse">{formErrors.description}</span>
        )}
            <div className="flex flex-wrap gap-4"> {/* Cambiado a flex-wrap para evitar overflow */}
              <select
                className={`px-3 py-1.5 rounded bg-[#23273a] text-white text-sm flex-1 h-9 min-h-0 ${formErrors.type ? 'border-2 border-red-500' : ''}`}
                value={form.type}
                onChange={e => {
                  setForm(f => ({ ...f, type: e.target.value }));
                  if (formErrors.type && e.target.value) {
                    setFormErrors(errors => ({ ...errors, type: undefined }));
                  }
                }}
              >
            <option value="">Tipo de vulnerabilidad</option>
            <option value="SQL Injection">SQL Injection</option>
            <option value="XSS">XSS</option>
            <option value="CSRF">CSRF</option>
            <option value="IDOR">IDOR</option>
            <option value="Otra">Otra</option>
          </select>
            </div>
            {formErrors.type && (
              <span className="text-xs text-red-400 mt-1 block animate-pulse">{formErrors.type}</span>
            )}
            <label className="flex items-center gap-2 text-[#bfcfff] cursor-pointer mt-2">
              <FaPaperclip /> Adjuntar archivos
              <input
                type="file"
                multiple
                className="hidden"
                disabled={form.attachments.length >= 3}
                onChange={e => {
                  let files = e.target.files ? Array.from(e.target.files) : [];
                  // Limitar a máximo 3 archivos en total
                  if (form.attachments.length + files.length > 3) {
                    files = files.slice(0, 3 - form.attachments.length);
                  }
                  const newFiles = [...form.attachments, ...files];
                  setForm(f => ({ ...f, attachments: newFiles }));
                  setFilePreviews(pre => [...pre, ...files.map(file => URL.createObjectURL(file))]);
                  if (formErrors.attachments && newFiles.length > 0) {
                    setFormErrors(errors => ({ ...errors, attachments: undefined }));
                  }
                }}
              />
              {form.attachments.length >= 3 && (
                <span className="text-xs text-red-400 ml-2">Máximo 3 archivos</span>
              )}
            </label>
            {formErrors.attachments && (
              <span className="text-xs text-red-400 mt-1 block animate-pulse">{formErrors.attachments}</span>
            )}
            {/* Vista previa de archivos adjuntos */}
            {form.attachments.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                {form.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {/* Vista previa según tipo */}
                    {file.type.startsWith('image/') && filePreviews[idx] && (
                      <img src={filePreviews[idx]} alt={file.name} className="max-h-24 rounded border border-gray-700" />
                    )}
                    {file.type === 'application/pdf' && filePreviews[idx] && (
                      <embed src={filePreviews[idx]} type="application/pdf" className="w-32 h-24 border border-gray-700 rounded" />
                    )}
                    {!file.type.startsWith('image/') && file.type !== 'application/pdf' && (
                      <span className="text-xs text-gray-400 flex items-center gap-1"><FaPaperclip /> {file.name}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = form.attachments.filter((_, i) => i !== idx);
                        setForm(f => ({ ...f, attachments: newFiles }));
                        setFilePreviews(pre => pre.filter((_, i) => i !== idx));
                      }}
                      className="text-xs text-red-400 hover:underline ml-2"
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2 items-center mt-2"> {/* Dificultad ahora debajo del input de archivos */}
              {difficultyOptions.map(opt => (
                <button
                  type="button"
                  key={opt.value}
                  className={`px-4 py-2 rounded-full font-bold text-white shadow transition border-2 border-transparent ${form.difficulty === opt.value ? `${opt.color} scale-105 border-white` : 'bg-[#23273a] hover:scale-105 hover:border-[#4fc3f7]'}`}
                  onClick={() => {
                    setForm(f => ({ ...f, difficulty: opt.value }));
                    if (formErrors.difficulty) {
                      setFormErrors(errors => ({ ...errors, difficulty: undefined }));
                    }
                  }}
                >
                  {opt.value}
                </button>
              ))}
            </div>
            {formErrors.difficulty && (
              <span className="text-xs text-red-400 mt-1 block animate-pulse">{formErrors.difficulty}</span>
            )}
            <div className="flex gap-4 justify-end mt-2">
              <button type="button" className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700" onClick={() => { setShowModal(false); resetReportForm(); }}>
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 font-bold">
                Subir reporte
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Modal de detalle de reporte */}
      {detailReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in" onClick={() => setDetailReport(null)}>
          <div className="bg-[#181c24] border-2 border-[#4fc3f7] rounded-2xl shadow-2xl p-8 w-full max-w-2xl flex flex-col gap-4 relative animate-modal-in" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700" onClick={() => setDetailReport(null)}>
              ✕
            </button>
            <div className="flex items-center gap-3 mb-2">
              {detailReport.user.avatar ? (
                <img src={detailReport.user.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
              ) : (
                defaultAvatar
              )}
              <span className="font-bold text-[#4fc3f7] text-lg">{detailReport.user.name}</span>
              <span className="text-xs text-gray-400 ml-2">{new Date(detailReport.createdAt).toLocaleString()}</span>
              <span className="ml-auto text-xs text-[#bfcfff]">{detailReport.type} | {detailReport.difficulty}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{detailReport.title}</h3>
            <p className="text-[#bfcfff] mb-2">{detailReport.description}</p>
            {detailReport.attachments && detailReport.attachments.length > 0 && (
              <div className="flex flex-col gap-2 mb-2">
                {detailReport.attachments.map((file: File, i: number) => (
                  <div key={i}>{renderAttachmentPreview(file)}</div>
                ))}
              </div>
            )}
            <div className="flex gap-4 items-center mb-2">
              <button className={`flex items-center gap-1 ${userVotes[detailReport.id]==='like' ? 'text-blue-400' : 'text-cyan-400 hover:text-cyan-300'}`} onClick={() => handleVote(detailReport.id, 'like')}><FaThumbsUp /> {detailReport.likes}</button>
              <button className={`flex items-center gap-1 ${userVotes[detailReport.id]==='dislike' ? 'text-red-500' : 'text-red-400 hover:text-red-300'}`} onClick={() => handleVote(detailReport.id, 'dislike')}><FaThumbsDown /> {detailReport.dislikes}</button>
              {/* Editar/Eliminar solo para el autor (simulado) */}
              {(detailReport.user.name === currentUser.name || currentUser.isAdmin) && (
                <>
                  <button className="ml-auto text-xs text-yellow-400 hover:text-yellow-200" onClick={() => handleEditReport(detailReport)}>Editar</button>
                  <button className="text-xs text-red-400 hover:text-red-200" onClick={() => handleDeleteReport(detailReport.id)}>Eliminar</button>
                </>
              )}
            </div>
            {/* Comentarios (modo clásico de foros) */}
            <div className="mt-2 max-h-72 overflow-y-auto pr-2">
              {renderComments(detailReport.comments, 0, detailReport.id)}
            </div>
            {/* Modal de edición de reporte */}
            {editForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in" onClick={() => setEditForm(null)}>
                <form
                  className="bg-[#181c24] border-2 border-[#4fc3f7] rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 relative animate-modal-in"
                  onClick={e => e.stopPropagation()}
                  onSubmit={handleEditSubmit}
                >
                  <h2 className="text-2xl font-bold text-[#4fc3f7] mb-2">Editar reporte</h2>
                  <input type="text" placeholder="Título" className="px-4 py-2 rounded bg-[#23273a] text-white" value={editForm.title} onChange={e => setEditForm((f: any) => ({ ...f, title: e.target.value }))} />
                  <textarea placeholder="Descripción" className="px-4 py-2 rounded bg-[#23273a] text-white min-h-[80px]" value={editForm.description} onChange={e => setEditForm((f: any) => ({ ...f, description: e.target.value }))} />
                  <div className="flex flex-wrap gap-4">
                    <select className="px-3 py-1.5 rounded bg-[#23273a] text-white text-sm flex-1 h-9 min-h-0" value={editForm.type} onChange={e => setEditForm((f: any) => ({ ...f, type: e.target.value }))} >
                      <option value="">Tipo de vulnerabilidad</option>
                      <option value="SQL Injection">SQL Injection</option>
                      <option value="XSS">XSS</option>
                      <option value="CSRF">CSRF</option>
                      <option value="IDOR">IDOR</option>
                      <option value="Otra">Otra</option>
          </select>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center mt-2"> {/* Pills de dificultad con wrap */}
                    {difficultyOptions.map(opt => (
                      <button
                        type="button"
                        key={opt.value}
                        className={`px-4 py-2 rounded-full font-bold text-white shadow transition border-2 border-transparent ${editForm.difficulty === opt.value ? `${opt.color} scale-105 border-white` : 'bg-[#23273a] hover:scale-105 hover:border-[#4fc3f7]'}`}
                        onClick={() => setEditForm((f: any) => ({ ...f, difficulty: opt.value }))}
                      >
                        {opt.value}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4 justify-end mt-2">
                    <button type="button" className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700" onClick={() => setEditForm(null)}>
                      Cancelar
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 font-bold">
                      Guardar cambios
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Feed de reportes */}
      <div className="w-full max-w-2xl flex flex-col gap-8">
        {reports.map(report => (
          <div key={report.id} className="bg-[#23273a] border-2 border-[#4fc3f7] rounded-2xl shadow-xl p-6 cursor-pointer hover:scale-[1.02] transition" onClick={() => setDetailReport(report)}>
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
                {report.attachments.map((file: File, i: number) => (
                  <span key={i} className="text-xs text-[#bfcfff] bg-[#181c24] px-2 py-1 rounded flex items-center gap-1"><FaPaperclip /> {file.name}</span>
                ))}
              </div>
            )}
            <div className="flex gap-4 items-center mb-2">
              <button onClick={e => { e.stopPropagation(); handleVote(report.id, 'like'); }} className={`flex items-center gap-1 ${userVotes[report.id]==='like' ? 'text-blue-400' : 'text-cyan-400 hover:text-cyan-300'}`}><FaThumbsUp /> {report.likes}</button>
              <button onClick={e => { e.stopPropagation(); handleVote(report.id, 'dislike'); }} className={`flex items-center gap-1 ${userVotes[report.id]==='dislike' ? 'text-red-500' : 'text-red-400 hover:text-red-300'}`}><FaThumbsDown /> {report.dislikes}</button>
              <button onClick={e => { e.stopPropagation(); setDetailReport(report); }} className="flex items-center gap-1 text-[#bfcfff] hover:text-white"><FaCommentDots /> Ver detalles</button>
              {/* Editar/Eliminar solo para el autor (simulado) */}
              {(report.user.name === currentUser.name || currentUser.isAdmin) && (
                <>
                  <button className="text-xs text-yellow-400 hover:text-yellow-200" onClick={() => setEditForm({ ...report })}>Editar</button>
                  <button className="text-xs text-red-400 hover:text-red-200" onClick={() => handleDeleteReport(report.id)}>Eliminar</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports; 