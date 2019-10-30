import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';

import { Icon } from './styles';
import { Grid, GridItem } from '../../components/Grid';
import Avatar from '../../components/Avatar';
import Text from '../../components/Text';

const CampaignCard = ({ navigation, _id, user, name, description }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Campaign', { id: _id })}
  >
    <Grid noWrap align="center">
      <GridItem width={40}>
        <Avatar
          size={40}
          source={{ uri: get('avatar.url', user) }}
          fallback={get('name', user) || get('email', user)}
        />
      </GridItem>
      <GridItem flex={1}>
        <Text>{name}</Text>
        <Text numberOfLines={1}>{description}</Text>
      </GridItem>
      <GridItem>
        <Icon name="ios-arrow-forward" />
      </GridItem>
    </Grid>
  </TouchableOpacity>
);

CampaignCard.propTypes = {
  navigation: PropTypes.shape({
    navigation: PropTypes.func.isRequired,
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
