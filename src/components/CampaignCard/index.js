import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import gql from 'graphql-tag';
import get from 'lodash/fp/get';
import FormatDate from 'date-fns/format';

import { useUser } from 'contexts/User';
import { formatToMoneyFromPence } from 'helpers';

import { MainTitle, Description, ArrowIcon, Pills } from './styles';
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
  unpaid,
  dueDate,
  onPress,
  ActionItem,
  hideAvatar,
}) => {
  const { isInfluencer } = useUser();

  return (
    <TouchableOpacity onPress={() => !isLoading && onPress()}>
      <Grid noWrap align="center">
        {!hideAvatar && isInfluencer && (
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
          {!isLoading && (
            <Pills>
              <Pill.List>
                <Pill
                  isSmall
                  icon="ios-wallet"
                  value={unpaid ? 'Unpaid' : formatToMoneyFromPence(budget)}
                />
                <Pill
                  isSmall
                  icon="ios-calendar"
                  value={FormatDate(new Date(dueDate), 'do MMM')}
                />
              </Pill.List>
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
  hideAvatar: false,
  name: '',
  description: '',
  budget: null,
  unpaid: false,
  dueDate: null,
  user: null,
  onPress: null,
  ActionItem: ArrowIcon,
};

CampaignCard.propTypes = {
  ActionItem: PropTypes.any,
  isLoading: PropTypes.bool,
  hideAvatar: PropTypes.bool,
  onPress: PropTypes.func,
  name: PropTypes.string,
  description: PropTypes.string,
  budget: PropTypes.number,
  unpaid: PropTypes.bool,
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
    unpaid
    dueDate
    user {
      name
      avatar {
        url
      }
    }
  }
`;
