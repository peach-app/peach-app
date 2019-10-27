import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';

import { NETWORK_STATUS, USER_TYPE } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Tabs from '../../components/Tabs';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import { Grid, GridItem } from '../../components/Grid';
import CampaignCard from '../../components/CampaignCard';
import GET_USER from './graphql/get-user';

const Campaigns = () => {
  const [activeTab, setTab] = useState(0);
  const { data, loading, networkStatus, refetch } = useQuery(GET_USER, {
    notifyOnNetworkStatusChange: true,
  });
  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;
  const userType = get('user.type', data);
  const isBrand = userType === USER_TYPE.BRAND;
  const isInfluencer = userType === USER_TYPE.INFLUENCER;

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
            <GridItem size={12}>
              <Intro>
                <Grid align="flex-end">
                  <GridItem flex={1}>
                    <Title>Campaigns</Title>
                  </GridItem>
                  {isBrand && (
                    <GridItem>
                      <Button title="Create" />
                    </GridItem>
                  )}
                </Grid>
              </Intro>
            </GridItem>

            {!fetching && (
              <GridItem size={12}>
                <Tabs
                  activeTabIndex={activeTab}
                  onTabPress={index => setTab(index)}
                  tabs={
                    isInfluencer
                      ? ['Open', 'Requests', 'Applied']
                      : ['All', 'Applications']
                  }
                />
              </GridItem>
            )}

            {fetching && (
              <GridItem size={12}>
                <Loading />
              </GridItem>
            )}

            {isBrand &&
              getOr([], 'user.campaigns.data', data).map(campaign => (
                <GridItem size={12} key={campaign._id}>
                  <CampaignCard {...campaign} />
                </GridItem>
              ))}
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Campaigns;
