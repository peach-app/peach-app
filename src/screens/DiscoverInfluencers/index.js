import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useLazyQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import debounce from 'lodash/debounce';

import { NETWORK_STATUS } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import Intro from '../../components/Intro';
import Container from '../../components/Container';
import Title from '../../components/Title';
import { Grid, GridItem } from '../../components/Grid';
import SearchInput from '../../components/SearchInput';
import UserCard from '../../components/UserCard';

import SEARCH_INFLUENCERS from './graphql/search-influencers';

const DiscoverInfluencers = () => {
  const [searchInfluencers, { data, loading, networkStatus }] = useLazyQuery(
    SEARCH_INFLUENCERS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );
  const influencers = getOr([], 'searchUsers.data', data);

  const search = useMemo(() => debounce(searchInfluencers, 500), []);
  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Grid>
            <GridItem size={12}>
              <Intro>
                <Title>Discover</Title>
              </Intro>
            </GridItem>

            <GridItem size={12}>
              <SearchInput
                placeholder="Search influencers..."
                onChangeText={query => {
                  search({
                    variables: {
                      query,
                    },
                  });
                }}
              />
            </GridItem>

            {fetching &&
              Array.from(Array(3)).map((_, key) => (
                <GridItem size={12} key={key}>
                  <UserCard isLoading />
                </GridItem>
              ))}

            {!fetching &&
              influencers.length >= 0 &&
              influencers.map(user => (
                <GridItem size={12} key={user._id}>
                  <UserCard {...user} />
                </GridItem>
              ))}

            {influencers.length <= 0 && (
              <>
                <GridItem size={12}>
                  <Title isSmall>Popular</Title>
                </GridItem>

                <GridItem size={12}>
                  <Title isSmall>Hard Workers</Title>
                </GridItem>

                <GridItem size={12}>
                  <Title isSmall>Newbies</Title>
                </GridItem>
              </>
            )}
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscoverInfluencers;
