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

  // Filtro simulado
  const filteredDuels = selectedFilter === 'Todos'
    ? duelList
    : duelList.filter(d => {
        if (selectedFilter === 'Individual') return d.type.toLowerCase() === '1v1';
        if (selectedFilter === 'Equipo') return d.type.toLowerCase() === 'equipo';
        if (selectedFilter === 'Tiempo') return d.objective.toLowerCase().includes('tiempo');
        if (selectedFilter === 'Puntos') return d.objective.toLowerCase().includes('puntuación') || d.objective.toLowerCase().includes('puntos');
        return true;
      });

  const handleCreateDuel = (data: any) => {
    // Determinar el status correcto
    let status: 'active' | 'waiting' | 'finished' = 'active';
    if (data.openDuel) status = 'waiting';
    // Simulación de creación de duelo
    setDuelList([
      ...duelList,
      {
        id: duelList.length + 1,
        type: data.type === 'INDIVIDUAL' ? '1v1' : 'Equipo',
        typeIcon: data.type === 'INDIVIDUAL' ? 'swords' : 'shield',
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
  };

  const handleDeleteDuel = (id: number) => {
    setDuelList(duelList.filter(d => d.id !== id));
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
                typeIcon={duelTypeIcons[duel.typeIcon]}
                duelType={duel.type}
                opponents={duel.opponents.map(op => ({
                  ...op,
                  avatar: op.avatar || `data:image/svg+xml;utf8,${encodeURIComponent(new DiceBear.default(Identicon.default).create(op.name || 'anon'))}`,
                }))}
                objective={duel.objective}
                points={duel.points}
                isWaiting={duel.isWaiting}
                onEnterArena={() => alert('Entrar a la arena (simulado)')}
                details={duel.isWaiting ? `Vulnerabilidades a resolver: 3\nPuntos apostados: ${duel.points}\nOponentes: ${duel.opponents.map(o => o.name || 'Por definir').join(', ')}` : undefined}
                isCreator={duel.opponents[0]?.name === user.name}
                onDelete={() => handleDeleteDuel(duel.id)}
                status={duel.status as 'active' | 'waiting' | 'finished'}
              />
            ))}
          </div>
        </div>
        {/* Panel Derecho: Forja tu Desafío */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold text-neon-green mb-2">FORJA UN NUEVO DESAFÍO</h2>
          <DuelCreateForm onCreate={handleCreateDuel} />
        </div>
        {/* Panel Inferior: Clasificación de Campeones */}
        <div className="md:col-span-1 flex flex-col">
          <h2 className="text-xl font-bold text-neon-green mb-2">CAMPEONES DE LA ARENA</h2>
          <ChampionsTable champions={champions.map(champ => ({
            ...champ,
            avatar: champ.avatar || `data:image/svg+xml;utf8,${encodeURIComponent(new DiceBear.default(Identicon.default).create(champ.name))}`,
          }))} />
        </div>
      </div>
    </div>
  );
};

export default Duels; 