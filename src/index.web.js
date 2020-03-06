import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppearanceProvider } from 'react-native-appearance';
import { ApolloProvider } from '@apollo/react-hooks';
import { VerifyEmail } from './screens/VerifyEmail';
import client from './apollo-client';
import { App } from './App';

import ThemeProvider from './theme-provider';

export default () => (
  <Router>
    <Switch>
      <Route path="/verify-email/:token">
        <ApolloProvider client={client}>
          <AppearanceProvider>
            <ThemeProvider>
              <VerifyEmail />
            </ThemeProvider>
          </AppearanceProvider>
        </ApolloProvider>
      </Route>
      <Route path="/">
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Route>
    </Switch>
  </Router>
);
