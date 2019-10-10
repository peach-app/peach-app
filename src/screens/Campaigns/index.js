import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';

import { NETWORK_STATUS } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Tabs from '../../components/Tabs';
import { Grid, GridItem } from '../../components/Grid';
import Card from '../../components/Card';
import Loading from '../../components/Loading';
import GET_CAMPAIGNS from './graphql/get-campaigns';

const Campaigns = () => {
  const [activeTab, setTab] = useState(0);
  const { data, loading, networkStatus, refetch } = useQuery(GET_CAMPAIGNS, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <SafeAreaView>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={loading && networkStatus === NETWORK_STATUS.REFETCHING}
            onRefresh={refetch}
          />
        }
      >
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

            {loading && networkStatus === NETWORK_STATUS.FETCHING && (
              <GridItem>
                <Loading />
              </GridItem>
            )}

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
