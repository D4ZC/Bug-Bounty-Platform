import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Publication } from '../types';
import apiService from '../services/api';
import { toast } from 'react-hot-toast';

const Moderation: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [pendingPublications, setPendingPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [reviewing, setReviewing] = useState(false);
  const [reviewData, setReviewData] = useState({
    status: 'approved' as 'approved' | 'rejected' | 'needs_revision',
    feedback: '',
    pointsAwarded: 0
  });

  useEffect(() => {
    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      toast.error('Acceso restringido. Solo moderadores pueden acceder a esta página.');
      return;
    }
    loadPendingPublications();
  }, [user]);

  const loadPendingPublications = async () => {
    try {
      const response = await apiService.get<Publication[]>('/publications/pending');
      setPendingPublications(response.data || []);
    } catch (error) {
      toast.error('Error al cargar las publicaciones pendientes');
    } finally {
      setLoading(false);
    }
  };

  const calculatePoints = (severity: string): number => {
    switch (severity) {
      case 'critical': return 200;
      case 'high': return 150;
      case 'medium': return 100;
      case 'low': return 50;
      default: return 25;
    }
  };

  const handleReview = async () => {
    if (!selectedPublication) return;

    if (reviewData.status === 'needs_revision' && !reviewData.feedback.trim()) {
      toast.error('Debes proporcionar feedback cuando solicitas modificaciones');
      return;
    }

    setReviewing(true);

    try {
      const points = reviewData.status === 'approved'
        ? (reviewData.pointsAwarded || calculatePoints(selectedPublication.vulnerabilitySeverity))
        : 0;

      await apiService.post(`/publications/${selectedPublication._id}/review`, {
        status: reviewData.status,
        feedback: reviewData.feedback,
        pointsAwarded: points
      });

      // Actualizar la lista local
      setPendingPublications(prev => prev.filter(pub => pub._id !== selectedPublication._id));
      
      toast.success(`Publicación ${reviewData.status === 'approved' ? 'aprobada' : reviewData.status === 'rejected' ? 'rechazada' : 'vuelto para revisión'}`);
      
      // Limpiar formulario
      setSelectedPublication(null);
      setReviewData({
        status: 'approved',
        feedback: '',
        pointsAwarded: 0
      });
      
    } catch (error) {
      toast.error('Error al procesar la revisión');
    } finally {
      setReviewing(false);
    }
  };

  const handlePublicationSelect = (publication: Publication) => {
    setSelectedPublication(publication);
    setReviewData({
      status: 'approved',
      feedback: '',
      pointsAwarded: calculatePoints(publication.vulnerabilitySeverity)
    });
  };

  if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#00fff7] mb-4">Acceso Restringido</h2>
          <p className="text-[#00fff7]">Solo moderadores pueden acceder a esta página</p>
        </div>
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
    <div className={`min-h-screen w-full transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#00fff7] drop-shadow-[0_0_8px_#00fff7] mb-4">
            Panel de Moderación
          </h1>
          <p className="text-lg text-[#00fff7] max-w-2xl mx-auto">
            Revisa y aprueba las documentaciones enviadas por los usuarios
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`border-2 border-[#00fff7] rounded-xl p-6 text-center transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-gray-50'}`}>
            <h3 className="text-2xl font-bold text-[#00fff7] mb-2">{pendingPublications.length}</h3>
            <p className="text-[#00fff7]">Pendientes de Revisión</p>
          </div>
          <div className={`border-2 border-[#00fff7] rounded-xl p-6 text-center transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-gray-50'}`}>
            <h3 className="text-2xl font-bold text-[#00fff7] mb-2">          {pendingPublications.filter(pub => pub.vulnerabilitySeverity === 'critical').length}
            </h3>
            <p className="text-[#00fff7]">Críticas</p>
          </div>
          <div className={`border-2 border-[#00fff7] rounded-xl p-6 text-center transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-gray-50'}`}>
            <h3 className="text-2xl font-bold text-[#00fff7] mb-2">          {pendingPublications.filter(pub => pub.vulnerabilitySeverity === 'high').length}
            </h3>
            <p className="text-[#00fff7]">Alta Severidad</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lista de publicaciones pendientes */}
          <div>
            <h2 className="text-2xl font-bold text-[#00fff7] mb-4">Publicaciones Pendientes</h2>
            
            {pendingPublications.length === 0 ? (
              <div className={`border-2 border-[#00fff7] rounded-xl p-8 text-center transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-gray-50'}`}>
                <p className="text-[#00fff7] text-lg">No hay publicaciones pendientes de revisión</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingPublications.map((publication) => (
                  <motion.div
                    key={publication._id}
                    whileHover={{ scale: 1.02 }}
                    className={`border-2 border-[#00fff7] rounded-xl p-4 cursor-pointer transition-colors duration-500 ${
                      selectedPublication?._id === publication._id 
                        ? 'bg-[#00fff7] text-black' 
                        : isDark ? 'bg-[#101926]' : 'bg-gray-50'
                    }`}
                    onClick={() => handlePublicationSelect(publication)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm line-clamp-2">{publication.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        publication.vulnerabilitySeverity === 'critical' ? 'bg-red-500' :
                        publication.vulnerabilitySeverity === 'high' ? 'bg-orange-500' :
                        publication.vulnerabilitySeverity === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      } text-white`}>
                        {publication.vulnerabilitySeverity.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-xs mb-2 line-clamp-2">{publication.description}</p>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span>Por: {publication.authorName}</span>
                      <span>+{calculatePoints(publication.vulnerabilitySeverity)} pts</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {publication.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-[#00fff7] text-black rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Panel de revisión */}
          <div>
            <h2 className="text-2xl font-bold text-[#00fff7] mb-4">Revisar Publicación</h2>
            
            {selectedPublication ? (
              <div className={`border-2 border-[#00fff7] rounded-xl p-6 transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-gray-50'}`}>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#00fff7]">{selectedPublication.title}</h3>
                  <p className="text-[#00fff7] sm mb-4">{selectedPublication.description}</p>
                  
                  <div className="grid grid-cols-2">
                    <div>
                      <span className="text-[#00fff7] font-bold">Autor:</span>
                      <p className="text-[#00fff7]">{selectedPublication.authorName}</p>
                    </div>
                    <div>
                      <span className="text-[#00fff7] font-bold">Vulnerabilidad:</span>
                      <p className="text-[#00fff7]">{selectedPublication.vulnerabilityTitle}</p>
                    </div>
                    <div>
                      <span className="text-[#00fff7] font-bold">Severidad:</span>
                      <p className="text-[#00fff7]">{selectedPublication.vulnerabilitySeverity.toUpperCase()}</p>
                    </div>
                    <div>
                      <span className="text-[#00fff7] font-bold">Puntos Estimados:</span>
                      <p className="text-[#00fff7]">+{calculatePoints(selectedPublication.vulnerabilitySeverity)}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[#00fff7] font-bold mb-2">Contenido:</h4>
                  <div className={`p-4 rounded-lg border border-[#00fff7] max-h-64 overflow-y-auto transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-100'}`}>
                    <pre className="text-[#00fff7] whitespace-pre-wrap font-mono text-sm">{selectedPublication.content}</pre>
                  </div>
                </div>

                {selectedPublication.attachments && selectedPublication.attachments.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-[#00fff7] font-bold mb-2">Archivos Adjuntos:</h4>
                    <div className="space-y-2">
                      {selectedPublication.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-[#00fff7] text-black rounded-lg">
                          <span className="text-sm">{attachment.originalName}</span>
                          <span className="text-xs">{(attachment.size / 1024).toFixed(1)} KB</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-[#00fff7] font-bold mb-2">Decisión:</label>
                    <select
                      value={reviewData.status}
                      onChange={(e) => setReviewData({ ...reviewData, status: e.target.value as any })}
                      className={`w-full px-4 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-white'}`}
                    >
                      <option value="approved">✅ Aprobar</option>
                      <option value="needs_revision">⚠️ Solicitar Modificaciones</option>
                      <option value="rejected">❌ Rechazar</option>
                    </select>
                  </div>

                  {reviewData.status === 'approved' && (
                    <div>
                      <label className="block text-[#00fff7] font-bold mb-2">Puntos a Otorgar:</label>
                      <input
                        type="number"
                        value={reviewData.pointsAwarded}
                        onChange={(e) => setReviewData({ ...reviewData, pointsAwarded: parseInt(e.target.value) || 0 })}
                        min="0"
                        max="500"
                        className={`w-full px-4 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-white'}`}
                      />
                    </div>
                  )}

                  {(reviewData.status === 'needs_revision' || reviewData.status === 'rejected') && (
                    <div>
                      <label className="block text-[#00fff7] font-bold mb-2">Feedback:</label>
                      <textarea
                        value={reviewData.feedback}
                        onChange={(e) => setReviewData({ ...reviewData, feedback: e.target.value })}
                        rows={4}
                        className={`w-full px-4 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-white'}`}
                        placeholder={reviewData.status === 'needs_revision' ? 'Explica qué modificaciones se necesitan...' : 'Explica por qué se rechaza la publicación...'}
                      />
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={handleReview}
                      disabled={reviewing}
                      className="flex-1 py-3 bg-[#39ff14] text-black font-bold rounded-lg hover:bg-[#39ff14] transition disabled:opacity-50"
                    >
                      {reviewing ? 'Procesando...' : 'Enviar Decisión'}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPublication(null);
                        setReviewData({
                          status: 'approved',
                          feedback: '',
                          pointsAwarded: 0
                        });
                      }}
                      className="flex-1 py-3 border-2 border-[#00fff7] text-[#00fff7] font-bold rounded-lg hover:bg-[#00fff7] hover:text-black transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`border-2 border-[#00fff7] rounded-xl p-8 text-center transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-gray-50'}`}>
                <p className="text-[#00fff7] text-lg">Selecciona una publicación para revisar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moderation; 