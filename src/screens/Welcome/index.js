import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import {
  SafeAreaView,
  StatusBar,
  Title,
  Text,
  Container,
  Grid,
  Button,
} from 'components';

import { Content, Image } from './styles';
import OnboardingBanner from '../../assets/onboarding.png';
import COMPLETE_ONBOARDING from './graphql/complete-onboarding';

export const Welcome = () => {
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
              <Title>Welcome!</Title>
            </Grid.Item>
            <Grid.Item size={12}>
              <Text isPara>
                {
                  'Thank you for signing up to use Peach. \nWe hope you enjoy the experience.'
                }
              </Text>
            </Grid.Item>
            <Grid.Item size={12}>
              <Button
                onPress={() => completeOnboarding()}
                isLoading={loading}
                title="Begin"
                fixedWidth
              />
            </Grid.Item>
          </Grid>
        </Container>
      </Content>

      <Image source={OnboardingBanner} />
    </SafeAreaView>
  );
};
