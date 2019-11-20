import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import { Icon, Users, Text } from './styles';
import { Grid, GridItem } from '../../components/Grid';
import Avatar, { AvatarList } from '../../components/Avatar';
import { SkeletonText } from '../../components/Skeletons';
import { useUser } from '../../contexts/User';

const fakeAvatars = [{ _id: 0 }, { _id: 1 }];

const ThreadCard = ({ isLoading, navigation, _id, users, latestMessage }) => {
  const { user } = useUser();

  const threadUsers = useMemo(() => {
    return getOr([], 'data', users).filter(
      threadUser => threadUser._id !== user._id
    );
  }, [users, user]);

  return (
    <TouchableOpacity
      onPress={() => !isLoading && navigation.navigate('Thread', { id: _id })}
    >
      <Grid noWrap align="center">
        <GridItem>
          <AvatarList>
            {(isLoading ? fakeAvatars : threadUsers).map(threadUser => (
              <Avatar
                key={threadUser._id}
                isLoading={isLoading}
                size={50}
                fallback={threadUser.name || threadUser.email}
                source={{
                  uri: get('avatar.url', threadUser),
                }}
              />
            ))}
          </AvatarList>
        </GridItem>
        <GridItem flex={1}>
          <Users numberOfLines={1}>
            {threadUsers.map(user => user.name || user.email).join(', ')}
          </Users>
          <Text numberOfLines={2}>
            <SkeletonText
              isLoading={isLoading}
              loadingText="Loading message text..."
            >
              {getOr('Send the first message...', 'text', latestMessage)}
            </SkeletonText>
          </Text>
        </GridItem>
        {!isLoading && (
          <GridItem>
            <Icon name="ios-arrow-forward" />
          </GridItem>
        )}
      </Grid>
    </TouchableOpacity>
  );
};

ThreadCard.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
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
        email
        avatar {
          url
        }
      }
    }
  }
`;

export default withNavigation(ThreadCard);
