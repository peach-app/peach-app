const stripe = require('../../helpers/stripe');

module.exports = async (root, args) => {
  if (!root.stripeID) {
    return undefined;
  }

  const res = await stripe.accounts.retrieve(root.stripeID);

  return res;
};
