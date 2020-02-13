import React, { useMemo } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import debounce from 'lodash/debounce';

import { Main } from './styles';
import { NETWORK_STATUS } from '../../consts';
import {
  SafeAreaView,
  FlatList,
  UserCard,
  Container,
  TextInput,
  NoResultText,
  Header,
} from '../../components';

import SEARCH_INFLUENCERS from './graphql/search-influencers';

export const Search = () => {
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
                <FlatList.Item>
                  <NoResultText>0 influencers found.</NoResultText>
                </FlatList.Item>
              )}

              {fetching &&
                Array.from(Array(3)).map((_, key) => (
                  <FlatList.Item key={key}>
                    <UserCard isLoading />
                  </FlatList.Item>
                ))}
            </>
          }
          keyExtractor={item => item._id}
          data={!fetching && influencers}
          renderItem={({ item }) => (
            <FlatList.Item>
              <UserCard {...item} />
            </FlatList.Item>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
