import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';

import { Icon } from './styles';
import { Grid, GridItem } from '../../components/Grid';
import Avatar from '../../components/Avatar';
import Text from '../../components/Text';

const CampaignCard = ({ user, name, description }) => (
  <Grid noWrap align="center">
    <GridItem width={50}>
      <Avatar
        size={50}
        source={{ uri: get('avatar.url', user) }}
        fallback={get('name', user) || get('email', user)}
      />
    </GridItem>
    <GridItem flex={1}>
      <Text>{name}</Text>
      <Text numberOfLines={1}>{description}</Text>
    </GridItem>
    <GridItem width={30}>
      <Icon name="ios-arrow-forward" />
    </GridItem>
  </Grid>
);

CampaignCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
};

export const CampaignCardFragment = gql`
  fragment CampaignCardFragment on Campaign {
    name
    description
    user {
      name
      email
      avatar {
        url
      }
    }
  }
`;

export default CampaignCard;
