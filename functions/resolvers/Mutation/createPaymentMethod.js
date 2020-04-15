const stripe = require('../../helpers/stripe');

module.exports = async (root, args, { client, q, activeUserRef }) => {
  const { token } = args;

  const customerId = await client.query(
    q.Select(['data', 'stripeID'], q.Get(activeUserRef))
  );

  const { id } = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      token,
    },
  });

  await stripe.paymentMethods.attach(id, { customer: customerId });

  return true;
};
