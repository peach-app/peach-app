import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import FormatDate from 'date-fns/format';
import { useRoute, useNavigation } from '@react-navigation/native';
import Hyperlink from 'react-native-hyperlink';

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
  Pill,
} from 'components';
import { useUser } from 'contexts/User';
import { useModal } from 'contexts/Modal';
import { NETWORK_STATUS, BOOKING_STATE, MODAL_TYPES } from 'consts';
import { formatToMoneyFromPence } from 'helpers';

import { useTheme } from '../../theme-provider';
import { RequestActions, AcceptedActions } from './components';
import GET_CAMPAIGN from './graphql/get-campaign';

const TAB_INDEX_BOOKING_STATE = [
  BOOKING_STATE.APPLIED,
  BOOKING_STATE.ACCEPTED,
  BOOKING_STATE.DECLINED,
  BOOKING_STATE.REQUESTED,
  BOOKING_STATE.COMPLETE,
];

export const Campaign = () => {
  const [activeTab, setTab] = useState(0);
  const navigation = useNavigation();
  const theme = useTheme();
  const {
    params: { id },
  } = useRoute();
  const { isBrand, isInfluencer } = useUser();
  const { openModal } = useModal();

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

  const openApplyModal = () => {
    openModal({
      type: MODAL_TYPES.CAMPAIGN_APPLY,
      props: {
        campaignId: id,
        isUnpaid: get('findCampaignById.unpaid', campaign),
      },
    });
  };

  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;
  const fetchingBookings =
    fetching || (loading && networkStatus === NETWORK_STATUS.SET_VARIABLES);

  const brandName = get('findCampaignById.user.name', campaign);
  const userBookingState = get('findCampaignById.userBooking.state', campaign);
  const bookings = getOr([], 'findCampaignById.bookings.data', campaign);

  return (
    <SafeAreaView>
      <StatusBar />
      <Header
        rightActionLabel={isBrand && 'Edit'}
        onRightActionPressed={() =>
          navigation.navigate('CreateOrUpdateCampaign', {
            campaignId: id,
          })
        }
      />
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
                    <Hyperlink linkDefault linkStyle={{ color: theme.brand }}>
                      <Text isPara>
                        <SkeletonText
                          loadingText={`Campaign description loading.\nLorem ipsum dolor sit amet...`}
                          isLoading={fetching}
                        >
                          {getOr('', 'findCampaignById.description', campaign)}
                        </SkeletonText>
                      </Text>
                    </Hyperlink>
                  </Grid.Item>

                  {!fetching && (
                    <Grid.Item size={6}>
                      <Label>Budget</Label>
                      <Pill.List>
                        <Pill
                          isSmall
                          icon="ios-wallet"
                          value={
                            get('findCampaignById.unpaid', campaign)
                              ? 'Unpaid'
                              : formatToMoneyFromPence(
                                  get('findCampaignById.budget', campaign)
                                )
                          }
                        />
                      </Pill.List>
                    </Grid.Item>
                  )}

                  {!fetching && (
                    <Grid.Item size={6}>
                      <Label>Completion Date</Label>
                      <Pill.List>
                        <Pill
                          isSmall
                          icon="ios-calendar"
                          value={FormatDate(
                            new Date(
                              getOr(
                                '2020',
                                'findCampaignById.dueDate',
                                campaign
                              )
                            ),
                            'do MMM yyyy'
                          )}
                        />
                      </Pill.List>
                    </Grid.Item>
                  )}
                </Grid>
              </Intro>
            </FlatList.Item>

            {isBrand && (
              <>
                <FlatList.Item>
                  <Tabs
                    activeTabIndex={activeTab}
                    onTabPress={index => setTab(index)}
                    tabs={[
                      'Applied',
                      'Accepted',
                      'Declined',
                      'Requested',
                      'Complete',
                    ]}
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
            title="Request More"
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
            <Button title="Apply" fixedWidth onPress={openApplyModal} />
          )}
          {userBookingState === BOOKING_STATE.APPLIED && (
            <Text isCenter>Your application is pending for this campaign.</Text>
          )}
          {userBookingState === BOOKING_STATE.REQUESTED && (
            <RequestActions campaignId={id} onAccept={openApplyModal} />
          )}
          {userBookingState === BOOKING_STATE.DECLINED && (
            <Text isCenter>
              Your application for this campaign was unsuccessful.
            </Text>
          )}
          {userBookingState === BOOKING_STATE.COMPLETE && (
            <Text
              isCenter
            >{`Your work here is done!\nThe brand will review your work and you will recieve a payout around 7 days after the completion date.`}</Text>
          )}
          {userBookingState === BOOKING_STATE.ACCEPTED && (
            <AcceptedActions
              bookingId={get('findCampaignById.userBooking._id', campaign)}
            />
          )}
        </Foot>
      )}
    </SafeAreaView>
  );
};
