import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import getOr from 'lodash/fp/getOr';
import { useQuery } from '@apollo/react-hooks';

import { NETWORK_STATUS } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Loading from '../../components/Loading';
import { Grid, GridItem } from '../../components/Grid';
import CampaignCard from '../../components/CampaignCard';
import GET_CAMPAIGNS from './graphql/get-campaigns';

const Discover = () => {
  const { data, loading, networkStatus, refetch } = useQuery(GET_CAMPAIGNS, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <SafeAreaView>
      <ScrollView
        styled={{ flex: 1 }}
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
                <Title>Discover</Title>
              </Intro>
            </GridItem>

            {loading && networkStatus === NETWORK_STATUS.FETCHING && (
              <GridItem size={12}>
                <Loading />
              </GridItem>
            )}

            {getOr([], 'discover.data', data).map(campaign => (
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

export default Discover;
