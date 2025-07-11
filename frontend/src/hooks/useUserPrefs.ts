import { useState, useEffect } from 'react';

export type UserPrefs = {
  animations?: boolean;
  sounds?: boolean;
  notifications?: boolean;
};

const LS_KEY = 'userPrefs';

function getUserPrefs(): UserPrefs {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  } catch {
    return {};
  }
}

function setUserPrefs(prefs: UserPrefs) {
  localStorage.setItem(LS_KEY, JSON.stringify(prefs));
}

export function useUserPrefs() {
  const [prefs, setPrefs] = useState<UserPrefs>(() => getUserPrefs());

  useEffect(() => {
    setUserPrefs(prefs);
  }, [prefs]);

  return [prefs, setPrefs] as const;
} 