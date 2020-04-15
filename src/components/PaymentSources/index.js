import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';

import { Grid } from '../Grid';
import { BillingMethodCard } from '../BillingMethodCard';
import { AddBankDetailsPlaceholder } from '../AddBankDetailsPlaceholder';
import GET_SOURCES from './graphql/get-sources';

export const PaymentSources = ({
  onAddNewPress,
  selectedId,
  setSelectedId,
}) => {
  const { data, loading } = useQuery(GET_SOURCES, {
    fetchPolicy: 'cache-and-network',
  });

  const accounts = getOr([], 'user.stripeAccount.sources.data', data);

  useEffect(() => {
    if (accounts.length >= 1 && setSelectedId) {
      setSelectedId(accounts[0].id);
    }
  }, [data]);

  return (
    <>
      {(loading ? [{ id: 0 }] : accounts).map(account => (
        <Grid.Item
          key={account.id}
          size={12}
          as={setSelectedId && TouchableOpacity}
          onPress={() =>
            setSelectedId(selectedId === account.id ? null : account.id)
          }
        >
          <BillingMethodCard
            isLoading={loading}
            account={account}
            isSelected={selectedId === account.id}
          />
        </Grid.Item>
      ))}

      {Boolean(onAddNewPress) && (
        <Grid.Item size={12}>
          <AddBankDetailsPlaceholder
            text="Add new payment method"
            onPress={onAddNewPress}
          />
        </Grid.Item>
      )}
    </>
  );
};

PaymentSources.defaultProps = {
  onAddNewPress: null,
  selectedId: null,
  setSelectedId: null,
};

PaymentSources.propTypes = {
  onAddNewPress: PropTypes.func,
  selectedId: PropTypes.string,
  setSelectedId: PropTypes.func,
};
