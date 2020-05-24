import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import get from 'lodash/fp/get';
import { AppearanceProvider } from 'react-native-appearance';
import { ApolloProvider } from '@apollo/react-hooks';
import styled from 'styled-components/native';

import { NETWORK_STATUS } from 'consts';
import { Splash, NetworkError } from 'components';
import { useAuth, Provider as AuthProvider } from 'contexts/Auth';
import { Provider as UserProvider, useUser } from 'contexts/User';

import {
  UnAuthedNavigator,
  AuthedNavigator,
  OnboardingNavigator,
} from 'routers';
import RootModal from './components/Modals/RootModal';
import { Provider as ModalProvider } from './contexts/Modal';

import ThemeProvider from './theme-provider';
import client from './apollo-client';

const AuthedApp = () => {
  const { user, loading, networkStatus, refetch } = useUser();

  if (loading && networkStatus === NETWORK_STATUS.FETCHING) {
    return <Splash />;
  }

  if (Boolean(get('user', user)) && !get('user.onboarded', user)) {
    return <OnboardingNavigator />;
  }

  if (get('user', user)) {
    return <AuthedNavigator />;
  }

  return (
    <NetworkError
      refetch={refetch}
      loading={loading && networkStatus === NETWORK_STATUS.REFETCHING}
    />
  );
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
          <ModalProvider>
            <Main>
              <RootModal />
              <AppMain />
            </Main>
          </ModalProvider>
        </ThemeProvider>
      </AppearanceProvider>
    </ApolloProvider>
  </AuthProvider>
);
