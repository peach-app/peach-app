const stripe = require('../../helpers/stripe');
const { USER_TYPE } = require('../../consts');

module.exports = async root => {
  if (!root.stripeID) {
    return undefined;
  }

  const getStripeAccount = async () => {
    if (root.type === USER_TYPE.BRAND) {
      return stripe.customers.retrieve(root.stripeID);
    }

    return stripe.accounts.retrieve(root.stripeID);
  };

  const res = await getStripeAccount();

  return res;
};
