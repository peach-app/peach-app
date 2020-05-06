import React from 'react';
import { useUser } from 'contexts/User';

import { AccountDetailsBanner } from 'components';

import { DiscoverCampaigns } from '../DiscoverCampaigns';
import { DiscoverInfluencers } from '../DiscoverInfluencers';

export const Discover = () => {
  const { isBrand, isInfluencer } = useUser();

  if (isBrand) {
    return (
      <>
        <AccountDetailsBanner />
        <DiscoverInfluencers />
      </>
    );
  }

  if (isInfluencer) {
    return (
      <>
        <AccountDetailsBanner />
        <DiscoverCampaigns />
      </>
    );
  }

  return null;
};
