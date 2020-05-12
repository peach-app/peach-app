const { BOOKING_APPLICATION_FEE } = require('../consts');

const calculateBookingCost = cost => {
  return Math.ceil(cost + cost * BOOKING_APPLICATION_FEE);
};

module.exports = calculateBookingCost;
