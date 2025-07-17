import React, { useState } from 'react';
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

const types = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

const initialForm = {
  type: '',
  title: '',
  description: '',
  file: null,
};

const Contributions: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [contribs, setContribs] = useState<any[]>([]);
  const [showFileUploader, setShowFileUploader] = useState(true);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSelect = (e: any) => {
    setForm((prev) => ({ ...prev, type: e.target.value }));
  };

  const handleSubmit = () => {
    setContribs((prev) => [...prev, form]);
    setForm(initialForm);
    setModalOpen(false);
  };

  // Función para obtener la fecha local actual
  const getLocalDate = () => {
    const now = new Date();
    return now.toLocaleDateString();
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-8 py-6">
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-extrabold mr-4 text-black">Agregar Contribución</h2>
        <Button
          renderIcon={Add}
          kind="primary"
          size="md"
          onClick={() => setModalOpen(true)}
        >
          Agregar / Add
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
        primaryButtonText="Publicar"
        secondaryButtonText="Cancelar"
        onRequestClose={() => setModalOpen(false)}
        onRequestSubmit={handleSubmit}
        size="md"
        className="animate-slide-fade"
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
          <SelectItem value="" text="Selecciona una opción" />
          {types.map((t) => (
            <SelectItem key={t.value} value={t.value} text={t.label} />
          ))}
        </Select>
        <TextInput
          id="title"
          name="title"
          labelText={<span className="text-black">Vulnerabilidad</span>}
          value={form.title}
          onChange={handleChange}
          className="mt-4 text-black placeholder-gray-400"
          required
        />
        <TextArea
          id="description"
          name="description"
          labelText={<span className="text-black">Descripción</span>}
          value={form.description}
          onChange={handleChange}
          className="mt-4 text-black placeholder-gray-400 resize-none"
          placeholder="¿Como lo Hiciste?, ¿Que herramientas utilizaste?, ¿Cuanto tiempo te tomo?... "
          required
        />
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
            <div className="w-full flex flex-col items-start custom-file-uploader text-black">
              {/* Botón 'Elegir archivo' */}
              <label htmlFor="file-uploader-input" className="block mb-2">
                <button
                  type="button"
                  className="cds--file-btn"
                  onClick={() => document.getElementById('file-uploader-input')?.click()}
                >
                  Elegir archivo
                </button>
                <input
                  id="file-uploader-input"
                  type="file"
                  accept=".pdf,.docx"
                  style={{ display: 'none' }}
                  onChange={(e: any) => setForm((prev) => ({ ...prev, file: e.target.files[0] }))}
                />
              </label>
              {/* Archivos subidos */}
              {form.file && typeof form.file === 'object' && 'name' in form.file && (
                <div className="cds--file__selected-file mb-2 text-black font-medium">
                  {form.file.name}
                </div>
              )}
              {/* Descripción de archivos permitidos */}
              <div className="cds--label-description mb-4">
                Opcional. Archivos permitidos: PDF, DOCX
              </div>
            </div>
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
      `}</style>
    </div>
  );
};

export default Contributions; 