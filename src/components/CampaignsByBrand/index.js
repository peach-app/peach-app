import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { Label } from '../Label';

import GET_BRAND_CAMPAIGNS from './graphql/get-brand-campaigns';

export const CampaignsByBrand = ({ id }) => {
  // query
  console.log('ID', id);

  const { data, loading } = useQuery(GET_BRAND_CAMPAIGNS, {
    variables: {
      id,
      // isBrandProfile: !isBrand,
    },
  });

  console.log('eee', data);

  // console.log('eeee', data);

  return <Label> Campaigns by brand</Label>;
};

CampaignsByBrand.propTypes = {
  id: PropTypes.string.isRequired,
};
