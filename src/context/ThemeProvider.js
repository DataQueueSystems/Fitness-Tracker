import React, {createContext, useState, useEffect, useMemo} from 'react';
import {Appearance} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from 'react-native-paper';

// Define red-based light theme
const lightTheme = {
  dark: false,
  roundness: 10,
  colors: {
    primary: '#D32F2F',
    accent: '#F44336',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#2D1E1E',
    error: '#C62828',
    success: '#43A047',
    warning: '#FB8C00',
    info: '#0288D1',
    appColor: '#D32F2F',
    appDark: '#FDECEA',
    btn: '#D32F2F',
    placeholder: '#A1887F',
    border: '#E0E0E0',
    
    // Onboarding banner backgrounds
    banner1: '#FFEAEA',  // Soft blush
    banner2: '#FFF5F5',  // Neutral pink
    banner3: '#FDECEA',  // Light peach
  },
};

// Define red-based dark theme
const darkTheme = {
  dark: true,
  roundness: 10,
  colors: {
    primary: '#FF6E6E',
    accent: '#EF5350',
    background: '#000000',
    surface: '#2C2C2C',
    text: '#FFFFFF',
    error: '#FF5252',
    success: '#66BB6A',
    warning: '#FFA726',
    info: '#29B6F6',
    appColor: '#FF6E6E',
    appDark: '#2E1A1A',
    btn: '#FF6E6E',
    placeholder: '#BDBDBD',
    border: '#444444',

    // Onboarding banner backgrounds
    banner1: '#000000',  // Pure black
    banner2: '#121212',  // Dark gray
    banner3: '#1A1A22',  // Deep navy/red-black
  },
};



const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    // Update theme when system theme changes
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const currentTheme = useMemo(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme: currentTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};
