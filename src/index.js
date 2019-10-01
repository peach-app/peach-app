import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ThemeProvider } from 'styled-components';

import client from './apollo-client';
import theme from './theme';

import Landing from './screens/Landing';
import Login from './screens/Login';

const AppNavigator = createStackNavigator(
  {
    Landing,
    Login,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(AppNavigator);

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
);
