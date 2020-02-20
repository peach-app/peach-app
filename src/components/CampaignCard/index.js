import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';

import { Icon, MainTitle, Description, User } from './styles';
import { Grid } from '../Grid';
import { Avatar } from '../Avatar';
import { SkeletonText } from '../Skeletons';

export const CampaignCard = ({ isLoading, _id, user, name, description }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => !isLoading && navigation.navigate('Campaign', { id: _id })}
    >
      <Grid noWrap align="center">
        <Grid.Item>
          <Avatar
            isLoading={isLoading}
            size={50}
            source={{ uri: get('avatar.url', user) }}
            fallback={get('name', user)}
          />
        </Grid.Item>
        <Grid.Item flex={1}>
          <MainTitle numberOfLines={2}>
            <SkeletonText
              isLoading={isLoading}
              loadingText="Campaign title loading"
            >
              {name}
            </SkeletonText>
          </MainTitle>
          <Description numberOfLines={1}>
            <SkeletonText
              isLoading={isLoading}
              loadingText="Campaign description loading"
            >
              {description}
            </SkeletonText>
          </Description>
          <User>
            <SkeletonText isLoading={isLoading} loadingText="Campaign user">
              {get('name', user)}
            </SkeletonText>
          </User>
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

CampaignCard.defaultProps = {
  isLoading: false,
  _id: '',
  name: '',
  description: '',
  user: null,
};

CampaignCard.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
};

export const CampaignCardFragment = gql`
  fragment CampaignCardFragment on Campaign {
    _id
    name
    description
    user {
      name
      avatar {
        url
      }
    }
  }
`;
