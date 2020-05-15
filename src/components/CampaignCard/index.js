import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';
import FormatDate from 'date-fns/format';

import { useUser } from 'contexts/User';
import { formatToMoneyFromPence } from 'helpers';

import { MainTitle, Description, User, ArrowIcon, Pills } from './styles';
import { Grid } from '../Grid';
import { Avatar } from '../Avatar';
import { SkeletonText } from '../Skeletons';
import { Pill } from '../Pill';

export const CampaignCard = ({
  isLoading,
  user,
  name,
  description,
  budget,
  dueDate,
  onPress,
  ActionItem,
}) => {
  const { isInfluencer, isBrand } = useUser();

  return (
    <TouchableOpacity onPress={() => !isLoading && onPress()}>
      <Grid noWrap align="center">
        {isInfluencer && (
          <Grid.Item>
            <Avatar
              isLoading={isLoading}
              size={50}
              source={{ uri: get('avatar.url', user) }}
              fallback={get('name', user)}
            />
          </Grid.Item>
        )}
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
          {isInfluencer && (
            <User>
              <SkeletonText isLoading={isLoading} loadingText="Campaign user">
                {get('name', user)}
              </SkeletonText>
            </User>
          )}
          {!isLoading && isBrand && (
            <Pills>
              <Pill icon="ios-wallet" value={formatToMoneyFromPence(budget)} />
              <Pill
                icon="ios-calendar"
                value={FormatDate(new Date(dueDate), 'do MMM')}
              />
            </Pills>
          )}
        </Grid.Item>
        {!isLoading && Boolean(ActionItem) && (
          <Grid.Item>
            <ActionItem />
          </Grid.Item>
        )}
      </Grid>
    </TouchableOpacity>
  );
};

CampaignCard.Arrow = ArrowIcon;

CampaignCard.defaultProps = {
  isLoading: false,
  name: '',
  description: '',
  budget: null,
  dueDate: null,
  user: null,
  onPress: null,
  ActionItem: ArrowIcon,
};

CampaignCard.propTypes = {
  ActionItem: PropTypes.any,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func,
  name: PropTypes.string,
  description: PropTypes.string,
  budget: PropTypes.number,
  dueDate: PropTypes.string,
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
    budget
    dueDate
    user {
      name
      avatar {
        url
      }
    }
  }
`;
