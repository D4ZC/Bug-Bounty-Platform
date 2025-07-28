// Datos simulados para la sección de Duelos
export const duels = [
  {
    id: 1,
    type: '1v1',
    typeIcon: 'swords',
    vulnerabilityLevel: 'crítica',
    opponents: [
      { avatar: '', name: 'Alice' },
      { avatar: '', name: 'Bob' },
    ],
    objective: 'Primero en 5 Vulnerabilidades Críticas',
    points: 50,
    isWaiting: false,
    status: 'active',
  },
  {
    id: 2,
    type: 'Equipo',
    typeIcon: 'shield',
    vulnerabilityLevel: 'media',
    opponents: [
      {
        teamName: 'Team Alpha',
        members: [
          { avatar: '', name: 'Nicole' },
          { avatar: '', name: 'Alice' },
          { avatar: '', name: 'Bob' },
          { avatar: '', name: 'Charlie' },
          { avatar: '', name: 'Diana' },
        ],
      },
      {
        teamName: 'Team Beta',
        members: [],
      },
    ],
    objective: 'Mayor puntuación en vulnerabilidades medias',
    points: 30,
    isWaiting: true,
    status: 'waiting',
  },
  {
    id: 3,
    type: '1v1',
    typeIcon: 'swords',
    vulnerabilityLevel: 'baja',
    opponents: [
      { avatar: '', name: 'Nicole' },
      { avatar: '', name: 'Alejandra' },
    ],
    objective: 'Mejor puntuación en vulnerabilidades bajas',
    points: 15,
    isWaiting: false,
    status: 'finished',
  },
  {
    id: 4,
    type: '1v1',
    typeIcon: 'swords',
    vulnerabilityLevel: 'crítica',
    opponents: [
      { avatar: '', name: 'Carlos' },
      { avatar: '', name: 'María' },
    ],
    objective: 'Duelo de vulnerabilidades críticas',
    points: 60,
    isWaiting: false,
    status: 'active',
  },
  {
    id: 5,
    type: 'Equipo',
    typeIcon: 'shield',
    vulnerabilityLevel: 'media',
    opponents: [
      {
        teamName: 'Team Gamma',
        members: [
          { avatar: '', name: 'Elena' },
          { avatar: '', name: 'Fernando' },
          { avatar: '', name: 'Gabriela' },
        ],
      },
      {
        teamName: 'Team Delta',
        members: [],
      },
    ],
    objective: 'Competencia de vulnerabilidades medias',
    points: 35,
    isWaiting: true,
    status: 'waiting',
  },
  {
    id: 6,
    type: '1v1',
    typeIcon: 'swords',
    vulnerabilityLevel: 'baja',
    opponents: [
      { avatar: '', name: 'Roberto' },
      { avatar: '', name: 'Patricia' },
    ],
    objective: 'Duelo de vulnerabilidades bajas',
    points: 20,
    isWaiting: false,
    status: 'active',
  },
];

export const duelFilters = ['Todos', 'Individual', 'Equipo', 'Tiempo', 'Puntos', 'Críticas', 'Medias', 'Bajas'];

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