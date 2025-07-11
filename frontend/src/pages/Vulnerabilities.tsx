import React, { useState } from 'react';
import Modal from '../components/ui/Modal';

const Vulnerabilities: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular envío
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
      setForm({ title: '', description: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white">
      <form onSubmit={handleSubmit} className="bg-black/80 border-2 border-cyan-400 neon-shadow rounded-2xl p-8 w-full max-w-md flex flex-col gap-4 animate-pop-in">
        <h2 className="text-3xl font-extrabold text-cyan-200 mb-4 text-center drop-shadow-cyber">Reportar Vulnerabilidad</h2>
        <input
          type="text"
          name="title"
          placeholder="Título de la vulnerabilidad"
          className="p-3 rounded bg-gray-900 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 focus:scale-105"
          value={form.title}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <textarea
          name="description"
          placeholder="Descripción detallada"
          className="p-3 rounded bg-gray-900 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 focus:scale-105"
          value={form.description}
          onChange={handleChange}
          required
          disabled={loading}
          rows={4}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-full shadow-cyber hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus:ring-2 focus:ring-cyan-400 transition-all duration-200 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar vulnerabilidad'}
        </button>
      </form>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="¡Vulnerabilidad enviada!"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-5xl animate-bounce">✅</span>
          <p className="text-lg font-bold text-cyan-200 text-center">¡Gracias por tu contribución!<br />Nuestro equipo revisará tu reporte y te notificará pronto.</p>
          <button
            onClick={() => setShowModal(false)}
            className="mt-4 bg-cyan-600 text-white font-bold px-6 py-2 rounded-full hover:bg-cyan-700 transition"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Vulnerabilities;
