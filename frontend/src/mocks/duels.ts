// Datos simulados para la sección de Duelos
export const duels = [
  {
    id: 1,
    type: '1v1',
    typeIcon: 'swords',
    opponents: [
      { avatar: '', name: 'Alice' },
      { avatar: '', name: 'Bob' },
    ],
    objective: 'Primero en 5 Vulnerabilidades',
    points: 25,
    isWaiting: false,
    status: 'active',
  },
  {
    id: 2,
    type: 'Equipo',
    typeIcon: 'shield',
    opponents: [
      { avatar: '', name: 'Team Alpha' },
      { avatar: '', name: '' },
    ],
    objective: 'Mayor puntuación en 24h',
    points: 40,
    isWaiting: true,
    status: 'waiting',
  },
  {
    id: 3,
    type: '1v1',
    typeIcon: 'swords',
    opponents: [
      { avatar: '', name: 'Nicole' },
      { avatar: '', name: 'Alejandra' },
    ],
    objective: 'Mejor puntuación en Y tiempo',
    points: 50,
    isWaiting: false,
    status: 'finished',
  },
];

export const duelFilters = ['Todos', 'Individual', 'Equipo', 'Tiempo', 'Puntos'];

export const champions = [
  {
    position: 1,
    avatar: '',
    name: 'Alice',
    wins: 12,
    points: 320,
  },
  {
    position: 2,
    avatar: '',
    name: 'Bob',
    wins: 10,
    points: 290,
  },
  {
    position: 3,
    avatar: '',
    name: 'Charlie',
    wins: 8,
    points: 250,
  },
  {
    position: 4,
    avatar: '',
    name: 'Team Alpha',
    wins: 7,
    points: 200,
  },
  {
    position: 5,
    avatar: '',
    name: 'Team Beta',
    wins: 6,
    points: 180,
  },
]; 