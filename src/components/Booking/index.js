import React from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';

import Text from '../../components/Text';

const Booking = ({ cost, user }) => (
  <View>
    <Text>{cost}</Text>
    <Text>{get('name', user)}</Text>
  </View>
);

Booking.propTypes = {
  cost: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export const BookingFragment = gql`
  fragment BookingFragment on Booking {
    cost
    user {
      name
    }
  }
`;

export default Booking;
