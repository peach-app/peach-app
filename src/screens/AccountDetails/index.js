import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import DateSub from 'date-fns/sub';

import {
  SafeAreaView,
  Header,
  StatusBar,
  Container,
  Grid,
  TextInput,
  DatePicker,
  Actions,
  Button,
  Intro,
  Branch,
  Text,
} from 'components';
import { useUser } from 'contexts/User';
import { USER_TYPE } from 'consts';

import GET_USER from './graphql/get-user';

export const AccountDetails = () => {
  const { user } = useUser();
  const { data } = useQuery(GET_USER);
  const isBrand = get('user.type', user) === USER_TYPE.BRAND;

  console.log(data);

  return (
    <SafeAreaView>
      <StatusBar />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Account Details" />
        <ScrollView>
          <Container>
            <Grid>
              <Grid.Item size={12}>
                <Intro>
                  <Text>
                    <Branch
                      test={isBrand}
                      left="The following account details are required for you to make payments to influencers."
                      right="The following account details are required for you to
                    recieve payouts from brands."
                    />
                  </Text>
                </Intro>
              </Grid.Item>

              <Grid.Item size={6}>
                <TextInput label="First name" />
              </Grid.Item>

              <Grid.Item size={6}>
                <TextInput label="Last name" />
              </Grid.Item>

              <Grid.Item size={12}>
                <DatePicker
                  label="Date of birth"
                  value={DateSub(new Date(), { years: 18 })}
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
};
