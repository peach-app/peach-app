import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import head from 'lodash/fp/head';

import Text from '../../components/Text';
import { Grid, GridItem } from '../../components/Grid';
import Avatar, { AvatarList } from '../../components/Avatar';
import { SkeletonText } from '../../components/Skeletons';

const fakeAvatars = [{ _id: 0 }, { _id: 1 }];

const ThreadCard = ({ isLoading, users, messages }) => (
  <Grid noWrap align="center">
    <GridItem>
      <AvatarList>
        {(isLoading ? fakeAvatars : getOr([], 'data', users)).map(user => (
          <Avatar
            key={user._id}
            isLoading={isLoading}
            size={50}
            fallback={user.name || user.email}
            source={{
              uri: get('avatar.url', user),
            }}
          />
        ))}
      </AvatarList>
    </GridItem>
    <GridItem flex={1}>
      <Text numberOfLines={2}>
        <SkeletonText
          isLoading={isLoading}
          loadingText="Loading message text..."
        >
          {get('text', head(getOr([], 'data', messages)))}
        </SkeletonText>
      </Text>
    </GridItem>
  </Grid>
);

ThreadCard.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
};

export const ThreadCardFragment = gql`
  fragment ThreadCardFragment on Thread {
    _id
    messages {
      data {
        text
      }
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

export default ThreadCard;
