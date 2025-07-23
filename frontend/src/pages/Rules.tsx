import React, { useState } from 'react';

const sections = [
  'Usuarios',
  'Beneficios',
  'Tienda',
  'Duelos',
  'Puntos',
  'Gulag',
];

const sectionContent: Record<string, string> = {
  Usuarios: 'Reglas y consideraciones para los usuarios participantes en la plataforma.',
  Beneficios: 'Información sobre los beneficios y recompensas disponibles.',
  Tienda: 'Normas para el uso de la tienda virtual y canje de puntos.',
  Duelos: 'Reglas para la participación en duelos y competencias.',
  Puntos: 'Cómo se obtienen, pierden y utilizan los puntos.',
  Gulag: 'Condiciones y reglas del sistema Gulag.',
};

const Rules: React.FC = () => {
  const [selected, setSelected] = useState(sections[0]);
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 py-10 px-2">
      <div className="flex bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-w-5xl w-full min-h-[500px]">
        {/* Sidebar */}
        <nav className="flex flex-col gap-4 bg-white py-10 px-4 min-w-[180px] border-r border-gray-100">
          {sections.map((sec) => (
            <button
              key={sec}
              className={`text-lg rounded-xl px-4 py-3 text-left font-semibold transition-all ${selected === sec ? 'bg-blue-100 text-blue-700 shadow' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSelected(sec)}
            >
              {sec}
            </button>
          ))}
        </nav>
        {/* Área de contenido */}
        <main className="flex-1 flex flex-col justify-center items-center p-10">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">{selected}</h1>
          <div className="text-lg text-gray-700 text-center max-w-xl">
            {sectionContent[selected]}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rules; 