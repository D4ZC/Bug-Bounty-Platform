import React, { useEffect, useState } from 'react';

const CONSEJOS = [
  'Recuerda leer todas las reglas antes de participar.',
  '¡Reporta vulnerabilidades de forma responsable!',
  'Colabora con otros jugadores para mejorar la seguridad.',
  'No compartas información sensible en público.',
  '¡Diviértete y aprende en cada reto!'
];

// SVG cartoon tipo "vecino" (placeholder)
const VecinoSVG = () => (
  <svg width="160" height="200" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="190" rx="60" ry="10" fill="#bbb" opacity=".2" />
    <ellipse cx="60" cy="120" rx="50" ry="70" fill="#e0c9a6" stroke="#b08b4f" strokeWidth="4" />
    <ellipse cx="60" cy="90" rx="30" ry="35" fill="#fff" stroke="#b08b4f" strokeWidth="2" />
    <ellipse cx="50" cy="90" rx="5" ry="8" fill="#fff" />
    <ellipse cx="70" cy="90" rx="5" ry="8" fill="#fff" />
    <ellipse cx="50" cy="90" rx="2.5" ry="4" fill="#222" />
    <ellipse cx="70" cy="90" rx="2.5" ry="4" fill="#222" />
    <ellipse cx="60" cy="110" rx="10" ry="5" fill="#b08b4f" />
    <rect x="30" y="60" width="60" height="20" rx="10" fill="#b08b4f" />
    <rect x="90" y="60" width="40" height="10" rx="5" fill="#888" />
    <rect x="125" y="62" width="30" height="4" rx="2" fill="#888" />
    <ellipse cx="60" cy="160" rx="18" ry="10" fill="#b08b4f" />
    <ellipse cx="60" cy="170" rx="12" ry="5" fill="#b08b4f" />
    <ellipse cx="60" cy="180" rx="8" ry="3" fill="#b08b4f" />
    <ellipse cx="60" cy="130" rx="16" ry="8" fill="#fff" />
    <ellipse cx="60" cy="140" rx="10" ry="4" fill="#fff" />
    <ellipse cx="60" cy="150" rx="6" ry="2" fill="#fff" />
  </svg>
);

const getConsejoAleatorio = () => CONSEJOS[Math.floor(Math.random() * CONSEJOS.length)];

const Reglas: React.FC = () => {
  const [showVecino, setShowVecino] = useState(false);
  const [consejo, setConsejo] = useState('');

  useEffect(() => {
    // Solo mostrar la primera vez por sesión
    if (!sessionStorage.getItem('reglas_vecino_mostrado')) {
      setShowVecino(true);
      setConsejo(getConsejoAleatorio());
      sessionStorage.setItem('reglas_vecino_mostrado', '1');
    }
  }, []);

  // Ocultar al hacer clic en cualquier parte
  useEffect(() => {
    if (!showVecino) return;
    const handle = () => setShowVecino(false);
    window.addEventListener('click', handle);
    return () => window.removeEventListener('click', handle);
  }, [showVecino]);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 relative min-h-[60vh]">
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
};

export default Reglas; 