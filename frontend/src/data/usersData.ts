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

// Datos de usuarios para Score y Gulag
export const users: User[] = [
  { id: 1, name: 'D4ZC', score: 2500, team: 'P-TECH', avatar: 'D4' },
  { id: 2, name: 'Hacker Elite', score: 2200, team: 'Alpha Team', avatar: 'HE' },
  { id: 3, name: 'Security Pro', score: 2100, team: 'Beta Squad', avatar: 'SP' },
  { id: 4, name: 'Code Breaker', score: 2000, team: 'Gamma Force', avatar: 'CB' },
  { id: 5, name: 'Bug Hunter', score: 1900, team: 'Delta Unit', avatar: 'BH' },
  { id: 6, name: 'Cyber Ninja', score: 1800, team: 'Epsilon Group', avatar: 'CN' },
  { id: 7, name: 'White Hat', score: 1700, team: 'Zeta Team', avatar: 'WH' },
  { id: 8, name: 'Pen Tester', score: 1600, team: 'Eta Squad', avatar: 'PT' },
  { id: 9, name: 'Vuln Finder', score: 1500, team: 'Theta Force', avatar: 'VF' },
  { id: 10, name: 'Security Master', score: 1400, team: 'Iota Unit', avatar: 'SM' },
  { id: 11, name: 'Hack Master', score: 1300, team: 'Kappa Group', avatar: 'HM' },
  { id: 12, name: 'Code Master', score: 1200, team: 'Lambda Team', avatar: 'CM' },
  { id: 13, name: 'Bug Master', score: 1100, team: 'Mu Squad', avatar: 'BM' },
  { id: 14, name: 'Security Pro', score: 1000, team: 'Nu Force', avatar: 'SP' },
  { id: 15, name: 'Hack Pro', score: 900, team: 'Xi Unit', avatar: 'HP' },
  { id: 16, name: 'Code Pro', score: 800, team: 'Omicron Group', avatar: 'CP' },
  { id: 17, name: 'Bug Pro', score: 700, team: 'Pi Team', avatar: 'BP' },
  { id: 18, name: 'Security Elite', score: 600, team: 'Rho Squad', avatar: 'SE' },
  { id: 19, name: 'Hack Elite', score: 500, team: 'Sigma Force', avatar: 'HE' },
  { id: 20, name: 'Code Elite', score: 400, team: 'Tau Unit', avatar: 'CE' },
  { id: 21, name: 'Bug Elite', score: 300, team: 'Upsilon Group', avatar: 'BE' },
  { id: 22, name: 'Security Master', score: 250, team: 'Phi Team', avatar: 'SM' },
  { id: 23, name: 'Hack Master', score: 200, team: 'Chi Squad', avatar: 'HM' },
  { id: 24, name: 'Code Master', score: 150, team: 'Psi Force', avatar: 'CM' },
  { id: 25, name: 'Bug Master', score: 100, team: 'Omega Unit', avatar: 'BM' },
  { id: 26, name: 'Security Pro', score: 90, team: 'Alpha Group', avatar: 'SP' },
  { id: 27, name: 'Hack Pro', score: 80, team: 'Beta Team', avatar: 'HP' },
  { id: 28, name: 'Code Pro', score: 70, team: 'Gamma Squad', avatar: 'CP' },
  { id: 29, name: 'Bug Pro', score: 60, team: 'Delta Force', avatar: 'BP' },
  { id: 30, name: 'Security Elite', score: 50, team: 'Epsilon Unit', avatar: 'SE' },
  { id: 31, name: 'Hack Elite', score: 45, team: 'Zeta Group', avatar: 'HE' },
  { id: 32, name: 'Code Elite', score: 40, team: 'Eta Team', avatar: 'CE' },
  { id: 33, name: 'Bug Elite', score: 35, team: 'Theta Squad', avatar: 'BE' },
  { id: 34, name: 'Security Master', score: 30, team: 'Iota Force', avatar: 'SM' },
  { id: 35, name: 'Hack Master', score: 25, team: 'Kappa Unit', avatar: 'HM' },
  { id: 36, name: 'Code Master', score: 20, team: 'Lambda Group', avatar: 'CM' },
  { id: 37, name: 'Bug Master', score: 15, team: 'Mu Team', avatar: 'BM' },
  { id: 38, name: 'Security Pro', score: 10, team: 'Nu Squad', avatar: 'SP' },
  { id: 39, name: 'Hack Pro', score: 8, team: 'Xi Force', avatar: 'HP' },
  { id: 40, name: 'Code Pro', score: 6, team: 'Omicron Unit', avatar: 'CP' },
  { id: 41, name: 'Bug Pro', score: 4, team: 'Pi Group', avatar: 'BP' },
  { id: 42, name: 'Security Elite', score: 3, team: 'Rho Team', avatar: 'SE' },
  { id: 43, name: 'Hack Elite', score: 2, team: 'Sigma Squad', avatar: 'HE' },
  { id: 44, name: 'Code Elite', score: 1, team: 'Tau Force', avatar: 'CE' },
  { id: 45, name: 'Bug Elite', score: 0, team: 'Upsilon Unit', avatar: 'BE' },
  { id: 46, name: 'deivid', score: 50, team: 'Gulag Team', avatar: 'DV' },
  { id: 47, name: 'runrun', score: 25, team: 'Gulag Team', avatar: 'RR' },
  { id: 48, name: 'excel', score: 20, team: 'Gulag Team', avatar: 'EX' },
  { id: 49, name: 'kick ass', score: 20, team: 'Gulag Team', avatar: 'KA' },
  { id: 50, name: 'pedrito sola', score: 10, team: 'Gulag Team', avatar: 'PS' },
].sort((a, b) => b.score - a.score);

// Datos de equipos
export const teams: Team[] = [
  { id: 1, name: 'P-TECH', score: 8500, members: 5 },
  { id: 2, name: 'Alpha Team', score: 7800, members: 4 },
  { id: 3, name: 'Beta Squad', score: 7200, members: 6 },
  { id: 4, name: 'Gamma Force', score: 6800, members: 5 },
  { id: 5, name: 'Delta Unit', score: 6200, members: 4 },
  { id: 6, name: 'Epsilon Group', score: 5800, members: 5 },
  { id: 7, name: 'Zeta Team', score: 5400, members: 4 },
  { id: 8, name: 'Eta Squad', score: 5000, members: 6 },
  { id: 9, name: 'Theta Force', score: 4600, members: 5 },
  { id: 10, name: 'Iota Unit', score: 4200, members: 4 },
].sort((a, b) => b.score - a.score);

// Función para obtener usuarios del Gulag (últimos 5)
export const getGulagUsers = (): User[] => {
  return users.slice(-5).reverse();
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