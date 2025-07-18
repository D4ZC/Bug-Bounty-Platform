import React, { useState, useEffect } from 'react';
import { CardData } from '../types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const getUserEmail = () => localStorage.getItem('usuario_email_actual') || '';

const Formulario: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [modalCard, setModalCard] = useState<CardData | null>(null);
  const usuarioEmail = getUserEmail();

  useEffect(() => {
    const stored = localStorage.getItem('vulnerabilidades');
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, []);

  // Guardar cards en localStorage y actualizar estado
  const updateCards = (newCards: CardData[]) => {
    setCards(newCards);
    localStorage.setItem('vulnerabilidades', JSON.stringify(newCards));
  };

  // Votar
  const handleVote = (id: string, type: 'like' | 'dislike') => {
    const newCards = cards.map(card => {
      if (card.id !== id) return card;
      let likes = card.likes;
      let dislikes = card.dislikes;
      let userVote = card.userVote;
      if (type === 'like') {
        if (userVote === 'like') return card;
        if (userVote === 'dislike') { dislikes--; likes++; userVote = 'like'; }
        else { likes++; userVote = 'like'; }
      } else {
        if (userVote === 'dislike') return card;
        if (userVote === 'like') { likes--; dislikes++; userVote = 'dislike'; }
        else { dislikes++; userVote = 'dislike'; }
      }
      // Guardar voto por usuario (solo uno por usuario)
      return { ...card, likes, dislikes, userVote };
    });
    // Ordenar por likes descendente
    newCards.sort((a, b) => b.likes - a.likes);
    updateCards(newCards);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 bg-gray-100">
      <h2 className="text-2xl font-bold mb-8 text-carbon-dark">Vulnerabilidades registradas</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {cards.map(card => (
          <div key={card.id} className="w-[200px] h-[150px] bg-white border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col justify-between mb-8">
            {/* Info */}
            <div>
              <h3 className="text-base font-semibold text-carbon-dark mb-1 truncate">{card.nombre}</h3>
              <p className="text-xs text-gray-700 mb-0.5 truncate">{card.jugador}</p>
              <p className="text-xs text-gray-500 mb-0.5 truncate">{card.email}</p>
              <p className="text-xs text-gray-400 mb-2">{card.fecha}</p>
            </div>
            {/* Fila de acciones: votos y ver más */}
            <div className="flex flex-row items-center justify-between mt-2">
              <div className="flex flex-row items-center gap-2">
                <button
                  className={`p-1 rounded-full ${card.userVote === 'like' ? 'bg-green-100' : ''}`}
                  onClick={() => handleVote(card.id, 'like')}
                  aria-label="Like"
                >
                  <ThumbsUp size={20} className={card.userVote === 'like' ? 'text-green-600' : 'text-gray-400'} />
                </button>
                <span className="text-xs font-bold text-green-700">{card.likes}</span>
                <button
                  className={`p-1 rounded-full ${card.userVote === 'dislike' ? 'bg-red-100' : ''}`}
                  onClick={() => handleVote(card.id, 'dislike')}
                  aria-label="Dislike"
                >
                  <ThumbsDown size={20} className={card.userVote === 'dislike' ? 'text-red-600' : 'text-gray-400'} />
                </button>
                <span className="text-xs font-bold text-red-700">{card.dislikes}</span>
              </div>
              <button
                className="px-3 py-1 text-xs font-semibold rounded bg-carbon-blue text-white hover:bg-carbon-dark transition-colors"
                onClick={() => setModalCard(card)}
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal de detalle */}
      {modalCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[350px] h-[500px] bg-white border border-gray-400 shadow-2xl rounded-xl flex flex-col p-6 relative animate-fade-in">
            <h3 className="text-lg font-bold text-carbon-dark mb-2">{modalCard.nombre}</h3>
            <p className="text-sm text-gray-700 mb-1">Creado por: <span className="font-semibold">{modalCard.jugador}</span></p>
            <p className="text-sm text-gray-500 mb-1">Correo: {modalCard.email}</p>
            <p className="text-sm text-gray-400 mb-3">Fecha: {modalCard.fecha}</p>
            <div className="flex-1 overflow-y-auto w-full break-words text-sm text-gray-800 pr-1 mb-4">
              {modalCard.descripcion}
            </div>
            {modalCard.imagenUrl && (
              <div className="flex justify-center mt-2">
                <img
                  src={modalCard.imagenUrl}
                  alt="Imagen de la vulnerabilidad"
                  style={{ maxWidth: '100%', maxHeight: '180px', display: 'block' }}
                />
              </div>
            )}
            {/* Fila de acciones: borrar (si es creador) y cerrar */}
            <div className="flex justify-between items-center mt-4">
              {modalCard.email === usuarioEmail ? (
                <DeleteVulnButton cardId={modalCard.id} onDeleted={() => { setModalCard(null); /* refresca cards */ const updated = cards.filter(c => c.id !== modalCard.id); setCards(updated); localStorage.setItem('vulnerabilidades', JSON.stringify(updated)); }} />
              ) : <div />}
              <button
                className="px-4 py-2 text-sm font-semibold rounded bg-carbon-blue text-white hover:bg-carbon-dark transition-colors"
                onClick={() => setModalCard(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formulario;

function DeleteVulnButton({ cardId, onDeleted }: { cardId: string, onDeleted: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="relative">
      <button
        className="px-4 py-2 text-sm font-semibold rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
        onClick={() => setShowConfirm(true)}
      >
        Borrar
      </button>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 w-56 animate-fade-in flex flex-col gap-2">
            <span className="text-sm text-gray-800 font-semibold mb-2">¿Estás seguro que deseas borrar esta vulnerabilidad?</span>
            <div className="flex justify-between gap-2 mt-2">
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
              <button
                className="px-3 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700"
                onClick={() => { setShowConfirm(false); onDeleted(); }}
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 