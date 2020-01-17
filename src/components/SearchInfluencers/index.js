import React, { useMemo } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import debounce from 'lodash/debounce';
import { Main } from './styles';
import { NETWORK_STATUS } from '../../consts';
import { FlatList, FlatListItem } from '../FlatList';
import UserCard from '../UserCard';
import Container from '../Container';
import TextInput from '../TextInput';
import NoResultText from '../NoResultText';

import SEARCH_INFLUENCERS from './graphql/search-influencers';

const Search = ({ isActionable, onActionPressed }) => {
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
    <>
      <Container>
        <Main>
          <TextInput
            placeholder="Search for influencers..."
            autoFocus
            clearButtonMode="while-editing"
            autoCapitalize="none"
            onChangeText={query => {
              search({
                variables: {
                  query,
                },
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
        data={influencers}
        renderItem={({ item }) => (
          <FlatListItem>
            <UserCard
              {...item}
              isActionable={isActionable}
              onActionPressed={() => onActionPressed(item)}
            />
          </FlatListItem>
        )}
      />
    </>
  );
};

export default Search;
