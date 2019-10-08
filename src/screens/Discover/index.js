import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';

const Discover = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Container>
      <StatusBar barStyle="dark-content" />
      <Intro>
        <Title>Discover</Title>
      </Intro>
    </Container>
  </SafeAreaView>
);

export default Discover;
