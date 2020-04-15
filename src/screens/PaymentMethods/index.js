import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  Header,
  UserPaymentMethods,
  Container,
  Intro,
  Grid,
} from 'components';

export const PaymentMethods = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="Payment Methods" />
      <ScrollView>
        <Container>
          <Intro />
          <Grid>
            <UserPaymentMethods
              onAddNewPress={() => navigation.navigate('NewPaymentMethod')}
            />
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
