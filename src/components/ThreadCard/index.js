import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import startCase from 'lodash/startCase';

import { Icon, Users, Text } from './styles';
import Grid from '../../components/Grid';
import Avatar from '../../components/Avatar';
import { SkeletonText } from '../../components/Skeletons';

const fakeAvatars = [{ _id: 0 }, { _id: 1 }];

const ThreadCardMain = ({
  isLoading,
  navigation,
  _id,
  users,
  latestMessage,
}) => (
  <TouchableOpacity
    onPress={() => !isLoading && navigation.navigate('Thread', { id: _id })}
  >
    <Grid noWrap align="center">
      <Grid.Item>
        <Avatar.List>
          {(isLoading ? fakeAvatars : getOr([], 'data', users)).map(user => (
            <Avatar
              key={user._id}
              isLoading={isLoading}
              size={50}
              fallback={user.name}
              source={{
                uri: get('avatar.url', user),
              }}
            />
          ))}
        </Avatar.List>
      </Grid.Item>
      <Grid.Item flex={1}>
        <Users numberOfLines={1}>
          {getOr([], 'data', users)
            .map(user => startCase(user.name))
            .join(', ')}
        </Users>
        <Text numberOfLines={2}>
          <SkeletonText
            isLoading={isLoading}
            loadingText="Loading message text..."
          >
            {getOr('Send the first message...', 'text', latestMessage)}
          </SkeletonText>
        </Text>
      </Grid.Item>
      {!isLoading && (
        <Grid.Item>
          <Icon name="ios-arrow-forward" />
        </Grid.Item>
      )}
    </Grid>
  </TouchableOpacity>
);

ThreadCardMain.defaultProps = {
  _id: null,
  isLoading: false,
};

ThreadCardMain.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export const ThreadCardFragment = gql`
  fragment ThreadCardFragment on Thread {
    _id
    latestMessage {
      text
    }
    users {
      data {
        _id
        name
        avatar {
          url
        }
      }
    }
  }
`;

export default withNavigation(ThreadCardMain);
export const ThreadCard = withNavigation(ThreadCardMain);
