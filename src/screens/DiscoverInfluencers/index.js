import React, { useState } from 'react';
import { withNavigation } from 'react-navigation';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';

import { NETWORK_STATUS } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import Intro from '../../components/Intro';
import Title from '../../components/Title';
import { Grid, GridItem } from '../../components/Grid';
import IconButton from '../../components/IconButton';
import UserCard from '../../components/UserCard';
import { FlatList, FlatListItem } from '../../components/FlatList';
import Tabs from '../../components/Tabs';

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
            <FlatListItem>
              <Intro>
                <Grid align="flex-end">
                  <GridItem flex={1}>
                    <Title>Discover</Title>
                  </GridItem>

                  <GridItem>
                    <IconButton
                      size={30}
                      name="ios-search"
                      onPress={() => navigation.navigate('Search')}
                    />
                  </GridItem>
                </Grid>
              </Intro>
            </FlatListItem>

            <FlatListItem>
              <Tabs
                tabs={[
                  'Popular',
                  'Hard Workers',
                  'Newbies',
                  'Artists',
                  'Promoters',
                ]}
                activeTabIndex={activeTab}
                onTabPress={index => setTab(index)}
              />
            </FlatListItem>

            {fetching &&
              Array.from(Array(3)).map((_, key) => (
                <FlatListItem key={key}>
                  <UserCard isLoading />
                </FlatListItem>
              ))}
          </>
        }
        keyExtractor={item => item._id}
        data={getOr([], 'discover.popularUsers.data', data)}
        renderItem={({ item }) => (
          <FlatListItem>
            <UserCard {...item} />
          </FlatListItem>
        )}
      />
    </SafeAreaView>
  );
};

export default withNavigation(DiscoverInfluencers);
