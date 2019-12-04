import React from 'react';
import { RefreshControl } from 'react-native';
import getOr from 'lodash/fp/getOr';
import { useQuery } from '@apollo/react-hooks';

import { NETWORK_STATUS } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import { FlatList, FlatListItem } from '../../components/FlatList';
import Title from '../../components/Title';
import Text from '../../components/Text';
import Intro from '../../components/Intro';
import CampaignCard from '../../components/CampaignCard';
import GET_CAMPAIGNS from './graphql/get-campaigns';

const Discover = () => {
  const { data, loading, networkStatus, refetch } = useQuery(GET_CAMPAIGNS, {
    notifyOnNetworkStatusChange: true,
  });

  const campaigns = getOr([], 'discover.data', data);
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
              <Text>No campaigns to discover.</Text>
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

export default Discover;
