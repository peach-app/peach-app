import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Main, Content, Image } from './styles';
import {
  StatusBar,
  Title,
  Text,
  Container,
  Grid,
  Button,
} from '../../components';

import OnboardingBanner from '../../assets/onboarding.png';

export const OnboardingWelcome = () => {
  const navigation = useNavigation();

  return (
    <Main>
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
                  'We need a few more details from you \nbefore you can start using the Peach app.'
                }
              </Text>
            </Grid.Item>
            <Grid.Item size={12}>
              <Button
                onPress={() => navigation.navigate('PaymentDetails')}
                title="Begin"
                fixedWidth
              />
            </Grid.Item>
          </Grid>
        </Container>
      </Content>

      <Image source={OnboardingBanner} />
    </Main>
  );
};
