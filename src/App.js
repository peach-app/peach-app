import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import get from 'lodash/fp/get';
import { AppearanceProvider } from 'react-native-appearance';
import { ApolloProvider } from '@apollo/react-hooks';
import styled from 'styled-components/native';

import { Splash } from 'components';
import { useAuth } from 'contexts/Auth';
import { Provider as UserProvider, useUser } from 'contexts/User';
import { Provider as AuthProvider } from 'contexts/Auth';
import {
  UnAuthedNavigator,
  OnboardingNavigator,
  AuthedNavigator,
} from 'routers';

import ThemeProvider from './theme-provider';
import client from './apollo-client';

const AuthedApp = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <Splash />;
  }

  if (!get('user.onboarded', user)) {
    return <OnboardingNavigator />;
  }

  return <AuthedNavigator />;
};

const AppMain = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

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

  if (isLoggedIn) {
    return (
      <UserProvider>
        <AuthedApp />
      </UserProvider>
    );
  }

  return <UnAuthedNavigator />;
};

const Main = styled.View`
  flex: 1;
`;

export const App = () => (
  <AuthProvider>
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <ThemeProvider>
          <Main>
            <AppMain />
          </Main>
        </ThemeProvider>
      </AppearanceProvider>
    </ApolloProvider>
  </AuthProvider>
);