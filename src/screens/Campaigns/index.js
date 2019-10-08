import React, { useState } from 'react';

import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Tabs from '../../components/Tabs';
import { Grid, GridItem } from '../../components/Grid';

const Campaigns = () => {
  const [activeTab, setTab] = useState(0);

  return (
    <SafeAreaView>
      <Container>
        <StatusBar />
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
