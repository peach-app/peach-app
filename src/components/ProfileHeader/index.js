import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';

import { Main, Center } from './styles';
import { Avatar } from '../Avatar';
import { AvatarUpload } from '../AvatarUpload';

export const ProfileHeader = ({ name, avatar, isLoading, isEditable }) => (
  <Main>
    <Center>
      <Avatar
        isLoading={isLoading}
        size={100}
        fallback={name}
        source={{
          uri: get('url', avatar),
        }}
      >
        {isEditable && <AvatarUpload />}
      </Avatar>
    </Center>
  </Main>
);

ProfileHeader.defaultProps = {
  isLoading: false,
  name: '',
  avatar: null,
  isEditable: false,
};

ProfileHeader.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.shape({
    url: PropTypes.string,
  }),
  isEditable: PropTypes.bool,
};

export const ProfileHeaderFragment = gql`
  fragment ProfileHeaderFragment on User {
    name
    avatar {
      url
    }
  }
`;
