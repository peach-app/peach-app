const stripe = require('../../helpers/stripe');

module.exports = (root, args) => {
  if (!root.stripeID) {
    return undefined;
  }

  return stripe.accounts.retrieve(root.stripeID);
};
