import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';

import { NETWORK_STATUS } from 'consts';
import {
  SafeAreaView,
  Intro,
  Title,
  Grid,
  IconButton,
  UserProfileCard,
  FlatList,
} from 'components';

import { Main, Head, Item } from './styles';
import GET_DISCOVER_USERS from './graphql/get-discover-users';

export const DiscoverInfluencers = () => {
  const navigation = useNavigation();
  const { data, loading, networkStatus } = useQuery(GET_DISCOVER_USERS, {
    notifyOnNetworkStatusChange: true,
  });

  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;

  return (
    <SafeAreaView>
      <Main>
        <FlatList
          numColumns={2}
          ListHeaderComponent={
            <>
              <Head>
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
              </Head>

              {fetching &&
                Array.from(Array(3)).map((_, key) => (
                  <Item key={key}>
                    <UserProfileCard isLoading />
                  </Item>
                ))}
            </>
          }
          keyExtractor={item => item._id}
          data={!fetching && getOr([], 'discover.popularUsers.data', data)}
          renderItem={({ item }) => (
            <Item>
              <UserProfileCard {...item} />
            </Item>
          )}
        />
      </Main>
    </SafeAreaView>
  );
};
