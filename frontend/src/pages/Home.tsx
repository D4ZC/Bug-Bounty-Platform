import React, { useState } from 'react';

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

const PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: 'Acme Web Platform',
    vulnerabilities: [
      {
        type: 'SQL Injection',
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
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [modalDifficulty, setModalDifficulty] = useState<string | null>(null);
  const [modalVulnType, setModalVulnType] = useState<string | null>(null);

  // English translations for UI
  const teamName = 'P-TECH';
  const projectCount = PROJECTS.length;
  const totalVulns = PROJECTS.reduce((acc, project) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => {
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
              {/* Project name */}
              <div className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{project.name}</div>
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
              {/* Totals and deployment row */}
              <div className="flex w-full justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                <div>Total vulnerabilities</div>
                <div className="font-semibold">{totalVulns}</div>
              </div>
              <div className="flex w-full justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                <div>Last deployment</div>
                <div>{lastDeployment}</div>
              </div>
              {/* Deployment image/name */}
              <div className="text-xs text-gray-500 mt-2">{deploymentName}</div>
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
              <div className="font-bold mb-4">Vulnerability Types</div>
              <ul className="space-y-2">
                {modalProject.vulnerabilities.filter((v: Vulnerability) => (v.difficulties[modalDifficulty] || []).length > 0).map((v: Vulnerability) => (
                  <li key={v.type}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition ${modalVulnType === v.type ? 'bg-blue-200 dark:bg-blue-700' : 'hover:bg-blue-100 dark:hover:bg-blue-700'}`}
                      onClick={() => setModalVulnType(v.type)}
                    >
                      {v.type}
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
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                {!modalVulnType && (
                  <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">Select a vulnerability type from the sidebar.</div>
                )}
                {modalVulnType && (() => {
                  const vuln = modalProject.vulnerabilities.find((v) => v.type === modalVulnType);
                  const vulnList = vuln ? (vuln.difficulties[modalDifficulty] || []) : [];
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xl font-bold">{vuln?.type}</div>
                        {/* Contador de vulnerabilidades por dificultad */}
                        <div className="flex gap-2">
                          {DIFFICULTY_LABELS.map((diff) => (
                            <span key={diff} className={`px-2 py-1 rounded text-xs font-semibold ${diff === modalDifficulty ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
                              {diff}: {vuln ? (vuln.difficulties[diff] || []).length : 0}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-2 text-gray-700 dark:text-gray-200">{vuln?.generalDescription}</div>
                      <div className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Discovered by: {vuln?.discoveredBy}</div>
                      <div className="mb-4">
                        <div className="font-semibold mb-1">Vulnerabilities ({modalDifficulty}):</div>
                        <ul className="space-y-3">
                          {vulnList.length === 0 && <li className="text-gray-400">No vulnerabilities of this difficulty.</li>}
                          {vulnList.map((vulnItem: VulnerabilityItem, idx: number) => (
                            <li key={idx} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                              <div className="font-bold text-base mb-1">{vulnItem.name}</div>
                              <div className="mb-1"><span className="font-semibold">Description:</span> {vulnItem.description}</div>
                              <div className="mb-1"><span className="font-semibold">Problem:</span> {vulnItem.problem}</div>
                              <div className="mb-1"><span className="font-semibold">How detected:</span> {vulnItem.howDetected}</div>
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