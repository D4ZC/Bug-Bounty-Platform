import React, { useState } from "react";
import { FaUserShield, FaFlag, FaGavel, FaTools, FaClock, FaMedal, FaChalkboardTeacher, FaTrophy, FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { MdSecurity, MdOutlineWorkspacePremium } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";

const reglas = [
  { icon: <span className="mr-2"><MdSecurity size={20} color="#06b6d4" /></span>, text: "Entornos controlados y seguros." },
  { icon: <span className="mr-2"><FaUserShield size={20} color="#06b6d4" /></span>, text: "Solo hacking ético. Nada fuera del entorno." },
  { icon: <span className="mr-2"><FaClock size={20} color="#06b6d4" /></span>, text: "Tiempo límite para cada duelo." },
  { icon: <span className="mr-2"><FaFlag size={20} color="#06b6d4" /></span>, text: "Las vulnerabilidades deben ser reportadas y documentadas." },
  { icon: <span className="mr-2"><FaGavel size={20} color="#06b6d4" /></span>, text: "Jueces o sistema automatizado validan y puntúan." },
  { icon: <span className="mr-2"><FaTools size={20} color="#06b6d4" /></span>, text: "Se permite cualquier herramienta estándar de ciberseguridad." },
  { icon: <span className="mr-2"><BsPeopleFill size={20} color="#06b6d4" /></span>, text: "No compartir soluciones entre equipos, salvo en Dúo/Equipo." },
];

const premios = [
  { icon: <span className="mr-2"><FaMedal size={20} color="#facc15" /></span>, text: "Insignias de 'Maestro de Vulnerabilidades' (se mostrarán en tu perfil)" },
  { icon: <span className="mr-2"><MdOutlineWorkspacePremium size={20} color="#facc15" /></span>, text: "Acceso a recursos premium de ciberseguridad" },
  { icon: <span className="mr-2"><FaChalkboardTeacher size={20} color="#facc15" /></span>, text: "Oportunidades de capacitación o conferencias" },
  { icon: <span className="mr-2"><FaTrophy size={20} color="#facc15" /></span>, text: "Reconocimiento en el cuadro de honor público" },
];

export default function RulesHonorAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-8 font-mono">
      <button
        className="w-full flex items-center justify-between text-cyan-400 font-extrabold text-2xl focus:outline-none"
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        <span>Reglas Generales</span>
        <FaChevronDown size={22} />
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 animate-fade-in">
          <div className="max-w-md w-full font-mono relative animate-fade-in p-6">
            <button
              className="absolute top-3 right-3 text-cyan-400 text-2xl font-bold hover:text-white focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >
              <FaTimes />
            </button>
            <h2 className="text-cyan-400 font-extrabold text-2xl mb-4">Reglas Generales</h2>
            <ul className="space-y-2 mb-6">
              {reglas.map((r, i) => (
                <li key={i} className="flex items-start text-white text-sm">
                  {r.icon}
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
            <h2 className="text-cyan-400 font-extrabold text-2xl mb-4">Premios al Honor</h2>
            <ul className="space-y-2">
              {premios.map((p, i) => (
                <li key={i} className="flex items-start text-white text-sm">
                  {p.icon}
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 