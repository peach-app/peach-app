import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import Dinero from 'dinero.js';
import { withNavigation } from 'react-navigation';
import { useMutation } from '@apollo/react-hooks';
import startCase from 'lodash/startCase';

import { BOOKING_STATE } from '../../consts';
import { Grid } from '../Grid';
import { SkeletonText } from '../Skeletons';
import { Loading } from '../Loading';
import { IconButton } from '../IconButton';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import UPDATE_BOOKING_STATE from './graphql/update-booking-state';

const BookingMain = ({ _id, cost, state, user, isLoading, navigation }) => {
  const [updateBookingState, { loading }] = useMutation(UPDATE_BOOKING_STATE, {
    refetchQueries: ['getCampaign'],
    variables: {
      id: _id,
    },
  });

  return (
    <Grid align="center">
      <Grid.Item flex={1}>
        <Grid noWrap align="center">
          <Grid.Item>
            <Avatar
              size={50}
              onPress={() =>
                navigation.navigate('Profile', { id: get('_id', user) })
              }
              isLoading={isLoading}
              source={{ uri: get('avatar.url', user) }}
              fallback={get('name', user)}
            />
          </Grid.Item>
          <Grid.Item flex={1}>
            <Text numberOfLines={1}>
              <SkeletonText
                isLoading={isLoading}
                loadingText="Booking user name loading"
              >
                {startCase(get('name', user))}
              </SkeletonText>
            </Text>
            <Text>
              <SkeletonText isLoading={isLoading} loadingText="Cost loading">
                Rate: {Dinero({ amount: cost, currency: 'GBP' }).toFormat()}
              </SkeletonText>
            </Text>
          </Grid.Item>
        </Grid>
      </Grid.Item>

      {loading && (
        <Grid.Item>
          <Loading />
        </Grid.Item>
      )}

      {state === BOOKING_STATE.APPLIED && !loading && (
        <>
          <Grid.Item width={48}>
            <IconButton
              name="ios-checkmark-circle-outline"
              size={32}
              onPress={() => {
                updateBookingState({
                  variables: {
                    state: BOOKING_STATE.ACCEPTED,
                  },
                });
              }}
            />
          </Grid.Item>
          <Grid.Item width={48}>
            <IconButton
              name="ios-close-circle-outline"
              size={32}
              onPress={() => {
                updateBookingState({
                  variables: {
                    state: BOOKING_STATE.DECLINED,
                  },
                });
              }}
            />
          </Grid.Item>
        </>
      )}
    </Grid>
  );
};

BookingMain.defaultProps = {
  isLoading: false,
  _id: null,
  cost: 0,
  user: null,
  state: '',
};

BookingMain.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
  cost: PropTypes.number,
  state: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export const BookingFragment = gql`
  fragment BookingFragment on Booking {
    _id
    cost
    state
    user {
      _id
      name
      avatar {
        url
      }
    }
  }
`;

export const Booking = withNavigation(BookingMain);
