import React from 'react';
import { useNavigation } from '@react-navigation/native';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';
import PropTypes from 'prop-types';

import { Touchable, Head, Bio } from './styles';
import { Text } from '../Text';
import { Avatar } from '../Avatar';
import { SkeletonText } from '../Skeletons';

export const UserProfileCard = ({ isLoading, _id, name, bio, avatar }) => {
  const navigation = useNavigation();

  return (
    <Touchable
      onPress={() => !isLoading && navigation.navigate('Profile', { id: _id })}
    >
      <Head>
        <Avatar
          size={50}
          source={{ uri: get('url', avatar) }}
          fallback={name}
          isLoading={isLoading}
        />
      </Head>

      <Text numberOfLines={1}>
        <SkeletonText loadingText="Loading User" isLoading={isLoading}>
          {startCase(name)}
        </SkeletonText>
      </Text>
      {bio && <Bio numberOfLines={1}>{bio}</Bio>}
    </Touchable>
  );
};

UserProfileCard.defaultProps = {
  _id: null,
  isLoading: false,
  name: '',
  bio: null,
  avatar: null,
};

UserProfileCard.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
  name: PropTypes.string,
  bio: PropTypes.string,
  avatar: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};

export const UserProfileCardFragment = gql`
  fragment UserProfileCardFragment on User {
    _id
    name
    bio
    avatar {
      url
    }
  }
`;
