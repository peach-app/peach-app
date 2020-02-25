import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

import {
  SafeAreaView,
  Header,
  Container,
  Intro,
  Grid,
  TextInput,
  Actions,
  Button,
} from 'components';

export const BusinessDetails = () => (
  <SafeAreaView>
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Header title="Business Details" />
      <ScrollView>
        <Container>
          <Intro />
          <Grid>
            <Grid.Item size={12}>
              <TextInput label="Company legal name" />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Company number" />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Telephone number" />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Company website address" />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Address" placeholder="Address line 1" />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput placeholder="Address line 2" />
            </Grid.Item>

            <Grid.Item size={6}>
              <TextInput label="Town/City" />
            </Grid.Item>

            <Grid.Item size={6}>
              <TextInput label="Postcode" />
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
