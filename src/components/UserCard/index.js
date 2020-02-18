import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';
import PropTypes from 'prop-types';

import { Bio } from './styles';
import { Grid } from '../Grid';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { SkeletonText } from '../Skeletons';

export const UserCard = ({ isLoading, _id, name, bio, avatar }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => !isLoading && navigation.navigate('Profile', { id: _id })}
    >
      <Grid noWrap align="center">
        <Grid.Item>
          <Avatar
            size={50}
            isLoading={isLoading}
            source={{ uri: get('url', avatar) }}
            fallback={name}
          />
        </Grid.Item>
        <Grid.Item flex={1}>
          <Text numberOfLines={1}>
            <SkeletonText loadingText="Loading User" isLoading={isLoading}>
              {startCase(name)}
            </SkeletonText>
          </Text>
          {bio && <Bio numberOfLines={2}>{bio}</Bio>}
        </Grid.Item>
      </Grid>
    </TouchableOpacity>
  );
};

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
