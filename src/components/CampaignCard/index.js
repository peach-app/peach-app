import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';

import { Icon, MainTitle, Description, User } from './styles';
import { Grid, GridItem } from '../../components/Grid';
import Avatar from '../../components/Avatar';
import { SkeletonText } from '../../components/Skeletons';

const CampaignCard = ({
  isLoading,
  navigation,
  _id,
  user,
  name,
  description,
}) => (
  <TouchableOpacity
    onPress={() => !isLoading && navigation.navigate('Campaign', { id: _id })}
  >
    <Grid noWrap align="center">
      <GridItem>
        <Avatar
          isLoading={isLoading}
          size={50}
          source={{ uri: get('avatar.url', user) }}
          fallback={get('name', user)}
        />
      </GridItem>
      <GridItem flex={1}>
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
      </GridItem>
      {!isLoading && (
        <GridItem>
          <Icon name="ios-arrow-forward" />
        </GridItem>
      )}
    </Grid>
  </TouchableOpacity>
);

CampaignCard.defaultProps = {
  isLoading: false,
  _id: '',
  name: '',
  description: '',
  user: null,
};

CampaignCard.propTypes = {
  isLoading: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
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

export default withNavigation(CampaignCard);
