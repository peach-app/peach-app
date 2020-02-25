import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
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
} from 'components';

import GET_EXTERNAL_ACCOUNTS from './graphql/get-external-accounts';

export const BillingDetails = () => {
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
            {getOr(
              [{ id: 0 }],
              'user.stripeAccount.external_accounts.data',
              data
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
                          {get('account_holder_name', account)}
                        </SkeletonText>
                      </Text>
                    </Grid.Item>
                    <Grid.Item>
                      <Text>
                        <SkeletonText isLoading={loading} loadingText="01-02-3">
                          {get('routing_number', account)}
                        </SkeletonText>
                      </Text>
                    </Grid.Item>
                    <Grid.Item>
                      <Text>
                        <SkeletonText
                          isLoading={loading}
                          loadingText="01234567"
                        >
                          ****{get('last4', account)}
                        </SkeletonText>
                      </Text>
                    </Grid.Item>
                  </Grid>
                </Card>
              </Grid.Item>
            ))}
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
