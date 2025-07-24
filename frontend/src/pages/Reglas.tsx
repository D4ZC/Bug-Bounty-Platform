import React from 'react';

const Reglas: React.FC = () => (
  <div className="max-w-2xl mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-6 text-center">Reglas</h1>
    <div className="bg-white rounded-lg shadow p-6 text-gray-800">
      <p className="mb-4">Aquí aparecerán las reglas de la plataforma. Puedes editar este texto para agregar las reglas específicas de tu sistema de Bug Bounty, normas de convivencia, criterios de participación, etc.</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Participa con respeto y honestidad.</li>
        <li>No compartas vulnerabilidades públicamente antes de su revisión.</li>
        <li>Las decisiones de los administradores son finales.</li>
        <li>Lee y acepta los términos antes de participar.</li>
      </ul>
    </div>
  </div>
);

export default Reglas; 