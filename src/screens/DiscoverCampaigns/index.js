import React from 'react';
import { RefreshControl } from 'react-native';
import getOr from 'lodash/fp/getOr';
import { useQuery } from '@apollo/react-hooks';

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
  const { data, loading, networkStatus, refetch } = useQuery(
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
