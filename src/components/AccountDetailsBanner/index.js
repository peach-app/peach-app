import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import get from 'lodash/fp/get';

import { Grid } from '../Grid';
import { Container } from '../Container';

import { Touchable, Main, Copy } from './styles';
import GET_USER from './graphql/get-user';

export const AccountDetailsBanner = () => {
  const { data, loading } = useQuery(GET_USER);
  const navigation = useNavigation();
  const isEmailVerified = get('user.emailVerification.isVerified', data);
  if (
    loading ||
    (get('user.stripeAccount.charges_enabled', data) &&
      get('user.stripeAccount.transfers_enabled', data) &&
      isEmailVerified)
  ) {
    return null;
  }

  return (
    <Touchable onPress={() => navigation.navigate('AccountDetails')}>
      <Main>
        <SafeAreaView>
          <Container>
            <Grid align="center">
              <Grid.Item flex={1}>
                <Copy>
                  {!isEmailVerified && 'Please verify your email & '} Visit
                  "Account Details" to finish your account setup.
                </Copy>
              </Grid.Item>
              <Grid.Item>
                <Ionicons name="ios-arrow-dropright" size={22} color="white" />
              </Grid.Item>
            </Grid>
          </Container>
        </SafeAreaView>
      </Main>
    </Touchable>
  );
};
