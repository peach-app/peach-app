import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
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
import Avatar from '../../components/Avatar';
import { SkeletonText } from '../../components/Skeletons';
import { Grid, GridItem } from '../../components/Grid';
import { useUser } from '../../contexts/User';

import GET_CAMPAIGN from './graphql/get-campaign';

const Campaign = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { user } = useUser();
  const { data: campaign, loading, networkStatus, refetch } = useQuery(
    GET_CAMPAIGN,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        id,
      },
    }
  );

  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;
  const brandName =
    get('findCampaignById.user.name', campaign) ||
    get('findCampaignById.user.email', campaign);
  const bookingState = get('findCampaignById.userBooking.state', campaign);

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
                    uri: get('findCampaignById.user.avatar.url', campaign),
                  }}
                />
              </Intro>
            </GridItem>
            <GridItem size={12}>
              <Title>
                <SkeletonText loadingText="Campaign Title" isLoading={fetching}>
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
        </Container>
      </ScrollView>

      {get('user.type', user) === USER_TYPE.INFLUENCER && (
        <Foot>
          {!bookingState && <Button title="Apply" fixedWidth />}
          {bookingState === BOOKING_STATE.APPLIED && (
            <Text>Your application is pending for this campaign.</Text>
          )}
          {bookingState === BOOKING_STATE.REQUESTED && (
            <Text>The brand has requested you onto this campaign.</Text>
          )}
        </Foot>
      )}
    </SafeAreaView>
  );
};

export default Campaign;
