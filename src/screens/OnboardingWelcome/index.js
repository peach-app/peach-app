import React from 'react';
import PropTypes from 'prop-types';

import { Main, Image, Foot } from './styles';
import StatusBar from '../../components/StatusBar';
import Intro from '../../components/Intro';
import Title from '../../components/Title';
import Text from '../../components/Text';
import Container from '../../components/Container';
import { Grid, GridItem } from '../../components/Grid';
import Button from '../../components/Button';

import OnboardingBanner from '../../assets/onboarding.png';

const OnboardingWelcome = ({ navigation }) => (
  <Main>
    <StatusBar />
    <Container>
      <Grid>
        <GridItem size={12}>
          <Intro>
            <Title>Welcome</Title>
          </Intro>
        </GridItem>
        <GridItem size={12}>
          <Text>
            We need a few more details from you before you can start using the
            Peach app.
          </Text>
        </GridItem>
        <GridItem size={12}>
          <Button
            onPress={() => navigation.navigate('PaymentDetails')}
            title="Begin"
            fixedWidth
          />
        </GridItem>
      </Grid>
    </Container>

    <Foot>
      <Image source={OnboardingBanner} />
    </Foot>
  </Main>
);

OnboardingWelcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default OnboardingWelcome;
