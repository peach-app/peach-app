import React, { useState } from 'react';
import { withNavigation } from 'react-navigation';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';

import { NETWORK_STATUS } from '../../consts';
import {
  SafeAreaView,
  Intro,
  Title,
  Grid,
  IconButton,
  UserCard,
  FlatList,
  Tabs,
} from '../../components';

import GET_DISCOVER_USERS from './graphql/get-discover-users';

const DiscoverInfluencers = ({ navigation }) => {
  const [activeTab, setTab] = useState(0);
  const { data, loading, networkStatus } = useQuery(GET_DISCOVER_USERS, {
    notifyOnNetworkStatusChange: true,
  });

  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={
          <>
            <FlatList.Item>
              <Intro>
                <Grid align="flex-end">
                  <Grid.Item flex={1}>
                    <Title>Discover</Title>
                  </Grid.Item>

                  <Grid.Item>
                    <IconButton
                      size={30}
                      name="ios-search"
                      onPress={() => navigation.navigate('Search')}
                    />
                  </Grid.Item>
                </Grid>
              </Intro>
            </FlatList.Item>

            <FlatList.Item>
              <Tabs
                tabs={['Popular Influencers']}
                activeTabIndex={activeTab}
                onTabPress={index => setTab(index)}
              />
            </FlatList.Item>

            {fetching &&
              Array.from(Array(3)).map((_, key) => (
                <FlatList.Item key={key}>
                  <UserCard isLoading />
                </FlatList.Item>
              ))}
          </>
        }
        keyExtractor={item => item._id}
        data={getOr([], 'discover.popularUsers.data', data)}
        renderItem={({ item }) => (
          <FlatList.Item>
            <UserCard {...item} />
          </FlatList.Item>
        )}
      />
    </SafeAreaView>
  );
};

export default withNavigation(DiscoverInfluencers);
