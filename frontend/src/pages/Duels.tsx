import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const duelsTeams = [
  { title: 'Critic', entry: 'Entrada: 30pts' },
  { title: 'Critic', entry: 'Entrada: 30pts' },
  { title: 'Critic', entry: 'Entrada: 30pts' },
  { title: 'High', entry: 'Entrada: 20pts' },
  { title: 'High', entry: 'Entrada: 20pts' },
  { title: 'High', entry: 'Entrada: 20pts' },
  { title: 'Medium', entry: 'Entrada: 18pts' },
  { title: 'Medium', entry: 'Entrada: 18pts' },
  { title: 'Medium', entry: 'Entrada: 18pts' },
  { title: 'Low', entry: 'Entrada: 9pts' },
  { title: 'Low', entry: 'Entrada: 9pts' },
  { title: 'Low', entry: 'Entrada: 9pts' },
];

const duelsUser = [
  { title: 'Critic', entry: 'Entrada: 15pts' },
  { title: 'Critic', entry: 'Entrada: 15pts' },
  { title: 'Critic', entry: 'Entrada: 15pts' },
  { title: 'High', entry: 'Entrada: 10pts' },
  { title: 'High', entry: 'Entrada: 10pts' },
  { title: 'High', entry: 'Entrada: 10pts' },
  { title: 'Medium', entry: 'Entrada: 9pts' },
  { title: 'Medium', entry: 'Entrada: 9pts' },
  { title: 'Medium', entry: 'Entrada: 9pts' },
  { title: 'Low', entry: 'Entrada: 4pts' },
  { title: 'Low', entry: 'Entrada: 4pts' },
  { title: 'Low', entry: 'Entrada: 4pts' },
];

const severities = ['All', 'Critic', 'High', 'Medium', 'Low'];

const Duels: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teams' | 'user'>('teams');
  const [severityFilter, setSeverityFilter] = useState<string>('All');

  const filteredTeams = duelsTeams.filter(card =>
    severityFilter === 'All' || card.title === severityFilter
  );
  const filteredUser = duelsUser.filter(card =>
    severityFilter === 'All' || card.title === severityFilter
  );

  return (
    <div className="duels-page w-full h-full">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('teams')}
          className={`text-2xl font-semibold focus:outline-none ${activeTab === 'teams' ? 'text-blue-700' : 'text-gray-400'}`}
        >
          Duelos Teams
        </button>
        <span className="text-2xl font-semibold text-gray-400">|</span>
        <button
          onClick={() => setActiveTab('user')}
          className={`text-2xl font-semibold focus:outline-none ${activeTab === 'user' ? 'text-blue-700' : 'text-gray-400'}`}
        >
          Duelos User
        </button>
      </div>
      {/* Filtros de severidad centrados */}
      <div className="flex justify-center items-center gap-2 mb-8">
        {severities.map((s, idx) => (
          <React.Fragment key={s}>
            <span
              onClick={() => setSeverityFilter(s)}
              className={`cursor-pointer select-none text-base font-semibold transition-colors ${severityFilter === s ? 'text-blue-700' : 'text-gray-400'} hover:text-blue-700`}
              style={{ textDecoration: 'none' }}
            >
              {s}
            </span>
            {idx < severities.length - 1 && <span className="text-gray-300 mx-1">|</span>}
          </React.Fragment>
        ))}
      </div>
      {activeTab === 'teams' && (
        <div className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((duel, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
                <h4 className="text-lg font-bold mb-2">{duel.title}</h4>
                <p className="mb-4">{duel.entry}</p>
                <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-50 transition">Accept</button>
              </div>
            ))}
            {filteredTeams.length === 0 && (
              <div className="col-span-3 text-gray-400 text-center py-8">No se encontraron resultados.</div>
            )}
          </div>
        </div>
      )}
      {activeTab === 'user' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUser.map((duel, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
                <h4 className="text-lg font-bold mb-2">{duel.title}</h4>
                <p className="mb-4">{duel.entry}</p>
                <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-50 transition">Accept</button>
              </div>
            ))}
            {filteredUser.length === 0 && (
              <div className="col-span-3 text-gray-400 text-center py-8">No se encontraron resultados.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Duels; 