import React from 'react';
import { SafeAreaView } from 'react-native';

import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';

const Inbox = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Container>
      <Intro>
        <Title>Messages</Title>
      </Intro>
    </Container>
  </SafeAreaView>
);

export default Inbox;
