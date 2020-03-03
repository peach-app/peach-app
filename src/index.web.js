import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppearanceProvider } from 'react-native-appearance';
import { VerifyEmail } from './screens/VerifyEmail';
import { App } from './App';

import ThemeProvider from './theme-provider';

export default () => (
  <Router>
    <Switch>
      <Route path="/verify-email/:token">
        <AppearanceProvider>
          <ThemeProvider>
            <VerifyEmail />
          </ThemeProvider>
        </AppearanceProvider>
      </Route>
      <Route path="/">
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Route>
    </Switch>
  </Router>
);
