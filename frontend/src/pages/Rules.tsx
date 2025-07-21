import React from 'react';

const rules = [
  'Respeta a todos los participantes y al equipo organizador.',
  'No intentes explotar vulnerabilidades fuera del entorno permitido.',
  'Comparte hallazgos de manera responsable y ética.',
  'No realices ataques de denegación de servicio (DoS/DDoS).',
  'No compartas información sensible de otros usuarios.',
  'Sigue las instrucciones y tiempos del evento.',
  'Las decisiones de los administradores son finales.',
];

const Rules: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-2 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">Reglas</h1>
      <ul className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-4">
        {rules.map((rule, idx) => (
          <li key={idx} className="text-lg text-gray-700 flex items-start gap-2">
            <span className="font-bold text-blue-600">{idx + 1}.</span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rules; 