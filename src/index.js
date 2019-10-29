import React, { useContext, useState } from 'react';
import { AppLoading } from 'expo';
import { ApolloProvider } from '@apollo/react-hooks';
import styled from 'styled-components/native';
import { AppearanceProvider } from 'react-native-appearance';
import * as Font from 'expo-font';

import AuthContext, { Provider as AuthProvider } from './contexts/Auth';
import ThemeProvider from './theme-provider';
import client from './apollo-client';

import UnAuthedNavigator from './routers/UnAuthedRouter';
import AuthedNavigator from './routers/AuthedNavigator';

const App = () => {
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  if (loading) {
    return (
      <AppLoading
        startAsync={async () =>
          Font.loadAsync({
            'futura-bold': require('./assets/futura-bold.ttf'),
            'futura-book': require('./assets/futura-book.ttf'),
          })
        }
        onFinish={() => setLoading(false)}
      />
    );
  }

  if (auth) {
    return <AuthedNavigator />;
  }

  return <UnAuthedNavigator />;
};

const Main = styled.View`
  flex: 1;
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
