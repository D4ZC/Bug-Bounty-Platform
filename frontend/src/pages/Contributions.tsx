import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/ui/Modal';
import ConfettiBlast from '../components/ui/ConfettiBlast';
import {
  getContributionsByUser,
  saveContribution,
  updateContribution,
  deleteContribution,
  Contribution
} from '../localDb';

const Contributions: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Formulario para crear/editar contribución
  const [contributionForm, setContributionForm] = useState({
    title: '',
    description: '',
    type: 'code' as const,
    category: 'frontend',
    impact: '',
    files: [''],
    links: [''],
    tags: ['']
  });

  useEffect(() => {
    loadContributions();
  }, []);

  const loadContributions = async () => {
    try {
      const allContributions = await getContributionsByUser(user?._id || '');
      setContributions(allContributions);
    } catch (error) {
      console.error('Error loading contributions:', error);
      showToast('Error al cargar contribuciones', 'error');
    }
  };

  const handleCreateContribution = async () => {
    if (!user) {
      showToast('Debes iniciar sesión para crear una contribución', 'error');
      return;
    }

    try {
      const contributionData = {
        ...contributionForm,
        userId: user._id,
        status: 'pending' as const,
        points: getTypePoints(contributionForm.type),
        date: new Date().toISOString(),
        files: contributionForm.files.filter(file => file.trim()),
        links: contributionForm.links.filter(link => link.trim()),
        tags: contributionForm.tags.filter(tag => tag.trim())
      };

      await saveContribution(contributionData);
      showToast('¡Contribución creada exitosamente!', 'success');
      setShowCreateModal(false);
      setContributionForm({
        title: '',
        description: '',
        type: 'code',
        category: 'frontend',
        impact: '',
        files: [''],
        links: [''],
        tags: ['']
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      loadContributions();
    } catch (error) {
      showToast('Error al crear la contribución', 'error');
    }
  };

  const handleEditContribution = async () => {
    if (!selectedContribution) return;

    try {
      const updatedContribution = {
        ...selectedContribution,
        ...contributionForm,
        files: contributionForm.files.filter(file => file.trim()),
        links: contributionForm.links.filter(link => link.trim()),
        tags: contributionForm.tags.filter(tag => tag.trim())
      };

      await updateContribution(updatedContribution);
      showToast('Contribución actualizada exitosamente', 'success');
      setShowEditModal(false);
      setSelectedContribution(null);
      loadContributions();
    } catch (error) {
      showToast('Error al actualizar la contribución', 'error');
    }
  };

  const handleDeleteContribution = async (contributionId: string) => {
    try {
      await deleteContribution(contributionId);
      showToast('Contribución eliminada', 'info');
      loadContributions();
    } catch (error) {
      showToast('Error al eliminar la contribución', 'error');
    }
  };

  const getTypePoints = (type: string) => {
    switch (type) {
      case 'code': return 500;
      case 'documentation': return 300;
      case 'design': return 400;
      case 'testing': return 250;
      case 'research': return 350;
      case 'other': return 200;
      default: return 200;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'code': return 'from-blue-400 to-blue-600';
      case 'documentation': return 'from-green-400 to-green-600';
      case 'design': return 'from-purple-400 to-purple-600';
      case 'testing': return 'from-yellow-400 to-yellow-600';
      case 'research': return 'from-orange-400 to-orange-600';
      case 'other': return 'from-gray-400 to-gray-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'from-green-400 to-green-600';
      case 'rejected': return 'from-red-400 to-red-600';
      case 'reviewed': return 'from-yellow-400 to-yellow-600';
      case 'pending': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return '✅';
      case 'rejected': return '❌';
      case 'reviewed': return '👁️';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'code': return '💻';
      case 'documentation': return '📚';
      case 'design': return '🎨';
      case 'testing': return '🧪';
      case 'research': return '🔬';
      case 'other': return '📦';
      default: return '📦';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return '🎨';
      case 'backend': return '⚙️';
      case 'database': return '🗄️';
      case 'security': return '🔒';
      case 'ui/ux': return '🎯';
      case 'devops': return '🚀';
      default: return '📦';
    }
  };

  const filteredContributions = contributions.filter(contribution => {
    const matchesSearch = contribution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contribution.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || contribution.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || contribution.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || contribution.category === selectedCategory;
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const types = ['all', 'code', 'documentation', 'design', 'testing', 'research', 'other'];
  const statuses = ['all', 'pending', 'reviewed', 'accepted', 'rejected'];
  const categories = ['all', 'frontend', 'backend', 'database', 'security', 'ui/ux', 'devops'];

  const isUserContribution = (contribution: Contribution) => {
    return user ? contribution.userId === user._id : false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white relative overflow-x-hidden">
      {/* Efecto de partículas/fondo cyberpunk */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cyberpunk-glow" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-green-900/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border-2 border-green-400/50 rounded-3xl p-8 shadow-2xl">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                🚀
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-extrabold mb-4 tracking-widest bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent"
              >
                CONTRIBUCIONES
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-green-200 max-w-3xl mx-auto"
              >
                Contribuye al desarrollo de la plataforma, comparte tu conocimiento y gana reconocimiento
              </motion.p>
            </div>
          </div>
        </motion.header>

        {/* Estadísticas de Contribuciones */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {/* Total Contribuciones */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                🚀
              </motion.div>
              <div className="text-3xl font-bold text-green-400 mb-1">
                {contributions.length}
              </div>
              <div className="text-green-200 text-sm">Total Contribuciones</div>
            </div>
          </motion.div>

          {/* Aceptadas */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-blue-400/50 rounded-2xl p-6 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2"
              >
                ✅
              </motion.div>
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {contributions.filter(c => c.status === 'accepted').length}
              </div>
              <div className="text-blue-200 text-sm">Aceptadas</div>
            </div>
          </motion.div>

          {/* En Revisión */}
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
                👁️
              </motion.div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                {contributions.filter(c => c.status === 'reviewed').length}
              </div>
              <div className="text-yellow-200 text-sm">En Revisión</div>
            </div>
          </motion.div>

          {/* Puntos Totales */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-6 text-center">
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
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {contributions
                  .filter(c => c.status === 'accepted')
                  .reduce((sum, c) => sum + c.points, 0)
                }
              </div>
              <div className="text-purple-200 text-sm">Puntos Ganados</div>
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
                placeholder="Buscar contribuciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white placeholder-cyan-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                🔍
              </div>
            </div>
          </div>

          {/* Filtro de Tipo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
            <div className="relative bg-black/60 backdrop-blur-sm border-2 border-blue-400/50 rounded-2xl p-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'Todos los tipos' : type.charAt(0).toUpperCase() + type.slice(1)}
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

          {/* Botón Crear */}
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
                Crear Contribución
              </span>
            </div>
          </motion.button>
        </motion.div>

        {/* Grid de Contribuciones */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredContributions.map((contribution, index) => (
              <motion.div
                key={contribution.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(contribution.type)} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-300`}></div>
                
                <div className="relative bg-black/80 backdrop-blur-xl border-2 border-green-400/50 rounded-3xl p-6 shadow-2xl hover:shadow-green-400/30 transition-all duration-300 h-full">
                  {/* Header de la contribución */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          animate={{ 
                            scale: contribution.type === 'code' ? [1, 1.2, 1] : 1,
                            rotate: contribution.type === 'design' ? [0, 10, -10, 0] : 0
                          }}
                          transition={{ 
                            duration: contribution.type === 'code' ? 2 : 1, 
                            repeat: contribution.type === 'code' ? Infinity : 0 
                          }}
                          className="text-3xl"
                        >
                          {getTypeIcon(contribution.type)}
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold text-green-200 group-hover:text-green-100 transition-colors">
                            {contribution.title}
                          </h3>
                          <div className="text-sm text-green-300">{contribution.category}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ 
                          scale: contribution.status === 'accepted' ? [1, 1.1, 1] : 1,
                          rotate: contribution.status === 'rejected' ? [0, 10, -10, 0] : 0
                        }}
                        transition={{ 
                          duration: contribution.status === 'accepted' ? 2 : 1, 
                          repeat: contribution.status === 'accepted' ? Infinity : 0 
                        }}
                        className="text-2xl"
                      >
                        {getStatusIcon(contribution.status)}
                      </motion.div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {contribution.description}
                  </p>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-cyan-400">💎</div>
                      <div className="text-sm text-cyan-200">{contribution.points}</div>
                      <div className="text-xs text-gray-400">Puntos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400">📅</div>
                      <div className="text-sm text-blue-200">{new Date(contribution.date).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">Fecha</div>
                    </div>
                  </div>

                  {/* Tags */}
                  {contribution.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {contribution.tags.slice(0, 3).map((tag, idx) => (
                        <div key={idx} className="px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                          {tag}
                        </div>
                      ))}
                      {contribution.tags.length > 3 && (
                        <div className="px-2 py-1 rounded-full text-xs font-bold bg-gray-600 text-gray-300">
                          +{contribution.tags.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getTypeColor(contribution.type)} text-white`}>
                      {contribution.type.toUpperCase()}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getStatusColor(contribution.status)} text-white`}>
                      {contribution.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    {isUserContribution(contribution) && contribution.status === 'pending' && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedContribution(contribution);
                            setContributionForm({
                              title: contribution.title,
                              description: contribution.description,
                              type: contribution.type,
                              category: contribution.category,
                              impact: contribution.impact,
                              files: contribution.files.length > 0 ? contribution.files : [''],
                              links: contribution.links.length > 0 ? contribution.links : [''],
                              tags: contribution.tags.length > 0 ? contribution.tags : ['']
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
                          onClick={() => handleDeleteContribution(contribution.id)}
                          className="flex-1 py-2 px-3 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 transition-all duration-300 text-sm"
                        >
                          Eliminar
                        </motion.button>
                      </>
                    )}
                    {!isUserContribution(contribution) && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedContribution(contribution);
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

        {/* Mensaje cuando no hay contribuciones */}
        {filteredContributions.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold text-green-200 mb-4">No se encontraron contribuciones</h3>
            <p className="text-gray-400 mb-8">Intenta ajustar los filtros o crea la primera contribución</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-8 py-4 rounded-2xl hover:from-green-500 hover:to-green-600 transition-all duration-300"
            >
              Crear Primera Contribución
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Modal para crear/editar contribución */}
      <Modal
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
          setSelectedContribution(null);
        }}
        title={showEditModal ? "Editar Contribución" : "Crear Nueva Contribución"}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Título</label>
            <input
              type="text"
              value={contributionForm.title}
              onChange={(e) => setContributionForm({...contributionForm, title: e.target.value})}
              className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
              placeholder="Título de la contribución"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Descripción</label>
            <textarea
              value={contributionForm.description}
              onChange={(e) => setContributionForm({...contributionForm, description: e.target.value})}
              className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none h-24"
              placeholder="Describe tu contribución..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-200 mb-2">Tipo</label>
              <select
                value={contributionForm.type}
                onChange={(e) => setContributionForm({...contributionForm, type: e.target.value as any})}
                className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
              >
                <option value="code">Código</option>
                <option value="documentation">Documentación</option>
                <option value="design">Diseño</option>
                <option value="testing">Testing</option>
                <option value="research">Investigación</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-green-200 mb-2">Categoría</label>
              <select
                value={contributionForm.category}
                onChange={(e) => setContributionForm({...contributionForm, category: e.target.value})}
                className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="security">Security</option>
                <option value="ui/ux">UI/UX</option>
                <option value="devops">DevOps</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Impacto</label>
            <textarea
              value={contributionForm.impact}
              onChange={(e) => setContributionForm({...contributionForm, impact: e.target.value})}
              className="w-full bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none h-20"
              placeholder="Describe el impacto de tu contribución..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Archivos</label>
            {contributionForm.files.map((file, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={file}
                  onChange={(e) => {
                    const newFiles = [...contributionForm.files];
                    newFiles[index] = e.target.value;
                    setContributionForm({...contributionForm, files: newFiles});
                  }}
                  className="flex-1 bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
                  placeholder="URL del archivo"
                />
                {contributionForm.files.length > 1 && (
                  <button
                    onClick={() => {
                      const newFiles = contributionForm.files.filter((_, i) => i !== index);
                      setContributionForm({...contributionForm, files: newFiles});
                    }}
                    className="px-3 py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setContributionForm({...contributionForm, files: [...contributionForm.files, '']})}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-colors"
            >
              + Agregar Archivo
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Enlaces</label>
            {contributionForm.links.map((link, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={link}
                  onChange={(e) => {
                    const newLinks = [...contributionForm.links];
                    newLinks[index] = e.target.value;
                    setContributionForm({...contributionForm, links: newLinks});
                  }}
                  className="flex-1 bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
                  placeholder="URL del enlace"
                />
                {contributionForm.links.length > 1 && (
                  <button
                    onClick={() => {
                      const newLinks = contributionForm.links.filter((_, i) => i !== index);
                      setContributionForm({...contributionForm, links: newLinks});
                    }}
                    className="px-3 py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setContributionForm({...contributionForm, links: [...contributionForm.links, '']})}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-colors"
            >
              + Agregar Enlace
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">Tags</label>
            {contributionForm.tags.map((tag, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => {
                    const newTags = [...contributionForm.tags];
                    newTags[index] = e.target.value;
                    setContributionForm({...contributionForm, tags: newTags});
                  }}
                  className="flex-1 bg-black/60 border-2 border-green-400/50 rounded-xl p-3 text-white focus:border-green-400 outline-none"
                  placeholder="Tag"
                />
                {contributionForm.tags.length > 1 && (
                  <button
                    onClick={() => {
                      const newTags = contributionForm.tags.filter((_, i) => i !== index);
                      setContributionForm({...contributionForm, tags: newTags});
                    }}
                    className="px-3 py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setContributionForm({...contributionForm, tags: [...contributionForm.tags, '']})}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-colors"
            >
              + Agregar Tag
            </button>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={showEditModal ? handleEditContribution : handleCreateContribution}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300"
            >
              {showEditModal ? 'Actualizar' : 'Crear'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
                setSelectedContribution(null);
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

export default Contributions;
