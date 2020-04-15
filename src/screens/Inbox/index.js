import React from 'react';
import { RefreshControl } from 'react-native';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';
import { useQuery } from '@apollo/react-hooks';

import {
  SafeAreaView,
  StatusBar,
  Title,
  Intro,
  FlatList,
  ThreadCard,
  NoResultText,
  Branch,
  AccountDetailsBanner,
} from 'components';
import { useUser } from 'contexts/User';

import { NETWORK_STATUS, USER_TYPE } from 'consts';
import GET_THREADS from './graphql/get-threads';

export const Inbox = () => {
  const { user } = useUser();
  const userType = get('user.type', user);

  const { data, loading, networkStatus, refetch } = useQuery(GET_THREADS, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 10000,
  });

  const messages = getOr([], 'user.threads.data', data);

  return (
    <>
      <AccountDetailsBanner />
      <SafeAreaView>
        <StatusBar />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={
                loading && networkStatus === NETWORK_STATUS.REFETCHING
              }
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
                <NoResultText isPara>
                  <Branch
                    test={userType === USER_TYPE.BRAND}
                    left={`Threads will appear here when you\naccept an influencer onto a campaign.`}
                    right={`Threads will appear here when \nyou join your first campaign.`}
                  />
                </NoResultText>
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
    </>
  );
};
