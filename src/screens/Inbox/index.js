import React from 'react';
import { RefreshControl } from 'react-native';
import getOr from 'lodash/fp/getOr';
import { useQuery } from '@apollo/react-hooks';

import { NETWORK_STATUS } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import { FlatList, FlatListItem } from '../../components/FlatList';
import ThreadCard from '../../components/ThreadCard';
import GET_THREADS from './graphql/get-threads';

const Inbox = () => {
  const { data, loading, networkStatus, refetch } = useQuery(GET_THREADS, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 10000,
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
        keyExtractor={item => item._id}
        data={getOr([], 'threads.data', data)}
        ListHeaderComponent={
          <>
            <FlatListItem>
              <Intro>
                <Title>Messages</Title>
              </Intro>
            </FlatListItem>

            {loading && networkStatus === NETWORK_STATUS.FETCHING && (
              <>
                {Array.from(Array(3)).map((_, key) => (
                  <FlatListItem key={key}>
                    <ThreadCard isLoading />
                  </FlatListItem>
                ))}
              </>
            )}
          </>
        }
        renderItem={({ item }) => (
          <FlatListItem>
            <ThreadCard {...item} />
          </FlatListItem>
        )}
      />
    </SafeAreaView>
  );
};

export default Inbox;
