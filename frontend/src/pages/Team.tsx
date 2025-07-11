import React, { useState } from 'react';
import Modal from '../components/ui/Modal';

const mockClan = {
  name: 'Cyber Hunters',
  description: 'Clan de cazadores de bugs elite. ¡Únete y domina el ranking!',
  members: 42,
};

const Team: React.FC = () => {
  const [isMember, setIsMember] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'join' | 'leave' | null>(null);

  const handleJoin = () => {
    setIsMember(true);
    setModalType('join');
    setShowModal(true);
  };

  const handleLeave = () => {
    setIsMember(false);
    setModalType('leave');
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0026] via-[#1a0033] to-[#0f0026] text-white">
      <div className="bg-black/80 border-2 border-cyan-400 neon-shadow rounded-2xl p-8 w-full max-w-md flex flex-col gap-4 items-center animate-pop-in">
        <h2 className="text-3xl font-extrabold text-cyan-200 mb-2 text-center drop-shadow-cyber">{mockClan.name}</h2>
        <p className="text-cyan-100 text-center mb-4">{mockClan.description}</p>
        <span className="text-yellow-300 font-bold mb-4">Miembros: {mockClan.members + (isMember ? 1 : 0)}</span>
        {isMember ? (
          <button
            onClick={handleLeave}
            className="bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold px-6 py-3 rounded-full shadow-cyber hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus:ring-2 focus:ring-pink-400 transition-all duration-200"
          >
            Salir del clan
          </button>
        ) : (
          <button
            onClick={handleJoin}
            className="bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-full shadow-cyber hover:scale-110 hover:shadow-cyber active:scale-95 active:shadow-inner focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
          >
            Unirse al clan
          </button>
        )}
      </div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'join' ? '¡Unión exitosa!' : 'Has salido del clan'}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-5xl animate-bounce">{modalType === 'join' ? '🤝' : '👋'}</span>
          {modalType === 'join' ? (
            <p className="text-lg font-bold text-cyan-200 text-center">¡Ahora eres miembro de <span className="text-pink-400">{mockClan.name}</span>!<br />Participa, suma puntos y escala en el ranking.</p>
          ) : (
            <p className="text-lg font-bold text-cyan-200 text-center">Has salido de <span className="text-pink-400">{mockClan.name}</span>.<br />¡Te esperamos de vuelta cuando quieras!</p>
          )}
          <button
            onClick={() => setShowModal(false)}
            className="mt-4 bg-cyan-600 text-white font-bold px-6 py-2 rounded-full hover:bg-cyan-700 transition"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Team;
