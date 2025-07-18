import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';

export interface ProfileStats {
  reports: number;
  vulnerabilities: number;
  points: number;
  duelsWon: number;
  effectiveness: number;
  topIndividual: number;
  topTeam: number;
}

export interface VulnerabilityHistoryItem {
  id: number;
  title: string;
  date: string;
  points: number;
}

export interface ProfileData {
  name: string;
  role: string;
  team: string;
  avatar: string;
  background: string;
  banner: string;
  badges: string[];
  stats: ProfileStats;
  vulnerabilitiesHistory: VulnerabilityHistoryItem[];
  selectedFrame: string;
  customFrame: string | null;
  blockBg: string;
  frameColor?: string;
}

interface ProfileContextType {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  updateProfileFields: (fields: Partial<ProfileData>) => Promise<void>;
  loading: boolean;
  simulateProfileData: () => void;
}

const defaultProfile: ProfileData = {
  name: '',
  role: '',
  team: '',
  avatar: '',
  background: '',
  banner: '',
  badges: [],
  stats: {
    reports: 0,
    vulnerabilities: 0,
    points: 0,
    duelsWon: 0,
    effectiveness: 0,
    topIndividual: 0,
    topTeam: 0,
  },
  vulnerabilitiesHistory: [],
  selectedFrame: '',
  customFrame: null,
  blockBg: '',
  frameColor: '#3b82f6',
};

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  setProfile: () => {},
  updateProfileFields: async () => {},
  loading: true,
  simulateProfileData: () => {},
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then(res => {
      setProfile({ ...defaultProfile, ...res.data });
      setLoading(false);
    });
  }, []);

  const updateProfileFields = async (fields: any) => {
    setProfile(prev => ({ ...prev, ...fields }));
    await updateProfile(fields);
  };

  // Simula datos aleatorios para la gráfica y el perfil
  const simulateProfileData = () => {
    const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const roles = ['Hunter', 'Defender', 'Admin', 'Spectator', 'Analyst'];
    const teams = ['CyberWolves', 'RedFoxes', 'BlueTigers', 'ShadowCats', 'NightOwls', 'P-TECH', 'BugHunters', 'NullSec', 'WhiteHats', 'DarkNet'];
    setProfile(prev => ({
      ...prev,
      // name: prev.name, // No modificar el nombre
      role: roles[random(0, roles.length - 1)],
      team: teams[random(0, teams.length - 1)],
      stats: {
        reports: random(0, 100),
        vulnerabilities: random(0, 100),
        points: random(0, 1200),
        duelsWon: random(0, 50),
        effectiveness: random(0, 100),
        topIndividual: random(1, 10),
        topTeam: random(1, 10),
      },
      vulnerabilitiesHistory: Array.from({ length: random(2, 5) }, (_, i) => ({
        id: i + 1,
        title: `Vuln simulada #${i + 1}`,
        date: `2024-06-${random(1, 30).toString().padStart(2, '0')}`,
        points: random(10, 200),
      })),
    }));
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfileFields, loading, simulateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext); 