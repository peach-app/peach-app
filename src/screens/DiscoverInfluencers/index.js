import React from 'react';
import { ScrollView } from 'react-native';

import SafeAreaView from '../../components/SafeAreaView';
import Intro from '../../components/Intro';
import Container from '../../components/Container';
import Title from '../../components/Title';
import { Grid, GridItem } from '../../components/Grid';
import SearchInput from '../../components/SearchInput';

const DiscoverInfluencers = () => (
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
            <SearchInput placeholder="Search influencers..." />
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

export default DiscoverInfluencers;
