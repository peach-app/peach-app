import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

import {
  SafeAreaView,
  Header,
  StatusBar,
  Container,
  Intro,
  Grid,
  TextInput,
  Actions,
  Button,
  Label,
} from 'components';

export const BusinessDetails = () => (
  <SafeAreaView>
    <StatusBar />
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Header title="Business Details" />
      <ScrollView>
        <Container>
          <Intro />
          <Grid>
            <Grid.Item size={12}>
              <TextInput label="Legal Name" />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Companies House Registration Number (CRN)" />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Telephone Number" />
            </Grid.Item>

            <Grid.Item size={12}>
              <Label>Address</Label>
              <Grid>
                <Grid.Item size={12}>
                  <TextInput />
                </Grid.Item>
                <Grid.Item size={12}>
                  <TextInput />
                </Grid.Item>
                <Grid.Item size={12}>
                  <TextInput />
                </Grid.Item>
              </Grid>
            </Grid.Item>

            <Grid.Item size={12}>
              <Actions>
                <Button title="Save" fixedWidth />
              </Actions>
            </Grid.Item>
          </Grid>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
