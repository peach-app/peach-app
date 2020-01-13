import React from 'react';
import { RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';

import formatRefs from '../../helpers/formatRefs';
import { NETWORK_STATUS } from '../../consts';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Title,
  Intro,
  CampaignCard,
  NoResultText,
} from '../../components';
import GET_DISCOVER_CAMPAIGNS from './graphql/get-discover-campaigns';

const DiscoverCampaigns = () => {
  const { data, loading, networkStatus, refetch, fetchMore } = useQuery(
    GET_DISCOVER_CAMPAIGNS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const campaigns = getOr([], 'discover.campaigns.data', data);
  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;

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

            {!fetching && campaigns.length <= 0 && (
              <NoResultText>No campaigns to discover.</NoResultText>
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
        data={campaigns}
        renderItem={({ item }) => (
          <FlatList.Item>
            <CampaignCard {...item} />
          </FlatList.Item>
        )}
      />
    </SafeAreaView>
  );
};

export default DiscoverCampaigns;
