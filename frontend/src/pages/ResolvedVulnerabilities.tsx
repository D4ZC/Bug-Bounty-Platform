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

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold mr-4">Vulnerabilidades Resueltas / Resolved</h2>
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
        {vulns.length === 0 ? (
          <div className="text-gray-500">No hay vulnerabilidades resueltas aún.</div>
        ) : (
          vulns.map((v, idx) => (
            <div
              key={idx}
              className="min-w-[350px] bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-2">
                <Tag type="blue" className="mr-2">{difficulties.find(d => d.value === v.difficulty)?.label}</Tag>
                <span className="text-xs text-gray-400">{v.time} hrs</span>
              </div>
              <div className="font-semibold mb-1">{v.tools}</div>
              <div className="text-sm mb-2">{v.description}</div>
              <div className="text-xs text-gray-500 mt-2">{v.doc?.name || 'No docx uploaded'}</div>
            </div>
          ))
        )}
      </div>
      <Modal
        open={modalOpen}
        modalHeading="Registrar Vulnerabilidad Resuelta / Register Resolved Vulnerability"
        primaryButtonText="Publicar / Publish"
        secondaryButtonText="Cancelar / Cancel"
        onRequestClose={() => setModalOpen(false)}
        onRequestSubmit={handleSubmit}
        size="md"
        className="animate-slide-fade"
      >
        <Select
          id="difficulty"
          name="difficulty"
          labelText="Dificultad / Difficulty"
          value={form.difficulty}
          onChange={handleSelect}
          required
        >
          <SelectItem value="" text="Selecciona una opción / Select an option" />
          {difficulties.map((d) => (
            <SelectItem key={d.value} value={d.value} text={d.label} />
          ))}
        </Select>
        <TextInput
          id="tools"
          name="tools"
          labelText="Herramientas utilizadas / Tools used"
          value={form.tools}
          onChange={handleChange}
          className="mt-4"
          required
        />
        <TextInput
          id="time"
          name="time"
          labelText="Tiempo estimado (hrs) / Estimated time (hrs)"
          value={form.time}
          onChange={handleChange}
          className="mt-4"
          required
        />
        <TextArea
          id="description"
          name="description"
          labelText="Descripción detallada / Detailed description"
          value={form.description}
          onChange={handleChange}
          className="mt-4"
          required
        />
        <FileUploader
          labelTitle="Subir documentación (.docx) / Upload documentation (.docx)"
          labelDescription="Solo archivos .docx / Only .docx files"
          buttonLabel="Seleccionar archivo / Select file"
          accept={[".docx"]}
          filenameStatus="edit"
          onChange={(e: any) => setForm((prev) => ({ ...prev, doc: e.target.files[0] }))}
          className="mt-4"
        />
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

export default ResolvedVulnerabilities; 