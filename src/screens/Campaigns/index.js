import React, { useState, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  FlatList,
  AccountDetailsBanner,
  Title,
  Intro,
  Tabs,
  IconButton,
  Grid,
  CampaignCard,
  NoResultText,
  Branch,
} from 'components';
import { formatRefs } from 'helpers';
import { useUser } from 'contexts/User';

import { NETWORK_STATUS, USER_TYPE, BOOKING_STATE } from 'consts';

import GET_CAMPAIGNS from './graphql/get-campaigns';

export const Campaigns = () => {
  const navigation = useNavigation();
  const [activeTabIndex, setTabIndex] = useState(0);
  const { user } = useUser();
  const userType = get('user.type', user);
  const isBrand = userType === USER_TYPE.BRAND;

  const activeTab = useMemo(
    () =>
      (isBrand
        ? [undefined, BOOKING_STATE.APPLIED] // undefined shows all bookings
        : [
            BOOKING_STATE.ACCEPTED,
            BOOKING_STATE.APPLIED,
            BOOKING_STATE.REQUESTED,
          ])[activeTabIndex],
    [activeTabIndex, isBrand]
  );
  const { data, loading, networkStatus, refetch, fetchMore } = useQuery(
    GET_CAMPAIGNS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      variables: {
        state: activeTab,
      },
    }
  );

  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;
  const campaigns = getOr([], 'campaigns.data', data);

  return (
    <>
      <AccountDetailsBanner />
      <SafeAreaView>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={
                loading && networkStatus === NETWORK_STATUS.REFETCHING
              }
              onRefresh={refetch}
            />
          }
          onEndReached={() => {
            const after = formatRefs(get('campaigns.after', data));

            if (after.length <= 0 || loading) return;

            fetchMore({
              variables: {
                after,
              },
              updateQuery: (cache, { fetchMoreResult }) => ({
                campaigns: {
                  ...fetchMoreResult.campaigns,
                  data: [
                    ...cache.campaigns.data,
                    ...fetchMoreResult.campaigns.data,
                  ],
                },
              }),
            });
          }}
          ListHeaderComponent={
            <>
              <FlatList.Item>
                <Intro>
                  <Grid align="flex-end">
                    <Grid.Item flex={1}>
                      <Title>Campaigns</Title>
                    </Grid.Item>
                    {isBrand && (
                      <Grid.Item>
                        <IconButton
                          size={30}
                          name="ios-add-circle"
                          onPress={() =>
                            navigation.navigate('CreateOrUpdateCampaign')
                          }
                        />
                      </Grid.Item>
                    )}
                  </Grid>
                </Intro>
              </FlatList.Item>

              <FlatList.Item>
                <Tabs
                  activeTabIndex={activeTabIndex}
                  onTabPress={index => setTabIndex(index)}
                  tabs={
                    isBrand
                      ? ['All', 'Applications']
                      : ['Open', 'Applied', 'Requested']
                  }
                />
              </FlatList.Item>

              {!fetching && campaigns.length <= 0 && (
                <NoResultText isPara>
                  <Branch
                    test={isBrand}
                    left={`You don't have any campaigns yet.\nPress "+" to get started.`}
                    right={`You haven't ${
                      activeTab === BOOKING_STATE.APPLIED ? '' : 'been '
                    }${activeTab &&
                      activeTab.toLowerCase()} onto any campaigns yet.\nVisit "Discover" to start applying.`}
                  />
                </NoResultText>
              )}

              {fetching &&
                Array.from(Array(3)).map((_, key) => (
                  <FlatList.Item key={key}>
                    <CampaignCard isLoading />
                  </FlatList.Item>
                ))}
            </>
          }
          keyExtractor={item => item._id}
          data={!fetching && campaigns}
          renderItem={({ item }) => (
            <FlatList.Item>
              <CampaignCard
                {...item}
                onPress={() =>
                  navigation.navigate('Campaign', { id: item._id })
                }
              />
            </FlatList.Item>
          )}
        />
      </SafeAreaView>
    </>
  );
};
