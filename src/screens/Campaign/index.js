import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import { Foot, Description } from './styles';
import { NETWORK_STATUS, USER_TYPE, BOOKING_STATE } from '../../consts';
import Text from '../../components/Text';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Tabs from '../../components/Tabs';
import Avatar from '../../components/Avatar';
import Booking from '../../components/Booking';
import { SkeletonText } from '../../components/Skeletons';
import { Grid, GridItem } from '../../components/Grid';
import NoResultText from '../../components/NoResultText';
import { useUser } from '../../contexts/User';

import GET_CAMPAIGN from './graphql/get-campaign';
import APPLY_TO_CAMPAIGN from './graphql/apply-to-campaign';

const TAB_INDEX_BOOKING_STATE = [
  BOOKING_STATE.APPLIED,
  BOOKING_STATE.ACCEPTED,
  BOOKING_STATE.DECLINED,
  BOOKING_STATE.REQUESTED,
];

const Campaign = ({ navigation }) => {
  const [activeTab, setTab] = useState(0);
  const id = navigation.getParam('id');
  const { user } = useUser();

  const isBrand = get('user.type', user) === USER_TYPE.BRAND;
  const isInfluencer = get('user.type', user) === USER_TYPE.INFLUENCER;
  const tabBookingState = TAB_INDEX_BOOKING_STATE[activeTab];

  const { data: campaign, loading, networkStatus, refetch } = useQuery(
    GET_CAMPAIGN,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        id,
        isBrand,
        isInfluencer,
        bookingsState: tabBookingState,
      },
    }
  );

  const [applyToCampaign, { loading: applying }] = useMutation(
    APPLY_TO_CAMPAIGN,
    {
      variables: {
        id,
      },
      refetchQueries: ['getCampaign', 'getCampaigns'],
    }
  );

  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;
  const fetchingBookings =
    fetching || (loading && networkStatus === NETWORK_STATUS.SET_VARIABLES);

  const brandName =
    get('findCampaignById.user.name', campaign) ||
    get('findCampaignById.user.email', campaign);
  const userBookingState = get('findCampaignById.userBooking.state', campaign);
  const bookings = getOr([], 'findCampaignById.bookings.data', campaign);

  return (
    <SafeAreaView>
      <StatusBar />
      <Header />
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
          <Grid>
            <GridItem size={12}>
              <Intro>
                <Grid>
                  {isInfluencer && (
                    <GridItem size={12}>
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
                    </GridItem>
                  )}

                  <GridItem size={12}>
                    <Title>
                      <SkeletonText
                        loadingText="Campaign Title"
                        isLoading={fetching}
                      >
                        {getOr('', 'findCampaignById.name', campaign)}
                      </SkeletonText>
                    </Title>
                  </GridItem>

                  <GridItem size={12}>
                    <Description>
                      <SkeletonText
                        loadingText="Campaign description loading..."
                        isLoading={fetching}
                      >
                        {getOr('', 'findCampaignById.description', campaign)}
                      </SkeletonText>
                    </Description>
                  </GridItem>
                </Grid>
              </Intro>
            </GridItem>

            {isBrand && (
              <>
                <GridItem size={12}>
                  <Tabs
                    activeTabIndex={activeTab}
                    onTabPress={index => setTab(index)}
                    tabs={['Applied', 'Accepted', 'Declined', 'Requested']}
                  />
                </GridItem>

                {fetchingBookings && (
                  <>
                    {Array.from(Array(3)).map((_, key) => (
                      <GridItem size={12} key={key}>
                        <Booking isLoading />
                      </GridItem>
                    ))}
                  </>
                )}

                {!fetchingBookings && (
                  <>
                    {bookings.length <= 0 && (
                      <GridItem size={12}>
                        <NoResultText>
                          {tabBookingState === BOOKING_STATE.APPLIED
                            ? 'No influnecer applications to update at this moment.'
                            : `No influencers ${tabBookingState.toLowerCase()} on this campaign.`}
                        </NoResultText>
                      </GridItem>
                    )}
                    {bookings.map(booking => (
                      <GridItem size={12} key={booking._id}>
                        <Booking {...booking} />
                      </GridItem>
                    ))}
                  </>
                )}
              </>
            )}
          </Grid>
        </Container>
      </ScrollView>

      {isInfluencer && (
        <Foot>
          {!userBookingState && (
            <Button
              title="Apply"
              fixedWidth
              onPress={applyToCampaign}
              isLoading={applying}
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
        </Foot>
      )}
    </SafeAreaView>
  );
};

export default Campaign;
