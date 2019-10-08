import React from 'react';

import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import BackButton from '../../components/BackButton';

const Payouts = () => (
  <SafeAreaView>
    <Container>
      <StatusBar />
      <Intro>
        <BackButton />
        <Title>Payouts</Title>
      </Intro>
    </Container>
  </SafeAreaView>
);

export default Payouts;
