import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'HARD', value: 50, color: '#f43f5e' },
  { name: 'MEDIUM', value: 30, color: '#f59e42' },
  { name: 'LOW', value: 20, color: '#10b981' },
];

const carouselImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=200&q=80',
  'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=200&q=80',
  'https://images.unsplash.com/photo-1519340333755-c6e2a6a1b49a?auto=format&fit=facearea&w=200&q=80',
];

const mockUser = {
  name: 'Alex Turner',
  country: 'Germany',
  flag: '🇩🇪',
  coins: 100,
  bluepoints: 0,
  likes: 100,
  dislikes: 200,
  description: 'Bug hunter, gamer y entusiasta de la ciberseguridad.',
};

const Profile: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'fondos' | 'marcos' | 'badges' | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [desc, setDesc] = useState(mockUser.description);
  const [editDesc, setEditDesc] = useState(false);
  const [name, setName] = useState(mockUser.name);
  const [country, setCountry] = useState(mockUser.country);
  const [carouselIdx, setCarouselIdx] = useState(0);

  // Auto-slide del carrusel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Modal para FONDOS, MARCOS, BADGES
  const closeSectionModal = () => setActiveSection(null);
  const openSectionModal = (section: 'fondos' | 'marcos' | 'badges') => setActiveSection(section);

  // Carrusel handlers
  const prevImg = () => setCarouselIdx((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  const nextImg = () => setCarouselIdx((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-lg p-4 md:p-8">
        {/* Columna Izquierda */}
        <div className="w-full md:w-1/4 flex flex-col items-center gap-8">
          {/* Pie Chart */}
          <div className="w-full flex flex-col items-center">
            <div className="w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Botones verticales */}
          <div className="flex flex-col gap-4 w-full mt-4">
            <button className={`w-full py-3 rounded-lg font-bold text-lg border ${activeSection === 'fondos' ? 'border-blue-500 shadow' : 'border-gray-200'} bg-gray-100 hover:bg-blue-50`} onClick={() => openSectionModal('fondos')}>FONDOS</button>
            <button className={`w-full py-3 rounded-lg font-bold text-lg border ${activeSection === 'marcos' ? 'border-purple-600 shadow-lg' : 'border-gray-200'} bg-gray-100 hover:bg-purple-50`} onClick={() => openSectionModal('marcos')}>MARCOS</button>
            <button className={`w-full py-3 rounded-lg font-bold text-lg border ${activeSection === 'badges' ? 'border-blue-500 shadow' : 'border-gray-200'} bg-gray-100 hover:bg-blue-50`} onClick={() => openSectionModal('badges')}>BADGES</button>
          </div>
        </div>
        {/* Columna Central */}
        <div className="w-full md:w-2/4 flex flex-col items-center gap-6">
          {/* Barra superior */}
          <div className="w-full flex items-center justify-between bg-gray-100 rounded-lg px-6 py-3 mb-2">
            <span className="font-bold text-gray-700">MONEDAS: <span className="text-yellow-500">{mockUser.coins}</span></span>
            <span className="font-bold text-gray-700">bluepoints: <span className="text-blue-500">{mockUser.bluepoints}</span></span>
            <button className="ml-auto px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold hover:bg-red-100">LOG OUT</button>
          </div>
          {/* Avatar con marco de fuego animado */}
          <div className="relative flex flex-col items-center">
            <div className="w-40 h-40 flex items-center justify-center relative">
              {/* Marco SVG de fuego animado */}
              <svg width="170" height="170" viewBox="0 0 170 170" className="absolute z-10 fire-frame" style={{ left: 0, top: 0 }}>
                <g className="flame-group">
                  <path className="flame flame1" d="M85 10 Q95 30 85 50 Q75 30 85 10" fill="none" stroke="#ffb300" strokeWidth="6" strokeLinecap="round" />
                  <path className="flame flame2" d="M85 160 Q95 140 85 120 Q75 140 85 160" fill="none" stroke="#ff7043" strokeWidth="6" strokeLinecap="round" />
                  <path className="flame flame3" d="M10 85 Q30 95 50 85 Q30 75 10 85" fill="none" stroke="#ff1744" strokeWidth="6" strokeLinecap="round" />
                  <path className="flame flame4" d="M160 85 Q140 95 120 85 Q140 75 160 85" fill="none" stroke="#ffd600" strokeWidth="6" strokeLinecap="round" />
                  <path className="flame flame5" d="M40 40 Q60 60 85 30 Q110 60 130 40" fill="none" stroke="#ff9100" strokeWidth="4" strokeLinecap="round" />
                  <path className="flame flame6" d="M40 130 Q60 110 85 140 Q110 110 130 130" fill="none" stroke="#ffea00" strokeWidth="4" strokeLinecap="round" />
                </g>
                <circle cx="85" cy="85" r="80" fill="none" stroke="#f59e42" strokeWidth="8" />
              </svg>
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-7xl z-20">
                <span role="img" aria-label="avatar">👤</span>
              </div>
            </div>
            {/* Botones debajo del avatar */}
            <div className="flex gap-4 mt-4">
              <button className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold hover:bg-blue-100" onClick={() => setShowEdit(true)}>EDITAR PERFIL</button>
              <button className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold hover:bg-blue-100" onClick={() => setShowPassword(true)}>CAMBIAR CONTRASEÑA</button>
            </div>
            {/* Caja de descripción */}
            <div className="w-full mt-6">
              <div className="bg-gray-100 rounded-lg p-4 min-h-[80px] flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-700">DESCRIPCIÓN</span>
                  {!editDesc && <button className="text-blue-600 font-semibold" onClick={() => setEditDesc(true)}>Editar</button>}
                </div>
                {editDesc ? (
                  <div className="flex flex-col gap-2">
                    <textarea className="w-full rounded border p-2" value={desc} onChange={e => setDesc(e.target.value)} rows={3} />
                    <div className="flex gap-2 justify-end">
                      <button className="px-3 py-1 rounded bg-gray-200 text-gray-800 font-bold" onClick={() => setEditDesc(false)}>Cancelar</button>
                      <button className="px-3 py-1 rounded bg-blue-600 text-white font-bold" onClick={() => setEditDesc(false)}>Guardar</button>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-700">{desc}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Columna Derecha */}
        <div className="w-full md:w-1/4 flex flex-col gap-6 items-center">
          {/* Cuadros grandes de nombre y país */}
          <div className="w-full flex flex-col gap-4">
            <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
              <span className="font-bold text-gray-700 mb-1">NOMBRE</span>
              <input className="w-full text-center font-semibold text-lg bg-transparent outline-none" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
              <span className="font-bold text-gray-700 mb-1">PAÍS</span>
              <select className="w-full text-center font-semibold text-lg bg-transparent outline-none" value={country} onChange={e => setCountry(e.target.value)}>
                <option value="Germany">🇩🇪 Germany</option>
                <option value="Mexico">🇲🇽 Mexico</option>
                <option value="USA">🇺🇸 USA</option>
                <option value="Spain">🇪🇸 Spain</option>
              </select>
            </div>
          </div>
          {/* Cuadros pequeños de estadísticas */}
          <div className="w-full flex flex-row gap-4 mt-2">
            <div className="flex-1 bg-gray-100 rounded-lg p-4 flex flex-col items-center">
              <span className="font-bold text-gray-700">LIKES</span>
              <span className="text-green-600 font-bold text-xl">{mockUser.likes}</span>
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg p-4 flex flex-col items-center">
              <span className="font-bold text-gray-700">DISLIKES</span>
              <span className="text-red-600 font-bold text-xl">{mockUser.dislikes}</span>
            </div>
          </div>
          {/* Carrusel de imágenes */}
          <div className="w-full flex flex-col items-center mt-4">
            <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center w-full">
              <div className="flex items-center justify-center w-full">
                <img src={carouselImages[carouselIdx]} alt="mock" className="w-full h-32 object-cover rounded-lg border transition-all duration-700" />
              </div>
              <div className="flex gap-1 mt-2 justify-center w-full">
                {carouselImages.map((_, idx) => (
                  <span key={idx} className={`inline-block w-2 h-2 rounded-full ${carouselIdx === idx ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modales de sección (FONDOS, MARCOS, BADGES) */}
      {activeSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative flex flex-col items-center">
            <button onClick={closeSectionModal} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold">×</button>
            <h2 className="text-xl font-bold mb-4">{activeSection.toUpperCase()}</h2>
            <button className="px-4 py-2 rounded bg-blue-600 text-white font-bold mt-4" onClick={closeSectionModal}>Cerrar</button>
          </div>
        </div>
      )}
      {/* Modales de edición y cambio de contraseña (reutilizados) */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button onClick={() => setShowEdit(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold">×</button>
            <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
            {/* Aquí va el formulario de edición */}
            <form className="flex flex-col gap-4">
              <label className="font-semibold text-gray-700">Nombre
                <input type="text" className="input mt-1 w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} />
              </label>
              <label className="font-semibold text-gray-700">País
                <select className="input mt-1 w-full border rounded px-3 py-2" value={country} onChange={e => setCountry(e.target.value)}>
                  <option value="Germany">🇩🇪 Germany</option>
                  <option value="Mexico">🇲🇽 Mexico</option>
                  <option value="USA">🇺🇸 USA</option>
                  <option value="Spain">🇪🇸 Spain</option>
                </select>
              </label>
              <label className="font-semibold text-gray-700">Avatar
                <input type="file" className="input mt-1 w-full" accept="image/*" />
              </label>
              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold" onClick={() => setShowEdit(false)}>Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-bold">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button onClick={() => setShowPassword(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold">×</button>
            <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
            <form className="flex flex-col gap-4">
              <label className="font-semibold text-gray-700">Contraseña Actual
                <input type="password" className="input mt-1 w-full border rounded px-3 py-2" />
              </label>
              <label className="font-semibold text-gray-700">Nueva Contraseña
                <input type="password" className="input mt-1 w-full border rounded px-3 py-2" />
              </label>
              <label className="font-semibold text-gray-700">Confirmar Nueva Contraseña
                <input type="password" className="input mt-1 w-full border rounded px-3 py-2" />
              </label>
              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold" onClick={() => setShowPassword(false)}>Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-bold">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 

<style jsx>{`
  .fire-frame .flame1 {
    animation: flame1 2.2s ease-in-out infinite alternate;
  }
  .fire-frame .flame2 {
    animation: flame2 2.4s ease-in-out infinite alternate;
  }
  .fire-frame .flame3 {
    animation: flame3 2.1s ease-in-out infinite alternate;
  }
  .fire-frame .flame4 {
    animation: flame4 2.3s ease-in-out infinite alternate;
  }
  .fire-frame .flame5 {
    animation: flame5 2.5s ease-in-out infinite alternate;
  }
  .fire-frame .flame6 {
    animation: flame6 2.6s ease-in-out infinite alternate;
  }
  @keyframes flame1 {
    0% { opacity: 0.8; transform: scaleY(1) translateY(0); }
    50% { opacity: 1; transform: scaleY(1.15) translateY(-4px); }
    100% { opacity: 0.7; transform: scaleY(0.95) translateY(2px); }
  }
  @keyframes flame2 {
    0% { opacity: 0.7; transform: scaleY(1) translateY(0); }
    50% { opacity: 1; transform: scaleY(1.12) translateY(-3px); }
    100% { opacity: 0.8; transform: scaleY(0.97) translateY(2px); }
  }
  @keyframes flame3 {
    0% { opacity: 0.8; transform: scaleX(1) translateX(0); }
    50% { opacity: 1; transform: scaleX(1.13) translateX(-4px); }
    100% { opacity: 0.7; transform: scaleX(0.95) translateX(2px); }
  }
  @keyframes flame4 {
    0% { opacity: 0.7; transform: scaleX(1) translateX(0); }
    50% { opacity: 1; transform: scaleX(1.12) translateX(3px); }
    100% { opacity: 0.8; transform: scaleX(0.97) translateX(-2px); }
  }
  @keyframes flame5 {
    0% { opacity: 0.8; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.1) rotate(-3deg); }
    100% { opacity: 0.7; transform: scale(0.95) rotate(2deg); }
  }
  @keyframes flame6 {
    0% { opacity: 0.8; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.1) rotate(3deg); }
    100% { opacity: 0.7; transform: scale(0.95) rotate(-2deg); }
  }
`}</style> 