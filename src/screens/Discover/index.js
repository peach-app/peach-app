import React from 'react';
import get from 'lodash/fp/get';

import { useUser } from 'contexts/User';

import { USER_TYPE } from 'consts';

import { DiscoverCampaigns } from '../DiscoverCampaigns';
import { DiscoverInfluencers } from '../DiscoverInfluencers';

export const Discover = () => {
  const { user } = useUser();
  const type = get('user.type', user);

  if (type === USER_TYPE.BRAND) {
    return <DiscoverInfluencers />;
  }

  if (type === USER_TYPE.INFLUENCER) {
    return <DiscoverCampaigns />;
  }

  return null;
};
