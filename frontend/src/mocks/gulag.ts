// Mock de usuarios en el Gulag
export const gulagUsers = [
  {
    id: 1,
    name: 'Nicole',
    avatar: '',
    vulnerabilities: 7,
    defeats: 1,
    isCurrentUser: true,
    team: 'Team Alpha',
  },
  {
    id: 2,
    name: 'Alice',
    avatar: '',
    vulnerabilities: 9,
    defeats: 0,
    isCurrentUser: false,
    team: 'Team Alpha',
  },
  {
    id: 3,
    name: 'Bob',
    avatar: '',
    vulnerabilities: 5,
    defeats: 2,
    isCurrentUser: false,
    team: 'Team Beta',
  },
  {
    id: 4,
    name: 'Charlie',
    avatar: '',
    vulnerabilities: 4,
    defeats: 0,
    isCurrentUser: false,
    team: 'Team Beta',
  },
  {
    id: 5,
    name: 'Team Alpha',
    avatar: '',
    vulnerabilities: 3,
    defeats: 1,
    isCurrentUser: false,
    team: 'Team Alpha',
  },
];

// Ranking de equipos en el Gulag (mock)
export const gulagTeams = [
  {
    id: 1,
    name: 'Team Alpha',
    avatar: '',
    vulnerabilities: 16, // suma de usuarios del equipo
    defeats: 2,
  },
  {
    id: 2,
    name: 'Team Beta',
    avatar: '',
    vulnerabilities: 9,
    defeats: 2,
  },
];

export const gulagTimer = {
  days: 14,
  hours: 23,
  minutes: 59,
}; 