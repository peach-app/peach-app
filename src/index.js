import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { ApolloProvider } from '@apollo/react-hooks';
import styled from 'styled-components/native';
import { AppearanceProvider } from 'react-native-appearance';
import * as Font from 'expo-font';
import get from 'lodash/fp/get';
import { NavigationContainer } from '@react-navigation/native';

import { Splash } from 'components';
import { Provider as AuthProvider, useAuth } from 'contexts/Auth';
import { Provider as UserProvider, useUser } from 'contexts/User';

import ThemeProvider from './theme-provider';
import client from './apollo-client';

import {
  UnAuthedNavigator,
  OnboardingNavigator,
  AuthedNavigator,
} from './routers';

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

const App = () => {
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

export default () => (
  <NavigationContainer>
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
  </NavigationContainer>
);
