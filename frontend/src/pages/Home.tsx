import { t } from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Tipos para los mocks
interface VulnerabilityItem {
  name: string;
  description: string;
  problem: string;
  howDetected: string;
  images: string[];
}

interface Vulnerability {
  type: string;
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
    name: 'Acme Web Platform',
    vulnerabilities: [
      {
        type: 'sqlInjection',
        generalDescription: 'Allows SQL code injection in login forms.',
        discoveredBy: 'Automated pentest OWASP Zap',
        difficulties: {
          Low: [
            {
              name: 'Basic SQLi',
              description: 'The function should sanitize inputs, but it does not.',
              problem: 'No escaping method is used on parameters.',
              howDetected: 'Detected by entering single quotes in the username field.',
              images: [],
            },
          ],
          High: [
            {
              name: 'Advanced SQLi',
              description: 'The function should validate roles, but allows access to sensitive data.',
              problem: 'No privilege separation in queries.',
              howDetected: 'Detected using advanced payloads.',
              images: [],
            },
          ],
        },
      },
      {
        type: 'XSS',
        generalDescription: 'Allows script injection in comments.',
        discoveredBy: 'Manual code review',
        difficulties: {
          Medium: [
            {
              name: 'Reflected XSS',
              description: 'The function should escape HTML, but renders it directly.',
              problem: 'No escaping is used in comments.',
              howDetected: 'Detected by entering <script>alert(1)</script>.',
              images: [],
            },
          ],
        },
      },
      {
        type: 'CSRF',
        generalDescription: 'Allows actions to be performed without user consent.',
        discoveredBy: 'Burp Suite tool',
        difficulties: {
          Critical: [
            {
              name: 'CSRF in transfers',
              description: 'The function should require a CSRF token, but does not validate it.',
              problem: 'No CSRF protection on critical endpoints.',
              howDetected: 'Detected by sending requests from another domain.',
              images: [],
            },
          ],
        },
      },
    ],
  },
];

const DIFFICULTY_LABELS = ['Low', 'Medium', 'High', 'Critical'];

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
    if (!form.name.trim()) return;
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
              <button type="button" className="ml-2 px-2 py-1 bg-green-600 text-white rounded" onClick={addVuln}>{t('home.addVulnerability')}</button>
              {form.vulnerabilities.map((vuln, vIdx) => (
                <div key={vIdx} className="border rounded p-3 mt-2 bg-gray-50 dark:bg-gray-800">
                  <div className="flex gap-2 items-center">
                    <input
                      placeholder={t('home.help.type')}
                      value={vuln.type}
                      onChange={e => handleVulnChange(vIdx, 'type', e.target.value)}
                      className={`border rounded p-1 flex-1 placeholder-gray-400 ${vuln.type ? 'text-black font-bold' : 'text-gray-400'}`}
                      required
                    />
                    <button type="button" className="text-red-600 font-bold" onClick={() => removeVuln(vIdx)}>{t('home.removeVulnerability')}</button>
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
                          <span className="font-semibold">{diff}</span>
                          <button type="button" className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => addVulnItem(vIdx, diff)}>{t('home.addItem')}</button>
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
                </div>
              ))}
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">{editIndex !== null ? t('home.save') : t('home.create')}</button>
          </form>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => {
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
            <div key={project.id} className="project-card bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 min-w-[320px] border-4 border-yellow-400">
              <button className="self-end px-2 py-1 bg-yellow-400 text-gray-900 rounded font-bold hover:bg-yellow-500 mb-2" onClick={() => handleEdit(idx)}>{t('home.editProject')}</button>
              {/* Project name (traducido si existe clave) */}
              <div className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{t('home.acmeWebPlatform', project.name)}</div>
              {/* Vulnerabilities list (show type, description, discoveredBy translated) */}
              <ul className="mb-2">
                {project.vulnerabilities.map((vuln, vIdx) => (
                  <li key={vIdx} className="mb-1">
                    <span className="font-semibold">{t(`home.${vuln.type}`)}</span>: {t(`home.${vuln.generalDescription}`, vuln.generalDescription)}<br />
                    <span className="text-xs text-gray-500">{t(`home.${vuln.discoveredBy}`, vuln.discoveredBy)}</span>
                  </li>
                ))}
              </ul>
              {/* Difficulty row */}
              <div className="flex w-full justify-between mb-2">
                {DIFFICULTY_LABELS.map((diff, idx) => (
                  <div key={diff} className="flex flex-col items-center flex-1">
                    <span className="text-xs text-gray-500 mb-1">{diff}</span>
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
                {modalProject.vulnerabilities.filter((v: Vulnerability) => (v.difficulties[modalDifficulty] || []).length > 0).map((v: Vulnerability) => (
                  <li key={v.type}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition ${modalVulnType === v.type ? 'bg-blue-200 dark:bg-blue-700' : 'hover:bg-blue-100 dark:hover:bg-blue-700'}`}
                      onClick={() => setModalVulnType(v.type)}
                    >
                      {t(`home.${v.type}`)}
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
                  const vuln = modalProject.vulnerabilities.find((v) => v.type === modalVulnType);
                  const vulnList = vuln ? (vuln.difficulties[modalDifficulty] || []) : [];
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xl font-bold">{t(`home.${vuln?.type}`)}</div>
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
    </div>
  );
};

export default Home; 