import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Content } from './styles';
import {
  SafeAreaView,
  StatusBar,
  Container,
  Actions,
  Button,
  Title,
  Intro,
  Grid,
} from '../../components';

import COMPLETE_ONBOARDING from './graphql/complete-onboarding';

const OnboardingComplete = () => {
  const [completeOnboarding, { loading }] = useMutation(COMPLETE_ONBOARDING, {
    refetchQueries: ['getCurrentUser'],
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Content>
        <Container>
          <Grid>
            <Grid.Item size={12}>
              <Intro>
                <Title isCenter>You're all done!</Title>
              </Intro>
            </Grid.Item>
            <Grid.Item size={12}>
              <Actions>
                <Button
                  title="Start Browsing"
                  fixedWidth
                  isLoading={loading}
                  onPress={() => completeOnboarding()}
                />
              </Actions>
            </Grid.Item>
          </Grid>
        </Container>
      </Content>
    </SafeAreaView>
  );
};

export default OnboardingComplete;
