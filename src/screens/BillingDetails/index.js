import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity } from 'react-native';
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

  return (
    <SafeAreaView>
      <Header title="Billing Details" />
      <ScrollView>
        <Container>
          <Intro />
          <Grid>
            <BillingAccounts />
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

export const BillingAccounts = ({
  isSelectable,
  onSelect,
  selectedAccount,
}) => {
  const { data, loading } = useQuery(GET_EXTERNAL_ACCOUNTS, {
    fetchPolicy: 'cache-and-network',
  });
  const accounts = getOr([], 'user.stripeAccount.external_accounts.data', data);

  useEffect(() => {
    if (accounts.length === 1) {
      onSelect(accounts[0].id);
    }
  }, [accounts.length]);

  return (
    <>
      {(loading ? [{ id: 0 }] : accounts).map(account => (
        <Grid.Item
          key={account.id}
          size={12}
          as={isSelectable && accounts.length > 1 && TouchableOpacity}
          onPress={() => onSelect(account.id)}
        >
          <Card isSelected={account.id === selectedAccount}>
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
                  <SkeletonText isLoading={loading} loadingText="01234567">
                    ****{getOr('', 'last4', account)}
                  </SkeletonText>
                </Text>
              </Grid.Item>
            </Grid>
          </Card>
        </Grid.Item>
      ))}
    </>
  );
};

BillingAccounts.propTypes = {
  isSelectable: PropTypes.bool,
  onSelect: PropTypes.func,
  selectedAccount: PropTypes.string,
};

BillingAccounts.defaultProps = {
  isSelectable: false,
  onSelect: null,
  selectedAccount: '',
};
