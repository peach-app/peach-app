import React, { useMemo } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import debounce from 'lodash/debounce';

import { Main } from './styles';
import { NETWORK_STATUS } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import { FlatList, FlatListItem } from '../../components/FlatList';
import UserCard from '../../components/UserCard';
import Container from '../../components/Container';
import TextInput from '../../components/TextInput';
import NoResultText from '../../components/NoResultText';
import Header from '../../components/Header';

import SEARCH_INFLUENCERS from './graphql/search-influencers';

const Search = () => {
  const { data, loading, networkStatus, refetch } = useQuery(
    SEARCH_INFLUENCERS,
    {
      variables: {
        query: '',
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const search = useMemo(() => debounce(refetch, 500), []);
  const fetching =
    loading &&
    (networkStatus === NETWORK_STATUS.FETCHING ||
      networkStatus === NETWORK_STATUS.SET_VARIABLES);
  const influencers = getOr([], 'searchUsers.data', data);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Search" />
        <Container>
          <Main>
            <TextInput
              placeholder="Search for influencers..."
              autoFocus
              clearButtonMode="while-editing"
              autoCapitalize="none"
              onChangeText={query => {
                search({
                  query,
                });
              }}
            />
          </Main>
        </Container>

        <FlatList
          ListHeaderComponent={
            <>
              {!fetching && influencers.length <= 0 && (
                <FlatListItem>
                  <NoResultText>0 influencers found.</NoResultText>
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
          data={!fetching && influencers}
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
