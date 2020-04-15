import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import get from 'lodash/fp/get';

import { useUser } from 'contexts/User';
import { USER_TYPE } from 'consts';

import { Grid } from '../Grid';
import { Container } from '../Container';
import { Touchable, Main, Copy } from './styles';

export const AccountDetailsBanner = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  const userType = get('user.type', user);
  const isBrand = userType === USER_TYPE.BRAND;

  const passesStripe = isBrand || user.isStripeEnabled;

  if (passesStripe && user.isEmailVerified) {
    return null;
  }

  return (
    <Touchable
      onPress={() => !passesStripe && navigation.navigate('AccountDetails')}
    >
      <Main>
        <SafeAreaView>
          <Container>
            <Grid align="center">
              <Grid.Item flex={1}>
                {!user.isEmailVerified && (
                  <Copy>
                    Please verify your email address {!passesStripe && 'and'}
                  </Copy>
                )}
                {!passesStripe && (
                  <Copy>
                    Visit Account Details to finish your account setup
                  </Copy>
                )}
              </Grid.Item>
              {!passesStripe && (
                <Grid.Item>
                  <Ionicons
                    name="ios-arrow-dropright-circle"
                    size={22}
                    color="white"
                  />
                </Grid.Item>
              )}
            </Grid>
          </Container>
        </SafeAreaView>
      </Main>
    </Touchable>
  );
};
