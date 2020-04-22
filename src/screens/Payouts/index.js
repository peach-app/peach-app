import React from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';

import {
  SafeAreaView,
  StatusBar,
  Header,
  Intro,
  Title,
  FlatList,
  PayoutCard,
  NoResultText,
  Branch,
} from 'components';
import { NETWORK_STATUS } from 'consts';
import getOr from 'lodash/fp/getOr';
import GET_USER_PAYOUTS from './graphql/get-user-payouts';

export const Payouts = () => {
  const { data, loading, refetch, networkStatus, fetchMore } = useQuery(
    GET_USER_PAYOUTS
  );
  const fetching =
    loading &&
    (networkStatus === NETWORK_STATUS.FETCHING ||
      networkStatus === NETWORK_STATUS.SET_VARIABLES);

  const hasMore = getOr(false, 'payouts.has_more', data);
  const payouts = getOr([], 'payouts.data', data);
  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="Payouts" />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading && networkStatus === NETWORK_STATUS.REFETCHING}
            onRefresh={refetch}
          />
        }
        data={!loading && payouts}
        renderItem={({ item }) => (
          <FlatList.Item>
            <PayoutCard isLoading={loading} {...item} />
          </FlatList.Item>
        )}
        ListHeaderComponent={
          <>
            <FlatList.Item>
              <Intro />
              <Title>History</Title>
            </FlatList.Item>

            {!fetching && payouts.length <= 0 && (
              <NoResultText isPara>
                <Branch
                  left="You don't have any payout history yet."
                  right="Once a campaign is completed the payout details will be displayed here."
                />
              </NoResultText>
            )}

            {fetching &&
              Array.from(Array(3)).map((_, key) => (
                <FlatList.Item key={key}>
                  <PayoutCard isLoading={loading} />
                </FlatList.Item>
              ))}
          </>
        }
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          if (hasMore) {
            const after = payouts[payouts.length - 1].id;
            fetchMore({
              variables: {
                after,
              },
              updateQuery: (cache, { fetchMoreResult }) => ({
                payouts: {
                  ...fetchMoreResult.payouts,
                  data: [
                    ...cache.payouts.data,
                    ...fetchMoreResult.payouts.data,
                  ],
                },
              }),
            });
          }
        }}
      />
    </SafeAreaView>
  );
};
