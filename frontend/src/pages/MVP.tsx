import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight, FaBook, FaUserShield } from 'react-icons/fa';

// Datos mockeados de las reglas
const rulesData = [
  {
    id: 'equipos',
    title: 'Equipos',
    content: `En el ecosistema de Matt, los equipos compiten con un objetivo claro: conquistar la Corona Dorada. Matt funciona como la organización principal, una especie de núcleo o "cabeza", dentro del cual operan múltiples equipos especializados. Cada uno de estos equipos se dedica a resolver vulnerabilidades de páginas web, enfrentándose a desafíos técnicos que ponen a prueba sus habilidades en análisis y toma de decisiones bajo presión.`,
    benefits: [
      'Personaliza a tu equipo',
      'Insignias Grupales',
      'Obtención de premios',
      'Ser top one en tu área',
      'Ser MVP en el torneo',
    ],
    risks: [
      'Penalizaciones grupales',
    ],
  },
  {
    id: 'usuarios',
    title: 'Usuarios',
    content: `Los usuarios individuales son la base de la plataforma. Cada usuario puede participar de forma independiente o como parte de un equipo. Los usuarios tienen la libertad de elegir su enfoque y estrategia para resolver vulnerabilidades.`,
    benefits: [
      'Libertad de acción individual',
      'Desarrollo de habilidades personales',
      'Reconocimiento individual',
      'Flexibilidad de horarios',
      'Participación en eventos especiales',
    ],
    risks: [
      'Responsabilidad individual total',
      'Menor capacidad de recursos',
    ],
  },
  {
    id: 'mvp',
    title: 'MVP',
    content: `El sistema MVP (Most Valuable Player) reconoce a los usuarios y equipos más destacados del mes. Los MVPs reciben beneficios especiales y acceso exclusivo a contenido premium.`,
    benefits: [
      'Acceso a tienda especial MVP',
      'Emblemas y insignias exclusivas',
      'Títulos destacados',
      'Bonos de puntos mensuales',
      'Reconocimiento en la plataforma',
    ],
    risks: [
      'Presión por mantener el rendimiento',
      'Expectativas más altas',
    ],
  },
  {
    id: 'duelos',
    title: 'Duelos',
    content: `Los duelos son competencias directas entre usuarios o equipos. Los participantes apuestan puntos y compiten por resolver vulnerabilidades específicas en un tiempo limitado.`,
    benefits: [
      'Competencia directa',
      'Recompensas inmediatas',
      'Desarrollo de habilidades',
      'Reconocimiento público',
      'Experiencia en presión',
    ],
    risks: [
      'Pérdida de puntos apostados',
      'Estrés por tiempo limitado',
    ],
  },
  {
    id: 'puntos',
    title: 'Puntos',
    content: `El sistema de puntos es la base de la economía de la plataforma. Los puntos se obtienen resolviendo vulnerabilidades y se pueden usar para participar en eventos, comprar cosméticos y acceder a contenido especial.`,
    benefits: [
      'Reconocimiento de logros',
      'Acceso a contenido premium',
      'Participación en eventos',
      'Personalización de perfil',
      'Estatus en la comunidad',
    ],
    risks: [
      'Pérdida por mal desempeño',
      'Presión por acumular puntos',
    ],
  },
  {
    id: 'blue-points',
    title: 'Blue Points',
    content: `Los Blue Points son la moneda premium de la plataforma. Se obtienen canjeando puntos estándar y permiten acceso a contenido exclusivo y cosméticos especiales.`,
    benefits: [
      'Moneda premium',
      'Contenido exclusivo',
      'Cosméticos especiales',
      'Estatus VIP',
      'Acceso prioritario',
    ],
    risks: [
      'Conversión irreversible',
      'Costo de oportunidad',
    ],
  },
  {
    id: 'documentacion',
    title: 'Puntos por documentación',
    content: `Los usuarios pueden ganar puntos adicionales documentando sus soluciones y compartiendo conocimiento con la comunidad. La documentación es evaluada por la comunidad.`,
    benefits: [
      'Puntos adicionales',
      'Contribución a la comunidad',
      'Reconocimiento como experto',
      'Aprendizaje colaborativo',
      'Portfolio de trabajo',
    ],
    risks: [
      'Tiempo de documentación',
      'Evaluación subjetiva',
    ],
  },
  {
    id: 'gulag',
    title: 'Gulag',
    content: `El Gulag es una competencia especial para los últimos 5 usuarios del ranking. Los participantes tienen la oportunidad de mejorar su posición y evitar penalizaciones.`,
    benefits: [
      'Oportunidad de redención',
      'Mejora de ranking',
      'Evitar penalizaciones',
      'Experiencia única',
      'Reconocimiento por esfuerzo',
    ],
    risks: [
      'Penalizaciones si fallan',
      'Presión extrema',
      'Actividades presenciales obligatorias',
    ],
  },
];

const Rules: React.FC = () => {
  const [activeSection, setActiveSection] = useState('equipos');

  useEffect(() => {
    if (window.location.hash === '#gulag') {
      setActiveSection('gulag');
      setTimeout(() => {
        const el = document.getElementById('gulag');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c24] via-[#23273a] to-[#181c24]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <FaBook className="text-3xl text-cyan-400 drop-shadow-glow animate-pulse" />
          <h1 className="text-3xl font-extrabold text-cyan-300 tracking-wide drop-shadow-lg">Reglamento</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 w-full mb-6 lg:mb-0">
            <div className="bg-[#181c24] dark:bg-gray-800 rounded-2xl shadow-2xl p-4 border border-cyan-900/40">
              <h2 className="text-lg font-bold text-cyan-200 mb-4 tracking-wide">Secciones</h2>
              <nav className="space-y-2">
                {rulesData.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-all duration-200 border border-transparent hover:border-cyan-400 hover:bg-cyan-900/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                      activeSection === section.id
                        ? 'bg-cyan-900/30 text-cyan-300 border-cyan-400 shadow-lg' :
                        'text-cyan-100 hover:text-cyan-200'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1">
            {rulesData.map((section) => (
              <div
                key={section.id}
                id={section.id === 'gulag' ? 'gulag' : undefined}
                className={`bg-[#23273a] dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 border border-cyan-900/40 transition-all duration-500 ${
                  activeSection === section.id ? 'block animate-fadeIn' : 'hidden'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-2xl font-extrabold tracking-wide flex items-center gap-2 ${section.id === 'gulag' ? 'text-red-400' : 'text-cyan-200'}`}>
                    {section.id === 'gulag' && <FaUserShield className="text-xl" />} {section.title}
                  </h2>
                  <button
                    onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}
                    className="p-2 rounded-lg hover:bg-cyan-900/20 transition-colors"
                  >
                    {activeSection === section.id ? (
                      <FaChevronDown className="text-cyan-400" />
                    ) : (
                      <FaChevronRight className="text-cyan-400" />
                    )}
                  </button>
                </div>
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <p className={`leading-relaxed text-lg ${section.id === 'gulag' ? 'text-red-100' : 'text-cyan-100'}`}>
                      {section.content}
                    </p>
                  </div>
                  {/* Benefits y Risks solo si no es gulag */}
                  {section.id !== 'gulag' && (
                    <>
                      <div>
                        <h3 className="text-lg font-bold text-green-400 mb-3">¿Qué podrías ganar?</h3>
                        <ul className="space-y-2">
                          {section.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-400 mr-2">★</span>
                              <span className="text-cyan-100">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-red-400 mb-3">¿Qué podrías perder?</h3>
                        <ul className="space-y-2">
                          {section.risks.map((risk, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-red-400 mr-2">✖</span>
                              <span className="text-cyan-100">
                                {risk}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                  {/* Si es gulag, mostrar reglas como en la imagen */}
                  {section.id === 'gulag' && (
                    <ul className="list-disc pl-8 text-red-100 space-y-2 text-lg animate-fadeIn mt-4">
                      <li className="marker:text-red-400">Solo participan los últimos 5 usuarios del ranking.</li>
                      <li className="marker:text-red-400">El objetivo es mejorar tu posición y evitar penalizaciones.</li>
                      <li className="marker:text-red-400">Las penalizaciones pueden incluir tareas especiales o pérdida de puntos.</li>
                      <li className="marker:text-red-400">El rendimiento en el Gulag puede darte una segunda oportunidad en el ranking.</li>
                      <li className="marker:text-red-400">El Gulag es solo para valientes. ¡No hay segundas oportunidades!</li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(.4,0,.2,1) both; }
        .drop-shadow-glow { filter: drop-shadow(0 0 8px #00bcd4cc); }
      `}</style>
    </div>
  );
};

export default Rules; 