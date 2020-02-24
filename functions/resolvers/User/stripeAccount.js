const stripe = require('../../helpers/stripe');

module.exports = (root, args) => {
  return stripe.accounts.retrieve(root.stripeID);
};
