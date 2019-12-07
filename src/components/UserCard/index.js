import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';
import PropTypes from 'prop-types';

import { Grid, GridItem } from '../../components/Grid';
import Avatar from '../../components/Avatar';
import Text from '../../components/Text';
import { SkeletonText } from '../../components/Skeletons';

const UserCard = ({ navigation, isLoading, _id, name, avatar }) => (
  <TouchableOpacity
    onPress={() => !isLoading && navigation.navigate('Profile', { id: _id })}
  >
    <Grid noWrap align="center">
      <GridItem>
        <Avatar
          size={50}
          isLoading={isLoading}
          source={{ uri: get('url', avatar) }}
          fallback={name}
        />
      </GridItem>
      <GridItem flex={1}>
        <Text>
          <SkeletonText loadingText="Loading User" isLoading={isLoading}>
            {startCase(name)}
          </SkeletonText>
        </Text>
      </GridItem>
    </Grid>
  </TouchableOpacity>
);

UserCard.defaultProps = {
  isLoading: false,
  name: '',
  avatar: null,
};

UserCard.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string,
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
    avatar {
      url
    }
  }
`;

export default withNavigation(UserCard);
