import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/ui/Modal';
import ConfettiBlast from '../components/ui/ConfettiBlast';
import {
  getVulnerabilitiesByUser,
  saveVulnerability,
  updateVulnerability,
  deleteVulnerability,
  Vulnerability
} from '../localDb';

const Vulnerabilities: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Formulario para crear/editar vulnerabilidad
  const [vulnForm, setVulnForm] = useState({
    title: '',
    description: '',
    severity: 'medium' as const,
    category: 'web',
    impact: '',
    steps: [''],
    references: ['']
  });

  useEffect(() => {
    loadVulnerabilities();
  }, []);

  const loadVulnerabilities = async () => {
    try {
      const allVulns = await getVulnerabilitiesByUser(user?._id);
      setVulnerabilities(allVulns);
    } catch (error) {
      console.error('Error loading vulnerabilities:', error);
      showToast('Error al cargar vulnerabilidades', 'error');
    }
  };

  const handleCreateVulnerability = async () => {
    if (!user) {
      showToast('Debes iniciar sesión para reportar una vulnerabilidad', 'error');
      return;
    }

    try {
      const vulnData = {
        ...vulnForm,
        userId: user._id,
        status: 'pending' as const,
        points: getSeverityPoints(vulnForm.severity),
        date: new Date().toISOString(),
        steps: vulnForm.steps.filter(step => step.trim()),
        references: vulnForm.references.filter(ref => ref.trim())
      };

      await saveVulnerability(vulnData);
      showToast('¡Vulnerabilidad reportada exitosamente!', 'success');
      setShowCreateModal(false);
      setVulnForm({
        title: '',
        description: '',
        severity: 'medium',
        category: 'web',
        impact: '',
        steps: [''],
        references: ['']
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      loadVulnerabilities();
    } catch (error) {
      showToast('Error al reportar la vulnerabilidad', 'error');
    }
  };

  const handleEditVulnerability = async () => {
    if (!selectedVulnerability) return;

    try {
      const updatedVuln = {
        ...selectedVulnerability,
        ...vulnForm,
        steps: vulnForm.steps.filter(step => step.trim()),
        references: vulnForm.references.filter(ref => ref.trim())
      };

      await updateVulnerability(updatedVuln);
      showToast('Vulnerabilidad actualizada exitosamente', 'success');
      setShowEditModal(false);
      setSelectedVulnerability(null);
      loadVulnerabilities();
    } catch (error) {
      showToast('Error al actualizar la vulnerabilidad', 'error');
    }
  };

  const handleDeleteVulnerability = async (vulnId: string) => {
    try {
      await deleteVulnerability(vulnId);
      showToast('Vulnerabilidad eliminada', 'info');
      loadVulnerabilities();
    } catch (error) {
      showToast('Error al eliminar la vulnerabilidad', 'error');
    }
  };

  const getSeverityPoints = (severity: string) => {
    switch (severity) {
      case 'critical': return 1000;
      case 'high': return 500;
      case 'medium': return 250;
      case 'low': return 100;
      default: return 100;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-400 to-red-600';
      case 'high': return 'from-orange-400 to-orange-600';
      case 'medium': return 'from-yellow-400 to-yellow-600';
      case 'low': return 'from-green-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'from-green-400 to-green-600';
      case 'rejected': return 'from-red-400 to-red-600';
      case 'pending': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return '✅';
      case 'rejected': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return '🌐';
      case 'mobile': return '📱';
      case 'api': return '🔌';
      case 'network': return '🌍';
      case 'social': return '👥';
      default: return '🔍';
    }
  };

  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    const matchesSearch = vuln.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vuln.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || vuln.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || vuln.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || vuln.category === selectedCategory;
    return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
  });

  const categories = ['all', 'web', 'mobile', 'api', 'network', 'social'];
  const severities = ['all', 'low', 'medium', 'high', 'critical'];
  const statuses = ['all', 'pending', 'accepted', 'rejected'];

  const isUserVulnerability = (vuln: Vulnerability) => {
    return user ? vuln.userId === user._id : false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white relative overflow-x-hidden">
      {/* Efecto de partículas/fondo cyberpunk */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#ff0000" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f0026" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="80%" cy="20%" r="400" fill="url(#cyberpunk-glow)" />
          <circle cx="20%" cy="80%" r="300" fill="url(#cyberpunk-glow)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 relative z-10">
        {/* Header Mejorado */}
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-orange-900/20 to-red-900/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border-2 border-red-400/50 rounded-3xl p-8 shadow-2xl">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                🔍
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-extrabold mb-4 tracking-widest bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
              >
                VULNERABILIDADES
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-red-200 max-w-3xl mx-auto"
              >
                Reporta vulnerabilidades, gana puntos y ayuda a mejorar la seguridad de la plataforma
              </motion.p>
            </div>
          </div>
        </motion.header>

        {/* Estadísticas de Vulnerabilidades */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {/* Total Vulnerabilidades */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-red-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                🔍
              </motion.div>
              <div className="text-3xl font-bold text-red-400 mb-1">
                {vulnerabilities.length}
              </div>
              <div className="text-red-200 text-sm">Total Reportadas</div>
            </div>
          </motion.div>

          {/* Aceptadas */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                ✅
              </motion.div>
              <div className="text-3xl font-bold text-green-400 mb-1">
                {vulnerabilities.filter(v => v.status === 'accepted').length}
              </div>
              <div className="text-green-200 text-sm">Aceptadas</div>
            </div>
          </motion.div>

          {/* Pendientes */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                ⏳
              </motion.div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                {vulnerabilities.filter(v => v.status === 'pending').length}
              </div>
              <div className="text-yellow-200 text-sm">Pendientes</div>
            </div>
          </motion.div>

          {/* Puntos Totales */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-4xl mb-2"
              >
                💎
              </motion.div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">
                {vulnerabilities
                  .filter(v => v.status === 'accepted')
                  .reduce((sum, v) => sum + v.points, 0)
                }
              </div>
              <div className="text-cyan-200 text-sm">Puntos Ganados</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Controles */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8"
        >
          {/* Búsqueda */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-4">
              <input
                type="text"
                placeholder="Buscar vulnerabilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white placeholder-cyan-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                🔍
              </div>
            </div>
          </div>

          {/* Filtro de Severidad */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-red-400/50 rounded-2xl p-4">
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white"
              >
                {severities.map(severity => (
                  <option key={severity} value={severity}>
                    {severity === 'all' ? 'Todas las severidades' : severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtro de Estado */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'Todos los estados' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtro de Categoría */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón Reportar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 px-6 rounded-2xl border-2 border-purple-400/50 shadow-2xl hover:shadow-purple-400/30 transition-all duration-300">
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡
                </motion.div>
                Reportar Vuln
              </span>
            </div>
          </motion.button>
        </motion.div>

        {/* Grid de Vulnerabilidades */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredVulnerabilities.map((vuln, index) => (
              <motion.div
                key={vuln.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getSeverityColor(vuln.severity)} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300`}></div>
                
                <div className="relative bg-black/80 backdrop-blur-xl border-2 border-red-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-red-400/30 transition-all duration-300 h-full">
                  {/* Header de la vulnerabilidad */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          animate={{ 
                            scale: vuln.severity === 'critical' ? [1, 1.2, 1] : 1,
                            rotate: vuln.severity === 'critical' ? [0, 10, -10, 0] : 0
                          }}
                          transition={{ 
                            duration: vuln.severity === 'critical' ? 2 : 1, 
                            repeat: vuln.severity === 'critical' ? Infinity : 0 
                          }}
                          className="text-3xl"
                        >
                          {getCategoryIcon(vuln.category)}
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold text-red-200 group-hover:text-red-100 transition-colors">
                            {vuln.title}
                          </h3>
                          <div className="text-sm text-red-300">{vuln.category}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ 
                          scale: vuln.status === 'accepted' ? [1, 1.1, 1] : 1,
                          rotate: vuln.status === 'rejected' ? [0, 10, -10, 0] : 0
                        }}
                        transition={{ 
                          duration: vuln.status === 'accepted' ? 2 : 1, 
                          repeat: vuln.status === 'accepted' ? Infinity : 0 
                        }}
                        className="text-2xl"
                      >
                        {getStatusIcon(vuln.status)}
                      </motion.div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {vuln.description}
                  </p>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-cyan-400">💎</div>
                      <div className="text-sm text-cyan-200">{vuln.points}</div>
                      <div className="text-xs text-gray-400">Puntos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400">📅</div>
                      <div className="text-sm text-blue-200">{new Date(vuln.date).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">Fecha</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getSeverityColor(vuln.severity)} text-white`}>
                      {vuln.severity.toUpperCase()}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getStatusColor(vuln.status)} text-white`}>
                      {vuln.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    {isUserVulnerability(vuln) && vuln.status === 'pending' && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedVulnerability(vuln);
                            setVulnForm({
                              title: vuln.title,
                              description: vuln.description,
                              severity: vuln.severity,
                              category: vuln.category,
                              impact: vuln.impact,
                              steps: vuln.steps.length > 0 ? vuln.steps : [''],
                              references: vuln.references.length > 0 ? vuln.references : ['']
                            });
                            setShowEditModal(true);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 transition-all duration-300 text-sm"
                        >
                          Editar
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteVulnerability(vuln.id)}
                          className="flex-1 py-2 px-3 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 transition-all duration-300 text-sm"
                        >
                          Eliminar
                        </motion.button>
                      </>
                    )}
                    {!isUserVulnerability(vuln) && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedVulnerability(vuln);
                          setShowEditModal(true);
                        }}
                        className="w-full py-2 px-3 rounded-xl font-bold bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-500 hover:to-green-600 transition-all duration-300 text-sm"
                      >
                        Ver Detalles
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mensaje cuando no hay vulnerabilidades */}
        {filteredVulnerabilities.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-red-200 mb-4">No se encontraron vulnerabilidades</h3>
            <p className="text-gray-400 mb-8">Intenta ajustar los filtros o reporta la primera vulnerabilidad</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-8 py-4 rounded-2xl hover:from-red-500 hover:to-red-600 transition-all duration-300"
            >
              Reportar Primera Vulnerabilidad
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Modal para crear/editar vulnerabilidad */}
      <Modal
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
          setSelectedVulnerability(null);
        }}
        title={showEditModal ? "Editar Vulnerabilidad" : "Reportar Nueva Vulnerabilidad"}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-red-200 mb-2">Título</label>
            <input
              type="text"
              value={vulnForm.title}
              onChange={(e) => setVulnForm({...vulnForm, title: e.target.value})}
              className="w-full bg-black/60 border-2 border-red-400/50 rounded-xl p-3 text-white focus:border-red-400 outline-none"
              placeholder="Título de la vulnerabilidad"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-200 mb-2">Descripción</label>
            <textarea
              value={vulnForm.description}
              onChange={(e) => setVulnForm({...vulnForm, description: e.target.value})}
              className="w-full bg-black/60 border-2 border-red-400/50 rounded-xl p-3 text-white focus:border-red-400 outline-none h-24"
              placeholder="Describe la vulnerabilidad..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-red-200 mb-2">Severidad</label>
              <select
                value={vulnForm.severity}
                onChange={(e) => setVulnForm({...vulnForm, severity: e.target.value as any})}
                className="w-full bg-black/60 border-2 border-red-400/50 rounded-xl p-3 text-white focus:border-red-400 outline-none"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="critical">Crítica</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-200 mb-2">Categoría</label>
              <select
                value={vulnForm.category}
                onChange={(e) => setVulnForm({...vulnForm, category: e.target.value})}
                className="w-full bg-black/60 border-2 border-red-400/50 rounded-xl p-3 text-white focus:border-red-400 outline-none"
              >
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="api">API</option>
                <option value="network">Network</option>
                <option value="social">Social</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-200 mb-2">Impacto</label>
            <textarea
              value={vulnForm.impact}
              onChange={(e) => setVulnForm({...vulnForm, impact: e.target.value})}
              className="w-full bg-black/60 border-2 border-red-400/50 rounded-xl p-3 text-white focus:border-red-400 outline-none h-20"
              placeholder="Describe el impacto de la vulnerabilidad..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-200 mb-2">Pasos para Reproducir</label>
            {vulnForm.steps.map((step, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => {
                    const newSteps = [...vulnForm.steps];
                    newSteps[index] = e.target.value;
                    setVulnForm({...vulnForm, steps: newSteps});
                  }}
                  className="flex-1 bg-black/60 border-2 border-red-400/50 rounded-xl p-3 text-white focus:border-red-400 outline-none"
                  placeholder={`Paso ${index + 1}`}
                />
                {vulnForm.steps.length > 1 && (
                  <button
                    onClick={() => {
                      const newSteps = vulnForm.steps.filter((_, i) => i !== index);
                      setVulnForm({...vulnForm, steps: newSteps});
                    }}
                    className="px-3 py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setVulnForm({...vulnForm, steps: [...vulnForm.steps, '']})}
              className="w-full py-2 px-4 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors"
            >
              + Agregar Paso
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-200 mb-2">Referencias</label>
            {vulnForm.references.map((ref, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ref}
                  onChange={(e) => {
                    const newRefs = [...vulnForm.references];
                    newRefs[index] = e.target.value;
                    setVulnForm({...vulnForm, references: newRefs});
                  }}
                  className="flex-1 bg-black/60 border-2 border-red-400/50 rounded-xl p-3 text-white focus:border-red-400 outline-none"
                  placeholder="URL de referencia"
                />
                {vulnForm.references.length > 1 && (
                  <button
                    onClick={() => {
                      const newRefs = vulnForm.references.filter((_, i) => i !== index);
                      setVulnForm({...vulnForm, references: newRefs});
                    }}
                    className="px-3 py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setVulnForm({...vulnForm, references: [...vulnForm.references, '']})}
              className="w-full py-2 px-4 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors"
            >
              + Agregar Referencia
            </button>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={showEditModal ? handleEditVulnerability : handleCreateVulnerability}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300"
            >
              {showEditModal ? 'Actualizar' : 'Reportar'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
                setSelectedVulnerability(null);
              }}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
            >
              Cancelar
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Confetti */}
      {showConfetti && <ConfettiBlast />}
    </div>
  );
};

export default Vulnerabilities;
