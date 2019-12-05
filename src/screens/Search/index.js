import React, { useMemo } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useLazyQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import debounce from 'lodash/debounce';

import { Header } from './styles';
import { NETWORK_STATUS } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import { FlatList, FlatListItem } from '../../components/FlatList';
import UserCard from '../../components/UserCard';
import Container from '../../components/Container';
import BackButton from '../../components/BackButton';
import { Grid, GridItem } from '../../components/Grid';
import TextInput from '../../components/TextInput/Input';
import Text from '../../components/Text';
import Intro from '../../components/Intro';

import SEARCH_INFLUENCERS from './graphql/search-influencers';

const Search = () => {
  const [searchInfluencers, { data, loading, networkStatus }] = useLazyQuery(
    SEARCH_INFLUENCERS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const search = useMemo(() => debounce(searchInfluencers, 500), []);
  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;
  const influencers = getOr([], 'searchUsers.data', data);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <Intro>
            <Header>
              <Grid>
                <GridItem size={12}>
                  <BackButton />
                </GridItem>

                <GridItem size={12}>
                  <TextInput
                    placeholder="Search for influencers..."
                    autoFocus
                    onChangeText={query => {
                      search({
                        variables: {
                          query,
                        },
                      });
                    }}
                  />
                </GridItem>
              </Grid>
            </Header>
          </Intro>
        </Container>

        <FlatList
          ListHeaderComponent={
            <>
              {!fetching && influencers.length <= 0 && (
                <FlatListItem>
                  <Text isCenter>0 influencers found.</Text>
                </FlatListItem>
              )}

              {fetching &&
                Array.from(Array(3)).map((_, key) => (
                  <FlatListItem key={key}>
                    <UserCard isLoading />
                  </FlatListItem>
                ))}
            </>
          }
          keyExtractor={item => item._id}
          data={influencers}
          renderItem={({ item }) => (
            <FlatListItem>
              <UserCard {...item} />
            </FlatListItem>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Search;
