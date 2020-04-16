import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

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

export const Welcome = ({ goTo }) => {
  const navigation = useNavigation();

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
                  'Thank you for signing up to use Peach. \nWe just need a few more details from you to get started.'
                }
              </Text>
            </Grid.Item>
            <Grid.Item size={12}>
              <Button
                onPress={() => navigation.navigate(goTo)}
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

Welcome.propTypes = {
  goTo: PropTypes.string.isRequired,
};
