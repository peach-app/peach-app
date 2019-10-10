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
import Card from '../../components/Card';
import Loading from '../../components/Loading';
import Text from '../../components/Text';
import { Grid, GridItem } from '../../components/Grid';
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
            <GridItem>
              <Intro>
                <Title>Discover</Title>
              </Intro>
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

export default Discover;
