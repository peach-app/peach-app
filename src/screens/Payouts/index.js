import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import BackButton from '../../components/BackButton';

const Payouts = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Container>
      <StatusBar barStyle="dark-content" />
      <Intro>
        <BackButton />
        <Title>Payouts</Title>
      </Intro>
    </Container>
  </SafeAreaView>
);

export default Payouts;
