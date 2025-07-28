import React, { useState } from 'react';
import DuelCard from '../components/duels/DuelCard';
import DuelFilters from '../components/duels/DuelFilters';
import DuelCreateForm from '../components/duels/DuelCreateForm';
import ChampionsTable from '../components/duels/ChampionsTable';
import { duels, duelFilters, champions } from '../mocks/duels';
import { FaCoins } from 'react-icons/fa';
import { GiCrossedSwords, GiShield } from 'react-icons/gi';
import * as DiceBear from '@dicebear/avatars';
import * as Identicon from '@dicebear/avatars-identicon-sprites';

// Simulación de usuario
const user = {
  name: 'Nicole',
  avatar: `data:image/svg+xml;utf8,${encodeURIComponent(new DiceBear.default(Identicon.default).create('Nicole'))}`,
  points: 120,
};

// Iconos para tipos de duelo
const duelTypeIcons: Record<string, React.ReactNode> = {
  swords: <GiCrossedSwords className="text-2xl" />,
  shield: <GiShield className="text-2xl" />,
};

const Duels: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [duelList, setDuelList] = useState(duels);
  const [userActiveDuel, setUserActiveDuel] = useState<number | null>(null);

  // Filtro simulado
  const filteredDuels = selectedFilter === 'Todos'
    ? duelList
    : duelList.filter(d => {
        if (selectedFilter === 'Individual') return d.type.toLowerCase() === '1v1';
        if (selectedFilter === 'Equipo') return d.type.toLowerCase() === 'equipo';
        if (selectedFilter === 'Tiempo') return d.objective.toLowerCase().includes('tiempo');
        if (selectedFilter === 'Puntos') return d.objective.toLowerCase().includes('puntuación') || d.objective.toLowerCase().includes('puntos');
        if (selectedFilter === 'Críticas') return d.vulnerabilityLevel === 'crítica';
        if (selectedFilter === 'Medias') return d.vulnerabilityLevel === 'media';
        if (selectedFilter === 'Bajas') return d.vulnerabilityLevel === 'baja';
        return true;
      });

  const handleCreateDuel = (data: any) => {
    // Determinar el status correcto
    let status: 'active' | 'waiting' | 'finished' = 'active';
    if (data.openDuel) status = 'waiting';
    
    // Usar el nivel de vulnerabilidad seleccionado o determinar basado en el objetivo
    let vulnerabilityLevel: 'crítica' | 'media' | 'baja' = data.vulnerabilityLevel || 'media';
    if (!data.vulnerabilityLevel) {
      // Fallback: determinar basado en el objetivo
      if (data.objective.toLowerCase().includes('crítica') || data.objective.toLowerCase().includes('critica')) {
        vulnerabilityLevel = 'crítica';
      } else if (data.objective.toLowerCase().includes('baja')) {
        vulnerabilityLevel = 'baja';
      }
    }
    
    // Simulación de creación de duelo
    setDuelList([
      ...duelList,
      {
        id: duelList.length + 1,
        type: data.type === 'INDIVIDUAL' ? '1v1' : 'Equipo',
        typeIcon: data.type === 'INDIVIDUAL' ? 'swords' : 'shield',
        vulnerabilityLevel,
        opponents: [
          { avatar: user.avatar, name: user.name },
          { avatar: '', name: data.opponent || '' },
        ],
        objective: data.objective,
        points: data.points,
        isWaiting: data.openDuel,
        status,
      },
    ]);
    // Cambiar filtro automáticamente si el usuario está en otro filtro
    if (data.type === 'INDIVIDUAL' && selectedFilter !== 'Individual' && selectedFilter !== 'Todos') setSelectedFilter('Individual');
    if (data.type === 'EQUIPO' && selectedFilter !== 'Equipo' && selectedFilter !== 'Todos') setSelectedFilter('Equipo');
    if (data.objective.toLowerCase().includes('tiempo') && selectedFilter !== 'Tiempo' && selectedFilter !== 'Todos') setSelectedFilter('Tiempo');
    if ((data.objective.toLowerCase().includes('puntuación') || data.objective.toLowerCase().includes('puntos')) && selectedFilter !== 'Puntos' && selectedFilter !== 'Todos') setSelectedFilter('Puntos');
    if (vulnerabilityLevel === 'crítica' && selectedFilter !== 'Críticas' && selectedFilter !== 'Todos') setSelectedFilter('Críticas');
    if (vulnerabilityLevel === 'media' && selectedFilter !== 'Medias' && selectedFilter !== 'Todos') setSelectedFilter('Medias');
    if (vulnerabilityLevel === 'baja' && selectedFilter !== 'Bajas' && selectedFilter !== 'Todos') setSelectedFilter('Bajas');
  };

  const handleDeleteDuel = (id: number) => {
    setDuelList(duelList.filter(d => d.id !== id));
  };

  const handleAcceptDuel = (duelId: number) => {
    // Verificar si el usuario ya tiene un duelo activo
    if (userActiveDuel !== null) {
      alert('Ya tienes un duelo activo. Debes completarlo antes de aceptar otro.');
      return;
    }

    // Verificar si el duelo está disponible
    const duel = duelList.find(d => d.id === duelId);
    if (!duel) {
      alert('Duelo no encontrado.');
      return;
    }

    if (duel.status !== 'waiting') {
      alert('Este duelo no está disponible para aceptar.');
      return;
    }

    // Verificar si el usuario tiene suficientes puntos
    if (user.points < duel.points) {
      alert(`No tienes suficientes puntos. Necesitas ${duel.points} puntos para aceptar este duelo.`);
      return;
    }

    // Aceptar el duelo
    setUserActiveDuel(duelId);
    
    // Actualizar el duelo en la lista
    setDuelList(duelList.map(d => 
      d.id === duelId 
        ? { ...d, status: 'active' as const, isWaiting: false }
        : d
    ));

    alert(`¡Duelo aceptado! Has entrado al duelo "${duel.objective}"`);
  };

  const handleLeaveDuel = (duelId: number) => {
    if (userActiveDuel !== duelId) {
      alert('Solo puedes abandonar tu duelo activo.');
      return;
    }

    const confirmed = window.confirm('¿Estás seguro de que quieres abandonar este duelo? Perderás los puntos apostados.');
    if (!confirmed) return;

    // Abandonar el duelo
    setUserActiveDuel(null);
    
    // Actualizar el duelo en la lista
    setDuelList(duelList.map(d => 
      d.id === duelId 
        ? { ...d, status: 'finished' as const, isWaiting: false }
        : d
    ));

    alert('Has abandonado el duelo.');
  };

  const handleCompleteDuel = (duelId: number) => {
    if (userActiveDuel !== duelId) {
      alert('Solo puedes completar tu duelo activo.');
      return;
    }

    const confirmed = window.confirm('¿Quieres marcar este duelo como completado?');
    if (!confirmed) return;

    // Completar el duelo
    setUserActiveDuel(null);
    
    // Actualizar el duelo en la lista
    setDuelList(duelList.map(d => 
      d.id === duelId 
        ? { ...d, status: 'finished' as const, isWaiting: false }
        : d
    ));

    alert('¡Duelo completado! Has ganado experiencia.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-neon-green/10 p-6 flex flex-col gap-6">
      {/* Cabecera Superior */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-extrabold text-neon-green drop-shadow-neon">DUELOS</h1>
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full border-4 border-neon-green shadow-neon" />
          <div className="flex flex-col">
            <span className="text-white font-bold">{user.name}</span>
            <span className="flex items-center gap-1 text-neon-green font-mono animate-pulse">
              <FaCoins /> {user.points} Puntos
            </span>
            {userActiveDuel && (
              <span className="flex items-center gap-1 text-red-400 text-sm font-semibold">
                ⚔️ Duelo Activo
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Panel Izquierdo: Duelos Activos */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-neon-green mb-2">DUELOS ACTIVOS</h2>
          <DuelFilters filters={duelFilters} selected={selectedFilter} onSelect={setSelectedFilter} />
          <div>
            {filteredDuels.map((duel) => (
              <DuelCard
                key={duel.id}
                id={duel.id}
                type={duel.type}
                typeIcon={duel.typeIcon}
                opponents={duel.opponents.map(op => {
                  if ('teamName' in op) {
                    // Es un equipo
                    return {
                      teamName: op.teamName,
                      members: op.members.map(member => ({
                        ...member,
                        avatar: member.avatar || `data:image/svg+xml;utf8,${encodeURIComponent(new DiceBear.default(Identicon.default).create(member.name || 'anon'))}`,
                      }))
                    };
                  } else {
                    // Es un individuo
                    return {
                      ...op,
                      avatar: op.avatar || `data:image/svg+xml;utf8,${encodeURIComponent(new DiceBear.default(Identicon.default).create(op.name || 'anon'))}`,
                    };
                  }
                })}
                objective={duel.objective}
                points={duel.points}
                isWaiting={duel.isWaiting}
                status={duel.status as 'active' | 'waiting' | 'finished'}
                vulnerabilityLevel={duel.vulnerabilityLevel as 'crítica' | 'media' | 'baja'}
                onAcceptDuel={() => handleAcceptDuel(duel.id)}
                onLeaveDuel={() => handleLeaveDuel(duel.id)}
                onCompleteDuel={() => handleCompleteDuel(duel.id)}
                canAccept={userActiveDuel === null && duel.status === 'waiting' && user.points >= duel.points}
                isUserActiveDuel={userActiveDuel === duel.id}
              />
            ))}
          </div>
        </div>
        {/* Panel Derecho: Forja tu Desafío */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold text-neon-green mb-2">FORJA UN NUEVO DESAFÍO</h2>
          <DuelCreateForm onCreate={handleCreateDuel} />
        </div>
        {/* Panel Inferior: Reglas de Duelos */}
        <div className="md:col-span-1 flex flex-col">
          <h2 className="text-xl font-bold text-neon-green mb-2">REGLAS DE LOS DUELOS</h2>
          <div className="bg-gray-900 rounded-xl p-4 text-white text-sm leading-relaxed border border-neon-green/40 shadow">
            <b>DUELOS:</b><br/>
            Enfrentamientos de usuarios y equipos: Los duelos consisten en un enfrentamiento amistoso entre usuarios o equipos, al entrar un duelo sería necesario pagar con puntos de la misma web, el costo depende de la sección aceptada, donde se dará un tiempo límite para resolver la mayor cantidad de vulnerabilidades de la categoría aceptada, el usuario o equipo que resuelva más vulnerabilidades ganaría el enfrentamiento. Los enfrentamientos son opcionales y deben de ser aceptados por ambas partes (si un integrante no está en el evento grupal aún se le considerará al momento de perder o ganar). En caso de los equipos, el representante debe de aceptar el enfrentamiento en nombre de todo el equipo.<br/><br/>
            <b>¿QUÉ PODRÍAS GANAR?</b><br/>
            Los ganadores de los enfrentamientos obtendrán los puntos del perdedor a proporción de la categoría entrada y se les devolverá el costo de entrada. En caso del modo por equipo se dará una porción equitativa a todos los miembros del equipo ganador y se ganará puntos para el equipo.<br/><br/>
            <b>¿QUÉ PUEDES PERDER?</b><br/>
            Los puntos perdidos serán a proporción de la categoría aceptada.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Duels; 