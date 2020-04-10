import React from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';
import { useQuery } from '@apollo/react-hooks';
import { formatRefs } from 'helpers';
import { NETWORK_STATUS } from 'consts';
import { useNavigation } from '@react-navigation/native';
import { SubTitle } from '../Subtitle';
import { CampaignCard } from '../CampaignCard';
import { FlatList } from '../FlatList';
import { NoResultText } from '../NoResultText';
import { Intro } from '../Intro';
import GET_BRAND_CAMPAIGNS from './graphql/get-brand-campaigns';

export const CampaignsByBrand = ({ id, headerComponent }) => {
  const navigation = useNavigation();

  const { data, loading, networkStatus, refetch, fetchMore } = useQuery(
    GET_BRAND_CAMPAIGNS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        id,
      },
    }
  );

  const campaigns = getOr([], 'findCampaignsByBrand.data', data);
  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={loading && networkStatus === NETWORK_STATUS.REFETCHING}
          onRefresh={refetch}
        />
      }
      onEndReachedThreshold={0.1}
      onEndReached={() => {
        const after = formatRefs(get('findCampaignsByBrand.after', data));
        if (after.length <= 0 || loading) return;

        fetchMore({
          variables: {
            after,
          },
          updateQuery: (cache, { fetchMoreResult }) => {
            return {
              findCampaignsByBrand: {
                ...fetchMoreResult.findCampaignsByBrand,
                data: [
                  ...cache.findCampaignsByBrand.data,
                  ...fetchMoreResult.findCampaignsByBrand.data,
                ],
              },
            };
          },
        });
      }}
      ListHeaderComponent={
        <>
          {headerComponent}
          <Intro />

          <FlatList.Item>
            <SubTitle>Public campaigns</SubTitle>
          </FlatList.Item>

          {!fetching && campaigns.length <= 0 && (
            <NoResultText>
              The brand has no public campaigns posted.
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
            onPress={() => navigation.navigate('Campaign', { id: item._id })}
          />
        </FlatList.Item>
      )}
    />
  );
};

CampaignsByBrand.propTypes = {
  id: PropTypes.string.isRequired,
  headerComponent: PropTypes.node.isRequired,
};
