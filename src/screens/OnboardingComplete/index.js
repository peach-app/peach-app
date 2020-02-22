import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import {
  SafeAreaView,
  StatusBar,
  Container,
  Actions,
  Button,
  Title,
  Intro,
  Grid,
} from 'components';
import { useUser } from 'contexts/User';
import { USER_TYPE } from 'consts';

import { Content } from './styles';
import COMPLETE_ONBOARDING from './graphql/complete-onboarding';

export const OnboardingComplete = () => {
  const { user } = useUser();
  const type = get('user.type', user);

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
                  title={`Start ${
                    type === USER_TYPE.BRAND ? 'Browsing' : 'Influencing'
                  }`}
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
