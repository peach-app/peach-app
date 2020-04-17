import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  Header,
  StatusBar,
  Container,
  Intro,
  Text,
  NavLink,
  Grid,
} from 'components';

export const AccountDetails = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="Account Details" />
      <ScrollView>
        <Container>
          <Grid>
            <Grid.Item size={12}>
              <Intro>
                <Text>
                  This information is required for recieving payouts from our
                  payments provider Stripe.
                </Text>
              </Intro>
            </Grid.Item>

            <Grid.Item size={12}>
              <NavLink
                title="Personal Details"
                iconProps={{ name: 'ios-arrow-forward' }}
                onPress={() => navigation.navigate('PersonalDetails')}
              />
              <NavLink
                title="Billing Details"
                iconProps={{ name: 'ios-arrow-forward' }}
                onPress={() => navigation.navigate('BillingDetails')}
              />
            </Grid.Item>
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
