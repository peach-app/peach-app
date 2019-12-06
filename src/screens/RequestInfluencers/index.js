import React, { useState, useMemo, useEffect } from 'react';
import { Animated } from 'react-native';
import { createDndContext } from 'react-native-easy-dnd';
import { useLazyQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import debounce from 'lodash/debounce';

import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import { Grid, GridItem } from '../../components/Grid';
import Avatar from '../../components/Avatar';
import {
  InfluencersContainer,
  dropZoneStyles,
  DropZoneText,
  AvatarWrapper,
  InfluencersWrapper,
} from './styles';
import Container from '../../components/Container';
import TextInput from '../../components/TextInput/Input';
import Button from '../../components/Button';
import Actions from '../../components/Actions';
import Label from '../../components/Label';
import SEARCH_INFLUENCERS from '../Search/graphql/search-influencers';
import { NETWORK_STATUS } from '../../consts';
import { FlatList, FlatListItem } from '../../components/FlatList';
import UserCard from '../../components/UserCard';

const mockInfluencers = [
  { id: 1, name: 'Josh Parret' },
  {
    id: 2,
    name: 'Rosen',
  },
  {
    id: 3,
    name: 'Josh Parret',
  },
  {
    id: 4,
    name: 'Sexy',
  },
  {
    id: 5,
    name: 'Beast',
  },
  {
    id: 6,
    name: 'Kiro',
  },
  {
    id: 7,
    name: 'Pesho',
  },
  {
    id: 8,
    name: 'Msy',
  },
];

const RequestInfluencers = ({ navigation }) => {
  const [searchInfluencers, { data, loading, networkStatus }] = useLazyQuery(
    SEARCH_INFLUENCERS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const search = useMemo(() => debounce(searchInfluencers, 500), []);
  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;
  const influencers = getOr([], 'searchUsers.data', data);

  const { Provider, Droppable, Draggable } = createDndContext();
  const [isSearch, setSearch] = useState(false);

  const droppedInfluencers = [];

  useEffect(() => {
    search({
      variables: {
        query: '',
      },
    });
  }, []);

  return (
    <SafeAreaView>
      <Header title="Request Influencers" />
      <StatusBar />
      <Provider>
        <Container>
          <Grid>
            <GridItem size={12}>
              <TextInput
                autoFocus={isSearch}
                clearButtonMode="while-editing"
                label="Search influencers"
                name="search"
                onFocus={() => setSearch(true)}
                onBlur={() => setSearch(false)}
                onChangeText={query => {
                  console.log('query', query);
                  search({
                    variables: {
                      query,
                    },
                  });
                }}
              />
            </GridItem>
            <GridItem size={12}>
              <Label>
                {isSearch ? 'Results' : 'Hot influencers right now'}
              </Label>
              <InfluencersContainer>
                <InfluencersWrapper>
                  {/* ADD LOADING */}
                  {influencers.length === 0 ? (
                    <Label>The results will appear here</Label>
                  ) : (
                    <>
                      {influencers.map(influencer => (
                        <Draggable
                          onDragStart={() => {
                            console.log('Started draggging');
                          }}
                          onDragEnd={() => {
                            console.log('Ended draggging');
                          }}
                          payload={influencer}
                        >
                          {({ viewProps }) => {
                            return (
                              <Animated.View
                                {...viewProps}
                                style={viewProps.style}
                              >
                                <AvatarWrapper>
                                  <Avatar
                                    size={70}
                                    fallback={influencer.name}
                                  />
                                </AvatarWrapper>
                              </Animated.View>
                            );
                          }}
                        </Draggable>
                      ))}
                    </>
                  )}
                </InfluencersWrapper>
              </InfluencersContainer>
            </GridItem>

            <GridItem size={12} alignSelf="flex-end">
              <Droppable
                onEnter={() => {
                  console.log('Draggable entered');
                }}
                onLeave={() => {
                  console.log('Draggable left');
                }}
                onDrop={({ payload }) => {
                  droppedInfluencers.push(payload);
                  console.log('influencers', influencers);
                  influencers.filter(
                    influencer => influencer.id === payload.id
                  );
                  console.log('influencers', influencers);
                }}
              >
                {({ active, viewProps }) => {
                  return (
                    <Animated.View
                      {...viewProps}
                      style={[dropZoneStyles, viewProps.style]}
                    >
                      {droppedInfluencers.length === 0 ? (
                        <DropZoneText>Drop here</DropZoneText>
                      ) : (
                        <FlatList
                          horizontal
                          keyExtractor={item => item._id}
                          data={droppedInfluencers}
                          renderItem={({ item }) => (
                            <FlatListItem>
                              <UserCard size={70} {...item} />
                            </FlatListItem>
                          )}
                        />
                      )}
                    </Animated.View>
                  );
                }}
              </Droppable>
            </GridItem>
            <GridItem size={12}>
              <Actions>
                <Button title="Create" fixedWidth />
              </Actions>
            </GridItem>
          </Grid>
        </Container>
      </Provider>
    </SafeAreaView>
  );
};

export default RequestInfluencers;
