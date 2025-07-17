import React, { useState } from 'react';
import { Button, Select, SelectItem, Tag, Tile } from '@carbon/react';
import { WarningAlt, Application, Filter } from '@carbon/icons-react';

interface Vulnerability {
  id: string;
  title: string;
  description: string;
  severity: 'critica' | 'alta' | 'media' | 'baja';
  application: string;
  status: 'pendiente' | 'en_progreso' | 'resuelta';
  reporter: string;
  createdAt: string;
  points: number;
}

const Criticas: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState('todas');
  const [selectedSeverity, setSelectedSeverity] = useState('todas');
  const [viewMode, setViewMode] = useState<'general' | 'aplicaciones'>('general');

  // Datos mockeados
  const applications = [
    { id: 'todas', name: 'Todas las aplicaciones' },
    { id: 'web-app', name: 'Aplicación Web' },
    { id: 'mobile-app', name: 'Aplicación Móvil' },
    { id: 'api-service', name: 'API Service' },
    { id: 'admin-panel', name: 'Panel de Administración' },
  ];

  const vulnerabilities: Vulnerability[] = [
    {
      id: '1',
      title: 'SQL Injection en formulario de login',
      description: 'Vulnerabilidad de inyección SQL en el campo de usuario del formulario de autenticación.',
      severity: 'critica',
      application: 'web-app',
      status: 'pendiente',
      reporter: 'hacker123',
      createdAt: '2024-01-15',
      points: 1000,
    },
    {
      id: '2',
      title: 'XSS Reflejado en búsqueda',
      description: 'Cross-site scripting reflejado en la funcionalidad de búsqueda de productos.',
      severity: 'alta',
      application: 'web-app',
      status: 'en_progreso',
      reporter: 'security_guru',
      createdAt: '2024-01-14',
      points: 750,
    },
    {
      id: '3',
      title: 'Exposición de datos sensibles en API',
      description: 'La API expone información sensible de usuarios sin autenticación adecuada.',
      severity: 'critica',
      application: 'api-service',
      status: 'pendiente',
      reporter: 'bug_hunter',
      createdAt: '2024-01-13',
      points: 1200,
    },
    {
      id: '4',
      title: 'Weak Password Policy',
      description: 'La política de contraseñas es demasiado débil y permite contraseñas simples.',
      severity: 'media',
      application: 'admin-panel',
      status: 'pendiente',
      reporter: 'pen_tester',
      createdAt: '2024-01-12',
      points: 500,
    },
    {
      id: '5',
      title: 'Insecure Direct Object Reference',
      description: 'Los usuarios pueden acceder a recursos de otros usuarios cambiando el ID en la URL.',
      severity: 'alta',
      application: 'mobile-app',
      status: 'pendiente',
      reporter: 'vuln_finder',
      createdAt: '2024-01-11',
      points: 800,
    },
    {
      id: '6',
      title: 'Missing Security Headers',
      description: 'Faltan headers de seguridad importantes como CSP, HSTS, etc.',
      severity: 'baja',
      application: 'web-app',
      status: 'resuelta',
      reporter: 'sec_analyst',
      createdAt: '2024-01-10',
      points: 300,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critica': return 'red';
      case 'alta': return 'purple';
      case 'media': return 'warm-gray';
      case 'baja': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return 'red';
      case 'en_progreso': return 'warm-gray';
      case 'resuelta': return 'green';
      default: return 'gray';
    }
  };

  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    const appMatch = selectedApp === 'todas' || vuln.application === selectedApp;
    const severityMatch = selectedSeverity === 'todas' || vuln.severity === selectedSeverity;
    return appMatch && severityMatch;
  });

  const groupedByApp = applications
    .filter(app => app.id !== 'todas')
    .map(app => ({
      ...app,
      vulnerabilities: vulnerabilities.filter(vuln => vuln.application === app.id)
    }));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <WarningAlt size={32} className="text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Críticas</h1>
        </div>
        <div className="flex gap-3">
          <Button
            kind={viewMode === 'general' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('general')}
          >
            Vista General
          </Button>
          <Button
            kind={viewMode === 'aplicaciones' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('aplicaciones')}
          >
            Por Aplicaciones
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aplicación
            </label>
            <Select
              id="app-select"
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
              className="w-full"
            >
              {applications.map(app => (
                <SelectItem key={app.id} value={app.id} text={app.name} />
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de Severidad
            </label>
            <Select
              id="severity-select"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full"
            >
              <SelectItem value="todas" text="Todas las severidades" />
              <SelectItem value="critica" text="Críticas" />
              <SelectItem value="alta" text="Altas" />
              <SelectItem value="media" text="Medias" />
              <SelectItem value="baja" text="Bajas" />
            </Select>
          </div>
        </div>
      </div>

      {/* Contenido */}
      {viewMode === 'general' ? (
        /* Vista General */
        <div className="space-y-4">
          {filteredVulnerabilities.map(vuln => (
            <Tile key={vuln.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{vuln.title}</h3>
                    <Tag type={getSeverityColor(vuln.severity)} size="sm">
                      {vuln.severity.toUpperCase()}
                    </Tag>
                    <Tag type={getStatusColor(vuln.status)} size="sm">
                      {vuln.status.replace('_', ' ').toUpperCase()}
                    </Tag>
                  </div>
                  <p className="text-gray-600 mb-3">{vuln.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Reportado por: {vuln.reporter}</span>
                    <span>Fecha: {vuln.createdAt}</span>
                    <span className="font-semibold text-green-600">{vuln.points} puntos</span>
                  </div>
                </div>
                <Button kind="primary" size="sm">
                  Ver Detalles
                </Button>
              </div>
            </Tile>
          ))}
        </div>
      ) : (
        /* Vista por Aplicaciones */
        <div className="space-y-8">
          {groupedByApp.map(app => (
            <div key={app.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Application size={20} className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                  <Tag type="blue" size="sm">{app.vulnerabilities.length} vulnerabilidades</Tag>
                </div>
              </div>
              <div className="p-6">
                {app.vulnerabilities.length > 0 ? (
                  <div className="space-y-4">
                    {app.vulnerabilities.map(vuln => (
                      <div key={vuln.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{vuln.title}</h4>
                              <Tag type={getSeverityColor(vuln.severity)} size="sm">
                                {vuln.severity.toUpperCase()}
                              </Tag>
                              <Tag type={getStatusColor(vuln.status)} size="sm">
                                {vuln.status.replace('_', ' ').toUpperCase()}
                              </Tag>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{vuln.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Por: {vuln.reporter}</span>
                              <span>{vuln.createdAt}</span>
                              <span className="font-semibold text-green-600">{vuln.points} pts</span>
                            </div>
                          </div>
                          <Button kind="primary" size="sm">
                            Ver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No hay vulnerabilidades reportadas para esta aplicación.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Criticas; 