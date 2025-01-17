const stripe = require('../../helpers/stripe');

module.exports = async (root, args, { client, q, activeUserRef }) => {
  const { token } = args;

  const accountId = await client.query(
    q.Select(['data', 'stripeID'], q.Get(activeUserRef))
  );

  await stripe.accounts.createExternalAccount(accountId, {
    external_account: token,
  });

  return true;
};
