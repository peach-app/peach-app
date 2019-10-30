import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import { NETWORK_STATUS, USER_TYPE } from '../../consts';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Text from '../../components/Text';
import Avatar from '../../components/Avatar';
import { SkeletonText } from '../../components/Skeletons';
import { Grid, GridItem } from '../../components/Grid';
import Actions from '../../components/Actions';

import GET_USER from './graphql/get-user';
import GET_CAMPAIGN from './graphql/get-campaign';

const Campaign = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { data: user } = useQuery(GET_USER);
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
    get('findCampaignByID.user.name', campaign) ||
    get('findCampaignByID.user.email', campaign);

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title={brandName} />
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
                  size={60}
                  fallback={brandName}
                  source={{
                    uri: get('findCampaignByID.user.avatar.url', campaign),
                  }}
                />
              </Intro>
            </GridItem>
            <GridItem size={12}>
              <Title>
                <SkeletonText isLoading={fetching}>
                  {getOr('', 'findCampaignByID.name', campaign)}
                </SkeletonText>
              </Title>
            </GridItem>
            <GridItem size={12}>
              <Text>
                <SkeletonText isLoading={fetching}>
                  {getOr('', 'findCampaignByID.description', campaign)}
                </SkeletonText>
              </Text>
            </GridItem>
            {get('user.type', user) === USER_TYPE.INFLUENCER && (
              <GridItem size={6}>
                <Button title="Apply" />
              </GridItem>
            )}
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Campaign;
