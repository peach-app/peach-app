import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';

import { Main, Center } from './styles';
import Avatar from '../../components/Avatar';

const ProfileHeader = ({ name, email, avatar, isLoading }) => (
  <Main>
    <Center>
      <Avatar
        isLoading={isLoading}
        size={90}
        fallback={name || email}
        source={{
          uri: get('url', avatar),
        }}
      />
    </Center>
  </Main>
);

ProfileHeader.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.shape({
    url: PropTypes.string,
  }),
};

export const ProfileHeaderFragment = gql`
  fragment ProfileHeaderFragment on User {
    name
    email
    avatar {
      url
    }
  }
`;

export default ProfileHeader;
