import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';

import {
  SafeAreaView,
  Header,
  Container,
  Grid,
  TextInput,
  Actions,
  Button,
  Intro,
} from 'components';

export const NewBilling = () => (
  <SafeAreaView>
    <Header title="New Billing Method" />
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView>
        <Container>
          <Intro />
          <Grid>
            <Grid.Item size={12}>
              <TextInput
                label="Account holder name"
                placeholder="e.g John Smith"
              />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Account number" placeholder="e.g 01234567" />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Sort code" placeholder="e.g 01-02-33" />
            </Grid.Item>

            <Grid.Item size={12}>
              <Actions>
                <Button title="Create" fixedWidth />
              </Actions>
            </Grid.Item>
          </Grid>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
