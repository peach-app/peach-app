const {
  BOOKING_APPLICATION_FEE,
  STRIPE_CONNECT_ACCOUNT_CHARGE,
} = require('../consts');

const calculateBookingCost = cost => {
  if (cost <= 0) {
    return cost;
  }

  return Math.ceil(
    cost + cost * BOOKING_APPLICATION_FEE + STRIPE_CONNECT_ACCOUNT_CHARGE
  );
};

module.exports = calculateBookingCost;
