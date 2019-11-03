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
import Loading from '../../components/Loading';
import CampaignCard from '../../components/CampaignCard';
import GET_CAMPAIGNS from './graphql/get-campaigns';

const Discover = () => {
  const { data, loading, networkStatus, refetch } = useQuery(GET_CAMPAIGNS, {
    notifyOnNetworkStatusChange: true,
  });

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

            {loading && networkStatus === NETWORK_STATUS.FETCHING && (
              <FlatListItem>
                <Loading />
              </FlatListItem>
            )}
          </>
        }
        keyExtractor={item => item._id}
        data={getOr([], 'discover.data', data)}
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
