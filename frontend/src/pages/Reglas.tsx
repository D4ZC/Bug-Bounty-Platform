import React, { useState } from 'react';
import { 
  Users, 
  Trophy, 
  ShoppingCart, 
  Sword, 
  Target, 
  Star, 
  FileText, 
  Skull,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

// Datos de las reglas organizados por categorías
const RULES_DATA = {
  usuarios: {
    icon: Users,
    title: 'Usuarios',
    color: 'bg-blue-500',
    content: [
      'Los usuarios participan en torneos mensuales basados en arreglar vulnerabilidades de categorías aceptadas',
      'Cada usuario tiene un perfil donde se visualizan sus estadísticas y feedback mensual',
      'Los usuarios pueden ofertar o cazar recompensas para la resolución de vulnerabilidades de otros equipos',
      'Pueden ganar la etiqueta de MVP, participar en duelos y obtener BluePoints',
      'Los usuarios inactivos no pueden ganar puntos ni BluePoints y obtienen derrota automática del Gulag'
    ]
  },
  mvp: {
    icon: Trophy,
    title: 'MVP',
    color: 'bg-yellow-500',
    content: [
      'El MVP es el usuario o equipo con mejor desempeño mensual',
      'Disfruta de recompensas y privilegios especiales',
      'Con 3 meses consecutivos como MVP se desbloquea acceso a tienda exclusiva',
      'Beneficios: Acceso a tienda de puntos, emblema de temporada, insignia y título',
      'Recompensas por racha de 3 meses:',
      '  • Desbloqueo de todas las ofertas de la tienda',
      '  • MVP Team: 10% extra en puntos totales al mes',
      '  • MVP User: 15% extra en puntos al mes',
      '  • Si MVP Team y MVP User están en el mismo equipo, solo se aplica el 15%',
      'El MVP está obligado a aceptar duelos'
    ]
  },
  tienda: {
    icon: ShoppingCart,
    title: 'Tienda',
    color: 'bg-green-500',
    content: [
      'La tienda de MVP Team y MVP User tienen objetos diferentes',
      'Con racha de 3 meses como MVP (team o user) se pueden comprar objetos exclusivos',
      'Los usuarios que no son MVP no tienen acceso a la tienda del MVP',
      'Los BluePoints se pueden canjear por premios y recompensas tangibles',
      'Si los BluePoints no se canjean, se pierden premios interesantes'
    ]
  },
  duelos: {
    icon: Sword,
    title: 'Duelos',
    color: 'bg-red-500',
    content: [
      'Enfrentamientos amistosos entre usuarios o equipos',
      'Se requiere pagar con puntos de la plataforma (costo según categoría)',
      'Tiempo límite para resolver la mayor cantidad de vulnerabilidades de la categoría aceptada',
      'El ganador resuelve más vulnerabilidades en el tiempo establecido',
      'Los enfrentamientos son opcionales y deben ser aceptados por ambas partes',
      'Para equipos, el representante acepta en nombre de todo el equipo',
      '¿Qué puedes ganar?',
      '  • Los puntos del perdedor proporcional a la categoría',
      '  • Devolución del costo de entrada',
      '  • En modo equipo: porción equitativa para todos los miembros',
      '¿Qué puedes perder?',
      '  • Puntos perdidos proporcional a la categoría aceptada'
    ]
  },
  puntos: {
    icon: Target,
    title: 'Puntos',
    color: 'bg-purple-500',
    content: [
      'Sistema diseñado para reconocer esfuerzo, dedicación y ganas de aprender',
      'Cada paso, reto y conocimiento adquirido suma puntos',
      'Los puntos miden progreso, constancia y compromiso',
      'Permite competir de forma sana en el ranking',
      '¿Qué puedes ganar?',
      '  • Puntos por corregir vulnerabilidades',
      '  • Puntos por competir en torneos',
      '  • Los puntos se pueden canjear por BluePoints',
      '¿Qué puedes perder?',
      '  • No cumplir tareas asignadas',
      '  • Ser derrotado en batallas individuales o grupales',
      '  • Entregar reportes o documentos falsos o no confiables'
    ]
  },
  bluePoints: {
    icon: Star,
    title: 'Blue-Points',
    color: 'bg-cyan-500',
    content: [
      'Símbolo de reconocimiento al ingenio y compromiso técnico',
      'Moneda de mérito otorgada por resolver vulnerabilidades con precisión',
      'Cada BluePoint refleja esfuerzo en superar retos complejos',
      'Sistema basado en constancia, análisis crítico y excelencia técnica',
      'Los puntos normales son el primer paso para ganar BluePoints',
      'Se pueden canjear por premios y recompensas tangibles',
      'Si no se canjean, se pierden premios interesantes'
    ]
  },
  documentacion: {
    icon: FileText,
    title: 'Documentación',
    color: 'bg-orange-500',
    content: [
      'Debe detallar las vulnerabilidades resueltas y cómo se corrigieron',
      'Registrar casos complicados con dificultades y soluciones implementadas',
      'Cada publisher realizado será acreedor a BluePoints',
      'Sin documentación no se pueden obtener puntos extra',
      'Es importante explicar:',
      '  • Vulnerabilidades resueltas',
      '  • Cómo se solucionaron',
      '  • Desafíos enfrentados y soluciones implementadas'
    ]
  },
  gulag: {
    icon: Skull,
    title: 'Gulag',
    color: 'bg-gray-700',
    content: [
      '¿Qué es el Gulag?',
      '  • Competencia obligatoria para los 5 usuarios con menor posicionamiento',
      '  • Compiten durante 15 días seguidos',
      '  • Deben resolver la mayor cantidad de vulnerabilidades',
      '  • El ganador se salva del Gulag',
      '  • Los otros 4 usuarios cumplen castigo',
      'Castigo:',
      '  • Los 4 usuarios con menor número de vulnerabilidades resueltas',
      '  • Deben acudir al campus durante una semana seguida en horario laboral completo',
      'Casos excepcionales:',
      '  • 2 derrotas consecutivas: 2 semanas en campus',
      '  • 3 derrotas consecutivas: usuario y equipo completo 1 mes en campus'
    ]
  }
};

interface RuleSectionProps {
  section: keyof typeof RULES_DATA;
  isActive: boolean;
  onToggle: (section: keyof typeof RULES_DATA) => void;
}

const RuleSection: React.FC<RuleSectionProps> = ({ section, isActive, onToggle }) => {
  const ruleData = RULES_DATA[section];
  const IconComponent = ruleData.icon;

  return (
    <div className="mb-4">
      <button
        onClick={() => onToggle(section)}
        className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
          isActive 
            ? `${ruleData.color} text-white shadow-lg` 
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3">
          <IconComponent size={24} />
          <span className="font-semibold text-lg">{ruleData.title}</span>
        </div>
        {isActive ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      
      {isActive && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm animate-fade-in">
          <ul className="space-y-3">
            {ruleData.content.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${ruleData.color.replace('bg-', 'bg-')}`}></div>
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Reglas: React.FC = () => {
  const [activeSection, setActiveSection] = useState<keyof typeof RULES_DATA>('usuarios');

  const handleToggle = (section: keyof typeof RULES_DATA) => {
    setActiveSection(activeSection === section ? 'usuarios' : section);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📋 Reglas del Juego
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Conoce todas las reglas y mecánicas de la plataforma Bug Bounty. 
          Haz clic en cada sección para explorar los detalles.
        </p>
      </div>

      {/* Rules Sections */}
      <div className="space-y-4">
        {Object.keys(RULES_DATA).map((section) => (
          <RuleSection
            key={section}
            section={section as keyof typeof RULES_DATA}
            isActive={activeSection === section}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 Consejos Importantes
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Lee todas las reglas antes de participar</li>
            <li>• Reporta vulnerabilidades de forma responsable</li>
            <li>• Colabora con otros jugadores para mejorar la seguridad</li>
            <li>• No compartas información sensible en público</li>
            <li>• ¡Diviértete y aprende en cada reto!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reglas; 