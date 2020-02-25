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
              <DatePicker
                label="Date of birth"
                value={SubDate(new Date(), { years: 18 })}
              />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Telephone number" />
            </Grid.Item>

            <Grid.Item size={12}>
              <TextInput label="Address line 1" />
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
