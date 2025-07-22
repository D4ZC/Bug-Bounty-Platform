import React, { useState } from 'react';

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

const mockVulnerabilities = [
  { id: 'VULN-001', title: 'SQL Injection en login', severity: 'Crítica', status: 'Abierta', date: '2024-06-01', reporter: 'D4ZC' },
  { id: 'VULN-002', title: 'XSS en comentarios', severity: 'Alta', status: 'En revisión', date: '2024-06-02', reporter: 'cyberfox' },
  { id: 'VULN-003', title: 'CSRF en pagos', severity: 'Media', status: 'Resuelta', date: '2024-06-03', reporter: 'shadowbyte' },
  { id: 'VULN-004', title: 'IDOR en perfil', severity: 'Alta', status: 'Abierta', date: '2024-06-04', reporter: 'netstorm' },
  { id: 'VULN-005', title: 'RCE en upload', severity: 'Crítica', status: 'En revisión', date: '2024-06-05', reporter: 'fireblade' },
];

const Vulnerabilities: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = mockVulnerabilities.filter(v =>
    v.id.toLowerCase().includes(search.toLowerCase()) ||
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.severity.toLowerCase().includes(search.toLowerCase()) ||
    v.status.toLowerCase().includes(search.toLowerCase()) ||
    v.reporter.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8" style={{fontFamily}}>
      <h1 className="text-4xl font-extrabold mb-8 text-center text-cyan-300 drop-shadow-lg tracking-widest font-mono animate-glitch-text">
        Vulnerabilidades Reportadas
      </h1>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar vulnerabilidad..."
            className="px-4 py-2 rounded-xl border-2 border-cyan-400 bg-black/60 text-cyan-200 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 w-80 animate-glitch-btn"
          />
          <button className="ml-4 px-6 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold font-mono border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-200">
            Reportar nueva
          </button>
        </div>
        <div className="rounded-3xl p-8 shadow-2xl border-4 border-cyan-400 glassmorphism relative overflow-hidden" style={{clipPath:'polygon(0 0, 100% 0, 98% 100%, 2% 100%)'}}>
          {/* SVG decorativo glitch/graffiti */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{opacity:0.10, zIndex:0}}>
            <g className="animate-glitch-move">
              <rect x="10%" y="8%" width="120" height="18" fill="#00fff7" opacity="0.18" transform="skewY(-12)" />
              <rect x="70%" y="18%" width="90" height="12" fill="#ff00cc" opacity="0.13" transform="skewX(-18)" />
              <polygon points="80,400 120,420 100,440" fill="#ffe600" opacity="0.10" />
            </g>
          </svg>
          <div className="overflow-x-auto z-10 relative">
            <table className="w-full text-cyan-100 text-sm font-mono">
              <thead>
                <tr>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">ID</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">Título</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">Severidad</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">Estado</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">Fecha</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">Reportado por</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v, i) => (
                  <tr key={v.id} className="border-b border-cyan-700/50 last:border-none hover:bg-cyan-900/10 transition-all">
                    <td className="py-2 px-3 font-bold text-cyan-300 animate-glitch-text">{v.id}</td>
                    <td className="py-2 px-3 font-bold text-cyan-100">{v.title}</td>
                    <td className="py-2 px-3">
                      <span className={`px-3 py-1 rounded-full font-bold text-xs border-2 ${v.severity === 'Crítica' ? 'border-pink-400 text-pink-400' : v.severity === 'Alta' ? 'border-yellow-400 text-yellow-400' : v.severity === 'Media' ? 'border-cyan-400 text-cyan-400' : 'border-green-400 text-green-400'}`}>{v.severity}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-3 py-1 rounded-full font-bold text-xs border-2 ${v.status === 'Abierta' ? 'border-cyan-400 text-cyan-400' : v.status === 'En revisión' ? 'border-yellow-400 text-yellow-400' : 'border-green-400 text-green-400'}`}>{v.status}</span>
                    </td>
                    <td className="py-2 px-3 text-cyan-200">{v.date}</td>
                    <td className="py-2 px-3 text-cyan-200">{v.reporter}</td>
                    <td className="py-2 px-3">
                      <button className="px-4 py-1 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white font-bold font-mono border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-200">Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        .glassmorphism { backdrop-filter: blur(8px) saturate(1.2); background: rgba(30,40,60,0.25); }
        .animate-glitch-move { animation: glitchMove 7s infinite alternate linear; }
        @keyframes glitchMove { 0%{transform:translateY(0);} 100%{transform:translateY(10px) skewX(-2deg);} }
        .animate-glitch-btn { animation: glitchBtn 1.5s infinite steps(2, end); }
        @keyframes glitchBtn { 0%{filter:none;} 20%{filter:brightness(1.2) hue-rotate(20deg);} 40%{filter:contrast(1.2) blur(0.5px);} 60%{filter:none;} 100%{filter:none;} }
        .animate-glitch-text { animation: glitchText 1.2s infinite steps(2, end); }
        @keyframes glitchText { 0%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} 50%{text-shadow:-2px 0 #ffe600, 2px 0 #00ff6a;} 100%{text-shadow:2px 0 #00fff7, -2px 0 #ff00cc;} }
      `}</style>
    </div>
  );
};

export default Vulnerabilities; 