import React, { useContext } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import styled from 'styled-components';
import { AppearanceProvider } from 'react-native-appearance';

import AuthContext, { Provider as AuthProvider } from './contexts/Auth';
import { ThemeProvider } from './contexts/Theme';
import client from './apollo-client';

import UnAuthedNavigator from './routers/UnAuthedRouter';
import AuthedNavigator from './routers/AuthedNavigator';

const App = () => {
  const { auth } = useContext(AuthContext);

  if (auth) {
    return <AuthedNavigator />;
  }

  return <UnAuthedNavigator />;
};

const Main = styled.View`
  flex: 1;
  background: ${props => props.theme.background};
`;

export default () => (
  <AuthProvider>
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <ThemeProvider>
          <Main>
            <App />
          </Main>
        </ThemeProvider>
      </AppearanceProvider>
    </ApolloProvider>
  </AuthProvider>
);
