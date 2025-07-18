import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const TEAM_SECTIONS = {
  MEMBERS: 'members',
  ANALYTICS: 'analytics',
  COMPETITIONS: 'competitions',
};

const teamMembers = [
  { id: 1, name: 'Pedro Ramiro', role: 'Líder', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: 2, name: 'Ana Torres', role: 'Investigadora', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'Carlos Pérez', role: 'Analista', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 4, name: 'Lucía Gómez', role: 'Pentester', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 5, name: 'Sofía Martínez', role: 'Desarrolladora', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
];

const teamAnalytics = {
  totalPoints: 12450,
  reportsSubmitted: 87,
  bugsResolved: 65,
  competitionsWon: 3,
  avgResponseTime: '2.3 días',
};

const teamCompetitions = [
  { id: 1, name: 'CTF Primavera 2024', position: 1, date: '2024-04-15', achievement: '1er lugar' },
  { id: 2, name: 'Bug Bounty Fest', position: 2, date: '2024-03-10', achievement: '2do lugar' },
  { id: 3, name: 'Hackathon Invierno', position: 4, date: '2024-01-22', achievement: 'Top 5' },
];

const Team: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);

  const renderMembers = () => (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Miembros del equipo</h2>
      <ul className="divide-y divide-gray-200">
        {teamMembers.map(member => (
          <li key={member.id} className="flex items-center gap-4 py-3">
            <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
            <div>
              <div className="font-semibold text-gray-900">{member.name}</div>
              <div className="text-sm text-blue-600">{member.role}</div>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
    </div>
  );

  const renderAnalytics = () => (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Métricas del equipo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-700 mb-1">{teamAnalytics.totalPoints}</span>
          <span className="text-gray-600">Puntos totales</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-green-700 mb-1">{teamAnalytics.reportsSubmitted}</span>
          <span className="text-gray-600">Reportes enviados</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-emerald-700 mb-1">{teamAnalytics.bugsResolved}</span>
          <span className="text-gray-600">Bugs resueltos</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-purple-700 mb-1">{teamAnalytics.competitionsWon}</span>
          <span className="text-gray-600">Competencias ganadas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-orange-700 mb-1">{teamAnalytics.avgResponseTime}</span>
          <span className="text-gray-600">Tiempo de respuesta promedio</span>
        </div>
      </div>
      <button className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
    </div>
  );

  const renderCompetitions = () => (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Competencias y logros</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competencia</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posición</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logro</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teamCompetitions.map(comp => (
            <tr key={comp.id}>
              <td className="px-6 py-4 whitespace-nowrap">{comp.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{comp.position}</td>
              <td className="px-6 py-4 whitespace-nowrap">{comp.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{comp.achievement}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Equipo</h1>
      <p className="text-lg text-gray-600 mb-8">Gestión, métricas y logros del equipo</p>
      {!selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all text-left"
            onClick={() => setSelected(TEAM_SECTIONS.MEMBERS)}
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">👥 Miembros</h3>
            <p className="text-blue-700 text-sm">Gestión de miembros y roles</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-green-200 hover:border-green-400 transition-all text-left"
            onClick={() => setSelected(TEAM_SECTIONS.ANALYTICS)}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-2">📊 Métricas</h3>
            <p className="text-green-700 text-sm">Estadísticas y métricas del equipo</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all text-left"
            onClick={() => setSelected(TEAM_SECTIONS.COMPETITIONS)}
          >
            <h3 className="text-lg font-semibold text-purple-800 mb-2">🏆 Competencias</h3>
            <p className="text-purple-700 text-sm">Historial de competencias y logros</p>
          </button>
        </div>
      )}
      {selected === TEAM_SECTIONS.MEMBERS && renderMembers()}
      {selected === TEAM_SECTIONS.ANALYTICS && renderAnalytics()}
      {selected === TEAM_SECTIONS.COMPETITIONS && renderCompetitions()}
    </div>
  );
};

export default Team; 