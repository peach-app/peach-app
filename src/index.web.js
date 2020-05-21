import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppearanceProvider } from 'react-native-appearance';
import { ApolloProvider } from '@apollo/react-hooks';
import Modal from 'react-modal';

import { VerifyEmail } from './screens/VerifyEmail';
import { PasswordReset } from './screens/PasswordReset';
import client from './apollo-client';
import { App } from './App';

import ThemeProvider from './theme-provider';

Modal.setAppElement(document.body);

const ProvidersHOC = ({ children }) => (
  <ApolloProvider client={client}>
    <AppearanceProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppearanceProvider>
  </ApolloProvider>
);

export default () => (
  <Router>
    <Switch>
      <Route path="/verify-email/:token">
        <ProvidersHOC>
          <VerifyEmail />
        </ProvidersHOC>
      </Route>
      <Route path="/reset-password/:userId">
        <ProvidersHOC>
          <PasswordReset />
        </ProvidersHOC>
      </Route>
      <Route path="/">
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Route>
    </Switch>
  </Router>
);
