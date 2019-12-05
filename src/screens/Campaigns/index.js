import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';

import { NETWORK_STATUS, USER_TYPE, BOOKING_STATE } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import { FlatList, FlatListItem } from '../../components/FlatList';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Tabs from '../../components/Tabs';
import IconButton from '../../components/IconButton';
import { Grid, GridItem } from '../../components/Grid';
import CampaignCard from '../../components/CampaignCard';
import { useUser } from '../../contexts/User';

import GET_CAMPAIGNS from './graphql/get-campaigns';

const TAB_INDEX_BOOKING_STATE = [
  BOOKING_STATE.ACCEPTED,
  BOOKING_STATE.APPLIED,
  BOOKING_STATE.REQUESTED,
];

const Campaigns = ({ navigation }) => {
  const [activeTab, setTab] = useState(0);
  const { user } = useUser();
  const { data, loading, networkStatus, refetch } = useQuery(GET_CAMPAIGNS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      state: TAB_INDEX_BOOKING_STATE[activeTab],
    },
  });
  const userType = get('user.type', user);
  const isBrand = userType === USER_TYPE.BRAND;
  const isInfluencer = userType === USER_TYPE.INFLUENCER;

  useEffect(() => {
    if (navigation.state.params) {
      if (navigation.state.params.shouldRefetchQuery) {
        refetch();
      }
    }
  }, [navigation.state.params]);

  const fetching =
    loading &&
    (networkStatus === NETWORK_STATUS.SET_VARIABLES || NETWORK_STATUS.FETCHING);

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading && networkStatus === NETWORK_STATUS.REFETCHING}
            onRefresh={refetch}
          />
        }
        ListHeaderComponent={
          <>
            <FlatListItem>
              <Intro>
                <Grid align="flex-end">
                  <GridItem flex={1}>
                    <Title>Campaigns</Title>
                  </GridItem>
                  {isBrand && (
                    <GridItem>
                      <IconButton
                        size={30}
                        name="ios-add"
                        onPress={() =>
                          navigation.navigate('RequestInfluencers')
                        }
                      />
                    </GridItem>
                  )}
                </Grid>
              </Intro>
            </FlatListItem>

            <FlatListItem>
              <Tabs
                activeTabIndex={activeTab}
                onTabPress={index => setTab(index)}
                tabs={
                  isInfluencer
                    ? ['Open', 'Applied', 'Requested']
                    : ['Open', 'Completed']
                }
              />
            </FlatListItem>

            {fetching && (
              <>
                {Array.from(Array(3)).map((_, key) => (
                  <FlatListItem key={key}>
                    <CampaignCard isLoading />
                  </FlatListItem>
                ))}
              </>
            )}
          </>
        }
        keyExtractor={item => item._id}
        data={!fetching && getOr([], 'campaigns.data', data)}
        renderItem={({ item }) => (
          <FlatListItem>
            <CampaignCard {...item} />
          </FlatListItem>
        )}
      />
    </SafeAreaView>
  );
};

Campaigns.propTypes = {
  // eslint-disable-next-line
  navigation: PropTypes.object,
};

export default Campaigns;
