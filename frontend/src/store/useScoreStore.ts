import { create } from 'zustand';
import { User, Team, users, teams, updateUserScore, updateTeamScore } from '@/data/usersData';

interface ScoreState {
  users: User[];
  teams: Team[];
  gulagUsers: User[];
  topUsers: User[];
  topTeams: Team[];
  updateUserScore: (userId: number, newScore: number) => void;
  updateTeamScore: (teamId: number, newScore: number) => void;
  refreshData: () => void;
}

export const useScoreStore = create<ScoreState>((set, get) => ({
  users: [...users],
  teams: [...teams],
  gulagUsers: users.slice(-5).reverse(),
  topUsers: users.slice(0, 10),
  topTeams: teams.slice(0, 10),
  updateUserScore: (userId: number, newScore: number) => {
    updateUserScore(userId, newScore);
    set({
      users: [...users],
      gulagUsers: users.slice(-5).reverse(),
      topUsers: users.slice(0, 10),
    });
  },
  updateTeamScore: (teamId: number, newScore: number) => {
    updateTeamScore(teamId, newScore);
    set({
      teams: [...teams],
      topTeams: teams.slice(0, 10),
    });
  },
  refreshData: () => {
    set({
      users: [...users],
      teams: [...teams],
      gulagUsers: users.slice(-5).reverse(),
      topUsers: users.slice(0, 10),
      topTeams: teams.slice(0, 10),
    });
  },
})); 