const stripe = require('../../helpers/stripe');

module.exports = async (
  root,
  { token, selectedId },
  { client, q, activeUserRef }
) => {
  const customerId = await client.query(
    q.Select(['data', 'stripeID'], q.Get(activeUserRef))
  );

  const getPaymentMethod = async () => {
    if (token) {
      return stripe.paymentMethods.create({
        type: 'card',
        card: {
          token,
        },
      });
    }

    return { id: selectedId };
  };

  const { id: paymentId } = await getPaymentMethod();

  const {
    id,
    next_action: nextAction = null,
  } = await stripe.paymentIntents.create({
    amount: 500, // Pence for campaign creation cost
    currency: 'gbp',
    confirm: true,
    payment_method: paymentId,
    setup_future_usage: 'off_session',
    customer: customerId,
    confirmation_method: 'manual',
  });

  const redirectUrl = nextAction && nextAction.use_stripe_sdk.stripe_js;

  return { id, redirectUrl };
};
