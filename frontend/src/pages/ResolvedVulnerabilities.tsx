import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  TextInput,
  TextArea,
  Select,
  SelectItem,
  FileUploader,
  Tag,
} from '@carbon/react';
import { Add } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

const difficulties = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'impossible', label: 'IMPOSSIBLE!!' },
];

const initialForm = {
  difficulty: '',
  tools: '',
  time: '',
  description: '',
  doc: null,
};

const ResolvedVulnerabilities: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [vulns, setVulns] = useState<any[]>([]);
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);
  const [detailVuln, setDetailVuln] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [deleteTimer, setDeleteTimer] = useState(5);

  // Leer de localStorage al cargar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('resolvedVulns') || '[]');
    setVulns(stored);
  }, []);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSelect = (e: any) => {
    setForm((prev) => ({ ...prev, difficulty: e.target.value }));
  };

  const handleSubmit = () => {
    setVulns((prev) => [...prev, form]);
    setForm(initialForm);
    setModalOpen(false);
  };

  // Guardar cambios de edición
  const handleSave = (idx: number) => {
    const updated = [...vulns];
    updated[idx] = editData;
    setVulns(updated);
    localStorage.setItem('resolvedVulns', JSON.stringify(updated));
    setEditIdx(null);
    setEditData(null);
  };

  // Eliminar vulnerabilidad
  const handleDelete = (idx: number) => {
    const updated = vulns.filter((_, i) => i !== idx);
    setVulns(updated);
    localStorage.setItem('resolvedVulns', JSON.stringify(updated));
  };

  // Descargar documento
  const handleDownload = (docName: string) => {
    // No hay archivo real, solo nombre, así que muestra alerta
    alert('Solo se almacena el nombre del archivo. No hay archivo real para descargar: ' + docName);
  };

  // Iniciar proceso de eliminación
  const startDeleteProcess = (idx: number) => {
    setDeleteIdx(idx);
    setShowDeleteConfirm(true);
    setDeleteTimer(5);
    
    const interval = setInterval(() => {
      setDeleteTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Cancelar eliminación
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteIdx(null);
    setDeleteTimer(5);
  };

  // Confirmar eliminación
  const confirmDelete = () => {
    if (deleteIdx !== null) {
      handleDelete(deleteIdx);
      setShowDeleteConfirm(false);
      setDeleteIdx(null);
      setDeleteTimer(5);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap gap-4 pb-4 max-w-full">
        {vulns.length === 0 ? (
          <div className="text-gray-500">No hay vulnerabilidades resueltas aún.</div>
        ) : (
          vulns.map((v, idx) => (
            <div
              key={idx}
              className="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={e => {
                // Evitar abrir modal si se hace click en el botón Editar
                if ((e.target as HTMLElement).closest('button')) return;
                setDetailVuln({ ...v, idx });
                setShowDetail(true);
              }}
            >
              <div className="flex items-center mb-2">
                {/* Criticidad y fecha solo visual, edición redirige a Contributions */}
                <>
                  <span
                    className={
                      `mr-2 font-bold text-lg ` +
                      (v.criticidad === 'Low' ? 'text-green-600' :
                       v.criticidad === 'Medium' ? 'text-yellow-500' :
                       v.criticidad === 'High' ? 'text-red-500' :
                       v.criticidad === 'Critical' ? 'critical-breathing' :
                       'text-black')
                    }
                  >
                    {v.criticidad}
                  </span>
                  <span className="font-bold text-base text-black ml-8">{v.fecha}</span>
                </>
              </div>
              {/* Visualización normal */}
              <>
                <div className="mb-1 text-black font-normal truncate-3-lines" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'}}>{v.vulnerabilidad}</div>
                <div className="text-sm mb-2 text-black font-normal truncate-3-lines" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'}}>{v.descripcion}</div>
                <div className="text-xs mt-2 text-black font-normal flex items-center">
                  {v.documento || 'Sin documentación adjunta'}
                  {v.documento && (
                    <button
                      type="button"
                      className="ml-2 p-1 rounded hover:bg-blue-100 text-blue-700"
                      onClick={() => handleDownload(v.documento)}
                      title="Descargar documento"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 20h16M12 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                  )}
                </div>
              </>
              <div className="flex gap-2 mt-4 justify-end">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => navigate('/contributions', { state: { editVuln: v, editIdx: idx } })}
                >Editar</button>
                <button
                  className="px-3 py-1 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition-all duration-300 ease-in-out"
                  onClick={() => startDeleteProcess(idx)}
                >Borrar</button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal de detalle personalizado */}
      {showDetail && detailVuln && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo semitransparente */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-fade-in" onClick={() => setShowDetail(false)} />
          {/* Cuadro modal */}
          <div className="relative z-50 w-full max-w-2xl h-auto overflow-y-visible mx-auto bg-white rounded-lg shadow-lg p-6 animate-slide-fade-modal">
            <button
              className="fixed top-6 right-6 p-3 rounded-full bg-white shadow-lg hover:bg-gray-200 z-[100] transition-colors"
              onClick={() => setShowDetail(false)}
              title="Minimizar"
            >
              {/* Ícono minimizar */}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M5 12h14" stroke="#000" strokeWidth="3" strokeLinecap="round"/></svg>
            </button>
            <div className="flex items-center justify-between mb-4">
              <span className={`font-bold text-lg ${
                detailVuln.criticidad === 'Low' ? 'text-green-600' :
                detailVuln.criticidad === 'Medium' ? 'text-yellow-500' :
                detailVuln.criticidad === 'High' ? 'text-red-500' :
                detailVuln.criticidad === 'Critical' ? 'critical-breathing' :
                'text-black'
              }`}>{detailVuln.criticidad}</span>
              <span className="font-bold text-base text-black ml-8">{detailVuln.fecha}</span>
            </div>
            <div className="mb-1 text-black font-bold text-lg">{detailVuln.vulnerabilidad}</div>
            <div className="text-black font-normal whitespace-pre-line break-words" style={{wordBreak: 'break-word', whiteSpace: 'pre-line'}}>{detailVuln.descripcion}</div>
            <div className="text-xs mt-2 text-black font-normal flex items-center">
              {detailVuln.documento || 'Sin documentación adjunta'}
              {detailVuln.documento && (
                <button
                  type="button"
                  className="ml-2 p-1 rounded hover:bg-blue-100 text-blue-700"
                  onClick={() => {
                    alert('Solo se almacena el nombre del archivo. No hay archivo real para descargar: ' + detailVuln.documento);
                  }}
                  title="Descargar documento"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 20h16M12 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                onClick={() => {
                  setShowDetail(false);
                  navigate('/contributions', { state: { editVuln: detailVuln, editIdx: detailVuln.idx } });
                }}
              >
                {/* Ícono lápiz */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" className="mr-1"><path d="M16.862 5.487a2.06 2.06 0 0 1 2.915 2.914l-9.193 9.193-3.06.34a.75.75 0 0 1-.83-.83l.34-3.06 9.193-9.193Zm0 0 2.651 2.651" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Editar
              </button>
            </div>
          </div>
          <style>{`
            .animate-fade-in {
              animation: fadeInBg 0.2s;
            }
            @keyframes fadeInBg {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-slide-fade-modal {
              animation: slideFadeInModal 0.25s cubic-bezier(0.4,0,0.2,1);
            }
            @keyframes slideFadeInModal {
              from { opacity: 0; transform: translateY(-30px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo semitransparente */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-fade-in" onClick={cancelDelete} />
          {/* Cuadro modal */}
          <div className="relative z-50 w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 animate-slide-fade-modal">
            <div className="text-center">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" className="mx-auto mb-4 text-red-500">
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-lg font-bold text-gray-900 mb-2">¿Eliminar?</h3>
                <p className="text-gray-600 mb-6">
                  ¿Estás seguro que quieres eliminar la vulnerabilidad? <span className="text-red-600 font-bold uppercase">ESTO NO SE PUEDE DESHACER.</span>
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                  onClick={cancelDelete}
                >
                  Cancelar
                </button>
                <button
                  className={`px-4 py-2 rounded transition-colors ${
                    deleteTimer > 0 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                  onClick={confirmDelete}
                  disabled={deleteTimer > 0}
                >
                  {deleteTimer > 0 ? `Eliminar (${deleteTimer}s)` : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .truncate-3-lines {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .animate-slide-fade {
          animation: slideFadeIn 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideFadeIn {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .critical-breathing {
          animation: alarm 1.5s ease-in-out infinite;
          color: #dc2626;
          font-weight: 900;
          text-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
        }
        @keyframes alarm {
          0%, 100% {
            opacity: 1;
            color: #dc2626;
            transform: scale(1);
            text-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
          }
          25% {
            opacity: 0.8;
            color: #ef4444;
            transform: scale(1.1);
            text-shadow: 0 0 15px rgba(239, 68, 68, 0.8);
          }
          50% {
            opacity: 1;
            color: #b91c1c;
            transform: scale(1);
            text-shadow: 0 0 20px rgba(185, 28, 28, 0.9);
          }
          75% {
            opacity: 0.9;
            color: #dc2626;
            transform: scale(1.05);
            text-shadow: 0 0 12px rgba(220, 38, 38, 0.7);
          }
        }
      `}</style>
    </div>
  );
};

export default ResolvedVulnerabilities; 