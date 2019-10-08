import React from 'react';

import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';

const Discover = () => (
  <SafeAreaView>
    <Container>
      <StatusBar />
      <Intro>
        <Title>Discover</Title>
      </Intro>
    </Container>
  </SafeAreaView>
);

export default Discover;
