import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import {
  SafeAreaView,
  Header,
  KeyboardAvoidingView,
  Grid,
  Container,
  Intro,
} from 'components';

import { PushToggle, EmailToggle } from './components';
import GET_USER from './graphql/get-user';

export const Preferences = () => {
  const { data } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <Header title="Preferences" />
        <Intro />
        <Container>
          <Grid>
            <Grid.Item size={12}>
              <PushToggle value={get('user.preferences.pushAlerts', data)} />
            </Grid.Item>
            <Grid.Item size={12}>
              <EmailToggle value={get('user.preferences.emailAlerts', data)} />
            </Grid.Item>
          </Grid>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
