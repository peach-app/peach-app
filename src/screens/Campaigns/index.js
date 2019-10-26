import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';
import { Ionicons } from '@expo/vector-icons';

import { NETWORK_STATUS, USER_TYPE } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Tabs from '../../components/Tabs';
import Card from '../../components/Card';
import Loading from '../../components/Loading';
import Text from '../../components/Text';
import Avatar from '../../components/Avatar';
import { Grid, GridItem } from '../../components/Grid';
import GET_BOOKINGS from './graphql/get-bookings';

const Campaigns = () => {
  const [activeTab, setTab] = useState(0);
  const { data, loading, networkStatus, refetch } = useQuery(GET_BOOKINGS, {
    notifyOnNetworkStatusChange: true,
  });
  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;

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

            {!fetching && (
              <GridItem>
                <Tabs
                  activeTabIndex={activeTab}
                  onTabPress={index => setTab(index)}
                  tabs={
                    get('user.type', data) === USER_TYPE.INFLUENCER
                      ? ['Open', 'Applied', 'Requests']
                      : ['Open', 'Applications']
                  }
                />
              </GridItem>
            )}

            {fetching && (
              <GridItem>
                <Loading />
              </GridItem>
            )}

            {getOr([], 'user.bookings.data', data).map(booking => (
              <GridItem key={booking._id}>
                <Card>
                  <Grid noWrap align="center">
                    <GridItem width={60}>
                      <Avatar
                        source={{ uri: get('user.avatar.url', booking) }}
                        fallback={get('user.name', booking)}
                      />
                    </GridItem>
                    <GridItem flex={1}>
                      <Text>{get('user.name', booking)}</Text>
                      <Text>£{booking.cost}</Text>
                    </GridItem>
                    <GridItem width={30}>
                      <Ionicons
                        name="ios-arrow-forward"
                        size={30}
                        color="white"
                      />
                    </GridItem>
                  </Grid>
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
