import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';

import { Main, Center } from './styles';
import { Avatar } from '../Avatar';

export const ProfileHeader = ({ name, avatar, isLoading }) => (
  <Main>
    <Center>
      <Avatar
        isLoading={isLoading}
        size={100}
        fallback={name}
        source={{
          uri: get('url', avatar),
        }}
      />
    </Center>
  </Main>
);

ProfileHeader.defaultProps = {
  isLoading: false,
  name: '',
  avatar: null,
};

ProfileHeader.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  avatar: PropTypes.shape({
    url: PropTypes.string,
  }),
};

export const ProfileHeaderFragment = gql`
  fragment ProfileHeaderFragment on User {
    name
    avatar {
      url
    }
  }
`;
