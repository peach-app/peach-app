import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import {
  SafeAreaView,
  Header,
  StatusBar,
  Container,
  Grid,
  Intro,
  Text,
} from 'components';

import { PersonalDetails, BusinessDetails } from './components';
import GET_USER from './graphql/get-user';

export const AccountDetails = () => {
  const { data } = useQuery(GET_USER);

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
                    The following account details are required to make payments
                    and recieve payouts from our payments provider Stripe.
                  </Text>
                </Intro>
              </Grid.Item>

              <Grid.Item size={12}>
                <PersonalDetails />
              </Grid.Item>

              <Grid.Item size={12}>
                <BusinessDetails />
              </Grid.Item>
            </Grid>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
