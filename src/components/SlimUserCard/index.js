import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import { withNavigation } from 'react-navigation';
import startCase from 'lodash/startCase';

import { Main, Name } from './styles';
import Avatar from '../../components/Avatar';

const SlimUserCard = ({ navigation, _id, name, email, avatar }) => (
  <Main onPress={() => navigation.navigate('Profile', { id: _id })}>
    <Avatar
      size={50}
      source={{ uri: get('url', avatar) }}
      fallback={name || email}
    />
    <Name numberOfLines={1}>{startCase(name)}</Name>
  </Main>
);

SlimUserCard.defaultProps = {
  name: '',
  email: '',
  avatar: null,
};

SlimUserCard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export const SlimUserCardFragment = gql`
  fragment SlimUserCardFragment on User {
    _id
    name
    email
    avatar {
      url
    }
  }
`;

export default withNavigation(SlimUserCard);
