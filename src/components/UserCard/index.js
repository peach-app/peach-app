import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';
import PropTypes from 'prop-types';

import { Bio } from './styles';
import { Grid, GridItem } from '../Grid';
import Avatar from '../Avatar';
import Text from '../Text';
import { SkeletonText } from '../Skeletons';
import IconButton from '../IconButton';

const UserCard = ({
  navigation,
  isLoading,
  _id,
  name,
  bio,
  avatar,
  size,
  isActionable,
  onActionPressed,
}) => (
  <TouchableOpacity
    onPress={() => !isLoading && navigation.navigate('Profile', { id: _id })}
  >
    <Grid noWrap align="center">
      <GridItem>
        <Avatar
          size={size || 50}
          isLoading={isLoading}
          source={{ uri: get('url', avatar) }}
          fallback={name}
        />
      </GridItem>
      <GridItem flex={1}>
        <Text numberOfLines={1}>
          <SkeletonText loadingText="Loading User" isLoading={isLoading}>
            {startCase(name)}
          </SkeletonText>
        </Text>
        {bio && <Bio numberOfLines={2}>{bio}</Bio>}
      </GridItem>
      {isActionable && (
        <TouchableOpacity onPress={() => onActionPressed(_id, name)}>
          <GridItem flex={1}>
            <Text>Invite</Text>
          </GridItem>
        </TouchableOpacity>
      )}
    </Grid>
  </TouchableOpacity>
);

UserCard.defaultProps = {
  _id: null,
  isLoading: false,
  name: '',
  bio: null,
  avatar: null,
};

UserCard.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
  name: PropTypes.string,
  bio: PropTypes.string,
  avatar: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export const UserCardFragment = gql`
  fragment UserCardFragment on User {
    _id
    name
    bio
    avatar {
      url
    }
  }
`;

export default withNavigation(UserCard);
