const stripe = require('../../helpers/stripe');
const { PAYMENT_REASON, CAMPAIGN_CREATION_COST } = require('../../consts');
const calculateBookingCost = require('../../helpers/calculateBookingCost');

module.exports = async (
  root,
  { reason, bookingId, token, selectedId },
  { client, q, activeUserRef }
) => {
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

  const getPaymentCost = async () => {
    if (reason === PAYMENT_REASON.CREATE_CAMPAIGN) {
      return CAMPAIGN_CREATION_COST;
    }

    if (reason === PAYMENT_REASON.ACCEPT_BOOKING) {
      const cost = await client.query(
        q.Select(
          ['data', 'cost'],
          q.Get(q.Ref(q.Collection('Booking'), bookingId))
        )
      );

      return calculateBookingCost(cost);
    }

    throw new Error('Invalid payment reason');
  };

  const customerId = await client.query(
    q.Select(['data', 'stripeID'], q.Get(activeUserRef))
  );
  const amount = await getPaymentCost();
  const { id: paymentId } = await getPaymentMethod();

  const {
    id,
    next_action: nextAction = null,
  } = await stripe.paymentIntents.create({
    amount,
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
