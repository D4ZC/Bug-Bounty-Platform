import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Publication } from '../types';
import apiService from '../services/api';
import { toast } from 'react-hot-toast';

interface PublisherHistoryProps {
  userId: string;
}

const PublisherHistory: React.FC<PublisherHistoryProps> = ({ userId }) => {
  const { isDark } = useTheme();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  useEffect(() => {
    loadUserPublications();
  }, [userId]);

  const loadUserPublications = async () => {
    try {
      const response = await apiService.get<Publication[]>(`/publications/user/${userId}`);
      setPublications(response.data || []);
    } catch (error) {
      toast.error('Error al cargar el historial de publicaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (publicationId: string) => {
    try {
      await apiService.post(`/publications/${publicationId}/like`);
      // Actualizar el estado local
      setPublications(prev => prev.map(pub => 
        pub._id === publicationId 
          ? { ...pub, likes: pub.likes + 1, isLiked: true }
          : pub
      ));
      toast.success('Like agregado');
    } catch (error) {
      toast.error('Error al dar like');
    }
  };

  const handleUnlike = async (publicationId: string) => {
    try {
      await apiService.delete(`/publications/${publicationId}/like`);
      // Actualizar el estado local
      setPublications(prev => prev.map(pub => 
        pub._id === publicationId 
          ? { ...pub, likes: pub.likes - 1, isLiked: false }
          : pub
      ));
      toast.success('Like removido');
    } catch (error) {
      toast.error('Error al remover like');
    }
  };

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
            Historial de Publicaciones
          </h1>
          <p className="text-lg text-[#00fff7] max-w-2xl mx-auto">
            Revisa todas tus publicaciones y su rendimiento en la comunidad.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`border-2 border-[#00fff7] rounded-xl p-6 text-center transition-colors duration-500 ${
              isDark ? 'bg-[#101926]' : 'bg-gray-50'
            }`}
          >
            <div className="text-3xl font-bold text-[#00fff7] mb-2">
              {publications.length}
            </div>
            <div className="text-[#00fff7]">Total Publicaciones</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`border-2 border-[#00fff7] rounded-xl p-6 text-center transition-colors duration-500 ${
              isDark ? 'bg-[#101926]' : 'bg-gray-50'
            }`}
          >
            <div className="text-3xl font-bold text-green-500 mb-2">
              {publications.filter(p => p.status === 'approved').length}
            </div>
            <div className="text-[#00fff7]">Aprobadas</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`border-2 border-[#00fff7] rounded-xl p-6 text-center transition-colors duration-500 ${
              isDark ? 'bg-[#101926]' : 'bg-gray-50'
            }`}
          >
            <div className="text-3xl font-bold text-[#39ff14] mb-2">
              {publications.reduce((sum, p) => sum + p.pointsAwarded, 0)}
            </div>
            <div className="text-[#00fff7]">Puntos Totales</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`border-2 border-[#00fff7] rounded-xl p-6 text-center transition-colors duration-500 ${
              isDark ? 'bg-[#101926]' : 'bg-gray-50'
            }`}
          >
            <div className="text-3xl font-bold text-[#00fff7] mb-2">
              {publications.reduce((sum, p) => sum + p.views, 0)}
            </div>
            <div className="text-[#00fff7]">Vistas Totales</div>
          </motion.div>
        </div>

        {/* Lista de publicaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication) => (
            <motion.div
              key={publication._id}
              whileHover={{ scale: 1.02 }}
              className={`border-2 border-[#00fff7] rounded-xl p-6 transition-colors duration-500 ${
                isDark ? 'bg-[#101926]' : 'bg-gray-50'
              } cursor-pointer`}
              onClick={() => setSelectedPublication(publication)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#00fff7] line-clamp-2">{publication.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  publication.status === 'approved' ? 'bg-green-500' :
                  publication.status === 'pending_review' ? 'bg-yellow-500' :
                  publication.status === 'rejected' ? 'bg-red-500' :
                  'bg-gray-500 text-white'
                }`}>
                  {publication.status === 'approved' && 'Aprobada'}
                  {publication.status === 'pending_review' && 'Pendiente'}
                  {publication.status === 'rejected' && 'Rechazada'}
                  {publication.status === 'draft' && 'Borrador'}
                </span>
              </div>
              
              <p className="text-[#00fff7] mb-4 line-clamp-3">{publication.description}</p>
              
              <div className="flex items-center justify-between text-sm text-[#00fff7]">
                <span>Vulnerabilidad: {publication.vulnerabilityTitle}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  publication.vulnerabilitySeverity === 'critical' ? 'bg-red-500' :
                  publication.vulnerabilitySeverity === 'high' ? 'bg-orange-500' :
                  publication.vulnerabilitySeverity === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                } text-white`}>
                  {publication.vulnerabilitySeverity.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-4 text-sm text-[#00fff7]">
                <div className="flex items-center gap-4">
                  <span>👁️ {publication.views}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (publication.isLiked) {
                        handleUnlike(publication._id);
                      } else {
                        handleLike(publication._id);
                      }
                    }}
                    className={`flex items-center gap-1 ${
                      publication.isLiked ? 'text-red-500' : 'text-[#00fff7]'
                    } hover:text-red-500 transition`}
                  >
                    <span>{publication.isLiked ? '❤️' : '🤍'}</span>
                    <span>{publication.likes}</span>
                  </button>
                </div>
                <span className="text-[#39ff14] font-bold">+{publication.pointsAwarded} pts</span>
              </div>
              
              <div className="mt-4 text-xs text-[#00fff7]">
                {new Date(publication.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>

        {publications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#00fff7] text-lg">No tienes publicaciones aún</p>
            <p className="text-[#00fff7] text-sm mt-2">¡Comienza a compartir tu conocimiento!</p>
          </div>
        )}
      </div>

      {/* Modal de vista detallada */}
      {selectedPublication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#00fff7] rounded-xl p-8 transition-colors duration-500 ${
              isDark ? 'bg-[#101926]' : 'bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#00fff7]">{selectedPublication.title}</h2>
              <button
                onClick={() => setSelectedPublication(null)}
                className="text-[#00fff7] hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[#00fff7]">
                  Estado: 
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${
                    selectedPublication.status === 'approved' ? 'bg-green-500' :
                    selectedPublication.status === 'pending_review' ? 'bg-yellow-500' :
                    selectedPublication.status === 'rejected' ? 'bg-red-500' :
                    'bg-gray-500 text-white'
                  }`}>
                    {selectedPublication.status === 'approved' && 'Aprobada'}
                    {selectedPublication.status === 'pending_review' && 'Pendiente de Revisión'}
                    {selectedPublication.status === 'rejected' && 'Rechazada'}
                    {selectedPublication.status === 'draft' && 'Borrador'}
                  </span>
                </span>
                <span className="text-[#39ff14] font-bold">+{selectedPublication.pointsAwarded} puntos</span>
              </div>

              <div>
                <h3 className="text-[#00fff7] font-bold mb-2">Descripción</h3>
                <p className="text-[#00fff7]">{selectedPublication.description}</p>
              </div>

              <div>
                <h3 className="text-[#00fff7] font-bold mb-2">Vulnerabilidad Asociada</h3>
                <div className="flex items-center gap-4">
                  <span className="text-[#00fff7]">{selectedPublication.vulnerabilityTitle}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    selectedPublication.vulnerabilitySeverity === 'critical' ? 'bg-red-500' :
                    selectedPublication.vulnerabilitySeverity === 'high' ? 'bg-orange-500' :
                    selectedPublication.vulnerabilitySeverity === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  } text-white`}>
                    {selectedPublication.vulnerabilitySeverity.toUpperCase()}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-[#00fff7] font-bold mb-2">Contenido Detallado</h3>
                <div className={`p-4 rounded-lg border border-[#00fff7] transition-colors duration-500 ${
                  isDark ? 'bg-[#0a0a0a]' : 'bg-gray-100'
                }`}>
                  <pre className="text-[#00fff7] whitespace-pre-wrap font-mono text-sm">{selectedPublication.content}</pre>
                </div>
              </div>

              {selectedPublication.tags.length > 0 && (
                <div>
                  <h3 className="text-[#00fff7] font-bold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPublication.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-[#00fff7] text-black rounded-full text-sm font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-[#00fff7]">
                <div className="flex items-center gap-4">
                  <span>👁️ {selectedPublication.views} vistas</span>
                  <span>❤️ {selectedPublication.likes} likes</span>
                </div>
                <span>{new Date(selectedPublication.createdAt).toLocaleDateString()}</span>
              </div>

              {selectedPublication.moderatorFeedback && (
                <div>
                  <h3 className="text-[#00fff7] font-bold mb-2">Feedback del Moderador</h3>
                  <div className={`p-4 rounded-lg border border-[#00fff7] transition-colors duration-500 ${
                    isDark ? 'bg-[#0a0a0a]' : 'bg-gray-100'
                  }`}>
                    <p className="text-[#00fff7]">{selectedPublication.moderatorFeedback}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PublisherHistory; 