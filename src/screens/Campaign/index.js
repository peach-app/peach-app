import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import { Foot, Description } from './styles';
import { NETWORK_STATUS, USER_TYPE } from '../../consts';
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
                  size={50}
                  fallback={brandName}
                  source={{
                    uri: get('findCampaignByID.user.avatar.url', campaign),
                  }}
                />
              </Intro>
            </GridItem>
            <GridItem size={12}>
              <Title>
                <SkeletonText loadingText="Campaign Title" isLoading={fetching}>
                  {getOr('', 'findCampaignByID.name', campaign)}
                </SkeletonText>
              </Title>
            </GridItem>
            <GridItem size={12}>
              <Description>
                <SkeletonText
                  loadingText="Campaign description loading..."
                  isLoading={fetching}
                >
                  {getOr('', 'findCampaignByID.description', campaign)}
                </SkeletonText>
              </Description>
            </GridItem>
          </Grid>
        </Container>
      </ScrollView>

      {get('user.type', user) === USER_TYPE.INFLUENCER && (
        <Foot>
          <Button title="Apply" fixedWidth />
        </Foot>
      )}
    </SafeAreaView>
  );
};

export default Campaign;