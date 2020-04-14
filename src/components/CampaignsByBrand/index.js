import React from 'react';
import PropTypes from 'prop-types';
import getOr from 'lodash/fp/getOr';
import { useQuery } from '@apollo/react-hooks';
import { NETWORK_STATUS } from 'consts';
import { useNavigation } from '@react-navigation/native';

import { CampaignCard } from '../CampaignCard';
import { Grid } from '../Grid';

import GET_BRAND_CAMPAIGNS from './graphql/get-brand-campaigns';

export const CampaignsByBrand = ({ id }) => {
  const navigation = useNavigation();

  const { data, loading, networkStatus } = useQuery(GET_BRAND_CAMPAIGNS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      id,
    },
  });

  const campaigns = getOr([], 'findCampaignsByBrand.data', data);
  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;

  return (
    <>
      {fetching &&
        Array.from(Array(3)).map((_, key) => (
          <Grid.Item key={key} size={12}>
            <CampaignCard isLoading />
          </Grid.Item>
        ))}

      {campaigns.map(campaign => (
        <Grid.Item key={campaign._id} size={12}>
          <CampaignCard
            {...campaign}
            onPress={() => navigation.push('Campaign', { id: campaign._id })}
          />
        </Grid.Item>
      ))}
    </>
  );
};

CampaignsByBrand.propTypes = {
  id: PropTypes.string.isRequired,
};
