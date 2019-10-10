import React, { useState, useEffect } from 'react';
import { ThemeProvider as Provider } from 'styled-components/native';
import { Appearance, useColorScheme } from 'react-native-appearance';

import theme, { darkModeOverrides } from './theme';

const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider
      theme={{
        darkMode,
        ...theme,
        ...(darkMode && darkModeOverrides),
      }}
    >
      {children}
    </Provider>
  );
};

export default ThemeProvider;
