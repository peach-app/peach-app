const stripe = require('../../helpers/stripe');

module.exports = async (root, args, { client, q }) => {
  const { token } = args;

  const { stripeID } = await client.query(
    q.Select(['data'], q.Get(q.Identity()))
  );

  await stripe.accounts.createExternalAccount(stripeID, {
    external_account: token,
  });

  return true;
};
