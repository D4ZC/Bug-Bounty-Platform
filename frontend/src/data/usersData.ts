export interface User {
  id: number;
  name: string;
  score: number;
  team?: string;
  avatar?: string;
  rank?: number;
}

export interface Team {
  id: number;
  name: string;
  score: number;
  members: number;
  rank?: number;
}

// Equipos
export const teams: Team[] = [
  { id: 1, name: 'RedFox', score: 0, members: 0 },
  { id: 2, name: 'BlueWolf', score: 0, members: 0 },
  { id: 3, name: 'GreenBear', score: 0, members: 0 },
  { id: 4, name: 'YellowEagle', score: 0, members: 0 },
  { id: 5, name: 'BlackShark', score: 0, members: 0 },
];

// Usuarios (50, distribuidos en los 5 equipos)
export const users: User[] = [
  // RedFox (12)
  { id: 1, name: 'Alice', score: 2500, team: 'RedFox', avatar: 'A' },
  { id: 2, name: 'Bob', score: 2200, team: 'RedFox', avatar: 'B' },
  { id: 3, name: 'Charlie', score: 2100, team: 'RedFox', avatar: 'C' },
  { id: 4, name: 'Diana', score: 2000, team: 'RedFox', avatar: 'D' },
  { id: 5, name: 'Eve', score: 1900, team: 'RedFox', avatar: 'E' },
  { id: 6, name: 'Frank', score: 1800, team: 'RedFox', avatar: 'F' },
  { id: 7, name: 'Grace', score: 1700, team: 'RedFox', avatar: 'G' },
  { id: 8, name: 'Heidi', score: 1600, team: 'RedFox', avatar: 'H' },
  { id: 9, name: 'Ivan', score: 1500, team: 'RedFox', avatar: 'I' },
  { id: 10, name: 'Judy', score: 1400, team: 'RedFox', avatar: 'J' },
  { id: 11, name: 'Karl', score: 1300, team: 'RedFox', avatar: 'K' },
  { id: 12, name: 'Liam', score: 1200, team: 'RedFox', avatar: 'L' },
  // BlueWolf (10)
  { id: 13, name: 'Mona', score: 2400, team: 'BlueWolf', avatar: 'M' },
  { id: 14, name: 'Nina', score: 2300, team: 'BlueWolf', avatar: 'N' },
  { id: 15, name: 'Oscar', score: 1250, team: 'BlueWolf', avatar: 'O' },
  { id: 16, name: 'Paul', score: 1100, team: 'BlueWolf', avatar: 'P' },
  { id: 17, name: 'Quinn', score: 1050, team: 'BlueWolf', avatar: 'Q' },
  { id: 18, name: 'Rita', score: 1000, team: 'BlueWolf', avatar: 'R' },
  { id: 19, name: 'Sam', score: 950, team: 'BlueWolf', avatar: 'S' },
  { id: 20, name: 'Tom', score: 900, team: 'BlueWolf', avatar: 'T' },
  { id: 21, name: 'Uma', score: 850, team: 'BlueWolf', avatar: 'U' },
  { id: 22, name: 'Vera', score: 800, team: 'BlueWolf', avatar: 'V' },
  // GreenBear (8)
  { id: 23, name: 'Will', score: 1750, team: 'GreenBear', avatar: 'W' },
  { id: 24, name: 'Xena', score: 1650, team: 'GreenBear', avatar: 'X' },
  { id: 25, name: 'Yara', score: 1550, team: 'GreenBear', avatar: 'Y' },
  { id: 26, name: 'Zane', score: 1450, team: 'GreenBear', avatar: 'Z' },
  { id: 27, name: 'Amy', score: 1350, team: 'GreenBear', avatar: 'AM' },
  { id: 28, name: 'Ben', score: 1250, team: 'GreenBear', avatar: 'BN' },
  { id: 29, name: 'Cleo', score: 1150, team: 'GreenBear', avatar: 'CL' },
  { id: 30, name: 'Duke', score: 1050, team: 'GreenBear', avatar: 'DK' },
  // YellowEagle (12)
  { id: 31, name: 'Elisa', score: 1950, team: 'YellowEagle', avatar: 'EL' },
  { id: 32, name: 'Felix', score: 1850, team: 'YellowEagle', avatar: 'FX' },
  { id: 33, name: 'Gina', score: 1750, team: 'YellowEagle', avatar: 'GN' },
  { id: 34, name: 'Hugo', score: 1650, team: 'YellowEagle', avatar: 'HG' },
  { id: 35, name: 'Iris', score: 1550, team: 'YellowEagle', avatar: 'IR' },
  { id: 36, name: 'Jon', score: 1450, team: 'YellowEagle', avatar: 'JN' },
  { id: 37, name: 'Kira', score: 1350, team: 'YellowEagle', avatar: 'KR' },
  { id: 38, name: 'Lars', score: 1250, team: 'YellowEagle', avatar: 'LR' },
  { id: 39, name: 'Mick', score: 1150, team: 'YellowEagle', avatar: 'MK' },
  { id: 40, name: 'Nora', score: 1050, team: 'YellowEagle', avatar: 'NR' },
  { id: 41, name: 'Omar', score: 950, team: 'YellowEagle', avatar: 'OM' },
  { id: 42, name: 'Pia', score: 850, team: 'YellowEagle', avatar: 'PI' },
  // BlackShark (8)
  { id: 43, name: 'Quentin', score: 1700, team: 'BlackShark', avatar: 'QT' },
  { id: 44, name: 'Rox', score: 1600, team: 'BlackShark', avatar: 'RX' },
  { id: 45, name: 'Sven', score: 1500, team: 'BlackShark', avatar: 'SV' },
  { id: 46, name: 'Tina', score: 1400, team: 'BlackShark', avatar: 'TN' },
  { id: 47, name: 'Ugo', score: 1300, team: 'BlackShark', avatar: 'UG' },
  { id: 48, name: 'Vicky', score: 1200, team: 'BlackShark', avatar: 'VK' },
  { id: 49, name: 'Wendy', score: 1100, team: 'BlackShark', avatar: 'WD' },
  { id: 50, name: 'Ximena', score: 1000, team: 'BlackShark', avatar: 'XM' },
].sort((a, b) => b.score - a.score);

// Actualizar score y miembros de equipos
teams.forEach(team => {
  const teamUsers = users.filter(u => u.team === team.name);
  team.members = teamUsers.length;
  team.score = teamUsers.reduce((acc, u) => acc + u.score, 0);
});

// Gulag: 5 usuarios con menor score
export const getGulagUsers = (): User[] => {
  return [...users].sort((a, b) => a.score - b.score).slice(0, 5);
};

// Función para obtener top usuarios
export const getTopUsers = (limit: number = 10): User[] => {
  return users.slice(0, limit);
};

// Función para obtener top equipos
export const getTopTeams = (limit: number = 10): Team[] => {
  return teams.slice(0, limit);
};

// Función para actualizar puntuación de usuario
export const updateUserScore = (userId: number, newScore: number): void => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex].score = newScore;
    // Reordenar la lista
    users.sort((a, b) => b.score - a.score);
  }
};

// Función para actualizar puntuación de equipo
export const updateTeamScore = (teamId: number, newScore: number): void => {
  const teamIndex = teams.findIndex(team => team.id === teamId);
  if (teamIndex !== -1) {
    teams[teamIndex].score = newScore;
    // Reordenar la lista
    teams.sort((a, b) => b.score - a.score);
  }
}; 