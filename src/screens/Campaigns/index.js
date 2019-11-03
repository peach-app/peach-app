import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';

import { NETWORK_STATUS, USER_TYPE } from '../../consts';
import SafeAreaView from '../../components/SafeAreaView';
import { FlatList, FlatListItem } from '../../components/FlatList';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Tabs from '../../components/Tabs';
import IconButton from '../../components/IconButton';
import { Grid, GridItem } from '../../components/Grid';
import CampaignCard from '../../components/CampaignCard';
import GET_CAMPAIGNS from './graphql/get-campaigns';

const Campaigns = ({ navigation }) => {
  const [activeTab, setTab] = useState(0);
  const { data, loading, networkStatus, refetch } = useQuery(GET_CAMPAIGNS, {
    notifyOnNetworkStatusChange: true,
  });
  const userType = get('user.type', data);
  const isBrand = userType === USER_TYPE.BRAND;
  const isInfluencer = userType === USER_TYPE.INFLUENCER;

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
                        onPress={() => navigation.navigate('CreateCampaign')}
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
                    ? ['Open', 'Requests', 'Applied']
                    : ['Open', 'Completed']
                }
              />
            </FlatListItem>

            {loading && networkStatus === NETWORK_STATUS.FETCHING && (
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
        data={getOr([], 'campaigns.data', data)}
        renderItem={({ item }) => (
          <FlatListItem>
            <CampaignCard {...item} />
          </FlatListItem>
        )}
      />
    </SafeAreaView>
  );
};

export default Campaigns;
