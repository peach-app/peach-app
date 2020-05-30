import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import {
  SafeAreaView,
  StatusBar,
  Button,
  Container,
  Title,
  Grid,
  Header,
} from 'components';

import { Content } from './styles';
import COMPLETE_ONBOARDING from './graphql/complete-onboarding';

export const CompleteOnboarding = () => {
  const [completeOnboarding, { loading }] = useMutation(COMPLETE_ONBOARDING, {
    refetchQueries: ['getCurrentUser'],
    awaitRefetchQueries: true,
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header />
      <Content>
        <Container>
          <Grid justify="center">
            <Grid.Item size={12}>
              <Title isCenter>You're all set!</Title>
            </Grid.Item>
            <Grid.Item>
              <Button
                title="Complete Signup"
                isLoading={loading}
                fixedWidth
                onPress={() => completeOnboarding()}
              />
            </Grid.Item>
          </Grid>
        </Container>
      </Content>
    </SafeAreaView>
  );
};
