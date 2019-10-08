import React from 'react';

import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';

const Inbox = () => (
  <SafeAreaView>
    <Container>
      <StatusBar />
      <Intro>
        <Title>Messages</Title>
      </Intro>
    </Container>
  </SafeAreaView>
);

export default Inbox;
