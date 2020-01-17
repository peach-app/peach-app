import React from 'react';
import { RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';
import head from 'lodash/fp/head';

import { NETWORK_STATUS } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import { FlatList, FlatListItem } from '../../components/FlatList';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import CampaignCard from '../../components/CampaignCard';
import NoResultText from '../../components/NoResultText';
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
          const after = get('id', head(get('discover.campaigns.after', data)));

          if (!after || loading) return;

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
            <FlatListItem>
              <Intro>
                <Title>Discover</Title>
              </Intro>
            </FlatListItem>

            {!fetching && campaigns.length <= 0 && (
              <NoResultText>No campaigns to discover.</NoResultText>
            )}

            {fetching &&
              Array.from(Array(3)).map((_, key) => (
                <FlatListItem key={key}>
                  <CampaignCard isLoading />
                </FlatListItem>
              ))}
          </>
        }
        keyExtractor={item => item._id}
        data={campaigns}
        renderItem={({ item }) => (
          <FlatListItem>
            <CampaignCard {...item} />
          </FlatListItem>
        )}
      />
    </SafeAreaView>
  );
};

export default DiscoverCampaigns;
