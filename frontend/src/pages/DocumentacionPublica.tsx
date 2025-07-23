import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Publication } from '../types';
import apiService from '../services/api';
import { toast } from 'react-hot-toast';
import { useBackground } from '../contexts/BackgroundContext';

const examplePublications: Publication[] = [
  {
    _id: '1',
    title: 'Resolución de SQL Injection en Login',
    description: 'Guía completa para identificar y corregir vulnerabilidades de SQL Injection en formularios de autenticación.',
    content: `## Análisis del Problema\nSe detectó una vulnerabilidad de SQL Injection en el formulario de login que permitía bypass de autenticación.`,
    author: 'Ana_Security',
    vulnerabilityId: 'vuln_001',
    vulnerabilityTitle: 'SQLInjection en Login',
    vulnerabilitySeverity: 'critical',
    status: 'approved',
    pointsAwarded: 150,
    views: 1247,
    likes: 89,
    isLiked: false,
    tags: ['sql-injection', 'authentication', 'owasp', 'web-security'],
    attachments: [],
    comments: [],
    createdAt: new Date('2024-05-22T10:00:00.000Z'),
    updatedAt: new Date('2024-11-15T10:00:00.000Z'),
  },
  {
    _id: '2',
    title: 'XSSReflejado en Panel de Usuario',
    description: 'Documentación sobre la detección y corrección de vulnerabilidades XSS en paneles de usuario.',
    content: `## Descripción del XSS\nSe encontró un XSS reflejado en el campo de búsqueda del panel de usuario que permitía ejecutar JavaScript malicioso.`,
    author: 'Carlos_Pentester',
    vulnerabilityId: 'vuln_002',
    vulnerabilityTitle: 'XSS Reflejado',
    vulnerabilitySeverity: 'high',
    status: 'approved',
    pointsAwarded: 120,
    views: 892,
    likes: 67,
    isLiked: false,
    tags: ['xss', 'javascript', 'web-security'],
    attachments: [],
    comments: [],
    createdAt: new Date('2024-05-22T10:00:00.000Z'),
    updatedAt: new Date('2024-11-10T10:00:00.000Z'),
  },
  {
    _id: '3',
    title: 'CSRF en Transferencias Bancarias',
    description: 'Análisis completo de vulnerabilidad CSRF en sistema de transferencias y su mitigación.',
    content: `## Vulnerabilidad CSRF\nSe identificó que las transferencias bancarias eran vulnerables a ataques CSRF, permitiendo transferencias no autorizadas.`,
    author: 'Maria_FinSec',
    vulnerabilityId: 'vuln_003',
    vulnerabilityTitle: 'CSRF en Transferencias',
    vulnerabilitySeverity: 'high',
    status: 'approved',
    pointsAwarded: 200,
    views: 1567,
    likes: 134,
    isLiked: false,
    tags: ['csrf', 'banking', 'financial'],
    attachments: [],
    comments: [],
    createdAt: new Date('2024-05-22T10:00:00.000Z'),
    updatedAt: new Date('2024-05-22T10:00:00.000Z'),
  },
];

const DocumentacionPublica: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const { backgroundUrl } = useBackground();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await apiService.get<Publication[]>('/publications?status=approved');
      setPublications([...examplePublications, ...(res.data || [])]);
    } catch (error) {
      setPublications(examplePublications);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (publicationId: string) => {
    try {
      if (!user) {
        toast.error('Debes iniciar sesión para dar like');
        return;
      }
      const publication = publications.find(p => p._id === publicationId);
      if (publication?.isLiked) {
        await apiService.delete(`/publications/${publicationId}/like`);
        setPublications(prev => prev.map(pub => pub._id === publicationId ? { ...pub, likes: pub.likes - 1, isLiked: false } : pub));
        toast.success('Like removido');
      } else {
        await apiService.post(`/publications/${publicationId}/like`);
        setPublications(prev => prev.map(pub => pub._id === publicationId ? { ...pub, likes: pub.likes + 1, isLiked: true } : pub));
        toast.success('¡Gracias por el like!');
      }
    } catch (error) {
      toast.error('Error al procesar el like');
    }
  };

  const filteredPublications = publications.filter(pub => {
    const searchMatch = !searchTerm ||
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return pub.status === 'approved' && searchMatch;
  });

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-mono" style={{ background: backgroundUrl ? `url(${backgroundUrl}) center/cover no-repeat` : 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#00fff7] drop-shadow-[0_0_8px_#00fff7] mb-4 font-mono">
            Documentación Pública
          </h1>
          <p className="text-lg text-[#00fff7] max-w-2xl mx-auto font-mono">
            Consulta y busca documentaciones aprobadas sobre cómo se resolvieron vulnerabilidades. Da like si te fue útil.
          </p>
        </div>
        {/* Barra de búsqueda */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar documentaciones por título, descripción o tags..."
              className="w-full px-6 rounded-xl border-2 border-[#00fff7] text-[#00fff7] font-mono focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 bg-[#181a20]/90"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1 text-[#00fff7]">
              🔍
            </div>
          </div>
        </div>
        {/* Lista de documentaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map((publication) => (
            <motion.div
              key={publication._id}
              whileHover={{ scale: 1.02 }}
              className="border-2 border-[#00fff7] rounded-xl p-6 bg-[#181a20]/90 shadow-[0_0_24px_#00fff7] font-mono animate-fade-in-up cursor-pointer"
              onClick={() => setSelectedPublication(publication)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#00fff7] line-clamp-2 font-mono">{publication.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${publication.status === 'approved' ? 'bg-green-500' : 'bg-gray-500 text-white'}`}>
                  {publication.status === 'approved' && 'Aprobada'}
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
                <div className="flex items-center gap-4">
                  <span>👁️ {publication.views}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(publication._id);
                    }}
                    className={`flex items-center gap-1 ${publication.isLiked ? 'text-red-500' : 'text-[#00fff7]'} hover:text-red-500 font-mono animate-glow`}
                  >
                    <span>{publication.isLiked ? '❤️' : '🩷'}</span>
                    <span>{publication.likes}</span>
                  </button>
                </div>
                <span className="text-[#39ff14] font-bold font-mono">+{publication.pointsAwarded} pts</span>
              </div>
              <div className="mt-4 text-xs text-[#00fff7] flex justify-between font-mono">
                <span>Por: {publication.author}</span>
                <span>{new Date(publication.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#00fff7] text-lg font-mono">No hay documentaciones disponibles</p>
            {searchTerm && (
              <p className="text-[#00fff7] text-sm mt-2 font-mono">Intenta con otros términos de búsqueda</p>
            )}
          </div>
        )}
      </div>
      {/* Modal de vista detallada */}
      {selectedPublication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#00fff7] rounded-xl p-8 bg-[#181a20]/90 shadow-[0_0_24px_#00fff7] font-mono animate-fade-in-up"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#00fff7] font-mono">{selectedPublication.title}</h2>
              <button
                onClick={() => setSelectedPublication(null)}
                className="text-[#00fff7] hover:text-white text-2xl font-mono"
              >
                ×
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[#00fff7] font-mono">
                  Estado:
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold font-mono ${selectedPublication.status === 'approved' ? 'bg-green-500' : 'bg-gray-500 text-white'}`}>
                    {selectedPublication.status === 'approved' && 'Aprobada'}
                  </span>
                </span>
                <span className="text-[#39ff14] font-bold font-mono">+{selectedPublication.pointsAwarded} puntos</span>
              </div>
              <div>
                <h3 className="text-[#00fff7] font-bold mb-2 font-mono">Descripción</h3>
                <p className="text-[#00fff7] font-mono">{selectedPublication.description}</p>
              </div>
              <div>
                <h3 className="text-[#00fff7] font-bold mb-2 font-mono">Vulnerabilidad Asociada</h3>
                <div className="flex items-center gap-4">
                  <span className="text-[#00fff7] font-mono">{selectedPublication.vulnerabilityTitle}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold font-mono ${selectedPublication.vulnerabilitySeverity === 'critical' ? 'bg-red-500' : selectedPublication.vulnerabilitySeverity === 'high' ? 'bg-orange-500' : selectedPublication.vulnerabilitySeverity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                    {selectedPublication.vulnerabilitySeverity.toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-[#00fff7] font-bold mb-2 font-mono">Contenido Detallado</h3>
                <div className="p-4 rounded-lg border border-[#00fff7] bg-[#232b36]/80 font-mono animate-fade-in-up">
                  <pre className="text-[#00fff7] whitespace-pre-wrap font-mono text-sm">{selectedPublication.content}</pre>
                </div>
              </div>
              {selectedPublication.tags.length > 0 && (
                <div>
                  <h3 className="text-[#00fff7] font-bold mb-2 font-mono">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPublication.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-[#00fff7] text-black rounded-full text-sm font-bold font-mono animate-glow">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between text-sm text-[#00fff7] font-mono">
                <div className="flex items-center gap-4">
                  <span>👁️ {selectedPublication.views} vistas</span>
                  <button
                    onClick={() => handleLike(selectedPublication._id)}
                    className={`flex items-center gap-1 ${selectedPublication.isLiked ? 'text-red-500' : 'text-[#00fff7]'} hover:text-red-500 font-mono animate-glow`}
                  >
                    <span>{selectedPublication.isLiked ? '❤️' : '🩷'}</span>
                    <span>{selectedPublication.likes} likes</span>
                  </button>
                </div>
                <span>Por: {selectedPublication.author} • {new Date(selectedPublication.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DocumentacionPublica; 