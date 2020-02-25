import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import SubDate from 'date-fns/sub';

import {
  SafeAreaView,
  Header,
  Container,
  Intro,
  Grid,
  TextInput,
  DatePicker,
  Actions,
  Button,
} from 'components';

export const PersonalDetails = () => (
  <SafeAreaView>
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Header title="Personal Details" />
      <ScrollView>
        <Container>
          <Intro />
          <Grid>
            <Grid.Item size={6}>
              <TextInput label="First name" />
            </Grid.Item>

            <Grid.Item size={6}>
              <TextInput label="Last name" />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Email address" />
            </Grid.Item>

            <Grid.Item size={12}>
              <DatePicker
                label="Date of birth"
                value={SubDate(new Date(), { years: 18 })}
              />
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
              <TextInput label="Postal code" />
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
