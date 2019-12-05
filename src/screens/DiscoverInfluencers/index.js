import React from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';

import SafeAreaView from '../../components/SafeAreaView';
import Intro from '../../components/Intro';
import Container from '../../components/Container';
import Title from '../../components/Title';
import { Grid, GridItem } from '../../components/Grid';
import IconButton from '../../components/IconButton';

const DiscoverInfluencers = ({ navigation }) => (
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
            <Title isSmall>Popular</Title>
          </GridItem>

          <GridItem size={12}>
            <Title isSmall>Hard Workers</Title>
          </GridItem>

          <GridItem size={12}>
            <Title isSmall>Newbies</Title>
          </GridItem>
        </Grid>
      </Container>
    </ScrollView>
  </SafeAreaView>
);

export default withNavigation(DiscoverInfluencers);
