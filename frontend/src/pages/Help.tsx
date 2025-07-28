import React, { useState } from 'react';
import { FaSearch, FaUser, FaTrophy, FaCoins, FaFistRaised, FaExclamationTriangle, FaStore, FaBook, FaQuestionCircle, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['primeros-pasos']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const helpSections = [
    {
      id: 'primeros-pasos',
      title: '🚀 Primeros Pasos',
      icon: <FaUser />,
      content: [
        {
          title: '¿Cómo empezar?',
          content: `
            <h4 class="text-lg font-bold mb-2">¡Bienvenido a la plataforma de Bug Bounty!</h4>
            <p class="mb-3">Para comenzar tu aventura:</p>
            <ol class="list-decimal list-inside space-y-2 ml-4">
              <li><strong>Completa tu perfil:</strong> Añade tu información personal y foto</li>
              <li><strong>Únete a un equipo:</strong> Busca un equipo o crea uno nuevo</li>
              <li><strong>Explora las vulnerabilidades:</strong> Revisa las categorías disponibles</li>
              <li><strong>Participa en torneos:</strong> Los torneos mensuales son tu oportunidad de brillar</li>
              <li><strong>Documenta tus hallazgos:</strong> Cada vulnerabilidad resuelta debe ser documentada</li>
            </ol>
          `
        },
        {
          title: '¿Qué necesito saber?',
          content: `
            <p class="mb-3">Conceptos básicos que debes conocer:</p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li><strong>Puntos:</strong> Tu moneda principal para comprar items y participar en duelos</li>
              <li><strong>Blue-Points:</strong> Moneda de mérito obtenida por resolver vulnerabilidades complejas</li>
              <li><strong>MVP:</strong> Usuario o equipo con mejor desempeño mensual</li>
              <li><strong>Duelos:</strong> Enfrentamientos amistosos entre usuarios o equipos</li>
              <li><strong>Gulag:</strong> Competencia obligatoria para los 5 usuarios con menor rendimiento</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'sistema-puntos',
      title: '💰 Sistema de Puntos',
      icon: <FaCoins />,
      content: [
        {
          title: '¿Qué son los Puntos?',
          content: `
            <p class="mb-3">Los puntos reconocen tu esfuerzo, dedicación y ganas de aprender. Cada paso que das suma puntos, midiendo tu progreso y compromiso.</p>
            <h4 class="font-bold text-purple-400 mb-2">¿Cómo ganar puntos?</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Corregir vulnerabilidades</li>
              <li>Competir en torneos</li>
              <li>Participar activamente en la plataforma</li>
              <li>Documentar tus hallazgos</li>
            </ul>
            <h4 class="font-bold text-red-400 mb-2 mt-4">¿Cómo perder puntos?</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>No cumplir las tareas asignadas</li>
              <li>Ser derrotado en batallas individuales o grupales</li>
              <li>Entregar reportes o documentos falsos</li>
            </ul>
          `
        },
        {
          title: '¿Qué son los Blue-Points?',
          content: `
            <p class="mb-3">Los Blue-Points son el símbolo de reconocimiento al ingenio y compromiso técnico. Son una moneda de mérito otorgada exclusivamente a quienes resuelven vulnerabilidades con precisión.</p>
            <h4 class="font-bold text-blue-400 mb-2">Características:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Se obtienen al superar desafíos técnicos complejos</li>
              <li>Se pueden canjear por premios y recompensas tangibles</li>
              <li>Reflejan constancia, análisis crítico y excelencia técnica</li>
              <li>Si no se canjean, pierdes acceso a premios interesantes</li>
            </ul>
          `
        },
        {
          title: 'Puntos por Documentación',
          content: `
            <p class="mb-3">Cada publisher realizado será acreedor a Blue-Points. Es importante documentar:</p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Vulnerabilidades resueltas</li>
              <li>Cómo se corrigieron</li>
              <li>Dificultades encontradas y cómo se resolvieron</li>
              <li>Soluciones implementadas</li>
            </ul>
            <p class="mt-3 text-yellow-400"><strong>⚠️ Importante:</strong> Sin documentación no se pueden obtener puntos extra.</p>
          `
        }
      ]
    },
    {
      id: 'mvp',
      title: '🏆 Sistema MVP',
      icon: <FaTrophy />,
      content: [
        {
          title: '¿Qué es el MVP?',
          content: `
            <p class="mb-3">El MVP es el usuario o equipo con el mejor desempeño en un mes, disfrutando de diferentes recompensas y privilegios.</p>
            <h4 class="font-bold text-purple-400 mb-2">Beneficios del MVP:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Acceso a la tienda de puntos</li>
              <li>Emblema de temporada</li>
              <li>Insignia especial</li>
              <li>Título exclusivo</li>
            </ul>
          `
        },
        {
          title: 'Racha de 3 Meses',
          content: `
            <p class="mb-3">Si mantienes una racha de 3 meses siendo MVP (Team, User o ambos), obtienes beneficios especiales:</p>
            <h4 class="font-bold text-green-400 mb-2">Recompensas por Racha:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li><strong>Desbloqueará todas las ofertas de la tienda</strong></li>
              <li><strong>MVP Team:</strong> 10% extra en puntos totales al mes</li>
              <li><strong>MVP User:</strong> 15% extra en puntos al mes</li>
              <li><strong>Combinación:</strong> Si MVP Team y MVP User están en el mismo equipo, solo se aplica el 15% extra (no acumulativo)</li>
            </ul>
            <p class="mt-3 text-orange-400"><strong>⚠️ Obligación:</strong> El MVP está obligado a aceptar un duelo.</p>
          `
        },
        {
          title: 'Tienda MVP',
          content: `
            <p class="mb-3">La tienda de MVP tiene características especiales:</p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>MVP Team y MVP User tendrán objetos diferentes</li>
              <li>Por tener racha de 3 meses, podrán comprar objetos exclusivos</li>
              <li>Al no ser MVP no tendrás acceso a la tienda del MVP</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'duelos',
      title: '⚔️ Sistema de Duelos',
      icon: <FaFistRaised />,
      content: [
        {
          title: '¿Qué son los Duelos?',
          content: `
            <p class="mb-3">Los duelos son enfrentamientos amistosos entre usuarios o equipos. Al entrar a un duelo es necesario pagar con puntos de la plataforma.</p>
            <h4 class="font-bold text-purple-400 mb-2">Características:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>El costo depende de la sección aceptada</li>
              <li>Hay un tiempo límite para resolver vulnerabilidades</li>
              <li>Gana quien resuelva más vulnerabilidades de la categoría</li>
              <li>Los enfrentamientos son opcionales y deben ser aceptados por ambas partes</li>
              <li>Para equipos, el representante debe aceptar en nombre del equipo</li>
            </ul>
          `
        },
        {
          title: '¿Qué puedes ganar?',
          content: `
            <h4 class="font-bold text-green-400 mb-2">Recompensas del Ganador:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Los puntos del perdedor a proporción de la categoría</li>
              <li>Se devuelve el costo de entrada</li>
              <li>En modo equipo: porción equitativa a todos los miembros</li>
              <li>Puntos adicionales para el equipo</li>
            </ul>
          `
        },
        {
          title: '¿Qué puedes perder?',
          content: `
            <h4 class="font-bold text-red-400 mb-2">Pérdidas del Perdedor:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Los puntos perdidos serán a proporción de la categoría aceptada</li>
              <li>No se recupera el costo de entrada</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'gulag',
      title: '⚠️ Sistema Gulag',
      icon: <FaExclamationTriangle />,
      content: [
        {
          title: '¿Qué es el Gulag?',
          content: `
            <p class="mb-3">El Gulag es una competencia obligatoria para los 5 usuarios que estén más abajo en el posicionamiento.</p>
            <h4 class="font-bold text-purple-400 mb-2">¿En qué consiste?</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Los 5 usuarios compiten durante 15 días seguidos</li>
              <li>Deben resolver la mayor cantidad de vulnerabilidades</li>
              <li>El que resuelva más vulnerabilidades se salva del Gulag</li>
              <li>Los otros 4 usuarios tendrán que cumplir con el castigo</li>
            </ul>
          `
        },
        {
          title: 'Castigos del Gulag',
          content: `
            <h4 class="font-bold text-red-400 mb-2">Castigo Principal:</h4>
            <p class="mb-3">Los 4 usuarios con menor número de vulnerabilidades resueltas tendrán que acudir al campus durante una semana seguida en su horario laboral completo.</p>
            
            <h4 class="font-bold text-orange-400 mb-2">Casos Excepcionales:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li><strong>2 veces consecutivas:</strong> 2 semanas seguidas al campus</li>
              <li><strong>3 veces consecutivas:</strong> El usuario y su equipo tendrán que asistir un mes completo al campus</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'torneos',
      title: '🏆 Torneos Mensuales',
      icon: <FaTrophy />,
      content: [
        {
          title: '¿Cómo funcionan los Torneos?',
          content: `
            <p class="mb-3">Los torneos mensuales son la competencia principal de la plataforma.</p>
            <h4 class="font-bold text-purple-400 mb-2">Características:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Se basan en arreglar la mayor cantidad de vulnerabilidades</li>
              <li>Se enfocan en categorías específicas aceptadas</li>
              <li>Los usuarios pueden ofertar o cazar recompensas</li>
              <li>Puedes ganar la etiqueta de MVP</li>
              <li>Oportunidad de derrotar a otros mediante duelos</li>
              <li>Ganas Blue-Points mediante otros medios</li>
            </ul>
          `
        },
        {
          title: '¿Qué puedes ganar?',
          content: `
            <h4 class="font-bold text-green-400 mb-2">Recompensas de Torneos:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Puntos por resolver vulnerabilidades</li>
              <li>Blue-Points por excelencia técnica</li>
              <li>Etiqueta de MVP por mejor desempeño</li>
              <li>Oportunidad de participar en duelos</li>
              <li>Reconocimiento en el ranking</li>
            </ul>
          `
        },
        {
          title: '¿Qué puedes perder?',
          content: `
            <h4 class="font-bold text-red-400 mb-2">Riesgos:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Si eres inactivo, no puedes ganar puntos ni Blue-Points</li>
              <li>Obtienes la derrota automática del Gulag</li>
              <li>Puedes perder puntos en duelos</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'perfil',
      title: '👤 Perfil y Estadísticas',
      icon: <FaUser />,
      content: [
        {
          title: 'Tu Perfil',
          content: `
            <p class="mb-3">Tu perfil es tu carta de presentación en la plataforma.</p>
            <h4 class="font-bold text-purple-400 mb-2">Características del Perfil:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Visualiza tus estadísticas de rendimiento</li>
              <li>Muestra tu FeedBack mensual</li>
              <li>Exhibe tus logros y trofeos</li>
              <li>Permite personalización con items de la tienda</li>
              <li>Muestra tu nivel y experiencia</li>
            </ul>
          `
        },
        {
          title: 'Estadísticas',
          content: `
            <h4 class="font-bold text-blue-400 mb-2">Métricas que se muestran:</h4>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Vulnerabilidades resueltas</li>
              <li>Puntos totales acumulados</li>
              <li>Blue-Points ganados</li>
              <li>Duelos ganados/perdidos</li>
              <li>Ranking en la plataforma</li>
              <li>Actividad reciente</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'faq',
      title: '❓ Preguntas Frecuentes',
      icon: <FaQuestionCircle />,
      content: [
        {
          title: '¿Cómo puedo ganar más puntos?',
          content: `
            <p class="mb-3">Para maximizar tus puntos:</p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Participa activamente en torneos mensuales</li>
              <li>Resuelve vulnerabilidades de manera consistente</li>
              <li>Documenta todos tus hallazgos</li>
              <li>Participa en duelos estratégicamente</li>
              <li>Mantén actividad regular en la plataforma</li>
            </ul>
          `
        },
        {
          title: '¿Qué pasa si pierdo el Gulag?',
          content: `
            <p class="mb-3">Las consecuencias dependen de cuántas veces hayas perdido:</p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li><strong>Primera vez:</strong> Una semana en el campus</li>
              <li><strong>Segunda vez consecutiva:</strong> Dos semanas en el campus</li>
              <li><strong>Tercera vez consecutiva:</strong> Un mes completo (tú y tu equipo)</li>
            </ul>
          `
        },
        {
          title: '¿Cómo funciona el sistema de equipos?',
          content: `
            <p class="mb-3">Los equipos son fundamentales en la plataforma:</p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Puedes unirte a un equipo existente o crear uno nuevo</li>
              <li>Los equipos compiten en torneos mensuales</li>
              <li>Pueden participar en duelos de equipo</li>
              <li>Si un miembro pierde el Gulag 3 veces, todo el equipo va al campus</li>
              <li>Los puntos se distribuyen equitativamente entre miembros</li>
            </ul>
          `
        },
        {
          title: '¿Cuándo se actualiza el ranking MVP?',
          content: `
            <p class="mb-3">El sistema MVP se actualiza mensualmente:</p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Se evalúa el desempeño del mes anterior</li>
              <li>Se consideran vulnerabilidades resueltas y puntos ganados</li>
              <li>Se anuncian los nuevos MVPs al inicio del mes</li>
              <li>Los beneficios se aplican inmediatamente</li>
              <li>Se mantiene un historial de rachas</li>
            </ul>
          `
        }
      ]
    }
  ];

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.some(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Centro de Ayuda</h1>
        <p className="text-gray-300">Encuentra respuestas a todas tus preguntas</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en la ayuda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Secciones de Ayuda */}
        <div className="space-y-6">
          {filteredSections.map((section) => (
            <div key={section.id} className="bg-gray-900 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-purple-400">{section.icon}</span>
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                </div>
                {expandedSections.includes(section.id) ? (
                  <FaChevronUp className="text-gray-400" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>
              
              {expandedSections.includes(section.id) && (
                <div className="p-6 border-t border-gray-700">
                  <div className="space-y-6">
                    {section.content.map((item, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
                          <FaArrowRight className="text-purple-400" />
                          {item.title}
                        </h3>
                        <div 
                          className="text-gray-300 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contacto de Soporte */}
        <div className="mt-12 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-300 mb-6">Nuestro equipo de soporte está aquí para ayudarte</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Contactar Soporte
            </button>
            <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Reportar Problema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help; 