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

  // Descargar documento
  const handleDownload = (docName: string) => {
    // No hay archivo real, solo nombre, así que muestra alerta
    alert('Solo se almacena el nombre del archivo. No hay archivo real para descargar: ' + docName);
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
                       v.criticidad === 'Critical' ? 'text-red-900' :
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
              <div className="flex gap-2 mt-4">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => navigate('/contributions', { state: { editVuln: v, editIdx: idx } })}
                >Editar</button>
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
              className="fixed top-6 right-6 p-3 rounded-full bg-white border border-blue-200 shadow-lg hover:bg-blue-100 z-[100] transition-colors"
              onClick={() => setShowDetail(false)}
              title="Minimizar"
              style={{outline: '2px solid #3b82f6', outlineOffset: '2px'}}
            >
              {/* Ícono minimizar */}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M5 12h14" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"/></svg>
            </button>
            <div className="flex items-center justify-between mb-4">
              <span className={`font-bold text-lg ${
                detailVuln.criticidad === 'Low' ? 'text-green-600' :
                detailVuln.criticidad === 'Medium' ? 'text-yellow-500' :
                detailVuln.criticidad === 'High' ? 'text-red-500' :
                detailVuln.criticidad === 'Critical' ? 'text-red-900' :
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
      `}</style>
    </div>
  );
};

export default ResolvedVulnerabilities; 