import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import Dinero from 'dinero.js';

import { Grid, GridItem } from '../../components/Grid';
import { SkeletonText } from '../../components/Skeletons';
import Avatar from '../../components/Avatar';
import Text from '../../components/Text';

const Booking = ({ cost, user, isLoading }) => (
  <Grid noWrap align="center">
    <GridItem>
      <Avatar
        size={50}
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
          {get('name', user) || get('email', user)}
        </SkeletonText>
      </Text>
      <Text>
        <SkeletonText isLoading={isLoading} loadingText="Cost loading">
          {Dinero({ amount: cost, currency: 'GBP' }).toFormat()}
        </SkeletonText>
      </Text>
    </GridItem>
  </Grid>
);

Booking.defaultProps = {
  isLoading: false,
  cost: 0,
  user: null,
};

Booking.propTypes = {
  isLoading: PropTypes.bool,
  cost: PropTypes.number,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export const BookingFragment = gql`
  fragment BookingFragment on Booking {
    cost
    user {
      name
      email
      avatar {
        url
      }
    }
  }
`;

export default Booking;
