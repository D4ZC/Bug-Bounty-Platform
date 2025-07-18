import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const FORM_TYPES = {
  VULN: 'vuln',
  BUG: 'bug',
  FEATURE: 'feature',
};

const ReportForm: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);

  // Formularios específicos
  const renderVulnForm = () => (
    <form className="bg-white rounded-lg shadow-md p-8 mt-8 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-red-800 mb-2">Reporte de Vulnerabilidad</h2>
      <label className="font-semibold">Título
        <input className="w-full border rounded px-3 py-2 mt-1" required placeholder="Ej: SQL Injection en login" />
      </label>
      <label className="font-semibold">Descripción
        <textarea className="w-full border rounded px-3 py-2 mt-1" rows={4} required placeholder="Describe la vulnerabilidad..." />
      </label>
      <label className="font-semibold">Severidad
        <select className="w-full border rounded px-3 py-2 mt-1">
          <option>Baja</option>
          <option>Media</option>
          <option>Alta</option>
          <option>Crítica</option>
        </select>
      </label>
      <label className="font-semibold">Pasos para reproducir
        <textarea className="w-full border rounded px-3 py-2 mt-1" rows={3} placeholder="1. Ir a... 2. Hacer..." />
      </label>
      <label className="font-semibold">Adjuntar evidencia
        <input type="file" className="mt-1" />
      </label>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Enviar reporte</button>
        <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
      </div>
    </form>
  );

  const renderBugForm = () => (
    <form className="bg-white rounded-lg shadow-md p-8 mt-8 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-orange-800 mb-2">Reporte de Bug del Sistema</h2>
      <label className="font-semibold">Título
        <input className="w-full border rounded px-3 py-2 mt-1" required placeholder="Ej: Error al guardar perfil" />
      </label>
      <label className="font-semibold">Descripción
        <textarea className="w-full border rounded px-3 py-2 mt-1" rows={4} required placeholder="Describe el bug..." />
      </label>
      <label className="font-semibold">Pasos para reproducir
        <textarea className="w-full border rounded px-3 py-2 mt-1" rows={3} placeholder="1. Ir a... 2. Hacer..." />
      </label>
      <label className="font-semibold">Entorno
        <input className="w-full border rounded px-3 py-2 mt-1" placeholder="Ej: Windows 10, Chrome 113" />
      </label>
      <label className="font-semibold">Adjuntar captura o archivo
        <input type="file" className="mt-1" />
      </label>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Enviar reporte</button>
        <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
      </div>
    </form>
  );

  const renderFeatureForm = () => (
    <form className="bg-white rounded-lg shadow-md p-8 mt-8 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-blue-800 mb-2">Solicitud de Nueva Funcionalidad</h2>
      <label className="font-semibold">Título
        <input className="w-full border rounded px-3 py-2 mt-1" required placeholder="Ej: Filtro avanzado de reportes" />
      </label>
      <label className="font-semibold">Descripción de la funcionalidad
        <textarea className="w-full border rounded px-3 py-2 mt-1" rows={4} required placeholder="¿Qué funcionalidad necesitas?" />
      </label>
      <label className="font-semibold">Motivo
        <textarea className="w-full border rounded px-3 py-2 mt-1" rows={2} placeholder="¿Por qué es útil?" />
      </label>
      <label className="font-semibold">Impacto esperado
        <input className="w-full border rounded px-3 py-2 mt-1" placeholder="Ej: Mejorará la gestión de reportes" />
      </label>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enviar solicitud</button>
        <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
      </div>
    </form>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reportes y Solicitudes</h1>
      <p className="text-lg text-gray-600 mb-8">Selecciona el tipo de reporte o solicitud que deseas enviar</p>
      {!selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-red-200 hover:border-red-400 transition-all text-left"
            onClick={() => setSelected(FORM_TYPES.VULN)}
          >
            <h3 className="text-lg font-semibold text-red-800 mb-2">🔍 Report security vulnerabilities</h3>
            <p className="text-red-700 text-sm">Reporta vulnerabilidades de seguridad encontradas en la plataforma.</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-orange-200 hover:border-orange-400 transition-all text-left"
            onClick={() => setSelected(FORM_TYPES.BUG)}
          >
            <h3 className="text-lg font-semibold text-orange-800 mb-2">🐛 Report system bugs</h3>
            <p className="text-orange-700 text-sm">Reporta errores o fallos técnicos del sistema.</p>
          </button>
          <button
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all text-left"
            onClick={() => setSelected(FORM_TYPES.FEATURE)}
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Request new features</h3>
            <p className="text-blue-700 text-sm">Sugiere nuevas funcionalidades para la plataforma.</p>
          </button>
        </div>
      )}
      {selected === FORM_TYPES.VULN && renderVulnForm()}
      {selected === FORM_TYPES.BUG && renderBugForm()}
      {selected === FORM_TYPES.FEATURE && renderFeatureForm()}
    </div>
  );
};

export default ReportForm; 