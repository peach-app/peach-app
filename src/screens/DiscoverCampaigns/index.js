import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Title,
  Intro,
  CampaignCard,
  NoResultText,
  Tabs,
} from 'components';
import { formatRefs } from 'helpers';

import { NETWORK_STATUS, BUDGET_TYPE } from 'consts';
import GET_DISCOVER_CAMPAIGNS from './graphql/get-discover-campaigns';

export const DiscoverCampaigns = () => {
  const [activeTabIndex, setTabIndex] = useState(0);
  const navigation = useNavigation();
  const budgetType = [undefined, BUDGET_TYPE.PAID, BUDGET_TYPE.UNPAID][
    activeTabIndex
  ];
  const { data, loading, networkStatus, refetch, fetchMore } = useQuery(
    GET_DISCOVER_CAMPAIGNS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      variables: {
        type: budgetType,
      },
    }
  );

  const campaigns = getOr([], 'discover.campaigns.data', data);

  const tabs = ['All', 'Paid', 'Unpaid'];

  const fetching =
    loading &&
    (networkStatus === NETWORK_STATUS.FETCHING ||
      networkStatus === NETWORK_STATUS.SET_VARIABLES);

  return (
    <SafeAreaView>
      <StatusBar />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading && networkStatus === NETWORK_STATUS.REFETCHING}
            onRefresh={refetch}
          />
        }
        onEndReached={() => {
          const after = formatRefs(get('discover.campaigns.after', data));

          if (after.length <= 0 || loading) return;

          fetchMore({
            variables: {
              after,
              type: budgetType,
            },
            updateQuery: (cache, { fetchMoreResult }) => ({
              discover: {
                ...fetchMoreResult.discover,
                campaigns: {
                  ...fetchMoreResult.discover.campaigns,
                  data: [
                    ...cache.discover.campaigns.data,
                    ...fetchMoreResult.discover.campaigns.data,
                  ],
                },
              },
            }),
          });
        }}
        ListHeaderComponent={
          <>
            <FlatList.Item>
              <Intro>
                <Title>Discover</Title>
              </Intro>
            </FlatList.Item>

            <FlatList.Item>
              <Tabs
                activeTabIndex={activeTabIndex}
                onTabPress={index => setTabIndex(index)}
                tabs={tabs}
              />
            </FlatList.Item>

            {!fetching && campaigns.length <= 0 && (
              <NoResultText>No campaigns to discover here yet.</NoResultText>
            )}

            {fetching &&
              Array.from(Array(3)).map((_, key) => (
                <FlatList.Item key={key}>
                  <CampaignCard isLoading />
                </FlatList.Item>
              ))}
          </>
        }
        keyExtractor={item => item._id}
        data={!fetching && campaigns}
        renderItem={({ item }) => (
          <FlatList.Item>
            <CampaignCard
              {...item}
              onPress={() => navigation.navigate('Campaign', { id: item._id })}
            />
          </FlatList.Item>
        )}
      />
    </SafeAreaView>
  );
};
