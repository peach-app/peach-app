import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import startCase from 'lodash/startCase';

import { BOOKING_STATE, MODAL_TYPES } from 'consts';
import { formatToMoneyFromPence } from 'helpers';
import { useModal } from 'contexts/Modal';

import { Note, PayRate } from './styles';
import { Grid } from '../Grid';
import { SkeletonText } from '../Skeletons';
import { Loading } from '../Loading';
import { IconButton } from '../IconButton';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { Pill } from '../Pill';
import UPDATE_BOOKING_STATE from './graphql/update-booking-state';

export const Booking = ({ _id, cost, state, note, user, isLoading }) => {
  const navigation = useNavigation();
  const { openModal, closeModal } = useModal();
  const [updateBooking, { loading }] = useMutation(UPDATE_BOOKING_STATE, {
    refetchQueries: ['getCampaigns', 'getCampaign'],
    variables: {
      id: _id,
    },
    onCompleted: () => {
      closeModal();
    },
  });

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
                    value={formatToMoneyFromPence(cost)}
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
                onPress={() => {
                  openModal({
                    type: MODAL_TYPES.CONFIRM_PAYMENT,
                    props: {
                      description: `Accept ${startCase(
                        get('name', user)
                      )} onto your campaign.`,
                      onClose: closeModal,
                      onConfirm: ({ cardId, token }) => {
                        updateBooking({
                          variables: {
                            state: BOOKING_STATE.ACCEPTED,
                            cardId,
                            token,
                          },
                        });
                      },
                      cost,
                    },
                  });
                }}
              />
            </Grid.Item>
            <Grid.Item width={48}>
              <IconButton
                name="ios-close-circle-outline"
                size={32}
                onPress={() =>
                  updateBooking({
                    variables: {
                      state: BOOKING_STATE.DECLINED,
                    },
                  })
                }
              />
            </Grid.Item>
          </>
        )}
      </Grid>

      {Boolean(note) && (
        <Note>
          <Text>{note}</Text>
        </Note>
      )}
    </>
  );
};

Booking.defaultProps = {
  isLoading: false,
  _id: null,
  cost: 0,
  user: null,
  state: '',
  note: null,
};

Booking.propTypes = {
  isLoading: PropTypes.bool,
  _id: PropTypes.string,
  cost: PropTypes.number,
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
