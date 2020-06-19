import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import startCase from 'lodash/startCase';
import Hyperlink from 'react-native-hyperlink';

import { BOOKING_STATE, MODAL_TYPES, PAYMENT_REASON } from 'consts';
import { formatToMoneyFromPence } from 'helpers';
import { useModal } from 'contexts/Modal';
import { useTheme } from '../../theme-provider';

import { Note, PayRate } from './styles';
import { Grid } from '../Grid';
import { SkeletonText } from '../Skeletons';
import { Loading } from '../Loading';
import { IconButton } from '../IconButton';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { Pill } from '../Pill';
import UPDATE_BOOKING_STATE from './graphql/update-booking-state';

export const Booking = ({
  _id,
  cost,
  unpaid,
  state,
  note,
  user,
  isLoading,
}) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { openModal, closeModal } = useModal();
  const [updateBooking, { loading }] = useMutation(UPDATE_BOOKING_STATE, {
    refetchQueries: ['getCampaigns', 'getCampaign'],
    awaitRefetchQueries: true,
    variables: {
      id: _id,
    },
    onCompleted: () => {
      closeModal();
    },
  });

  const acceptBooking = () => {
    if (unpaid) {
      updateBooking({
        variables: {
          state: BOOKING_STATE.ACCEPTED,
        },
      });
      return;
    }

    openModal({
      type: MODAL_TYPES.CONFIRM_PAYMENT,
      props: {
        cost,
        bookingId: _id,
        reason: PAYMENT_REASON.ACCEPT_BOOKING,
        description: `You will be charged the following to accept ${startCase(
          get('name', user)
        )} onto your campaign. This charge can be refunded should the work not be carried out by the completion date.`,
        onClose: closeModal,
        onConfirm: paymentId => {
          updateBooking({
            variables: {
              state: BOOKING_STATE.ACCEPTED,
              paymentId,
            },
          });
        },
      },
    });
  };

  const declineBooking = () => {
    updateBooking({
      variables: {
        state: BOOKING_STATE.DECLINED,
      },
    });
  };

  return (
    <>
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
              {!isLoading && state !== BOOKING_STATE.REQUESTED && (
                <PayRate>
                  <Pill
                    icon="ios-wallet"
                    value={unpaid ? 'Unpaid' : formatToMoneyFromPence(cost)}
                  />
                </PayRate>
              )}
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
                onPress={acceptBooking}
              />
            </Grid.Item>
            <Grid.Item width={48}>
              <IconButton
                name="ios-close-circle-outline"
                size={32}
                onPress={declineBooking}
              />
            </Grid.Item>
          </>
        )}
      </Grid>

      {Boolean(note) && (
        <Note>
          <Hyperlink linkDefault linkStyle={{ color: theme.brand }}>
            <Text>{note}</Text>
          </Hyperlink>
        </Note>
      )}
    </>
  );
};

Booking.defaultProps = {
  isLoading: false,
  _id: null,
  cost: 0,
  unpaid: true,
  user: null,
  state: '',
  note: null,
};

Booking.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
  cost: PropTypes.number,
  unpaid: PropTypes.bool,
  state: PropTypes.string,
  note: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export const BookingFragment = gql`
  fragment BookingFragment on Booking {
    _id
    cost
    unpaid
    state
    note
    user {
      _id
      name
      avatar {
        url
      }
    }
  }
`;
