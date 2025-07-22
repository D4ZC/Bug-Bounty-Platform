import React, { useState } from 'react';

const tabs = [
  { key: 'unirse', label: 'UNIRSE' },
  { key: 'crear', label: 'CREAR' },
  { key: 'equipos', label: 'EQUIPOS' },
];

const Duelos: React.FC = () => {
  const [activeTab, setActiveTab] = useState('unirse');

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      {/* Barra de tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl shadow-sm overflow-hidden">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`flex-1 py-3 px-6 text-lg font-bold border-r border-gray-200 last:border-r-0 transition-colors duration-150
              ${activeTab === tab.key
                ? 'bg-black text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.15)]'
                : 'bg-white text-gray-800 hover:bg-gray-100'}`}
            style={{ borderBottom: activeTab === tab.key ? '2px solid #000' : '2px solid transparent', borderRight: '1px solid #e5e7eb' }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Contenido dinámico */}
      <div className="bg-white rounded-b-xl shadow p-8 min-h-[200px] border border-t-0 border-gray-200">
        {activeTab === 'unirse' && <div className="text-center text-xl text-gray-500">[Placeholder] Aquí irá el contenido para UNIRSE a un duelo.</div>}
        {activeTab === 'crear' && <div className="text-center text-xl text-gray-500">[Placeholder] Aquí irá el contenido para CREAR un duelo.</div>}
        {activeTab === 'equipos' && <div className="text-center text-xl text-gray-500">[Placeholder] Aquí irá el contenido para EQUIPOS de duelo.</div>}
      </div>
    </div>
  );
};

export default Duelos; 