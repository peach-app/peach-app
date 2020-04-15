const stripe = require('../../helpers/stripe');
const { USER_TYPE } = require('../../consts');

module.exports = async root => {
  if (!root.stripeID) {
    return undefined;
  }

  const getStripeAccount = async () => {
    if (root.type === USER_TYPE.BRAND) {
      const customer = await stripe.customers.retrieve(root.stripeID);

      const paymentMethods = await stripe.paymentMethods.list({
        customer: root.stripeID,
        type: 'card',
      });

      return {
        ...customer,
        paymentMethods,
      };
    }

    return stripe.accounts.retrieve(root.stripeID);
  };

  const res = await getStripeAccount();

  return res;
};
