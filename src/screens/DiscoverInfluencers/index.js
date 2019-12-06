import React from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';

import SafeAreaView from '../../components/SafeAreaView';
import Intro from '../../components/Intro';
import Container from '../../components/Container';
import Title from '../../components/Title';
import { Grid, GridItem } from '../../components/Grid';
import IconButton from '../../components/IconButton';
import SlimUserCard from '../../components/SlimUserCard';
import FlatListHorizontal from '../../components/FlatListHorizontal';

import GET_DISCOVER_USERS from './graphql/get-discover-users';

const DiscoverInfluencers = ({ navigation }) => {
  const { data } = useQuery(GET_DISCOVER_USERS);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Grid>
            <GridItem size={12}>
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
            </GridItem>

            <GridItem size={12}>
              <FlatListHorizontal
                keyExtractor={item => item._id}
                data={getOr([], 'discover.popularUsers.data', data)}
                renderItem={({ item }) => <SlimUserCard {...item} />}
              />
            </GridItem>

            <GridItem size={12}>
              <Title isSmall>Hard Workers</Title>
            </GridItem>

            <GridItem size={12}>
              <FlatListHorizontal
                keyExtractor={item => item._id}
                data={getOr([], 'discover.popularUsers.data', data)}
                renderItem={({ item }) => <SlimUserCard {...item} />}
              />
            </GridItem>

            <GridItem size={12}>
              <Title isSmall>Newbies</Title>
            </GridItem>

            <GridItem size={12}>
              <FlatListHorizontal
                keyExtractor={item => item._id}
                data={getOr([], 'discover.popularUsers.data', data)}
                renderItem={({ item }) => <SlimUserCard {...item} />}
              />
            </GridItem>
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withNavigation(DiscoverInfluencers);
