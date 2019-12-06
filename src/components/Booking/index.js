import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import Dinero from 'dinero.js';
import { withNavigation } from 'react-navigation';
import { useMutation } from '@apollo/react-hooks';
import startCase from 'lodash/startCase';

import { BOOKING_STATE } from '../../consts';
import { Grid, GridItem } from '../../components/Grid';
import { SkeletonText } from '../../components/Skeletons';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import Text from '../../components/Text';
import UPDATE_BOOKING_STATE from './graphql/update-booking-state';

const Booking = ({ _id, cost, state, user, isLoading, navigation }) => {
  const [updateBookingState, { loading: updating }] = useMutation(
    UPDATE_BOOKING_STATE,
    {
      refetchQueries: ['getCampaign'],
      variables: {
        id: _id,
      },
    }
  );

  return (
    <Grid>
      <GridItem size={12}>
        <Grid noWrap align="center">
          <GridItem>
            <Avatar
              size={50}
              onPress={() =>
                navigation.navigate('Profile', { id: get('_id', user) })
              }
              isLoading={isLoading}
              source={{ uri: get('avatar.url', user) }}
              fallback={get('name', user) || get('email', user)}
            />
          </GridItem>
          <GridItem flex={1}>
            <Text>
              <SkeletonText
                isLoading={isLoading}
                loadingText="Booking user name loading"
              >
                {startCase(get('name', user) || get('email', user))}
              </SkeletonText>
            </Text>
            <Text>
              <SkeletonText isLoading={isLoading} loadingText="Cost loading">
                Rate: {Dinero({ amount: cost, currency: 'GBP' }).toFormat()}
              </SkeletonText>
            </Text>
          </GridItem>
        </Grid>
      </GridItem>

      {state === BOOKING_STATE.APPLIED && (
        <GridItem size={12}>
          <Grid>
            <GridItem flex={1}>
              <Button
                title="Accept"
                isSmall
                isLoading={updating}
                onPress={() => {
                  updateBookingState({
                    variables: {
                      state: BOOKING_STATE.ACCEPTED,
                    },
                  });
                }}
              />
            </GridItem>
            <GridItem flex={1}>
              <Button
                title="Decline"
                isShaded
                isSmall
                isLoading={updating}
                onPress={() => {
                  updateBookingState({
                    variables: {
                      state: BOOKING_STATE.DECLINED,
                    },
                  });
                }}
              />
            </GridItem>
          </Grid>
        </GridItem>
      )}
    </Grid>
  );
};

Booking.defaultProps = {
  isLoading: false,
  _id: null,
  cost: 0,
  user: null,
  state: '',
};

Booking.propTypes = {
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
      email
      avatar {
        url
      }
    }
  }
`;

export default withNavigation(Booking);
