import React, { useState } from 'react';

const resources = [
  { title: 'SQL Injection', count: 2 },
  { title: 'XSS (Cross-Site Scripting)', count: 2 },
  { title: 'Server-Side Request Forgery', count: 2 },
  { title: 'SQL Injection', count: 2 },
  { title: 'SQL Injection', count: 2 },
  { title: 'SQL Injection', count: 2 },
];

const Documentation: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = resources.filter(res =>
    res.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-6">Documentación</h1>
      <div className="mb-8 flex items-center">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="-ml-8 text-gray-400">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6z"/></svg>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">No results found.</div>
        ) : (
          filtered.map((res, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
              <span className="text-lg font-medium mb-2">{res.title}</span>
              <span className="text-2xl font-semibold mb-4">{res.count}</span>
              <button className="border border-blue-400 text-blue-600 px-4 py-1 rounded hover:bg-blue-50 transition">View All</button>
            </div>
          ))
        )}
      </div>
      <button className="fixed bottom-8 right-8 bg-gray-400 hover:bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-3xl">
        +
      </button>
    </div>
  );
};

export default Documentation; 