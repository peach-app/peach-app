const stripe = require('../../helpers/stripe');

module.exports = async (root, { id }) => {
  const { status } = await stripe.paymentIntents.confirm(id);
  return { status };
};
