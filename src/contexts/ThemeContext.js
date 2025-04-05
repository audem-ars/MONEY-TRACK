// MONEY_TRACK - Theme Context Provider
// This context manages the application's theme

import React, { createContext, useContext, useState, useEffect } from 'react';

// Available themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Default theme
const DEFAULT_THEME = THEMES.LIGHT;

// Create context with default values
const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  appliedTheme: DEFAULT_THEME,
  toggleTheme: () => {},
  setTheme: () => {},
  isLightTheme: true,
  isDarkTheme: false,
  THEMES
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Get saved theme from localStorage or use default
  const [theme, setTheme] = useState(DEFAULT_THEME);
  
  // State for the actual applied theme (light or dark)
  const [appliedTheme, setAppliedTheme] = useState(DEFAULT_THEME);
  
  // Apply theme effect
  useEffect(() => {
    const applyTheme = (themeName) => {
      // Remove existing theme classes
      document.documentElement.classList.remove(THEMES.LIGHT, THEMES.DARK);
      
      // Add new theme class
      document.documentElement.classList.add(themeName);
      setAppliedTheme(themeName);
    };
    
    try {
      // Try to load saved theme preference
      const savedTheme = localStorage.getItem('money_track_theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
      
      // Save theme preference to localStorage
      localStorage.setItem('money_track_theme', theme);
    } catch (err) {
      console.error('Error with theme localStorage:', err);
    }
    
    // Apply the correct theme
    if (theme === THEMES.SYSTEM) {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? THEMES.DARK : THEMES.LIGHT);
      
      // Add listener for system preference changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Apply the selected theme directly
      applyTheme(theme);
    }
  }, [theme]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    if (theme === THEMES.LIGHT) {
      setTheme(THEMES.DARK);
    } else if (theme === THEMES.DARK) {
      setTheme(THEMES.SYSTEM);
    } else {
      setTheme(THEMES.LIGHT);
    }
  };
  
  // Set a specific theme
  const setSpecificTheme = (themeName) => {
    if (Object.values(THEMES).includes(themeName)) {
      setTheme(themeName);
    }
  };
  
  // Create the context value object
  const value = {
    theme,
    appliedTheme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isLightTheme: appliedTheme === THEMES.LIGHT,
    isDarkTheme: appliedTheme === THEMES.DARK,
    THEMES
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};