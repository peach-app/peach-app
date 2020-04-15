import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import getOr from 'lodash/fp/getOr';

import {
  SafeAreaView,
  Header,
  Container,
  Intro,
  Grid,
  BillingMethodCard,
  AddBankDetailsPlaceholder,
} from 'components';

import GET_EXTERNAL_ACCOUNTS from './graphql/get-external-accounts';

export const BillingDetails = () => {
  const navigation = useNavigation();

  const { data, loading } = useQuery(GET_EXTERNAL_ACCOUNTS, {
    fetchPolicy: 'cache-and-network',
  });

  const accounts = getOr([], 'user.stripeAccount.external_accounts.data', data);

  return (
    <SafeAreaView>
      <Header title="Billing Details" />
      <ScrollView>
        <Container>
          <Intro />
          <Grid>
            {(loading ? [{ id: 0 }] : accounts).map(account => (
              <Grid.Item key={account.id} size={12}>
                <BillingMethodCard isLoading={loading} account={account} />
              </Grid.Item>
            ))}
            <Grid.Item size={12}>
              <AddBankDetailsPlaceholder
                onPress={() => navigation.navigate('NewBilling')}
                text={'Add new billing method'}
              />
            </Grid.Item>
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
