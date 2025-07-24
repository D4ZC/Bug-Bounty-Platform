import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const fontFamily = `'Share Tech Mono', 'Fira Mono', 'Consolas', monospace`;

const Vulnerabilities: React.FC = () => {
  const { t } = useTranslation();
  const mockVulnerabilities = [
    { id: 'VULN-001', title: t('SQL Injection en login'), severity: t('Crítica'), status: t('Abierta'), date: '2024-06-01', reporter: t('D4ZC') },
    { id: 'VULN-002', title: t('XSS en comentarios'), severity: t('Alta'), status: t('En revisión'), date: '2024-06-02', reporter: t('cyberfox') },
    { id: 'VULN-003', title: t('CSRF en pagos'), severity: t('Media'), status: t('Resuelta'), date: '2024-06-03', reporter: t('shadowbyte') },
    { id: 'VULN-004', title: t('IDOR en perfil'), severity: t('Alta'), status: t('Abierta'), date: '2024-06-04', reporter: t('netstorm') },
    { id: 'VULN-005', title: t('RCE en upload'), severity: t('Crítica'), status: t('En revisión'), date: '2024-06-05', reporter: t('fireblade') },
  ];
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
        {t('Vulnerabilidades Reportadas')}
      </h1>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('Buscar vulnerabilidad...')}
            className="px-4 py-2 rounded-xl border-2 border-cyan-400 bg-black/60 text-cyan-200 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 w-80 animate-glitch-btn"
          />
          <button className="ml-4 px-6 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold font-mono border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-200">
            {t('Reportar nueva')}
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
                  <th className="py-2 px-3 text-cyan-400 font-semibold">{t('ID')}</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">{t('Título')}</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">{t('Severidad')}</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">{t('Estado')}</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">{t('Fecha')}</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold">{t('Reportado por')}</th>
                  <th className="py-2 px-3 text-cyan-400 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v, _) => (
                  <tr key={v.id} className="border-b border-cyan-700/50 last:border-none hover:bg-cyan-900/10 transition-all">
                    <td className="py-2 px-3 font-bold text-cyan-300 animate-glitch-text">{v.id}</td>
                    <td className="py-2 px-3 font-bold text-cyan-100">{v.title}</td>
                    <td className="py-2 px-3">
                      <span className={`px-3 py-1 rounded-full font-bold text-xs border-2 ${v.severity === t('Crítica') ? 'border-pink-400 text-pink-400' : v.severity === t('Alta') ? 'border-yellow-400 text-yellow-400' : v.severity === t('Media') ? 'border-cyan-400 text-cyan-400' : 'border-green-400 text-green-400'}`}>{v.severity}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-3 py-1 rounded-full font-bold text-xs border-2 ${v.status === t('Abierta') ? 'border-cyan-400 text-cyan-400' : v.status === t('En revisión') ? 'border-yellow-400 text-yellow-400' : 'border-green-400 text-green-400'}`}>{v.status}</span>
                    </td>
                    <td className="py-2 px-3 text-cyan-200">{v.date}</td>
                    <td className="py-2 px-3 text-cyan-200">{v.reporter}</td>
                    <td className="py-2 px-3">
                      <button className="px-4 py-1 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white font-bold font-mono border-2 border-cyan-400 shadow animate-glitch-btn transition-all duration-200">
                        {t('Ver')}
                      </button>
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