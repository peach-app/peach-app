import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import { useUser } from 'contexts/User';

import { Grid } from '../Grid';
import { Container } from '../Container';
import { Touchable, Main, Copy } from './styles';

export const AccountDetailsBanner = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  if (user.isStripeEnabled && user.isEmailVerified) {
    return null;
  }

  return (
    <Touchable onPress={() => navigation.navigate('AccountDetails')}>
      <Main>
        <SafeAreaView>
          <Container>
            <Grid align="center">
              <Grid.Item flex={1}>
                {!user.isEmailVerified && (
                  <Copy>
                    Please verify your email address{' '}
                    {!user.isStripeEnabled && 'and'}
                  </Copy>
                )}
                {!user.isStripeEnabled && (
                  <Copy>
                    Visit Account Details to finish your account setup
                  </Copy>
                )}
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
