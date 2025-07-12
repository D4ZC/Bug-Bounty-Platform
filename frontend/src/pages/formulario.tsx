import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Eye, Edit, Trash2 } from 'lucide-react';

export interface CardData {
  id: string;
  nombre: string;
  fecha: string;
  jugador: string;
  descripcion: string;
  imagenUrl?: string;
  likes: number;
  dislikes: number;
  userVote?: 'like' | 'dislike' | null;
  createdAt: number;
}

const CARDS_KEY = 'vulnerabilidad_cards';
const USER_KEY = 'nombre_usuario';

const getCardsFromStorage = (): CardData[] => {
  try {
    const data = localStorage.getItem(CARDS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCardsToStorage = (cards: CardData[]) => {
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
};

const getUserFromStorage = () => localStorage.getItem(USER_KEY) || '';

export const SidebarSecundario: React.FC<{ modo: 'normal' | 'editar', setModo: (m: 'normal' | 'editar') => void }> = ({ modo, setModo }) => {
  const navigate = useNavigate();
  const opciones = [
    { label: 'Crear', path: '/formulario/crear', key: 'crear' },
    { label: 'Editar', path: '#', key: 'editar' },
    { label: 'Volver', path: '/formulario', key: 'volver' },
  ];
  return (
    <div
      className="fixed z-30 transition-all duration-300 ease-in-out w-48 opacity-0 hover:opacity-100 group"
      style={{ background: 'rgba(0,0,0,0.05)', left: '250px', top: '100px', height: 'calc(100% - 100px)', position: 'fixed' }}
    >
      <div className="flex flex-col h-full pt-24 gap-4 items-start overflow-hidden transition-all duration-300">
        {opciones.map((opcion) => (
          <div
            key={opcion.key}
            className={`font-bold text-lg px-4 py-2 rounded-lg shadow-[0_2px_8px_0_rgba(0,0,0,0.7)] cursor-pointer w-40 mt-2 ml-2 ${
              (modo === 'editar' && opcion.key === 'editar') || (modo === 'normal' && opcion.key === 'volver') ? 'bg-blue-600 text-white' : 'text-black'
            }`}
            style={{ fontFamily: 'Arial, Arial Black, sans-serif' }}
            onClick={() => {
              if (opcion.key === 'crear') navigate(opcion.path);
              else if (opcion.key === 'editar') setModo('editar');
              else if (opcion.key === 'volver') navigate('/formulario');
            }}
          >
            <span className="transition-colors duration-200 hover:text-blue-600">{opcion.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FormularioPage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [modalCard, setModalCard] = useState<CardData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modo, setModo] = useState<'normal' | 'editar'>('normal');
  const [editCard, setEditCard] = useState<CardData | null>(null);
  const [showDelete, setShowDelete] = useState<CardData | null>(null);
  const usuario = getUserFromStorage();

  useEffect(() => {
    setCards(getCardsFromStorage());
  }, []);

  useEffect(() => {
    saveCardsToStorage(cards);
  }, [cards]);

  // Ordenar cards por likes netos y fecha
  const sortedCards = [...cards].sort((a, b) => {
    const netA = a.likes - a.dislikes;
    const netB = b.likes - b.dislikes;
    if (netA === netB) return b.createdAt - a.createdAt;
    return netB - netA;
  });

  const filteredCards = modo === 'editar' && usuario
    ? sortedCards.filter(card => card.jugador === usuario)
    : sortedCards;

  const handleVote = (id: string, type: 'like' | 'dislike') => {
    setCards(prev => prev.map(card => {
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
      return { ...card, likes, dislikes, userVote };
    }));
  };

  // Modal animado
  const openModal = (card: CardData) => {
    setModalCard(card);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setModalCard(null), 300);
  };

  // Editar
  const openEdit = (card: CardData) => setEditCard(card);
  const closeEdit = () => setEditCard(null);
  const handleEditSave = (updated: CardData) => {
    setCards(prev => prev.map(card => card.id === updated.id ? { ...card, ...updated } : card));
    closeEdit();
  };

  // Eliminar
  const openDelete = (card: CardData) => setShowDelete(card);
  const closeDelete = () => setShowDelete(null);
  const handleDelete = () => {
    if (showDelete) {
      setCards(prev => prev.filter(card => card.id !== showDelete.id));
      closeDelete();
    }
  };

  return (
    <div className="w-full flex flex-row min-h-screen">
      <SidebarSecundario modo={modo} setModo={setModo} />
      <div className="flex-1 p-8 ml-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Vulnerabilidades Registradas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCards.map(card => (
            <div key={card.id} className="bg-white border border-gray-200 rounded-xl shadow-sm w-[200px] h-[200px] flex flex-col justify-between p-4 relative">
              <div className="flex items-center justify-between">
                {modo === 'normal' ? (
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleVote(card.id, 'like')} className={`flex items-center gap-1 text-green-600 font-bold ${card.userVote === 'like' ? 'scale-110' : ''}`}>
                      <ThumbsUp size={20} /> {card.likes}
                    </button>
                    <button onClick={() => handleVote(card.id, 'dislike')} className={`flex items-center gap-1 text-red-600 font-bold ${card.userVote === 'dislike' ? 'scale-110' : ''}`}>
                      <ThumbsDown size={20} /> {card.dislikes}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button onClick={() => openEdit(card)} className="flex items-center gap-1 text-blue-600 font-bold hover:scale-110"><Edit size={20} /> Editar</button>
                    <button onClick={() => openDelete(card)} className="flex items-center gap-1 text-red-600 font-bold hover:scale-110"><Trash2 size={20} /> Eliminar</button>
                  </div>
                )}
                {modo === 'normal' && (
                  <button onClick={() => openModal(card)} className="absolute right-4 top-4 text-blue-600 hover:text-blue-800 transition"><Eye size={22} /></button>
                )}
              </div>
              <div className="mt-2">
                <div className="font-bold text-gray-900 truncate">{card.nombre}</div>
                <div className="text-xs text-gray-500">{card.fecha}</div>
                <div className="text-xs text-gray-700 truncate">{card.jugador}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal de vista */}
        {modalCard && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${modalOpen ? 'bg-black/60 visible opacity-100' : 'invisible opacity-0'}`}
            onClick={closeModal}
          >
            <div className={`bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative transition-all duration-300 ${modalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold">×</button>
              <h3 className="text-xl font-bold text-blue-700 mb-2">{modalCard.nombre}</h3>
              <div className="text-xs text-gray-500 mb-2">{modalCard.fecha} — {modalCard.jugador}</div>
              {modalCard.imagenUrl && (
                <img src={modalCard.imagenUrl} alt="Vulnerabilidad" className="w-full max-h-48 object-contain rounded mb-4 border" />
              )}
              <div className="text-gray-800 whitespace-pre-line mb-2">{modalCard.descripcion}</div>
            </div>
          </div>
        )}
        {/* Modal de edición */}
        {editCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative">
              <button onClick={closeEdit} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold">×</button>
              <h3 className="text-xl font-bold text-blue-700 mb-2">Editar Vulnerabilidad</h3>
              <EditForm card={editCard} onSave={handleEditSave} onCancel={closeEdit} />
            </div>
          </div>
        )}
        {/* Modal de confirmación de borrado */}
        {showDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative">
              <h3 className="text-lg font-bold text-gray-800 mb-4">¿Estás seguro que deseas eliminar esta vulnerabilidad?</h3>
              <div className="flex justify-end gap-4">
                <button onClick={closeDelete} className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold">Cancelar</button>
                <button onClick={handleDelete} className="px-4 py-2 rounded bg-red-600 text-white font-bold">Eliminar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Formulario de edición reutilizable
const EditForm: React.FC<{ card: CardData; onSave: (c: CardData) => void; onCancel: () => void }> = ({ card, onSave, onCancel }) => {
  const [nombre, setNombre] = useState(card.nombre);
  const [descripcion, setDescripcion] = useState(card.descripcion);
  const [imagenUrl, setImagenUrl] = useState(card.imagenUrl || '');
  const [error, setError] = useState('');

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImagenUrl(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !descripcion) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    onSave({ ...card, nombre, descripcion, imagenUrl });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {error && <div className="text-red-500 font-semibold">{error}</div>}
      <label className="font-semibold text-gray-700">Nombre de la vulnerabilidad
        <input type="text" className="input mt-1" value={nombre} onChange={e => setNombre(e.target.value)} required />
      </label>
      <label className="font-semibold text-gray-700">Descripción
        <textarea className="input mt-1" value={descripcion} onChange={e => setDescripcion(e.target.value)} required rows={4} />
      </label>
      <label className="font-semibold text-gray-700">Subir imagen (opcional)
        <input type="file" className="input mt-1" accept="image/*" onChange={handleImage} />
      </label>
      {imagenUrl && <img src={imagenUrl} alt="Vulnerabilidad" className="w-full max-h-32 object-contain rounded mb-2 border" />}
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-bold">Cancelar</button>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-bold">Guardar</button>
      </div>
    </form>
  );
};

export default FormularioPage; 