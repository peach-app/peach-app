import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import { Text, Grid, Avatar } from 'components';
import { RequestedInfluencersWrapper } from './styles';

const RequestedInfluencers = ({ requestedInfluencers }) => (
  <RequestedInfluencersWrapper>
    <Grid>
      <Grid.Item size={12}>
        <Text>Influencers bag</Text>
      </Grid.Item>
      <Grid.Item size={12}>
        <Avatar.List>
          {requestedInfluencers.map(influencer => (
            <Avatar
              fallback={influencer.name}
              source={{ uri: get('avatar.url', influencer) }}
            />
          ))}
        </Avatar.List>
      </Grid.Item>
    </Grid>
  </RequestedInfluencersWrapper>
);

RequestedInfluencers.propTypes = {
  requestedInfluencers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    })
  ).isRequired,
};
export default RequestedInfluencers;
