import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import Modal from '@/components/ui/Modal';

const FORM_TYPES = {
  VULN: 'vuln',
  BUG: 'bug',
  FEATURE: 'feature',
};

const ReportForm: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [reports, setReports] = useState<{ type: string; title: string; date: string }[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Handlers de envío para cada formulario
  const handleSubmit = (type: string) => (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const inputEl = form.querySelector('input[placeholder^="Ej"]');
    const title = (inputEl && 'value' in inputEl) ? (inputEl as HTMLInputElement).value : 'Sin título';
    // Simulación de éxito/fracaso
    if (Math.random() > 0.15) {
      setModalMsg(type === FORM_TYPES.VULN ? '¡Reporte de vulnerabilidad enviado con éxito!' :
        type === FORM_TYPES.BUG ? '¡Reporte de bug enviado con éxito!' :
        '¡Solicitud de funcionalidad enviada con éxito!');
      setReports(prev => [
        ...prev,
        { type, title, date: new Date().toLocaleString() }
      ]);
    } else {
      setModalMsg('Ocurrió un error al enviar el formulario. Intenta nuevamente.');
    }
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (modalMsg.includes('éxito')) {
      setSelected(null);
    }
  };

  // Eliminar reporte
  const handleDelete = () => {
    if (deleteIdx !== null) {
      setReports(prev => prev.filter((_, i) => i !== deleteIdx));
      setDeleteIdx(null);
      setExpandedIdx(null);
    }
  };
  // Editar reporte
  const handleEdit = () => {
    if (editIdx !== null) {
      setReports(prev => prev.map((r, i) => i === editIdx ? { ...r, title: editTitle } : r));
      setEditIdx(null);
      setExpandedIdx(null);
    }
  };

  // Formularios específicos
  const renderVulnForm = () => (
    <form className="bg-white rounded-lg shadow-md p-8 mt-8 flex flex-col gap-4" onSubmit={handleSubmit(FORM_TYPES.VULN)}>
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
    <form className="bg-white rounded-lg shadow-md p-8 mt-8 flex flex-col gap-4" onSubmit={handleSubmit(FORM_TYPES.BUG)}>
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
    <form className="bg-white rounded-lg shadow-md p-8 mt-8 flex flex-col gap-4" onSubmit={handleSubmit(FORM_TYPES.FEATURE)}>
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded ho  ver:bg-blue-700">Enviar solicitud</button>
        <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setSelected(null)}>Volver</button>
      </div>
    </form>
  );

  const reportStats = {
    total: reports.length,
    vuln: reports.filter(r => r.type === FORM_TYPES.VULN).length,
    bug: reports.filter(r => r.type === FORM_TYPES.BUG).length,
    feature: reports.filter(r => r.type === FORM_TYPES.FEATURE).length,
  };
  const reportAchievements = [
    { icon: '🚀', label: 'Primer reporte enviado' },
    { icon: '🐞', label: '5 bugs reportados' },
    { icon: '💡', label: '3 sugerencias de funcionalidad' },
  ];
  const reportTips = [
    'Describe el problema de forma clara y concisa.',
    'Incluye pasos para reproducir el error.',
    'Adjunta capturas o archivos si es posible.',
    'Indica la severidad y el impacto estimado.',
  ];
  const topReporters = [
    { name: 'Ana Torres', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', reports: 7 },
    { name: 'Carlos Pérez', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', reports: 6 },
    { name: 'Lucía Gómez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', reports: 5 },
  ];
  const featuredReports = [
    { id: 1, title: 'SQL Injection en login', desc: 'Reporte crítico aceptado y resuelto en tiempo récord.', icon: '🛡️' },
    { id: 2, title: 'Nueva funcionalidad: Filtro avanzado', desc: 'Sugerencia implementada y aclamada por la comunidad.', icon: '✨' },
  ];
  const reportFeedback = [
    { id: 1, text: '¡Gracias por la rápida respuesta al reporte!', user: 'Anónimo' },
    { id: 2, text: 'El sistema de reportes es muy fácil de usar.', user: 'Anónimo' },
    { id: 3, text: 'Me siento escuchado por el equipo.', user: 'Anónimo' },
  ];
  const reportPie = [
    { label: 'Vulnerabilidades', value: reportStats.vuln, color: 'bg-red-400' },
    { label: 'Bugs', value: reportStats.bug, color: 'bg-orange-400' },
    { label: 'Funcionalidades', value: reportStats.feature, color: 'bg-green-400' },
  ];
  const reportFAQ = [
    { q: '¿Cómo sé si mi reporte fue aceptado?', a: 'Recibirás una notificación y podrás verlo en la lista de reportes realizados.' },
    { q: '¿Puedo editar un reporte después de enviarlo?', a: 'Sí, puedes editar el título desde la lista de reportes realizados.' },
    { q: '¿Qué tipo de archivos puedo adjuntar?', a: 'Imágenes, PDFs y archivos de texto son aceptados.' },
    { q: '¿Quién puede ver mis reportes?', a: 'Solo el equipo de administración y tú.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Reportes y Solicitudes</h1>
      <p className="text-lg text-gray-600 mb-8">Selecciona el tipo de reporte o solicitud que deseas enviar</p>
      {!selected && (
        <>
          {/* Banner motivacional */}
          <div className="mb-8 bg-gradient-to-r from-blue-200 via-green-100 to-yellow-100 rounded-lg shadow p-6 flex flex-col items-center animate-in fade-in duration-300">
            <span className="text-3xl mb-2">📝</span>
            <span className="font-bold text-blue-900 text-xl mb-1">¡Tu reporte ayuda a mejorar la plataforma!</span>
            <span className="text-gray-700 text-sm text-center">Colabora enviando reportes claros y útiles para todos.</span>
          </div>
          {/* Estadísticas de reportes */}
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
              <span className="text-2xl font-bold text-blue-700">{reportStats.total}</span>
              <span className="text-xs text-gray-600">Total enviados</span>
            </div>
            <div className="bg-red-50 rounded-lg p-4 flex flex-col items-center shadow">
              <span className="text-2xl font-bold text-red-700">{reportStats.vuln}</span>
              <span className="text-xs text-gray-600">Vulnerabilidades</span>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-center shadow">
              <span className="text-2xl font-bold text-orange-700">{reportStats.bug}</span>
              <span className="text-xs text-gray-600">Bugs</span>
            </div>
            <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center shadow">
              <span className="text-2xl font-bold text-green-700">{reportStats.feature}</span>
              <span className="text-xs text-gray-600">Funcionalidades</span>
            </div>
          </div>
          {/* Badges de logros */}
          <div className="mb-6 flex flex-wrap gap-4 items-center justify-center">
            {reportAchievements.map((a, i) => (
              <div key={i} className="flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 shadow text-green-800 font-semibold text-sm">
                <span className="text-xl">{a.icon}</span> {a.label}
              </div>
            ))}
          </div>
          {/* Tips para reportar */}
          <div className="mb-8 bg-green-50 rounded-lg shadow p-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">💡 Tips para reportar</h3>
            <ul className="list-disc ml-6 text-green-900 text-sm flex flex-col gap-1">
              {reportTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
          {/* Gráfico de barras de tipos de reporte (simulado) */}
          <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center gap-2">📊 Tipos de reporte enviados</h3>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <span className="w-28 truncate text-xs font-semibold text-red-700">Vulnerabilidades</span>
                <div className="flex-1 bg-gray-100 rounded h-3 relative">
                  <div className="bg-red-400 h-3 rounded transition-all duration-500" style={{ width: `${reportStats.total ? (reportStats.vuln / reportStats.total) * 100 : 0}%` }}></div>
                </div>
                <span className="text-xs font-bold text-red-700 ml-2">{reportStats.vuln}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-28 truncate text-xs font-semibold text-orange-700">Bugs</span>
                <div className="flex-1 bg-gray-100 rounded h-3 relative">
                  <div className="bg-orange-400 h-3 rounded transition-all duration-500" style={{ width: `${reportStats.total ? (reportStats.bug / reportStats.total) * 100 : 0}%` }}></div>
                </div>
                <span className="text-xs font-bold text-orange-700 ml-2">{reportStats.bug}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-28 truncate text-xs font-semibold text-green-700">Funcionalidades</span>
                <div className="flex-1 bg-gray-100 rounded h-3 relative">
                  <div className="bg-green-400 h-3 rounded transition-all duration-500" style={{ width: `${reportStats.total ? (reportStats.feature / reportStats.total) * 100 : 0}%` }}></div>
                </div>
                <span className="text-xs font-bold text-green-700 ml-2">{reportStats.feature}</span>
              </li>
            </ul>
          </div>
          {/* Top reporteros */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {topReporters.map((u, i) => (
              <div key={i} className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
                <img src={u.avatar} alt={u.name} className="w-14 h-14 rounded-full border-2 border-blue-300 mb-2" />
                <span className="font-bold text-blue-800 text-lg mb-1">{u.name}</span>
                <span className="text-blue-700 text-sm mb-1">{u.reports} reportes enviados</span>
                <span className="text-xs text-gray-500">Top {i + 1}</span>
              </div>
            ))}
          </div>
          {/* Reportes destacados */}
          <div className="mb-8 bg-yellow-50 rounded-lg shadow p-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">⭐ Reportes destacados</h3>
            <ul className="flex flex-wrap gap-4">
              {featuredReports.map(r => (
                <li key={r.id} className="flex flex-col items-center bg-white rounded-lg p-3 min-w-[180px] shadow">
                  <span className="text-3xl mb-1">{r.icon}</span>
                  <span className="font-bold text-yellow-900 text-sm mb-1">{r.title}</span>
                  <span className="text-gray-700 text-xs text-center">{r.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Feedback anónimo */}
          <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">💬 Feedback anónimo</h3>
            <ul className="flex flex-col gap-2">
              {reportFeedback.map(f => (
                <li key={f.id} className="bg-blue-50 rounded px-3 py-2 text-sm text-blue-900 flex items-center gap-2">
                  <span className="italic">“{f.text}”</span>
                  <span className="ml-auto text-xs text-gray-500">{f.user}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Gráfico circular de tipos de reporte (simulado) */}
          <div className="mb-8 flex flex-col items-center">
            <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">🎯 Distribución de tipos de reporte</h3>
            <div className="relative w-32 h-32 mb-2">
              {/* Pie chart simulado con divs */}
              <div className="absolute w-32 h-32 rounded-full border-8 border-red-400" style={{ clipPath: 'inset(0 0 50% 0)' }}></div>
              <div className="absolute w-32 h-32 rounded-full border-8 border-orange-400" style={{ clipPath: 'inset(50% 0 0 0)' }}></div>
              <div className="absolute w-32 h-32 rounded-full border-8 border-green-400" style={{ clipPath: 'inset(0 50% 0 0)' }}></div>
              <div className="absolute w-32 h-32 rounded-full border-8 border-white"></div>
            </div>
            <div className="flex gap-4 mt-1">
              {reportPie.map((r, i) => (
                <span key={i} className={`flex items-center gap-1 text-xs font-semibold ${r.color} px-2 py-0.5 rounded-full`}>{r.label}: {r.value}</span>
              ))}
            </div>
          </div>
          {/* Cards de felicitación */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
              <span className="text-3xl mb-2">🎉</span>
              <span className="font-bold text-blue-800 text-lg mb-1">¡Gracias por contribuir!</span>
              <span className="text-blue-700 text-sm text-center">Tus reportes ayudan a toda la comunidad.</span>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4 flex flex-col items-center shadow animate-in fade-in duration-300">
              <span className="text-3xl mb-2">🏆</span>
              <span className="font-bold text-yellow-800 text-lg mb-1">Reconocimiento</span>
              <span className="text-yellow-700 text-sm text-center">Los mejores reportes serán destacados cada mes.</span>
            </div>
          </div>
          {/* Preguntas frecuentes */}
          <div className="mb-8 bg-white rounded-lg shadow p-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">❓ Preguntas frecuentes</h3>
            <ul className="flex flex-col gap-3">
              {reportFAQ.map((f, i) => (
                <li key={i} className="bg-blue-50 rounded-lg p-3">
                  <span className="font-semibold text-blue-900">{f.q}</span>
                  <br />
                  <span className="text-gray-700 text-sm">{f.a}</span>
                </li>
              ))}
            </ul>
          </div>
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
          {/* Reportes realizados SIEMPRE debajo de los cards */}
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-3 text-gray-800">Reportes realizados</h2>
            {reports.length === 0 ? (
              <div className="text-gray-500 text-sm">Aún no has realizado reportes.</div>
            ) : (
              <ul className="space-y-2">
                {reports.map((r, i) => (
                  <li
                    key={i}
                    className={`bg-gray-50 rounded shadow p-3 transition-all cursor-pointer ${expandedIdx === i ? 'ring-2 ring-blue-400' : ''}`}
                    onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                      <span className={`font-semibold ${r.type === FORM_TYPES.VULN ? 'text-red-600' : r.type === FORM_TYPES.BUG ? 'text-orange-600' : 'text-blue-600'}`}>
                        {r.type === FORM_TYPES.VULN ? 'Vulnerabilidad' : r.type === FORM_TYPES.BUG ? 'Bug' : 'Funcionalidad'}
                      </span>
                      <span className="mx-2 font-medium text-gray-900">{r.title}</span>
                      <span className="text-xs text-gray-500 ml-auto">{r.date}</span>
                    </div>
                    {expandedIdx === i && (
                      <div className="mt-3 flex gap-2">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                          onClick={e => { e.stopPropagation(); setDeleteIdx(i); }}
                        >Eliminar</button>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                          onClick={e => { e.stopPropagation(); setEditIdx(i); setEditTitle(r.title); }}
                        >Editar</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Modal eliminar */}
          <Modal open={deleteIdx !== null} onClose={() => { setDeleteIdx(null); setExpandedIdx(null); }}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">🗑️</span>
              <p className="text-lg font-semibold text-center">¿Seguro que deseas eliminar este reporte?</p>
              <div className="flex gap-2 mt-4">
                <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={() => { setDeleteIdx(null); setExpandedIdx(null); }}>Cancelar</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleDelete}>Eliminar</button>
              </div>
            </div>
          </Modal>
          {/* Modal editar */}
          <Modal open={editIdx !== null} onClose={() => { setEditIdx(null); setExpandedIdx(null); }}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">✏️</span>
              <p className="text-lg font-semibold text-center">Editar título del reporte</p>
              <input
                className="border rounded px-3 py-2 mt-2 w-full"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 mt-4">
                <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={() => { setEditIdx(null); setExpandedIdx(null); }}>Cancelar</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleEdit}>Guardar</button>
        </div>
        </div>
          </Modal>
        </>
      )}
      {selected === FORM_TYPES.VULN && renderVulnForm()}
      {selected === FORM_TYPES.BUG && renderBugForm()}
      {selected === FORM_TYPES.FEATURE && renderFeatureForm()}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl">{modalMsg.includes('éxito') ? '🎉' : '⚠️'}</span>
          <p className="text-lg font-semibold text-center">{modalMsg}</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleModalClose}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};


export default ReportForm; 