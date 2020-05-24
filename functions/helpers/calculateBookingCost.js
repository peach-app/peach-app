const {
  BOOKING_APPLICATION_FEE,
  STRIPE_CONNECT_ACCOUNT_CHARGE,
} = require('../consts');

const calculateBookingCost = cost => {
  return Math.ceil(
    cost + cost * BOOKING_APPLICATION_FEE + STRIPE_CONNECT_ACCOUNT_CHARGE
  );
};

module.exports = calculateBookingCost;
