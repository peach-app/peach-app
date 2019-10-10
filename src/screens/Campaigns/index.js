import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';

import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Tabs from '../../components/Tabs';
import { Grid, GridItem } from '../../components/Grid';
import Card from '../../components/Card';
import GET_CAMPAIGNS from './graphql/get-campaigns';

const Campaigns = () => {
  const [activeTab, setTab] = useState(0);
  const { data } = useQuery(GET_CAMPAIGNS);

  return (
    <SafeAreaView>
      <ScrollView style={{ flex: 1 }}>
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

            {getOr([], 'user.campaigns.data', data).map(campaign => (
              <GridItem key={campaign._id}>
                <Card>
                  <Text>{campaign.name}</Text>
                  <Text numberOfLines={1}>{campaign.description}</Text>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Campaigns;
