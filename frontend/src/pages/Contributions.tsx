import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import MainLayout from '../components/layouts/MainLayout';

const types = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

// Define el tipo para el formulario
interface ContributionForm {
  type: string;
  title: string;
  description: string;
  file: File | { name: string } | null;
}

const initialForm: ContributionForm = {
  type: 'low', // Valor por defecto ahora es 'low'
  title: '',
  description: '',
  file: null,
};

const Contributions: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<ContributionForm>(initialForm);
  const [contribs, setContribs] = useState<any[]>([]);
  const [showFileUploader, setShowFileUploader] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [editIdx, setEditIdx] = useState<number | null>(null);
  // Detectar si venimos de edición
  useEffect(() => {
    if (location.state && location.state.editVuln) {
      const v = location.state.editVuln;
      setForm({
        type: types.find(t => t.label === v.criticidad)?.value || '',
        title: v.vulnerabilidad,
        description: v.descripcion,
        file: v.documento ? { name: v.documento } as { name: string } : null,
      });
      setEditIdx(location.state.editIdx ?? null);
      setModalOpen(true);
    }
  }, [location.state]);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (name === 'title' && titleError) {
      setTitleError('');
    }
    if (name === 'description' && descriptionError) {
      setDescriptionError('');
    }
  };

  const handleSelect = (e: any) => {
    setForm((prev) => ({ ...prev, type: e.target.value }));
  };

  // Estados para mostrar errores de validación
  const [titleError, setTitleError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');

  // Función para limpiar errores después de 4 segundos
  const clearErrorAfterDelay = (setErrorFunction: (error: string) => void, errorMessage: string) => {
    setErrorFunction(errorMessage);
    setTimeout(() => {
      // Limpiar directamente sin animación adicional
      setErrorFunction('');
    }, 4000);
  };

  // Función de validación
  const validateForm = () => {
    let isValid = true;
    
    // Validar título (mínimo 1 carácter)
    if (!form.title || form.title.trim().length < 1) {
      clearErrorAfterDelay(setTitleError, 'El título debe tener al menos 1 carácter');
      isValid = false;
    } else {
      setTitleError('');
    }
    
    // Validar descripción (mínimo 10 caracteres)
    if (!form.description || form.description.trim().length < 10) {
      clearErrorAfterDelay(setDescriptionError, 'La descripción debe tener al menos 10 caracteres');
      isValid = false;
    } else {
      setDescriptionError('');
    }
    
    // Validar archivo si el interruptor está activado
    if (showFileUploader && !form.file) {
      clearErrorAfterDelay(setFileError, 'Debes adjuntar al menos 1 archivo');
      isValid = false;
    } else {
      setFileError('');
    }
    
    return isValid;
  };

  const handleSubmit = () => {
    // Validar antes de enviar
    if (!validateForm()) {
      return;
    }
    // Si no se selecciona criticidad, usar 'Low' por defecto
    const criticidadLabel = types.find(t => t.value === (form.type || 'low'))?.label || 'Low';
    const resolvedVuln = {
      fecha: new Date().toLocaleDateString(),
      criticidad: criticidadLabel,
      vulnerabilidad: form.title,
      descripcion: form.description,
      documento: form.file ? form.file.name : '',
    };
    const prev = JSON.parse(localStorage.getItem('resolvedVulns') || '[]');
    if (editIdx !== null && editIdx >= 0 && editIdx < prev.length) {
      // Edición: reemplazar el elemento
      prev[editIdx] = { ...prev[editIdx], ...resolvedVuln };
      localStorage.setItem('resolvedVulns', JSON.stringify(prev));
    } else {
      // Nuevo
      localStorage.setItem('resolvedVulns', JSON.stringify([...prev, resolvedVuln]));
    }
    setContribs((prev) => [...prev, form]);
    setForm(initialForm);
    setModalOpen(false);
    setEditIdx(null);
    // Guardar notificación en localStorage
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({
      id: Date.now(),
      message: 'Tu contribución ha sido enviada. Ahora estará en revisión',
      date: new Date().toLocaleDateString(),
      category: 'Contribución',
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));
    // Redirigir siempre tras guardar
    navigate('/resolved-vulnerabilities');
  };

  // Función para obtener la fecha local actual
  const getLocalDate = () => {
    const now = new Date();
    return now.toLocaleDateString();
  };

  return (
    <MainLayout>
      <div className="flex flex-col w-full px-4 md:px-8 py-6 bg-white min-h-screen">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-extrabold mr-4 text-black">Agregar Contribución</h2>
          <Button
            renderIcon={Add}
            kind="primary"
            size="md"
            onClick={() => setModalOpen(true)}
          >
            {/* Eliminar texto 'Agregar / Add' */}
          </Button>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {contribs.map((c, idx) => (
            <div
              key={idx}
              className="min-w-[350px] bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-2">
                <Tag type="blue" className="mr-2">{types.find(t => t.value === c.type)?.label}</Tag>
              </div>
              <div className="font-bold text-black mb-1 text-lg">{c.title}</div>
              <div className="text-base text-black mb-2">{c.description}</div>
              {c.file && <div className="text-xs text-black mt-2 font-semibold">Archivo: {c.file.name}</div>}
            </div>
          ))}
        </div>
        <Modal
          open={modalOpen}
          modalHeading={null}
          onRequestClose={() => setModalOpen(false)}
          size="md"
          className="animate-slide-fade bg-white"
        >
          {/* Fecha */}
          <div className="mb-4 flex">
            <div className="w-full max-w-[135px]">
              <label className="block text-black text-sm font-medium mb-1" htmlFor="fecha-contribucion">Fecha</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg>
                </span>
                <input
                  id="fecha-contribucion"
                  type="text"
                  value={getLocalDate()}
                  disabled
                  className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-gray-100 text-black text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 cursor-not-allowed opacity-80"
                />
              </div>
            </div>
          </div>
          {/* Select Criticidad */}
          <Select
            id="type"
            name="type"
            labelText={<span className="text-black">Criticidad</span>}
            value={form.type}
            onChange={handleSelect}
            required
            className="text-black"
          >
            {types.map((t) => (
              <SelectItem key={t.value} value={t.value} text={t.label} />
            ))}
          </Select>
          <div className="relative">
            <TextInput
              id="title"
              name="title"
              labelText={<span className="text-black">Vulnerabilidad</span>}
              value={form.title}
              onChange={handleChange}
              className={`mt-4 text-black placeholder-gray-400 ${titleError ? 'border-red-500' : ''}`}
              required
              placeholder="Nombre de la Vulnerabilidad"
            />
            {titleError && (
              <div className="absolute right-0 top-0 transform translate-x-full ml-2 bg-white border border-black rounded-lg p-3 shadow-lg max-w-xs z-10 animate-fade-in error-card" style={{ right: '150px' }}>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-black mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-black text-sm font-medium">{titleError}</span>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="relative">
              <span className="text-black">Descripción</span>
              {descriptionError && (
                <div className="absolute right-0 top-0 transform translate-x-full ml-2 bg-white border border-black rounded-lg p-3 shadow-lg max-w-xs z-10 animate-fade-in error-card" style={{ right: '150px' }}>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-black mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-black text-sm font-medium">{descriptionError}</span>
                  </div>
                </div>
              )}
            </div>
            <TextArea
              id="description"
              name="description"
              labelText={<span className="text-black">Descripción</span>}
              value={form.description}
              onChange={handleChange}
              className={`mt-4 text-black placeholder-gray-400 resize-none ${descriptionError ? 'border-red-500' : ''}`}
              placeholder="¿Como lo Hiciste?, ¿Que herramientas utilizaste?, ¿Cuanto tiempo te tomo?... "
              required
            />
          </div>
          {/* Interruptor para mostrar/ocultar FileUploader debajo de Descripción */}
          <div className="flex flex-col items-start mb-6 mt-2">
            <span className="mb-2 text-black text-sm font-medium">¿Deseas subir documentacion? (Te dara puntos extra)</span>
            <button
              type="button"
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${showFileUploader ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-gray-300'}`}
              onClick={() => setShowFileUploader((prev) => !prev)}
              aria-pressed={showFileUploader}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${showFileUploader ? 'translate-x-6' : 'translate-x-0'}`}></span>
            </button>
          </div>
          <div className="flex flex-col items-center mt-8">
            {showFileUploader && (
              <div className="w-full flex flex-col items-start custom-file-uploader text-black relative">
                {/* Botón 'Subir archivo' tipo Carbon */}
                <label htmlFor="file-uploader-input" className="block mb-2">
                  <button
                    type="button"
                    className={`flex items-center gap-1 font-normal rounded-lg px-6 py-3 shadow transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                      fileError ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    onClick={() => document.getElementById('file-uploader-input')?.click()}
                  >
                    {/* Ícono upload SVG estilo Carbon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 32 32" className="mr-1"><path d="M25 28H7a1 1 0 0 1-1-1v-6h2v5h16v-5h2v6a1 1 0 0 1-1 1ZM16 4l7 8h-5v9h-4v-9h-5l7-8Z" fill="currentColor"/></svg>
                    Subir archivo
                  </button>
                  <input
                    id="file-uploader-input"
                    type="file"
                    accept=".pdf,.docx"
                    style={{ display: 'none' }}
                    onChange={(e: any) => {
                      setForm((prev) => ({ ...prev, file: e.target.files[0] }));
                      // Limpiar error de archivo cuando se selecciona uno
                      if (fileError) {
                        setFileError('');
                      }
                    }}
                  />
                </label>
                {fileError && (
                  <div className="absolute right-0 top-0 transform translate-x-full ml-2 bg-white border border-black rounded-lg p-3 shadow-lg max-w-xs z-10 animate-fade-in error-card" style={{ right: '150px' }}>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-black mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-black text-sm font-medium">{fileError}</span>
                    </div>
                  </div>
                )}
                {/* Nombre del archivo subido */}
                {form.file && typeof form.file === 'object' && 'name' in form.file && (
                  <div className="flex items-center mt-2 mb-2 px-3 py-1 bg-gray-100 rounded text-blue-800 font-medium text-sm shadow-inner">
                    {/* Icono documento simple */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 32 32" className="mr-2"><rect x="8" y="6" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 12h8M12 16h8M12 20h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    {form.file.name}
                    <button
                      type="button"
                      className="ml-2 p-1 rounded hover:bg-red-100 focus:outline-none"
                      title="Eliminar documento"
                      onClick={() => setForm((prev) => ({ ...prev, file: null }))}
                    >
                      {/* Ícono bote de basura */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6h16z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    </button>
                  </div>
                )}
                {/* Descripción de archivos permitidos */}
                <div className="cds--label-description mb-4">
                  Archivos permitidos: PDF, DOCX
                </div>
              </div>
            )}
          </div>
          {/* Botón 'Publicar' personalizado tipo Carbon */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              type="button"
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-normal rounded-lg px-6 py-3 shadow transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={handleSubmit}
            >
              {/* Ícono clipboard con check */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 32 32" className="mr-1"><rect x="8" y="6" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><rect x="12" y="2" width="8" height="4" rx="1" stroke="currentColor" stroke-width="2" fill="none"/><path d="M13 18l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              {editIdx !== null ? "Editar" : "Publicar"}
            </button>
            {editIdx !== null && (
              <button
                type="button"
                className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 text-black font-normal rounded-lg px-6 py-3 shadow transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-base min-w-[120px] justify-center"
                onClick={() => { setModalOpen(false); navigate('/resolved-vulnerabilities'); }}
              >
                {/* Ícono de cancelar (X) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="mr-1"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Cancelar
              </button>
            )}
          </div>
          <style>{`
            /* Ocultar la flecha del select de Carbon */
            .cds--select__arrow {
              display: none !important;
            }
            .custom-file-uploader .cds--file-btn {
              background: linear-gradient(90deg, #2563eb 0%, #1e293b 100%);
              color: #000 !important;
              font-weight: bold;
              border-radius: 0.75rem;
              padding: 0.75rem 2.25rem 0.75rem 1rem;
              font-size: 1.1rem;
              box-shadow: 0 2px 8px rgba(37,99,235,0.18);
              transition: background 0.2s, box-shadow 0.2s;
              border: none;
              outline: none;
              margin-left: 0;
              margin-bottom: 0.5rem;
            }
            .custom-file-uploader .cds--file__selected-file,
            .custom-file-uploader .cds--file__state-container,
            .custom-file-uploader .cds--file__state-container span,
            .custom-file-uploader .cds--file__selected-file span {
              color: #000 !important;
            }
            .custom-file-uploader .cds--label-description {
              white-space: pre-line;
              max-width: 220px;
              line-height: 1.3;
              font-size: 0.98rem;
              color: #000 !important;
            }
            .cds--modal-footer .cds--btn {
              color: #000 !important;
            }
          `}</style>
        </Modal>
        <style>{`
          .animate-slide-fade {
            animation: slideFadeIn 0.25s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes slideFadeIn {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-in-out;
          }
          @keyframes fadeIn {
            from { 
              opacity: 0; 
              transform: translateX(5px) scale(0.98);
            }
            to { 
              opacity: 1; 
              transform: translateX(0) scale(1);
            }
          }
          /* Oculta el texto 'Focus sentinel' de los modales de Carbon */
          [aria-label="Focus sentinel"],
          [aria-label="Focus sentinel start"],
          [aria-label="Focus sentinel end"],
          [aria-label="Close"] {
            display: none !important;
          }
        `}</style>
      </div>
    </MainLayout>
  );
};

export default Contributions; 