const stripe = require('../../helpers/stripe');

module.exports = async (root, args) => {
  const result = await stripe.accounts.retrieve(root.stripeID);

  console.log(result);
  return result;
};
