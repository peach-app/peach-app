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
  Card,
  Text,
  SkeletonText,
  AddBankDetailsPlaceholder,
} from 'components';

import GET_EXTERNAL_ACCOUNTS from './graphql/get-external-accounts';

export const BillingDetails = () => {
  const navigation = useNavigation();
  const { data, loading } = useQuery(GET_EXTERNAL_ACCOUNTS, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SafeAreaView>
      <Header title="Billing Details" />
      <ScrollView>
        <Container>
          <Intro />
          <Grid>
            {(loading
              ? [{ id: 0 }]
              : getOr([], 'user.stripeAccount.external_accounts.data', data)
            ).map(account => (
              <Grid.Item size={12} key={account.id}>
                <Card>
                  <Grid justify="space-between">
                    <Grid.Item size={12}>
                      <Text>
                        <SkeletonText
                          isLoading={loading}
                          loadingText="Account holder name"
                        >
                          {getOr('', 'account_holder_name', account)}
                        </SkeletonText>
                      </Text>
                    </Grid.Item>
                    <Grid.Item>
                      <Text>
                        <SkeletonText isLoading={loading} loadingText="01-02-3">
                          {getOr('', 'routing_number', account)}
                        </SkeletonText>
                      </Text>
                    </Grid.Item>
                    <Grid.Item>
                      <Text>
                        <SkeletonText
                          isLoading={loading}
                          loadingText="01234567"
                        >
                          ****{getOr('', 'last4', account)}
                        </SkeletonText>
                      </Text>
                    </Grid.Item>
                  </Grid>
                </Card>
              </Grid.Item>
            ))}

            <Grid.Item size={12}>
              <AddBankDetailsPlaceholder
                onPress={() => navigation.navigate('NewBilling')}
                text={'Add a new\nCard or Bank Account'}
              />
            </Grid.Item>
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
