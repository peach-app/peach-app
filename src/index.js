import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';

import AuthContext, { Provider as AuthProvider } from './contexts/Auth';
import client from './apollo-client';
import theme from './theme';

import UnAuthedNavigator from './routers/UnAuthedRouter';
import AuthedNavigator from './routers/AuthedNavigator';

const App = () => {
  const { auth } = useContext(AuthContext);

  if (auth) {
    return <AuthedNavigator />;
  }

  return <UnAuthedNavigator />;
};

export default () => (
  <AuthProvider>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <>
          <StatusBar barStyle="dark-content" />
          <App />
        </>
      </ThemeProvider>
    </ApolloProvider>
  </AuthProvider>
);
