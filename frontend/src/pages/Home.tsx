import { t } from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, TrashCan } from '@carbon/icons-react';

// Tipos para los mocks
interface VulnerabilityItem {
  name: string;
  description: string;
  problem: string;
  howDetected: string;
  images: string[];
}

interface Vulnerability {
  types: string[]; // array de tipos de vulnerabilidad
  otherType?: string;
  generalDescription: string;
  discoveredBy: string;
  difficulties: {
    [key: string]: VulnerabilityItem[];
  };
}

interface Project {
  id: string;
  name: string;
  vulnerabilities: Vulnerability[];
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: 'acmeWebPlatform', // clave para traducción
    vulnerabilities: [
      {
        types: ['sqlInjection'],
        otherType: '',
        generalDescription: 'sqlInjectionDesc',
        discoveredBy: 'automatedPentestOwaspZap',
        difficulties: {
          low: [
            {
              name: 'basicSQLi',
              description: 'basicSQLiDesc',
              problem: 'basicSQLiProblem',
              howDetected: 'basicSQLiHowDetected',
              images: [],
            },
          ],
          high: [
            {
              name: 'advancedSQLi',
              description: 'advancedSQLiDesc',
              problem: 'advancedSQLiProblem',
              howDetected: 'advancedSQLiHowDetected',
              images: [],
            },
          ],
        },
      },
      {
        types: ['xss'],
        otherType: '',
        generalDescription: 'xssDesc',
        discoveredBy: 'manualCodeReview',
        difficulties: {
          medium: [
            {
              name: 'reflectedXss',
              description: 'reflectedXssDesc',
              problem: 'reflectedXssProblem',
              howDetected: 'reflectedXssHowDetected',
              images: [],
            },
          ],
        },
      },
      {
        types: ['csrf'],
        otherType: '',
        generalDescription: 'csrfDesc',
        discoveredBy: 'burpSuiteTool',
        difficulties: {
          critical: [
            {
              name: 'csrfTransfers',
              description: 'csrfTransfersDesc',
              problem: 'csrfTransfersProblem',
              howDetected: 'csrfTransfersHowDetected',
              images: [],
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
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // Form state
  const emptyVulnItem = { name: '', description: '', problem: '', howDetected: '', images: [] };
  const emptyVuln = { type: '', generalDescription: '', discoveredBy: '', difficulties: { Low: [], Medium: [], High: [], Critical: [] } };
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
    handleDifficultiesChange(vulnIdx, diff, [...items, { ...emptyVulnItem }]);
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
    setForm({ id: '', name: '', vulnerabilities: [] });
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
    if (editIndex !== null) {
      const updated = [...projects];
      updated[editIndex] = { ...form, id: form.id || `project-${Date.now()}` };
      setProjects(updated);
    } else {
      setProjects([...projects, { ...form, id: `project-${Date.now()}` }]);
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

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6 py-6">
      {/* Header de equipo y stats */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-2">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{teamName}</div>
          <div className="text-gray-600 dark:text-gray-300 text-base">Projects: <span className="font-semibold">{projectCount}</span></div>
        </div>
        <div className="text-lg font-semibold text-blue-700 dark:text-blue-300 mt-2 md:mt-0">Vulnerabilities: <span className="font-bold">{totalVulns}</span></div>
      </div>
      {/* Formulario expandible para crear/editar proyecto */}
      <div className="mb-8">
        <button
          className="mb-2 px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700"
          onClick={() => { setShowForm((prev) => !prev); if (!showForm) resetForm(); }}
        >
          {showForm ? t('home.cancel') : (editIndex !== null ? t('home.editProject') : t('home.addProject'))}
        </button>
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
                  <input
                    placeholder={t('home.help.generalDescription')}
                    value={vuln.generalDescription}
                    onChange={e => handleVulnChange(vIdx, 'generalDescription', e.target.value)}
                    className={`border rounded p-1 w-full mt-1 placeholder-gray-400 ${vuln.generalDescription ? 'text-black font-bold' : 'text-gray-400'}`}
                    required
                  />
                  <input
                    placeholder={t('home.help.discoveredBy')}
                    value={vuln.discoveredBy}
                    onChange={e => handleVulnChange(vIdx, 'discoveredBy', e.target.value)}
                    className={`border rounded p-1 w-full mt-1 placeholder-gray-400 ${vuln.discoveredBy ? 'text-black font-bold' : 'text-gray-400'}`}
                    required
                  />
                  <div className="mt-2">
                    {DIFFICULTY_LABELS.map(diff => (
                      <div key={diff} className="mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{t(`dashboard.difficulty.${diff}`, { defaultValue: diff })}</span>
                          <button type="button" className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700" onClick={() => addVulnItem(vIdx, diff)}>{t('home.addItem')}</button>
                        </div>
                        {(vuln.difficulties[diff] || []).map((item, iIdx) => (
                          <div key={iIdx} className="flex flex-col md:flex-row gap-2 mt-1 border rounded p-2 bg-white dark:bg-gray-700">
                            <input
                              placeholder={t('home.help.name')}
                              value={item.name}
                              onChange={e => handleVulnItemChange(vIdx, diff, iIdx, 'name', e.target.value)}
                              className={`border rounded p-1 flex-1 placeholder-gray-400 ${item.name ? 'text-black font-bold' : 'text-gray-400'}`}
                              required
                            />
                            <input
                              placeholder={t('home.help.description')}
                              value={item.description}
                              onChange={e => handleVulnItemChange(vIdx, diff, iIdx, 'description', e.target.value)}
                              className={`border rounded p-1 flex-1 placeholder-gray-400 ${item.description ? 'text-black font-bold' : 'text-gray-400'}`}
                              required
                            />
                            <input
                              placeholder={t('home.help.problem')}
                              value={item.problem}
                              onChange={e => handleVulnItemChange(vIdx, diff, iIdx, 'problem', e.target.value)}
                              className={`border rounded p-1 flex-1 placeholder-gray-400 ${item.problem ? 'text-black font-bold' : 'text-gray-400'}`}
                              required
                            />
                            <input
                              placeholder={t('home.help.howDetected')}
                              value={item.howDetected}
                              onChange={e => handleVulnItemChange(vIdx, diff, iIdx, 'howDetected', e.target.value)}
                              className={`border rounded p-1 flex-1 placeholder-gray-400 ${item.howDetected ? 'text-black font-bold' : 'text-gray-400'}`}
                              required
                            />
                            <button type="button" className="text-red-600 font-bold" onClick={() => removeVulnItem(vIdx, diff, iIdx)}>{t('home.removeItem')}</button>
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
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">{editIndex !== null ? t('home.save') : t('home.create')}</button>
          </form>
        )}
      </div>
      {/* Buscador arriba de las cards (sin filtros globales) */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('home.searchVuln')}
          className="w-full border rounded p-2 placeholder-gray-400"
        />
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
            <div key={project.id} className="project-card bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 min-w-[320px] border-4 border-blue-600">
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
            {/* Sidebar de tipos de vulnerabilidad */}
            <div className="w-64 bg-gray-100 dark:bg-gray-800 rounded-l-2xl p-4 overflow-y-auto">
              <div className="font-bold mb-4">{t('dashboard.vulnerabilityTypes')}</div>
              <ul className="space-y-2">
                {modalProject.vulnerabilities.filter((v: Vulnerability) => (v.difficulties[modalDifficulty] || []).length > 0).map((v: Vulnerability, idx) => (
                  <li key={v.types && v.types.length > 0 ? v.types.join('-') : idx}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition ${modalVulnType === (v.types && v.types[0]) ? 'bg-blue-200 dark:bg-blue-700' : 'hover:bg-blue-100 dark:hover:bg-blue-700'}`}
                      onClick={() => setModalVulnType(v.types && v.types[0])}
                    >
                      {Array.isArray(v.types) && v.types.length > 0
                        ? v.types.map(type => t(`home.${type}`, { defaultValue: type }).toUpperCase()).join(', ')
                        : ''}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Panel de detalles */}
            <div className="flex-1 p-0 overflow-y-auto relative flex flex-col">
              {/* Header del modal con botón de cerrar */}
              <div className="flex items-center justify-end px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  className="rounded-full bg-gray-100 dark:bg-gray-800 text-2xl font-bold text-gray-500 hover:text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700 w-10 h-10 flex items-center justify-center focus:outline-none"
                  onClick={closeVulnModal}
                  aria-label={t('dashboard.close')}
                >
                  &times;
                </button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                {!modalVulnType && (
                  <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">{t('dashboard.selectVulnType')}</div>
                )}
                {modalVulnType && (() => {
                  const vuln = modalProject.vulnerabilities.find((v) => Array.isArray(v.types) && v.types[0] === modalVulnType);
                  const vulnList = vuln ? (vuln.difficulties[modalDifficulty] || []) : [];
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xl font-bold">
                          {Array.isArray(vuln?.types) && vuln.types.length > 0
                            ? vuln.types.map(type =>
                                type === 'other' && vuln.otherType
                                  ? vuln.otherType.toUpperCase()
                                  : t(`home.${type}`, { defaultValue: type }).toUpperCase()
                              ).join(', ')
                            : ''}
                        </div>
                        {/* Contador de vulnerabilidades por dificultad */}
                        <div className="flex gap-2">
                          {DIFFICULTY_LABELS.map((diff) => (
                            <span key={diff} className={`px-2 py-1 rounded text-xs font-semibold ${diff === modalDifficulty ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
                              {diff}: {vuln ? (vuln.difficulties[diff] || []).length : 0}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-2 text-gray-700 dark:text-gray-200">{t(`home.${vuln?.generalDescription}`, { defaultValue: vuln?.generalDescription })}</div>
                      <div className="mb-2 text-gray-500 dark:text-gray-400 text-sm">{t('dashboard.discoveredBy')}: {t(`home.${vuln?.discoveredBy}`, { defaultValue: vuln?.discoveredBy })}</div>
                      <div className="mb-4">
                        <div className="font-semibold mb-1">{t('dashboard.vulnerabilities', { difficulty: modalDifficulty })}</div>
                        <ul className="space-y-3">
                          {vulnList.length === 0 && <li className="text-gray-400">{t('dashboard.noVulns')}</li>}
                          {vulnList.map((vulnItem: VulnerabilityItem, idx: number) => (
                            <li key={idx} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                              <div className="font-bold text-base mb-1">{t(`home.${vulnItem.name}`, { defaultValue: vulnItem.name })}</div>
                              <div className="mb-1"><span className="font-semibold">{t('dashboard.description')}</span> {t(`home.${vulnItem.description}`, { defaultValue: vulnItem.description })}</div>
                              <div className="mb-1"><span className="font-semibold">{t('dashboard.problem')}</span> {t(`home.${vulnItem.problem}`, { defaultValue: vulnItem.problem })}</div>
                              <div className="mb-1"><span className="font-semibold">{t('dashboard.howDetected')}</span> {t(`home.${vulnItem.howDetected}`, { defaultValue: vulnItem.howDetected })}</div>
                              {vulnItem.images && vulnItem.images.length > 0 && (
                                <div className="mt-2 flex gap-2 flex-wrap">
                                  {vulnItem.images.map((img, i) => (
                                    <img key={i} src={img} alt="evidence" className="w-24 h-24 object-cover rounded border" />
                                  ))}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Banner de confirmación de borrado */}
      {deleteIndex !== null && deleteStep === 1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 max-w-md w-full">
            <div className="text-lg font-bold mb-2">{t('home.deleteConfirmTitle', { defaultValue: '¿Estas seguro de que quieres borrar este proyecto?' })}</div>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700" onClick={() => setDeleteStep(2)}>{t('home.deleteConfirmYes', { defaultValue: 'Sí' })}</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded font-bold hover:bg-gray-400" onClick={() => { setDeleteIndex(null); setDeleteStep(null); }}>{t('home.deleteConfirmNo', { defaultValue: 'No' })}</button>
            </div>
          </div>
        </div>
      )}
      {/* Banner de confirmación final */}
      {deleteIndex !== null && deleteStep === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 max-w-md w-full">
            <div className="text-lg font-bold mb-2">{t('home.deleteFinalTitle', { name: projects[deleteIndex]?.name, defaultValue: 'Confirma la eliminación del proyecto {{name}}' })}</div>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700" onClick={() => handleDeleteProject(deleteIndex)}>{t('home.deleteFinalConfirm', { defaultValue: 'Confirmar' })}</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded font-bold hover:bg-gray-400" onClick={() => { setDeleteIndex(null); setDeleteStep(null); }}>{t('home.deleteFinalCancel', { defaultValue: 'Cancelar' })}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 