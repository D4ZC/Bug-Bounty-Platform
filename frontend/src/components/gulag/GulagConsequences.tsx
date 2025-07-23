import React from 'react';
import { FaCalendarAlt, FaSkull, FaExclamationTriangle, FaUnlink } from 'react-icons/fa';

interface GulagConsequencesProps {
  defeats: number;
}

const consequences = [
  {
    times: 1,
    icon: <FaCalendarAlt className="text-xl text-yellow-400" />,
    text: '1 SEMANA EN CAMPUS (HORARIO LABORAL COMPLETO)',
  },
  {
    times: 2,
    icon: <FaUnlink className="text-xl text-orange-400" />,
    text: '2 SEMANAS EN CAMPUS (HORARIO LABORAL COMPLETO)',
  },
  {
    times: 3,
    icon: <FaSkull className="text-xl text-red-600" />,
    text: '1 MES EN CAMPUS (USUARIO Y EQUIPO - HORARIO LABORAL COMPLETO)',
  },
];

const GulagConsequences: React.FC<GulagConsequencesProps> = ({ defeats }) => {
  return (
    <div className="bg-gray-900/80 border border-red-700 rounded-xl p-4 mt-4">
      <h3 className="text-lg font-bold text-red-500 mb-2">CONSECUENCIAS DE LA DERROTA</h3>
      <ul className="space-y-2">
        {consequences.map((c, idx) => (
          <li key={idx} className="flex items-center gap-3">
            {c.icon}
            <span className="text-white">{c.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-gray-300">
        <FaExclamationTriangle className="inline text-red-400 mr-1" />
        DERROTAS CONSECUTIVAS ANTERIORES: <span className="font-bold text-red-400">{defeats}</span>
      </div>
    </div>
  );
};

export default GulagConsequences; 