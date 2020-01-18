import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';

import formatRefs from '../../helpers/formatRefs';
import { NETWORK_STATUS, USER_TYPE, BOOKING_STATE } from '../../consts';
import {
  SafeAreaView,
  FlatList,
  Title,
  Intro,
  Tabs,
  IconButton,
  Grid,
  CampaignCard,
  NoResultText,
  Branch,
} from '../../components';
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
  const { data, loading, networkStatus, refetch, fetchMore } = useQuery(
    GET_CAMPAIGNS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        state: TAB_INDEX_BOOKING_STATE[activeTab],
      },
    }
  );
  const userType = get('user.type', user);
  const isBrand = userType === USER_TYPE.BRAND;
  const isInfluencer = userType === USER_TYPE.INFLUENCER;

  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;
  const campaigns = getOr([], 'campaigns.data', data);

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading && networkStatus === NETWORK_STATUS.REFETCHING}
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
                          navigation.navigate('RequestInfluencers')
                        }
                      />
                    </Grid.Item>
                  )}
                </Grid>
              </Intro>
            </FlatList.Item>

            <FlatList.Item>
              <Tabs
                activeTabIndex={activeTab}
                onTabPress={index => setTab(index)}
                tabs={
                  isInfluencer
                    ? ['Open', 'Applied', 'Requested']
                    : ['All', 'Applications']
                }
              />
            </FlatList.Item>

            {!fetching && campaigns.length <= 0 && (
              <NoResultText isPara>
                <Branch
                  test={isBrand}
                  left={`You don't have any campaigns yet.\nPress "+" to get started.`}
                  right={`You haven't ${
                    TAB_INDEX_BOOKING_STATE[activeTab] === BOOKING_STATE.APPLIED
                      ? ''
                      : 'been '
                  }${TAB_INDEX_BOOKING_STATE[
                    activeTab
                  ].toLowerCase()} onto any campaigns yet.\nVisit "Browse" to start applying.`}
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
        data={campaigns}
        renderItem={({ item }) => (
          <FlatList.Item>
            <CampaignCard {...item} />
          </FlatList.Item>
        )}
      />
    </SafeAreaView>
  );
};

Campaigns.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Campaigns;
