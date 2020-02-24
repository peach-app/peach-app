import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import { Grid } from '../Grid';
import { Container } from '../Container';

import { Main, Copy } from './styles';

export const AccountDetailsBanner = () => {
  const navigation = useNavigation();

  return (
    <Main onPress={() => navigation.navigate('AccountDetails')}>
      <SafeAreaView>
        <Container>
          <Grid>
            <Grid.Item flex={1}>
              <Copy>
                Visit "Account Details" to finish your account setup and start
                receiving payouts.
              </Copy>
            </Grid.Item>
            <Grid.Item width={48}>
              <Ionicons name="ios-arrow-dropright" size={28} color="white" />
            </Grid.Item>
          </Grid>
        </Container>
      </SafeAreaView>
    </Main>
  );
};
