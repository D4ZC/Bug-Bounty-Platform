import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaTrash, FaUserCircle, FaUsers } from 'react-icons/fa';

interface DuelCardProps {
  id: number;
  type: string;
  typeIcon: string;
  opponents: any[];
  objective: string;
  points: number;
  isWaiting: boolean;
  status?: 'waiting' | 'active' | 'finished';
}

// Type guard para equipos
type TeamOpponent = { teamName: string; avatar?: string; members: { avatar: string; name: string }[] };
function isTeamOpponent(obj: any): obj is TeamOpponent {
  return obj && typeof obj.teamName === 'string' && Array.isArray(obj.members);
}

const DuelCard: React.FC<DuelCardProps> = ({
  id,
  type,
  typeIcon,
  opponents,
  objective,
  points,
  isWaiting,
  status = 'waiting'
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    // Lógica para eliminar duelo
    setShowDeleteModal(false);
  };

  let buttonText = 'UNIRSE';
  let buttonClass = 'bg-neon-green text-black hover:bg-blue-400';
  
  if (isWaiting) buttonText = 'ESPERANDO OPONENTE';
  if (status === 'active' && !isWaiting) buttonText = 'DUELLO EN CURSO';
  if (status === 'finished') buttonText = 'DUELLO FINALIZADO';

  // Determinar si el botón debe estar deshabilitado
  const isDisabled = !isWaiting && (status === 'active' || status === 'finished');

  // Detectar si es duelo de equipo
  const isTeamDuel = Array.isArray(opponents) && opponents.some(isTeamOpponent);
  
  // Para duelos en espera, mostrar solo el primer equipo (el creador)
  const teamsToShow = isWaiting ? [opponents[0]] : opponents;

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
            <span className="font-bold text-lg text-white">{type}</span>
          </div>
          {/* Removed isCreator and onDelete props as they are not directly used in this component's new structure */}
        </div>

        {/* Renderizado de equipos */}
        {isTeamDuel ? (
          <div className="flex flex-row gap-4 w-full justify-between mt-2">
            {teamsToShow.map((team, idx) => (
              isTeamOpponent(team) ? (
                <div key={idx} className="flex flex-col items-center w-1/2">
                  <div className="flex flex-col items-center mb-1">
                    {team.avatar ? (
                      <img
                        src={team.avatar}
                        alt={team.teamName}
                        className="w-10 h-10 rounded-full border-2 border-neon-green bg-gray-800 mb-1"
                      />
                    ) : (
                      <FaUsers className="w-10 h-10 text-gray-500 mb-1" />
                    )}
                    <div className="text-neon-green font-bold text-sm">{team.teamName}</div>
                  </div>
                  <div className="flex flex-row flex-wrap gap-1 justify-center">
                    {team.members.length > 0 ? (
                      team.members.map((member, mIdx) => (
                        <div key={mIdx} className="flex flex-col items-center">
                          {member.avatar ? (
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-8 h-8 rounded-full border-2 border-neon-green bg-gray-800"
                            />
                          ) : (
                            <FaUserCircle className="w-8 h-8 text-gray-500" />
                          )}
                          <span className="text-xs text-white mt-0.5">{member.name}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">Sin integrantes</span>
                    )}
                  </div>
                </div>
              ) : null
            ))}
            {isWaiting && (
              <div className="flex flex-col items-center w-1/2">
                <div className="flex flex-col items-center mb-1">
                  <FaUsers className="w-10 h-10 text-gray-500 mb-1" />
                  <div className="text-gray-400 font-bold text-sm">Esperando equipo...</div>
                </div>
                <div className="flex flex-row flex-wrap gap-1 justify-center">
                  <span className="text-xs text-gray-400">Sin integrantes</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-2">
            {teamsToShow.map((op, idx) => (
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
        )}

        <div className="text-sm text-gray-300 mt-1">{objective}</div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-neon-green text-xl font-bold">{points}</span>
          <span className="text-neon-green">★</span>
        </div>
        <button
          className={`mt-3 bg-gradient-to-r from-neon-green to-blue-500 text-black font-extrabold text-lg py-2 rounded-lg w-full transition-all shadow-lg border-4 drop-shadow-lg tracking-wide
            ${isDisabled ? 'opacity-50 cursor-not-allowed border-gray-500 bg-gray-700 text-gray-300' : 'hover:scale-105 hover:from-blue-500 hover:to-neon-green hover:text-white border-blue-400'}
          `}
          style={{ textShadow: '0 2px 8px #fff', color: '#111' }}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </motion.div>

      {/* Modal de detalles del duelo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-neon-green">
            <h3 className="text-neon-green font-bold mb-4 text-center">Detalles del Duelo</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Tipo:</span>
                <span className="text-white ml-2">{type}</span>
              </div>
              <div>
                <span className="text-gray-400">Objetivo:</span>
                <span className="text-white ml-2">{objective}</span>
              </div>
              <div>
                <span className="text-gray-400">Puntos:</span>
                <span className="text-neon-green ml-2">{points}</span>
              </div>
              <div>
                <span className="text-gray-400">Estado:</span>
                <span className={`ml-2 ${isWaiting ? 'text-yellow-400' : 'text-green-400'}`}>
                  {isWaiting ? 'Esperando' : 'Activo'}
                </span>
              </div>
            </div>
            <button
              className="w-full mt-4 bg-neon-green text-black font-bold py-2 rounded hover:bg-blue-400 transition"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-xs border border-red-500">
            <h3 className="text-red-500 font-bold mb-4 text-center">¿Eliminar duelo?</h3>
            <p className="text-gray-300 text-center mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex gap-2">
              <button
                className="flex-1 bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                Eliminar
              </button>
              <button
                className="flex-1 bg-gray-700 text-white font-bold py-2 rounded hover:bg-gray-600 transition"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DuelCard; 