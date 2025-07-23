import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaTrash } from 'react-icons/fa';

interface DuelCardProps {
  typeIcon: React.ReactNode;
  duelType: string;
  opponents: Array<{ avatar: string; name: string }>;
  objective: string;
  points: number;
  onEnterArena: () => void;
  isWaiting?: boolean;
  details?: string;
  isCreator?: boolean;
  onDelete?: () => void;
  status?: 'waiting' | 'active' | 'finished';
}

const DuelCard: React.FC<DuelCardProps> = ({
  typeIcon,
  duelType,
  opponents,
  objective,
  points,
  onEnterArena,
  isWaiting = false,
  details,
  isCreator = false,
  onDelete,
  status = 'active',
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCardClick = () => {
    if (isWaiting) setShowModal(true);
  };

  // Determinar si el botón debe estar deshabilitado
  const isDisabled = !isWaiting && (status === 'active' || status === 'finished');
  let buttonText = '¡ENTRAR A LA ARENA!';
  if (status === 'active' && !isWaiting) buttonText = 'DUELLO EN CURSO';
  if (status === 'finished') buttonText = 'DUELLO FINALIZADO';

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: '0 0 16px #39ff14' }}
        className={`relative bg-black/60 border border-neon-green rounded-xl p-4 mb-4 flex flex-col gap-2 transition-all duration-200 ${isWaiting ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
      >
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-neon-green text-2xl">{typeIcon}</span>
            <span className="font-bold text-lg text-white">{duelType}</span>
          </div>
          {isCreator && (
            <button
              className="ml-auto p-2 rounded-full bg-gradient-to-r from-red-600 to-red-400 text-white border-2 border-red-700 shadow-lg hover:scale-110 transition-all"
              title="Eliminar duelo"
              onClick={e => { e.stopPropagation(); setShowDeleteModal(true); }}
            >
              <FaTrash />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          {opponents.map((op, idx) => (
            <img
              key={idx}
              src={op.avatar}
              alt={op.name}
              className="w-8 h-8 rounded-full border-2 border-white"
              title={op.name}
            />
          ))}
          {isWaiting && (
            <span className="ml-2 text-gray-400 flex items-center gap-1">
              <span className="animate-pulse">Esperando Oponente...</span>
              <span className="text-xl">?</span>
            </span>
          )}
        </div>
        <div className="text-sm text-gray-300 mt-1">{objective}</div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-neon-green text-xl font-bold">{points}</span>
          <span className="text-neon-green">★</span>
        </div>
        <button
          onClick={onEnterArena}
          className={`mt-3 bg-gradient-to-r from-neon-green to-blue-500 text-black font-extrabold text-lg py-2 rounded-lg w-full transition-all shadow-lg border-4 drop-shadow-lg tracking-wide
            ${isDisabled ? 'opacity-50 cursor-not-allowed border-gray-500 bg-gray-700 text-gray-300' : 'hover:scale-105 hover:from-blue-500 hover:to-neon-green hover:text-white border-blue-400'}
          `}
          style={{ textShadow: '0 2px 8px #fff', color: '#111' }}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </motion.div>
      {/* Modal de detalles para duelos esperando oponente */}
      {isWaiting && showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 border-2 border-neon-green rounded-xl p-8 max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-neon-green text-xl" onClick={() => setShowModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-neon-green mb-4">Detalles del Duelo</h2>
            <div className="mb-2 text-white"><b>Tipo de Duelo:</b> {duelType}</div>
            <div className="mb-2 text-white"><b>Objetivo:</b> {objective}</div>
            <div className="mb-2 text-white"><b>Puntos Apostados:</b> <span className="text-neon-green font-bold">{points}</span></div>
            <div className="mb-2 text-white"><b>Oponentes:</b></div>
            <ul className="mb-4">
              {opponents.map((op, idx) => (
                <li key={idx} className="flex items-center gap-2 mb-1">
                  <img src={op.avatar} alt={op.name} className="w-7 h-7 rounded-full border border-white" />
                  <span className="text-neon-green font-semibold">{op.name || 'Por definir'}</span>
                </li>
              ))}
            </ul>
            {details && <div className="mb-4 text-gray-300">{details}</div>}
            <button
              className="w-full bg-gradient-to-r from-neon-green to-blue-500 text-black font-extrabold text-lg py-2 rounded-lg transition-all shadow-lg hover:scale-105 hover:from-blue-500 hover:to-neon-green hover:text-white border-4 border-blue-400 drop-shadow-lg tracking-wide"
              style={{ textShadow: '0 2px 8px #fff', color: '#111' }}
              onClick={() => { setShowModal(false); alert('Duelo aceptado (simulado)'); }}
            >
              ACEPTAR DUELO
            </button>
            {isCreator && onDelete && (
              <button
                className="w-full mt-3 bg-gradient-to-r from-red-600 to-red-400 text-white font-extrabold text-lg py-2 rounded-lg transition-all shadow-lg hover:scale-105 border-4 border-red-700 drop-shadow-lg tracking-wide"
                style={{ textShadow: '0 2px 8px #fff' }}
                onClick={() => setShowDeleteModal(true)}
              >
                ELIMINAR DUELO
              </button>
            )}
          </div>
        </div>
      )}
      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 border-2 border-red-600 rounded-xl p-8 max-w-sm w-full relative flex flex-col items-center">
            <button className="absolute top-2 right-2 text-red-400 text-xl" onClick={() => setShowDeleteModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-red-500 mb-4">¿Eliminar este duelo?</h2>
            <p className="text-white mb-6 text-center">Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este duelo?</p>
            <div className="flex gap-4 w-full">
              <button
                className="flex-1 py-2 rounded-lg bg-gray-700 text-white font-bold hover:bg-gray-600 transition-all"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-400 text-white font-bold hover:brightness-125 border-2 border-red-700 transition-all"
                onClick={() => { setShowDeleteModal(false); onDelete && onDelete(); }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DuelCard; 