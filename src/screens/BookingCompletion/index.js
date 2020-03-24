import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

import {
  SafeAreaView,
  StatusBar,
  Header,
  Intro,
  Container,
  Grid,
  Text,
  TextInput,
  Actions,
  Button,
} from 'components';

export const BookingCompletion = () => (
  <SafeAreaView>
    <StatusBar />
    <Header title="Campaign Submission" />
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView>
        <Container>
          <Intro />
          <Grid>
            <Grid.Item size={12}>
              <Text>{`You're about to submit your work for this campaign.\nSupply any links or additional information below.`}</Text>
            </Grid.Item>
            <Grid.Item size={12}>
              <TextInput multiline style={{ minHeight: 100 }} />
            </Grid.Item>
            <Grid.Item size={12}>
              <Actions>
                <Button title="Submit" fixedWidth />
              </Actions>
            </Grid.Item>
          </Grid>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
