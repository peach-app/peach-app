import React from 'react';
import { RefreshControl } from 'react-native';
import getOr from 'lodash/fp/getOr';
import { useQuery } from '@apollo/react-hooks';

import { NETWORK_STATUS } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import FlatList from '../../components/FlatList';
import ThreadCard from '../../components/ThreadCard';
import NoResultText from '../../components/NoResultText';
import GET_THREADS from './graphql/get-threads';

const Inbox = () => {
  const { data, loading, networkStatus, refetch } = useQuery(GET_THREADS, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 10000,
  });

  const messages = getOr([], 'user.threads.data', data);

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
        data={messages}
        ListHeaderComponent={
          <>
            <FlatList.Item>
              <Intro>
                <Title>Messages</Title>
              </Intro>
            </FlatList.Item>

            {!loading && messages.length <= 0 && (
              <NoResultText>No active threads yet.</NoResultText>
            )}

            {loading && networkStatus === NETWORK_STATUS.FETCHING && (
              <>
                {Array.from(Array(3)).map((_, key) => (
                  <FlatList.Item key={key}>
                    <ThreadCard isLoading />
                  </FlatList.Item>
                ))}
              </>
            )}
          </>
        }
        renderItem={({ item }) => (
          <FlatList.Item>
            <ThreadCard {...item} />
          </FlatList.Item>
        )}
      />
    </SafeAreaView>
  );
};

export default Inbox;
