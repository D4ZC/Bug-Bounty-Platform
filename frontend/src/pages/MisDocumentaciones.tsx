import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Publication, Vulnerability, PublicationForm } from '../types';
import apiService from '../services/api';
import { toast } from 'react-hot-toast';

const MisDocumentaciones: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [formData, setFormData] = useState<PublicationForm>({
    title: '',
    description: '',
    content: '',
    vulnerabilityId: '',
    tags: []
  });

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [publicationsRes, vulnerabilitiesRes] = await Promise.all([
        apiService.get<Publication[]>(`/publications/user/${user?._id}`),
        apiService.get<Vulnerability[]>('/vulnerabilities?status=resolved')
      ]);
      setPublications(publicationsRes.data || []);
      setVulnerabilities(vulnerabilitiesRes.data || []);
    } catch (error) {
      toast.error('Error al cargar tus documentaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.vulnerabilityId) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }
    try {
      const response = await apiService.post<Publication>('/publications', formData);
      setPublications(prev => [response.data, ...prev]);
      setShowCreateForm(false);
      setFormData({ title: '', description: '', content: '', vulnerabilityId: '', tags: [] });
      toast.success('Documentación enviada para revisión');
    } catch (error) {
      toast.error('Error al enviar la documentación');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPublication) return;
    try {
      await apiService.put(`/publications/${selectedPublication._id}`, formData);
      setPublications(prev => prev.map(pub => pub._id === selectedPublication._id ? { ...pub, ...formData } : pub));
      setShowEditForm(false);
      setSelectedPublication(null);
      toast.success('Documentación actualizada');
    } catch (error) {
      toast.error('Error al actualizar la documentación');
    }
  };

  const handleDelete = async (publicationId: string) => {
    if (!window.confirm('¿Estás seguro de eliminar esta documentación?')) return;
    try {
      await apiService.delete(`/publications/${publicationId}`);
      setPublications(prev => prev.filter(pub => pub._id !== publicationId));
      toast.success('Documentación eliminada');
    } catch (error) {
      toast.error('Error al eliminar la documentación');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#00fff7] text-xl">
        Debes iniciar sesión para gestionar tus documentaciones.
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a183d] via-[#1a0033] to-[#2d003e] font-mono transition-colors duration-500">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#00fff7] drop-shadow-[0_0_8px_#00fff7] mb-4 font-mono">
            Mis Documentaciones
          </h1>
          <p className="text-lg text-[#00fff7] max-w-2xl mx-auto font-mono">
            Gestiona tus documentaciones: crea, edita o elimina tus aportes sobre cómo resolviste vulnerabilidades.
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowCreateForm(true);
              setFormData({ title: '', description: '', content: '', vulnerabilityId: '', tags: [] });
            }}
            className="px-8 py-4 bg-[#00fff7] text-black font-bold text-xl rounded-xl shadow-[0_0_16px_#00fff7] transition hover:bg-[#39ff14] font-mono animate-glow"
          >
            + Nueva Documentación
          </motion.button>
        </div>
        {/* Lista de mis documentaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication) => (
            <motion.div
              key={publication._id}
              whileHover={{ scale: 1.02 }}
              className="border-2 border-[#00fff7] rounded-xl p-6 bg-[#181a20]/90 shadow-[0_0_24px_#00fff7] font-mono animate-fade-in-up cursor-pointer"
              onClick={() => {
                setSelectedPublication(publication);
                setFormData({
                  title: publication.title,
                  description: publication.description,
                  content: publication.content,
                  vulnerabilityId: publication.vulnerabilityId,
                  tags: publication.tags
                });
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#00fff7] line-clamp-2 font-mono">{publication.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                  publication.status === 'approved' ? 'bg-green-500' :
                  publication.status === 'pending_review' ? 'bg-yellow-500' :
                  publication.status === 'rejected' ? 'bg-red-500' :
                  'bg-gray-500 text-white'
                }`}>
                  {publication.status === 'approved' && 'Aprobada'}
                  {publication.status === 'pending_review' && 'Pendiente de Revisión'}
                  {publication.status === 'rejected' && 'Rechazada'}
                  {publication.status === 'draft' && 'Borrador'}
                </span>
              </div>
              <p className="text-[#00fff7] mb-4 line-clamp-3 font-mono">{publication.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {publication.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-[#00fff7] text-black rounded-full text-xs font-bold font-mono animate-glow">
                    {tag}
                  </span>
                ))}
                {publication.tags.length > 3 && (
                  <span className="px-2 text-gray-500 rounded-full text-xs font-mono">
                    +{publication.tags.length - 3}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-[#00fff7] font-mono">
                <span>Vulnerabilidad: {publication.vulnerabilityTitle}</span>
                <span className="text-[#39ff14] font-bold font-mono">+{publication.pointsAwarded} pts</span>
              </div>
              <div className="mt-4 text-xs text-[#00fff7] flex justify-between font-mono">
                <span>{new Date(publication.createdAt).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setShowEditForm(true);
                      setSelectedPublication(publication);
                      setFormData({
                        title: publication.title,
                        description: publication.description,
                        content: publication.content,
                        vulnerabilityId: publication.vulnerabilityId,
                        tags: publication.tags
                      });
                    }}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs font-bold font-mono"
                  >
                    Editar
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(publication._id);
                    }}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-bold font-mono"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {publications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#00fff7] text-lg font-mono">No tienes documentaciones aún</p>
            <p className="text-[#00fff7] text-sm mt-2 font-mono">¡Comienza a compartir tu conocimiento!</p>
          </div>
        )}
      </div>
      {/* Modal de creación */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#00fff7] rounded-xl p-8 bg-[#181a20]/90 shadow-[0_0_24px_#00fff7] font-mono animate-fade-in-up"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#00fff7] font-mono">Nueva Documentación</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-[#00fff7] hover:text-white text-2xl font-mono"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-[#00fff7] font-bold mb-2 font-mono">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
                  placeholder="Título descriptivo de tu documentación"
                />
              </div>
              <div>
                <label className="block text-[#00fff7] font-bold mb-2 font-mono">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
                  placeholder="Breve descripción de tu documentación"
                />
              </div>
              <div>
                <label className="block text-[#00fff7] font-bold mb-2 font-mono">Vulnerabilidad Asociada *</label>
                <select
                  value={formData.vulnerabilityId}
                  onChange={(e) => setFormData({ ...formData, vulnerabilityId: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
                >
                  <option value="">Selecciona una vulnerabilidad resuelta</option>
                  {vulnerabilities.map((vuln) => (
                    <option key={vuln._id} value={vuln._id}>
                      {vuln.title} ({vuln.severity})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#00fff7] font-bold mb-2 font-mono">Contenido Detallado *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
                  placeholder="Explica detalladamente cómo resolviste la vulnerabilidad, incluyendo pasos, herramientas utilizadas, código de ejemplo, etc."
                />
              </div>
              <div>
                <label className="block text-[#00fff7] font-bold mb-2 font-mono">Tags (separados por comas)</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
                  placeholder="web, sql-injection, owasp, etc."
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#00fff7] text-black font-bold rounded-lg hover:bg-[#39ff14] transition font-mono animate-glow"
                >
                  Enviar para Revisión
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 py-3 border-2 border-[#00fff7] text-[#00fff7] font-bold rounded-lg hover:bg-[#00fff7] hover:text-black transition font-mono animate-glow"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      {/* Modal de edición */}
      {showEditForm && selectedPublication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#00fff7] rounded-xl p-8 bg-[#181a20]/90 shadow-[0_0_24px_#00fff7] font-mono animate-fade-in-up"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#00fff7] font-mono">Editar Documentación</h2>
              <button
                onClick={() => setShowEditForm(false)}
                className="text-[#00fff7] hover:text-white text-2xl font-mono"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-6">
              <div>
                <label className="block text-[#00fff7] font-bold mb-2 font-mono">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
                  placeholder="Título descriptivo de tu documentación"
                />
              </div>
              <div>
                <label className="block text-[#00fff7] font-bold mb-2 font-mono">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
                  placeholder="Breve descripción de tu documentación"
                />
              </div>
              <div>
                <label className="block text-[#00fff7] font-bold mb-2 font-mono">Vulnerabilidad Asociada *</label>
                <select
                  value={formData.vulnerabilityId}
                  onChange={(e) => setFormData({ ...formData, vulnerabilityId: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
                >
                  <option value="">Selecciona una vulnerabilidad resuelta</option>
                  {vulnerabilities.map((vuln) => (
                    <option key={vuln._id} value={vuln._id}>
                      {vuln.title} ({vuln.severity})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#00fff7] font-bold mb-2 font-mono">Contenido Detallado *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
                  placeholder="Explica detalladamente cómo resolviste la vulnerabilidad, incluyendo pasos, herramientas utilizadas, código de ejemplo, etc."
                />
              </div>
              <div>
                <label className="block text-[#00fff7] font-bold mb-2 font-mono">Tags (separados por comas)</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
                  placeholder="web, sql-injection, owasp, etc."
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition font-mono animate-glow"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="flex-1 py-3 border-2 border-[#00fff7] text-[#00fff7] font-bold rounded-lg hover:bg-[#00fff7] hover:text-black transition font-mono animate-glow"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MisDocumentaciones; 