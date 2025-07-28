import { t } from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, TrashCan, Search, Add } from '@carbon/icons-react';
import TextareaAutosize from 'react-textarea-autosize';

// Tipos para los mocks
interface VulnerabilityItem {
  name: string;
  description: string;
  problem: string;
  howDetected: string;
  images: string[];
  creationDate?: string;
  deliveryDate?: string;
  detectionDate?: string;
  status?: 'open' | 'closed' | 'pending';
}

interface Vulnerability {
  types: string[]; // array de tipos de vulnerabilidad
  otherType?: string;
  generalDescription: string;
  discoveredBy: string;
  creationDate?: string;
  deliveryDate?: string;
  detectionDate?: string;
  status?: 'open' | 'closed' | 'pending';
  difficulties: {
    [key: string]: VulnerabilityItem[];
  };
}

interface Project {
  id: string;
  name: string;
  projectDescription?: string;
  creationDate?: string;
  deliveryDate?: string;
  detectionDate?: string;
  vulnerabilities: Vulnerability[];
}

const INITIAL_FORM = {
  id: '',
  name: '',
  projectDescription: '',
  creationDate: '',
  deliveryDate: '',
  detectionDate: '',
  vulnerabilities: [
    {
      types: [],
      otherType: '',
      generalDescription: '',
      discoveredBy: '',
      creationDate: '',
      deliveryDate: '',
      detectionDate: '',
      status: 'open' as const,
      difficulties: {
        low: [],
        medium: [],
        high: [],
        critical: []
      }
    }
  ]
};

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: 'acmeWebPlatform', // clave para traducción
    projectDescription: 'Plataforma web de comercio electrónico con múltiples vulnerabilidades identificadas',
    vulnerabilities: [
      {
        types: ['sqlInjection'],
        otherType: '',
        generalDescription: 'sqlInjectionDesc',
        discoveredBy: 'automatedPentestOwaspZap',
        creationDate: '2024-01-15',
        deliveryDate: '2024-02-01',
        detectionDate: '2024-01-20',
        status: 'open',
        difficulties: {
          low: [
            {
              name: 'basicSQLi',
              description: 'basicSQLiDesc',
              problem: 'basicSQLiProblem',
              howDetected: 'basicSQLiHowDetected',
              images: [],
              creationDate: '2024-01-15',
              deliveryDate: '2024-02-01',
              detectionDate: '2024-01-20',
              status: 'open',
            },
          ],
          high: [
            {
              name: 'advancedSQLi',
              description: 'advancedSQLiDesc',
              problem: 'advancedSQLiProblem',
              howDetected: 'advancedSQLiHowDetected',
              images: [],
              creationDate: '2024-01-18',
              deliveryDate: '2024-02-05',
              detectionDate: '2024-01-22',
              status: 'pending',
            },
          ],
        },
      },
      {
        types: ['xss'],
        otherType: '',
        generalDescription: 'xssDesc',
        discoveredBy: 'manualCodeReview',
        creationDate: '2024-01-10',
        deliveryDate: '2024-01-25',
        detectionDate: '2024-01-12',
        status: 'closed',
        difficulties: {
          medium: [
            {
              name: 'reflectedXss',
              description: 'reflectedXssDesc',
              problem: 'reflectedXssProblem',
              howDetected: 'reflectedXssHowDetected',
              images: [],
              creationDate: '2024-01-10',
              deliveryDate: '2024-01-25',
              detectionDate: '2024-01-12',
              status: 'closed',
            },
          ],
        },
      },
      {
        types: ['csrf'],
        otherType: '',
        generalDescription: 'csrfDesc',
        discoveredBy: 'burpSuiteTool',
        creationDate: '2024-01-05',
        deliveryDate: '2024-01-20',
        detectionDate: '2024-01-08',
        status: 'open',
        difficulties: {
          critical: [
            {
              name: 'csrfTransfers',
              description: 'csrfTransfersDesc',
              problem: 'csrfTransfersProblem',
              howDetected: 'csrfTransfersHowDetected',
              images: [],
              creationDate: '2024-01-05',
              deliveryDate: '2024-01-20',
              detectionDate: '2024-01-08',
              status: 'open',
            },
          ],
        },
      },
    ],
  },
];

const DIFFICULTY_LABELS = ['low', 'medium', 'high', 'critical'];

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [modalDifficulty, setModalDifficulty] = useState<string | null>(null);
  const [modalVulnType, setModalVulnType] = useState<string | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('low');
  const [projectSearch, setProjectSearch] = useState<string>('');
  
  // Nuevos estados para filtros del modal del proyecto
  const [modalDateFilter, setModalDateFilter] = useState<string>('all');
  const [modalYearFilter, setModalYearFilter] = useState<string>('all');
  const [modalTypeFilter, setModalTypeFilter] = useState<string>('all');
  const [modalStatusFilter, setModalStatusFilter] = useState<string>('all');
  const [modalOrderFilter, setModalOrderFilter] = useState<string>('default');
  
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // Form state
  const emptyVulnItem = { 
  name: '', 
  description: '', 
  problem: '', 
  howDetected: '', 
  images: [],
  creationDate: '',
  deliveryDate: '',
  detectionDate: '',
  status: 'open' as const
};
const emptyVuln = { 
  types: [], 
  otherType: '', 
  generalDescription: '', 
  discoveredBy: '', 
  creationDate: new Date().toISOString().split('T')[0], // Se llena automáticamente
  deliveryDate: '',
  detectionDate: '',
  status: 'open' as const,
  difficulties: { 
    low: [], 
    medium: [], 
    high: [], 
    critical: [] 
  } 
};
  const [form, setForm] = useState<Project>({ id: '', name: '', vulnerabilities: [] });
  const [formError, setFormError] = useState<string | null>(null);

  // 1. Estado para filtros y búsqueda
  const VULN_TYPE_KEYS = ['sqlInjection', 'xss', 'csrf', 'other'];
  const [search, setSearch] = useState('');
  const [typeFilters, setTypeFilters] = useState<string[]>([]);

  // Estado para eliminar proyecto
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [deleteStep, setDeleteStep] = useState<1 | 2 | null>(null);

  // Helpers for form
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleVulnChange = (idx: number, field: string, value: any) => {
    const newVulns = [...form.vulnerabilities];
    newVulns[idx] = { ...newVulns[idx], [field]: value };
    setForm({ ...form, vulnerabilities: newVulns });
  };
  const handleDifficultiesChange = (vulnIdx: number, diff: string, items: VulnerabilityItem[]) => {
    const newVulns = [...form.vulnerabilities];
    newVulns[vulnIdx].difficulties = { ...newVulns[vulnIdx].difficulties, [diff]: items };
    setForm({ ...form, vulnerabilities: newVulns });
  };
  const addVuln = () => {
    setForm({ ...form, vulnerabilities: [...form.vulnerabilities, JSON.parse(JSON.stringify(emptyVuln))] });
  };
  const removeVuln = (idx: number) => {
    const newVulns = [...form.vulnerabilities];
    newVulns.splice(idx, 1);
    setForm({ ...form, vulnerabilities: newVulns });
  };
  const addVulnItem = (vulnIdx: number, diff: string) => {
    const items = form.vulnerabilities[vulnIdx].difficulties[diff] || [];
    const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const newItem = { 
      ...emptyVulnItem, 
      creationDate: currentDate // Se llena automáticamente
    };
    handleDifficultiesChange(vulnIdx, diff, [...items, newItem]);
  };
  const removeVulnItem = (vulnIdx: number, diff: string, itemIdx: number) => {
    const items = form.vulnerabilities[vulnIdx].difficulties[diff] || [];
    items.splice(itemIdx, 1);
    handleDifficultiesChange(vulnIdx, diff, [...items]);
  };
  const handleVulnItemChange = (vulnIdx: number, diff: string, itemIdx: number, field: string, value: any) => {
    const items = form.vulnerabilities[vulnIdx].difficulties[diff] || [];
    items[itemIdx] = { ...items[itemIdx], [field]: value };
    handleDifficultiesChange(vulnIdx, diff, [...items]);
  };
  const resetForm = () => {
    setForm({ 
      id: '', 
      name: '', 
      projectDescription: '',
      creationDate: '',
      deliveryDate: '',
      detectionDate: '',
      vulnerabilities: [] 
    });
    setEditIndex(null);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!form.name.trim()) return;
    // Validar que cada vulnerabilidad tenga al menos un tipo seleccionado
    const invalidVuln = form.vulnerabilities.find(vuln => !Array.isArray(vuln.types) || vuln.types.length === 0);
    if (invalidVuln) {
      setFormError(t('home.errorNoVulnType', { defaultValue: 'Debes seleccionar al menos un tipo de vulnerabilidad en cada vulnerabilidad.' }));
      return;
    }
    
    // Llenar automáticamente la fecha de creación del proyecto si no está definida
    const currentDate = new Date().toISOString().split('T')[0];
    const projectData = {
      ...form,
      creationDate: form.creationDate || currentDate
    };
    
    if (editIndex !== null) {
      const updated = [...projects];
      updated[editIndex] = { ...projectData, id: form.id || `project-${Date.now()}` };
      setProjects(updated);
    } else {
      setProjects([...projects, { ...projectData, id: `project-${Date.now()}` }]);
    }
    setShowForm(false);
    resetForm();
  };
  const handleEdit = (idx: number) => {
    setForm(JSON.parse(JSON.stringify(projects[idx])));
    setEditIndex(idx);
    setShowForm(true);
  };

  // Eliminar proyecto
  const handleDeleteProject = (idx: number) => {
    setProjects(projects => projects.filter((_, i) => i !== idx));
    setDeleteIndex(null);
    setDeleteStep(null);
  };

  // English translations for UI
  const teamName = 'P-TECH';
  const projectCount = projects.length;
  const totalVulns = projects.reduce((acc, project) => {
    return acc + project.vulnerabilities.reduce((sum, v) => {
      return sum + DIFFICULTY_LABELS.reduce((dSum, diff) => dSum + ((v.difficulties[diff] || []).length), 0);
    }, 0);
  }, 0);

  const openVulnModal = (project: Project, difficulty: string) => {
    setModalProject(project);
    setModalDifficulty(difficulty);
    setModalVulnType(null);
  };
  const closeVulnModal = () => {
    setModalProject(null);
    setModalDifficulty(null);
    setModalVulnType(null);
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setSelectedDifficulty('low');
    setProjectSearch('');
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
    setSelectedProject(null);
    setSelectedDifficulty('low');
    setProjectSearch('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-6">
      {/* Header de equipo y stats */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-2">
        <div>
          <div className="text-2xl font-bold text-black dark:text-gray-100 mb-1">{teamName}</div>
          <div className="text-gray-900 dark:text-gray-300 text-base">Projects: <span className="font-semibold">{projectCount}</span></div>
        </div>
        <div className="text-lg font-semibold text-blue-700 dark:text-blue-300 mt-2 md:mt-0">Vulnerabilities: <span className="font-bold">{totalVulns}</span></div>
      </div>
      {/* Formulario expandible para crear/editar proyecto */}
      <div className="mb-8">
        {showForm && (
          <form className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 border-4 border-blue-400" onSubmit={handleSubmit}>
            {formError && <div className="text-red-600 text-sm font-bold mb-2">{formError}</div>}
            <div>
              <label className="font-bold">{t('home.projectName')}</label>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder={t('home.help.projectName')}
                className={`w-full border rounded p-2 mt-1 placeholder-gray-400 ${form.name ? 'text-black font-bold' : 'text-gray-400'}`}
                required
              />
              <TextareaAutosize
                minRows={2}
                placeholder={t('home.projectDescription', { defaultValue: 'Descripción del proyecto' })}
                value={form.projectDescription || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...form, projectDescription: e.target.value })}
                className={`w-full border rounded p-2 mt-2 placeholder-gray-400 resize-none ${form.projectDescription ? 'text-black font-bold' : 'text-gray-400'}`}
              />
              
              {/* Campos de fecha del proyecto */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('home.projectCreationDate')}
                  </label>
                  <input
                    type="date"
                    name="creationDate"
                    value={form.creationDate || ''}
                    onChange={(e) => setForm({ ...form, creationDate: e.target.value })}
                    className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${form.creationDate ? 'text-black' : 'text-gray-400'}`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('home.projectDeliveryDate')}
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={form.deliveryDate || ''}
                    onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                    className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${form.deliveryDate ? 'text-black' : 'text-gray-400'}`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('home.projectDetectionDate')}
                  </label>
                  <input
                    type="date"
                    name="detectionDate"
                    value={form.detectionDate || ''}
                    onChange={(e) => setForm({ ...form, detectionDate: e.target.value })}
                    className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${form.detectionDate ? 'text-black' : 'text-gray-400'}`}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="font-bold">{t('home.vulnerabilities')}</label>
              <button type="button" className="ml-2 px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700" onClick={addVuln}>{t('home.addVulnerability')}</button>
              {form.vulnerabilities.map((vuln, vIdx) => (
                <div key={vIdx} className="border rounded p-3 mt-2 bg-gray-50 dark:bg-gray-800">
                  {/* Agrupa todo en un solo div padre */}
                  <div>
                    {/* Filtros de tipo de vulnerabilidad dentro de cada vulnerabilidad */}
                    <div className="flex flex-col gap-2">
                      {/* Tipos y Other */}
                      <div className="flex flex-wrap gap-2">
                        {VULN_TYPE_KEYS.filter(type => type !== 'other').map(type => (
                          <button
                            key={type}
                            type="button"
                            className={`flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 text-gray-800 font-semibold border border-gray-300 ${Array.isArray(vuln.types) && vuln.types.includes(type) ? 'ring-2 ring-gray-500' : ''}`}
                            onClick={() => {
                              const types = Array.isArray(vuln.types) ? [...vuln.types] : [];
                              if (types.includes(type)) {
                                handleVulnChange(vIdx, 'types', types.filter(t => t !== type));
                              } else {
                                handleVulnChange(vIdx, 'types', [...types, type]);
                              }
                            }}
                          >
                            <span className="capitalize">{type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}</span>
                            {Array.isArray(vuln.types) && vuln.types.includes(type) && (
                              <span className="ml-1 text-xs text-gray-600 font-bold">×</span>
                            )}
                          </button>
                        ))}
                        {/* Opción Other como botón moderno, seleccionable/deseleccionable */}
                        <button
                          key="other"
                          type="button"
                          className={`flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 text-gray-800 font-semibold border border-gray-300 ${Array.isArray(vuln.types) && vuln.types.includes('other') ? 'ring-2 ring-gray-500' : ''}`}
                          onClick={() => {
                            const types = Array.isArray(vuln.types) ? [...vuln.types] : [];
                            const newVulns = [...form.vulnerabilities];
                            if (types.includes('other')) {
                              newVulns[vIdx] = { ...newVulns[vIdx], types: types.filter(t => t !== 'other'), otherType: '' };
                            } else {
                              newVulns[vIdx] = { ...newVulns[vIdx], types: [...types, 'other'] };
                            }
                            setForm({ ...form, vulnerabilities: newVulns });
                          }}
                        >
                          <span className="capitalize">{t('home.other', { defaultValue: 'Other' }).charAt(0).toUpperCase() + t('home.other', { defaultValue: 'Other' }).slice(1).toLowerCase()}</span>
                          {Array.isArray(vuln.types) && vuln.types.includes('other') && (
                            <span className="ml-1 text-xs text-gray-600 font-bold">×</span>
                          )}
                        </button>
                      </div>
                      {/* Opción All al final, como checkbox moderno */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <label key="all" className="flex items-center gap-2 cursor-pointer select-none px-2 py-1">
                          <span className="capitalize">{t('home.all', { defaultValue: 'All' }).charAt(0).toUpperCase() + t('home.all', { defaultValue: 'All' }).slice(1).toLowerCase()}</span>
                          <input
                            type="checkbox"
                            checked={VULN_TYPE_KEYS.filter(type => type !== 'other').every(type => Array.isArray(vuln.types) && vuln.types.includes(type))}
                            onChange={e => {
                              if (e.target.checked) {
                                // Selecciona todos excepto 'other'
                                handleVulnChange(vIdx, 'types', VULN_TYPE_KEYS.filter(type => type !== 'other').concat(Array.isArray(vuln.types) && vuln.types.includes('other') ? ['other'] : []));
                              } else {
                                // Deselecciona todos excepto 'other'
                                handleVulnChange(vIdx, 'types', Array.isArray(vuln.types) && vuln.types.includes('other') ? ['other'] : []);
                              }
                            }}
                            className="w-5 h-5 accent-blue-600 rounded transition-all duration-150 border-2 border-gray-400 focus:ring-2 focus:ring-blue-500"
                          />
                        </label>
                      </div>
                    </div>
                    {/* Si 'other' está seleccionado, muestra input para tipo personalizado */}
                    {Array.isArray(vuln.types) && vuln.types.includes('other') && (
                      <input
                        type="text"
                        value={vuln.otherType || ''}
                        onChange={e => handleVulnChange(vIdx, 'otherType', e.target.value)}
                        placeholder={t('home.vulnTypeLabel', { defaultValue: 'Tipo de Vulnerabilidad' })}
                        className="border rounded p-1 mt-1 placeholder-gray-400"
                      />
                    )}
                  </div>
                  <TextareaAutosize
                    minRows={2}
                    placeholder={t('home.help.generalDescription')}
                    value={vuln.generalDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleVulnChange(vIdx, 'generalDescription', e.target.value)}
                    className={`border rounded p-1 w-full mt-1 placeholder-gray-400 resize-none ${vuln.generalDescription ? 'text-black font-bold' : 'text-gray-400'}`}
                    required
                  />
                  <input
                    placeholder={t('home.help.discoveredBy')}
                    value={vuln.discoveredBy}
                    onChange={e => handleVulnChange(vIdx, 'discoveredBy', e.target.value)}
                    className={`border rounded p-1 w-full mt-1 placeholder-gray-400 ${vuln.discoveredBy ? 'text-black font-bold' : 'text-gray-400'}`}
                    required
                  />
                  
                  {/* Campos de fecha de la vulnerabilidad */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {t('home.creationDate')}
                      </label>
                      <input
                        type="date"
                        value={vuln.creationDate || ''}
                        onChange={e => handleVulnChange(vIdx, 'creationDate', e.target.value)}
                        className={`border rounded p-1 w-full text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${vuln.creationDate ? 'text-black' : 'text-gray-400'}`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {t('home.deliveryDate')}
                      </label>
                      <input
                        type="date"
                        value={vuln.deliveryDate || ''}
                        onChange={e => handleVulnChange(vIdx, 'deliveryDate', e.target.value)}
                        className={`border rounded p-1 w-full text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${vuln.deliveryDate ? 'text-black' : 'text-gray-400'}`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {t('home.detectionDate')}
                      </label>
                      <input
                        type="date"
                        value={vuln.detectionDate || ''}
                        onChange={e => handleVulnChange(vIdx, 'detectionDate', e.target.value)}
                        className={`border rounded p-1 w-full text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${vuln.detectionDate ? 'text-black' : 'text-gray-400'}`}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    {DIFFICULTY_LABELS.map(diff => (
                      <div key={diff} className="mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{t(`dashboard.difficulty.${diff}`, { defaultValue: diff })}</span>
                          <button type="button" className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700" onClick={() => addVulnItem(vIdx, diff)}>{t('home.addItem')}</button>
                        </div>
                        {(vuln.difficulties[diff] || []).map((item, iIdx) => (
                          <div key={iIdx} className="flex flex-col gap-2 mt-1 border rounded p-2 bg-white dark:bg-gray-700">
                            <div className="w-full">
                              <input
                                placeholder={t('home.help.name')}
                                value={item.name}
                                onChange={e => handleVulnItemChange(vIdx, diff, iIdx, 'name', e.target.value)}
                                className={`border rounded p-1 w-full placeholder-gray-400 ${item.name ? 'text-black font-bold' : 'text-gray-400'}`}
                                required
                              />
                            </div>
                            <div className="flex gap-2">
                              <TextareaAutosize
                                minRows={2}
                                placeholder={t('home.help.description')}
                                value={item.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleVulnItemChange(vIdx, diff, iIdx, 'description', e.target.value)}
                                className={`border rounded p-1 flex-1 placeholder-gray-400 resize-none ${item.description ? 'text-black font-bold' : 'text-gray-400'}`}
                                required
                              />
                              <TextareaAutosize
                                minRows={2}
                                placeholder={t('home.help.problem')}
                                value={item.problem}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleVulnItemChange(vIdx, diff, iIdx, 'problem', e.target.value)}
                                className={`border rounded p-1 flex-1 placeholder-gray-400 resize-none ${item.problem ? 'text-black font-bold' : 'text-gray-400'}`}
                                required
                              />
                              <TextareaAutosize
                                minRows={2}
                                placeholder={t('home.help.howDetected')}
                                value={item.howDetected}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleVulnItemChange(vIdx, diff, iIdx, 'howDetected', e.target.value)}
                                className={`border rounded p-1 flex-1 placeholder-gray-400 resize-none ${item.howDetected ? 'text-black font-bold' : 'text-gray-400'}`}
                                required
                              />
                              <button type="button" className="text-red-600 font-bold" onClick={() => removeVulnItem(vIdx, diff, iIdx)}>{t('home.removeItem')}</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      className="px-3 py-1 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors"
                      onClick={() => removeVuln(vIdx)}
                    >
                      {t('home.removeVulnerability')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">
                {editIndex !== null ? t('home.save') : t('home.create')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditIndex(null);
                  setShowForm(false);
                  setForm(INITIAL_FORM);
                  setDeleteIndex(null);
                  setDeleteStep(1);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded font-bold hover:bg-gray-600"
              >
                {t('home.cancel')}
              </button>
            </div>
          </form>
        )}
      </div>
      {/* Buscador arriba de las cards (sin filtros globales) */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-800" />
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('home.searchVuln')}
            className={`w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 ${search ? 'text-black' : 'text-gray-600'}`}
          />
        </div>
      </div>
      {/* Cards filtradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.filter(project => {
          // Filtro por texto
          const searchText = search.toLowerCase();
          const matchesText =
            project.name.toLowerCase().includes(searchText) ||
            project.vulnerabilities.some(vuln =>
              Array.isArray(vuln.types) &&
              vuln.types.some(type => t(`home.${type}`, { defaultValue: type }).toLowerCase().includes(searchText))
            );
          // Filtro por tipo
          const matchesType =
            typeFilters.length === 0 ||
            project.vulnerabilities.some(vuln => vuln.types && vuln.types.some(type => typeFilters.includes(type)));
          return matchesText && matchesType;
        }).map((project, idx) => {
          // Mock para deployment
          const lastDeployment = '26 days ago';
          const deploymentName = 'nodejs-v20-npm-container-image - v1';
          // Total vulnerabilities
          const totalVulns = project.vulnerabilities.reduce((acc, v) => {
            return acc + DIFFICULTY_LABELS.reduce((sum, diff) => sum + ((v.difficulties[diff] || []).length), 0);
          }, 0);
          // Count by difficulty
          const difficultyCounts = DIFFICULTY_LABELS.map(diff =>
            project.vulnerabilities.reduce((acc, v) => acc + ((v.difficulties[diff] || []).length), 0)
          );
          return (
            <div 
              key={project.id} 
              className="project-card bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 min-w-[320px] border-4 border-blue-600 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openProjectModal(project)}
            >
              <div className="flex items-center mb-2">
                <button
                  className="flex items-center justify-center px-2 py-1 bg-blue-600 text-white rounded font-bold hover:bg-blue-700"
                  onClick={ev => { ev.stopPropagation(); handleEdit(idx); }}
                  aria-label={t('home.editProject')}
                  title={t('home.editProject')}
                >
                  <Edit size={20} />
                </button>
              </div>
              {/* Project name (traducido si existe clave) */}
              <div className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{t('home.acmeWebPlatform', project.name)}</div>
              {/* Vulnerabilities list (show type, description, discoveredBy translated) */}
              <ul className="mb-2">
                {project.vulnerabilities.map((vuln, vIdx) => (
                  <li key={vIdx} className="mb-1">
                    <span className="font-semibold">
                      {Array.isArray(vuln.types) && vuln.types.length > 0
                        ? vuln.types.map(type =>
                            type === 'other' && vuln.otherType
                              ? vuln.otherType.toUpperCase()
                              : t(`home.${type}`, { defaultValue: type }).toUpperCase()
                          ).join(', ')
                        : ''}
                    </span>: {t(`home.${vuln.generalDescription}`, vuln.generalDescription)}<br />
                    <span className="text-xs text-gray-500">{t(`home.${vuln.discoveredBy}`, vuln.discoveredBy)}</span>
                  </li>
                ))}
              </ul>
              {/* Difficulty row */}
              <div className="flex w-full justify-between mb-2">
                {DIFFICULTY_LABELS.map((diff, idx) => (
                  <div key={diff} className="flex flex-col items-center flex-1">
                    <span className="text-xs text-gray-500 mb-1">{t(`dashboard.difficulty.${diff}`, { defaultValue: diff })}</span>
                    <button
                      className="text-lg font-semibold text-gray-900 dark:text-gray-100 focus:outline-none"
                      onClick={() => openVulnModal(project, diff)}
                      disabled={difficultyCounts[idx] === 0}
                      style={{ cursor: difficultyCounts[idx] === 0 ? 'not-allowed' : 'pointer', opacity: difficultyCounts[idx] === 0 ? 0.5 : 1 }}
                    >
                      {difficultyCounts[idx]}
                    </button>
                  </div>
                ))}
              </div>
              {/* Totals and deployment row (labels traducidos) */}
              <div className="flex w-full justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                <div>{t('home.totalVulnerabilities')}</div>
                <div className="font-semibold">{totalVulns}</div>
              </div>
              <div className="flex w-full justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                <div>{t('home.lastDeployment')}</div>
                <div>{lastDeployment}</div>
              </div>
              {/* Deployment image/name */}
              <div className="text-xs text-gray-500 mt-2">{t('home.deploymentName')}: {deploymentName}</div>
              <div className="flex justify-end mt-2">
                <button
                  className="flex items-center justify-center px-2 py-1 bg-red-600 text-white rounded font-bold hover:bg-red-700"
                  onClick={ev => { ev.stopPropagation(); setDeleteIndex(idx); setDeleteStep(1); }}
                  aria-label={t('home.delete')}
                  title={t('home.delete')}
                >
                  <TrashCan size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal de vulnerabilidades */}
      {modalProject && modalDifficulty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex relative">
            {/* Sidebar de vulnerabilidades que tienen ítems en la dificultad seleccionada */}
            <div className="w-64 bg-gray-100 dark:bg-gray-800 rounded-l-2xl p-4 overflow-y-auto">
              <div className="font-bold mb-4">{t('dashboard.vulnerabilityTypes')}</div>
              <ul className="space-y-2">
                {modalProject.vulnerabilities
                  .filter((v: Vulnerability) => (v.difficulties[modalDifficulty] || []).length > 0)
                  .map((v: Vulnerability, idx) => (
                    <li key={v.types && v.types.length > 0 ? v.types.join('-') : idx}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition ${modalVulnType === (v.types && v.types[0]) ? 'bg-blue-200 dark:bg-blue-700' : 'hover:bg-blue-100 dark:hover:bg-blue-700'}`}
                        onClick={() => setModalVulnType(v.types && v.types[0])}
                      >
                        {Array.isArray(v.types) && v.types.length > 0
                          ? v.types.map(type =>
                              type === 'other' && v.otherType
                                ? v.otherType.toUpperCase()
                                : t(`home.${type}`, { defaultValue: type }).toUpperCase()
                            ).join(', ')
                          : ''}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Contenido principal de la modal de vulnerabilidad */}
            <div className="flex-1 flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {t(`home.${modalVulnType}`, { defaultValue: modalVulnType })}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {modalProject.projectDescription || t('home.projectDesc')}
                </p>
              </div>

              {/* Pestañas de dificultad */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  {DIFFICULTY_LABELS.map((diff) => {
                    const itemCount = modalProject.vulnerabilities.reduce((acc, vuln) => {
                      return acc + ((vuln.difficulties[diff] || []).length);
                    }, 0);
                    return (
                      <button
                        key={diff}
                        className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                          modalDifficulty === diff
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                        onClick={() => setModalDifficulty(diff)}
                      >
                        {t(`dashboard.difficulty.${diff}`, { defaultValue: diff })} ({itemCount})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contenido de la pestaña seleccionada */}
              <div className="flex-1 px-6 py-4 overflow-y-auto">
                <div className="space-y-4">
                  {(() => {
                    // Obtener todos los ítems de la dificultad seleccionada
                    const allItems: Array<{
                      vulnType: string;
                      vulnDescription: string;
                      vulnDiscoveredBy: string;
                      item: VulnerabilityItem;
                    }> = [];
                    
                    modalProject.vulnerabilities.forEach(vuln => {
                      const items = vuln.difficulties[modalDifficulty] || [];
                      items.forEach(item => {
                        allItems.push({
                          vulnType: Array.isArray(vuln.types) && vuln.types.length > 0
                            ? vuln.types.map(type =>
                                type === 'other' && vuln.otherType
                                  ? vuln.otherType.toUpperCase()
                                  : t(`home.${type}`, { defaultValue: type }).toUpperCase()
                              ).join(', ')
                            : '',
                          vulnDescription: t(`home.${vuln.generalDescription}`, { defaultValue: vuln.generalDescription }),
                          vulnDiscoveredBy: t(`home.${vuln.discoveredBy}`, { defaultValue: vuln.discoveredBy }),
                          item
                        });
                      });
                    });

                    // Filtrar por búsqueda
                    const filteredItems = allItems.filter(item => {
                      const searchText = projectSearch.toLowerCase();
                      return (
                        item.vulnType.toLowerCase().includes(searchText) ||
                        item.vulnDescription.toLowerCase().includes(searchText) ||
                        item.vulnDiscoveredBy.toLowerCase().includes(searchText) ||
                        t(`home.${item.item.name}`, { defaultValue: item.item.name }).toLowerCase().includes(searchText) ||
                        t(`home.${item.item.description}`, { defaultValue: item.item.description }).toLowerCase().includes(searchText) ||
                        t(`home.${item.item.problem}`, { defaultValue: item.item.problem }).toLowerCase().includes(searchText) ||
                        t(`home.${item.item.howDetected}`, { defaultValue: item.item.howDetected }).toLowerCase().includes(searchText)
                      );
                    });

                    return filteredItems.length === 0 ? (
                      <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                        {projectSearch ? t('dashboard.noVulns') : t('dashboard.noVulns')}
                      </div>
                    ) : (
                      filteredItems.map((itemData, idx) => (
                        <div key={idx} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                          <div className="mb-3">
                            <div className="font-bold text-lg text-blue-600 dark:text-blue-400 mb-1">
                              {itemData.vulnType}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {itemData.vulnDescription}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {t('dashboard.discoveredBy')}: {itemData.vulnDiscoveredBy}
                            </div>
                          </div>
                          
                          <div className="border-t pt-3">
                            <div className="font-bold text-base mb-2">
                              {t(`home.${itemData.item.name}`, { defaultValue: itemData.item.name })}
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-semibold">{t('dashboard.description')}:</span> 
                                {t(`home.${itemData.item.description}`, { defaultValue: itemData.item.description })}
                              </div>
                              <div>
                                <span className="font-semibold">{t('dashboard.problem')}:</span> 
                                {t(`home.${itemData.item.problem}`, { defaultValue: itemData.item.problem })}
                              </div>
                              <div>
                                <span className="font-semibold">{t('dashboard.howDetected')}:</span> 
                                {t(`home.${itemData.item.howDetected}`, { defaultValue: itemData.item.howDetected })}
                              </div>
                            </div>
                            
                            {itemData.item.images && itemData.item.images.length > 0 && (
                              <div className="mt-3 pt-3 border-t">
                                <div className="font-semibold mb-2">{t('home.images')}:</div>
                                <div className="flex gap-2 flex-wrap">
                                  {itemData.item.images.map((img, i) => (
                                    <img key={i} src={img} alt="evidence" className="w-24 h-24 object-cover rounded border" />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal del proyecto con pestañas de dificultad */}
      {projectModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col">
            {/* Header del modal con buscador */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {t('home.acmeWebPlatform', selectedProject.name)}
                </div>
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-800" />
                  </div>
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={e => setProjectSearch(e.target.value)}
                    placeholder={t('home.searchVuln')}
                    className={`w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 ${projectSearch ? 'text-black' : 'text-gray-600'}`}
                  />
                </div>
              </div>
              <button
                className="rounded-full bg-gray-100 dark:bg-gray-800 text-2xl font-bold text-gray-500 hover:text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700 w-10 h-10 flex items-center justify-center focus:outline-none"
                onClick={closeProjectModal}
                aria-label={t('dashboard.close')}
              >
                &times;
              </button>
            </div>

            {/* Filtros */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-4 items-center">
                {/* Filtro de fecha */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {t('home.dateFilter')}
                  </label>
                  <select
                    value={modalDateFilter}
                    onChange={e => setModalDateFilter(e.target.value)}
                    className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="all">{t('home.all')}</option>
                    <option value="creation">{t('home.creation')}</option>
                    <option value="delivery">{t('home.delivery')}</option>
                    <option value="detection">{t('home.detection')}</option>
                  </select>
                </div>

                {/* Filtro de año */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {t('home.yearFilter')}
                  </label>
                  <select
                    value={modalYearFilter}
                    onChange={e => setModalYearFilter(e.target.value)}
                    className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="all">{t('home.all')}</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>

                {/* Filtro de tipo */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {t('home.typeFilter')}
                  </label>
                  <select
                    value={modalTypeFilter}
                    onChange={e => setModalTypeFilter(e.target.value)}
                    className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="all">{t('home.all')}</option>
                    <option value="sqlInjection">{t('home.sqlInjection')}</option>
                    <option value="xss">{t('home.xss')}</option>
                    <option value="csrf">{t('home.csrf')}</option>
                    <option value="other">{t('home.other')}</option>
                  </select>
                </div>

                {/* Filtro de estado */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {t('home.statusFilter')}
                  </label>
                  <select
                    value={modalStatusFilter}
                    onChange={e => setModalStatusFilter(e.target.value)}
                    className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="all">{t('home.all')}</option>
                    <option value="open">{t('home.open')}</option>
                    <option value="closed">{t('home.closed')}</option>
                    <option value="pending">{t('home.pending')}</option>
                  </select>
                </div>

                {/* Filtro de orden */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {t('home.orderFilter')}
                  </label>
                  <select
                    value={modalOrderFilter}
                    onChange={e => setModalOrderFilter(e.target.value)}
                    className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="default">{t('home.default')}</option>
                    <option value="name">{t('home.byName')}</option>
                    <option value="date">{t('home.byDate')}</option>
                    <option value="type">{t('home.byType')}</option>
                  </select>
                </div>

                {/* Botón de filtrar */}
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
                  onClick={() => {
                    // Los filtros se aplican automáticamente al cambiar los estados
                    // Este botón puede usarse para futuras funcionalidades adicionales
                  }}
                >
                  <Search size={16} />
                  {t('home.filter')}
                </button>
              </div>
            </div>

            {/* Descripción del proyecto */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                {selectedProject.projectDescription || t('home.projectDesc')}
              </p>
            </div>
            
            {/* Pestañas de dificultad */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {DIFFICULTY_LABELS.map((diff) => {
                  const itemCount = selectedProject.vulnerabilities.reduce((acc, vuln) => {
                    return acc + ((vuln.difficulties[diff] || []).length);
                  }, 0);
                  return (
                    <button
                      key={diff}
                      className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                        selectedDifficulty === diff
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setSelectedDifficulty(diff)}
                    >
                      {t(`dashboard.difficulty.${diff}`, { defaultValue: diff })} ({itemCount})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contenido de la pestaña seleccionada */}
            <div className="flex-1 px-6 py-4 overflow-y-auto">
              <div className="space-y-4">
                {(() => {
                  // Obtener todos los ítems de la dificultad seleccionada
                  const allItems: Array<{
                    vulnType: string;
                    vulnDescription: string;
                    vulnDiscoveredBy: string;
                    item: VulnerabilityItem;
                  }> = [];
                  
                  selectedProject.vulnerabilities.forEach(vuln => {
                    const items = vuln.difficulties[selectedDifficulty] || [];
                    items.forEach(item => {
                      allItems.push({
                        vulnType: Array.isArray(vuln.types) && vuln.types.length > 0
                          ? vuln.types.map(type =>
                              type === 'other' && vuln.otherType
                                ? vuln.otherType.toUpperCase()
                                : t(`home.${type}`, { defaultValue: type }).toUpperCase()
                            ).join(', ')
                          : '',
                        vulnDescription: t(`home.${vuln.generalDescription}`, { defaultValue: vuln.generalDescription }),
                        vulnDiscoveredBy: t(`home.${vuln.discoveredBy}`, { defaultValue: vuln.discoveredBy }),
                        item
                      });
                    });
                  });

                  // Aplicar filtros
                  const filteredItems = allItems.filter(item => {
                    // Filtro de búsqueda
                    const searchText = projectSearch.toLowerCase();
                    const matchesSearch = (
                      item.vulnType.toLowerCase().includes(searchText) ||
                      item.vulnDescription.toLowerCase().includes(searchText) ||
                      item.vulnDiscoveredBy.toLowerCase().includes(searchText) ||
                      t(`home.${item.item.name}`, { defaultValue: item.item.name }).toLowerCase().includes(searchText) ||
                      t(`home.${item.item.description}`, { defaultValue: item.item.description }).toLowerCase().includes(searchText) ||
                      t(`home.${item.item.problem}`, { defaultValue: item.item.problem }).toLowerCase().includes(searchText) ||
                      t(`home.${item.item.howDetected}`, { defaultValue: item.item.howDetected }).toLowerCase().includes(searchText)
                    );

                    // Filtro de fecha
                    let matchesDate = true;
                    if (modalDateFilter !== 'all') {
                      const itemDate = item.item[`${modalDateFilter}Date` as keyof VulnerabilityItem] as string;
                      if (itemDate) {
                        const itemYear = new Date(itemDate).getFullYear().toString();
                        matchesDate = modalYearFilter === 'all' || itemYear === modalYearFilter;
                      } else {
                        matchesDate = false;
                      }
                    }

                    // Filtro de tipo
                    let matchesType = true;
                    if (modalTypeFilter !== 'all') {
                      matchesType = item.vulnType.toLowerCase().includes(modalTypeFilter.toLowerCase());
                    }

                    // Filtro de estado
                    let matchesStatus = true;
                    if (modalStatusFilter !== 'all') {
                      matchesStatus = item.item.status === modalStatusFilter;
                    }

                    return matchesSearch && matchesDate && matchesType && matchesStatus;
                  });

                  // Aplicar ordenamiento
                  let sortedItems = [...filteredItems];
                  if (modalOrderFilter !== 'default') {
                    sortedItems.sort((a, b) => {
                      switch (modalOrderFilter) {
                        case 'name':
                          return t(`home.${a.item.name}`, { defaultValue: a.item.name })
                            .localeCompare(t(`home.${b.item.name}`, { defaultValue: b.item.name }));
                        case 'date':
                          const dateA = new Date(a.item.creationDate || '');
                          const dateB = new Date(b.item.creationDate || '');
                          return dateA.getTime() - dateB.getTime();
                        case 'type':
                          return a.vulnType.localeCompare(b.vulnType);
                        default:
                          return 0;
                      }
                    });
                  }

                  return sortedItems.length === 0 ? (
                    <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                      {t('home.notFound')}
                    </div>
                  ) : (
                    sortedItems.map((itemData, idx) => (
                      <div key={idx} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="mb-3">
                          <div className="font-bold text-lg text-blue-600 dark:text-blue-400 mb-1">
                            {itemData.vulnType}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {itemData.vulnDescription}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {t('dashboard.discoveredBy')}: {itemData.vulnDiscoveredBy}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {t('home.creation')}: {itemData.item.creationDate} | {t('home.delivery')}: {itemData.item.deliveryDate} | {t('home.detection')}: {itemData.item.detectionDate}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {t('home.statusFilter')}: {t(`home.${itemData.item.status}`, { defaultValue: itemData.item.status })}
                          </div>
                        </div>
                        
                        <div className="border-t pt-3">
                          <div className="font-bold text-base mb-2">
                            {t(`home.${itemData.item.name}`, { defaultValue: itemData.item.name })}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-semibold">{t('dashboard.description')}:</span> 
                              {t(`home.${itemData.item.description}`, { defaultValue: itemData.item.description })}
                            </div>
                            <div>
                              <span className="font-semibold">{t('dashboard.problem')}:</span> 
                              {t(`home.${itemData.item.problem}`, { defaultValue: itemData.item.problem })}
                            </div>
                            <div>
                              <span className="font-semibold">{t('dashboard.howDetected')}:</span> 
                              {t(`home.${itemData.item.howDetected}`, { defaultValue: itemData.item.howDetected })}
                            </div>
                          </div>
                          
                          {itemData.item.images && itemData.item.images.length > 0 && (
                            <div className="mt-3 pt-3 border-t">
                              <div className="font-semibold mb-2">{t('home.images')}:</div>
                              <div className="flex gap-2 flex-wrap">
                                {itemData.item.images.map((img, i) => (
                                  <img key={i} src={img} alt="evidence" className="w-24 h-24 object-cover rounded border" />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Botón flotante Add Project en esquina inferior derecha */}
      <button
        className={`fixed bottom-20 right-6 md:right-10 z-40 rounded-full p-3 shadow-lg transition-colors ${
          showForm 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        onClick={() => {
          if (showForm) {
            // Cancelar: limpiar formulario y cerrarlo
            setShowForm(false);
            setEditIndex(null);
            setForm(INITIAL_FORM);
            setDeleteIndex(null);
            setDeleteStep(1);
          } else {
            // Abrir formulario
            setShowForm(true);
          }
        }}
        aria-label={showForm ? t('home.cancel') : t('home.addProject')}
        title={showForm ? t('home.cancel') : t('home.addProject')}
      >
        {showForm ? (
          <span className="text-2xl font-bold">×</span>
        ) : (
          <Add size={30} />
        )}
      </button>
    </div>
  );
};

export default Home;