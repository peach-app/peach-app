import React from 'react';
import { ScrollView } from 'react-native';

import {
  SafeAreaView,
  Container,
  Header,
  Text,
  Intro,
  Card,
  SubTitle,
  Grid,
} from 'components';

export const Support = () => (
  <SafeAreaView>
    <Header title="Contact Us" />
    <ScrollView>
      <Container>
        <Intro />
        <Grid>
          <Grid.Item size={12}>
            <Text isCenter>
              If you require support then please email us as at:
            </Text>
          </Grid.Item>
          <Grid.Item size={12}>
            <Card>
              <SubTitle isCenter selectable>
                Peachapp.io@gmail.com
              </SubTitle>
            </Card>
          </Grid.Item>
          <Grid.Item size={12}>
            <Text isCenter>We aim to respond within 24 hours ⏰</Text>
          </Grid.Item>
        </Grid>
      </Container>
    </ScrollView>
  </SafeAreaView>
);
