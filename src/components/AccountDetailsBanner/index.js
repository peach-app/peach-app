import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import { Grid } from '../Grid';
import { Container } from '../Container';

import { Touchable, Main, Copy } from './styles';

export const AccountDetailsBanner = ({ isStripeEnabled, isEmailVerified }) => {
  const navigation = useNavigation();
  if (isStripeEnabled && isEmailVerified) {
    return null;
  }

  return (
    <Touchable onPress={() => navigation.navigate('AccountDetails')}>
      <Main>
        <SafeAreaView>
          <Container>
            <Grid align="center">
              <Grid.Item flex={1}>
                {!isEmailVerified && (
                  <Copy>
                    Please verify your email address {!isStripeEnabled && 'and'}
                  </Copy>
                )}
                {!isStripeEnabled && (
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

AccountDetailsBanner.defaultProps = {
  isStripeEnabled: true,
  isEmailVerified: true,
};

AccountDetailsBanner.propTypes = {
  isStripeEnabled: PropTypes.bool,
  isEmailVerified: PropTypes.bool,
};
