import React, { useState } from 'react';

interface Report {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
  fileName: string;
  username: string;
  date: string;
}

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'review'>('form');
  const [reports, setReports] = useState<Report[]>([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    file: null as File | null,
    fileUrl: '',
    fileName: '',
    username: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setForm({
        ...form,
        file,
        fileUrl: URL.createObjectURL(file),
        fileName: file.name,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: Report = {
      id: Date.now().toString(),
      name: form.name,
      description: form.description,
      fileUrl: form.fileUrl,
      fileName: form.fileName,
      username: form.username,
      date: new Date().toISOString().slice(0, 10),
    };
    setReports([newReport, ...reports]);
    setForm({ name: '', description: '', file: null, fileUrl: '', fileName: '', username: '' });
    setActiveTab('review');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const handleDeleteClick = (report: Report) => {
    setReportToDelete(report);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (reportToDelete) {
      setReports(reports => reports.filter(r => r.id !== reportToDelete.id));
      setShowDeleteModal(false);
      setReportToDelete(null);
    }
  };

  return (
    <div className="w-full h-full">
      {/* Alerta de éxito */}
      {showSuccess && (
        <div className="mb-4 w-full max-w-lg mx-auto">
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded text-center font-semibold shadow">
            Reporte enviado correctamente.
          </div>
        </div>
      )}
      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('form')}
          className={`text-xl font-semibold focus:outline-none transition-colors ${activeTab === 'form' ? 'text-blue-700' : 'text-gray-400'}`}
        >
          Reportes
        </button>
        <span className="text-xl font-semibold text-gray-400">|</span>
        <button
          onClick={() => setActiveTab('review')}
          className={`text-xl font-semibold focus:outline-none transition-colors ${activeTab === 'review' ? 'text-blue-700' : 'text-gray-400'}`}
        >
          Revisar ({reports.length})
        </button>
      </div>

      {/* Formulario */}
      {activeTab === 'form' && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg w-full max-w-lg mx-auto flex flex-col gap-4">
          <h3 className="text-2xl font-bold mb-2">Nuevo Reporte</h3>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Nombre del reporte" className="border px-3 py-2 rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Descripción del reporte" className="border px-3 py-2 rounded h-40 resize-none" />
          <div className="flex flex-col gap-2">
            <label htmlFor="file-upload" className="text-sm text-gray-600 font-medium cursor-pointer bg-blue-50 border border-blue-200 px-4 py-2 rounded text-center hover:bg-blue-100 transition">
              {form.fileName ? `Archivo seleccionado: ${form.fileName}` : 'Selecciona un archivo de tu equipo'}
            </label>
            <input id="file-upload" type="file" onChange={handleFile} className="hidden" />
          </div>
          <input name="username" value={form.username} onChange={handleChange} required placeholder="Nombre del usuario" className="border px-3 py-2 rounded" />
          <div className="flex gap-2 mt-2 justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enviar</button>
          </div>
        </form>
      )}

      {/* Revisar */}
      {activeTab === 'review' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.length === 0 && (
            <div className="col-span-3 text-gray-400 text-center py-8">No hay reportes para revisar.</div>
          )}
          {reports.map((report, idx) => (
            <div key={report.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-start relative">
              <h4 className="text-lg font-bold mb-2 w-full text-left">{report.name}</h4>
              <div className="mb-2 w-full text-left text-gray-700">{report.description}</div>
              {report.fileUrl && (
                <a href={report.fileUrl} download={report.fileName} className="text-blue-600 underline text-sm mb-2">{report.fileName}</a>
              )}
              <div className="mt-2 flex flex-row gap-4 w-full text-xs text-gray-500 justify-between">
                <span>Fecha: {report.date}</span>
                <span>Usuario: {report.username}</span>
              </div>
              <div className="flex gap-2 mt-4 w-full justify-end">
                <button
                  onClick={() => handleDeleteClick(report)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" style={{backdropFilter: 'blur(2px)'}}>
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirmar eliminación</h3>
            <p className="text-gray-600 mb-6">¿Estás seguro que deseas eliminar este reporte?</p>
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
    </div>
  );
};

export default Reports; 