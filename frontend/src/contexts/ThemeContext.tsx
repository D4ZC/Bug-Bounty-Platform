import React, { createContext, useContext, useEffect, useState } from 'react';

const themes = ['Claro', 'Oscuro'] as const;
export type Theme = typeof themes[number];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'Claro',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return (stored as Theme) || 'Claro';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.remove('theme-claro', 'theme-oscuro');
    document.body.classList.add(`theme-${theme.toLowerCase()}`);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 