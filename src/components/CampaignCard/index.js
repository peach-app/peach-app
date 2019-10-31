import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';

import { Icon, MainTitle, Description, User } from './styles';
import { Grid, GridItem } from '../../components/Grid';
import Avatar from '../../components/Avatar';

const CampaignCard = ({ navigation, _id, user, name, description }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Campaign', { id: _id })}
  >
    <Grid noWrap align="center">
      <GridItem>
        <Avatar
          size={50}
          source={{ uri: get('avatar.url', user) }}
          fallback={get('name', user) || get('email', user)}
        />
      </GridItem>
      <GridItem flex={1}>
        <MainTitle numberOfLines={2}>{name}</MainTitle>
        <Description numberOfLines={1}>{description}</Description>
        <User>{get('name', user) || get('email', user)}</User>
      </GridItem>
      <GridItem>
        <Icon name="ios-arrow-forward" />
      </GridItem>
    </Grid>
  </TouchableOpacity>
);

CampaignCard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  _id: PropTypes.string.isRequired,
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
    _id
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

export default withNavigation(CampaignCard);
