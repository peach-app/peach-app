import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Tabs from '../../components/Tabs';
import { Grid, GridItem } from '../../components/Grid';

const Campaigns = () => {
  const [activeTab, setTab] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Grid>
          <GridItem>
            <Intro>
              <Title>Campaigns</Title>
            </Intro>
          </GridItem>

          <GridItem>
            <Tabs
              activeTabIndex={activeTab}
              onTabPress={index => setTab(index)}
              tabs={['Open', 'Applied', 'Requested']}
            />
          </GridItem>
        </Grid>
      </Container>
    </SafeAreaView>
  );
};

export default Campaigns;
