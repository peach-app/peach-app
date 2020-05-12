const calculateBookingCost = require('../../helpers/calculateBookingCost');

module.exports = ({ cost }) => {
  return calculateBookingCost(cost);
};
