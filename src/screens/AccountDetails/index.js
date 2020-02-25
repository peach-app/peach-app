import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import get from 'lodash/fp/get';

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
import { useUser } from 'contexts/User';
import { USER_TYPE } from 'consts';

export const AccountDetails = () => {
  const navigation = useNavigation();
  const { user } = useUser();

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
                  This information is required for making payments and recieving
                  payouts from our payments provider Stripe.
                </Text>
              </Intro>
            </Grid.Item>

            <Grid.Item size={12}>
              <NavLink
                title="Personal"
                iconProps={{ name: 'ios-arrow-forward' }}
                onPress={() => navigation.navigate('PersonalDetails')}
              />
              {get('user.type', user) === USER_TYPE.INFLUENCER && (
                <NavLink
                  title="ID verification documents"
                  iconProps={{ name: 'ios-arrow-forward' }}
                />
              )}
              <NavLink
                title="Billing"
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
