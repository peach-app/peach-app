import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRoute, useNavigation } from '@react-navigation/native';

import { formatRefs } from 'helpers';
import {
  SafeAreaView,
  SubTitle,
  Button,
  Foot,
  FlatList,
  CampaignCard,
  Intro,
  AddRemoveAction,
  Header,
} from 'components';
import { useModal } from 'contexts/Modal';
import { NETWORK_STATUS, MODAL_TYPES } from 'consts';

import GET_CAMPAIGNS from './graphql/get-campaigns';
import REQUEST_INFLUENCER_TO_CAMPAIGNS from './graphql/request-influencer-to-campaigns';
import { formatSelectedCampaigns } from './helper';

export const RequestInfluencerToCampaigns = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const { openModal } = useModal();
  const navigation = useNavigation();
  const {
    params: { influencerId },
  } = useRoute();

  const { data, loading, networkStatus, refetch, fetchMore } = useQuery(
    GET_CAMPAIGNS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }
  );
  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;
  const campaigns = getOr([], 'campaigns.data', data);

  const [
    requestInfluencerToCampaigns,
    { loading: isRequestingLoading },
  ] = useMutation(REQUEST_INFLUENCER_TO_CAMPAIGNS, {
    onCompleted: () =>
      openModal({
        type: MODAL_TYPES.CONFIRM_REQUESTED_INFLUENCER_TO_CAMPAIGNS,
        props: {
          onNavigateBack: () => navigation.navigate('Discover'),
        },
      }),
  });

  const handleRequest = () => {
    requestInfluencerToCampaigns({
      variables: {
        influencerId,
        campaigns: selectedCampaigns,
      },
    });
  };

  return (
    <SafeAreaView>
      <Header title="Your campaigns" />
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
            <Intro />
            <SubTitle isCentered>
              Select the campaigns you wish to request the influcer to:
            </SubTitle>
            <Intro />
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
                setSelectedCampaigns(
                  formatSelectedCampaigns(selectedCampaigns, item._id)
                )
              }
              ActionItem={() => (
                <AddRemoveAction
                  isActioned={selectedCampaigns.includes(item._id)}
                />
              )}
            />
          </FlatList.Item>
        )}
      />
      {!loading && selectedCampaigns.length > 0 && (
        <Foot>
          <Button
            fixedWidth
            title="Request"
            onPress={handleRequest}
            isLoading={isRequestingLoading}
          />
        </Foot>
      )}
    </SafeAreaView>
  );
};
