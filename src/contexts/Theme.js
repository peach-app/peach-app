import React, { useState } from 'react';
import { ThemeProvider as Provider } from 'styled-components';
import { useColorScheme } from 'react-native-appearance';

import theme, { darkModeOverrides } from '../theme';

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Provider
        theme={{
          darkMode,
          ...theme,
          ...(darkMode && darkModeOverrides),
        }}
      >
        {children}
      </Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
