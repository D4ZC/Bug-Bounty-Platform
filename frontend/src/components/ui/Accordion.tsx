import React, { useState } from "react";

interface AccordionSection {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  sections: AccordionSection[];
}

const Accordion: React.FC<AccordionProps> = ({ sections }) => {
  // Solo una sección abierta a la vez: guarda el índice abierto o null
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="rounded-lg border border-cyan-400 bg-black/80 p-4 shadow-lg">
      {sections.map((section, idx) => (
        <div key={idx} className="mb-2">
          <button
            className="flex items-center justify-between w-full text-cyan-400 font-bold text-lg focus:outline-none"
            onClick={() => toggleSection(idx)}
            aria-expanded={openIndex === idx}
          >
            <span>{section.title}</span>
            <span>{openIndex === idx ? "▲" : "▼"}</span>
          </button>
          {openIndex === idx && (
            <div className="mt-2 text-white animate-fade-in">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion; 