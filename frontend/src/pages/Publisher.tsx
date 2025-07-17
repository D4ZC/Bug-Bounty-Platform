import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Publication, Vulnerability, PublicationForm } from '../types';
import apiService from '../services/api';
import { toast } from 'react-hot-toast';

const Publisher: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [tab, setTab] = useState<'publicar' | 'moderacion'>('publicar');
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
  const [pendingPublications, setPendingPublications] = useState<Publication[]>([]);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  // Formulario de creación
  const [formData, setFormData] = useState<PublicationForm>({
    title: '',
    description: '',
    content: '',
    vulnerabilityId: '',
    tags: []
  });

  // Archivos adjuntos
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentPreview, setAttachmentPreview] = useState<string[]>([]);

  useEffect(() => {
    loadVulnerabilities();
    if (tab === 'moderacion') {
      loadPendingPublications();
    }
  }, [tab]);

  const loadVulnerabilities = async () => {
    try {
      const response = await apiService.get<Vulnerability[]>('/vulnerabilities');
      setVulnerabilities(response.data || []);
    } catch (error) {
      toast.error('Error al cargar las vulnerabilidades');
    } finally {
      setLoading(false);
    }
  };

  const loadPendingPublications = async () => {
    try {
      const response = await apiService.get<Publication[]>('/publications?status=pending_review');
      setPendingPublications(response.data || []);
    } catch (error) {
      toast.error('Error al cargar las explicaciones pendientes');
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

  const handleVulnerabilitySelect = (vulnerability: Vulnerability) => {
    setSelectedVulnerability(vulnerability);
    setFormData(prev => ({
      ...prev,
      vulnerabilityId: vulnerability._id,
      title: `Resolución de ${vulnerability.title}`,
      tags: [vulnerability.severity, 'resolucion', 'documentacion']
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg', 'image/png', 'image/gif'
      ];
      
      if (file.size > maxSize) {
        toast.error(`El archivo ${file.name} es demasiado grande (máximo 5MB)`);
        return false;
      }
      
      if (!validTypes.includes(file.type)) {
        toast.error(`El archivo ${file.name} no es un tipo válido`);
        return false;
      }
      
      return true;
    });

    setAttachments(prev => [...prev, ...validFiles]);

    // Crear previews para imágenes
    validFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAttachmentPreview(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
    setAttachmentPreview(prev => prev.filter((_, i) => i !== index));
  };

  const isFormValid = formData.vulnerabilityId.trim() !== '' && formData.content.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    // Autogenerar título si está vacío
    let title = formData.title;
    if (!title) {
      title = `Explicación sobre ${formData.vulnerabilityId}`;
    }
    if (!isFormValid) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setSubmitting(true);

    try {
      // Crear FormData para enviar archivos
      const submitData = new FormData();
      submitData.append('title', title);
      submitData.append('description', formData.description || '');
      submitData.append('content', formData.content);
      submitData.append('vulnerabilityId', formData.vulnerabilityId);
      submitData.append('tags', JSON.stringify(formData.tags));
      submitData.append('estimatedPoints', calculatePoints(selectedVulnerability?.severity || 'low').toString());

      // Agregar archivos adjuntos
      attachments.forEach((file, index) => {
        submitData.append(`attachments`, file);
      });

      // Si hay usuario, enviar el token de autenticación (si tu api lo requiere)
      const config = user ? { headers: { 'Content-Type': 'multipart/form-data' } } : { headers: { 'Content-Type': 'multipart/form-data' } };

      const response = await apiService.post<Publication>('/publications', submitData, config);

      toast.success('Documentación enviada para revisión. Recibirás notificación cuando sea aprobada.');
      
      // Limpiar formulario
      setFormData({
        title: '',
        description: '',
        content: '',
        vulnerabilityId: '',
        tags: []
      });
      setAttachments([]);
      setAttachmentPreview([]);
      setSelectedVulnerability(null);
      
      // Redirigir a mis documentaciones
      window.location.href = '/mis-documentaciones';
      
    } catch (error: any) {
      // Mostrar mensaje real del backend si existe
      const backendMsg = error?.response?.data?.error || error?.response?.data?.message || error.message || 'Error al enviar la documentación';
      toast.error(backendMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Acciones de moderación (solo habilitadas para admin/moderador)
  const handleModeration = async (id: string, action: 'approved' | 'rejected' | 'needs_revision') => {
    if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
      toast.error('No tienes permisos para moderar');
      return;
    }
    setReviewingId(id);
    try {
      await apiService.post(`/publications/${id}/review`, {
        status: action,
        feedback: '',
        pointsAwarded: action === 'approved' ? 100 : 0,
      });
      toast.success('Decisión registrada');
      setPendingPublications(prev => prev.filter(pub => pub._id !== id));
    } catch (error) {
      toast.error('Error al registrar la decisión');
    } finally {
      setReviewingId(null);
    }
  };

  // Eliminar el bloque de acceso restringido por usuario

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  const filteredPublications = pendingPublications.filter(pub => {
    const term = searchTerm.toLowerCase();
    return (
      (pub.vulnerabilityTitle?.toLowerCase().includes(term) ||
       pub.vulnerabilityId?.toLowerCase().includes(term) ||
       pub.authorName?.toLowerCase().includes(term) ||
       pub.author?.toLowerCase().includes(term) ||
       pub.content?.toLowerCase().includes(term))
    );
  });

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}> 
      <div className={`w-full max-w-2xl mx-auto p-8 rounded-2xl shadow-xl border-2 ${isDark ? 'bg-[#101926] border-[#00fff7]' : 'bg-white border-[#00fff7]'}`}> 
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            className={`px-4 py-2 rounded-t-lg font-bold text-lg transition ${tab === 'publicar' ? 'bg-[#00fff7] text-black shadow' : isDark ? 'bg-[#101926] text-[#00fff7]' : 'bg-white text-[#00fff7]'}`}
            onClick={() => setTab('publicar')}
          >
            📝 Publicar Explicación
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-bold text-lg transition ${tab === 'moderacion' ? 'bg-[#00fff7] text-black shadow' : isDark ? 'bg-[#101926] text-[#00fff7]' : 'bg-white text-[#00fff7]'}`}
            onClick={() => setTab('moderacion')}
          >
            🧑‍⚖️ Revisión Moderador
          </button>
        </div>
        {/* Tab: Publicar Explicación */}
        {tab === 'publicar' && (
          <>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#00fff7] mb-8 text-center drop-shadow-[0_0_8px_#00fff7]">Nueva Explicación Técnica</h1>
            {/* Selector de vulnerabilidad o campo libre */}
            <div className="mb-6">
              {vulnerabilities.length > 0 ? (
                <select
                  value={formData.vulnerabilityId}
                  onChange={e => {
                    const vuln = vulnerabilities.find(v => v._id === e.target.value);
                    setFormData({ ...formData, vulnerabilityId: e.target.value });
                    setSelectedVulnerability(vuln || null);
                  }}
                  className={`w-full px-4 py-3 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-white'}`}
                >
                  <option value="">Selecciona una vulnerabilidad resuelta</option>
                  {vulnerabilities.map(vuln => (
                    <option key={vuln._id} value={vuln._id} className="text-black">
                      {vuln.title} ({vuln.severity})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.vulnerabilityId}
                  onChange={e => setFormData({ ...formData, vulnerabilityId: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-white'}`}
                  placeholder="Describe la vulnerabilidad resuelta (ej: SQL Injection en login)"
                />
              )}
              {showValidation && formData.vulnerabilityId.trim() === '' && (
                <div className="text-red-400 text-sm mt-1">Este campo es obligatorio.</div>
              )}
            </div>
            {/* Área de texto para explicación */}
            <div className="mb-8">
              <textarea
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className={`w-full px-4 py-4 rounded-lg border-2 border-[#00fff7] text-[#00fff7] font-mono bg-transparent focus:outline-none focus:ring-2 focus:ring-[#00fff7] transition-colors duration-500 ${isDark ? 'bg-[#101926]' : 'bg-white'}`}
                placeholder="Escribe un resumen de la vulnerabilidad o explica cómo la resolviste..."
              />
              {showValidation && formData.content.trim() === '' && (
                <div className="text-red-400 text-sm mt-1">Este campo es obligatorio.</div>
              )}
            </div>
            {/* En el formulario (tab === 'publicar'), debajo del textarea: */}
            <div className="mb-8">
              <label className="block text-[#00fff7] font-bold mb-2">Adjuntar archivos (PDF, Word, imágenes)</label>
              <div className="flex items-center gap-4 mb-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#00fff7] text-black font-bold rounded-lg hover:bg-[#39ff14] transition"
                >
                  📎 Agregar Archivos
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#00fff7]">
                      <span className="text-sm">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(idx)}
                        className="text-red-400 hover:text-red-600 text-lg"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Botón de envío */}
            <button
              onClick={handleSubmit}
              disabled={submitting || !isFormValid}
              className="w-full py-4 text-lg font-bold rounded-xl shadow-lg transition bg-[#00fff7] text-black hover:bg-[#39ff14] focus:ring-2 focus:ring-[#00fff7] focus:outline-none disabled:opacity-60"
            >
              {submitting ? 'Enviando...' : 'Enviar para Revisión'}
            </button>
          </>
        )}
        {/* Tab: Revisión Moderador */}
        {tab === 'moderacion' && (
          <>
            <h1 className="text-2xl font-extrabold text-[#00fff7] mb-6">Explicaciones Pendientes</h1>
            {pendingPublications.length === 0 ? (
              <div className="text-center text-[#00fff7] py-8">No hay explicaciones pendientes.</div>
            ) : (
              pendingPublications.map(pub => (
                <div key={pub._id} className="mb-8 p-6 rounded-xl border border-gray-200 shadow bg-white">
                  <div className="mb-2 font-bold text-lg text-gray-800">Vulnerabilidad: {pub.vulnerabilityTitle || pub.vulnerabilityId}</div>
                  <div className="mb-1 text-gray-700">Autor: {pub.authorName || pub.author || 'Anónimo'}</div>
                  <div className="mb-1 text-gray-700">Fecha: {pub.createdAt ? new Date(pub.createdAt).toISOString().slice(0,10) : ''}</div>
                  <div className="mb-4 p-3 bg-gray-100 text-gray-900 rounded font-mono whitespace-pre-wrap">{pub.content}</div>
                  <div className="flex gap-4">
                    <button
                      className="flex-1 py-3 rounded-lg font-bold text-lg bg-[#111827] text-[#00ff7f] border-2 border-[#00ff7f] flex items-center justify-center gap-2 hover:bg-[#00ff7f] hover:text-black transition"
                      onClick={async () => {
                        if (window.confirm('¿Estás seguro de que deseas aprobar esta explicación?')) {
                          await handleModeration(pub._id, 'approved');
                        }
                      }}
                      disabled={reviewingId === pub._id}
                    >
                      ✅ Aprobar
                    </button>
                    <button
                      className="flex-1 py-3 rounded-lg font-bold text-lg bg-red-600 text-white border-2 border-red-600 flex items-center justify-center gap-2 hover:bg-red-700 transition"
                      onClick={async () => {
                        if (window.confirm('¿Estás seguro de que deseas rechazar esta explicación?')) {
                          await handleModeration(pub._id, 'rejected');
                        }
                      }}
                      disabled={reviewingId === pub._id}
                    >
                      ❌ Rechazar
                    </button>
                    <button
                      className="flex-1 py-3 rounded-lg font-bold text-lg bg-[#f3f4f6] text-[#ff7f00] border-2 border-[#ff7f00] flex items-center justify-center gap-2 hover:bg-[#ff7f00] hover:text-black transition"
                      onClick={async () => {
                        if (window.confirm('¿Solicitar modificación al autor?')) {
                          await handleModeration(pub._id, 'needs_revision');
                        }
                      }}
                      disabled={reviewingId === pub._id}
                    >
                      ✏️ Solicitar Modificación
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Publisher; 