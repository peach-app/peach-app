import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import FormatDate from 'date-fns/format';
import { useRoute, useNavigation } from '@react-navigation/native';

import {
  Text,
  Header,
  Intro,
  SafeAreaView,
  StatusBar,
  Button,
  Title,
  Tabs,
  Avatar,
  Booking,
  SkeletonText,
  Grid,
  NoResultText,
  FlatList,
  Foot,
  Label,
} from 'components';
import { useUser } from 'contexts/User';
import { NETWORK_STATUS, USER_TYPE, BOOKING_STATE } from 'consts';

import GET_CAMPAIGN from './graphql/get-campaign';

const TAB_INDEX_BOOKING_STATE = [
  BOOKING_STATE.APPLIED,
  BOOKING_STATE.ACCEPTED,
  BOOKING_STATE.DECLINED,
  BOOKING_STATE.REQUESTED,
];

export const Campaign = () => {
  const [activeTab, setTab] = useState(0);
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute();
  const { user } = useUser();

  const isBrand = get('user.type', user) === USER_TYPE.BRAND;
  const isInfluencer = get('user.type', user) === USER_TYPE.INFLUENCER;
  const tabBookingState = TAB_INDEX_BOOKING_STATE[activeTab];

  const { data: campaign, loading, networkStatus, refetch } = useQuery(
    GET_CAMPAIGN,
    {
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      variables: {
        id,
        isBrand,
        isInfluencer,
        bookingsState: tabBookingState,
      },
    }
  );

  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;
  const fetchingBookings =
    fetching || (loading && networkStatus === NETWORK_STATUS.SET_VARIABLES);

  const brandName = get('findCampaignById.user.name', campaign);
  const userBookingState = get('findCampaignById.userBooking.state', campaign);
  const bookings = getOr([], 'findCampaignById.bookings.data', campaign);

  return (
    <SafeAreaView>
      <StatusBar />
      <Header />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading && networkStatus === NETWORK_STATUS.REFETCHING}
            onRefresh={refetch}
          />
        }
        ListHeaderComponent={
          <>
            <FlatList.Item>
              <Intro>
                <Grid>
                  {isInfluencer && (
                    <Grid.Item size={12}>
                      <Avatar
                        isLoading={fetching}
                        size={50}
                        fallback={brandName}
                        onPress={() =>
                          navigation.navigate('Profile', {
                            id: get('findCampaignById.user._id', campaign),
                          })
                        }
                        source={{
                          uri: get(
                            'findCampaignById.user.avatar.url',
                            campaign
                          ),
                        }}
                      />
                    </Grid.Item>
                  )}

                  <Grid.Item size={12}>
                    <Title>
                      <SkeletonText
                        loadingText="Campaign Title"
                        isLoading={fetching}
                      >
                        {getOr('', 'findCampaignById.name', campaign)}
                      </SkeletonText>
                    </Title>
                  </Grid.Item>

                  <Grid.Item size={12}>
                    <Text isPara>
                      <SkeletonText
                        loadingText="Campaign description loading..."
                        isLoading={fetching}
                      >
                        {getOr('', 'findCampaignById.description', campaign)}
                      </SkeletonText>
                    </Text>
                  </Grid.Item>

                  <Grid.Item size={6}>
                    <Label>Budget</Label>
                    <Text>
                      {new Intl.NumberFormat('en-GB', {
                        style: 'currency',
                        currency: 'GBP',
                      }).format(getOr(0, 'findCampaignById.budget', campaign))}
                    </Text>
                  </Grid.Item>

                  <Grid.Item size={6}>
                    <Label>Completion Date</Label>
                    <Text>
                      {FormatDate(
                        new Date(
                          getOr('2020', 'findCampaignById.dueDate', campaign)
                        ),
                        'dd/MM/yyyy'
                      )}
                    </Text>
                  </Grid.Item>
                </Grid>
              </Intro>
            </FlatList.Item>

            {isBrand && (
              <>
                <FlatList.Item>
                  <Tabs
                    activeTabIndex={activeTab}
                    onTabPress={index => setTab(index)}
                    tabs={['Applied', 'Accepted', 'Declined', 'Requested']}
                  />
                </FlatList.Item>

                {!fetchingBookings && bookings.length <= 0 && (
                  <FlatList.Item>
                    <NoResultText>
                      {tabBookingState === BOOKING_STATE.APPLIED
                        ? 'No influnecer applications to update at this moment.'
                        : `No influencers ${tabBookingState.toLowerCase()} on this campaign.`}
                    </NoResultText>
                  </FlatList.Item>
                )}

                {fetchingBookings && (
                  <>
                    {Array.from(Array(3)).map((_, key) => (
                      <FlatList.Item key={key}>
                        <Booking isLoading />
                      </FlatList.Item>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        }
        data={!fetchingBookings && bookings}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <FlatList.Item>
            <Booking {...item} />
          </FlatList.Item>
        )}
      />

      {isBrand && !loading && tabBookingState === BOOKING_STATE.REQUESTED && (
        <Foot>
          <Button
            title="Request more"
            fixedWidth
            onPress={() =>
              navigation.navigate('RequestInfluencers', { campaignId: id })
            }
          />
        </Foot>
      )}

      {isInfluencer && !loading && (
        <Foot>
          {!userBookingState && (
            <Button
              title="Apply"
              fixedWidth
              onPress={() => navigation.navigate('Apply', { id })}
            />
          )}
          {userBookingState === BOOKING_STATE.APPLIED && (
            <Text>Your application is pending for this campaign.</Text>
          )}
          {userBookingState === BOOKING_STATE.REQUESTED && (
            <Text>The brand has requested you for this campaign.</Text>
          )}
          {userBookingState === BOOKING_STATE.ACCEPTED && (
            <Text>You've been accepted onto this campaign!</Text>
          )}
          {userBookingState === BOOKING_STATE.DECLINED && (
            <Text>Your application for this campaign was unsuccessful.</Text>
          )}
          {userBookingState === BOOKING_STATE.COMPLETE && (
            <Text>Your work here is done</Text>
          )}
        </Foot>
      )}
    </SafeAreaView>
  );
};
