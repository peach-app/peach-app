import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import startCase from 'lodash/startCase';

import { Icon, Users, Text } from './styles';
import { Grid } from '../Grid';
import { Avatar } from '../Avatar';
import { SkeletonText } from '../Skeletons';

export const ThreadCard = ({ isLoading, _id, users, latestMessage }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => !isLoading && navigation.navigate('Thread', { id: _id })}
    >
      <Grid noWrap align="center">
        <Grid.Item>
          <Avatar.List>
            {(isLoading ? [{ _id: 0 }] : getOr([], 'data', users)).map(user => (
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
            <SkeletonText
              isLoading={isLoading}
              loadingText="John Smith, Josh p"
            >
              {getOr([], 'data', users)
                .map(user => startCase(user.name))
                .join(', ')}
            </SkeletonText>
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
};

ThreadCard.defaultProps = {
  _id: null,
  isLoading: false,
};

ThreadCard.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
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
