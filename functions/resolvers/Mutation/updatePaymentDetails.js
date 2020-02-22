const stripe = require('../../helpers/stripe');

module.exports = async (root, args, { client, q }) => {
  const { cardToken } = args;

  const { stripeID } = await client.query(
    q.Select(['data'], q.Get(q.Identity()))
  );

  await stripe.customers.createSource(stripeID, {
    source: cardToken,
  });

  return true;
};
