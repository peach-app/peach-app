import React from 'react';
import get from 'lodash/fp/get';

import { AccountDetailsBanner } from 'components';
import { useUser } from 'contexts/User';

import { USER_TYPE } from 'consts';

import { DiscoverCampaigns } from '../DiscoverCampaigns';
import { DiscoverInfluencers } from '../DiscoverInfluencers';

export const Discover = () => {
  const { user } = useUser();
  const type = get('user.type', user);

  const renderDiscover = discover => (
    <>
      <AccountDetailsBanner />
      {discover}
    </>
  );

  if (type === USER_TYPE.BRAND) {
    return renderDiscover(<DiscoverInfluencers />);
  }

  if (type === USER_TYPE.INFLUENCER) {
    return renderDiscover(<DiscoverCampaigns />);
  }

  return null;
};
