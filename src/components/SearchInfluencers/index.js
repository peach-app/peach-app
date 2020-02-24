import React, { useMemo, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useLazyQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import debounce from 'lodash/debounce';
import { Main } from './styles';
import { NETWORK_STATUS, ACTION_COMPONENTS } from '../../consts';
import { FlatList, Container, UserCard, TextInput, NoResultText, AddRemoveAction, Grid } from '../';


import SEARCH_INFLUENCERS from './graphql/search-influencers';

const renderAction = (action, isActioned) => {
  if (action === ACTION_COMPONENTS.ADD_REMOVE) {
    return <AddRemoveAction isActioned={isActioned} />
  }
  return null;
}

export const SearchInfluencers = ({  onActionPressed, action, actionedItems }) => {
  const [searchInfluencers, { data, loading, networkStatus }] = useLazyQuery(
    SEARCH_INFLUENCERS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );
  

  const search = useMemo(() => debounce(searchInfluencers, 500), []);

  useEffect(() => {
    search({variables: { query: ''}})
  }, []);

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
                  query: query,
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
        data={influencers}
        renderItem={({ item }) =>  (
          <FlatList.Item>
            <Grid noWrap align="center">
              <Grid.Item flex={1}>
            <UserCard
              {...item}
            />
            </Grid.Item>
            <Grid.Item>
             {action && (
    <TouchableOpacity onPress={() =>  onActionPressed(item)}>
      {renderAction(action, actionedItems.find(actionedItems => actionedItems._id === item._id))}
    </TouchableOpacity>
  )}
  </Grid.Item>
  </Grid>
          </FlatList.Item>
        )}
      />
    </>
  );
};
