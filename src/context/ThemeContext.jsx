// src/context/ThemeContext.jsx
import { createContext, useContext } from 'react';

// Define your theme colors and styles here
const theme = {
  colors: {
    primary: '#3b82f6', // blue-500
    secondary: '#10b981', // green-500
    accent: '#8b5cf6', // purple-500
    background: '#f9fafb', // gray-50
    card: {
      background: '#ffffff',
      shadow: 'shadow-md',
      borderRadius: 'rounded-lg',
    },
    text: {
      primary: '#1f2937', // gray-800
      secondary: '#6b7280', // gray-500
    }
  },
  spacing: {
    cardPadding: 'p-6',
    sectionGap: 'gap-8',
    containerPadding: 'px-4 py-6'
  }
};

export const ThemeContext = createContext(theme)
const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};